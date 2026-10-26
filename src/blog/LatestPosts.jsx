import { useEffect, useState } from 'react'
import './blog.css'
import logo from '../institutional/assets/logo-dark.svg'
import { Arrow } from '../institutional/Header.jsx'
import { fetchPosts, formatDate } from './api.js'

/** Posts recém-publicados na home. Se o blog estiver vazio ou indisponível, a seção some. */
export default function LatestPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let alive = true
    fetchPosts({ limit: 3 })
      .then((d) => alive && setPosts(d.data || []))
      .catch(() => {})
    return () => { alive = false }
  }, [])

  if (!posts.length) return null

  return (
    <section className="latest" id="blog" aria-labelledby="blog-titulo">
      <div className="wrap">
        <div className="latest__head">
          <div>
            <span className="eyebrow" data-reveal>Blog</span>
            <h2 id="blog-titulo" className="h2">Novidades e ideias do Lemify</h2>
          </div>
          <a className="btn btn--outline btn--sm" href="/blog">Ver todos os posts <Arrow /></a>
        </div>

        <div className="blog__grid">
          {posts.map((p) => (
            <article className="bcard" key={p.slug}>
              <a href={`/blog/${p.slug}`} className="bcard__link" aria-label={p.title} />
              <div className="bcard__cover">
                {p.coverImage ? <img src={p.coverImage} alt="" loading="lazy" /> : <span className="bcover__empty" aria-hidden="true"><img src={logo} alt="" /></span>}
              </div>
              <div className="bcard__body">
                {p.category && <span className="badge">{p.category}</span>}
                <h3>{p.title}</h3>
                {p.excerpt && <p>{p.excerpt}</p>}
                <small>{formatDate(p.publishedAt)} · {p.readingTime} min de leitura</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
