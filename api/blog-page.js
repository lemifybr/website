import { configured, lcc } from './_blog.js'
import { markdownToHtml } from './_markdown.js'
import { SITE, esc, setHead, jsonLd, addToHead, setRoot } from './_html.js'
import { SEO } from '../src/seo.js'

// GET /blog e /blog/:slug (reescritos para cá em vercel.json).
// Devolve o index.html do site já com título, meta tags, JSON-LD e o texto no HTML, para buscadores
// e agentes de IA que não executam JavaScript. O React assume por cima ao carregar.
async function shell(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0]
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const origin = host ? `${proto}://${host}` : SITE
  const res = await fetch(`${origin}/index.html`, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error('shell indisponível')
  return res.text()
}

const day = (iso) => (iso ? new Date(iso).toLocaleDateString('pt-BR', { dateStyle: 'long' }) : '')
const nav = '<nav aria-label="Você está em"><a href="/">Início</a> / <a href="/blog">Blog</a></nav>'

function renderPost(html, post) {
  const url = `${SITE}/blog/${post.slug}`
  const title = `${post.metaTitle || post.title} · Blog Lemify`
  const description = post.metaDescription || post.excerpt || 'Artigo do blog do Lemify.'

  html = setHead(html, { title, description, url, image: post.coverImage || undefined, type: 'article' })
  html = addToHead(
    html,
    jsonLd({
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
    }),
  )

  const related = post.related || []
  return setRoot(
    html,
    `${nav}<main><article>
      <header>
        ${post.category ? `<p>${esc(post.category)}</p>` : ''}
        <h1>${esc(post.title)}</h1>
        ${post.excerpt ? `<p>${esc(post.excerpt)}</p>` : ''}
        <p>${post.authorName ? `${esc(post.authorName)} · ` : ''}<time datetime="${esc(post.publishedAt)}">${esc(day(post.publishedAt))}</time> · ${Number(post.readingTime) || 1} min de leitura</p>
      </header>
      ${post.coverImage ? `<img src="${esc(post.coverImage)}" alt="">` : ''}
      ${markdownToHtml(post.content)}
      ${related.length ? `<section><h2>Continue lendo</h2><ul>${related.map((r) => `<li><a href="/blog/${esc(r.slug)}">${esc(r.title)}</a></li>`).join('')}</ul></section>` : ''}
    </article></main>`,
  )
}

function renderList(html, posts) {
  const meta = SEO['/blog']
  html = setHead(html, { title: meta.title, description: meta.description, url: `${SITE}/blog` })
  html = addToHead(
    html,
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE}/blog#blog`,
      url: `${SITE}/blog`,
      name: 'Blog do Lemify',
      description: meta.description,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE}/#organization` },
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.publishedAt })),
    }),
  )
  return setRoot(
    html,
    `${nav}<main>
      <h1>Blog do Lemify</h1>
      <p>${esc(meta.description)}</p>
      <ul>${posts
        .map((p) => `<li><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a>${p.excerpt ? ` — ${esc(p.excerpt)}` : ''}</li>`)
        .join('')}</ul>
    </main>`,
  )
}

const page = (res, status, html, cache) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', cache)
  res.end(html)
}

const OK = 'public, s-maxage=60, stale-while-revalidate=300'

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const slug = (req.query && req.query.slug) || url.searchParams.get('slug') || ''
  const list = url.searchParams.get('list') === '1'

  let html
  try {
    html = await shell(req)
  } catch {
    res.statusCode = 502
    return res.end('Indisponível')
  }

  // Sem dados (LCC fora do ar, chave ausente): devolve o site normal e deixa o React resolver.
  const fallback = (status, cache) => page(res, status, html, cache)

  if (list) {
    if (!configured()) return page(res, 200, renderList(html, []), 'no-store')
    try {
      const { status, body } = await lcc('/api/site/blog/posts?limit=100&page=1')
      if (status !== 200 || !body) return page(res, 200, renderList(html, []), 'no-store')
      return page(res, 200, renderList(html, body.data || []), OK)
    } catch {
      return page(res, 200, renderList(html, []), 'no-store')
    }
  }

  if (!/^[a-z0-9-]{1,160}$/.test(slug)) return fallback(404, 'public, s-maxage=60')
  if (!configured()) return fallback(200, 'no-store')

  try {
    const { status, body } = await lcc(`/api/site/blog/posts/${slug}`)
    if (status === 404) return fallback(404, OK)
    if (status !== 200 || !body) return fallback(200, 'no-store')
    return page(res, 200, renderPost(html, body), OK)
  } catch {
    return fallback(200, 'no-store')
  }
}
