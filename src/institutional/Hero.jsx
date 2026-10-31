import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, canHover, prefersReducedMotion, Magnetic, Words } from './motion.jsx'
import { Arrow } from './Header.jsx'
import retail from './assets/retail.jpg'
import clinic from './assets/clinic.jpg'
import food from './assets/food.jpg'
import office from './assets/office.jpg'

const SCENES = [
  { tab: 'Varejo', h: 'Nosso agente de IA responde seus clientes no WhatsApp e fecha a venda com você.', img: retail, alt: 'Atendente de loja finalizando uma venda', q: 'Oi! Tem esse tênis no 39?', a: 'Tem sim! Separo um para você retirar hoje ou prefere receber em casa?', ok: 'Pedido encaminhado para a equipe' },
  { tab: 'Clínicas', h: 'Agenda, prontuário e confirmações sem trabalho manual.', img: clinic, alt: 'Recepção de clínica', q: 'Queria marcar uma limpeza essa semana.', a: 'Tenho quinta às 10h ou sexta às 16h. Qual fica melhor para você?', ok: 'Consulta confirmada na agenda' },
  { tab: 'Restaurantes', h: 'Pedidos, cozinha e entregas conectados, sem fila e sem erro.', img: food, alt: 'Balcão de restaurante', q: 'Vocês entregam no Centro?', a: 'Entregamos sim, em até 40 minutos. Quer ver o cardápio de hoje?', ok: 'Pedido anotado e enviado para a cozinha' },
  { tab: 'Serviços', h: 'Orçamentos, ordens de serviço e agenda em minutos.', img: office, alt: 'Equipe conversando em um escritório', q: 'Preciso de um orçamento de manutenção.', a: 'Claro! Me passa o endereço e o melhor horário que eu já te envio o orçamento.', ok: 'Orçamento criado no CRM' },
]

export default function Hero() {
  const root = useRef(null)
  const [i, setI] = useState(0)
  const paused = useRef(false)
  const tabsRef = useRef(null)
  const [pill, setPill] = useState(null)

  // O indicador branco desliza até o botão ativo (e se reposiciona se a barra quebrar de linha).
  useLayoutEffect(() => {
    const place = () => {
      const b = tabsRef.current?.querySelectorAll('button')[i]
      if (b) setPill({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight })
    }
    place()
    window.addEventListener('resize', place)
    // As medidas mudam quando a fonte termina de carregar ou a barra muda de tamanho.
    document.fonts?.ready.then(place)
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(place)
    ro?.observe(tabsRef.current)
    return () => {
      window.removeEventListener('resize', place)
      ro?.disconnect()
    }
  }, [i])
  const interacted = useRef(false)

  useEffect(() => {
    const t = setInterval(() => { if (!paused.current && !interacted.current) setI((v) => (v + 1) % SCENES.length) }, 6500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.from('.hero__stage', { clipPath: 'inset(6% 6% 6% 6% round 60px)', duration: 1.4, ease: 'expo.out' })
      gsap.from('.hero__lead, .hero__cta, .hero__tabs', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.5,
      })
      // Ao rolar: foto afunda em parallax, o cartão encolhe e o texto sobe.
      gsap.to('.hero__media', {
        yPercent: 10, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__stage', {
        scale: 0.96, borderRadius: 56, ease: 'none', transformOrigin: '50% 0',
        scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__copy', {
        yPercent: -14, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true },
      })
      if (!canHover()) return
      const stage = el.querySelector('.hero__stage')
      const layers = gsap.utils.toArray('[data-depth]', el).map((n) => ({
        d: parseFloat(n.dataset.depth),
        x: gsap.quickTo(n, 'x', { duration: 1, ease: 'power3.out' }),
        y: gsap.quickTo(n, 'y', { duration: 1, ease: 'power3.out' }),
      }))
      const move = (e) => {
        const r = stage.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        layers.forEach(({ x, y, d }) => { x(nx * d * 50); y(ny * d * 50) })
        stage.style.setProperty('--mx', `${e.clientX - r.left}px`)
        stage.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      stage.addEventListener('mousemove', move)
      return () => stage.removeEventListener('mousemove', move)
    }, el)
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => { clearTimeout(t); ctx.revert() }
  }, [])


  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero__stage"
        onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
        <div className="hero__media">
          {SCENES.map((x, k) => (
            <img key={x.tab} src={x.img} alt={k === i ? x.alt : ''} className={`hero__img ${k === i ? 'is-on' : ''}`} fetchPriority={k === 0 ? 'high' : 'low'} decoding="async" />
          ))}
        </div>
        <div className="hero__shade" />
        <div className="hero__spot" aria-hidden="true" />


        <div className="hero__copy">
          <div className="hero__tabs" role="tablist" aria-label="Segmentos" ref={tabsRef}>
            {pill && <span className="hero__pill" aria-hidden="true" style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h }} />}
          {SCENES.map((x, k) => (
            <button key={x.tab} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => { interacted.current = true; setI(k) }}>{x.tab}</button>
          ))}
        </div>
          <h1 className="display">
            <span key={i} className="hero__title-in"><Words text={SCENES[i].h} /></span>
          </h1>
          <div className="hero__row">
            <p className="hero__lead">
              Os agentes de IA do Lemify respondem seus clientes na hora, em qualquer canal, e trabalham lado a lado com a sua equipe.
            </p>
            <div className="hero__cta">
              <Magnetic><a className="btn btn--lime btn--sm" href="#produtos">Conheça nossas soluções <Arrow /></a></Magnetic>
              <a className="btn btn--glass btn--sm" href="#contato">Fale com a gente</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
