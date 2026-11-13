// Đánh giá trên hồ sơ Google Business chính của HT VINA (cid 7563996296023599602).
// Đọc thủ công trên Google Maps, KHÔNG lấy qua Places API (Places API cấm lưu nội dung review vào HTML).
// Giữ nguyên văn, không sửa chính tả. Tên viết tắt. Không gắn schema Review/aggregateRating.
// Có đánh giá mới: cập nhật ngayXem, soLuong, diem, rồi thêm vào danh sách nếu hợp.

export type ChuDeDanhGia = 'giao-hang' | 'phuc-vu' | 'chat-luong' | 'gia' | 'mo' | 'dau';

export interface DanhGia {
  ten: string;
  sao: number;
  noiDung: string;
  /** Thời điểm Google hiển thị lúc đọc (tương đối), ghi theo tháng. */
  thang: string;
  chuDe: ChuDeDanhGia[];
  ghiChu?: string;
}

export const DANH_GIA_GOOGLE = {
  ngayXem: '2026-11-13',
  diem: '5,0',
  soLuong: 11,
  xemTatCaUrl: 'https://www.google.com/maps?cid=7563996296023599602',
  vietDanhGiaUrl: 'https://search.google.com/local/writereview?placeid=ChIJUZawZb2bNTER8mnbMo62-Gg',
  danhSach: [
    { ten: 'Phuong N. N.', sao: 5, noiDung: 'đa dạng hàng. phục vụ nhanh. chu đáo', thang: '11/2026', chuDe: ['giao-hang', 'phuc-vu'] },
    { ten: 'S. H.', sao: 5, noiDung: 'giá cả phải chăng , phục vụ nhiệt tình', thang: '10/2026', chuDe: ['phuc-vu', 'gia'] },
    { ten: 'Huu P. N.', sao: 5, noiDung: 'hàng ổn,mình tin tưởng và đã sử dụng nhiều năm.', thang: '10/2026', chuDe: ['chat-luong'] },
    { ten: 'Hoan V. D.', sao: 5, noiDung: 'Mỡ tốt dùng hiệu quả.', thang: '10/2026', chuDe: ['chat-luong', 'mo'], ghiChu: 'đánh giá về mỡ bôi trơn' },
    { ten: 'Hung N. M.', sao: 5, noiDung: 'Chất lượng ok !!', thang: '10/2026', chuDe: ['chat-luong'] },
  ] as DanhGia[],
};
