import { getUser } from '@netlify/identity'
import type { Context } from '@netlify/functions'

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const user = await getUser()
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const roles: string[] = (user.appMetadata as any)?.roles ?? []
  if (!roles.includes('admin')) {
    return new Response(JSON.stringify({ error: 'Forbidden: admin role required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let email: string
  try {
    const body = await req.json()
    email = body.email?.trim()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'A valid email address is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const identityCtx = (globalThis as any).netlifyIdentityContext
  if (!identityCtx?.url || !identityCtx?.token) {
    return new Response(JSON.stringify({ error: 'Identity not available in this environment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const res = await fetch(`${identityCtx.url}/admin/invite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${identityCtx.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText)
    return new Response(JSON.stringify({ error: `Invite failed: ${detail}` }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return Response.json({ success: true, email })
}
