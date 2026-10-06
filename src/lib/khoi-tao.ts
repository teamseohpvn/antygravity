// Tự tạo bảng và nạp danh sách sản phẩm (KHÔNG có giá) ở lần truy cập đầu tiên,
// để deploy xong là dùng được /quan-tri mà không phải chạy migration bằng tay.
// Câu lệnh lấy nguyên từ migrations/0001_bang_gia.sql (IF NOT EXISTS, chạy lại không sao).
import schemaSql from '../../migrations/0001_bang_gia.sql?raw';
import seedSql from '../../migrations-seed/seed-san-pham.sql?raw';

/** Tách file SQL thành từng câu lệnh: bỏ chú thích "--", tách theo ";" nằm ngoài chuỗi '...'. */
export function tachCauLenh(sql: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inStr = false;
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i];
    if (!inStr && c === '-' && sql[i + 1] === '-') {
      while (i < sql.length && sql[i] !== '\n') i++;
      cur += '\n';
      continue;
    }
    if (c === "'") inStr = !inStr;
    if (!inStr && c === ';') {
      if (cur.trim()) out.push(cur.trim());
      cur = '';
      continue;
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

let daKiemTra = false;

export async function damBaoCsdl(d: D1Database): Promise<void> {
  if (daKiemTra) return;
  const co = await d.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'gia_san_pham'").first();
  if (!co) {
    await d.batch(tachCauLenh(schemaSql).map((s) => d.prepare(s)));
  }
  const { n } = (await d.prepare('SELECT count(*) AS n FROM gia_san_pham').first<{ n: number }>()) ?? { n: 0 };
  if (!n) {
    // Chỉ nạp khi bảng trống; bỏ câu DELETE đầu file seed.
    const lenh = tachCauLenh(seedSql).filter((s) => !/^DELETE\b/i.test(s));
    await d.batch(lenh.map((s) => d.prepare(s)));
  }
  daKiemTra = true;
}
