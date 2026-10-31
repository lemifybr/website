// PostHog do site institucional: mesmo projeto do Lemify (app.lemify.com.br), para medir a jornada
// do visitante até o cadastro. A chave "phc_" é pública por definição (só envia eventos).
// A biblioteca é carregada depois da página pronta, fora do caminho crítico.
const KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_tTB8AGnT5ZuVJHDrSgEaBLh2ZwAfw9pVECMLo64nytFT'
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

const isLocal = () => ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname) || window.location.hostname.endsWith('.local')

export function initPostHog() {
  if (typeof window === 'undefined' || !KEY) return
  // Não suja os dados com acessos de desenvolvimento.
  if (isLocal() && import.meta.env.VITE_POSTHOG_FORCE_LOCAL !== 'true') return

  const start = async () => {
    try {
      const { default: posthog } = await import('posthog-js')
      posthog.init(KEY, {
        api_host: HOST,
        autocapture: true, // cliques e interações (heatmaps)
        capture_pageview: true, // cada página do site é um carregamento completo
        capture_pageleave: true,
        capture_exceptions: true,
        session_recording: { maskAllInputs: true }, // LGPD: campos digitados nunca são gravados
        loaded: (ph) => ph.register({ site: 'institucional' }), // separa estes eventos dos do app
      })
    } catch {
      // análise é opcional: se falhar, o site segue normalmente
    }
  }

  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500))
  if (document.readyState === 'complete') idle(start)
  else window.addEventListener('load', () => idle(start), { once: true })
}
