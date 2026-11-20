/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Entrada sutil por scroll via atributos data, escopada ao elemento raiz:
 *  [data-reveal]   fade + leve deslocamento vertical ao entrar
 *  [data-stagger]  filhos entram em sequência curta e suave
 */
export function useScrollMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = (s) => gsap.utils.toArray(s, root)

      q('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 14, duration: 0.45, ease: 'power2.out',
          delay: parseFloat(el.dataset.delay || 0),
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      q('[data-stagger]').forEach((el) => {
        gsap.from(el.children, {
          opacity: 0, y: 16, duration: 0.45, ease: 'power2.out', stagger: 0.06,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); mm.revert() }
  }, [rootRef])
}

/** Scroll suavizado (Lenis) sincronizado com o ScrollTrigger. Âncoras (#id) também rolam suave. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 0.6, anchors: { offset: -90 } })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Links do menu como "/#produtos" fazem salto instantâneo no navegador; aqui rolam com animação.
    const onClick = (e) => {
      const link = e.target.closest?.('a[href*="#"]')
      if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || link.target === '_blank') return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -90, duration: 0.9 })
      history.pushState(null, '', url.hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
