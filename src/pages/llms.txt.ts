/**
 * llms.txt (https://llmstxt.org/): a Markdown overview of the site for
 * language models, generated at build time from the content collections so
 * it never drifts. English first, with the French version of each page.
 */
import type { APIRoute } from 'astro';
import { AUTHOR, SHOP_URL, socials } from '../data/site';
import { routes, useTranslations } from '../i18n/ui';
import { getArticleAlternates, getArticles, type Article } from '../lib/articles';
import { getPostAlternates, getPosts } from '../lib/posts';
import { getLeathers, getPieces } from '../lib/notion';

const t = useTranslations('en');
const categoryTitles: Record<Article['data']['category'], string> = {
  materials: 'Guides: leather and materials',
  tools: 'Guides: tools and projects',
  care: 'Guides: care',
  design: 'Guides: pattern design',
};

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const line = (title: string, path: string, description: string, frPath?: string) =>
    `- [${title}](${abs(path)}): ${description}${frPath ? ` French: ${abs(frPath)}` : ''}`;

  const articles = await getArticles('en');
  const posts = await getPosts('en');
  const [leathers, pieces] = await Promise.all([getLeathers(), getPieces()]);

  const sections: string[] = [];
  for (const category of Object.keys(categoryTitles) as Article['data']['category'][]) {
    const items = articles.filter((a) => a.data.category === category);
    if (items.length === 0) continue;
    const lines = await Promise.all(
      items.map(async (a) => {
        const alternates = await getArticleAlternates(a);
        return line(a.data.title, alternates.en, a.data.description, alternates.fr);
      }),
    );
    sections.push(`## ${categoryTitles[category]}\n\n${lines.join('\n')}`);
  }

  const postLines = await Promise.all(
    posts.map(async (p) => {
      const alternates = await getPostAlternates(p);
      return line(p.data.title, alternates.en, p.data.description, alternates.fr);
    }),
  );

  const body = `# ${t('site.name')}

> ${t('site.tagline')} by ${AUTHOR}, a leather craftsman in France. Free guides on leather types, finishes, tools and techniques, the tools and materials he actually uses, and a portfolio of handmade pieces. Bilingual site: English at the root, French under /fr/.

- PDF leather patterns are sold on the shop: ${SHOP_URL}/ (in English).
- Every guide is written from first-hand experience; affiliate links are marked rel="sponsored" and disclosed at the top of the page.
- Follow: ${socials.map((s) => `${s.name} ${s.url}`).join(', ')}.

${sections.join('\n\n')}

## Tools, materials and portfolio

${[
    line('My tools', routes.tools.en, 'The leathercraft tools I use, from a beginner kit to higher quality tools, with where to buy them.', routes.tools.fr),
    line('My materials', routes.materials.en, `The ${leathers.length} leathers I work with (tannery, tanning, finish), plus the threads and buckles.`, routes.materials.fr),
    line('Portfolio', routes.portfolio.en, `${pieces.length} handmade leather pieces, with the leathers and patterns used.`, routes.portfolio.fr),
    line('Guides', routes.guides.en, 'Pro tips before starting a pattern, and every guide by topic.', routes.guides.fr),
  ].join('\n')}

## Optional

${[
    ...postLines,
    line('Blog', routes.blog.en, 'Short news and answers, each linking back to a guide or a pattern.', routes.blog.fr),
    line('Affiliate links', routes.affiliate.en, 'How affiliate links are used and disclosed.', routes.affiliate.fr),
  ].join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
