// Conteúdo estruturado da página dedicada da API de Mensageria (/api).
// A mesma fonte alimenta o componente React (ApiPage.jsx), o HTML estático e os schemas JSON-LD
// gerados no build (scripts/prerender.mjs) e o /llms-full.txt (api/llms.js).
import { SITE } from '../institutional/siteConfig.js'
import { API_BASE } from '../docs/api.js'

export const API_HERO = {
  eyebrow: 'API de Mensageria · WhatsApp Web e WABA',
  h1: 'Uma API de mensageria para conectar WhatsApp Web e WABA.',
  lead:
    'Integre seu sistema, ERP ou SaaS ao WhatsApp pela mesma API REST. Escolha a agilidade do WhatsApp Web ou a escala da API oficial da Meta (WABA) — fornecida diretamente pela Lemify, parceira homologada pela Meta como Twilio e 360dialog, com operação no Brasil.',
  highlights: [
    'WhatsApp Web (QR Code) e WABA (Meta Cloud API)',
    'Mesmo endpoint REST + webhooks em tempo real',
    'Faturamento em reais (CNPJ) e suporte em português',
  ],
  architecture: [
    { step: '01', title: 'Seu sistema', detail: 'ERP, CRM, SaaS, e-commerce ou backend próprio' },
    { step: '02', title: 'API de Mensageria Lemify', detail: 'Token do canal, REST API, webhooks e gestão de conexões' },
    { step: '03', title: 'WhatsApp Web ou WABA', detail: 'Conexão rápida por QR Code ou Meta Cloud API oficial' },
  ],
  chips: ['WhatsApp Web (QR Code)', 'WABA · Meta Cloud API', 'Embedded Signup', 'Coexistência'],
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
  eyebrow: 'Dois modos, a mesma API',
  title: 'Escolha entre WABA oficial da Meta e WhatsApp Web — ou combine os dois.',
  lead: 'Cada operação tem um momento e um volume. No Lemify você conecta canais via WABA ou WhatsApp Web usando o mesmo padrão de integração e evolui sem reescrever o seu código.',
  waba: {
    badge: 'API Oficial da Meta · WABA',
    title: 'WABA · WhatsApp Business API (Meta Cloud API)',
    description:
      'Conexão oficial fornecida diretamente pela Lemify — homologada pela Meta na mesma categoria de provedores como Twilio, 360dialog, Zenvia e Gupshup, com operação em São Paulo, cobrança em reais e suporte humano em português.',
    features: [
      'Envio e recebimento direto na infraestrutura oficial da Meta Cloud API',
      'Onboarding via Embedded Signup conectando sua conta WABA em minutos',
      'Coexistência para usar o app WhatsApp Business e a API oficial no mesmo número',
      'Templates oficiais aprovados pela Meta (utilidade, marketing e autenticação)',
      'WhatsApp Business Calling API (ligações) e API de Conversões (CAPI) para Meta Ads',
      'Estabilidade em escala, baixo risco de bloqueio e apoio para verificação oficial da conta',
    ],
    cta: 'Ativar API oficial (WABA)',
    extra: 'Quero ativar a API oficial do WhatsApp (WABA) na Lemify.',
  },
  web: {
    badge: 'Conexão rápida · QR Code',
    title: 'WhatsApp Web · API via QR Code',
    description:
      'Conecte um número existente em segundos lendo o QR Code e passe a enviar e receber mensagens pelo mesmo endpoint REST — sem esperar aprovação de templates da Meta nem pagar por mensagem disparada.',
    features: [
      'Ativação imediata por leitura de QR Code, sem burocracia de aprovação prévia',
      'Envio de texto, imagens, vídeos, áudios e documentos via JSON ou multipart',
      'Sem cobrança extra da Meta por mensagem ou template disparado',
      'Parâmetro createTicket para transformar disparos em atendimento na plataforma',
      'Indicado para validações rápidas, operações enxutas e fluxos internos',
      'Migração para o canal WABA oficial quando o volume crescer, mantendo o mesmo endpoint',
    ],
    note: 'A conexão via WhatsApp Web não é um canal oficial da Meta. Para operações críticas e alto volume de envios, recomendamos o canal WABA.',
    cta: 'Falar sobre API WhatsApp Web',
    extra: 'Quero usar a API do Lemify com WhatsApp Web (QR Code).',
  },
}

export const API_WHY = {
  eyebrow: 'Por que a API da Lemify',
  title: 'Homologação oficial da Meta e operação brasileira no mesmo lugar.',
  intro:
    'A Lemify é Meta Business Partner homologada diretamente pela Meta para fornecer a API oficial do WhatsApp Business (WABA) — igual a provedores globais como Twilio, 360dialog, Vonage e Infobip — além de oferecer conexão via WhatsApp Web na mesma API de mensageria.',
  body:
    'Você não fica preso a intermediários nem a faturas em dólar: tem documentação pública em português, contrato com empresa brasileira e um time de engenharia acessível pelo WhatsApp.',
  pillars: [
    {
      n: '01',
      t: 'Homologação direta pela Meta (WABA)',
      d: 'Conexão oficial pela Meta Cloud API sem revendedores intermediários, seguindo as regras oficiais do WhatsApp Business para escala e estabilidade.',
    },
    {
      n: '02',
      t: 'Mesma API para WhatsApp Web e WABA',
      d: 'Integre uma única vez em api.lemify.com.br. Comece via QR Code ou direto na WABA e alterne o canal do número sem refazer seu backend.',
    },
    {
      n: '03',
      t: 'Faturamento em reais e suporte no Brasil',
      d: `Contrato com CNPJ brasileiro (${SITE.cnpj}), cobrança em R$ sem IOF ou câmbio, e suporte técnico de gente de verdade pelo WhatsApp.`,
    },
    {
      n: '04',
      t: 'Só mensageria ou plataforma completa',
      d: 'Use apenas a API de mensageria no seu software ou ative, sobre o mesmo número, a caixa única, o CRM, a agenda e os agentes de IA do Lemify.',
    },
  ],
}

export const API_CAPABILITIES = {
  eyebrow: 'Recursos técnicos',
  title: 'Tudo pronto para colocar mensageria no ar em produção.',
  lead: 'Documentação pública em português, especificação OpenAPI (Swagger) e arquivos llms.txt para acelerar o desenvolvimento com ou sem agentes de IA.',
  items: [
    {
      k: 'REST API',
      t: 'Envio de texto e mídia (Web e WABA)',
      d: 'Dispare mensagens de texto, imagens, vídeos, áudios e documentos via POST /v1/messages/send usando o token do canal conectado.',
    },
    {
      k: 'Tempo real',
      t: 'Webhooks e status de entrega',
      d: 'Receba mensagens recebidas, confirmações de envio, entrega e leitura e eventos de conexão em tempo real direto no seu sistema.',
    },
    {
      k: 'WABA Oficial',
      t: 'Embedded Signup e Coexistência',
      d: 'Conecte contas WABA em poucos cliques e opere números elegíveis em coexistência (app WhatsApp Business + API oficial) com sincronização inicial.',
    },
    {
      k: 'WABA Oficial',
      t: 'Templates aprovados pela Meta',
      d: 'Crie, submeta e gerencie modelos de mensagem de utilidade, marketing e autenticação para notificações transacionais e campanhas em escala.',
    },
    {
      k: 'Voz e Ads',
      t: 'Calling API e API de Conversões (CAPI)',
      d: 'Suporte a ligações oficiais pela WhatsApp Business Calling API e envio de eventos de conversão de volta para campanhas do Meta Ads.',
    },
    {
      k: 'Ecossistema',
      t: 'Mensageria, Agenda e CRM na mesma API',
      d: 'Além de WhatsApp Web e WABA, a API pública do Lemify também integra agendamentos e negociações do CRM com autenticação por chave lmf_.',
    },
  ],
}

export const API_COMPARISON = {
  eyebrow: 'Comparativo transparente',
  title: 'WABA oficial, WhatsApp Web e provedores globais lado a lado.',
  lead: 'Compare os dois modos de mensageria do Lemify entre si e em relação a provedores internacionais da API oficial do WhatsApp.',
  headers: [
    'Critério',
    'WABA · Lemify (Oficial Meta)',
    'WhatsApp Web · Lemify (QR Code)',
    'Provedores globais (Twilio, 360dialog)',
  ],
  rows: [
    ['Tipo de conexão', 'Oficial · Meta Cloud API', 'Não oficial · QR Code', 'Oficial · Meta Cloud API'],
    ['Homologação pela Meta', 'Sim · Parceiro oficial Meta', 'Não se aplica', 'Sim · Parceiro oficial Meta'],
    ['Ativação do número', 'Embedded Signup em minutos', 'Leitura de QR Code em segundos', 'Configuração técnica / painel'],
    ['Templates aprovados pela Meta', 'Sim (para iniciar conversas)', 'Não exige templates', 'Sim (para iniciar conversas)'],
    ['Risco de bloqueio por conexão', 'Baixo (canal oficial)', 'Maior em envios de alto volume', 'Baixo (canal oficial)'],
    ['Coexistência (App + API)', 'Suportado', 'Usa o app do aparelho', 'Depende do provedor'],
    ['Custo por mensagem da Meta', 'Modelo oficial Meta (em reais)', 'Sem cobrança por mensagem da Meta', 'Modelo oficial Meta (USD/EUR + IOF)'],
    ['Suporte técnico em português', 'Sim · Humano, pelo WhatsApp', 'Sim · Humano, pelo WhatsApp', 'Em geral inglês ou por ticket'],
    ['Atendimento, CRM e IA integrados', 'Opcional e nativo no Lemify', 'Opcional e nativo no Lemify', 'Exige ferramenta externa'],
  ],
  footnote:
    'Twilio, 360dialog, Zenvia, Gupshup, Infobip, Vonage, Meta e WhatsApp pertencem a seus respectivos titulares e são citadas apenas como referência de mercado.',
}

export const API_AUDIENCES = {
  eyebrow: 'Para quem é',
  title: 'Do disparo transacional ao software que oferece WhatsApp aos clientes.',
  lead: 'Escolha o canal que faz sentido para o seu cenário hoje e escale com segurança.',
  items: [
    {
      tag: 'Software Houses & SaaS',
      t: 'Embarque WhatsApp Web e WABA no seu produto',
      d: 'ERPs, sistemas de gestão e plataformas SaaS que precisam oferecer mensageria pelo WhatsApp aos clientes com documentação aberta (OpenAPI + llms.txt) e parceiro brasileiro.',
      cta: 'Falar sobre parceria de API',
      extra: 'Sou software house / SaaS e quero integrar a API de mensageria do Lemify.',
    },
    {
      tag: 'Times de Engenharia',
      t: 'Notificações, boletos, 2FA e automações',
      d: 'Envie confirmações de pedido, links de pagamento, status de entrega, códigos de verificação e lembretes direto do seu backend via REST API.',
      cta: 'Estruturar integração',
      extra: 'Tenho time técnico e quero conectar meu backend à API de mensageria do Lemify.',
    },
    {
      tag: 'Migração para a Lemify',
      t: 'Traga sua WABA da Twilio, 360dialog ou Zenvia',
      d: 'Migre números oficiais já ativos em outros provedores homologados para a Lemify sem perder o número, ganhando faturamento em reais e suporte técnico no Brasil.',
      cta: 'Planejar migração de WABA',
      extra: 'Já uso WABA em outro provedor (Twilio/360dialog/Zenvia) e quero migrar para a Lemify.',
    },
    {
      tag: 'Evolução sem atrito',
      t: 'Comece no WhatsApp Web e evolua para WABA',
      d: 'Valide seu fluxo rapidamente via QR Code e migre o canal para a API oficial da Meta quando a operação escalar — mantendo o mesmo padrão de integração.',
      cta: 'Conversar com o time',
      extra: 'Quero entender a melhor combinação entre WhatsApp Web e WABA para minha operação.',
    },
  ],
}

export const API_STEPS = {
  eyebrow: 'Como começar',
  title: 'Do primeiro contato à mensageria rodando em produção.',
  steps: [
    {
      n: '01',
      t: 'Escolha do canal ideal',
      d: 'Alinhamos o volume e o perfil da operação para definir WhatsApp Web (QR Code), WABA (API oficial da Meta) ou ambos na mesma conta.',
    },
    {
      n: '02',
      t: 'Conexão do número',
      d: 'No WhatsApp Web você conecta em segundos por QR Code; na WABA fazemos o Embedded Signup do seu Meta Business Manager com acompanhamento ao vivo.',
    },
    {
      n: '03',
      t: 'Token, templates e webhooks',
      d: 'Você obtém o token do canal, valida o envio em POST /v1/messages/send e configura webhooks e templates oficiais (no caso de WABA).',
    },
    {
      n: '04',
      t: 'Produção com suporte contínuo',
      d: 'Acompanhamos a estabilidade da operação, a qualidade do número WABA e você pode ativar atendimento humano, CRM ou agentes de IA quando quiser.',
    },
  ],
  billingTitle: 'Transparência na cobrança de WhatsApp Web e WABA',
  billingBody:
    'No WhatsApp Web não há cobrança extra da Meta por mensagem disparada. Na WABA (API Oficial), as mensagens seguem o modelo transparente da WhatsApp Business Platform da Meta (utilidade, marketing e autenticação, com janela de serviço gratuita quando o cliente inicia a conversa) — com faturamento em reais e proposta clara antes de ativar.',
}

export const API_FAQ = [
  {
    q: 'Qual a diferença entre a API de WhatsApp Web e a WABA (API Oficial da Meta)?',
    a: 'O WhatsApp Web conecta seu número em segundos via QR Code, não exige aprovação prévia de templates e não tem cobrança por mensagem da Meta — sendo ideal para operações enxutas e validações rápidas, mas não é um canal oficial da Meta. Já a WABA é a API oficial do WhatsApp Business (Meta Cloud API), homologada pela Meta, com templates aprovados, alta estabilidade, baixo risco de bloqueio, suporte a escala, Coexistência, Calling API e verificação oficial da conta.',
  },
  {
    q: 'A Lemify é homologada pela Meta para fornecer WABA igual à Twilio e à 360dialog?',
    a: 'Sim. A Lemify é Meta Business Partner homologada pela Meta para fornecer diretamente a API oficial do WhatsApp Business (WABA / Meta Cloud API), na mesma categoria de provedores oficiais como Twilio, 360dialog, Zenvia, Gupshup e Vonage — com contrato e faturamento em reais (CNPJ brasileiro), onboarding assistido e suporte técnico em português pelo WhatsApp.',
  },
  {
    q: 'Posso usar apenas a API de mensageria do Lemify, sem usar o CRM ou a caixa de atendimento?',
    a: 'Sim. Você pode integrar a API de mensageria (WhatsApp Web ou WABA) diretamente ao seu ERP, CRM, software SaaS ou backend próprio. E, se em algum momento quiser somar atendimento humano, CRM, agenda ou agentes de IA sobre o mesmo número, tudo já funciona nativamente no Lemify.',
  },
  {
    q: 'Se eu começar no WhatsApp Web e depois migrar para WABA, preciso refazer minha integração?',
    a: 'Não precisa trocar de provedor nem reestruturar toda a sua aplicação. Tanto o WhatsApp Web quanto a WABA operam sobre a mesma API REST do Lemify (api.lemify.com.br/v1/messages/send), mudando apenas o token do canal conectado e as regras específicas da Meta (como uso de templates fora da janela de 24 horas na WABA).',
  },
  {
    q: 'Consigo migrar um número WABA que já está na Twilio, 360dialog ou Zenvia para a Lemify?',
    a: 'Sim. É possível migrar números WABA ativos de outros provedores oficiais para a Lemify mantendo o mesmo telefone e a continuidade da operação. Nossa equipe acompanha a migração no Meta Business Manager passo a passo.',
  },
  {
    q: 'Na WABA, consigo continuar usando o aplicativo WhatsApp Business no celular?',
    a: 'Sim, para números elegíveis ao recurso de Coexistência da Meta. Durante o Embedded Signup, o Lemify detecta automaticamente números em coexistência, mantém o aplicativo WhatsApp Business funcionando junto à API oficial e solicita à Meta a sincronização inicial de contatos e histórico.',
  },
  {
    q: 'Como funciona a cobrança no WhatsApp Web e na WABA?',
    a: 'No WhatsApp Web você paga apenas pelo plano/canal contratado, sem tarifa adicional da Meta por mensagem. Na WABA, além da estrutura contratada, aplicam-se as tarifas oficiais da Meta por categoria de mensagem iniciada pela empresa (utilidade, marketing e autenticação), mantendo gratuita a janela de serviço iniciada pelo cliente. Tudo é apresentado com transparência e faturado em reais.',
  },
  {
    q: 'Onde encontro a documentação técnica, Swagger e llms.txt da API?',
    a: 'A documentação técnica completa está em lemify.com.br/docs/api, com referência OpenAPI (Swagger) em docs.lemify.com.br/api-docs e arquivos llms.txt prontos para download para quem integra com apoio de assistentes ou agentes de IA.',
  },
  {
    q: 'Como a API de mensageria do Lemify trata segurança e LGPD?',
    a: 'Todas as comunicações usam criptografia em trânsito (HTTPS/TLS), isolamento lógico entre contas, autenticação por token/chave com escopos e registros de auditoria. A Lemify Tecnologia Ltda. atua em conformidade com a LGPD (Lei nº 13.709/2018), com detalhes em lemify.com.br/lgpd e lemify.com.br/privacidade.',
  },
]

