// Vercel serverless proxy for API-Football — mirrors the Vite dev-server proxy
// so the client's /fapi/* calls work in production too (CORS + key handling).
// The key comes from the WC_API_KEY env var (set in Vercel) or the
// x-apisports-key header the client sends (user-entered in the app).
export default async function handler(req: any, res: any) {
  try {
    const raw: string = req.url || ''
    const i = raw.indexOf('/fapi/')
    const tail = i >= 0 ? raw.slice(i + 6) : raw.replace(/^\/?(api\/)?fapi\/?/, '')
    const key = process.env.WC_API_KEY || req.headers['x-apisports-key'] || ''
    const upstream = `https://v3.football.api-sports.io/${tail}`

    const r = await fetch(upstream, { headers: { 'x-apisports-key': String(key) } })
    const body = await r.text()
    res.status(r.status)
    res.setHeader('content-type', 'application/json')
    res.setHeader('cache-control', 'no-store')
    res.send(body)
  } catch (e) {
    res.status(502).json({ errors: { proxy: e instanceof Error ? e.message : 'proxy error' } })
  }
}
