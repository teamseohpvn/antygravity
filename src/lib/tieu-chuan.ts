// Bảng tra phương pháp thử / tiêu chuẩn dầu nhớt: link công bố gốc của tổ chức phát hành
// và TCVN tương đương (tra trên tieuchuan.vsqi.gov.vn, 06/10/2026).
// Bản dễ đọc cho người viết nội dung: docs/tieu_chuan.md. Sửa ở đây thì cập nhật file đó.
//
// Link ASTM dạng www.astm.org/Standards/D445.htm tự chuyển tới bản mới nhất trên store.astm.org.
// Link ISO dạng iso.org/standard/<id>.html là trang của bản hiện hành; tiêu chuẩn chưa tra được id
// dùng nền tảng tra cứu OBP của ISO (luôn mở bản mới nhất).

export interface TieuChuan {
  /** Mã hiển thị, ví dụ "ASTM D445" */
  code: string;
  /** Chỉ tiêu đo, tiếng Việt */
  name: string;
  /** Trang công bố của tổ chức phát hành */
  url: string;
  /** TCVN tương đương còn hiệu lực, nếu có */
  tcvn?: string;
  tcvnUrl?: string;
  /** Mức tương đương theo VSQI: IDT = tương đương hoàn toàn */
  tcvnNote?: string;
}

const astm = (n: string) => `https://www.astm.org/Standards/D${n}.htm`;
const isoStd = (id: number) => `https://www.iso.org/standard/${id}.html`;
const isoObp = (num: string, part?: string) =>
  `https://www.iso.org/obp/ui/#iso:std:iso:${num}${part ? `:-${part}` : ''}:en`;
const vsqi = (so: string) => `https://tieuchuan.vsqi.gov.vn/tieuchuan/view?sohieu=${encodeURIComponent(so).replace(/%20/g, '+')}`;

const LIST: TieuChuan[] = [
  // ---- ASTM: phương pháp thử ----
  { code: 'ASTM D445', name: 'Độ nhớt động học', url: astm('445'), tcvn: 'TCVN 3171:2011', tcvnNote: 'IDT ASTM D445-11' },
  { code: 'ASTM D4052', name: 'Khối lượng riêng (máy đo hiện số)', url: astm('4052'), tcvn: 'TCVN 8314:2010', tcvnNote: 'IDT ASTM D4052-02' },
  { code: 'ASTM D1298', name: 'Khối lượng riêng (tỷ trọng kế)', url: astm('1298'), tcvn: 'TCVN 6594:2007', tcvnNote: 'IDT ASTM D1298-05' },
  { code: 'ASTM D97', name: 'Điểm đông đặc', url: astm('97'), tcvn: 'TCVN 3753:2011', tcvnNote: 'IDT ASTM D97-11' },
  { code: 'ASTM D6749', name: 'Điểm đông đặc (tự động, áp suất khí)', url: astm('6749') },
  { code: 'ASTM D2270', name: 'Chỉ số độ nhớt', url: astm('2270'), tcvn: 'TCVN 6019:2010', tcvnNote: 'IDT ASTM D2270-04' },
  { code: 'ASTM D92', name: 'Điểm chớp cháy cốc hở Cleveland', url: astm('92'), tcvn: 'TCVN 7498:2005', tcvnNote: 'IDT ASTM D92-02b (tên TCVN ghi cho bitum, cùng phương pháp)' },
  { code: 'ASTM D93', name: 'Điểm chớp cháy cốc kín Pensky-Martens', url: astm('93'), tcvn: 'TCVN 2693:2007', tcvnNote: 'IDT ASTM D93-06' },
  { code: 'ASTM D2896', name: 'Trị số kiềm tổng TBN (chuẩn độ điện thế)', url: astm('2896'), tcvn: 'TCVN 3167:2008', tcvnNote: 'IDT ASTM D2896-07a' },
  { code: 'ASTM D4739', name: 'Trị số kiềm tổng TBN (chuẩn độ điện thế, HCl)', url: astm('4739') },
  { code: 'ASTM D874', name: 'Tro sunphat', url: astm('874'), tcvn: 'TCVN 2689:2007', tcvnNote: 'IDT ASTM D874-06' },
  { code: 'ASTM D1500', name: 'Màu ASTM', url: astm('1500'), tcvn: 'TCVN 6023:2007', tcvnNote: 'IDT ISO 2049, cùng thang màu ASTM' },
  { code: 'ASTM D974', name: 'Trị số axit/kiềm (chỉ thị màu)', url: astm('974'), tcvn: 'TCVN 2695:2008', tcvnNote: 'IDT ASTM D974-06' },
  { code: 'ASTM D664', name: 'Trị số axit TAN (chuẩn độ điện thế)', url: astm('664'), tcvn: 'TCVN 6325:2013', tcvnNote: 'IDT ASTM D664-11a' },
  { code: 'ASTM D892', name: 'Đặc tính tạo bọt', url: astm('892'), tcvn: 'TCVN 12915:2020', tcvnNote: 'IDT ASTM D892-18' },
  { code: 'ASTM D1401', name: 'Khả năng tách nước', url: astm('1401') },
  { code: 'ASTM D665', name: 'Khả năng chống gỉ khi có nước', url: astm('665') },
  { code: 'ASTM D130', name: 'Ăn mòn tấm đồng', url: astm('130'), tcvn: 'TCVN 2694:2007', tcvnNote: 'IDT ASTM D130-04e1' },
  { code: 'ASTM D4048', name: 'Ăn mòn tấm đồng (mỡ bôi trơn)', url: astm('4048'), tcvn: 'TCVN 6326:2008', tcvnNote: 'IDT ASTM D4048-02' },
  { code: 'ASTM D943', name: 'Độ bền oxy hóa TOST', url: astm('943'), tcvn: 'TCVN 12922:2020', tcvnNote: 'IDT ASTM D943-19' },
  { code: 'ASTM D2272', name: 'Độ bền oxy hóa RPVOT', url: astm('2272') },
  { code: 'ASTM D217', name: 'Độ xuyên kim của mỡ', url: astm('217') },
  { code: 'ASTM D566', name: 'Nhiệt độ nhỏ giọt của mỡ', url: astm('566') },
  { code: 'ASTM D2265', name: 'Nhiệt độ nhỏ giọt của mỡ (dải rộng)', url: astm('2265') },
  { code: 'ASTM D2596', name: 'Tải hàn dính bốn bi (mỡ)', url: astm('2596') },
  { code: 'ASTM D5293', name: 'Độ nhớt khởi động lạnh CCS', url: astm('5293') },
  { code: 'ASTM D2983', name: 'Độ nhớt Brookfield ở nhiệt độ thấp', url: astm('2983') },
  { code: 'ASTM D3427', name: 'Khả năng thoát khí', url: astm('3427') },
  { code: 'ASTM D6304', name: 'Hàm lượng nước (Karl Fischer điện lượng)', url: astm('6304'), tcvn: 'TCVN 3182:2013', tcvnNote: 'IDT ASTM D6304-07' },
  { code: 'ASTM D95', name: 'Hàm lượng nước (chưng cất)', url: astm('95'), tcvn: 'TCVN 2692:2007', tcvnNote: 'IDT ASTM D95-05e1' },
  { code: 'ASTM D6224', name: 'Giám sát dầu bôi trơn đang sử dụng', url: astm('6224') },
  { code: 'ASTM D6158', name: 'Yêu cầu kỹ thuật dầu thủy lực khoáng', url: astm('6158') },

  // ---- ISO: phương pháp thử ----
  { code: 'ISO 3104', name: 'Độ nhớt động học', url: isoStd(67965) },
  { code: 'ISO 2592', name: 'Điểm chớp cháy cốc hở Cleveland', url: isoStd(67910) },
  { code: 'ISO 2719', name: 'Điểm chớp cháy cốc kín Pensky-Martens', url: isoStd(62263) },
  { code: 'ISO 3016', name: 'Điểm đông đặc', url: isoStd(73386) },
  { code: 'ISO 2909', name: 'Chỉ số độ nhớt', url: isoStd(29953) },
  { code: 'ISO 12185', name: 'Khối lượng riêng (ống chữ U dao động)', url: isoStd(82592) },
  { code: 'ISO 6614', name: 'Khả năng tách nước', url: isoStd(20869) },
  { code: 'ISO 2049', name: 'Màu (thang ASTM)', url: isoObp('2049'), tcvn: 'TCVN 6023:2007', tcvnNote: 'IDT ISO 2049:1996' },
  { code: 'ISO 7120', name: 'Khả năng chống gỉ khi có nước', url: isoObp('7120') },
  { code: 'ISO 6247', name: 'Đặc tính tạo bọt', url: isoObp('6247') },
  { code: 'ISO 9120', name: 'Khả năng thoát khí', url: isoObp('9120') },
  { code: 'ISO 2160', name: 'Ăn mòn tấm đồng', url: isoObp('2160') },
  { code: 'ISO 4263-1', name: 'Độ bền oxy hóa TOST', url: isoObp('4263', '1') },
  { code: 'ISO 14635-1', name: 'Thử tải bánh răng FZG A/8,3/90', url: isoObp('14635', '1'), tcvn: 'TCVN 7695-1:2007', tcvnNote: 'IDT ISO 14635-1:2000' },

  // ---- ISO: phân loại và yêu cầu kỹ thuật sản phẩm ----
  { code: 'ISO 3448', name: 'Phân loại cấp độ nhớt ISO VG', url: isoObp('3448'), tcvn: 'TCVN 10507:2014', tcvnNote: 'IDT ISO 3448:1992' },
  { code: 'ISO 6743-4', name: 'Phân loại dầu thủy lực (họ H)', url: isoObp('6743', '4'), tcvn: 'TCVN 8939-4:2019', tcvnNote: 'IDT ISO 6743-4:2015' },
  { code: 'ISO 11158', name: 'Yêu cầu kỹ thuật dầu thủy lực khoáng HH, HL, HM, HV, HG', url: isoStd(84812), tcvn: 'TCVN 12416:2019', tcvnNote: 'IDT ISO 11158:2009' },
  { code: 'ISO 12925-1', name: 'Yêu cầu kỹ thuật dầu bánh răng kín (họ C)', url: isoObp('12925', '1'), tcvn: 'TCVN 13622-1:2023', tcvnNote: 'IDT ISO 12925-1:2018/Amd 1:2020' },
  { code: 'ISO 6743-9', name: 'Phân loại mỡ bôi trơn (họ X)', url: isoObp('6743', '9'), tcvn: 'TCVN 8939-9:2011', tcvnNote: 'IDT ISO 6743-9:2003' },
  { code: 'ISO 12924', name: 'Yêu cầu kỹ thuật mỡ bôi trơn (họ X)', url: isoObp('12924'), tcvn: 'TCVN 8938:2011', tcvnNote: 'IDT ISO 12924:2010' },
];

for (const t of LIST) if (t.tcvn && !t.tcvnUrl) t.tcvnUrl = vsqi(t.tcvn);

/** Chuẩn hóa mã: "ASTM D 665A" -> "ASTMD665", "ISO 14635-1" -> "ISO14635-1" */
const norm = (s: string) =>
  s.toUpperCase().replace(/\s+/g, '').replace(/^(ASTMD\d+)[A-Z]$/, '$1').replace(/:\d{4}$/, '');

const INDEX = new Map(LIST.map((t) => [norm(t.code), t]));

/** Tra một mã đơn, ví dụ "ASTM D445" hoặc "ISO 2592". */
export function traTieuChuan(code: string): TieuChuan | undefined {
  return INDEX.get(norm(code));
}

/** Tách chuỗi phương pháp trong TDS ("ISO 3104 / ASTM D445") thành từng mã kèm dữ liệu tra được. */
export function tachPhuongPhap(method: string): { text: string; tc?: TieuChuan }[] {
  return method.split('/').map((p) => p.trim()).filter(Boolean).map((text) => ({ text, tc: traTieuChuan(text) }));
}

export const TIEU_CHUAN = LIST;
