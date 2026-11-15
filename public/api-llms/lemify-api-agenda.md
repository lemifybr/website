# Lemify API — Agenda

> Agendamentos: listar, consultar, criar, alterar, excluir, horários disponíveis e conflito de horário.

Base URL: https://api.lemify.com.br

## Autenticação

Chave de API da empresa em `Authorization: Bearer lmf_...` (ou `X-API-Key`), escopos `agenda:read` / `agenda:write`. Gere em Configurações > Chaves de API.

Erros vêm como JSON `{ "error": "mensagem" }`. 401 = credencial ausente/inválida, 403 = sem permissão/escopo ou plano sem acesso à API, 429 = limite de requisições (respeite `Retry-After`).

## Endpoints

### GET /v1/agenda

**Lista agendamentos**

Lista agendamentos com paginação (100 por página). A chave é da empresa e enxerga todas as filiais;
use `branchIds` para filtrar. Escopo exigido: `agenda:read`.

Parâmetros:
- `date` (query, string (date)): Data (YYYY-MM-DD)
- `status` (query, string): valores: pending, confirmed, cancelled, completed
- `professionalId` (query, integer)
- `userId` (query, integer)
- `searchParam` (query, string): Busca por nome/telefone do cliente
- `pageNumber` (query, integer): padrão: 1
- `branchIds` (query, string): Filiais separadas por vírgula, ex. 1,2

Respostas:
- 200: Lista de agendamentos
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `agendas` (object[])
  - `id` (integer): ex.: 123
  - `title` (string)
  - `customerName` (string): ex.: "Maria Silva"
  - `customerPhone` (string): ex.: "5511999999999"
  - `customerEmail` (string)
  - `date` (string (date)): ex.: "2026-10-20"
  - `time` (string): ex.: "14:00:00"
  - `endTime` (string): ex.: "14:30:00"
  - `duration` (integer): Duração em minutos
  - `service` (string)
  - `status` (string): valores: pending, confirmed, cancelled, completed
  - `notes` (string)
  - `location` (string)
  - `meetLink` (string)
  - `recurrence` (string): valores: none, daily, weekly, monthly
  - `professionalId` (integer)
  - `userId` (integer)
  - `contactId` (integer)
  - `branchId` (integer)
  - `createdAt` (string (date-time))
  - `updatedAt` (string (date-time))
- `count` (integer)
- `hasMore` (boolean)

```bash
curl -X GET "https://api.lemify.com.br/v1/agenda" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### POST /v1/agenda

**Cria um agendamento**

Cria um agendamento validando disponibilidade e conflitos. Sem `branchId`, usa a filial padrão
da empresa. Escopo exigido: `agenda:write`.

Corpo (application/json):
- `customerName` (string, obrigatório): ex.: "Maria Silva"
- `customerPhone` (string): ex.: "5511999999999"
- `customerEmail` (string)
- `date` (string (date), obrigatório): ex.: "2026-10-20"
- `time` (string, obrigatório): ex.: "14:00"
- `endTime` (string): ex.: "14:30"
- `duration` (integer): Minutos (alternativa a endTime)
- `title` (string)
- `service` (string)
- `notes` (string)
- `location` (string)
- `professionalId` (integer)
- `userId` (integer)
- `contactId` (integer)
- `branchId` (integer): Filial. Sem ele, usa a filial padrão da empresa.
- `recurrence` (string): valores: none, daily, weekly, monthly; padrão: "none"
- `meetLink` (string)
- `addGoogleMeet` (boolean)
- `force` (boolean): Ignora o aviso de conflito de horário

Respostas:
- 201: Agendamento criado
- 400: Dados inválidos, filial inválida ou horário indisponível/em conflito
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 201 (objeto com):
- `id` (integer): ex.: 123
- `title` (string)
- `customerName` (string): ex.: "Maria Silva"
- `customerPhone` (string): ex.: "5511999999999"
- `customerEmail` (string)
- `date` (string (date)): ex.: "2026-10-20"
- `time` (string): ex.: "14:00:00"
- `endTime` (string): ex.: "14:30:00"
- `duration` (integer): Duração em minutos
- `service` (string)
- `status` (string): valores: pending, confirmed, cancelled, completed
- `notes` (string)
- `location` (string)
- `meetLink` (string)
- `recurrence` (string): valores: none, daily, weekly, monthly
- `professionalId` (integer)
- `userId` (integer)
- `contactId` (integer)
- `branchId` (integer)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X POST "https://api.lemify.com.br/v1/agenda" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Maria Silva","date":"2026-10-20","time":"14:00"}'
```

### GET /v1/agenda/available-slots

**Horários disponíveis**

Horários livres de um dia, opcionalmente por profissional. Escopo exigido: `agenda:read`.

Parâmetros:
- `date` (query, string (date), obrigatório): Data (YYYY-MM-DD)
- `professionalId` (query, integer)
- `excludeAgendaId` (query, integer): Ignora este agendamento (útil ao remarcar)

Respostas:
- 200: Horários disponíveis
- 400: Parâmetro date ausente
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

```bash
curl -X GET "https://api.lemify.com.br/v1/agenda/available-slots" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### GET /v1/agenda/{agendaId}

**Consulta um agendamento**

Escopo exigido: `agenda:read`.

Parâmetros:
- `agendaId` (path, integer, obrigatório)

Respostas:
- 200: Agendamento
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
- 404: Agendamento não encontrado

Resposta 200 (objeto com):
- `id` (integer): ex.: 123
- `title` (string)
- `customerName` (string): ex.: "Maria Silva"
- `customerPhone` (string): ex.: "5511999999999"
- `customerEmail` (string)
- `date` (string (date)): ex.: "2026-10-20"
- `time` (string): ex.: "14:00:00"
- `endTime` (string): ex.: "14:30:00"
- `duration` (integer): Duração em minutos
- `service` (string)
- `status` (string): valores: pending, confirmed, cancelled, completed
- `notes` (string)
- `location` (string)
- `meetLink` (string)
- `recurrence` (string): valores: none, daily, weekly, monthly
- `professionalId` (integer)
- `userId` (integer)
- `contactId` (integer)
- `branchId` (integer)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X GET "https://api.lemify.com.br/v1/agenda/<agendaId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### PUT /v1/agenda/{agendaId}

**Atualiza um agendamento**

Atualiza campos de um agendamento. Use `updateRecurrence` para aplicar à série.
Escopo exigido: `agenda:write`.

Parâmetros:
- `agendaId` (path, integer, obrigatório)

Corpo (application/json):
- `customerName` (string, obrigatório): ex.: "Maria Silva"
- `customerPhone` (string): ex.: "5511999999999"
- `customerEmail` (string)
- `date` (string (date), obrigatório): ex.: "2026-10-20"
- `time` (string, obrigatório): ex.: "14:00"
- `endTime` (string): ex.: "14:30"
- `duration` (integer): Minutos (alternativa a endTime)
- `title` (string)
- `service` (string)
- `notes` (string)
- `location` (string)
- `professionalId` (integer)
- `userId` (integer)
- `contactId` (integer)
- `branchId` (integer): Filial. Sem ele, usa a filial padrão da empresa.
- `recurrence` (string): valores: none, daily, weekly, monthly; padrão: "none"
- `meetLink` (string)
- `addGoogleMeet` (boolean)
- `force` (boolean): Ignora o aviso de conflito de horário
- `status` (string): valores: pending, confirmed, cancelled, completed
- `updateRecurrence` (boolean)

Respostas:
- 200: Agendamento atualizado
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
- 404: Agendamento não encontrado

Resposta 200 (objeto com):
- `id` (integer): ex.: 123
- `title` (string)
- `customerName` (string): ex.: "Maria Silva"
- `customerPhone` (string): ex.: "5511999999999"
- `customerEmail` (string)
- `date` (string (date)): ex.: "2026-10-20"
- `time` (string): ex.: "14:00:00"
- `endTime` (string): ex.: "14:30:00"
- `duration` (integer): Duração em minutos
- `service` (string)
- `status` (string): valores: pending, confirmed, cancelled, completed
- `notes` (string)
- `location` (string)
- `meetLink` (string)
- `recurrence` (string): valores: none, daily, weekly, monthly
- `professionalId` (integer)
- `userId` (integer)
- `contactId` (integer)
- `branchId` (integer)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X PUT "https://api.lemify.com.br/v1/agenda/<agendaId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Maria Silva","date":"2026-10-20","time":"14:00"}'
```

### DELETE /v1/agenda/{agendaId}

**Exclui um agendamento**

Com `cancelRecurrence` informado, cancela também a série. Escopo exigido: `agenda:write`.

Parâmetros:
- `agendaId` (path, integer, obrigatório)
- `cancelRecurrence` (query, string)

Respostas:
- 204: Excluído
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
- 404: Agendamento não encontrado

```bash
curl -X DELETE "https://api.lemify.com.br/v1/agenda/<agendaId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### POST /v1/agenda/check-conflict

**Verifica conflito de horário**

Informa se o intervalo conflita com outro agendamento do profissional/usuário. Escopo exigido: `agenda:read`.

Corpo (application/json):
- `date` (string (date), obrigatório)
- `startTime` (string, obrigatório): ex.: "14:00"
- `endTime` (string, obrigatório): ex.: "14:30"
- `professionalId` (integer)
- `userId` (integer)
- `excludeAgendaId` (integer)

Respostas:
- 200: Resultado da verificação
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

```bash
curl -X POST "https://api.lemify.com.br/v1/agenda/check-conflict" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-12-01","startTime":"14:00","endTime":"14:30"}'
```

