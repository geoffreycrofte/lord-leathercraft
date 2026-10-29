// Marks affiliate links with rel="sponsored noopener" and flags the page so
// the layout can display the transparency notice. Detection is by host or
// by referral query parameter, so authors just paste the raw link.
import { visit } from 'unist-util-visit';

const AFFILIATE_HOSTS = [
  'amzn.to',
  'amzn.eu',
  's.click.aliexpress.com',
  'a.aliexpress.com',
];
const AFFILIATE_PARAMS = ['fp_ref', 'tag', 'aff', 'aff_id', 'ref_id'];

export function isAffiliateUrl(href) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return false;
  }
  const host = url.hostname.replace(/^www\./, '');
  if (AFFILIATE_HOSTS.includes(host)) return true;
  if (/(^|\.)amazon\.[a-z.]+$/.test(host) && url.searchParams.has('tag')) return true;
  if (/(^|\.)aliexpress\.[a-z.]+$/.test(host) && /aff/i.test(url.search)) return true;
  return AFFILIATE_PARAMS.some((p) => url.searchParams.has(p));
}

const MARKERS = { en: 'affiliate link', fr: 'lien affilié' };

export function remarkAffiliateLinks() {
  return (tree, file) => {
    const path = file.history?.[0] ?? '';
    const marker = /[\\/]fr[\\/]/.test(path) ? MARKERS.fr : MARKERS.en;
    let found = false;
    visit(tree, 'link', (node) => {
      if (!isAffiliateUrl(node.url)) return;
      found = true;
      node.data ??= {};
      node.data.hProperties = { ...node.data.hProperties, rel: 'sponsored noopener' };
      // Visible marker, inside the link so it is part of its accessible name.
      node.children.push({
        type: 'text',
        value: ` (${marker})`,
        data: { hName: 'span', hProperties: { className: ['affiliate-marker'] } },
      });
    });
    if (found) {
      file.data.astro ??= {};
      file.data.astro.frontmatter ??= {};
      file.data.astro.frontmatter.hasAffiliateLinks = true;
    }
  };
}
