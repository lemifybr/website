import { useCallback, useEffect, useState } from 'react'

export const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Ctrl/Cmd + K foca a busca. */
export function useSearchShortcut(ref) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); ref.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ref])
}

const THEME_KEY = 'lemify-docs-theme'

const initialTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* armazenamento bloqueado: segue a preferência do sistema */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Tema claro/escuro da documentação: segue o sistema até a pessoa escolher, e lembra a escolha. */
export function useDocsTheme() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    // Fundo e controles nativos (rolagem, campos) acompanham o tema, inclusive fora do .docs
    const root = document.documentElement
    root.style.colorScheme = theme
    root.style.background = theme === 'dark' ? '#0b1d1a' : ''
    return () => { root.style.colorScheme = ''; root.style.background = '' }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(THEME_KEY, next) } catch { /* sem persistência */ }
      return next
    })
  }, [])

  return [theme, toggle]
}
