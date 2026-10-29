export const languages = {
  en: 'English',
  fr: 'Français',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/**
 * Static pages with their translated paths. Each key is shared by both
 * languages so the language switcher and hreflang can find the counterpart.
 */
export const routes = {
  home: { en: '/', fr: '/fr/' },
  guides: { en: '/guides/', fr: '/fr/guides/' },
  legal: { en: '/legal-notice/', fr: '/fr/mentions-legales/' },
  privacy: { en: '/privacy/', fr: '/fr/confidentialite/' },
  affiliate: { en: '/affiliate-links/', fr: '/fr/liens-affilies/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

export const ui = {
  en: {
    'site.name': 'Lord Leathercraft',
    'site.tagline': 'Leathercraft patterns, guides and tutorials',
    'skip': 'Skip to content',
    'nav.label': 'Main',
    'nav.home': 'Home',
    'nav.guides': 'Guides',
    'nav.shop': 'Shop',
    'nav.patterns': 'Patterns',
    'nav.about': 'About',
    'lang.switch': 'Français',
    'lang.switchLong': 'Lire en français',
    'footer.social': 'Follow',
    'footer.explore': 'Explore',
    'footer.about': 'Leathercraft patterns, guides and tutorials, by Geoffrey Crofte.',
    'footer.privacyNote': 'No cookies, no tracking.',
    'footer.legal': 'Legal',
    'footer.legalNotice': 'Legal notice',
    'footer.privacy': 'Privacy',
    'footer.affiliate': 'Affiliate links',
    'breadcrumb.label': 'Breadcrumb',
    'article.published': 'Published on',
    'article.updated': 'Updated on',
    'article.related': 'Patterns for this project',
    'article.relatedShop': 'See the pattern',
    'article.readMore': 'Read the guide',
    'affiliate.notice':
      'This page contains affiliate links, marked “(affiliate link)”. If you buy through them, I earn a small commission at no extra cost to you.',
    'affiliate.learnMore': 'How affiliate links work',
    'affiliate.marker': 'affiliate link',
    'external.newShop': 'Available as PDF patterns on the Lord Leathercraft shop.',
    'video.play': 'Play the video',
    'video.notice': 'The video is hosted by YouTube (privacy-enhanced mode). It loads only when you press play.',
    'video.watchOn': 'Watch on YouTube',
    'notFound.title': 'Page not found',
    'category.care': 'Care',
    'category.design': 'Design process',
    'category.materials': 'Materials',
    'category.tools': 'Tools',
    'placeholder.photo': 'Photo coming soon',
  },
  fr: {
    'site.name': 'Lord Leathercraft',
    'site.tagline': 'Patrons, guides et tutos de maroquinerie',
    'skip': 'Aller au contenu',
    'nav.label': 'Principale',
    'nav.home': 'Accueil',
    'nav.guides': 'Guides',
    'nav.shop': 'Boutique',
    'nav.patterns': 'Patrons',
    'nav.about': 'À propos',
    'lang.switch': 'English',
    'lang.switchLong': 'Read in English',
    'footer.social': 'Suivre',
    'footer.explore': 'Explorer',
    'footer.about': 'Patrons, guides et tutos de maroquinerie, par Geoffrey Crofte.',
    'footer.privacyNote': 'Ni cookies, ni pistage.',
    'footer.legal': 'Légal',
    'footer.legalNotice': 'Mentions légales',
    'footer.privacy': 'Confidentialité',
    'footer.affiliate': 'Liens affiliés',
    'breadcrumb.label': 'Fil d’Ariane',
    'article.published': 'Publié le',
    'article.updated': 'Mis à jour le',
    'article.related': 'Les patrons pour ce projet',
    'article.relatedShop': 'Voir le patron',
    'article.readMore': 'Lire le guide',
    'affiliate.notice':
      'Cette page contient des liens affiliés, signalés par la mention « (lien affilié) ». Si vous achetez par leur biais, je touche une petite commission, sans surcoût pour vous.',
    'affiliate.learnMore': 'Comment fonctionnent les liens affiliés',
    'affiliate.marker': 'lien affilié',
    'external.newShop': 'Disponibles en patrons PDF sur la boutique Lord Leathercraft (en anglais).',
    'video.play': 'Lire la vidéo',
    'video.notice': 'La vidéo est hébergée par YouTube (mode confidentialité renforcée). Elle ne se charge que lorsque vous lancez la lecture.',
    'video.watchOn': 'Regarder sur YouTube',
    'notFound.title': 'Page introuvable',
    'category.care': 'Entretien',
    'category.design': 'Conception',
    'category.materials': 'Matières',
    'category.tools': 'Outils',
    'placeholder.photo': 'Photo à venir',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'fr' : 'en';
}

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
}

export function guidePath(lang: Lang, slug: string) {
  return `${routes.guides[lang]}${slug}/`;
}
