// Bảng giá công khai đọc từ file JSON (src/data/gia-cong-khai.json, sinh bởi scripts/build-gia-json.py).
// Quyết định 10/10/2026: trang báo giá lấy giá từ JSON, chưa dùng D1; D1 + /quan-tri để dành cho app quản lý giá làm sau.
// File JSON chỉ chứa khoảng giá đã làm tròn (đúng con số hiện trên web), không có giá gốc.
import data from '../data/gia-cong-khai.json';
import type { CauHinh, DongGiaCongKhai } from './gia';

interface DongJson extends DongGiaCongKhai {
  danh_muc: string;
  thu_tu: number;
}

/** Cùng dạng kết quả với bangGiaCongKhai() (D1) để trang không phải đổi phần hiển thị. */
export function bangGiaTuJson(danhMuc: string): { rows: DongGiaCongKhai[]; cauHinh: CauHinh } {
  const rows = (data.rows as DongJson[])
    .filter((r) => r.danh_muc === danhMuc)
    .sort((a, b) => a.thu_tu - b.thu_tu || (a.cap ?? '').localeCompare(b.cap ?? '') || a.ten.localeCompare(b.ten))
    .map(({ danh_muc: _dm, thu_tu: _tt, ...r }) => r);
  return { rows, cauHinh: data.cau_hinh as CauHinh };
}
