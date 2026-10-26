// Resumo da API pública do Lemify (fonte: https://docs.lemify.com.br/api-docs/).
export const API_BASE = 'https://api.lemify.com.br'
export const API_FULL_REFERENCE = 'https://docs.lemify.com.br/api-docs/'

export const SERVERS = [
  ['Produção', 'https://api.lemify.com.br'],
]

export const AUTH = [
  {
    name: 'Chave de API da empresa',
    where: 'Agenda',
    how: 'Gere em Configurações > Chaves de API (começa com lmf_). Envie em Authorization: Bearer ou no cabeçalho X-API-Key.',
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
]

export const STATUS = [
  ['200 / 201', 'Sucesso.'],
  ['400', 'Requisição inválida: parâmetro faltando ou com formato errado.'],
  ['401', 'Chave de API ou token ausente ou inválido.'],
  ['403', 'Sem permissão para este recurso.'],
  ['404', 'Recurso não encontrado.'],
]
