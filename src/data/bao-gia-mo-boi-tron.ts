// Dữ liệu riêng của trang /bao-gia-mo-boi-tron. Giá đọc từ src/data/gia-cong-khai.json (scripts/build-gia-json.py), không gõ ở đây.

/**
 * Giám đốc đã duyệt giá mỡ của kỳ hiện tại chưa. 10/11/2026: ĐÃ DUYỆT (chủ site xác nhận), kỳ tháng 11/2026.
 * Khi chưa duyệt: dưới H1 ghi "đang chờ duyệt", không ghi kỳ hiệu lực. Duyệt xong thì đổi true và điền HIEU_LUC.
 */
export const GIA_DA_DUYET = true;

/** Kỳ hiệu lực (YYYY-MM-DD). Chỉ điền sau khi giám đốc duyệt; quá ngày `den` trang tự báo đang rà lại. */
export const HIEU_LUC: { tu: string; den: string } | null = { tu: '2026-11-01', den: '2026-11-30' };

/**
 * Dòng giá tạm ẩn, theo tên trên bảng giá.
 * ENEOS Epnoc AP(N): bảng giá ghi "NLGI 00, Can" nhưng trang sản phẩm ghi độ đặc 0/1/2/3 và chưa rõ can bao nhiêu kg (kế hoạch 05/11, điểm chặn 2).
 */
export const AN_DONG = ['ENEOS Epnoc Grease AP(N)'];

/** Khối lượng tịnh của quy cách không ghi kg trong tên, để quy ra giá mỗi kg. Thùng 30 ống × 400 g = 12 kg. */
export const KG_QUY_CACH: Record<string, number> = { 'Thùng 30 ống 400 g': 12 };
