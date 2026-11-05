import { useEffect, useRef } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import './site.css'
import { Cursor, useScrollMotion, useSmoothScroll, ScrollTrigger } from './motion.jsx'
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import { Principles, Trust, Integrations, Products, Agents, Faq, Contact } from './Sections.jsx'
import Footer from './Footer.jsx'
import LatestPosts from '../blog/LatestPosts.jsx'

export default function Site() {
  const root = useRef(null)
  useScrollMotion(root)
  useSmoothScroll()

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    // Imagens com carregamento tardio mudam a altura da página; sem remedir, as animações por rolagem
    // (seção fixada dos segmentos, destaque dos agentes) disparam no lugar errado.
    let r
    const onLoad = (e) => {
      if (e.target.tagName !== 'IMG') return
      clearTimeout(r)
      r = setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    const el = root.current
    el.addEventListener('load', onLoad, true)
    return () => { clearTimeout(t); clearTimeout(r); el.removeEventListener('load', onLoad, true) }
  }, [])

  return (
    <div className="inst" ref={root}>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <Cursor />
      <Header />
      <main id="conteudo">
        <Hero />
        <Integrations />
        <Principles />
        <Products />
        <Agents />
        <Trust />
        <LatestPosts />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
