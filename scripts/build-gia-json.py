#!/usr/bin/env python3
"""Sinh src/data/gia-cong-khai.json (khoảng giá công khai) từ file giá kho nội bộ.

Dùng tạm cho trang báo giá trong lúc chưa dùng D1 (quyết định 10/10/2026: nhập giá từ JSON,
D1 để dành cho app quản lý giá làm sau).

- Repo để công khai trên GitHub, nên file sinh ra CHỈ có khoảng giá đã làm tròn (đúng con số
  web hiện), không chép giá gốc trong file kho. File kho nằm ngoài repo.
- Khoảng giá = giá hiện tại → giá × HE_SO, làm tròn giống src/lib/gia-tinh.ts (khoangGia).
- Danh sách mã và cách khớp với file kho nằm ở DONG bên dưới. Giá sai trong file kho sửa ở
  SUA_GIA (kèm lý do); muốn web hiện "Liên hệ" thì để phần khớp là None.

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
    ("dau-thuy-luc", "Castrol Hyspin AWS 68", "Castrol", "ISO VG 68", "nhap-khau", "Phuy 209 L", 209, "castrol-hyspin-aws-68", 0, ("Dầu Hyspin AWS 68/209L (Castrol)", "Phuy 209 L")),
    ("dau-thuy-luc", "Maxima 68", "Maxima", "ISO VG 68", "nhap-khau", "Xô 18 L", 18, "maxima-68", 1, ("Dầu MAXIMA 68", "Xô 18L")),
    ("dau-thuy-luc", "EMER LAW 68", "EMER", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "emer-law-68", 0, ("Dầu thủy lực LAW68 (200L)", "Phuy")),
    ("dau-thuy-luc", "EMER LAW 68", "EMER", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "emer-law-68", 1, ("Dầu thủy lực LAW68 (18L)", "Xô")),
    ("dau-thuy-luc", "X-One AW 68", "X-One", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "x-one-aw-68", 0, ("Dầu thủy lực Xone 68", "Phuy 200L")),
    ("dau-thuy-luc", "X-One AW 68", "X-One", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "x-one-aw-68", 1, ("Dầu thủy lực Xone 68", "Xô 18L")),
    ("dau-thuy-luc", "EMI AW 68", "EMI", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "emi-aw-68", 0, ("Dầu Emi AW68", "Phuy 200L")),
    ("dau-thuy-luc", "EMI AW 68", "EMI", "ISO VG 68", "trong-nuoc", "Xô 18 L", 18, "emi-aw-68", 1, ("Dầu Emi AW68", "Xô")),
    ("dau-thuy-luc", "APEX TL 68", "Quốc Trung", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "apex-tl-68", 0, ("Dầu thủy lực APEX TL 68 ( Quốc Trung)", "Phuy 200L")),
    # 13/10/2026: thêm mọi trang sản phẩm đang bật có giá trong file kho (khối giá + AggregateOffer trên trang sản phẩm).
    # Bảng giá dầu thủy lực chỉ hiện dòng ISO VG 68. Mã không có giá trong file kho (phuy Spadila GL-5, thiết bị đo) bỏ qua.
    ("dau-thuy-luc", "Caltex Hydraulic Oil AW 68", "Caltex", "ISO VG 68", "nhap-khau", "Phuy 208 L", 208, "caltex-hydraulic-aw-68", 0, ("Dầu Thủy lực Caltex Hydraulic AW 68", "Phuy 208L")),
    ("dau-thuy-luc", "Cosmo Hydro AW 68", "Cosmo", "ISO VG 68", "nhap-khau", "Phuy 200 L", 200, "cosmo-hydro-aw-68", 0, ("Dầu thuỷ lực Cosmo hydro AW68", "Phuy 200L")),
    ("dau-thuy-luc", "ENEOS Super Mulpus DX 68", "ENEOS", "ISO VG 68", "nhap-khau", "Phuy 200 L", 200, "eneos-super-mulpus-dx", 0, ("ENEOS Super Mulpus DX68", "Phuy 200L")),
    ("dau-thuy-luc", "ENEOS Super Mulpus DX 46", "ENEOS", "ISO VG 46", "nhap-khau", "Phuy 200 L", 200, "eneos-super-mulpus-dx", 0, ("ENEOS Super Mulpus DX46", "Phuy 200L")),
    ("dau-thuy-luc", "Castrol Hyspin HLP-Z 68", "Castrol", "ISO VG 68", "nhap-khau", "Xô 20 L", 20, "castrol-hyspin-hlpz-68", 1, ("Dầu  rãnh trượt Hyspin HLPZ 68", "Xô 20L")),
    ("dau-thuy-luc", "VHP Spinax AW 68", "VHP", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "vhp-spinax-aw", 0, ("Dầu Spinax AW68  (200L)", "Phuy 200L")),
    ("dau-thuy-luc", "VHP Spinax AW Super 68", "VHP", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "vhp-spinax-aw", 0, ("Dầu Spinax AW68 Super (200L)", "Phuy 200L")),
    ("dau-dong-co-diesel", "Caltex Delo Silver Multigrade 20W-50", "Caltex", "SAE 20W-50", "nhap-khau", "Phuy 208 L", 208, "caltex-delo-silver-multigrade", 0, ("Dầu động cơ Caltex CF 20W50", "Phuy 208L")),
    ("dau-dong-co-diesel", "Castrol CRB CF-4 20W-50", "Castrol", "SAE 20W-50", "nhap-khau", "Phuy 209 L", 209, "castrol-crb-cf-4", 0, ("Dầu CRB CF4 20W50/Phuy 209 Lít", "Phuy 209 Lít")),
    ("dau-dong-co-diesel", "Castrol CRB Turbomax CI-4 20W-50", "Castrol", "SAE 20W-50", "nhap-khau", "Phuy 209 L", 209, "castrol-crb-turbomax", 0, ("Dầu động cơ Castrol CI4 20W50", "Phuy 209L")),
    ("dau-dong-co-diesel", "Castrol Vecton 15W-40", "Castrol", "SAE 15W-40", "nhap-khau", "Phuy 209 L", 209, "castrol-vecton", 0, ("Dầu Vecton 15W40 CI4/E7 /Phuy 209 Lít", "Phuy 209L")),
    ("dau-dong-co-diesel", "EMI CF-4 20W-50", "EMI", "SAE 20W-50", "trong-nuoc", "Phuy 200 L", 200, "emi-cf-4-20w-50", 0, ("Dầu Emi CF4 20w50", "Phuy 200L")),
    ("dau-dong-co-diesel", "EMI CI-4 20W-50", "EMI", "SAE 20W-50", "trong-nuoc", "Xô 18 L", 18, "emi-ci-4-20w-50", 1, ("Dầu Emi CI4 20w50", "Xô")),
    ("dau-dong-co-diesel", "ENEOS DEO CD 20W-50", "ENEOS", "SAE 20W-50", "nhap-khau", "Can 18 L", 18, "eneos-deo-cd", 1, ("ENEOS DEO CD 20w50", "Can 18L")),
    ("dau-dong-co-diesel", "ENEOS DEO CD 20W-50", "ENEOS", "SAE 20W-50", "nhap-khau", "Phuy 200 L", 200, "eneos-deo-cd", 0, ("ENEOS DEO CD 20w50", "Phuy 200L")),
    ("dau-dong-co-diesel", "ENEOS DEO CD 15W-40", "ENEOS", "SAE 15W-40", "nhap-khau", "Phuy 200 L", 200, "eneos-deo-cd", 0, ("ENEOS DEO CD 15w40", "Phuy 200L")),
    ("dau-dong-co-diesel", "ENEOS DEO CF-4 15W-40", "ENEOS", "SAE 15W-40", "nhap-khau", "Can 18 L", 18, "eneos-deo-cf-4", 1, ("ENEOS DEO CF4 15w40", "Can 18L")),
    ("dau-dong-co-diesel", "ENEOS DEO CF-4 20W-50", "ENEOS", "SAE 20W-50", "nhap-khau", "Can 18 L", 18, "eneos-deo-cf-4", 1, ("ENEOS DEO CF4 20w50", "Can 18L")),
    ("dau-dong-co-diesel", "ENEOS DEO CI-4 15W-40", "ENEOS", "SAE 15W-40", "nhap-khau", "Can 18 L", 18, "eneos-deo-ci-4", 1, ("ENEOS DEO CI-4 15W40", "Can 18L")),
    ("dau-dong-co-diesel", "ENEOS DEO CI-4 20W-50", "ENEOS", "SAE 20W-50", "nhap-khau", "Can 18 L", 18, "eneos-deo-ci-4", 1, ("ENEOS DEO CI-4 20w50", "Can 18L")),
    ("dau-dong-co-diesel", "ENEOS DEO CI-4 20W-50", "ENEOS", "SAE 20W-50", "nhap-khau", "Phuy 200 L", 200, "eneos-deo-ci-4", 0, ("ENEOS DEO CI-4 20w50", "Phuy 200L")),
    ("dau-dong-co-diesel", "Shell Rimula R4 X 15W-40", "Shell", "SAE 15W-40", "nhap-khau", "Phuy 200 L", 200, "shell-rimula-r4-x", 0, ("Dầu động cơ  Shell R4 CI-4 15W40", "Phuy 200L")),
    ("dau-dong-co-diesel", "TotalEnergies Rubia TIR 7400 15W-40", "TotalEnergies", "SAE 15W-40", "nhap-khau", "Phuy 200 L", 200, "total-rubia-tir-7400", 0, ("Dầu động cơ Total CI 15W40", "Phuy 200L")),
    ("dau-dong-co-diesel", "TotalEnergies Rubia XT 20W-50", "TotalEnergies", "SAE 20W-50", "nhap-khau", "Phuy 200 L", 200, "total-rubia-xt", 0, ("Dầu động cơ Total CF 20W50", "Phuy 200L")),
    ("dau-dong-co-diesel", "VHP Diamond Turbo 20W-50", "VHP", "SAE 20W-50", "trong-nuoc", "Phuy 200 L", 200, "vhp-diamond-turbo", 0, ("ĐC Diamond turbo 20w50", "Phuy 200L")),
    ("dau-cau-hop-so", "Castrol Transmax Axle 85W-140", "Castrol", "SAE 85W-140", "nhap-khau", "Phuy 209 L", 209, "castrol-transmax-axle-85w-140", 0, ("Dầu cầu Castrol 85W140", "Phuy 209L")),
    ("dau-cau-hop-so", "EMI Gear EP GL-5 85W-140", "EMI", "SAE 85W-140", "trong-nuoc", "Xô 18 L", 18, "emi-gear-ep-gl-5", 1, ("Dầu Emi 85w140 GL5", "Xô")),
    ("dau-cau-hop-so", "EMI Gear EP GL-5 80W-90", "EMI", "SAE 80W-90", "trong-nuoc", "Xô 18 L", 18, "emi-gear-ep-gl-5", 1, ("Dầu Emi 80W90 GL5", "Xô 18L")),
    ("dau-cau-hop-so", "ENEOS Gear Oil GL-5 90", "ENEOS", "SAE 90", "nhap-khau", "Can 18 L", 18, "eneos-gear-gl-5", 1, ("Dầu ENEOS Gear GL5 90", "Can 18L")),
    ("dau-cau-hop-so", "ENEOS Gear Oil GL-5 90", "ENEOS", "SAE 90", "nhap-khau", "Phuy 200 L", 200, "eneos-gear-gl-5", 0, ("ENEOS Gear GL5 90", "Phuy 200L")),
    ("dau-cau-hop-so", "PVOIL PV Transmission 90 EP GL-4", "PVOIL", "SAE 90", "trong-nuoc", "Phuy 200 L", 200, "pv-transmission-ep-gl4", 0, ("Dầu PV Oil 90 GL4", "Phuy 200L")),
    ("dau-cau-hop-so", "Shell Spirax S2 A 85W-140", "Shell", "SAE 85W-140", "nhap-khau", "Xô 20 L", 20, "shell-spirax-s2-a", 1, ("Dầu Spirax S2 A85W140/20L", "Xô 20L")),
    ("dau-cau-hop-so", "VHP Hymatran Oil 10W", "VHP", "SAE 10W", "trong-nuoc", "Phuy 200 L", 200, "vhp-hymatran-10w", 0, ("Dầu Hymatran Oil 10W", "Phuy 200L")),
    ("dau-cau-hop-so", "VHP P140", "VHP", "SAE 140", "trong-nuoc", "Xô 18 L", 18, "vhp-p140", 1, ("Dầu cầu P140 Xô 18L", "Xô 18L")),
    ("dau-cau-hop-so", "VHP Spadila ATF", "VHP", "ATF", "trong-nuoc", "Xô 18 L", 18, "vhp-spadila-atf", 1, ("Dầu Spadila ATF (II,III)", "Xô 18L")),
    ("dau-cau-hop-so", "VHP Spadila GL-5 80W-90", "VHP", "SAE 80W-90", "trong-nuoc", "Xô 18 L", 18, "vhp-spadila-gl5", 1, ("Dầu Spadila 80W90 GL5", "Xô 18L")),
    ("dau-cau-hop-so", "VHP Spadila GL-5 85W-140", "VHP", "SAE 85W-140", "trong-nuoc", "Xô 18 L", 18, "vhp-spadila-gl5", 1, ("Dầu Spadila 85W140 GL5", "Xô 18L")),
    ("dau-banh-rang", "ENEOS Bonnoc TS 220", "ENEOS", "ISO VG 220", "nhap-khau", "Xô 18 L", 18, "eneos-bonnoc-ts", 1, ("ENEOS Bonnoc TS 220", "Xô 18L")),
    ("dau-banh-rang", "VHP Rosia EP 100", "VHP", "ISO VG 100", "trong-nuoc", "Xô 18 L", 18, "vhp-rosia-ep", 1, ("Dầu ROSIA EP 100", "Xô 18L")),
    ("dau-banh-rang", "VHP Rosia EP 100", "VHP", "ISO VG 100", "trong-nuoc", "Phuy 200 L", 200, "vhp-rosia-ep", 0, ("Dầu ROSIA EP 100", "Phuy 200L")),
    ("dau-banh-rang", "VHP Rosia EP 150", "VHP", "ISO VG 150", "trong-nuoc", "Xô 18 L", 18, "vhp-rosia-ep", 1, ("Dầu Rosia EP 150", "Xô 18L")),
    ("dau-banh-rang", "VHP Rosia EP 220", "VHP", "ISO VG 220", "trong-nuoc", "Xô 18 L", 18, "vhp-rosia-ep", 1, ("Dầu ROSIA EP 220", "Xô 18L")),
    ("dau-banh-rang", "VHP Rosia EP 220", "VHP", "ISO VG 220", "trong-nuoc", "Phuy 200 L", 200, "vhp-rosia-ep", 0, ("Dầu ROSIA EP 220", "Phuy 200L")),
    ("dau-banh-rang", "VHP Rosia EP 320", "VHP", "ISO VG 320", "trong-nuoc", "Xô 18 L", 18, "vhp-rosia-ep", 1, ("Dầu Rosia EP 320", "Xô 18L")),
    ("dau-may-nen-khi", "ENEOS Faircol RA 32", "ENEOS", "ISO VG 32", "nhap-khau", "Can 18 L", 18, "eneos-faircol-ra", 1, ("Dầu máy nén khí ENEOS Faircol RA32", "Can 18L")),
    ("dau-may-nen-khi", "Idemitsu Daphne Super Screw 32", "Idemitsu", "ISO VG 32", "nhap-khau", "Thùng 20 L", 20, "idemitsu-daphne-super-screw", 1, ("Dầu nhờn Daphne super screw 32 pail 20L", "Thùng")),
    ("dau-may-nen-khi", "Idemitsu Daphne Super Screw 46", "Idemitsu", "ISO VG 46", "nhap-khau", "Thùng 20 L", 20, "idemitsu-daphne-super-screw", 1, ("Dầu nhờn Daphne super screw 46 pail 20L", "Thùng")),
    ("dau-may-nen-khi", "VHP Rosia CPR 32", "VHP", "ISO VG 32", "trong-nuoc", "Xô 18 L", 18, "vhp-rosia-cpr", 1, ("Dầu máy nén khí Rosia CPR32", "Xô 18L")),
    ("dau-may-nen-khi", "VHP Rosia CPR 46", "VHP", "ISO VG 46", "trong-nuoc", "Xô 18 L", 18, "vhp-rosia-cpr", 1, ("Dầu Rosia CPR 46", "Xô 18L")),
    ("dau-ranh-truot", "SHL Synthway 68M", "SHL", "ISO VG 68", "nhap-khau", "Can 20 L", 20, "shl-synthway-68m", 1, ("Dầu rãnh trượt SHL SYNTHWAY 68m/20L", "Can 20L")),
    ("dau-ranh-truot", "VHP Rosia CS 46", "VHP", "ISO VG 46", "trong-nuoc", "Phuy 200 L", 200, "vhp-rosia-cs", 0, ("Dầu Rosia CS 46", "Phuy 200L")),
    ("dau-truyen-nhiet", "SHL Syn Therm 32L", "SHL", "ISO VG 32", "nhap-khau", "Xô 20 L", 20, "shl-syn-therm", 1, ("Dầu SHL SNY therm 32L", "Xô 20L")),
    ("dau-truyen-nhiet", "VHP Heatrans Oil 32", "VHP", "ISO VG 32", "trong-nuoc", "Xô 18 L", 18, "vhp-heatrans", 1, ("Dầu truyền nhiệt Heatrans 32", "Xô 18L")),
    ("dau-truyen-nhiet", "VHP Heatrans Oil 46", "VHP", "ISO VG 46", "trong-nuoc", "Xô 18 L", 18, "vhp-heatrans", 1, ("Dầu truyền nhiệt Heatrans 46", "Xô 18L")),
    ("dau-xung-dien-edm", "SHL EDM 32", "SHL", "", "nhap-khau", "Phuy 200 L", 200, "shl-edm-32", 0, ("Dầu SHL EDM 32", "Phuy 200L")),
    ("dau-cach-dien", "VHP Unitrans Oil", "VHP", "", "trong-nuoc", "Phuy 210 L", 210, "vhp-unitrans-oil", 0, ("Dầu cách điện Unitrans Oil ( Hi-volt )", "Phuy 210 lít")),
    ("dau-cach-dien", "VHP Unitrans Oil", "VHP", "", "trong-nuoc", "Xô 18 L", 18, "vhp-unitrans-oil", 1, ("Dầu cách điện Unitrans Oil ( Hi-volt )", "Xô 18L")),
    ("dau-cat-got", "VHP Lotus Oil LS", "VHP", "", "trong-nuoc", "Phuy 200 L", 200, "vhp-lotus-oil-ls", 0, ("Dầu Lotus Oil LS", "Phuy 200L")),
    ("dau-nhot-xe-may", "ENEOS MC SJ 20W-40 MA", "ENEOS", "SAE 20W-40", "nhap-khau", "Chai", None, "eneos-mc-sj-20w-40", 1, ("ENEOS MC SJ/MA 20W40", "chai")),
    ("dau-nhot-xe-may", "ENEOS MC SJ 20W-40 MB", "ENEOS", "SAE 20W-40", "nhap-khau", "Chai", None, "eneos-mc-sj-20w-40", 1, ("ENEOS MC SJ/MB 20W40", "chai")),
    ("nuoc-lam-mat", "Maxxi Coolant Red", "Maxxi", "", "trong-nuoc", "Can 5 L", 5, "maxxi-coolant-red", 1, ("Nước làm mát Maxxi Coolant Red (5L)", "Can 5L")),
    ("mo-boi-tron-cong-nghiep", "Calix Ceno Grease No3", "Calix", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "calix-ceno-grease", 0, ("Mỡ Calix Grease Ceno No3", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "ENEOS Epnoc Grease AP(N)", "ENEOS", "NLGI 00", "nhap-khau", "Can", None, "eneos-epnoc-ap", 1, ("Mỡ epnoc grease AP (mỡ 00 )", "Can")),
    ("mo-boi-tron-cong-nghiep", "VHP Licas Grease No3", "VHP", "NLGI 3", "trong-nuoc", "Thùng 30 ống 400 g", None, "licas-grease", 1, ("Mỡ Licas Grease No.3 ( thùng 30 ống 400g)", "Ống")),
    ("mo-boi-tron-cong-nghiep", "PVOIL PV Grease No2", "PVOIL", "NLGI 2", "trong-nuoc", "Phuy 180 kg", 180, "pvoil-pv-grease", 0, ("Mỡ PV Grease No2", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "PVOIL PV Grease No3", "PVOIL", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "pvoil-pv-grease", 0, ("Mỡ PV Grease No3", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "Shell Gadus S2 V220 2", "Shell", "NLGI 2", "nhap-khau", "Xô 18 kg", 18, "shell-gadus-s2-v220-2", 1, ("Mỡ Gadus S2 V220/18Kg", "Xô 18Kg")),
    ("mo-chiu-nhiet", "Shell Gadus S3 V220C 2", "Shell", "NLGI 2", "nhap-khau", "Xô 18 kg", 18, "shell-gadus-s3-v220c-2", 1, ("Mỡ Gadus S3 V220/18Kg", "Xô")),
    ("mo-boi-tron-cong-nghiep", "VHP Caxilium Grease No2", "VHP", "NLGI 2", "trong-nuoc", "Phuy 180 kg", 180, "vhp-caxilium-grease", 0, ("Mỡ VHP Caxilium Grease No2", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP Caxilium Grease No3", "VHP", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "vhp-caxilium-grease", 0, ("Mỡ VHP Caxilium Grease No3", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP Lithium Grease L4", "VHP", "NLGI 4", "trong-nuoc", "Xô 17 kg", 17, "vhp-lithium-grease", 1, ("Mỡ Lithium Grease L4", "Xô 17Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP Opal Grease NLGI 3", "VHP", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "vhp-opal-grease", 0, ("Mỡ Opal Grease NLGI3", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP Opal Grease NLGI 4", "VHP", "NLGI 4", "trong-nuoc", "Xô 15 kg", 15, "vhp-opal-grease", 1, ("Mỡ Opal Grease NLGI 4/ 15Kg", "Xô 15Kg")),
    # 14/10/2026: thiết bị kiểm tra dầu không có trong file kho, giá lấy ở GIA_NGOAI_KHO.
    ("thiet-bi-kiem-tra-dau", "Máy đo độ nhớt cầm tay LND-1", "OEM", "", "nhap-khau", "Bộ", None, "may-do-do-nhot-cam-tay-lnd-1", 0, ("LND-1", "Bộ")),
    ("thiet-bi-kiem-tra-dau", "Nhớt kế thủy tinh ống 3,5 mm", "OEM", "", "nhap-khau", "Cái", None, "nhot-ke-thuy-tinh-ong-3-5", 0, ("Nhớt kế ống 3,5", "Cái")),
]

# Giá trong file kho tính theo đơn vị nhỏ hơn quy cách bán trên web: nhân lên cho đúng quy cách.
NHAN_GIA = {
    ("Mỡ Licas Grease No.3 ( thùng 30 ống 400g)", "Ống"): 30,  # giá kho theo ống, web bán thùng 30 ống
}


# Sửa giá sai trong file kho, theo (tên, quy cách) trong file kho. Ghi rõ lý do; bỏ dòng khi file kho đã đúng.
SUA_GIA = {
    # 10/10/2026: file kho ghi 900.000 đ/phuy 209 L, thiếu một số 0. Đối chiếu: Castrol CI4 20W-50 cùng file
    # có giá 10.000.000 = ~70% giá bán gần nhất 14.300.000; Hyspin bán gần nhất 13.568.600 → ~9,5 triệu.
    # Dùng 9.000.000 (giả định gõ thiếu số 0) cho tới khi kho xác nhận giá đúng.
    ("Dầu Hyspin AWS 68/209L (Castrol)", "Phuy 209 L"): 9_000_000,
}


# Mã không có trong file kho: giá bán thị trường công khai làm mốc thấp (vẫn → × HE_SO). Ghi nguồn và ngày xem.
GIA_NGOAI_KHO = {
    # 14/10/2026: anphatkd.com/san-pham/may-do-do-nhot-cam-tay-lnd-1 bán 1.600.000 đ.
    ("LND-1", "Bộ"): 1_600_000,
    # 14/10/2026: vietvalue.edu.vn (nhớt kế thủy tinh ống phễu 3.5) bán 495.000 đ, giá niêm yết 550.000 đ.
    ("Nhớt kế ống 3,5", "Cái"): 495_000,
}


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
        if khop in GIA_NGOAI_KHO:
            gia = GIA_NGOAI_KHO[khop]
        elif khop:
            if khop not in gia_theo:
                loi.append(f"Không thấy trong file kho: {khop}")
            gia = SUA_GIA.get(khop, gia_theo.get(khop))
            if gia and khop in NHAN_GIA:
                gia *= NHAN_GIA[khop]
        rows.append({
            "danh_muc": dm, "ten": ten, "hang": hang, "cap": cap, "nguon": nguon,
            "quy_cach": qc, "trang": trang, "don_vi_do": "kg" if "kg" in qc else "L", "thu_tu": thu_tu,
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
