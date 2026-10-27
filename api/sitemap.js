import { configured, lcc } from './_blog.js'

const SITE = 'https://lemify.com.br'

// Páginas fixas do site. Os posts do blog entram automaticamente.
const STATIC = [
  ['/', 'weekly', '1.0'],
  ['/blog', 'daily', '0.8'],
  ['/docs', 'monthly', '0.7'],
  ['/termos', 'yearly', '0.3'],
  ['/privacidade', 'yearly', '0.3'],
  ['/lgpd', 'yearly', '0.3'],
  ['/reembolso', 'yearly', '0.3'],
  ['/termos-ia', 'yearly', '0.3'],
  ['/google-disclosure', 'yearly', '0.3'],
  ['/manual/bling', 'monthly', '0.4'],
]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// GET /sitemap.xml (reescrito para esta função em vercel.json)
export default async function handler(_req, res) {
  const urls = STATIC.map(([p, freq, prio]) => ({ loc: `${SITE}${p === '/' ? '/' : p}`, freq, prio }))

  if (configured()) {
    try {
      let page = 1
      let totalPages = 1
      do {
        const { status, body } = await lcc(`/api/site/blog/posts?limit=100&page=${page}`)
        if (status !== 200 || !body) break
        for (const p of body.data || []) {
          urls.push({ loc: `${SITE}/blog/${p.slug}`, lastmod: (p.publishedAt || '').slice(0, 10) || undefined, freq: 'monthly', prio: '0.6' })
        }
        totalPages = body.totalPages || 1
        page += 1
      } while (page <= totalPages && page <= 20)
    } catch {
      // sem o blog o sitemap continua válido com as páginas fixas
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${esc(u.loc)}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.freq}</changefreq>\n    <priority>${u.prio}</priority>\n  </url>`)
    .join('\n')}\n</urlset>\n`

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.end(xml)
}
