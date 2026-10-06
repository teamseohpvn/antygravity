# Thiết kế lại website tối ưu SEO: Dầu Công Nghiệp HP

> Tài liệu thiết kế cho repo `antygravity` (Astro 7 + Cloudflare Workers).
> Dựa trên: kế hoạch SEO nội bộ (`ke-hoach-seo-dau-cong-nghiep-pro.md`, không lưu trong repo), dữ liệu từ khóa DataForSEO (Google Việt Nam, 28/09/2026), audit site dev và đánh giá nội dung danh mục.
> Trạng thái: **đang triển khai**. Xem bảng [Trạng thái triển khai](#trạng-thái-triển-khai) và [Biến môi trường](#biến-môi-trường).

## Trạng thái triển khai

| Hạng mục | Trạng thái | File |
| :--- | :--- | :--- |
| Viết lại 9 danh mục, thêm dầu truyền nhiệt và dầu cắt gọt | ✅ Xong | `src/content/danhmuc/*.md` |
| Canonical tự sinh từ `PUBLIC_SITE_URL`, không có `/` cuối | ✅ Xong | `src/lib/site.ts`, `src/components/SEO.astro` |
| Sửa lỗi redirect 307 sang URL có `/` cuối (`build.format: 'file'`) | ✅ Xong | `astro.config.mjs` |
| Index mặc định từ 06/10/2026, chặn bằng `PUBLIC_INDEXABLE=false` | ✅ Xong | `src/lib/site.ts`, `SEO.astro` |
| `robots.txt` có dòng Sitemap; sitemap loại trang cảm ơn | ✅ Xong | `src/pages/robots.txt.ts`, `astro.config.mjs` |
| og:url, og:image, og:locale, Twitter card; bỏ meta keywords | ✅ Xong | `SEO.astro` |
| Schema Organization + LocalBusiness + WebSite toàn site; BreadcrumbList, CollectionPage, ItemList, Product, Article | ✅ Xong | `Layout.astro`, các trang |
| Menu, footer, thẻ danh mục trang chủ sinh từ dữ liệu (`order`, `nav_label`, `summary`) | ✅ Xong | `Layout.astro`, `index.astro` |
| Breadcrumb hiển thị trên mọi trang con | ✅ Xong | `src/components/Breadcrumbs.astro` |
| Bộ lọc sinh từ sản phẩm thật (không còn "ISO VG" trên trang mỡ) | ✅ Xong | `src/pages/[category]/index.astro` |
| Bỏ 7 sản phẩm mẫu; trạng thái "đang cập nhật" khi danh mục chưa có sản phẩm | ✅ Xong | `src/content/sanpham/` |
| Trang `/bao-gia` (form nhiều sản phẩm), `/bao-gia-thanh-cong` (noindex), `/lien-he`, `404` | ✅ Xong | `src/pages/` |
| API báo giá gửi Telegram / webhook, chống spam bằng trường bẫy | ✅ Xong, **cần cấu hình biến môi trường** | `src/pages/api/bao-gia.ts` |
| CTA gọi / Zalo / báo giá trên header, thanh dính mobile, mọi trang danh mục và sản phẩm | ✅ Xong | `QuoteCta.astro`, `Layout.astro` |
| GA4 + sự kiện `generate_lead`, `click_tel`, `click_zalo`, `add_to_quote`, `download_tds` | ✅ Xong, **cần `PUBLIC_GA4_ID`** | `Layout.astro`, `bao-gia.astro` |
| Script kiểm tra nội dung (`npm run check:content`) | ✅ Xong | `scripts/check-content.mjs` |
| Sản phẩm thật (6–10 mỗi danh mục P1), ảnh thật, link TDS | ⏳ Cần dữ liệu từ bạn | `src/content/sanpham/` |
| Xác minh tên sản phẩm có `TODO` | ⏳ Cần dữ liệu từ bạn | `src/content/danhmuc/` |
| Trang độ nhớt, trang hãng, trang ứng dụng, bảng tương đương | ⏳ Giai đoạn 2 | |
| Thay workflow GitHub Pages bằng deploy Cloudflare | ⏳ Cần quyền Cloudflare | `.github/workflows/` |
| Cloudflare Turnstile cho form | ⏳ Tùy chọn khi bị spam | |

## Biến môi trường

Đặt trong Cloudflare dashboard (Workers → Settings → Variables and Secrets), hoặc file `.dev.vars` khi chạy local. Biến `PUBLIC_*` được đọc **lúc build**, nên cần có trong môi trường build (Workers Builds hoặc CI).

| Biến | Loại | Ví dụ | Tác dụng |
| :--- | :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | Build | `https://daucongnghiephp.com.vn` | Domain chính thức cho canonical, sitemap, schema, robots. Mặc định là domain chính thức |
| `PUBLIC_INDEXABLE` | Build | `false` | Từ 06/10/2026 mặc định cho index. Chỉ đặt `false` khi muốn chặn Google (bảo trì, staging riêng) |
| `PUBLIC_GA4_ID` | Build | `G-XXXXXXX` | Bật Google Analytics 4 và các sự kiện chuyển đổi |
| `QUOTE_TELEGRAM_BOT_TOKEN` | Secret | `123456:ABC…` | Gửi yêu cầu báo giá vào Telegram (tạo bot bằng @BotFather) |
| `QUOTE_TELEGRAM_CHAT_ID` | Secret | `-100123…` | Nhóm / người nhận tin Telegram |
| `QUOTE_WEBHOOK_URL` | Secret | URL Google Apps Script | POST JSON `{ text, lead }` để ghi Google Sheet, Make, Zapier, n8n… |

Nếu chưa cấu hình kênh nhận, form vẫn hoạt động theo kiểu dự phòng: hiện nội dung yêu cầu đã soạn sẵn để khách sao chép gửi Zalo hoặc gọi điện.

## Mục lục

1. [Mục tiêu và nguyên tắc](#1-mục-tiêu-và-nguyên-tắc)
2. [Dữ liệu từ khóa quyết định thiết kế](#2-dữ-liệu-từ-khóa-quyết-định-thiết-kế)
3. [Sơ đồ URL và điều hướng](#3-sơ-đồ-url-và-điều-hướng)
4. [Mô hình nội dung (content collections)](#4-mô-hình-nội-dung-content-collections)
5. [Template từng loại trang](#5-template-từng-loại-trang)
6. [Thẻ SEO, canonical, schema](#6-thẻ-seo-canonical-schema)
7. [Kỹ thuật: staging, sitemap, robots, hiệu năng](#7-kỹ-thuật-staging-sitemap-robots-hiệu-năng)
8. [Chuyển đổi B2B: báo giá, CTA, đo lường](#8-chuyển-đổi-b2b-báo-giá-cta-đo-lường)
9. [SEO địa phương](#9-seo-địa-phương)
10. [Quy chuẩn viết nội dung](#10-quy-chuẩn-viết-nội-dung)
11. [Lộ trình triển khai](#11-lộ-trình-triển-khai)
12. [Checklist trước khi launch](#12-checklist-trước-khi-launch)

---

## 1. Mục tiêu và nguyên tắc

**Mục tiêu:** tăng **yêu cầu báo giá B2B** (form, Zalo, gọi điện) từ tìm kiếm tự nhiên, cho khách là phòng bảo trì và phòng mua hàng nhà máy ở Hải Phòng và miền Bắc.

**Nguyên tắc:**
- **Người mua tìm theo loại dầu, độ nhớt và mã sản phẩm**, không tìm "báo giá…" hay "…hải phòng" (các cụm này dưới 10 lượt/tháng). Mỗi trang nhắm một nhóm từ khóa. Chữ "báo giá" nằm ở title và CTA.
- **Mỗi từ khóa có một trang đích duy nhất.** Không tạo hai trang cạnh tranh cùng một từ.
- **Thông số phải lấy từ TDS.** Kỹ sư bảo trì đọc sai một con số là mất tin tưởng.
- **Mọi trang đều có đường tới báo giá** trong một lần bấm.
- **Staging không được index.** Chỉ domain chính thức được index.

---

## 2. Dữ liệu từ khóa quyết định thiết kế

Lượt tìm kiếm trung bình mỗi tháng, Google Việt Nam:

| Nhóm | Từ khóa lớn nhất | Tổng nhóm (ước tính) | Quyết định thiết kế |
| :--- | :--- | ---: | :--- |
| Dầu thủy lực | dầu nhớt thủy lực 2.900 · dầu thủy lực 1.900 · nhớt thủy lực 590 · dầu thủy lực 68: 480 · 46: 390 | ~9.000 | Pillar lớn nhất. Tách `/dau-thuy-luc/vg-68`, `/vg-46` ở giai đoạn 2 |
| Mỡ | mỡ bôi trơn 3.600 · mỡ bò 2.400 · mỡ bò chịu nhiệt 1.300 · mỡ chịu nhiệt 720 | ~11.000 | Hai trang mỡ là ưu tiên P1. Dùng tên gọi "mỡ bò" trong title và H1 |
| Dầu truyền nhiệt | dầu truyền nhiệt 3.600 (cạnh tranh thấp) | ~3.700 | **Danh mục mới, P1** (đã thêm `dau-truyen-nhiet.md`) |
| Dầu máy nén khí | dầu máy nén khí 880 · trục vít 260 · dầu nén khí 260 | ~2.000 | Thêm trang "dầu tương đương cho máy Kobelco / Hitachi / Atlas Copco" |
| Dầu cắt gọt | dầu cắt gọt 170 · pha nước 140 · kim loại 110 | ~560 | **Danh mục mới, P2** (đã thêm `dau-cat-got.md`) |
| Dầu bánh răng | dầu bánh răng 140 · 220: 110 · công nghiệp 90 | ~660 | Giữ, P2 |
| Chống gỉ | dầu chống gỉ 260 · chống rỉ 210 · chống rỉ sét 170 | ~740 | Dùng cả "gỉ" và "rỉ" |
| Hộp số tự động | dầu hộp số tự động 320 | ~410 | Giữ. Ý định tìm kiếm nghiêng về ô tô và xe nâng |
| Rãnh trượt / EDM | ~130 / ~30 | nhỏ | Giữ danh mục, không viết bài riêng |

**Đối thủ đang đứng top:** daucongnghiep.vn (top 1–4 ở 5/8 từ khóa chính), dauthuyluc.org.vn (có mặt 7/8), daunhotnpoil.com, yenphat.vn, mekongpetro.com. Cả 8 từ khóa chính đều có **AI Overview**. "dầu thủy lực" có **Local pack**.

---

## 3. Sơ đồ URL và điều hướng

### 3.1. Sơ đồ URL mục tiêu

Quy ước: chữ thường, không dấu, gạch ngang, **không có `/` ở cuối**.

```
/                                   Trang chủ
├── /bao-gia                        MỚI · P1 · form yêu cầu báo giá nhiều sản phẩm
├── /bao-gia-thanh-cong                 MỚI · trang cảm ơn (noindex) để đo chuyển đổi
├── /lien-he                        MỚI · P1 · NAP, bản đồ, giờ làm việc
├── /gioi-thieu                     MỚI · kho, giấy ủy quyền, CO/CQ, khách hàng
├── /{danh-muc}                     11 danh mục (src/content/danhmuc)
│   ├── /{danh-muc}/{san-pham}      Trang sản phẩm (src/content/sanpham)
│   └── /dau-thuy-luc/vg-68         Giai đoạn 2 · trang độ nhớt
├── /dau-may-nen-khi/tuong-thich-kobelco | -hitachi | -atlas-copco   Giai đoạn 2
├── /thuong-hieu/{shell|castrol|mobil|total}                         Giai đoạn 2
├── /ung-dung/{may-ep-nhua|may-cnc|hop-giam-toc|xe-nang|may-cong-trinh}  Giai đoạn 2
├── /tra-cuu/bang-tuong-duong-dau-nhot     Giai đoạn 1 · tài sản thu hút backlink
├── /tra-cuu/bang-quy-doi-do-nhot          ISO VG ↔ SAE ↔ AGMA
└── /ho-tro-ky-thuat/{bai-viet}            Blog (src/content/blog)
```

**Không làm** các trang "dầu X tại {tỉnh}" nhân bản nội dung, vì Google coi là doorway page. Tên tỉnh và KCN nằm trong nội dung danh mục và trang `/lien-he`.

### 3.2. Menu sinh từ dữ liệu

Hiện tại `src/layouts/Layout.astro` **viết cứng** danh sách danh mục, nên thêm danh mục mới dễ bị quên (PR này đã thêm tay 2 dòng). Đề xuất: thêm trường `order` và `nav_label` vào collection `danhmuc`, rồi sinh menu từ đó:

```astro
---
// src/layouts/Layout.astro
import { getCollection } from 'astro:content';
const categories = (await getCollection('danhmuc'))
  .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
---
<div class="dropdown-content">
  {categories.map(c => <a href={`/${c.id}`}>{c.data.nav_label ?? c.data.title}</a>)}
</div>
```

Thứ tự đề xuất theo lượt tìm kiếm: Dầu thủy lực, Mỡ bôi trơn, Mỡ chịu nhiệt, Dầu truyền nhiệt, Dầu máy nén khí, Dầu bánh răng, Dầu cắt gọt, Dầu chống gỉ, Dầu hộp số tự động, Dầu rãnh trượt, Dầu xung điện EDM.

### 3.3. Breadcrumb

Có trên **mọi trang trừ trang chủ**, kèm schema `BreadcrumbList` (mục 6.3). Hiện tại chỉ trang sản phẩm có breadcrumb dạng chữ.

---

## 4. Mô hình nội dung (content collections)

Sửa `src/content.config.ts`. Các trường mới đều **optional** để không làm vỡ nội dung hiện có.

### 4.1. `danhmuc`

```ts
const danhmucCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/danhmuc" }),
  schema: z.object({
    title: z.string(),                       // H1
    nav_label: z.string().optional(),        // Tên ngắn trên menu
    seo_title: z.string().max(65).optional(),
    description: z.string().max(160),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),    // Bỏ dần, sinh tự động (mục 6.2)
    order: z.number().optional(),
    filter: z.enum(['vg', 'nlgi', 'nhiet-do', 'none']).default('vg'), // Bộ lọc phù hợp loại hàng
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(), // Nguồn cho FAQPage schema
    related: z.array(z.string()).optional(), // slug danh mục liên quan
    reviewed_by: z.string().optional(),      // Người duyệt kỹ thuật (E-E-A-T)
    updated: z.coerce.date().optional(),
  }),
});
```

### 4.2. `sanpham`

```ts
schema: z.object({
  title: z.string(),
  seo_title: z.string().max(65).optional(),
  description: z.string().max(160),
  category: z.string(),
  categoryName: z.string(),
  brand: z.string(),
  sku: z.string().optional(),
  vg: z.number().optional(),              // Dầu
  nlgi: z.string().optional(),            // Mỡ: "2", "0/1"...
  temp_max: z.number().optional(),        // Mỡ chịu nhiệt, dầu truyền nhiệt
  standards: z.array(z.string()).optional(), // "ISO 11158 HM", "DIN 51524-2 HLP"
  specs: z.array(z.object({ name: z.string(), value: z.string(), method: z.string().optional() })).optional(),
  packaging: z.array(z.string()).optional(),  // ["Phuy 209L", "Xô 20L"]
  equivalents: z.array(z.string()).optional(), // slug sản phẩm tương đương
  tds_url: z.string().optional(),
  sds_url: z.string().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  // ...giữ các trường cũ
})
```

Lợi ích: bảng thông số, schema `Product.additionalProperty`, bộ lọc và khối "sản phẩm tương đương" đều sinh từ dữ liệu, không phải viết tay trong markdown.

### 4.3. Bỏ sản phẩm mẫu

Xóa 7 file `src/content/sanpham/*-sample.md` và thay bằng sản phẩm thật. **Mục tiêu giai đoạn 1:** mỗi danh mục P1 có 6–10 sản phẩm, đúng các mã đã nêu trong bài danh mục.

---

## 5. Template từng loại trang

### 5.1. Trang danh mục: `src/pages/[category]/index.astro`

```
┌───────────────────────────────────────────────────────────┐
│ Breadcrumb: Trang chủ › Dầu thủy lực                       │
│ H1: {title}                                               │
│ Đoạn mở đầu 2–3 câu (answer-first) = description           │
│ [Nhận báo giá]  [Gọi 0901 511 313]  [Zalo]                 │  ← CTA trên màn hình đầu
├──────────────┬────────────────────────────────────────────┤
│ Bộ lọc theo  │ Lưới sản phẩm (thẻ: ảnh, hãng, VG/NLGI,     │
│ `filter`:    │ quy cách, [Thêm vào báo giá])               │
│ hãng + VG /  │                                            │
│ NLGI / nhiệt │                                            │
├──────────────┴────────────────────────────────────────────┤
│ Nội dung markdown (bảng chọn, tương đương, TDS, ứng dụng)  │
│ Khối CTA giữa bài                                          │
│ FAQ (từ `faq` hoặc H3 trong markdown)                      │
│ Danh mục liên quan (`related`) + bài kiến thức liên quan   │
│ "Duyệt kỹ thuật: {reviewed_by} · Cập nhật: {updated}"      │
└───────────────────────────────────────────────────────────┘
```

**Sửa so với hiện tại:**
- **Bộ lọc theo loại hàng.** Hiện trang mỡ hiển thị "Độ nhớt ISO VG 32/46/68" và nhãn "VG 68", nên phải đổi theo `filter`. Thẻ sản phẩm chỉ hiện `VG {vg}` khi có `vg`.
- **Bộ lọc là checkbox tĩnh** không có tác dụng. Hoặc làm lọc thật bằng tham số URL (`?hang=shell&vg=68`, canonical về trang danh mục, robots `noindex,follow` cho URL có tham số), hoặc bỏ đi cho tới khi có từ 10 sản phẩm trở lên.
- **`title` fallback** đang là `"{categoryName} Chính Hãng | Báo Giá Tốt Nhất 2026"`. Bỏ năm cố định.
- **Schema `CollectionPage`** đang mô tả "nhập khẩu trực tiếp" cho mọi danh mục. Sinh từ `description`, thêm `ItemList` các sản phẩm (mục 6.3).
- Thêm `<img>` có `width`/`height`, `loading="lazy"` cho thẻ sản phẩm.

### 5.2. Trang sản phẩm: `src/pages/[category]/[slug].astro`

```
Breadcrumb › H1 {Hãng} {Model}
┌───────────── ảnh phuy/xô thật ─────────┬── Tóm tắt: hãng, VG/NLGI, tiêu chuẩn, quy cách
│                                        │   [Thêm vào báo giá] [Gọi] [Zalo]
│                                        │   [Tải TDS] [Tải SDS]
├────────────────────────────────────────┴───────────────────────────────
│ Bảng thông số (từ `specs`, ghi phương pháp thử ASTM/ISO)
│ Ứng dụng · Chu kỳ thay tham khảo
│ Sản phẩm tương đương (từ `equivalents`)
│ FAQ 3–5 câu · Link về danh mục + 1–2 bài kiến thức
```

- **Title:** `{Hãng} {Model} – Phuy 209L, Xô 18L | Báo Giá Sỉ` (≤ 65 ký tự).
- Mô tả viết lại bằng lời của mình, **không copy TDS nguyên văn**.
- Không hiện nhãn `VG` khi sản phẩm là mỡ.

### 5.3. Trang báo giá: `src/pages/bao-gia.astro` (MỚI)

Form nhiều dòng sản phẩm:

| Trường | Bắt buộc | Ghi chú |
| :--- | :---: | :--- |
| Họ tên, SĐT/Zalo | ✓ | Kiểm tra định dạng số Việt Nam |
| Công ty | ✓ | |
| Sản phẩm, quy cách, số lượng | ✓ | Nhiều dòng; điền sẵn khi đi từ nút "Thêm vào báo giá" |
| Mã số thuế | | Để xuất VAT |
| Địa điểm giao, thời gian cần hàng | | |
| File đính kèm | | Danh sách vật tư, ảnh nhãn dầu |

**Xử lý phía server:** Astro endpoint `src/pages/api/bao-gia.ts` chạy trên Workers. Lưu vào Cloudflare D1 và gửi thông báo (email / Telegram / Zalo OA webhook). Có chống spam: Cloudflare Turnstile. Sau khi gửi, chuyển tới `/bao-gia-thanh-cong` (`noindex`).

"Giỏ báo giá" lưu phía client trong `localStorage` và chỉ gửi khi submit, nên không cần tài khoản.

### 5.4. Trang chủ: `src/pages/index.astro`

- **H1** chứa "dầu nhớt công nghiệp" và "mỡ bôi trơn" (thay "Dầu Công Nghiệp & Mỡ Bôi Trơn Chính Hãng" hiện tại, vốn đã gần đúng).
- Khối danh mục theo thứ tự lượt tìm kiếm, khối hãng, khối "vì sao chọn" (CO/CQ, kho Hải Phòng, tư vấn kỹ thuật), khối bài kiến thức mới.
- **Bỏ canonical về `daucongnghiep-pro.vn`** cho tới khi domain đó thật sự chạy (mục 6.2).

### 5.5. Trang tra cứu: `/tra-cuu/bang-tuong-duong-dau-nhot`

Bảng có thể lọc, gồm: loại dầu, cấp VG/NLGI, Shell, Castrol, Mobil, TotalEnergies, Petrolimex. Dữ liệu lấy từ các bảng "sản phẩm tương đương" trong trang danh mục. Đây là tài sản dễ được diễn đàn kỹ thuật dẫn link và dễ được AI Overview trích dẫn.

---

## 6. Thẻ SEO, canonical, schema

### 6.1. `src/components/SEO.astro`

| Vấn đề hiện tại | Sửa |
| :--- | :--- |
| `siteName = "Chuyên Trang Dầu Công Nghiệp Chính Hãng"` làm title dài | `siteName = "Dầu Công Nghiệp HP"`; fallback title `{title} \| Dầu Công Nghiệp HP` |
| Không có `og:url`, `og:image`, `og:locale`, Twitter card | Thêm `og:url` = canonical, `og:image` tuyệt đối từ `image`, `og:locale = vi_VN`, `twitter:card = summary_large_image` |
| `meta keywords` | Có thể bỏ, vì Google không dùng. Giữ dữ liệu `keywords` trong frontmatter để làm việc nội bộ |
| Không có robots meta | Thêm prop `noindex`, dùng cho `/bao-gia-thanh-cong`, trang có tham số lọc và mọi trang trên host staging |

### 6.2. Canonical sinh tự động

Không nhập `canonical_url` tay trong từng file nữa (dễ sai domain, dễ thừa `/`). Sinh từ `Astro.site` và đường dẫn:

```ts
// src/components/SEO.astro
const SITE = import.meta.env.PUBLIC_SITE_URL ?? Astro.site; // domain chính thức
const path = Astro.url.pathname.replace(/\/+$/, '') || '/';
const canonicalHref = canonical ?? new URL(path, SITE).href;
```

```js
// astro.config.mjs
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://antygravity.nhadat339shangdao.workers.dev',
  trailingSlash: 'never',
  // ...
});
```

Khi chốt domain chính thức (ví dụ `daucongnghiep-pro.vn`), chỉ cần đặt `PUBLIC_SITE_URL`, và canonical, sitemap, schema đổi theo.

### 6.3. Schema JSON-LD

| Trang | Schema |
| :--- | :--- |
| Toàn site (Layout) | `Organization` + `LocalBusiness` với **một `@id` cố định** trên domain chính, `logo`, `sameAs` (Google Business Profile, Facebook, Zalo OA). Thay `image` đang là favicon bằng ảnh kho hoặc logo thật. `WebSite` |
| Danh mục | `CollectionPage` + `BreadcrumbList` + `ItemList` (sản phẩm) + `FAQPage` (từ `faq`) |
| Sản phẩm | `Product` (name, brand, sku, image, `additionalProperty` từ `specs`) + `BreadcrumbList`. **Chỉ thêm `offers` khi công bố giá thật**. Không bịa giá hoặc đánh giá |
| Bài viết | `Article` (author là người thật, `datePublished`, `dateModified`) + `BreadcrumbList` |
| Liên hệ | `LocalBusiness` đầy đủ `openingHours`, `geo` |

Google hiện hạn chế hiển thị rich result FAQ cho site thương mại. Vẫn nên giữ `FAQPage` và nội dung Hỏi–Đáp vì hữu ích cho người đọc và AI Overview.

---

## 7. Kỹ thuật: staging, sitemap, robots, hiệu năng

### 7.1. Chặn index trên staging

Tạo `src/middleware.ts`:

```ts
import { defineMiddleware } from 'astro:middleware';
const PROD_HOST = new URL(import.meta.env.PUBLIC_SITE_URL ?? 'https://example.invalid').host;

export const onRequest = defineMiddleware(async (ctx, next) => {
  const res = await next();
  if (ctx.url.host !== PROD_HOST) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return res;
});
```

Trang build tĩnh (prerender) sẽ không đi qua middleware. Khi đó dùng file `public/_headers` riêng cho bản staging, hoặc cấu hình Cloudflare Transform Rule theo hostname. Sau khi có domain chính: **301** từ `*.workers.dev`, `www` và `http` về `https://{domain-chính}`.

### 7.2. Sitemap và robots

- Sitemap có tại `/sitemap-index.xml` (plugin `@astrojs/sitemap`). Cần:
  - Loại trừ `/bao-gia-thanh-cong` và trang noindex bằng option `filter`.
  - Thêm `lastmod` từ trường `updated`.
- Tạo `public/robots.txt` (hiện robots.txt do Cloudflare tự sinh, chỉ có content-signal):

```
User-agent: *
Disallow: /bao-gia-thanh-cong
Disallow: /*?*hang=
Disallow: /*?*vg=
Sitemap: https://{domain-chính}/sitemap-index.xml
```

- Xem lại **content-signal của Cloudflare** (AI Crawl Control) nếu muốn được trích dẫn trong AI Overviews, ChatGPT, Perplexity.

### 7.3. Hiệu năng và hình ảnh

- Dùng `astro:assets` (`<Image />`) để có WebP/AVIF, `width`/`height`, `srcset`.
- Ảnh sản phẩm thật (phuy, xô), đặt tên file có dấu gạch ngang và alt mô tả, ví dụ `alt="Phuy 209L dầu thủy lực Shell Tellus S2 MX 68"`.
- Font Inter: tự host hoặc chỉ tải subset `vietnamese,latin` với `display=swap`.
- Mục tiêu Core Web Vitals trên 4G: LCP < 2,5 s, CLS < 0,1, INP < 200 ms.

### 7.4. CI

`.github/workflows/astro.yml` đang là workflow **GitHub Pages** mẫu, trong khi site chạy trên Cloudflare Workers. Nên thay bằng `wrangler deploy` (hoặc Cloudflare Workers Builds). Thêm bước kiểm tra:
- `astro check` và `astro build`.
- Script kiểm tra độ dài `seo_title` ≤ 65 và `description` ≤ 160, không có `$…$` (LaTeX), không có link nội bộ hỏng.

---

## 8. Chuyển đổi B2B: báo giá, CTA, đo lường

| Vị trí | Thành phần |
| :--- | :--- |
| Header | Nút "Nhận báo giá" → `/bao-gia` (hiện đang là `#contact`, một anchor không tồn tại) |
| Mobile | Thanh dính đáy màn hình: **Gọi · Zalo · Báo giá**, có `padding-bottom: env(safe-area-inset-bottom)` |
| Danh mục | CTA dưới H1 + khối CTA giữa bài + nút "Thêm vào báo giá" trên thẻ sản phẩm |
| Sản phẩm | Nút "Thêm vào báo giá", gọi, Zalo, tải TDS |
| Footer | NAP đầy đủ, số điện thoại là link `tel:`, link Zalo |

**Đo lường (GA4 qua GTM):**

| Sự kiện | Khi nào | Key event |
| :--- | :--- | :---: |
| `generate_lead` | Gửi form báo giá thành công | ✓ |
| `click_tel` / `click_zalo` | Bấm số điện thoại / Zalo | ✓ |
| `add_to_quote` | Thêm sản phẩm vào giỏ báo giá | |
| `download_tds` | Tải TDS/SDS | |

Lưu `utm_source` và trang đích đầu tiên vào bản ghi báo giá trong D1 để biết từ khóa hoặc trang nào ra đơn.

**Tín hiệu tin cậy** (trang `/gioi-thieu`, footer, trang sản phẩm): ảnh kho thật, giấy ủy quyền (chỉ khi có thật), CO/CQ mẫu, logo khách hàng (khi được phép), hướng dẫn phân biệt hàng thật và giả.

> **Lưu ý pháp lý:** các cụm "Tổng đại lý", "đại lý cấp 1 ủy quyền" chỉ được dùng khi có giấy tờ của hãng. Các cam kết như "đền bù gấp 10 lần" phải thực hiện được.

---

## 9. SEO địa phương

- **Google Business Profile:** danh mục "Nhà cung cấp dầu bôi trơn". NAP **giống hệt** trên site và schema: *108 Đường Thanh Bình, P. Lê Thanh Nghị, TP Hải Phòng · 0901 511 313*. Đăng ảnh kho, xe và bài viết hằng tuần. Xin đánh giá sau mỗi đơn.
- **Địa danh sau sáp nhập 2025:** Hải Dương nhập vào Hải Phòng, Bắc Giang vào Bắc Ninh, Thái Bình vào Hưng Yên. Nội dung dùng cả tên cũ và mới, ví dụ "Hải Phòng (gồm khu vực Hải Dương cũ)".
- **Trích dẫn NAP:** Trang Vàng Việt Nam, danh bạ doanh nghiệp, ban quản lý KCN, trang đại lý của hãng (nếu được liệt kê).

---

## 10. Quy chuẩn viết nội dung

Áp dụng cho `src/content/danhmuc`, `sanpham`, `blog`. Mẫu đầy đủ xem các file danh mục trong PR này.

**Frontmatter danh mục:**
- `title` (H1): tên loại + tên gọi thông dụng + cấp phổ biến. Ví dụ: "Dầu Thủy Lực (Dầu Nhớt Thủy Lực) 32, 46, 68".
- `seo_title`: **≤ 60–65 ký tự**, từ khóa chính ở đầu, kết thúc bằng "Báo Giá Sỉ" hoặc quy cách. Không ghi năm.
- `description`: **≤ 155 ký tự**, gồm từ khóa, hãng, CO/CQ, quy cách, khu vực.
- `keywords`: lấy từ bộ từ khóa DataForSEO, từ lớn nhất trước.

**Cấu trúc thân bài:**
1. Đoạn mở đầu **trả lời thẳng** (có từ khóa chính và các biến thể: "dầu nhớt thủy lực", "mỡ bò"…).
2. `## Chọn … theo …`: bảng chọn (VG / NLGI / nhiệt độ / loại máy).
3. `## Dòng sản phẩm và sản phẩm tương đương`: bảng tương đương giữa các hãng.
4. `## Chỉ tiêu cần xem trên bảng thông số (TDS)`: kèm phương pháp thử (ASTM/ISO/DIN).
5. `## Ứng dụng theo ngành`.
6. `## Quy cách và báo giá`: link `tel:` và nội dung khách nên gửi kèm.
7. `## Câu hỏi thường gặp`: mỗi câu là một `###`.
8. Dòng **Xem thêm** gồm 3 link nội bộ.

**Không làm:**
- Không dùng LaTeX (`$\mu_s$`, `$Cl^-$`), vì markdown của site không render. Viết `μs/μk`, `Cl⁻`.
- Không dùng tính từ tuyệt đối không có số liệu ("huyền thoại", "siêu hạng", "triệt tiêu 100%").
- Không đưa thông số không có trong TDS. Tên sản phẩm chưa xác minh thì đánh dấu `<!-- TODO: xác minh -->`.
- Không lặp năm "2026" trong H2.

**Từ khóa biến thể bắt buộc có trong nội dung:**

| Trang | Biến thể |
| :--- | :--- |
| Dầu thủy lực | dầu nhớt thủy lực, nhớt thủy lực, AW 68, nhớt thủy lực 68, thuỷ/thủy |
| Mỡ bôi trơn | mỡ bò, mỡ bò bôi trơn, mỡ công nghiệp, mỡ vòng bi, EP2 |
| Mỡ chịu nhiệt | mỡ bò chịu nhiệt, mỡ bôi trơn chịu nhiệt, "độ" (không chỉ "°C"), 300 độ, 500 độ |
| Máy nén khí | dầu nén khí, nhớt máy nén khí, trục vít, piston |
| Chống gỉ | chống gỉ, chống rỉ, chống rỉ sét |

---

## 11. Lộ trình triển khai

| Giai đoạn | Thời gian | Việc | File chính |
| :--- | :--- | :--- | :--- |
| **0: Nền kỹ thuật** | Tuần 1–2 | Chốt domain · canonical tự động · noindex staging · `robots.txt` · menu từ dữ liệu · sửa `SEO.astro` · bỏ sản phẩm mẫu | `SEO.astro`, `Layout.astro`, `astro.config.mjs`, `middleware.ts`, `public/robots.txt` |
| **1: Chuyển đổi và danh mục P1** | Tuần 3–6 | `/bao-gia` + API + D1 · CTA · GA4 · 6–10 sản phẩm thật cho thủy lực, mỡ bôi trơn, mỡ chịu nhiệt, truyền nhiệt, máy nén khí · bảng tương đương · Google Business Profile | `pages/bao-gia.astro`, `pages/api/bao-gia.ts`, `content/sanpham/*` |
| **2: Mở rộng cụm** | Tháng 2–3 | `/dau-thuy-luc/vg-68`, `/vg-46` · trang dầu tương thích máy nén khí · trang hãng · 3–5 trang ứng dụng · lịch 12 bài viết | `pages/[category]/vg-[vg].astro`, `pages/thuong-hieu/*`, `content/blog/*` |
| **3: Tối ưu** | Tháng 4–6 | Danh mục dầu tuabin, biến thế, máy may · tối ưu trang ở vị trí 8–20 trên GSC · A/B test form · case study | |

**KPI:** trang được index (≥ 60 / 150 / 250 ở tháng 1 / 3 / 6), số từ khóa P1 trong top 10, lượt click tự nhiên, **số yêu cầu báo giá mỗi tháng**, số đánh giá Google Business Profile.

---

## 12. Checklist trước khi launch

- [ ] Domain chính thức đã chốt; `PUBLIC_SITE_URL` đã đặt; 301 từ workers.dev / www / http
- [ ] Mọi trang có canonical tuyệt đối, tự trỏ, không có `/` cuối, khớp sitemap
- [ ] Host staging trả `X-Robots-Tag: noindex`
- [ ] `robots.txt` có dòng `Sitemap:`; sitemap không chứa trang noindex
- [ ] Không còn sản phẩm `*-sample`
- [ ] `/bao-gia`, `/lien-he`, `/gioi-thieu` hoạt động; form gửi được và có thông báo về
- [ ] Nút header trỏ `/bao-gia`; thanh CTA mobile hiển thị
- [ ] GA4 key event `generate_lead`, `click_tel`, `click_zalo` ghi nhận được
- [ ] `seo_title` ≤ 65, `description` ≤ 160 trên mọi trang
- [ ] Không còn `<!-- TODO: xác minh -->` trong nội dung, hoặc đã xác minh xong
- [ ] Schema hợp lệ trên Rich Results Test (Organization, BreadcrumbList, Product, FAQPage)
- [ ] Google Search Console (Domain property) và Bing Webmaster đã xác minh, sitemap đã gửi
- [ ] Google Business Profile đã xác minh, NAP khớp site
- [ ] Core Web Vitals đạt trên mobile (PageSpeed Insights)
