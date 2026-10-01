import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const danhmucCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/danhmuc" }),
  schema: z.object({
    title: z.string(), // H1
    nav_label: z.string().optional(), // Tên ngắn trên menu
    summary: z.string().optional(), // Mô tả ngắn trên thẻ danh mục ở trang chủ
    order: z.number().optional(), // Thứ tự trên menu và trang chủ
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(), // Chỉ dùng khi cần canonical khác URL của trang
    reviewed_by: z.string().optional(), // Người duyệt kỹ thuật (E-E-A-T)
    updated: z.coerce.date().optional(),
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
    sku: z.string().optional(),
    vg: z.number().optional(), // Dầu: cấp ISO VG
    nlgi: z.string().optional(), // Mỡ: cấp NLGI, ví dụ "2" hoặc "0/1"
    standards: z.array(z.string()).optional(), // Ví dụ "ISO 11158 HM", "DIN 51524-2 HLP"
    specs: z.array(z.object({ name: z.string(), value: z.string(), method: z.string().optional() })).optional(),
    packaging: z.array(z.string()).optional(), // Ví dụ ["Phuy 209L", "Xô 20L"]
    equivalents: z.array(z.string()).optional(), // Tên sản phẩm tương đương các hãng
    tds_url: z.string().optional(),
    sds_url: z.string().optional(),
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
    author_title: z.string().optional(), // Chức vụ, kinh nghiệm của tác giả (E-E-A-T)
    date: z.string().or(z.date()).optional(),
    updated: z.string().or(z.date()).optional(),
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
