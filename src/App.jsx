import { useEffect } from 'react'

import Site from './institutional/Site.jsx'
import BlingManual from './components/Terms/BlingManual.jsx'
import LegalPage from './legal/LegalPage.jsx'
import DocsPage from './docs/DocsPage.jsx'
import ApiDocsPage from './docs/ApiDocsPage.jsx'
import BlogList from './blog/BlogList.jsx'
import BlogPost from './blog/BlogPost.jsx'
import termos from './legal/termos.js'
import privacidade from './legal/privacidade.js'
import reembolso from './legal/reembolso.js'
import termosIa from './legal/termosIa.js'
import google from './legal/google.js'
import lgpd from './legal/lgpd.js'
import LemifyPage from './product/LemifyPage.jsx'
import ApiPage from './api-page/ApiPage.jsx'
import { applySeo, SEO } from './seo.js'

const LEGAL_DOCS = [termos, privacidade, reembolso, termosIa, google, lgpd]

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const doc = LEGAL_DOCS.find((d) => d.path === path)
  const post = path.match(/^\/blog\/([^/]+)$/)
  const isLegacyPlans = path === '/lemify/planos'
  const known = !!doc || path === '/manual/bling' || path === '/docs' || path === '/docs/api' || path === '/blog' || path === '/lemify' || path === '/api' || !!post

  useEffect(() => {
    if (isLegacyPlans) {
      window.location.replace('/lemify#planos')
      return
    }
    applySeo(known ? SEO[path.startsWith('/blog/') ? '/blog' : path] : SEO['/'], known ? path : '/')
    // Páginas com useSmoothScroll (/, /lemify, /api) já cuidam da âncora; nas demais, rola até o #hash montado.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    const usesSmoothScroll = !known || path === '/lemify' || path === '/api'
    if (usesSmoothScroll) return
    let id
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      id = window.location.hash.slice(1)
    }
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
    })
    return () => cancelAnimationFrame(raf)
  }, [isLegacyPlans, known, path])

  if (doc) return <LegalPage doc={doc} />
  if (path === '/manual/bling') return <BlingManual />
  if (path === '/docs') return <DocsPage />
  if (path === '/docs/api') return <ApiDocsPage />
  if (path === '/lemify' || isLegacyPlans) return <LemifyPage />
  if (path === '/api') return <ApiPage />
  if (path === '/blog') return <BlogList />
  if (post) return <BlogPost slug={decodeURIComponent(post[1])} />
  return <Site />
}

export default App
