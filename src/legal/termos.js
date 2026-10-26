import { COMPANY, IDENTIFICATION, UPDATED } from './common.js'

export default {
  path: '/termos',
  h1: 'Termos de uso',
  title: 'Termos de uso · Lemify',
  description: 'Condições para uso da plataforma Lemify: contratação, planos, canais de mensagens, responsabilidades, limites e foro.',
  updated: UPDATED,
  intro: `Estes Termos de Uso ("Termos") regulam o acesso e o uso da plataforma Lemify, de seus sites, aplicativos, APIs e serviços relacionados ("Plataforma"), oferecidos por ${IDENTIFICATION}. Ao criar uma conta, contratar um plano, iniciar o período de avaliação ou usar a Plataforma, você declara que leu, compreendeu e aceita estes Termos, bem como a Política de Privacidade, a Política de Reembolso, os Termos de IA e os demais documentos publicados em ${COMPANY.site}.`,
  sections: [
    {
      title: '1. Definições',
      blocks: [
        { list: [
          '"Cliente": a pessoa jurídica ou profissional que contrata a Plataforma, por meio de seu representante legal ou de pessoa autorizada.',
          '"Usuário": cada pessoa que acessa a Plataforma em nome do Cliente (administradores, atendentes, vendedores, gestores).',
          '"Contatos": as pessoas que se comunicam com o Cliente por meio da Plataforma (leads, clientes finais, pacientes, fornecedores etc.).',
          '"Conteúdo do Cliente": todos os dados, mensagens, arquivos, áudios, bases de conhecimento, configurações e instruções inseridos, sincronizados ou gerados na conta do Cliente.',
          '"Canais": os meios de comunicação conectados à Plataforma, como WhatsApp, Instagram, Facebook Messenger, e-mail e chat do site.',
          '"Agentes de IA": os recursos de inteligência artificial da Plataforma (como Lemi, Maia, Theo, Otto, Nico e Íris), regidos também pelos Termos de IA.',
          '"Integrações": conexões com serviços de terceiros, como Google, Meta, marketplaces, ERPs, gateways de pagamento e provedores de IA.',
        ] },
      ],
    },
    {
      title: '2. Aceite, capacidade e natureza do serviço',
      blocks: [
        'A Plataforma é destinada a empresas e profissionais que a utilizam em sua atividade econômica (relação entre empresas). Ao aceitar estes Termos, quem os aceita declara ter poderes para vincular o Cliente e ser maior de 18 anos e plenamente capaz.',
        'Se você não concordar com qualquer parte destes Termos, não use a Plataforma.',
        'O Lemify pode firmar propostas ou contratos específicos com o Cliente. Em caso de conflito, prevalece o que estiver no documento específico, naquilo que ele tratar.',
      ],
    },
    {
      title: '3. Descrição da Plataforma',
      blocks: [
        'O Lemify é uma plataforma de atendimento e relacionamento com clientes que reúne canais de mensagens, atendimento por equipes, CRM, agenda, orçamentos, campanhas, relatórios e Agentes de IA em um único ambiente.',
        'O Lemify pode adicionar, alterar, limitar ou descontinuar funcionalidades, desde que não prejudique de forma relevante o serviço contratado. Recursos identificados como "beta", "em desenvolvimento" ou "experimental" são oferecidos no estado em que se encontram, sem compromisso de continuidade.',
      ],
    },
    {
      title: '4. Cadastro, contas e segurança',
      blocks: [
        'O Cliente deve fornecer informações verdadeiras, completas e atualizadas e mantê-las assim. Cada Usuário deve ter credenciais próprias, que não podem ser compartilhadas.',
        'O Cliente é responsável por todas as atividades realizadas com as credenciais de seus Usuários, pela gestão de permissões internas e por desativar o acesso de quem deixar a empresa. Deve comunicar imediatamente à Lemify qualquer uso não autorizado ou suspeita de violação de segurança.',
        'O Lemify pode exigir medidas adicionais de segurança, como verificação em duas etapas, quando entender necessário.',
      ],
    },
    {
      title: '5. Planos, avaliação gratuita, preços e pagamento',
      blocks: [
        'A Plataforma é oferecida em planos de assinatura recorrente, com preços, limites de usuários, canais, Agentes de IA e demais condições descritos na proposta, no site ou no momento da contratação. Podem existir cobranças adicionais por uso, como créditos de IA, canais extras e serviços de implantação.',
        'O Lemify pode oferecer período de avaliação gratuita, cuja duração e limites serão informados no cadastro. Ao término da avaliação, o acesso poderá ser suspenso até a contratação de um plano.',
        'Os pagamentos são processados por provedores de pagamento terceirizados (como Asaas e AbacatePay), por boleto, Pix, cartão ou outro meio disponibilizado. O Cliente autoriza a cobrança recorrente e se compromete a manter dados de pagamento válidos.',
        'Os preços podem ser reajustados. Reajustes e mudanças de plano serão comunicados com antecedência razoável e valerão a partir do ciclo seguinte à comunicação. Tributos incidentes sobre os serviços serão cobrados conforme a legislação.',
        'Os créditos de IA adquiridos separadamente seguem as regras da Política de Reembolso e dos Termos de IA.',
      ],
    },
    {
      title: '6. Inadimplência, suspensão e bloqueio',
      blocks: [
        'Em caso de atraso, o Lemify pode cobrar multa de 2% e juros de 1% ao mês sobre o valor em atraso, corrigido monetariamente, além de despesas de cobrança.',
        'O não pagamento no vencimento pode levar à suspensão do acesso e, após alguns dias, ao bloqueio de recursos e à desconexão dos Canais (inclusive do WhatsApp), sem prejuízo da cobrança dos valores devidos. O acesso é restabelecido após a confirmação do pagamento, que pode levar o prazo de compensação do meio utilizado.',
        'O Lemify não responde por lucros cessantes, perda de oportunidades ou outros prejuízos decorrentes de suspensão ou bloqueio por inadimplência.',
      ],
    },
    {
      title: '7. Canais de mensagens: WhatsApp, Instagram e outros',
      blocks: [
        'O Lemify é independente e não tem vínculo, parceria ou endosso da Meta Platforms, do WhatsApp, do Instagram, do Google, do TikTok ou de qualquer outro serviço de terceiros citado na Plataforma, exceto onde expressamente indicado. Os nomes e marcas pertencem a seus titulares.',
        'A conexão com canais pode ocorrer de duas formas: (a) por API oficial, por meio de provedores autorizados (como a WhatsApp Business Platform, a Meta ou parceiros como 360dialog e NotificaMe), sujeita às regras, preços e aprovações desses provedores; ou (b) por conexão com o WhatsApp Web, feita por meio de bibliotecas de terceiros, que não é um canal oficial.',
        'O Cliente reconhece que a conexão pelo WhatsApp Web pode violar ou ser tratada como violação dos termos do WhatsApp e que isso pode resultar em restrição, suspensão ou banimento do número, inclusive com perda de conversas e contatos. O Lemify não controla essas decisões e não se responsabiliza por elas. Recomendamos o uso de canais oficiais para operações críticas.',
        'O Cliente é o único responsável por cumprir as políticas dos canais que conectar (incluindo as políticas comerciais e de mensagens do WhatsApp Business e da Meta), por obter e comprovar o consentimento (opt-in) dos Contatos, por respeitar pedidos de descadastro e por usar modelos de mensagem aprovados quando exigido.',
        'O Lemify não garante a entrega, a leitura ou o recebimento das mensagens, pois dependem de redes e serviços de terceiros.',
      ],
    },
    {
      title: '8. Dados dos Contatos e proteção de dados',
      blocks: [
        'Em relação aos dados dos Contatos inseridos, sincronizados ou recebidos pela Plataforma, o Cliente é o controlador e o Lemify atua como operadora, tratando os dados conforme as instruções do Cliente e estes Termos (Lei nº 13.709/2018, a LGPD). Em relação aos dados cadastrais do Cliente e de seus Usuários, o Lemify atua como controladora, conforme a Política de Privacidade.',
        'O Cliente declara e garante que possui base legal adequada para tratar os dados dos Contatos e para contatá-los, que informou os titulares sobre o uso de ferramentas de atendimento e de inteligência artificial e que cumprirá a LGPD, o Marco Civil da Internet, o Código de Defesa do Consumidor e demais normas aplicáveis. Cabe ao Cliente atender aos pedidos dos titulares, com o apoio razoável do Lemify.',
        'O Cliente não deve inserir na Plataforma dados pessoais sensíveis (como dados de saúde, biometria ou origem racial) ou dados de crianças e adolescentes sem possuir base legal e medidas de segurança adequadas. Clientes da área da saúde reconhecem que são responsáveis pelo sigilo profissional e pelo cumprimento das normas de seus conselhos de classe.',
        'O Lemify adota medidas técnicas e administrativas de segurança descritas na página Segurança e LGPD e na Política de Privacidade. Nenhum sistema é totalmente seguro; em caso de incidente relevante, o Lemify comunicará o Cliente e as autoridades, quando exigido.',
      ],
    },
    {
      title: '9. Inteligência artificial',
      blocks: [
        'Os Agentes de IA geram respostas e executam ações com base em modelos de linguagem de terceiros e nas instruções e bases de conhecimento do Cliente. As respostas podem conter erros, imprecisões ou omissões. O uso de IA está sujeito aos Termos de IA, que fazem parte destes Termos.',
        'O Cliente é responsável por configurar, revisar e supervisionar os Agentes de IA, por informar aos Contatos que estão interagindo com um assistente virtual e por manter canais de atendimento humano.',
      ],
    },
    {
      title: '10. Integrações com serviços de terceiros',
      blocks: [
        'A Plataforma pode se integrar a serviços de terceiros (por exemplo Google Calendar e Google Meet, Meta, TikTok, iFood, Mercado Livre, Shopify, Nuvemshop, Bling, Omie, Conta Azul, Asaas, Tiny e provedores de IA). Essas integrações dependem das APIs, regras e disponibilidade desses terceiros, que podem mudar ou ser interrompidas sem aviso.',
        'Ao ativar uma integração, o Cliente autoriza o compartilhamento dos dados necessários para seu funcionamento e declara ter direito de usar sua conta no serviço de terceiro. O uso desses serviços é regido pelos termos e políticas de cada terceiro, e o Lemify não se responsabiliza por eles.',
        'O uso de dados obtidos das APIs do Google segue a página Divulgação de uso de dados do Google.',
      ],
    },
    {
      title: '11. Uso aceitável',
      blocks: [
        'É proibido usar a Plataforma para:',
        { list: [
          'enviar spam, mensagens em massa sem consentimento, correntes, golpes, phishing ou comunicações enganosas;',
          'praticar atos ilegais, discriminatórios, difamatórios, de assédio, violência ou que violem direitos de terceiros, inclusive de propriedade intelectual e de privacidade;',
          'transmitir malware ou tentar acessar sistemas, contas ou dados sem autorização, testar vulnerabilidades sem permissão escrita, sobrecarregar a infraestrutura ou burlar limites técnicos e de cobrança;',
          'realizar engenharia reversa, copiar, revender, sublicenciar ou oferecer a Plataforma a terceiros como serviço próprio, sem contrato específico (white label ou revenda);',
          'usar a Plataforma ou seus resultados para treinar modelos de IA concorrentes ou para extrair dados em massa (scraping);',
          'comercializar produtos ou serviços proibidos pela lei ou pelas políticas dos canais conectados;',
          'usar a IA para tomar decisões automatizadas de alto impacto sobre pessoas sem supervisão humana, ou em desacordo com os Termos de IA.',
        ] },
        'O Lemify pode remover conteúdos, limitar recursos ou suspender contas que violem estas regras, sem prejuízo de comunicar autoridades.',
      ],
    },
    {
      title: '12. Propriedade intelectual',
      blocks: [
        'A Plataforma, o software, as marcas Lemify, Lemi, Maia, Theo, Otto, Nico e Íris, o design, os textos e os personagens são de propriedade do Lemify ou de seus licenciantes. Estes Termos concedem ao Cliente apenas uma licença limitada, revogável, não exclusiva e intransferível de uso da Plataforma durante a vigência do contrato.',
        'O Conteúdo do Cliente continua pertencendo ao Cliente. O Cliente concede à Lemify licença para hospedar, processar, copiar e exibir esse conteúdo na medida necessária para prestar o serviço, inclusive por meio de operadores e provedores de IA.',
        'Sugestões e feedbacks enviados podem ser usados pelo Lemify sem obrigação de pagamento ou atribuição.',
      ],
    },
    {
      title: '13. Disponibilidade, suporte e manutenção',
      blocks: [
        'O Lemify busca manter a Plataforma disponível, mas não garante funcionamento ininterrupto ou livre de erros. Podem ocorrer indisponibilidades por manutenção, falhas de provedores de infraestrutura, redes, canais, APIs e modelos de IA de terceiros ou por eventos fora de nosso controle.',
        'Metas de disponibilidade e prazos de atendimento só obrigam o Lemify se estiverem previstos em contrato específico (SLA). O suporte é prestado pelos canais e horários informados na contratação.',
        'O Cliente deve manter cópias de seus dados importantes. O Lemify realiza rotinas de backup para continuidade do serviço, sem se comprometer a restaurar dados excluídos pelo Cliente ou por seus Usuários.',
      ],
    },
    {
      title: '14. Isenção de garantias',
      blocks: [
        'Na máxima extensão permitida pela lei, a Plataforma é fornecida "como está" e "conforme disponível". O Lemify não garante resultados comerciais específicos, como volume de vendas, conversão, economia de custos ou aprovação em canais de terceiros, nem que os Agentes de IA ou relatórios sejam isentos de erros.',
      ],
    },
    {
      title: '15. Limitação de responsabilidade',
      blocks: [
        'Na máxima extensão permitida pela lei, o Lemify não responde por danos indiretos, lucros cessantes, perda de receita, de oportunidades, de clientes, de reputação ou de dados, nem por danos decorrentes de atos de terceiros, de falhas de serviços de terceiros, de banimento de números, de uso indevido da Plataforma pelo Cliente ou por seus Usuários, ou de conteúdo gerado ou enviado pelo Cliente.',
        'A responsabilidade total do Lemify perante o Cliente, por qualquer causa e sob qualquer teoria jurídica, fica limitada ao valor efetivamente pago pelo Cliente à Lemify pelo plano contratado nos 12 (doze) meses anteriores ao fato que originou a reclamação.',
        'Nada nestes Termos exclui responsabilidade que não possa ser excluída por lei, como dolo ou culpa grave.',
      ],
    },
    {
      title: '16. Indenização',
      blocks: [
        'O Cliente concorda em indenizar e manter o Lemify, seus sócios, administradores e colaboradores livres de danos, custos, multas, condenações e despesas (inclusive honorários advocatícios) decorrentes de reclamações de terceiros, de autoridades ou de Contatos relacionadas a: (a) violação destes Termos ou da lei; (b) Conteúdo do Cliente; (c) envio de mensagens sem base legal ou consentimento; (d) uso dos Canais e dos Agentes de IA em desacordo com as regras aplicáveis; e (e) infração de direitos de terceiros.',
      ],
    },
    {
      title: '17. Confidencialidade',
      blocks: [
        'Cada parte deve manter em sigilo as informações confidenciais da outra a que tiver acesso, usando-as apenas para cumprir o contrato, salvo quando a divulgação for exigida por lei ou autoridade. Essa obrigação permanece por 5 (cinco) anos após o término do contrato.',
      ],
    },
    {
      title: '18. Vigência, cancelamento e encerramento',
      blocks: [
        'O contrato vigora por prazo indeterminado ou pelo período do plano contratado. O Cliente pode cancelar a qualquer momento pelos meios indicados na Plataforma ou por e-mail, com efeitos ao final do ciclo já pago, conforme a Política de Reembolso. O cancelamento não gera devolução proporcional do período em curso, salvo o previsto na Política de Reembolso.',
        'O Lemify pode suspender ou encerrar o acesso: (a) por inadimplência; (b) por violação destes Termos, da lei ou das políticas dos canais; (c) para proteger a segurança da Plataforma ou de terceiros; ou (d) mediante aviso prévio de 30 (trinta) dias, sem justa causa.',
        'Após o encerramento, o Cliente poderá solicitar a exportação de seus dados em prazo razoável. Depois disso, o Lemify poderá excluir ou anonimizar o Conteúdo do Cliente, em regra em até 90 (noventa) dias, ressalvadas as informações que devamos guardar por obrigação legal ou para defesa em processos.',
      ],
    },
    {
      title: '19. Alterações destes Termos',
      blocks: [
        'O Lemify pode atualizar estes Termos a qualquer momento. Mudanças relevantes serão comunicadas por e-mail, aviso na Plataforma ou no site, e passam a valer na data indicada. O uso continuado após a vigência da nova versão representa aceitação. Se não concordar, o Cliente deve cancelar o uso.',
      ],
    },
    {
      title: '20. Comunicações',
      blocks: [
        `As comunicações do Lemify serão enviadas ao e-mail cadastrado ou por avisos na Plataforma. O Cliente deve manter seu e-mail atualizado. Dúvidas e solicitações podem ser enviadas para ${COMPANY.email}.`,
      ],
    },
    {
      title: '21. Disposições gerais',
      blocks: [
        'Se alguma cláusula for considerada inválida, as demais continuam em vigor. A tolerância de uma parte quanto ao descumprimento não representa renúncia de direitos. O Cliente não pode ceder o contrato sem autorização escrita do Lemify; o Lemify pode cedê-lo em caso de reorganização societária.',
        'Nenhuma das partes responde por descumprimento causado por caso fortuito ou força maior, como falhas gerais de energia ou de internet, ataques cibernéticos em larga escala, atos governamentais, pandemias ou interrupções de provedores essenciais.',
        'Estes Termos, a Política de Privacidade, a Política de Reembolso, os Termos de IA e os documentos referenciados formam o acordo integral entre as partes sobre o tema.',
      ],
    },
    {
      title: '22. Lei aplicável e foro',
      blocks: [
        'Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo, Estado de São Paulo, para dirimir qualquer controvérsia, com renúncia a qualquer outro, por mais privilegiado que seja, ressalvados os casos em que a lei atribua competência diversa em favor do consumidor.',
      ],
    },
  ],
}
