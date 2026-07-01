import { handleConsultation, type LeadPayload, type ConsultationEnv } from '../../src/lib/consultation-handler';

interface Env extends ConsultationEnv {}

interface RequestContext {
  request: Request;
  env: Env;
}

export const onRequestPost = async (context: RequestContext): Promise<Response> => {
  const { request, env } = context;

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await handleConsultation(body, {
    RESEND_API_KEY: env.RESEND_API_KEY,
    LEAD_NOTIFY_EMAIL: env.LEAD_NOTIFY_EMAIL,
  });

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
