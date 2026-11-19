import { useEffect, useRef, useState } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import '../institutional/site.css'
import './apiPage.css'
import { useScrollMotion, useSmoothScroll, ScrollTrigger, Magnetic, Words } from '../institutional/motion.jsx'
import Header, { Arrow } from '../institutional/Header.jsx'
import Footer from '../institutional/Footer.jsx'
import { SITE } from '../institutional/siteConfig.js'
import { API_FULL_REFERENCE } from '../docs/api.js'
import heroApi from './assets/hero-api.jpg'
import wabaTeam from './assets/waba-team.jpg'
import whatsappWeb from './assets/whatsapp-web.jpg'
import devWorkspace from './assets/dev-workspace.jpg'
import {
  API_HERO,
  API_CODE_SAMPLE,
  API_CHANNELS,
  API_WHY,
  API_COMPARISON,
  API_FAQ,
} from './apiPageData.js'

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
)

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
        {/* Hero leve com foto Pexels */}
        <section className="ap-hero" id="inicio" aria-labelledby="api-page-titulo">
          <div className="ap-hero__stage">
            <img
              src={heroApi}
              alt="Desenvolvedora trabalhando em estação com dois monitores de código"
              className="ap-hero__img"
              fetchPriority="high"
              decoding="async"
            />
            <div className="ap-hero__shade" aria-hidden="true" />

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
                  Documentação da API
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dois canais: API Oficial (Waba) e WhatsApp Web + outros canais */}
        <section className="ap-section ap-section--white" id="canais" aria-labelledby="ap-canais-titulo">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow" data-reveal>{API_CHANNELS.eyebrow}</span>
              <Words as="h2" id="ap-canais-titulo" className="h2" text={API_CHANNELS.title} />
            </div>

            <div className="ap-channels" data-stagger>
              <article className="ap-chan ap-chan--waba">
                <div className="ap-chan__media">
                  <img
                    src={wabaTeam}
                    alt="Equipe de tecnologia colaborando em mesa de escritório com notebooks"
                    loading="lazy"
                  />
                  <span className="ap-chan__badge">{API_CHANNELS.waba.badge}</span>
                </div>
                <div className="ap-chan__body">
                  <div className="ap-chan__top">
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
                </div>
              </article>

              <article className="ap-chan ap-chan--web">
                <div className="ap-chan__media">
                  <img
                    src={whatsappWeb}
                    alt="Pessoa usando smartphone e notebook com código aberto na mesa"
                    loading="lazy"
                  />
                  <span className="ap-chan__badge">{API_CHANNELS.web.badge}</span>
                </div>
                <div className="ap-chan__body">
                  <div className="ap-chan__top">
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
                </div>
              </article>
            </div>

            <div className="ap-more" data-reveal>
              <span className="ap-more__label">{API_CHANNELS.omnichannelLabel}</span>
              <div className="ap-more__grid">
                {API_CHANNELS.omnichannel.map((c) => (
                  <div className="ap-more__item" key={c.name}>
                    <strong>{c.name}</strong>
                    <p>{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integração simples + foto + exemplo de código */}
        <section className="ap-section" id="diferenciais" aria-labelledby="ap-why-titulo">
          <div className="wrap ap-dev__grid">
            <div className="ap-dev__visual" data-reveal>
              <div className="ap-dev__photo">
                <img
                  src={devWorkspace}
                  alt="Desenvolvedor analisando código em notebook e monitor em estúdio iluminado"
                  loading="lazy"
                />
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
            </div>

            <div className="ap-dev__copy">
              <span className="eyebrow" data-reveal>{API_WHY.eyebrow}</span>
              <Words as="h2" id="ap-why-titulo" className="h2" text={API_WHY.title} />
              <p className="ap-dev__lead" data-reveal>{API_WHY.lead}</p>

              <div className="ap-points" data-stagger>
                {API_WHY.pillars.map((item) => (
                  <div key={item.n} className="ap-point">
                    <span className="ap-point__n">{item.n}</span>
                    <div>
                      <h3>{item.t}</h3>
                      <p>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ap-dev__links" data-reveal>
                <a className="btn btn--dark btn--sm" href="/docs/api">Docs da API <Arrow /></a>
                <a className="btn btn--ghost btn--sm" href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">OpenAPI / Swagger</a>
                <a className="btn btn--ghost btn--sm" href="/api-llms/lemify-api-llms.txt" download="lemify-api-llms.txt">llms.txt</a>
              </div>
            </div>
          </div>
        </section>

        {/* Comparativo rápido */}
        <section className="ap-section ap-section--white" id="comparativo" aria-labelledby="ap-comp-titulo">
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

        {/* Perguntas frequentes */}
        <section className="faq" id="perguntas-api" aria-labelledby="ap-faq-titulo">
          <div className="wrap faq__in">
            <div className="head">
              <span className="eyebrow" data-reveal>Perguntas frequentes</span>
              <Words as="h2" id="ap-faq-titulo" className="h2" text="Dúvidas sobre a API Oficial (Waba) e canais" />
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
            <Words as="h2" id="ap-cta-titulo" text="Conecte WhatsApp, Instagram, TikTok e Telegram pelo Lemify." />
            <p data-reveal>
              Fale com a nossa equipe para escolher entre WhatsApp Web e API Oficial (Waba) ou migrar seu número para o Lemify.
            </p>
            <div className="ap-cta__actions" data-reveal>
              <Magnetic>
                <a className="btn btn--lime btn--lg" href={SITE.apiContact} target="_blank" rel="noopener noreferrer">
                  Falar sobre a API <Arrow />
                </a>
              </Magnetic>
              <a className="btn btn--outline-light btn--lg" href="/docs/api">
                Ver documentação
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
