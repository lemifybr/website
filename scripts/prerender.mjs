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
import { AUTH, ENDPOINTS, LIMITS, LLMS, STATUS } from '../src/docs/api.js'
import { FAQ } from '../src/institutional/faq.js'
import {
  LEMIFY_HERO,
  PRODUCT_SHOWCASE,
  AI_AGENTS_SECTION,
  CASES_SECTION,
  DEFAULT_RAW_PLANS,
  buildPlansView,
  getLemifyFaq,
} from '../src/product/lemifyPageData.js'
import { SITE, esc, setHead, jsonLd, addToHead, setRoot } from '../api/_html.js'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const p = (t) => `<p>${esc(t)}</p>`
const nav = '<nav><a href="/">Início</a> · <a href="/lemify">Lemify</a> · <a href="/api">API</a> · <a href="/blog">Blog</a> · <a href="/docs">Documentação</a></nav>'
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
  return `${nav}<main><article><h1>Documentação do Lemify</h1>${p(SEO['/docs'].description)}${groups}<section><h2>API</h2>${p('Mensagens, Agenda e CRM: autenticação, endpoints e exemplos.')}<a href="/docs/api">Documentação da API</a></section></article></main>`
}

function apiBody() {
  const auth = AUTH.map((a) => `<li><strong>${esc(a.name)}</strong> (${esc(a.where)}): ${esc(a.how)}</li>`).join('')
  const limits = LIMITS.map(([n, d]) => `<li>${esc(n)}: ${esc(d)}</li>`).join('')
  const llms = LLMS.map((l) => `<li><a href="${esc(l.url)}">${esc(l.title)}</a>: ${esc(l.text)}</li>`).join('')
  const groups = ENDPOINTS.map((g) => `<section><h2>${esc(g.group)}</h2>${p(g.note)}${g.items
    .map((e) => `<article><h3>${esc(e.method)} ${esc(e.path)} · ${esc(e.title)}</h3>${p(e.text)}${p(`Autenticação: ${e.auth}`)}${e.fields.length ? `<ul>${e.fields.map(([n, t, r, d]) => `<li><code>${esc(n)}</code> (${esc(t)}, ${esc(r)}): ${esc(d)}</li>`).join('')}</ul>` : ''}<pre><code>${esc(e.sample)}</code></pre></article>`)
    .join('')}</section>`).join('')
  const status = STATUS.map(([c, d]) => `<li><code>${esc(c)}</code>: ${esc(d)}</li>`).join('')
  return `${nav}<main><article><h1>API do Lemify</h1>${p(SEO['/docs/api'].description)}<section><h2>Autenticação</h2><ul>${auth}</ul></section><section><h2>Limites de uso</h2><ul>${limits}</ul></section><section><h2>Para IA (llms.txt)</h2><ul>${llms}</ul></section>${groups}<section><h2>Códigos de resposta</h2><ul>${status}</ul></section>${p('Referência completa (OpenAPI):')}<a href="https://docs.lemify.com.br/api-docs/">docs.lemify.com.br/api-docs</a></article></main>`
}

function blingBody() {
  const steps = ['Passos no Bling', 'Autorização', 'Passos Lemify', 'Utilização e sincronização', 'Suporte']
  return `${nav}<main><article><h1>Manual de integração Lemify e Bling</h1>${p(SEO['/manual/bling'].description)}<ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></article></main>`
}

const lemifyPlans = buildPlansView(DEFAULT_RAW_PLANS)
const lemifyFaq = getLemifyFaq(lemifyPlans.usersSummary)

function lemifyBody() {
  const tabs = PRODUCT_SHOWCASE.tabs
    .map((t) => `<article><h3>${esc(t.label)} · ${esc(t.title)}</h3>${p(t.description)}<ul>${t.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></article>`)
    .join('')
  const agents = AI_AGENTS_SECTION.agents
    .map((a) => `<li><strong>${esc(a.name)} (${esc(a.role)})</strong>: ${esc(a.task)}. ${esc(a.description)}</li>`)
    .join('')
  const cases = CASES_SECTION.cards
    .map((c) => `<blockquote>${esc(c.quote)} · ${esc(c.company)} (${esc(c.segment)})</blockquote>`)
    .join('')
  const plans = lemifyPlans.mainPlans
    .map((pl) => `<article><h3>${esc(pl.title)} · R$ ${esc(pl.annual)}/mês no anual (ou R$ ${esc(pl.monthly)}/mês no mensal)</h3>${p(pl.description)}<ul>${pl.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></article>`)
    .join('')
  const compareRows = lemifyPlans.comparisonGroups
    .flatMap((g) => g.rows)
    .map((r) => `<tr><th scope="row">${esc(r.label)}</th>${r.values.map((v) => `<td>${typeof v === 'boolean' ? (v ? 'Incluído' : 'Não incluído') : esc(v)}</td>`).join('')}</tr>`)
    .join('')
  const compareTable = `<table><thead><tr><th>Recurso</th>${lemifyPlans.mainPlans.map((pl) => `<th>${esc(pl.title)}</th>`).join('')}</tr></thead><tbody>${compareRows}</tbody></table>`
  const faq = lemifyFaq.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')

  return `${nav}<main><article><h1>${esc(LEMIFY_HERO.h1)}</h1>${p(LEMIFY_HERO.lead)}<section><h2>${esc(PRODUCT_SHOWCASE.title)}</h2>${p(PRODUCT_SHOWCASE.lead)}${tabs}</section><section><h2>${esc(AI_AGENTS_SECTION.title)}</h2>${p(AI_AGENTS_SECTION.lead)}<ul>${agents}</ul></section><section><h2>${esc(CASES_SECTION.title)}</h2>${p(CASES_SECTION.lead)}${cases}</section><section><h2>Planos do Lemify</h2>${plans}<h3>Comparativo completo dos planos</h3>${compareTable}</section><section><h2>Dúvidas antes de começar</h2>${faq}</section></article></main>`
}

const faqBody = `<section><h2>Perguntas frequentes sobre o Lemify</h2>${FAQ.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')}</section>`

const lemifyFaqSchema = jsonLd({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE}/lemify#faq`,
  inLanguage: 'pt-BR',
  mainEntity: lemifyFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

const pages = [
  ...[termos, privacidade, reembolso, termosIa, google, lgpd].map((d) => ({ route: d.path, body: legalBody(d), name: d.h1 })),
  { route: '/lemify', body: lemifyBody(), name: SEO['/lemify'].title, extraHead: [lemifyFaqSchema] },
  { route: '/docs', body: docsBody(), name: 'Documentação do Lemify' },
  { route: '/docs/api', body: apiBody(), name: 'API do Lemify' },
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

for (const { route, body, name, extraHead = [] } of pages) {
  const meta = SEO[route]
  let html = setHead(template, { title: meta.title, description: meta.description, url: `${SITE}${route}` })
  html = addToHead(html, webPage(route, name, meta.description))
  for (const tag of extraHead) html = addToHead(html, tag)
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
