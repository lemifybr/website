/* eslint-disable react-refresh/only-export-components, no-unused-vars */
import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Custom cursor: dot + ring. The ring grows on interactive elements and shows a label for [data-cursor]. */
export function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return
    document.documentElement.classList.add('has-cursor')
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 })

    const move = (e) => {
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY)
      ring.current.style.opacity = 1
      dot.current.style.opacity = 1
    }
    const over = (e) => {
      const t = e.target.closest?.('a, button, input, [data-cursor], [data-hover]')
      const r = ring.current
      if (!t) { r.className = 'cursor-ring'; label.current.textContent = ''; return }
      const text = t.getAttribute('data-cursor')
      r.className = 'cursor-ring ' + (text ? 'is-label' : 'is-hover')
      label.current.textContent = text || ''
    }
    const leave = () => { ring.current.style.opacity = 0; dot.current.style.opacity = 0 }
    const down = () => ring.current.classList.add('is-down')
    const up = () => ring.current.classList.remove('is-down')

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={label} /></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

/** Magnetic wrapper: the child is pulled toward the pointer when it gets close. */
export function Magnetic({ children, strength = 0.35, as: Tag = 'span', className = '', ...rest }) {
  const el = useRef(null)
  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return
    const node = el.current
    const xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    const yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    const move = (e) => {
      const r = node.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => { xTo(0); yTo(0) }
    node.addEventListener('mousemove', move)
    node.addEventListener('mouseleave', leave)
    return () => { node.removeEventListener('mousemove', move); node.removeEventListener('mouseleave', leave) }
  }, [strength])
  return <Tag ref={el} className={`magnetic ${className}`} {...rest}>{children}</Tag>
}

/** 3D tilt + moving glare following the pointer. */
export function Tilt({ children, max = 8, className = '', ...rest }) {
  const el = useRef(null)
  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return
    const node = el.current
    const rx = gsap.quickTo(node, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(node, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    gsap.set(node, { transformPerspective: 900 })
    const move = (e) => {
      const r = node.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      ry((px - 0.5) * max * 2)
      rx((0.5 - py) * max * 2)
      node.style.setProperty('--gx', `${px * 100}%`)
      node.style.setProperty('--gy', `${py * 100}%`)
    }
    const leave = () => { rx(0); ry(0) }
    node.addEventListener('mousemove', move)
    node.addEventListener('mouseleave', leave)
    return () => { node.removeEventListener('mousemove', move); node.removeEventListener('mouseleave', leave) }
  }, [max])
  return <div ref={el} className={`tilt ${className}`} {...rest}>{children}</div>
}

/**
 * Generic scroll motion driven by data attributes, scoped to a root element:
 *  [data-reveal]            fade + rise on enter ("left"/"right"/"scale" variants)
 *  [data-stagger]           children fade + rise one after another
 *  [data-parallax="0.2"]    vertical parallax (scrubbed), positive = slower than scroll
 *  [data-clip]              image unveils with a clip-path as it enters
 *  [data-count="100"]       number counts up
 *  [data-lines]             headline revealed line by line (words masked)
 */
export function useScrollMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = (s) => gsap.utils.toArray(s, root)

      q('[data-reveal]').forEach((el) => {
        const v = el.dataset.reveal
        const from = { opacity: 0, y: 40 }
        if (v === 'left') Object.assign(from, { x: -50, y: 0 })
        if (v === 'right') Object.assign(from, { x: 50, y: 0 })
        if (v === 'scale') Object.assign(from, { scale: 0.92, y: 20 })
        gsap.from(el, {
          ...from, duration: 1, ease: 'power3.out',
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      q('[data-stagger]').forEach((el) => {
        gsap.from(el.children, {
          opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })

      q('[data-parallax]').forEach((el) => {
        const s = parseFloat(el.dataset.parallax)
        gsap.fromTo(el, { yPercent: -s * 50 }, {
          yPercent: s * 50, ease: 'none',
          scrollTrigger: { trigger: el.closest('[data-parallax-scope]') || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })

      q('[data-clip]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8% round 32px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 32px)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 40%', scrub: true },
        })
      })

      q('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count)
        const o = { v: 0 }
        gsap.to(o, {
          v: end, duration: 1.8, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(o.v) },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      q('[data-lines]').forEach((el) => {
        const words = el.querySelectorAll('.w > span')
        gsap.from(words, {
          yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.045,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); mm.revert() }
  }, [rootRef])
}

/** Splits a string into masked words so [data-lines] can slide them up. */
export function Words({ text, as: Tag = 'span', className = '', id }) {
  return (
    <Tag id={id} className={className} data-lines aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true"><span>{w}</span></span>
          <span className="sp" aria-hidden="true"> </span>
        </Fragment>
      ))}
    </Tag>
  )
}

/** Scroll suavizado (Lenis) sincronizado com o ScrollTrigger. Âncoras (#id) também rolam suave. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -90 } })
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
      lenis.scrollTo(target, { offset: -90, duration: 1.4 })
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
