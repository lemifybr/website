import { COMPANY, IDENTIFICATION, UPDATED } from './common.js'

export default {
  path: '/termos-ia',
  h1: 'Termos de uso de inteligência artificial',
  title: 'Termos de IA · Lemify',
  description: 'Regras de uso dos Agentes de IA do Lemify: limites, responsabilidades, supervisão humana, dados e créditos de IA.',
  updated: UPDATED,
  intro: `Estes Termos de IA ("Termos de IA") regulam o uso dos recursos de inteligência artificial da plataforma Lemify, oferecidos por ${IDENTIFICATION}, e fazem parte dos Termos de uso. Ao ativar ou usar qualquer Agente de IA, o cliente declara que leu e aceita estas regras.`,
  sections: [
    {
      title: '1. O que são os Agentes de IA',
      blocks: [
        'Os Agentes de IA são assistentes virtuais da plataforma, como Lemi (atendimento), Maia (agendamento), Theo (vendas), Otto (cadastro), Nico (retorno) e Íris (relatórios). Eles podem responder mensagens, qualificar contatos, preencher dados no CRM, sugerir ou criar agendamentos e orçamentos, retomar conversas e gerar resumos e relatórios, de acordo com as instruções e a base de conhecimento configuradas pelo cliente.',
        'Esses recursos usam modelos de linguagem e serviços de terceiros, e podem incluir transcrição de áudio e busca em documentos do cliente (base de conhecimento).',
      ],
    },
    {
      title: '2. Natureza da IA e seus limites',
      blocks: [
        'A IA gera respostas de forma probabilística. Mesmo com boas configurações, ela pode produzir informações incorretas, desatualizadas, incompletas ou inadequadas ("alucinações"), interpretar mal a mensagem, tomar ações indevidas ou não seguir instruções. O Lemify não garante a exatidão, completude, adequação ou legalidade das respostas e das ações da IA.',
        'A IA não substitui o julgamento humano nem o aconselhamento profissional (médico, odontológico, jurídico, financeiro, contábil, de engenharia, entre outros). Respostas da IA não são diagnóstico, prescrição, parecer ou promessa de resultado.',
      ],
    },
    {
      title: '3. Responsabilidades do cliente',
      blocks: [
        'O cliente é responsável por:',
        { list: [
          'configurar corretamente os Agentes de IA, incluindo regras, limites, tom de voz, preços, políticas e informações que a IA poderá fornecer, mantendo a base de conhecimento correta e atualizada;',
          'revisar e supervisionar o funcionamento da IA, testar antes de colocar em produção, acompanhar as conversas e ativar o atendimento humano quando necessário;',
          'informar de forma clara aos contatos que estão interagindo com um assistente virtual e oferecer a possibilidade de falar com uma pessoa;',
          'responder pelas informações, promessas, preços, prazos, agendamentos, orçamentos e demais compromissos assumidos em seu nome pela IA, que valem como se fossem comunicados pelo próprio cliente;',
          'garantir que possui base legal para tratar os dados dos contatos e para enviar a eles os dados que a IA processa, conforme a LGPD;',
          'não inserir dados que não deva compartilhar com provedores de IA (por exemplo, senhas, dados de cartão completos ou informações sigilosas sem base legal ou autorização).',
        ] },
      ],
    },
    {
      title: '4. Usos proibidos',
      blocks: [
        'É proibido usar a IA do Lemify para:',
        { list: [
          'finalidades ilegais, fraudulentas, enganosas, discriminatórias ou que violem direitos de terceiros;',
          'enviar spam, golpes, desinformação, conteúdo sexual explícito, violento, de ódio ou que envolva menores;',
          'se passar por uma pessoa real específica, ou ocultar de forma maliciosa o fato de ser um robô;',
          'tomar decisões automatizadas de alto impacto sobre pessoas (como concessão de crédito, contratação, seguro, diagnóstico ou tratamento de saúde, ou aplicação de penalidades) sem revisão e decisão por uma pessoa;',
          'tentar burlar os controles de segurança, extrair as instruções internas, abusar do consumo de créditos ou usar os resultados para treinar modelos concorrentes.',
        ] },
        'Os provedores de modelos de IA também aplicam políticas de uso próprias, que o cliente deve respeitar.',
      ],
    },
    {
      title: '5. Dados e provedores de IA',
      blocks: [
        'Para gerar respostas, o Lemify envia aos provedores de IA os trechos necessários da conversa, das instruções, da base de conhecimento e dos dados de contexto (como horários disponíveis na agenda). Entre os provedores utilizados ou disponíveis estão OpenAI, Google (Gemini), DeepSeek e OpenRouter e os modelos de terceiros acessados por ele. A plataforma pode alternar automaticamente entre provedores e modelos para manter a disponibilidade e o custo, sem aviso prévio.',
        'O Lemify não utiliza o Conteúdo do Cliente para treinar modelos próprios de uso geral. O tratamento realizado pelos provedores segue os termos e políticas deles, que o cliente reconhece e aceita; o Lemify busca contratar o uso das APIs com configurações que limitem a retenção e o uso dos dados, na medida em que o provedor ofereça essas opções.',
        'Os dados pessoais enviados são tratados conforme a Política de Privacidade. Alguns provedores podem processar dados fora do Brasil (transferência internacional).',
      ],
    },
    {
      title: '6. Decisões automatizadas e direitos dos titulares',
      blocks: [
        'Os titulares de dados podem solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses (art. 20 da LGPD). Como controlador desses dados, o cliente deve manter canal para esse pedido e prever a revisão humana. O Lemify apoiará o cliente de forma razoável.',
      ],
    },
    {
      title: '7. Uso em áreas sensíveis (saúde, direito, finanças)',
      blocks: [
        'Clientes de saúde (como clínicas e consultórios), jurídicos, financeiros e de outras áreas regulamentadas devem usar a IA apenas para tarefas administrativas e de relacionamento (por exemplo, agendamento, lembretes e dúvidas gerais), sem usá-la para diagnóstico, conduta clínica, aconselhamento ou decisão profissional. O cliente é responsável por cumprir as normas dos conselhos profissionais e por orientar a IA a encaminhar casos de urgência e dúvidas técnicas a um profissional.',
      ],
    },
    {
      title: '8. Créditos e consumo de IA',
      blocks: [
        'O uso dos Agentes de IA é medido em créditos, conforme o plano e eventuais pacotes avulsos. O consumo varia conforme o tamanho das mensagens, o modelo usado, a transcrição de áudio, a busca na base de conhecimento e o número de interações. As estimativas de mensagens por pacote são aproximadas e não representam garantia.',
        'Ao esgotar os créditos disponíveis, os Agentes de IA podem ser limitados ou pausados até a recarga ou o início do próximo ciclo. O Lemify não responde por atendimentos não respondidos pela IA em razão de saldo insuficiente. Regras de reembolso estão na Política de Reembolso.',
      ],
    },
    {
      title: '9. Propriedade dos resultados',
      blocks: [
        'As respostas, textos e relatórios gerados pela IA a partir do Conteúdo do Cliente podem ser usados pelo cliente em sua atividade. Em razão da natureza da IA, o Lemify não garante que os resultados sejam únicos ou livres de semelhança com conteúdos de terceiros, e o cliente é responsável por revisar o conteúdo antes de usá-lo.',
      ],
    },
    {
      title: '10. Disponibilidade, mudanças e suspensão',
      blocks: [
        'Os recursos de IA dependem de serviços de terceiros e podem ficar indisponíveis, lentos ou sofrer mudanças de comportamento quando os modelos são atualizados ou substituídos. O Lemify pode ajustar, limitar ou descontinuar modelos e funcionalidades de IA e pode suspender o uso em caso de abuso ou risco.',
      ],
    },
    {
      title: '11. Isenção e limitação de responsabilidade',
      blocks: [
        'Nos limites da lei, o Lemify não se responsabiliza por danos decorrentes de respostas ou ações da IA, de uso em desacordo com estes Termos de IA ou de falhas de provedores de IA, e responde conforme o limite previsto nos Termos de uso. O cliente deve indenizar o Lemify por reclamações de terceiros decorrentes do uso da IA em desacordo com estas regras, nos termos dos Termos de uso.',
      ],
    },
    {
      title: '12. Alterações e contato',
      blocks: [
        `O Lemify pode atualizar estes Termos de IA, e a versão vigente fica publicada em ${COMPANY.site}/termos-ia. O uso continuado dos recursos de IA depois da atualização indica concordância. Dúvidas: ${COMPANY.email}. ${COMPANY.name}, CNPJ ${COMPANY.cnpj}.`,
      ],
    },
  ],
}
