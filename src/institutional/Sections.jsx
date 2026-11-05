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
import { STEPS, SITE, VALUES } from './siteConfig.js'
import dashboard from './assets/product-dashboard.jpg'
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
import phVarejo from './assets/segments/photos/varejo.jpg'
import phClinicas from './assets/segments/photos/clinicas.jpg'
import phRestaurantes from './assets/segments/photos/restaurantes.jpg'
import phImobiliarias from './assets/segments/photos/imobiliarias.jpg'
import phBeleza from './assets/segments/photos/beleza.jpg'
import phAtacado from './assets/segments/photos/atacado.jpg'
import phServicos from './assets/segments/photos/servicos.jpg'

/* ───────────── Como pensamos: princípios ───────────── */
export function Principles() {
  return (
    <section className="principles" id="principios" aria-labelledby="principios-titulo">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow" data-reveal>Como pensamos</span>
          <Words as="h2" id="principios-titulo" className="h2" text="O que guia cada produto que a gente cria." />
        </div>
        <div className="pgrid" data-stagger>
          {VALUES.map((v, k) => (
            <Tilt key={v.n} max={5} className={`pcard pcard--${k + 1}`}>
              <span className="pcard__n">{v.n}</span>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── O que fazemos hoje: o produto ───────────── */
export function Product() {
  return (
    <section className="product" id="produto" aria-labelledby="produto-titulo">
      <div className="wrap product__card" data-reveal="scale">
        <div className="product__text">
          <span className="eyebrow">O que fazemos hoje</span>
          <Words as="h2" id="produto-titulo" className="h2" text="Lemify, nosso primeiro produto." />
          <p>Uma plataforma de atendimento e CRM que junta os canais de conversa da empresa numa caixa só, com agentes de IA trabalhando lado a lado com a equipe.</p>
          <div className="product__cta">
            <Magnetic><a className="btn btn--lime btn--lg" href={SITE.productPage}>Conhecer o Lemify <Arrow /></a></Magnetic>
            <a className="btn btn--outline-light btn--lg" href={`${SITE.productPage}/planos`}>Ver planos</a>
          </div>
        </div>
        <div className="product__shot">
          <img src={dashboard} alt="Tela do Lemify mostrando a caixa de atendimento com as conversas dos clientes" loading="lazy" data-parallax="0.06" />
        </div>
      </div>
    </section>
  )
}

/* ───────────── Confiança: parceria, segurança e documentação ───────────── */
const TRUST = [
  { t: 'Meta Business Partner', d: 'Reconhecida pela Meta para trabalhar com a API oficial do WhatsApp Business.', href: null },
  { t: 'Segurança e LGPD', d: 'Dados tratados com responsabilidade desde a primeira conversa.', href: '/lgpd', cta: 'Como cuidamos dos dados' },
  { t: 'Documentação aberta', d: 'Guias de cada módulo e uma API pública para integrar o seu sistema.', href: '/docs', cta: 'Ler a documentação' },
]
export function Trust() {
  return (
    <section className="trust" aria-label="Confiança">
      <div className="wrap trust__grid" data-stagger>
        {TRUST.map((x) => (
          <article className="tcard" key={x.t}>
            <h3>{x.t}</h3>
            <p>{x.d}</p>
            {x.href && <a href={x.href} className="tcard__link">{x.cta} <Arrow /></a>}
          </article>
        ))}
      </div>
    </section>
  )
}

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
      <p className="integ__label" data-reveal>Conectado às plataformas que o seu negócio já usa</p>
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

/* ───────────── Segmentos: abas com painel (imagem + texto) ───────────── */
const ICONS = { varejo: icVarejo, clinicas: icClinicas, restaurantes: icRestaurantes, imobiliarias: icImobiliarias, beleza: icBeleza, atacado: icAtacado, servicos: icServicos }

const PHOTOS = { varejo: phVarejo, clinicas: phClinicas, restaurantes: phRestaurantes, imobiliarias: phImobiliarias, beleza: phBeleza, atacado: phAtacado, servicos: phServicos }

const SEGMENTS = [
  { n: 'Varejo', ic: 'varejo', c: '#f6e3a1', t: 'Responda na hora e feche mais vendas', d: 'A IA responde dúvidas de estoque, preço e entrega e leva o cliente até a compra, mesmo quando a loja está cheia ou fechada.', q: 'Oi! Tem esse tênis no 39?', a: 'Tem sim! Separo um para você retirar hoje ou prefere receber em casa?' },
  { n: 'Clínicas', ic: 'clinicas', c: '#9fd8e6', t: 'Agenda cheia sem a recepção parar', d: 'A IA agenda, confirma e remarca consultas pelo WhatsApp, e a sua equipe cuida de quem está na sala de espera.', q: 'Queria marcar uma limpeza essa semana.', a: 'Tenho quinta às 10h ou sexta às 16h. Qual fica melhor para você?' },
  { n: 'Restaurantes', ic: 'restaurantes', c: '#f2a98e', t: 'Pedidos e dúvidas sem fila, no horário de pico', d: 'A IA atende dúvidas de cardápio, anota pedidos e avisa a cozinha, enquanto você cuida do balcão e das entregas.', q: 'Vocês entregam no Centro?', a: 'Entregamos sim, em até 40 minutos. Quer ver o cardápio de hoje?' },
  { n: 'Imobiliárias', ic: 'imobiliarias', c: '#e6d8b8', t: 'Cada interessado atendido, cada visita marcada', d: 'A IA responde quem pergunta sobre um imóvel, entende o que a pessoa procura e marca a visita na sua agenda.', q: 'O apartamento de 2 quartos ainda está disponível?', a: 'Está sim! Posso marcar uma visita para amanhã às 15h?' },
  { n: 'Beleza e estética', ic: 'beleza', c: '#f3cf6e', t: 'Agenda preenchida e clientes de volta', d: 'A IA preenche os horários, lembra o cliente do atendimento e chama de volta quem sumiu.', q: 'Tem horário para escova no sábado?', a: 'Tenho às 10h e às 14h. Qual você prefere?' },
  { n: 'Atacado', ic: 'atacado', c: '#b8e6dc', t: 'Pedidos recorrentes sem planilha', d: 'A IA mantém cadastros e tabelas em dia e repete pedidos de clientes antigos em poucas mensagens.', q: 'Quero repetir o pedido da semana passada.', a: 'Claro! Mesmos itens e quantidades. Confirmo para entrega na sexta?' },
  { n: 'Serviços', ic: 'servicos', c: '#c5d0d8', t: 'Orçamentos e agenda em minutos', d: 'A IA recebe o pedido, pede as informações que faltam e já deixa o orçamento e a visita encaminhados.', q: 'Preciso de um orçamento de manutenção.', a: 'Claro! Me passa o endereço e o melhor horário que já te envio o orçamento.' },
]

/** Segmentos atendidos: abas no topo e, abaixo, imagem com exemplo de conversa ao lado do texto do segmento. */
// No celular a barra rola de lado: leva a aba escolhida para o meio.
const centerTab = (el) => {
  const bar = el?.parentElement
  if (bar) bar.scrollTo({ left: el.offsetLeft - (bar.clientWidth - el.offsetWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function Products() {
  const [on, setOn] = useState(0)
  const s = SEGMENTS[on]

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (on + (e.key === 'ArrowRight' ? 1 : SEGMENTS.length - 1)) % SEGMENTS.length
    setOn(next)
    const t = document.getElementById(`seg-tab-${next}`)
    t?.focus()
    centerTab(t)
  }

  return (
    <section className="products" id="segmentos" aria-labelledby="produtos-titulo">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow" data-reveal>Para quem trabalhamos</span>
          <Words as="h2" id="produtos-titulo" className="h2" text="Do balcão da loja à agenda da clínica." />
          <p className="head__p" data-reveal>Cada negócio tem o seu ritmo. A gente adapta a tecnologia a ele, e não o contrário.</p>
        </div>

        <div className="segtabs" data-reveal>
          <div className="segtabs__bar" role="tablist" aria-label="Segmentos atendidos" onKeyDown={onKey}>
            {SEGMENTS.map((x, k) => (
              <button key={x.n} id={`seg-tab-${k}`} type="button" role="tab" aria-selected={k === on} aria-controls="seg-panel" tabIndex={k === on ? 0 : -1}
                className={k === on ? 'is-on' : ''} onClick={(e) => { setOn(k); centerTab(e.currentTarget) }}><img src={ICONS[x.ic]} alt="" />{x.n}</button>
            ))}
          </div>

          <div className="segtabs__panel" id="seg-panel" role="tabpanel" aria-labelledby={`seg-tab-${on}`} key={on}>
            <div className="segtabs__media" style={{ '--c': s.c }}>
              <img className="segtabs__photo" src={PHOTOS[s.ic]} alt="" />
              <div className="segtabs__chats">
                <div className="segtabs__chat segtabs__chat--in"><small>Cliente</small><p>{s.q}</p></div>
                <div className="segtabs__chat segtabs__chat--out"><small>Resposta da IA</small><p>{s.a}</p></div>
              </div>
            </div>
            <div className="segtabs__text">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <a className="segtabs__link" href={SITE.signup}>Testar grátis <Arrow /></a>
            </div>
          </div>
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
          <span className="eyebrow" data-reveal>Agentes de IA</span>
          <Words as="h2" id="agentes-titulo" className="h2" text="Cada agente de IA tem nome, jeito e função." />
          <p data-reveal>A gente trata a IA como parte do time: cada agente cuida de uma tarefa e, juntos, acompanham o cliente da primeira mensagem ao pós-venda.</p>
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
          <Words as="h2" id="faq-titulo" className="h2" text="Dúvidas comuns sobre a Lemify e o nosso produto" />
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
        <p data-reveal>Quer conhecer a Lemify, tirar uma dúvida ou contar o que o seu negócio precisa? A gente responde rapidinho.</p>
        <div className="contact__cta" data-reveal>
          <Magnetic><a className="btn btn--lime btn--lg" href={`${SITE.whatsappUrl}?text=${encodeURIComponent('Olá! Vim pelo site e quero conhecer o Lemify.')}`} target="_blank" rel="noopener noreferrer">Fale com a gente <Arrow /></a></Magnetic>
          <a className="btn btn--outline-light btn--lg" href={SITE.productPage}>Conhecer o Lemify</a>
        </div>
      </div>
      <img className="contact__crew" src={crew} alt="Os agentes do Lemify reunidos, em pé, aguardando o contato" loading="lazy" />
    </section>
  )
}
