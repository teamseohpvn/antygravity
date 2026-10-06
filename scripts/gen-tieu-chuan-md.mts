// Sinh docs/tieu_chuan.md từ src/lib/tieu-chuan.ts:
//   node --experimental-strip-types scripts/gen-tieu-chuan-md.mts > docs/tieu_chuan.md
import { TIEU_CHUAN } from '../src/lib/tieu-chuan.ts';
const row = (t: any) => `| [${t.code}](${t.url}) | ${t.name} | ${t.tcvn ? `[${t.tcvn}](${t.tcvnUrl})` : '–'} | ${t.tcvnNote ?? 'Chưa có TCVN tương đương'} |`;
const head = '| Mã gốc | Chỉ tiêu | TCVN tương đương | Mức tương đương |\n| :--- | :--- | :--- | :--- |';
const astm = TIEU_CHUAN.filter((t) => t.code.startsWith('ASTM'));
const isoTest = TIEU_CHUAN.filter((t) => t.code.startsWith('ISO') && !/Phân loại|Yêu cầu/.test(t.name));
const isoSpec = TIEU_CHUAN.filter((t) => t.code.startsWith('ISO') && /Phân loại|Yêu cầu/.test(t.name));
console.log(`# Tiêu chuẩn dầu nhớt trong TDS và TCVN tương đương

Bảng tra dùng khi viết trang sản phẩm: mỗi phương pháp thử trong TDS có link tới **công bố gốc của tổ chức phát hành** (ASTM, ISO) và **TCVN tương đương** trên cổng của Viện Tiêu chuẩn Chất lượng Việt Nam (tieuchuan.vsqi.gov.vn).

- Tra cứu TCVN ngày 06/10/2026, chỉ lấy tiêu chuẩn **còn hiệu lực**. "IDT" là tương đương hoàn toàn theo VSQI.
- Link ASTM dạng \`www.astm.org/Standards/D445.htm\` tự chuyển tới bản mới nhất trên store.astm.org.
- Link ISO dạng \`iso.org/standard/<id>.html\` là bản hiện hành; dạng \`iso.org/obp/...\` là nền tảng tra cứu OBP của ISO (mở bản mới nhất).
- **Dữ liệu gốc nằm trong \`src/lib/tieu-chuan.ts\`.** Bảng "Thông số kỹ thuật điển hình" trên trang sản phẩm tự gắn link và cột TCVN khi trường \`method\` khớp mã ở đây (ví dụ \`ASTM D445\`, \`ISO 3104 / ASTM D445\`). Thêm tiêu chuẩn mới: sửa file .ts, rồi chạy \`node --experimental-strip-types scripts/gen-tieu-chuan-md.mts > docs/tieu_chuan.md\`.

## Cách ghi trường \`method\` trong file sản phẩm

- Ghi đúng mã: \`ASTM D445\`, \`ISO 2592\`, \`ISO 14635-1\`. Có cả ISO và ASTM thì ngăn bằng \`/\`: \`ISO 3104 / ASTM D445\`.
- \`ASTM D665A\`, \`ASTM D665B\` tự quy về \`ASTM D665\`.
- Phương pháp không có trong bảng (GOST, IP, DIN, IEC…) vẫn hiển thị chữ, không có link.

## ASTM: phương pháp thử

${head}
${astm.map(row).join('\n')}

## ISO: phương pháp thử

${head}
${isoTest.map(row).join('\n')}

## ISO: phân loại và yêu cầu kỹ thuật sản phẩm

Dùng trong đoạn mô tả sản phẩm, ví dụ "đạt HM theo ISO 11158 (tương đương TCVN 12416:2019)".

${head}
${isoSpec.map(row).join('\n')}

## Chưa có TCVN tương đương

Các phương pháp ghi "Chưa có TCVN tương đương" đã tra trên VSQI theo mã và theo tên tiếng Việt nhưng không thấy TCVN còn hiệu lực ghi tương đương. Một số TCVN cũ cùng chủ đề nhưng **không ghi tương đương**, không dùng làm quy đổi:

- TCVN 5853:1995 Mỡ nhờn, độ lún kim (gần ASTM D217)
- TCVN 2697:1978 Mỡ bôi trơn, nhiệt độ nhỏ giọt (gần ASTM D566)

## Chưa đưa vào bảng

DIN 51524-2/-3, DIN 51517-3, ASTM D4378, SAE J300/J306, API, các phép thử GOST, IP, IEC: chưa tra link công bố và TCVN. Bổ sung khi có sản phẩm cần.
`);
