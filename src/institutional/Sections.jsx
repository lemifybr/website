import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, Magnetic, Tilt, Words, prefersReducedMotion } from './motion.jsx'
import { Arrow } from './Header.jsx'
import ProductMock from './ProductMock.jsx'
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
import { VALUES, STEPS, SITE } from './siteConfig.js'
import retail from './assets/retail.jpg'
import food from './assets/food.jpg'
import clinic from './assets/clinic.jpg'
import crew from './assets/crew.webp'
import lemi from './assets/lemi.webp'
import maia from './assets/maia.webp'
import theo from './assets/theo.webp'
import otto from './assets/otto.webp'
import nico from './assets/nico.webp'
import iris from './assets/iris.webp'

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

/* ───────────── Produtos: cartões sticky empilhados ───────────── */
const PRODUCTS = [
  { id: 'lemify', status: '', ok: true, name: 'Lemify', sub: 'Atendimento e CRM', short: 'Atendimento, CRM e agentes de IA para quem vende.', mock: true, img: retail, alt: 'Atendente de loja finalizando uma venda pelo celular do cliente',
    d: 'Para empresas que vendem e atendem por conversa, com todos os canais numa caixa só e agentes de IA trabalhando junto com a equipe.', cta: 'Conhecer o Lemify', href: SITE.productPage },
  { id: 'food', status: '', sub: 'Restaurantes e delivery', short: 'Para restaurantes, lanchonetes e delivery.', name: 'LemiFood', words: ['Lemi', 'Food'], img: food, alt: 'Balcão de restaurante com sistema de pedidos',
    d: 'Para restaurantes, lanchonetes e delivery.', cta: 'Conhecer', href: '#contato' },
  { id: 'clinic', status: '', sub: 'Clínicas e consultórios', short: 'Para clínicas médicas e consultórios.', name: 'LemiClinic', words: ['Lemi', 'Clinic'], img: clinic, alt: 'Profissionais de saúde conferindo uma ficha na recepção da clínica',
    d: 'Para clínicas médicas, odontológicas e consultórios. Até o lançamento, dá para começar pelo Lemify e receber uma oferta para migrar.', cta: 'Conhecer', href: '#contato' },
]

/** Produtos: leque de cartões. O ativo se expande (clique, foco ou rodízio automático) e os outros ficam estreitos e escurecidos. */
export function Products() {
  const [on, setOn] = useState(0)
  const hover = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => { if (!hover.current) setOn((v) => (v + 1) % PRODUCTS.length) }, 8000)
    return () => clearTimeout(t)
  }, [on])

  return (
    <section className="products" id="produtos" aria-labelledby="produtos-titulo">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow" data-reveal>Produtos</span>
          <Words as="h2" id="produtos-titulo" className="h2" text="Uma solução com IA para cada tipo de negócio" />
          <p className="head__p" data-reveal>Cada produto é pensado para a rotina de um segmento.</p>
        </div>

        <div className="pfan" data-reveal onMouseEnter={() => { hover.current = true }} onMouseLeave={() => { hover.current = false }}>
          {PRODUCTS.map((p, k) => {
            const active = k === on
            return (
              <article className={`pfan__item ${active ? 'is-on' : ''}`} key={p.id}>
                <div className="pfan__card">
                  <img className="pfan__photo" src={p.img} alt={active ? p.alt : ''} loading="lazy" />
                  {p.mock && <div className="pfan__mock" aria-hidden={!active}><ProductMock /></div>}
                  <span className="pfan__bar" aria-hidden="true">{p.words ? <><span className="sr">{p.words[0]}</span><b className={`pfan__w pfan__w--${p.id}`}>{p.words[1]}</b></> : p.name}</span>
                  <div className="pfan__cap" aria-hidden={!active}>
                    <div className="pfan__capin">
                    <span className={`badge pfan__tag pfan__tag--${p.id}`}>{p.words ? <><span className="sr">{p.words[0]}</span><b className={`pfan__w pfan__w--${p.id}`}>{p.words[1]}</b></> : p.name}</span>
                    <p className="pfan__desc">{p.short}</p>
                    <a className="pfan__link" href={p.href} tabIndex={active ? 0 : -1}>{p.cta} <Arrow /></a>
                    </div>
                  </div>
                  {!active && (
                    <button type="button" className="pfan__hit" onClick={() => setOn(k)} onFocus={() => setOn(k)} aria-label={`Ver ${p.name}`} data-cursor="Ver" />
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Valores: título parado + cartões empilhando na lateral ───────────── */
export function Values() {
  const root = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.vitem')
      items.forEach((item, k) => {
        const next = items[k + 1]
        if (!next) return
        gsap.to(item.querySelector('.vitem__in'), {
          scale: 0.92, opacity: 0.6, ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 25%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="values" id="valores" ref={root} aria-labelledby="valores-titulo">
      <div className="wrap values__grid">
        <div className="values__side">
          <span className="eyebrow" data-reveal>Visão e valores</span>
          <Words as="h2" id="valores-titulo" className="h2" text="Queremos ser a família de softwares com IA de referência para os negócios brasileiros." />
          <p data-reveal>Com uma solução pensada para a rotina de cada segmento, guiada por cinco valores.</p>
        </div>
        <div className="values__list">
          {VALUES.map((v, k) => (
            <div className="vitem" key={v.n} style={{ '--i': k }}>
              <div className="vitem__in">
                <Tilt className="vcard" max={5}>
                  <span className="vcard__n">{v.n}</span>
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </Tilt>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Agentes: painel sticky troca com o scroll ───────────── */
const AGENTS = [
  { n: 'Lemi', r: 'Agente principal', d: 'Atende na hora, em todos os canais.', img: lemi, alt: 'Lemi, mascote amarelo de moletom verde, acenando', c: '#d8fe6a' },
  { n: 'Maia', r: 'Agendamento', d: 'Agenda, confirma e remarca compromissos.', img: maia, alt: 'Maia, mascote azul de laço lima, piscando', c: '#bcd8ff' },
  { n: 'Theo', r: 'Vendas', d: 'Mantém o funil e as negociações em dia.', img: theo, alt: 'Theo, mascote verde-sálvia de gravata', c: '#c9dbb8' },
  { n: 'Otto', r: 'Cadastro', d: 'Completa os dados de cada cliente.', img: otto, alt: 'Otto, mascote rosa com as mãos no rosto', c: '#ffc9d6' },
  { n: 'Nico', r: 'Retorno', d: 'Retoma quem parou de responder.', img: nico, alt: 'Nico, mascote pêssego de jaqueta verde, sorrindo', c: '#ffcfa8' },
  { n: 'Íris', r: 'Relatórios', d: 'Transforma conversas em informação para decidir.', img: iris, alt: 'Íris, mascote lilás de óculos, pensativa', c: '#dcc8ff' },
]

export function Agents() {
  const root = useRef(null)
  const [on, setOn] = useState(0)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.agent').forEach((row, k) => {
        ScrollTrigger.create({
          trigger: row, start: 'top 55%', end: 'bottom 55%',
          onToggle: (s) => { if (s.isActive && window.matchMedia('(min-width: 901px)').matches) setOn(k) },
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
          <div data-reveal style={{ marginTop: 28 }}>
            <Magnetic><a className="btn btn--dark" href="#contato">Fale com a gente <Arrow /></a></Magnetic>
          </div>
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
          <Magnetic><a className="btn btn--lime btn--lg" href={`mailto:${SITE.email}`}>Fale com a gente <Arrow /></a></Magnetic>
          <a className="btn btn--outline-light btn--lg" href={SITE.productPage}>Conhecer o Lemify</a>
        </div>
      </div>
      <img className="contact__crew" src={crew} alt="Os agentes do Lemify reunidos, em pé, aguardando o contato" loading="lazy" />
    </section>
  )
}
