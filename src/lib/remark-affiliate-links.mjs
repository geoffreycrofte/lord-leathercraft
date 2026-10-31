// Marks affiliate links with rel="sponsored noopener" and flags the page so
// the layout can display the transparency notice. Detection is by host or
// by referral query parameter, so authors just paste the raw link.
import { visit } from 'unist-util-visit';

const AFFILIATE_HOSTS = [
  'amzn.to',
  'amzn.eu',
  's.click.aliexpress.com',
  'a.aliexpress.com',
  // Awin short links (KemovanCraft).
  'tidd.ly',
  // Partner shop with the LORD7 discount code.
  'buyleatheronline.com',
];
// Short links that hide a referral program (Decocuir: Smile.io referral).
const AFFILIATE_URLS = ['https://bit.ly/decocuirfr'];
// sca_ref: Shopify affiliate programs (Leatherbox, Sinabroks).
const AFFILIATE_PARAMS = ['fp_ref', 'tag', 'aff', 'aff_id', 'ref_id', 'sca_ref'];

export function isAffiliateUrl(href) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return false;
  }
  if (AFFILIATE_URLS.includes(href.replace(/\/$/, ''))) return true;
  const host = url.hostname.replace(/^www\./, '');
  if (AFFILIATE_HOSTS.includes(host)) return true;
  if (/(^|\.)amazon\.[a-z.]+$/.test(host) && url.searchParams.has('tag')) return true;
  if (/(^|\.)aliexpress\.[a-z.]+$/.test(host) && /aff/i.test(url.search)) return true;
  return AFFILIATE_PARAMS.some((p) => url.searchParams.has(p));
}

export function remarkAffiliateLinks() {
  return (tree, file) => {
    let found = false;
    visit(tree, 'link', (node) => {
      if (!isAffiliateUrl(node.url)) return;
      found = true;
      node.data ??= {};
      node.data.hProperties = { ...node.data.hProperties, rel: 'sponsored noopener' };
    });
    if (found) {
      file.data.astro ??= {};
      file.data.astro.frontmatter ??= {};
      file.data.astro.frontmatter.hasAffiliateLinks = true;
    }
  };
}
