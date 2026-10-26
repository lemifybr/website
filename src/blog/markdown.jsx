import { Fragment } from 'react'

// Renderizador de Markdown mínimo e seguro: não interpreta HTML (tudo vira texto) e só aceita
// links http(s), mailto e caminhos do próprio site. Os posts vêm do LCC, mas nunca confiamos no conteúdo.
const safeUrl = (u) => (/^(https?:\/\/|mailto:|\/|#)/i.test(u.trim()) ? u.trim() : '#')

function inline(text, keyBase = '') {
  const out = []
  const re = /(`[^`]+`)|(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)/g
  let last = 0
  let m
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const t = m[0]
    const key = `${keyBase}${i++}`
    if (m[1]) out.push(<code key={key}>{t.slice(1, -1)}</code>)
    else if (m[2]) {
      const [, alt, src] = t.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      out.push(<img key={key} src={safeUrl(src)} alt={alt} loading="lazy" />)
    } else if (m[3]) {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const external = /^https?:\/\//i.test(href)
      out.push(<a key={key} href={safeUrl(href)} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inline(label, key)}</a>)
    } else if (m[4]) out.push(<strong key={key}>{inline(t.slice(2, -2), key)}</strong>)
    else out.push(<em key={key}>{inline(t.slice(1, -1), key)}</em>)
    last = m.index + t.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default function Markdown({ source }) {
  const lines = (source || '').replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }

    const fence = line.match(/^```(\w*)/)
    if (fence) {
      const code = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      blocks.push({ type: 'code', text: code.join('\n') })
      continue
    }

    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) { blocks.push({ type: 'h', level: Math.min(h[1].length + 1, 4), text: h[2] }); i++; continue }

    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { blocks.push({ type: 'hr' }); i++; continue }

    if (/^>\s?/.test(line)) {
      const q = []
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''))
      blocks.push({ type: 'quote', text: q.join(' ') })
      continue
    }

    const ul = /^\s*[-*+]\s+/
    const ol = /^\s*\d+[.)]\s+/
    if (ul.test(line) || ol.test(line)) {
      const ordered = ol.test(line)
      const re = ordered ? ol : ul
      const items = []
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].replace(re, ''))
      blocks.push({ type: ordered ? 'ol' : 'ul', items })
      continue
    }

    const para = []
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>\s?|\s*[-*+]\s+|\s*\d+[.)]\s+)/.test(lines[i])) para.push(lines[i++])
    blocks.push({ type: 'p', text: para.join(' ') })
  }

  return (
    <>
      {blocks.map((b, k) => {
        if (b.type === 'h') { const H = `h${b.level}`; return <H key={k}>{inline(b.text, `h${k}`)}</H> }
        if (b.type === 'p') return <p key={k}>{inline(b.text, `p${k}`)}</p>
        if (b.type === 'ul') return <ul key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, `u${k}${j}`)}</li>)}</ul>
        if (b.type === 'ol') return <ol key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, `o${k}${j}`)}</li>)}</ol>
        if (b.type === 'quote') return <blockquote key={k}>{inline(b.text, `q${k}`)}</blockquote>
        if (b.type === 'code') return <pre key={k}><code>{b.text}</code></pre>
        return <Fragment key={k}><hr /></Fragment>
      })}
    </>
  )
}
