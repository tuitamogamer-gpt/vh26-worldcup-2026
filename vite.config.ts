import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the production build portable (works from any subfolder / static host)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: './',
    server: {
      port: 5173,
      open: true,
      // Proxy for API-Football: solves CORS and keeps the key server-side.
      // The key comes either from the WC_API_KEY env var or from the
      // 'x-apisports-key' header the client sends (user-entered in the app).
      proxy: {
        '/fapi': {
          target: 'https://v3.football.api-sports.io',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/fapi/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              const envKey = env.WC_API_KEY
              const clientKey = req.headers['x-apisports-key']
              const key = envKey || (Array.isArray(clientKey) ? clientKey[0] : clientKey)
              if (key) proxyReq.setHeader('x-apisports-key', key)
            })
          },
        },
      },
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1200,
    },
  }
})
