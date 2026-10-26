import React, { useEffect } from 'react';
import './Terms.css';
import Header from '../../institutional/Header.jsx';
import '../../institutional/site.css';
import Footer from '../../institutional/Footer.jsx';
import step1 from '../../assets/bling/step1.gif'; // ajuste o caminho se necessário
import step2 from '../../assets/bling/step2.gif'; // ajuste o caminho se necessário
import step3 from '../../assets/bling/step3.gif'; // ajuste o caminho se necessário 

const BlingManual = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="terms-page inst">
            <Header scrolled={true} />

            <div className="terms-container">
                <h1>Manual de Integração Lemify & Bling</h1>

                <p>
                    Este manual descreve o passo a passo para integrar o <strong>Lemify</strong> com a sua conta no <strong>Bling ERP</strong>,
                    permitindo a sincronização de dados e automação de processos de atendimento.
                </p>

                <h2>1. Passos no Bling</h2>
                <p>Para iniciar a instalação pela Central de Extensões do Bling:</p>

                <ul>
                    <li>Faça login na sua conta do <strong>Bling</strong>.</li>

                    <li>
                        No menu superior, acesse <strong> Central de Extensões</strong>.
                    </li>

                    <li>Na barra de pesquisa, digite <strong>"Lemify"</strong>.</li>

                    <li>
                        Selecione o aplicativo e clique no botão <strong>Instalar Aplicativo</strong>.
                        <br />
                        <img
                            src={step1}
                            alt="Instalando o aplicativo Lemify no Bling"
                            className="manual-image"
                        />
                    </li>
                </ul>

                <h2>2. Autorização</h2>
                <p>Após iniciar a instalação, uma janela modal de autorização será aberta:</p>

                <ul>
                    <li>Reveja as permissões solicitadas pela integração.</li>
                    <li>
                        Clique em <strong>"Autorizar"</strong> para permitir que o Lemify acesse os dados necessários
                        (como pedidos e produtos) para o funcionamento da ferramenta.

                        <br />
                        <img
                            src={step2}
                            alt="Instalando o aplicativo Lemify no Bling"
                            className="manual-image"
                        />
                    </li>
                </ul>

                <h2>3. Passos Lemify</h2>

                <h3>Pré-requisitos</h3>
                <p>
                    Para concluir a vinculação, você precisará de uma conta ativa no Lemify.
                    Caso ainda não possua uma, acesse{" "}
                    <strong><a href="https://app.lemify.com.br/signup" target="_blank" rel="noreferrer">
                        app.lemify.com.br/signup
                    </a></strong>{" "}
                    para criar sua conta.
                </p>

                <a 
                    href="https://app.lemify.com.br/signup" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn--dark create-account-margin"
                >
                    Criar minha conta
                </a>

                <h3>Configuração Final</h3>

                <ul>
                    <li>
                        Acesse seu painel administrativo em{" "}
                        <a href="https://app.lemify.com.br" target="_blank" rel="noreferrer">
                            app.lemify.com.br
                        </a>.
                    </li>

                    <li>No menu lateral, navegue até a seção de <strong>Configurações &gt; Integrações</strong>.</li>

                    <li>
                        Localize o card do <strong>Bling</strong> e clique em <strong>"Integrar"</strong>.
                    </li>

                    <li>
                        Caso a autorização no Bling já tenha sido realizada com sucesso, o status da integração mudará para{" "}
                        <strong>"Ativo"</strong>.

                        <br />
                        <img
                            src={step3}
                            alt="Instalando o aplicativo Lemify no Bling"
                            className="manual-image"
                        />
                    </li>
                </ul>

                <h2>4. Utilização e Sincronização</h2>

                <p>
                    Com a integração ativa, o Lemify passa a operar de forma conjunta com o Bling das seguintes formas:
                </p>

                <ul>
                    <li>
                        <strong>Sincronização de Produtos:</strong> Os Produtos do Bling são enviados para o Lemify para facilitar o suporte dos seus atendentes e do nosso agente de IA.
                    </li>

                    <li>
                        <strong>Gestão de Contatos:</strong> Os Leads do Lemify são sincronizados com os seus contatos
                        do Bling.
                    </li>
                </ul>

                <p>
                    Para validar se a integração está funcionando corretamente, verifique se os produtos e leads do Bling
                    estão aparecendo na barra lateral de informações do contato dentro do Lemify.
                </p>

                <h2>5. Suporte</h2>

                <p>
                    Se você tiver dúvidas ou enfrentar dificuldades durante a instalação, nossa equipe está à disposição:
                </p>

                <ul>
                    <li><strong>E-mail:</strong> suporte@lemify.com.br</li>

                    <li>
                        <strong>WhatsApp:</strong>{" "}
                        <a href="https://wa.me/5511957839501" target="_blank" rel="noreferrer">
                            (11) 95783-9501
                        </a>
                    </li>

                    <li>
                        <strong>Horário de atendimento:</strong> Segunda a Sexta, das 09:00 às 18:00.
                    </li>
                </ul>

                <p style={{ marginTop: '40px', fontSize: '14px', opacity: 0.7 }}>
                    Data da última atualização: 13 de março de 2026.
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default BlingManual;