import termos from './legal/termos.js'
import privacidade from './legal/privacidade.js'
import reembolso from './legal/reembolso.js'
import termosIa from './legal/termosIa.js'
import google from './legal/google.js'
import lgpd from './legal/lgpd.js'

const LEGAL = [termos, privacidade, reembolso, termosIa, google, lgpd]

// Título, descrição e URL canônica de cada página. A home também está em index.html (para quem não executa JS).
export const SITE_URL = 'https://lemify.com.br'

export const SEO = {
  '/': {
    title: 'Lemify - Atendimento e CRM com IA para o negócio brasileiro',
    description: 'A Lemify é uma empresa brasileira de tecnologia, de São Paulo, que cria software com inteligência artificial para quem vende e atende todo dia. Conheça nossos princípios e o Lemify, nosso primeiro produto.',
  },
  ...Object.fromEntries(LEGAL.map((d) => [d.path, { title: d.title, description: d.description }])),
  '/blog': {
    title: 'Blog do Lemify · Atendimento, vendas e IA',
    description: 'Novidades do Lemify, boas práticas de atendimento e vendas por conversa e o que aprendemos construindo IA para empresas brasileiras.',
  },
  '/lemify': {
    title: 'Lemify · Plataforma de atendimento e CRM com agentes de IA',
    description: 'O Lemify é o software que reúne WhatsApp, Instagram, Messenger e e-mail numa caixa só, com vários atendentes, CRM, agenda e agentes de IA. Agende uma demonstração.',
  },
  '/lemify/planos': {
    title: 'Planos e preços · Lemify',
    description: 'Planos do Lemify a partir de R$ 97 por mês, com agentes de IA para atendimento e vendas. Teste grátis por 14 dias, sem cartão.',
  },
  '/docs': {
    title: 'Documentação do Lemify · Módulos e API',
    description: 'Aprenda a usar cada módulo do Lemify (atendimento, CRM, agenda, agentes de IA e mais) e integre seu sistema com a API.',
  },
  '/manual/bling': {
    title: 'Manual de integração com o Bling · Lemify',
    description: 'Passo a passo para conectar sua conta do Bling ao Lemify e alimentar os agentes de IA com dados reais.',
  },
}

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/** Atualiza título, descrição, canonical e Open Graph ao trocar de página (SPA). */
export function applySeo({ title, description }, path) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  document.title = title
  setMeta('meta[name="description"]', 'content', description)
  setMeta('link[rel="canonical"]', 'href', url)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
}
