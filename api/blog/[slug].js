import { configured, lemify, cache, send, publicPost } from '../_blog.js'

// GET /api/blog/:slug
export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Método não permitido' })
  if (!configured()) return send(res, 503, { error: 'Blog indisponível' })

  const url = new URL(req.url, 'http://localhost')
  const slug = (req.query && req.query.slug) || decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '')
  if (!/^[a-z0-9-]{1,160}$/.test(slug)) return send(res, 404, { error: 'Post não encontrado' })

  try {
    const { status, body } = await lemify(`/v1/blog/posts/slug/${slug}?onlyLive=true`)
    if (status === 404) return send(res, 404, { error: 'Post não encontrado' })
    if (status !== 200 || !body) return send(res, 502, { error: 'Falha ao carregar o post' })
    cache(res)
    return send(res, 200, {
      ...publicPost(body),
      content: body.content,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      updatedAt: body.updatedAt,
      related: (body.related || []).map(publicPost),
    })
  } catch {
    return send(res, 502, { error: 'Falha ao carregar o post' })
  }
}
