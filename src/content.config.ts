// Cấu trúc nội dung: xem docs/CAU-TRUC-NOI-DUNG.md.
// Tên file .md là slug của URL. Mọi trường mới đều tùy chọn để file cũ vẫn chạy.
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Ảnh kèm alt. Chấp nhận cả dạng cũ (chỉ đường dẫn) để không phải sửa file cũ ngay.
const imageItem = z.union([
  z.string(),
  z.object({
    src: z.string(), // "/images/san-pham/eneos-super-hyrando-68-phuy-209l.webp"
    alt: z.string(), // Mô tả thật của ảnh, tiếng Việt có dấu, <= 125 ký tự
  }),
]);

// Mã bài viết nội bộ: DM-01, SP-THL-001, BV-001. Không trùng, không tái sử dụng.
const contentCode = z.string().regex(/^(DM|SP|BV)-[A-Z0-9-]+$/, 'Mã bài viết dạng DM-01, SP-THL-001, BV-001');

// Bật / tắt bài: chỉ bài có `active: true` mới được build và hiển thị. Thiếu trường = tắt.
// Lọc ở src/lib/content.ts (getActive...), bỏ link tới bài tắt ở src/lib/active-pages.mjs.
const active = z.boolean().default(false);

// Ngày đăng / ngày cập nhật (YYYY-MM-DD). Xem docs/CAU-TRUC-NOI-DUNG.md mục "Ngày đăng và ngày cập nhật".
//   date: ngày bài lên web lần đầu, không bao giờ đổi.
//   updated: ngày sửa nội dung thật (thông số, đoạn văn, bảng). Sửa lỗi chính tả, đổi ảnh thì không đổi ngày.
const ngay = z.coerce.date();
const kiemTraNgay = (d: { date?: Date; updated?: Date }, ctx: z.RefinementCtx) => {
  const today = new Date(new Date().toISOString().slice(0, 10));
  if (d.date && d.date > today) ctx.addIssue({ code: 'custom', path: ['date'], message: 'Ngày đăng không được ở tương lai' });
  if (d.updated && d.updated > today) ctx.addIssue({ code: 'custom', path: ['updated'], message: 'Ngày cập nhật không được ở tương lai' });
  if (d.date && d.updated && d.updated < d.date) ctx.addIssue({ code: 'custom', path: ['updated'], message: 'Ngày cập nhật phải bằng hoặc sau ngày đăng' });
};

const danhmucCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/danhmuc" }),
  schema: z.object({
    ma: contentCode.optional(),
    active,
    title: z.string(), // H1
    nav_label: z.string().optional(), // Tên ngắn trên menu
    summary: z.string().optional(), // Mô tả ngắn trên thẻ danh mục ở trang chủ
    order: z.number().optional(), // Thứ tự trên menu và trang chủ
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(), // Chỉ dùng khi cần canonical khác URL của trang
    reviewed_by: z.string().optional(), // Người duyệt kỹ thuật (E-E-A-T)
    date: ngay.optional(), // Ngày đăng
    updated: ngay.optional(), // Ngày cập nhật
  }).superRefine(kiemTraNgay),
});

const sanphamCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sanpham" }),
  schema: z.object({
    ma: contentCode.optional(),
    active,
    title: z.string(),
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    category: z.string(),
    categoryName: z.string(),
    brand: z.string(),
    origin: z.string().optional(), // Xuất xứ, ví dụ "Nhật Bản", "Việt Nam"
    sku: z.string().optional(), // Mã HH trong phần mềm kho (khi chỉ có 1 quy cách)
    vg: z.number().optional(), // Dầu: cấp ISO VG
    nlgi: z.string().optional(), // Mỡ: cấp NLGI, ví dụ "2" hoặc "0/1"
    sae: z.string().optional(), // Dầu động cơ / dầu cầu: "15W-40", "85W-140"
    api: z.string().optional(), // Cấp API: "CI-4", "GL-5"
    base_oil: z.string().optional(), // "Dầu gốc khoáng", "Tổng hợp PAO"
    standards: z.array(z.string()).optional(), // Ví dụ "ISO 11158 HM", "DIN 51524-2 HLP"
    // Thông số điển hình theo TDS: màu, tỷ trọng, độ nhớt, VI, điểm chớp cháy, điểm đông đặc...
    specs: z.array(z.object({ name: z.string(), value: z.string(), method: z.string().optional() })).optional(),
    tds_date: z.string().optional(), // Ngày/tháng tải TDS dùng để lấy thông số, ví dụ "09/2026"
    // Quy cách: dạng ngắn "Phuy 209L" hoặc đầy đủ kèm khối lượng và mã kho.
    packaging: z
      .array(
        z.union([
          z.string(),
          z.object({
            name: z.string(), // "Phuy 209 L"
            weight: z.string().optional(), // Khối lượng tịnh, ví dụ "~182 kg"
            sku: z.string().optional(), // Mã HH trong kho
          }),
        ]),
      )
      .optional(),
    // Không công bố số lượng tồn chính xác: web tĩnh sẽ sai sau vài ngày.
    stock_status: z.enum(['co-san', 'dat-hang', 'ngung-ban']).optional(),
    applications: z.array(z.string()).optional(), // Ứng dụng / thiết bị phù hợp
    not_for: z.array(z.string()).optional(), // Không nên dùng cho...
    warnings: z.array(z.string()).optional(), // Cảnh báo an toàn, lấy từ SDS
    storage: z.string().optional(), // Điều kiện bảo quản
    shelf_life: z.string().optional(), // Hạn sử dụng
    equivalents: z.array(z.string()).optional(), // Tên sản phẩm tương đương các hãng
    tds_url: z.string().optional(),
    sds_url: z.string().optional(),
    image: z.string().optional(), // Dạng cũ, dùng khi chưa có images
    images: z.array(imageItem).optional(), // Ảnh đầu tiên là ảnh chính
    related_posts: z.array(z.string()).optional(), // Slug bài trong blog/
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),
    reviewed_by: z.string().optional(),
    date: ngay.optional(), // Ngày đăng
    updated: ngay.optional(), // Ngày cập nhật
  }).superRefine(kiemTraNgay),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    ma: contentCode.optional(),
    active,
    // Loại bài, thay cho thư mục con (thư mục con sẽ làm đổi URL).
    loai: z.enum(['kien-thuc', 'huong-dan-su-dung', 'so-sanh', 'tin-tuc']).optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    category: z.string().optional(), // Slug danh mục (hub) mà bài này hỗ trợ
    related_products: z.array(z.string()).optional(), // Slug sản phẩm trong sanpham/
    author: z.string().optional(),
    author_title: z.string().optional(), // Chức vụ, kinh nghiệm của tác giả (E-E-A-T)
    date: ngay, // Ngày đăng: bắt buộc với bài viết
    updated: ngay.optional(), // Ngày cập nhật
    image: z.string().optional(),
    image_alt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),
  }).superRefine(kiemTraNgay),
});

export const collections = {
  'danhmuc': danhmucCollection,
  'sanpham': sanphamCollection,
  'blog': blogCollection,
};
