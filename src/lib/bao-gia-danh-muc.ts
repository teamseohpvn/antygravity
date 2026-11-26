// Danh mục nào đã có trang báo giá riêng thì mọi nút "Báo giá" của danh mục đó đưa khách tới form
// ngay trên trang báo giá ấy (mục #gui-yeu-cau), thay vì /bao-gia chung. Danh mục chưa có trang báo giá
// vẫn dùng /bao-gia?sp=... như cũ. Khi phát hành trang báo giá mới, chỉ cần thêm một dòng ở đây.
//
// Quy tắc link (14/11/2026):
// - Nút lặp nhiều lần trên một trang (lưới sản phẩm, bảng tồn kho, bảng giá) là <button>, không phải link,
//   để trang không có hàng chục link chữ "Báo giá" trỏ cùng một địa chỉ.
// - Mỗi trang chỉ giữ một vài link thật có chữ rõ nghĩa ("Xem bảng giá dầu thủy lực ...") tới trang báo giá.

export const ID_FORM_BAO_GIA = 'gui-yeu-cau';

/** Khóa sessionStorage để mang tên sản phẩm từ nút "Báo giá" sang form ở trang khác. */
export const KHOA_SP = 'bao-gia-sp';

export interface TrangBaoGia {
  /** Đường dẫn trang báo giá của danh mục. */
  href: string;
  /** Chữ link trên trang sản phẩm (đặt cạnh khung giá). */
  chuSanPham: string;
  /** Chữ link trên trang danh mục, đặt trước lưới sản phẩm. */
  chuDanhMuc: string;
}

const THUY_LUC: TrangBaoGia = {
  href: '/bao-gia-dau-thuy-luc',
  chuSanPham: 'Xem báo giá nhiều mã dầu thủy lực khác',
  chuDanhMuc: 'Xem bảng giá dầu thủy lực 68, 46, 32 tại kho',
};
const MO: TrangBaoGia = {
  href: '/bao-gia-mo-boi-tron',
  chuSanPham: 'Xem báo giá mỡ bôi trơn các hãng',
  chuDanhMuc: 'Xem bảng giá mỡ bôi trơn, mỡ chịu nhiệt theo độ đặc NLGI',
};

export const TRANG_BAO_GIA: Record<string, TrangBaoGia> = {
  'dau-thuy-luc': THUY_LUC,
  'mo-boi-tron-cong-nghiep': MO,
  'mo-chiu-nhiet': MO,
};

export const trangBaoGiaCua = (danhMuc?: string): TrangBaoGia | undefined =>
  danhMuc ? TRANG_BAO_GIA[danhMuc] : undefined;

/** Địa chỉ nút "Báo giá" đưa tới: form trên trang báo giá của danh mục, hoặc /bao-gia chung. */
export function dichBaoGia(danhMuc: string | undefined, sp?: string): string {
  const trang = trangBaoGiaCua(danhMuc);
  if (trang) return `${trang.href}#${ID_FORM_BAO_GIA}`;
  return sp ? `/bao-gia?sp=${encodeURIComponent(sp)}` : '/bao-gia';
}
