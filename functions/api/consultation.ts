interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFY_EMAIL?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface LeadPayload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — real users never fill this in
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 200, email: 200, message: 5000 };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();
  const honeypot = (body.company ?? '').trim();

  // Bot caught the honeypot field — pretend success so it doesn't adapt.
  if (honeypot) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (
    !name || !email || !message ||
    name.length > MAX_LEN.name || email.length > MAX_LEN.email || message.length > MAX_LEN.message ||
    !EMAIL_RE.test(email)
  ) {
    return new Response(JSON.stringify({ error: 'Invalid submission' }), { status: 400 });
  }

  const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!insertRes.ok) {
    const detail = await insertRes.text();
    return new Response(JSON.stringify({ error: `Could not save submission: ${detail}` }), { status: 502 });
  }

  if (env.RESEND_API_KEY) {
    const notifyTo = env.LEAD_NOTIFY_EMAIL || 'Ygalal@yg-auditors.com';
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'User-Agent': 'yg-auditors-website/1.0',
        },
        body: JSON.stringify({
          from: 'YG-Auditors Website <onboarding@resend.dev>',
          to: notifyTo,
          reply_to: email,
          subject: `New consultation request from ${name}`,
          html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
        }),
      });
      // fetch only throws on network errors — a 4xx from Resend must be checked explicitly
      if (!emailRes.ok) {
        console.error(`Resend returned ${emailRes.status}: ${await emailRes.text()}`);
      }
    } catch (err) {
      console.error('Resend notification failed:', err);
    }
  } else {
    console.warn('RESEND_API_KEY not set — skipping email notification');
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
