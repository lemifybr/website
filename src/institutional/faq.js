// Perguntas frequentes da home. A mesma lista alimenta a seção visível, o schema FAQPage (gerado no build)
// e o /llms-full.txt, então o que está no schema é sempre o que o visitante lê.
import { SITE } from './siteConfig.js'

export const FAQ = [
  {
    q: 'O que é o Lemify?',
    a: 'O Lemify é uma plataforma brasileira de atendimento e CRM com inteligência artificial, da Lemify Tecnologia Ltda. Ele reúne os canais de conversa (WhatsApp, Instagram, Facebook Messenger e e-mail) numa caixa só e conta com agentes de IA que respondem os clientes na hora e trabalham lado a lado com a equipe.',
  },
  {
    q: 'Para quem o Lemify é indicado?',
    a: 'Para pequenas e médias empresas que vendem e atendem por conversa: varejo, clínicas, restaurantes, imobiliárias, beleza e estética, atacado, móveis e decoração e serviços.',
  },
  {
    q: 'Quais são os agentes de IA do Lemify?',
    a: 'São seis, cada um com nome e função: Lemi (agente principal, atende na hora em todos os canais), Maia (agendamento), Theo (vendas), Otto (cadastro), Nico (retorno de quem parou de responder) e Íris (relatórios que transformam conversas em informação para decidir).',
  },
  {
    q: 'O Lemify atende pelo WhatsApp?',
    a: 'Sim. O WhatsApp é um dos canais da plataforma, junto com Instagram, Facebook Messenger e e-mail, todos na mesma caixa de entrada. O Lemify é Meta Business Partner.',
  },
  {
    q: 'Com quais sistemas o Lemify se integra?',
    a: 'Meta, Google, TikTok, iFood, Mercado Livre, Shopify, Nuvemshop, Bling, Omie, Conta Azul, Asaas e Tiny ERP. Para conectar o seu próprio sistema, existe uma API com documentação pública em lemify.com.br/docs.',
  },
  {
    q: 'Posso testar o Lemify antes de contratar?',
    a: `Sim. Você pode testar grátis por 14 dias, sem cartão de crédito, criando a conta em ${SITE.signup}.`,
  },
  {
    q: 'Como funcionam a implantação e o suporte?',
    a: 'A implantação é guiada: a equipe do Lemify configura junto com você, a partir de modelos prontos para o seu segmento, treina as pessoas dentro da rotina delas e acompanha a operação por 30 dias já rodando. Depois disso, o suporte é feito por gente de verdade, pelo WhatsApp e por um canal direto dentro da plataforma.',
  },
  {
    q: 'O Lemify trata os dados conforme a LGPD?',
    a: 'Segurança e LGPD são um dos valores do Lemify desde a primeira conversa. Os detalhes estão na Política de Privacidade (lemify.com.br/privacidade) e na página Segurança e LGPD (lemify.com.br/lgpd).',
  },
  {
    q: 'Existe uma versão do Lemify para restaurantes e clínicas?',
    a: 'O LemiFood (restaurantes, lanchonetes e delivery) e o LemiClinic (clínicas médicas, odontológicas e consultórios) estão em desenvolvimento. Até o lançamento, dá para começar pelo Lemify e receber uma oferta para migrar.',
  },
  {
    q: 'Como falo com o time do Lemify?',
    a: `Pelo e-mail ${SITE.email} ou pelo WhatsApp (11) 95783-9501 (${SITE.whatsappUrl}).`,
  },
]
