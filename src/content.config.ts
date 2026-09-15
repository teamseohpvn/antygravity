import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    categoryName: z.string(),
    brand: z.string(),
    vg: z.number().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const supportCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/support" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().default('Dầu Công Nghiệp Pro'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'products': productsCollection,
  'support': supportCollection,
};
