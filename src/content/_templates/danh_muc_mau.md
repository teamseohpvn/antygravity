---
# ============================================================
# MẪU TRANG DANH MỤC (HUB)  ·  copy vào src/content/danhmuc/<slug>.md
# Hướng dẫn đầy đủ: docs/CAU-TRUC-NOI-DUNG.md
#
# URL = /<tên file>   ví dụ: /dau-thuy-luc
# Tên file (slug) = từ khóa chính, không dấu, gạch ngang, không ghi năm.
# Đã đăng thì KHÔNG đổi tên file (đổi = đổi URL, phải làm 301).
# ============================================================
ma: "DM-01"                       # Mã bài viết: DM-<số 2 chữ số>
active: true                      # Bật/tắt bài: true = build và hiển thị trên web; false = ẩn (không xóa file).
                                  # Thiếu trường này = ẩn. Link tới bài đang ẩn trong bài khác tự bỏ khi build.
title: "[H1: tên loại + tên gọi khác + cấp phổ biến – vd: Dầu Thủy Lực (Nhớt Thủy Lực) 32, 46, 68]"
nav_label: "[Tên ngắn trên menu]"
order: 99                         # Thứ tự trên menu và trang chủ
summary: "[Mô tả ngắn trên thẻ danh mục ở trang chủ, <= 60 ký tự]"
seo_title: "[<= 60 ký tự, từ khóa chính ở đầu, không ghi năm]"
description: "[<= 155 ký tự: từ khóa, hãng, CO/CQ, quy cách, khu vực]"
keywords: ["[từ khóa chính]", "[tên gọi khác]", "[từ khóa + cấp]"]
tags: ["[the-1]", "[the-2]"]

# Ảnh minh họa danh mục (được phép dùng ảnh AI, KHÔNG có logo/chữ).
# KÍCH THƯỚC ẢNH DANH MỤC:
#   - Tỉ lệ 3:2 (ngang). Ảnh gốc tối thiểu 1536 × 1024 px, khuyến nghị 1800 × 1200 px.
#   - Chủ thể ở giữa; không đặt chi tiết quan trọng sát mép (web phủ lớp tối + chữ trắng, có thể cắt mép).
#   - Ảnh hero trang chủ: 16:9, tối thiểu 1920 × 1080 px.
#   - `npm run images` tạo bản .webp rộng 1200 px và -600 px.
# Ảnh gốc: anh-goc/danh-muc/<slug>.jpg  ->  npm run images
image: "/images/danh-muc/[slug].webp"
image_alt: "[Mô tả thật của ảnh – vd: Phuy dầu thủy lực xếp trên pallet trong kho]"

reviewed_by: "[Họ tên – chức vụ người duyệt kỹ thuật]"
# Ngày (YYYY-MM-DD) – xem docs/CAU-TRUC-NOI-DUNG.md mục 6.5:
#   date: ngày trang lên web lần đầu, không đổi khi sửa. Trang cũ chưa rõ ngày đăng thì xóa dòng date, không đoán.
#   updated: ngày sửa nội dung thật (thông số, đoạn văn, bảng). Sửa chính tả, đổi ảnh/link thì giữ nguyên.
date: "2026-10-03"
updated: "2026-10-03"
---

[Khối trả lời nhanh 40–60 từ: X là gì, dùng ở đâu, chọn theo tiêu chí gì.]

## Chọn [loại dầu] theo [cấp nhớt / nhiệt độ / loại máy]

| Cấp | Thông số chính | Thiết bị thường dùng |
| :--- | :--- | :--- |
| [..] | [..] | [..] |

## Chỉ tiêu cần xem trên TDS

- [Chỉ tiêu 1]: [ý nghĩa]

## Ứng dụng theo ngành

[Máy cụ thể, ngành nghề, KCN quanh kho.]

## Câu hỏi thường gặp

### [Câu hỏi 1]
[Trả lời 2–3 câu.]

### [Câu hỏi 2]
[Trả lời 2–3 câu.]
