// Conteúdo enxuto da página da API de Mensageria (/api).
// Alimenta o componente React (ApiPage.jsx), o HTML/JSON-LD entregue por api/index.js e o /llms-full.txt.
import { API_BASE } from '../docs/api.js'

export const API_HERO = {
  eyebrow: 'API de Mensageria do Lemify',
  h1: 'Todos os seus canais, uma só API.',
  lead:
    'WhatsApp oficial ou por QR Code, Instagram, TikTok e Telegram. Parceiro oficial da Meta, com time no Brasil.',
}

export const API_CODE_SAMPLE = `curl -X POST ${API_BASE}/v1/messages/send \\
  -H "Authorization: Bearer TOKEN_DO_CANAL" \\
  -H "Content-Type: application/json" \\
  -d '{
    "number": "5511999999999",
    "body": "Olá! Seu pedido #1042 saiu para entrega.",
    "createTicket": true
  }'`

export const API_CHANNELS = {
  eyebrow: 'WhatsApp Web e API Oficial (Waba)',
  title: 'Escolha o canal ideal para o seu momento.',
  waba: {
    badge: 'API Oficial (Waba) · Meta Cloud API',
    title: 'API Oficial (Waba)',
    description:
      'Fornecida diretamente pelo Lemify, parceiro homologado pela Meta como Twilio e 360dialog, com faturamento em reais e suporte no Brasil.',
    features: [
      'Embedded Signup e Coexistência (App + API Oficial)',
      'Templates aprovados pela Meta e webhooks em tempo real',
      'Calling API (ligações) e API de Conversões (CAPI)',
      'Alta estabilidade, escala e baixo risco de bloqueio',
    ],
    cta: 'Ativar API Oficial (Waba)',
    extra: 'Quero ativar a API Oficial (Waba) pelo Lemify.',
  },
  web: {
    badge: 'Ativação imediata · QR Code',
    title: 'WhatsApp Web · QR Code',
    description:
      'Leia o QR Code e dispare mensagens pelo mesmo endpoint REST, sem precisar aprovar templates na Meta.',
    features: [
      'Conexão em segundos no seu número atual',
      'Envio de texto, imagem, áudio, vídeo e documentos',
      'Sem custo adicional por mensagem da Meta',
      'Evolua para a API Oficial (Waba) sem trocar de API',
    ],
    note: 'Canal não oficial. Para alto volume e operações críticas, recomendamos a API Oficial (Waba).',
    cta: 'Falar sobre WhatsApp Web',
    extra: 'Quero usar a API de WhatsApp Web pelo Lemify.',
  },
  omnichannelLabel: 'Outros canais conectados pelo Lemify',
  omnichannel: [
    {
      name: 'Instagram',
      detail: 'Conexão oficial pela Meta para Direct, comentários e automações.',
    },
    {
      name: 'TikTok',
      detail: 'Integração para captar contatos e atender mensagens no mesmo fluxo.',
    },
    {
      name: 'Telegram',
      detail: 'Conecte bots e mensagens do Telegram integrados ao seu atendimento.',
    },
  ],
}

export const API_WHY = {
  eyebrow: 'Para desenvolvedores e empresas',
  title: 'Uma integração simples, com suporte no Brasil.',
  lead: 'Integre em minutos com documentação aberta em português, OpenAPI (Swagger) e llms.txt para agentes de IA.',
  pillars: [
    {
      n: '01',
      t: 'Homologação direta pela Meta',
      d: 'O Lemify fornece acesso oficial à API Oficial (Waba) sem intermediários, no padrão dos grandes provedores globais.',
    },
    {
      n: '02',
      t: 'Faturamento em reais e time local',
      d: 'Contrato nacional com CNPJ brasileiro, sem IOF ou câmbio, e suporte técnico pelo WhatsApp.',
    },
    {
      n: '03',
      t: 'Só API ou com CRM e agentes de IA',
      d: 'Use apenas mensageria no seu ERP ou SaaS, ou ative caixa única, agenda e agentes de IA pelo Lemify.',
    },
  ],
}

export const API_COMPARISON = {
  eyebrow: 'Comparativo rápido',
  title: 'Seu WhatsApp, sem custo escondido.',
  lead: 'A mensagem do WhatsApp já é barata. O que encarece é o provedor. Compare.',
  headers: [
    'Critério',
    'Lemify',
    'Twilio',
    '360dialog',
  ],
  rows: [
    ['Conexão', 'Você escolhe: API Oficial (Waba) ou QR Code', 'Só API Oficial (Waba)', 'Só API Oficial (Waba)'],
    ['Ativação', 'De segundos a minutos, sem código', 'Exige integração técnica', 'Exige integração técnica'],
    ['Moeda da cobrança', 'Real (R$)', 'Dólar + IOF', 'Euro ou dólar + IOF'],
    ['Taxa do provedor', 'Planos a partir de R$ 97/mês, sem taxa extra por mensagem além da tarifa da Meta', 'US$ 0,005 por mensagem enviada e recebida, além da tarifa da Meta', 'Licença mensal a partir de €49 por número, além da tarifa da Meta'],
    ['Opção sem tarifa por mensagem', 'Sim, via QR Code', 'Não', 'Não'],
    ['Suporte', 'Em português, direto no WhatsApp', 'Em inglês, por ticket', 'Em inglês, por ticket'],
    ['CRM e agentes de IA', 'Já inclusos (opcional)', 'Não incluso: só API', 'Não incluso: só API'],
  ],
  footnote:
    'Valores de referência de Twilio e 360dialog podem variar conforme a tabela vigente de cada provedor. Twilio, 360dialog, Meta, WhatsApp, Instagram, TikTok e Telegram pertencem a seus respectivos titulares.',
}

export const API_FAQ = [
  {
    q: 'Como conectar a API Oficial (Waba) do WhatsApp, Instagram, TikTok ou Telegram?',
    a: 'Pelo Lemify (lemify.com.br/api) você conecta a API Oficial (Waba) do WhatsApp e o WhatsApp Web na mesma API REST, além de integrar Instagram (API oficial da Meta), TikTok e Telegram em um só lugar, com implantação assistida e suporte técnico em português.',
  },
  {
    q: 'Qual a diferença entre WhatsApp Web e API Oficial (Waba)?',
    a: 'O WhatsApp Web conecta em segundos por QR Code, sem templates nem tarifa por mensagem da Meta, sendo indicado para validações e baixo volume, mas não é um canal oficial. A API Oficial (Waba) roda direto na Meta Cloud API, feita para escala, alta estabilidade, Coexistência, Calling API e baixo risco de bloqueio.',
  },
  {
    q: 'O Lemify é homologado pela Meta como Twilio e 360dialog?',
    a: 'Sim. O Lemify é Meta Business Partner homologado pela Meta para fornecer diretamente a API Oficial (Waba) do WhatsApp Business, com contrato e faturamento em reais (CNPJ brasileiro) e suporte técnico em português pelo WhatsApp.',
  },
  {
    q: 'Posso usar só a API de mensageria do Lemify, sem o CRM ou atendimento?',
    a: 'Sim. Você integra WhatsApp Web ou API Oficial (Waba) direto no seu ERP, SaaS ou backend via REST API e webhooks, e pode ativar Instagram, TikTok, Telegram, CRM e agentes de IA pelo Lemify quando quiser.',
  },
  {
    q: 'Consigo migrar meu número da Twilio ou 360dialog para o Lemify?',
    a: 'Sim. Nossa equipe acompanha a migração de números ativos da Twilio, 360dialog, Zenvia e outros provedores oficiais para o Lemify mantendo o mesmo telefone, e também apoia a evolução de WhatsApp Web para a API Oficial (Waba).',
  },
  {
    q: 'Como funciona a cobrança e onde fica a documentação técnica?',
    a: 'No WhatsApp Web não há cobrança extra da Meta por mensagem. Na API Oficial (Waba) aplicam-se as tarifas oficiais da Meta por categoria, faturadas em reais. A documentação pública, o Swagger (OpenAPI) e o llms.txt ficam em lemify.com.br/docs/api.',
  },
]
