import type { Context } from '@netlify/functions'

function renderMessagePage(message: string) {
  return `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            ${message},
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const oauthError = url.searchParams.get('error_description') || url.searchParams.get('error')

  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (oauthError) {
    const payload = `'authorization:github:error:' + ${JSON.stringify(JSON.stringify({ message: oauthError }))}`
    return new Response(renderMessagePage(payload), { headers: { 'Content-Type': 'text/html' } })
  }

  if (!code) {
    return new Response('Missing code parameter', { status: 400 })
  }
  if (!clientId || !clientSecret) {
    return new Response('Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET environment variables', { status: 500 })
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  })

  const tokenData: { access_token?: string; error?: string; error_description?: string } = await tokenRes.json()

  if (!tokenData.access_token) {
    const payload = `'authorization:github:error:' + ${JSON.stringify(
      JSON.stringify({ message: tokenData.error_description || tokenData.error || 'Token exchange failed' })
    )}`
    return new Response(renderMessagePage(payload), { headers: { 'Content-Type': 'text/html' } })
  }

  const payload = `'authorization:github:success:' + ${JSON.stringify(
    JSON.stringify({ token: tokenData.access_token, provider: 'github' })
  )}`

  return new Response(renderMessagePage(payload), { headers: { 'Content-Type': 'text/html' } })
}
