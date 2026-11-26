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

/** Khoảng giá công khai của một trang sản phẩm (mọi quy cách), cho khối giá và AggregateOffer trong schema. */
export function giaSanPham(danhMuc: string, trang: string): { rows: DongGiaCongKhai[]; cauHinh: CauHinh } {
  const rows = (data.rows as DongJson[])
    .filter((r) => r.danh_muc === danhMuc && r.trang === trang && r.thap != null && r.cao != null)
    .map(({ danh_muc: _dm, thu_tu: _tt, ...r }) => r);
  return { rows, cauHinh: data.cau_hinh as CauHinh };
}

/** Giá thấp nhất mỗi lít/kg của một trang sản phẩm (mọi quy cách, mọi cấp), dùng để xếp phân khúc giá. */
export function giaDonViThapNhat(danhMuc: string, trang: string): { gia: number; donVi: string } | undefined {
  const rows = (data.rows as (DongJson & { thap_don_vi?: number; don_vi_do?: string })[])
    .filter((r) => r.danh_muc === danhMuc && r.trang === trang && r.thap_don_vi);
  if (!rows.length) return;
  const r = rows.reduce((a, b) => (b.thap_don_vi! < a.thap_don_vi! ? b : a));
  return { gia: r.thap_don_vi!, donVi: r.don_vi_do ?? 'L' };
}

/**
 * Mã cùng nhóm có giá gần nhất phía dưới và phía trên (theo giá thấp nhất mỗi lít/kg trên bảng giá công khai).
 * Chỉ dùng số đã công khai; chênh dưới 3% coi như cùng phân khúc, không xếp.
 */
export function phanKhucGia<T extends { id: string; danhMuc: string }>(
  sp: T,
  cungNhom: T[],
): { reHon?: T; caoHon?: T } {
  const goc = giaDonViThapNhat(sp.danhMuc, sp.id);
  if (!goc) return {};
  const coGia = cungNhom
    .filter((p) => p.id !== sp.id)
    .map((p) => ({ p, g: giaDonViThapNhat(p.danhMuc, p.id) }))
    .filter((x): x is { p: T; g: { gia: number; donVi: string } } => !!x.g && x.g.donVi === goc.donVi);
  const reHon = coGia.filter((x) => x.g.gia < goc.gia * 0.97).sort((a, b) => b.g.gia - a.g.gia)[0]?.p;
  const caoHon = coGia.filter((x) => x.g.gia > goc.gia * 1.03).sort((a, b) => a.g.gia - b.g.gia)[0]?.p;
  return { reHon, caoHon };
}
