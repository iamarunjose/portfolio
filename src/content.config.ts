import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    category: z.string(),
    status: z.enum(['draft', 'published']).default('draft'),
    issueCode: z.string(),
    readingTime: z.string(),
    accentColor: z.enum(['yellow', 'pink', 'teal', 'blue']),
    order: z.number(),
    tags: z.array(z.string())
  })
});

export const collections = { writing };

