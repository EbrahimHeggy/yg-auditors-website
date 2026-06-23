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

  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variable');
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  // JSON values aren't guaranteed to be strings — coerce safely so .trim() can't throw
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const honeypot = typeof body.company === 'string' ? body.company.trim() : '';

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
    // Log details server-side; never leak raw DB errors (schema, constraints) to the client
    console.error(`Supabase insert failed (${insertRes.status}): ${await insertRes.text()}`);
    return new Response(JSON.stringify({ error: 'Could not save submission' }), { status: 502 });
  }

  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_EMAIL) {
    const notifyTo = env.LEAD_NOTIFY_EMAIL;
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
    console.warn('RESEND_API_KEY or LEAD_NOTIFY_EMAIL not set — skipping email notification');
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
