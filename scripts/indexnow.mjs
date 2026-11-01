#!/usr/bin/env node
/**
 * IndexNow: tells Bing (and Yandex, Seznam, Naver…) which pages changed, so
 * they recrawl them right away. https://www.indexnow.org
 *
 *   node scripts/indexnow.mjs diff     after the build, before deploying
 *   node scripts/indexnow.mjs submit   after deploying
 *   node scripts/indexnow.mjs diff --dry-run
 *
 * `diff` hashes every page of dist/ into dist/indexnow-manifest.json (deployed
 * with the site), compares it with the manifest of the live site, and writes
 * the new or changed URLs to indexnow-urls.json. The first time, every page
 * is new. `submit` sends that list. Network errors only print a warning: they
 * never block a deploy.
 *
 * The key is the name and content of public/<KEY>.txt.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE = 'https://lord.crofte.fr';
const KEY = '97422bae69f8220c117c7617ebb0e6f1';
const DIST = 'dist';
const MANIFEST = 'indexnow-manifest.json';
const URLS_FILE = 'indexnow-urls.json';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// Pages that should not be indexed.
const SKIP = ['/404.html'];

const [mode, ...flags] = process.argv.slice(2);
const dryRun = flags.includes('--dry-run');

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* pages(path);
    else if (name.endsWith('.html')) yield path;
  }
}

function pageUrl(file) {
  const path = '/' + relative(DIST, file).split(sep).join('/');
  return SITE + path.replace(/index\.html$/, '');
}

async function diff() {
  const manifest = {};
  for (const file of pages(DIST)) {
    const url = pageUrl(file);
    if (SKIP.some((s) => url.endsWith(s))) continue;
    manifest[url] = createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 16);
  }
  writeFileSync(join(DIST, MANIFEST), JSON.stringify(manifest));

  let live = {};
  try {
    const res = await fetch(`${SITE}/${MANIFEST}`);
    if (res.ok) live = await res.json();
    else console.log(`No live manifest (${res.status}): every page counts as new.`);
  } catch (error) {
    console.warn(`Live manifest unavailable: ${error.message}. Every page counts as new.`);
  }
  const changed = Object.keys(manifest).filter((url) => live[url] !== manifest[url]);
  writeFileSync(URLS_FILE, JSON.stringify(changed, null, 2));
  console.log(`${Object.keys(manifest).length} pages, ${changed.length} new or changed.`);
  if (dryRun) console.log(changed.slice(0, 20).join('\n'));
}

async function submit() {
  if (!existsSync(URLS_FILE)) return console.log('Nothing to submit.');
  const urlList = JSON.parse(readFileSync(URLS_FILE, 'utf8'));
  if (urlList.length === 0) return console.log('No page changed.');
  // IndexNow accepts up to 10,000 URLs per request.
  for (let i = 0; i < urlList.length; i += 10000) {
    const batch = urlList.slice(i, i + 10000);
    const body = { host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch };
    if (dryRun) {
      console.log(`Would submit ${batch.length} URL(s).`);
      continue;
    }
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });
      console.log(`Submitted ${batch.length} URL(s): HTTP ${res.status}.`);
    } catch (error) {
      console.warn(`IndexNow submission failed: ${error.message}`);
    }
  }
}

if (mode === 'diff') await diff();
else if (mode === 'submit') await submit();
else {
  console.error('Usage: node scripts/indexnow.mjs diff|submit [--dry-run]');
  process.exit(1);
}
