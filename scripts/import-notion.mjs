#!/usr/bin/env node
/**
 * Imports a Notion export (one JSON file per Notion page, plus its images)
 * into the site's content collections. Run it again after a new export to
 * update the site: entries are matched by Notion id, so slugs and manual
 * additions (supplier links live elsewhere) are kept.
 *
 *   node scripts/import-notion.mjs <export-dir>
 *
 * <export-dir> holds `leathers/`, `buckles/`, `threads/` and `products/`,
 * each with `<notionId>.json` and a `<notionId>/` image folder. See
 * docs/notion.md for the export format.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';

const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error('Usage: node scripts/import-notion.mjs <export-dir>');
  process.exit(1);
}

const targets = {
  leathers: 'src/content/notion/leathers',
  buckles: 'src/content/notion/buckles',
  threads: 'src/content/notion/threads',
  products: 'src/content/notion/portfolio',
};

const hash = (file) => (existsSync(file) ? createHash('md5').update(readFileSync(file)).digest('hex') : null);

/**
 * Notion turns "word.It" at the end of a sentence into a link to
 * http://word.It: drop links whose host ends with a capitalised "TLD".
 */
const cleanMarkdown = (md = '') => md.replace(/\[([^\]]*)\]\(https?:\/\/[^/)\s]*\.[A-Z][A-Za-z]*\/?\)/g, '$1');

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

for (const [kind, target] of Object.entries(targets)) {
  const from = resolve(source, kind);
  if (!existsSync(from)) {
    console.warn(`skip ${kind}: no folder`);
    continue;
  }
  mkdirSync(target, { recursive: true });

  // Existing slugs are kept so URLs never change on re-import.
  const existing = new Map();
  for (const file of readdirSync(target).filter((f) => /^[0-9a-f]{32}\.json$/.test(f))) {
    const entry = JSON.parse(readFileSync(join(target, file), 'utf8'));
    existing.set(entry.notionId, entry.slug);
  }
  const used = new Set(existing.values());

  const files = readdirSync(from).filter((f) => /^[0-9a-f]{32}\.json$/.test(f));
  for (const file of files) {
    const entry = JSON.parse(readFileSync(join(from, file), 'utf8'));
    const id = entry.notionId;
    let slug = existing.get(id);
    if (!slug) {
      const base = slugify(entry.name) || id;
      slug = base;
      for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
      used.add(slug);
    }
    const local = (path) => (path ? `./${path}` : null);
    // Point to the file that really exists (the export may name another extension).
    const existing_ = (path) => {
      if (!path) return null;
      if (existsSync(join(from, path))) return path;
      const stem = path.replace(/\.[a-z]+$/i, '');
      const alt = ['.jpg', '.jpeg', '.png', '.webp'].map((ext) => stem + ext).find((p) => existsSync(join(from, p)));
      if (!alt) console.warn(`  ${id}: missing image ${path}, skipped`);
      return alt ?? null;
    };
    entry.cover = existing_(entry.cover);
    // Drop missing images and renumber the {{image:N}} markers accordingly.
    const kept = [];
    const renumber = new Map();
    (entry.images ?? []).forEach((img, i) => {
      const file = existing_(img.file);
      if (!file) return;
      kept.push({ ...img, caption: img.caption ?? '', file });
      renumber.set(i + 1, kept.length);
    });
    entry.images = kept;
    const fixMarkers = (md = '') =>
      md.replace(/^\{\{image:(\d+)\}\}\s*$/gm, (_, n) => (renumber.has(+n) ? `{{image:${renumber.get(+n)}}}` : ''));
    entry.contentMarkdown = fixMarkers(entry.contentMarkdown);
    entry.contentMarkdownFr = fixMarkers(entry.contentMarkdownFr);
    // A cover identical to a body image points to that image instead.
    let cover = entry.cover;
    const coverHash = cover && hash(join(from, cover));
    const twin = coverHash && (entry.images ?? []).find((img) => hash(join(from, img.file)) === coverHash);
    if (twin) cover = twin.file;
    const out = {
      ...entry,
      slug,
      descriptionFr: entry.descriptionFr ?? '',
      contentMarkdown: cleanMarkdown(entry.contentMarkdown),
      contentMarkdownFr: cleanMarkdown(entry.contentMarkdownFr),
      cover: local(cover),
      images: (entry.images ?? []).map((img) => ({ ...img, file: local(img.file) })),
    };
    writeFileSync(join(target, `${id}.json`), `${JSON.stringify(out, null, 2)}\n`);
    rmSync(join(target, id), { recursive: true, force: true });
    if (existsSync(join(from, id))) {
      cpSync(join(from, id), join(target, id), {
        recursive: true,
        filter: (src) => !(twin && src.endsWith(entry.cover)),
      });
    }
  }

  for (const extra of ['_database.json']) {
    if (existsSync(join(from, extra))) cpSync(join(from, extra), join(target, extra));
  }
  const gone = [...existing.keys()].filter((id) => !files.includes(`${id}.json`));
  console.log(`${kind}: ${files.length} entries${gone.length ? `, ${gone.length} no longer in Notion: ${gone.join(', ')}` : ''}`);
}

// Keep the repository light: resize and compress the imported photos.
execFileSync(process.execPath, ['scripts/optimize-images.mjs', ...Object.values(targets).filter(existsSync)], { stdio: 'inherit' });
