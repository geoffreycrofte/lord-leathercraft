import { SHOP_URL } from './site';
import { routes, type Lang, type UIKey } from '../i18n/ui';

export interface NavItem {
  label: UIKey;
  href: (lang: Lang) => string;
  external?: boolean;
}

/** Main navigation, in display order. */
export const mainNav: NavItem[] = [
  { label: 'nav.guides', href: (l) => routes.guides[l] },
  { label: 'nav.materials', href: (l) => routes.materials[l] },
  { label: 'nav.tools', href: (l) => routes.tools[l] },
  { label: 'nav.portfolio', href: (l) => routes.portfolio[l] },
  { label: 'nav.shop', href: () => SHOP_URL, external: true },
  { label: 'nav.blog', href: (l) => routes.blog[l] },
];
