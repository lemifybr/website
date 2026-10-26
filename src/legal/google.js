import { COMPANY, IDENTIFICATION, UPDATED } from './common.js'

export default {
  path: '/google-disclosure',
  h1: 'Divulgação de uso de dados do Google',
  title: 'Divulgação de uso de dados do Google · Lemify',
  description: 'Como o Lemify usa dados obtidos das APIs do Google (Google Calendar e Google Meet) e cumpre a Política de Dados do Usuário dos Serviços de API do Google.',
  updated: UPDATED,
  intro: `Esta página descreve como ${IDENTIFICATION} acessa, usa, armazena e protege dados obtidos das APIs do Google, quando o cliente ativa a integração com o Google Calendar e o Google Meet na plataforma Lemify.`,
  sections: [
    {
      title: '1. Declaração de conformidade (Uso Limitado)',
      blocks: [
        'O uso e a transferência, pelo Lemify, de informações recebidas das APIs do Google para qualquer outro aplicativo obedecerão à Política de Dados do Usuário dos Serviços de API do Google (Google API Services User Data Policy), incluindo os requisitos de Uso Limitado.',
        'Referência: https://developers.google.com/terms/api-services-user-data-policy',
      ],
    },
    {
      title: '2. Quais APIs e permissões usamos',
      blocks: [
        { list: [
          'Google Calendar API (escopo https://www.googleapis.com/auth/calendar): para consultar a disponibilidade de horários, criar, atualizar e cancelar eventos na agenda indicada pelo cliente.',
          'Google Meet (por meio de dados de conferência dos eventos do Google Calendar): para gerar o link da videoconferência quando o compromisso agendado é online.',
        ] },
        'O Lemify não acessa e-mails (Gmail), arquivos (Drive), contatos pessoais nem outros dados do Google do cliente por meio dessas APIs. Solicitamos acesso apenas ao que é necessário para as funções descritas.',
      ],
    },
    {
      title: '3. Como a integração funciona',
      blocks: [
        'A conexão é configurada pelo próprio cliente, na área de Configurações da plataforma, fornecendo as credenciais de uma conta de serviço do Google (service account) e o identificador da agenda. A conta de serviço só acessa as agendas que o cliente compartilhar com ela (ou, em ambientes Google Workspace, as agendas para as quais o administrador do cliente conceder delegação de domínio, a seu critério).',
        'Quando o cliente ou os Agentes de IA (como a Maia, de agendamento) precisam agendar, remarcar ou cancelar um compromisso, a plataforma usa essa credencial para falar com a API do Google Calendar em nome do cliente.',
      ],
    },
    {
      title: '4. Quais dados do Google acessamos',
      blocks: [
        { list: [
          'dados dos eventos da agenda indicada: título, descrição, data e horário, local, participantes, status e links (incluindo link do Google Meet);',
          'informações de disponibilidade (horários livres e ocupados) da agenda indicada;',
          'identificadores técnicos dos eventos criados pela plataforma, para atualizá-los ou cancelá-los.',
        ] },
      ],
    },
    {
      title: '5. Como usamos os dados do Google',
      blocks: [
        'Usamos os dados obtidos das APIs do Google somente para oferecer e melhorar as funcionalidades de agenda e de videoconferência voltadas ao cliente que ativou a integração, ou seja, exibir a agenda, verificar disponibilidade, criar, alterar e cancelar compromissos, e gerar links de reunião.',
        'Para executar uma tarefa de agendamento solicitada, informações necessárias (por exemplo, quais horários estão livres) podem ser enviadas de forma transitória ao provedor de IA usado pelo agente, apenas para gerar a resposta ao contato. Esses dados não são usados para treinar modelos.',
      ],
    },
    {
      title: '6. O que não fazemos com os dados do Google',
      blocks: [
        { list: [
          'não vendemos os dados do Google a terceiros, nem os transferimos a corretores de dados;',
          'não usamos esses dados para publicidade, inclusive segmentada, nem para criar perfis para fins publicitários;',
          'não usamos esses dados para desenvolver, melhorar ou treinar modelos de inteligência artificial ou de aprendizado de máquina generalizados;',
          'não usamos esses dados para avaliação de crédito ou para fins de empréstimo;',
          'não permitimos que pessoas leiam esses dados, exceto: (a) com o consentimento afirmativo do cliente para uma situação específica, (b) quando necessário por razões de segurança, como investigar abuso, (c) para cumprir lei aplicável ou (d) quando os dados forem agregados e anonimizados para operações internas.',
        ] },
      ],
    },
    {
      title: '7. Compartilhamento',
      blocks: [
        'Os dados do Google só são compartilhados com terceiros quando necessário para prestar o serviço ao cliente, para cumprir a lei ou em operação societária, sempre respeitando os requisitos de Uso Limitado. Isso inclui provedores de infraestrutura que hospedam a plataforma e, de forma transitória e restrita à tarefa, o provedor de IA usado pelo agente, conforme a seção 5.',
      ],
    },
    {
      title: '8. Armazenamento e segurança',
      blocks: [
        'As credenciais da integração (e-mail da conta de serviço, chave privada e identificador da agenda) ficam armazenadas no banco de dados da plataforma, vinculadas à conta do cliente, e são usadas somente pelos sistemas do Lemify para chamar a API do Google. O acesso é restrito e protegido por controles de segurança descritos na Política de Privacidade e na página Segurança e LGPD. A comunicação com o Google é feita por conexão criptografada (HTTPS/TLS).',
        'Os eventos da agenda permanecem no Google Calendar do cliente. A plataforma guarda apenas as informações de agendamento necessárias à operação do CRM e à agenda do Lemify (por exemplo, horário, nome do cliente atendido e identificador do evento).',
      ],
    },
    {
      title: '9. Retenção, revogação e exclusão',
      blocks: [
        'O cliente pode desativar a integração a qualquer momento, removendo as credenciais do Google nas Configurações da plataforma e, se desejar, removendo o compartilhamento da agenda com a conta de serviço no Google Calendar. Com isso, o Lemify deixa de acessar os dados.',
        `Ao remover as credenciais ou encerrar a conta, apagamos as credenciais do Google e os identificadores associados, em prazo razoável, ressalvadas obrigações legais. O cliente pode pedir a exclusão dos demais dados vinculados à integração pelo e-mail ${COMPANY.email}. Também é possível gerenciar permissões em https://myaccount.google.com/permissions.`,
      ],
    },
    {
      title: '10. Outros serviços do Google',
      blocks: [
        'A plataforma também pode usar modelos de IA do Google (Gemini) como provedor de IA, e o envio de e-mails por SMTP com senha de aplicativo, quando configurados pelo cliente. O tratamento desses dados segue a Política de Privacidade e os Termos de IA, e esses serviços não fazem parte do acesso a dados de usuário descrito nesta página.',
      ],
    },
    {
      title: '11. Contato',
      blocks: [
        `Dúvidas sobre esta divulgação ou pedidos relacionados aos dados do Google: ${COMPANY.email}, assunto "Privacidade/LGPD". ${COMPANY.name}, CNPJ ${COMPANY.cnpj}. Atualizamos esta página quando o uso das APIs mudar, e a data da última atualização aparece no topo.`,
      ],
    },
  ],
}
