// Id ngắn cho tiêu đề Markdown: "## Câu hỏi thường gặp {#hoi-dap}" → <h2 id="hoi-dap">Câu hỏi thường gặp</h2>.
// Không ghi {#...} thì Astro tự sinh id từ chữ tiêu đề như cũ. Mục lục lấy id này nên link luôn khớp.
// Plugin hast của Sätteri (bộ xử lý Markdown mặc định của Astro 7), chạy trước bước sinh id của Astro.
const ID_CUOI = /\s*\{#([a-z0-9]+(?:-[a-z0-9]+)*)\}\s*$/;

const headingIdPlugin = {
  name: 'heading-id-ngan',
  element: {
    filter: ['h2', 'h3', 'h4'],
    visit(node, ctx) {
      const cuoi = node.children?.at(-1);
      const m = cuoi?.type === 'text' && cuoi.value.match(ID_CUOI);
      if (!m) return;
      ctx.setProperty(node, 'id', m[1]);
      ctx.replaceNode(cuoi, { type: 'text', value: cuoi.value.slice(0, m.index) });
    },
  },
};

/** Integration gắn plugin vào bộ xử lý Markdown đang dùng. */
export default function headingIdNgan() {
  return {
    name: 'heading-id-ngan',
    hooks: {
      'astro:config:setup'({ config }) {
        config.markdown.processor?.options?.hastPlugins?.push(headingIdPlugin);
      },
    },
  };
}
