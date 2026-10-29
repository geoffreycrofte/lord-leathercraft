import { defineCollection } from 'astro:content';
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

export const collections = { articles };
