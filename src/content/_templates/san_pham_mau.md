---
# ============================================================
# MẪU TRANG SẢN PHẨM  ·  copy vào src/content/sanpham/<slug>.md
# Hướng dẫn đầy đủ: docs/CAU-TRUC-NOI-DUNG.md
#
# URL = /<category>/<tên file>   ví dụ: /dau-thuy-luc/eneos-super-hyrando-68
# Tên file (slug): chữ thường, không dấu, gạch ngang, hãng + dòng + cấp.
# Chỉ làm trang khi đủ 3 điều kiện: có hàng thường xuyên, có TDS chính hãng,
# tên mã >= 40 lượt tìm/tháng hoặc bán chạy nhất nhóm.
# Không ghi giá trong file này (giá lấy từ bảng khoảng giá).
# ============================================================

# --- Định danh ---
ma: "SP-THL-001"                  # Mã bài viết: SP-<nhóm>-<số>. Bảng mã nhóm ở docs
active: true                      # Bật/tắt bài: true = build và hiển thị trên web; false = ẩn (không xóa file).
                                  # Thiếu trường này = ẩn. Link tới bài đang ẩn trong bài khác tự bỏ khi build.
                                  # Sản phẩm chỉ hiện khi danh mục (category) của nó cũng active: true.
title: "[Hãng Dòng Cấp – vd: ENEOS Super Hyrando 68]"   # H1, đúng tên trên nhãn
seo_title: "[<= 60 ký tự: Tên mã – Loại dầu + cấp | Quy cách]"
description: "[<= 155 ký tự: loại dầu, tiêu chuẩn, ứng dụng chính, quy cách, CO/CQ, giao Hải Phòng]"
keywords: ["[tên mã]", "[tên mã viết thường/không dấu]", "[loại dầu + cấp]"]
category: "[slug danh mục – vd: dau-thuy-luc]"
categoryName: "[Tên danh mục – vd: Dầu Thủy Lực]"

# --- Phân loại kỹ thuật (chỉ điền trường phù hợp) ---
brand: "[ENEOS]"
origin: "[Nhật Bản / Việt Nam / Singapore...]"
vg: 68                            # Dầu công nghiệp: cấp ISO VG
# nlgi: "2"                       # Mỡ: cấp NLGI
# sae: "15W-40"                   # Dầu động cơ / dầu cầu
# api: "CI-4"                     # Cấp API (CI-4, CF-4, GL-5...)
base_oil: "[Dầu gốc khoáng / Tổng hợp PAO...]"
standards: ["[ISO 11158 HM]", "[DIN 51524-2 HLP]"]

# --- Thông số điển hình: chép từ TDS, KHÔNG tự đoán ---
# Thứ tự khuyến nghị: Màu sắc · Tỷ trọng 15 °C · Độ nhớt 40 °C · Độ nhớt 100 °C
# · Chỉ số độ nhớt · Điểm chớp cháy · Điểm đông đặc · (mỡ: Độ xuyên kim, Điểm nhỏ giọt)
specs:
  - { name: "Màu sắc", value: "[Vàng nhạt]", method: "[Quan sát / ASTM D1500]" }
  - { name: "Tỷ trọng ở 15 °C", value: "[0,87 g/cm³]", method: "[ASTM D4052]" }
  - { name: "Độ nhớt động học ở 40 °C", value: "[68 cSt]", method: "[ASTM D445]" }
  - { name: "Độ nhớt động học ở 100 °C", value: "[8,7 cSt]", method: "[ASTM D445]" }
  - { name: "Chỉ số độ nhớt", value: "[100]", method: "[ASTM D2270]" }
  - { name: "Điểm chớp cháy cốc hở", value: "[230 °C]", method: "[ASTM D92]" }
  - { name: "Điểm đông đặc", value: "[-15 °C]", method: "[ASTM D97]" }
tds_date: "[09/2026]"             # Tháng tải TDS
tds_url: "[/tai-lieu/tds/eneos-super-hyrando-68.pdf hoặc link PDF chính hãng]"
sds_url: "[/tai-lieu/sds/eneos-super-hyrando-68.pdf]"
thong_so_cuoi: true               # Bảng thông số TDS + Ứng dụng đặt sau phần phân tích (mẫu ENEOS 68). Bỏ dòng này nếu chưa có specs

# --- Thương mại ---
packaging:                        # Quy cách đang bán. sku = Mã HH trong phần mềm kho
  - { name: "Phuy 200 L", weight: "[~175 kg]", sku: "[MÃ-HH]" }
  - { name: "Xô 18 L", weight: "[~16 kg]", sku: "[MÃ-HH]" }
stock_status: "co-san"            # co-san | dat-hang | ngung-ban (không ghi số lượng tồn)
equivalents: ["[Shell Tellus S2 MX 68]", "[Castrol Hyspin AWS 68]"]

# --- Sử dụng & an toàn ---
applications:
  - "[Máy ép nhựa, máy ép thủy lực chạy liên tục]"
  - "[Bơm bánh răng, bơm cánh gạt, bơm piston]"
not_for:
  - "[Bơm có chi tiết mạ bạc (cần dầu không kẽm)]"
warnings:                         # Lấy từ SDS mục 2 và 7
  - "[Tránh tiếp xúc lâu với da; rửa bằng xà phòng]"
  - "[Không đổ ra cống rãnh; thu gom dầu thải đúng quy định]"
storage: "[Để trong nhà, tránh nắng mưa, phuy nằm ngang]"
shelf_life: "[60 tháng từ ngày sản xuất khi chưa mở nắp]"

# --- Ảnh: ảnh CHỤP THẬT, ảnh đầu là ảnh chính ---
# KÍCH THƯỚC ẢNH SẢN PHẨM:
#   - Tỉ lệ 1:1 (vuông). Ảnh gốc tối thiểu 1200 × 1200 px, khuyến nghị 1600 × 1600 px.
#   - Nền sáng, trơn; sản phẩm ở giữa, chiếm 70–80% khung, chừa lề đều 4 phía.
#   - Định dạng gốc .jpg hoặc .png, tối đa 10 MB. Không chèn chữ, logo, watermark lên ảnh.
#   - Web hiển thị: ảnh chính 600 × 600, ảnh nhỏ 80 × 80, thẻ danh mục cắt 400 × 200 (giữ chủ thể ở giữa).
#   - `npm run images` tự tạo 2 bản .webp: rộng 1200 px (<= ~150 KB) và -600 (<= ~60 KB).
# Số ảnh: 3–5 tấm = mặt trước · nhãn sau (đọc được cấp nhớt, tiêu chuẩn) · từng quy cách · ảnh trong kho.
# Tên file: <slug>-<mô-tả>.jpg, đặt ở anh-goc/san-pham/, ví dụ eneos-super-hyrando-68-phuy-200l.jpg
images:
  - { src: "/images/san-pham/[slug]-phuy-200l.webp", alt: "[Phuy 200 lít dầu thủy lực ENEOS Super Hyrando 68 tại kho Hải Phòng]" }
  - { src: "/images/san-pham/[slug]-xo-18l.webp", alt: "[Xô 18 lít ENEOS Super Hyrando 68]" }
  - { src: "/images/san-pham/[slug]-nhan.webp", alt: "[Nhãn sau xô ENEOS Super Hyrando 68 ghi tiêu chuẩn và cấp độ nhớt]" }

# --- Đầu trang (hiện ngay dưới tiêu đề) ---
doc_gia: "[Trang này dành cho ai: một câu, vd kỹ thuật viên và người mua hàng cần đối chiếu sổ tay máy trước khi chọn mã]"
tom_tat:                          # 3–5 ý, **đậm** được. Thứ tự: dùng được cho / không dùng khi / quy cách có sẵn / thay dầu theo
  - "**Dùng được** cho [máy, loại dầu sổ tay ghi]."
  - "**Không dùng** khi [trường hợp], chọn [mã khác]."
  - "**Có sẵn** [quy cách] tại kho Hải Phòng; [quy cách khác] nhận đặt."
  - "**Thay dầu theo kết quả đo**. Ngưỡng ở mục \"Khi nào cần thay dầu?\"."

# --- Liên kết & quản lý ---
related_posts: ["[slug bài blog liên quan]"]
tags: ["[iso-vg-68]", "[chong-mai-mon]"]
reviewed_by: "[Họ tên – chức vụ người duyệt kỹ thuật]"
# Ngày (YYYY-MM-DD) – xem docs/CAU-TRUC-NOI-DUNG.md mục 6.5:
#   date: ngày trang lên web lần đầu, không đổi khi sửa. Trang cũ chưa rõ ngày đăng thì xóa dòng date, không đoán.
#   updated: ngày sửa nội dung thật (thông số, đoạn văn, bảng). Sửa chính tả, đổi ảnh/link thì giữ nguyên.
date: "2026-10-03"
updated: "2026-10-03"
---

[Đoạn mở đầu 40–60 từ: sản phẩm là gì, đạt tiêu chuẩn gì, dùng cho máy nào. Viết bằng lời của mình, không chép mô tả của hãng.]

[Một câu tình trạng kho: quy cách có sẵn / nhận đặt theo yêu cầu, giấy tờ.]

<!-- Bố cục theo mẫu ENEOS Super Hyrando 68 (PR #40, #41). H2 viết dạng câu hỏi của người mua. -->

## [Tên mã] có hợp với máy của bạn không?

| Sổ tay máy ghi | Dùng [tên mã] được không? |
| :--- | :--- |
| [ISO VG 68, HM, HLP 68…] | **Được.** |
| [Trường hợp không dùng] | Không. Chọn [mã khác](/[danh-muc]/[slug]). |

## Thông số này có ý nghĩa gì khi máy chạy?

[Bảng thông số kỹ thuật](#thong-so-ky-thuat) ở cuối bài là giá trị điển hình theo TDS [nguồn, ngày].

- **[Chỉ tiêu]:** [ý nghĩa khi vận hành, gắn với số liệu TDS]

## Nên chọn [cấp A] hay [cấp B]?

[Bảng so các cấp trong dòng, số liệu TDS.]

> **Nhận định của HT VINA:** [Lời khuyên của mình, có căn cứ. Mọi đoạn tư vấn riêng đều gắn nhãn này để tách khỏi số liệu hãng.]

## [Tên mã] hay [mã cùng loại có sẵn tại kho]?

[Bảng so số liệu TDS hai bên; giá chỉ lấy từ bảng giá công khai (/bao-gia-dau-thuy-luc), quy ra đ/L. Chỉ tiêu hãng không công bố ghi "Không công bố".]

> **Nhận định của HT VINA:** [Khi nào chọn mã nào.]

## Khi nào cần thay dầu?

| Chỉ tiêu | Ngưỡng nên thay dầu | Dụng cụ đo tại xưởng |
| :--- | :--- | :--- |
| Độ nhớt ở 40 °C | [Ngoài khoảng ±10% so với TDS] | [Máy đo độ nhớt LND-1](/thiet-bi-kiem-tra-dau/may-do-do-nhot-cam-tay-lnd-1) |
| Trị số axit (TAN) | Tăng thêm 0,2 mg KOH/g so với dầu mới (ASTM D6224) | [Bộ kit test TAN](/thiet-bi-kiem-tra-dau/bo-kit-test-tan-biolab-tlb) |
| Nước | [Trên 0,05%] | [Test nước tại hiện trường](/ho-tro-ky-thuat/test-nuoc-trong-dau-tai-hien-truong) |

## Câu hỏi thường gặp

### Bao lâu thì thay dầu [tên mã]?
[Trả lời ngắn, trỏ về mục "Khi nào cần thay dầu?".]

### [Câu hỏi 2 – vd: Có trộn với dầu hãng khác được không?]
[Trả lời 2–3 câu.]

## Quy cách và giấy tờ khi mua

- **Quy cách có sẵn:** [quy cách]. [Quy cách khác] nhận đặt theo yêu cầu.
- **Giấy tờ:** hóa đơn VAT cho mỗi lô. CO/CQ cung cấp theo lô khi khách yêu cầu.
- **Giao hàng:** từ kho tại TP Hải Phòng (Hải Dương cũ) đi các tỉnh miền Bắc.
- **Giá:** [khoảng giá từ bảng giá công khai, hoặc "báo theo số lượng"], [gửi yêu cầu báo giá](/bao-gia?sp=[Tên%20mã]).
