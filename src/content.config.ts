import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const danhmucCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/danhmuc" }),
  schema: z.object({
    title: z.string(),
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),
  }),
});

const sanphamCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sanpham" }),
  schema: z.object({
    title: z.string(),
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    category: z.string(),
    categoryName: z.string(),
    brand: z.string(),
    vg: z.number().optional(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    author: z.string().optional(),
    date: z.string().or(z.date()).optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),
  }),
});

export const collections = {
  'danhmuc': danhmucCollection,
  'sanpham': sanphamCollection,
  'blog': blogCollection,
};
