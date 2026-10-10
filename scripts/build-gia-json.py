#!/usr/bin/env python3
"""Sinh src/data/gia-cong-khai.json (khoảng giá công khai) từ file giá kho nội bộ.

Dùng tạm cho trang báo giá trong lúc chưa dùng D1 (quyết định 10/10/2026: nhập giá từ JSON,
D1 để dành cho app quản lý giá làm sau).

- Repo để công khai trên GitHub, nên file sinh ra CHỈ có khoảng giá đã làm tròn (đúng con số
  web hiện), không chép giá gốc trong file kho. File kho nằm ngoài repo.
- Khoảng giá = giá hiện tại → giá × HE_SO, làm tròn giống src/lib/gia-tinh.ts (khoangGia).
- Danh sách mã và cách khớp với file kho nằm ở DONG bên dưới. Mã có giá nghi sai thì ghi
  gia_kho=None để web hiện "Liên hệ".

Chạy:
  python3 scripts/build-gia-json.py ../du-lieu-noi-bo/kho-2026-09.json --ngay 2026-10-02
"""
import argparse
import json
import math
import sys
from pathlib import Path

HE_SO = 1.15
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "gia-cong-khai.json"

# (danh_muc, ten, hang, cap, nguon, quy_cach, dung_tich, trang, thu_tu, (tên trong file kho, quy cách trong file kho))
DONG = [
    ("dau-thuy-luc", "ENEOS Super Hyrando 68", "ENEOS", "ISO VG 68", "nhap-khau", "Phuy 200 L", 200, "eneos-super-hyrando-68", 0, ("ENEOS Super Hyrando 68", "Phuy 200L")),
    # File kho ghi 900.000 đ cho phuy 209 L: sai rõ ràng, để "Liên hệ" tới khi có giá đúng.
    ("dau-thuy-luc", "Castrol Hyspin AWS 68", "Castrol", "ISO VG 68", "nhap-khau", "Phuy 209 L", 209, "castrol-hyspin-aws-68", 0, None),
    ("dau-thuy-luc", "Maxima 68", "Maxima", "ISO VG 68", "nhap-khau", "Xô 18 L", 18, "maxima-68", 1, ("Dầu MAXIMA 68", "Xô 18L")),
    ("dau-thuy-luc", "EMER LAW 68", "EMER", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "emer-law-68", 0, ("Dầu thủy lực LAW68 (200L)", "Phuy")),
    ("dau-thuy-luc", "EMER LAW 68", "EMER", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "emer-law-68", 1, ("Dầu thủy lực LAW68 (18L)", "Xô")),
    ("dau-thuy-luc", "X-One AW 68", "X-One", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "x-one-aw-68", 0, ("Dầu thủy lực Xone 68", "Phuy 200L")),
    ("dau-thuy-luc", "X-One AW 68", "X-One", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "x-one-aw-68", 1, ("Dầu thủy lực Xone 68", "Xô 18L")),
    ("dau-thuy-luc", "EMI AW 68", "EMI", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "emi-aw-68", 0, ("Dầu Emi AW68", "Phuy 200L")),
    ("dau-thuy-luc", "EMI AW 68", "EMI", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "emi-aw-68", 1, ("Dầu Emi AW68", "Xô")),
    ("dau-thuy-luc", "APEX TL 68", "Quốc Trung", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "apex-tl-68", 0, ("Dầu thủy lực APEX TL 68 ( Quốc Trung)", "Phuy 200L")),
]


def floor_to(v, step):
    return math.floor(v / step) * step


def ceil_to(v, step):
    return math.ceil(round(v, 6) / step) * step


def khoang_gia(gia, dung_tich):
    """Giống khoangGia() trong src/lib/gia-tinh.ts."""
    if not gia or gia <= 0:
        return {"thap": None, "cao": None, "thap_don_vi": None, "cao_don_vi": None}
    step = 10_000 if gia >= 1_000_000 else 1_000
    thap = floor_to(gia, step)
    cao = ceil_to(gia * HE_SO, step)
    return {
        "thap": thap,
        "cao": cao,
        "thap_don_vi": floor_to(thap / dung_tich, 100) if dung_tich else None,
        "cao_don_vi": ceil_to(cao / dung_tich, 100) if dung_tich else None,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("kho", help="File giá kho nội bộ (JSON: name, pack, price)")
    ap.add_argument("--ngay", required=True, help="Ngày của bảng giá trong file kho, YYYY-MM-DD")
    ap.add_argument("--gom-vat", action="store_true", help="Giá trong file kho đã gồm VAT")
    a = ap.parse_args()

    kho = json.loads(Path(a.kho).read_text(encoding="utf-8"))
    gia_theo = {(x["name"].strip(), (x.get("pack") or "").strip()): x.get("price") for x in kho}

    rows, loi = [], []
    for dm, ten, hang, cap, nguon, qc, dt, trang, thu_tu, khop in DONG:
        gia = None
        if khop:
            if khop not in gia_theo:
                loi.append(f"Không thấy trong file kho: {khop}")
            gia = gia_theo.get(khop)
        rows.append({
            "danh_muc": dm, "ten": ten, "hang": hang, "cap": cap, "nguon": nguon,
            "quy_cach": qc, "trang": trang, "don_vi_do": "L", "thu_tu": thu_tu,
            **khoang_gia(gia, dt),
        })
    if loi:
        sys.exit("\n".join(loi))

    out = {
        "_ghi_chu": "Sinh bởi scripts/build-gia-json.py. Chỉ có khoảng giá công khai, không sửa tay.",
        "cau_hinh": {"he_so_tren": HE_SO, "gom_vat": a.gom_vat, "ngay_ra_soat": a.ngay, "nhan_dinh": ""},
        "rows": rows,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for r in rows:
        print(f"{r['ten']:<24} {r['quy_cach']:<11} {r['thap'] or 'Liên hệ':>10} – {r['cao'] or '':<10}")
    print(f"→ {OUT}")


if __name__ == "__main__":
    main()
