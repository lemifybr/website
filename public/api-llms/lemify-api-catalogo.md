# Lemify API — Catálogo (produtos)

> Produtos com variações (grade), ficha técnica, categorias, fotos por URL e estoque por filial; upsert idempotente por externalId e estoque em lote por SKU.

Base URL: https://api.lemify.com.br

## Autenticação

Chave de API da empresa em `Authorization: Bearer lmf_...` (ou `X-API-Key`), escopos `catalog:read` / `catalog:write`. Gere em Configurações > Chaves de API.

Erros vêm como JSON `{ "error": "mensagem" }`. 401 = credencial ausente/inválida, 403 = sem permissão/escopo ou plano sem acesso à API, 429 = limite de requisições (respeite `Retry-After`).

## Endpoints

### GET /v1/products

**Lista produtos com variações, estoque e fotos**

Lista paginada (até 100 por página). Para sincronizar, envie `updatedSince` com o maior `updatedAt`
já recebido: a ordem passa a ser por `updatedAt` crescente. Escopo exigido: `catalog:read`.

Parâmetros:
- `updatedSince` (query, string (date-time))
- `externalId` (query, string): Id do produto no seu sistema
- `sku` (query, string): SKU de qualquer variação
- `categoryId` (query, integer)
- `status` (query, string): valores: active, inactive
- `pageNumber` (query, integer): padrão: 1
- `limit` (query, integer): padrão: 50; máx.: 100

Respostas:
- 200: Produtos
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `products` (object[])
  - `id` (integer)
  - `externalId` (string)
  - `name` (string)
  - `description` (string)
  - `brand` (string)
  - `unit` (string)
  - `status` (string): valores: active, inactive
  - `ncm` (string)
  - `category` (string): ex.: "Roupas > Camisetas"
  - `categoryId` (integer)
  - `specs` (object[])
  - `variants` (object[])
  - `images` (object[])
  - `createdAt` (string (date-time))
  - `updatedAt` (string (date-time))
- `count` (integer)
- `hasMore` (boolean)

```bash
curl -X GET "https://api.lemify.com.br/v1/products" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### GET /v1/products/{productId}

**Consulta um produto**

Escopo exigido: `catalog:read`.

Parâmetros:
- `productId` (path, integer, obrigatório)

Respostas:
- 200: Produto
- 401: Token de autenticação ausente ou inválido
- 404: Produto não encontrado

Resposta 200 (objeto com):
- `id` (integer)
- `externalId` (string)
- `name` (string)
- `description` (string)
- `brand` (string)
- `unit` (string)
- `status` (string): valores: active, inactive
- `ncm` (string)
- `category` (string): ex.: "Roupas > Camisetas"
- `categoryId` (integer)
- `specs` (object[])
  - `name` (string)
  - `value` (string)
- `variants` (object[])
  - `id` (integer)
  - `externalId` (string)
  - `sku` (string)
  - `gtin` (string)
  - `price` (number)
  - `promoPrice` (number)
  - `weight` (number)
  - `height` (number)
  - `width` (number)
  - `length` (number)
  - `status` (string): valores: active, inactive
  - `options` (object): ex.: {"Cor":"Azul","Tamanho":"M"}
  - `image` (string)
  - `stock` (object[])
  - `stockTotal` (number)
- `images` (object[])
  - `url` (string)
  - `alt` (string)
  - `variantId` (integer)
  - `position` (integer)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X GET "https://api.lemify.com.br/v1/products/<productId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### PUT /v1/products/external/{externalId}

**Cria ou atualiza um produto completo**

Upsert idempotente pelo id do produto no seu sistema (`externalId`): reenviar o mesmo corpo não
duplica nada. Envie o produto inteiro — ficha técnica, variações e fotos ficam exatamente como enviadas.

- Categorias, características e opções são criadas pelo nome se não existirem (`category: "Roupas > Camisetas"`).
- Produto simples: uma variação sem `options`. Com grade: uma variação por combinação, ex.: `{ "Cor": "Azul", "Tamanho": "M" }`.
- Variações são reconhecidas por `externalId`, depois `sku`, depois pela combinação de opções.
- `stock` define o saldo por filial (`branchId`, veja /v1/branches; sem ele, estoque geral). Omitido, não mexe no estoque.
- Fotos por URL https: o Lemify baixa e guarda (JPG, PNG, WebP ou GIF, até 10 MB). A mesma URL não é baixada de novo.

Escopo exigido: `catalog:write`.

Parâmetros:
- `externalId` (path, string, obrigatório): até 128 caracteres

Corpo (application/json):
- `name` (string, obrigatório): até 255 caracteres
- `description` (string): até 20000 caracteres
- `brand` (string): até 120 caracteres
- `unit` (string): Unidade de venda (UN, KG, CX...); até 20 caracteres
- `status` (string): valores: active, inactive
- `ncm` (string): NCM com 8 dígitos
- `link` (string (uri))
- `isQuote` (boolean): Vendido sob orçamento
- `category` (string): Caminho da categoria, criado se não existir; ex.: "Roupas > Camisetas"
- `specs` (object[]): Ficha técnica (características que não variam)
  - `name` (string, obrigatório): ex.: "Material"
  - `value` (string, obrigatório): ex.: "Algodão"
- `variants` (object[], obrigatório)
  - `externalId` (string): Id da variação no seu sistema (opcional); até 128 caracteres; ex.: "CAM-001-AZ-M"
  - `sku` (string): até 120 caracteres; ex.: "CAM-001-AZ-M"
  - `gtin` (string): Código de barras GTIN/EAN (8, 12, 13 ou 14 dígitos); ex.: "7891234567895"
  - `price` (number): ex.: 79.9
  - `promoPrice` (number): ex.: 69.9
  - `weight` (number): kg; ex.: 0.25
  - `height` (number): cm; ex.: 3
  - `width` (number): cm; ex.: 25
  - `length` (number): cm; ex.: 30
  - `status` (string): valores: active, inactive; ex.: "active"
  - `options` (object): Característica → opção. Vazio em produto simples; ex.: {"Cor":"Azul","Tamanho":"M"}
  - `stock` (object[]): Saldo por filial. Omitido = não altera o estoque
  - `images` (string (uri)[]): Fotos desta variação (URLs https)
- `images` (object[])
  - `url` (string (uri), obrigatório)
  - `alt` (string)

Respostas:
- 200: Produto atualizado
- 201: Produto criado
- 400: Dados inválidos, combinação repetida, foto inacessível ou filial inválida
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `id` (integer)
- `externalId` (string)
- `name` (string)
- `description` (string)
- `brand` (string)
- `unit` (string)
- `status` (string): valores: active, inactive
- `ncm` (string)
- `category` (string): ex.: "Roupas > Camisetas"
- `categoryId` (integer)
- `specs` (object[])
  - `name` (string)
  - `value` (string)
- `variants` (object[])
  - `id` (integer)
  - `externalId` (string)
  - `sku` (string)
  - `gtin` (string)
  - `price` (number)
  - `promoPrice` (number)
  - `weight` (number)
  - `height` (number)
  - `width` (number)
  - `length` (number)
  - `status` (string): valores: active, inactive
  - `options` (object): ex.: {"Cor":"Azul","Tamanho":"M"}
  - `image` (string)
  - `stock` (object[])
  - `stockTotal` (number)
- `images` (object[])
  - `url` (string)
  - `alt` (string)
  - `variantId` (integer)
  - `position` (integer)
- `createdAt` (string (date-time))
- `updatedAt` (string (date-time))

```bash
curl -X PUT "https://api.lemify.com.br/v1/products/external/<externalId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"...","variants":"..."}'
```

### DELETE /v1/products/external/{externalId}

**Desativa um produto**

O produto e as variações ficam inativos (não são apagados, porque negócios e orçamentos podem apontar para eles). Reative com um PUT com status active. Escopo exigido: `catalog:write`.

Parâmetros:
- `externalId` (path, string, obrigatório)

Respostas:
- 204: Desativado
- 404: Produto não encontrado

```bash
curl -X DELETE "https://api.lemify.com.br/v1/products/external/<externalId>" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### PUT /v1/stock

**Atualiza estoque em lote pelo SKU**

Define o saldo (valor absoluto) de cada variação pelo SKU, por filial. Até 500 itens por chamada.
Cada item é independente: veja `results[].status` (ok, not_found, ambiguous — SKU em mais de uma
variação —, invalid_branch). Escopo exigido: `catalog:write`.

Corpo (application/json):
- `items` (object[], obrigatório)
  - `sku` (string, obrigatório): ex.: "CAM-001-AZ-M"
  - `branchId` (integer): Filial (veja /v1/branches). Sem ela, estoque geral
  - `quantity` (number, obrigatório): ex.: 12

Respostas:
- 200: Resultado por item
- 400: Corpo inválido
- 401: Token de autenticação ausente ou inválido
- 403: Acesso negado - permissões insuficientes

Resposta 200 (objeto com):
- `updated` (integer)
- `results` (object[])
  - `sku` (string)
  - `branchId` (integer)
  - `status` (string): valores: ok, not_found, ambiguous, invalid_branch

```bash
curl -X PUT "https://api.lemify.com.br/v1/stock" \
  -H "Authorization: Bearer $LEMIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"items":"..."}'
```

### GET /v1/product-categories

**Lista categorias de produto**

Árvore achatada, com o caminho completo de cada categoria. Escopo exigido: `catalog:read`.

Respostas:
- 200: Categorias

Resposta 200 (lista de objetos com):
- `id` (integer)
- `name` (string): ex.: "Camisetas"
- `parentId` (integer)
- `path` (string): ex.: "Roupas > Camisetas"

```bash
curl -X GET "https://api.lemify.com.br/v1/product-categories" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### GET /v1/product-attributes

**Lista características e opções**

`isVariation` indica se a característica gera variações (grade) ou é só ficha técnica. Escopo exigido: `catalog:read`.

Respostas:
- 200: Características

Resposta 200 (lista de objetos com):
- `id` (integer)
- `name` (string): ex.: "Cor"
- `type` (string): valores: select, text, number
- `isVariation` (boolean)
- `options` (object[])
  - `id` (integer)
  - `value` (string): ex.: "Azul"

```bash
curl -X GET "https://api.lemify.com.br/v1/product-attributes" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

### GET /v1/branches

**Lista filiais**

Ids para o estoque por filial. Escopo exigido: `catalog:read`.

Respostas:
- 200: Filiais

Resposta 200 (lista de objetos com):
- `id` (integer)
- `name` (string)

```bash
curl -X GET "https://api.lemify.com.br/v1/branches" \
  -H "Authorization: Bearer $LEMIFY_API_KEY"
```

