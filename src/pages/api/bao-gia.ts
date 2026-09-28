import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

// Route chạy phía server trên Cloudflare Workers (không prerender).
export const prerender = false;

/**
 * Nhận yêu cầu báo giá và chuyển tiếp tới kênh thông báo đã cấu hình.
 *
 * Biến môi trường (đặt bằng `wrangler secret put` hoặc trong Cloudflare dashboard):
 * - QUOTE_TELEGRAM_BOT_TOKEN + QUOTE_TELEGRAM_CHAT_ID: gửi tin nhắn Telegram.
 * - QUOTE_WEBHOOK_URL: POST JSON { text, lead } tới webhook bất kỳ
 *   (Google Apps Script ghi Google Sheet, Make, Zapier, n8n...).
 * Có thể cấu hình một hoặc cả hai. Nếu không có kênh nào, API trả 503.
 */

interface QuoteItem {
  product: string;
  packaging?: string;
  quantity?: string;
}

interface Lead {
  name: string;
  phone: string;
  company: string;
  taxId?: string;
  location?: string;
  deadline?: string;
  note?: string;
  items: QuoteItem[];
  page?: string;
  submittedAt: string;
}

type Env = {
  QUOTE_TELEGRAM_BOT_TOKEN?: string;
  QUOTE_TELEGRAM_CHAT_ID?: string;
  QUOTE_WEBHOOK_URL?: string;
};

const clip = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const PHONE_RE = /^(\+?84|0)\d{8,10}$/;

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) return (await request.json()) as Record<string, unknown>;
  const form = await request.formData();
  const products = form.getAll('product').map(String);
  const packagings = form.getAll('packaging').map(String);
  const quantities = form.getAll('quantity').map(String);
  return {
    ...Object.fromEntries([...form.entries()].filter(([k]) => !['product', 'packaging', 'quantity'].includes(k))),
    items: products.map((product, i) => ({ product, packaging: packagings[i], quantity: quantities[i] })),
  };
}

function validate(raw: Record<string, unknown>): { lead?: Lead; error?: string } {
  const items = (Array.isArray(raw.items) ? raw.items : [])
    .map((it: any) => ({ product: clip(it?.product, 200), packaging: clip(it?.packaging, 60), quantity: clip(it?.quantity, 60) }))
    .filter((it) => it.product)
    .slice(0, 30);
  const lead: Lead = {
    name: clip(raw.name, 120),
    phone: clip(raw.phone, 20).replace(/[\s.-]/g, ''),
    company: clip(raw.company, 200),
    taxId: clip(raw.taxId, 20),
    location: clip(raw.location, 200),
    deadline: clip(raw.deadline, 60),
    note: clip(raw.note, 1500),
    items,
    page: clip(raw.page, 300),
    submittedAt: new Date().toISOString(),
  };
  if (!lead.name) return { error: 'Vui lòng nhập họ tên.' };
  if (!PHONE_RE.test(lead.phone)) return { error: 'Số điện thoại chưa đúng định dạng.' };
  if (!lead.company) return { error: 'Vui lòng nhập tên công ty.' };
  if (!items.length) return { error: 'Vui lòng nhập ít nhất một sản phẩm.' };
  return { lead };
}

function toText(lead: Lead): string {
  const lines = [
    'YÊU CẦU BÁO GIÁ MỚI',
    `Họ tên: ${lead.name}`,
    `SĐT/Zalo: ${lead.phone}`,
    `Công ty: ${lead.company}`,
    lead.taxId && `MST: ${lead.taxId}`,
    lead.location && `Giao tại: ${lead.location}`,
    lead.deadline && `Cần hàng: ${lead.deadline}`,
    'Sản phẩm:',
    ...lead.items.map((it, i) => `  ${i + 1}. ${it.product}${it.packaging ? ` · ${it.packaging}` : ''}${it.quantity ? ` · SL: ${it.quantity}` : ''}`),
    lead.note && `Ghi chú: ${lead.note}`,
    lead.page && `Trang gửi: ${lead.page}`,
  ];
  return lines.filter(Boolean).join('\n');
}

async function deliver(lead: Lead, cfg: Env): Promise<boolean> {
  const text = toText(lead);
  const jobs: Promise<Response>[] = [];
  if (cfg.QUOTE_TELEGRAM_BOT_TOKEN && cfg.QUOTE_TELEGRAM_CHAT_ID) {
    jobs.push(
      fetch(`https://api.telegram.org/bot${cfg.QUOTE_TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: cfg.QUOTE_TELEGRAM_CHAT_ID, text }),
      }),
    );
  }
  if (cfg.QUOTE_WEBHOOK_URL) {
    jobs.push(
      fetch(cfg.QUOTE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, lead }),
      }),
    );
  }
  if (!jobs.length) return false;
  const results = await Promise.allSettled(jobs);
  // Thành công khi ít nhất một kênh nhận được.
  return results.some((r) => r.status === 'fulfilled' && r.value.ok);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const reply = (status: number, body: Record<string, unknown>) =>
    wantsJson
      ? new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })
      : redirect(status === 200 ? '/bao-gia/da-gui' : `/bao-gia?loi=${encodeURIComponent(String(body.error ?? 'Không gửi được'))}`, 303);

  let raw: Record<string, unknown>;
  try {
    raw = await readBody(request);
  } catch {
    return reply(400, { ok: false, error: 'Dữ liệu gửi lên không hợp lệ.' });
  }

  // Trường bẫy chống spam: người dùng thật không nhìn thấy nên luôn để trống.
  if (clip(raw.website)) return reply(200, { ok: true });

  const { lead, error } = validate(raw);
  if (!lead) return reply(400, { ok: false, error });

  const cfg = env as unknown as Env;
  if (!cfg.QUOTE_TELEGRAM_BOT_TOKEN && !cfg.QUOTE_WEBHOOK_URL) {
    return reply(503, { ok: false, error: 'Form chưa được cấu hình kênh nhận. Vui lòng gọi hoặc nhắn Zalo.', reason: 'not_configured' });
  }

  const ok = await deliver(lead, cfg);
  return ok
    ? reply(200, { ok: true })
    : reply(502, { ok: false, error: 'Không gửi được yêu cầu. Vui lòng gọi hoặc nhắn Zalo.' });
};
