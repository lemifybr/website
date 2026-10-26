import { COMPANY, IDENTIFICATION, UPDATED } from './common.js'

export default {
  path: '/lgpd',
  h1: 'Segurança e LGPD',
  title: 'Segurança e LGPD · Lemify',
  description: 'Como o Lemify atua na LGPD (controladora e operadora), medidas de segurança, incidentes, suboperadores e canal do encarregado.',
  updated: UPDATED,
  intro: `Esta página resume como ${IDENTIFICATION} cumpre a Lei nº 13.709/2018 (LGPD) e protege os dados na plataforma. Ela complementa a Política de Privacidade e os Termos de uso.`,
  sections: [
    {
      title: '1. Papéis na LGPD',
      blocks: [
        { list: [
          'Controladora: em relação aos dados cadastrais dos clientes contratantes e de seus usuários, e aos dados de visitantes do site.',
          'Operadora: em relação aos dados dos contatos (leads, clientes finais, pacientes) que os clientes inserem, sincronizam ou recebem na plataforma. O cliente é o controlador desses dados e define as finalidades do tratamento.',
        ] },
      ],
    },
    {
      title: '2. Responsabilidades do cliente (controlador)',
      blocks: [
        'Ao usar a plataforma para tratar dados de terceiros, o cliente é responsável por ter base legal adequada para tratar e contatar seus leads e clientes, por informar os titulares (inclusive sobre o uso de IA), por obter consentimento quando exigido (por exemplo, para campanhas), por atender pedidos dos titulares e por definir quanto tempo manter os dados. O Lemify trata os dados conforme as instruções do cliente e os Termos de uso.',
      ],
    },
    {
      title: '3. Princípios e bases legais',
      blocks: [
        'Tratamos dados pessoais com finalidade específica e legítima, adequação, necessidade, transparência, segurança, prevenção e responsabilização, apoiados nas bases legais do art. 7º da LGPD, como execução de contrato, cumprimento de obrigação legal, legítimo interesse e consentimento, quando aplicável.',
      ],
    },
    {
      title: '4. Medidas de segurança',
      blocks: [
        { list: [
          'criptografia em trânsito (HTTPS/TLS) nas comunicações com a plataforma e com as integrações;',
          'controle de acesso por usuário, perfis e permissões, e isolamento lógico entre as contas dos clientes;',
          'registros (logs) de acesso e de ações relevantes, para auditoria e investigação;',
          'rotinas de backup e de recuperação para continuidade do serviço;',
          'acesso restrito de colaboradores aos dados, apenas quando necessário, com dever de confidencialidade;',
          'monitoramento da infraestrutura, atualização de dependências e boas práticas de desenvolvimento seguro;',
          'segurança dos tokens e credenciais de canais e integrações, usados somente pelos sistemas da plataforma.',
        ] },
        'Nenhum sistema é totalmente imune a falhas. Recomendamos que o cliente use senhas fortes e exclusivas, revise as permissões de seus usuários e desative quem sair da empresa.',
      ],
    },
    {
      title: '5. Incidentes de segurança',
      blocks: [
        'Em caso de incidente que possa acarretar risco ou dano relevante aos titulares, comunicaremos os clientes afetados em prazo razoável, com as informações disponíveis, para que possam cumprir suas obrigações, e a ANPD, quando exigido pela LGPD.',
      ],
    },
    {
      title: '6. Suboperadores e transferência internacional',
      blocks: [
        'Para prestar o serviço, contamos com provedores de infraestrutura, pagamentos (Asaas e AbacatePay), canais de mensagens (Meta/WhatsApp Business Platform, 360dialog, NotificaMe), integrações habilitadas pelo cliente e provedores de IA (OpenAI, Google Gemini, DeepSeek e OpenRouter). Esses provedores podem processar dados fora do Brasil. Selecionamos fornecedores com padrões de segurança compatíveis e usamos instrumentos contratuais adequados quando exigido. A lista de categorias e exemplos está na Política de Privacidade.',
      ],
    },
    {
      title: '7. Direitos dos titulares',
      blocks: [
        'Os titulares podem solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação, portabilidade, informações sobre compartilhamento, revogação de consentimento e revisão de decisões automatizadas (art. 18 e art. 20 da LGPD). Se você é contato de uma empresa que usa o Lemify, procure primeiro essa empresa, que é a controladora dos seus dados; repassaremos solicitações que recebermos.',
      ],
    },
    {
      title: '8. Retenção e descarte',
      blocks: [
        'Os dados são mantidos pelo período necessário às finalidades e às obrigações legais. Após o encerramento do contrato, o conteúdo do cliente poderá ser excluído ou anonimizado, em regra em até 90 dias, e os dados de contatos serão eliminados ou devolvidos conforme a instrução do cliente, ressalvadas as hipóteses legais de guarda.',
      ],
    },
    {
      title: '9. Encarregado (DPO) e contato',
      blocks: [
        `Para exercer direitos, tirar dúvidas ou falar com o encarregado pelo tratamento de dados pessoais, escreva para ${COMPANY.email}, assunto "Privacidade/LGPD". ${COMPANY.name}, CNPJ ${COMPANY.cnpj}, ${COMPANY.city}.`,
      ],
    },
  ],
}
