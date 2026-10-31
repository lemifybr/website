import { useEffect, useState } from 'react'
import { Magnetic } from './motion.jsx'
import { SITE } from './siteConfig.js'
import logo from './assets/logo-dark.svg'
import retail from './assets/retail.jpg'
import food from './assets/food.jpg'
import clinic from './assets/clinic.jpg'

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export { Arrow }

const COMPANY = [
  ['Missão, visão e valores', 'O que nos move e como decidimos.', '/#valores'],
  ['Nosso jeito de trabalhar', 'Implantação, treinamento e suporte.', '/#suporte'],
]

const PRODUCTS = [
  ['Lemify', 'Atendimento e CRM', 'Para empresas que vendem e atendem por conversa.', 'Disponível', retail, SITE.productPage],
  ['LemiFood', '', 'Para restaurantes, lanchonetes e delivery.', 'Em desenvolvimento', food, '/#contato'],
  ['LemiClinic', '', 'Para clínicas médicas, odontológicas e consultórios.', 'Em desenvolvimento', clinic, '/#contato'],
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <div className="topbar">
        <span>Teste o Lemify grátis por 14 dias, sem cartão de crédito.</span>
        <a href={SITE.signup}>Começar agora <Arrow /></a>
      </div>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="/#inicio" className="nav__logo" aria-label="Lemify" onClick={close}>
            <img src={logo} alt="Lemify" />
          </a>

          <nav className="nav__links" aria-label="Principal">
            <a href="/#inicio">Início</a>
            <div className="dd">
              <button type="button" className="dd__btn">Empresa <i /></button>
              <div className="dd__panel dd__panel--list">
                {COMPANY.map(([t, d, h]) => (
                  <a key={t} href={h} className="dd__item"><strong>{t}</strong><span>{d}</span></a>
                ))}
              </div>
            </div>
            <div className="dd">
              <button type="button" className="dd__btn">Produtos <i /></button>
              <div className="dd__panel dd__panel--products">
                {PRODUCTS.map(([n, sub, d, s, img, href]) => (
                  <a key={n} href={href} className="dd__prod">
                    <img src={img} alt="" />
                    <div>
                      <strong>{n}{sub && <em> · {sub}</em>}</strong>
                      <span>{d}</span>
                      <b className={s === 'Disponível' ? 'ok' : ''}>{s}</b>
                    </div>
                  </a>
                ))}
                <a className="dd__all" href="/#produtos">Ver todos os produtos <Arrow /></a>
              </div>
            </div>
            <a href="/#agentes">Agentes</a>
            <a href="/blog">Blog</a>
            <a href="/#contato">Contato</a>
          </nav>

          <div className="nav__actions">
            <Magnetic strength={0.25}><a className="btn btn--sm btn--outline" href={SITE.signup}>Cadastre-se</a></Magnetic>
            <Magnetic strength={0.25}><a className="btn btn--sm btn--dark" href={SITE.customerArea}>Login</a></Magnetic>
            <button type="button" className={`burger ${open ? 'is-open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div data-lenis-prevent className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {[
          ['Início', '/#inicio'], ['Produtos', '/#produtos'], ['Missão e valores', '/#valores'],
          ['Agentes', '/#agentes'], ['Como trabalhamos', '/#suporte'], ['Blog', '/blog'], ['Contato', '/#contato'],
        ].map(([t, h]) => <a key={t} href={h} onClick={close}>{t}</a>)}
        <div className="drawer__auth">
          <a className="btn btn--outline-light" href={SITE.signup}>Cadastre-se</a>
          <a className="btn btn--lime" href={SITE.customerArea}>Login</a>
        </div>
      </div>
    </>
  )
}
