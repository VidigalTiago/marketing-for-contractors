import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import NavbarPTCTAWrapper from '@/components/blog/navbar-pt-cta-wrapper'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import TableOfContents from '@/components/blog/table-of-contents'
import EndArticleCTA from '@/components/blog/end-article-cta'
import FAQSection from '@/components/blog/faq-section'
import RelatedArticles from '@/components/blog/related-articles'
import ReadingProgress from '@/components/blog/reading-progress'
import InlineCTA from '@/components/blog/inline-cta'
import CalloutBox from '@/components/blog/callout-box'
import { SITE_URL, getRelatedArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Google Ads vs Local Services Ads para Contractors',
  description:
    'Compare Google Ads e Local Services Ads para general contractors e entenda as diferenças de custo, leads, controle, elegibilidade e resultados.',
  alternates: {
    canonical: `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
    languages: {
      'pt-BR': `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
      'en-US': `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
    },
  },
  openGraph: {
    title: 'Google Ads vs Local Services Ads para Contractors',
    description:
      'Compare Google Ads e Local Services Ads para general contractors e entenda as diferenças de custo, leads, controle, elegibilidade e resultados.',
    url: `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
    type: 'article',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads vs Local Services Ads para Contractors',
    description:
      'Compare Google Ads e Local Services Ads para general contractors e entenda as diferenças de custo, leads, controle, elegibilidade e resultados.',
  },
}

const tocItems = [
  { id: 'diferenca', label: 'Qual É a Diferença?', level: 2 as const },
  { id: 'como-search-ads-funciona', label: 'Como o Google Search Ads Funciona', level: 2 as const },
  { id: 'como-lsa-funciona', label: 'Como o Local Services Ads Funciona', level: 2 as const },
  { id: 'modelo-cobranca', label: 'Modelo de Cobrança', level: 2 as const },
  { id: 'controle', label: 'Qual Oferece Mais Controle?', level: 2 as const },
  { id: 'qualidade-leads', label: 'Leads Mais Qualificados', level: 2 as const },
  { id: 'por-servico', label: 'Por Tipo de Serviço', level: 2 as const },
  { id: 'alto-ticket', label: 'Projetos de Alto Ticket', level: 2 as const },
  { id: 'usar-os-dois', label: 'Usando os Dois ao Mesmo Tempo', level: 2 as const },
  { id: 'comecar-google-ads', label: 'Quando Começar pelo Google Ads', level: 2 as const },
  { id: 'comecar-lsa', label: 'Quando Começar pelo LSA', level: 2 as const },
  { id: 'erros-comuns', label: 'Erros Comuns', level: 2 as const },
  { id: 'comparar-resultados', label: 'Como Comparar os Resultados', level: 2 as const },
  { id: 'qual-e-melhor', label: 'Qual É Melhor?', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const faqItems = [
  {
    question: 'O Local Services Ads está disponível para general contractors?',
    answer:
      'O Local Services Ads está disponível em muitos mercados dos EUA para general contractors, mas a elegibilidade depende da sua localização, categoria de serviço e políticas atuais do Google. Nem todo mercado ou categoria é coberto, e o Google pode exigir verificação de negócio, background check e documentação de licenças antes de ativar seus anúncios. Verifique a ferramenta de elegibilidade do LSA no Google Ads para confirmar a disponibilidade na sua área.',
  },
  {
    question: 'Google Ads ou Local Services Ads é mais barato?',
    answer:
      'Nenhuma das plataformas é automaticamente mais barata. O Google Ads cobra por clique e o Local Services Ads cobra por lead. Um custo por lead menor no LSA não significa um custo por oportunidade qualificada menor se uma grande parte desses leads estiver fora do escopo, for muito pequena ou não responder. A comparação correta é custo por lead qualificado, custo por orçamento e custo por projeto assinado — não custo por clique ou custo por lead bruto.',
  },
  {
    question: 'O Local Services Ads cobra por clique?',
    answer:
      'Não. O Local Services Ads cobra por lead, não por clique. Quando um homeowner liga ou envia mensagem pelo seu anúncio LSA, o Google cobra esse lead da sua conta. Você pode contestar leads que não atendam aos critérios de elegibilidade — como ligações fora da sua área de atendimento ou para serviços que você não oferece — mas nem toda contestação resulta em crédito.',
  },
  {
    question: 'Contractors podem usar Google Ads e Local Services Ads ao mesmo tempo?',
    answer:
      'Sim. Muitos contractors operam as duas plataformas simultaneamente. O LSA pode capturar demanda local direta de buscas elegíveis, enquanto o Google Search Ads oferece maior controle sobre palavras-chave, landing pages e segmentação de campanhas. Usar as duas não garante resultados maiores, mas quando gerenciado corretamente e rastreado separadamente, permite comparar custo por lead qualificado e receita assinada por fonte e alocar o orçamento para o que está gerando resultado.',
  },
  {
    question: 'Um contractor precisa de Google Business Profile para LSA?',
    answer:
      'Sim. Um Google Business Profile verificado é um pré-requisito para o Local Services Ads. O Google conecta seu anúncio LSA ao seu Business Profile, que é como suas avaliações aparecem no anúncio. Um Google Business Profile completo, preciso e com boas avaliações melhora seu ranking e taxa de conversão no LSA.',
  },
  {
    question: 'Qual plataforma é melhor para contractors de reforma?',
    answer:
      'As duas plataformas podem funcionar para contractors de reforma. O Local Services Ads pode estar disponível para remodelação de cozinha, banheiro e outras categorias residenciais comuns dependendo da sua localização. O Google Search Ads geralmente oferece mais controle para contractors que rodam campanhas especializadas por serviço, tipo de projeto ou localização. Muitas empresas de reforma consolidadas usam as duas e rastreiam separadamente.',
  },
  {
    question: 'O Local Services Ads é bom para projetos grandes de construção?',
    answer:
      'O LSA pode gerar contatos para projetos grandes, mas a plataforma não foi desenvolvida para qualificação de projetos de alto valor. O formato do lead — uma ligação ou mensagem — não inclui informações de orçamento, prazo ou escopo. Para reformas completas, construções personalizadas ou adições onde o encaixe do projeto e a qualificação do orçamento são críticos, o Google Search Ads com landing pages qualificadoras geralmente oferece mais controle sobre o tipo de prospect que entra em contato.',
  },
  {
    question: 'Como contractors devem rastrear leads das duas plataformas?',
    answer:
      'Use rastreamento separado para cada fonte. Atribua números de call tracking exclusivos ao seu anúncio LSA e às suas landing pages do Google Ads. Registre cada lead no CRM com a fonte original. Acompanhe taxa de lead qualificado, taxa de agendamento, taxa de orçamento, taxa de fechamento, valor médio de projeto e receita assinada separadamente para cada plataforma. A comparação principal deve ser custo por projeto assinado e lucro bruto por fonte — não volume de leads.',
  },
]

const relatedArticles = getRelatedArticles('google-ads-vs-local-services-ads', 'pt-BR')

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      headline: 'Google Ads vs Local Services Ads para General Contractors',
      description:
        'Compare Google Ads e Local Services Ads para general contractors e entenda as diferenças de custo, leads, controle, elegibilidade e resultados.',
      image: `${SITE_URL}/blog/google-ads-vs-lsa-contractors-hero.jpg`,
      datePublished: '2025-08-01',
      dateModified: '2025-08-01',
      inLanguage: 'pt-BR',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Marketing For Contractors',
        url: SITE_URL,
      },
      keywords: [
        'Google Ads vs Local Services Ads para contractors',
        'LSA para general contractors',
        'Google Ads para contractors',
        'leads para general contractors',
        'marketing para contractors nos EUA',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/br` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/br/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Google Ads vs Local Services Ads para General Contractors',
          item: `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
}

export default function GoogleAdsVsLSAArtigoPT() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <AnnouncementBanner />
      <NavbarPTCTAWrapper />

      <main id="main-content" className="flex-1 pt-28 pb-20">
        <a
          href="#article-body"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1565D8] focus:border focus:border-[#1565D8]"
        >
          Ir para o conteúdo
        </a>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Início', href: '/br' },
            { label: 'Blog', href: '/br/blog' },
            { label: 'Google Ads vs Local Services Ads para General Contractors' },
          ]} />

          {/* Header */}
          <header className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Google Ads
              </span>
              <span className="text-[#D0D5DD]">·</span>
              <span className="text-[10px] text-[#667085]">16 min de leitura</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance leading-[1.05] mb-4">
              Google Ads vs Local Services Ads para General Contractors
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed max-w-2xl">
              Compare Google Search Ads e Local Services Ads para entender qual plataforma oferece a melhor combinação de alcance, controle, qualidade dos leads e rentabilidade para sua empresa de construção.
            </p>
            <div className="flex items-center gap-4 mt-4 text-[11px] text-[#D0D5DD]">
              <span>Publicado em 1 de agosto de 2025</span>
              <span>·</span>
              <span>Atualizado em 1 de agosto de 2025</span>
            </div>
          </header>

          {/* Featured image placeholder */}
          <div
            className="w-full h-56 lg:h-80 bg-[#0A0A0A] blueprint-grid-dark flex items-center justify-center mb-10 max-w-3xl"
            role="img"
            aria-label="Comparação entre Google Ads e Local Services Ads para general contractors"
          >
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              Google Ads vs Local Services Ads para General Contractors
            </span>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-12 lg:gap-16 items-start">
            {/* Article */}
            <article id="article-body" className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile ToC only */}
              <TableOfContents items={tocItems} locale="pt-BR" variant="mobile" />

              <div className="space-y-10 text-[#0A0A0A]">

                {/* Intro */}
                <section aria-labelledby="h2-intro">
                  <p className="text-[#667085] leading-relaxed">
                    Tanto o Google Search Ads quanto o Local Services Ads podem colocar um general contractor na frente de homeowners com alta intenção de contratar em sua área. Mas as duas plataformas funcionam de formas diferentes, têm modelos de cobrança diferentes e exigem níveis distintos de verificação, gestão de campanha e rastreamento de resultados.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O Search Ads cobra por clique. O Local Services Ads cobra por lead. A elegibilidade para LSA varia por categoria de serviço e localização — nem todo contractor em todo mercado pode rodá-lo. E a escolha certa depende dos seus serviços, mercado, orçamento, valor dos projetos, exigências de qualidade dos leads, processo de vendas e capacidade de rastrear resultados com precisão.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Este guia compara as duas plataformas nos fatores que mais importam para um general contractor tomando uma decisão real de publicidade. Para entender a fundo como funciona o <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">marketing para general contractors nos Estados Unidos</Link>, consulte também o guia completo de estratégia de marketing para contractors.
                  </p>
                </section>

                {/* 1 */}
                <section id="diferenca" aria-labelledby="h2-diferenca">
                  <h2 id="h2-diferenca" className="text-2xl font-extrabold tracking-tight mb-4">
                    Qual É a Diferença Entre Google Ads e Local Services Ads?
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-6">
                    O Google Search Ads são anúncios de texto pay-per-click que aparecem nos resultados de busca padrão. Você escolhe palavras-chave, escreve os anúncios, cria landing pages e paga cada vez que um homeowner clica no seu anúncio. O Local Services Ads é um produto separado que aparece acima dos anúncios tradicionais. Ele exibe o nome da empresa, avaliação e um botão de ligação ou mensagem. Você paga por lead — ou seja, por ligação ou mensagem — e não por clique.
                  </p>

                  {/* Comparison table */}
                  <div className="overflow-x-auto -mx-2 px-2">
                    <table className="w-full min-w-[560px] text-sm border-collapse">
                      <caption className="sr-only">Tabela comparativa: Google Ads vs Local Services Ads</caption>
                      <thead>
                        <tr className="bg-[#0A0A0A] text-white">
                          <th scope="col" className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest w-[28%]">
                            Fator
                          </th>
                          <th scope="col" className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest w-[36%]">
                            Google Search Ads
                          </th>
                          <th scope="col" className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest w-[36%]">
                            Local Services Ads
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Posicionamento', 'Topo dos resultados de busca (rotulado "Patrocinado")', 'Acima dos anúncios de busca — bloco separado "Local Services"'],
                          ['Modelo de cobrança', 'Por clique (CPC)', 'Por lead (ligação ou mensagem)'],
                          ['Controle de palavras-chave', 'Controle total — correspondência exata, frase, ampla', 'Sem seleção direta de palavras-chave'],
                          ['Controle de landing page', 'Controle total', 'Sem landing page personalizada — perfil hospedado pelo Google'],
                          ['Elegibilidade', 'Qualquer empresa com conta Google Ads', 'Deve atender requisitos de localização, categoria e verificação'],
                          ['Verificação', 'Sem verificação obrigatória da empresa', 'Verificação de empresa e licenças obrigatória'],
                          ['Entrega do lead', 'Clique para seu site ou landing page', 'Ligação ou mensagem direta'],
                          ['Segmentação geográfica', 'Raio preciso, CEP ou cidade', 'Área de atendimento definida no perfil LSA'],
                          ['Controle de orçamento', 'Controle diário/campanha completo', 'Orçamento semanal com menos granularidade'],
                          ['Relatórios', 'Dados detalhados de palavras-chave, anúncios e conversões', 'Relatórios de leads; dados limitados no nível de palavras-chave'],
                          ['Melhor uso', 'Serviços especializados, projetos de alto valor, testes', 'Categorias elegíveis com boas avaliações e resposta rápida'],
                        ].map(([fator, search, lsa], i) => (
                          <tr key={fator} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]'}>
                            <td className="px-4 py-3 font-semibold text-[#0A0A0A] text-xs align-top border-b border-[#F4F6F8]">
                              {fator}
                            </td>
                            <td className="px-4 py-3 text-[#667085] text-xs align-top border-b border-[#F4F6F8]">
                              {search}
                            </td>
                            <td className="px-4 py-3 text-[#667085] text-xs align-top border-b border-[#F4F6F8]">
                              {lsa}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 2 */}
                <section id="como-search-ads-funciona" aria-labelledby="h2-como-search-ads-funciona">
                  <h2 id="h2-como-search-ads-funciona" className="text-2xl font-extrabold tracking-tight mb-4">
                    Como o Google Search Ads Funciona para General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    As campanhas do Google Search Ads funcionam por meio de um leilão de palavras-chave. Quando um homeowner pesquisa um termo que corresponde às suas palavras-chave — por exemplo, "contractor para adição de quarto perto de mim" — o Google realiza um leilão instantâneo entre todos os anunciantes que segmentam essa busca. A posição do seu anúncio depende do seu lance e do seu Quality Score, que reflete a relevância do anúncio e da landing page em relação à pesquisa.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Você paga quando alguém clica no seu anúncio, não quando ele aparece. O clique leva o homeowner para uma landing page que você controla. É lá que a conversão do lead acontece — por meio de um formulário, número de telefone ou chat. Você define quais palavras-chave ativam seus anúncios, quais tipos de correspondência usar, quais pesquisas excluir com palavras-chave negativas, quanto licitar, como segmentar campanhas por serviço ou localização e qual landing page cada anúncio envia o tráfego.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O rastreamento de conversões conecta o Google Ads às submissões de formulários e ligações que acontecem na sua landing page, permitindo otimizar em direção a ações reais de lead em vez de apenas tráfego. Para uma análise completa de como configurar e gerenciar Google Ads como contractor, consulte o{' '}
                    <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      guia completo de Google Ads para general contractors
                    </Link>.
                  </p>
                  <CalloutBox type="info" label="Distinção importante">
                    <p>O Google Search Ads oferece controle direto sobre cada camada da campanha — palavras-chave, anúncios, landing pages, lances, orçamento, segmentação e rastreamento. Esse controle também significa mais complexidade. Campanhas mal configuradas e sem otimização regular tendem a desperdiçar orçamento.</p>
                  </CalloutBox>
                </section>

                {/* 3 */}
                <section id="como-lsa-funciona" aria-labelledby="h2-como-lsa-funciona">
                  <h2 id="h2-como-lsa-funciona" className="text-2xl font-extrabold tracking-tight mb-4">
                    Como o Local Services Ads Funciona para General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    O Local Services Ads é um produto do Google projetado para conectar empresas locais de serviços a clientes próximos. Ele aparece acima dos anúncios de pesquisa tradicionais em um bloco dedicado, exibindo o nome da empresa, avaliação e uma opção de contato — geralmente um botão de ligação ou mensagem.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A elegibilidade depende da sua localização, categoria de serviço e das políticas atuais do Google. A categoria de general contractor é elegível em muitos mercados dos EUA, mas não em todos. Antes de rodar o LSA, você precisa concluir um processo de verificação que pode incluir documentação de licença, comprovação de seguro e, em alguns casos, verificação de antecedentes dos proprietários ou funcionários da empresa. Os requisitos de elegibilidade, verificação e recursos disponíveis podem variar por localização, categoria e políticas atuais do Google.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Seu perfil LSA se conecta ao seu Google Business Profile. As avaliações exibidas no seu anúncio LSA vêm do seu Google Business Profile, o que significa que um perfil com boas avaliações afeta diretamente o desempenho do anúncio. Você define suas áreas de atendimento e os tipos de trabalho que aceita. Quando um homeowner entra em contato por meio do LSA, o Google cobra esse lead da sua conta.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A gestão dos leads acontece dentro da plataforma LSA. Você pode marcar leads como agendados, arquivados ou contestados. Se um lead não se qualifica — por exemplo, uma ligação de fora da sua área de atendimento ou para um serviço que você não oferece — você pode contestar, mas a decisão do Google sobre emitir crédito não é garantida.
                  </p>
                  <CalloutBox type="warning" label="Não presuma elegibilidade">
                    <p>Nem todo general contractor em todo mercado é elegível para LSA. A disponibilidade varia por localização e categoria, e o Google pode alterar a cobertura ao longo do tempo. Verifique a elegibilidade atual na sua conta do Google Ads antes de incluir o LSA no seu plano de publicidade.</p>
                  </CalloutBox>
                </section>

                {/* 4 */}
                <section id="modelo-cobranca" aria-labelledby="h2-modelo-cobranca">
                  <h2 id="h2-modelo-cobranca" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads: Modelo de Cobrança
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    O Google Search Ads cobra por clique. Você paga quando um homeowner clica no seu anúncio e acessa sua página — independentemente de preencher um formulário ou ligar. Uma campanha bem otimizada com uma landing page de alta conversão transforma uma grande porcentagem desses cliques em leads. Uma campanha mal configurada paga por cliques que nunca convertem.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O Local Services Ads cobra por lead. Você paga quando um homeowner liga ou envia mensagem diretamente pelo anúncio. Isso pode parecer mais direto porque você está pagando apenas por um contato real — não por uma visita ao seu site. Mas pagar por lead não torna o LSA automaticamente mais lucrativo.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Um lead do LSA ainda pode ser:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm">
                    {[
                      'Fora do escopo dos seus projetos',
                      'Pequeno demais para valer o seu tempo',
                      'Fora da sua área de atendimento real',
                      'De um homeowner que está apenas coletando orçamentos sem intenção imediata',
                      'Difícil de contatar após a ligação inicial',
                      'Com pouca probabilidade de fechar no seu preço',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A questão não é qual plataforma cobra menos por lead bruto. A questão é qual plataforma produz menor custo por lead qualificado, por orçamento, por projeto assinado e por real de lucro bruto. Essa comparação exige rastrear as duas plataformas no CRM — não apenas contar leads no topo do funil.
                  </p>
                </section>

                {/* 5 */}
                <section id="controle" aria-labelledby="h2-controle">
                  <h2 id="h2-controle" className="text-2xl font-extrabold tracking-tight mb-4">
                    Qual Plataforma Oferece Mais Controle?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    O Google Search Ads oferece controle direto substancialmente maior sobre a sua publicidade. Você escolhe as palavras-chave exatas que ativam seus anúncios, os tipos de correspondência, as palavras-chave negativas para bloquear pesquisas irrelevantes, o texto dos anúncios, a landing page que recebe cada clique, a estratégia de lances, o orçamento diário, o raio geográfico e os sinais de público. Você pode segmentar campanhas por tipo de serviço, categoria de projeto, localização ou período do ano. Para um guia detalhado sobre seleção de keywords, tipos de correspondência e palavras-chave negativas, consulte o{' '}
                    <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de melhores palavras-chave de Google Ads para general contractors</Link>.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O Local Services Ads é mais simples. Você define suas áreas de atendimento e tipos de trabalho. Define um orçamento semanal. O Google determina quando e onde seu anúncio aparece com base no seu perfil, avaliações e tempo de resposta. Você não pode escolher as pesquisas específicas que ativam seu anúncio, escrever textos personalizados ou enviar tráfego para uma landing page. A simplicidade pode ser uma vantagem para um contractor que quer um canal de lead direto com menos gestão, mas também significa menos controle sobre quem vê seu anúncio e quem entra em contato.
                  </p>
                  <CalloutBox type="info" label="Simplicidade não é automaticamente boa ou ruim">
                    <p>A menor carga de gestão do LSA é útil se você tem um Google Business Profile sólido, avaliações competitivas e tempos de resposta rápidos. Mas controle reduzido significa menos capacidade de filtrar leads qualificados antes de chegarem até você.</p>
                  </CalloutBox>
                </section>

                {/* 6 */}
                <section id="qualidade-leads" aria-labelledby="h2-qualidade-leads">
                  <h2 id="h2-qualidade-leads" className="text-2xl font-extrabold tracking-tight mb-4">
                    Qual Plataforma Gera Leads Mais Qualificados?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    A qualidade dos leads não é determinada apenas pela plataforma. Ela é determinada pela combinação de intenção de busca, decisões de segmentação, qualificação na landing page, configuração dos tipos de trabalho, precisão da área de atendimento e seu processo de vendas após o lead chegar. As duas plataformas podem gerar leads de alta qualidade — e as duas podem gerar leads de baixa qualidade — dependendo de como são configuradas e gerenciadas.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O volume de leads reportado não é suficiente para avaliar nenhuma das plataformas. As métricas que importam são:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm">
                    {[
                      'Taxa de lead qualificado — qual porcentagem dos leads totais atende aos seus critérios de projeto',
                      'Taxa de agendamento — qual porcentagem dos leads qualificados agenda uma visita ou consulta',
                      'Taxa de orçamento — qual porcentagem dos agendamentos recebe um orçamento formal',
                      'Taxa de fechamento — qual porcentagem dos orçamentos se torna contrato assinado',
                      'Valor médio de projeto — quanto vale o projeto médio assinado',
                      'Receita assinada por fonte — receita total atribuível a cada plataforma',
                      'Lucro bruto por fonte — receita menos custos diretos do projeto, por plataforma',
                      'Custo de aquisição de cliente — gasto total em anúncios dividido pelo número de projetos assinados',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Uma plataforma que gera 30 leads por mês com 20% de taxa de qualificação e 30% de fechamento produz 1,8 projetos assinados. Uma que gera 10 leads com 70% de qualificação e 50% de fechamento produz 3,5 projetos. Volume isolado não conta a história completa.
                  </p>
                </section>

                <InlineCTA
                  headline="Qual Canal Está Realmente Gerando Projetos Lucrativos?"
                  body="Conectamos Google Ads, Local Services Ads, call tracking, CRM e contratos fechados para mostrar quais campanhas estão gerando oportunidades qualificadas e projetos lucrativos."
                  buttonLabel="Solicitar uma Análise Gratuita"
                  locale="pt-BR"
                />

                {/* 7 */}
                <section id="por-servico" aria-labelledby="h2-por-servico">
                  <h2 id="h2-por-servico" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads por Tipo de Serviço
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    A comparação muda dependendo da categoria de serviço. O Local Services Ads tende a funcionar melhor para serviços com alta demanda local consistente — categorias onde homeowners buscam frequentemente com intenção clara e onde avaliações e tempo de resposta rápidos impulsionam a conversão. Remodelação de cozinha, banheiro e roofing podem se enquadrar nessa categoria em muitos mercados onde o LSA está disponível.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O Google Search Ads tende a oferecer mais vantagem para serviços com tipos de projeto específicos e bem definidos — adições, construção de ADU, casas personalizadas, remodelação de porão ou reformas grandes, onde segmentação por palavra-chave, mensagem na landing page e qualificação do projeto têm papel maior em atrair o lead certo.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Isso não é uma regra absoluta. Um contractor que roda LSA para remodelação de cozinha em um mercado com boa cobertura, excelentes avaliações e resposta rápida pode superar uma campanha de Google Ads mal gerenciada para o mesmo serviço. A qualidade da execução importa tanto quanto a escolha da plataforma.
                  </p>
                </section>

                {/* 8 */}
                <section id="alto-ticket" aria-labelledby="h2-alto-ticket">
                  <h2 id="h2-alto-ticket" className="text-2xl font-extrabold tracking-tight mb-4">
                    Qual É Melhor para Projetos de Alto Ticket?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Para contractors focados em reformas completas, adições, construções personalizadas, ADUs grandes ou reformas de alto padrão, a qualificação do lead se torna a preocupação dominante. O desafio não é gerar leads suficientes — é gerar leads onde o escopo do projeto, orçamento, localização, prazo e prontidão do tomador de decisão se alinham com o que você constrói.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O Google Search Ads, combinado com landing pages dedicadas que abordam requisitos de projeto e expectativas de orçamento, oferece mais capacidade de filtrar contatos antes de chegarem ao seu telefone. Você pode escrever textos de anúncio direcionados a homeowners planejando uma adição significativa. Pode construir uma landing page focada em projetos acima de um orçamento mínimo. Pode usar palavras-chave que indicam maior intenção e escala de projeto.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    O LSA ainda pode contribuir com oportunidades qualificadas para projetos de alto valor quando a categoria, o mercado local, o perfil de avaliações e as configurações de tipo de trabalho se alinham. Mas o formato do lead LSA — uma ligação ou mensagem direta — não oferece pré-qualificação antes de o lead chegar até você. A conversa de qualificação acontece com sua equipe após o contato.
                  </p>
                </section>

                {/* 9 */}
                <section id="usar-os-dois" aria-labelledby="h2-usar-os-dois">
                  <h2 id="h2-usar-os-dois" className="text-2xl font-extrabold tracking-tight mb-4">
                    Contractors Podem Usar Google Ads e LSA ao Mesmo Tempo?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Sim. As duas plataformas podem ser complementares quando rastreadas e gerenciadas separadamente. Uma abordagem combinada prática:
                  </p>
                  <ol className="mt-4 space-y-3 text-[#667085] text-sm">
                    {[
                      'Use o Local Services Ads para capturar demanda local direta em categorias e mercados onde você está verificado.',
                      'Use o Google Search Ads para palavras-chave estratégicas, serviços especializados e localizações onde você quer mais controle sobre segmentação e mensagem.',
                      'Atribua números de call tracking separados a cada plataforma para atribuir cada lead com precisão.',
                      'Registre a fonte original do lead no CRM para cada contato.',
                      'Acompanhe taxa de lead qualificado, agendamento, orçamento, fechamento, receita assinada e lucro bruto separadamente por fonte.',
                      'Compare custo por projeto assinado e lucro bruto por real investido — não custo por lead.',
                      'Realoque o orçamento trimestralmente com base em qual fonte está gerando os melhores resultados qualificados.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 shrink-0 bg-[#1565D8] text-white text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Usar as duas plataformas não garante maior visibilidade ou resultados totais. Só faz sentido se você tem orçamento, infraestrutura de rastreamento e capacidade de equipe para gerenciar e responder leads das duas fontes com eficiência.
                  </p>
                </section>

                {/* 10 */}
                <section id="comecar-google-ads" aria-labelledby="h2-comecar-google-ads">
                  <h2 id="h2-comecar-google-ads" className="text-2xl font-extrabold tracking-tight mb-4">
                    Quando Começar pelo Google Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-4">
                    Considere começar pelo Google Search Ads quando qualquer uma destas condições se aplicar:
                  </p>
                  <ul className="space-y-2 text-[#667085] text-sm">
                    {[
                      'O LSA não está disponível no seu mercado ou para sua categoria de serviço',
                      'Você quer controle direto sobre as palavras-chave que ativam seus anúncios',
                      'Você oferece serviços especializados que se beneficiam de segmentação específica',
                      'Você precisa de landing pages dedicadas para qualificar leads antes de entrarem em contato',
                      'Você quer segmentação geográfica granular — CEPs, bairros ou cidades específicas',
                      'Você precisa de rastreamento avançado de conversões vinculado a formulários e ligações',
                      'Você atende múltiplas categorias de projeto que justificam estruturas de campanha separadas',
                      'Você quer testar diferentes ofertas, títulos e variações de landing page',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 11 */}
                <section id="comecar-lsa" aria-labelledby="h2-comecar-lsa">
                  <h2 id="h2-comecar-lsa" className="text-2xl font-extrabold tracking-tight mb-4">
                    Quando Começar pelo Local Services Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-4">
                    Considere começar pelo LSA quando todas estas condições forem atendidas:
                  </p>
                  <ul className="space-y-2 text-[#667085] text-sm">
                    {[
                      'Você confirmou a disponibilidade do LSA para sua localização e categoria de serviço',
                      'Você pode concluir o processo de verificação — licença, seguro e verificação aplicável',
                      'Seu Google Business Profile está completo, preciso e ativamente mantido',
                      'Sua avaliação é competitiva para o seu mercado local',
                      'Você ou sua equipe podem responder ligações e mensagens rapidamente — resposta lenta degrada o desempenho no LSA',
                      'Sua equipe consegue qualificar leads com eficiência durante a ligação inicial',
                      'Você quer um canal de lead direto mais simples sem construir e manter landing pages',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <CalloutBox type="warning" label="LSA ainda exige gestão ativa">
                    <p>Rodar o Local Services Ads não significa configurar e esquecer. Revisar a qualidade dos leads regularmente, contestar leads inelegíveis, atualizar tipos de trabalho, manter tempos de resposta e gerenciar seu perfil de avaliações são requisitos contínuos que afetam custo e desempenho.</p>
                  </CalloutBox>
                </section>

                {/* 12 */}
                <section id="erros-comuns" aria-labelledby="h2-erros-comuns">
                  <h2 id="h2-erros-comuns" className="text-2xl font-extrabold tracking-tight mb-4">
                    Erros Comuns nas Duas Plataformas
                  </h2>
                  <ul className="space-y-3 text-[#667085] text-sm">
                    {[
                      { label: 'Tratar todos os leads como igualmente valiosos', desc: 'Uma ligação de homeowner querendo um reparo de $3.000 não é o mesmo que alguém planejando uma adição de $180.000. Rastrear só o volume total de leads sem taxa de qualificação esconde essa diferença.' },
                      { label: 'Segmentar uma área de atendimento excessivamente grande', desc: 'Expandir a área para capturar mais leads aumenta o volume, mas reduz o encaixe do projeto e frequentemente aumenta o tempo de deslocamento, diminuindo a lucratividade.' },
                      { label: 'Não responder rapidamente', desc: 'As duas plataformas recompensam resposta rápida. No LSA, resposta lenta pode reduzir seu ranking. No Google Ads, follow-up demorado significa que o lead vai para o concorrente que atendeu primeiro.' },
                      { label: 'Não registrar os resultados dos leads no CRM', desc: 'Sem dados de CRM, você não consegue comparar custo por projeto assinado por fonte. Você está otimizando com base no número de leads, não na receita.' },
                      { label: 'Otimizar apenas para volume de leads', desc: 'Mais leads com taxa de fechamento menor e valor médio de projeto menor pode gerar menos receita e menos lucro do que menos leads mais qualificados.' },
                      { label: 'Ignorar contatos de trabalhos pequenos ou de baixo valor', desc: 'Tipos de trabalho no LSA que atraem reparos pequenos ou manutenção podem inflar a contagem de leads e o custo sem contribuir para a sua receita principal.' },
                      { label: 'Não revisar o relatório de termos de pesquisa no Google Ads', desc: 'O Google Ads mostra exatamente quais pesquisas ativaram seus anúncios. Revisar esse relatório regularmente é a forma mais rápida de encontrar gastos desperdiçados e melhorar a segmentação.' },
                      { label: 'Selecionar tipos de trabalho imprecisos no LSA', desc: 'Incluir tipos de trabalho que não correspondem aos seus serviços reais gera leads para projetos que você não oferece, desperdiçando seu orçamento LSA.' },
                      { label: 'Aplicar as mesmas expectativas de orçamento para todos os serviços', desc: 'Uma campanha de remodelação de cozinha e uma de reforma completa têm volumes de leads, taxas de conversão e valores médios de projeto diferentes. O orçamento deve refletir a economia de cada serviço.' },
                      { label: 'Não conectar o gasto em marketing aos contratos assinados', desc: 'Se seu relatório para em leads, você não consegue medir o ROI real de publicidade. Conectar dados de anúncios aos resultados do CRM é a única forma de saber se suas campanhas são realmente lucrativas.' },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex items-start gap-3 border-l-2 border-[#D0D5DD] pl-4">
                        <div>
                          <span className="font-semibold text-[#0A0A0A]">{label}.</span>{' '}
                          <span>{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 13 */}
                <section id="comparar-resultados" aria-labelledby="h2-comparar-resultados">
                  <h2 id="h2-comparar-resultados" className="text-2xl font-extrabold tracking-tight mb-4">
                    Como Comparar os Resultados de Google Ads e LSA
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-4">
                    Construa um framework de medição simples que rastreie as duas plataformas ao longo de todo o processo de vendas. O pipeline deve ser assim:
                  </p>
                  <div className="border border-[#D0D5DD] bg-[#F4F6F8] p-5 font-mono text-sm text-[#0A0A0A] space-y-1">
                    {[
                      'Gasto em publicidade',
                      '→ Total de leads',
                      '→ Leads qualificados',
                      '→ Agendamentos',
                      '→ Orçamentos',
                      '→ Propostas',
                      '→ Projetos assinados',
                      '→ Receita assinada',
                      '→ Lucro bruto',
                    ].map((step) => (
                      <div key={step} className={step.startsWith('→') ? 'pl-4 text-[#667085]' : 'font-semibold'}>
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A comparação principal não deve ser custo por lead bruto. As comparações mais úteis são:
                  </p>
                  <ul className="mt-3 space-y-2 text-[#667085] text-sm">
                    {[
                      'Custo por lead qualificado — gasto total dividido pelos leads que atendem seus critérios de projeto',
                      'Custo por agendamento — gasto total dividido pelas consultas agendadas',
                      'Custo por orçamento — gasto total dividido pelos orçamentos entregues',
                      'Custo de aquisição de cliente — gasto total dividido pelos projetos assinados',
                      'Receita assinada por fonte — receita atribuível a cada plataforma',
                      'Lucro bruto por fonte — receita menos custos diretos, por plataforma',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 14 */}
                <section id="qual-e-melhor" aria-labelledby="h2-qual-e-melhor">
                  <h2 id="h2-qual-e-melhor" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads ou Local Services Ads: Qual É Melhor?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Nenhuma plataforma é universalmente melhor. A escolha certa depende da sua elegibilidade, categoria de serviço, mercado local, orçamento, valor dos projetos, requisitos de qualidade dos leads, processo de vendas e capacidade de rastrear resultados com precisão.
                  </p>
                  <ul className="mt-5 space-y-3 text-[#667085] text-sm">
                    {[
                      { label: 'Google Search Ads geralmente é melhor para', desc: 'controle de palavras-chave, segmentação de campanhas, landing pages dedicadas, rastreamento avançado de conversões, qualificação de projetos de alto valor e contractors com múltiplos serviços que precisam de otimização granular.' },
                      { label: 'Local Services Ads pode ser um canal forte para', desc: 'empresas elegíveis com Google Business Profile sólido, avaliações competitivas, tempos de resposta rápidos e categorias de serviço com demanda local de busca consistente.' },
                      { label: 'Nenhuma plataforma é automaticamente mais lucrativa.', desc: 'A plataforma que gera mais lucro bruto por real investido, com suas taxas de conversão reais, para seu mix real de serviços e mercado, é a correta.' },
                      { label: 'Muitos contractors consolidados testam as duas.', desc: 'Usar ambas é prático quando você tem orçamento, infraestrutura de rastreamento e equipe para responder leads das duas fontes com eficiência.' },
                      { label: 'A alocação de orçamento deve seguir receita assinada e lucro bruto.', desc: 'Não volume de leads, não custo por lead bruto. As plataformas que produzem o maior lucro bruto por real investido devem receber o maior orçamento.' },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex items-start gap-3 border-l-2 border-[#1565D8] pl-4">
                        <div>
                          <span className="font-semibold text-[#0A0A0A]">{label}</span>{' '}
                          <span>{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* FAQ */}
                <FAQSection items={faqItems} locale="pt-BR" />

                {/* End CTA */}
                <EndArticleCTA
                  headline="Crie a Estratégia de Anúncios Certa para Sua Empresa de Construção"
                  body="Tenha uma estratégia de marketing baseada nos seus serviços, mercado, valor dos projetos, qualidade dos leads e receita gerada."
                  buttonLabel="Agendar uma Análise Gratuita"
                  locale="pt-BR"
                />

                {/* Related articles */}
                <RelatedArticles articles={relatedArticles} locale="pt-BR" />

              </div>
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Navegação do artigo">
              <TableOfContents items={tocItems} locale="pt-BR" variant="desktop" />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
