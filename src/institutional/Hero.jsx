import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, canHover, prefersReducedMotion, Magnetic } from './motion.jsx'
import { Arrow } from './Header.jsx'
import { SITE } from './siteConfig.js'
import crew from './assets/crew.webp'

const WORDS = ['vender', 'atender', 'agendar', 'crescer']
const CHIPS = [
  { who: 'Cliente', t: 'Vocês entregam hoje?', cls: 'chip--a', depth: 0.5 },
  { who: 'IA', t: 'Entregamos sim, em até 40 min.', cls: 'chip--b', depth: 0.9 },
  { who: 'Cliente', t: 'Tem horário amanhã?', cls: 'chip--c', depth: 0.7 },
]

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.from('.hero__stage', { clipPath: 'inset(7% 7% 7% 7% round 64px)', duration: 1.5, ease: 'expo.out' })
      gsap.from('.hero__in', { opacity: 0, y: 36, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.35 })
      gsap.from('.hero__crew', { yPercent: 18, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.6 })
      gsap.from('.chip', { opacity: 0, scale: 0.7, y: 20, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.18, delay: 1.1 })

      // Ao rolar: o cartão encolhe, a equipe afunda em parallax e o texto sobe.
      gsap.to('.hero__stage', {
        scale: 0.96, borderRadius: 56, ease: 'none', transformOrigin: '50% 0',
        scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__crew', {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__copy', {
        yPercent: -12, opacity: 0.2, ease: 'none',
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
        layers.forEach(({ x, y, d }) => { x(nx * d * 60); y(ny * d * 60) })
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
      <div className="hero__stage">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__orb hero__orb--a" aria-hidden="true" />
        <div className="hero__orb hero__orb--b" aria-hidden="true" />
        <div className="hero__spot" aria-hidden="true" />

        <div className="hero__copy">
          <span className="hero__tag hero__in"><i /> Lemify Tecnologia · São Paulo, Brasil</span>
          <h1 className="display hero__in">
            <span className="sr">Inteligência artificial para o seu negócio vender, atender, agendar e crescer sem complicação.</span>
            <span aria-hidden="true">
              Inteligência artificial para o seu negócio{' '}
              <span className="rot">{WORDS.map((w, i) => <span key={w} style={{ '--i': i }}>{w}</span>)}</span>{' '}
              sem complicação.
            </span>
          </h1>
          <p className="hero__lead hero__in">
            Somos uma empresa de tecnologia que cria software com IA para quem vende e atende todo dia, e fica do lado até tudo funcionar.
          </p>
          <div className="hero__cta hero__in">
            <Magnetic><a className="btn btn--lime btn--sm" href={SITE.productPage}>Conheça o Lemify <Arrow /></a></Magnetic>
            <a className="btn btn--glass btn--sm" href="#empresa">Quem somos</a>
          </div>
        </div>

        <div className="hero__scene" aria-hidden="true">
          {CHIPS.map((c) => (
            <div key={c.t} className={`chip ${c.cls}`} data-depth={c.depth}><small>{c.who}</small>{c.t}</div>
          ))}
          <img className="hero__crew" src={crew} alt="" fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  )
}
