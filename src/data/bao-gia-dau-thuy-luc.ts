// Dữ liệu riêng của trang /bao-gia-dau-thuy-luc. Khối nào chưa có dữ liệu thật thì để null / mảng rỗng: trang tự ẩn khối đó.

/** Thời hạn hiệu lực của bảng giá (YYYY-MM-DD). Chỉ điền sau khi giám đốc duyệt giá của kỳ đó; quá ngày `den` trang tự báo đang rà lại. */
// Kỳ hiệu lực đang hiện trên trang. Đổi khi có kỳ giá mới.
export const HIEU_LUC: { tu: string; den: string } | null = { tu: '2026-11-01', den: '2026-11-30' };

export interface AnhGiaoHang { src: string; alt: string; width: number; height: number; chuThich: string }

/**
 * Chuyến giao thực tế. Chỉ điền khi đã có ảnh, video thật và khách đồng ý bằng văn bản cho công khai tên nhà máy.
 * 02/11/2026: video do người dùng đưa, đăng công khai trên kênh của công ty. Văn bản đồng ý của Nhôm Đông Á chưa xác nhận.
 * uploadDate, duration lấy từ trang YouTube, không gõ theo ước lượng.
 */
export const CHUYEN_GIAO: {
  tieuDe: string;
  ngay: string;
  moTa: string;
  anh: AnhGiaoHang[];
  video?: { youtubeId: string; moTa: string; thoiLuong: string; ngayDang: string };
} | null = {
  tieuDe: 'Thực tế giao 25 phuy dầu thủy lực X-One cho Nhôm Đông Á',
  ngay: '2026-10-31',
  moTa: 'HT VINA giao 25 phuy dầu thủy lực X-One cho nhà máy Nhôm Đông Á ngày 31/10/2026. Video dài 5 phút, đăng trên kênh YouTube của công ty.',
  anh: [
    { src: '/images/blog/giao-dau-nhom-dong-a-1.webp', alt: 'Xe tải thùng màu xanh lá đỗ cạnh tường nhà xưởng', width: 1200, height: 900, chuThich: 'Xe tải đỗ tại khu nhà xưởng.' },
    { src: '/images/blog/giao-dau-nhom-dong-a-6.webp', alt: 'Bảng chỉ dẫn trạm đóng gói sơn 2 có logo Nhôm Đông Á trong nhà máy', width: 1200, height: 900, chuThich: 'Bảng chỉ dẫn trong nhà máy Nhôm Đông Á.' },
    { src: '/images/blog/giao-dau-nhom-dong-a-3.webp', alt: 'Hai người hạ phuy dầu màu đỏ từ thùng xe tải trong nhà xưởng', width: 1200, height: 900, chuThich: 'Hạ phuy dầu từ thùng xe xuống nhà xưởng.' },
    { src: '/images/blog/giao-dau-nhom-dong-a-2.webp', alt: 'Thẻ thông tin HT VINA đặt trên phuy, phía sau là người đang hạ phuy trong xưởng nhôm', width: 1200, height: 900, chuThich: 'Thẻ thông tin HT VINA trên phuy trong lúc bốc dỡ.' },
    { src: '/images/blog/giao-dau-nhom-dong-a-4.webp', alt: 'Các phuy dầu màu đỏ xếp trong xưởng nhôm, phía trước có thẻ thông tin HT VINA', width: 1200, height: 1600, chuThich: 'Phuy dầu xếp trong xưởng, kèm thẻ thông tin HT VINA.' },
    { src: '/images/blog/giao-dau-nhom-dong-a-5.webp', alt: 'Nhiều phuy dầu màu đỏ xếp sát nhau cạnh dây chuyền trong nhà máy', width: 1200, height: 900, chuThich: 'Phuy dầu xếp cạnh dây chuyền trong nhà máy.' },
  ],
  video: {
    youtubeId: 'viOPDZPIcBQ',
    moTa: 'Video thực tế HT VINA giao 25 phuy dầu thủy lực X-One cho nhà máy Nhôm Đông Á.',
    thoiLuong: 'PT5M1S',
    ngayDang: '2026-11-01T23:54:19-08:00',
  },
};
