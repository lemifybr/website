import { useEffect, useRef } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import { gsap, ScrollTrigger, prefersReducedMotion, useSmoothScroll } from '../institutional/motion.jsx'
import lemifyCss from './lemify.css?inline'
import planosCss from './planos.css?inline'
import lemifyHtml from './lemify.body.html?raw'
import planosHtml from './planos.body.html?raw'
import lemifyScripts from './lemify.scripts.js'
import planosScripts from './planos.scripts.js'

const PAGES = {
  lemify: { css: lemifyCss, html: lemifyHtml, scripts: lemifyScripts },
  planos: { css: planosCss, html: planosHtml, scripts: planosScripts },
}

// Páginas do produto (/lemify e /lemify/planos): conteúdo e estilos feitos pela agência, montados aqui
// com o mesmo scroll suave e as mesmas entradas animadas do site institucional.
export default function ProductPage({ page }) {
  const root = useRef(null)
  const { css, html, scripts } = PAGES[page]
  useSmoothScroll()

  // Scripts originais da página (vídeo, modal, planos pela API). Rodam depois do HTML estar no DOM.
  useEffect(() => {
    scripts.forEach((code) => {
      try { new Function(code)() } catch (e) { console.error('product script', e) }
    })
  }, [scripts])

  // Cada bloco entra subindo e aparecendo; o transform é removido ao fim para não afetar elementos fixos/sticky.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section:not(#topo), .ft', root.current).forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 48, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, root)
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => { clearTimeout(t); ctx.revert() }
  }, [page])

  // Os estilos vão dentro da própria árvore: chegam junto com o HTML (sem piscar sem estilo) e saem quando a
  // rota desmonta, já que usam seletores globais como `body`.
  return (
    <>
      <style data-product={page} dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={root} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
