// Lấy bài viết đang bật (active: true). Mọi trang dùng các hàm này thay cho getCollection
// để bài tắt không lọt vào menu, danh sách, sitemap hay getStaticPaths.
// Sản phẩm chỉ hiện khi danh mục của nó cũng đang bật.
import { getCollection } from 'astro:content';

export const getActiveCategories = () => getCollection('danhmuc', ({ data }) => data.active);

export async function getActiveProducts() {
  const cats = new Set((await getActiveCategories()).map((c) => c.id));
  return getCollection('sanpham', ({ data }) => data.active && cats.has(data.category));
}

export const getActivePosts = () => getCollection('blog', ({ data }) => data.active);

/** URL của mọi bài đang tắt (kể cả sản phẩm thuộc danh mục đang tắt), để bỏ link tới chúng trong thân bài. */
export async function getHiddenPaths() {
  const [cats, products, posts] = await Promise.all([getActiveCategories(), getActiveProducts(), getActivePosts()]);
  const shown = new Set([
    ...cats.map((c) => `/${c.id}`),
    ...products.map((p) => `/${p.data.category}/${p.id}`),
    ...posts.map((p) => `/ho-tro-ky-thuat/${p.id}`),
  ]);
  const all = [
    ...(await getCollection('danhmuc')).map((c) => `/${c.id}`),
    ...(await getCollection('sanpham')).map((p) => `/${p.data.category}/${p.id}`),
    ...(await getCollection('blog')).map((p) => `/ho-tro-ky-thuat/${p.id}`),
  ];
  return new Set(all.filter((path) => !shown.has(path)));
}
