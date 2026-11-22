---
ma: "BV-022"
active: true
loai: "kien-thuc"
title: "Dầu thủy lực nóng bao nhiêu là quá? Nguyên nhân máy thủy lực bị nóng và cách kiểm tra, hạ nhiệt"
seo_title: "Dầu Thủy Lực Bị Nóng: Bao Nhiêu Độ Là Quá, Nguyên Nhân, Cách Xử Lý"
description: "Nhiệt độ dầu thủy lực bao nhiêu là quá nóng? Giới hạn 82 °C, độ nhớt tối ưu 16–36 mm²/s của bơm, nhiệt độ dầu 46, 68 chạm giới hạn và các bước tìm nguyên nhân máy nóng."
keywords: ["dầu thủy lực bị nóng", "nhiệt độ dầu thủy lực", "máy thủy lực bị nóng", "dầu thủy lực nóng bao nhiêu độ", "nguyên nhân dầu thủy lực nóng", "két làm mát dầu thủy lực", "máy ép thủy lực bị nóng"]
category: "dau-thuy-luc"
related_products: ["eneos-super-hyrando-68", "castrol-hyspin-aws-68", "eneos-super-mulpus-dx"]
author: "vu-minh-toan"
citations:
  - "https://www.machinerylubrication.com/Articles/Print/680?id=680"
  - "https://www.jhf.com/Portals/0/ProductModelDocuments/re92711-01-x-b2_09-08-2019%20(1).pdf"
  - "https://pmc.ncbi.nlm.nih.gov/articles/PMC10222146/"
  - "https://www.machinerylubrication.com/Articles/Print/30768?id=30768"
date: "2026-11-22"
image: "/images/blog/dau-thuy-luc-bi-nong-og.webp"
image_alt: "Bảng nhiệt độ dầu thủy lực ISO VG 46 và 68 của ENEOS, Castrol, Caltex khi độ nhớt xuống 36, 16 và 10 mm²/s, tính từ TDS"
tags: ["dầu thủy lực", "nhiệt độ", "độ nhớt", "sự cố thủy lực"]
---

Máy ép chạy tới chiều thì xi lanh đi chậm, bơm kêu to hơn, sờ vào thùng dầu thấy bỏng tay. Câu hỏi đầu tiên thường là "dầu này có chịu nóng không, có nên đổi sang dầu 68 không". Nhưng dầu nóng gần như luôn là **triệu chứng**, không phải nguyên nhân: hệ thống đang sinh ra nhiều nhiệt hơn lượng nhiệt nó tỏa đi được.

**Trả lời nhanh:** không có một con số chung cho mọi máy. Brendan Casey viết trên Machinery Lubrication rằng dầu **quá nóng khi độ nhớt xuống dưới mức tối ưu cho các bộ phận của hệ thống**, và trên **82 °C (180 °F) thì hầu hết phớt bị hỏng, dầu xuống cấp nhanh**. Lấy khoảng độ nhớt tối ưu 16–36 mm²/s của một dòng bơm piston Rexroth làm mốc, chúng tôi tính được dầu **ISO VG 46** của các hãng trong kho xuống dưới 16 mm²/s ở khoảng **67–68 °C**, dầu **ISO VG 68** ở khoảng **77–78 °C**. Đó là nhiệt độ dầu trong thùng; trong vỏ bơm còn nóng hơn.

**Tóm tắt**

- Quá nóng xếp thứ hai trong các sự cố thủy lực hay gặp, chỉ sau rò rỉ dầu (Casey).
- Nhiệt sinh ra chính là phần công suất bị mất: bơm, van, đường ống, xi lanh. Máy 100 kW hiệu suất 80% sinh ra ít nhất 20 kW nhiệt.
- Theo tài liệu Rexroth, nhiệt độ dầu rò ra ở cửa xả vỏ bơm luôn cao hơn nhiệt độ trong thùng; bơm và dầu trong hệ được phép chênh nhau tối đa 25 K.
- Thứ tự kiểm tra nên đi từ dễ tới khó: mức dầu, gió quanh thùng, két làm mát, van an toàn, rò rỉ bên trong xi lanh và bơm.
- Đổi sang dầu đặc hơn chỉ là giải pháp tình thế, và phải được hãng máy cho phép.

## Dầu thủy lực nóng bao nhiêu độ là quá? {#bao-nhieu-do}

Trong bài [Solving Hydraulic System Overheating Problems](https://www.machinerylubrication.com/Articles/Print/680?id=680), Casey đưa ra hai mốc:

- **Mốc tuyệt đối:** dầu trên 82 °C làm hỏng phần lớn vật liệu phớt và đẩy nhanh quá trình dầu xuống cấp. Không nên cho hệ chạy trên mức này.
- **Mốc theo độ nhớt:** dầu đã quá nóng khi độ nhớt xuống dưới mức tối ưu của các bộ phận, và điều đó có thể xảy ra **ở nhiệt độ thấp hơn 82 °C khá nhiều**, tùy cấp độ nhớt đang dùng.

Mốc thứ hai cần số liệu của hãng bơm. Lấy ví dụ datasheet bơm piston hướng trục Rexroth A10VSO dòng 31 ([RE 92711-01, bản 08/2019](https://www.jhf.com/Portals/0/ProductModelDocuments/re92711-01-x-b2_09-08-2019%20(1).pdf), bản PDF do nhà phân phối đăng lại):

| Mốc độ nhớt (Rexroth A10VSO 31) | Ý nghĩa | Nguồn |
| :--- | :--- | :--- |
| 16–36 mm²/s | Khoảng độ nhớt tối ưu cho hiệu suất và tuổi thọ | Rexroth RE 92711-01 |
| 10–400 mm²/s | Khoảng cho phép khi chạy liên tục (đo ở cửa xả vỏ bơm) | Rexroth RE 92711-01 |
| Dưới 10 mm²/s | Chỉ cho phép ngắn hạn: dưới 3 phút, áp suất dưới 30% áp định mức | Rexroth RE 92711-01 |

Datasheet ghi thêm hai điều quan trọng: nhiệt độ dầu rò ra trong vỏ bơm (chịu ảnh hưởng của áp suất và tốc độ quay) **luôn cao hơn nhiệt độ trong thùng**, và bơm với dầu trong hệ được phép chênh nhau **tối đa 25 K**. Nghĩa là nhiệt kế ở thùng dầu chỉ 65 °C thì trong bơm có thể đã cao hơn thế đáng kể.

Mỗi hãng bơm, mỗi dòng bơm có mốc riêng: bơm bánh răng, bơm cánh gạt, bơm piston khác nhau. Mốc đúng cho máy của bạn nằm trong tài liệu của bơm, nên coi bảng trên là ví dụ cách đọc, không phải con số chung.

## Dầu 46, 68 trong kho chạm giới hạn độ nhớt ở bao nhiêu độ? {#bang-nhiet-do}

Chúng tôi lấy độ nhớt ở 40 °C và 100 °C trên TDS từng mã, tính đường độ nhớt theo nhiệt độ bằng phương pháp ASTM D341, rồi tìm nhiệt độ dầu ứng với các mốc 36, 16 và 10 mm²/s:

| Mã dầu | Độ nhớt 40 °C / 100 °C (TDS) | Xuống 36 mm²/s | Xuống 16 mm²/s | Xuống 10 mm²/s | Nguồn |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [ENEOS Super Hyrando](/dau-thuy-luc/eneos-super-hyrando-68) 46 | 46,5 / 6,89 | 46 °C | 68 °C | 84 °C | TDS ENEOS; [số tự tính](#cach-tinh) |
| [ENEOS Super Mulpus DX](/dau-thuy-luc/eneos-super-mulpus-dx) 46 | 46 / 6,90 | 46 °C | 68 °C | 84 °C | TDS ENEOS; [số tự tính](#cach-tinh) |
| [Castrol Hyspin AWS](/dau-thuy-luc/castrol-hyspin-aws-68) 46 | 46 / 6,7 | 45 °C | 67 °C | 83 °C | TDS Castrol; [số tự tính](#cach-tinh) |
| ENEOS Super Hyrando 68 | 69,5 / 9,03 | 55 °C | 78 °C | 96 °C | TDS ENEOS; [số tự tính](#cach-tinh) |
| ENEOS Super Mulpus DX 68 | 68,2 / 8,88 | 54 °C | 78 °C | 95 °C | TDS ENEOS; [số tự tính](#cach-tinh) |
| Castrol Hyspin AWS 68 | 68 / 8,6 | 54 °C | 77 °C | 94 °C | TDS Castrol; [số tự tính](#cach-tinh) |
| [Castrol Hyspin HLP-Z 68](/dau-thuy-luc/castrol-hyspin-hlpz-68) | 68 / 8,5 | 54 °C | 77 °C | 93 °C | TDS Castrol; [số tự tính](#cach-tinh) |
| [Caltex Hydraulic Oil AW 68](/dau-thuy-luc/caltex-hydraulic-aw-68) | 65 / 8,7 | 53 °C | 77 °C | 94 °C | TDS Chevron; [số tự tính](#cach-tinh) |
| VHP Spinax AW 68 | 68 / 8,9 | 54 °C | 78 °C | 95 °C | TDS VHP; [số tự tính](#cach-tinh) |

<figure class="bieu-do">
<img src="/images/blog/do-nhot-dau-thuy-luc-theo-nhiet-do.svg" alt="Biểu đồ độ nhớt theo nhiệt độ của dầu thủy lực ISO VG 46 và 68: dầu 46 rời vùng tối ưu 16–36 mm²/s ở khoảng 68 °C, dầu 68 ở khoảng 78 °C; ở 82 °C dầu 46 còn khoảng 10,7 mm²/s" width="760" height="460" loading="lazy" decoding="async" style="width:100%;height:auto" />
</figure>

Đọc bảng và biểu đồ:

- **Cùng một cấp ISO VG, các hãng gần như không khác nhau** về nhiệt độ chạm mốc (chênh 1–2 °C). Muốn máy chịu nóng hơn, đổi hãng trong cùng cấp không giải quyết được.
- **Dầu 46 chạy thường xuyên ở 70 °C** là đã ra khỏi vùng tối ưu của bơm trong ví dụ trên. Tới 82 °C, dầu 46 chỉ còn khoảng 10,7 mm²/s, sát mức tối thiểu cho chạy liên tục.
- **Dầu 68** cho thêm khoảng 10 °C trước khi chạm cùng mốc. Đây là lý do máy ép nhựa, máy ép thủy lực chạy nóng ở miền Bắc mùa hè hay dùng cấp 68. Cách chọn giữa 32, 46 và 68 có trong bài [dầu thủy lực 32, 46, 68 khác nhau thế nào](/ho-tro-ky-thuat/dau-thuy-luc-32-46-68-khac-nhau).
- Các mã trong bảng có chỉ số độ nhớt (VI) khoảng 95–105. Dầu VI cao hơn giảm độ nhớt chậm hơn khi nóng; xem bài [chỉ số độ nhớt VI](/ho-tro-ky-thuat/chi-so-do-nhot-vi-dau-thuy-luc).

## Vì sao hệ thủy lực nóng lên? {#nguyen-nhan}

Casey giải thích bằng một phép cân bằng đơn giản: **nhiệt sinh ra = tổng công suất bị mất** ở bơm, van, đường ống và cơ cấu chấp hành. Nếu nhiệt sinh ra lớn hơn nhiệt tỏa đi (qua thùng dầu, đường ống và két làm mát), dầu sẽ nóng dần cho tới khi quá nóng.

Ví dụ của ông: máy đầu vào 100 kW chạy liên tục, hiệu suất 80%, thì nhiệt sinh ra ít nhất là 20 kW. Theo Casey, công suất làm mát lắp trên máy thường bằng **25–40% công suất đầu vào**, tùy loại hệ thống. Giả sử máy có 25 kW làm mát: chỉ cần nhiệt sinh ra vượt 25 kW, hoặc két làm mát bẩn đi khiến công suất làm mát tụt dưới 25 kW, là dầu bắt đầu nóng.

Từ đó có hai nhóm nguyên nhân:

**Nhiệt sinh ra nhiều hơn thiết kế**

- **Rò rỉ bên trong:** dầu cao áp lọt qua phớt piston xi lanh, qua van mòn, qua khe bơm mòn về đường hồi. Mọi dòng dầu đi từ áp cao về áp thấp mà không sinh công đều biến thành nhiệt.
- **Van an toàn chỉnh sai:** với mạch bơm có bộ bù áp (mạch kín tâm), Casey khuyên đặt van an toàn cao hơn mức bù áp của bơm khoảng 250 psi (khoảng 17 bar). Đặt bằng hoặc thấp hơn, dầu của bơm sẽ xả liên tục qua van an toàn và sinh nhiệt.
- **Sụt áp trên đường ống dài, ống nhỏ:** ví dụ của Casey là bộ nguồn 37 kW kéo máy cưa qua 216 m ống; riêng sụt áp trên ống đã sinh khoảng 10,35 kW nhiệt, vượt công suất két làm mát 10 kW.

**Nhiệt tỏa đi ít hơn thiết kế**

- Mức dầu trong thùng thấp.
- Thùng dầu bị che chắn, kê sát tường, phủ bụi, không có gió lưu thông.
- Két làm mát bị bẩn, tắc lá tản nhiệt, quạt hỏng, hoặc két quá nhỏ so với nhiệt độ môi trường thực tế.

Dầu nóng làm độ nhớt giảm, dầu càng dễ lọt qua khe hở, lượng rò bên trong càng tăng, nhiệt càng sinh ra nhiều. Đây là vòng luẩn quẩn khiến máy đã bắt đầu nóng thì nóng nhanh dần.

## Kiểm tra theo thứ tự nào? {#kiem-tra}

Casey kết luận rất rõ: **hệ thủy lực bắt đầu quá nóng thì dừng máy, tìm nguyên nhân và sửa**. Thứ tự dưới đây đi từ việc dễ, rẻ tới việc khó:

1. **Mức dầu:** đổ đúng mức. Mức thấp vừa làm giảm khả năng tỏa nhiệt, vừa làm bơm hút lẫn khí.
2. **Không gian quanh thùng và két:** dọn vật che chắn, lau bụi trên thùng và lá tản nhiệt.
3. **Két làm mát:** đo nhiệt độ dầu vào và ra khỏi két bằng súng đo nhiệt hồng ngoại. Công suất két đang tỏa ra xấp xỉ **0,027 × lưu lượng (L/phút) × độ chênh nhiệt (°C)**, tính bằng kW ([cách tính](#cach-tinh)). Ví dụ: 90 L/phút, dầu ra mát hơn dầu vào 4 °C, két đang tỏa khoảng 10 kW. Két tỏa ít hơn thiết kế là két bẩn hoặc yếu; két tỏa nhiều hơn hẳn bình thường (ví dụ 90 L/phút, chênh 10 °C, khoảng 25 kW) nghĩa là hệ đang sinh nhiều nhiệt hơn trước, phải tìm chỗ mất công suất.
4. **Van an toàn và bộ bù áp của bơm:** kiểm tra lại mức đặt theo hướng dẫn sử dụng của máy. Nghe tiếng dầu xả rít liên tục qua van an toàn khi máy không làm việc.
5. **Rò rỉ bên trong:** dùng súng đo nhiệt dò dọc các van, xi lanh, đường hồi. Chỗ nào nóng bất thường so với xung quanh thường là chỗ dầu đang lọt từ áp cao về áp thấp. Xi lanh tụt khi giữ tải, bơm phải chạy lâu hơn để đạt áp cũng là dấu hiệu.
6. **Đường ống:** đường ống dài, ống nhỏ hơn thiết kế, nhiều cút gấp làm tăng sụt áp và sinh nhiệt.

Song song với đó, lấy mẫu dầu kiểm tra độ nhớt và màu. Dầu chạy nóng lâu ngày sẫm màu, có mùi khét và có thể đã giảm độ nhớt; cách lấy mẫu và đọc kết quả có trong bài [hướng dẫn test chất lượng dầu](/ho-tro-ky-thuat/huong-dan-test-chat-luong-dau).

## Dầu nóng gây hại gì? {#tac-hai}

- **Dầu nhanh hỏng:** bài tổng quan của Hong và Jang (*Materials*, 2023) nhắc quy tắc kinh nghiệm theo định luật Arrhenius: **nhiệt độ tăng 10 °C thì tuổi thọ dầu giảm khoảng một nửa** ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10222146/)). Các tác giả ghi đây là quy tắc "không chính xác nhưng hữu ích". Dầu chạy 70 °C thay vì 60 °C thì thời gian dùng có thể chỉ còn khoảng một nửa.
- **Phớt hỏng:** trên 82 °C, phần lớn vật liệu phớt bị hỏng (Casey), dẫn tới rò rỉ ngoài, rò rỉ trong, rồi lại nóng thêm.
- **Bơm, van mòn nhanh:** độ nhớt thấp làm màng dầu mỏng; dầu xuống dưới mức tối thiểu của hãng bơm là bơm làm việc ngoài điều kiện cho phép.
- **Xâm thực ở bơm:** theo Machinery Lubrication, nhiệt độ dầu quá cao làm hơi và bọt khí dễ hình thành hơn ở cửa hút, chỉ cần sụt áp nhỏ hơn ([ML](https://www.machinerylubrication.com/Articles/Print/30768?id=30768)).

## Máy nóng thì có nên đổi sang dầu 68? {#doi-dau-68}

Dầu 68 cho thêm khoảng 10 °C trước khi độ nhớt xuống tới cùng mốc với dầu 46, nên đôi khi đó là cách đúng: máy chạy liên tục trong xưởng nóng, đã kiểm tra hết các bước trên mà nhiệt độ vẫn ổn định ở mức cao, **và** hãng máy, hãng bơm cho phép cấp 68.

Nhưng nếu máy trước chạy mát với dầu 46 mà nay mới nóng lên, thì nhiều khả năng có thứ gì đó đã thay đổi: két bẩn, van chỉnh sai, rò rỉ trong tăng. Đổi sang dầu 68 khi đó chỉ che triệu chứng, còn chỗ mất công suất vẫn ở đó. Dầu đặc hơn cũng khó bơm hơn lúc khởi động nguội, nhất là mùa đông.

Các mã cấp 68 và 46 có tại kho, kèm TDS, có ở trang [dầu thủy lực](/dau-thuy-luc); khoảng giá theo phuy, xô có ở [bảng giá dầu thủy lực](/bao-gia-dau-thuy-luc).

## Cách chúng tôi tính {#cach-tinh}

- **Nhiệt độ chạm mốc độ nhớt:** dùng công thức Walther trong ASTM D341, log(log(ν + 0,7)) = A − B·log(T), với T tính bằng Kelvin. Hai hằng số A, B tính từ độ nhớt ở 40 °C và 100 °C ghi trên TDS từng mã, rồi giải ngược ra nhiệt độ ứng với 36, 16 và 10 mm²/s, làm tròn tới độ. Đây là ước tính cho dầu mới; dầu đã dùng lâu có thể có độ nhớt khác.
- **Công suất két làm mát:** Q (kW) = lưu lượng (L/phút) ÷ 60 × khối lượng riêng × nhiệt dung riêng × độ chênh nhiệt. Chúng tôi lấy khối lượng riêng dầu khoảng 0,87 kg/L và nhiệt dung riêng khoảng 1,88 kJ/(kg·K), được hệ số khoảng 0,027. Ví dụ 90 L/phút × 4 °C cho khoảng 9,8 kW, khớp với con số 10 kW trong ví dụ của Casey.
- **Đổi đơn vị:** 180 °F = 82 °C; 250 psi ≈ 17 bar; 710 ft ≈ 216 m.

## Câu hỏi thường gặp {#hoi-dap}

### Nhiệt độ dầu thủy lực bình thường là bao nhiêu?

Không có một con số chung. Mốc đúng là nhiệt độ mà độ nhớt dầu còn nằm trong khoảng tối ưu của bơm. Theo cách tính của chúng tôi, với khoảng 16–36 mm²/s của bơm Rexroth A10VSO, dầu 46 nằm trong khoảng tối ưu khi dầu ở khoảng 46–68 °C, dầu 68 ở khoảng 54–78 °C. Trên 82 °C thì máy nào cũng nên dừng để tìm nguyên nhân.

### Dầu thủy lực nóng có phải do dầu kém chất lượng?

Hiếm khi. Dầu không tự sinh nhiệt; nhiệt đến từ công suất bị mất trong bơm, van, đường ống và xi lanh. Dầu kém hoặc đã xuống cấp có thể làm rò rỉ trong tăng lên một chút, nhưng nguyên nhân chính thường là két làm mát, van chỉnh sai hoặc bộ phận bị mòn.

### Máy ép nhựa chạy tới chiều thì xi lanh đi chậm, vì sao?

Dầu nóng dần trong ca làm độ nhớt giảm, dầu lọt qua khe hở của bơm, van và phớt xi lanh nhiều hơn, nên lưu lượng thực tới xi lanh giảm. Kiểm tra két làm mát và đo nhiệt độ dầu vào giờ máy chậm; nếu dầu vượt khoảng tối ưu của bơm thì phải xử lý phần làm mát hoặc phần rò rỉ trong.

### Lắp thêm két làm mát có giải quyết được không?

Được, nếu nguyên nhân là công suất làm mát không đủ (máy chạy tải cao hơn thiết kế, xưởng nóng). Nhưng nếu máy nóng vì van an toàn xả liên tục hay rò rỉ bên trong, lắp thêm két chỉ là tốn thêm điện để làm mát phần năng lượng đang bị phí.

### Bao lâu nên thay dầu thủy lực nếu máy hay chạy nóng?

Không theo lịch cố định. Máy chạy nóng làm dầu xuống cấp nhanh hơn, nên cần lấy mẫu kiểm tra độ nhớt, màu, chỉ số axit thường xuyên hơn. Các bước thay và súc rửa có trong bài [hướng dẫn thay dầu thủy lực](/ho-tro-ky-thuat/huong-dan-thay-dau-thuy-luc).
