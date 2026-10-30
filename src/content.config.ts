import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { shopCollections, type CollectionKey } from './data/site';

const collectionKeys = Object.keys(shopCollections) as [CollectionKey, ...CollectionKey[]];

/**
 * Articles live in src/content/articles/{en,fr}/. Both versions of an article
 * share the same `translationKey`; the build fails if one is missing.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(70)
        .refine((t) => !t.includes('+'), 'No “+” in titles (Payhip turns it into a space).'),
      description: z.string().min(70).max(160),
      lang: z.enum(['en', 'fr']),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      translationKey: z.string(),
      category: z.enum(['care', 'design', 'materials', 'tools']),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      collections: z.array(z.enum(collectionKeys)).default([]),
      howTo: z
        .object({
          totalTime: z.string().optional(),
          steps: z.array(z.object({ name: z.string(), text: z.string() })).min(2),
        })
        .optional(),
      draft: z.boolean().default(false),
    })
    .refine((d) => !d.cover || d.coverAlt !== undefined, {
      message: 'coverAlt is required when cover is set (use "" for decorative images).',
    }),
});

/**
 * Blog posts: shorter, timely pieces (news, answers to comments, reactions,
 * quick tips) that link back to guides and patterns. Same bilingual rule.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z
      .object({
        title: z
          .string()
          .max(70)
          .refine((t) => !t.includes('+'), 'No “+” in titles (Payhip turns it into a space).'),
        description: z.string().min(70).max(160),
        lang: z.enum(['en', 'fr']),
        slug: z.string().regex(/^[a-z0-9-]+$/),
        translationKey: z.string(),
        kind: z.enum(['news', 'answer', 'reaction', 'tip']),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        /** translationKey of guides to suggest at the end of the post. */
        relatedGuides: z.array(z.string()).default([]),
        collections: z.array(z.enum(collectionKeys)).default([]),
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.cover || d.coverAlt !== undefined, {
        message: 'coverAlt is required when cover is set (use "" for decorative images).',
      }),
});

/**
 * Entries imported from Notion (scripts/import-notion.mjs): one JSON file
 * per Notion page, keeping its id, URL and properties as they are in Notion
 * so a new export updates them in place.
 */
const notionEntry = ({ image }: SchemaContext) =>
  z.object({
    notionId: z.string().regex(/^[0-9a-f]{32}$/),
    notionUrl: z.url(),
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    properties: z.record(z.string(), z.any()),
    createdTime: z.string().optional(),
    lastEdited: z.string().optional(),
    cover: image().nullable().default(null),
    images: z
      .array(z.object({ file: image(), caption: z.string().default(''), width: z.number().optional(), height: z.number().optional() }))
      .default([]),
    contentMarkdown: z.string().default(''),
    contentMarkdownFr: z.string().default(''),
    descriptionFr: z.string().default(''),
  });

const notionCollection = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '[!_]*.json', base: `./src/content/notion/${folder}` }),
    schema: notionEntry,
  });

export const collections = {
  articles,
  posts,
  leathers: notionCollection('leathers'),
  buckles: notionCollection('buckles'),
  threads: notionCollection('threads'),
  portfolio: notionCollection('portfolio'),
};
