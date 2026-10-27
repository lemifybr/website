// Utilidades para entregar o index.html do site já com título, meta tags e texto no HTML
// (buscadores e agentes de IA que não executam JavaScript). Usadas pelas funções e pelo prerender do build.
export const SITE = 'https://lemify.com.br'

export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const setTag = (html, re, tag) => (re.test(html) ? html.replace(re, () => tag) : html)

export function setHead(html, { title, description, url, image = `${SITE}/og-image.jpg`, type = 'website' }) {
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(url)}" />`)
  html = setTag(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${esc(url)}" />`)
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`)
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`)
  html = setTag(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(image)}" />`)
  html = setTag(html, /<meta property="og:image:alt"[^>]*>\s*/, '')
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`)
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(description)}" />`)
  html = setTag(html, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${esc(image)}" />`)
  return html
}

// "<" escapado para o JSON nunca fechar a tag <script>.
export const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\u003c')}</script>`

export const addToHead = (html, tag) => html.replace('</head>', () => `${tag}\n</head>`)

// Troca o conteúdo estático de #root. Fica fora da tela (como o da home): o React o substitui ao carregar.
const HIDDEN = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)'
export function setRoot(html, inner) {
  const start = html.indexOf('<div id="root">')
  const end = html.indexOf('<noscript>')
  if (start === -1 || end === -1 || end < start) return html
  return `${html.slice(0, start)}<div id="root">\n    <div style="${HIDDEN}">\n${inner}\n    </div>\n  </div>\n  ${html.slice(end)}`
}
