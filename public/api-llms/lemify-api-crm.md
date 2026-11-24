# Lemify API — CRM (negociações)

> Negociações (deals), pipelines, etapas e motivos de ganho/perda; criação idempotente por externalId e sincronização por updatedSince.

Base URL: https://api.lemify.com.br

## Autenticação

Chave de API da empresa em `Authorization: Bearer lmf_...` (ou `X-API-Key`), escopos `crm:read` / `crm:write`. Gere em Configurações > Chaves de API.

Erros vêm como JSON `{ "error": "mensagem" }`. 401 = credencial ausente/inválida, 403 = sem permissão/escopo ou plano sem acesso à API, 429 = limite de requisições (respeite `Retry-After`).

## Endpoints

### GET /v1/pipelines

**Lista pipelines e etapas**

Use para descobrir os ids de pipeline e etapa (`stageId`) e a instrução (`description`) configurada em cada etapa para o agente de IA. Etapas ocultas não aparecem. Escopo exigido: `crm:read`.

Respostas:
- 200: Pipelines com suas etapas
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (lista de objetos com):
- `id` (integer): ex.: 1
- `name` (string): ex.: "Funil Comercial"
- `position` (integer): ex.: 0
- `isDefault` (boolean): ex.: true
- `stages` (object[])
  - `id` (integer): ex.: 12
  - `name` (string): ex.: "Qualificação"
  - `position` (integer): ex.: 0
  - `closureType` (string): valores: won, lost; ex.: null
  - `description` (string): Instrução da etapa para o agente de IA; ex.: "Avançar quando o cliente informar interesse e orçamento"

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
- 403: Acesso negado - permissões insuficientes

Resposta 200 (lista de objetos com):
- `id` (integer): ex.: 4
- `name` (string): ex.: "Condição comercial"
- `type` (string): valores: won, lost; ex.: "won"

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
  - `id` (integer): ex.: 456
  - `name` (string): ex.: "Pedido 1042"
  - `amount` (number): ex.: 1500
  - `status` (string): valores: open, won, lost, trashed; ex.: "open"
  - `description` (string): ex.: "Cliente interessado no plano anual"
  - `items` (object[])
  - `lostReason` (string)
  - `nextStep` (string): ex.: "Enviar proposta comercial"
  - `leadSource` (string): Origem de marketing em texto livre; ex.: "Google Ads"
  - `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...; ex.: "api"
  - `externalSource` (string): ex.: "erp"
  - `externalId` (string): ex.: "1042"
  - `score` (integer): ex.: 85
  - `scoreLabel` (string): ex.: "hot"
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
- `contact` (object): Dados do contato. O Lemify procura pelo telefone (com e sem o 9º dígito) e depois pelo e-mail, dentro da empresa; se não achar, cria. De um contato existente, só preenche nome e e-mail que estejam vazios.
  - `name` (string): Obrigatório para criar um contato novo; até 255 caracteres; ex.: "Maria Souza"
  - `number` (string): Telefone com DDD; sem DDI, assume Brasil (55). Obrigatório para criar um contato novo; ex.: "5511999999999"
  - `email` (string (email)): ex.: "maria@exemplo.com"
- `name` (string, obrigatório): até 255 caracteres; ex.: "Pedido 1042"
- `stageId` (integer, obrigatório): ex.: 12
- `pipelineId` (integer): Opcional; se vier, precisa ser o pipeline da etapa; ex.: 1
- `amount` (number): Ignorado quando o deal tem items: o valor passa a ser a soma de price × quantity; ex.: 1500
- `status` (string): valores: open, won, lost; ex.: "open"
- `contactId` (integer): Contato já cadastrado. Use isto ou contact; ex.: 345
- `userId` (integer): Responsável (usuário da empresa); ex.: 7
- `dealReasonId` (integer): Motivo de ganho/perda (veja /v1/deal-reasons). Omita em negócios abertos; ex.: 4
- `description` (string): até 10000 caracteres; ex.: "Cliente interessado no plano anual"
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service; ex.: "product"
  - `id` (integer): Produto/serviço cadastrado na empresa; ex.: 10
  - `name` (string, obrigatório): ex.: "Plano Anual"
  - `price` (number): padrão: 0; ex.: 1500
  - `quantity` (number): padrão: 1; ex.: 1
- `lostReason` (string): até 2000 caracteres
- `closingDate` (string (date)): ex.: "2026-12-01"
- `deliveryDate` (string (date))
- `nextStep` (string): até 255 caracteres; ex.: "Enviar proposta comercial"
- `leadSource` (string): até 255 caracteres; ex.: "Google Ads"
- `externalSource` (string): Sistema de origem (padrão "api"); até 64 caracteres; ex.: "erp"
- `externalId` (string): Id no sistema de origem; torna o POST idempotente; até 128 caracteres; ex.: "1042"

Respostas:
- 200: Já existia (mesmo externalSource + externalId)
- 201: Criado
- 400: Dados inválidos, id de outra empresa ou etapa oculta
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `id` (integer): ex.: 456
- `name` (string): ex.: "Pedido 1042"
- `amount` (number): ex.: 1500
- `status` (string): valores: open, won, lost, trashed; ex.: "open"
- `description` (string): ex.: "Cliente interessado no plano anual"
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service; ex.: "product"
  - `id` (integer): Produto/serviço cadastrado na empresa; ex.: 10
  - `name` (string, obrigatório): ex.: "Plano Anual"
  - `price` (number): padrão: 0; ex.: 1500
  - `quantity` (number): padrão: 1; ex.: 1
- `lostReason` (string)
- `nextStep` (string): ex.: "Enviar proposta comercial"
- `leadSource` (string): Origem de marketing em texto livre; ex.: "Google Ads"
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...; ex.: "api"
- `externalSource` (string): ex.: "erp"
- `externalId` (string): ex.: "1042"
- `score` (integer): ex.: 85
- `scoreLabel` (string): ex.: "hot"
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer): ex.: 345
  - `name` (string): ex.: "Maria Silva"
  - `number` (string): ex.: "5511999999999"
  - `email` (string): ex.: "maria@empresa.com.br"
- `user` (object)
  - `id` (integer): ex.: 7
  - `name` (string): ex.: "João Vendedor"
- `pipeline` (object)
  - `id` (integer): ex.: 1
  - `name` (string): ex.: "Funil Comercial"
- `stage` (object)
  - `id` (integer): ex.: 12
  - `name` (string): ex.: "Qualificação"
  - `closureType` (string): ex.: null
- `dealReason` (object)
  - `id` (integer): ex.: 4
  - `name` (string): ex.: "Condição comercial"
  - `type` (string): ex.: "won"
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X POST "https://api.lemify.com.br/v1/deals" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Pedido 1042","stageId":12}'
```

### GET /v1/deals/{dealId}

**Consulta uma negociação**

Escopo exigido: `crm:read`.

Parâmetros:
- `dealId` (path, integer, obrigatório)

Respostas:
- 200: Negociação
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
- 404: Não encontrada

Resposta 200 (objeto com):
- `id` (integer): ex.: 456
- `name` (string): ex.: "Pedido 1042"
- `amount` (number): ex.: 1500
- `status` (string): valores: open, won, lost, trashed; ex.: "open"
- `description` (string): ex.: "Cliente interessado no plano anual"
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service; ex.: "product"
  - `id` (integer): Produto/serviço cadastrado na empresa; ex.: 10
  - `name` (string, obrigatório): ex.: "Plano Anual"
  - `price` (number): padrão: 0; ex.: 1500
  - `quantity` (number): padrão: 1; ex.: 1
- `lostReason` (string)
- `nextStep` (string): ex.: "Enviar proposta comercial"
- `leadSource` (string): Origem de marketing em texto livre; ex.: "Google Ads"
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...; ex.: "api"
- `externalSource` (string): ex.: "erp"
- `externalId` (string): ex.: "1042"
- `score` (integer): ex.: 85
- `scoreLabel` (string): ex.: "hot"
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer): ex.: 345
  - `name` (string): ex.: "Maria Silva"
  - `number` (string): ex.: "5511999999999"
  - `email` (string): ex.: "maria@empresa.com.br"
- `user` (object)
  - `id` (integer): ex.: 7
  - `name` (string): ex.: "João Vendedor"
- `pipeline` (object)
  - `id` (integer): ex.: 1
  - `name` (string): ex.: "Funil Comercial"
- `stage` (object)
  - `id` (integer): ex.: 12
  - `name` (string): ex.: "Qualificação"
  - `closureType` (string): ex.: null
- `dealReason` (object)
  - `id` (integer): ex.: 4
  - `name` (string): ex.: "Condição comercial"
  - `type` (string): ex.: "won"
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
- `contact` (object): Dados do contato. O Lemify procura pelo telefone (com e sem o 9º dígito) e depois pelo e-mail, dentro da empresa; se não achar, cria. De um contato existente, só preenche nome e e-mail que estejam vazios.
  - `name` (string): Obrigatório para criar um contato novo; até 255 caracteres; ex.: "Maria Souza"
  - `number` (string): Telefone com DDD; sem DDI, assume Brasil (55). Obrigatório para criar um contato novo; ex.: "5511999999999"
  - `email` (string (email)): ex.: "maria@exemplo.com"
- `name` (string, obrigatório): até 255 caracteres; ex.: "Pedido 1042"
- `stageId` (integer, obrigatório): ex.: 12
- `pipelineId` (integer): Opcional; se vier, precisa ser o pipeline da etapa; ex.: 1
- `amount` (number): Ignorado quando o deal tem items: o valor passa a ser a soma de price × quantity; ex.: 1500
- `status` (string): valores: open, won, lost; ex.: "open"
- `contactId` (integer): Contato já cadastrado. Use isto ou contact; ex.: 345
- `userId` (integer): Responsável (usuário da empresa); ex.: 7
- `dealReasonId` (integer): Motivo de ganho/perda (veja /v1/deal-reasons). Omita em negócios abertos; ex.: 4
- `description` (string): até 10000 caracteres; ex.: "Cliente interessado no plano anual"
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service; ex.: "product"
  - `id` (integer): Produto/serviço cadastrado na empresa; ex.: 10
  - `name` (string, obrigatório): ex.: "Plano Anual"
  - `price` (number): padrão: 0; ex.: 1500
  - `quantity` (number): padrão: 1; ex.: 1
- `lostReason` (string): até 2000 caracteres
- `closingDate` (string (date)): ex.: "2026-12-01"
- `deliveryDate` (string (date))
- `nextStep` (string): até 255 caracteres; ex.: "Enviar proposta comercial"
- `leadSource` (string): até 255 caracteres; ex.: "Google Ads"
- `externalSource` (string): Sistema de origem (padrão "api"); até 64 caracteres; ex.: "erp"
- `externalId` (string): Id no sistema de origem; torna o POST idempotente; até 128 caracteres; ex.: "1042"

Respostas:
- 200: Atualizada
- 400: Dados inválidos
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
- 404: Não encontrada
- 409: externalSource/externalId já usado por outro deal

Resposta 200 (objeto com):
- `id` (integer): ex.: 456
- `name` (string): ex.: "Pedido 1042"
- `amount` (number): ex.: 1500
- `status` (string): valores: open, won, lost, trashed; ex.: "open"
- `description` (string): ex.: "Cliente interessado no plano anual"
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service; ex.: "product"
  - `id` (integer): Produto/serviço cadastrado na empresa; ex.: 10
  - `name` (string, obrigatório): ex.: "Plano Anual"
  - `price` (number): padrão: 0; ex.: 1500
  - `quantity` (number): padrão: 1; ex.: 1
- `lostReason` (string)
- `nextStep` (string): ex.: "Enviar proposta comercial"
- `leadSource` (string): Origem de marketing em texto livre; ex.: "Google Ads"
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...; ex.: "api"
- `externalSource` (string): ex.: "erp"
- `externalId` (string): ex.: "1042"
- `score` (integer): ex.: 85
- `scoreLabel` (string): ex.: "hot"
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer): ex.: 345
  - `name` (string): ex.: "Maria Silva"
  - `number` (string): ex.: "5511999999999"
  - `email` (string): ex.: "maria@empresa.com.br"
- `user` (object)
  - `id` (integer): ex.: 7
  - `name` (string): ex.: "João Vendedor"
- `pipeline` (object)
  - `id` (integer): ex.: 1
  - `name` (string): ex.: "Funil Comercial"
- `stage` (object)
  - `id` (integer): ex.: 12
  - `name` (string): ex.: "Qualificação"
  - `closureType` (string): ex.: null
- `dealReason` (object)
  - `id` (integer): ex.: 4
  - `name` (string): ex.: "Condição comercial"
  - `type` (string): ex.: "won"
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X PUT "https://api.lemify.com.br/v1/deals/<dealId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Pedido 1042","stageId":12}'
```

### DELETE /v1/deals/{dealId}

**Envia uma negociação para a lixeira**

Mesmo comportamento do painel (status trashed). Escopo exigido: `crm:write`.

Parâmetros:
- `dealId` (path, integer, obrigatório)

Respostas:
- 204: Enviada para a lixeira
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
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
- `stageId` (integer, obrigatório): ex.: 13

Respostas:
- 200: Movida
- 400: Etapa oculta ou inválida
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes
- 404: Negociação ou etapa não encontrada

Resposta 200 (objeto com):
- `id` (integer): ex.: 456
- `name` (string): ex.: "Pedido 1042"
- `amount` (number): ex.: 1500
- `status` (string): valores: open, won, lost, trashed; ex.: "open"
- `description` (string): ex.: "Cliente interessado no plano anual"
- `items` (object[])
  - `type` (string, obrigatório): valores: product, service; ex.: "product"
  - `id` (integer): Produto/serviço cadastrado na empresa; ex.: 10
  - `name` (string, obrigatório): ex.: "Plano Anual"
  - `price` (number): padrão: 0; ex.: 1500
  - `quantity` (number): padrão: 1; ex.: 1
- `lostReason` (string)
- `nextStep` (string): ex.: "Enviar proposta comercial"
- `leadSource` (string): Origem de marketing em texto livre; ex.: "Google Ads"
- `source` (string): Plataforma de origem: whatsapp, instagram, facebook, webchat, manual, lead_form, api...; ex.: "api"
- `externalSource` (string): ex.: "erp"
- `externalId` (string): ex.: "1042"
- `score` (integer): ex.: 85
- `scoreLabel` (string): ex.: "hot"
- `closingDate` (string (date-time))
- `deliveryDate` (string (date-time))
- `wonAt` (string (date-time))
- `lostAt` (string (date-time))
- `contact` (object)
  - `id` (integer): ex.: 345
  - `name` (string): ex.: "Maria Silva"
  - `number` (string): ex.: "5511999999999"
  - `email` (string): ex.: "maria@empresa.com.br"
- `user` (object)
  - `id` (integer): ex.: 7
  - `name` (string): ex.: "João Vendedor"
- `pipeline` (object)
  - `id` (integer): ex.: 1
  - `name` (string): ex.: "Funil Comercial"
- `stage` (object)
  - `id` (integer): ex.: 12
  - `name` (string): ex.: "Qualificação"
  - `closureType` (string): ex.: null
- `dealReason` (object)
  - `id` (integer): ex.: 4
  - `name` (string): ex.: "Condição comercial"
  - `type` (string): ex.: "won"
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X PATCH "https://api.lemify.com.br/v1/deals/<dealId>/stage" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"stageId":13}'
```

### GET /v1/contacts

**Busca contatos por telefone ou e-mail**

Procura na empresa da chave. O telefone casa com e sem o 9º dígito. Escopo exigido: `crm:read`.

Parâmetros:
- `number` (query, string): ex.: "5511999999999"
- `email` (query, string): ex.: "maria@exemplo.com"

Respostas:
- 200: Contatos encontrados (lista vazia se nenhum)
- 400: Informe number ou email
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (lista de objetos com):
- `id` (integer): ex.: 345
- `name` (string): ex.: "Maria Souza"
- `number` (string): ex.: "5511999999999"
- `email` (string): ex.: "maria@exemplo.com"
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X GET "https://api.lemify.com.br/v1/contacts" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### POST /v1/contacts

**Cria ou atualiza um contato**

Para formulários de site e integrações: procura o contato pelo telefone e depois pelo e-mail.
Se existir, devolve com 200 (e só preenche nome/e-mail vazios); se não, cria e devolve 201.
Para criar, name e number são obrigatórios. Escopo exigido: `crm:write`.

Corpo (application/json):
- `name` (string): Obrigatório para criar um contato novo; até 255 caracteres; ex.: "Maria Souza"
- `number` (string): Telefone com DDD; sem DDI, assume Brasil (55). Obrigatório para criar um contato novo; ex.: "5511999999999"
- `email` (string (email)): ex.: "maria@exemplo.com"

Respostas:
- 200: Contato já existia
- 201: Contato criado
- 400: Dados inválidos ou insuficientes para criar o contato
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `id` (integer): ex.: 345
- `name` (string): ex.: "Maria Souza"
- `number` (string): ex.: "5511999999999"
- `email` (string): ex.: "maria@exemplo.com"
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X POST "https://api.lemify.com.br/v1/contacts" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

