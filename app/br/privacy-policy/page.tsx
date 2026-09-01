'use client'

import NavbarPT from '@/components/pt/navbar-pt'
import FooterPT from '@/components/pt/footer-pt'

export default function PrivacyPolicyPagePT() {
  const handleCTAClick = () => {
    window.open('https://calendly.com/contact-mktforcontractors/90min', '_blank')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarPT onCTAClick={handleCTAClick} />

      {/* Main content */}
      <main className="flex-1 px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-[#667085]">
              Última atualização: 9 de julho de 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-[#0A0A0A]">
            <section>
              <p className="text-base leading-relaxed text-[#667085]">
                Marketing For Contractors ("nós", "nosso" ou "nossa") opera https://mktforcontractors.com (o "Site").
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                Esta Política de Privacidade explica como coletamos, usamos, armazenamos, compartilhamos e protegemos informações pessoais quando você visita nosso Site, envia um formulário, nos contacta ou usa nossos serviços.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">1. INFORMAÇÕES QUE COLETAMOS</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">As informações que você fornece diretamente podem incluir:</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#667085]">
                    <li>Nome</li>
                    <li>Nome da empresa</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone</li>
                    <li>URL do site</li>
                    <li>Serviços oferecidos</li>
                    <li>Orçamento mensal de publicidade</li>
                    <li>Conteúdo de mensagens</li>
                    <li>Qualquer outra informação que você enviar voluntariamente através de nossos formulários ou comunicações</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">As informações coletadas automaticamente podem incluir:</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#667085]">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador</li>
                    <li>Tipo de dispositivo</li>
                    <li>Sistema operacional</li>
                    <li>Páginas visualizadas</li>
                    <li>Fonte de referência</li>
                    <li>Localização aproximada</li>
                    <li>Data e hora das visitas</li>
                    <li>Interações com o site, incluindo envios de formulários, cliques em botões e visualizações de página</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">2. COMO USAMOS SUAS INFORMAÇÕES</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">Podemos usar suas informações para:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Responder a consultas e solicitações de parcerias</li>
                <li>Avaliar se nossos serviços podem ser adequados para seu negócio</li>
                <li>Contactá-lo sobre sua consulta, proposta, integração ou serviços</li>
                <li>Agendar reuniões ou consultas</li>
                <li>Fornecer serviços de marketing, consultoria e relacionados</li>
                <li>Melhorar nosso Site, ofertas, conteúdo e experiência do usuário</li>
                <li>Medir o desempenho de publicidade e site</li>
                <li>Proteger nosso Site e negócio contra fraude, abuso ou ameaças de segurança</li>
                <li>Cumprir obrigações legais, fiscais e regulatórias</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4 font-semibold">Não vendemos suas informações pessoais.</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">3. COMUNICAÇÕES DE MARKETING</h2>
              <p className="text-base leading-relaxed text-[#667085]">
                Quando você envia informações através de nosso Site, você pode receber comunicações comerciais da Marketing For Contractors por email, telefone, mensagem de texto ou outros canais relevantes regarding sua consulta ou nossos serviços.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-3">
                Você pode cancelar emails de marketing a qualquer momento clicando no link de desinscrição incluído no email ou entrando em contato conosco em contact@mktforcontractors.com.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">4. COOKIES, ANÁLISES E TECNOLOGIAS DE PUBLICIDADE</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Podemos usar cookies, ferramentas de análise, rastreamento de conversão, pixels e tecnologias similares para compreender o uso do Site e medir o desempenho de marketing.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mb-3 font-semibold">Estas ferramentas podem incluir:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Google Analytics</li>
                <li>Google Tag Manager</li>
                <li>Rastreamento de conversão do Google Ads</li>
                <li>Meta Pixel</li>
                <li>LinkedIn Insight Tag</li>
                <li>Rastreamento Microsoft Advertising / Bing</li>
                <li>Ferramentas de rastreamento de chamadas</li>
                <li>Plataformas CRM</li>
                <li>Ferramentas de processamento de formulários e agendamento</li>
                <li>Ferramentas de email marketing e automação</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                Estas tecnologias podem coletar informações como visitas de página, fonte de tráfego, informações de dispositivo, informações de navegador e ações realizadas em nosso Site.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-3">
                Você pode gerenciar ou bloquear cookies através das configurações do seu navegador. Desabilitar cookies pode afetar certas funcionalidades do Site.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">5. COMO COMPARTILHAMOS INFORMAÇÕES</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Podemos compartilhar informações pessoais apenas quando razoavelmente necessário para operar nosso negócio, fornecer serviços ou cumprir obrigações legais.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mb-3 font-semibold">Isto pode incluir prestadores de serviços confiáveis como:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Provedores de hospedagem e infraestrutura do site</li>
                <li>Plataformas CRM e de vendas</li>
                <li>Plataformas de análise e publicidade</li>
                <li>Ferramentas de email, agendamento e comunicações</li>
                <li>Ferramentas de processamento de formulários</li>
                <li>Consultores profissionais, incluindo contadores e consultores jurídicos</li>
                <li>Autoridades governamentais ou outras partes quando exigido por lei</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4 font-semibold">
                Não vendemos, alugamos ou comercializamos informações pessoais para terceiros.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">6. RETENÇÃO DE DADOS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">Retemos informações pessoais apenas pelo tempo razoavelmente necessário para:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Responder a consultas</li>
                <li>Gerenciar relacionamentos comerciais</li>
                <li>Fornecer serviços</li>
                <li>Manter registros comerciais</li>
                <li>Resolver disputas</li>
                <li>Cumprir obrigações legais, fiscais ou regulatórias</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                Quando as informações pessoais não forem mais necessárias, podemos deletá-las, anonimizá-las ou retê-las com segurança conforme exigido pela lei aplicável.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">7. SEGURANÇA DE DADOS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Usamos medidas administrativas, técnicas e organizacionais razoáveis projetadas para proteger informações pessoais de acesso não autorizado, perda, uso indevido, alteração ou divulgação.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                No entanto, nenhuma transmissão pela internet, site ou sistema de armazenamento é completamente seguro. Por favor, não envie informações altamente sensíveis através do Site, a menos que especificamente solicitado através de um canal seguro.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">8. TRANSFERÊNCIAS INTERNACIONAIS DE DADOS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Nossos prestadores de serviços podem processar ou armazenar informações em países diferentes do seu país de residência.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                Quando aplicável, tomamos medidas razoáveis para garantir que as transferências internacionais de dados sejam tratadas em conformidade com as leis de proteção de dados aplicáveis.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">9. SEUS DIREITOS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Dependendo de sua localização e da lei aplicável, você pode ter o direito de:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Solicitar acesso a suas informações pessoais</li>
                <li>Solicitar correção de informações imprecisas ou incompletas</li>
                <li>Solicitar a exclusão de informações pessoais</li>
                <li>Solicitar restrição de certas atividades de processamento</li>
                <li>Objetar a certos usos de suas informações</li>
                <li>Retirar consentimento onde o processamento é baseado em consentimento</li>
                <li>Solicitar informações sobre como seus dados são usados ou compartilhados</li>
                <li>Optar por não receber comunicações de marketing</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                Para fazer uma solicitação, contacte-nos em contact@mktforcontractors.com.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-3">
                Podemos precisar verificar sua identidade antes de processar certas solicitações.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">10. LINKS DE TERCEIROS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Nosso Site pode incluir links para sites, plataformas ou serviços de terceiros. Não somos responsáveis pelas práticas de privacidade, segurança ou conteúdo desses sites de terceiros.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                Recomendamos revisar a política de privacidade de qualquer site de terceiros que você visitar.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">11. PRIVACIDADE DE CRIANÇAS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Nosso Site e serviços são destinados a proprietários de negócios e profissionais. Não são direcionados a crianças menores de 13 anos.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                Não coletamos knowingly informações pessoais de crianças menores de 13 anos. Se você acredita que uma criança forneceu informações pessoais através de nosso Site, contacte-nos para que possamos tomar as ações apropriadas.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">12. ALTERAÇÕES NESTA POLÍTICA</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Podemos atualizar esta Política de Privacidade de tempos em tempos.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                Quando fazemos alterações, atualizaremos a data de "Última atualização" no topo desta página. Seu uso contínuo do Site após uma política atualizada ter sido postada significa que você aceita a política revisada.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">13. CONTACTE-NOS</h2>
              <div className="bg-[#F4F6F8] border border-[#D0D5DD] p-6 rounded">
                <p className="text-base text-[#0A0A0A]">
                  <span className="font-semibold">Marketing For Contractors</span><br />
                  HOTWAY TECH & ART LTDA<br />
                  Conselheiro Lafaiete, MG - Brasil<br />
                  <span className="font-semibold">Email:</span> contact@mktforcontractors.com<br />
                  <span className="font-semibold">Site:</span> https://mktforcontractors.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <FooterPT />
    </div>
  )
}
