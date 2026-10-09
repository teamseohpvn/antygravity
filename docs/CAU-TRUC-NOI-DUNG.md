# Cấu trúc nội dung và quy ước file

Ngày lập: 03/10/2026. Bản này thống nhất ý tưởng trong `template.txt` với mã nguồn hiện có.
Đọc cùng `dai-phau-seo/cau-truc-site.md` (cây URL, loại trang, trang nào được làm).

---

## 1. Ý tưởng gốc và cách áp vào mã nguồn

| Ý tưởng trong template.txt | Thư mục thật trong mã nguồn | Ghi chú |
|---|---|---|
| Folder DANHMUC | `src/content/danhmuc/` | 15 file (05/10/2026) |
| Folder BLOG (blog, hướng dẫn sử dụng, bài khác) | `src/content/blog/` | Đã có. Phân loại bằng trường `loai`, **không** tạo thư mục con |
| Folder SANPHAM | `src/content/sanpham/` | 45 file, 14 đang bật theo kho tháng 10 |

Không đặt ba thư mục này ở gốc web và không viết hoa tên thư mục:
- Astro chỉ đọc nội dung trong `src/content/` (khai báo ở `src/content.config.ts`).
- Tên thư mục **không** xuất hiện trên URL, nên chữ hoa hay chữ thường không ảnh hưởng SEO. Giữ chữ thường để tránh lỗi trên máy chủ Linux (phân biệt hoa thường).

---

## 2. Cây thư mục chuẩn

```
repo/
├── src/
│   ├── content/                    NỘI DUNG (chỉ sửa .md ở đây là đủ)
│   │   ├── danhmuc/                Trang danh mục (hub)        → /<slug>
│   │   │   └── dau-thuy-luc.md
│   │   ├── sanpham/                Trang sản phẩm (mã chủ lực) → /<category>/<slug>
│   │   │   └── castrol-hyspin-aws-68.md
│   │   ├── blog/                   Kiến thức, hướng dẫn sử dụng, so sánh, tin tức
│   │   │   └── huong-dan-chon-do-nhot.md                       → /ho-tro-ky-thuat/<slug>
│   │   └── _templates/             File mẫu, KHÔNG lên web
│   │       ├── danh_muc_mau.md
│   │       ├── san_pham_mau.md
│   │       └── blog_mau.md
│   ├── data/                       (sẽ tạo) Dữ liệu dùng chung: khoảng giá, bảng tương đương
│   ├── pages/                      Khuôn trang (lập trình viên sửa)
│   ├── components/  layouts/  lib/
│   └── content.config.ts           Danh sách trường bắt buộc / tùy chọn của từng loại bài
│
├── anh-goc/                        ẢNH GỐC (không commit, ảnh nặng)
│   ├── danh-muc/                   <slug-danh-muc>.jpg
│   ├── san-pham/                   <slug-san-pham>-<mô-tả>.jpg
│   ├── blog/                       <slug-bai>[-<mô-tả>].jpg
│   └── chung/                      Ảnh kho, giao hàng, đội ngũ (ảnh thật)
│
├── public/
│   ├── images/                     ẢNH ĐÃ TỐI ƯU (.webp, do `npm run images` tạo ra – không sửa tay)
│   │   ├── danh-muc/  san-pham/  blog/  chung/
│   └── tai-lieu/                   (sẽ tạo) PDF chính hãng
│       ├── tds/                    <slug-san-pham>.pdf
│       └── sds/                    <slug-san-pham>.pdf
│
├── scripts/
│   ├── optimize-images.mjs         npm run images
│   └── check-content.mjs           npm run check:content
└── docs/                           Tài liệu (file này)
```

Các loại trang chưa có thư mục, sẽ thêm khi làm tới (theo `cau-truc-site.md`):
- `src/content/thuonghieu/` → `/thuong-hieu/<slug>` (ENEOS, VHP).
- Trang con theo cấp (`/dau-thuy-luc/vg-68`) và trang bảng giá: cần thiết kế khuôn riêng, không dùng chung khuôn sản phẩm.

---

## 3. URL chuẩn SEO

**URL không ghi trong file.** Tên file chính là phần cuối của URL. Nhờ vậy URL và tên file không bao giờ lệch nhau.

| Loại | File | URL |
|---|---|---|
| Danh mục | `danhmuc/dau-thuy-luc.md` | `/dau-thuy-luc` |
| Sản phẩm | `sanpham/eneos-super-hyrando-68.md` + `category: "dau-thuy-luc"` | `/dau-thuy-luc/eneos-super-hyrando-68` |
| Bài viết | `blog/dau-thuy-luc-32-46-68-khac-nhau.md` | `/ho-tro-ky-thuat/dau-thuy-luc-32-46-68-khac-nhau` |

Quy tắc đặt tên file (slug):
1. Chữ thường, **không dấu**, nối bằng dấu gạch ngang `-`. Không dấu cách, không `_`.
2. Chứa từ khóa chính, ngắn gọn: danh mục 2–4 từ, sản phẩm = hãng + dòng + cấp, bài viết 3–7 từ.
3. Không ghi năm, tháng (URL phải dùng được lâu dài).
4. Bỏ từ thừa: "các", "những", "và", "của", "cho" (trừ khi là một phần của cụm từ khóa).
5. Một dòng sản phẩm nhiều cấp nhớt hoặc nhiều quy cách → **một** file. Ví dụ `castrol-hyspin-aws-68.md` đã gộp AWS 46.
6. **Đã đăng thì không đổi tên file.** Bắt buộc đổi thì phải khai báo chuyển hướng 301 từ URL cũ.

`npm run check:content` báo lỗi nếu tên file sai quy tắc 1.

---

## 4. Mã bài viết (`ma`)

Dùng để quản lý trong bảng tính, giao việc, đối chiếu với kho. Không hiện trên web.

| Loại | Dạng | Ví dụ |
|---|---|---|
| Danh mục | `DM-<2 số>` | `DM-01` dầu thủy lực |
| Sản phẩm | `SP-<nhóm>-<3 số>` | `SP-THL-001` |
| Bài viết | `BV-<3 số>` | `BV-001` |

Mã nhóm sản phẩm:

| Mã | Nhóm | Mã | Nhóm |
|---|---|---|---|
| THL | Dầu thủy lực | BR | Dầu bánh răng |
| MO | Mỡ bôi trơn, mỡ chịu nhiệt | MNK | Dầu máy nén khí |
| DC | Dầu động cơ diesel | TN | Dầu truyền nhiệt |
| CHS | Dầu cầu, hộp số, ATF | MM | Dầu máy may |
| CG | Dầu cắt gọt | CGS | Dầu chống gỉ |
| RT | Dầu rãnh trượt | EDM | Dầu xung điện |
| CD | Dầu cách điện | BCK | Dầu bơm chân không |
| XM | Dầu nhớt xe máy | NLM | Nước làm mát |
| TB | Thiết bị kiểm tra dầu (nhớt kế, kit test) | | |

Quy tắc:
- Không trùng, không tái sử dụng mã của bài đã xóa.
- **`ma` khác `sku`.** `ma` là mã bài viết. `sku` là **Mã HH trong phần mềm kho**, ghi theo từng quy cách trong `packaging`.

`npm run check:content` báo lỗi khi mã trùng.

---

## 5. Ảnh

### 5.1. Quy trình
1. Đặt ảnh gốc (jpg/png, càng nét càng tốt) vào `anh-goc/<loại>/`.
2. Chạy `npm run images`. Script tạo 2 bản `.webp` trong `public/images/<loại>/`: bản rộng 1200px và bản `-600` cho điện thoại.
3. Khai báo đường dẫn `.webp` và `alt` trong file `.md`.
4. Chạy `npm run check:content` để kiểm tra ảnh có tồn tại và có alt.

### 5.2. Đặt tên ảnh theo từ khóa
Dạng: `<slug-trang>-<mô-tả-ngắn>.<đuôi>`. Chữ thường, không dấu, gạch ngang.

| Đúng | Sai |
|---|---|
| `san-pham/eneos-super-hyrando-68-phuy-200l.jpg` | `IMG_2034.jpg` |
| `san-pham/eneos-super-hyrando-68-nhan-thong-so.jpg` | `anh 1.jpg`, `Ảnh-phuy.jpg` |
| `danh-muc/dau-thuy-luc.jpg` | `dau_thuy_luc.JPG` |
| `blog/dau-thuy-luc-32-46-68-khac-nhau-bang-so-sanh.jpg` | `dau-thuy-luc-dau-thuy-luc-68-gia-re-tot-nhat.jpg` (nhồi từ khóa) |
| `chung/kho-dau-cong-nghiep-hai-duong.jpg` | |

### 5.3. Alt (mô tả ảnh)
- Tiếng Việt có dấu, tả **đúng thứ có trong ảnh**, chứa từ khóa một cách tự nhiên, tối đa ~125 ký tự.
- Ví dụ: `Phuy 200 lít dầu thủy lực ENEOS Super Hyrando 68 tại kho Hải Phòng`.
- Không viết "ảnh của…", không lặp từ khóa.

### 5.4. Kích thước và loại ảnh

| Loại | Tỉ lệ | Tối thiểu | Ảnh AI? |
|---|---|---|---|
| Danh mục | 3:2 ngang | 1536×1024 | Được, **không** logo, không chữ (xem `prompt-anh-danh-muc.md`) |
| Sản phẩm | 1:1 vuông, nền sáng | 1200×1200 | **Không.** Chỉ ảnh chụp thật phuy/xô/nhãn trong kho |
| Bài viết (ảnh bìa) | 16:9 | 1200×675 | Được cho ảnh minh họa; ảnh "thực tế tại xưởng" phải là ảnh thật |
| Chung (kho, giao hàng) | tự do | 1200 rộng | **Không** |

Ảnh sản phẩm nên có 3–5 tấm: mặt trước, nhãn sau (thấy rõ tiêu chuẩn và cấp nhớt), quy cách phuy/xô, ảnh trong kho.

---

## 6. Trường thông tin theo loại bài

Danh sách đầy đủ và giá trị mẫu: xem 3 file trong `src/content/_templates/`. Bảng dưới tóm tắt.

### 6.1. Chung cho cả ba loại

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `ma` | Nên có | Mã bài viết (mục 4) |
| `active` | **Có** | `true` = build và hiện trên web; `false` = ẩn. Thiếu trường = ẩn. Xem mục 7a |
| `title` | Có | H1 trên trang |
| `seo_title` | Nên có | Thẻ title Google, ≤ 60 ký tự (kiểm tra tự động ≤ 65) |
| `description` | Có | Mô tả Google, ≤ 155 ký tự (kiểm tra tự động ≤ 160) |
| `keywords` | Nên có | Từ khóa nhắm tới (để quản lý, không ảnh hưởng xếp hạng) |
| `tags` | Tùy | Nhãn nội bộ |
| `reviewed_by` / `author` | Nên có | Người duyệt / tác giả thật (E-E-A-T). Chưa có thì bỏ trống, **không** điền tên giả |
| `date` | Có với bài viết, nên có với trang khác | Ngày đăng lần đầu, dạng `YYYY-MM-DD`. Xem mục 6.5 |
| `updated` | Nên có | Ngày sửa nội dung gần nhất, dạng `YYYY-MM-DD`. Xem mục 6.5 |

### 6.2. Sản phẩm (`sanpham/`)

| Nhóm | Trường | Hiển thị trên web |
|---|---|---|
| Phân loại | `category`, `categoryName`, `brand`, `origin` (xuất xứ), `base_oil` (dầu gốc) | Breadcrumb, nhãn, dòng xuất xứ |
| Cấp kỹ thuật | `vg` (dầu CN), `nlgi` (mỡ), `sae` + `api` (dầu động cơ, dầu cầu), `standards` | Nhãn cạnh tên sản phẩm, schema |
| Thông số | `specs`: danh sách {chỉ tiêu, giá trị, phương pháp thử} — **màu sắc, tỷ trọng (độ đậm đặc), độ nhớt 40/100 °C, chỉ số độ nhớt, điểm chớp cháy, điểm đông đặc**; mỡ thêm độ xuyên kim, điểm nhỏ giọt. `tds_date` | Bảng "Thông số kỹ thuật điển hình" |
| Quy cách | `packaging`: {tên quy cách, **khối lượng tịnh**, mã HH kho} | Dòng "Quy cách", `sku` trong schema |
| Tình trạng | `stock_status`: `co-san` / `dat-hang` / `ngung-ban` | Dòng trạng thái trong khung báo giá |
| Sử dụng | `applications`, `not_for` (không nên dùng cho) | Mục "Ứng dụng" |
| An toàn | `warnings` (cảnh báo từ SDS), `storage` (bảo quản), `shelf_life` (hạn dùng) | Mục "Bảo quản và an toàn" |
| Tài liệu | `tds_url`, `sds_url` | Nút tải TDS / SDS |
| Liên quan | `equivalents` (mã tương đương), `related_posts` | Mục "Sản phẩm tương đương" |
| Ảnh | `images`: danh sách {src, alt}, ảnh đầu là ảnh chính | Ảnh chính + ảnh nhỏ |

Hai điều cố ý **không** đưa vào file sản phẩm:
- **Số lượng tồn kho.** Web là trang tĩnh, con số sẽ sai sau vài ngày, khách gọi tới hỏi mà hết hàng thì mất uy tín; đối thủ cũng xem được. Chỉ ghi `stock_status`.
- **Giá.** Theo chính sách giá đã chốt, web chỉ hiện **khoảng giá** (giá hiện tại → +15%), lấy từ một file dữ liệu chung, không ghi trong từng file sản phẩm, để cập nhật một lần cho cả site.

Các thông số trong `specs`, `warnings` phải chép từ TDS / SDS chính hãng. Không tự suy đoán, không chép số của mã khác.

### 6.3. Danh mục (`danhmuc/`)
Thêm: `nav_label`, `order`, `summary`, `image` + `image_alt`. Bố cục thân bài theo `cau-truc-site.md` mục 3.1.

### 6.4. Bài viết (`blog/`)
Thêm:
- `loai`: `kien-thuc` | `huong-dan-su-dung` | `so-sanh` | `tin-tuc`.
- `category`: hub mà bài hỗ trợ (để gắn link ngược).
- `related_products`: các sản phẩm nhắc tới.
- `date` (bắt buộc), `updated`, `image` + `image_alt`.

Vì sao không chia thư mục con `blog/huong-dan/...`: thư mục con sẽ chen vào URL (`/ho-tro-ky-thuat/huong-dan/...`), làm URL dài và phải đổi URL nếu sau này đổi loại bài. Dùng trường `loai` thì lọc được mà URL vẫn gọn.

### 6.5. Ngày đăng và ngày cập nhật

Google so ngày hiện trên trang, `datePublished` / `dateModified` trong schema, thẻ `article:published_time` / `article:modified_time` và `<lastmod>` trong sitemap. Các ngày này lệch nhau, hoặc ngày cập nhật đổi mà nội dung không đổi, đều làm giảm độ tin cậy của trang. Vì vậy cả bốn chỗ đều lấy từ **hai trường duy nhất** trong frontmatter (xử lý ở `src/lib/ngay.ts`):

| Trường | Khi nào ghi / đổi | Không được |
|---|---|---|
| `date` | Ghi một lần, là ngày bài **lên web lần đầu** (bật `active: true`) | Đổi `date` khi sửa bài; đặt ngày ở tương lai |
| `updated` | Khi sửa **nội dung thật**: thông số, đoạn văn, bảng, câu hỏi thường gặp, nguồn | Đổi khi chỉ sửa chính tả, đổi ảnh, đổi link, sửa template; đặt trước `date` |

- Dạng ngày: `YYYY-MM-DD`, ví dụ `date: "2026-10-09"`. Không ghi giờ.
- Bài mới: `date` và `updated` cùng một ngày. Trên trang chỉ hiện "Đăng ngày"; khi `updated` khác `date` mới hiện thêm "Cập nhật".
- Thiếu `updated` thì coi như chưa sửa (dùng `date`). Trang không có cả hai thì không hiện ngày và không có `<lastmod>`; **không** dùng ngày build.
- Trang cũ chưa biết ngày đăng thật: chỉ ghi `updated`, **không** đoán `date`.
- Kiểm tra tự động: `npm run check:content` và lúc build (`src/content.config.ts`) báo lỗi khi ngày sai dạng, ở tương lai, hoặc `updated` trước `date`; bài viết thiếu `date` cũng báo lỗi.

---

## 7. Quy trình thêm một trang

1. Copy file mẫu tương ứng từ `src/content/_templates/` vào đúng thư mục, đặt tên file theo mục 3.
2. Điền frontmatter, xóa các dòng `[...]` không dùng. Trường không có dữ liệu thì **xóa dòng**, không để chữ "[...]".
3. Viết thân bài theo khung trong file mẫu.
4. Ảnh: theo mục 5.
5. Chạy `npm run check:content` → sửa hết lỗi.
6. Chạy `npm run build` (hoặc `npm run dev` để xem trước).

---

## 7a. Bật / tắt bài (`active`)

Thêm 05/10/2026. Mỗi file trong `danhmuc/`, `sanpham/`, `blog/` có dòng `active: true` hoặc `active: false` ngay dưới `ma`.

| Giá trị | Khi deploy / push |
|---|---|
| `active: true` | Build ra trang, có trong sitemap, menu, trang chủ, danh sách sản phẩm của danh mục, gợi ý ở trang báo giá |
| `active: false` (hoặc thiếu dòng) | **Không** build trang. File vẫn giữ nguyên, bật lại bất cứ lúc nào |

Quy tắc đi kèm:
- Sản phẩm chỉ hiện khi **danh mục của nó cũng đang bật**. Tắt một danh mục là ẩn luôn mọi sản phẩm trong đó.
- Link tới bài đang tắt trong thân bài khác được **tự bỏ khi build** (chữ vẫn giữ, chỉ mất link), nên không sinh link 404. Xử lý ở `src/components/ContentBody.astro`.
- Bảng "có tại kho" chỉ gắn link cho dòng có trang sản phẩm đang bật.
- `npm run check:content` báo số bài bật/tắt, file thiếu `active`, link trỏ tới bài đang tắt.
- `npm run anh` chỉ đưa ảnh của bài đang bật vào danh sách cần up.
- Tắt một trang **đã lên Google** (đã deploy trước đó): thêm dòng 301 về trang danh mục trong `public/_redirects`, nếu không URL cũ sẽ trả 404.

Theo kho tháng 10/2026: sản phẩm có trong file kho thì `true`, không có thì `false` (ghi chú ngay trên dòng). Danh mục và bài blog đều đang `true`.

**Bài chờ TDS** (05/10/2026): mọi mã trong file kho tháng 10 đều đã có trang. 13 trang mới (EMI, X-One, EMER, APEX, Maxima, VHP Spadila ATF, P140, Rosia CPR, ENEOS MC, Maxxi) để `active: false` + `stock_status: "co-san"` cho tới khi có TDS. TDS up vào thư mục `TDS/<slug>/` ở gốc dự án (ngoài repo, xem `TDS/README.md`). Có TDS → điền `specs`, `standards`, cảnh báo SDS, xóa các dòng `TODO TDS` → đổi `active: true`.
Hai danh mục mới `dau-nhot-xe-may`, `nuoc-lam-mat` đang `active: false` (hàng bán lẻ, chờ quyết định có đưa lên web không); khi tắt thì trang sản phẩm trong đó cũng ẩn.
Bài tắt vì hết hàng để `stock_status: "dat-hang"`. `npm run anh` liệt kê riêng ảnh của bài chờ TDS để chụp trước.

---

## 8. Bảng "Sản phẩm có tại kho" trên trang danh mục

Quyết định 03/10/2026 (thay quy tắc "chỉ mã chủ lực" của 02/10): **mọi dòng sản phẩm có TDS chính hãng được làm trang riêng**. Mã không có TDS chỉ là một dòng trong bảng trên trang danh mục, có nút "Báo giá".

- Dữ liệu bảng: `src/data/san-pham-kho.json` (không có giá, không có số tồn), hiển thị bằng `src/components/StockTable.astro`.
- Sinh lại khi có file kho mới: `python3 scripts/build-product-table.py "../du-lieu-noi-bo/sản phẩm có sẵn trong kho-tháng 10.csv"` (nhận file CSV của kho, hoặc file JSON cũ). File kho nằm ngoài repo.
- Sau khi sinh bảng, đối chiếu và sửa `active` của từng trang sản phẩm cho khớp file kho.
- Dầu xe máy (ENEOS MC) và nước làm mát (Maxxi) có trong kho nhưng chưa có danh mục trên web nên script bỏ qua.
- Thêm dòng hàng mới hoặc trang sản phẩm mới: sửa danh sách `RULES` trong script (tên dòng, danh mục, slug trang), và `GRADES` (cấp hiển thị).
- Danh sách ảnh cần chụp: `docs/ANH-CAN-CHUP.md`.

## 9. Việc còn lại

- [ ] Chụp ảnh thật theo `docs/ANH-CAN-CHUP.md`, tạo ảnh cho các danh mục còn thiếu.
- [ ] Xin TDS bản PDF cho các mã VHP chưa có trên web hãng (Rosia VCU, Spin Oil 10, Antirus, Topax, Rosia CPR, Rosia SLW, Spider, Spadila ATF) để làm trang.
- [ ] Tạo `src/data/khoang-gia` để hiện khoảng giá.
- [ ] Tạo `public/tai-lieu/tds|sds/` và tải PDF chính hãng.
- [ ] Menu đang phẳng 15 mục: chuyển sang menu nhóm theo `cau-truc-site.md` mục 2.
