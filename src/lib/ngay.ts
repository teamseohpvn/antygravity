// Ngày đăng (`date`) và ngày cập nhật (`updated`) của bài viết.
// Một nguồn duy nhất cho chữ hiển thị trên trang, schema (datePublished / dateModified),
// thẻ meta article:*_time và <lastmod> trong sitemap, để Google không thấy các ngày lệch nhau.
// Quy tắc nhập ngày: xem docs/CAU-TRUC-NOI-DUNG.md mục "Ngày đăng và ngày cập nhật".

/** Date hoặc chuỗi "YYYY-MM-DD" → "YYYY-MM-DD" (theo ngày ghi trong frontmatter, không lệch múi giờ). */
export function isoDate(d?: Date | string): string | undefined {
  if (!d) return undefined;
  if (typeof d === 'string') return d.slice(0, 10);
  return d.toISOString().slice(0, 10);
}

/** "YYYY-MM-DD" → "dd/mm/yyyy" để hiển thị. */
export function viDate(iso?: string): string | undefined {
  return iso ? iso.split('-').reverse().join('/') : undefined;
}

/** Ngày đăng, ngày cập nhật dạng ISO. Thiếu `updated` thì coi như chưa sửa (= ngày đăng). */
export function ngayBai(data: { date?: Date | string; updated?: Date | string }) {
  const published = isoDate(data.date);
  const modified = isoDate(data.updated) ?? published;
  return { published, modified, publishedText: viDate(published), modifiedText: viDate(modified) };
}
