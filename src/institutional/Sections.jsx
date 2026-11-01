import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, Magnetic, Tilt, Words, prefersReducedMotion } from './motion.jsx'
import { Arrow } from './Header.jsx'
import intMeli from './assets/integrations/meli.png'
import intOmie from './assets/integrations/omie.png'
import intTiny from './assets/integrations/tiny.webp'
import intBling from './assets/integrations/bling.svg'
import intNuvem from './assets/integrations/nuvemshop.png'
import intShopify from './assets/integrations/shopify.svg'
import intContaAzul from './assets/integrations/conta-azul.svg'
import intAsaas from './assets/integrations/asaas.svg'
import intMeta from './assets/integrations/meta.svg'
import intGoogle from './assets/integrations/google.svg'
import intTiktok from './assets/integrations/tiktok.svg'
import intIfood from './assets/integrations/ifood.svg'
import { STEPS, SITE } from './siteConfig.js'
import { FAQ } from './faq.js'
import crew from './assets/crew.webp'
import lemi from './assets/lemi.webp'
import maia from './assets/maia.webp'
import theo from './assets/theo.webp'
import otto from './assets/otto.webp'
import nico from './assets/nico.webp'
import iris from './assets/iris.webp'
import icVarejo from './assets/segments/varejo.png'
import icClinicas from './assets/segments/clinicas.png'
import icRestaurantes from './assets/segments/restaurantes.png'
import icImobiliarias from './assets/segments/imobiliarias.png'
import icBeleza from './assets/segments/beleza.png'
import icAtacado from './assets/segments/atacado.png'
import icServicos from './assets/segments/servicos.png'

/* ───────────── Integrações: carrossel de logos ───────────── */
const INTEGRATIONS = [
  { name: 'Meta', src: intMeta, w: 118 },
  { name: 'Google', src: intGoogle, w: 104 },
  { name: 'TikTok', src: intTiktok, w: 124 },
  { name: 'iFood', src: intIfood, w: 70 },
  { name: 'Mercado Livre', src: intMeli, w: 130 },
  { name: 'Shopify', src: intShopify, w: 118 },
  { name: 'Nuvemshop', src: intNuvem, w: 150 },
  { name: 'Bling', src: intBling, w: 78 },
  { name: 'Omie', src: intOmie, w: 104 },
  { name: 'Conta Azul', src: intContaAzul, w: 156 },
  { name: 'Asaas', src: intAsaas, w: 140 },
  { name: 'Tiny ERP', src: intTiny, w: 64 },
]

export function Integrations() {
  // Dois conjuntos idênticos por metade da pista: o loop (-50%) fica sem emenda.
  const half = [...INTEGRATIONS, ...INTEGRATIONS]
  return (
    <section className="integ" aria-label="Integrações">
      <p className="integ__label" data-reveal>O Lemify conversa com as ferramentas que você já usa</p>
      <div className="integ__view">
        <div className="integ__track">
          {[...half, ...half].map((l, i) => (
            <div className={`integ__item ${i >= INTEGRATIONS.length ? 'is-dup' : ''}`} key={i} aria-hidden={i >= INTEGRATIONS.length}>
              <img src={l.src} alt={i < INTEGRATIONS.length ? l.name : ''} title={l.name} style={{ '--w': `${l.w}px` }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Segmentos: carrossel de cartões ───────────── */
// Ícones do Icons8, um por tipo de negócio.
const ICONS = { varejo: icVarejo, clinicas: icClinicas, restaurantes: icRestaurantes, imobiliarias: icImobiliarias, beleza: icBeleza, atacado: icAtacado, servicos: icServicos }

const SEGMENTS = [
  { n: 'Varejo', ic: 'varejo', d: 'Responde dúvidas de estoque, preço e entrega e leva o cliente até a compra.', c: '#f6e3a1' },
  { n: 'Clínicas', ic: 'clinicas', d: 'Agenda, confirma e remarca consultas sem a recepção parar para responder.', c: '#9fd8e6' },
  { n: 'Restaurantes', ic: 'restaurantes', d: 'Atende pedidos e dúvidas de cardápio no horário de pico, sem fila.', c: '#f2a98e' },
  { n: 'Imobiliárias', ic: 'imobiliarias', d: 'Responde interessados, qualifica o contato e marca visitas.', c: '#e6d8b8' },
  { n: 'Beleza e estética', ic: 'beleza', d: 'Preenche a agenda, lembra o cliente do horário e reativa quem sumiu.', c: '#f3cf6e' },
  { n: 'Atacado', ic: 'atacado', d: 'Mantém cadastros, tabelas e pedidos recorrentes em dia.', c: '#b8e6dc' },
  { n: 'Serviços', ic: 'servicos', d: 'Cuida de orçamentos, ordens de serviço e agenda em minutos.', c: '#c5d0d8' },
]

/** Segmentos atendidos: carrossel de cartões com rolagem por toque, setas e avanço automático (pausa com o mouse ou o foco). */
export function Products() {
  const track = useRef(null)
  const paused = useRef(false)
  const [edge, setEdge] = useState({ start: true, end: false })

  const sync = () => {
    const t = track.current
    if (t) setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 })
  }
  const step = (dir) => {
    const t = track.current
    const card = t?.querySelector('.seg')
    if (!card) return
    t.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    sync()
    const t = track.current
    const id = setInterval(() => {
      if (paused.current || prefersReducedMotion() || !t) return
      if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 8) t.scrollTo({ left: 0, behavior: 'smooth' })
      else step(1)
    }, 4500)
    window.addEventListener('resize', sync)
    return () => { clearInterval(id); window.removeEventListener('resize', sync) }
  }, [])

  return (
    <section className="products" id="produtos" aria-labelledby="produtos-titulo">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow" data-reveal>Segmentos</span>
          <Words as="h2" id="produtos-titulo" className="h2" text="Uma solução com IA para cada tipo de negócio" />
          <p className="head__p" data-reveal>Cada segmento tem uma rotina. Os agentes se adaptam à sua.</p>
        </div>
      </div>

      <div className="segs" data-reveal
        onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}
        onFocus={() => { paused.current = true }} onBlur={() => { paused.current = false }}>
        <ul className="segs__track" ref={track} onScroll={sync} aria-label="Segmentos atendidos">
          {SEGMENTS.map((s, k) => (
            <li className="seg" key={s.n} style={{ '--c': s.c }}>
              <span className="seg__n">{String(k + 1).padStart(2, '0')}</span>
              <h3>{s.n}</h3>
              <p>{s.d}</p>
              <span className="seg__ic" aria-hidden="true"><img src={ICONS[s.ic]} alt="" loading="lazy" /></span>
            </li>
          ))}
        </ul>
        <div className="segs__nav">
          <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Segmento anterior"><Arrow /></button>
          <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Próximo segmento"><Arrow /></button>
        </div>
      </div>
    </section>
  )
}


/* ───────────── Agentes: painel sticky troca com o scroll ───────────── */
const AGENTS = [
  { n: 'Lemi', r: 'Agente principal', d: 'Atende na hora, em todos os canais.', img: lemi, alt: 'Lemi, mascote amarelo de moletom verde, acenando' },
  { n: 'Maia', r: 'Agendamento', d: 'Agenda, confirma e remarca compromissos.', img: maia, alt: 'Maia, mascote azul de laço lima, piscando' },
  { n: 'Theo', r: 'Vendas', d: 'Mantém o funil e as negociações em dia.', img: theo, alt: 'Theo, mascote verde-sálvia de gravata' },
  { n: 'Otto', r: 'Cadastro', d: 'Completa os dados de cada cliente.', img: otto, alt: 'Otto, mascote rosa com as mãos no rosto' },
  { n: 'Nico', r: 'Retorno', d: 'Retoma quem parou de responder.', img: nico, alt: 'Nico, mascote pêssego de jaqueta verde, sorrindo' },
  { n: 'Íris', r: 'Relatórios', d: 'Transforma conversas em informação para decidir.', img: iris, alt: 'Íris, mascote lilás de óculos, pensativa' },
]

export function Agents() {
  const root = useRef(null)
  const [on, setOn] = useState(0)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.agent').forEach((row, k) => {
        ScrollTrigger.create({
          trigger: row, start: 'top 55%', end: 'bottom 55%',
          onToggle: (s) => { if (s.isActive) setOn(k) },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="agents" id="agentes" ref={root} aria-labelledby="agentes-titulo" style={{ '--ac': AGENTS[on].c }}>
      <div className="wrap agents__grid">
        <div className="agents__stick">
          <span className="eyebrow" data-reveal>Agentes</span>
          <Words as="h2" id="agentes-titulo" className="h2" text="Soluções em IA com nome, personalidade e função" />
          <p data-reveal>Cada agente cuida de uma parte do trabalho e, juntos, acompanham o cliente da primeira mensagem ao pós-venda.</p>
        </div>
        <ul className="agents__list">
          {AGENTS.map((a, k) => (
            <li key={a.n} className={`agent ${k === on ? 'is-on' : ''}`} onMouseEnter={() => setOn(k)} style={{ '--c': a.c }}>
              <img src={a.img} alt={a.alt} className="agent__img" loading="lazy" />
              <span className="agent__idx">0{k + 1}</span>
              <div>
                <h3>{a.n}</h3>
                <b>{a.r}</b>
                <p>{a.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────── Suporte: cartões sticky empilhados (mesmo efeito de Produtos) ───────────── */
const STEP_TONES = ['lime', 'cream', 'mint', 'dark']
export function Support() {
  const root = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.scard')
      cards.forEach((card, k) => {
        const next = cards[k + 1]
        if (!next) return
        gsap.to(card.querySelector('.scard__in'), {
          scale: 0.92, opacity: 0.55, ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 20%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="support" id="suporte" ref={root} aria-labelledby="suporte-titulo">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow" data-reveal>Nosso jeito de trabalhar</span>
          <Words as="h2" id="suporte-titulo" className="h2" text="Do primeiro dia em diante, a gente está junto." />
          <p className="head__p" data-reveal>Na implantação guiada, a gente acompanha cada etapa com você, e todo cliente conta com suporte de gente de verdade.</p>
        </div>
        <ol className="sstack">
          {STEPS.map((s, k) => (
            <li className={`scard scard--${STEP_TONES[k]}`} key={s.t} style={{ '--i': k }}>
              <div className="scard__in">
                <span className="scard__n">{k < 3 ? k + 1 : '✓'}</span>
                <div>
                  <small>{s.k}</small>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────── Perguntas frequentes ───────────── */
export function Faq() {
  return (
    <section className="faq" id="perguntas" aria-labelledby="faq-titulo">
      <div className="wrap faq__in">
        <div className="head">
          <span className="eyebrow" data-reveal>Perguntas frequentes</span>
          <Words as="h2" id="faq-titulo" className="h2" text="Tudo o que você precisa saber sobre o Lemify" />
        </div>
        <div className="faq__list">
          {FAQ.map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Contato ───────────── */
export function Contact() {
  const root = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.contact__crew', {
        yPercent: 35, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'bottom bottom', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="contact" id="contato" ref={root} aria-labelledby="contato-titulo">
      <div className="wrap contact__in">
        <Words as="h2" id="contato-titulo" className="display display--light" text="Vamos conversar?" />
        <p data-reveal>Conte o que a sua empresa precisa. A gente indica o produto certo e responde rapidinho.</p>
        <div className="contact__cta" data-reveal>
          <Magnetic><a className="btn btn--lime btn--lg" href={`${SITE.whatsappUrl}?text=${encodeURIComponent('Olá! Vim pelo site e quero conhecer o Lemify.')}`} target="_blank" rel="noopener noreferrer">Fale com a gente <Arrow /></a></Magnetic>
          <a className="btn btn--outline-light btn--lg" href={SITE.productPage}>Conhecer o Lemify</a>
        </div>
      </div>
      <img className="contact__crew" src={crew} alt="Os agentes do Lemify reunidos, em pé, aguardando o contato" loading="lazy" />
    </section>
  )
}
