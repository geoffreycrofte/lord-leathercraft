/**
 * Renders the Markdown body exported from a Notion page. The export marks
 * each image with a `{{image:N}}` line and internal Notion links as
 * `(notion:<id>)`; this splits the body into HTML chunks, image slots and
 * YouTube videos,
 * and points Notion links to the matching page of this site.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { remarkAffiliateLinks } from './remark-affiliate-links.mjs';

export type BodyPart =
  | { type: 'html'; html: string }
  | { type: 'image'; index: number }
  | { type: 'video'; id: string };

/** A paragraph that is only a link to a YouTube video becomes an embedded player. */
const videoLine = /^\[[^\]]*\]\(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})[^)]*\)\s*$/;

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
  let buffer: string[] = [];
  const flush = async () => {
    const chunk = buffer.join('\n');
    buffer = [];
    if (!chunk.trim()) return;
    // The file path tells the affiliate plugin which language to use.
    const result = await processor!.render(chunk, { fileURL: new URL(`file:///notion/${lang}/body.md`) });
    if (result.metadata.frontmatter?.hasAffiliateLinks) hasAffiliateLinks = true;
    parts.push({ type: 'html', html: result.code });
  };

  for (const line of linked.split('\n')) {
    const image = line.match(/^\{\{image:(\d+)\}\}\s*$/);
    const video = line.match(videoLine);
    if (!image && !video) {
      buffer.push(line);
      continue;
    }
    await flush();
    parts.push(image ? { type: 'image', index: Number(image[1]) - 1 } : { type: 'video', id: video![1] });
  }
  await flush();
  return { parts, hasAffiliateLinks };
}
