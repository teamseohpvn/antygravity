# Prompt tạo ảnh đại diện danh mục

Tài liệu này dùng để tạo 12 ảnh: 1 ảnh hero cho trang chủ và 11 ảnh danh mục. Mỗi danh mục có một ảnh riêng, thay cho 3 ảnh đang bị dùng lại.

## Công cụ nên dùng

- **Veo là mô hình tạo video.** Để tạo ảnh tĩnh, nên dùng Imagen 4 hoặc Gemini (Nano Banana) trong Google AI Studio hay Vertex AI. Prompt bên dưới dùng được cho cả hai.
- **Nếu vẫn dùng Veo**, tạo clip 4–8 giây với chuyển động máy quay thật chậm, rồi xuất một khung hình đẹp nhất ở độ phân giải cao nhất.
- **Viết prompt bằng tiếng Anh**, vì mô hình tạo ảnh cho kết quả ổn định hơn. Dòng tiếng Việt dưới mỗi prompt chỉ để giải thích.

## Quy tắc bắt buộc

1. **Không logo, không chữ, không nhãn hãng** (Shell, Castrol, Mobil…) trên phuy, xô hay máy. Ảnh AI có logo hãng dễ bị coi là giả mạo và vi phạm nhãn hiệu. Đây là ảnh minh họa danh mục, không phải ảnh sản phẩm.
2. **Không dùng ảnh AI cho trang sản phẩm cụ thể** (Castrol Hyspin AWS 68, Shell Omala S2 GX 220…). Trang sản phẩm phải dùng ảnh chụp thật phuy hoặc xô trong kho HT VINA.
3. **Không dùng ảnh AI làm "ảnh kho" hay "ảnh giao hàng"** của công ty. Ảnh kho phải là ảnh chụp thật.
4. **Thống nhất phong cách** cho cả bộ: ảnh chụp công nghiệp chân thực, ánh sáng nhà xưởng tự nhiên, tông lạnh xanh–xám có điểm nhấn cam nhẹ (hợp màu website #003366 / #f97316).
5. **Chủ thể đặt ở giữa khung hình.** Website phủ một lớp tối lên ảnh và đặt chữ trắng ở giữa, nên không cần chừa chỗ riêng cho chữ. Nhưng tránh đặt chi tiết quan trọng sát mép, vì ảnh sẽ bị cắt.
6. **Tỉ lệ khung:**
   - Ảnh danh mục: **3:2**, ngang, tối thiểu 1536×1024.
   - Ảnh hero: **16:9**, tối thiểu 1920×1080.

**Phần đuôi dùng chung.** Thêm đoạn sau vào cuối mọi prompt:

```
Photorealistic industrial photography, shot on a full-frame camera, 35mm lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents, clean and professional, Southeast Asian factory setting. No text, no logos, no brand names, no labels, no watermarks.
```

**Negative prompt** (nếu công cụ có ô này):

```
text, letters, logo, brand name, label, watermark, signature, cartoon, illustration, 3D render, CGI look, oversaturated, distorted hands, extra fingers, blurry, low quality
```

---

## Ảnh hero trang chủ

- **File:** `anh-goc/hero-trang-chu.png`
- **Tỉ lệ:** 16:9

```
Wide shot of a modern industrial lubricant warehouse: neat rows of unbranded blue and grey steel 209-litre oil drums on pallets, plastic 18-litre pails stacked on shelves, a forklift in soft focus in the background, high ceiling with daylight from skylights. Calm, organised, trustworthy atmosphere.
```

*Kho dầu công nghiệp gọn gàng: phuy 209L, xô 18L, xe nâng mờ phía sau.*

---

## Ảnh danh mục (11 ảnh)

### 1. Dầu thủy lực

- **File:** `anh-goc/danh-muc/dau-thuy-luc.png`

```
Close-up of a hydraulic power unit on a plastic injection moulding machine: hydraulic pump, steel pipes, pressure gauge, and clear amber hydraulic oil visible in a sight glass on the reservoir. A maintenance technician's gloved hand checks the oil level.
```

*Cụm bơm thủy lực máy ép nhựa, kính thăm dầu màu hổ phách.*

### 2. Mỡ bôi trơn (mỡ bò)

- **File:** `anh-goc/danh-muc/mo-boi-tron-cong-nghiep.png`

```
Macro shot of a technician applying smooth amber-brown lithium grease with a hand grease gun to a large industrial ball bearing and pillow block housing on a conveyor. Grease texture clearly visible, metal surfaces slightly worn from real use.
```

*Bơm mỡ vào vòng bi và gối đỡ băng tải.*

### 3. Mỡ chịu nhiệt

- **File:** `anh-goc/danh-muc/mo-chiu-nhiet.png`

```
Industrial kiln or drying oven fan bearing in a hot production area, faint orange glow of heat in the background, dark high-temperature grease on the bearing housing, heat haze, technician in heat-resistant gloves.
```

*Vòng bi quạt lò sấy trong môi trường nhiệt cao, mỡ màu tối.*

### 4. Dầu truyền nhiệt

- **File:** `anh-goc/danh-muc/dau-truyen-nhiet.png`

```
Thermal oil heater system in a factory boiler room: insulated steel pipes with silver cladding, a large thermal fluid heater, circulation pump, temperature gauges reading high values. Warm light, clean and well-maintained plant.
```

*Hệ thống lò dầu tải nhiệt: ống bọc bảo ôn, bơm tuần hoàn, đồng hồ nhiệt.*

### 5. Dầu máy nén khí

- **File:** `anh-goc/danh-muc/dau-may-nen-khi.png`

```
Industrial rotary screw air compressor with its side panel open in a clean compressor room, showing the air-oil separator and oil filter, a technician topping up clear compressor oil from an unbranded pail.
```

*Máy nén khí trục vít mở nắp, châm dầu.*

### 6. Dầu bánh răng

- **File:** `anh-goc/danh-muc/dau-banh-rang.png`

```
Large industrial gearbox (speed reducer) with the inspection cover removed, showing helical gears coated in golden gear oil, driving a heavy conveyor in a cement or steel plant. Strong side light emphasising the gear teeth.
```

*Hộp giảm tốc mở nắp, bánh răng phủ dầu vàng.*

### 7. Dầu cắt gọt

- **File:** `anh-goc/danh-muc/dau-cat-got.png`

```
Inside a CNC milling machine during cutting: milky white water-soluble coolant spraying onto the cutting tool and a steel workpiece, metal chips flying, droplets frozen in motion, machine lights illuminating the scene.
```

*Máy phay CNC đang cắt, dung dịch tưới nguội trắng sữa phun vào dao.*

### 8. Dầu chống gỉ

- **File:** `anh-goc/danh-muc/dau-chong-gi-set.png`

```
Precision machined steel parts and a mould insert on a workbench, freshly coated with a thin transparent rust-preventive oil film that catches the light, a spray nozzle applying the oil, parts neatly arranged for export packing.
```

*Chi tiết thép, khuôn được phủ màng dầu chống gỉ trong suốt.*

### 9. Dầu hộp số tự động (ATF)

- **File:** `anh-goc/danh-muc/dau-hop-so-tu-dong.png`

```
Maintenance bay of an industrial forklift fleet: a forklift with its engine cover open, a technician filling red automatic transmission fluid through a funnel, other forklifts parked in soft focus in a warehouse.
```

*Bảo dưỡng xe nâng, châm dầu ATF màu đỏ.*

### 10. Dầu rãnh trượt

- **File:** `anh-goc/danh-muc/dau-ranh-truot.png`

```
Close-up of the precision ground slideways of a CNC machining centre, a thin glossy film of way oil on the polished steel guideways, the machine table partially visible, clean workshop background.
```

*Băng trượt máy CNC bóng dầu.*

### 11. Dầu xung điện EDM

- **File:** `anh-goc/danh-muc/dau-xung-dien-edm.png`

```
Die-sinking EDM machine in a mould-making workshop: a copper electrode submerged in a tank of clear dielectric oil, tiny sparks and bubbles at the electrode tip, a steel mould block below.
```

*Máy xung điện định hình, điện cực đồng ngâm trong dầu điện môi.*

---

## Sau khi tạo xong ảnh

1. Đặt ảnh vào đúng tên file trong thư mục `anh-goc/` của repo (PNG hoặc JPG đều được). Thư mục này không được commit, vì là ảnh gốc nặng.
2. Chạy lệnh:
   ```sh
   npm run images
   ```
   Script sẽ tạo 2 bản WebP cho mỗi ảnh, vào thư mục `public/images/`:
   - bản rộng 1200px (khoảng 60–120 KB)
   - bản rộng 600px (khoảng 30–60 KB)
3. Chạy `npm run build`. Website tự nhận ảnh mới, không cần sửa code:
   - Hai danh mục **Dầu truyền nhiệt** và **Dầu cắt gọt** hiện chưa có ảnh. Code tự bỏ qua, nên thẻ đang hiện nền xanh, og:image không trỏ tới ảnh lỗi. Khi có file, ảnh sẽ tự hiện.
4. Commit các file `.webp` trong `public/images/` rồi push.

## Kiểm tra trước khi dùng ảnh

- [ ] Không có chữ, logo hay nhãn hãng nào (phóng to kiểm tra kỹ nhãn phuy, thân máy).
- [ ] Không có tay hoặc ngón tay bị biến dạng.
- [ ] Mỗi danh mục một ảnh khác nhau, không trùng.
- [ ] Chủ thể vẫn rõ khi thu nhỏ còn 380×250 (kích thước thẻ trên trang chủ).
