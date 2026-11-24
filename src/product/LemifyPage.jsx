import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import '../institutional/site.css'
import './lemifyPage.css'
import { useScrollMotion, useSmoothScroll, ScrollTrigger, scrollToY } from '../institutional/motion.jsx'
import Header, { Arrow } from '../institutional/Header.jsx'
import Footer from '../institutional/Footer.jsx'
import { SITE } from '../institutional/siteConfig.js'
import {
  LEMIFY_HERO,
  CLIENT_LOGOS,
  PRODUCT_SHOWCASE,
  AI_AGENTS_SECTION,
  CASES_SECTION,
  PLANS_API_URL,
  PLANS_CACHE_KEY,
  PLANS_CACHE_TTL,
  DEFAULT_RAW_PLANS,
  buildPlansView,
  getLemifyFaq,
} from './lemifyPageData.js'

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
)

const Play = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

const readCachedPlans = () => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(PLANS_CACHE_KEY) || 'null')
    if (cached && Date.now() - cached.t < PLANS_CACHE_TTL && Array.isArray(cached.d)) {
      return { data: cached.d, fresh: true }
    }
  } catch {
    /* sessionStorage indisponível */
  }
  return { data: DEFAULT_RAW_PLANS, fresh: false }
}

const STACK_BASE = 84
const STACK_STEP = 46

export default function LemifyPage() {
  const root = useRef(null)
  const modalRef = useRef(null)
  const modalVideoRef = useRef(null)
  const caseVideoRef = useRef(null)
  const markRefs = useRef([])
  const scrollingToAgentRef = useRef(false)

  const [activeTabId, setActiveTabId] = useState(PRODUCT_SHOWCASE.tabs[0].id)
  const [activeAgentIdx, setActiveAgentIdx] = useState(0)
  const [billing, setBilling] = useState('annual')
  const [compareOpen, setCompareOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#comparar-planos',
  )
  const [caseVideoPlaying, setCaseVideoPlaying] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [rawPlans, setRawPlans] = useState(() => readCachedPlans().data)

  useScrollMotion(root)
  useSmoothScroll()

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [])

  // Sincroniza o agente ativo na barra lateral e a profundidade de empilhamento conforme a rolagem no desktop.
  useEffect(() => {
    let raf = 0
    const sync = () => {
      raf = 0
      if (window.innerWidth <= 900 || scrollingToAgentRef.current) return
      let next = 0
      for (let i = AI_AGENTS_SECTION.agents.length - 1; i >= 0; i -= 1) {
        const el = markRefs.current[i]
        if (!el) continue
        if (el.getBoundingClientRect().top <= STACK_BASE + i * STACK_STEP + 44) {
          next = i
          break
        }
      }
      setActiveAgentIdx((prev) => (prev === next ? prev : next))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync)
    }
    const unlock = () => {
      scrollingToAgentRef.current = false
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('wheel', unlock, { passive: true })
    window.addEventListener('touchstart', unlock, { passive: true })
    sync()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [])

  // Busca planos atualizados na API quando o cache de 15 minutos não está ativo (mantém fallback se falhar).
  useEffect(() => {
    if (readCachedPlans().fresh) return
    let cancelled = false
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null
    const timer = ctl ? setTimeout(() => ctl.abort(), 10000) : null

    fetch(PLANS_API_URL, ctl ? { signal: ctl.signal } : {})
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (timer) clearTimeout(timer)
        if (cancelled || !Array.isArray(data)) return
        setRawPlans(data)
        try {
          sessionStorage.setItem(PLANS_CACHE_KEY, JSON.stringify({ t: Date.now(), d: data }))
        } catch {
          /* ignora erro de quota */
        }
      })
      .catch(() => {
        if (timer) clearTimeout(timer)
      })

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      if (ctl) ctl.abort()
    }
  }, [])

  const plans = useMemo(() => buildPlansView(rawPlans), [rawPlans])
  const faqItems = useMemo(() => getLemifyFaq(plans.usersSummary), [plans.usersSummary])
  const activeTab = PRODUCT_SHOWCASE.tabs.find((t) => t.id === activeTabId) || PRODUCT_SHOWCASE.tabs[0]

  const goToAgent = (index) => {
    setActiveAgentIdx(index)
    if (window.innerWidth <= 900) return
    const mark = markRefs.current[index]
    if (!mark) return
    const targetY = mark.getBoundingClientRect().top + window.scrollY - (STACK_BASE + index * STACK_STEP) + 2
    scrollingToAgentRef.current = true
    scrollToY(targetY, {
      duration: 0.72,
      onComplete: () => {
        scrollingToAgentRef.current = false
      },
    })
  }

  const openCompare = (e) => {
    e?.preventDefault()
    setCompareOpen(true)
    requestAnimationFrame(() => {
      const el = document.getElementById('comparar-planos')
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 96
        scrollToY(y, { duration: 0.75 })
      }
    })
  }

  const openDemoVideo = () => {
    const dialog = modalRef.current
    const video = modalVideoRef.current
    if (!dialog || !dialog.showModal) return
    dialog.showModal()
    if (video) {
      video.currentTime = 0
      const p = video.play()
      if (p && p.catch) p.catch(() => { })
    }
  }

  const closeDemoVideo = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause()
    if (modalRef.current?.open) modalRef.current.close()
  }

  const playCaseVideo = () => {
    setCaseVideoPlaying(true)
    const video = caseVideoRef.current
    if (video) {
      const p = video.play()
      if (p && p.catch) p.catch(() => { })
    }
  }

  return (
    <div className="inst lemifypage" ref={root}>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <Header />

      <main id="conteudo">
        {/* Dobra 1 · Hero + prova social leve */}
        <section className="lp-hero" id="inicio" aria-labelledby="lemify-page-titulo">
          <div className="lp-hero__stage">
            <div className="lp-hero__copy">
              <span className="eyebrow">{LEMIFY_HERO.eyebrow}</span>
              <h1 id="lemify-page-titulo" className="lp-hero__title">{LEMIFY_HERO.h1}</h1>
              <p className="lp-hero__lead">{LEMIFY_HERO.lead}</p>
              <div className="lp-hero__cta">
                <a className="btn btn--lime" href={SITE.demo} target="_blank" rel="noopener noreferrer">
                  Ver como ficaria no meu WhatsApp <Arrow />
                </a>
              </div>
            </div>

            <div className="lp-hero__visual">
              <div className="lp-hero__frame">
                <div className="lp-hero__bar">
                  <span className="lp-hero__dots" aria-hidden="true"><span /><span /><span /></span>
                  <span className="lp-hero__pill"><i aria-hidden="true" />Resposta média em 10s</span>
                </div>
                <div className="lp-hero__media">
                  <picture>
                    <source media="(max-width: 760px)" srcSet={LEMIFY_HERO.screen.mobile} />
                    <img
                      src={LEMIFY_HERO.screen.desktop}
                      alt={LEMIFY_HERO.screen.alt}
                      className="lp-hero__screen"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                  <button
                    type="button"
                    className="lp-hero__play"
                    onClick={openDemoVideo}
                    aria-haspopup="dialog"
                    aria-label={`Assistir vídeo: ${LEMIFY_HERO.video.label}`}
                  >
                    <i><Play size={22} /></i>
                    <span>{LEMIFY_HERO.video.label}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-clients" aria-label="Empresas que usam o Lemify">
          <p className="lp-clients__label">Mais de 2 mil empresas atendem com o Lemify</p>
          <div className="lp-clients__view">
            <div className="lp-clients__track">
              {[0, 1].map((dup) =>
                CLIENT_LOGOS.map((logo) => (
                  <img
                    key={`${dup}-${logo.name}`}
                    src={logo.src}
                    alt={dup === 0 ? logo.name : ''}
                    aria-hidden={dup === 1 || undefined}
                    style={{ height: `${logo.h}px` }}
                    loading="lazy"
                  />
                )),
              )}
            </div>
          </div>
        </section>

        {/* Dobra 2 · O produto por dentro + integrações */}
        <section className="lp-section lp-section--white" id="por-dentro" aria-labelledby="lp-prod-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">{PRODUCT_SHOWCASE.eyebrow}</span>
              <h2 id="lp-prod-titulo" className="h2">{PRODUCT_SHOWCASE.title}</h2>
              <p className="head__p">{PRODUCT_SHOWCASE.lead}</p>
            </div>

            <div className="lp-tabs" role="tablist" aria-label="Telas do Lemify">
              {PRODUCT_SHOWCASE.tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab.id === tab.id}
                  className={activeTab.id === tab.id ? 'is-on' : undefined}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="lp-showcase" role="tabpanel">
              <div className="lp-showcase__copy">
                <h3>{activeTab.title}</h3>
                <p>{activeTab.description}</p>
                <ul className="lp-checks">
                  {activeTab.bullets.map((b) => (
                    <li key={b}><Check /><span>{b}</span></li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  className="lp-showcase__media"
                  href={activeTab.desktop}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir a tela ${activeTab.label} em tamanho real`}
                >
                  <picture>
                    <source media="(max-width: 760px)" srcSet={activeTab.mobile} />
                    <img src={activeTab.desktop} alt={activeTab.alt} loading="lazy" />
                  </picture>
                  <span className="lp-zoom-tag" aria-hidden="true">Ver tela inteira ↗</span>
                </a>
                <p className="lp-caption">{PRODUCT_SHOWCASE.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dobra 3 · Seis agentes de IA em cartões empilhados */}
        <section className="lp-section lp-section--agents" id="agentes" aria-labelledby="lp-agentes-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">{AI_AGENTS_SECTION.eyebrow}</span>
              <h2 id="lp-agentes-titulo" className="h2">{AI_AGENTS_SECTION.title}</h2>
              <p className="head__p">{AI_AGENTS_SECTION.lead}</p>
            </div>

            <div className="lp-stack">
              <nav
                className="lp-stack__rail"
                aria-label="Navegar pelos agentes de IA"
                style={{ '--active': activeAgentIdx }}
              >
                <span className="lp-stack__pill" aria-hidden="true" />
                {AI_AGENTS_SECTION.agents.map((agent, idx) => {
                  const selected = idx === activeAgentIdx
                  return (
                    <button
                      key={agent.id}
                      type="button"
                      className={`lp-stack__nav ${selected ? 'is-on' : ''}`}
                      aria-current={selected ? 'true' : undefined}
                      onClick={() => goToAgent(idx)}
                    >
                      <img
                        src={agent.avatar}
                        alt=""
                        className="lp-stack__nav-av"
                        style={{ background: agent.bg }}
                        loading="lazy"
                      />
                      <span>{agent.name}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="lp-stack__deck" style={{ '--total': AI_AGENTS_SECTION.agents.length }}>
                {AI_AGENTS_SECTION.agents.map((agent, idx) => {
                  const isActive = idx === activeAgentIdx
                  const depth = Math.max(0, activeAgentIdx - idx)
                  const isCovered = depth > 0
                  return (
                    <div
                      key={agent.id}
                      className="lp-scard-wrap"
                      ref={(el) => {
                        markRefs.current[idx] = el
                      }}
                      style={{
                        '--i': idx,
                        gridRow: `${idx + 1} / -1`,
                      }}
                    >
                      <article
                        className={`lp-scard ${isActive ? 'is-active' : ''} ${isCovered ? 'is-covered' : ''}`}
                        style={{
                          '--depth': depth,
                          background: agent.gradient,
                        }}
                      >
                        <button
                          type="button"
                          className="lp-scard__peek"
                          onClick={() => goToAgent(idx)}
                          aria-label={`Ver ${agent.name}, agente de ${agent.role.toLowerCase()}`}
                        >
                          <span className="lp-scard__peek-task">{agent.task}</span>
                          <span className="lp-scard__peek-id">
                            <strong>{agent.name}</strong>
                            <img src={agent.avatar} alt="" loading="lazy" />
                          </span>
                        </button>

                        <div className="lp-scard__body">
                          <div className="lp-scard__copy">
                            <h3>{agent.task}</h3>
                            <p>{agent.description}</p>
                            <a
                              className="btn btn--dark btn--sm lp-scard__cta"
                              href={SITE.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver na prática <Arrow />
                            </a>
                          </div>

                          <div className="lp-scard__identity">
                            <div>
                              <strong>{agent.name}</strong>
                              <span>Agente de {agent.role.toLowerCase()}</span>
                            </div>
                            <img
                              src={agent.avatar}
                              alt={agent.name}
                              className="lp-scard__av"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </article>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Dobra 4 · Resultados reais */}
        <section className="lp-section lp-section--white" id="cases" aria-labelledby="lp-cases-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">{CASES_SECTION.eyebrow}</span>
              <h2 id="lp-cases-titulo" className="h2">{CASES_SECTION.title}</h2>
              <p className="head__p">{CASES_SECTION.lead}</p>
            </div>

            <div className="lp-cases" data-stagger>
              {CASES_SECTION.cards.map((c) => (
                <figure className={`lp-case ${c.theme === 'dark' ? 'lp-case--dark' : ''}`} key={c.id}>
                  <div className="lp-case__top">
                    <img src={c.logo} alt={c.logoAlt} style={{ height: `${c.logoH}px`, width: 'auto' }} loading="lazy" />
                    {c.metric ? (
                      <div className="lp-case__metric">
                        <strong>{c.metric}</strong>
                        <span>{c.metricLabel}</span>
                      </div>
                    ) : (
                      <strong className="lp-case__headline">{c.headline}</strong>
                    )}
                    <blockquote>{c.quote}</blockquote>
                  </div>
                  <figcaption>
                    <strong>{c.company}</strong>
                    <span>{c.segment}</span>
                  </figcaption>
                </figure>
              ))}

              <figure className={`lp-video ${caseVideoPlaying ? 'is-playing' : ''}`}>
                <video
                  ref={caseVideoRef}
                  src={CASES_SECTION.video.src}
                  poster={CASES_SECTION.video.poster}
                  controls={caseVideoPlaying}
                  playsInline
                  preload="none"
                  aria-label={CASES_SECTION.video.label}
                  onPlay={() => setCaseVideoPlaying(true)}
                />
                {!caseVideoPlaying && (
                  <button
                    type="button"
                    className="lp-video__play"
                    onClick={playCaseVideo}
                    aria-label="Assistir depoimento em vídeo"
                  >
                    <i><Play size={20} /></i>
                    <span>Assistir depoimento</span>
                  </button>
                )}
              </figure>
            </div>
          </div>
        </section>

        {/* Dobra 5 · Planos (ao vivo da API) */}
        <section className="lp-section" id="planos" aria-labelledby="lp-planos-titulo">
          <div className="wrap">
            <div className="lp-plans-head">
              <div className="head">
                <span className="eyebrow">Planos</span>
                <h2 id="lp-planos-titulo" className="h2">Escolha o plano pelo volume do seu atendimento.</h2>
                <p className="head__p">Quer ver como o agente de IA atenderia na sua empresa antes de decidir? A gente mostra ao vivo.</p>
              </div>

              <div className="lp-bill" role="group" aria-label="Periodicidade de cobrança">
                <button
                  type="button"
                  className={billing === 'monthly' ? 'is-on' : undefined}
                  aria-pressed={billing === 'monthly'}
                  onClick={() => setBilling('monthly')}
                >
                  Mensal
                </button>
                <button
                  type="button"
                  className={billing === 'annual' ? 'is-on' : undefined}
                  aria-pressed={billing === 'annual'}
                  onClick={() => setBilling('annual')}
                >
                  Anual <em>30% OFF</em>
                </button>
              </div>
            </div>

            <div className="lp-plan-grid" data-stagger>
              {plans.mainPlans.map((plan) => (
                <article className={`lp-plan ${plan.featured ? 'lp-plan--featured' : ''}`} key={plan.code}>
                  <div className="lp-plan__top">
                    <h3>{plan.title}</h3>
                    {plan.featured && <span className="lp-plan__badge">Recomendado</span>}
                  </div>
                  <p className="lp-plan__desc">{plan.description}</p>
                  <div className="lp-plan__price">
                    <small>R$</small>
                    <strong>{billing === 'annual' ? plan.annual : plan.monthly}</strong>
                    <span>/mês</span>
                  </div>
                  <span className="lp-plan__note">
                    {billing === 'annual' ? 'no plano anual, com 30% de desconto' : `ou R$ ${plan.annual}/mês no anual`}
                  </span>

                  <a
                    className={`btn lp-plan__cta ${plan.featured ? 'btn--lime' : 'btn--dark'}`}
                    href={SITE.demoFor(`Tenho interesse no plano ${plan.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar demonstração <Arrow />
                  </a>

                  <div className="lp-plan__agents">
                    <span className="lp-avstack" aria-hidden="true">
                      {plan.agents.map((ag) => (
                        <img key={ag.slug} src={ag.avatar} alt="" style={{ background: ag.bg }} loading="lazy" />
                      ))}
                    </span>
                    <span>{plan.agentsText}</span>
                  </div>

                  <ul className="lp-checks">
                    {plan.bullets.map((b) => (
                      <li key={b}><Check /><span>{b}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className={`lp-compare ${compareOpen ? 'is-open' : ''}`} id="comparar-planos">
              <button
                type="button"
                className="lp-compare__toggle"
                aria-expanded={compareOpen}
                aria-controls="lp-compare-panel"
                onClick={() => setCompareOpen((v) => !v)}
              >
                <span className="lp-compare__label">
                  <strong>Comparar todos os recursos lado a lado</strong>
                  <span>Veja limites, agentes de IA e módulos incluídos em cada plano</span>
                </span>
                <span className="lp-compare__icon" aria-hidden="true">+</span>
              </button>

              {compareOpen && (
                <div className="lp-compare__panel" id="lp-compare-panel">
                  <div className="lp-cmp-wrap">
                    <table className="lp-cmp-table">
                      <thead>
                        <tr>
                          <th scope="col">Recurso</th>
                          {plans.mainPlans.map((p) => (
                            <th key={p.code} scope="col" className={p.featured ? 'is-featured' : undefined}>
                              {p.title}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {plans.comparisonGroups.map((section, sIdx) => (
                          <Fragment key={section.group || sIdx}>
                            {section.group && (
                              <tr className="lp-cmp-group">
                                <th scope="rowgroup" colSpan={plans.mainPlans.length + 1}>
                                  {section.group}
                                </th>
                              </tr>
                            )}
                            {section.rows.map((row) => (
                              <tr key={`${section.group || 'base'}-${row.label}`}>
                                <th scope="row">{row.label}</th>
                                {row.values.map((val, cIdx) => {
                                  const featured = plans.mainPlans[cIdx]?.featured
                                  return (
                                    <td key={cIdx} className={featured ? 'is-featured' : undefined}>
                                      {typeof val === 'boolean' ? (
                                        val ? (
                                          <span className="lp-cmp-yes" aria-label="Incluído">
                                            <Check />
                                          </span>
                                        ) : (
                                          <span className="lp-cmp-no" aria-label="Não incluído">–</span>
                                        )
                                      ) : (
                                        val
                                      )}
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dobra 6 · Dúvidas frequentes + CTA Final */}
        <section className="faq" id="duvidas" aria-labelledby="lp-faq-titulo">
          <div className="wrap faq__in">
            <div className="head">
              <span className="eyebrow">Dúvidas</span>
              <h2 id="lp-faq-titulo" className="h2">Dúvidas antes de começar.</h2>
            </div>
            <div className="faq__list">
              {faqItems.map((item, idx) => (
                <details
                  className="faq__item"
                  key={item.q}
                  open={openFaq === idx}
                  onToggle={(e) => {
                    if (e.currentTarget.open && openFaq !== idx) setOpenFaq(idx)
                  }}
                >
                  <summary
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenFaq((cur) => (cur === idx ? null : idx))
                    }}
                  >
                    {item.q}
                  </summary>
                  <p>
                    {item.a}
                    {item.link && (
                      <a
                        className="lp-faq-link"
                        href={item.link.href}
                        onClick={item.link.href === '#comparar-planos' ? openCompare : undefined}
                      >
                        {item.link.label} <Arrow />
                      </a>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-cta" aria-labelledby="lp-cta-titulo">
          <div className="wrap lp-cta__in">
            <h2 id="lp-cta-titulo">Quer que a gente mostre como ficaria aí?</h2>
            <p>
              Agende uma demonstração rápida e veja um agente de IA respondendo no cenário da sua empresa. Planos a partir de R$ {billing === 'annual' ? plans.minAnnualPrice : plans.minPrice} por mês{billing === 'annual' ? ' no plano anual' : ''}, sem fidelidade.
            </p>
            <div className="lp-cta__actions">
              <a className="btn btn--lime btn--lg" href={SITE.demo} target="_blank" rel="noopener noreferrer">
                Ver como ficaria no meu WhatsApp <Arrow />
              </a>
              <a className="btn btn--outline-light btn--lg" href="#comparar-planos" onClick={openCompare}>
                Comparar planos
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <dialog
        ref={modalRef}
        className="lp-modal"
        aria-label="Vídeo: o que é o Lemify, em 2 minutos"
        onClick={(e) => {
          if (e.target === modalRef.current) closeDemoVideo()
        }}
        onClose={() => {
          if (modalVideoRef.current) modalVideoRef.current.pause()
        }}
      >
        <div className="lp-modal__box">
          <button type="button" className="lp-modal__close" onClick={closeDemoVideo} aria-label="Fechar o vídeo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </button>
          <video
            ref={modalVideoRef}
            src={LEMIFY_HERO.video.src}
            poster={LEMIFY_HERO.video.poster}
            controls
            playsInline
            preload="none"
          />
        </div>
      </dialog>
    </div>
  )
}
