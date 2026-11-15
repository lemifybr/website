// Resumo da API pública do Lemify (fonte: https://docs.lemify.com.br/api-docs/).
export const API_BASE = 'https://api.lemify.com.br'
export const API_DOCS_BASE = 'https://docs.lemify.com.br'
export const API_FULL_REFERENCE = `${API_DOCS_BASE}/api-docs/`

export const SERVERS = [
  ['Produção', 'https://api.lemify.com.br'],
]

// Documentação em texto para LLMs e agentes de IA (formato llms.txt), gerada da mesma especificação OpenAPI.
// Fica sob /api-docs: o proxy de docs.lemify.com.br só repassa esse caminho ao backend.
const LLMS_BASE = `${API_DOCS_BASE}/api-docs`
export const LLMS = [
  { id: 'index', title: 'Índice (llms.txt)', text: 'Visão geral, autenticação, limites e links para cada módulo.', url: `${LLMS_BASE}/llms.txt` },
  { id: 'mensagens', title: 'Mensagens', text: 'Envio de texto e mídia pelo WhatsApp.', url: `${LLMS_BASE}/llms/mensagens.md` },
  { id: 'agenda', title: 'Agenda', text: 'Agendamentos, horários livres e conflitos.', url: `${LLMS_BASE}/llms/agenda.md` },
  { id: 'crm', title: 'CRM', text: 'Negociações, pipelines, etapas e motivos.', url: `${LLMS_BASE}/llms/crm.md` },
  { id: 'full', title: 'Tudo em um arquivo', text: 'Os três módulos completos (llms-full.txt).', url: `${LLMS_BASE}/llms-full.txt` },
]

export const LIMITS = [
  ['Por empresa', '300 requisições por minuto, somando todas as chaves da empresa.'],
  ['Por chave', '300 requisições por minuto.'],
  ['Por IP', '600 requisições por minuto, antes da autenticação.'],
  ['Envio de mensagens', '10 mensagens por minuto por token de canal e 60 por IP.'],
]

export const AUTH = [
  {
    name: 'Chave de API da empresa',
    where: 'Agenda e CRM',
    how: 'Gere em Configurações > Chaves de API (começa com lmf_) e escolha as permissões: agenda:read, agenda:write, crm:read e crm:write. Envie em Authorization: Bearer ou no cabeçalho X-API-Key. A chave vale para toda a empresa, em todas as filiais, e só é exibida uma vez.',
    sample: 'Authorization: Bearer lmf_SUA_CHAVE',
  },
  {
    name: 'Token do canal',
    where: 'Mensagens',
    how: 'Encontrado em Configurações > Canais > Conexões > WhatsApp > Token da API. Envie em Authorization: Bearer.',
    sample: 'Authorization: Bearer TOKEN_DO_CANAL',
  },
]

export const ENDPOINTS = [
  {
    group: 'Mensagens',
    note: 'Envio e recebimento de mensagens.',
    items: [
      {
        id: 'messages-send',
        method: 'POST',
        path: '/v1/messages/send',
        title: 'Enviar mensagem',
        text: 'Envia uma mensagem de WhatsApp a partir de um canal conectado. Com createTicket verdadeiro, a conversa também vira um atendimento.',
        auth: 'Token do canal',
        fields: [
          ['number', 'string', 'obrigatório', 'Telefone com DDI e DDD, só números (ex.: 5511999999999).'],
          ['body', 'string', 'opcional', 'Texto da mensagem.'],
          ['createTicket', 'boolean', 'opcional', 'Cria um atendimento para a conversa.'],
          ['medias', 'arquivo[]', 'opcional', 'Imagens, vídeos, documentos ou áudios. Envie como multipart/form-data.'],
        ],
        sample: `curl -X POST ${'https://api.lemify.com.br'}/v1/messages/send \\
  -H "Authorization: Bearer TOKEN_DO_CANAL" \\
  -H "Content-Type: application/json" \\
  -d '{
    "number": "5511999999999",
    "body": "Olá! Seu pedido saiu para entrega.",
    "createTicket": true
  }'`,
      },
    ],
  },
  {
    group: 'Agenda',
    note: 'Agendamentos: consulta, criação, alteração e horários disponíveis.',
    items: [
      {
        id: 'agenda-list',
        method: 'GET',
        path: '/v1/agenda',
        title: 'Listar agendamentos',
        text: 'Retorna os agendamentos da empresa, com filtros e paginação.',
        auth: 'Chave de API',
        fields: [
          ['date', 'query', 'opcional', 'Data (AAAA-MM-DD).'],
          ['status', 'query', 'opcional', 'Status do agendamento.'],
          ['professionalId', 'query', 'opcional', 'Filtra por profissional.'],
          ['userId', 'query', 'opcional', 'Filtra por usuário.'],
          ['searchParam', 'query', 'opcional', 'Busca por texto.'],
          ['pageNumber', 'query', 'opcional', 'Página dos resultados.'],
          ['branchIds', 'query', 'opcional', 'Filtra por filiais.'],
        ],
        sample: `curl "${'https://api.lemify.com.br'}/v1/agenda?date=2026-11-03" \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'agenda-create',
        method: 'POST',
        path: '/v1/agenda',
        title: 'Criar agendamento',
        text: 'Cria um agendamento. Pode gerar link do Google Meet e repetir em uma recorrência.',
        auth: 'Chave de API',
        fields: [
          ['customerName', 'string', 'obrigatório', 'Nome do cliente.'],
          ['date', 'string', 'obrigatório', 'Data (AAAA-MM-DD).'],
          ['time', 'string', 'obrigatório', 'Horário de início (HH:MM).'],
          ['endTime', 'string', 'opcional', 'Horário de término.'],
          ['duration', 'integer', 'opcional', 'Duração em minutos.'],
          ['customerPhone / customerEmail', 'string', 'opcional', 'Contato do cliente.'],
          ['title / service / notes / location', 'string', 'opcional', 'Detalhes do compromisso.'],
          ['professionalId / userId / contactId / branchId', 'integer', 'opcional', 'Vínculos com profissional, usuário, contato e filial.'],
          ['recurrence', 'string', 'opcional', 'none, daily, weekly ou monthly.'],
          ['addGoogleMeet / meetLink', 'boolean / string', 'opcional', 'Gera ou informa o link da videoconferência.'],
          ['force', 'boolean', 'opcional', 'Cria mesmo com conflito de horário.'],
        ],
        sample: `curl -X POST ${'https://api.lemify.com.br'}/v1/agenda \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customerName": "Maria Souza",
    "customerPhone": "5511999999999",
    "date": "2026-11-03",
    "time": "10:00",
    "duration": 30,
    "service": "Consulta",
    "addGoogleMeet": true
  }'`,
      },
      {
        id: 'agenda-slots',
        method: 'GET',
        path: '/v1/agenda/available-slots',
        title: 'Horários disponíveis',
        text: 'Retorna os horários livres em uma data, opcionalmente para um profissional.',
        auth: 'Chave de API',
        fields: [
          ['date', 'query', 'obrigatório', 'Data (AAAA-MM-DD).'],
          ['professionalId', 'query', 'opcional', 'Filtra por profissional.'],
          ['excludeAgendaId', 'query', 'opcional', 'Ignora um agendamento (útil ao remarcar).'],
        ],
        sample: `curl "${'https://api.lemify.com.br'}/v1/agenda/available-slots?date=2026-11-03" \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'agenda-get',
        method: 'GET',
        path: '/v1/agenda/{agendaId}',
        title: 'Consultar agendamento',
        text: 'Retorna os dados de um agendamento.',
        auth: 'Chave de API',
        fields: [['agendaId', 'path', 'obrigatório', 'Identificador do agendamento.']],
        sample: `curl ${'https://api.lemify.com.br'}/v1/agenda/123 \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'agenda-update',
        method: 'PUT',
        path: '/v1/agenda/{agendaId}',
        title: 'Atualizar agendamento',
        text: 'Altera os dados de um agendamento existente.',
        auth: 'Chave de API',
        fields: [['agendaId', 'path', 'obrigatório', 'Identificador do agendamento.']],
        sample: `curl -X PUT ${'https://api.lemify.com.br'}/v1/agenda/123 \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{ "time": "11:00" }'`,
      },
      {
        id: 'agenda-delete',
        method: 'DELETE',
        path: '/v1/agenda/{agendaId}',
        title: 'Excluir agendamento',
        text: 'Exclui um agendamento. Em recorrências, pode cancelar também as próximas ocorrências.',
        auth: 'Chave de API',
        fields: [
          ['agendaId', 'path', 'obrigatório', 'Identificador do agendamento.'],
          ['cancelRecurrence', 'query', 'opcional', 'Cancela a recorrência inteira.'],
        ],
        sample: `curl -X DELETE "${'https://api.lemify.com.br'}/v1/agenda/123?cancelRecurrence=true" \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'agenda-conflict',
        method: 'POST',
        path: '/v1/agenda/check-conflict',
        title: 'Verificar conflito',
        text: 'Verifica se um intervalo de horário conflita com outro agendamento.',
        auth: 'Chave de API',
        fields: [
          ['date', 'string', 'obrigatório', 'Data (AAAA-MM-DD).'],
          ['startTime', 'string', 'obrigatório', 'Início do intervalo.'],
          ['endTime', 'string', 'obrigatório', 'Fim do intervalo.'],
          ['professionalId / userId', 'integer', 'opcional', 'Restringe a verificação.'],
          ['excludeAgendaId', 'integer', 'opcional', 'Ignora um agendamento.'],
        ],
        sample: `curl -X POST ${'https://api.lemify.com.br'}/v1/agenda/check-conflict \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{ "date": "2026-11-03", "startTime": "10:00", "endTime": "10:30" }'`,
      },
    ],
  },
  {
    group: 'CRM',
    note: 'Negociações (deals), pipelines, etapas e motivos de ganho ou perda. Deals criados ou movidos pela API disparam as automações da etapa e os eventos de conversão do Meta, como no painel.',
    items: [
      {
        id: 'crm-pipelines',
        method: 'GET',
        path: '/v1/pipelines',
        title: 'Listar pipelines e etapas',
        text: 'Retorna os pipelines da empresa com as etapas visíveis. Use para descobrir o stageId de cada etapa.',
        auth: 'Chave de API (crm:read)',
        fields: [],
        sample: `curl ${'https://api.lemify.com.br'}/v1/pipelines \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'crm-reasons',
        method: 'GET',
        path: '/v1/deal-reasons',
        title: 'Listar motivos de ganho e perda',
        text: 'Retorna os motivos cadastrados, para usar em dealReasonId ao fechar um negócio.',
        auth: 'Chave de API (crm:read)',
        fields: [],
        sample: `curl ${'https://api.lemify.com.br'}/v1/deal-reasons \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'crm-list',
        method: 'GET',
        path: '/v1/deals',
        title: 'Listar negociações',
        text: 'Lista paginada, até 100 por página. Para sincronizar, envie updatedSince com o maior updatedAt já recebido: a ordem passa a ser por updatedAt crescente. Sem status, a lixeira fica de fora.',
        auth: 'Chave de API (crm:read)',
        fields: [
          ['updatedSince', 'query', 'opcional', 'Data e hora ISO 8601. Traz só o que mudou desde então.'],
          ['status', 'query', 'opcional', 'open, won ou lost.'],
          ['pipelineId / stageId / contactId', 'query', 'opcional', 'Filtros por pipeline, etapa e contato.'],
          ['source', 'query', 'opcional', 'Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form ou api.'],
          ['externalSource / externalId', 'query', 'opcional', 'Busca pelo id do seu sistema.'],
          ['pageNumber / limit', 'query', 'opcional', 'Página e tamanho (padrão 50, máximo 100).'],
        ],
        sample: `curl "${'https://api.lemify.com.br'}/v1/deals?updatedSince=2026-11-01T00:00:00Z&limit=100" \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'crm-create',
        method: 'POST',
        path: '/v1/deals',
        title: 'Criar negociação',
        text: 'Cria o negócio na etapa informada. Com externalId, a chamada é idempotente: repetir a criação devolve o negócio que já existe, com status 200.',
        auth: 'Chave de API (crm:write)',
        fields: [
          ['name', 'string', 'obrigatório', 'Nome do negócio.'],
          ['stageId', 'integer', 'obrigatório', 'Etapa onde o negócio entra (veja /v1/pipelines).'],
          ['amount', 'number', 'opcional', 'Valor. Com items, vira a soma dos itens.'],
          ['contactId / userId', 'integer', 'opcional', 'Contato e responsável, da mesma empresa.'],
          ['items', 'objeto[]', 'opcional', 'Produtos ou serviços: type (product ou service), id, name, price e quantity.'],
          ['status', 'string', 'opcional', 'open, won ou lost.'],
          ['closingDate / deliveryDate', 'string', 'opcional', 'Datas ISO 8601.'],
          ['description / nextStep / leadSource', 'string', 'opcional', 'Detalhes do negócio.'],
          ['externalSource / externalId', 'string', 'opcional', 'Nome do seu sistema e o id do negócio nele.'],
        ],
        sample: `curl -X POST ${'https://api.lemify.com.br'}/v1/deals \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Pedido 1042",
    "stageId": 12,
    "contactId": 345,
    "amount": 1500,
    "externalSource": "erp",
    "externalId": "1042"
  }'`,
      },
      {
        id: 'crm-get',
        method: 'GET',
        path: '/v1/deals/{dealId}',
        title: 'Consultar negociação',
        text: 'Retorna um negócio com contato, responsável, pipeline, etapa e motivo.',
        auth: 'Chave de API (crm:read)',
        fields: [['dealId', 'path', 'obrigatório', 'Identificador do negócio.']],
        sample: `curl ${'https://api.lemify.com.br'}/v1/deals/123 \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
      {
        id: 'crm-update',
        method: 'PUT',
        path: '/v1/deals/{dealId}',
        title: 'Atualizar negociação',
        text: 'Altera só os campos enviados. Para fechar o negócio, envie status won ou lost e, se quiser, dealReasonId.',
        auth: 'Chave de API (crm:write)',
        fields: [
          ['dealId', 'path', 'obrigatório', 'Identificador do negócio.'],
          ['…', 'body', 'opcional', 'Os mesmos campos da criação, mais dealReasonId e lostReason.'],
        ],
        sample: `curl -X PUT ${'https://api.lemify.com.br'}/v1/deals/123 \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "won", "dealReasonId": 4 }'`,
      },
      {
        id: 'crm-stage',
        method: 'PATCH',
        path: '/v1/deals/{dealId}/stage',
        title: 'Mover de etapa',
        text: 'Move o negócio para outra etapa (e para o pipeline dela). Etapas de fechamento marcam o negócio como ganho ou perdido.',
        auth: 'Chave de API (crm:write)',
        fields: [
          ['dealId', 'path', 'obrigatório', 'Identificador do negócio.'],
          ['stageId', 'integer', 'obrigatório', 'Etapa de destino.'],
        ],
        sample: `curl -X PATCH ${'https://api.lemify.com.br'}/v1/deals/123/stage \\
  -H "Authorization: Bearer lmf_SUA_CHAVE" \\
  -H "Content-Type: application/json" \\
  -d '{ "stageId": 13 }'`,
      },
      {
        id: 'crm-delete',
        method: 'DELETE',
        path: '/v1/deals/{dealId}',
        title: 'Excluir negociação',
        text: 'Envia o negócio para a lixeira, como no painel. A restauração é feita pelo painel.',
        auth: 'Chave de API (crm:write)',
        fields: [['dealId', 'path', 'obrigatório', 'Identificador do negócio.']],
        sample: `curl -X DELETE ${'https://api.lemify.com.br'}/v1/deals/123 \\
  -H "Authorization: Bearer lmf_SUA_CHAVE"`,
      },
    ],
  },
]

export const STATUS = [
  ['200 / 201', 'Sucesso. 204 em exclusões.'],
  ['400', 'Requisição inválida: parâmetro faltando, formato errado ou id de outra empresa.'],
  ['401', 'Chave de API ou token ausente, inválido ou revogado.'],
  ['403', 'Chave sem a permissão (escopo) do recurso ou plano sem acesso à API.'],
  ['404', 'Recurso não encontrado.'],
  ['409', 'externalSource e externalId já usados por outro negócio.'],
  ['429', 'Limite de requisições atingido. Aguarde o tempo do cabeçalho Retry-After.'],
]
