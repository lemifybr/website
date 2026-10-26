// Markdown -> HTML em texto, igual ao renderizador do navegador (src/blog/markdown.jsx):
// nada de HTML cru (tudo é escapado) e só links http(s), mailto e caminhos do próprio site.
export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const safeUrl = (u) => (/^(https?:\/\/|mailto:|\/|#)/i.test(u.trim()) ? u.trim() : '#')

function inline(text) {
  let out = ''
  const re = /(`[^`]+`)|(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) out += esc(text.slice(last, m.index))
    const t = m[0]
    if (m[1]) out += `<code>${esc(t.slice(1, -1))}</code>`
    else if (m[2]) {
      const [, alt, src] = t.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      out += `<img src="${esc(safeUrl(src))}" alt="${esc(alt)}" loading="lazy">`
    } else if (m[3]) {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const external = /^https?:\/\//i.test(href)
      out += `<a href="${esc(safeUrl(href))}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${inline(label)}</a>`
    } else if (m[4]) out += `<strong>${inline(t.slice(2, -2))}</strong>`
    else out += `<em>${inline(t.slice(1, -1))}</em>`
    last = m.index + t.length
  }
  if (last < text.length) out += esc(text.slice(last))
  return out
}

export function markdownToHtml(source) {
  const lines = String(source || '').replace(/\r\n/g, '\n').split('\n')
  const html = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }

    if (/^```/.test(line)) {
      const code = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      html.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`)
      continue
    }

    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) { const n = Math.min(h[1].length + 1, 4); html.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue }

    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { html.push('<hr>'); i++; continue }

    if (/^>\s?/.test(line)) {
      const q = []
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''))
      html.push(`<blockquote>${inline(q.join(' '))}</blockquote>`)
      continue
    }

    const ul = /^\s*[-*+]\s+/
    const ol = /^\s*\d+[.)]\s+/
    if (ul.test(line) || ol.test(line)) {
      const ordered = ol.test(line)
      const re = ordered ? ol : ul
      const items = []
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].replace(re, ''))
      const tag = ordered ? 'ol' : 'ul'
      html.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join('')}</${tag}>`)
      continue
    }

    const para = []
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>\s?|\s*[-*+]\s+|\s*\d+[.)]\s+)/.test(lines[i])) para.push(lines[i++])
    html.push(`<p>${inline(para.join(' '))}</p>`)
  }

  return html.join('\n')
}
