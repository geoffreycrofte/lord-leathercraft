/**
 * "My tools" page. Three tiers, each grouped by task.
 *
 * Seed list of common leathercraft tools, without links yet: replace or
 * complete it with the tools you actually use. Add offers (shop links,
 * affiliate links, promo codes) in `offers`; affiliate links are detected
 * and marked automatically (see src/lib/remark-affiliate-links.mjs).
 */
import type { Lang } from '../i18n/ui';

type Text = Record<Lang, string>;

export interface Offer {
  /** Shop or brand name shown on the button. */
  shop: string;
  url: string;
  /** Partner discount code, shown next to the link. */
  code?: string;
}

export interface Tool {
  id: string;
  tier: 'basic' | 'advanced' | 'pro';
  task: 'cutting' | 'marking' | 'stitching' | 'edges' | 'assembly';
  name: Text;
  description: Text;
  offers: Offer[];
}

export const tiers = {
  basic: {
    en: { title: 'The basics', intro: 'Enough to make your first cardholder or wallet from a pattern.' },
    fr: { title: 'Les outils de base', intro: 'De quoi fabriquer votre premier porte-cartes ou portefeuille à partir d’un patron.' },
  },
  advanced: {
    en: { title: 'Going further', intro: 'For cleaner edges, faster stitching and more complex pieces.' },
    fr: { title: 'Pour aller plus loin', intro: 'Pour des tranches plus nettes, une couture plus rapide et des pièces plus complexes.' },
  },
  pro: {
    en: { title: 'Pro tools', intro: 'Investments for small series and repeat work.' },
    fr: { title: 'Les outils pro', intro: 'Des investissements pour les petites séries et le travail répété.' },
  },
} as const;

export const tasks: Record<Tool['task'], Text> = {
  cutting: { en: 'Cutting', fr: 'Découpe' },
  marking: { en: 'Marking', fr: 'Traçage' },
  stitching: { en: 'Stitching', fr: 'Couture' },
  edges: { en: 'Edges', fr: 'Tranches' },
  assembly: { en: 'Assembly', fr: 'Assemblage' },
};

export const tools: Tool[] = [
  // Basic
  { id: 'cutting-mat', tier: 'basic', task: 'cutting', name: { en: 'Self-healing cutting mat', fr: 'Tapis de découpe autocicatrisant' }, description: { en: 'Protects the blade and the table. A3 is a good first size.', fr: 'Protège la lame et la table. Le format A3 est un bon début.' }, offers: [] },
  { id: 'craft-knife', tier: 'basic', task: 'cutting', name: { en: 'Craft knife with spare blades', fr: 'Cutter avec lames de rechange' }, description: { en: 'A sharp blade does most of the cutting. Change it often.', fr: 'Une lame bien affûtée fait l’essentiel de la découpe. Changez-la souvent.' }, offers: [] },
  { id: 'steel-ruler', tier: 'basic', task: 'cutting', name: { en: 'Steel ruler', fr: 'Règle en acier' }, description: { en: 'Guides straight cuts without being nicked by the blade.', fr: 'Guide les coupes droites sans être entaillée par la lame.' }, offers: [] },
  { id: 'wing-divider', tier: 'basic', task: 'marking', name: { en: 'Wing divider', fr: 'Compas d’écartement' }, description: { en: 'Marks the stitching line at an even distance from the edge.', fr: 'Trace la ligne de couture à distance régulière du bord.' }, offers: [] },
  { id: 'stitching-chisels', tier: 'basic', task: 'stitching', name: { en: 'Stitching chisels (2 and 4 prongs)', fr: 'Griffes à frapper (2 et 4 dents)' }, description: { en: 'Punch evenly spaced holes for saddle stitching.', fr: 'Percent des trous régulièrement espacés pour la couture sellier.' }, offers: [] },
  { id: 'mallet', tier: 'basic', task: 'stitching', name: { en: 'Poly mallet', fr: 'Maillet en polyamide' }, description: { en: 'Drives the chisels without damaging them.', fr: 'Frappe les griffes sans les abîmer.' }, offers: [] },
  { id: 'needles-thread', tier: 'basic', task: 'stitching', name: { en: 'Harness needles and waxed thread', fr: 'Aiguilles à bout rond et fil ciré' }, description: { en: 'Two blunt needles per stitch line, and a thread suited to the hole size.', fr: 'Deux aiguilles à bout rond par ligne de couture, et un fil adapté à la taille des trous.' }, offers: [] },
  { id: 'glue', tier: 'basic', task: 'assembly', name: { en: 'Leather glue', fr: 'Colle à cuir' }, description: { en: 'Holds the pieces in place before stitching.', fr: 'Maintient les pièces en place avant la couture.' }, offers: [] },
  { id: 'edge-beveler', tier: 'basic', task: 'edges', name: { en: 'Edge beveler', fr: 'Abat-carre' }, description: { en: 'Rounds the edges before sanding and burnishing.', fr: 'Arrondit les angles des tranches avant ponçage et lissage.' }, offers: [] },
  { id: 'sandpaper-slicker', tier: 'basic', task: 'edges', name: { en: 'Sandpaper and wooden slicker', fr: 'Papier de verre et lissoir en bois' }, description: { en: 'Sand, then burnish the edges for a smooth finish.', fr: 'Poncez, puis lissez les tranches pour une finition nette.' }, offers: [] },

  // Advanced
  { id: 'skiving-knife', tier: 'advanced', task: 'cutting', name: { en: 'Skiving knife', fr: 'Couteau à parer' }, description: { en: 'Thins the leather where layers overlap or fold.', fr: 'Affine le cuir là où les épaisseurs se superposent ou se plient.' }, offers: [] },
  { id: 'round-knife', tier: 'advanced', task: 'cutting', name: { en: 'Round knife', fr: 'Couteau à pied' }, description: { en: 'Long, precise cuts and curves in one pass.', fr: 'Des coupes longues et des courbes précises en un seul passage.' }, offers: [] },
  { id: 'stitching-pony', tier: 'advanced', task: 'stitching', name: { en: 'Stitching pony', fr: 'Pince de sellier' }, description: { en: 'Holds the piece so both hands are free to stitch.', fr: 'Tient la pièce pour coudre avec les deux mains libres.' }, offers: [] },
  { id: 'edge-creaser', tier: 'advanced', task: 'edges', name: { en: 'Edge creaser', fr: 'Fileteuse' }, description: { en: 'Adds a decorative line along the edge.', fr: 'Ajoute un filet décoratif le long de la tranche.' }, offers: [] },
  { id: 'edge-paint', tier: 'advanced', task: 'edges', name: { en: 'Edge paint and roller', fr: 'Teinture de tranche et roulette' }, description: { en: 'For coloured, sealed edges on chrome or mixed leathers.', fr: 'Pour des tranches colorées et scellées sur les cuirs chromés ou mixtes.' }, offers: [] },
  { id: 'hole-punches', tier: 'advanced', task: 'assembly', name: { en: 'Hole punches and setter', fr: 'Emporte-pièces et bouterolle' }, description: { en: 'For snaps, rivets and belt holes.', fr: 'Pour les boutons pression, rivets et trous de ceinture.' }, offers: [] },

  // Pro
  { id: 'bell-skiver', tier: 'pro', task: 'cutting', name: { en: 'Bell skiver or splitter', fr: 'Pareuse ou refendeuse' }, description: { en: 'Even thickness over whole pieces, in seconds.', fr: 'Une épaisseur régulière sur des pièces entières, en quelques secondes.' }, offers: [] },
  { id: 'strap-cutter', tier: 'pro', task: 'cutting', name: { en: 'Strap cutter', fr: 'Coupe-lanières' }, description: { en: 'Straight straps of constant width for belts and handles.', fr: 'Des lanières droites de largeur constante pour ceintures et anses.' }, offers: [] },
  { id: 'cutting-dies', tier: 'pro', task: 'cutting', name: { en: 'Cutting dies and press', fr: 'Emporte-pièces de forme et presse' }, description: { en: 'Repeatable shapes for small series.', fr: 'Des formes répétables pour les petites séries.' }, offers: [] },
  { id: 'sewing-machine', tier: 'pro', task: 'stitching', name: { en: 'Leather sewing machine', fr: 'Machine à coudre le cuir' }, description: { en: 'A cylinder-arm machine for bags and long seams.', fr: 'Une machine à bras cylindrique pour les sacs et les longues coutures.' }, offers: [] },
];
