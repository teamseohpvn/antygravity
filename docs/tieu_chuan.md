# Tiêu chuẩn dầu nhớt trong TDS và TCVN tương đương

Bảng tra dùng khi viết trang sản phẩm: mỗi phương pháp thử trong TDS có link tới **công bố gốc của tổ chức phát hành** (ASTM, ISO) và **TCVN tương đương** trên cổng của Viện Tiêu chuẩn Chất lượng Việt Nam (tieuchuan.vsqi.gov.vn).

- Tra cứu TCVN ngày 06/10/2026, chỉ lấy tiêu chuẩn **còn hiệu lực**. "IDT" là tương đương hoàn toàn theo VSQI.
- Link ASTM dạng `www.astm.org/Standards/D445.htm` tự chuyển tới bản mới nhất trên store.astm.org.
- Link ISO dạng `iso.org/standard/<id>.html` là bản hiện hành; dạng `iso.org/obp/...` là nền tảng tra cứu OBP của ISO (mở bản mới nhất).
- **Dữ liệu gốc nằm trong `src/lib/tieu-chuan.ts`.** Bảng "Thông số kỹ thuật điển hình" trên trang sản phẩm tự gắn link và cột TCVN khi trường `method` khớp mã ở đây (ví dụ `ASTM D445`, `ISO 3104 / ASTM D445`). Thêm tiêu chuẩn mới: sửa file .ts, rồi chạy `node --experimental-strip-types scripts/gen-tieu-chuan-md.mts > docs/tieu_chuan.md`.

## Cách ghi trường `method` trong file sản phẩm

- Ghi đúng mã: `ASTM D445`, `ISO 2592`, `ISO 14635-1`. Có cả ISO và ASTM thì ngăn bằng `/`: `ISO 3104 / ASTM D445`.
- `ASTM D665A`, `ASTM D665B` tự quy về `ASTM D665`.
- Phương pháp không có trong bảng (GOST, IP, DIN, IEC…) vẫn hiển thị chữ, không có link.

## ASTM: phương pháp thử

| Mã gốc | Chỉ tiêu | TCVN tương đương | Mức tương đương |
| :--- | :--- | :--- | :--- |
| [ASTM D445](https://www.astm.org/Standards/D445.htm) | Độ nhớt động học | [TCVN 3171:2011](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+3171%3A2011) | IDT ASTM D445-11 |
| [ASTM D4052](https://www.astm.org/Standards/D4052.htm) | Khối lượng riêng (máy đo hiện số) | [TCVN 8314:2010](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+8314%3A2010) | IDT ASTM D4052-02 |
| [ASTM D1298](https://www.astm.org/Standards/D1298.htm) | Khối lượng riêng (tỷ trọng kế) | [TCVN 6594:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+6594%3A2007) | IDT ASTM D1298-05 |
| [ASTM D97](https://www.astm.org/Standards/D97.htm) | Điểm đông đặc | [TCVN 3753:2011](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+3753%3A2011) | IDT ASTM D97-11 |
| [ASTM D6749](https://www.astm.org/Standards/D6749.htm) | Điểm đông đặc (tự động, áp suất khí) | – | Chưa có TCVN tương đương; TCVN 3753 (D97) không quy định phương pháp tự động, báo cáo ghi số hiệu ASTM |
| [ASTM D2270](https://www.astm.org/Standards/D2270.htm) | Chỉ số độ nhớt | [TCVN 6019:2010](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+6019%3A2010) | IDT ASTM D2270-04 |
| [ASTM D92](https://www.astm.org/Standards/D92.htm) | Điểm chớp cháy cốc hở Cleveland | [TCVN 7498:2005](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+7498%3A2005) | IDT ASTM D92-02b (tên TCVN ghi cho bitum, cùng phương pháp) |
| [ASTM D93](https://www.astm.org/Standards/D93.htm) | Điểm chớp cháy cốc kín Pensky-Martens | [TCVN 2693:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+2693%3A2007) | IDT ASTM D93-06 |
| [ASTM D2896](https://www.astm.org/Standards/D2896.htm) | Trị số kiềm tổng TBN (chuẩn độ điện thế) | [TCVN 3167:2008](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+3167%3A2008) | IDT ASTM D2896-07a |
| [ASTM D4739](https://www.astm.org/Standards/D4739.htm) | Trị số kiềm tổng TBN (chuẩn độ điện thế, HCl) | – | Chưa có TCVN tương đương |
| [ASTM D874](https://www.astm.org/Standards/D874.htm) | Tro sunphat | [TCVN 2689:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+2689%3A2007) | IDT ASTM D874-06 |
| [ASTM D1500](https://www.astm.org/Standards/D1500.htm) | Màu ASTM | [TCVN 6023:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+6023%3A2007) | IDT ISO 2049, cùng thang màu ASTM |
| [ASTM D974](https://www.astm.org/Standards/D974.htm) | Trị số axit/kiềm (chỉ thị màu) | [TCVN 2695:2008](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+2695%3A2008) | IDT ASTM D974-06 |
| [ASTM D664](https://www.astm.org/Standards/D664.htm) | Trị số axit TAN (chuẩn độ điện thế) | [TCVN 6325:2013](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+6325%3A2013) | IDT ASTM D664-11a |
| [ASTM D892](https://www.astm.org/Standards/D892.htm) | Đặc tính tạo bọt | [TCVN 12915:2020](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+12915%3A2020) | IDT ASTM D892-18 |
| [ASTM D1401](https://www.astm.org/Standards/D1401.htm) | Khả năng tách nước | – | Chưa có TCVN tương đương |
| [ASTM D665](https://www.astm.org/Standards/D665.htm) | Khả năng chống gỉ khi có nước | – | Chưa có TCVN tương đương |
| [ASTM D130](https://www.astm.org/Standards/D130.htm) | Ăn mòn tấm đồng | [TCVN 2694:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+2694%3A2007) | IDT ASTM D130-04e1 |
| [ASTM D4048](https://www.astm.org/Standards/D4048.htm) | Ăn mòn tấm đồng (mỡ bôi trơn) | [TCVN 6326:2008](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+6326%3A2008) | IDT ASTM D4048-02 |
| [ASTM D943](https://www.astm.org/Standards/D943.htm) | Độ bền oxy hóa TOST | [TCVN 12922:2020](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+12922%3A2020) | IDT ASTM D943-19 |
| [ASTM D2272](https://www.astm.org/Standards/D2272.htm) | Độ bền oxy hóa RPVOT | – | Chưa có TCVN tương đương |
| [ASTM D217](https://www.astm.org/Standards/D217.htm) | Độ xuyên kim của mỡ | – | Chưa có TCVN tương đương |
| [ASTM D566](https://www.astm.org/Standards/D566.htm) | Nhiệt độ nhỏ giọt của mỡ | – | Chưa có TCVN tương đương |
| [ASTM D2265](https://www.astm.org/Standards/D2265.htm) | Nhiệt độ nhỏ giọt của mỡ (dải rộng) | – | Chưa có TCVN tương đương |
| [ASTM D2596](https://www.astm.org/Standards/D2596.htm) | Tải hàn dính bốn bi (mỡ) | – | Chưa có TCVN tương đương |
| [ASTM D5293](https://www.astm.org/Standards/D5293.htm) | Độ nhớt khởi động lạnh CCS | – | Chưa có TCVN tương đương |
| [ASTM D2983](https://www.astm.org/Standards/D2983.htm) | Độ nhớt Brookfield ở nhiệt độ thấp | – | Chưa có TCVN tương đương |
| [ASTM D3427](https://www.astm.org/Standards/D3427.htm) | Khả năng thoát khí | – | Chưa có TCVN tương đương |
| [ASTM D6304](https://www.astm.org/Standards/D6304.htm) | Hàm lượng nước (Karl Fischer điện lượng) | [TCVN 3182:2013](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+3182%3A2013) | IDT ASTM D6304-07 |
| [ASTM D95](https://www.astm.org/Standards/D95.htm) | Hàm lượng nước (chưng cất) | [TCVN 2692:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+2692%3A2007) | IDT ASTM D95-05e1 |
| [ASTM D6224](https://www.astm.org/Standards/D6224.htm) | Giám sát dầu bôi trơn đang sử dụng | – | Chưa có TCVN tương đương |
| [ASTM D6158](https://www.astm.org/Standards/D6158.htm) | Yêu cầu kỹ thuật dầu thủy lực khoáng | – | Chưa có TCVN tương đương |

## ISO: phương pháp thử

| Mã gốc | Chỉ tiêu | TCVN tương đương | Mức tương đương |
| :--- | :--- | :--- | :--- |
| [ISO 3104](https://www.iso.org/standard/67965.html) | Độ nhớt động học | – | Chưa có TCVN tương đương |
| [ISO 2592](https://www.iso.org/standard/67910.html) | Điểm chớp cháy cốc hở Cleveland | – | Chưa có TCVN tương đương |
| [ISO 2719](https://www.iso.org/standard/62263.html) | Điểm chớp cháy cốc kín Pensky-Martens | – | Chưa có TCVN tương đương |
| [ISO 3016](https://www.iso.org/standard/73386.html) | Điểm đông đặc | – | Chưa có TCVN tương đương |
| [ISO 2909](https://www.iso.org/standard/29953.html) | Chỉ số độ nhớt | – | Chưa có TCVN tương đương |
| [ISO 12185](https://www.iso.org/standard/82592.html) | Khối lượng riêng (ống chữ U dao động) | – | Chưa có TCVN tương đương |
| [ISO 6614](https://www.iso.org/standard/20869.html) | Khả năng tách nước | – | Chưa có TCVN tương đương |
| [ISO 2049](https://www.iso.org/obp/ui/#iso:std:iso:2049:en) | Màu (thang ASTM) | [TCVN 6023:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+6023%3A2007) | IDT ISO 2049:1996 |
| [ISO 7120](https://www.iso.org/obp/ui/#iso:std:iso:7120:en) | Khả năng chống gỉ khi có nước | – | Chưa có TCVN tương đương |
| [ISO 6247](https://www.iso.org/obp/ui/#iso:std:iso:6247:en) | Đặc tính tạo bọt | – | Chưa có TCVN tương đương |
| [ISO 9120](https://www.iso.org/obp/ui/#iso:std:iso:9120:en) | Khả năng thoát khí | – | Chưa có TCVN tương đương |
| [ISO 2160](https://www.iso.org/obp/ui/#iso:std:iso:2160:en) | Ăn mòn tấm đồng | – | Chưa có TCVN tương đương |
| [ISO 4263-1](https://www.iso.org/obp/ui/#iso:std:iso:4263:-1:en) | Độ bền oxy hóa TOST | – | Chưa có TCVN tương đương |
| [ISO 14635-1](https://www.iso.org/obp/ui/#iso:std:iso:14635:-1:en) | Thử tải bánh răng FZG A/8,3/90 | [TCVN 7695-1:2007](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+7695-1%3A2007) | IDT ISO 14635-1:2000 |

## ISO: phân loại và yêu cầu kỹ thuật sản phẩm

Dùng trong đoạn mô tả sản phẩm, ví dụ "đạt HM theo ISO 11158 (tương đương TCVN 12416:2019)".

| Mã gốc | Chỉ tiêu | TCVN tương đương | Mức tương đương |
| :--- | :--- | :--- | :--- |
| [ISO 3448](https://www.iso.org/obp/ui/#iso:std:iso:3448:en) | Phân loại cấp độ nhớt ISO VG | [TCVN 10507:2014](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+10507%3A2014) | IDT ISO 3448:1992 |
| [ISO 6743-4](https://www.iso.org/obp/ui/#iso:std:iso:6743:-4:en) | Phân loại dầu thủy lực (họ H) | [TCVN 8939-4:2019](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+8939-4%3A2019) | IDT ISO 6743-4:2015 |
| [ISO 11158](https://www.iso.org/standard/84812.html) | Yêu cầu kỹ thuật dầu thủy lực khoáng HH, HL, HM, HV, HG | [TCVN 12416:2019](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+12416%3A2019) | IDT ISO 11158:2009 |
| [ISO 12925-1](https://www.iso.org/obp/ui/#iso:std:iso:12925:-1:en) | Yêu cầu kỹ thuật dầu bánh răng kín (họ C) | [TCVN 13622-1:2023](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+13622-1%3A2023) | IDT ISO 12925-1:2018/Amd 1:2020 |
| [ISO 6743-9](https://www.iso.org/obp/ui/#iso:std:iso:6743:-9:en) | Phân loại mỡ bôi trơn (họ X) | [TCVN 8939-9:2011](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+8939-9%3A2011) | IDT ISO 6743-9:2003 |
| [ISO 12924](https://www.iso.org/obp/ui/#iso:std:iso:12924:en) | Yêu cầu kỹ thuật mỡ bôi trơn (họ X) | [TCVN 8938:2011](https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=TCVN+8938%3A2011) | IDT ISO 12924:2010 |

## Chưa có TCVN tương đương

Các phương pháp ghi "Chưa có TCVN tương đương" đã tra trên VSQI theo mã và theo tên tiếng Việt nhưng không thấy TCVN còn hiệu lực ghi tương đương. Một số TCVN cũ cùng chủ đề nhưng **không ghi tương đương**, không dùng làm quy đổi:

- TCVN 5853:1995 Mỡ nhờn, độ lún kim (gần ASTM D217)
- TCVN 2697:1978 Mỡ bôi trơn, nhiệt độ nhỏ giọt (gần ASTM D566)

## Chưa đưa vào bảng

DIN 51524-2/-3, DIN 51517-3, ASTM D4378, SAE J300/J306, API, các phép thử GOST, IP, IEC: chưa tra link công bố và TCVN. Bổ sung khi có sản phẩm cần.

