import { useEffect, useRef, useState } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import '../institutional/site.css'
import './apiPage.css'
import { useScrollMotion, useSmoothScroll, ScrollTrigger, Magnetic, Tilt, Words } from '../institutional/motion.jsx'
import Header, { Arrow } from '../institutional/Header.jsx'
import Footer from '../institutional/Footer.jsx'
import { SITE } from '../institutional/siteConfig.js'
import { API_FULL_REFERENCE } from '../docs/api.js'
import metaPartner from '../institutional/assets/meta-partner.png'
import metaLogo from '../institutional/assets/integrations/meta.svg'
import {
  API_HERO,
  API_CODE_SAMPLE,
  API_CHANNELS,
  API_WHY,
  API_CAPABILITIES,
  API_COMPARISON,
  API_AUDIENCES,
  API_STEPS,
  API_FAQ,
} from './apiPageData.js'

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
)

const CAP_ICONS = [
  // Send messages
  <svg key="send" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z" />
  </svg>,
  // Webhooks
  <svg key="hook" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>,
  // Embedded Signup + Coexistence
  <svg key="sync" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="8" height="14" rx="2" />
    <rect x="13" y="6" width="8" height="14" rx="2" />
  </svg>,
  // Templates
  <svg key="tpl" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M7 9h10M7 13h7" />
  </svg>,
  // Calling + CAPI
  <svg key="call" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>,
  // Ecosystem (Agenda + CRM)
  <svg key="eco" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
  </svg>,
]

export default function ApiPage() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  useScrollMotion(root)
  useSmoothScroll()

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [])

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(API_CODE_SAMPLE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* sem permissão de área de transferência */
    }
  }

  return (
    <div className="inst apipage" ref={root}>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <Header />

      <main id="conteudo">
        {/* Hero */}
        <section className="ap-hero" id="inicio" aria-labelledby="api-page-titulo">
          <div className="ap-hero__stage">
            <div className="ap-hero__grid-bg" aria-hidden="true" />
            <nav className="ap-crumbs" aria-label="Caminho">
              <a href="/">Início</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">API de Mensageria</span>
            </nav>

            <div className="ap-hero__inner">
              <div className="ap-hero__copy">
                <span className="eyebrow">{API_HERO.eyebrow}</span>
                <h1 id="api-page-titulo" className="ap-hero__title">
                  <Words text={API_HERO.h1} />
                </h1>
                <p className="ap-hero__lead">{API_HERO.lead}</p>
                <div className="ap-hero__cta">
                  <Magnetic>
                    <a className="btn btn--lime" href={SITE.apiContact} target="_blank" rel="noopener noreferrer">
                      Falar sobre a API <Arrow />
                    </a>
                  </Magnetic>
                  <a className="btn btn--glass" href="/docs/api">
                    Ver documentação técnica
                  </a>
                </div>
                <ul className="ap-hero__checks">
                  {API_HERO.highlights.map((item) => (
                    <li key={item}><Check /><span>{item}</span></li>
                  ))}
                </ul>
              </div>

              <aside className="ap-panel" aria-label="Arquitetura da API de mensageria do Lemify">
                <div className="ap-panel__top">
                  <span className="ap-panel__badge">
                    <img src={metaPartner} alt="Meta Business Partner — selo oficial" />
                  </span>
                  <span className="ap-panel__status">
                    <i className="ap-panel__dot" aria-hidden="true" />
                    WhatsApp Web + WABA
                  </span>
                </div>

                <div className="ap-flow">
                  {API_HERO.architecture.map((node, idx) => (
                    <div key={node.step} className={`ap-flow__node ${idx === 1 ? 'ap-flow__node--mid' : ''}`}>
                      <span className="ap-flow__num">{node.step}</span>
                      <div>
                        <strong>{node.title}</strong>
                        <span>{node.detail}</span>
                      </div>
                      {idx === 2 && <img className="ap-flow__meta" src={metaLogo} alt="Meta" />}
                    </div>
                  ))}
                </div>

                <div className="ap-code">
                  <div className="ap-code__bar">
                    <code>POST /v1/messages/send</code>
                    <button type="button" className="ap-code__copy" onClick={copyCode} aria-label="Copiar exemplo de chamada da API">
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <pre><code>{API_CODE_SAMPLE}</code></pre>
                </div>

                <div className="ap-chips" aria-label="Modos e recursos suportados">
                  {API_HERO.chips.map((c) => <span key={c}>{c}</span>)}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Dois canais: WABA e WhatsApp Web */}
        <section className="ap-section ap-section--white" id="canais-mensageria" aria-labelledby="ap-canais-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow" data-reveal>{API_CHANNELS.eyebrow}</span>
              <Words as="h2" id="ap-canais-titulo" className="h2" text={API_CHANNELS.title} />
              <p className="head__p" data-reveal>{API_CHANNELS.lead}</p>
            </div>

            <div className="ap-channels" data-stagger>
              <article className="ap-chan ap-chan--waba">
                <div className="ap-chan__top">
                  <div className="ap-chan__head">
                    <span className="ap-chan__badge">{API_CHANNELS.waba.badge}</span>
                    <img className="ap-chan__meta" src={metaLogo} alt="Meta" loading="lazy" />
                  </div>
                  <h3>{API_CHANNELS.waba.title}</h3>
                  <p className="ap-chan__desc">{API_CHANNELS.waba.description}</p>
                  <ul className="ap-chan__list">
                    {API_CHANNELS.waba.features.map((f) => (
                      <li key={f}><Check /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="ap-chan__foot">
                  <Magnetic>
                    <a className="btn btn--lime" href={SITE.apiFor(API_CHANNELS.waba.extra)} target="_blank" rel="noopener noreferrer">
                      {API_CHANNELS.waba.cta} <Arrow />
                    </a>
                  </Magnetic>
                </div>
              </article>

              <article className="ap-chan ap-chan--web">
                <div className="ap-chan__top">
                  <div className="ap-chan__head">
                    <span className="ap-chan__badge">{API_CHANNELS.web.badge}</span>
                  </div>
                  <h3>{API_CHANNELS.web.title}</h3>
                  <p className="ap-chan__desc">{API_CHANNELS.web.description}</p>
                  <ul className="ap-chan__list">
                    {API_CHANNELS.web.features.map((f) => (
                      <li key={f}><Check /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="ap-chan__foot">
                  <p className="ap-chan__note">{API_CHANNELS.web.note}</p>
                  <Magnetic>
                    <a className="btn btn--dark" href={SITE.apiFor(API_CHANNELS.web.extra)} target="_blank" rel="noopener noreferrer">
                      {API_CHANNELS.web.cta} <Arrow />
                    </a>
                  </Magnetic>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Por que a API da Lemify */}
        <section className="ap-section" id="diferenciais-api" aria-labelledby="ap-why-titulo">
          <div className="wrap ap-why__grid">
            <div className="ap-why__side">
              <span className="eyebrow" data-reveal>{API_WHY.eyebrow}</span>
              <Words as="h2" id="ap-why-titulo" className="h2" text={API_WHY.title} />
              <p data-reveal>{API_WHY.intro}</p>
              <p data-reveal>{API_WHY.body}</p>
            </div>
            <div className="ap-pillars" data-stagger>
              {API_WHY.pillars.map((item, k) => (
                <article key={item.n} className={`ap-pillar ap-pillar--${k + 1}`}>
                  <span className="ap-pillar__n">{item.n}</span>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Recursos técnicos */}
        <section className="ap-section ap-section--white" id="recursos-api" aria-labelledby="ap-caps-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow" data-reveal>{API_CAPABILITIES.eyebrow}</span>
              <Words as="h2" id="ap-caps-titulo" className="h2" text={API_CAPABILITIES.title} />
              <p className="head__p" data-reveal>{API_CAPABILITIES.lead}</p>
            </div>

            <div className="ap-caps" data-stagger>
              {API_CAPABILITIES.items.map((item, idx) => (
                <article key={item.t} className="ap-cap">
                  <div className="ap-cap__top">
                    <span className="ap-cap__ico">{CAP_ICONS[idx]}</span>
                    <span className="ap-cap__k">{item.k}</span>
                  </div>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </article>
              ))}
            </div>

            <div className="ap-devbar" data-reveal>
              <div className="ap-devbar__copy">
                <strong>Documentação aberta para desenvolvedores e agentes de IA</strong>
                <p>Explore endpoints REST, especificação OpenAPI (Swagger) e arquivos llms.txt prontos para acelerar sua integração.</p>
              </div>
              <div className="ap-devbar__links">
                <a className="btn btn--lime btn--sm" href="/docs/api">Docs da API <Arrow /></a>
                <a className="btn btn--outline-light btn--sm" href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">OpenAPI / Swagger</a>
                <a className="btn btn--outline-light btn--sm" href="/api-llms/lemify-api-llms.txt" download="lemify-api-llms.txt">Baixar llms.txt</a>
              </div>
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section className="ap-section" id="para-quem-api" aria-labelledby="ap-aud-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow" data-reveal>{API_AUDIENCES.eyebrow}</span>
              <Words as="h2" id="ap-aud-titulo" className="h2" text={API_AUDIENCES.title} />
              <p className="head__p" data-reveal>{API_AUDIENCES.lead}</p>
            </div>

            <div className="ap-aud" data-stagger>
              {API_AUDIENCES.items.map((item, idx) => (
                <Tilt key={item.tag} max={4} className={`ap-aud__card ap-aud__card--${idx + 1}`}>
                  <div>
                    <span className="ap-aud__tag">{item.tag}</span>
                    <h3>{item.t}</h3>
                    <p>{item.d}</p>
                  </div>
                  <a className="ap-aud__link" href={SITE.apiFor(item.extra)} target="_blank" rel="noopener noreferrer">
                    {item.cta} <Arrow />
                  </a>
                </Tilt>
              ))}
            </div>
          </div>
        </section>

        {/* Comparativo transparente */}
        <section className="ap-section ap-section--white" id="comparativo-api" aria-labelledby="ap-comp-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow" data-reveal>{API_COMPARISON.eyebrow}</span>
              <Words as="h2" id="ap-comp-titulo" className="h2" text={API_COMPARISON.title} />
              <p className="head__p" data-reveal>{API_COMPARISON.lead}</p>
            </div>

            <div className="ap-table-wrap" data-reveal>
              <table className="ap-table">
                <thead>
                  <tr>
                    {API_COMPARISON.headers.map((h, i) => (
                      <th key={h} scope="col" className={i === 1 ? 'is-lemify' : undefined}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {API_COMPARISON.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={`${row[0]}-${i}`} className={i === 1 ? 'is-lemify' : undefined}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="ap-table__note">{API_COMPARISON.footnote}</p>
          </div>
        </section>

        {/* Como começar + Cobrança */}
        <section className="ap-section" id="como-comecar-api" aria-labelledby="ap-steps-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow" data-reveal>{API_STEPS.eyebrow}</span>
              <Words as="h2" id="ap-steps-titulo" className="h2" text={API_STEPS.title} />
            </div>

            <div className="ap-steps" data-stagger>
              {API_STEPS.steps.map((s) => (
                <article key={s.n} className="ap-step">
                  <span className="ap-step__n">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>

            <div className="ap-billing" data-reveal>
              <div className="ap-billing__copy">
                <h3>{API_STEPS.billingTitle}</h3>
                <p>{API_STEPS.billingBody}</p>
              </div>
              <Magnetic>
                <a className="btn btn--dark" href={SITE.apiFor('Quero entender os valores para WhatsApp Web e WABA.')} target="_blank" rel="noopener noreferrer">
                  Solicitar proposta da API <Arrow />
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Perguntas frequentes */}
        <section className="faq" id="perguntas-api" aria-labelledby="ap-faq-titulo">
          <div className="wrap faq__in">
            <div className="head">
              <span className="eyebrow" data-reveal>Perguntas frequentes</span>
              <Words as="h2" id="ap-faq-titulo" className="h2" text="Dúvidas sobre a API de mensageria, WhatsApp Web e WABA" />
            </div>
            <div className="faq__list">
              {API_FAQ.map((f) => (
                <details className="faq__item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="ap-cta" aria-labelledby="ap-cta-titulo">
          <div className="wrap ap-cta__in">
            <span className="eyebrow" data-reveal>API de Mensageria · WhatsApp Web e WABA</span>
            <Words as="h2" id="ap-cta-titulo" text="Pronto para integrar WhatsApp ao seu sistema com suporte no Brasil?" />
            <p data-reveal>
              Converse com o nosso time para escolher entre WhatsApp Web e WABA oficial, migrar seu número de outro provedor ou unir a API à plataforma Lemify.
            </p>
            <div className="ap-cta__actions" data-reveal>
              <Magnetic>
                <a className="btn btn--lime btn--lg" href={SITE.apiContact} target="_blank" rel="noopener noreferrer">
                  Falar sobre a API <Arrow />
                </a>
              </Magnetic>
              <a className="btn btn--outline-light btn--lg" href="/docs/api">
                Explorar documentação técnica
              </a>
            </div>
            <a className="ap-cta__sublink" href={SITE.productPage}>
              Também procura caixa única, CRM e agentes de IA? Conheça o Lemify →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
