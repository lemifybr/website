import { SITE, esc, setHead, jsonLd, addToHead, setRoot } from './_html.js'
import { SEO } from '../src/seo.js'
import {
  API_HERO,
  API_CODE_SAMPLE,
  API_CHANNELS,
  API_WHY,
  API_COMPARISON,
  API_FAQ,
} from '../src/api-page/apiPageData.js'

// GET /api e /api/ (rota nativa da pasta api/ na Vercel).
// Devolve o index.html do site já com título, meta tags, JSON-LD e o texto da página de API de
// mensageria (API Oficial (Waba), WhatsApp Web, Instagram, TikTok e Telegram) para buscadores e LLMs (AIO).
async function shell(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0]
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const origin = host ? `${proto}://${host}` : SITE
  const res = await fetch(`${origin}/index.html`, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error('shell indisponível')
  return res.text()
}

const p = (t) => `<p>${esc(t)}</p>`
const nav = '<nav aria-label="Principal"><a href="/">Início</a> · <a href="/lemify">Lemify</a> · <a href="/api">API</a> · <a href="/blog">Blog</a> · <a href="/docs">Documentação</a></nav>'

function apiLandingBody() {
  const channel = (c) =>
    `<article><h3>${esc(c.title)}</h3>${p(c.description)}<ul>${c.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>${c.note ? p(c.note) : ''}</article>`
  const omni = `<ul>${API_CHANNELS.omnichannel.map((c) => `<li><strong>${esc(c.name)}</strong>: ${esc(c.detail)}</li>`).join('')}</ul>`
  const pillars = API_WHY.pillars.map((item) => `<article><h3>${esc(item.n)} · ${esc(item.t)}</h3>${p(item.d)}</article>`).join('')
  const compHead = `<thead><tr>${API_COMPARISON.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>`
  const compRows = `<tbody>${API_COMPARISON.rows.map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>`
  const faq = API_FAQ.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('')

  return `${nav}<main><article><h1>${esc(API_HERO.h1)}</h1>${p(API_HERO.lead)}<section><h2>${esc(API_CHANNELS.title)}</h2>${channel(API_CHANNELS.waba)}${channel(API_CHANNELS.web)}<h3>${esc(API_CHANNELS.omnichannelLabel)}</h3>${omni}</section><section><h2>${esc(API_WHY.title)}</h2>${p(API_WHY.lead)}${pillars}<pre><code>${esc(API_CODE_SAMPLE)}</code></pre><p><a href="/docs/api">Documentação da API do Lemify</a> · <a href="https://docs.lemify.com.br/api-docs/">Referência OpenAPI</a></p></section><section><h2>${esc(API_COMPARISON.title)}</h2>${p(API_COMPARISON.lead)}<table>${compHead}${compRows}</table>${p(API_COMPARISON.footnote)}</section><section><h2>Perguntas frequentes sobre a API Oficial (Waba) e canais</h2>${faq}</section></article></main>`
}

const SCHEMAS = [
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}/api#webpage`,
    url: `${SITE}/api`,
    name: SEO['/api'].title,
    description: SEO['/api'].description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#organization` },
  }),
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
    name: 'API de Mensageria do Lemify · API Oficial (Waba), WhatsApp, Instagram, TikTok e Telegram',
    serviceType: 'API de Mensageria (API Oficial (Waba) do WhatsApp, WhatsApp Web, Instagram, TikTok e Telegram)',
    category: 'WhatsApp Business API (Waba), Instagram API, TikTok e Telegram',
    description: SEO['/api'].description,
    url: `${SITE}/api`,
    inLanguage: 'pt-BR',
    areaServed: { '@type': 'Country', name: 'BR' },
    provider: { '@id': `${SITE}/#organization` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Canais de Mensageria do Lemify',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'API Oficial (Waba) do WhatsApp Business (Meta Cloud API)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'API de WhatsApp Web (QR Code)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integração API Oficial do Instagram' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integração de Mensagens TikTok' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integração de Mensagens Telegram' } },
      ],
    },
  }),
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/api#faq`,
    inLanguage: 'pt-BR',
    mainEntity: API_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }),
]

const BODY = apiLandingBody()

function renderApiPage(html) {
  const meta = SEO['/api']
  // Remove o FAQPage da home injetado no index.html no build, evitando duplicidade de schema FAQPage em /api.
  html = html.replace(/<script type="application\/ld\+json">[^<]*"@id":"https:\/\/lemify\.com\.br\/#faq"[^<]*<\/script>\s*/, '')
  html = setHead(html, { title: meta.title, description: meta.description, url: `${SITE}/api` })
  for (const tag of SCHEMAS) html = addToHead(html, tag)
  return setRoot(html, BODY)
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET, HEAD')
    return res.end('Method Not Allowed')
  }

  let html
  try {
    html = await shell(req)
  } catch {
    res.statusCode = 502
    return res.end('Indisponível')
  }

  const out = renderApiPage(html)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.end(req.method === 'HEAD' ? '' : out)
}
