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
    # 17/11/2026: bỏ dòng xô 18 L ENEOS Super Hyrando 68 (thêm ngày 15/11 từ giá file kho): báo giá văn bản 15/11 không có
    # xô ENEOS, giá file kho ra rẻ hơn phuy tính theo lít, trang sản phẩm ghi xô nhận đặt.
    ("dau-thuy-luc", "Castrol Hyspin AWS 68", "Castrol", "ISO VG 68", "nhap-khau", "Phuy 209 L", 209, "castrol-hyspin-aws-68", 0, ("Dầu Hyspin AWS 68/209L (Castrol)", "Phuy 209 L")),
    ("dau-thuy-luc", "Maxima 68", "Maxima", "ISO VG 68", "nhap-khau", "Xô 18 L", 18, "maxima-68", 1, ("Dầu MAXIMA 68", "Xô 18L")),
    # 17/11/2026: các dòng dưới có trong báo giá văn bản 15/11/2026, chưa có trong file kho; giá ở GIA_BAO_GIA.
    ("dau-thuy-luc", "Castrol Hyspin AWS 46", "Castrol", "ISO VG 46", "nhap-khau", "Phuy 209 L", 209, "castrol-hyspin-aws-68", 0, None),
    ("dau-thuy-luc", "ENEOS Super Hyrando 46", "ENEOS", "ISO VG 46", "nhap-khau", "Phuy 200 L", 200, "eneos-super-hyrando-68", 0, None),
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
    ("dau-thuy-luc", "ENEOS Super Mulpus DX 46", "ENEOS", "ISO VG 46", "nhap-khau", "Phuy 200 L", 200, "eneos-super-mulpus-dx", 0, ("ENEOS Super Mulpus DX68", "Phuy 200L")),  # 15/11/2026: người dùng yêu cầu giá cấp 46 bằng cấp 68
    ("dau-thuy-luc", "Castrol Hyspin HLP-Z 68", "Castrol", "ISO VG 68", "nhap-khau", "Xô 20 L", 20, "castrol-hyspin-hlpz-68", 1, ("Dầu  rãnh trượt Hyspin HLPZ 68", "Xô 20L")),
    ("dau-thuy-luc", "VHP Spinax AW 68", "VHP", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "vhp-spinax-aw", 0, ("Dầu Spinax AW68  (200L)", "Phuy 200L")),
    ("dau-thuy-luc", "VHP Spinax AW Super 68", "VHP", "ISO VG 68", "trong-nuoc", "Phuy 200 L", 200, "vhp-spinax-aw", 0, ("Dầu Spinax AW68 Super (200L)", "Phuy 200L")),
    ("dau-dong-co-diesel", "Caltex Delo Silver Multigrade 20W-50", "Caltex", "SAE 20W-50", "nhap-khau", "Phuy 208 L", 208, "caltex-delo-silver-multigrade", 0, ("Dầu động cơ Caltex CF 20W50", "Phuy 208L")),
    ("dau-dong-co-diesel", "Castrol CRB CF-4 20W-50", "Castrol", "SAE 20W-50", "nhap-khau", "Phuy 209 L", 209, "castrol-crb-cf-4", 0, ("Dầu CRB CF4 20W50/Phuy 209 Lít", "Phuy 209 Lít")),
    ("dau-dong-co-diesel", "Castrol CRB Turbomax CI-4 20W-50", "Castrol", "SAE 20W-50", "nhap-khau", "Phuy 209 L", 209, "castrol-crb-turbomax", 0, ("Dầu động cơ Castrol CI4 20W50", "Phuy 209L")),
    ("dau-dong-co-diesel", "Castrol Vecton 15W-40", "Castrol", "SAE 15W-40", "nhap-khau", "Phuy 209 L", 209, "castrol-vecton", 0, ("Dầu Vecton 15W40 CI4/E7 /Phuy 209 Lít", "Phuy 209L")),
    ("dau-dong-co-diesel", "EMI CF-4 20W-50", "EMI", "SAE 20W-50", "trong-nuoc", "Phuy 200 L", 200, "emi-cf-4-20w-50", 0, ("Dầu Emi CF4 20w50", "Phuy 200L")),
    ("dau-dong-co-diesel", "EMI CI-4 20W-50", "EMI", "SAE 20W-50", "trong-nuoc", "Xô 18 L", 18, "emi-ci-4-20w-50", 1, ("Dầu Emi CI4 20w50", "Xô")),
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
    # 17/11/2026: các dòng dưới có trong báo giá văn bản 15/11/2026, giá ở GIA_BAO_GIA.
    ("mo-boi-tron-cong-nghiep", "VHP Lithium Grease L4", "VHP", "NLGI 4", "trong-nuoc", "Phuy 180 kg", 180, "vhp-lithium-grease", 0, None),
    ("mo-boi-tron-cong-nghiep", "VHP Lithium Grease L3", "VHP", "NLGI 3", "trong-nuoc", "Xô 17 kg", 17, "vhp-lithium-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP Lithium Grease L3", "VHP", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "vhp-lithium-grease", 0, None),
    ("mo-boi-tron-cong-nghiep", "VHP Lithium Grease L00", "VHP", "NLGI 00", "trong-nuoc", "Xô 17 kg", 17, "vhp-lithium-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP Lithium Grease L0", "VHP", "NLGI 0", "trong-nuoc", "Xô 17 kg", 17, "vhp-lithium-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L2", "VHP", "NLGI 2", "trong-nuoc", "Xô 17 kg", 17, "vhp-mp-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L4", "VHP", "NLGI 4", "trong-nuoc", "Phuy 180 kg", 180, "vhp-mp-grease", 0, None),
    ("mo-boi-tron-cong-nghiep", "VHP Licas Grease No2", "VHP", "NLGI 2", "trong-nuoc", "Phuy 180 kg", 180, "licas-grease", 0, None),
    ("mo-boi-tron-cong-nghiep", "VHP Licas Grease No2", "VHP", "NLGI 2", "trong-nuoc", "Xô 17 kg", 17, "licas-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP Licas Grease No2", "VHP", "NLGI 2", "trong-nuoc", "Xô 15 kg", 15, "licas-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP Licas Grease No3", "VHP", "NLGI 3", "trong-nuoc", "Xô 17 kg", 17, "licas-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "VHP Licas Grease No3", "VHP", "NLGI 3", "trong-nuoc", "Xô 15 kg", 15, "licas-grease", 1, None),
    # 05/11/2026: VHP MP Grease, tên mã trong file kho không ghi hãng; TDS và trang chính thức của VHP xác nhận hãng.
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L2", "VHP", "NLGI 2", "trong-nuoc", "Phuy 180 kg", 180, "vhp-mp-grease", 0, ("Mỡ MP Grease L2/phuy 180kg", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L3", "VHP", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "vhp-mp-grease", 0, ("Mỡ MP Grease L3/phuy 180kg", "Phuy 180kg")),
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L3", "VHP", "NLGI 3", "trong-nuoc", "Xô 17 kg", 17, "vhp-mp-grease", 1, ("Mỡ MP Grease L3/xô 17Kg", "Xô 17KG")),
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L3", "VHP", "NLGI 3", "trong-nuoc", "Xô 15 kg", 15, "vhp-mp-grease", 1, ("Mỡ MP Grease L3/xô 15Kg", "Xô 15Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP MP Grease L4", "VHP", "NLGI 4", "trong-nuoc", "Xô 17 kg", 17, "vhp-mp-grease", 1, ("Mỡ MP GREASE L4/ Xô 17Kg", "Xô 17KG")),
    ("mo-boi-tron-cong-nghiep", "VHP Opal Grease NLGI 3", "VHP", "NLGI 3", "trong-nuoc", "Phuy 180 kg", 180, "vhp-opal-grease", 0, ("Mỡ Opal Grease NLGI3", "Phuy 180Kg")),
    ("mo-boi-tron-cong-nghiep", "VHP Opal Grease NLGI 4", "VHP", "NLGI 4", "trong-nuoc", "Xô 15 kg", 15, "vhp-opal-grease", 1, ("Mỡ Opal Grease NLGI 4/ 15Kg", "Xô 15Kg")),
    # 05/11/2026: mỡ Sinopec không có dòng riêng trong file kho, khoảng giá do người dùng chốt ở GHI_DE_KHOANG.
    ("mo-boi-tron-cong-nghiep", "Sinopec Golden Grease NLGI 2, NLGI 3", "Sinopec", "NLGI 2, 3", "nhap-khau", "Phuy 180 kg", 180, "sinopec-golden-grease", 0, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Golden Grease NLGI 2, NLGI 3", "Sinopec", "NLGI 2, 3", "nhap-khau", "Xô 17 kg", 17, "sinopec-golden-grease", 1, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Crystal Grease NLGI 2", "Sinopec", "NLGI 2", "nhap-khau", "Phuy 180 kg", 180, "sinopec-crystal-grease-nlgi-3", 0, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Crystal Grease NLGI 2", "Sinopec", "NLGI 2", "nhap-khau", "Xô 17 kg", 17, "sinopec-crystal-grease-nlgi-3", 1, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Crystal Grease NLGI 3", "Sinopec", "NLGI 3", "nhap-khau", "Phuy 180 kg", 180, "sinopec-crystal-grease-nlgi-3", 0, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Crystal Grease NLGI 3", "Sinopec", "NLGI 3", "nhap-khau", "Xô 17 kg", 17, "sinopec-crystal-grease-nlgi-3", 1, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Crystal Grease T3", "Sinopec", "NLGI T3", "nhap-khau", "Phuy 180 kg", 180, "sinopec-crystal-grease-t3", 0, None),
    ("mo-boi-tron-cong-nghiep", "Sinopec Crystal Grease T3", "Sinopec", "NLGI T3", "nhap-khau", "Xô 17 kg", 17, "sinopec-crystal-grease-t3", 1, None),
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


# Khoảng giá công khai do người dùng chốt riêng, thay cho công thức giá hiện tại → × HE_SO. Ghi ngày và lý do.
# Khóa là (tên, quy cách) của dòng trong DONG.
GHI_DE_KHOANG = {
    # 02/11/2026: người dùng chốt APEX TL 68 phuy 200 L là 5.410.000 – 7.500.000 đ (rộng hơn mức 15% thông thường).
    ("APEX TL 68", "Phuy 200 L"): (5_410_000, 7_500_000),
    # 05/11/2026: người dùng chốt giá mỡ Sinopec và mọi xô đều 17 kg (ảnh nhãn Golden đang ghi 15 kg). Giá theo kg tính từ 17 kg.
    ("Sinopec Golden Grease NLGI 2, NLGI 3", "Phuy 180 kg"): (15_000_000, 17_000_000),
    ("Sinopec Golden Grease NLGI 2, NLGI 3", "Xô 17 kg"): (1_500_000, 1_600_000),
    ("Sinopec Crystal Grease NLGI 2", "Phuy 180 kg"): (19_000_000, 20_500_000),
    ("Sinopec Crystal Grease NLGI 2", "Xô 17 kg"): (2_000_000, 2_100_000),
    ("Sinopec Crystal Grease NLGI 3", "Phuy 180 kg"): (20_000_000, 21_000_000),
    ("Sinopec Crystal Grease NLGI 3", "Xô 17 kg"): (2_000_000, 2_150_000),
    ("Sinopec Crystal Grease T3", "Phuy 180 kg"): (22_000_000, 22_800_000),
    ("Sinopec Crystal Grease T3", "Xô 17 kg"): (2_050_000, 2_100_000),
}


# Tăng giá dầu thủy lực theo hãng (đ/phuy hoặc đ/xô), cộng vào giá kho (hoặc cả hai đầu khoảng chốt ở GHI_DE_KHOANG)
# trước khi tính khoảng. Hãng không có tên ở đây dùng mức "khac".
# 15/11/2026: người dùng yêu cầu phuy ENEOS, Castrol tăng 1.000.000 đ/phuy, các hãng còn lại tăng 500.000 đ/phuy.
TANG_GIA_PHUY = {
    "dau-thuy-luc": {"ENEOS": 1_000_000, "Castrol": 1_000_000, "khac": 500_000},
}
# 15/11/2026: xô TẠM GIỮ NGUYÊN, người dùng gửi giá xô chính xác sau (dự kiến 16/11, merge đầu tuần).
# Cách điền khi có giá:
#   - Có mức tăng theo hãng (đ/xô): điền vào đây, ví dụ {"ENEOS": 100_000, "Castrol": 100_000, "khac": 50_000}.
#   - Có giá xô chính xác từng mã: điền GIA_XO_MOI bên dưới (giá này đã là giá mới, không cộng thêm TANG_GIA_XO).
TANG_GIA_XO = {
    "dau-thuy-luc": {"khac": 0},
}
# Giá kho xô mới chính xác theo từng mã, khóa (tên, quy cách) trong DONG, ví dụ ("EMI AW 68", "Xô 18 L"): 1_350_000.
# Ghi đè giá file kho; khoảng vẫn = giá → × HE_SO. Để trống = dùng giá file kho.
GIA_XO_MOI = {
}


def tang_gia(dm, hang, qc):
    q = qc.lower()
    bang = TANG_GIA_PHUY.get(dm) if q.startswith("phuy") else TANG_GIA_XO.get(dm) if q.startswith("xô") else None
    if not bang:
        return 0
    return bang.get(hang, bang.get("khac", 0))


# 17/11/2026 (người dùng yêu cầu): giá trên web phải KHỚP báo giá văn bản đã đăng ảnh trên 2 trang báo giá
# (anh-goc/bao-gia-dau-thuy-luc.pdf, bao-gia-mo-boi-tron.pdf, lập 15/11/2026, giá chưa VAT, đơn lẻ).
# Mỗi mã có trong báo giá dùng đúng con số đó, thay cho file kho, GHI_DE_KHOANG và mức tăng TANG_GIA_*.
# Một số = một giá (web hiện một con số); cặp (thấp, cao) khi báo giá ghi hai mức cho cùng mã.
# Khi có báo giá văn bản mới: sửa bảng này, thay ảnh + PDF, chạy lại script.
GIA_BAO_GIA = {
    # Dầu thủy lực
    ("APEX TL 68", "Phuy 200 L"): 7_000_000,
    ("Castrol Hyspin AWS 46", "Phuy 209 L"): 13_000_000,
    ("Castrol Hyspin AWS 68", "Phuy 209 L"): 12_000_000,
    # EMI AW68 có hai dòng trong báo giá (dòng 3–4: 12.000.000 / 1.250.000; dòng 15–16: 11.000.000 / 1.100.000) → ghi cả hai mức.
    ("EMI AW 68", "Phuy 200 L"): (11_000_000, 12_000_000),
    ("EMI AW 68", "Xô 18 L"): (1_100_000, 1_250_000),
    ("ENEOS Super Hyrando 68", "Phuy 200 L"): 13_000_000,
    ("ENEOS Super Hyrando 46", "Phuy 200 L"): 14_000_000,
    ("VHP Spinax AW Super 68", "Phuy 200 L"): 10_000_000,
    ("VHP Spinax AW 68", "Phuy 200 L"): 8_500_000,
    ("X-One AW 68", "Phuy 200 L"): 10_000_000,
    ("X-One AW 68", "Xô 18 L"): 1_000_000,
    ("EMER LAW 68", "Phuy 200 L"): 10_500_000,
    ("EMER LAW 68", "Xô 18 L"): 1_500_000,
    # Maxima 68 phuy 200 L (9.000.000 đ) có trong báo giá nhưng trang maxima-68 ghi "chỉ có xô 18 L": chưa lên web, chờ người dùng xác nhận.
    ("Maxima 68", "Xô 18 L"): 950_000,
    # Mỡ bôi trơn
    ("VHP Lithium Grease L3", "Xô 17 kg"): 1_350_000,
    ("VHP Lithium Grease L3", "Phuy 180 kg"): 14_000_000,
    ("VHP Lithium Grease L4", "Xô 17 kg"): 1_400_000,
    ("VHP Lithium Grease L4", "Phuy 180 kg"): 14_800_000,
    ("VHP Lithium Grease L00", "Xô 17 kg"): 1_100_000,
    ("VHP Lithium Grease L0", "Xô 17 kg"): 1_000_000,
    # Báo giá ghi "Mỡ bôi trơn NLGI3 (thùng 30 ống x400g)" 26.000 đ/ống → thùng 30 ống = 780.000 đ.
    ("VHP Licas Grease No3", "Thùng 30 ống 400 g"): 780_000,
    ("VHP Opal Grease NLGI 3", "Phuy 180 kg"): 11_000_000,
    ("VHP MP Grease L2", "Xô 17 kg"): 1_200_000,
    ("VHP MP Grease L3", "Xô 15 kg"): 1_134_000,
    ("VHP MP Grease L3", "Xô 17 kg"): 1_250_000,
    ("VHP MP Grease L3", "Phuy 180 kg"): 13_000_000,
    ("VHP MP Grease L4", "Phuy 180 kg"): 12_500_000,
    ("VHP Licas Grease No2", "Xô 17 kg"): 1_080_000,
    ("VHP Licas Grease No2", "Phuy 180 kg"): 11_000_000,
    ("VHP Licas Grease No2", "Xô 15 kg"): 920_000,
    ("VHP Licas Grease No3", "Xô 15 kg"): 900_000,
    ("VHP Licas Grease No3", "Xô 17 kg"): 1_000_000,
    ("VHP Caxilium Grease No3", "Phuy 180 kg"): 8_500_000,
}


def khoang_bao_gia(khoa, dung_tich):
    v = GIA_BAO_GIA[khoa]
    thap, cao = v if isinstance(v, tuple) else (v, v)
    if not dung_tich:
        return {"thap": thap, "cao": cao, "thap_don_vi": None, "cao_don_vi": None}
    if thap == cao:
        dv = round(thap / dung_tich / 100) * 100
        return {"thap": thap, "cao": cao, "thap_don_vi": dv, "cao_don_vi": dv}
    return {"thap": thap, "cao": cao, "thap_don_vi": floor_to(thap / dung_tich, 100), "cao_don_vi": ceil_to(cao / dung_tich, 100)}


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


def khoang_chot(khoa, dung_tich, tang=0):
    thap, cao = GHI_DE_KHOANG[khoa]
    thap, cao = thap + tang, cao + tang
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
        if (ten, qc) in GIA_XO_MOI:
            gia, tang = GIA_XO_MOI[(ten, qc)], 0
        else:
            tang = tang_gia(dm, hang, qc)
        if gia and tang:
            gia += tang
        rows.append({
            "danh_muc": dm, "ten": ten, "hang": hang, "cap": cap, "nguon": nguon,
            "quy_cach": qc, "trang": trang, "don_vi_do": "kg" if "kg" in qc else "L", "thu_tu": thu_tu,
            **(khoang_bao_gia((ten, qc), dt) if (ten, qc) in GIA_BAO_GIA
               else khoang_chot((ten, qc), dt, tang) if (ten, qc) in GHI_DE_KHOANG else khoang_gia(gia, dt)),
        })
    khoa_dong = {(d[1], d[5]) for d in DONG}
    loi += [f"GIA_XO_MOI: không có dòng {k} trong DONG" for k in GIA_XO_MOI if k not in khoa_dong]
    loi += [f"GIA_BAO_GIA: không có dòng {k} trong DONG" for k in GIA_BAO_GIA if k not in khoa_dong]
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
