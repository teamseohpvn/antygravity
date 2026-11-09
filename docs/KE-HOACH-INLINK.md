# Kế hoạch liên kết nội bộ (inlink) toàn site

Lập ngày 08/11/2026. Áp dụng cho danh mục, sản phẩm, bài hướng dẫn kỹ thuật và blog.

## 1. Hiện trạng trước khi sửa (đo trên file nội dung, chỉ đếm link trong thân bài)

| Nhóm trang | Tình trạng |
| :--- | :--- |
| Bài hướng dẫn | `test-nuoc-trong-dau-tai-hien-truong` chỉ 1 link / 1.494 chữ. Bài `top-6-dau-thuy-luc-2026` và `dau-thuy-luc-may-xuc` mỗi bài chỉ được 1 trang khác link tới. |
| Danh mục | 16/18 danh mục chỉ có 3 link trong bài (đều nằm ở dòng "Xem thêm"), không link tới bài hướng dẫn nào. |
| Sản phẩm | 18 trang sản phẩm không được thân bài nào khác link tới (chỉ có lưới sản phẩm của danh mục). Trang sản phẩm có link về danh mục duy nhất ở cuối trang. |
| Phân bố | Bài test chất lượng dầu nhận 53 link, máy đo LND-1 nhận 31 link (do một câu mẫu lặp ở nhiều trang sản phẩm), trong khi nhiều trang khác gần như không có. |

## 2. Quy tắc (để không bị coi là nhồi link)

1. **Link nằm trong câu sẵn có.** Gắn link vào cụm từ đã có trong bài, không viết thêm câu chỉ để chèn link, không sửa văn của người viết.
2. **Mật độ:** trung bình không quá 1 link nội bộ trong thân bài trên khoảng 100–150 chữ. Một đoạn văn tối đa 2–3 link, trừ đoạn liệt kê tên mã hàng.
3. **Mỗi trang đích chỉ link 1 lần trong thân bài**, ở chỗ nhắc tới đầu tiên và tự nhiên nhất. Không lặp lại link mà khối mẫu (template) đã có.
4. **Chữ link mô tả đúng trang đích** ("dầu bánh răng", "thay dầu, súc rửa", "Cosmo Hydro AW 68"). Không dùng "tại đây", "click". Một chữ link chỉ trỏ về một URL.
5. **Chỉ link khi người đọc cần trang đó:** ví dụ bài nói tới chỉ tiêu nước trong dầu thì link bài test nước, không link sản phẩm cho có.
6. **Không nói quá:** không gắn nhãn "bán chạy", "được đánh giá cao" khi chưa có số liệu thật (đơn hàng, đánh giá Google). Phân khúc giá chỉ dựa trên giá công khai.

## 3. Khung link cố định trên trang sản phẩm (template, tự áp dụng cho mọi sản phẩm)

| Vị trí | Link | Ghi chú |
| :--- | :--- | :--- |
| Dưới khung giá | "Xem nhiều hơn các {loại dầu} cùng loại" → danh mục | Danh mục chỉ có 1 mã thì ghi "Xem danh mục {loại dầu}". |
| Dưới khung giá | "Xem báo giá nhiều mã dầu thủy lực khác" → `/bao-gia-dau-thuy-luc` | Chỉ dầu thủy lực. Mỡ bôi trơn link tới bảng giá mỗi kg `/mo-boi-tron-cong-nghiep#chi-phi`. Danh mục khác chưa có trang giá nên không có dòng này. |
| Cuối bài, khối "Cân nhắc thêm trước khi chọn" | "Muốn giá mềm hơn" / "Phân khúc giá cao hơn" → mã gần nhất phía dưới / phía trên | Cùng nhóm công dụng, cùng cấp SAE với dầu động cơ / dầu cầu. Tính theo giá thấp nhất mỗi lít/kg trong `src/data/gia-cong-khai.json`; chênh dưới 3% thì bỏ qua. Có câu ghi rõ giá cao hơn không có nghĩa là hợp máy hơn. |
| Cuối bài, cùng khối | "Hướng dẫn" → tối đa 2 bài kỹ thuật hợp loại dầu | Dầu thủy lực: xoay vòng 4 bài (chọn độ nhớt, thay dầu, máy xúc, top 6 hãng) theo slug để chia đều link. Thiết bị kiểm tra: 2 bài test. Dầu tuần hoàn khác: bài test chất lượng dầu. Thân bài đã link bài nào thì không lặp lại. |

## 4. Việc đã làm trên nội dung (08/11/2026)

- **Bài hướng dẫn:** test nước trong dầu (+5 link: dầu thủy lực, dầu bánh răng, dầu động cơ diesel, kit TAN, bài thay dầu); thay dầu thủy lực (+3: ENEOS, Castrol, bài máy xúc); test chất lượng dầu (+3: dầu cắt gọt, dầu xung điện, bài thay dầu); top 6 hãng (+1: Caltex Hydraulic Oil AW); máy xúc (+5: các mã 68 có ở kho).
- **Danh mục:** dầu thủy lực (+5: Castrol Hyspin AWS, bài máy xúc, bài test, bài thay dầu, bảng giá); dầu cầu hộp số, máy nén khí, truyền nhiệt (link bài test / bài test nước ngay chỗ nói về kiểm tra dầu); dầu bánh răng và dầu động cơ diesel (thêm bài test vào dòng "Xem thêm"); mỡ chịu nhiệt (+1 sản phẩm); thiết bị kiểm tra dầu (+3 sản phẩm trong bảng).

## 5. Việc làm tiếp

1. Khi có trang báo giá mỡ, dầu động cơ…: thêm vào `TRANG_GIA` trong `src/pages/[category]/[slug].astro`.
2. Khi có dữ liệu thật (số đơn theo mã, đánh giá trên Google Business Profile): mới thêm nhóm "mã được chọn nhiều". Chưa có thì không ghi.
3. Bài mới: trước khi đăng, kiểm tra theo mục 2 và thêm ít nhất 1 link **tới** bài mới từ danh mục hoặc bài liên quan (bài mới không được để mồ côi).
4. Đo lại sau 4–6 tuần trong Google Search Console (Liên kết → Liên kết nội bộ) xem các trang trước đây ít link đã được Google ghi nhận chưa.
