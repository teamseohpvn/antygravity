// Dòng nào có sẵn ở kho nào, hiện ở cột "Tình trạng" của bảng giá. Chỉ điền theo số liệu kho thật, không suy đoán.
// Khóa: `${trang}|${quy_cach}`, ví dụ 'emer-law-68|Phuy 200 L': ['thanh-binh', 'kien-an'].
// Đổi TON_KHO_CAP_NHAT mỗi lần sửa. Dòng chưa có dữ liệu sẽ hiện "Có sẵn" kèm "Hỏi kho gần bạn".
export const KHO_NGAN = {
  'thanh-binh': 'Thanh Bình',
  'kien-an': 'Kiến An',
  'tien-phong': 'Tiền Phong',
  'nhu-quynh': 'Như Quỳnh',
} as const;

export type KhoId = keyof typeof KHO_NGAN;

export const TON_KHO_CAP_NHAT: string | null = null;
export const TON_KHO: Record<string, KhoId[]> = {};

// Dòng tạm hết hàng: vẫn hiện trên bảng giá với nhãn "Tạm hết hàng", không tính vào số tóm tắt và mô tả meta.
// Khóa giống TON_KHO. Bỏ khóa khi hàng về.
// 15/11/2026: người dùng báo Cosmo Hydro AW 68 hết hàng.
export const HET_HANG = new Set<string>(['cosmo-hydro-aw-68|Phuy 200 L']);
