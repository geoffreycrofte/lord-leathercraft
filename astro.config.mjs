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
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
