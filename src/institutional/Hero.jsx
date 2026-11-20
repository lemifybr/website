import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Arrow } from './Header.jsx'
import { SITE } from './siteConfig.js'
import heroLoja from './assets/hero.jpg'

const SCENES = [
  { tab: 'Varejo', h: 'Soluções de IA para atendimento, vendas, agenda e gestão, prontas para o seu negócio.', img: heroLoja, alt: 'Dona de uma loja de tênis, de camisa verde, fotografando um produto ao lado do notebook, entre caixas de pedidos', q: 'Oi! Tem esse tênis no 39?', a: 'Tem sim! Separo um para você retirar hoje ou prefere receber em casa?', ok: 'Pedido encaminhado para a equipe' },
]

export default function Hero() {
  const [i, setI] = useState(0)
  const paused = useRef(false)
  const tabsRef = useRef(null)
  const [pill, setPill] = useState(null)
  const interacted = useRef(false)

  // O indicador branco acompanha o botão ativo quando há múltiplos segmentos.
  useLayoutEffect(() => {
    if (SCENES.length < 2) return
    const place = () => {
      const b = tabsRef.current?.querySelectorAll('button')[i]
      if (b) setPill({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight })
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(place)
    if (tabsRef.current) ro?.observe(tabsRef.current)
    return () => {
      window.removeEventListener('resize', place)
      ro?.disconnect()
    }
  }, [i])

  useEffect(() => {
    if (SCENES.length < 2) return
    const t = setInterval(() => { if (!paused.current && !interacted.current) setI((v) => (v + 1) % SCENES.length) }, 6500)
    return () => clearInterval(t)
  }, [])

  return (
      <section className="hero" id="inicio">
        <div className="hero__stage"
          onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
          <div className="hero__media">
            {SCENES.map((x, k) => (
              <img key={x.tab} src={x.img} alt={k === i ? x.alt : ''} className={`hero__img ${k === i ? 'is-on' : ''}`} fetchPriority={k === 0 ? 'high' : 'low'} decoding="async" />
            ))}
          </div>
          <div className="hero__shade" />

          <div className="hero__copy">
            <div className="hero__tabs" hidden={SCENES.length < 2} role="tablist" aria-label="Segmentos" ref={tabsRef}>
              {pill && <span className="hero__pill" aria-hidden="true" style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h }} />}
              {SCENES.map((x, k) => (
                <button key={x.tab} role="tab" aria-selected={k === i} className={k === i ? 'is-on' : ''} onClick={() => { interacted.current = true; setI(k) }}>{x.tab}</button>
              ))}
            </div>
            <h1 className="display">{SCENES[i].h}</h1>
            <div className="hero__row">
              <p className="hero__lead">
                Somos a Lemify, empresa brasileira de tecnologia. Tudo conectado aos canais e sistemas que você já usa, com suporte de gente de verdade.
              </p>
              <div className="hero__cta">
                <a className="btn btn--lime btn--sm" href={SITE.productPage}>Conheça o Lemify <Arrow /></a>
                <a className="btn btn--glass btn--sm" href="#contato">Fale com a gente</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      )
}
