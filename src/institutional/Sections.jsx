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

/* ───────────── Segmentos: cartões que deslizam na horizontal com o scroll ───────────── */
const ICONS = { varejo: icVarejo, clinicas: icClinicas, restaurantes: icRestaurantes, imobiliarias: icImobiliarias, beleza: icBeleza, atacado: icAtacado, servicos: icServicos }

const PHOTOS = { varejo: phVarejo, clinicas: phClinicas, restaurantes: phRestaurantes, imobiliarias: phImobiliarias, beleza: phBeleza, atacado: phAtacado, servicos: phServicos }

const SEGMENTS = [
  { n: 'Varejo', ic: 'varejo', alt: 'Vendedora de avental verde atendendo numa floricultura', t: 'Responda na hora e feche mais vendas', d: 'A IA responde dúvidas de estoque, preço e entrega e leva o cliente até a compra, mesmo quando a loja está cheia ou fechada.' },
  { n: 'Clínicas', ic: 'clinicas', alt: 'Profissional de saúde com uniforme verde e estetoscópio', t: 'Agenda cheia sem a recepção parar', d: 'A IA agenda, confirma e remarca consultas pelo WhatsApp, e a sua equipe cuida de quem está na sala de espera.' },
  { n: 'Restaurantes', ic: 'restaurantes', alt: 'Atendente de avental verde servindo no balcão de um café', t: 'Pedidos e dúvidas sem fila, no horário de pico', d: 'A IA atende dúvidas de cardápio, anota pedidos e avisa a cozinha, enquanto você cuida do balcão e das entregas.' },
  { n: 'Imobiliárias', ic: 'imobiliarias', alt: 'Corretora de terno verde caminhando pela cidade', t: 'Cada interessado atendido, cada visita marcada', d: 'A IA responde quem pergunta sobre um imóvel, entende o que a pessoa procura e marca a visita na sua agenda.' },
  { n: 'Beleza e estética', ic: 'beleza', alt: 'Cabeleireira de blusa verde-clara arrumando o cabelo de um cliente', t: 'Agenda preenchida e clientes de volta', d: 'A IA preenche os horários, lembra o cliente do atendimento e chama de volta quem sumiu.' },
  { n: 'Atacado', ic: 'atacado', alt: 'Funcionário de camiseta verde separando caixas no estoque', t: 'Pedidos recorrentes sem planilha', d: 'A IA mantém cadastros e tabelas em dia e repete pedidos de clientes antigos em poucas mensagens.' },
  { n: 'Serviços', ic: 'servicos', alt: 'Mecânico de blusa verde sentado na oficina com uma ferramenta na mão', t: 'Orçamentos e agenda em minutos', d: 'A IA recebe o pedido, pede as informações que faltam e já deixa o orçamento e a visita encaminhados.' },
]

/**
 * Segmentos atendidos. No desktop a seção fica fixada e os cartões andam para a esquerda conforme a rolagem;
 * o painel ao lado mostra o segmento em foco. No celular vira um carrossel com encaixe.
 */
export function Products() {
  const root = useRef(null)
  const track = useRef(null)
  const st = useRef(null)
  const onRef = useRef(0)
  const [on, setOn] = useState(0)
  const [pinned, setPinned] = useState(false)
  const N = SEGMENTS.length
  const s = SEGMENTS[on]

  useEffect(() => {
    const mm = gsap.matchMedia()
    // O movimento acompanha a rolagem da própria pessoa, então vale também com "reduzir movimento".
    mm.add('(min-width: 901px)', () => {
      // A classe entra já no DOM para as medidas abaixo usarem o layout fixado (o React repete no próximo render).
      const stage = root.current.querySelector('.segs__stage')
      stage.classList.add('is-pinned')
      setPinned(true)
      const el = track.current
      const view = el.parentElement
      // O cartão em foco fica sempre no mesmo ponto, perto do texto: a trilha anda do primeiro ao último cartão.
      const center = (i) => { const c = el.children[i]; return c ? c.offsetLeft + c.offsetWidth / 2 : 0 }
      const focus = () => Math.min(view.clientWidth / 2, (el.children[0]?.offsetWidth || 0) / 2 + view.clientWidth * 0.14)
      const dist = () => center(N - 1) - center(0)
      const tween = gsap.fromTo(el, { x: () => focus() - center(0) }, {
        x: () => focus() - center(N - 1), ease: 'none',
        scrollTrigger: {
          trigger: stage, pin: true, start: 'center center+=35', end: () => `+=${dist() * 1.15}`,
          // Remede antes das animações abaixo dela, que dependem do espaço extra que o pin cria.
          scrub: 0.25, invalidateOnRefresh: true, refreshPriority: 1,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (N - 1))
            if (i !== onRef.current) { onRef.current = i; setOn(i) }
          },
        },
      })
      st.current = tween.scrollTrigger
      // Remede depois que fontes e layout assentarem.
      const t = setTimeout(() => ScrollTrigger.refresh(), 300)
      return () => { clearTimeout(t); st.current = null; stage.classList.remove('is-pinned'); setPinned(false) }
    })
    return () => mm.revert()
  }, [N])

  // No carrossel (celular), o cartão mais visível vira o ativo.
  useEffect(() => {
    if (pinned) return
    const view = track.current.parentElement
    const cards = [...track.current.children]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { const i = cards.indexOf(e.target); onRef.current = i; setOn(i) } })
    }, { root: view, threshold: 0.6 })
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [pinned])

  const goTo = (k) => {
    if (st.current) {
      const t = st.current
      window.scrollTo({ top: t.start + (t.end - t.start) * (k / (N - 1)) + 2, behavior: 'smooth' })
    } else {
      const card = track.current.children[k]
      card?.parentElement.parentElement.scrollTo({ left: card.offsetLeft - 16, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }

  return (
    <section className="segs" id="segmentos" ref={root} aria-labelledby="produtos-titulo">
      <div className="wrap">
        <div className="head segs__head">
          <span className="eyebrow" data-reveal>Para quem trabalhamos</span>
          <Words as="h2" id="produtos-titulo" className="h2" text="Do balcão da loja à agenda da clínica." />
          <p className="head__p" data-reveal>Cada negócio tem o seu ritmo. A gente adapta a tecnologia a ele, e não o contrário.</p>
        </div>
      </div>

      <div className={`segs__stage ${pinned ? 'is-pinned' : ''}`}>
        <div className="segs__info">
          <div className="segs__copy" key={on} aria-live="polite">
            <span className="segs__tag"><img src={ICONS[s.ic]} alt="" />{s.n}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
          <div className="segs__nav">
            <div className="segs__dots" role="group" aria-label="Escolher segmento">
              {SEGMENTS.map((x, k) => (
                <button key={x.n} type="button" className={k === on ? 'is-on' : ''} aria-label={x.n} aria-current={k === on} onClick={() => goTo(k)} />
              ))}
            </div>
          </div>
        </div>

        <div className="segs__view" data-lenis-prevent-horizontal>
          <div className="segs__track" ref={track}>
            {SEGMENTS.map((x, k) => (
              <article className={`seg ${k === on ? 'is-on' : ''}`} key={x.n} aria-label={x.n}>
                <div className="seg__media">
                  <img src={PHOTOS[x.ic]} alt={x.alt} loading="lazy" />
                  <span className="seg__chip"><img src={ICONS[x.ic]} alt="" />{x.n}</span>
                  <a className="seg__cta" href={SITE.signup} tabIndex={pinned && k !== on ? -1 : 0} aria-label={`Testar grátis para ${x.n.toLowerCase()}`}>Testar grátis <Arrow /></a>
                </div>
                <div className="seg__cap">
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              </article>
            ))}
          </div>
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
  // O agente ativo é o da linha que cruza a altura de 55% da tela. Medido a cada rolagem, não depende de
  // posições calculadas antes (que mudam quando imagens carregam ou quando a seção de segmentos fixa).
  useEffect(() => {
    const rows = [...root.current.querySelectorAll('.agent')]
    let raf = 0
    const pick = () => {
      raf = 0
      const line = window.innerHeight * 0.55
      let k = rows.findIndex((r) => { const b = r.getBoundingClientRect(); return b.top <= line && b.bottom > line })
      if (k < 0) k = rows[0].getBoundingClientRect().top > line ? 0 : rows.length - 1
      setOn(k)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    pick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
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
