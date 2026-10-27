// Roda depois do `vite build`: gera um HTML por página (dist/<rota>/index.html) com título, meta tags,
// JSON-LD e o texto da página no HTML, para buscadores e agentes de IA que não executam JavaScript.
// A Vercel serve o arquivo estático antes de qualquer rewrite; o React assume por cima ao carregar.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO } from '../src/seo.js'
import termos from '../src/legal/termos.js'
import privacidade from '../src/legal/privacidade.js'
import reembolso from '../src/legal/reembolso.js'
import termosIa from '../src/legal/termosIa.js'
import google from '../src/legal/google.js'
import lgpd from '../src/legal/lgpd.js'
import { MODULES, GROUPS } from '../src/docs/modules.js'
import { FAQ } from '../src/institutional/faq.js'
import { SITE, esc, setHead, jsonLd, addToHead, setRoot } from '../api/_html.js'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const p = (t) => `<p>${esc(t)}</p>`
const nav = '<nav><a href="/">Início</a> · <a href="/blog">Blog</a> · <a href="/docs">Documentação</a></nav>'
const block = (b) => (typeof b === 'string' ? p(b) : `<ul>${b.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`)

function legalBody(doc) {
  return `${nav}<main><article><h1>${esc(doc.h1)}</h1>${p(`Última atualização: ${doc.updated}`)}${p(doc.intro)}${doc.sections
    .map((s) => `<section><h2>${esc(s.title)}</h2>${s.blocks.map(block).join('')}</section>`)
    .join('')}</article></main>`
}

function docsBody() {
  const groups = GROUPS.map((g) => {
    const mods = MODULES.filter((m) => m.group === g)
    if (!mods.length) return ''
    return `<section><h2>${esc(g)}</h2>${mods
      .map((m) => `<article><h3>${esc(m.title)}</h3>${p(m.summary)}${p(m.description)}<ul>${m.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></article>`)
      .join('')}</section>`
  }).join('')
  return `${nav}<main><article><h1>Documentação do Lemify</h1>${p(SEO['/docs'].description)}${groups}<section><h2>API</h2>${p('Referência completa da API do Lemify (OpenAPI):')}<a href="https://docs.lemify.com.br/api-docs/">docs.lemify.com.br/api-docs</a></section></article></main>`
}

function blingBody() {
  const steps = ['Passos no Bling', 'Autorização', 'Passos Lemify', 'Utilização e sincronização', 'Suporte']
  return `${nav}<main><article><h1>Manual de integração Lemify e Bling</h1>${p(SEO['/manual/bling'].description)}<ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></article></main>`
}

const faqBody = `<section><h2>Perguntas frequentes sobre o Lemify</h2>${FAQ.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')}</section>`

const pages = [
  ...[termos, privacidade, reembolso, termosIa, google, lgpd].map((d) => ({ route: d.path, body: legalBody(d), name: d.h1 })),
  { route: '/docs', body: docsBody(), name: 'Documentação do Lemify' },
  { route: '/manual/bling', body: blingBody(), name: 'Manual de integração com o Bling' },
]

const webPage = (route, name, description) =>
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}${route}#webpage`,
    url: `${SITE}${route}`,
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#organization` },
  })

for (const { route, body, name } of pages) {
  const meta = SEO[route]
  let html = setHead(template, { title: meta.title, description: meta.description, url: `${SITE}${route}` })
  html = addToHead(html, webPage(route, name, meta.description))
  html = setRoot(html, body)
  const dir = path.join(dist, route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  console.log(`prerender ${route}`)
}

// Home: acrescenta o FAQ (texto + schema FAQPage) ao bloco estático que já existe no index.html.
const faqSchema = jsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE}/#faq`,
  inLanguage: 'pt-BR',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})
let home = addToHead(template, faqSchema)
home = home.replace('</main>', () => `${faqBody}\n      </main>`)
fs.writeFileSync(path.join(dist, 'index.html'), home)
console.log('prerender / (FAQ)')
