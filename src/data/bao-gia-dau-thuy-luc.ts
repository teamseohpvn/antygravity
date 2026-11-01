// Dữ liệu riêng của trang /bao-gia-dau-thuy-luc. Khối nào chưa có dữ liệu thật thì để null / mảng rỗng: trang tự ẩn khối đó.

/** Thời hạn hiệu lực của bảng giá (YYYY-MM-DD). Chỉ điền sau khi giám đốc duyệt giá của kỳ đó; quá ngày `den` trang tự báo đang rà lại. */
// 01/11/2026: ngày dưới đây là giả định cho bản nháp /test-bai, chưa được giám đốc duyệt.
export const HIEU_LUC: { tu: string; den: string } | null = { tu: '2026-11-01', den: '2026-11-30' };

export interface AnhGiaoHang { src: string; alt: string; width: number; height: number; chuThich: string }

/** Chuyến giao thực tế. Chỉ điền khi đã có ảnh, video thật và khách đồng ý bằng văn bản cho công khai tên nhà máy. */
export const CHUYEN_GIAO: {
  tieuDe: string;
  ngay: string;
  moTa: string;
  anh: AnhGiaoHang[];
  video?: { src: string; poster: string; moTa: string; thoiLuong: string };
} | null = null;

/** Ảnh chụp số liệu hồ sơ Google, đọc thủ công; đổi cùng lúc với danh sách khi có đánh giá mới. */
export const DANH_GIA_GOOGLE = {
  ngayXem: '2026-11-01',
  diem: '5,0',
  soLuong: 5,
  vietDanhGiaUrl: 'https://search.google.com/local/writereview?placeid=ChIJUZawZb2bNTER8mnbMo62-Gg',
  // Ba đánh giá Google hiển thị đầu tiên, giữ nguyên văn, theo thứ tự Google hiển thị. Không lọc, không sửa. Tên viết tắt.
  hienThi: [
    { ten: 'Hung N. M.', sao: 5, noiDung: 'Chất lượng ok !!' },
    { ten: 'S. H.', sao: 5, noiDung: 'giá cả phải chăng , phục vụ nhiệt tình' },
    { ten: 'Hoan V. D.', sao: 5, noiDung: 'Mỡ tốt dùng hiệu quả.', ghiChu: 'đánh giá về mỡ bôi trơn' },
  ],
};
