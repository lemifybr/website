# Lemify API — CRM (negociações)

> Negociações (deals), pipelines, etapas e motivos de ganho/perda; criação idempotente por externalId e sincronização por updatedSince.

Base URL: https://api.lemify.com.br

## Autenticação

Chave de API da empresa em `Authorization: Bearer lmf_...` (ou `X-API-Key`), escopos `crm:read` / `crm:write`. Gere em Configurações > Chaves de API.

Erros vêm como JSON `{ "error": "mensagem" }`. 401 = credencial ausente/inválida, 403 = sem permissão/escopo ou plano sem acesso à API, 429 = limite de requisições (respeite `Retry-After`).

## Endpoints

### GET /v1/pipelines

**Lista pipelines e etapas**

Use para descobrir os ids de pipeline e etapa (`stageId`). Etapas ocultas não aparecem. Escopo exigido: `crm:read`.

Respostas:
- 200: Pipelines com suas etapas
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (lista de objetos com):
- `id` (integer)
- `name` (string)
- `position` (integer)
- `isDefault` (boolean)
- `stages` (object[])
  - `id` (integer)
  - `name` (string)
  - `position` (integer)
  - `closureType` (string): valores: won, lost

```bash
curl -X GET "https://api.lemify.com.br/v1/pipelines" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### GET /v1/deal-reasons

**Lista motivos de ganho/perda**

Ids para `dealReasonId`. Escopo exigido: `crm:read`.

Respostas:
- 200: Motivos
- 401: Token de autenticação ausente ou inválido

Resposta 200 (lista de objetos com):
- `id` (integer)
- `name` (string)
- `type` (string): valores: won, lost

```bash
curl -X GET "https://api.lemify.com.br/v1/deal-reasons" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### GET /v1/deals

**Lista negociações**

Lista paginada (até 100 por página). Para sincronizar, envie `updatedSince` com o maior
`updatedAt` já recebido: a ordem passa a ser por `updatedAt` crescente. Sem `status`, a
lixeira fica de fora. Escopo exigido: `crm:read`.

Parâmetros:
- `updatedSince` (query, string (date-time))
- `status` (query, string): valores: open, won, lost
- `pipelineId` (query, integer)
- `stageId` (query, integer)
- `contactId` (query, integer)
- `source` (query, string): Plataforma de origem (whatsapp, instagram, manual, lead_form, api...)
- `externalSource` (query, string)
- `externalId` (query, string)
- `pageNumber` (query, integer): padrão: 1
- `limit` (query, integer): padrão: 50; máx.: 100

Respostas:
- 200: Negociações
- 400: Parâmetro inválido
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `deals` (object[])
  - `id` (integer)
  - `name` (string)
  - `amount` (number)
  - `status` (string): valores: open, won, lost, trashed
  - `description` (string)
  - `items` (object[])
  - `lostReason` (string)
  - `nextStep` (string)
  - `leadSource` (string): Origem de marketing em texto livre
  - `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...
  - `externalSource` (string)
  - `externalId` (string)
  - `score` (integer)
  - `scoreLabel` (string)
  - `closingDate` (string (date-time))
  - `deliveryDate` (string (date-time))
  - `wonAt` (string (date-time))
  - `lostAt` (string (date-time))
  - `contact` (object)
  - `user` (object)
  - `pipeline` (object)
  - `stage` (object)
  - `dealReason` (object)
  - `createdAt` (string (date-time))
  - `updatedAt` (string (date-time))
- `count` (integer)
- `hasMore` (boolean)

```bash
curl -X GET "https://api.lemify.com.br/v1/deals" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### POST /v1/deals

**Cria uma negociação**

Cria o deal na etapa informada; automações da etapa e eventos de conversão do Meta disparam
como no painel. Com `externalId`, a chamada é idempotente: se já existir um deal com o mesmo
`externalSource` + `externalId`, ele é devolvido com status 200. Escopo exigido: `crm:write`.

Corpo (application/json):
- `name` (string): até 255 caracteres
- `stageId` (integer)
- `pipelineId` (integer): Opcional; se vier, precisa ser o pipeline da etapa
- `amount` (number): Ignorado quando o deal tem items: o valor passa a ser a soma de price × quantity
- `status` (string): valores: open, won, lost
- `contactId` (integer)
- `userId` (integer): Responsável (usuário da empresa)
- `dealReasonId` (integer)
- `description` (string): até 10000 caracteres
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service
  - `id` (integer): Produto/serviço cadastrado na empresa
  - `name` (string, obrigatório)
  - `price` (number): padrão: 0
  - `quantity` (number): padrão: 1
- `lostReason` (string)
- `closingDate` (string (date))
- `deliveryDate` (string (date))
- `nextStep` (string)
- `leadSource` (string)
- `externalSource` (string): Sistema de origem (padrão "api"); até 64 caracteres
- `externalId` (string): Id no sistema de origem; torna o POST idempotente; até 128 caracteres

Respostas:
- 200: Já existia (mesmo externalSource + externalId)
- 201: Criado
- 400: Dados inválidos, id de outra empresa ou etapa oculta
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `id` (integer)
- `name` (string)
- `amount` (number)
- `status` (string): valores: open, won, lost, trashed
- `description` (string)
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service
  - `id` (integer): Produto/serviço cadastrado na empresa
  - `name` (string, obrigatório)
  - `price` (number): padrão: 0
  - `quantity` (number): padrão: 1
- `lostReason` (string)
- `nextStep` (string)
- `leadSource` (string): Origem de marketing em texto livre
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...
- `externalSource` (string)
- `externalId` (string)
- `score` (integer)
- `scoreLabel` (string)
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer)
  - `name` (string)
  - `number` (string)
  - `email` (string)
- `user` (object)
  - `id` (integer)
  - `name` (string)
- `pipeline` (object)
  - `id` (integer)
  - `name` (string)
- `stage` (object)
  - `id` (integer)
  - `name` (string)
  - `closureType` (string)
- `dealReason` (object)
  - `id` (integer)
  - `name` (string)
  - `type` (string)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X POST "https://api.lemify.com.br/v1/deals" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### GET /v1/deals/{dealId}

**Consulta uma negociação**

Escopo exigido: `crm:read`.

Parâmetros:
- `dealId` (path, integer, obrigatório)

Respostas:
- 200: Negociação
- 401: Token de autenticação ausente ou inválido
- 404: Não encontrada

Resposta 200 (objeto com):
- `id` (integer)
- `name` (string)
- `amount` (number)
- `status` (string): valores: open, won, lost, trashed
- `description` (string)
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service
  - `id` (integer): Produto/serviço cadastrado na empresa
  - `name` (string, obrigatório)
  - `price` (number): padrão: 0
  - `quantity` (number): padrão: 1
- `lostReason` (string)
- `nextStep` (string)
- `leadSource` (string): Origem de marketing em texto livre
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...
- `externalSource` (string)
- `externalId` (string)
- `score` (integer)
- `scoreLabel` (string)
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer)
  - `name` (string)
  - `number` (string)
  - `email` (string)
- `user` (object)
  - `id` (integer)
  - `name` (string)
- `pipeline` (object)
  - `id` (integer)
  - `name` (string)
- `stage` (object)
  - `id` (integer)
  - `name` (string)
  - `closureType` (string)
- `dealReason` (object)
  - `id` (integer)
  - `name` (string)
  - `type` (string)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X GET "https://api.lemify.com.br/v1/deals/<dealId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### PUT /v1/deals/{dealId}

**Atualiza uma negociação**

Envie só os campos a alterar. Escopo exigido: `crm:write`.

Parâmetros:
- `dealId` (path, integer, obrigatório)

Corpo (application/json):
- `name` (string): até 255 caracteres
- `stageId` (integer)
- `pipelineId` (integer): Opcional; se vier, precisa ser o pipeline da etapa
- `amount` (number): Ignorado quando o deal tem items: o valor passa a ser a soma de price × quantity
- `status` (string): valores: open, won, lost
- `contactId` (integer)
- `userId` (integer): Responsável (usuário da empresa)
- `dealReasonId` (integer)
- `description` (string): até 10000 caracteres
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service
  - `id` (integer): Produto/serviço cadastrado na empresa
  - `name` (string, obrigatório)
  - `price` (number): padrão: 0
  - `quantity` (number): padrão: 1
- `lostReason` (string)
- `closingDate` (string (date))
- `deliveryDate` (string (date))
- `nextStep` (string)
- `leadSource` (string)
- `externalSource` (string): Sistema de origem (padrão "api"); até 64 caracteres
- `externalId` (string): Id no sistema de origem; torna o POST idempotente; até 128 caracteres

Respostas:
- 200: Atualizada
- 400: Dados inválidos
- 404: Não encontrada
- 409: externalSource/externalId já usado por outro deal

Resposta 200 (objeto com):
- `id` (integer)
- `name` (string)
- `amount` (number)
- `status` (string): valores: open, won, lost, trashed
- `description` (string)
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service
  - `id` (integer): Produto/serviço cadastrado na empresa
  - `name` (string, obrigatório)
  - `price` (number): padrão: 0
  - `quantity` (number): padrão: 1
- `lostReason` (string)
- `nextStep` (string)
- `leadSource` (string): Origem de marketing em texto livre
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...
- `externalSource` (string)
- `externalId` (string)
- `score` (integer)
- `scoreLabel` (string)
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer)
  - `name` (string)
  - `number` (string)
  - `email` (string)
- `user` (object)
  - `id` (integer)
  - `name` (string)
- `pipeline` (object)
  - `id` (integer)
  - `name` (string)
- `stage` (object)
  - `id` (integer)
  - `name` (string)
  - `closureType` (string)
- `dealReason` (object)
  - `id` (integer)
  - `name` (string)
  - `type` (string)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X PUT "https://api.lemify.com.br/v1/deals/<dealId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### DELETE /v1/deals/{dealId}

**Envia uma negociação para a lixeira**

Mesmo comportamento do painel (status trashed). Escopo exigido: `crm:write`.

Parâmetros:
- `dealId` (path, integer, obrigatório)

Respostas:
- 204: Enviada para a lixeira
- 404: Não encontrada

```bash
curl -X DELETE "https://api.lemify.com.br/v1/deals/<dealId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### PATCH /v1/deals/{dealId}/stage

**Move a negociação de etapa**

Move para a etapa (e o pipeline dela). Etapas de fechamento marcam o deal como ganho/perdido;
automações da etapa disparam. Escopo exigido: `crm:write`.

Parâmetros:
- `dealId` (path, integer, obrigatório)

Corpo (application/json):
- `stageId` (integer, obrigatório)

Respostas:
- 200: Movida
- 400: Etapa oculta ou inválida
- 404: Negociação ou etapa não encontrada

Resposta 200 (objeto com):
- `id` (integer)
- `name` (string)
- `amount` (number)
- `status` (string): valores: open, won, lost, trashed
- `description` (string)
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service
  - `id` (integer): Produto/serviço cadastrado na empresa
  - `name` (string, obrigatório)
  - `price` (number): padrão: 0
  - `quantity` (number): padrão: 1
- `lostReason` (string)
- `nextStep` (string)
- `leadSource` (string): Origem de marketing em texto livre
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...
- `externalSource` (string)
- `externalId` (string)
- `score` (integer)
- `scoreLabel` (string)
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer)
  - `name` (string)
  - `number` (string)
  - `email` (string)
- `user` (object)
  - `id` (integer)
  - `name` (string)
- `pipeline` (object)
  - `id` (integer)
  - `name` (string)
- `stage` (object)
  - `id` (integer)
  - `name` (string)
  - `closureType` (string)
- `dealReason` (object)
  - `id` (integer)
  - `name` (string)
  - `type` (string)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X PATCH "https://api.lemify.com.br/v1/deals/<dealId>/stage" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"stageId":1}'
```

