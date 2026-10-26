// Módulos do Lemify para a página de documentação.
// Para adicionar um vídeo: coloque o link (YouTube, Vimeo, Loom) ou o caminho de um arquivo .mp4
// salvo em public/docs/videos (ex.: '/docs/videos/dashboard.mp4') no campo `video` do módulo.
export const MODULES = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    group: 'Operação',
    summary: 'Indicadores do atendimento e da operação em uma tela só.',
    description:
      'O Dashboard mostra como o atendimento está agora e como foi no período escolhido. Dá para filtrar por dia e acompanhar o volume de conversas, os tempos de resposta, a satisfação dos clientes e o resultado comercial.',
    features: [
      'Contatos, tempo médio de atendimento, tempo médio de espera e NPS médio.',
      'Atendimentos aguardando, sem resposta e finalizados, com receita total.',
      'SLA de atendimento, tempo médio de resolução, taxa sem resposta e taxa de finalização.',
      'Distribuição geográfica dos contatos por estado.',
    ],
    video: '',
  },
  {
    id: 'atendimento',
    title: 'Atendimento',
    group: 'Operação',
    summary: 'Caixa de entrada única com todos os canais, equipes e IA.',
    description:
      'O Atendimento reúne as conversas de WhatsApp, Instagram, Facebook Messenger e outros canais numa caixa só (Inbox). As conversas viram atendimentos (tickets) que podem ser distribuídos entre setores e atendentes, ou respondidos pelos Agentes de IA.',
    features: [
      'Inbox com atendimentos abertos, aguardando e finalizados.',
      'Contatos: histórico completo de cada cliente, vinculado à empresa e não ao atendente.',
      'Respostas rápidas para as perguntas mais comuns.',
      'Etiquetas para organizar e filtrar conversas.',
      'Transferência entre setores e atendentes, mantendo o contexto.',
    ],
    video: '',
  },
  {
    id: 'email',
    title: 'E-mail',
    group: 'Operação',
    summary: 'Sua caixa de e-mail dentro da plataforma.',
    description:
      'O módulo de E-mail traz as mensagens para o mesmo ambiente do atendimento, com contador de não lidas, para que a equipe não precise alternar entre ferramentas.',
    features: [
      'Caixa de entrada com mensagens não lidas em destaque.',
      'Resposta direta pela plataforma.',
      'Conta de e-mail configurada pela própria empresa.',
    ],
    video: '',
  },
  {
    id: 'crm',
    title: 'CRM',
    group: 'Vendas',
    summary: 'Funis de venda em quadro, com o histórico de cada cliente.',
    description:
      'O CRM organiza as oportunidades em funis (pipelines) com etapas. Cada negociação fica ligada ao contato e às conversas, então ninguém perde o contexto quando o cliente muda de atendente ou de canal.',
    features: [
      'Quadro kanban com etapas personalizáveis.',
      'Negociações vinculadas a contatos, conversas e orçamentos.',
      'Atualização de etapas e anotações pelos Agentes de IA.',
      'Acompanhamento de valor e andamento das vendas.',
    ],
    video: '',
  },
  {
    id: 'interacoes',
    title: 'Interações',
    group: 'Vendas',
    summary: 'Comentários e interações dos clientes nas redes sociais.',
    description:
      'Em Interações a equipe acompanha os comentários recebidos nas redes conectadas e responde a partir do mesmo ambiente do atendimento, sem perder nenhum cliente que chamou por fora da conversa.',
    features: [
      'Lista de interações com contador de novos comentários.',
      'Resposta a partir da plataforma.',
      'Histórico ligado ao contato.',
    ],
    video: '',
  },
  {
    id: 'orcamentos',
    title: 'Orçamentos',
    group: 'Vendas',
    summary: 'Propostas montadas com produtos, serviços e tabelas de preço.',
    description:
      'Os Orçamentos permitem montar propostas a partir do catálogo da empresa e acompanhá-las até o fechamento. Os agentes também podem criar orçamentos durante a conversa.',
    features: [
      'Itens vindos de Produtos e Serviços.',
      'Tabelas de preço e acréscimos.',
      'Orçamento vinculado ao contato e à negociação do CRM.',
    ],
    video: '',
  },
  {
    id: 'chat-interno',
    title: 'Chat interno',
    group: 'Operação',
    summary: 'Conversa entre os membros da equipe, sem sair da plataforma.',
    description:
      'O Chat Interno é o canal de conversa da equipe. Serve para tirar dúvidas sobre um atendimento, combinar uma transferência ou compartilhar informações sem expor nada ao cliente.',
    features: [
      'Conversas entre usuários, com contador de não lidas.',
      'Notificação em tempo real.',
    ],
    video: '',
  },
  {
    id: 'agenda',
    title: 'Agenda',
    group: 'Operação',
    summary: 'Agendamentos, horários livres e videoconferência.',
    description:
      'A Agenda reúne os compromissos da empresa. Os agendamentos podem ser criados pela equipe, pelos Agentes de IA (como a Maia) ou pela API, com verificação de conflito de horário e geração de link de Google Meet.',
    features: [
      'Agendamentos por profissional e por filial.',
      'Consulta de horários disponíveis e verificação de conflitos.',
      'Recorrência diária, semanal ou mensal.',
      'Integração com o Google Calendar e links do Google Meet.',
    ],
    video: '',
  },
  {
    id: 'campanhas',
    title: 'Campanhas',
    group: 'Crescimento',
    summary: 'Anúncios que viram conversa e disparos para a sua base.',
    description:
      'Em Campanhas ficam as ações de aquisição e de relacionamento. Os Anúncios acompanham a origem dos leads que chegam por anúncio, e os Disparos enviam mensagens para uma lista de contatos, respeitando consentimento e regras do canal.',
    features: [
      'Anúncios: origem e acompanhamento dos leads vindos de anúncios.',
      'Disparos: envio de mensagens para listas de contatos.',
      'Follow-up e retomada de oportunidades.',
    ],
    video: '',
  },
  {
    id: 'cadastros',
    title: 'Cadastros',
    group: 'Administração',
    summary: 'Usuários, filiais, produtos, serviços, tabelas de preço e fontes.',
    description:
      'Os Cadastros guardam as informações-base da operação, usadas pelo atendimento, pelo CRM, pela Agenda e pelos Orçamentos.',
    features: [
      'Usuários e perfis de acesso.',
      'Filiais e unidades.',
      'Produtos, serviços e tabelas de preço.',
      'Fontes (origem dos contatos e das vendas).',
    ],
    video: '',
  },
  {
    id: 'lemi-flow',
    title: 'Lemi Flow',
    group: 'Automação',
    summary: 'Fluxos de automação desenhados visualmente.',
    description:
      'O Lemi Flow permite montar fluxos de atendimento e de relacionamento em um editor visual, combinando etapas automáticas, regras e a atuação dos Agentes de IA. Disponível conforme o plano contratado.',
    features: [
      'Editor visual de fluxos.',
      'Regras e condições por canal, horário ou etapa do funil.',
      'Combinação com os Agentes de IA.',
    ],
    video: '',
  },
  {
    id: 'agentes-ia',
    title: 'Agentes de IA',
    group: 'Automação',
    summary: 'Lemi, Maia, Theo, Otto, Nico e Íris trabalhando com a sua equipe.',
    description:
      'Os Agentes de IA atendem, qualificam, agendam, preenchem cadastros, retomam conversas e geram relatórios, cada um com sua função. Eles usam a base de conhecimento e as instruções definidas pela empresa e podem passar a conversa para uma pessoa a qualquer momento.',
    features: [
      'Lemi: agente principal, atende na hora em todos os canais.',
      'Maia (agendamento), Theo (vendas), Otto (cadastro), Nico (retorno) e Íris (relatórios).',
      'Base de conhecimento com os documentos da empresa.',
      'Créditos de IA por plano, com recarga avulsa.',
      'Supervisão humana e transferência para a equipe.',
    ],
    video: '',
  },
  {
    id: 'integracoes',
    title: 'Integrações',
    group: 'Administração',
    summary: 'Conexão com canais, ERPs, marketplaces e serviços do Google.',
    description:
      'As Integrações levam dados de outras ferramentas para dentro do atendimento e dos agentes: canais de mensagens, ERPs, marketplaces, agenda e meios de pagamento.',
    features: [
      'Canais: WhatsApp, Instagram, Facebook Messenger e e-mail.',
      'Meta, Google, TikTok e iFood.',
      'Mercado Livre, Shopify, Nuvemshop, Bling, Omie, Conta Azul, Asaas e Tiny.',
      'Google Calendar e Google Meet para a agenda.',
    ],
    video: '',
  },
  {
    id: 'configuracoes',
    title: 'Configurações',
    group: 'Administração',
    summary: 'Canais, chaves de API, equipe, plano e preferências.',
    description:
      'Em Configurações a empresa conecta seus canais, gera as chaves de API, ajusta preferências da operação, gerencia o plano e configura os Agentes de IA.',
    features: [
      'Canais e conexões (inclusive token da API de cada canal).',
      'Chaves de API da empresa.',
      'Preferências de atendimento, horários e filas.',
      'Plano, faturas e créditos de IA.',
    ],
    video: '',
  },
]

export const GROUPS = ['Operação', 'Vendas', 'Crescimento', 'Automação', 'Administração']
