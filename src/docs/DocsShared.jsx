import { useState } from 'react'
import logo from '../institutional/assets/logo-dark.svg'
import { SITE } from '../institutional/siteConfig.js'
import { API_FULL_REFERENCE } from './api.js'

/** Bloco de código com botão de copiar. */
export function Code({ children }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* sem permissão de área de transferência */ }
  }
  return (
    <div className="code">
      <button type="button" onClick={copy} aria-label="Copiar código">{copied ? 'Copiado' : 'Copiar'}</button>
      <pre><code>{children}</code></pre>
    </div>
  )
}

/** Cabeçalho fixo das páginas de documentação: logo, busca, atalhos e abas. */
export function DocsHeader({ query, setQuery, searchRef, placeholder, tabs, active }) {
  return (
    <header className="docs__top">
      <div className="docs__bar">
        <a href="/" className="docs__logo" aria-label="Lemify, ir para o site"><img src={logo} alt="Lemify" /><span>Docs</span></a>
        <label className="docs__search">
          <span className="sr">Buscar na documentação</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
          <kbd>Ctrl K</kbd>
        </label>
        <nav className="docs__links" aria-label="Atalhos">
          <a href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">API completa</a>
          <a href={SITE.customerArea}>Login</a>
          <a className="btn btn--sm btn--dark" href={SITE.demo} target="_blank" rel="noopener noreferrer">Cadastre-se</a>
        </nav>
      </div>
      <nav className="docs__tabs" aria-label="Seções da documentação">
        {tabs.map(([id, label, href]) => (
          <a key={id} href={href} className={active === id ? 'is-on' : ''} aria-current={active === id ? 'page' : undefined}>{label}</a>
        ))}
      </nav>
    </header>
  )
}
