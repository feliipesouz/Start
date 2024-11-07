import React from 'react';

export default function TermsOfUse() {
    return (
        <div className="bg-white text-[#EF5DA8] min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Termos de Uso</h1>
                <p className="text-gray-400 mb-8">Última atualização: 07 de Setembro de 2024</p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">1. Aceitação dos Termos</h2>
                    <p>
                        Ao acessar e utilizar nossa plataforma, você expressa sua concordância com estes Termos de Uso.
                        Caso não concorde com alguma das disposições aqui descritas, recomendamos que interrompa o uso da plataforma.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">2. Descrição do Serviço</h2>
                    <p>
                        Nossa plataforma permite a criação de uma página personalizada, onde pessoas podem compartilhar uma
                        mensagem, registrar a data de início celebrada e incluir até 8 fotos. Após o preenchimento
                        do formulário, o usuário é redirecionado ao checkout e, após a confirmação do pagamento, recebe um
                        link com um QR Code para acessar a página personalizada via email.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">3. Cadastro e Segurança</h2>
                    <p>
                        Para utilizar o serviço, é necessário fornecer um endereço de email válido, que será utilizado para
                        fins de envio do link da página personalizada. Comprometemo-nos a não compartilhar ou vender seu
                        email a terceiros.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">4. Privacidade</h2>
                    <p>
                        Respeitamos sua privacidade. As informações que você fornece são usadas exclusivamente para criar
                        e enviar a página personalizada e não são compartilhadas para outros fins. Detalhes adicionais
                        sobre como tratamos seus dados estão disponíveis em nossa <a href="/privacy-policy" className="text-blue-400">Política de Privacidade</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">5. Conteúdo do Usuário</h2>
                    <p>
                        O conteúdo que você insere na plataforma, incluindo fotos, mensagens e informações pessoais, é de
                        sua exclusiva responsabilidade. A plataforma não se responsabiliza por materiais impróprios,
                        ofensivos ou ilegais carregados pelos usuários. Reservamo-nos o direito de remover ou moderar
                        conteúdos que violem estes termos.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">6. Pagamentos e Reembolsos</h2>
                    <p>
                        Os pagamentos são processados com segurança através do Stripe ou Mercado Pago. Após a confirmação do pagamento, o
                        link para a página personalizada será enviado por email. Em geral, não oferecemos reembolsos,
                        exceto em situações excepcionais, que serão analisadas a nosso exclusivo critério.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">7. Modificações no Serviço</h2>
                    <p>
                        Trabalhamos para manter o serviço ativo e disponível conforme o plano contratado (30 dias ano no plano básico, 1 ano no plano médio
                        e vitalício no plano vitalício). Contudo, em situações extraordinárias que fujam ao nosso controle, como
                        questões técnicas, legais ou financeiras, podemos modificar ou descontinuar o serviço. Nesses casos,
                        nos esforçaremos para notificar os usuários com antecedência e oferecer alternativas viáveis sempre que possível.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">8. Limitação de Responsabilidade</h2>
                    <p>
                        Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais ou consequenciais
                        resultantes do uso ou incapacidade de uso da plataforma. Nosso objetivo é fornecer um serviço estável,
                        mas não garantimos funcionamento ininterrupto em todas as situações.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">9. Alterações nos Termos</h2>
                    <p>
                        Estes Termos de Uso podem ser atualizados ocasionalmente para refletir mudanças no serviço ou em
                        conformidade com requisitos legais. A data da última atualização estará sempre indicada no topo da página.
                        Recomendamos que consulte periodicamente esta seção para estar informado sobre as mudanças.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">10. Contato</h2>
                    <p>
                        Caso tenha dúvidas ou precise de mais informações sobre nossos Termos de Uso, entre em contato
                        através do email: <a href="mailto:contato@voceeespecial.com.br" className="text-blue-400">contato@voceeespecial.com.br</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
