export interface LeadPayload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot
}

export interface ConsultationEnv {
  RESEND_API_KEY?: string;
  LEAD_NOTIFY_EMAIL?: string;
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

export async function handleConsultation(
  body: LeadPayload,
  env: ConsultationEnv,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const { RESEND_API_KEY, LEAD_NOTIFY_EMAIL } = env;

  if (!RESEND_API_KEY || !LEAD_NOTIFY_EMAIL) {
    console.error('Missing RESEND_API_KEY or LEAD_NOTIFY_EMAIL environment variable');
    return { status: 500, body: { error: 'Internal server error' } };
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const honeypot = typeof body.company === 'string' ? body.company.trim() : '';

  if (honeypot) {
    // Bots fill hidden fields; pretend success without doing anything.
    return { status: 200, body: { success: true } };
  }

  if (
    !name || !email || !message ||
    name.length > MAX_LEN.name || email.length > MAX_LEN.email || message.length > MAX_LEN.message ||
    !EMAIL_RE.test(email)
  ) {
    return { status: 400, body: { error: 'Invalid submission' } };
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'yg-auditors-website/1.0',
      },
      body: JSON.stringify({
        from: 'YG-Auditors Website <onboarding@resend.dev>',
        to: LEAD_NOTIFY_EMAIL,
        reply_to: email,
        subject: `New consultation request from ${name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!emailRes.ok) {
      console.error(`Resend returned ${emailRes.status}: ${await emailRes.text()}`);
      return { status: 502, body: { error: 'Could not send message' } };
    }
  } catch (err) {
    console.error('Resend request failed:', err);
    return { status: 502, body: { error: 'Could not send message' } };
  }

  return { status: 200, body: { success: true } };
}
