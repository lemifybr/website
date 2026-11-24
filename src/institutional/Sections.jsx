import { useEffect, useRef, useState } from 'react'
import { siWhatsapp, siInstagram, siMeta, siMessenger, siTelegram, siTiktok } from 'simple-icons'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion.jsx'
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
import hubBling from './assets/integrations/hub/bling.png'
import hubContaAzul from './assets/integrations/hub/conta-azul.png'
import hubEmail from './assets/integrations/hub/email.png'
import hubGoogleCalendar from './assets/integrations/hub/google-calendar.png'
import hubMeli from './assets/integrations/hub/meli.png'
import hubOmie from './assets/integrations/hub/omie.png'
import hubPipedrive from './assets/integrations/hub/pipedrive.png'
import hubRd from './assets/integrations/hub/rd.png'
import hubSalesforce from './assets/integrations/hub/salesforce.png'
import hubShopify from './assets/integrations/hub/shopify.png'
import hubTiny from './assets/integrations/hub/tiny.webp'
import { SITE } from './siteConfig.js'
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

/* ───────────── Dobra de Integrações + Canais (hub central) ───────────── */
const BrandIcon = ({ icon, color }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill={color || `#${icon.hex}`} aria-hidden="true">
    <path d={icon.path} />
  </svg>
)

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
)

const ApiCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
)

const LemifyMark = () => (
  <svg viewBox="-8 -8 278.17 281.01" width="44" height="44" fill="currentColor" aria-hidden="true">
    <path d="M194.65,205.1h-24.62c-7.02,0-11.41-7.58-7.93-13.67l52.68-92.07c3.48-6.09-.91-13.67-7.93-13.67h-82.05c-6.92,0-11.33-7.4-8.03-13.49l28.13-19.38c3.97-3.13,3.85-3.8,8.03-4.78h33.43c3.16,0,6.09,1.63,7.76,4.32l8.79,24.96c1.67,2.68,4.6,4.32,7.76,4.32h42.36c7.06,0,11.45,7.66,7.88,13.75l-59.26,101.14c-1.64,2.8-3.75,8.58-6.99,8.58Z" />
    <path d="M143.38,220.81c1.66-1.14,2.91-2.89,3.1-4.9.48-5.1-3.48-9.99-9.11-9.99h-5.66c-5.5,0-11,.48-16.37,1.61-13.47,2.85-16.32,7.09-19.7,21.48-3.78-16.15-6.92-19.51-25.13-22.48-2.52-.41-5.1-.61-7.66-.61h-7.53c-7.02,0-11.41-7.58-7.93-13.67l52.68-92.07c3.48-6.09-.91-13.67-7.93-13.67h-24.62c-1.22,0-2.34.65-2.96,1.7L1.27,196.24c-3.57,6.09.82,13.75,7.88,13.75h42.36c3.16,0,6.1,1.63,7.76,4.32l8.79,24.96c1.67,2.68,4.6,4.32,7.76,4.32h29.57c3.87,0,7.61-1.32,10.62-3.74Z" />
  </svg>
)

const HUB_ROWS = [
  {
    dur: '56s',
    reverse: false,
    items: [
      { name: 'WhatsApp Business', svg: <BrandIcon icon={siWhatsapp} /> },
      { name: 'Instagram', svg: <BrandIcon icon={siInstagram} color="#E1306C" /> },
      { name: 'Meta', svg: <BrandIcon icon={siMeta} /> },
      { name: 'Messenger', svg: <BrandIcon icon={siMessenger} /> },
      { name: 'Telegram', svg: <BrandIcon icon={siTelegram} /> },
      { name: 'TikTok', svg: <BrandIcon icon={siTiktok} /> },
      { name: 'Chat do site', svg: <ChatIcon /> },
    ],
  },
  {
    dur: '62s',
    reverse: true,
    items: [
      { name: 'E-mail', img: hubEmail },
      { name: 'Google Agenda', img: hubGoogleCalendar },
      { name: 'Mercado Livre', img: hubMeli, square: true },
      { name: 'Shopify', img: hubShopify },
      { name: 'Pipedrive', img: hubPipedrive, square: true },
      { name: 'RD Station', img: hubRd, square: true },
    ],
  },
  {
    dur: '58s',
    reverse: false,
    items: [
      { name: 'Conta Azul', img: hubContaAzul, square: true },
      { name: 'Bling', img: hubBling, square: true },
      { name: 'Omie', img: hubOmie, square: true },
      { name: 'Tiny ERP', img: hubTiny, square: true },
      { name: 'Salesforce', img: hubSalesforce },
      { name: 'Integração aberta (API)', svg: <ApiCodeIcon /> },
    ],
  },
]

export function IntegrationsHub() {
  return (
    <section className="ihub" id="integracoes" aria-labelledby="integracoes-titulo">
      <div className="wrap">
        <div className="head ihub__head">
          <span className="eyebrow">Integrações</span>
          <h2 id="integracoes-titulo" className="h2">Conectado aos canais e sistemas que você já usa.</h2>
          <p className="head__p">
            WhatsApp, redes sociais, agenda, e-commerce, CRM e ERP trabalhando juntos com os agentes de IA — além de API aberta para conectar o resto da sua operação.
          </p>
        </div>
      </div>

      <div className="ihub__stage">
        <div className="ihub__rows">
          {HUB_ROWS.map((row, rowIdx) => {
            const half = [...row.items, ...row.items]
            return (
              <div className="ihub__row" key={rowIdx}>
                <div
                  className={`ihub__track ${row.reverse ? 'is-rev' : ''}`}
                  style={{ '--dur': row.dur }}
                >
                  {[...half, ...half].map((item, i) => {
                    const isDup = i >= row.items.length
                    return (
                      <span
                        className="ihub__pill"
                        key={`${rowIdx}-${i}`}
                        aria-hidden={isDup || undefined}
                      >
                        <span className={`ihub__icon ${item.square ? 'is-sq' : ''}`}>
                          {item.img ? (
                            <img src={item.img} alt={isDup ? '' : item.name} loading="lazy" />
                          ) : (
                            item.svg
                          )}
                        </span>
                        <span>{item.name}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="ihub__core" aria-hidden="true">
          <LemifyMark />
        </div>
      </div>

      <div className="wrap ihub__foot">
        <a
          className="btn btn--lime"
          href={SITE.demoFor('Quero ver as integrações do Lemify funcionando ao vivo.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar demonstração <Arrow />
        </a>
        <p className="ihub__caption">Veja as integrações funcionando ao vivo.</p>
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
      <p className="integ__label">Conectado às plataformas que o seu negócio já usa</p>
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
          scrub: 0.12, invalidateOnRefresh: true, refreshPriority: 1,
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
          <span className="eyebrow">Para quem trabalhamos</span>
          <h2 id="produtos-titulo" className="h2">Do balcão da loja à agenda da clínica.</h2>
          <p className="head__p">Cada negócio tem o seu ritmo. A gente adapta a tecnologia a ele, e não o contrário.</p>
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
                  <a className="seg__cta" href={SITE.demoFor(`Meu negócio é do segmento ${x.n.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" tabIndex={pinned && k !== on ? -1 : 0} aria-label={`Agendar demonstração para ${x.n.toLowerCase()}`}>Agendar demonstração <Arrow /></a>
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
          <span className="eyebrow">Agentes de IA</span>
          <h2 id="agentes-titulo" className="h2">Cada agente de IA tem nome, jeito e função.</h2>
          <p>A gente trata a IA como parte do time: cada agente cuida de uma tarefa e, juntos, acompanham o cliente da primeira mensagem ao pós-venda.</p>
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

/* ───────────── Perguntas frequentes ───────────── */
export function Faq() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section className="faq" id="perguntas" aria-labelledby="faq-titulo">
      <div className="wrap faq__in">
        <div className="head">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2 id="faq-titulo" className="h2">Dúvidas comuns sobre a Lemify e o nosso produto</h2>
        </div>
        <div className="faq__list">
          {FAQ.map((f, idx) => (
            <details
              className="faq__item"
              key={f.q}
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
                {f.q}
              </summary>
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
  return (
      <section className="contact" id="contato" aria-labelledby="contato-titulo">
        <div className="wrap contact__in">
            <h2 id="contato-titulo" className="display display--light">Vamos conversar?</h2>
            <p>Quer conhecer a Lemify, tirar uma dúvida ou contar o que o seu negócio precisa? A gente responde rapidinho.</p>
            <div className="contact__cta">
              <a className="btn btn--lime btn--lg" href={`${SITE.whatsappUrl}?text=${encodeURIComponent('Olá! Vim pelo site e quero conhecer o Lemify.')}`} target="_blank" rel="noopener noreferrer">Fale com a gente <Arrow /></a>
              <a className="btn btn--outline-light btn--lg" href={SITE.productPage}>Conhecer o Lemify</a>
            </div>
          </div>
          <img className="contact__crew" src={crew} alt="Os agentes do Lemify reunidos, em pé, aguardando o contato" loading="lazy" />
      </section>
      )
}
