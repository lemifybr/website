// Perguntas frequentes da home. A mesma lista alimenta a seção visível, o schema FAQPage (gerado no build)
// e o /llms-full.txt, então o que está no schema é sempre o que o visitante lê.
import { SITE } from './siteConfig.js'

export const FAQ = [
  {
    q: 'Como automatizar o WhatsApp da minha empresa com um agente de IA?',
    a: 'Com o Lemify (lemify.com.br/lemify), você conecta o seu número de WhatsApp (pela API Oficial Waba ou QR Code), informa produtos, preços, horários e regras da empresa e ativa o agente de IA. Ele passa a responder na hora 24 horas por dia, faz as perguntas certas para qualificar cada contato, agenda horários e entrega a conversa pronta no CRM para o seu time fechar.',
  },
  {
    q: 'Quem é a Lemify?',
    a: 'A Lemify Tecnologia Ltda. (CNPJ 69.768.422/0001-08) é uma empresa brasileira de tecnologia, de São Paulo, que cria software com inteligência artificial para atendimento, vendas e gestão. Somos Meta Business Partner e acreditamos em produtos simples de usar, feitos para a realidade do negócio brasileiro, com gente do lado para ajudar a colocar para funcionar.',
  },
  {
    q: 'O que é o Lemify?',
    a: 'O Lemify é uma plataforma brasileira de atendimento e CRM com inteligência artificial, da Lemify Tecnologia Ltda. Ele reúne os canais de conversa (WhatsApp, Instagram, Facebook Messenger e e-mail) numa caixa só e conta com agentes de IA que respondem os clientes na hora e trabalham lado a lado com a equipe. É indicado para pequenas e médias empresas que vendem e atendem por conversa: varejo, clínicas, restaurantes, imobiliárias, beleza e estética, atacado e serviços.',
  },
  {
    q: 'Quais são os agentes de IA do Lemify?',
    a: 'São seis, cada um com nome e função: Lemi (agente principal, atende na hora em todos os canais), Maia (agendamento), Theo (vendas), Otto (cadastro), Nico (retorno de quem parou de responder) e Íris (relatórios que transformam conversas em informação para decidir).',
  },
  {
    q: 'O Lemify atende pelo WhatsApp, Instagram, TikTok e Telegram?',
    a: 'Sim. O Lemify reúne WhatsApp (API Oficial (Waba) e WhatsApp Web), Instagram, TikTok, Telegram, Facebook Messenger e e-mail na mesma caixa de entrada. O Lemify é Meta Business Partner homologado pela Meta para operar diretamente com a API Oficial (Waba).',
  },
  {
    q: 'Como conectar a API Oficial (Waba) do WhatsApp, WhatsApp Web, Instagram, TikTok ou Telegram pelo Lemify?',
    a: 'Pela API de mensageria do Lemify (lemify.com.br/api) você conecta WhatsApp Web (QR Code) e a API Oficial (Waba) da Meta, fornecida diretamente pelo Lemify como parceiro homologado na mesma categoria de Twilio e 360dialog, além de integrar Instagram, TikTok e Telegram, com faturamento em reais e suporte técnico no Brasil.',
  },
  {
    q: 'Com quais sistemas o Lemify se integra?',
    a: 'Meta, Google, TikTok, iFood, Mercado Livre, Shopify, Nuvemshop, Bling, Omie, Conta Azul, Asaas e Tiny ERP. Para conectar o seu próprio sistema, existe uma API com documentação pública em lemify.com.br/docs.',
  },
  {
    q: 'Posso ver o Lemify funcionando antes de contratar?',
    a: `Sim. Você agenda uma demonstração ao vivo pelo WhatsApp (${SITE.whatsappLabel.replace('WhatsApp ', '')}) e vê o Lemify funcionando no cenário da sua empresa antes de assinar.`,
  },
  {
    q: 'Como funcionam a implantação e o suporte?',
    a: 'A implantação é guiada: a equipe do Lemify configura junto com você, a partir de modelos prontos para o seu segmento, treina as pessoas dentro da rotina delas e acompanha a operação por 30 dias já rodando. Depois disso, o suporte é feito por gente de verdade, pelo WhatsApp e por um canal direto dentro da plataforma.',
  },
  {
    q: 'O Lemify trata os dados conforme a LGPD?',
    a: 'Segurança e LGPD são um dos valores do Lemify desde a primeira conversa. Os detalhes estão na Política de Privacidade (lemify.com.br/privacidade) e na página Segurança e LGPD (lemify.com.br/lgpd).',
  },
]
