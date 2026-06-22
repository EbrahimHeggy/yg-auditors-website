import type { Context } from '@netlify/functions'

export default async (req: Request, _context: Context) => {
  const clientId = process.env.OAUTH_CLIENT_ID
  if (!clientId) {
    return new Response('Missing OAUTH_CLIENT_ID environment variable', { status: 500 })
  }

  const origin = new URL(req.url).origin
  const redirectUri = `${origin}/.netlify/functions/callback`

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize')
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', 'repo')

  return new Response(null, {
    status: 302,
    headers: { Location: authorizeUrl.toString() },
  })
}
