import { useEffect, useRef } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import './site.css'
import { Cursor, useScrollMotion, useSmoothScroll, ScrollTrigger } from './motion.jsx'
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import { Integrations, Products, Values, Agents, Support, Faq, Contact } from './Sections.jsx'
import Footer from './Footer.jsx'
import LatestPosts from '../blog/LatestPosts.jsx'

export default function Site() {
  const root = useRef(null)
  useScrollMotion(root)
  useSmoothScroll()

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="inst" ref={root}>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <Cursor />
      <Header />
      <main id="conteudo">
        <Hero />
        <Integrations />
        <Products />
        <Values />
        <Agents />
        <Support />
        <LatestPosts />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
