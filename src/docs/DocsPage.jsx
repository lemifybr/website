import { useEffect, useMemo, useRef, useState } from 'react'
import '../institutional/site.css'
import './docs.css'
import Footer from '../institutional/Footer.jsx'
import { MODULES, GROUPS } from './modules.js'
import { ENDPOINTS } from './api.js'
import { DocsHeader } from './DocsShared.jsx'
import { norm, useSearchShortcut } from './docsUtils.js'

const TABS = [
  ['comece', 'Comece aqui', '#comece'],
  ['modulos', 'Módulos', '#modulos'],
  ['api', 'API', '/docs/api'],
  ['mensageria', 'WhatsApp Web & WABA', '/api'],
]

// A API ganhou página própria: âncoras antigas (/docs#api, #api-autenticacao, #agenda-create...) vão para /docs/api.
const LEGACY_API_HASHES = new Set(['api', ...ENDPOINTS.flatMap((g) => g.items.map((e) => e.id))])
const legacyApiTarget = () => {
  const hash = window.location.hash.slice(1)
  if (!hash) return null
  if (hash === 'api') return '/docs/api'
  if (hash.startsWith('api-') || LEGACY_API_HASHES.has(hash)) return `/docs/api#${hash}`
  return null
}

/** Vídeo do módulo: aceita YouTube, Vimeo, Loom ou arquivo .mp4/.webm; sem link, mostra o espaço reservado. */
function VideoSlot({ url, title }) {
  if (!url) {
    return (
      <div className="vslot vslot--empty" role="img" aria-label={`Espaço para o vídeo do módulo ${title}`}>
        <span className="vslot__play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg></span>
        <strong>Vídeo em breve</strong>
        <small>{title}</small>
      </div>
    )
  }
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/)
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  const lm = url.match(/loom\.com\/(?:share|embed)\/([\w]+)/)
  const embed = yt ? `https://www.youtube.com/embed/${yt[1]}` : vm ? `https://player.vimeo.com/video/${vm[1]}` : lm ? `https://www.loom.com/embed/${lm[1]}` : null
  return (
    <div className="vslot">
      {embed ? (
        <iframe src={embed} title={`Vídeo: ${title}`} loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <video src={url} controls preload="metadata" playsInline aria-label={`Vídeo: ${title}`} />
      )}
    </div>
  )
}

export default function DocsPage() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('comece')
  const [current, setCurrent] = useState('')
  const side = useRef(null)
  const lock = useRef(0)
  // Clique no menu: marca o item na hora e ignora o scroll-spy até a rolagem terminar.
  const pick = (id) => { lock.current = Date.now() + 1200; setCurrent(id) }
  const search = useRef(null)
  const q = norm(query.trim())

  useSearchShortcut(search)

  useEffect(() => {
    const go = () => { const target = legacyApiTarget(); if (target) window.location.replace(target) }
    go()
    window.addEventListener('hashchange', go)
    return () => window.removeEventListener('hashchange', go)
  }, [])

  // Aba ativa conforme a seção que está na tela.
  useEffect(() => {
    const ids = ['comece', 'modulos']
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 160) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const modules = useMemo(
    () => MODULES.filter((m) => !q || norm(`${m.title} ${m.summary} ${m.description} ${m.features.join(' ')}`).includes(q)),
    [q],
  )

  // Destaca no menu lateral o item da seção que está na tela e mantém o item visível na lista.
  useEffect(() => {
    const ids = modules.map((m) => m.id)
    const onScroll = () => {
      if (Date.now() < lock.current) return
      let cur = ''
      // ao navegar pelo menu a seção para ~130px abaixo do topo (logo abaixo do cabeçalho fixo)
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) cur = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1]
      setCurrent(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [modules])

  useEffect(() => {
    const box = side.current
    const link = box?.querySelector('a.is-on')
    if (!box || !link) return
    const top = link.offsetTop - box.offsetTop
    if (top < box.scrollTop + 20 || top > box.scrollTop + box.clientHeight - 60) box.scrollTo({ top: top - 80, behavior: 'smooth' })
  }, [current])

  return (
    <div className="inst docs">
      <DocsHeader query={query} setQuery={setQuery} searchRef={search} placeholder="Buscar módulos…" tabs={TABS} active={active} />

      <main>
        <section className="docs__hero" id="comece" aria-labelledby="docs-titulo">
          <h1 id="docs-titulo">Bem-vindo à documentação do Lemify</h1>
          <p>Aprenda a usar cada módulo da plataforma e integre o seu sistema com a API.</p>
        </section>

        <section className="docs__start" aria-label="Por onde começar">
          <h2>Por onde você quer começar?</h2>
          <div className="docs__cards">
            <a className="dcard" href="#modulos">
              <span className="dcard__ico" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>
              </span>
              <strong>Sou usuário</strong>
              <p>Quero entender o que cada módulo faz e ver como usar, com vídeos e passo a passo.</p>
              <span className="dcard__go">Ver módulos →</span>
            </a>
            <a className="dcard" href="/docs/api">
              <span className="dcard__ico" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
              </span>
              <strong>Sou desenvolvedor</strong>
              <p>Quero integrar com a API do Lemify: autenticação, mensagens, agenda e CRM.</p>
              <span className="dcard__go">Ver a API →</span>
            </a>
          </div>
        </section>

        <div className="docs__layout">
          <aside className="docs__side" aria-label="Navegação" ref={side}>
            {GROUPS.map((g) => {
              const items = modules.filter((m) => m.group === g)
              if (!items.length) return null
              return (
                <div key={g} className="docs__group">
                  <h3>{g}</h3>
                  {items.map((m) => <a key={m.id} href={`#${m.id}`} onClick={() => pick(m.id)} className={current === m.id ? 'is-on' : ''} aria-current={current === m.id ? 'true' : undefined}>{m.title}</a>)}
                </div>
              )
            })}
            <div className="docs__group">
              <h3>API</h3>
              <a href="/docs/api">Documentação da API →</a>
            </div>
          </aside>

          <div className="docs__content">
            <section id="modulos" aria-labelledby="modulos-titulo">
              <span className="eyebrow">Módulos</span>
              <h2 id="modulos-titulo" className="docs__h2">Tudo o que o Lemify faz, módulo por módulo</h2>
              <p className="docs__lead">Cada módulo tem uma descrição do que faz e um espaço para o vídeo de demonstração.</p>

              {modules.length === 0 && <p className="docs__empty">Nenhum módulo encontrado para “{query}”.</p>}

              {modules.map((m) => (
                <article className="dmod" id={m.id} key={m.id} aria-labelledby={`${m.id}-t`}>
                  <span className="dmod__group">{m.group}</span>
                  <h3 id={`${m.id}-t`}>{m.title}</h3>
                  <p className="dmod__sum">{m.summary}</p>
                  <VideoSlot url={m.video} title={m.title} />
                  <p>{m.description}</p>
                  <h4>O que você faz aqui</h4>
                  <ul>{m.features.map((f) => <li key={f}>{f}</li>)}</ul>
                </article>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
