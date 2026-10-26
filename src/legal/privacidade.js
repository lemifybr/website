import { COMPANY, IDENTIFICATION, UPDATED } from './common.js'

export default {
  path: '/privacidade',
  h1: 'Política de privacidade',
  title: 'Política de privacidade · Lemify',
  description: 'Como o Lemify coleta, usa, compartilha e protege dados pessoais, e como titulares podem exercer seus direitos (LGPD).',
  updated: UPDATED,
  intro: `Esta Política de Privacidade explica como ${IDENTIFICATION} trata dados pessoais ao operar o site ${COMPANY.site} e a plataforma Lemify, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados, "LGPD"). Leia também os Termos de uso, os Termos de IA e a página Segurança e LGPD.`,
  sections: [
    {
      title: '1. Nosso papel no tratamento de dados',
      blocks: [
        'Atuamos em duas posições diferentes, conforme a LGPD:',
        { list: [
          'Controladora: quando tratamos dados de visitantes do site, de potenciais clientes, dos clientes contratantes (empresas) e de seus usuários da plataforma, para cadastro, cobrança, suporte, segurança e melhoria do serviço.',
          'Operadora: quando tratamos, em nome do cliente, os dados dos contatos dele (leads, clientes finais, pacientes etc.) que o cliente conecta, importa ou recebe pela plataforma. Nesse caso, o cliente é o controlador, define as finalidades e é responsável por informar os titulares e por ter base legal. Quem é contato de uma empresa que usa o Lemify deve se dirigir primeiro a ela para exercer seus direitos.',
        ] },
      ],
    },
    {
      title: '2. Dados que tratamos',
      blocks: [
        { list: [
          'Dados de cadastro: nome, e-mail, telefone, cargo, empresa, CNPJ/CPF, endereço de cobrança e credenciais de acesso.',
          'Dados de pagamento: histórico de cobranças, status e identificadores de transação. Dados de cartão são tratados diretamente pelos provedores de pagamento; o Lemify não armazena o número completo do cartão.',
          'Dados de uso e técnicos: endereço IP, identificadores de dispositivo, navegador, páginas acessadas, horários, registros (logs) de acesso e de ações, e informações para segurança e prevenção a fraudes.',
          'Conteúdo do cliente na plataforma: contatos (nome, telefone, e-mail, identificadores nos canais), mensagens, arquivos, imagens, áudios e transcrições, etiquetas, negociações, orçamentos, agendamentos, notas e bases de conhecimento carregadas para os Agentes de IA.',
          'Dados de canais e integrações: credenciais e tokens de acesso (WhatsApp, Instagram, Google Calendar, ERPs, marketplaces, e-mail) fornecidos pelo cliente, e dados que essas integrações retornam.',
          'Dados de suporte e comunicação: mensagens trocadas conosco, gravações e registros de atendimento, e respostas a pesquisas.',
          'Dados de cookies e tecnologias semelhantes, descritos na seção 10.',
        ] },
        'Não solicitamos dados pessoais sensíveis. Mas o conteúdo das conversas dos clientes pode conter esse tipo de dado (por exemplo, informações de saúde em uma clínica). Nesse caso, o cliente é o responsável por ter base legal e por limitar o que compartilha na plataforma.',
      ],
    },
    {
      title: '3. Para que usamos os dados e em que bases legais',
      blocks: [
        { list: [
          'Executar o contrato e prestar a plataforma (criar contas, conectar canais, entregar mensagens, executar automações e Agentes de IA, gerar relatórios): execução de contrato (art. 7º, V, da LGPD).',
          'Cobrar, emitir documentos fiscais e prevenir fraudes: execução de contrato, cumprimento de obrigação legal e legítimo interesse.',
          'Suporte, comunicação sobre o serviço, avisos de segurança e de alterações: execução de contrato e legítimo interesse.',
          'Segurança da informação, auditoria, prevenção a abusos e a spam, e defesa em processos judiciais, administrativos ou arbitrais: legítimo interesse, exercício regular de direitos e cumprimento de obrigação legal.',
          'Melhorar e desenvolver produtos, medir desempenho e criar estatísticas e indicadores agregados: legítimo interesse, sempre que possível com dados anonimizados ou agregados.',
          'Marketing e comunicação sobre novidades do Lemify: legítimo interesse ou consentimento, com a possibilidade de cancelar a qualquer momento.',
          'Cumprir ordens e obrigações legais e regulatórias: cumprimento de obrigação legal.',
        ] },
        'Não vendemos dados pessoais. Também não usamos o conteúdo das conversas dos clientes para publicidade nem para treinar modelos próprios de uso geral.',
      ],
    },
    {
      title: '4. Inteligência artificial e seus provedores',
      blocks: [
        'Para executar os Agentes de IA, trechos de conversas, instruções, bases de conhecimento e dados necessários à tarefa (por exemplo, disponibilidade de agenda) podem ser enviados a provedores de modelos de IA e de transcrição de áudio, que processam esses dados para gerar a resposta e retorná-la à Lemify. Entre os provedores utilizados ou disponíveis na plataforma estão OpenAI, Google (Gemini), DeepSeek e OpenRouter e os modelos de terceiros acessíveis por ele.',
        'Esses provedores atuam como suboperadores e seguem seus próprios termos e políticas de privacidade. Enviamos somente o necessário para cada tarefa. Mais detalhes estão nos Termos de IA.',
      ],
    },
    {
      title: '5. Com quem compartilhamos dados',
      blocks: [
        'Compartilhamos dados somente quando necessário ao serviço ou exigido por lei, com:',
        { list: [
          'provedores de infraestrutura em nuvem, armazenamento, filas, e-mail transacional, monitoramento e segurança;',
          'provedores de pagamento e cobrança (como Asaas e AbacatePay) e serviços de emissão fiscal e contábil;',
          'provedores de canais de mensagens e de APIs oficiais (como Meta/WhatsApp Business Platform, 360dialog e NotificaMe, incluindo Instagram e Facebook Messenger) e demais integrações habilitadas pelo cliente (Google Calendar e Google Meet, marketplaces, ERPs, TikTok e iFood);',
          'provedores de inteligência artificial, conforme a seção 4;',
          'consultores, auditores e assessores jurídicos, sob dever de confidencialidade;',
          'autoridades públicas, quando houver obrigação legal, ordem judicial ou para proteger direitos do Lemify e de terceiros;',
          'sucessores, em caso de fusão, aquisição ou reorganização societária, com a devida proteção dos dados.',
        ] },
        'Quando o cliente conecta um canal ou integração de terceiro, os dados passam a ser tratados também por esse terceiro, de acordo com a política dele.',
      ],
    },
    {
      title: '6. Transferência internacional de dados',
      blocks: [
        'Alguns provedores (inclusive de nuvem e de IA) podem armazenar ou processar dados fora do Brasil. Nesses casos, adotamos mecanismos permitidos pela LGPD, como cláusulas contratuais adequadas, e selecionamos provedores que ofereçam nível de proteção compatível, na medida do possível.',
      ],
    },
    {
      title: '7. Por quanto tempo guardamos os dados',
      blocks: [
        'Guardamos os dados pelo tempo necessário para as finalidades descritas, enquanto a conta estiver ativa e, depois, pelo prazo exigido por lei ou necessário para defesa em processos (por exemplo, obrigações fiscais e registros de acesso previstos no Marco Civil da Internet).',
        'Depois do encerramento do contrato, o conteúdo do cliente poderá ser excluído ou anonimizado em regra em até 90 dias, observadas as exceções legais. Backups são sobrescritos de forma programada. Dados de contatos tratados como operadora são eliminados ou devolvidos conforme a instrução do cliente.',
      ],
    },
    {
      title: '8. Segurança',
      blocks: [
        'Adotamos medidas técnicas e administrativas compatíveis com o risco, como comunicação criptografada (HTTPS/TLS), controle de acesso e de permissões, segregação entre contas de clientes, registros de auditoria, rotinas de backup, monitoramento e boas práticas de desenvolvimento seguro. Nenhum sistema é totalmente imune a falhas. Em caso de incidente de segurança que possa causar risco ou dano relevante, comunicaremos os clientes afetados e a Autoridade Nacional de Proteção de Dados (ANPD), nos termos da lei.',
      ],
    },
    {
      title: '9. Direitos dos titulares',
      blocks: [
        'Nos termos do art. 18 da LGPD, o titular pode solicitar:',
        { list: [
          'confirmação da existência de tratamento e acesso aos dados;',
          'correção de dados incompletos, inexatos ou desatualizados;',
          'anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade;',
          'portabilidade dos dados, mediante requisição expressa;',
          'eliminação dos dados tratados com consentimento;',
          'informação sobre compartilhamentos e sobre a possibilidade de não fornecer consentimento e suas consequências;',
          'revogação do consentimento e oposição a tratamentos baseados em outras bases legais, quando cabível;',
          'revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses.',
        ] },
        `Para exercer seus direitos, envie e-mail para ${COMPANY.email} com o assunto "Privacidade/LGPD", identificando-se e descrevendo o pedido. Podemos solicitar informações para confirmar sua identidade. Responderemos no prazo legal. Se você é contato de um de nossos clientes e seus dados são tratados por nós como operadora, encaminharemos o pedido ao cliente (controlador) ou orientaremos você a procurá-lo. Você também pode reclamar à ANPD (www.gov.br/anpd).`,
      ],
    },
    {
      title: '10. Cookies e tecnologias semelhantes',
      blocks: [
        'Usamos cookies e armazenamento local para fazer o site e a plataforma funcionarem (autenticação, preferências e segurança), medir uso e melhorar a experiência. Você pode gerenciar ou bloquear cookies no navegador, mas algumas funções podem deixar de funcionar. Quando houver cookies não essenciais, eles serão ativados conforme a base legal aplicável.',
      ],
    },
    {
      title: '11. Acesso às conversas e canais conectados',
      blocks: [
        'Ao conectar um canal (por exemplo, WhatsApp ou Instagram), a plataforma acessa as conversas, contatos e arquivos desse canal para entregar o atendimento, o CRM e a automação contratados. Esses dados pertencem ao cliente e são usados somente no escopo do serviço. O cliente deve informar os Contatos sobre o tratamento e respeitar os limites e termos do canal.',
      ],
    },
    {
      title: '12. Dados de crianças e adolescentes',
      blocks: [
        'A plataforma não é destinada a menores de 18 anos e não coletamos intencionalmente dados deles. Se o cliente tratar dados de crianças ou adolescentes (por exemplo, em clínicas ou escolas), deve observar o art. 14 da LGPD e obter o consentimento específico dos responsáveis, quando exigido.',
      ],
    },
    {
      title: '13. Links e serviços de terceiros',
      blocks: [
        'Nosso site e plataforma podem conter links para serviços de terceiros, que têm políticas próprias. O Lemify não é responsável pelo tratamento feito por eles.',
      ],
    },
    {
      title: '14. Encarregado de dados e contato',
      blocks: [
        `Para dúvidas, solicitações e contato com o encarregado pelo tratamento de dados pessoais (DPO), escreva para ${COMPANY.email}, assunto "Privacidade/LGPD". ${COMPANY.name}, CNPJ ${COMPANY.cnpj}, ${COMPANY.city}.`,
      ],
    },
    {
      title: '15. Alterações desta política',
      blocks: [
        'Podemos atualizar esta Política periodicamente. A versão vigente fica sempre publicada em lemify.com.br/privacidade, com a data da última atualização. Mudanças relevantes serão comunicadas por e-mail ou aviso na plataforma.',
      ],
    },
  ],
}
