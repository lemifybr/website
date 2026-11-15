# Lemify API — Mensagens (WhatsApp)

> Envio de mensagens de texto e mídia pelo WhatsApp para qualquer número.

Base URL: https://api.lemify.com.br

## Autenticação

Token do canal WhatsApp em `Authorization: Bearer <TOKEN_DO_CANAL>` (Canais > WhatsApp > Token da API).

Erros vêm como JSON `{ "error": "mensagem" }`. 401 = credencial ausente/inválida, 403 = sem permissão/escopo ou plano sem acesso à API, 429 = limite de requisições (respeite `Retry-After`).

## Endpoints

### POST /v1/messages/send

**Envia mensagem via API externa**

Endpoint para integração externa. Permite enviar mensagens de texto ou mídia
para qualquer número de WhatsApp sem necessidade de um ticket existente.

**Autenticação:** Clique em "Authorize" e insira o token do canal WhatsApp.
O token pode ser obtido na seção "Canais > WhatsApp > Token da API" do sistema Lemify.

**Importante:** O número deve ter WhatsApp ativo e a conexão deve estar CONNECTED.

Corpo (application/json):
- `number` (string, obrigatório): Número do WhatsApp com DDD (apenas números); ex.: "5511999999999"
- `body` (string): Texto da mensagem; ex.: "Olá! Esta é uma mensagem de teste via API."
- `createTicket` (boolean): Se true, cria um ticket e salva a mensagem no histórico do chat. Se false (padrão), apenas envia a notificação sem criar ticket.; padrão: false

Também aceita multipart/form-data:
- `number` (string, obrigatório): Número do WhatsApp com DDD (apenas números, sem formatação); ex.: "5511999999999"
- `body` (string): Texto da mensagem; ex.: "Olá! Esta é uma mensagem de teste via API."
- `medias` (string (binary)[]): Arquivos de mídia para envio (imagens, vídeos, documentos, áudios)
- `createTicket` (boolean): Se true, cria um ticket e salva a mensagem no histórico do chat. Se false (padrão), apenas envia a notificação sem criar ticket.; padrão: false

Respostas:
- 200: Mensagem enviada com sucesso
- 400: Erro de validação ou envio
- 401: Token de autenticação ausente ou inválido
- 404: Conexão WhatsApp não encontrada
- 429: Limite de envio excedido (rate limit)
- 500: Erro interno no envio

Resposta 200 (objeto com):
- `mensagem` (string): ex.: "Mensagem enviada com sucesso"

```bash
curl -X POST "https://api.lemify.com.br/v1/messages/send" \
  -H "Authorization: Bearer $LEMIFY_CHANNEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"number":"5511999999999"}'
```

