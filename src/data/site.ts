export const SHOP_URL = 'https://shop.crofte.fr';
export const PAYHIP_AFFILIATE_URL = 'https://payhip.com/?fp_ref=geoffrey91';
/**
 * Amazon France Associates tag (ends with -21). When set, Amazon links on the
 * French pages go to amazon.fr instead of the amzn.to links (amazon.com).
 */
export const AMAZON_FR_TAG = 'lordleathercraft-21';
export const AUTHOR = 'Geoffrey Crofte';

/** Payhip collections. Product pages are on the shop, in English. */
export const shopCollections = {
  all: { url: `${SHOP_URL}/collection/leathercraft-pdf-patterns`, en: 'All leathercraft patterns', fr: 'Tous les patrons de maroquinerie' },
  wallets: { url: `${SHOP_URL}/collection/leather-wallet-patterns`, en: 'Wallet patterns', fr: 'Patrons de portefeuilles' },
  cardholders: { url: `${SHOP_URL}/collection/leather-cardholders-patterns`, en: 'Cardholder patterns', fr: 'Patrons de porte-cartes' },
  bags: { url: `${SHOP_URL}/collection/leather-bags-purses-pdf-template`, en: 'Bag and purse patterns', fr: 'Patrons de sacs et pochettes' },
  deskHome: { url: `${SHOP_URL}/collection/leather-desk-home-equipment-pdf-patterns`, en: 'Desk and home patterns', fr: 'Patrons pour le bureau et la maison' },
  wears: { url: `${SHOP_URL}/collection/wears`, en: 'Patterns for wearables', fr: 'Patrons d’accessoires à porter' },
  laptopSleeves: { url: `${SHOP_URL}/collection/laptop-sleeve-case-patterns`, en: 'Laptop sleeve patterns', fr: 'Patrons de housses d’ordinateur' },
  handmade: { url: `${SHOP_URL}/collection/handmade-leather-products`, en: 'Handmade leather goods', fr: 'Objets en cuir faits main' },
} as const;

export type CollectionKey = keyof typeof shopCollections;

/** Social profiles. `icon` is a Simple Icons slug. */
export const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/lordleathercraft/', icon: 'instagram' },
  { name: 'YouTube', url: 'https://www.youtube.com/@lordleathercraft', icon: 'youtube' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@lordleathercraft', icon: 'tiktok' },
  { name: 'Facebook', url: 'https://www.facebook.com/lordleathercraft', icon: 'facebook' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/geoffreycrofte/leathercraft/', icon: 'pinterest' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/geoffreycrofte.bsky.social', icon: 'bluesky' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/lordleathercraft', icon: 'reddit' },
] as const;

/** Public contact address, shown on the legal pages. */
export const CONTACT_EMAIL = 'geoffrey.crofte+leathercraft@gmail.com';
