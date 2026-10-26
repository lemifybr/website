import { configured, lcc, cache, send, publicPost } from '../_blog.js'

// GET /api/blog?page=1&limit=9&category=Novidades
export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Método não permitido' })
  if (!configured()) return send(res, 503, { error: 'Blog indisponível' })

  const url = new URL(req.url, 'http://localhost')
  const qs = new URLSearchParams({ limit: '9' })
  for (const k of ['page', 'limit', 'category']) {
    const v = url.searchParams.get(k)
    if (v) qs.set(k, v)
  }

  try {
    const { status, body } = await lcc(`/api/site/blog/posts?${qs}`)
    if (status !== 200 || !body) return send(res, 502, { error: 'Falha ao carregar os posts' })
    cache(res)
    return send(res, 200, {
      data: (body.data || []).map(publicPost),
      page: body.page,
      limit: body.limit,
      total: body.total,
      totalPages: body.totalPages,
      categories: body.categories || [],
    })
  } catch {
    return send(res, 502, { error: 'Falha ao carregar os posts' })
  }
}
