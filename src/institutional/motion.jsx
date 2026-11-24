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

let activeLenis = null

/** Rola suavemente até uma posição Y usando a instância ativa do Lenis (sem conflitar com scroll-behavior). */
export function scrollToY(top, { duration = 0.72, onComplete } = {}) {
  const y = Math.max(0, top)
  if (activeLenis && !prefersReducedMotion()) {
    activeLenis.scrollTo(y, {
      duration,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      onComplete,
    })
  } else {
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    if (onComplete) setTimeout(onComplete, prefersReducedMotion() ? 0 : 420)
  }
}

/** Scroll suavizado (Lenis) sincronizado com o ScrollTrigger. Âncoras (#id) funcionam na mesma página e ao chegar de outra rota. */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    const lenis = reduced ? null : new Lenis({ duration: 0.6 })
    let tick = null
    if (lenis) {
      activeLenis = lenis
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const scrollToHash = (rawHash, { immediate = false } = {}) => {
      if (!rawHash || rawHash === '#') return false
      let id
      try {
        id = decodeURIComponent(rawHash.slice(1))
      } catch {
        id = rawHash.slice(1)
      }
      const target = document.getElementById(id)
      if (!target) return false
      lenis?.resize()
      const pad = id === 'inicio' ? 0 : (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 90)
      const top = id === 'inicio' ? 0 : Math.max(0, target.getBoundingClientRect().top + window.scrollY - pad)
      if (immediate && Math.abs(window.scrollY - top) < 2) return true
      if (lenis) {
        lenis.scrollTo(top, immediate ? { immediate: true, force: true } : { duration: 0.9 })
      } else {
        window.scrollTo({ top, left: 0, behavior: immediate || reduced ? 'auto' : 'smooth' })
      }
      ScrollTrigger.update()
      return true
    }

    // Ao chegar de outra página com #hash (ex.: /lemify -> /#agentes), a seção só existe após o React montar
    // e pode se deslocar quando o pin do ScrollTrigger, fontes ou blocos assíncronos terminam de medir.
    let stopSettling = null
    let rafId = 0
    if (window.location.hash) {
      let settled = false
      const align = () => {
        if (settled) return
        scrollToHash(window.location.hash, { immediate: true })
      }
      const onKeyDown = (e) => {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) stopSettling?.()
      }
      const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(align)
      ro?.observe(document.documentElement)
      ScrollTrigger.addEventListener('refresh', align)
      const settleTimer = setTimeout(() => stopSettling?.(), 1800)

      stopSettling = () => {
        if (settled) return
        settled = true
        cancelAnimationFrame(rafId)
        clearTimeout(settleTimer)
        ScrollTrigger.removeEventListener('refresh', align)
        ro?.disconnect()
        window.removeEventListener('wheel', stopSettling)
        window.removeEventListener('touchstart', stopSettling)
        window.removeEventListener('pointerdown', stopSettling)
        window.removeEventListener('keydown', onKeyDown)
      }

      window.addEventListener('wheel', stopSettling, { passive: true })
      window.addEventListener('touchstart', stopSettling, { passive: true })
      window.addEventListener('pointerdown', stopSettling, { passive: true })
      window.addEventListener('keydown', onKeyDown)

      rafId = requestAnimationFrame(() => {
        if (settled) return
        ScrollTrigger.refresh()
        align()
      })
      document.fonts?.ready.then(() => {
        if (settled) return
        ScrollTrigger.refresh()
        align()
      })
    }

    // Links do menu como "/#agentes" na própria página rolam suave sem salto instantâneo.
    const onClick = (e) => {
      const link = e.target.closest?.('a[href*="#"]')
      if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || link.target === '_blank') return
      const url = new URL(link.href, window.location.href)
      const samePath = (url.pathname.replace(/\/+$/, '') || '/') === (window.location.pathname.replace(/\/+$/, '') || '/')
      if (url.origin !== window.location.origin || !samePath || !url.hash) return
      stopSettling?.()
      if (!scrollToHash(url.hash, { immediate: false })) return
      e.preventDefault()
      if (window.location.hash !== url.hash) history.pushState(null, '', url.hash)
    }
    const onHashChange = () => {
      stopSettling?.()
      scrollToHash(window.location.hash, { immediate: false })
    }
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      stopSettling?.()
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHashChange)
      if (lenis) {
        if (activeLenis === lenis) activeLenis = null
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    }
  }, [])
}
