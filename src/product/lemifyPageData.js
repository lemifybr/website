// Conteúdo estruturado da página do produto (/lemify).
// Alimenta o componente React (LemifyPage.jsx) e o HTML pré-renderizado (scripts/prerender.mjs).
// Mantém apenas caminhos públicos (/lemify-assets/...) para rodar sem bundler no Node.

export const LEMIFY_HERO = {
  eyebrow: 'Agente de IA no WhatsApp + CRM',
  h1: 'Coloque um agente de IA no seu WhatsApp.',
  lead:
    'Ele responde na hora, faz as perguntas certas e já deixa a conversa pronta pro seu time fechar. Com CRM, agenda e todos os seus canais no mesmo lugar.',
  video: {
    src: '/lemify-assets/177ac1bb33c9823159cc32191995a59b.mp4',
    poster: '/lemify-assets/ce808e779a4c2c542dc0448fa3378b4c.webp',
    label: 'Ver o Lemify em 2 min',
    caption: '2 minutos, com legendas na tela.',
  },
  screen: {
    desktop: '/lemify-assets/5e12f30514564db0389fa8fe9d16f723.webp',
    mobile: '/lemify-assets/00391a45c4c5b1f9bdf770f9167aface.webp',
    alt: 'Tela real do Lemify: agente de IA no WhatsApp atendendo junto com a equipe na caixa de conversas e CRM',
  },
}

export const CLIENT_LOGOS = [
  { name: 'Espazzo Móveis Conceito', src: '/lemify-assets/0572fa0274db3c0c559291e102b0ec92.png', h: 32 },
  { name: 'Instituto Guilherme Rocha', src: '/lemify-assets/2f9a25f1ab3725c5a235730a2b038ea9.png', h: 28 },
  { name: 'Vamos Sorrir Odontologia', src: '/lemify-assets/1273288ff07feafcdec8e389b7cd0dc6.png', h: 28 },
  { name: 'Instituto Machado Xavier Odontologia', src: '/lemify-assets/a95925a819e85e05e6730c59c5bfb5ed.png', h: 30 },
  { name: 'Time Agência de Publicidade', src: '/lemify-assets/b28f30201ecd5a07fedf1dde363884e7.png', h: 30 },
  { name: 'PlanaSul', src: '/lemify-assets/775a9b63073212517d07fe8bc41bf55e.png', h: 30 },
  { name: 'Nexuma Tecnologia', src: '/lemify-assets/959bc971d2cf19404f893e1c9b44cb8e.png', h: 28 },
  { name: 'Zelura Cosméticos', src: '/lemify-assets/ce2376cd7126c526d561ebaf00771b49.png', h: 34 },
]

export const PRODUCT_SHOWCASE = {
  eyebrow: 'Por dentro do Lemify',
  title: 'A IA atende e qualifica. O seu time entra só para fechar.',
  lead:
    'WhatsApp, Instagram, CRM, agenda e painel no mesmo lugar. Sem celular compartilhado, sem planilha solta e sem lead esfriando sem resposta.',
  note: 'Telas reais do Lemify. Nomes e contatos foram trocados por fictícios.',
  tabs: [
    {
      id: 'conversas',
      label: 'Conversas',
      title: 'A IA responde na hora e passa a conversa pronta para o vendedor',
      description:
        'WhatsApp, Instagram, Messenger e e-mail numa caixa única, com setores, filas e a ficha completa do cliente ao lado.',
      bullets: [
        'Vários atendentes no mesmo número, com transferência sem perder histórico',
        'Resumo automático da conversa escrito pela IA e chat interno da equipe',
        'Comentários das redes, etiquetas e respostas rápidas no mesmo painel',
      ],
      desktop: '/lemify-assets/5e12f30514564db0389fa8fe9d16f723.webp',
      mobile: '/lemify-assets/00391a45c4c5b1f9bdf770f9167aface.webp',
      alt: 'Tela real do Lemify: caixa de conversas com setores, responsáveis e ficha do cliente',
    },
    {
      id: 'crm',
      label: 'CRM',
      title: 'Cada conversa vira oportunidade organizada no funil',
      description:
        'Funis em quadro com as etapas da sua empresa, orçamentos prontos e visibilidade de receita sem depender de planilha.',
      bullets: [
        'Funis configuráveis com ganhos, perdas e motivos de perda por etapa',
        'Orçamentos montados com o seu catálogo e tabelas de preço',
        'Origem de cada contato, ticket médio e conversão por período',
      ],
      desktop: '/lemify-assets/917e6bad91ef64219095357db8fbda52.webp',
      mobile: '/lemify-assets/99a73a8bb7759059d11b39119f8673d8.webp',
      alt: 'Painel do CRM do Lemify com negociações, receita ganha, ticket médio e funil por etapa',
    },
    {
      id: 'agenda',
      label: 'Agenda',
      title: 'Horários marcados pelo WhatsApp sem ninguém no telefone',
      description:
        'Os horários marcados pela equipe e pelos agentes de IA, filtrados por profissional, unidade e status.',
      bullets: [
        'Visão por dia, semana e mês, por profissional e por unidade',
        'Confirmação, remarcação e lembretes automáticos antes do horário',
        'Integração com Google Agenda e links do Google Meet',
      ],
      desktop: '/lemify-assets/37a7a272142536f49412e7a28aa03270.webp',
      mobile: '/lemify-assets/ad0fec97d142f4c9879d718e0f7476ea.webp',
      alt: 'Agenda do Lemify na visão do dia com filtros por unidade, status e profissional',
    },
    {
      id: 'painel',
      label: 'Painel',
      title: 'Saiba quantas conversas viraram agenda e venda',
      description:
        'Acompanhe tempo de resposta, funil, receita e onde as vendas estão travando em poucos cliques.',
      bullets: [
        'Tempo de resposta, SLA, NPS e receita por período escolhido',
        'Desempenho individual por atendente, setor e filial',
        'Vendas do CRM enviadas para a Meta para melhorar seus anúncios',
      ],
      desktop: '/lemify-assets/c2e91d5742dc8c13ba468a72c4de0160.webp',
      mobile: '/lemify-assets/ad60d58858488e92dcfb2cbbab62cb1e.webp',
      alt: 'Painel do Lemify com ganhos e perdas por dia, motivos de perda e desempenho da equipe',
    },
  ],
}

export const AI_AGENTS_SECTION = {
  eyebrow: 'Seis agentes de IA',
  title: 'Do primeiro "oi" no WhatsApp ao fechamento da venda.',
  lead:
    'Cada agente assume uma parte da rotina comercial 24 horas por dia, dentro da mesma ficha que o seu time usa. Quando o cliente pede uma pessoa ou está pronto para fechar, a equipe assume com o resumo pronto.',
  agents: [
    {
      id: 'lemi',
      name: 'Lemi',
      role: 'Atendimento',
      task: 'Responde dúvidas mesmo fora do expediente',
      description:
        'Consulta as informações e regras da sua empresa, responde na hora e chama a equipe quando precisa.',
      avatar: '/lemify-assets/4288c321bd4e7cfab256b2c142fe2804.webp',
      bg: '#F1FECB',
      gradient: 'linear-gradient(125deg, #d8fe6a 0%, #e9ffa3 100%)',
    },
    {
      id: 'maia',
      name: 'Maia',
      role: 'Agendamento',
      task: 'Marca horários sem ninguém no telefone',
      description:
        'Oferece os horários livres da agenda, marca, remarca e envia lembrete antes do compromisso.',
      avatar: '/lemify-assets/9588b6492fbcd05850e3b69009e61e4c.webp',
      bg: '#D8E7EF',
      gradient: 'linear-gradient(125deg, #bcd8ff 0%, #dcebff 100%)',
    },
    {
      id: 'otto',
      name: 'Otto',
      role: 'Enriquecimento',
      task: 'Preenche a ficha de cada cliente automaticamente',
      description:
        'Anota nome, cidade, e-mail, interesse e origem direto da conversa. Ninguém digita cadastro.',
      avatar: '/lemify-assets/81be5ebfeade9f0dc8be40ce139c5d29.webp',
      bg: '#F0DADE',
      gradient: 'linear-gradient(125deg, #ffc9d6 0%, #ffe2e9 100%)',
    },
    {
      id: 'theo',
      name: 'Theo',
      role: 'CRM',
      task: 'Mantém cada negociação na etapa certa',
      description:
        'Cria a negociação no funil, atualiza o valor e avisa o vendedor responsável conforme a conversa avança.',
      avatar: '/lemify-assets/bfcd2809ec95079e6151f8d7d08579fa.webp',
      bg: '#CAD9C2',
      gradient: 'linear-gradient(125deg, #c9dbb8 0%, #e1edd6 100%)',
    },
    {
      id: 'nico',
      name: 'Nico',
      role: 'Follow-up',
      task: 'Retoma contatos que pararam de responder',
      description:
        'Chama de novo no tempo certo com contexto real da conversa e devolve o cliente quente para o time.',
      avatar: '/lemify-assets/939caed0768f159b15d48b7b63e34717.webp',
      bg: '#F3DCC7',
      gradient: 'linear-gradient(125deg, #ffcfa8 0%, #ffe4ce 100%)',
    },
    {
      id: 'iris',
      name: 'Íris',
      role: 'Insights',
      task: 'Mostra o que traz venda e o que precisa de atenção',
      description:
        'Entrega resumos semanais com volume, velocidade de resposta, canais que mais fecham e principais dúvidas.',
      avatar: '/lemify-assets/ae93dbf37bf1171471288127cbe3828e.webp',
      bg: '#E4DDEB',
      gradient: 'linear-gradient(125deg, #dcc8ff 0%, #efe5ff 100%)',
    },
  ],
}

export const CASES_SECTION = {
  eyebrow: 'Resultados reais',
  title: 'O tempo de resposta no WhatsApp caiu de 2 horas para 10 segundos.',
  lead: 'Mais de 2 mil empresas brasileiras usam agentes de IA do Lemify para responder na hora e não perder vendas por demora.',
  cards: [
    {
      id: 'espazzo',
      theme: 'light',
      logo: '/lemify-assets/0572fa0274db3c0c559291e102b0ec92.png',
      logoAlt: 'Espazzo Móveis Conceito',
      logoH: 34,
      metric: '100%',
      metricLabel: 'de taxa de resposta',
      quote:
        '“A gente achava que a conversão baixa era culpa dos leads. Com o Lemify, centralizamos o atendimento, chegamos a 100% de taxa de resposta e hoje vemos onde o atendimento falhava.”',
      company: 'Espazzo Móveis Conceito',
      segment: 'Loja de móveis',
    },
    {
      id: 'igr',
      theme: 'dark',
      logo: '/lemify-assets/7c8f03dcfa1b6717587c941a4e17d132.png',
      logoAlt: 'Instituto Guilherme Rocha',
      logoH: 28,
      headline: 'A triagem acontece antes de chegar na recepção',
      quote:
        '“Hoje a IA do Lemify faz a triagem antes de o contato chegar à recepção. E o painel mostra quantos contatos viram agendamento, o que orienta o nosso marketing.”',
      company: 'Instituto Guilherme Rocha',
      segment: 'Saúde',
    },
  ],
  video: {
    src: '/lemify-assets/698494a07a686d7a314a323303cd17d8.mp4',
    poster: '/lemify-assets/9561b131aa4982c626321015d659debc.webp',
    label: 'Depoimento em vídeo de uma cliente do Lemify',
  },
}

// ───── Planos (com fallback estático + atualização ao vivo via API) ─────
export const PLANS_API_URL = 'https://api.lemify.com.br/v1/plans'
export const PLANS_CACHE_KEY = 'lemify-plans-v1'
export const PLANS_CACHE_TTL = 15 * 60 * 1000

const PLAN_DESCRIPTIONS = {
  NANO: 'Para micro empresas começarem a atender com IA, agenda e orçamentos.',
  START: 'Para reunir o atendimento num lugar só, com IA que atende e agenda.',
  PLUS: 'Para equipes que querem vender mais com insights, campanhas e chat no site.',
  PRO: 'Para escalar o atendimento com automações, API e todos os agentes de IA.',
}

const PLAN_AGENTS_META = [
  { key: 'useLemiAI', label: 'atendimento', slug: 'atendimento', avatar: '/lemify-assets/4288c321bd4e7cfab256b2c142fe2804.webp', bg: '#F1FECB' },
  { key: 'useSpecialistAgenda', label: 'agendamento', slug: 'agendamento', avatar: '/lemify-assets/9588b6492fbcd05850e3b69009e61e4c.webp', bg: '#D8E7EF' },
  { key: 'useBudgets', label: 'orçamentos', slug: 'orcamentos', avatar: '/lemify-assets/939caed0768f159b15d48b7b63e34717.webp', bg: '#F3DCC7' },
  { key: 'useAgentInsights', label: 'insights', slug: 'insights', avatar: '/lemify-assets/ae93dbf37bf1171471288127cbe3828e.webp', bg: '#E4DDEB' },
  { key: 'useSpecialistCrm', label: 'CRM', slug: 'crm', avatar: '/lemify-assets/bfcd2809ec95079e6151f8d7d08579fa.webp', bg: '#CAD9C2' },
  { key: 'useSpecialistEnrich', label: 'enriquecimento', slug: 'enriquecimento', avatar: '/lemify-assets/81be5ebfeade9f0dc8be40ce139c5d29.webp', bg: '#F0DADE' },
]

const PLAN_MODS_META = [
  ['usePipelines', 'CRM com funis'],
  ['useAgenda', 'agenda'],
  ['useBudgetsModule', 'orçamentos'],
  ['useEmail', 'e-mail'],
  ['useInteractions', 'comentários das redes'],
  ['useInternalchat', 'chat interno'],
  ['useCampaigns', 'campanhas'],
  ['useWebchat', 'chat no site'],
  ['useLemiflow', 'Lemi Flow'],
  ['useApi', 'API'],
  ['useSpecialistSummary', 'resumo de conversas'],
]

export const DEFAULT_RAW_PLANS = [
  {
    name: 'NANO',
    value: 97,
    connections: 1,
    users: 1,
    branches: 1,
    aiBudget: 5,
    useLemiAI: true,
    useSpecialistAgenda: false,
    useBudgets: false,
    useAgentInsights: false,
    useSpecialistCrm: false,
    useSpecialistEnrich: false,
    usePipelines: false,
    useAgenda: true,
    useBudgetsModule: true,
    useEmail: false,
    useInteractions: false,
    useInternalchat: false,
    useCampaigns: false,
    useWebchat: false,
    useLemiflow: false,
    useApi: false,
    useSpecialistSummary: false,
  },
  {
    name: 'START',
    value: 397,
    connections: 2,
    users: 2,
    branches: 1,
    aiBudget: 10,
    useLemiAI: true,
    useSpecialistAgenda: true,
    useBudgets: true,
    useAgentInsights: false,
    useSpecialistCrm: false,
    useSpecialistEnrich: false,
    usePipelines: true,
    useAgenda: true,
    useBudgetsModule: false,
    useEmail: true,
    useInteractions: true,
    useInternalchat: false,
    useCampaigns: false,
    useWebchat: false,
    useLemiflow: false,
    useApi: false,
    useSpecialistSummary: false,
  },
  {
    name: 'PLUS',
    value: 497,
    connections: 4,
    users: 4,
    branches: 1,
    aiBudget: 15,
    useLemiAI: true,
    useSpecialistAgenda: true,
    useBudgets: true,
    useAgentInsights: true,
    useSpecialistCrm: false,
    useSpecialistEnrich: false,
    usePipelines: true,
    useAgenda: true,
    useBudgetsModule: true,
    useEmail: true,
    useInteractions: true,
    useInternalchat: true,
    useCampaigns: true,
    useWebchat: true,
    useLemiflow: false,
    useApi: false,
    useSpecialistSummary: false,
  },
  {
    name: 'PRO',
    value: 897,
    connections: 15,
    users: 15,
    branches: 1,
    aiBudget: 50,
    useLemiAI: true,
    useSpecialistAgenda: true,
    useBudgets: true,
    useAgentInsights: true,
    useSpecialistCrm: true,
    useSpecialistEnrich: true,
    usePipelines: true,
    useAgenda: true,
    useBudgetsModule: true,
    useEmail: true,
    useInteractions: true,
    useInternalchat: true,
    useCampaigns: true,
    useWebchat: true,
    useLemiflow: true,
    useApi: true,
    useSpecialistSummary: true,
  },
]

const joinPt = (arr) => (arr.length < 2 ? arr[0] || '' : `${arr.slice(0, -1).join(', ')} e ${arr[arr.length - 1]}`)
const cap = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : '')
const titleCase = (n) => n.charAt(0) + n.slice(1).toLowerCase()
const formatNum = (n) => Number(n).toLocaleString('pt-BR')
const formatMoney = (v) => (v % 1 === 0 ? String(v) : v.toFixed(2).replace('.', ','))
const annualPrice = (v) => Math.floor(v * 0.7)

export function buildPlansView(rawList) {
  const valid = (Array.isArray(rawList) ? rawList : DEFAULT_RAW_PLANS)
    .filter((p) => p && p.active !== false && typeof p.name === 'string' && Number.isFinite(p.value) && p.value > 0)
    .sort((a, b) => a.value - b.value)

  const plans = valid.length ? valid : DEFAULT_RAW_PLANS
  const modsOf = (p) => PLAN_MODS_META.filter(([k]) => p[k]).map(([, label]) => label)
  const agentsOf = (p) => PLAN_AGENTS_META.filter((a) => p[a.key])

  const formatCard = (p, prev) => {
    const activeAgents = agentsOf(p)
    const agentLabels = activeAgents.map((a) => a.label)
    const agentsText =
      activeAgents.length === PLAN_AGENTS_META.length
        ? 'Os seis agentes de IA'
        : `${activeAgents.length === 1 ? 'Agente de ' : 'Agentes de '}${joinPt(agentLabels)}`

    const currentMods = modsOf(p)
    let featuresLine = cap(joinPt(currentMods))
    if (prev && prev.name !== 'NANO') {
      const prevMods = modsOf(prev)
      if (prevMods.length && prevMods.every((m) => currentMods.includes(m))) {
        const diff = currentMods.filter((m) => !prevMods.includes(m))
        if (diff.length) featuresLine = `Tudo do ${titleCase(prev.name)}, mais ${joinPt(diff)}`
      }
    }

    const bullets = [
      p.connections === 1 ? '1 canal de atendimento' : `${p.connections} canais de atendimento`,
      p.users === 1 ? 'Até 1 usuário' : `Até ${p.users} usuários simultâneos`,
      `Até ${formatNum(p.aiBudget * 1000)} créditos de IA`,
    ]
    if (featuresLine) bullets.push(featuresLine)

    return {
      code: p.name,
      title: titleCase(p.name),
      featured: p.name === 'PLUS',
      description: PLAN_DESCRIPTIONS[p.name] || '',
      monthly: formatMoney(p.value),
      annual: String(annualPrice(p.value)),
      agents: activeAgents,
      agentsText,
      bullets,
    }
  }

  const mainPlans = plans.map((p, i) => formatCard(p, plans[i - 1]))

  const usersSummary = joinPt(
    plans.map((p, i) => {
      if (i === 0) return `${p.users}${p.users === 1 ? ' usuário' : ' usuários'} no ${titleCase(p.name)}`
      return `${i === 1 ? 'até ' : ''}${p.users} no ${titleCase(p.name)}`
    }),
  )

  const comparisonGroups = [
    {
      group: null,
      rows: [
        { label: 'Preço mensal', values: plans.map((p) => `R$ ${formatMoney(p.value)}`) },
        { label: 'No plano anual (30% OFF)', values: plans.map((p) => `R$ ${annualPrice(p.value)}/mês`) },
        { label: 'Canais de atendimento', values: plans.map((p) => String(p.connections)) },
        { label: 'Usuários simultâneos', values: plans.map((p) => String(p.users)) },
        { label: 'Filiais', values: plans.map((p) => String(p.branches)) },
        { label: 'Atendimentos por mês', values: plans.map(() => '1.000') },
        { label: 'Créditos de IA por mês', values: plans.map((p) => formatNum(p.aiBudget * 1000)) },
      ],
    },
    {
      group: 'Agentes de IA',
      rows: PLAN_AGENTS_META.map((a) => ({
        label: cap(a.label),
        values: plans.map((p) => Boolean(p[a.key])),
      })),
    },
    {
      group: 'Recursos incluídos',
      rows: PLAN_MODS_META.map(([key, label]) => ({
        label: cap(label),
        values: plans.map((p) => Boolean(p[key])),
      })),
    },
  ]

  return {
    mainPlans,
    comparisonGroups,
    minPrice: formatMoney(plans[0].value),
    minAnnualPrice: String(annualPrice(plans[0].value)),
    usersSummary,
  }
}

export const getLemifyFaq = (usersSummary) => [
  {
    q: 'O Lemify é uma agência? Vocês cuidam do meu tráfego pago?',
    a: 'Não. O Lemify é o software de atendimento e CRM com IA que a sua equipe usa no dia a dia. A gente não cria nem gerencia anúncios: cuidamos para que os contatos que chegam pelos seus canais sejam atendidos, registrados e acompanhados até a venda.',
  },
  {
    q: 'Posso usar o meu número de WhatsApp atual? Corre risco de bloqueio?',
    a: 'Sim. Você conecta o número que já usa por QR Code ou pela API Oficial (Waba). O Lemify é Meta Business Partner homologado pela Meta para fornecer a API Oficial do WhatsApp, o que traz alta estabilidade e risco muito baixo de bloqueio.',
    link: { href: '/api', label: 'Conhecer a API Oficial (Waba)' },
  },
  {
    q: 'Como eu controlo o que a IA responde e quando a equipe assume?',
    a: 'Você informa produtos, serviços, preços, horários e as regras da sua empresa, e testa tudo antes de liberar. Quando o cliente pede uma pessoa ou o assunto sai das regras, a conversa vai para o setor certo com o histórico e o resumo prontos.',
  },
  {
    q: 'Quantas pessoas da equipe podem usar e preciso instalar algo?',
    a: `O Lemify funciona direto no navegador, sem instalar nada. Os planos atendem ${usersSummary}. Cada pessoa entra com o próprio acesso e, se a sua operação precisar de mais usuários, basta falar com a gente.`,
  },
  {
    q: 'Como funciona a configuração e a implantação guiada?',
    a: 'Você pode configurar por conta própria a partir de modelos prontos para o seu segmento, com suporte pelo WhatsApp incluído. Se preferir, a implantação guiada opcional (R$ 850) configura tudo com você, treina a equipe e acompanha o primeiro mês.',
  },
  {
    q: 'O que acontece quando os créditos de IA acabam?',
    a: 'Cada plano traz créditos mensais de IA. Se acabarem antes da renovação, os agentes pausam até o mês virar ou até você contratar créditos extras no próprio sistema, enquanto a sua equipe continua atendendo normalmente.',
    link: { href: '#comparar-planos', label: 'Comparar todos os planos' },
  },
]
