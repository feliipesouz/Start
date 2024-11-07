import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="bg-white text-[#EF5DA8] min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Política de Privacidade</h1>
                <p className="text-gray-400 mb-8">Última atualização: 06 de Novembro de 2024</p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">1. Compromisso com a Privacidade</h2>
                    <p>
                        Estamos comprometidos em proteger sua privacidade e em garantir a segurança dos seus dados pessoais.
                        Esta Política de Privacidade explica de forma clara como seus dados são coletados, utilizados, armazenados e protegidos em nossa plataforma.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">2. Dados Coletados</h2>
                    <p>
                        Coletamos informações essenciais para garantir a qualidade dos nossos serviços:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li><strong>Informações Pessoais:</strong> Nome, data de início de celebrada, mensagem personalizada, fotos e endereço de email cadastrado.</li>
                        <li><strong>Informações de Pagamento:</strong> Email associado ao Stripe ou Mercado Pago para processar o pagamento e enviar o link da sua página personalizada.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">3. Uso das Informações</h2>
                    <p>Utilizamos suas informações para:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Processar pagamentos e enviar o link da sua página personalizada;</li>
                        <li>Criar e personalizar a página dos participantes com as informações fornecidas;</li>
                        <li>Melhorar nossos serviços e oferecer suporte ao cliente de forma personalizada e eficiente.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">4. Segurança dos Dados</h2>
                    <p>
                        Implementamos medidas de segurança rigorosas para proteger suas informações contra acessos, usos ou divulgações não autorizadas. Embora trabalhemos continuamente para garantir a proteção dos dados, nenhuma transmissão eletrônica é completamente segura e não podemos assegurar total segurança.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">5. Compartilhamento de Dados</h2>
                    <p>
                        Seus dados pessoais são confidenciais e não serão compartilhados com terceiros, exceto para processamento de pagamentos através de serviços confiáveis como o Stripe e Mercado Pago, ou quando exigido por lei.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">6. Retenção de Dados</h2>
                    <p>
                        Armazenamos suas informações apenas pelo tempo necessário para cumprir com as finalidades descritas nesta política ou conforme exigido por obrigações legais.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">7. Direitos do Usuário</h2>
                    <p>
                        Você possui direitos sobre os seus dados pessoais, incluindo acesso, correção e exclusão. Caso deseje exercer esses direitos, entre em contato pelo email: <a href="mailto:contato@voceeespecial.com.br" className="text-blue-400">contato@voceeespecial.com.br</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">8. Atualizações desta Política</h2>
                    <p>
                        Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias e atender a requisitos legais. A data da última atualização será ajustada no topo desta página. Recomendamos que você revise este documento regularmente para se manter informado sobre qualquer modificação.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">9. Fale Conosco</h2>
                    <p>
                        Se você tiver dúvidas, comentários ou preocupações sobre nossa Política de Privacidade, sinta-se à vontade para entrar em contato pelo email: <a href="mailto:contato@voceeespecial.com.br" className="text-blue-400">contato@voceeespecial.com.br</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
