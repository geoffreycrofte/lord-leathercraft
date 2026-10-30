import type { Lang } from '../i18n/ui';

/** Portfolio families, derived from the Notion "Tags" of each piece. */
export const families = {
  wallets: { en: 'Wallets', fr: 'Portefeuilles', tags: ['Wallet', 'Long wallet', 'Nomad Wallet', 'Coin Pocket'] },
  cardholders: { en: 'Cardholders', fr: 'Porte-cartes', tags: ['Card Holder', 'Porte-carte', 'Passport', 'Identity'] },
  belts: { en: 'Belts', fr: 'Ceintures', tags: ['Belt'] },
  watch: { en: 'Watch straps', fr: 'Bracelets de montre', tags: ['Watch'] },
  bags: { en: 'Bags and cases', fr: 'Sacs et étuis', tags: ['Handbag', 'Pouch', 'Laptop', 'Tech', 'Stationery'] },
  small: { en: 'Small goods', fr: 'Petits objets', tags: [] as string[] },
} as const;

export type Family = keyof typeof families;

/** First matching family, in the order above; "small" for everything else. */
export function familyOf(tags: unknown): Family {
  const list = Array.isArray(tags) ? (tags as string[]) : [];
  for (const [key, fam] of Object.entries(families) as [Family, (typeof families)[Family]][]) {
    if (fam.tags.some((t) => list.includes(t))) return key;
  }
  return 'small';
}

export const familyLabel = (family: Family, lang: Lang) => families[family][lang];
