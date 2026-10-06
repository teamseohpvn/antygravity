-- Bảng giá dầu nhớt (Cloudflare D1). Code tự chạy file này ở lần truy cập đầu (src/lib/khoi-tao.ts);
-- chạy tay cũng được: npx wrangler d1 migrations apply gia-dau --remote. Viết dạng IF NOT EXISTS nên chạy lại không sao.
-- Chính sách giá (02/10/2026): web chỉ hiện khoảng giá = giá hiện tại → giá hiện tại × he_so_tren.
-- Cột `gia` là giá nội bộ, không bao giờ trả nguyên văn ra trang công khai (xem src/lib/gia.ts).

CREATE TABLE IF NOT EXISTS gia_san_pham (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ma_hh        TEXT UNIQUE,                       -- Mã HH trong phần mềm kho
  ten          TEXT NOT NULL,                     -- Tên hiển thị: "ENEOS Super Hyrando 68"
  hang         TEXT NOT NULL,                     -- Hãng: "ENEOS"
  danh_muc     TEXT NOT NULL,                     -- Slug danh mục: "dau-thuy-luc"
  cap          TEXT,                              -- "ISO VG 68", "SAE 15W-40", "NLGI 2"
  nguon        TEXT NOT NULL DEFAULT 'nhap-khau'
               CHECK (nguon IN ('nhap-khau', 'trong-nuoc')),
  quy_cach     TEXT NOT NULL,                     -- "Phuy 209 L", "Xô 18 L"
  dung_tich    REAL,                              -- Lít (hoặc kg) trong một đơn vị đóng gói, để quy đổi đơn giá
  don_vi_do    TEXT NOT NULL DEFAULT 'L' CHECK (don_vi_do IN ('L', 'kg')),
  gia          INTEGER,                           -- Giá hiện tại cho một đơn vị đóng gói (VNĐ). NULL = "Liên hệ"
  trang        TEXT,                              -- Slug trang sản phẩm trong sanpham/ (nếu có)
  hien_thi     INTEGER NOT NULL DEFAULT 1,        -- 1 = hiện trên bảng giá công khai
  thu_tu       INTEGER NOT NULL DEFAULT 0,
  ghi_chu      TEXT,                              -- Ghi chú nội bộ, không hiện ra web
  cap_nhat_luc TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_gia_danh_muc ON gia_san_pham (danh_muc, hien_thi, thu_tu);

-- Nhật ký mọi lần đổi giá (ai, lúc nào, từ bao nhiêu thành bao nhiêu).
CREATE TABLE IF NOT EXISTS lich_su_gia (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  san_pham_id INTEGER NOT NULL,
  ten         TEXT NOT NULL,
  hanh_dong   TEXT NOT NULL,                      -- 'sua-gia' | 'them' | 'xoa' | 'an' | 'hien' | 'sua-thong-tin' | 'sua-cau-hinh' | 'xac-nhan-ra-soat'
  gia_cu      INTEGER,
  gia_moi     INTEGER,
  nguoi_sua   TEXT,
  luc         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_lich_su_luc ON lich_su_gia (luc DESC);

-- Cấu hình chung của bảng giá.
CREATE TABLE IF NOT EXISTS cau_hinh (
  khoa    TEXT PRIMARY KEY,
  gia_tri TEXT NOT NULL
);
INSERT OR IGNORE INTO cau_hinh (khoa, gia_tri) VALUES
  ('he_so_tren', '1.15'),                         -- Đầu cao của khoảng giá = giá × hệ số
  ('gom_vat', '0'),                               -- 1 = giá đã gồm VAT; 0 = chưa gồm VAT
  ('ngay_ra_soat', strftime('%Y-%m-%d', 'now')),  -- Ngày rà giá gần nhất: hiện trên web, quyết định "Tháng MM/YYYY"
  ('nhan_dinh', '');                              -- Nhận định thị trường tháng này (để trống = không hiện)
