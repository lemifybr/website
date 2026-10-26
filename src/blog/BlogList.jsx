import { useEffect, useState } from 'react'
import '../institutional/site.css'
import './blog.css'
import Header from '../institutional/Header.jsx'
import Footer from '../institutional/Footer.jsx'
import logo from '../institutional/assets/logo-dark.svg'
import { fetchPosts, formatDate } from './api.js'

function Cover({ post, big = false }) {
  return post.coverImage ? (
    <img src={post.coverImage} alt="" loading={big ? 'eager' : 'lazy'} />
  ) : (
    <span className="bcover__empty" aria-hidden="true"><img src={logo} alt="" /></span>
  )
}

function Card({ post, featured = false }) {
  return (
    <article className={`bcard ${featured ? 'bcard--featured' : ''}`}>
      <a href={`/blog/${post.slug}`} className="bcard__link" aria-label={post.title} />
      <div className="bcard__cover"><Cover post={post} big={featured} /></div>
      <div className="bcard__body">
        {post.category && <span className="badge">{post.category}</span>}
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <small>{formatDate(post.publishedAt)} · {post.readingTime} min de leitura</small>
      </div>
    </article>
  )
}

export default function BlogList() {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [state, setState] = useState({ loading: true, error: false, data: null })

  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: false }))
    fetchPosts({ page, category })
      .then((data) => alive && setState({ loading: false, error: false, data }))
      .catch(() => alive && setState({ loading: false, error: true, data: null }))
    return () => { alive = false }
  }, [page, category])

  const { loading, error, data } = state
  const posts = data?.data || []
  const [first, ...rest] = posts
  const showFeatured = page === 1 && !category && first

  return (
    <div className="inst blog">
      <Header />
      <main className="blog__main">
        <div className="wrap">
          <header className="blog__head">
            <span className="eyebrow">Blog</span>
            <h1>Ideias para atender e vender melhor</h1>
            <p>Novidades do Lemify, boas práticas de atendimento e vendas por conversa e o que aprendemos construindo IA para empresas brasileiras.</p>
          </header>

          {data?.categories?.length > 0 && (
            <nav className="blog__cats" aria-label="Categorias">
              <button type="button" className={!category ? 'is-on' : ''} onClick={() => { setCategory(''); setPage(1) }}>Tudo</button>
              {data.categories.map((c) => (
                <button type="button" key={c} className={category === c ? 'is-on' : ''} onClick={() => { setCategory(c); setPage(1) }}>{c}</button>
              ))}
            </nav>
          )}

          {loading && <p className="blog__state" role="status">Carregando posts…</p>}

          {!loading && (error || posts.length === 0) && (
            <div className="blog__empty">
              <strong>{error ? 'Não conseguimos carregar o blog agora.' : 'Os primeiros posts chegam em breve.'}</strong>
              <p>{error ? 'Tente novamente em alguns instantes.' : 'Enquanto isso, conheça o Lemify ou fale com a gente.'}</p>
              <a className="btn btn--dark btn--sm" href="/">Voltar ao site</a>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <>
              {showFeatured && <Card post={first} featured />}
              <div className="blog__grid">
                {(showFeatured ? rest : posts).map((p) => <Card key={p.slug} post={p} />)}
              </div>

              {data.totalPages > 1 && (
                <nav className="blog__pager" aria-label="Páginas">
                  <button type="button" disabled={page <= 1} onClick={() => { setPage(page - 1); window.scrollTo({ top: 0 }) }}>Anterior</button>
                  <span>Página {data.page} de {data.totalPages}</span>
                  <button type="button" disabled={page >= data.totalPages} onClick={() => { setPage(page + 1); window.scrollTo({ top: 0 }) }}>Próxima</button>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
