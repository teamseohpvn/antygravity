# Bảng giá động (Cloudflare D1) và trang quản trị giá

Lập 06/10/2026.

## 1. Cách hoạt động

```
Nhân viên ─► /quan-tri ─► API ─► ghi D1 "gia-dau"
                             └─► render trang bảng giá MỘT lần từ D1
                                 └─► lưu file HTML vào KV "TRANG_TINH"

Khách, Google ─► /bao-gia-dau-thuy-luc ─► middleware trả nguyên HTML trong KV (không đọc D1)
```

- **Nguồn giá duy nhất là D1**, nhập qua `/quan-tri`. Không đọc giá từ file Excel, CSV hay JSON nào.
- **Trang bảng giá là HTML tĩnh đã xuất bản.** Mỗi lần quản trị lưu thay đổi (giá, ẩn/hiện, thêm/sửa/xóa, cấu hình), API render lại trang từ D1 rồi lưu HTML vào Workers KV. Khách truy cập chỉ đọc KV, không chạy SQL. Lưu mà không có gì thay đổi thì không xuất bản lại.
- **Thời gian khách thấy giá mới:** tối đa khoảng 1 phút. Cloudflare giữ bản sao KV tại máy chủ gần khách 60 giây, và trình duyệt cũng giữ 60 giây.
- **Nút "Xuất bản lại trang bảng giá"** trong `/quan-tri` dùng khi lần xuất bản trước báo lỗi.
- **Tự phục hồi:** KV chưa có trang (lần đầu), hoặc vừa deploy bản code mới (mã build khác), thì lượt truy cập đầu tiên render một lần từ D1 và lưu lại. Nhờ vậy trang không bao giờ trỏ tới file CSS/JS của bản build cũ.
- Trang công khai **chỉ hiện khoảng giá**: giá hiện tại → giá × hệ số (mặc định 1,15), có làm tròn (`src/lib/gia-tinh.ts`).
- Mọi lần sửa giá đều ghi vào bảng `lich_su_gia`: ai sửa, lúc nào, giá cũ, giá mới.

| File | Vai trò |
|---|---|
| `wrangler.jsonc` | Khai báo D1 |
| `migrations/0001_bang_gia.sql` | Tạo bảng `gia_san_pham`, `lich_su_gia`, `cau_hinh` |
| `src/lib/gia.ts`, `src/lib/gia-tinh.ts` | Đọc D1, tính khoảng giá |
| `src/components/PriceTable.astro` | Bảng giá (điện thoại hiện dạng thẻ) |
| `src/pages/bao-gia-dau-thuy-luc.astro` | Trang bảng giá dầu thủy lực |
| `src/pages/quan-tri/*`, `src/pages/api/quan-tri/*` | Trang quản trị + API |
| `src/lib/trang-tinh.ts` | Đọc/ghi trang HTML tĩnh trong KV, danh sách trang bảng giá (`TRANG_GIA`) |
| `src/middleware.ts`, `src/lib/admin-auth.ts` | Trả trang tĩnh từ KV; đăng nhập, chống CSRF, noindex |
| `scripts/seed-gia.py`, `migrations-seed/seed-san-pham.sql` | Danh sách sản phẩm ban đầu (kho 10/2026), **không có giá** |

## 2. Triển khai lần đầu

`wrangler.jsonc` **không ghi id** của D1 và KV. Lần deploy đầu, wrangler tự tạo database `gia-dau` và namespace KV rồi gắn vào Worker. Lần truy cập đầu tiên, code tự tạo bảng và nạp danh sách sản phẩm **không có giá** (`src/lib/khoi-tao.ts`). Vì vậy chỉ cần:

1. **Deploy** (push nhánh, Cloudflare Workers Builds tự build).
2. **Đặt mật khẩu quản trị** trong Cloudflare Dashboard → Workers & Pages → `clauderseo` → Settings → Variables and Secrets, thêm 2 secret:
   - `ADMIN_PASSWORD`: mật khẩu chung cho nhân viên.
   - `ADMIN_SECRET`: chuỗi ngẫu nhiên tối thiểu 32 ký tự, ví dụ lấy từ `openssl rand -hex 32`. Đổi chuỗi này sẽ đăng xuất mọi người.

   Hoặc dùng lệnh `npx wrangler secret put ADMIN_PASSWORD` và `npx wrangler secret put ADMIN_SECRET`.
3. Vào `/quan-tri`, đăng nhập, nhập giá rồi bấm **Lưu tất cả**.
4. **Khuyến nghị: bật Cloudflare Access** cho `/quan-tri*` và `/api/quan-tri/*`. Vào Zero Trust → Access → Applications, thêm ứng dụng self-hosted và chỉ cho phép email công ty.

Sau lần deploy đầu, nên chép id mà wrangler đã tạo (Dashboard → D1 / KV) vào `wrangler.jsonc` (`database_id`, `id`) cho cố định.

Chạy tay (không bắt buộc): `npx wrangler d1 migrations apply gia-dau --remote`, rồi `npx wrangler d1 execute gia-dau --remote --file migrations-seed/seed-san-pham.sql`. Lệnh thứ hai **xóa toàn bộ dòng cũ**, chỉ dùng cho database mới.

## 3. Dùng hằng ngày

1. Vào `https://daucongnghiephp.com.vn/quan-tri`, đăng nhập bằng **tên của bạn** và mật khẩu chung.
2. Lọc danh mục, sửa ô **Giá hiện tại** của một đơn vị đóng gói (phuy, xô). Cột "Web hiển thị" cho xem trước khoảng giá sẽ lên web.
3. Bấm **Lưu tất cả**. Giá lệch quá 20% so với giá cũ sẽ phải xác nhận thêm.
4. Tháng nào giá không đổi: bấm **Đã rà giá hôm nay, giữ nguyên**. Ngày rà soát và "Tháng MM/YYYY" trên tiêu đề trang chỉ đổi khi có người rà thật.
5. Mã tạm hết hàng thì bỏ tích **Hiện**. Mã ngừng kinh doanh thì **Xóa**.
6. Ô **Giá đã gồm VAT** phải khớp với cách nhập giá: cả bảng nhập cùng một kiểu.

## 4. Thêm trang bảng giá cho danh mục khác

1. Copy `src/pages/bao-gia-dau-thuy-luc.astro` thành `bang-gia-<slug-danh-muc>.astro`.
2. Đổi `CATEGORY`, tiêu đề, nội dung riêng của nhóm dầu.
3. Thêm URL vào `TRANG_GIA` trong `src/lib/trang-tinh.ts`, vào `customPages` của sitemap trong `astro.config.mjs`, và vào `PUBLIC_PAGES` trong `src/pages/quan-tri/index.astro`.
4. Đặt link từ trang danh mục (hub) tới trang bảng giá.

## 5. Chạy thử trên máy

```
npx wrangler d1 migrations apply gia-dau --local
npx wrangler d1 execute gia-dau --local --file migrations-seed/seed-san-pham.sql
# .dev.vars (không commit): ADMIN_PASSWORD=..., ADMIN_SECRET=<64 ký tự hex>
npx astro dev --background
```
