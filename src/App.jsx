import { useEffect } from 'react'

import Site from './institutional/Site.jsx'
import BlingManual from './components/Terms/BlingManual.jsx'
import LegalPage from './legal/LegalPage.jsx'
import DocsPage from './docs/DocsPage.jsx'
import BlogList from './blog/BlogList.jsx'
import BlogPost from './blog/BlogPost.jsx'
import termos from './legal/termos.js'
import privacidade from './legal/privacidade.js'
import reembolso from './legal/reembolso.js'
import termosIa from './legal/termosIa.js'
import google from './legal/google.js'
import lgpd from './legal/lgpd.js'
import { applySeo, SEO } from './seo.js'

const LEGAL_DOCS = [termos, privacidade, reembolso, termosIa, google, lgpd]

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const doc = LEGAL_DOCS.find((d) => d.path === path)
  const post = path.match(/^\/blog\/([^/]+)$/)
  const known = !!doc || path === '/manual/bling' || path === '/docs' || path === '/blog' || !!post

  useEffect(() => {
    applySeo(known ? SEO[path.startsWith('/blog/') ? '/blog' : path] : SEO['/'], known ? path : '/')
    // Só força o topo em páginas sem âncora; com #hash o navegador cuida do scroll.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [known, path])

  if (doc) return <LegalPage doc={doc} />
  if (path === '/manual/bling') return <BlingManual />
  if (path === '/docs') return <DocsPage />
  if (path === '/blog') return <BlogList />
  if (post) return <BlogPost slug={decodeURIComponent(post[1])} />
  return <Site />
}

export default App
