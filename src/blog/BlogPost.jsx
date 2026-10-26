import { useEffect, useState } from 'react'
import '../institutional/site.css'
import './blog.css'
import Header from '../institutional/Header.jsx'
import Footer from '../institutional/Footer.jsx'
import Markdown from './markdown.jsx'
import { fetchPost, formatDate } from './api.js'
import { applySeo, SITE_URL } from '../seo.js'
import { SITE } from '../institutional/siteConfig.js'

// Dados estruturados do artigo (schema.org/BlogPosting), inseridos no <head> enquanto o post está aberto.
function useArticleSchema(post) {
  useEffect(() => {
    if (!post) return undefined
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.blogSchema = 'true'
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription || post.excerpt || undefined,
      image: post.coverImage || undefined,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: { '@type': post.authorName ? 'Person' : 'Organization', name: post.authorName || 'Lemify' },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      inLanguage: 'pt-BR',
      keywords: (post.tags || []).join(', ') || undefined,
    })
    document.head.appendChild(el)
    return () => el.remove()
  }, [post])
}

export default function BlogPost({ slug }) {
  const [state, setState] = useState({ loading: true, error: false, post: undefined })

  useEffect(() => {
    let alive = true
    setState({ loading: true, error: false, post: undefined })
    fetchPost(slug)
      .then((post) => alive && setState({ loading: false, error: false, post }))
      .catch(() => alive && setState({ loading: false, error: true, post: undefined }))
    return () => { alive = false }
  }, [slug])

  const { loading, error, post } = state

  useEffect(() => {
    if (!post) return
    applySeo({ title: `${post.metaTitle || post.title} · Blog Lemify`, description: post.metaDescription || post.excerpt || 'Artigo do blog do Lemify.' }, `/blog/${post.slug}`)
    const set = (sel, v) => document.head.querySelector(sel)?.setAttribute('content', v)
    set('meta[property="og:type"]', 'article')
    if (post.coverImage) { set('meta[property="og:image"]', post.coverImage); set('meta[name="twitter:image"]', post.coverImage) }
    return () => {
      set('meta[property="og:type"]', 'website')
      set('meta[property="og:image"]', `${SITE_URL}/og-image.jpg`)
      set('meta[name="twitter:image"]', `${SITE_URL}/og-image.jpg`)
    }
  }, [post])

  useArticleSchema(post)

  const notFound = !loading && !error && post === null

  return (
    <div className="inst blog">
      <Header />
      <main className="blog__main">
        <div className="wrap">
          {loading && <p className="blog__state" role="status">Carregando…</p>}

          {(error || notFound) && (
            <div className="blog__empty">
              <strong>{notFound ? 'Post não encontrado.' : 'Não conseguimos carregar o post agora.'}</strong>
              <p>{notFound ? 'O endereço pode ter mudado ou o post ainda não foi publicado.' : 'Tente novamente em alguns instantes.'}</p>
              <a className="btn btn--dark btn--sm" href="/blog">Ver todos os posts</a>
            </div>
          )}

          {post && (
            <article className="bpost" itemScope itemType="https://schema.org/BlogPosting">
              <nav className="bpost__crumbs" aria-label="Você está em">
                <a href="/">Início</a><span aria-hidden="true">/</span><a href="/blog">Blog</a>
              </nav>
              <header className="bpost__head">
                {post.category && <span className="badge">{post.category}</span>}
                <h1 itemProp="headline">{post.title}</h1>
                {post.excerpt && <p className="bpost__lead">{post.excerpt}</p>}
                <p className="bpost__meta">
                  {post.authorName && <span itemProp="author">{post.authorName}</span>}
                  <time dateTime={post.publishedAt} itemProp="datePublished">{formatDate(post.publishedAt)}</time>
                  <span>{post.readingTime} min de leitura</span>
                </p>
              </header>
              {post.coverImage && <img className="bpost__cover" src={post.coverImage} alt="" itemProp="image" />}
              <div className="bpost__body" itemProp="articleBody"><Markdown source={post.content} /></div>

              {post.tags?.length > 0 && <ul className="bpost__tags" aria-label="Tags">{post.tags.map((t) => <li key={t}>{t}</li>)}</ul>}

              <aside className="bpost__cta">
                <div>
                  <strong>Quer ver o Lemify na prática?</strong>
                  <p>Teste grátis e coloque os agentes de IA para atender os seus clientes.</p>
                </div>
                <a className="btn btn--lime btn--sm" href={SITE.signup}>Começar agora</a>
              </aside>

              {post.related?.length > 0 && (
                <section className="bpost__related" aria-label="Posts relacionados">
                  <h2>Continue lendo</h2>
                  <div className="blog__grid">
                    {post.related.map((p) => (
                      <article className="bcard" key={p.slug}>
                        <a href={`/blog/${p.slug}`} className="bcard__link" aria-label={p.title} />
                        <div className="bcard__cover">{p.coverImage ? <img src={p.coverImage} alt="" loading="lazy" /> : <span className="bcover__empty" aria-hidden="true" />}</div>
                        <div className="bcard__body">
                          {p.category && <span className="badge">{p.category}</span>}
                          <h3>{p.title}</h3>
                          <small>{formatDate(p.publishedAt)} · {p.readingTime} min</small>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
