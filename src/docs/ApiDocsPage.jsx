import { useEffect, useMemo, useRef, useState } from 'react'
import '../institutional/site.css'
import './docs.css'
import Footer from '../institutional/Footer.jsx'
import { API_BASE, API_FULL_REFERENCE, SERVERS, AUTH, ENDPOINTS, STATUS, LIMITS, LLMS } from './api.js'
import { Code, DocsHeader } from './DocsShared.jsx'
import { norm, useDocsTheme, useSearchShortcut } from './docsUtils.js'

const TABS = [
  ['inicio', 'Comece aqui', '/docs'],
  ['modulos', 'Módulos', '/docs#modulos'],
  ['api', 'API', '/docs/api'],
]

const BASICS = [
  ['api-inicio', 'Primeiros passos'],
  ['api-servidores', 'Servidores'],
  ['api-autenticacao', 'Autenticação'],
  ['api-limites', 'Limites de uso'],
  ['api-llms', 'Para IA (llms.txt)'],
  ['api-respostas', 'Códigos de resposta'],
]

const QUICKSTART = `# 1. Descubra as etapas do seu funil
curl ${API_BASE}/v1/pipelines \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"

# 2. Crie um negócio na etapa escolhida
curl -X POST ${API_BASE}/v1/deals \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "Pedido 1042", "stageId": 12, "externalSource": "erp", "externalId": "1042" }'`

export default function ApiDocsPage() {
  const [query, setQuery] = useState('')
  const [current, setCurrent] = useState('')
  const side = useRef(null)
  const lock = useRef(0)
  const search = useRef(null)
  const q = norm(query.trim())
  const [theme, toggleTheme] = useDocsTheme()
  // Endpoints abertos no accordion; começa com o da âncora da URL (link direto para um endpoint).
  const [open, setOpen] = useState(() => new Set(window.location.hash ? [window.location.hash.slice(1)] : []))
  const setEndpointOpen = (id, isOpen) => setOpen((prev) => {
    if (prev.has(id) === isOpen) return prev
    const next = new Set(prev)
    if (isOpen) next.add(id); else next.delete(id)
    return next
  })
  // Clique no menu: marca o item na hora, abre o endpoint e ignora o scroll-spy até a rolagem terminar.
  const pick = (id) => { lock.current = Date.now() + 1200; setCurrent(id); setEndpointOpen(id, true) }

  useSearchShortcut(search)

  const endpoints = useMemo(
    () => ENDPOINTS.map((g) => ({ ...g, items: g.items.filter((e) => !q || norm(`${g.group} ${e.title} ${e.path} ${e.text} ${e.method}`).includes(q)) })).filter((g) => g.items.length),
    [q],
  )
  const visibleIds = useMemo(() => endpoints.flatMap((g) => g.items.map((e) => e.id)), [endpoints])
  const allOpen = visibleIds.length > 0 && visibleIds.every((id) => open.has(id))

  // Buscando, os resultados já aparecem abertos.
  useEffect(() => {
    if (q) setOpen(new Set(visibleIds))
  }, [q, visibleIds])

  // Âncora alterada depois do carregamento (link interno, voltar do navegador) também abre o endpoint.
  useEffect(() => {
    const onHash = () => { const id = window.location.hash.slice(1); if (id) setEndpointOpen(id, true) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Destaca no menu lateral a seção que está na tela.
  useEffect(() => {
    // Na ordem em que aparecem na página: "Códigos de resposta" fica depois dos endpoints
    const ids = [...BASICS.map(([id]) => id).filter((id) => id !== 'api-respostas'), ...endpoints.flatMap((g) => g.items.map((e) => e.id)), 'api-respostas']
    const onScroll = () => {
      if (Date.now() < lock.current) return
      let cur = ''
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
  }, [endpoints])

  useEffect(() => {
    const box = side.current
    const link = box?.querySelector('a.is-on')
    if (!box || !link) return
    const top = link.offsetTop - box.offsetTop
    if (top < box.scrollTop + 20 || top > box.scrollTop + box.clientHeight - 60) box.scrollTo({ top: top - 80, behavior: 'smooth' })
  }, [current])

  const link = (id, label) => (
    <a key={id} href={`#${id}`} onClick={() => pick(id)} className={current === id ? 'is-on' : ''} aria-current={current === id ? 'true' : undefined}>{label}</a>
  )

  return (
    <div className="inst docs" data-theme={theme}>
      <DocsHeader query={query} setQuery={setQuery} searchRef={search} placeholder="Buscar endpoints…" tabs={TABS} active="api" theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <section className="docs__hero" aria-labelledby="api-titulo">
          <h1 id="api-titulo">API do Lemify</h1>
          <p>Envie mensagens, gerencie a agenda e alimente o CRM direto do seu sistema.</p>
        </section>

        <div className="docs__layout">
          <aside className="docs__side" aria-label="Navegação da API" ref={side}>
            <div className="docs__group">
              <h3>Começo</h3>
              {BASICS.map(([id, label]) => link(id, label))}
            </div>
            {endpoints.map((g) => (
              <div key={g.group} className="docs__group">
                <h3>{g.group}</h3>
                {g.items.map((e) => link(e.id, e.title))}
              </div>
            ))}
          </aside>

          <div className="docs__content dapi dapi--page">
            <section id="api-inicio" aria-labelledby="api-inicio-t">
              <span className="eyebrow">Primeiros passos</span>
              <h2 id="api-inicio-t" className="docs__h2">Integre em três passos</h2>
              <ol className="dsteps">
                <li><strong>Gere uma chave.</strong> No Lemify, vá em Configurações &gt; Chaves de API e escolha as permissões. Para mensagens, use o token do canal.</li>
                <li><strong>Faça a primeira chamada.</strong> Envie a chave no cabeçalho <code>Authorization: Bearer</code>.</li>
                <li><strong>Explore os endpoints.</strong> Abaixo há um resumo de cada um. A referência completa (OpenAPI) fica em <a href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">docs.lemify.com.br/api-docs</a>.</li>
              </ol>
              <Code>{QUICKSTART}</Code>
            </section>

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

            <h3 id="api-limites" className="dapi__h3">Limites de uso</h3>
            <p>Ao passar de um limite, a API responde <code>429</code> com o cabeçalho <code>Retry-After</code>, em segundos.</p>
            <div className="dtable">
              {LIMITS.map(([n, d]) => <div key={n}><span>{n}</span><span>{d}</span></div>)}
            </div>

            <h3 id="api-llms" className="dapi__h3">Para IA (llms.txt)</h3>
            <p>Vai integrar com a ajuda de um assistente de IA ou de um agente? Baixe um destes arquivos e passe para ele. São textos em Markdown, gerados da mesma especificação da API, com parâmetros, respostas e exemplos.</p>
            <div className="dllms">
              {LLMS.map((l) => (
                // Arquivo do próprio site: o atributo download salva direto, sem abrir aba nem sair da página
                <a key={l.id} className="dllms__item" href={l.url} download={l.file} aria-label={`Baixar ${l.title} (${l.file})`}>
                  <strong>{l.title}</strong>
                  <span>{l.text}</span>
                  <span className="dllms__file">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                    <code>{l.file}</code>
                  </span>
                </a>
              ))}
            </div>

            {endpoints.length === 0 && <p className="docs__empty">Nenhum endpoint encontrado para “{query}”.</p>}

            {endpoints.length > 0 && (
              <div className="dacc__bar">
                <button type="button" className="dacc__all" onClick={() => setOpen(allOpen ? new Set() : new Set(visibleIds))}>
                  {allOpen ? 'Recolher todos' : 'Expandir todos'}
                </button>
              </div>
            )}

            {endpoints.map((g) => (
              <section key={g.group} aria-label={g.group}>
                <h3 className="dapi__h3">{g.group}</h3>
                <p className="dapi__note">{g.note}</p>
                {g.items.map((e) => (
                  <details
                    className="dep"
                    id={e.id}
                    key={e.id}
                    open={open.has(e.id)}
                    onToggle={(ev) => setEndpointOpen(e.id, ev.currentTarget.open)}
                  >
                    <summary>
                      <span className={`method method--${e.method.toLowerCase()}`}>{e.method}</span>
                      <code className="dep__path">{e.path}</code>
                      <h4 id={`${e.id}-t`}>{e.title}</h4>
                      <svg className="dep__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </summary>
                    <div className="dep__body">
                      <p>{e.text}</p>
                      <p className="dep__auth">Autenticação: <strong>{e.auth}</strong></p>
                      {e.fields.length > 0 && (
                        <div className="dfields">
                          {e.fields.map(([n, t, r, d]) => (
                            <div key={n}><code>{n}</code><span>{t} · {r}</span><p>{d}</p></div>
                          ))}
                        </div>
                      )}
                      <Code>{e.sample}</Code>
                    </div>
                  </details>
                ))}
              </section>
            ))}

            <h3 id="api-respostas" className="dapi__h3">Códigos de resposta</h3>
            <p>Erros vêm em JSON no formato <code>{'{ "error": "mensagem" }'}</code>.</p>
            <div className="dtable">
              {STATUS.map(([c, d]) => <div key={c}><code>{c}</code><span>{d}</span></div>)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
