/**
 * Display labels for Notion property names and select values. Notion keeps
 * the original (English) values; unknown values are shown as they are.
 */
import type { Lang } from '../i18n/ui';

type Dict = Record<string, { en: string; fr: string }>;

export const propertyLabels: Dict = {
  Skin: { en: 'Skin', fr: 'Peau' },
  'Type of skin': { en: 'Grain', fr: 'Fleur' },
  Tanning: { en: 'Tanning', fr: 'Tannage' },
  Finishing: { en: 'Finish', fr: 'Finition' },
  Fermness: { en: 'Firmness', fr: 'Fermeté' },
  'Origin of Skin': { en: 'Origin', fr: 'Origine' },
  'Max-length': { en: 'Max length', fr: 'Longueur max' },
  Type: { en: 'Type', fr: 'Type' },
  Look: { en: 'Look', fr: 'Aspect' },
  Material: { en: 'Material', fr: 'Matière' },
  'Available sizes': { en: 'Sizes', fr: 'Tailles' },
  Dimensions: { en: 'Dimensions', fr: 'Dimensions' },
  Weight: { en: 'Weight', fr: 'Poids' },
  'Leather Type': { en: 'Leathers', fr: 'Cuirs' },
  'Thread Type': { en: 'Threads', fr: 'Fils' },
  Tags: { en: 'Tags', fr: 'Étiquettes' },
  Shape: { en: 'Shape', fr: 'Forme' },
};

const values: Dict = {
  // Leathers
  Cow: { en: 'Cow', fr: 'Vache' },
  Goat: { en: 'Goat', fr: 'Chèvre' },
  Vachette: { en: 'Vachette', fr: 'Vachette' },
  Calf: { en: 'Calf', fr: 'Veau' },
  'Full Grain': { en: 'Full grain', fr: 'Pleine fleur' },
  Shoulders: { en: 'Shoulders', fr: 'Collets' },
  Varnish: { en: 'Varnished', fr: 'Vernie' },
  'Veg-Tan': { en: 'Vegetable-tanned', fr: 'Tannage végétal' },
  'Latigo (Mixed)': { en: 'Latigo (mixed)', fr: 'Latigo (mixte)' },
  'Chrome-Tan': { en: 'Chrome-tanned', fr: 'Tannage au chrome' },
  'Not protected': { en: 'Unfinished', fr: 'Sans finition' },
  'Semi-anilin + Dyed Wax': { en: 'Semi-aniline, dyed wax', fr: 'Semi-aniline, cire teintée' },
  'Anilin Pull-up oiled': { en: 'Aniline pull-up, oiled', fr: 'Aniline pull-up, huilée' },
  'Anilin + Dyed Wax': { en: 'Aniline, dyed wax', fr: 'Aniline, cire teintée' },
  'Anilin Scarfed': { en: 'Aniline, scarfed', fr: 'Aniline, effet usé' },
  'Anilin Varnished': { en: 'Aniline, varnished', fr: 'Aniline, vernie' },
  'Really soft': { en: 'Very soft', fr: 'Très souple' },
  Soft: { en: 'Soft', fr: 'Souple' },
  Moderate: { en: 'Medium', fr: 'Moyenne' },
  Hard: { en: 'Firm', fr: 'Ferme' },
  'Really hard': { en: 'Very firm', fr: 'Très ferme' },
  'Italy, Tuscany': { en: 'Italy, Tuscany', fr: 'Italie, Toscane' },
  Italy: { en: 'Italy', fr: 'Italie' },
  Spain: { en: 'Spain', fr: 'Espagne' },
  Flat: { en: 'Flat', fr: 'Plat' },
  Round: { en: 'Round', fr: 'Rond' },
  // Buckles
  'Buckle Plate': { en: 'Plate buckle', fr: 'Boucle à plaque' },
  Ardillon: { en: 'Prong buckle', fr: 'Boucle à ardillon' },
  Double: { en: 'Double prong', fr: 'Double ardillon' },
  Chrome: { en: 'Chrome', fr: 'Chromé' },
  Brass: { en: 'Brass', fr: 'Laiton' },
  'Silver Gun': { en: 'Gunmetal', fr: 'Gun metal' },
  Silver: { en: 'Silver', fr: 'Argenté' },
  Gold: { en: 'Gold', fr: 'Doré' },
  Steel: { en: 'Steel', fr: 'Acier' },
  'Solid Brass': { en: 'Solid brass', fr: 'Laiton massif' },
  'Zinc Plated + Steel': { en: 'Zinc-plated steel', fr: 'Acier zingué' },
  'Zinc Plated': { en: 'Zinc-plated', fr: 'Zingué' },
  'Nickel Plated': { en: 'Nickel-plated', fr: 'Nickelé' },
  Zamac: { en: 'Zamak', fr: 'Zamak' },
  'Satin Antique': { en: 'Antique satin', fr: 'Satiné vieilli' },
  Satin: { en: 'Satin', fr: 'Satiné' },
  Polished: { en: 'Polished', fr: 'Poli' },
  Antique: { en: 'Antique', fr: 'Vieilli' },
  Brushed: { en: 'Brushed', fr: 'Brossé' },
  Multiple: { en: 'Several', fr: 'Plusieurs' },
  // Portfolio tags
  Wallet: { en: 'Wallet', fr: 'Portefeuille' },
  'Porte-carte': { en: 'Cardholder', fr: 'Porte-cartes' },
  'Card Holder': { en: 'Cardholder', fr: 'Porte-cartes' },
  Clip: { en: 'Clip', fr: 'Attache' },
  Câble: { en: 'Cable', fr: 'Câble' },
  Cable: { en: 'Cable', fr: 'Câble' },
  Attache: { en: 'Fastener', fr: 'Attache' },
  Minimaliste: { en: 'Minimalist', fr: 'Minimaliste' },
  Minimalist: { en: 'Minimalist', fr: 'Minimaliste' },
  Passport: { en: 'Passport', fr: 'Passeport' },
  Travel: { en: 'Travel', fr: 'Voyage' },
  Documents: { en: 'Documents', fr: 'Documents' },
  Identity: { en: 'ID', fr: 'Identité' },
  Lighter: { en: 'Lighter', fr: 'Briquet' },
  Lifestyle: { en: 'Lifestyle', fr: 'Quotidien' },
  Smoker: { en: 'Smoker', fr: 'Fumeur' },
  BBQ: { en: 'BBQ', fr: 'Barbecue' },
  Watch: { en: 'Watch', fr: 'Montre' },
  Strap: { en: 'Strap', fr: 'Bracelet' },
  Accessories: { en: 'Accessories', fr: 'Accessoires' },
  artist: { en: 'Artist', fr: 'Artiste' },
  work: { en: 'Work', fr: 'Travail' },
  Belt: { en: 'Belt', fr: 'Ceinture' },
  Wearable: { en: 'Wearable', fr: 'À porter' },
  Earings: { en: 'Earrings', fr: 'Boucles d’oreilles' },
  Jewelry: { en: 'Jewellery', fr: 'Bijoux' },
  Bookmark: { en: 'Bookmark', fr: 'Marque-page' },
  Book: { en: 'Book', fr: 'Livre' },
  'Coin Pocket': { en: 'Coin pocket', fr: 'Porte-monnaie' },
  Tech: { en: 'Tech', fr: 'Tech' },
  Laptop: { en: 'Laptop', fr: 'Ordinateur' },
  'Nomad Wallet': { en: 'Nomad wallet', fr: 'Portefeuille nomade' },
  Stationery: { en: 'Stationery', fr: 'Papeterie' },
  Handbag: { en: 'Handbag', fr: 'Sac à main' },
  Luxury: { en: 'Luxury', fr: 'Luxe' },
  Pouch: { en: 'Pouch', fr: 'Pochette' },
  'Long wallet': { en: 'Long wallet', fr: 'Portefeuille long' },
  Bracelet: { en: 'Bracelet', fr: 'Bracelet' },
  Wristband: { en: 'Wristband', fr: 'Manchette' },
  Guitar: { en: 'Guitar', fr: 'Guitare' },
};

const empty = new Set(['N/C', 'Unknown', 'Read the description', '']);

export function label(name: string, lang: Lang) {
  return propertyLabels[name]?.[lang] ?? name;
}

/** Translated value, or null for empty/unknown placeholders. */
export function value(raw: unknown, lang: Lang): string | null {
  if (raw === null || raw === undefined) return null;
  const text = String(raw).trim();
  if (empty.has(text)) return null;
  return values[text]?.[lang] ?? text;
}

/** Translated list from a multi-select (array) or a single select value. */
export function valueList(raw: unknown, lang: Lang): string[] {
  const list = Array.isArray(raw) ? raw : [raw];
  return [...new Set(list.map((v) => value(v, lang)).filter((v): v is string => Boolean(v)))];
}
