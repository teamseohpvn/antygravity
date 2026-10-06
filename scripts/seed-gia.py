#!/usr/bin/env python3
"""Sinh file SQL tạo danh sách sản phẩm ban đầu cho bảng giá D1 (gia_san_pham).

CHỈ tạo danh sách hàng (tên, hãng, danh mục, cấp, quy cách, mã HH kho tháng 10/2026).
KHÔNG nạp giá: cột `gia` để trống, web hiện "Liên hệ" cho tới khi nhân viên nhập giá ở /quan-tri.
Nguồn giá duy nhất của trang bảng giá là database D1, cập nhật qua trang quản trị.

Chạy (chỉ dùng cho database mới, lệnh xóa toàn bộ dòng cũ trong gia_san_pham):
  python3 scripts/seed-gia.py migrations-seed/seed-san-pham.sql
  npx wrangler d1 execute gia-dau --remote --file migrations-seed/seed-san-pham.sql
"""
import sys

# (Mã HH kho, tên hiển thị, hãng, danh mục, cấp, nguồn, quy cách, dung tích, đơn vị đo, slug trang)
ROWS = [
    # Dầu thủy lực
    ("AW2", "ENEOS Super Hyrando 68", "ENEOS", "dau-thuy-luc", "ISO VG 68", "nhap-khau", "Phuy 200 L", 200, "L", "eneos-super-hyrando-68"),
    ("CASTR68", "Castrol Hyspin AWS 68", "Castrol", "dau-thuy-luc", "ISO VG 68", "nhap-khau", "Phuy 209 L", 209, "L", "castrol-hyspin-aws-68"),
    ("MAXIMA 68", "Maxima 68", "Maxima", "dau-thuy-luc", "ISO VG 68", "nhap-khau", "Xô 18 L", 18, "L", "maxima-68"),
    ("LAW68-P", "EMER LAW 68", "EMER", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "L", "emer-law-68"),
    ("LAW68-X", "EMER LAW 68", "EMER", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "L", "emer-law-68"),
    ("AW68-Xone ( Phuy)", "X-One AW 68", "X-One", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "L", "x-one-aw-68"),
    ("AW68-Xone ( Xô 18L)", "X-One AW 68", "X-One", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "L", "x-one-aw-68"),
    ("EMI AW68 P", "EMI AW 68", "EMI", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "L", "emi-aw-68"),
    ("EMI AW68 X", "EMI AW 68", "EMI", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "L", "emi-aw-68"),
    ("QT-APEXTL68", "APEX TL 68", "Quốc Trung", "dau-thuy-luc", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "L", "apex-tl-68"),
    # Dầu bánh răng, máy nén khí, rãnh trượt
    ("M220", "ENEOS Bonnoc TS 220", "ENEOS", "dau-banh-rang", "ISO VG 220", "nhap-khau", "Xô 18 L", 18, "L", "eneos-bonnoc-ts"),
    ("RA32", "ENEOS Faircol RA 32", "ENEOS", "dau-may-nen-khi", "ISO VG 32", "nhap-khau", "Can 18 L", 18, "L", "eneos-faircol-ra"),
    ("ROSIA CPR32", "VHP Rosia CPR 32", "VHP", "dau-may-nen-khi", "ISO VG 32", "trong-nuoc", "Xô 18 L", 18, "L", "vhp-rosia-cpr"),
    ("ROSIA can", "VHP Rosia CPR 46", "VHP", "dau-may-nen-khi", "ISO VG 46", "trong-nuoc", "Xô 18 L", 18, "L", "vhp-rosia-cpr"),
    ("SHL 68M", "SHL Synthway 68M", "SHL", "dau-ranh-truot", "ISO VG 68", "trong-nuoc", "Can 20 L", 20, "L", "shl-synthway-68m"),
    # Dầu cầu, hộp số
    ("Spirax S2 A85W140", "Shell Spirax S2 A 85W-140", "Shell", "dau-cau-hop-so", "API GL-5 · 85W-140", "nhap-khau", "Xô 20 L", 20, "L", "shell-spirax-s2-a"),
    ("PV OIL 90", "PVOIL PV Transmission EP GL-4 90", "PVOIL", "dau-cau-hop-so", "API GL-4 · SAE 90", "trong-nuoc", "Phuy 200 L", 200, "L", "pv-transmission-ep-gl4"),
    ("ATF (VHP)", "VHP Spadila ATF", "VHP", "dau-cau-hop-so", "ATF Dexron II, III", "trong-nuoc", "Xô 18 L", 18, "L", "vhp-spadila-atf"),
    ("P140", "VHP dầu cầu P140", "VHP", "dau-cau-hop-so", "SAE 140", "trong-nuoc", "Xô 18 L", 18, "L", "vhp-p140"),
    ("EMI 85W140 GL5 X", "EMI Gear EP GL-5 85W-140", "EMI", "dau-cau-hop-so", "API GL-5 · 85W-140", "trong-nuoc", "Xô 18 L", 18, "L", "emi-gear-ep-gl-5"),
    ("EMI 80W90 GL5 X", "EMI Gear EP GL-5 80W-90", "EMI", "dau-cau-hop-so", "API GL-5 · 80W-90", "trong-nuoc", "Xô 18 L", 18, "L", "emi-gear-ep-gl-5"),
    # Dầu động cơ diesel
    ("15w40cf-4", "ENEOS DEO CF-4 15W-40", "ENEOS", "dau-dong-co-diesel", "API CF-4 · 15W-40", "nhap-khau", "Can 18 L", 18, "L", "eneos-deo-cf-4"),
    ("CF1", "ENEOS DEO CF-4 20W-50", "ENEOS", "dau-dong-co-diesel", "API CF-4 · 20W-50", "nhap-khau", "Can 18 L", 18, "L", "eneos-deo-cf-4"),
    ("CI-15W40", "ENEOS DEO CI-4 15W-40", "ENEOS", "dau-dong-co-diesel", "API CI-4 · 15W-40", "nhap-khau", "Can 18 L", 18, "L", "eneos-deo-ci-4"),
    ("CI1", "ENEOS DEO CI-4 20W-50", "ENEOS", "dau-dong-co-diesel", "API CI-4 · 20W-50", "nhap-khau", "Can 18 L", 18, "L", "eneos-deo-ci-4"),
    ("CI2", "ENEOS DEO CI-4 20W-50", "ENEOS", "dau-dong-co-diesel", "API CI-4 · 20W-50", "nhap-khau", "Phuy 200 L", 200, "L", "eneos-deo-ci-4"),
    ("ĐC castrol CI4 20w50", "Castrol CRB Turbomax CI-4 20W-50", "Castrol", "dau-dong-co-diesel", "API CI-4 · 20W-50", "nhap-khau", "Phuy 209 L", 209, "L", "castrol-crb-turbomax"),
    ("Vecton 15W40 CI4", "Castrol Vecton 15W-40 CI-4/E7", "Castrol", "dau-dong-co-diesel", "API CI-4 · 15W-40", "nhap-khau", "Phuy 209 L", 209, "L", "castrol-vecton"),
    ("EMI CF4 20W50 P", "EMI CF-4 20W-50", "EMI", "dau-dong-co-diesel", "API CF-4 · 20W-50", "trong-nuoc", "Phuy 200 L", 200, "L", "emi-cf-4-20w-50"),
    ("EMI CI4 20W50 X", "EMI CI-4 20W-50", "EMI", "dau-dong-co-diesel", "API CI-4 · 20W-50", "trong-nuoc", "Xô 18 L", 18, "L", "emi-ci-4-20w-50"),
    # Mỡ
    ("Lithium L4 17kg", "VHP Lithium Grease L4", "VHP", "mo-boi-tron-cong-nghiep", "NLGI 4", "trong-nuoc", "Xô 17 kg", 17, "kg", "vhp-lithium-grease"),
    ("Licas Tuýp", "VHP Licas Grease No.3", "VHP", "mo-boi-tron-cong-nghiep", "NLGI 3", "trong-nuoc", "Ống 400 g", 0.4, "kg", "licas-grease"),
    ("CALIX NO3", "Calix Ceno Grease No3", "Calix", "mo-boi-tron-cong-nghiep", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "kg", "calix-ceno-grease"),
]

def q(v):
    if v is None:
        return "NULL"
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


def main(out_file: str):
    lines = [
        "-- Sinh bởi scripts/seed-gia.py: chỉ danh sách sản phẩm, KHÔNG có giá (nhập giá ở /quan-tri).",
        "DELETE FROM gia_san_pham;",
    ]
    for ma, ten, hang, dm, cap, nguon, qc, dt, dv, trang in ROWS:
        thu_tu = 0 if qc.startswith("Phuy") else 1
        lines.append(
            "INSERT INTO gia_san_pham (ma_hh, ten, hang, danh_muc, cap, nguon, quy_cach, dung_tich, don_vi_do, gia, trang, thu_tu) VALUES ("
            + ", ".join(q(v) for v in (ma, ten, hang, dm, cap, nguon, qc, dt, dv, None, trang, thu_tu))
            + ");"
        )
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"{len(ROWS)} sản phẩm (chưa có giá) → {out_file}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
