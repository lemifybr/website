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
API_HERO,
  API_CODE_SAMPLE,
  API_CHANNELS,
  API_WHY,
  API_CAPABILITIES,
  API_COMPARISON,
  API_AUDIENCES,
  API_STEPS,
  API_FAQ,
} from '../src/api-page/apiPageData.js'
import { SITE, esc, setHead, jsonLd, addToHead, setRoot } from '../api/_html.js'

const prod = (n) => fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../src/product/${n}.body.html`), 'utf8')
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

  function apiLandingBody() {
    const highlights = `<ul>${API_HERO.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`
    const channel = (c) => `<article><h3>${esc(c.title)}</h3>${p(c.description)}<ul>${c.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>${c.note ? p(c.note) : ''}</article>`
    const pillars = API_WHY.pillars.map((item) => `<article><h3>${esc(item.n)} · ${esc(item.t)}</h3>${p(item.d)}</article>`).join('')
    const caps = API_CAPABILITIES.items.map((item) => `<article><h3>${esc(item.t)}</h3>${p(item.d)}</article>`).join('')
    const audiences = API_AUDIENCES.items.map((item) => `<article><h3>${esc(item.tag)} · ${esc(item.t)}</h3>${p(item.d)}</article>`).join('')
    const compHead = `<thead><tr>${API_COMPARISON.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>`
    const compRows = `<tbody>${API_COMPARISON.rows.map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>`
    const steps = `<ol>${API_STEPS.steps.map((s) => `<li><strong>${esc(s.t)}</strong>: ${esc(s.d)}</li>`).join('')}</ol>`
    const faq = API_FAQ.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')
    return `${nav}<main><article><h1>${esc(API_HERO.h1)}</h1>${p(API_HERO.lead)}${highlights}<pre><code>${esc(API_CODE_SAMPLE)}</code></pre><section><h2>${esc(API_CHANNELS.title)}</h2>${p(API_CHANNELS.lead)}${channel(API_CHANNELS.waba)}${channel(API_CHANNELS.web)}</section><section><h2>${esc(API_WHY.title)}</h2>${p(API_WHY.intro)}${p(API_WHY.body)}${pillars}</section><section><h2>${esc(API_CAPABILITIES.title)}</h2>${p(API_CAPABILITIES.lead)}${caps}<p><a href="/docs/api">Documentação da API do Lemify</a> · <a href="https://docs.lemify.com.br/api-docs/">Referência OpenAPI</a></p></section><section><h2>${esc(API_AUDIENCES.title)}</h2>${p(API_AUDIENCES.lead)}${audiences}</section><section><h2>${esc(API_COMPARISON.title)}</h2>${p(API_COMPARISON.lead)}<table>${compHead}${compRows}</table>${p(API_COMPARISON.footnote)}</section><section><h2>${esc(API_STEPS.title)}</h2>${steps}<h3>${esc(API_STEPS.billingTitle)}</h3>${p(API_STEPS.billingBody)}</section><section><h2>Perguntas frequentes sobre a API de mensageria do Lemify</h2>${faq}</section></article></main>`
  }

const apiLandingSchemas = [
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'API de Mensageria', item: `${SITE}/api` },
      ],
    }),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE}/api#service`,
      name: 'API de Mensageria do Lemify · WhatsApp Web e WABA',
      serviceType: 'API de Mensageria WhatsApp (WhatsApp Web e WABA / Meta Cloud API)',
      category: 'WhatsApp Business API (WABA) & WhatsApp Web API',
      description: SEO['/api'].description,
      url: `${SITE}/api`,
      inLanguage: 'pt-BR',
      areaServed: { '@type': 'Country', name: 'BR' },
      provider: { '@id': `${SITE}/#organization` },
    }),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE}/api#faq`,
      inLanguage: 'pt-BR',
      mainEntity: API_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }),
  ]

  const faqBody = `<section><h2>Perguntas frequentes sobre o Lemify</h2>${FAQ.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')}</section>`

  const pages = [
    ...[termos, privacidade, reembolso, termosIa, google, lgpd].map((d) => ({ route: d.path, body: legalBody(d), name: d.h1 })),
    { route: '/lemify', body: prod('lemify'), name: 'Lemify · Atendimento e CRM' },
    { route: '/lemify/planos', body: prod('planos'), name: 'Planos e preços do Lemify' },
    // Salvo em _prerender/api.html (reescrito de /api em vercel.json) para não colidir com a pasta api/ das funções Vercel.
    { route: '/api', outFile: '_prerender/api.html', body: apiLandingBody(), name: 'API de Mensageria · WhatsApp Web e WABA Oficial · Lemify', extraHead: apiLandingSchemas },
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

    for (const { route, outFile, body, name, extraHead = [] } of pages) {
      const meta = SEO[route]
      let html = setHead(template, { title: meta.title, description: meta.description, url: `${SITE}${route}` })
      html = addToHead(html, webPage(route, name, meta.description))
      for (const tag of extraHead) html = addToHead(html, tag)
      html = setRoot(html, body)
      const target = outFile ? path.join(dist, outFile) : path.join(dist, route, 'index.html')
      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.writeFileSync(target, html)
      console.log(`prerender ${route}${outFile ? ` -> ${outFile}` : ''}`)
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
