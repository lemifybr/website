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
    title: 'Lemify · Agente de IA no WhatsApp para Automatizar Atendimento',
    description: 'Automatize o WhatsApp com agentes de IA que respondem na hora, qualificam leads e entregam a conversa pronta pro seu time fechar. CRM e API Oficial Meta.',
  },
  ...Object.fromEntries(LEGAL.map((d) => [d.path, { title: d.title, description: d.description }])),
  '/blog': {
    title: 'Blog Lemify · Automatizar WhatsApp com IA, Vendas e CRM',
    description: 'Guias práticos sobre como automatizar o WhatsApp com IA, usar agentes de IA no atendimento comercial e vender mais por conversa.',
  },
  '/lemify': {
    title: 'Lemify - Sistema de atendimento com IA no WhatsApp',
    description: 'Coloque um agente de IA no WhatsApp da sua empresa que responde na hora, faz as perguntas certas, agenda horários e deixa a conversa pronta pro seu time fechar.',
  },
  '/api': {
    title: 'API Oficial do WhatsApp (Waba), Instagram, TikTok e Telegram | Lemify',
    description: 'Conecte API Oficial (Waba), WhatsApp Web, Instagram, TikTok e Telegram pelo Lemify. Parceiro homologado pela Meta como Twilio e 360dialog, com operação no Brasil.',
  },
  '/docs': {
    title: 'Documentação do Lemify · Módulos e API',
    description: 'Aprenda a usar cada módulo do Lemify (atendimento, CRM, agenda, agentes de IA e mais) e integre seu sistema com a API.',
  },
  '/docs/api': {
    title: 'API do Lemify · Mensagens, Agenda e CRM',
    description: 'Integre seu sistema ao Lemify: envie mensagens pelo WhatsApp, gerencie a agenda e alimente o CRM com chaves de API, exemplos em curl e llms.txt para agentes de IA.',
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
