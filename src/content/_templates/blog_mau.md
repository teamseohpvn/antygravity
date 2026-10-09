---
# ============================================================
# MẪU BÀI VIẾT (blog, hướng dẫn sử dụng, so sánh, tin tức)
# copy vào src/content/blog/<slug>.md · Hướng dẫn: docs/CAU-TRUC-NOI-DUNG.md
#
# URL = /ho-tro-ky-thuat/<tên file>
# Tên file (slug) = từ khóa chính của bài, không dấu, gạch ngang, 3–7 từ, không ghi năm.
# Không tạo thư mục con trong blog/ (sẽ làm đổi URL) – phân loại bằng trường `loai`.
# ============================================================
ma: "BV-001"                      # Mã bài viết: BV-<số 3 chữ số>
active: true                      # Bật/tắt bài: true = build và hiển thị trên web; false = ẩn (không xóa file).
                                  # Thiếu trường này = ẩn. Link tới bài đang ẩn trong bài khác tự bỏ khi build.
loai: "kien-thuc"                 # kien-thuc | huong-dan-su-dung | so-sanh | tin-tuc
title: "[H1: câu hỏi/vấn đề người đọc tìm, chứa từ khóa chính]"
seo_title: "[<= 60 ký tự, từ khóa chính ở đầu]"
description: "[<= 155 ký tự: trả lời ngắn + lợi ích người đọc nhận được]"
keywords: ["[từ khóa chính]", "[từ khóa phụ]", "[câu hỏi dài]"]
category: "[slug danh mục mà bài hỗ trợ – vd: dau-thuy-luc]"
related_products: ["[slug sản phẩm 1]", "[slug sản phẩm 2]"]

# Tác giả thật (E-E-A-T). Chưa có thì xóa 2 dòng – bài sẽ đứng tên doanh nghiệp.
author: "[Họ tên kỹ sư]"
author_title: "[Chức vụ, số năm kinh nghiệm]"
# Ngày (YYYY-MM-DD) – xem docs/CAU-TRUC-NOI-DUNG.md mục 6.5:
#   date: ngày bài lên web lần đầu, KHÔNG đổi khi sửa bài. Bắt buộc.
#   updated: ngày sửa nội dung thật (số liệu, đoạn văn, bảng, FAQ). Sửa chính tả, đổi ảnh/link thì giữ nguyên.
#   Bài mới: hai ngày bằng nhau. Không đặt ngày tương lai, updated không trước date.
date: "2026-10-03"
updated: "2026-10-03"

# KÍCH THƯỚC ẢNH BÀI VIẾT:
#   - Ảnh bìa: tỉ lệ 16:9, ảnh gốc tối thiểu 1200 × 675 px, khuyến nghị 1600 × 900 px.
#   - Ảnh trong thân bài: rộng tối thiểu 1200 px, tỉ lệ 16:9 hoặc 4:3; bảng/sơ đồ xuất PNG.
#   - `npm run images` tạo bản .webp rộng 1200 px và -600 px.
# Ảnh gốc: anh-goc/blog/<slug>.jpg -> npm run images
image: "/images/blog/[slug].webp"
image_alt: "[Mô tả thật của ảnh]"
tags: ["[the-1]", "[the-2]"]
---

<!-- Mục lục tự sinh từ các H2/H3 và chèn ngay sau đoạn đầu này (bài từ 4 mục H2). Không tự gõ mục lục. Xem docs mục 6.6. -->
[Đoạn đầu trả lời thẳng câu hỏi trong 2–3 câu. Có link về danh mục, ví dụ [dầu thủy lực](/dau-thuy-luc).]

## [H2: ý chính 1]

[Nội dung, chia H3 khi cần. Bảng so sánh nếu có số liệu, ghi nguồn TDS/tiêu chuẩn.]

## [H2: ý chính 2 – với bài hướng dẫn sử dụng: các bước 1, 2, 3]

1. [Bước 1]
2. [Bước 2]

## Lưu ý an toàn

- [Lưu ý lấy từ SDS hoặc kinh nghiệm thực tế]

## Câu hỏi thường gặp

### [Câu hỏi 1]
[Trả lời 2–3 câu.]

## Xem thêm

- [Tên trang hub](/[slug-danh-muc])
- [Tên sản phẩm](/[slug-danh-muc]/[slug-san-pham])
