# Prompt tạo ảnh danh mục bằng Canva và CapCut

Tạo ngày 06/10/2026, dùng để thay toàn bộ ảnh đại diện danh mục trên daucongnghiephp.com.vn.
Bộ ảnh gồm **15 danh mục đang bật** và 1 ảnh hero trang chủ. Cuối file có thêm 2 danh mục đang tắt, để làm sau khi cần.

Quy tắc chung (không logo, không chữ, không dùng ảnh AI cho trang sản phẩm) giống `docs/prompt-anh-danh-muc.md`. File này viết riêng để dùng với Canva và CapCut.

---

## 1. Cách làm trên Canva

1. Tạo thiết kế có **cỡ tùy chỉnh 1536 × 1024 px** (tỉ lệ 3:2). Ảnh hero thì dùng 1920 × 1080.
2. Mở **Ứng dụng → Magic Media** (hoặc **Dream Lab**), chọn tab **Ảnh**.
   - Kiểu ảnh: **Ảnh chụp (Photo)**. Nếu có lựa chọn "Điện ảnh" thì cũng dùng được.
   - Tỉ lệ khung: **Ngang**.
3. Dán **prompt ngắn** (mục "Canva / CapCut") vào ô mô tả. Nếu ô cho phép nhập dài thì dán **prompt đầy đủ**, ảnh sẽ chi tiết hơn.
4. Bấm tạo, xem 4 phương án và chọn ảnh tốt nhất. Kéo ảnh phủ kín khung 1536 × 1024, giữ chủ thể ở giữa.
5. Nếu ảnh bị mờ khi phóng to: chọn ảnh, vào **Chỉnh sửa ảnh** rồi chọn **Upscale** (tính năng này có thể cần Canva Pro).
6. Tải về: **Chia sẻ → Tải xuống → PNG**, kích thước 1×. Không chụp màn hình ảnh.

**Giữ đồng bộ cả bộ ảnh:** tạo ảnh *Dầu thủy lực* trước. Nếu Dream Lab có ô **ảnh tham chiếu phong cách**, tải ảnh đó lên làm tham chiếu cho 14 ảnh còn lại.

## 2. Cách làm trên CapCut

1. Mở **CapCut** (web hoặc máy tính), vào **Công cụ AI → Tạo ảnh AI** (Text to image). Tên menu có thể khác một chút tùy phiên bản.
2. Chọn tỉ lệ **3:2**. Nếu không có 3:2 thì chọn **16:9** rồi cắt lại thành 3:2.
3. Dán prompt. Nếu có ô **"Không muốn xuất hiện" / Negative prompt** thì dán đoạn negative ở mục 3.
4. Chọn kiểu **Realistic / Chân thực**, độ phân giải cao nhất. Nếu có nút **Nâng cấp độ phân giải (Upscale / HD)** thì bấm trước khi tải.
5. Tải ảnh PNG hoặc JPG, chiều ngang tối thiểu 1536 px.

## 3. Phần dùng chung

**Viết prompt bằng tiếng Anh**, vì Canva và CapCut hiểu tiếng Anh tốt hơn nhiều. Dòng tiếng Việt in nghiêng dưới mỗi prompt chỉ để giải thích.

**Đuôi phong cách:** prompt đầy đủ bên dưới đã gắn sẵn đuôi này, prompt ngắn có bản rút gọn. Không cần dán thêm.

```
Photorealistic industrial photography, full-frame camera, 35mm lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents, clean professional look, Southeast Asian factory. No text, no logos, no brand names, no labels, no watermark.
```

**Negative prompt** (CapCut, hoặc công cụ nào có ô này):

```
text, letters, words, logo, brand name, label, sticker, watermark, signature, cartoon, illustration, 3D render, CGI, plastic look, oversaturated, distorted hands, extra fingers, deformed machine, blurry, low resolution, noise
```

**Bố cục:** website phủ một lớp tối lên ảnh và đặt chữ trắng ở giữa. Vì vậy:
- Chủ thể nằm ở giữa, rõ nét, không đặt sát mép.
- Ảnh đủ sáng và có độ tương phản. Ảnh quá tối sẽ bị đen hẳn sau lớp phủ.
- Nền đơn giản, không rối, vì thẻ danh mục chỉ khoảng 380 × 250 px.

---

## 4. Ảnh hero trang chủ

- **Lưu thành:** `anh-goc/hero-trang-chu.png` · khung **16:9**, 1920 × 1080

**Prompt đầy đủ**
```
Wide shot of a modern, well-organised industrial lubricant warehouse in Vietnam: neat rows of unbranded blue and grey 200-litre steel oil drums on wooden pallets, stacks of plain 18-litre plastic pails on metal racks, a forklift softly out of focus in the background, high ceiling with daylight coming through skylights, clean concrete floor. Calm, trustworthy atmosphere. Photorealistic industrial photography, full-frame camera, 35mm lens, natural lighting, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Clean industrial oil warehouse, rows of unbranded blue 200L drums on pallets, plain 18L pails on racks, forklift blurred behind, skylight daylight. Photorealistic, cool blue-grey tones, no text, no logos.
```
*Kho dầu gọn gàng: phuy 200L, xô 18L, xe nâng mờ phía sau.*

---

## 5. Ảnh 15 danh mục (khung 3:2, 1536 × 1024)

### 5.1. Dầu thủy lực
- **Lưu thành:** `anh-goc/danh-muc/dau-thuy-luc.png`
- **Alt gợi ý:** Cụm bơm thủy lực máy ép nhựa với kính thăm dầu thủy lực màu vàng

**Prompt đầy đủ**
```
Close-up of the hydraulic power unit of a plastic injection moulding machine: hydraulic pump and motor, polished steel pipes and hoses, a pressure gauge, and clear golden hydraulic oil visible in a round sight glass on the oil tank. A technician's gloved hand checks the oil level. Photorealistic industrial photography, full-frame camera, 35mm lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Hydraulic pump unit of an injection moulding machine, steel pipes, pressure gauge, golden oil in sight glass, gloved hand checking. Photorealistic factory photo, blue-grey tones, no text, no logos.
```
*Cụm bơm thủy lực máy ép nhựa, kính thăm dầu màu vàng hổ phách.*

### 5.2. Mỡ bôi trơn công nghiệp (mỡ bò)
- **Lưu thành:** `anh-goc/danh-muc/mo-boi-tron-cong-nghiep.png`
- **Alt gợi ý:** Kỹ thuật viên bơm mỡ bò vào gối đỡ vòng bi băng tải bằng súng bơm mỡ

**Prompt đầy đủ**
```
Macro shot of a technician using a manual grease gun to pump smooth amber-brown lithium grease into the grease nipple of a cast-iron pillow block bearing on a conveyor line. Glossy grease texture clearly visible, slightly worn metal from real use. Photorealistic industrial photography, full-frame camera, 50mm macro lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Macro: grease gun pumping amber lithium grease into a pillow block bearing on a conveyor, glossy grease texture. Photorealistic factory photo, blue-grey tones, no text, no logos.
```
*Bơm mỡ vào gối đỡ vòng bi băng tải.*

### 5.3. Mỡ chịu nhiệt
- **Lưu thành:** `anh-goc/danh-muc/mo-chiu-nhiet.png`
- **Alt gợi ý:** Vòng bi quạt lò sấy bôi mỡ chịu nhiệt trong khu vực nhiệt độ cao

**Prompt đầy đủ**
```
Bearing housing of a large industrial furnace fan in a hot production area, dark high-temperature grease on the bearing and shaft, a warm orange glow from the furnace opening in the background, light heat haze, a technician wearing heat-resistant gloves. Photorealistic industrial photography, full-frame camera, 35mm lens, shallow depth of field, cool blue-grey tones contrasted with warm orange furnace light. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Furnace fan bearing with dark high-temperature grease, orange furnace glow behind, heat haze, heat-resistant gloves. Photorealistic industrial photo, no text, no logos.
```
*Vòng bi quạt lò, có ánh lửa lò phía sau.*

### 5.4. Dầu truyền nhiệt
- **Lưu thành:** `anh-goc/danh-muc/dau-truyen-nhiet.png`
- **Alt gợi ý:** Hệ thống lò dầu tải nhiệt với đường ống bọc bảo ôn và bơm tuần hoàn

**Prompt đầy đủ**
```
Thermal oil heating system in a clean factory boiler room: a large thermal fluid heater, steel pipes wrapped in shiny aluminium insulation cladding, a circulation pump, valves and round temperature gauges. Well-maintained plant, warm light reflecting on the cladding. Photorealistic industrial photography, full-frame camera, 35mm lens, natural lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Thermal oil heater room: insulated pipes with aluminium cladding, circulation pump, valves, temperature gauges. Photorealistic factory photo, blue-grey tones, no text, no logos.
```
*Lò dầu tải nhiệt, ống bọc bảo ôn, bơm tuần hoàn.*

### 5.5. Dầu động cơ diesel
- **Lưu thành:** `anh-goc/danh-muc/dau-dong-co-diesel.png`
- **Alt gợi ý:** Thợ châm dầu động cơ diesel vào máy xe tải đang mở nắp capo

**Prompt đầy đủ**
```
Truck maintenance garage: a heavy diesel truck with its cab tilted forward revealing the engine, a mechanic pouring golden engine oil from a plain unbranded jerrycan through a funnel into the engine, an excavator and a diesel generator softly out of focus in the background. Photorealistic industrial photography, full-frame camera, 35mm lens, natural daylight, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Mechanic pouring golden engine oil from a plain jerrycan into a diesel truck engine, cab tilted, garage, excavator blurred behind. Photorealistic, blue-grey tones, no text, no logos.
```
*Châm dầu động cơ vào máy xe tải, máy xúc mờ phía sau.*

### 5.6. Dầu cầu, dầu hộp số
- **Lưu thành:** `anh-goc/danh-muc/dau-cau-hop-so.png`
- **Alt gợi ý:** Cụm cầu sau và hộp số xe tải đang được thay dầu trên cầu nâng

**Prompt đầy đủ**
```
Underside view of a heavy truck on a workshop lift: the rear axle differential housing and gearbox, a mechanic removing the fill plug while thick amber gear oil drains into a pan, dual rear wheels visible at the edges. Photorealistic industrial photography, full-frame camera, 24mm lens, workshop lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Under a truck on a lift: rear axle differential and gearbox, amber gear oil draining into a pan, mechanic's hands. Photorealistic workshop photo, blue-grey tones, no text, no logos.
```
*Gầm xe tải: cầu sau, hộp số, đang xả dầu cầu.*

### 5.7. Dầu bánh răng công nghiệp
- **Lưu thành:** `anh-goc/danh-muc/dau-banh-rang.png`
- **Alt gợi ý:** Hộp giảm tốc công nghiệp mở nắp, bánh răng phủ dầu bánh răng

**Prompt đầy đủ**
```
Large industrial gearbox (speed reducer) with the inspection cover removed, showing big helical gears coated in glossy golden gear oil, driving a heavy conveyor in a cement plant. Strong side light emphasising the gear teeth and oil film. Photorealistic industrial photography, full-frame camera, 35mm lens, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Open industrial gearbox, large helical gears coated in glossy golden oil, side light on gear teeth, cement plant. Photorealistic, blue-grey tones, no text, no logos.
```
*Hộp giảm tốc mở nắp, bánh răng bóng dầu.*

### 5.8. Dầu máy nén khí
- **Lưu thành:** `anh-goc/danh-muc/dau-may-nen-khi.png`
- **Alt gợi ý:** Máy nén khí trục vít mở nắp, kỹ thuật viên châm dầu máy nén khí

**Prompt đầy đủ**
```
Industrial rotary screw air compressor with its side panel open in a clean compressor room, showing the air-oil separator tank, oil filter and cooler, a technician topping up clear compressor oil from a plain unbranded pail. Photorealistic industrial photography, full-frame camera, 35mm lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Rotary screw air compressor with side panel open, oil separator and filter visible, technician adding oil from a plain pail. Photorealistic factory photo, blue-grey tones, no text, no logos.
```
*Máy nén khí trục vít mở nắp, châm dầu.*

### 5.9. Dầu máy may
- **Lưu thành:** `anh-goc/danh-muc/dau-may-may.png`
- **Alt gợi ý:** Máy may công nghiệp trong xưởng may, tra dầu máy may vào cơ cấu kim

**Prompt đầy đủ**
```
Close-up of an industrial lockstitch sewing machine in a garment factory in Vietnam, a worker's hand applying a few drops of clear sewing machine oil from a small oiler bottle onto the needle bar mechanism, fabric under the presser foot, rows of sewing machines softly out of focus behind. Photorealistic industrial photography, full-frame camera, 50mm lens, bright natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Industrial sewing machine close-up, hand oiling the needle bar with a small oiler, fabric under foot, garment factory rows blurred. Photorealistic, bright light, no text, no logos.
```
*Tra dầu vào cơ cấu kim máy may công nghiệp, xưởng may phía sau.*

### 5.10. Dầu cắt gọt (dầu tưới nguội)
- **Lưu thành:** `anh-goc/danh-muc/dau-cat-got.png`
- **Alt gợi ý:** Máy phay CNC đang gia công, dung dịch tưới nguội phun vào dao cắt

**Prompt đầy đủ**
```
Inside a CNC milling machine during cutting: a stream of milky white water-soluble coolant spraying onto the end mill and a steel workpiece, shiny metal chips flying, droplets frozen in motion, machine interior light illuminating the scene. Photorealistic industrial photography, full-frame camera, 50mm lens, fast shutter speed, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
CNC milling close-up, milky white coolant spraying on cutter and steel part, metal chips flying, droplets frozen. Photorealistic, blue-grey tones, no text, no logos.
```
*Máy phay CNC, dung dịch tưới nguội trắng sữa phun vào dao.*

### 5.11. Dầu chống gỉ
- **Lưu thành:** `anh-goc/danh-muc/dau-chong-gi-set.png`
- **Alt gợi ý:** Chi tiết thép gia công được phun phủ màng dầu chống gỉ

**Prompt đầy đủ**
```
Precision machined steel parts and a mould insert neatly arranged on a workbench, a spray nozzle applying a thin transparent rust-preventive oil film that catches the light, fine mist visible, parts ready for export packing. Photorealistic industrial photography, full-frame camera, 50mm lens, soft side lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Machined steel parts on a workbench, spray nozzle coating a thin shiny anti-rust oil film, fine mist, soft side light. Photorealistic, blue-grey tones, no text, no logos.
```
*Phun dầu chống gỉ lên chi tiết thép.*

### 5.12. Dầu rãnh trượt
- **Lưu thành:** `anh-goc/danh-muc/dau-ranh-truot.png`
- **Alt gợi ý:** Băng trượt máy CNC phủ màng dầu rãnh trượt bóng

**Prompt đầy đủ**
```
Close-up low-angle view along the precision ground slideways of a CNC machining centre, a thin glossy film of way oil on the polished steel guideways reflecting the light, the machine table partially visible, clean workshop softly out of focus. Photorealistic industrial photography, full-frame camera, 50mm lens, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Low-angle close-up of CNC machine slideways, polished steel guideways with glossy oil film reflecting light, clean workshop blurred. Photorealistic, no text, no logos.
```
*Băng trượt máy CNC bóng dầu, góc thấp.*

### 5.13. Dầu xung điện EDM
- **Lưu thành:** `anh-goc/danh-muc/dau-xung-dien-edm.png`
- **Alt gợi ý:** Điện cực đồng máy xung điện ngâm trong bể dầu điện môi

**Prompt đầy đủ**
```
Die-sinking EDM machine in a mould-making workshop: a copper electrode submerged in a tank of clear dielectric oil, tiny blue-white sparks and small bubbles at the electrode tip, a steel mould block below the surface. Photorealistic industrial photography, full-frame camera, 50mm macro lens, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
EDM machine: copper electrode submerged in clear dielectric oil, tiny sparks and bubbles at the tip, steel mould below. Photorealistic macro, blue-grey tones, no text, no logos.
```
*Điện cực đồng ngâm trong dầu điện môi, có tia lửa nhỏ.*

### 5.14. Dầu máy hút chân không
- **Lưu thành:** `anh-goc/danh-muc/dau-may-hut-chan-khong.png`
- **Alt gợi ý:** Bơm chân không cánh gạt với kính thăm dầu trong nhà xưởng

**Prompt đầy đủ**
```
Industrial rotary vane vacuum pump mounted on a steel frame in a clean factory, painted metal housing, an oil sight glass on the side showing clear light-yellow vacuum pump oil, a vacuum gauge and pipes connected to a packaging machine softly out of focus. Photorealistic industrial photography, full-frame camera, 35mm lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Rotary vane vacuum pump in a factory, oil sight glass with clear yellow oil, vacuum gauge and pipes, packaging machine blurred. Photorealistic, blue-grey tones, no text, no logos.
```
*Bơm chân không cánh gạt, kính thăm dầu, đồng hồ chân không.*

### 5.15. Dầu cách điện (dầu máy biến áp)
- **Lưu thành:** `anh-goc/danh-muc/dau-cach-dien.png`
- **Alt gợi ý:** Máy biến áp ngâm dầu trong trạm điện nhà máy

**Prompt đầy đủ**
```
Oil-immersed power transformer in a factory electrical substation: grey steel tank with cooling radiator fins, porcelain bushings on top, a conservator tank and an oil level gauge, gravel ground and safety fence, clear blue sky. Photorealistic industrial photography, full-frame camera, 35mm lens, natural daylight, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no warning signs, no watermark.
```

**Canva / CapCut (ngắn)**
```
Oil-immersed power transformer in a factory substation, radiator fins, porcelain bushings, conservator tank, gravel and fence, blue sky. Photorealistic, no text, no logos.
```
*Máy biến áp ngâm dầu trong trạm điện nhà máy.*

---

## 5B. Phương án B cho 5 danh mục còn thiếu ảnh (thêm 06/10/2026)

Ngày 06/10/2026, 5 danh mục sau chưa có ảnh mới. Prompt phương án A nằm ở các mục 5.5, 5.9, 5.10, 5.14 và 5.15 phía trên. Dưới đây là **phương án B** với góc chụp khác, dùng khi phương án A ra ảnh chưa ưng.

Cả 5 ảnh dùng khung **3:2**, cỡ 1536 × 1024. Ảnh tạo xong lưu vào `anh-goc/danh-muc/`.

### Dầu máy may
- **Lưu thành:** `dau-may-may.png`
- **Alt gợi ý:** Xưởng may công nghiệp với dãy máy may và công nhân đang làm việc

**Prompt đầy đủ**
```
Wide view of a bright, modern garment factory in Vietnam: long rows of industrial sewing machines with workers in light uniforms sewing fabric, colourful fabric rolls on the side, the nearest sewing machine in sharp focus with its metal needle bar and presser foot glistening with a thin film of oil, the rest of the room softly blurred. Photorealistic industrial photography, full-frame camera, 35mm lens, bright natural lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Bright garment factory, rows of industrial sewing machines and workers, nearest machine sharp with oiled needle bar, rest blurred. Photorealistic, natural light, no text, no logos.
```
*Toàn cảnh xưởng may, máy gần nhất nét, bóng dầu ở cơ cấu kim.*

### Dầu cắt gọt (dầu tưới nguội)
- **Lưu thành:** `dau-cat-got.png`
- **Alt gợi ý:** Máy tiện CNC đang tiện trục thép, dầu tưới nguội phun vào dao

**Prompt đầy đủ**
```
Close-up inside a CNC lathe while turning a steel shaft: a carbide cutting insert removing a curling silver metal chip, a nozzle spraying a steady stream of milky white coolant onto the cutting zone, splashes and droplets frozen in motion, the machine's interior lamp creating bright highlights on the wet metal. Photorealistic industrial photography, full-frame camera, 85mm lens, fast shutter speed, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
CNC lathe turning a steel shaft, curling metal chip, milky white coolant spraying on the insert, droplets frozen. Photorealistic macro, blue-grey tones, no text, no logos.
```
*Máy tiện CNC, phoi xoắn, dung dịch tưới nguội trắng sữa.*

### Dầu động cơ diesel
- **Lưu thành:** `dau-dong-co-diesel.png`
- **Alt gợi ý:** Động cơ diesel máy phát điện công nghiệp, kỹ thuật viên kiểm tra que thăm dầu

**Prompt đầy đủ**
```
Large industrial diesel generator set in a clean factory generator room, the engine side in focus, a technician in a navy work uniform pulling out the dipstick to check golden engine oil, the oil filler cap open, thick cables and the radiator in the background. Photorealistic industrial photography, full-frame camera, 35mm lens, natural factory lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Industrial diesel generator engine, technician pulling the dipstick to check golden oil, clean generator room. Photorealistic factory photo, blue-grey tones, no text, no logos.
```
*Máy phát điện diesel, kiểm tra que thăm dầu động cơ.*

### Dầu máy hút chân không
- **Lưu thành:** `dau-may-hut-chan-khong.png`
- **Alt gợi ý:** Bơm chân không công nghiệp nối với máy đóng gói hút chân không thực phẩm

**Prompt đầy đủ**
```
Food packaging line in a clean factory: an industrial vacuum packaging machine sealing plastic bags of product, connected by a steel pipe to a rotary vane vacuum pump in the foreground, the pump's oil sight glass showing clear light-yellow oil, a technician in a white coat and hairnet softly out of focus. Photorealistic industrial photography, full-frame camera, 35mm lens, bright clean lighting, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

**Canva / CapCut (ngắn)**
```
Rotary vane vacuum pump in foreground with oil sight glass, connected to a food vacuum packaging machine, clean factory. Photorealistic, bright light, no text, no logos.
```
*Bơm chân không cạnh máy đóng gói hút chân không.*

### Dầu cách điện (dầu máy biến áp)
- **Lưu thành:** `dau-cach-dien.png`
- **Alt gợi ý:** Kỹ thuật viên lấy mẫu dầu cách điện từ van xả máy biến áp

**Prompt đầy đủ**
```
Close-up of a technician wearing safety gloves and a helmet taking a sample of clear pale-yellow transformer insulating oil from the drain valve of a large grey oil-filled power transformer into a glass sample bottle, cooling radiator fins in the background, outdoor substation with soft daylight. Photorealistic industrial photography, full-frame camera, 50mm lens, shallow depth of field, cool blue-grey tones with subtle warm orange accents. No text, no logos, no brand names, no labels, no warning signs, no watermark.
```

**Canva / CapCut (ngắn)**
```
Technician sampling clear yellow transformer oil from a power transformer drain valve into a glass bottle, radiator fins behind, substation. Photorealistic, no text, no logos.
```
*Lấy mẫu dầu biến thế từ van máy biến áp.*

**Mẹo:** Nếu cả hai phương án vẫn chưa ưng, giữ nguyên prompt nhưng đổi góc chụp ở đầu câu, ví dụ "Wide shot of…", "Close-up of…" hoặc "Low-angle view of…", rồi tạo lại 2–3 lượt.

---

## 6. Danh mục đang tắt (làm sau, khi bật trang)

### Dầu nhớt xe máy
- **Lưu thành:** `anh-goc/danh-muc/dau-nhot-xe-may.png`
```
Motorbike repair shop in Vietnam: a mechanic pouring golden motor oil from a plain unbranded 1-litre bottle into a scooter engine, a manual underbone motorbike parked beside, tools on the wall softly out of focus. Photorealistic, natural light, cool blue-grey tones with warm orange accents. No text, no logos, no brand names, no labels, no watermark.
```

### Nước làm mát
- **Lưu thành:** `anh-goc/danh-muc/nuoc-lam-mat.png`
```
Open engine bay of a truck, a mechanic pouring bright red coolant from a plain unbranded jerrycan into the radiator expansion tank, radiator fins visible. Photorealistic workshop photography, natural light, cool blue-grey tones. No text, no logos, no brand names, no labels, no watermark.
```

---

## 7. Kiểm tra trước khi dùng ảnh

- [ ] Phóng to 100%, xem kỹ phuy, can, thân máy: **không có chữ, logo, ký tự lạ** (AI hay tự vẽ chữ méo). Nếu có, dùng **Magic Eraser** trong Canva, hoặc **Xóa vật thể** trong CapCut, để xóa.
- [ ] Tay và ngón tay bình thường, máy móc không bị méo hay thừa chi tiết.
- [ ] Đúng loại máy của danh mục, ví dụ ảnh dầu máy may phải là máy may chứ không phải máy tiện.
- [ ] Mỗi danh mục một ảnh khác nhau, tông màu cả bộ đồng đều.
- [ ] Thu nhỏ còn khoảng 380 × 250 px vẫn nhận ra chủ thể.
- [ ] Ảnh gốc ngang tối thiểu 1536 px, tỉ lệ 3:2.

## 8. Sau khi có ảnh

1. Đặt ảnh vào `anh-goc/danh-muc/` với **đúng tên file** ghi ở mỗi mục (đuôi .png, .jpg hoặc .webp đều được).
2. Báo Claude để chạy `npm run images`. Lệnh này tạo bản 1200px và bản `-600` trong `public/images/danh-muc/`.
   - Nếu tự chuyển sang webp: cần **2 file** cho mỗi danh mục trong `public/images/danh-muc/`, gồm `<slug>.webp` (rộng 1200px) và `<slug>-600.webp` (rộng 600px), mỗi file dưới khoảng 150 KB.
3. Điền `image_alt` cho các danh mục còn thiếu, dùng dòng **Alt gợi ý** ở trên.
