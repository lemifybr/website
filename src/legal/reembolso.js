import { COMPANY, IDENTIFICATION, UPDATED } from './common.js'

export default {
  path: '/reembolso',
  h1: 'Política de reembolso e cancelamento',
  title: 'Política de reembolso · Lemify',
  description: 'Regras de cancelamento, arrependimento e reembolso de assinaturas, créditos de IA e serviços do Lemify.',
  updated: UPDATED,
  intro: `Esta Política de Reembolso e Cancelamento explica como funcionam o cancelamento e a devolução de valores pagos à ${IDENTIFICATION}. Ela complementa os Termos de uso e se aplica a assinaturas do Lemify, créditos de IA e demais serviços contratados.`,
  sections: [
    {
      title: '1. Avaliação gratuita',
      blocks: [
        'Quando disponível, a avaliação gratuita permite testar a plataforma antes de pagar. Não há cobrança durante o período de avaliação. Recomendamos usar esse período para validar se o Lemify atende às necessidades da sua empresa antes de contratar.',
      ],
    },
    {
      title: '2. Cancelamento da assinatura',
      blocks: [
        'O cliente pode cancelar a assinatura a qualquer momento, pela plataforma (quando disponível) ou por e-mail para ' + COMPANY.email + '. O cancelamento interrompe as próximas cobranças.',
        'O acesso continua disponível até o fim do período já pago. Após isso, o acesso é encerrado e os dados seguem as regras de retenção dos Termos de uso e da Política de Privacidade.',
        'O cancelamento não gera devolução proporcional do período em curso nem de períodos já utilizados, ressalvado o direito de arrependimento descrito abaixo e eventual obrigação legal.',
        'Para evitar a cobrança do ciclo seguinte, o cancelamento deve ser solicitado antes da data de vencimento da próxima fatura.',
      ],
    },
    {
      title: '3. Direito de arrependimento (7 dias)',
      blocks: [
        'Na primeira contratação paga de um plano feita pela internet, o cliente pode desistir em até 7 (sete) dias corridos contados da data da primeira cobrança, com reembolso integral da mensalidade paga, nos termos do art. 49 do Código de Defesa do Consumidor. O Lemify estende esse prazo, por liberalidade, a clientes pessoa jurídica.',
        'O pedido deve ser feito por e-mail, indicando o CNPJ/CPF, o e-mail da conta e o comprovante de pagamento. O direito de arrependimento vale apenas para a primeira contratação do plano, e não para renovações, reativações, upgrades já usufruídos, nem para clientes que já tenham sido reembolsados anteriormente.',
        'Desistências por arrependimento encerram o acesso à conta imediatamente.',
      ],
    },
    {
      title: '4. Renovações e mudanças de plano',
      blocks: [
        'As renovações automáticas são cobradas no início de cada ciclo e não são reembolsáveis depois de iniciadas, salvo em caso de cobrança indevida ou duplicada comprovada.',
        'Em caso de mudança para um plano maior (upgrade), o valor adicional poderá ser cobrado de forma proporcional. Em caso de mudança para um plano menor (downgrade), a diferença passa a valer a partir do ciclo seguinte, sem devolução do ciclo atual.',
      ],
    },
    {
      title: '5. Créditos de IA',
      blocks: [
        'Os créditos de IA adquiridos separadamente (por exemplo, pacotes de 10.000, 25.000 e 50.000 créditos) são adicionados ao saldo da conta após a confirmação do pagamento. Eles não expiram na virada do mês e se somam ao limite do plano, e são consumidos conforme o uso dos Agentes de IA.',
        'É possível pedir o reembolso integral de um pacote em até 7 (sete) dias corridos da compra, desde que nenhum crédito desse pacote tenha sido consumido. Créditos já consumidos, total ou parcialmente, não são reembolsáveis. Se houver consumo parcial, o Lemify poderá, a seu critério, reembolsar proporcionalmente os créditos não utilizados.',
        'O custo de uso dos modelos de IA é imediato e incorrido junto a provedores terceiros, por isso o consumo de créditos é definitivo. Os créditos não são convertidos em dinheiro nem transferíveis entre contas.',
        'Em caso de encerramento do contrato por iniciativa do Lemify sem justa causa, os créditos pagos e não utilizados serão reembolsados.',
      ],
    },
    {
      title: '6. Serviços de implantação, treinamento e outros serviços pontuais',
      blocks: [
        'Valores pagos por implantação guiada, treinamento, consultoria, configuração de canais, customizações ou outros serviços pontuais são devidos pelos serviços já realizados e não são reembolsáveis depois que o trabalho for iniciado. Se o serviço ainda não tiver começado, o pedido de cancelamento será analisado e, não havendo custo incorrido, o valor será devolvido.',
      ],
    },
    {
      title: '7. Custos de terceiros (canais oficiais, mensagens e outros)',
      blocks: [
        'Cobranças de terceiros, como taxas de conversas e de mensagens da WhatsApp Business Platform, números oficiais, provedores de telefonia/VoIP, domínios e outros serviços contratados por meio ou por conta do cliente, seguem as regras do provedor e não são reembolsáveis pelo Lemify depois de incorridas.',
      ],
    },
    {
      title: '8. Quando não há reembolso',
      blocks: [
        'Não há reembolso nos casos de:',
        { list: [
          'suspensão ou encerramento por violação dos Termos de uso, inclusive uso indevido de canais e envio de spam;',
          'restrição, suspensão ou banimento de número ou conta de WhatsApp, Instagram ou outro canal imposto pelo próprio canal;',
          'falta de uso da plataforma, ou por mudança de opinião fora do prazo de arrependimento;',
          'expectativas de resultado comercial não atingidas, ou por falhas de serviços de terceiros fora do controle do Lemify;',
          'cobrança de ciclo já iniciado, quando o cancelamento tiver sido pedido depois do vencimento.',
        ] },
      ],
    },
    {
      title: '9. Indisponibilidade relevante',
      blocks: [
        'Se a plataforma ficar indisponível de forma prolongada por causa atribuível à Lemify, o cliente poderá solicitar um crédito proporcional ou desconto na próxima fatura, que será analisado caso a caso. Quando houver SLA contratado, vale o que estiver definido nele.',
      ],
    },
    {
      title: '10. Como pedir reembolso e prazos',
      blocks: [
        `Envie um e-mail para ${COMPANY.email} com o assunto "Reembolso", informando o nome da empresa, o CNPJ/CPF, o e-mail da conta, a data e o valor da cobrança e o motivo do pedido. Responderemos em até 5 (cinco) dias úteis.`,
        'Pedidos aprovados são pagos pelo mesmo meio utilizado na compra (Pix, cartão ou boleto), em até 10 (dez) dias úteis após a aprovação. No cartão de crédito, o estorno pode aparecer em até duas faturas, conforme a operadora. Em pagamentos por boleto ou Pix, o valor é devolvido por Pix ou transferência para conta de mesma titularidade do pagador.',
        'O reembolso pode ser negado ou revisto se houver indício de fraude, abuso, uso indevido ou contestação indevida junto ao banco ou à operadora do cartão (chargeback). Contestações sem prévio contato com o Lemify podem levar à suspensão imediata da conta até a regularização.',
      ],
    },
    {
      title: '11. Alterações e contato',
      blocks: [
        `O Lemify pode atualizar esta política. A versão vigente fica publicada em ${COMPANY.site}/reembolso e as mudanças valem para compras feitas depois da atualização. Dúvidas: ${COMPANY.email}. ${COMPANY.name}, CNPJ ${COMPANY.cnpj}.`,
      ],
    },
  ],
}
