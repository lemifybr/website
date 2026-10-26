/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Em produção as funções de /api rodam na Vercel. No `npm run dev` este plugin executa as mesmas
// funções (api/**) localmente, com as variáveis do .env (ex.: BLOG_API_KEY e LCC_API_URL).
function apiDev(env) {
  const routes = [
    [/^\/api\/blog\/?$/, '/api/blog/index.js'],
    [/^\/api\/blog\/[^/]+\/?$/, '/api/blog/[slug].js'],
    [/^\/api\/sitemap\/?$/, '/api/sitemap.js'],
  ]
  return {
    name: 'api-dev',
    configureServer(server) {
      Object.assign(process.env, env)
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || '').split('?')[0]
        const target = pathname === '/sitemap.xml' ? '/api/sitemap.js' : routes.find(([re]) => re.test(pathname))?.[1]
        if (!target) return next()
        try {
          const mod = await server.ssrLoadModule(target)
          await mod.default(req, res)
        } catch (e) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: String(e?.message || e) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), apiDev(loadEnv(mode, process.cwd(), ''))],
}))
