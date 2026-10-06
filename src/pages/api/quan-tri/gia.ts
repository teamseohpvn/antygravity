import type { APIContext, APIRoute } from 'astro';
import { db, docCauHinh, type GiaRow } from '../../../lib/gia';
import { TRANG_GIA, ghiTrang, thongTinXuatBan } from '../../../lib/trang-tinh';
import { damBaoCsdl } from '../../../lib/khoi-tao';

export const prerender = false;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

/** Ngày hôm nay theo giờ Việt Nam (UTC+7), dạng YYYY-MM-DD. */
const homNay = () => new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10);
/**
 * Xuất bản tĩnh: render lại các trang bảng giá từ D1 (một lần) và lưu HTML vào KV.
 * Khách truy cập sau đó nhận nguyên HTML này, không đọc D1.
 */
async function xuatBan(ctx: APIContext, nguoi: string) {
  const ketQua: Array<{ path: string; ok: boolean; luc?: string; loi?: string }> = [];
  for (const path of TRANG_GIA) {
    try {
      ctx.locals.taoLaiTrangTinh = true;
      const res = await ctx.rewrite(new Request(new URL(path, ctx.url), { method: 'GET' }));
      const html = await res.text();
      if (res.status !== 200 || !html.includes('</html>')) throw new Error(`render trả ${res.status}`);
      const meta = await ghiTrang(path, html, nguoi);
      ketQua.push({ path, ok: true, luc: meta.luc });
    } catch (e: any) {
      console.error('xuat-ban', path, e);
      ketQua.push({ path, ok: false, loi: String(e?.message ?? e) });
    } finally {
      ctx.locals.taoLaiTrangTinh = false;
    }
  }
  return ketQua;
}

const nowIso = () => new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const optStr = (v: unknown, max: number) => str(v, max) || null;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Giá: số nguyên VNĐ từ 1.000 đến 1 tỷ, hoặc null (hiện "Liên hệ"). Nhận cả chuỗi "1.250.000". */
function parseGia(v: unknown): number | null | undefined {
  if (v === null || v === '') return null;
  // Chỉ nhận chữ số kèm dấu chấm/phẩy/khoảng trắng phân cách nghìn; "-5", "1e6", "12k" bị từ chối.
  if (typeof v !== 'number' && !/^[\d.,\s]+$/.test(String(v))) return undefined;
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[^\d]/g, ''));
  if (!Number.isInteger(n) || n < 1_000 || n > 1_000_000_000) return undefined; // undefined = không hợp lệ
  return n;
}

function parseInfo(raw: any): { data?: Omit<GiaRow, 'id' | 'cap_nhat_luc' | 'gia' | 'hien_thi'>; error?: string } {
  const data = {
    ma_hh: optStr(raw?.ma_hh, 60),
    ten: str(raw?.ten, 120),
    hang: str(raw?.hang, 60),
    danh_muc: str(raw?.danh_muc, 60),
    cap: optStr(raw?.cap, 60),
    nguon: raw?.nguon === 'trong-nuoc' ? 'trong-nuoc' : 'nhap-khau',
    quy_cach: str(raw?.quy_cach, 60),
    dung_tich: raw?.dung_tich === '' || raw?.dung_tich == null ? null : Number(raw.dung_tich),
    don_vi_do: raw?.don_vi_do === 'kg' ? 'kg' : 'L',
    trang: optStr(raw?.trang, 80),
    thu_tu: Number.isInteger(Number(raw?.thu_tu)) ? Number(raw.thu_tu) : 0,
    ghi_chu: optStr(raw?.ghi_chu, 300),
  } as const;
  if (!data.ten) return { error: 'Thiếu tên sản phẩm.' };
  if (!data.hang) return { error: 'Thiếu hãng.' };
  if (!SLUG.test(data.danh_muc)) return { error: 'Danh mục phải là slug, ví dụ dau-thuy-luc.' };
  if (!data.quy_cach) return { error: 'Thiếu quy cách.' };
  if (data.trang && !SLUG.test(data.trang)) return { error: 'Slug trang sản phẩm không hợp lệ.' };
  if (data.dung_tich != null && !(data.dung_tich > 0 && data.dung_tich <= 10_000)) return { error: 'Dung tích phải là số dương (lít hoặc kg).' };
  return { data };
}

export const GET: APIRoute = async () => {
  const d = db();
  await damBaoCsdl(d);
  const [rows, cauHinh, lichSu, xuatBanInfo] = await Promise.all([
    d.prepare('SELECT * FROM gia_san_pham ORDER BY danh_muc, thu_tu, cap, ten, dung_tich DESC').all<GiaRow>(),
    docCauHinh(d),
    d.prepare('SELECT * FROM lich_su_gia ORDER BY id DESC LIMIT 100').all(),
    thongTinXuatBan().catch(() => []),
  ]);
  return json(200, { ok: true, rows: rows.results, cauHinh, lichSu: lichSu.results, xuatBan: xuatBanInfo });
};

async function xuLy({ request, locals }: APIContext): Promise<Response> {
  const d = db();
  await damBaoCsdl(d);
  const user = locals.adminUser ?? 'admin';
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Dữ liệu không hợp lệ.' });
  }
  const ngayRaSoat = d.prepare("INSERT INTO cau_hinh (khoa, gia_tri) VALUES ('ngay_ra_soat', ?1) ON CONFLICT(khoa) DO UPDATE SET gia_tri = excluded.gia_tri").bind(homNay());

  switch (body?.action) {
    // Lưu nhiều dòng một lần: [{ id, gia, hien_thi }]. Chỉ ghi dòng thật sự thay đổi.
    case 'cap-nhat': {
      const items = Array.isArray(body.items) ? body.items.slice(0, 500) : [];
      if (!items.length) return json(400, { ok: false, error: 'Không có thay đổi nào.' });
      const ids = items.map((it: any) => Number(it.id)).filter(Number.isInteger);
      if (!ids.length) return json(400, { ok: false, error: 'Thiếu id.' });
      const cur = await d.prepare(`SELECT id, ten, gia, hien_thi FROM gia_san_pham WHERE id IN (${ids.map(() => '?').join(',')})`).bind(...ids).all<Pick<GiaRow, 'id' | 'ten' | 'gia' | 'hien_thi'>>();
      const byId = new Map(cur.results.map((r) => [r.id, r]));
      const stmts: D1PreparedStatement[] = [];
      for (const it of items) {
        const old = byId.get(Number(it.id));
        if (!old) continue;
        const gia = parseGia(it.gia);
        if (gia === undefined) return json(400, { ok: false, error: `Giá không hợp lệ ở dòng "${old.ten}".` });
        const hienThi = it.hien_thi ? 1 : 0;
        if (gia === old.gia && hienThi === old.hien_thi) continue;
        stmts.push(d.prepare('UPDATE gia_san_pham SET gia = ?1, hien_thi = ?2, cap_nhat_luc = ?3 WHERE id = ?4').bind(gia, hienThi, nowIso(), old.id));
        if (gia !== old.gia) stmts.push(d.prepare("INSERT INTO lich_su_gia (san_pham_id, ten, hanh_dong, gia_cu, gia_moi, nguoi_sua) VALUES (?1, ?2, 'sua-gia', ?3, ?4, ?5)").bind(old.id, old.ten, old.gia, gia, user));
        if (hienThi !== old.hien_thi) stmts.push(d.prepare("INSERT INTO lich_su_gia (san_pham_id, ten, hanh_dong, gia_cu, gia_moi, nguoi_sua) VALUES (?1, ?2, ?3, NULL, NULL, ?4)").bind(old.id, old.ten, hienThi ? 'hien' : 'an', user));
      }
      if (!stmts.length) return json(200, { ok: true, changed: 0 });
      await d.batch([...stmts, ngayRaSoat]);
      return json(200, { ok: true, changed: stmts.length });
    }

    case 'them': {
      const { data, error } = parseInfo(body.row);
      if (!data) return json(400, { ok: false, error });
      const gia = parseGia(body.row?.gia);
      if (gia === undefined) return json(400, { ok: false, error: 'Giá không hợp lệ.' });
      try {
        const res = await d
          .prepare(`INSERT INTO gia_san_pham (ma_hh, ten, hang, danh_muc, cap, nguon, quy_cach, dung_tich, don_vi_do, gia, trang, thu_tu, ghi_chu, cap_nhat_luc)
                    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14) RETURNING id`)
          .bind(data.ma_hh, data.ten, data.hang, data.danh_muc, data.cap, data.nguon, data.quy_cach, data.dung_tich, data.don_vi_do, gia, data.trang, data.thu_tu, data.ghi_chu, nowIso())
          .first<{ id: number }>();
        await d.batch([
          d.prepare("INSERT INTO lich_su_gia (san_pham_id, ten, hanh_dong, gia_cu, gia_moi, nguoi_sua) VALUES (?1, ?2, 'them', NULL, ?3, ?4)").bind(res!.id, data.ten, gia, user),
          ngayRaSoat,
        ]);
        return json(200, { ok: true, id: res!.id });
      } catch (e: any) {
        if (String(e?.message).includes('UNIQUE')) return json(400, { ok: false, error: 'Mã HH đã tồn tại.' });
        throw e;
      }
    }

    case 'sua': {
      const id = Number(body.id);
      const { data, error } = parseInfo(body.row);
      if (!data || !Number.isInteger(id)) return json(400, { ok: false, error: error ?? 'Thiếu id.' });
      try {
        const res = await d
          .prepare(`UPDATE gia_san_pham SET ma_hh=?1, ten=?2, hang=?3, danh_muc=?4, cap=?5, nguon=?6, quy_cach=?7, dung_tich=?8, don_vi_do=?9, trang=?10, thu_tu=?11, ghi_chu=?12, cap_nhat_luc=?13 WHERE id=?14`)
          .bind(data.ma_hh, data.ten, data.hang, data.danh_muc, data.cap, data.nguon, data.quy_cach, data.dung_tich, data.don_vi_do, data.trang, data.thu_tu, data.ghi_chu, nowIso(), id)
          .run();
        if (!res.meta.changes) return json(404, { ok: false, error: 'Không tìm thấy dòng.' });
      } catch (e: any) {
        if (String(e?.message).includes('UNIQUE')) return json(400, { ok: false, error: 'Mã HH đã tồn tại.' });
        throw e;
      }
      await d.prepare("INSERT INTO lich_su_gia (san_pham_id, ten, hanh_dong, nguoi_sua) VALUES (?1, ?2, 'sua-thong-tin', ?3)").bind(id, data.ten, user).run();
      return json(200, { ok: true });
    }

    case 'xoa': {
      const id = Number(body.id);
      const old = await d.prepare('SELECT id, ten, gia FROM gia_san_pham WHERE id = ?1').bind(id).first<Pick<GiaRow, 'id' | 'ten' | 'gia'>>();
      if (!old) return json(404, { ok: false, error: 'Không tìm thấy dòng.' });
      await d.batch([
        d.prepare('DELETE FROM gia_san_pham WHERE id = ?1').bind(id),
        d.prepare("INSERT INTO lich_su_gia (san_pham_id, ten, hanh_dong, gia_cu, gia_moi, nguoi_sua) VALUES (?1, ?2, 'xoa', ?3, NULL, ?4)").bind(id, old.ten, old.gia, user),
      ]);
      return json(200, { ok: true });
    }

    // Cấu hình chung. xac_nhan = true: "đã rà giá hôm nay, giữ nguyên" → cập nhật ngày rà soát.
    case 'cau-hinh': {
      const stmts: D1PreparedStatement[] = [];
      const set = (k: string, v: string) =>
        stmts.push(d.prepare('INSERT INTO cau_hinh (khoa, gia_tri) VALUES (?1, ?2) ON CONFLICT(khoa) DO UPDATE SET gia_tri = excluded.gia_tri').bind(k, v));
      if (typeof body.gom_vat === 'boolean') set('gom_vat', body.gom_vat ? '1' : '0');
      if (typeof body.nhan_dinh === 'string') set('nhan_dinh', body.nhan_dinh.trim().slice(0, 600));
      if (body.he_so_tren !== undefined) {
        const h = Number(body.he_so_tren);
        if (!(h >= 1 && h <= 2)) return json(400, { ok: false, error: 'Hệ số phải từ 1 đến 2.' });
        set('he_so_tren', String(h));
      }
      if (body.xac_nhan) stmts.push(ngayRaSoat);
      if (!stmts.length) return json(400, { ok: false, error: 'Không có thay đổi nào.' });
      stmts.push(d.prepare("INSERT INTO lich_su_gia (san_pham_id, ten, hanh_dong, nguoi_sua) VALUES (0, 'Cấu hình bảng giá', ?1, ?2)").bind(body.xac_nhan ? 'xac-nhan-ra-soat' : 'sua-cau-hinh', user));
      await d.batch(stmts);
      return json(200, { ok: true });
    }

    default:
      return json(400, { ok: false, error: 'Thao tác không hợp lệ.' });
  }
}

// Mỗi thao tác ghi thành công → xuất bản lại trang bảng giá tĩnh. Thao tác 'xuat-ban' chỉ xuất bản.
export const POST: APIRoute = async (ctx) => {
  const user = ctx.locals.adminUser ?? 'admin';
  let action: string | undefined;
  try {
    action = (await ctx.request.clone().json())?.action;
  } catch {
    /* xuLy trả lỗi dữ liệu */
  }
  const res = action === 'xuat-ban' ? json(200, { ok: true }) : await xuLy(ctx);
  if (res.status !== 200) return res;
  const body = await res.json();
  if (body.changed === 0) return json(200, body); // Không có gì đổi thì không xuất bản lại.
  const xuatBanKq = await xuatBan(ctx, user);
  return json(200, { ...body, xuatBan: xuatBanKq });
};
