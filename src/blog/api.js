// Cliente do blog: fala com as funções do próprio site (/api/blog), nunca direto com o backend.
export async function fetchPosts({ page = 1, category = '', limit = 0 } = {}) {
  const qs = new URLSearchParams({ page: String(page) })
  if (limit) qs.set('limit', String(limit))
  if (category) qs.set('category', category)
  const res = await fetch(`/api/blog?${qs}`)
  if (!res.ok) throw new Error('Falha ao carregar os posts')
  return res.json()
}

export async function fetchPost(slug) {
  const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Falha ao carregar o post')
  return res.json()
}

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : ''
