import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // Lưu thẳng vào Github Repo
    kind: 'github',
    repo: {
      owner: 'teamseohpvn',
      name: 'antygravity'
    }
  },
  collections: {
    products: collection({
      label: 'Sản Phẩm (Products)',
      slugField: 'title',
      path: 'src/content/products/*',
      format: { contentField: 'content' }, // Lưu phần rich-text vào body của file MD
      schema: {
        title: fields.slug({ name: { label: 'Tên Sản Phẩm' } }),
        description: fields.text({ label: 'Mô tả ngắn' }),
        category: fields.text({ label: 'Mã Danh Mục (Slug - VD: dau-thuy-luc)' }),
        categoryName: fields.text({ label: 'Tên Danh Mục (VD: Dầu Thủy Lực)' }),
        brand: fields.text({ label: 'Thương Hiệu' }),
        vg: fields.integer({ label: 'Độ nhớt (VG)' }),
        image: fields.image({
          label: 'Ảnh đại diện sản phẩm',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { 
          label: 'Từ khóa SEO (Tags)', 
          itemLabel: props => props.value 
        }),
        content: fields.document({
          label: 'Nội dung chi tiết',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/content',
            publicPath: '/images/content/',
          }
        }),
      },
    }),
    support: collection({
      label: 'Bài Viết Kỹ Thuật (Blog)',
      slugField: 'title',
      path: 'src/content/support/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Tiêu đề bài viết' } }),
        description: fields.text({ label: 'Mô tả ngắn' }),
        date: fields.date({ label: 'Ngày đăng (YYYY-MM-DD)' }),
        author: fields.text({ label: 'Tác giả' }),
        image: fields.image({
          label: 'Ảnh đại diện bài viết',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { 
          label: 'Từ khóa SEO (Tags)', 
          itemLabel: props => props.value 
        }),
        content: fields.document({
          label: 'Nội dung bài viết',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/content',
            publicPath: '/images/content/',
          }
        }),
      }
    })
  },
});
