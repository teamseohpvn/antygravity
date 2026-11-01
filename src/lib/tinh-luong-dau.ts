// Công cụ tính lượng dầu thủy lực cần mua. Công thức theo mục "Nên đặt bao nhiêu dầu" và hướng dẫn thay dầu:
// thay dầu = (bồn + ngoài bồn) × số máy; súc rửa = lượng xả ra ở lượt đầu (dung tích bồn) × số máy; châm bù = L/tháng × số tháng.

export const LIT_PHUY = 200;
export const LIT_XO = 18;
/** Giả định 01/11/2026, chờ người dùng duyệt: phần dư của phuy thêm nên dùng hết trong 6 tháng, vì phuy đã mở dễ hút ẩm. */
export const THANG_DUNG_HET_PHUY = 6;
/** Giả định 01/11/2026, chờ người dùng duyệt: phần lẻ cần từ 8 xô (144 L) trở lên thì mua thêm phuy. */
export const SO_XO_DOI_PHUY = 8;

export interface DauVao {
  soMay: number;
  litBon: number;
  litNgoaiBon: number;
  chamBuThang: number;
  soThang: number;
  sucRua: boolean;
}

export interface KetQua {
  tong: number;
  phuy: number;
  xo: number;
  du: number;
  /** Số tháng châm bù được bằng phần dư; null nếu không có châm bù hoặc không dư. */
  thangDu: number | null;
}

const so = (x: number) => (Number.isFinite(x) && x > 0 ? Math.min(x, 1_000_000) : 0);

export function tinhLuongDau(v: DauVao): KetQua {
  const soMay = so(v.soMay);
  const litBon = so(v.litBon);
  const chamBuThang = so(v.chamBuThang);
  const tong = soMay * (litBon + so(v.litNgoaiBon)) + (v.sucRua ? soMay * litBon : 0) + chamBuThang * so(v.soThang);

  let phuy = Math.floor(tong / LIT_PHUY);
  const le = tong - phuy * LIT_PHUY;
  let xo = 0;
  if (le > 0) {
    const soXo = Math.ceil(le / LIT_XO);
    const duNeuThemPhuy = LIT_PHUY - le;
    const dungHetPhuy = chamBuThang > 0 && duNeuThemPhuy / chamBuThang <= THANG_DUNG_HET_PHUY;
    if (dungHetPhuy || soXo >= SO_XO_DOI_PHUY) phuy += 1;
    else xo = soXo;
  }
  const du = phuy * LIT_PHUY + xo * LIT_XO - tong;
  return { tong, phuy, xo, du, thangDu: chamBuThang > 0 && du > 0 ? du / chamBuThang : null };
}

export function moTaMua(k: KetQua): string {
  const phan = [k.phuy ? `${k.phuy} phuy ${LIT_PHUY} L` : '', k.xo ? `${k.xo} xô ${LIT_XO} L` : ''].filter(Boolean);
  return phan.join(' + ');
}
