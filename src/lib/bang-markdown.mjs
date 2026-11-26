// Bảng Markdown trong bài viết: bọc trong <div class="table-wrap"> (cuộn ngang trong khung, không tràn trang),
// gắn class "match" (cùng kiểu bảng trang /bao-gia-mo-boi-tron) và ghi data-label = tên cột cho từng ô,
// để trên điện thoại CSS xếp mỗi dòng thành một thẻ "Tên cột: giá trị" thay vì ép chữ thành cột hẹp.
// Plugin hast của Sätteri, gắn giống src/lib/heading-id-ngan.mjs. CSS nằm trong src/components/BaiViet.astro.

const laPhanTu = (n, ten) => n?.type === 'element' && (!ten || n.tagName === ten);
const con = (n, ten) => (n?.children ?? []).filter((c) => laPhanTu(c, ten));

const bangPlugin = {
  name: 'bang-markdown',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.setProperty(node, 'className', ['match']);
      const tenCot = con(con(node, 'thead')[0], 'tr')[0];
      const nhan = con(tenCot, 'th').map((th) => ctx.textContent(th).trim());
      if (nhan.length) {
        for (const tr of con(con(node, 'tbody')[0], 'tr')) {
          con(tr).forEach((o, i) => nhan[i] && ctx.setProperty(o, 'dataLabel', nhan[i]));
        }
      }
      ctx.wrapNode(node, { type: 'element', tagName: 'div', properties: { className: ['table-wrap'] }, children: [] });
    },
  },
};

/** Integration gắn plugin vào bộ xử lý Markdown đang dùng. */
export default function bangMarkdown() {
  return {
    name: 'bang-markdown',
    hooks: {
      'astro:config:setup'({ config }) {
        config.markdown.processor?.options?.hastPlugins?.push(bangPlugin);
      },
    },
  };
}
