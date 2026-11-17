---
ma: "BV-014"
active: true
loai: "kien-thuc"
title: "Độ sạch dầu thủy lực ISO 4406, NAS 1638: vì sao dầu mới mở phuy chưa đủ sạch cho van servo, van tỷ lệ?"
seo_title: "Độ Sạch Dầu Thủy Lực ISO 4406, NAS 1638: Vì Sao Dầu Mới Chưa Sạch"
description: "Cách đọc mã độ sạch ISO 4406 (18/16/13) và cấp NAS 1638; vì sao dầu thủy lực mới mở phuy chưa đủ sạch cho van servo, van tỷ lệ và cách nạp dầu qua lọc."
keywords: ["độ sạch dầu thủy lực", "iso 4406", "nas 1638", "cấp độ sạch dầu", "độ sạch dầu iso 4406", "dầu thủy lực cho van servo", "van tỷ lệ", "lọc dầu thủy lực mới"]
category: "dau-thuy-luc"
related_products: ["castrol-hyspin-aws-68", "eneos-super-hyrando-68"]
author: "nguyen-thiet-lap"
citations:
  - "https://www.boschrexroth.com/media/b1c1d66b-2adc-4f6d-9a65-f51b6bc22073"
  - "https://www.moog.com/news/ideas-in-motion-control/2015/07/ten-tips-to-optimize-servo-hydraulic-machines-for-long-term-productivity.html"
  - "https://committee.iso.org/standard/79716.html"
  - "https://knowledge.bsigroup.com/products/hydraulic-fluid-power-fluids-method-for-coding-the-level-of-contamination-by-solid-particles-2"
  - "https://www.machinerylubrication.com/Read/409/nas-1638"
  - "https://en.oelcheck.com/wiki/cleanliness-classes-lubricants/"
  - "https://en.oelcheck.com/wiki/hydraulic-fluids/"
  - "https://www.machinerylubrication.com/Articles/Print/31436?id=31436"
  - "https://www.stle.org/files/TLTArchives/2021/10_October/Best_Practices.aspx"
  - "https://www.machinerylubrication.com/Articles/Print/217?id=217"
  - "https://knowledge.zeiss.com/rms/en/zen-core/toolkits-modules/application-and-workflow-toolkits/technical-cleanliness-analysis-tca/introduction-to-standards/nas-1638-national-aerospace-standard"
  - "https://www.machinerylubrication.com/Articles/Print/12?id=12"
  - "https://www.machinerylubrication.com/Articles/Print/31668"
  - "https://www.chevronlubricants.com/en_us/home/learning/from-chevron/industrial-machinery/check-the-third-spec-dont-assume-new-oil-is-clean.html"
date: "2026-11-17"
image: "/images/danh-muc/dau-thuy-luc-kho.webp"
image_alt: "Phuy dầu thủy lực xếp trong kho HT VINA"
tags: ["dầu thủy lực", "độ sạch", "ISO 4406", "van servo"]
---

Máy ép có van tỷ lệ vừa thay dầu mới xong, vài tuần sau bàn ép bắt đầu giật, áp lên xuống thất thường, thợ tháo van ra thấy con trượt bám một lớp cặn mịn. Dầu đổ vào là dầu mới nguyên phuy, vậy cặn ở đâu ra? Câu trả lời nằm ở một chỉ tiêu mà phiếu kiểm nghiệm và bảng thông số kỹ thuật (TDS) của dầu đóng phuy thường không ghi: **độ sạch hạt rắn** của dầu.

**Trả lời nhanh:** độ sạch dầu thủy lực được ghi bằng mã [ISO 4406](https://committee.iso.org/standard/79716.html) gồm ba số, ví dụ **18/16/13**, là mã số hạt từ 4, 6 và 14 µm(c) trở lên trong 1 mL dầu; tăng một mã thì số hạt tăng khoảng gấp đôi. Chữ "c" nghĩa là cỡ hạt đo bằng máy đếm hiệu chuẩn theo ISO 11171. NAS 1638 là cách ghi cũ, chia hạt thành năm khoảng cỡ và đã ngừng áp dụng cho thiết kế mới từ năm 2001. Dầu mới mở phuy thường chưa đủ sạch vì mức tối thiểu cho dầu mới theo DIN 51524 chỉ là 21/19/16, trong khi Bosch Rexroth yêu cầu van servo đặc biệt từ 18/16/13 trở xuống và Moog khuyên van servo ở 17/14/11 hoặc 16/13/10. Vì vậy dầu mới cho máy có van servo, van tỷ lệ phải **nạp qua lọc**, không đổ thẳng từ phuy.

**Tóm tắt**

- Mã ISO 4406 đọc từ trái sang phải: hạt ≥ 4 µm(c) / ≥ 6 µm(c) / ≥ 14 µm(c). Số càng nhỏ, dầu càng sạch.
- Chênh 3 mã là chênh khoảng 8 lần số hạt, nên dầu 21/19/16 so với 18/16/13 không phải "gần bằng" mà bẩn hơn khoảng 8 lần.
- Bosch Rexroth viết thẳng: dầu thủy lực **thường không đạt** mức sạch yêu cầu khi giao, nên phải lọc kỹ lúc nạp.
- NAS 1638 đếm theo từng khoảng cỡ hạt trong 100 mL; quy đổi sang ISO 4406 chỉ là gần đúng. Gặp yêu cầu ghi NAS, hãy hỏi lại mã ISO 4406.
- Nhìn bằng mắt hay thử tấm nóng tại xưởng thì không đo được độ sạch hạt; muốn biết mã ISO 4406 phải gửi mẫu đếm hạt theo ISO 11500 hoặc ISO 4407.

## Đọc mã độ sạch ISO 4406 thế nào? {#iso-4406}

Phòng thí nghiệm đếm số hạt rắn trong dầu ở ba ngưỡng cỡ: từ **4 µm(c)**, từ **6 µm(c)** và từ **14 µm(c)** trở lên. Mỗi con số đếm được (tính trên 1 mL) được đổi sang một "mã" theo bảng của ISO 4406, rồi ghi thành ba số cách nhau bằng dấu gạch chéo. Theo [BSI](https://knowledge.bsigroup.com/products/hydraulic-fluid-power-fluids-method-for-coding-the-level-of-contamination-by-solid-particles-2), tăng một mã nhìn chung tương ứng số hạt tăng gấp đôi. Bản hiện hành là ISO 4406:2021, ISO đã rà soát và giữ nguyên năm 2026.

<img src="/images/blog/cach-doc-ma-do-sach-iso-4406.svg" alt="Sơ đồ cách đọc mã độ sạch dầu thủy lực ISO 4406 18/16/13: hạt từ 4, 6 và 14 micromet trên mỗi mL" width="760" height="330" loading="lazy" decoding="async" style="width:100%;height:auto" />

Bảng mã dưới chép từ bảng 1 trong tài liệu [RE 90220 bản 09/2018 của Bosch Rexroth](https://www.boschrexroth.com/media/b1c1d66b-2adc-4f6d-9a65-f51b6bc22073) (ghi theo 100 mL), cột "mỗi mL" chúng tôi chia 100 cho dễ đọc:

| Mã | Số hạt trong 100 mL | Số hạt trong 1 mL |
| ---: | :--- | :--- |
| 22 | trên 2.000.000 đến 4.000.000 | 20.000–40.000 |
| 21 | trên 1.000.000 đến 2.000.000 | 10.000–20.000 |
| 20 | trên 500.000 đến 1.000.000 | 5.000–10.000 |
| 19 | trên 250.000 đến 500.000 | 2.500–5.000 |
| 18 | trên 130.000 đến 250.000 | 1.300–2.500 |
| 17 | trên 64.000 đến 130.000 | 640–1.300 |
| 16 | trên 32.000 đến 64.000 | 320–640 |
| 15 | trên 16.000 đến 32.000 | 160–320 |
| 14 | trên 8.000 đến 16.000 | 80–160 |
| 13 | trên 4.000 đến 8.000 | 40–80 |

Đọc ví dụ **18/16/13**: mỗi mL dầu có 1.300–2.500 hạt từ 4 µm(c), 320–640 hạt từ 6 µm(c) và 40–80 hạt từ 14 µm(c). Hạt cỡ vài micromet mắt thường không thấy được, nên dầu trông trong vắt vẫn có thể ở mã 21/19/16.

Tài liệu cũ đôi khi chỉ ghi **hai số**, ví dụ 16/13 hay 18/12. Đó là cách ghi của ISO 4406 bản 1987, chỉ đếm hạt từ 5 và 15 µm. Theo bài của Leonard Bensch (Pall) trên [Machinery Lubrication](https://www.machinerylubrication.com/Articles/Print/12?id=12), ngưỡng 6 µm(c) và 14 µm(c) của cách đếm mới tương ứng gần với 5 µm và 15 µm của cách cũ, nên mã hai số **gần bằng hai số cuối** của mã ba số.

## Cấp NAS 1638 là gì, đọc thế nào? {#nas-1638}

NAS 1638 là tiêu chuẩn hàng không của Mỹ, chia hạt thành **năm khoảng cỡ**: 5–15, 15–25, 25–50, 50–100 và trên 100 µm, đếm trong **100 mL** dầu. Mỗi khoảng có một bảng giới hạn từ cấp 00 tới cấp 12, cấp sau gấp đôi cấp trước. Cấp NAS của mẫu dầu là **cấp cao nhất** trong năm khoảng. Một phần bảng giới hạn (theo [bảng NAS 1638 do ZEISS công bố](https://knowledge.zeiss.com/rms/en/zen-core/toolkits-modules/application-and-workflow-toolkits/technical-cleanliness-analysis-tca/introduction-to-standards/nas-1638-national-aerospace-standard)):

| Cấp NAS | 5–15 µm | 15–25 µm | 25–50 µm | 50–100 µm | > 100 µm |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 5 | 8.000 | 1.425 | 253 | 45 | 8 |
| 6 | 16.000 | 2.850 | 506 | 90 | 16 |
| 7 | 32.000 | 5.700 | 1.012 | 180 | 32 |
| 8 | 64.000 | 11.400 | 2.025 | 360 | 64 |
| 9 | 128.000 | 22.800 | 4.050 | 720 | 128 |
| 10 | 256.000 | 45.600 | 8.100 | 1.440 | 256 |

Ví dụ phiếu kết quả ghi khoảng 5–15 µm có 50.000 hạt (cấp 8) nhưng khoảng 15–25 µm có 12.000 hạt (vượt cấp 8, rơi vào cấp 9) thì mẫu dầu là **NAS 9**.

Cần biết hai điều trước khi dùng NAS. Thứ nhất, theo bài "What Happened to NAS 1638?" của Mike Day (Pall) trên [Machinery Lubrication (11/2002)](https://www.machinerylubrication.com/Read/409/nas-1638), NAS 1638 đã **ngừng áp dụng cho thiết kế mới từ 30/5/2001**, thay bằng SAE AS4059; chính tiêu chuẩn cũng ghi không nên dùng với máy đếm hạt tự động. Thứ hai, NAS đếm **riêng từng khoảng cỡ**, còn ISO 4406 đếm **cộng dồn** từ một cỡ trở lên, nên phòng thí nghiệm OELCHECK lưu ý hai cách ghi không quy đổi chính xác được sang nhau. Các bảng quy đổi NAS sang ISO trên mạng chỉ nên coi là gần đúng; khi hợp đồng hay hướng dẫn máy ghi cấp NAS, tốt nhất hỏi lại hãng máy mã ISO 4406 tương ứng.

## Dầu mới mở phuy sạch tới mức nào? {#dau-moi}

Dầu mới không có nghĩa là dầu sạch. RE 90220 của Bosch Rexroth viết: dầu thủy lực **thường không đạt** mức sạch yêu cầu khi giao, nên phải lọc kỹ trong quá trình chạy và nhất là **lúc nạp dầu**. Tài liệu cũng lưu ý số liệu độ sạch mà hãng dầu công bố là tính ở thời điểm rót vào thùng chứa, không tính điều kiện vận chuyển và lưu kho sau đó.

Mức sạch tối thiểu mà tiêu chuẩn đặt ra cho dầu mới thì khá rộng. Theo [OELCHECK](https://en.oelcheck.com/wiki/hydraulic-fluids/), dầu mới theo DIN 51524 phải đạt tối thiểu cấp **21/19/16**; mức này đủ cho hệ thủy lực đơn giản như máy nâng nhưng thường không đủ cho van servo. Hãng van servo Moog trong bài "Ten Tips to Optimize Servo Hydraulic Machines" (07/2015) viết thêm rằng dầu mới thường ở mức 18/12 (cách ghi hai số), chưa tới 14/11 hay 13/10 mà thiết bị chính xác cần, và khuyên **đừng mặc định dầu mới là đủ sạch**.

Bẩn từ đâu ra? Bài của Loren Green trên [Machinery Lubrication (2019)](https://www.machinerylubrication.com/Articles/Print/31436?id=31436) chỉ ra một nguồn ít ai nghĩ tới: chính quá trình làm phuy có mài và hàn, sinh ra hạt kim loại. Sau đó còn rót, vận chuyển, mở nắp, bơm tay, phễu và can trung gian ở xưởng. Bài của Jeanna Van Rensselar trên tạp chí [TLT của STLE (10/2021)](https://www.stle.org/files/TLTArchives/2021/10_October/Best_Practices.aspx) thậm chí ghi dầu mới trong phuy có khi bẩn hơn cả dầu cũ vừa xả ra khỏi hệ thống.

Các mã dầu thủy lực chúng tôi đang bán, kể cả những mã công bố DIN 51524-2 như [Castrol Hyspin AWS 68](/dau-thuy-luc/castrol-hyspin-aws-68) hay [ENEOS Super Hyrando 68](/dau-thuy-luc/eneos-super-hyrando-68), **không ghi cấp độ sạch trên TDS**, nên bạn không nên coi phuy mới là đạt mức của van servo. Danh sách đầy đủ các mã có trong mục [dầu thủy lực](/dau-thuy-luc).

## Van servo, van tỷ lệ cần dầu sạch tới đâu? {#muc-yeu-cau}

Van servo và van tỷ lệ điều khiển dòng dầu bằng một con trượt chạy trong ống lót với khe hở rất nhỏ. Bennett Fitch (Noria) viết trên [Machinery Lubrication](https://www.machinerylubrication.com/Articles/Print/31668) rằng với van servo, chênh áp lớn qua khe hẹp tạo nguy cơ hạt bẩn **ép kẹt con trượt** vào thân van. Hạt lớn gây kẹt, hỏng đột ngột; hạt nhỏ làm mòn dần mép điều khiển, van đáp ứng chậm, rò trong tăng, áp và vị trí dao động. Bosch Rexroth tóm lại: hạt rắn là nguyên nhân chính gây sự cố trong hệ thủy lực.

| Nguồn | Hệ hoặc linh kiện | Mức ISO 4406 khuyến nghị |
| :--- | :--- | :--- |
| Bosch Rexroth RE 90220/09.18 | Hệ thủy lực nói chung khi vận hành | 20/18/15 hoặc sạch hơn |
| Bosch Rexroth RE 90220/09.18 | Van servo đặc biệt | 18/16/13 hoặc sạch hơn |
| [Moog (07/2015)](https://www.moog.com/news/ideas-in-motion-control/2015/07/ten-tips-to-optimize-servo-hydraulic-machines-for-long-term-productivity.html) | Van servo, mức cơ bản (mòn bình thường) | 17/14/11 |
| Moog (07/2015) | Van servo, tuổi thọ dài (độ chính xác cao hơn) | 16/13/10 |
| [OELCHECK](https://en.oelcheck.com/wiki/cleanliness-classes-lubricants/) | Thủy lực áp thấp và trung bình (dưới 160 bar) | 21/18/13 hoặc sạch hơn |
| OELCHECK | Thủy lực tỷ lệ và áp cao (trên 160 bar) | 19/16/13 hoặc sạch hơn |
| OELCHECK | Thiết bị servo, van servo | 17/14/11 hoặc sạch hơn |

<img src="/images/blog/do-sach-dau-moi-va-van-servo.svg" alt="Biểu đồ cột so sánh số hạt từ 4 micromet mỗi mL của dầu mới theo DIN 51524 với mức yêu cầu của van servo theo Bosch Rexroth và Moog" width="760" height="400" loading="lazy" decoding="async" style="width:100%;height:auto" />

Đặt cạnh nhau, khoảng cách rất rõ: dầu mới vừa đạt mức tối thiểu 21/19/16 có thể chứa tới 20.000 hạt từ 4 µm trong mỗi mL, trong khi van servo đặc biệt theo Bosch Rexroth cần không quá 2.500 hạt (mã 18), theo Moog là khoảng 1.300 hạt (mã 17) hoặc 640 hạt (mã 16). Nói cách khác, dầu mới có thể bẩn gấp khoảng 8 đến 30 lần mức van cần. Bosch Rexroth còn nhấn mạnh: **linh kiện đòi sạch nhất quyết định mức sạch của cả hệ**. Máy ép chỉ có một van tỷ lệ thì cả thùng dầu phải giữ theo mức của van đó.

Mức sạch tốt hơn cũng kéo dài tuổi thọ. Bài của [Loren Green](https://www.machinerylubrication.com/Articles/Print/31436?id=31436) dẫn ở trên viết rằng làm sạch dầu thêm chỉ một mã đã có thể tăng tuổi thọ thiết bị khoảng 35%. Mức cụ thể cho từng van luôn nằm trong bảng thông số của chính van đó, nên hãy lấy số trong tài liệu hướng dẫn sử dụng kèm theo máy trước khi áp các mức tham khảo ở trên.

## Nạp dầu mới cho máy có van servo thế nào cho sạch? {#nap-dau}

Nguyên tắc chung là dầu mới phải đi qua lọc trước khi vào thùng. Moog khuyên lọc dầu mới cho đạt mức của hệ **trước khi bơm vào thùng**, Bosch Rexroth yêu cầu lọc kỹ lúc nạp. Cách làm ở xưởng:

1. **Dùng xe lọc (bơm có cụm lọc) để nạp**, không đổ bằng phễu hay can hở. Nếu máy có cổng nạp qua lọc hồi thì nạp qua cổng đó.
2. **Chọn lõi lọc có hệ số β(c) ≥ 1.000** ở cỡ hạt hãng máy yêu cầu. Theo Mike Day (Pall) trên [Machinery Lubrication](https://www.machinerylubrication.com/Articles/Print/217?id=217), β(c) ≥ 1.000 là mức lọc được công bố theo phép thử ISO 16889, nghĩa là cứ 1.000 hạt cỡ đó đi vào thì chỉ khoảng 1 hạt lọt qua.
3. **Đừng lọc quá mịn khi chưa hỏi hãng dầu.** Rebecca Zwetzig ([Chevron](https://www.chevronlubricants.com/en_us/home/learning/from-chevron/industrial-machinery/check-the-third-spec-dont-assume-new-oil-is-clean.html)) lưu ý lõi lọc quá mịn, ví dụ dưới 10 µm, có nguy cơ giữ lại phụ gia chống tạo bọt, và không phải dầu nào cũng dễ lọc.
4. **Lắp lọc thở trên nắp thùng**, nơi ẩm thì dùng lọc thở có hút ẩm. Bosch Rexroth ghi đây là yêu cầu bắt buộc để giữ mức sạch suốt thời gian chạy.
5. **Giữ phuy kín và sạch:** lau sạch quanh nắp trước khi mở, dùng ống hút riêng cho từng loại dầu, không để phuy mở nắp ngoài trời.
6. **Chạy tuần hoàn qua lọc sau khi thay dầu** một thời gian rồi mới lấy mẫu đếm hạt để xác nhận.

Các bước xả dầu cũ, súc rửa và thay lõi lọc khi thay dầu có trong bài [hướng dẫn thay dầu thủy lực](/ho-tro-ky-thuat/huong-dan-thay-dau-thuy-luc). Nếu phải đổi loại dầu (ví dụ HLP sang HVLP), đọc thêm bài [phân biệt dầu thủy lực HM, HV, HG, HS](/ho-tro-ky-thuat/dau-thuy-luc-hm-hv-hg-hs) để chọn đúng loại trước khi nạp.

## Kiểm tra độ sạch dầu thủy lực bằng cách nào? {#dem-hat}

Độ sạch hạt rắn **không đo được bằng mắt hay bằng các phép thử nhanh** như nhìn màu, thử giọt trên giấy lọc hay thử nước bằng tấm nóng. Các phép thử đó vẫn có ích để phát hiện dầu đen, cặn lớn hoặc dầu nhiễm nước, xem bài [hướng dẫn kiểm tra chất lượng dầu](/ho-tro-ky-thuat/huong-dan-test-chat-luong-dau) và bài [kiểm tra nước trong dầu tại hiện trường](/ho-tro-ky-thuat/test-nuoc-trong-dau-tai-hien-truong); riêng mã ISO 4406 thì phải đếm hạt.

Có hai cách đếm phổ biến: **máy đếm hạt tự động** theo ISO 11500 (đếm theo nguyên lý che sáng, dùng cho dầu trong) và **đếm dưới kính hiển vi** trên màng lọc theo ISO 4407 (dùng khi dầu đục, nhiều nước hoặc cần nhìn hình dạng hạt). Mẫu nên lấy khi máy đang chạy, từ điểm lấy mẫu cố định trên đường ống, vào chai sạch chuyên dụng, để kết quả các lần so sánh được với nhau.

Khi đọc phiếu kết quả, hãy so ba số với mức của linh kiện khó tính nhất trong máy. Chỉ cần một số vượt (ví dụ số giữa là 18 trong khi van cần 16) là đã cần lọc tuần hoàn hoặc tìm nguồn bẩn: lọc thở hỏng, phớt cần xi lanh mòn, lõi lọc bỏ qua (bypass) vì tắc.

Cần mua dầu cho máy có van servo, bạn có thể xem khoảng giá các mã dầu thủy lực ở [bảng giá dầu thủy lực](/bao-gia-dau-thuy-luc); giá chính thức xác nhận khi đặt hàng.

## Câu hỏi thường gặp {#hoi-dap}

### Mã ISO 4406 18/16/13 nghĩa là gì? {#ma-18-16-13}

Mỗi mL dầu có 1.300–2.500 hạt từ 4 µm(c), 320–640 hạt từ 6 µm(c) và 40–80 hạt từ 14 µm(c) trở lên. Đây là mức Bosch Rexroth yêu cầu tối thiểu cho van servo đặc biệt.

### Cấp NAS có đổi sang mã ISO 4406 được không? {#quy-doi-nas-iso}

Không có quy đổi chính xác, vì NAS 1638 đếm theo từng khoảng cỡ hạt còn ISO 4406 đếm cộng dồn. Các bảng quy đổi trên mạng chỉ nên dùng để ước lượng; yêu cầu chính thức nên ghi bằng mã ISO 4406, hoặc gửi mẫu cho phòng thí nghiệm báo cả hai cách ghi.

### Dầu mới có cần lọc trước khi nạp không? {#loc-dau-moi}

Với máy có van servo, van tỷ lệ thì có. Bosch Rexroth và Moog đều khuyên lọc dầu mới khi nạp, vì dầu khi giao thường chưa đạt mức sạch của các van này. Hệ áp cao trên 160 bar cũng nên lọc, vì OELCHECK đặt mức 19/16/13 cho nhóm này, sạch hơn mức tối thiểu của dầu mới.

### Vì sao dầu trong vắt vẫn có thể bẩn? {#dau-trong-van-ban}

Phần lớn hạt bẩn trong dầu nhỏ hơn ngưỡng mắt thường nhìn thấy, trong khi chính các hạt cỡ vài micromet (mã 4 µm và 6 µm trong ISO 4406) là thứ làm mòn và bám cặn ở van. Dầu trong vắt vẫn có thể ở mã 21/19/16 hoặc bẩn hơn; chỉ đếm hạt mới biết.

### Bao lâu nên kiểm tra độ sạch dầu một lần? {#chu-ky-kiem-tra}

Không có chu kỳ chung cho mọi máy. Nên đếm hạt sau mỗi lần thay hoặc thêm nhiều dầu, sau khi sửa chữa mở hệ thống, và định kỳ theo hướng dẫn của hãng máy; máy có van servo chạy liên tục nên kiểm tra dày hơn máy chỉ có van đóng mở thông thường.

