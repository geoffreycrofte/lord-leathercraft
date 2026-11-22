// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkAffiliateLinks } from './src/lib/remark-affiliate-links.mjs';
import { rehypeTableWrap } from './src/lib/rehype-table-wrap.mjs';

export default defineConfig({
  site: 'https://lord.crofte.fr',
  trailingSlash: 'always',
  // Keep the whitespace around inline links written on their own line.
  compressHTML: false,
  // Old addresses served by Nginx on the VPS before the move to GitHub Pages.
  // Each one becomes a page that redirects at once (meta refresh + canonical).
  // /blo/<id> takes a number, so it is handled in src/pages/404.astro.
  redirects: {
    '/products': '/portfolio/',
    '/patterns': 'https://shop.crofte.fr/',
    '/wallet': '/guides/leather-wallet-making-guide/',
    '/belt': '/guides/leather-belt-making-guide/',
    '/video-wings2': 'https://youtu.be/VO63oQ0wD3Y',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkAffiliateLinks], rehypePlugins: [rehypeTableWrap] }),
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
      // Redirect pages are not real pages: keep them out of the sitemap.
      filter: (page) => !page.includes('/404') && !/\/(products|patterns|wallet|belt|video-wings2)\/$/.test(page),
    }),
  ],
});
