/**
 * Renders the Markdown body exported from a Notion page. The export marks
 * each image with a `{{image:N}}` line and internal Notion links as
 * `(notion:<id>)`; this splits the body into HTML chunks and image slots,
 * and points Notion links to the matching page of this site.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { remarkAffiliateLinks } from './remark-affiliate-links.mjs';

export type BodyPart = { type: 'html'; html: string } | { type: 'image'; index: number };

let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | undefined;

/** Resolve `notion:<id>` links. Return a site path, or undefined to drop the link and keep its text. */
export type NotionLinkResolver = (notionId: string) => string | undefined;

export async function renderNotionBody(markdown: string, resolve: NotionLinkResolver, lang: 'en' | 'fr') {
  processor ??= await createMarkdownProcessor({ remarkPlugins: [remarkAffiliateLinks] });
  const linked = markdown.replace(/\[([^\]]*)\]\(notion:([0-9a-f]{32})[^)]*\)/g, (_, text: string, id: string) => {
    const href = resolve(id);
    return href ? `[${text}](${href})` : text;
  });

  const parts: BodyPart[] = [];
  let hasAffiliateLinks = false;
  for (const chunk of linked.split(/^\{\{image:(\d+)\}\}\s*$/m)) {
    if (/^\d+$/.test(chunk)) {
      parts.push({ type: 'image', index: Number(chunk) - 1 });
      continue;
    }
    if (!chunk.trim()) continue;
    // The language decides the affiliate marker wording.
    const result = await processor.render(chunk, { fileURL: new URL(`file:///notion/${lang}/body.md`) });
    if (result.metadata.frontmatter?.hasAffiliateLinks) hasAffiliateLinks = true;
    parts.push({ type: 'html', html: result.code });
  }
  return { parts, hasAffiliateLinks };
}
