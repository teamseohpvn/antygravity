// Đợt khuyến mại dầu thủy lực AW 68. Hết đợt thì sửa các giá trị dưới đây (giữ nguyên URL trang).
export const PROMO = {
  path: '/khuyen-mai-dau-thuy-luc-aw-68',
  label: 'tháng 11/2026',
  end: '2026-11-30',
  endText: '30/11/2026',
  // Giờ chốt đơn để giao trong ngày (thứ Hai đến thứ Sáu).
  sameDayCutoff: '16:00',
};

/** Banner chỉ hiện khi build trước hoặc trong ngày kết thúc đợt. */
export const PROMO_ACTIVE = new Date() <= new Date(`${PROMO.end}T23:59:59+07:00`);
