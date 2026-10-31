import { configured, lcc } from './_blog.js'
import { SITE } from './_html.js'
import { MODULES, GROUPS } from '../src/docs/modules.js'
import { FAQ } from '../src/institutional/faq.js'

// GET /llms.txt e /llms-full.txt (reescritos para esta função em vercel.json).
// llms.txt é o índice para agentes de IA; llms-full.txt traz o texto completo (FAQ, módulos e posts).
const BASE = `# Lemify

> O Lemify, da Lemify Tecnologia Ltda. (CNPJ 69.768.422/0001-08, São Paulo/SP), é uma família brasileira de softwares com inteligência artificial para atendimento, vendas e gestão. Os agentes de IA respondem os clientes das empresas na hora, em qualquer canal de conversa, e trabalham lado a lado com a equipe.

## Produtos

- Lemify · Atendimento e CRM (disponível): para empresas que vendem e atendem por conversa, com todos os canais (WhatsApp, Instagram e outros) numa caixa só e agentes de IA trabalhando junto com a equipe. Cadastro: https://app.lemify.com.br/signup · Login: https://app.lemify.com.br/login
- Lemi Food (em desenvolvimento): para restaurantes, lanchonetes e delivery.
- Lemi Clinic (em desenvolvimento): para clínicas médicas, odontológicas e consultórios. Até o lançamento, dá para começar pelo Lemify.

## Agentes de IA do Lemify

- Lemi: agente principal, atende na hora, em todos os canais.
- Maia: agendamento; agenda, confirma e remarca compromissos.
- Theo: vendas; mantém o funil e as negociações em dia.
- Otto: cadastro; completa os dados de cada cliente.
- Nico: retorno; retoma quem parou de responder.
- Íris: relatórios; transforma conversas em informação para decidir.

## Para quem é

Pequenas e médias empresas que vendem e atendem pelo WhatsApp, pelo Instagram e por outros canais de conversa: varejo, clínicas, restaurantes, imobiliárias, beleza e estética, atacado, móveis e decoração e serviços.

## Integrações

Meta, Google, TikTok, iFood, Mercado Livre, Shopify, Nuvemshop, Bling, Omie, Conta Azul, Asaas e Tiny ERP. O Lemify é Meta Business Partner.

## Como trabalhamos

- Implantação guiada: configuração junto com o cliente, a partir de modelos prontos para o segmento.
- Treinamento da equipe: cada pessoa aprende a usar dentro da própria rotina.
- 30 dias de acompanhamento com a operação já rodando.
- Suporte de gente de verdade, pelo WhatsApp e por um canal direto dentro da plataforma.

## Valores

Resolver de verdade; simples de usar; ninguém começa sozinho; dados com responsabilidade (segurança e LGPD desde a primeira conversa); feito no Brasil.

## Contato

- E-mail: contato@lemify.com.br
- WhatsApp: +55 11 4863-5054 (https://wa.me/551148635054)
- Instagram: https://instagram.com/lemifybr
- LinkedIn: https://www.linkedin.com/company/lemify
- Facebook: https://www.facebook.com/lemify

## Páginas

- [Início](${SITE}/)
- [Blog](${SITE}/blog)
- [Documentação: módulos e API](${SITE}/docs)
- [Referência completa da API (OpenAPI)](https://docs.lemify.com.br/api-docs/)
- [Termos de uso](${SITE}/termos)
- [Política de privacidade](${SITE}/privacidade)
- [Política de reembolso e cancelamento](${SITE}/reembolso)
- [Termos de uso de inteligência artificial](${SITE}/termos-ia)
- [Divulgação de uso de dados do Google](${SITE}/google-disclosure)
- [Segurança e LGPD](${SITE}/lgpd)
- [Manual de integração com o Bling](${SITE}/manual/bling)
`

const oneLine = (s) => String(s || '').replace(/\s+/g, ' ').trim()
const day = (iso) => (iso ? String(iso).slice(0, 10) : '')

async function listPosts() {
  if (!configured()) return []
  try {
    const { status, body } = await lcc('/api/site/blog/posts?limit=100&page=1')
    return status === 200 && body ? body.data || [] : []
  } catch {
    return []
  }
}

async function fullPost(slug) {
  try {
    const { status, body } = await lcc(`/api/site/blog/posts/${slug}`)
    return status === 200 ? body : null
  } catch {
    return null
  }
}

function blogIndex(posts) {
  if (!posts.length) return ''
  const items = posts.map((p) => `- [${oneLine(p.title)}](${SITE}/blog/${p.slug})${p.excerpt ? `: ${oneLine(p.excerpt)}` : ''}`)
  return `\n## Blog\n\n${items.join('\n')}\n`
}

function faqText() {
  return `\n## Perguntas frequentes\n\n${FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}\n`
}

function docsText() {
  const groups = GROUPS.map((g) => {
    const mods = MODULES.filter((m) => m.group === g)
    if (!mods.length) return ''
    return `### ${g}\n\n${mods
      .map((m) => `#### ${m.title}\n\n${m.summary} ${m.description}\n\n${m.features.map((f) => `- ${f}`).join('\n')}`)
      .join('\n\n')}`
  }).filter(Boolean)
  return `\n## Módulos da plataforma\n\n${groups.join('\n\n')}\n`
}

async function postsText(posts) {
  const full = (await Promise.all(posts.slice(0, 30).map((p) => fullPost(p.slug)))).filter(Boolean)
  if (!full.length) return ''
  const body = full
    .map((p) => `### ${oneLine(p.title)}\n\nURL: ${SITE}/blog/${p.slug}\nPublicado em: ${day(p.publishedAt)}${p.authorName ? `\nAutor: ${p.authorName}` : ''}\n\n${String(p.content || '').trim()}`)
    .join('\n\n---\n\n')
  return `\n## Artigos do blog\n\n${body}\n`
}

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const full = url.searchParams.get('full') === '1' || /llms-full/.test(url.pathname)

  const posts = await listPosts()
  const text = full ? `${BASE}${faqText()}${docsText()}${await postsText(posts)}` : `${BASE}${blogIndex(posts)}`

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.end(text)
}
