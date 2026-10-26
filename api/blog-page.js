import { configured, lcc } from './_blog.js'
import { esc, markdownToHtml } from './_markdown.js'

const SITE = 'https://lemify.com.br'

// GET /blog/:slug (reescrito para cá em vercel.json)
// Devolve o index.html do site já com título, meta tags, JSON-LD e o texto do artigo no HTML, para
// buscadores e agentes de IA que não executam JavaScript. O React assume por cima ao carregar.
async function shell(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0]
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const origin = host ? `${proto}://${host}` : SITE
  const res = await fetch(`${origin}/index.html`, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error('shell indisponível')
  return res.text()
}

const setTag = (html, re, tag) => (re.test(html) ? html.replace(re, () => tag) : html)

const day = (iso) => (iso ? new Date(iso).toLocaleDateString('pt-BR', { dateStyle: 'long' }) : '')

function render(html, post) {
  const url = `${SITE}/blog/${post.slug}`
  const title = `${post.metaTitle || post.title} · Blog Lemify`
  const description = post.metaDescription || post.excerpt || 'Artigo do blog do Lemify.'
  const image = post.coverImage || `${SITE}/og-image.jpg`

  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(url)}" />`)
  html = setTag(html, /<meta property="og:type"[^>]*>/, '<meta property="og:type" content="article" />')
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${esc(url)}" />`)
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`)
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`)
  html = setTag(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(image)}" />`)
  html = setTag(html, /<meta property="og:image:alt"[^>]*>\s*/, '')
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`)
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(description)}" />`)
  html = setTag(html, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${esc(image)}" />`)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { '@type': post.authorName ? 'Person' : 'Organization', name: post.authorName || 'Lemify' },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: url,
    inLanguage: 'pt-BR',
    keywords: (post.tags || []).join(', ') || undefined,
  }
  // "<" escapado para o JSON nunca fechar a tag <script>.
  const ld = `<script type="application/ld+json" data-blog-schema="true">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>\n</head>`
  html = html.replace('</head>', () => ld)

  const body = `<div id="root">
    <article>
      <nav aria-label="Você está em"><a href="/">Início</a> / <a href="/blog">Blog</a></nav>
      <header>
        ${post.category ? `<p>${esc(post.category)}</p>` : ''}
        <h1>${esc(post.title)}</h1>
        ${post.excerpt ? `<p>${esc(post.excerpt)}</p>` : ''}
        <p>${post.authorName ? `${esc(post.authorName)} · ` : ''}<time datetime="${esc(post.publishedAt)}">${esc(day(post.publishedAt))}</time> · ${Number(post.readingTime) || 1} min de leitura</p>
      </header>
      ${post.coverImage ? `<img src="${esc(post.coverImage)}" alt="">` : ''}
      ${markdownToHtml(post.content)}
      ${(post.related || []).length ? `<section><h2>Continue lendo</h2><ul>${post.related.map((r) => `<li><a href="/blog/${esc(r.slug)}">${esc(r.title)}</a></li>`).join('')}</ul></section>` : ''}
    </article>
  </div>
  `
  const start = html.indexOf('<div id="root">')
  const end = html.indexOf('<noscript>')
  if (start === -1 || end === -1 || end < start) return html
  return html.slice(0, start) + body + html.slice(end)
}

const page = (res, status, html, cache) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', cache)
  res.end(html)
}

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const slug = (req.query && req.query.slug) || url.searchParams.get('slug') || ''

  let html
  try {
    html = await shell(req)
  } catch {
    res.statusCode = 502
    return res.end('Indisponível')
  }

  // Sem post (LCC fora do ar, chave ausente, slug inválido): devolve o site normal e deixa o React resolver.
  const fallback = (status, cache) => page(res, status, html, cache)
  if (!/^[a-z0-9-]{1,160}$/.test(slug)) return fallback(404, 'public, s-maxage=60')
  if (!configured()) return fallback(200, 'no-store')

  try {
    const { status, body } = await lcc(`/api/site/blog/posts/${slug}`)
    if (status === 404) return fallback(404, 'public, s-maxage=60, stale-while-revalidate=300')
    if (status !== 200 || !body) return fallback(200, 'no-store')
    return page(res, 200, render(html, body), 'public, s-maxage=60, stale-while-revalidate=300')
  } catch {
    return fallback(200, 'no-store')
  }
}
