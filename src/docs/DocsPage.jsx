import { useEffect, useMemo, useRef, useState } from 'react'
import '../institutional/site.css'
import './docs.css'
import Footer from '../institutional/Footer.jsx'
import logo from '../institutional/assets/logo-dark.svg'
import { SITE } from '../institutional/siteConfig.js'
import { MODULES, GROUPS } from './modules.js'
import { API_FULL_REFERENCE, SERVERS, AUTH, ENDPOINTS, STATUS } from './api.js'

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

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

function Code({ children }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* sem permissão de área de transferência */ }
  }
  return (
    <div className="code">
      <button type="button" onClick={copy} aria-label="Copiar código">{copied ? 'Copiado' : 'Copiar'}</button>
      <pre><code>{children}</code></pre>
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

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); search.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Aba ativa conforme a seção que está na tela.
  useEffect(() => {
    const ids = ['comece', 'modulos', 'api']
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
  const endpoints = useMemo(
    () => ENDPOINTS.map((g) => ({ ...g, items: g.items.filter((e) => !q || norm(`${e.title} ${e.path} ${e.text} ${e.method}`).includes(q)) })).filter((g) => g.items.length),
    [q],
  )

  // Destaca no menu lateral o item da seção que está na tela e mantém o item visível na lista.
  useEffect(() => {
    const ids = [...modules.map((m) => m.id), ...(endpoints.length ? ['api-autenticacao', ...endpoints.flatMap((g) => g.items.map((e) => e.id))] : [])]
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
  }, [modules, endpoints])

  useEffect(() => {
    const box = side.current
    const link = box?.querySelector('a.is-on')
    if (!box || !link) return
    const top = link.offsetTop - box.offsetTop
    if (top < box.scrollTop + 20 || top > box.scrollTop + box.clientHeight - 60) box.scrollTo({ top: top - 80, behavior: 'smooth' })
  }, [current])

  return (
    <div className="inst docs">
      <header className="docs__top">
        <div className="docs__bar">
          <a href="/" className="docs__logo" aria-label="Lemify, ir para o site"><img src={logo} alt="Lemify" /><span>Docs</span></a>
          <label className="docs__search">
            <span className="sr">Buscar na documentação</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <input ref={search} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar módulos e endpoints…" />
            <kbd>Ctrl K</kbd>
          </label>
          <nav className="docs__links" aria-label="Atalhos">
            <a href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">API completa</a>
            <a href={SITE.customerArea}>Login</a>
            <a className="btn btn--sm btn--dark" href={SITE.signup}>Cadastre-se</a>
          </nav>
        </div>
        <nav className="docs__tabs" aria-label="Seções da documentação">
          {[['comece', 'Comece aqui'], ['modulos', 'Módulos'], ['api', 'API']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-on' : ''}>{label}</a>
          ))}
        </nav>
      </header>

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
            <a className="dcard" href="#api">
              <span className="dcard__ico" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
              </span>
              <strong>Sou desenvolvedor</strong>
              <p>Quero integrar com a API do Lemify: autenticação, envio de mensagens e agenda.</p>
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
            {endpoints.length > 0 && (
              <div className="docs__group">
                <h3>API</h3>
                <a href="#api-autenticacao" onClick={() => pick('api-autenticacao')} className={current === 'api-autenticacao' ? 'is-on' : ''}>Autenticação</a>
                {endpoints.flatMap((g) => g.items).map((e) => <a key={e.id} href={`#${e.id}`} onClick={() => pick(e.id)} className={current === e.id ? 'is-on' : ''} aria-current={current === e.id ? 'true' : undefined}>{e.title}</a>)}
              </div>
            )}
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

            <section id="api" className="dapi" aria-labelledby="api-titulo">
              <span className="eyebrow">API</span>
              <h2 id="api-titulo" className="docs__h2">API do Lemify</h2>
              <p className="docs__lead">Envie mensagens e gerencie a agenda direto do seu sistema. A referência completa (OpenAPI) fica em <a href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">docs.lemify.com.br/api-docs</a>.</p>

              <h3 id="api-servidores" className="dapi__h3">Servidores</h3>
              <div className="dtable">
                {SERVERS.map(([n, u]) => <div key={u}><span>{n}</span><code>{u}</code></div>)}
              </div>

              <h3 id="api-autenticacao" className="dapi__h3">Autenticação</h3>
              <p>Todas as requisições usam o cabeçalho <code>Authorization: Bearer</code>. O tipo de credencial depende do recurso:</p>
              <div className="dauth">
                {AUTH.map((a) => (
                  <div className="dauth__item" key={a.name}>
                    <strong>{a.name}</strong><span className="tag">{a.where}</span>
                    <p>{a.how}</p>
                    <Code>{a.sample}</Code>
                  </div>
                ))}
              </div>

              {endpoints.length === 0 && <p className="docs__empty">Nenhum endpoint encontrado para “{query}”.</p>}

              {endpoints.map((g) => (
                <div key={g.group}>
                  <h3 className="dapi__h3">{g.group}</h3>
                  <p className="dapi__note">{g.note}</p>
                  {g.items.map((e) => (
                    <article className="dep" id={e.id} key={e.id} aria-labelledby={`${e.id}-t`}>
                      <header>
                        <span className={`method method--${e.method.toLowerCase()}`}>{e.method}</span>
                        <code className="dep__path">{e.path}</code>
                      </header>
                      <h4 id={`${e.id}-t`}>{e.title}</h4>
                      <p>{e.text}</p>
                      <p className="dep__auth">Autenticação: <strong>{e.auth}</strong></p>
                      <div className="dfields">
                        {e.fields.map(([n, t, r, d]) => (
                          <div key={n}><code>{n}</code><span>{t} · {r}</span><p>{d}</p></div>
                        ))}
                      </div>
                      <Code>{e.sample}</Code>
                    </article>
                  ))}
                </div>
              ))}

              <h3 className="dapi__h3">Códigos de resposta</h3>
              <div className="dtable">
                {STATUS.map(([c, d]) => <div key={c}><code>{c}</code><span>{d}</span></div>)}
              </div>
              <p className="dapi__foot">Os endpoints de métricas (<code>/v1/metrics/*</code>) são de uso interno do painel administrativo e estão apenas na <a href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">referência completa</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
