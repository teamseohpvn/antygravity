// Mục lục (table of contents) cho bài dài. Xem docs/CAU-TRUC-NOI-DUNG.md mục "Mục lục".
// Danh sách mục lấy từ `headings` mà render() của astro:content trả về, nên mục lục luôn khớp tiêu đề thật.

export interface MucLucItem {
  depth: number;
  slug: string;
  text: string;
}

/** Chỉ hiện mục lục khi bài có từ số mục H2 này trở lên. */
export const MUC_LUC_TOI_THIEU = 4;

/**
 * Lọc tiêu đề cho mục lục: H2, kèm H3 nếu `voiH3`.
 * Trả về [] khi bài quá ngắn (ít hơn MUC_LUC_TOI_THIEU mục H2) hoặc frontmatter đặt `muc_luc: false`.
 */
export function mucLuc(headings: MucLucItem[], opts: { voiH3?: boolean; tat?: boolean } = {}): MucLucItem[] {
  if (opts.tat) return [];
  // H3 trong mục "Câu hỏi thường gặp" không đưa vào mục lục (danh sách câu hỏi làm mục lục quá dài).
  let trongFaq = false;
  const items = headings.filter((h) => {
    if (h.depth === 2) trongFaq = /^câu hỏi thường gặp/i.test(h.text);
    return h.depth === 2 || (opts.voiH3 && h.depth === 3 && !trongFaq);
  });
  return items.filter((h) => h.depth === 2).length >= MUC_LUC_TOI_THIEU ? items : [];
}
