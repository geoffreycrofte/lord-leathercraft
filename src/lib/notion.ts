import { getCollection, type CollectionEntry } from 'astro:content';
import { routes, type Lang } from '../i18n/ui';
import type { NotionLinkResolver } from './notion-markdown';

export type Leather = CollectionEntry<'leathers'>;
export type Buckle = CollectionEntry<'buckles'>;
export type Thread = CollectionEntry<'threads'>;
export type Piece = CollectionEntry<'portfolio'>;

const byName = <T extends { data: { name: string } }>(a: T, b: T) => a.data.name.localeCompare(b.data.name);

export const getLeathers = async () => (await getCollection('leathers')).sort(byName);
export const getBuckles = async () => (await getCollection('buckles')).sort(byName);
export const getThreads = async () => (await getCollection('threads')).sort(byName);

/** Portfolio pieces, newest first. */
export const getPieces = async () =>
  (await getCollection('portfolio')).sort((a, b) => (b.data.createdTime ?? '').localeCompare(a.data.createdTime ?? ''));

export const leatherPath = (lang: Lang, slug: string) => `${routes.materials[lang]}${slug}/`;
export const piecePath = (lang: Lang, slug: string) => `${routes.portfolio[lang]}${slug}/`;
export const materialAnchor = (lang: Lang, notionId: string) => `${routes.materials[lang]}#m-${notionId}`;

/** Maps Notion ids to pages of this site, for relations and links in page bodies. */
export async function notionLinkResolver(lang: Lang): Promise<NotionLinkResolver> {
  const [leathers, buckles, threads, pieces] = await Promise.all([getLeathers(), getBuckles(), getThreads(), getPieces()]);
  const map = new Map<string, string>();
  leathers.forEach((l) => map.set(l.data.notionId, leatherPath(lang, l.data.slug)));
  pieces.forEach((p) => map.set(p.data.notionId, piecePath(lang, p.data.slug)));
  [...buckles, ...threads].forEach((m) => map.set(m.data.notionId, materialAnchor(lang, m.data.notionId)));
  // The old Notion "Types of leather" and "Products" pages.
  map.set('b82a8bf9ee1040e0816e7a0581027cbd', routes.materials[lang]);
  map.set('cc36f9a753bf47f39faa97be9d6c82d2', routes.portfolio[lang]);
  map.set('f7ed2e88a2df4188a59cd06ef6550ae8', routes.portfolio[lang]);
  return (id) => map.get(id);
}

/** Notion relation property → the related entries that exist on the site. */
export function related<T extends { data: { notionId: string } }>(ids: unknown, pool: T[]): T[] {
  if (!Array.isArray(ids)) return [];
  return ids.map((id) => pool.find((e) => e.data.notionId === id)).filter((e): e is T => Boolean(e));
}
