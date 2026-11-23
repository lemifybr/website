import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from './siteConfig.js'
import './demoModal.css'

const WIDGET_SRC = 'https://app.lemify.com.br/public/widget.js'
const FORM_ID = '3'
const TARGET_ID = 'lfy-form-container'

// Sobrescreve os estilos padrão do Shadow DOM do widget.js com a identidade visual do Lemify.
const SHADOW_THEME_CSS = `
  * {
    box-sizing: border-box;
    font-family: 'Bricolage Grotesque Variable', 'Poppins', system-ui, sans-serif !important;
  }
  .lmf-form-wrapper {
    padding: 0 !important;
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
  }
  .lmf-title,
  .lmf-desc {
    display: none !important;
  }
  .lmf-form-group {
    margin-bottom: 14px !important;
  }
  .lmf-form-group label {
    display: block;
    font-size: 13.5px !important;
    font-weight: 600 !important;
    color: #0e2421 !important;
    margin-bottom: 6px !important;
    letter-spacing: -0.01em;
  }
  .lmf-form-group input,
  .lmf-form-group textarea {
    width: 100%;
    padding: 12px 14px !important;
    border-radius: 8px !important;
    border: 1.5px solid rgba(28, 64, 59, 0.18) !important;
    background: #f6f5ee !important;
    color: #0e2421 !important;
    font-size: 15px !important;
    line-height: 1.4;
    outline: none !important;
    transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease !important;
  }
  .lmf-form-group input:hover,
  .lmf-form-group textarea:hover {
    border-color: rgba(28, 64, 59, 0.36) !important;
  }
  .lmf-form-group input:focus,
  .lmf-form-group textarea:focus {
    background: #ffffff !important;
    border-color: #1c403b !important;
    box-shadow: 0 0 0 3px rgba(28, 64, 59, 0.14) !important;
  }
  .lmf-btn {
    width: 100%;
    padding: 14px 20px !important;
    margin-top: 8px !important;
    border: 0 !important;
    border-radius: 10px !important;
    background: #1c403b !important;
    color: #d8fe6a !important;
    font-size: 15.5px !important;
    font-weight: 600 !important;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease !important;
  }
  .lmf-btn:hover:not(:disabled) {
    background: #0e2421 !important;
    opacity: 1 !important;
  }
  .lmf-btn:focus-visible {
    outline: 2px solid #1c403b !important;
    outline-offset: 2px !important;
  }
  .lmf-btn:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed;
  }
  .lmf-error {
    margin-top: 10px !important;
    padding: 10px 12px !important;
    border-radius: 8px !important;
    font-size: 13.5px !important;
    background: #fef2f2 !important;
    color: #b91c1c !important;
    border: 1px solid #fecaca !important;
  }
  .lmf-success {
    padding: 28px 20px !important;
    border-radius: 12px !important;
    background: #e3efe4 !important;
    color: #1c403b !important;
    border: 1px solid rgba(28, 64, 59, 0.2) !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    line-height: 1.45;
  }
`

function applyBrandTheme(container) {
  if (!container) return

  // Modo Shadow DOM (versão atual do widget.js)
  const sr = container.shadowRoot
  if (sr) {
    if (!sr.querySelector('style[data-lemify-theme]')) {
      const style = document.createElement('style')
      style.setAttribute('data-lemify-theme', 'true')
      style.textContent = SHADOW_THEME_CSS
      sr.appendChild(style)
    }
    const btn = sr.querySelector('.lmf-btn')
    if (btn && btn.textContent?.trim() === 'Enviar') {
      btn.textContent = 'Agendar demonstração →'
    }
    return
  }

  // Modo Light DOM (.lfy-form)
  const lightBtn = container.querySelector('.lfy-submit')
  if (lightBtn && lightBtn.textContent?.trim() === 'Enviar') {
    lightBtn.textContent = 'Agendar demonstração →'
  }
}

function isDemoLink(anchor) {
  if (!anchor || anchor.hasAttribute('data-demo-bypass')) return false
  if (anchor.hasAttribute('data-demo-modal')) return true
  const href = anchor.getAttribute('href') || ''
  if (!href.includes('wa.me/551148635054')) return false
  try {
    return decodeURIComponent(href).toLowerCase().includes('demonstra')
  } catch {
    return href.toLowerCase().includes('demonstra')
  }
}

export default function DemoModal() {
  const dialogRef = useRef(null)
  const containerRef = useRef(null)
  const scriptInjectedRef = useRef(false)
  const pollRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => () => clearInterval(pollRef.current), [])

  const ensureWidgetLoaded = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const hasContent = () => Boolean(container.shadowRoot?.childElementCount || container.childElementCount)
    if (hasContent()) {
      applyBrandTheme(container)
      setLoading(false)
      setLoadFailed(false)
      return
    }

    if (scriptInjectedRef.current) return
    scriptInjectedRef.current = true
    setLoading(true)
    setLoadFailed(false)

    document.querySelectorAll(`script[data-mode="inline-form"][data-form-id="${FORM_ID}"]`).forEach((s) => s.remove())

    const script = document.createElement('script')
    script.src = WIDGET_SRC
    script.async = true
    script.setAttribute('data-form-id', FORM_ID)
    script.setAttribute('data-mode', 'inline-form')
    script.setAttribute('data-target', `#${TARGET_ID}`)

    let attempts = 0
    clearInterval(pollRef.current)
    pollRef.current = setInterval(() => {
      attempts += 1
      if (hasContent()) {
        clearInterval(pollRef.current)
        applyBrandTheme(container)
        setLoading(false)
      } else if (attempts >= 40) {
        clearInterval(pollRef.current)
        setLoading(false)
        setLoadFailed(true)
        scriptInjectedRef.current = false
      }
    }, 150)

    script.onerror = () => {
      clearInterval(pollRef.current)
      setLoading(false)
      setLoadFailed(true)
      scriptInjectedRef.current = false
    }

    document.body.appendChild(script)
  }, [])

  const openModal = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open && dialog.showModal) {
      dialog.showModal()
    }
    ensureWidgetLoaded()
  }, [ensureWidgetLoaded])

  const closeModal = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close()
  }, [])

  useEffect(() => {
    const onDocClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const trigger = e.target.closest?.('a, button')
      if (!trigger || !isDemoLink(trigger)) return
      e.preventDefault()
      openModal()
    }

    const onCustomOpen = () => openModal()

    document.addEventListener('click', onDocClick)
    window.addEventListener('lemify:open-demo', onCustomOpen)
    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('lemify:open-demo', onCustomOpen)
    }
  }, [openModal])

  return (
    <dialog
      ref={dialogRef}
      data-lenis-prevent
      className="demo-modal"
      aria-labelledby="demo-modal-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) closeModal()
      }}
    >
      <div className="demo-modal__box">
        <div className="demo-modal__head">
          <div>
            <span className="demo-modal__eyebrow">Demonstração ao vivo</span>
            <h2 id="demo-modal-title" className="demo-modal__title">Agende sua demonstração</h2>
            <p className="demo-modal__sub">
              Preencha seus dados e mostramos o Lemify funcionando no cenário da sua empresa.
            </p>
          </div>
          <button type="button" className="demo-modal__close" onClick={closeModal} aria-label="Fechar formulário">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </button>
        </div>

        <div className="demo-modal__body">
          {loading && <p className="demo-modal__status">Carregando formulário…</p>}
          {loadFailed && (
            <div className="demo-modal__fallback">
              <p>Não foi possível carregar o formulário agora.</p>
              <a
                className="demo-modal__wa-btn"
                href={SITE.demo}
                target="_blank"
                rel="noopener noreferrer"
                data-demo-bypass
              >
                Agendar pelo WhatsApp →
              </a>
            </div>
          )}
          <div id={TARGET_ID} ref={containerRef} className="demo-modal__form" />
        </div>
      </div>
    </dialog>
  )
}
