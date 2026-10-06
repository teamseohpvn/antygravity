// Hàm tính thuần (không phụ thuộc Cloudflare), dùng chung cho trang công khai và trang quản trị (chạy trên trình duyệt).

const floorTo = (v: number, step: number) => Math.floor(v / step) * step;
const ceilTo = (v: number, step: number) => Math.ceil(v / step) * step;

/** Giá hiện tại → khoảng giá công khai. Làm tròn xuống/lên để không lộ con số nội bộ. */
export function khoangGia(gia: number | null, dungTich: number | null, heSo: number) {
  if (!gia || gia <= 0) return { thap: null, cao: null, thap_don_vi: null, cao_don_vi: null };
  const step = gia >= 1_000_000 ? 10_000 : 1_000;
  const thap = floorTo(gia, step);
  const cao = ceilTo(gia * heSo, step);
  const per = dungTich && dungTich > 0;
  return {
    thap,
    cao,
    thap_don_vi: per ? floorTo(thap / dungTich!, 100) : null,
    cao_don_vi: per ? ceilTo(cao / dungTich!, 100) : null,
  };
}

const VND = new Intl.NumberFormat('vi-VN');
export const fmtVnd = (n: number | null) => (n == null ? '' : VND.format(n));

/** "2026-10-06" → "06/10/2026"; "2026-10" → "10/2026". */
export function fmtNgay(iso: string | null | undefined, kieu: 'ngay' | 'thang' = 'ngay'): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? '');
  if (!m) return '';
  return kieu === 'thang' ? `${m[2]}/${m[1]}` : `${m[3]}/${m[2]}/${m[1]}`;
}
