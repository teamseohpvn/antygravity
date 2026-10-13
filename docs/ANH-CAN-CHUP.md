# Danh sách ảnh cần chụp / tạo

Sinh tự động bằng `npm run anh` ngày 13/10/2026 từ các file `.md`. **Không sửa tay**, sửa bài viết rồi chạy lại lệnh.
Bản Excel: `docs/danh-sach-anh.csv` (lọc cột "Trạng thái" = THIẾU).

Cách dùng: đặt ảnh gốc vào đúng **thư mục**, đặt **đúng tên** trong cột "Tên file cần up" (đuôi .jpg, .png hoặc .webp đều được), rồi chạy `npm run images`.

| Loại | Tỉ lệ | Ảnh gốc tối thiểu | Ghi chú |
|---|---|---|---|
| Sản phẩm (`anh-goc/san-pham/`) | 1:1 vuông | 1200 × 1200 px (khuyến nghị 1600 × 1600) | Ảnh **chụp thật** trong kho, nền sáng trơn, sản phẩm ở giữa chiếm 70–80% khung, không chèn chữ/logo |
| Danh mục (`anh-goc/danh-muc/`) | 3:2 ngang | 1536 × 1024 px | Được dùng ảnh AI, không logo, không chữ (xem `docs/prompt-anh-danh-muc.md`) |
| Bài viết (`anh-goc/blog/`) | 16:9 | 1200 × 675 px (khuyến nghị 1600 × 900) | Ảnh minh họa được dùng AI; ảnh "thực tế tại kho/xưởng" phải là ảnh thật |

Chỉ tính bài đang bật (`active: true`). Tổng: 163 ảnh, đã có 88, **còn thiếu 75**.

## Ảnh còn thiếu

| Thư mục | Tên file cần up | Nội dung ảnh (alt) | Trang |
|---|---|---|---|
| `anh-goc/danh-muc/` | `dau-nhot-xe-may.jpg` | Chai dầu nhớt xe máy xếp trên kệ cạnh xe số và xe tay ga | /dau-nhot-xe-may |
| `anh-goc/danh-muc/` | `nuoc-lam-mat.jpg` | Can nước làm mát cạnh két nước động cơ xe tải | /nuoc-lam-mat |
| `anh-goc/san-pham/` | `apex-tl-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực APEX TL 68 Quốc Trung tại kho Hải Phòng | /dau-thuy-luc/apex-tl-68 |
| `anh-goc/san-pham/` | `calix-ceno-grease-no3-phuy-180kg.jpg` | Phuy 180 kg mỡ Calix Ceno No3 tại kho Hải Phòng | /mo-boi-tron-cong-nghiep/calix-ceno-grease |
| `anh-goc/san-pham/` | `castrol-vecton-phuy-209l.jpg` | Phuy 209 lít dầu động cơ Castrol Vecton 15W-40 CI-4/E7 tại kho Hải Phòng | /dau-dong-co-diesel/castrol-vecton |
| `anh-goc/san-pham/` | `cosmo-hydro-aw-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực Cosmo Hydro AW 68 tại kho Hải Phòng | /dau-thuy-luc/cosmo-hydro-aw-68 |
| `anh-goc/san-pham/` | `cosmo-hydro-aw-68-nhan.jpg` | Nhãn phuy Cosmo Hydro AW 68 ghi cấp độ nhớt và loại dầu | /dau-thuy-luc/cosmo-hydro-aw-68 |
| `anh-goc/san-pham/` | `emi-cf-4-20w-50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel EMI CF-4 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/emi-cf-4-20w-50 |
| `anh-goc/san-pham/` | `emi-cf-4-20w-50-nhan.jpg` | Nhãn phuy EMI CF-4 20W-50 ghi cấp API và SAE | /dau-dong-co-diesel/emi-cf-4-20w-50 |
| `anh-goc/san-pham/` | `emi-ci-4-20w-50-xo.jpg` | Xô dầu động cơ diesel EMI CI-4 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/emi-ci-4-20w-50 |
| `anh-goc/san-pham/` | `emi-ci-4-20w-50-nhan.jpg` | Nhãn xô EMI CI-4 20W-50 ghi cấp API và SAE | /dau-dong-co-diesel/emi-ci-4-20w-50 |
| `anh-goc/san-pham/` | `eneos-bonnoc-ts-nhan.jpg` | Nhãn xô ENEOS Bonnoc TS ghi cấp độ nhớt ISO VG | /dau-banh-rang/eneos-bonnoc-ts |
| `anh-goc/san-pham/` | `eneos-deo-cd-20w50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel ENEOS CD 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/eneos-deo-cd |
| `anh-goc/san-pham/` | `eneos-deo-cd-20w50-can-18l.jpg` | Can 18 lít dầu động cơ ENEOS CD 20W-50 | /dau-dong-co-diesel/eneos-deo-cd |
| `anh-goc/san-pham/` | `eneos-deo-cd-15w40-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel ENEOS CD 15W-40 | /dau-dong-co-diesel/eneos-deo-cd |
| `anh-goc/san-pham/` | `eneos-mc-sj-20w-40-ma-chai.jpg` | Chai dầu nhớt xe số ENEOS MC SJ MA 20W-40 | /dau-nhot-xe-may/eneos-mc-sj-20w-40 |
| `anh-goc/san-pham/` | `eneos-mc-sj-20w-40-mb-chai.jpg` | Chai dầu nhớt xe tay ga ENEOS MC SJ MB 20W-40 | /dau-nhot-xe-may/eneos-mc-sj-20w-40 |
| `anh-goc/san-pham/` | `eneos-mc-sj-20w-40-nhan.jpg` | Nhãn chai ENEOS MC ghi cấp API SJ, JASO và SAE 20W-40 | /dau-nhot-xe-may/eneos-mc-sj-20w-40 |
| `anh-goc/san-pham/` | `eneos-super-mulpus-dx-46-phuy-200l.jpg` | Phuy 200 lít ENEOS Super Mulpus DX 46 | /dau-thuy-luc/eneos-super-mulpus-dx |
| `anh-goc/san-pham/` | `eneos-super-mulpus-dx-nhan.jpg` | Nhãn phuy ENEOS Super Mulpus DX ghi cấp độ nhớt ISO VG | /dau-thuy-luc/eneos-super-mulpus-dx |
| `anh-goc/san-pham/` | `idemitsu-daphne-super-screw-46-thung-20l.jpg` | Thùng 20 lít dầu máy nén khí Idemitsu Daphne Super Screw 46 tại kho Hải Phòng | /dau-may-nen-khi/idemitsu-daphne-super-screw |
| `anh-goc/san-pham/` | `idemitsu-daphne-super-screw-32-thung-20l.jpg` | Thùng 20 lít dầu máy nén khí Idemitsu Daphne Super Screw 32 | /dau-may-nen-khi/idemitsu-daphne-super-screw |
| `anh-goc/san-pham/` | `idemitsu-daphne-super-screw-nhan.jpg` | Nhãn thùng Idemitsu Daphne Super Screw ghi cấp độ nhớt | /dau-may-nen-khi/idemitsu-daphne-super-screw |
| `anh-goc/san-pham/` | `pv-transmission-ep-gl4-nhan.jpg` | Nhãn phuy PV Transmission EP_GL4 ghi cấp API GL-4 và cấp nhớt SAE | /dau-cau-hop-so/pv-transmission-ep-gl4 |
| `anh-goc/san-pham/` | `shell-gadus-s2-v220-2-xo-18kg.jpg` | Xô 18 kg mỡ bò Shell Gadus S2 V220 2 tại kho Hải Phòng | /mo-boi-tron-cong-nghiep/shell-gadus-s2-v220-2 |
| `anh-goc/san-pham/` | `shell-gadus-s2-v220-2-nhan.jpg` | Nhãn xô Shell Gadus S2 V220 2 ghi cấp NLGI 2 | /mo-boi-tron-cong-nghiep/shell-gadus-s2-v220-2 |
| `anh-goc/san-pham/` | `shell-gadus-s2-v220-2-mau-mo.jpg` | Màu và độ đặc của mỡ Shell Gadus S2 V220 2 khi mở nắp xô | /mo-boi-tron-cong-nghiep/shell-gadus-s2-v220-2 |
| `anh-goc/san-pham/` | `shell-rimula-r4-x-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel Shell Rimula R4 X 15W-40 tại kho Hải Phòng | /dau-dong-co-diesel/shell-rimula-r4-x |
| `anh-goc/san-pham/` | `shell-rimula-r4-x-nhan.jpg` | Nhãn phuy Shell Rimula R4 X 15W-40 ghi cấp API CI-4 | /dau-dong-co-diesel/shell-rimula-r4-x |
| `anh-goc/san-pham/` | `shl-syn-therm-32l-xo-20l.jpg` | Xô 20 lít dầu truyền nhiệt tổng hợp SHL Syn Therm 32L tại kho Hải Phòng | /dau-truyen-nhiet/shl-syn-therm |
| `anh-goc/san-pham/` | `shl-syn-therm-32l-nhan.jpg` | Nhãn xô SHL Syn Therm 32L ghi tên sản phẩm và cấp độ nhớt | /dau-truyen-nhiet/shl-syn-therm |
| `anh-goc/san-pham/` | `total-rubia-tir-7400-phuy-200l.jpg` | Phuy 200 lít dầu động cơ TotalEnergies Rubia TIR 7400 15W-40 tại kho Hải Phòng | /dau-dong-co-diesel/total-rubia-tir-7400 |
| `anh-goc/san-pham/` | `total-rubia-tir-7400-nhan.jpg` | Nhãn phuy Rubia TIR 7400 15W-40 ghi cấp API CI-4 và ACEA E7 | /dau-dong-co-diesel/total-rubia-tir-7400 |
| `anh-goc/san-pham/` | `total-rubia-xt-20w50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ TotalEnergies Rubia XT 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/total-rubia-xt |
| `anh-goc/san-pham/` | `total-rubia-xt-nhan.jpg` | Nhãn phuy Rubia XT 20W-50 ghi cấp API CF-4/SJ | /dau-dong-co-diesel/total-rubia-xt |
| `anh-goc/san-pham/` | `vhp-caxilium-grease-no2-phuy-180kg.jpg` | Phuy 180 kg mỡ VHP Caxilium Grease No2 tại kho Hải Phòng | /mo-boi-tron-cong-nghiep/vhp-caxilium-grease |
| `anh-goc/san-pham/` | `vhp-caxilium-grease-no3-phuy-180kg.jpg` | Phuy 180 kg mỡ VHP Caxilium Grease No3 | /mo-boi-tron-cong-nghiep/vhp-caxilium-grease |
| `anh-goc/san-pham/` | `vhp-caxilium-grease-nhan.jpg` | Nhãn phuy mỡ VHP Caxilium Grease ghi cấp No2 | /mo-boi-tron-cong-nghiep/vhp-caxilium-grease |
| `anh-goc/san-pham/` | `vhp-diamond-turbo-20w50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel VHP Diamond Turbo 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/vhp-diamond-turbo |
| `anh-goc/san-pham/` | `vhp-diamond-turbo-nhan.jpg` | Nhãn phuy VHP Diamond Turbo ghi cấp API CF-4/SJ và SAE 20W-50 | /dau-dong-co-diesel/vhp-diamond-turbo |
| `anh-goc/san-pham/` | `vhp-heatrans-32-xo-18l.jpg` | Xô 18 lít dầu truyền nhiệt VHP Heatrans Oil 32 tại kho Hải Phòng | /dau-truyen-nhiet/vhp-heatrans |
| `anh-goc/san-pham/` | `vhp-heatrans-46-xo-18l.jpg` | Xô 18 lít dầu truyền nhiệt VHP Heatrans Oil 46 | /dau-truyen-nhiet/vhp-heatrans |
| `anh-goc/san-pham/` | `vhp-heatrans-nhan.jpg` | Nhãn xô VHP Heatrans Oil ghi cấp độ nhớt | /dau-truyen-nhiet/vhp-heatrans |
| `anh-goc/san-pham/` | `vhp-hymatran-10w-phuy-200l.jpg` | Phuy 200 lít dầu truyền động VHP Hymatran Oil 10W tại kho Hải Phòng | /dau-cau-hop-so/vhp-hymatran-10w |
| `anh-goc/san-pham/` | `vhp-hymatran-10w-xo-18l.jpg` | Xô 18 lít dầu VHP Hymatran Oil 10W | /dau-cau-hop-so/vhp-hymatran-10w |
| `anh-goc/san-pham/` | `vhp-hymatran-10w-nhan.jpg` | Nhãn VHP Hymatran Oil 10W ghi cấp SAE 10W | /dau-cau-hop-so/vhp-hymatran-10w |
| `anh-goc/san-pham/` | `vhp-isonas-aw-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực VHP Isonas AW 68 tại kho Hải Phòng | /dau-thuy-luc/vhp-isonas-aw |
| `anh-goc/san-pham/` | `vhp-isonas-aw-68-can-18l.jpg` | Can 18 lít dầu thủy lực VHP Isonas AW 68 | /dau-thuy-luc/vhp-isonas-aw |
| `anh-goc/san-pham/` | `vhp-isonas-aw-32-xo-18l.jpg` | Xô 18 lít dầu thủy lực VHP Isonas AW 32 | /dau-thuy-luc/vhp-isonas-aw |
| `anh-goc/san-pham/` | `vhp-isonas-aw-32-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực VHP Isonas AW 32 | /dau-thuy-luc/vhp-isonas-aw |
| `anh-goc/san-pham/` | `vhp-lotus-oil-ls-phuy-200l.jpg` | Phuy 200 lít dầu cắt gọt pha nước VHP Lotus Oil LS tại kho Hải Phòng | /dau-cat-got/vhp-lotus-oil-ls |
| `anh-goc/san-pham/` | `vhp-lotus-oil-ls-nhan.jpg` | Nhãn phuy dầu cắt gọt VHP Lotus Oil LS | /dau-cat-got/vhp-lotus-oil-ls |
| `anh-goc/san-pham/` | `vhp-lotus-oil-ls-dung-dich.jpg` | Dung dịch VHP Lotus Oil LS pha nước có màu trắng sữa ánh xanh | /dau-cat-got/vhp-lotus-oil-ls |
| `anh-goc/san-pham/` | `vhp-p140-xo-18l.jpg` | Xô 18 lít dầu cầu VHP P140 tại kho Hải Phòng | /dau-cau-hop-so/vhp-p140 |
| `anh-goc/san-pham/` | `vhp-p140-nhan.jpg` | Nhãn xô dầu cầu VHP P140 ghi cấp SAE 140 | /dau-cau-hop-so/vhp-p140 |
| `anh-goc/san-pham/` | `vhp-rosia-cpr-46-xo-18l.jpg` | Xô 18 lít dầu máy nén khí VHP Rosia CPR 46 tại kho Hải Phòng | /dau-may-nen-khi/vhp-rosia-cpr |
| `anh-goc/san-pham/` | `vhp-rosia-cpr-32-xo-18l.jpg` | Xô 18 lít dầu máy nén khí VHP Rosia CPR 32 | /dau-may-nen-khi/vhp-rosia-cpr |
| `anh-goc/san-pham/` | `vhp-rosia-cpr-nhan.jpg` | Nhãn xô VHP Rosia CPR ghi cấp độ nhớt ISO VG | /dau-may-nen-khi/vhp-rosia-cpr |
| `anh-goc/san-pham/` | `vhp-rosia-cs-46-phuy-200l.jpg` | Phuy 200 lít dầu tuần hoàn VHP Rosia CS 46 tại kho Hải Phòng | /dau-ranh-truot/vhp-rosia-cs |
| `anh-goc/san-pham/` | `vhp-rosia-cs-nhan.jpg` | Nhãn phuy dầu VHP Rosia CS 46 ghi cấp độ nhớt | /dau-ranh-truot/vhp-rosia-cs |
| `anh-goc/san-pham/` | `vhp-rosia-ep-220-phuy-200l.jpg` | Phuy 200 lít dầu bánh răng VHP Rosia EP 220 tại kho Hải Phòng | /dau-banh-rang/vhp-rosia-ep |
| `anh-goc/san-pham/` | `vhp-rosia-ep-220-xo-18l.jpg` | Xô 18 lít dầu bánh răng VHP Rosia EP 220 | /dau-banh-rang/vhp-rosia-ep |
| `anh-goc/san-pham/` | `vhp-rosia-ep-320-xo-18l.jpg` | Xô 18 lít dầu bánh răng VHP Rosia EP 320 | /dau-banh-rang/vhp-rosia-ep |
| `anh-goc/san-pham/` | `vhp-rosia-ep-nhan.jpg` | Nhãn xô VHP Rosia EP ghi cấp độ nhớt và tiêu chuẩn | /dau-banh-rang/vhp-rosia-ep |
| `anh-goc/san-pham/` | `vhp-spadila-atf-xo-18l.jpg` | Xô 18 lít dầu hộp số tự động VHP Spadila ATF tại kho Hải Phòng | /dau-cau-hop-so/vhp-spadila-atf |
| `anh-goc/san-pham/` | `vhp-spadila-atf-nhan.jpg` | Nhãn xô VHP Spadila ATF ghi tiêu chuẩn Dexron | /dau-cau-hop-so/vhp-spadila-atf |
| `anh-goc/san-pham/` | `vhp-spadila-gl5-85w-140-xo-18l.jpg` | Xô 18 lít dầu cầu VHP Spadila GL-5 85W-140 tại kho Hải Phòng | /dau-cau-hop-so/vhp-spadila-gl5 |
| `anh-goc/san-pham/` | `vhp-spadila-gl5-80w-90-xo-18l.jpg` | Xô 18 lít dầu cầu VHP Spadila GL-5 80W-90 | /dau-cau-hop-so/vhp-spadila-gl5 |
| `anh-goc/san-pham/` | `vhp-spadila-gl5-phuy-200l.jpg` | Phuy 200 lít dầu cầu VHP Spadila GL-5 | /dau-cau-hop-so/vhp-spadila-gl5 |
| `anh-goc/san-pham/` | `vhp-spinax-aw-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực VHP Spinax AW 68 tại kho Hải Phòng | /dau-thuy-luc/vhp-spinax-aw |
| `anh-goc/san-pham/` | `vhp-spinax-aw-super-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực VHP Spinax AW Super 68 | /dau-thuy-luc/vhp-spinax-aw |
| `anh-goc/san-pham/` | `vhp-spinax-aw-nhan.jpg` | Nhãn phuy dầu thủy lực VHP Spinax AW ghi cấp độ nhớt 68 | /dau-thuy-luc/vhp-spinax-aw |
| `anh-goc/san-pham/` | `vhp-unitrans-oil-phuy-210l.jpg` | Phuy 210 lít dầu cách điện VHP Unitrans Oil Hi-Volt tại kho Hải Phòng | /dau-cach-dien/vhp-unitrans-oil |
| `anh-goc/san-pham/` | `vhp-unitrans-oil-xo-18l.jpg` | Xô 18 lít dầu biến thế VHP Unitrans Oil Hi-Volt | /dau-cach-dien/vhp-unitrans-oil |
| `anh-goc/san-pham/` | `vhp-unitrans-oil-nhan.jpg` | Nhãn dầu cách điện VHP Unitrans Oil ghi tiêu chuẩn IEC 60296 | /dau-cach-dien/vhp-unitrans-oil |

## Ảnh đã có

| Thư mục | Tên file cần up | Nội dung ảnh (alt) | Trang |
|---|---|---|---|
| `anh-goc/danh-muc/` | `dau-banh-rang.jpg` | Hộp giảm tốc công nghiệp mở nắp, bánh răng nghiêng phủ dầu bánh răng | /dau-banh-rang |
| `anh-goc/danh-muc/` | `dau-cach-dien.jpg` | Kỹ thuật viên lấy mẫu dầu cách điện từ van xả máy biến áp | /dau-cach-dien |
| `anh-goc/danh-muc/` | `dau-cat-got.jpg` | Máy tiện CNC đang tiện trục thép, dầu tưới nguội phun vào vùng cắt | /dau-cat-got |
| `anh-goc/danh-muc/` | `dau-cau-hop-so.jpg` | Thợ bảo dưỡng châm dầu hộp số vào xe nâng trong kho | /dau-cau-hop-so |
| `anh-goc/danh-muc/` | `dau-chong-gi-set.jpg` | Phun dầu chống gỉ lên khuôn và chi tiết thép gia công | /dau-chong-gi-set |
| `anh-goc/danh-muc/` | `dau-dong-co-diesel.jpg` | Kỹ thuật viên kiểm tra que thăm dầu động cơ diesel của máy phát điện | /dau-dong-co-diesel |
| `anh-goc/danh-muc/` | `dau-may-hut-chan-khong.jpg` | Bơm chân không nối với dây chuyền đóng gói hút chân không thực phẩm | /dau-may-hut-chan-khong |
| `anh-goc/danh-muc/` | `dau-may-may.jpg` | Tra dầu máy may vào cơ cấu kim của máy may công nghiệp trong xưởng may | /dau-may-may |
| `anh-goc/danh-muc/` | `dau-may-nen-khi.jpg` | Kỹ thuật viên châm dầu máy nén khí vào máy nén khí trục vít | /dau-may-nen-khi |
| `anh-goc/danh-muc/` | `dau-ranh-truot.jpg` | Băng trượt máy CNC phủ màng dầu rãnh trượt bóng | /dau-ranh-truot |
| `anh-goc/danh-muc/` | `dau-thuy-luc.jpg` | **(chưa có alt)** | /ho-tro-ky-thuat/huong-dan-chon-do-nhot |
| `anh-goc/danh-muc/` | `dau-truyen-nhiet.jpg` | Lò dầu tải nhiệt với đường ống bọc bảo ôn và bơm tuần hoàn | /dau-truyen-nhiet |
| `anh-goc/danh-muc/` | `dau-xung-dien-edm.jpg` | Điện cực đồng máy xung điện EDM ngâm trong bể dầu điện môi | /dau-xung-dien-edm |
| `anh-goc/danh-muc/` | `mo-boi-tron-cong-nghiep.jpg` | Bơm mỡ bò vào gối đỡ vòng bi bằng súng bơm mỡ | /mo-boi-tron-cong-nghiep |
| `anh-goc/danh-muc/` | `mo-chiu-nhiet.jpg` | Kỹ thuật viên tra mỡ chịu nhiệt cho vòng bi quạt lò | /mo-chiu-nhiet |
| `anh-goc/san-pham/` | `apex-tl-68-nhan.jpg` | Nhãn phuy dầu thủy lực APEX TL 68 | /dau-thuy-luc/apex-tl-68 |
| `anh-goc/san-pham/` | `calix-ceno-grease-nhan.jpg` | Nhãn phuy mỡ nhờn công nghiệp Calix Ceno No3 | /mo-boi-tron-cong-nghiep/calix-ceno-grease |
| `anh-goc/san-pham/` | `caltex-delo-silver-multigrade-phuy-208l.jpg` | Phuy dầu động cơ Caltex Delo Silver Multigrade SAE 20W-50 | /dau-dong-co-diesel/caltex-delo-silver-multigrade |
| `anh-goc/san-pham/` | `caltex-delo-silver-multigrade-20w50-xo-18l.jpg` | Xô 18 lít Caltex Delo Silver SAE 20W-50 Multigrade API CF-4 | /dau-dong-co-diesel/caltex-delo-silver-multigrade |
| `anh-goc/san-pham/` | `caltex-hydraulic-aw-68-xo.jpg` | Xô dầu thủy lực Caltex Hydraulic Oil AW 68 | /dau-thuy-luc/caltex-hydraulic-aw-68 |
| `anh-goc/san-pham/` | `castrol-crb-cf-4-20w50-phuy-xo.jpg` | Phuy và xô dầu động cơ diesel Castrol CRB 20W-50 CF-4 | /dau-dong-co-diesel/castrol-crb-cf-4 |
| `anh-goc/san-pham/` | `castrol-crb-cf-4-15w40-xo-18l.jpg` | Xô 18 lít dầu động cơ diesel Castrol CRB 15W-40 CF-4 | /dau-dong-co-diesel/castrol-crb-cf-4 |
| `anh-goc/san-pham/` | `castrol-crb-turbomax-20w50-phuy-209l.jpg` | Phuy 209 lít dầu động cơ Castrol CRB Turbomax 20W-50 | /dau-dong-co-diesel/castrol-crb-turbomax |
| `anh-goc/san-pham/` | `castrol-crb-turbomax-nhan.jpg` | Nhãn xô Castrol CRB Turbomax ghi cấp API CI-4 và cấp độ nhớt | /dau-dong-co-diesel/castrol-crb-turbomax |
| `anh-goc/san-pham/` | `castrol-hyspin-aws-68-phuy-209l.jpg` | Phuy 209 lít dầu thủy lực Castrol Hyspin AWS 68 tại kho Hải Phòng | /dau-thuy-luc/castrol-hyspin-aws-68 |
| `anh-goc/san-pham/` | `castrol-hyspin-aws-68-nhan.jpg` | Nhãn phuy Castrol Hyspin AWS 68 ghi cấp độ nhớt và tiêu chuẩn | /dau-thuy-luc/castrol-hyspin-aws-68 |
| `anh-goc/san-pham/` | `castrol-hyspin-aws-68-kho.jpg` | Phuy Castrol Hyspin AWS 68 xếp trên pallet trong kho HT VINA | /dau-thuy-luc/castrol-hyspin-aws-68 |
| `anh-goc/san-pham/` | `castrol-hyspin-hlpz-68-xo-18l.jpg` | Xô 18 lít Castrol Hyspin HLP-Z 68, nhãn tiếng Việt dầu thủy lực chống mài mòn ISO VG 68 | /dau-thuy-luc/castrol-hyspin-hlpz-68 |
| `anh-goc/san-pham/` | `castrol-hyspin-hlpz-68-can-20l.jpg` | Can 20 lít Castrol Hyspin HLP-Z 68 | /dau-thuy-luc/castrol-hyspin-hlpz-68 |
| `anh-goc/san-pham/` | `castrol-transmax-axle-85w-140-phuy-xo.jpg` | Phuy và xô dầu nhớt Castrol (ảnh minh họa bao bì) | /dau-cau-hop-so/castrol-transmax-axle-85w-140 |
| `anh-goc/san-pham/` | `castrol-vecton-nhan.jpg` | Nhãn phuy 209 lít Castrol Vecton 15W-40 CI-4/E7 ghi API CI-4, JASO DH-1, ACEA E7 | /dau-dong-co-diesel/castrol-vecton |
| `anh-goc/san-pham/` | `emer-law-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực Amer LAW68 (EMER LAW 68) | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emer-law-68-nhan.jpg` | Nhãn phuy dầu thủy lực LAW68 của Amer ghi dung tích 200 L | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emer-law-68-phuy-kho.jpg` | Nắp phuy Amer LAW68 cạnh danh thiếp Dầu Công Nghiệp HP | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emer-law-68-xo.jpg` | Xô dầu nhớt Amer Lubricant | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emi-aw-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực Emi Oil Hydra AW 68 (EMI AW 68) | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-aw-68-nhan-phuy.jpg` | Nhãn phuy Emi Oil Hydra AW 68 ghi thông số điển hình, dung tích 200 L, cạnh danh thiếp Dầu Công Nghiệp HP | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-aw-68-xo-18l.jpg` | Xô 18 lít dầu thủy lực Emi Oil Hydra AW 68 xếp chồng | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-aw-68-nhan-xo.jpg` | Nhãn xô Emi Oil Hydra AW 68 ghi thông số điển hình | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-gear-ep-gl-5-phuy.jpg` | Phuy dầu nhớt EMI Oil (Sunglanz) | /dau-cau-hop-so/emi-gear-ep-gl-5 |
| `anh-goc/san-pham/` | `eneos-bonnoc-ts-220-xo-18l.jpg` | Xô 18 lít dầu bánh răng ENEOS Bonnoc TS 220 | /dau-banh-rang/eneos-bonnoc-ts |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-20w50-can-18l.jpg` | Can 18 lít dầu động cơ ENEOS CF-4 20W-50 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-15w40-can-18l.jpg` | Can 18 lít dầu động cơ diesel ENEOS CF-4 15W-40 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-20w50-xo-18l.jpg` | Xô 18 lít dầu động cơ diesel ENEOS CF-4 20W-50 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-20w50-nhan.jpg` | Nhãn xô ENEOS Long-life Diesel Engine Oil 20W-50 CF-4 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-nhan.jpg` | Nhãn xô ENEOS Long-life Diesel Engine Oil 15W-40 CF-4 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-20w50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel ENEOS DEO CI-4 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-15w40-can-18l.jpg` | Can 18 lít dầu động cơ ENEOS CI-4/SL 15W-40 | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-20w50-can-18l.jpg` | Can 18 lít dầu động cơ diesel ENEOS CI-4 20W-50 | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-nhan.jpg` | Nhãn can ENEOS CI-4/SL ghi cấp API và cấp độ nhớt SAE | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-epnoc-ap-2-tuyp-400g.jpg` | Tuýp 400 g mỡ ENEOS Epnoc Grease AP(N) 2 và thùng 20 tuýp | /mo-boi-tron-cong-nghiep/eneos-epnoc-ap |
| `anh-goc/san-pham/` | `eneos-epnoc-ap-2-thung-400g.jpg` | Thùng 20 tuýp 400 g mỡ Epnoc Grease AP(N) 2 | /mo-boi-tron-cong-nghiep/eneos-epnoc-ap |
| `anh-goc/san-pham/` | `eneos-epnoc-ap-0-thung-400g.jpg` | Thùng 20 tuýp 400 g mỡ Epnoc Grease AP(N) 0 của JXTG Nippon Oil & Energy | /mo-boi-tron-cong-nghiep/eneos-epnoc-ap |
| `anh-goc/san-pham/` | `eneos-faircol-ra-32-can-18l.jpg` | Can 18 lít dầu máy nén khí ENEOS Faircol RA 32 tại kho Hải Phòng | /dau-may-nen-khi/eneos-faircol-ra |
| `anh-goc/san-pham/` | `eneos-faircol-ra-32-nhan.jpg` | Nhãn can ENEOS Faircol RA 32 ghi cấp độ nhớt ISO VG 32 | /dau-may-nen-khi/eneos-faircol-ra |
| `anh-goc/san-pham/` | `eneos-faircol-ra-32-xo-18l.jpg` | Xô 18 lít màu đen dầu máy nén khí ENEOS Faircol RA 32 tại kho HT VINA | /dau-may-nen-khi/eneos-faircol-ra |
| `anh-goc/san-pham/` | `eneos-faircol-ra-32-xo-18l-nhan.jpg` | Nhãn xô ENEOS Faircol RA 32, dầu máy nén công nghệ cao 18 lít | /dau-may-nen-khi/eneos-faircol-ra |
| `anh-goc/san-pham/` | `eneos-gear-gl-5-80w-90-can-phuy.jpg` | Can dầu bánh răng ENEOS Gear Oil API GL-5 SAE 80W-90 và phuy ENEOS | /dau-cau-hop-so/eneos-gear-gl-5 |
| `anh-goc/san-pham/` | `eneos-super-hyrando-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực ENEOS Super Hyrando 68 tại kho Hải Phòng | /dau-thuy-luc/eneos-super-hyrando-68 |
| `anh-goc/san-pham/` | `eneos-super-hyrando-68-nhan.jpg` | Phuy 200 lít ENEOS Super Hyrando 68 xếp đứng trong kho có mái che của HT VINA | /dau-thuy-luc/eneos-super-hyrando-68 |
| `anh-goc/san-pham/` | `eneos-super-mulpus-dx-68-phuy-200l.jpg` | Phuy 200 lít dầu đa dụng ENEOS Super Mulpus DX 68 tại kho Hải Phòng | /dau-thuy-luc/eneos-super-mulpus-dx |
| `anh-goc/san-pham/` | `licas-grease-no3-ong-400g.jpg` | Ống 400 g mỡ VHP Licas Grease No3 | /mo-boi-tron-cong-nghiep/licas-grease |
| `anh-goc/san-pham/` | `licas-grease-no2-phuy-180kg.jpg` | Nắp phuy 180 kg mỡ VHP Licas Grease No2 có nhãn sản phẩm | /mo-boi-tron-cong-nghiep/licas-grease |
| `anh-goc/san-pham/` | `maxima-68-xo-18l.jpg` | Xô 18 lít dầu thủy lực Maxima 68 tại kho Hải Phòng | /dau-thuy-luc/maxima-68 |
| `anh-goc/san-pham/` | `maxima-68-nhan.jpg` | Nhãn xô dầu thủy lực Maxima 68 | /dau-thuy-luc/maxima-68 |
| `anh-goc/san-pham/` | `maxxi-coolant-red-can-5l.jpg` | Can 5 lít nước làm mát Maxxi Coolant Red tại kho Hải Phòng | /nuoc-lam-mat/maxxi-coolant-red |
| `anh-goc/san-pham/` | `maxxi-coolant-red-nhan.jpg` | Nhãn can nước làm mát Maxxi Coolant Red | /nuoc-lam-mat/maxxi-coolant-red |
| `anh-goc/san-pham/` | `pv-transmission-ep-gl4-90-phuy.jpg` | Phuy dầu hộp số PVOIL PV Transmission 90 EP_GL4 tại kho Hải Phòng | /dau-cau-hop-so/pv-transmission-ep-gl4 |
| `anh-goc/san-pham/` | `pvoil-pv-grease-phuy.jpg` | Phuy mỡ PVOIL | /mo-boi-tron-cong-nghiep/pvoil-pv-grease |
| `anh-goc/san-pham/` | `shell-gadus-s3-v220c-2-xo.jpg` | Xô nhựa vàng mỡ Shell Gadus S3 V220C 2, nhãn ghi Premium Multipurpose Extreme-Pressure Grease, tên cũ Shell Retinax LX | /mo-chiu-nhiet/shell-gadus-s3-v220c-2 |
| `anh-goc/san-pham/` | `shell-gadus-s3-v220c-2-xo-nhan.jpg` | Xô mỡ Shell Gadus S3 V220C 2 quai kim loại, nhãn logo Shell và chữ GADUS | /mo-chiu-nhiet/shell-gadus-s3-v220c-2 |
| `anh-goc/san-pham/` | `shell-gadus-s3-v220c-2-xo-quai-trang.jpg` | Xô mỡ Shell Gadus S3 V220C 2 mẫu nhãn khác, quai nhựa trắng | /mo-chiu-nhiet/shell-gadus-s3-v220c-2 |
| `anh-goc/san-pham/` | `shell-spirax-s2-a-85w-140-xo-20l.jpg` | Xô 20 lít dầu cầu Shell Spirax S2 A 85W-140 tại kho Hải Phòng | /dau-cau-hop-so/shell-spirax-s2-a |
| `anh-goc/san-pham/` | `shell-spirax-s2-a-85w-140-nhan.jpg` | Nhãn xô Shell Spirax S2 A 85W-140 ghi cấp API GL-5 | /dau-cau-hop-so/shell-spirax-s2-a |
| `anh-goc/san-pham/` | `shl-edm-32-phuy-kho.jpg` | Phuy dầu SHL Lubricants xếp trên pallet, phuy dầu EDM ghi tay trên nắp | /dau-xung-dien-edm/shl-edm-32 |
| `anh-goc/san-pham/` | `shl-edm-32-phuy.jpg` | Phuy dầu SHL Lubricants | /dau-xung-dien-edm/shl-edm-32 |
| `anh-goc/san-pham/` | `shl-edm-32-xo.jpg` | Xô dầu SHL Lubricants | /dau-xung-dien-edm/shl-edm-32 |
| `anh-goc/san-pham/` | `shl-synthway-68m-can-20l.jpg` | Can 20 lít dầu rãnh trượt SHL Synthway 68M tại kho Hải Phòng | /dau-ranh-truot/shl-synthway-68m |
| `anh-goc/san-pham/` | `shl-synthway-68m-nhan.jpg` | Nhãn can SHL Synthway 68M ghi cấp độ nhớt ISO VG 68 | /dau-ranh-truot/shl-synthway-68m |
| `anh-goc/san-pham/` | `vhp-lithium-grease-l4-xo-17kg.jpg` | Xô 17 kg mỡ VHP Lithium Grease L4 tại kho Hải Phòng | /mo-boi-tron-cong-nghiep/vhp-lithium-grease |
| `anh-goc/san-pham/` | `vhp-lithium-grease-l4-xo-kho.jpg` | Xô mỡ VHP Lithium Grease L4 cạnh danh thiếp Dầu Công Nghiệp HP | /mo-boi-tron-cong-nghiep/vhp-lithium-grease |
| `anh-goc/san-pham/` | `vhp-lithium-grease-l3-phuy-180kg.jpg` | Phuy 180 kg mỡ VHP Lithium Grease L3 | /mo-boi-tron-cong-nghiep/vhp-lithium-grease |
| `anh-goc/san-pham/` | `vhp-lithium-grease-l3-nhan-phuy.jpg` | Nắp phuy mỡ VHP Lithium Grease L3 ghi khối lượng tịnh 180 kg | /mo-boi-tron-cong-nghiep/vhp-lithium-grease |
| `anh-goc/san-pham/` | `vhp-opal-grease-nlgi3-phuy-180kg.jpg` | Nắp phuy 180 kg mỡ VHP Premium Opal Grease NLGI-3 có nhãn sản phẩm | /mo-boi-tron-cong-nghiep/vhp-opal-grease |
| `anh-goc/san-pham/` | `x-one-aw-68-xo-18l.jpg` | Xô 18 lít dầu thủy lực X-One AW 68 | /dau-thuy-luc/x-one-aw-68 |
| `anh-goc/san-pham/` | `x-one-aw-68-nhan.jpg` | Mặt sau xô X-One AW 68 ghi công dụng và lợi ích | /dau-thuy-luc/x-one-aw-68 |
| `anh-goc/san-pham/` | `x-one-aw-68-xo-18l-kho.jpg` | Xô X-One AW 68 cạnh danh thiếp Dầu Công Nghiệp HP | /dau-thuy-luc/x-one-aw-68 |
| `anh-goc/blog/` | `top-6-dau-thuy-luc-pho-bien-nhat-thi-phan.jpg` | Biểu đồ thị phần dầu nhờn tại Việt Nam của Castrol, Petrolimex, Shell, TotalEnergies, Caltex theo Kline 2014, DNSG 2015, Báo Đầu tư 2021 | /ho-tro-ky-thuat/top-6-dau-thuy-luc-pho-bien-nhat |

## Ảnh của bài có hàng nhưng đang tắt (chờ TDS) – nên chụp luôn

Các trang này đã viết, sẽ bật khi có TDS. Chụp trước để bật trang là có ảnh ngay. Còn thiếu 0/0 ảnh.

Không còn ảnh nào thiếu.

## Ảnh của bài đang tắt khác (chưa cần up)

0 ảnh thuộc các bài `active: false` không có trong kho hiện tại. Khi bật bài nào, chạy lại `npm run anh` để ảnh của bài đó vào danh sách cần up.
Danh sách đầy đủ trong `docs/danh-sach-anh.csv` (cột "Trạng thái" = Bài đang tắt).
