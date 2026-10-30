#!/usr/bin/env node
/**
 * Keeps source photos light before they reach the repository: resizes to
 * 1400 px wide at most (the largest size the pages use), re-encodes JPEG (mozjpeg, progressive) and PNG,
 * and strips metadata (EXIF, GPS). Astro still generates the responsive
 * sizes and WebP at build time; this only caps what is stored in git.
 *
 *   node scripts/optimize-images.mjs [dir…]          optimise in place
 *   node scripts/optimize-images.mjs --check [dir…]  fail if an image is too heavy
 *
 * Without directories it covers src/assets and src/content. Files already
 * within the limits are left untouched, so running it twice changes nothing.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const MAX_WIDTH = 1400;
const MAX_BYTES = 400 * 1024;
const JPEG = { quality: 76, mozjpeg: true, progressive: true };

const args = process.argv.slice(2);
const check = args.includes('--check');
const dirs = args.filter((a) => !a.startsWith('--'));
const roots = dirs.length ? dirs : ['src/assets', 'src/content'];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (['.jpg', '.jpeg', '.png'].includes(extname(name).toLowerCase())) yield path;
  }
}

let before = 0;
let after = 0;
let changed = 0;
const tooHeavy = [];

for (const root of roots) {
  for (const file of walk(root)) {
    const input = readFileSync(file);
    const meta = await sharp(input).metadata();
    const withinLimits = (meta.width ?? 0) <= MAX_WIDTH && input.length <= MAX_BYTES && !meta.exif;
    before += input.length;
    if (withinLimits) {
      after += input.length;
      continue;
    }
    if (check) {
      tooHeavy.push(`${file} (${meta.width}px, ${Math.round(input.length / 1024)} KB${meta.exif ? ', EXIF' : ''})`);
      after += input.length;
      continue;
    }
    const pipeline = () => sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
    const isPng = extname(file).toLowerCase() === '.png';
    let output;
    if (isPng) {
      output = await pipeline().png({ compressionLevel: 9, palette: !meta.hasAlpha, quality: 85 }).toBuffer();
    } else {
      // Lower the quality step by step for very detailed photos only.
      for (const quality of [JPEG.quality, 70, 64, 58]) {
        output = await pipeline().jpeg({ ...JPEG, quality }).toBuffer();
        if (output.length <= MAX_BYTES) break;
      }
    }
    // Keep the original if re-encoding would not help.
    const best = output.length < input.length || meta.exif ? output : input;
    if (best !== input) {
      writeFileSync(file, best);
      changed++;
    }
    after += best.length;
  }
}

const mb = (n) => (n / 1048576).toFixed(1);
if (check) {
  if (tooHeavy.length) {
    console.error(`${tooHeavy.length} image(s) over ${MAX_WIDTH}px, ${MAX_BYTES / 1024} KB or with metadata.`);
    console.error('Run `npm run images` to optimise them.\n' + tooHeavy.join('\n'));
    process.exit(1);
  }
  console.log(`Images OK (${mb(before)} MB).`);
} else {
  console.log(`${changed} image(s) optimised: ${mb(before)} MB → ${mb(after)} MB.`);
}
