/**
 * Where to buy each material, shown next to it on the "My materials" page.
 * Keyed by Notion id (the `notionId` of a leather, thread or buckle in
 * src/content/notion/), so a new Notion import keeps these links.
 *
 * Example:
 *   '06d43575cf214a509054f795aa25c597': [
 *     { shop: 'My supplier', url: 'https://…', code: 'LORD10' },
 *   ],
 */
import type { Offer } from './tools';

export const materialOffers: Record<string, Offer[]> = {};
