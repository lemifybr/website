/* global process */
// Ponte entre o site e a API restrita do blog no LCC (os posts ficam no banco do LCC).
// A chave fica só aqui (variável de ambiente do servidor) e nunca vai para o navegador.
const BASE = (process.env.LCC_API_URL || '').trim().replace(/\/+$/, '')
const KEY = (process.env.BLOG_API_KEY || '').trim()

export const configured = () => Boolean(KEY && BASE)

export async function lcc(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${KEY}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  })
  const body = await res.json().catch(() => null)
  return { status: res.status, body }
}

// Cache de borda: o site responde rápido e o backend não recebe uma chamada por visita.
export const cache = (res) => res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

export const send = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

// Só estes campos saem para o público.
export const publicPost = (p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  coverImage: p.coverImage,
  category: p.category,
  tags: p.tags || [],
  authorName: p.authorName,
  publishedAt: p.publishedAt,
  readingTime: p.readingTime,
})
