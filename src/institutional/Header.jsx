import { useEffect, useState } from 'react'
import { Magnetic } from './motion.jsx'
import { SITE } from './siteConfig.js'
import logo from './assets/logo-dark.svg'

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export { Arrow }

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
            <a href="/#principios">Empresa</a>
            <a href={SITE.productPage}>Produto</a>
            <a href="/#segmentos">Segmentos</a>
            <a href="/#agentes">Agentes de IA</a>
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
          ['Início', '/#inicio'], ['Empresa', '/#principios'], ['Produto', SITE.productPage], ['Segmentos', '/#segmentos'],
          ['Agentes de IA', '/#agentes'], ['Blog', '/blog'], ['Contato', '/#contato'],
        ].map(([t, h]) => <a key={t} href={h} onClick={close}>{t}</a>)}
        <div className="drawer__auth">
          <a className="btn btn--outline-light" href={SITE.signup}>Cadastre-se</a>
          <a className="btn btn--lime" href={SITE.customerArea}>Login</a>
        </div>
      </div>
    </>
  )
}
