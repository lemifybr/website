import { useEffect } from 'react'
import '../institutional/site.css'
import './legal.css'
import Header from '../institutional/Header.jsx'
import Footer from '../institutional/Footer.jsx'
import { LEGAL_LINKS } from './common.js'

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function Block({ block }) {
  if (typeof block === 'string') return <p>{block}</p>
  return <ul>{block.list.map((item) => <li key={item}>{item}</li>)}</ul>
}

/** Renderiza qualquer documento legal (src/legal/*.js) com menu, índice e semântica para SEO. */
export default function LegalPage({ doc }) {
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0) }, [doc.path])

  return (
    <div className="inst legal">
      <Header />
      <main className="legal__main">
        <div className="wrap">
          <nav className="legal__tabs" aria-label="Documentos legais">
            {LEGAL_LINKS.map(([href, label]) => (
              <a key={href} href={href} aria-current={href === doc.path ? 'page' : undefined}>{label}</a>
            ))}
          </nav>

          <article className="legal__doc">
            <div className="legal__layout">
              <aside className="legal__toc" aria-label="Neste documento">
                <strong>Neste documento</strong>
                <ol>
                  {doc.sections.map((s) => <li key={s.title}><a href={`#${slug(s.title)}`}>{s.title.replace(/^d+.s*/, '')}</a></li>)}
                </ol>
              </aside>

              <div className="legal__col">
                <header>
                  <span className="eyebrow">Documentos legais</span>
                  <h1>{doc.h1}</h1>
                  <p className="legal__updated">Última atualização: {doc.updated}</p>
                  <p className="legal__intro">{doc.intro}</p>
                </header>

                <div className="legal__body">
                  {doc.sections.map((s) => (
                    <section key={s.title} id={slug(s.title)} aria-labelledby={`${slug(s.title)}-t`}>
                      <h2 id={`${slug(s.title)}-t`}>{s.title}</h2>
                      {s.blocks.map((b, i) => <Block key={i} block={b} />)}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
