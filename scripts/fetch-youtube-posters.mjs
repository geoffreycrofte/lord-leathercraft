#!/usr/bin/env node
/**
 * Downloads the thumbnail of every YouTube video used on the site into
 * src/assets/videos/<id>.jpg, resized and compressed. The YouTube component
 * uses it as a local poster, so visitors make no request to YouTube before
 * they press play.
 *
 *   node scripts/fetch-youtube-posters.mjs
 *
 * Runs in CI before the build. Existing posters are kept. Network errors
 * only print a warning: the video then shows without a poster.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT = 'src/assets/videos';
const SOURCES = ['src'];
const ID_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube-nocookie\.com\/embed\/)([\w-]{11})/g,
  /<YouTube\s[^>]*id="([\w-]{11})"/g,
];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(astro|mdx?|json|ts)$/.test(name)) yield path;
  }
}

const ids = new Set();
for (const root of SOURCES) {
  for (const file of files(root)) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of ID_PATTERNS) for (const m of text.matchAll(pattern)) ids.add(m[1]);
  }
}

mkdirSync(OUT, { recursive: true });
let fetched = 0;
for (const id of ids) {
  const target = join(OUT, `${id}.jpg`);
  if (existsSync(target)) continue;
  let saved = false;
  // maxresdefault does not exist for every video; hqdefault always does.
  for (const size of ['maxresdefault', 'hqdefault']) {
    try {
      const res = await fetch(`https://i.ytimg.com/vi/${id}/${size}.jpg`);
      if (!res.ok) continue;
      const input = Buffer.from(await res.arrayBuffer());
      await sharp(input)
        .resize({ width: 1280, height: 720, fit: 'cover' })
        .jpeg({ quality: 72, mozjpeg: true })
        .toFile(target);
      saved = true;
      fetched++;
      break;
    } catch (error) {
      console.warn(`Poster for ${id} (${size}): ${error.message}`);
    }
  }
  if (!saved) console.warn(`No poster for ${id}: the video will show without one.`);
}
console.log(`${ids.size} video(s) found, ${fetched} poster(s) downloaded.`);
