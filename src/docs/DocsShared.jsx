import { useState } from 'react'
import logoDark from '../institutional/assets/logo-dark.svg'
import logoLight from '../institutional/assets/logo-light.svg'
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

/** Alterna entre tema claro e escuro. */
function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark'
  return (
    <button type="button" className="docs__theme" onClick={onToggle} aria-label={dark ? 'Usar tema claro' : 'Usar tema escuro'} title={dark ? 'Tema claro' : 'Tema escuro'}>
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
      )}
    </button>
  )
}

/** Cabeçalho fixo das páginas de documentação: logo, busca, atalhos e abas. */
export function DocsHeader({ query, setQuery, searchRef, placeholder, tabs, active, theme = 'light', onToggleTheme }) {
  return (
    <header className="docs__top">
      <div className="docs__bar">
        <a href="/" className="docs__logo" aria-label="Lemify, ir para o site"><img src={theme === 'dark' ? logoLight : logoDark} alt="Lemify" /><span>Docs</span></a>
        <label className="docs__search">
          <span className="sr">Buscar na documentação</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
          <kbd>Ctrl K</kbd>
        </label>
        <nav className="docs__links" aria-label="Atalhos">
          <a href={API_FULL_REFERENCE} target="_blank" rel="noopener noreferrer">API completa</a>
          <a href={SITE.customerArea}>Login</a>
          {onToggleTheme && <ThemeToggle theme={theme} onToggle={onToggleTheme} />}
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
