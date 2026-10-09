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

## Tính năng chính

- **[Tính năng 1]:** [lợi ích cụ thể cho máy của khách]
- **[Tính năng 2]:** ...

## Khi nào nên chọn [tên mã]

[So với cấp nhớt khác hoặc mã tương đương: chọn khi nào, không chọn khi nào. Link về hub, ví dụ [dầu thủy lực](/dau-thuy-luc).]

## Câu hỏi thường gặp

### [Câu hỏi 1 – vd: Thay dầu sau bao nhiêu giờ?]
[Trả lời 2–3 câu.]

### [Câu hỏi 2 – vd: Có trộn với dầu hãng khác được không?]
[Trả lời 2–3 câu.]
