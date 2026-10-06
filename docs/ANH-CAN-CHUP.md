# Danh sách ảnh cần chụp / tạo

Sinh tự động bằng `npm run anh` ngày 06/10/2026 từ các file `.md`. **Không sửa tay**, sửa bài viết rồi chạy lại lệnh.
Bản Excel: `docs/danh-sach-anh.csv` (lọc cột "Trạng thái" = THIẾU).

Cách dùng: đặt ảnh gốc vào đúng **thư mục**, đặt **đúng tên** trong cột "Tên file cần up" (đuôi .jpg, .png hoặc .webp đều được), rồi chạy `npm run images`.

| Loại | Tỉ lệ | Ảnh gốc tối thiểu | Ghi chú |
|---|---|---|---|
| Sản phẩm (`anh-goc/san-pham/`) | 1:1 vuông | 1200 × 1200 px (khuyến nghị 1600 × 1600) | Ảnh **chụp thật** trong kho, nền sáng trơn, sản phẩm ở giữa chiếm 70–80% khung, không chèn chữ/logo |
| Danh mục (`anh-goc/danh-muc/`) | 3:2 ngang | 1536 × 1024 px | Được dùng ảnh AI, không logo, không chữ (xem `docs/prompt-anh-danh-muc.md`) |
| Bài viết (`anh-goc/blog/`) | 16:9 | 1200 × 675 px (khuyến nghị 1600 × 900) | Ảnh minh họa được dùng AI; ảnh "thực tế tại kho/xưởng" phải là ảnh thật |

Chỉ tính bài đang bật (`active: true`). Tổng: 44 ảnh, đã có 31, **còn thiếu 13**.

## Ảnh còn thiếu

| Thư mục | Tên file cần up | Nội dung ảnh (alt) | Trang |
|---|---|---|---|
| `anh-goc/danh-muc/` | `dau-cach-dien.jpg` | Máy biến áp ngâm dầu trong trạm điện nhà máy | /dau-cach-dien |
| `anh-goc/danh-muc/` | `dau-cau-hop-so.jpg` | Phuy dầu cầu, dầu hộp số xếp trong kho cạnh xe tải | /dau-cau-hop-so |
| `anh-goc/danh-muc/` | `dau-dong-co-diesel.jpg` | Can và phuy dầu động cơ diesel cạnh đầu xe tải | /dau-dong-co-diesel |
| `anh-goc/danh-muc/` | `dau-may-hut-chan-khong.jpg` | Bơm chân không cánh gạt trong nhà xưởng và xô dầu bơm chân không | /dau-may-hut-chan-khong |
| `anh-goc/danh-muc/` | `dau-may-may.jpg` | Máy may công nghiệp trong xưởng may và xô dầu máy may | /dau-may-may |
| `anh-goc/san-pham/` | `calix-ceno-grease-no3-phuy-180kg.jpg` | Phuy 180 kg mỡ Calix Ceno No3 tại kho Hải Phòng | /mo-boi-tron-cong-nghiep/calix-ceno-grease |
| `anh-goc/san-pham/` | `castrol-vecton-phuy-209l.jpg` | Phuy 209 lít dầu động cơ Castrol Vecton 15W-40 CI-4/E7 tại kho Hải Phòng | /dau-dong-co-diesel/castrol-vecton |
| `anh-goc/san-pham/` | `eneos-bonnoc-ts-nhan.jpg` | Nhãn xô ENEOS Bonnoc TS ghi cấp độ nhớt ISO VG | /dau-banh-rang/eneos-bonnoc-ts |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-20w50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel ENEOS DEO CI-4 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-super-hyrando-68-nhan.jpg` | Nhãn can ENEOS Super Hyrando 68 ghi cấp độ nhớt ISO VG 68 | /dau-thuy-luc/eneos-super-hyrando-68 |
| `anh-goc/san-pham/` | `pv-transmission-ep-gl4-90-phuy.jpg` | Phuy dầu hộp số PVOIL PV Transmission 90 EP_GL4 tại kho Hải Phòng | /dau-cau-hop-so/pv-transmission-ep-gl4 |
| `anh-goc/san-pham/` | `pv-transmission-ep-gl4-nhan.jpg` | Nhãn phuy PV Transmission EP_GL4 ghi cấp API GL-4 và cấp nhớt SAE | /dau-cau-hop-so/pv-transmission-ep-gl4 |
| `anh-goc/san-pham/` | `vhp-lithium-grease-nhan.jpg` | Nhãn xô mỡ VHP Lithium Grease ghi cấp NLGI | /mo-boi-tron-cong-nghiep/vhp-lithium-grease |

## Ảnh đã có

| Thư mục | Tên file cần up | Nội dung ảnh (alt) | Trang |
|---|---|---|---|
| `anh-goc/danh-muc/` | `dau-banh-rang.jpg` | **(chưa có alt)** | /dau-banh-rang |
| `anh-goc/danh-muc/` | `dau-chong-gi-set.jpg` | **(chưa có alt)** | /dau-chong-gi-set |
| `anh-goc/danh-muc/` | `dau-may-nen-khi.jpg` | **(chưa có alt)** | /dau-may-nen-khi |
| `anh-goc/danh-muc/` | `dau-ranh-truot.jpg` | **(chưa có alt)** | /dau-ranh-truot |
| `anh-goc/danh-muc/` | `dau-thuy-luc.jpg` | **(chưa có alt)** | /ho-tro-ky-thuat/huong-dan-chon-do-nhot |
| `anh-goc/danh-muc/` | `dau-xung-dien-edm.jpg` | **(chưa có alt)** | /dau-xung-dien-edm |
| `anh-goc/danh-muc/` | `mo-boi-tron-cong-nghiep.jpg` | **(chưa có alt)** | /mo-boi-tron-cong-nghiep |
| `anh-goc/danh-muc/` | `mo-chiu-nhiet.jpg` | **(chưa có alt)** | /mo-chiu-nhiet |
| `anh-goc/san-pham/` | `calix-ceno-grease-nhan.jpg` | Nhãn phuy mỡ nhờn công nghiệp Calix Ceno No3 | /mo-boi-tron-cong-nghiep/calix-ceno-grease |
| `anh-goc/san-pham/` | `castrol-crb-turbomax-20w50-phuy-209l.jpg` | Phuy 209 lít dầu động cơ Castrol CRB Turbomax 20W-50 | /dau-dong-co-diesel/castrol-crb-turbomax |
| `anh-goc/san-pham/` | `castrol-crb-turbomax-nhan.jpg` | Nhãn xô Castrol CRB Turbomax ghi cấp API CI-4 và cấp độ nhớt | /dau-dong-co-diesel/castrol-crb-turbomax |
| `anh-goc/san-pham/` | `castrol-hyspin-aws-68-phuy-209l.jpg` | Phuy 209 lít dầu thủy lực Castrol Hyspin AWS 68 tại kho Hải Phòng | /dau-thuy-luc/castrol-hyspin-aws-68 |
| `anh-goc/san-pham/` | `castrol-hyspin-aws-68-nhan.jpg` | Nhãn phuy Castrol Hyspin AWS 68 ghi cấp độ nhớt và tiêu chuẩn | /dau-thuy-luc/castrol-hyspin-aws-68 |
| `anh-goc/san-pham/` | `castrol-hyspin-aws-68-kho.jpg` | Phuy Castrol Hyspin AWS 68 xếp trên pallet trong kho HT VINA | /dau-thuy-luc/castrol-hyspin-aws-68 |
| `anh-goc/san-pham/` | `castrol-vecton-nhan.jpg` | Nhãn phuy Castrol Vecton 15W-40 ghi cấp API CI-4 và ACEA E7 | /dau-dong-co-diesel/castrol-vecton |
| `anh-goc/san-pham/` | `eneos-bonnoc-ts-220-xo-18l.jpg` | Xô 18 lít dầu bánh răng ENEOS Bonnoc TS 220 | /dau-banh-rang/eneos-bonnoc-ts |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-20w50-can-18l.jpg` | Can 18 lít dầu động cơ ENEOS CF-4 20W-50 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-15w40-can-18l.jpg` | Can 18 lít dầu động cơ diesel ENEOS CF-4 15W-40 | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-cf-4-nhan.jpg` | Nhãn can ENEOS CF-4 ghi cấp API và cấp độ nhớt SAE | /dau-dong-co-diesel/eneos-deo-cf-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-15w40-can-18l.jpg` | Can 18 lít dầu động cơ ENEOS CI-4/SL 15W-40 | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-20w50-can-18l.jpg` | Can 18 lít dầu động cơ diesel ENEOS CI-4 20W-50 | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-deo-ci-4-nhan.jpg` | Nhãn can ENEOS CI-4/SL ghi cấp API và cấp độ nhớt SAE | /dau-dong-co-diesel/eneos-deo-ci-4 |
| `anh-goc/san-pham/` | `eneos-faircol-ra-32-can-18l.jpg` | Can 18 lít dầu máy nén khí ENEOS Faircol RA 32 tại kho Hải Phòng | /dau-may-nen-khi/eneos-faircol-ra |
| `anh-goc/san-pham/` | `eneos-faircol-ra-32-nhan.jpg` | Nhãn can ENEOS Faircol RA 32 ghi cấp độ nhớt ISO VG 32 | /dau-may-nen-khi/eneos-faircol-ra |
| `anh-goc/san-pham/` | `eneos-super-hyrando-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực ENEOS Super Hyrando 68 tại kho Hải Phòng | /dau-thuy-luc/eneos-super-hyrando-68 |
| `anh-goc/san-pham/` | `licas-grease-no3-ong-400g.jpg` | Thùng 30 ống mỡ Licas Grease No3 loại 400 g | /mo-boi-tron-cong-nghiep/licas-grease |
| `anh-goc/san-pham/` | `shell-spirax-s2-a-85w-140-xo-20l.jpg` | Xô 20 lít dầu cầu Shell Spirax S2 A 85W-140 tại kho Hải Phòng | /dau-cau-hop-so/shell-spirax-s2-a |
| `anh-goc/san-pham/` | `shell-spirax-s2-a-85w-140-nhan.jpg` | Nhãn xô Shell Spirax S2 A 85W-140 ghi cấp API GL-5 | /dau-cau-hop-so/shell-spirax-s2-a |
| `anh-goc/san-pham/` | `shl-synthway-68m-can-20l.jpg` | Can 20 lít dầu rãnh trượt SHL Synthway 68M tại kho Hải Phòng | /dau-ranh-truot/shl-synthway-68m |
| `anh-goc/san-pham/` | `shl-synthway-68m-nhan.jpg` | Nhãn can SHL Synthway 68M ghi cấp độ nhớt ISO VG 68 | /dau-ranh-truot/shl-synthway-68m |
| `anh-goc/san-pham/` | `vhp-lithium-grease-l4-xo-17kg.jpg` | Xô 17 kg mỡ VHP Lithium Grease L4 tại kho Hải Phòng | /mo-boi-tron-cong-nghiep/vhp-lithium-grease |

## Ảnh của bài có hàng nhưng đang tắt (chờ TDS) – nên chụp luôn

Các trang này đã viết, sẽ bật khi có TDS. Chụp trước để bật trang là có ảnh ngay. Còn thiếu 28/32 ảnh.

| Thư mục | Tên file cần up | Nội dung ảnh (alt) | Trang |
|---|---|---|---|
| `anh-goc/san-pham/` | `apex-tl-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực APEX TL 68 Quốc Trung tại kho Hải Phòng | /dau-thuy-luc/apex-tl-68 |
| `anh-goc/san-pham/` | `apex-tl-68-nhan.jpg` | Nhãn phuy dầu thủy lực APEX TL 68 | /dau-thuy-luc/apex-tl-68 |
| `anh-goc/san-pham/` | `emer-law-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực EMER LAW 68 tại kho Hải Phòng | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emer-law-68-xo-18l.jpg` | Xô 18 lít dầu thủy lực EMER LAW 68 | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emer-law-68-nhan.jpg` | Nhãn dầu thủy lực EMER LAW 68 | /dau-thuy-luc/emer-law-68 |
| `anh-goc/san-pham/` | `emi-aw-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực EMI AW 68 tại kho Hải Phòng | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-aw-68-xo.jpg` | Xô dầu thủy lực EMI AW 68 | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-aw-68-nhan.jpg` | Nhãn dầu thủy lực EMI AW 68 ghi cấp độ nhớt ISO VG 68 | /dau-thuy-luc/emi-aw-68 |
| `anh-goc/san-pham/` | `emi-cf-4-20w-50-phuy-200l.jpg` | Phuy 200 lít dầu động cơ diesel EMI CF-4 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/emi-cf-4-20w-50 |
| `anh-goc/san-pham/` | `emi-cf-4-20w-50-nhan.jpg` | Nhãn phuy EMI CF-4 20W-50 ghi cấp API và SAE | /dau-dong-co-diesel/emi-cf-4-20w-50 |
| `anh-goc/san-pham/` | `emi-ci-4-20w-50-xo.jpg` | Xô dầu động cơ diesel EMI CI-4 20W-50 tại kho Hải Phòng | /dau-dong-co-diesel/emi-ci-4-20w-50 |
| `anh-goc/san-pham/` | `emi-ci-4-20w-50-nhan.jpg` | Nhãn xô EMI CI-4 20W-50 ghi cấp API và SAE | /dau-dong-co-diesel/emi-ci-4-20w-50 |
| `anh-goc/san-pham/` | `emi-gear-ep-gl-5-85w-140-xo.jpg` | Xô dầu cầu EMI Gear EP 85W-140 API GL-5 tại kho Hải Phòng | /dau-cau-hop-so/emi-gear-ep-gl-5 |
| `anh-goc/san-pham/` | `emi-gear-ep-gl-5-80w-90-xo-18l.jpg` | Xô 18 lít dầu cầu EMI 80W-90 API GL-5 | /dau-cau-hop-so/emi-gear-ep-gl-5 |
| `anh-goc/san-pham/` | `emi-gear-ep-gl-5-nhan.jpg` | Nhãn xô dầu cầu EMI Gear EP ghi cấp API GL-5 và SAE | /dau-cau-hop-so/emi-gear-ep-gl-5 |
| `anh-goc/san-pham/` | `eneos-mc-sj-20w-40-ma-chai.jpg` | Chai dầu nhớt xe số ENEOS MC SJ MA 20W-40 | /dau-nhot-xe-may/eneos-mc-sj-20w-40 |
| `anh-goc/san-pham/` | `eneos-mc-sj-20w-40-mb-chai.jpg` | Chai dầu nhớt xe tay ga ENEOS MC SJ MB 20W-40 | /dau-nhot-xe-may/eneos-mc-sj-20w-40 |
| `anh-goc/san-pham/` | `eneos-mc-sj-20w-40-nhan.jpg` | Nhãn chai ENEOS MC ghi cấp API SJ, JASO và SAE 20W-40 | /dau-nhot-xe-may/eneos-mc-sj-20w-40 |
| `anh-goc/san-pham/` | `vhp-p140-xo-18l.jpg` | Xô 18 lít dầu cầu VHP P140 tại kho Hải Phòng | /dau-cau-hop-so/vhp-p140 |
| `anh-goc/san-pham/` | `vhp-p140-nhan.jpg` | Nhãn xô dầu cầu VHP P140 ghi cấp SAE 140 | /dau-cau-hop-so/vhp-p140 |
| `anh-goc/san-pham/` | `vhp-rosia-cpr-46-xo-18l.jpg` | Xô 18 lít dầu máy nén khí VHP Rosia CPR 46 tại kho Hải Phòng | /dau-may-nen-khi/vhp-rosia-cpr |
| `anh-goc/san-pham/` | `vhp-rosia-cpr-32-xo-18l.jpg` | Xô 18 lít dầu máy nén khí VHP Rosia CPR 32 | /dau-may-nen-khi/vhp-rosia-cpr |
| `anh-goc/san-pham/` | `vhp-rosia-cpr-nhan.jpg` | Nhãn xô VHP Rosia CPR ghi cấp độ nhớt ISO VG | /dau-may-nen-khi/vhp-rosia-cpr |
| `anh-goc/san-pham/` | `vhp-spadila-atf-xo-18l.jpg` | Xô 18 lít dầu hộp số tự động VHP Spadila ATF tại kho Hải Phòng | /dau-cau-hop-so/vhp-spadila-atf |
| `anh-goc/san-pham/` | `vhp-spadila-atf-nhan.jpg` | Nhãn xô VHP Spadila ATF ghi tiêu chuẩn Dexron | /dau-cau-hop-so/vhp-spadila-atf |
| `anh-goc/san-pham/` | `x-one-aw-68-phuy-200l.jpg` | Phuy 200 lít dầu thủy lực X-One AW 68 tại kho Hải Phòng | /dau-thuy-luc/x-one-aw-68 |
| `anh-goc/san-pham/` | `x-one-aw-68-xo-18l.jpg` | Xô 18 lít dầu thủy lực X-One AW 68 | /dau-thuy-luc/x-one-aw-68 |
| `anh-goc/san-pham/` | `x-one-aw-68-nhan.jpg` | Nhãn dầu thủy lực X-One AW 68 ghi cấp độ nhớt ISO VG 68 | /dau-thuy-luc/x-one-aw-68 |

## Ảnh của bài đang tắt khác (chưa cần up)

85 ảnh thuộc các bài `active: false` không có trong kho hiện tại. Khi bật bài nào, chạy lại `npm run anh` để ảnh của bài đó vào danh sách cần up.
Danh sách đầy đủ trong `docs/danh-sach-anh.csv` (cột "Trạng thái" = Bài đang tắt).
