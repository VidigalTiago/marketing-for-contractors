import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import NavbarPTCTAWrapper from '@/components/blog/navbar-pt-cta-wrapper'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import TableOfContents from '@/components/blog/table-of-contents'
import EndArticleCTA from '@/components/blog/end-article-cta'
import FAQSection from '@/components/blog/faq-section'
import ReadingProgress from '@/components/blog/reading-progress'
import InlineCTA from '@/components/blog/inline-cta'
import CalloutBox from '@/components/blog/callout-box'
import { SITE_URL } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Google Ads para General Contractors: Guia Completo',
  description:
    'Aprenda como o Google Ads para general contractors funciona, quais palavras-chave geram leads qualificados, quanto investir e como transformar cliques em projetos assinados.',
  alternates: {
    canonical: `${SITE_URL}/br/blog/google-ads-para-general-contractors`,
    languages: {
      'pt-BR': `${SITE_URL}/br/blog/google-ads-para-general-contractors`,
      'en-US': `${SITE_URL}/blog/google-ads-for-general-contractors`,
    },
  },
  openGraph: {
    title: 'Google Ads para General Contractors: Guia Completo',
    description:
      'Aprenda como o Google Ads para general contractors funciona, quais palavras-chave geram leads qualificados, quanto investir e como transformar cliques em projetos assinados.',
    url: `${SITE_URL}/br/blog/google-ads-para-general-contractors`,
    type: 'article',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads para General Contractors: Guia Completo',
    description:
      'Aprenda como o Google Ads para general contractors funciona, quais palavras-chave geram leads qualificados e como transformar cliques em projetos assinados.',
  },
}

const tocItems = [
  { id: 'funciona', label: 'O Google Ads Funciona para Contractors?', level: 2 as const },
  { id: 'como-funciona', label: 'Como o Google Ads Funciona para Contractors', level: 2 as const },
  { id: 'palavras-chave', label: 'Estratégia de Palavras-Chave', level: 2 as const },
  { id: 'estrutura-campanha', label: 'Estrutura de Campanha', level: 2 as const },
  { id: 'landing-pages', label: 'Landing Pages que Convertem', level: 2 as const },
  { id: 'lances-orcamento', label: 'Lances e Gestão de Orçamento', level: 2 as const },
  { id: 'rastreamento', label: 'Rastreamento de Conversões', level: 2 as const },
  { id: 'qualidade-leads', label: 'Melhoria da Qualidade de Leads', level: 2 as const },
  { id: 'quanto-investir', label: 'Quanto Investir em Google Ads', level: 2 as const },
  { id: 'ads-vs-lsa', label: 'Google Ads vs Local Services Ads', level: 2 as const },
  { id: 'erros-comuns', label: 'Erros Comuns dos Contractors', level: 2 as const },
  { id: 'receita', label: 'Rastreamento de Receita pelo Google Ads', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const faqItems = [
  {
    question: 'O Google Ads funciona para general contractors?',
    answer:
      'Sim. O Google Ads é um dos canais de geração de leads mais eficazes para general contractors porque captura proprietários no momento em que buscam ativamente pelos seus serviços. Diferente da publicidade em redes sociais, onde você interrompe pessoas que podem ou não precisar do que você oferece, os anúncios de busca aparecem quando alguém digita "reforma de cozinha perto de mim" ou "construtor de adição residencial [cidade]". Essa intenção de busca torna esses leads significativamente mais propensos a se converter em estimativas e projetos assinados.',
  },
  {
    question: 'Quanto custa o Google Ads para um general contractor?',
    answer:
      'O custo por clique para palavras-chave de contractors geralmente varia entre $8 e $35, dependendo do serviço e da localização. Um orçamento mensal razoável para começar é de $2.000 a $5.000 em gasto com anúncios, o que normalmente gera de 15 a 40 leads por mês dependendo do mercado. O que mais importa não é o valor gasto, mas o custo por lead e o custo por projeto assinado — não o custo por clique.',
  },
  {
    question: 'Quanto tempo leva para o Google Ads gerar resultados?',
    answer:
      'A maioria dos contractors começa a receber leads na primeira ou segunda semana após o lançamento das campanhas. No entanto, o desempenho ótimo geralmente leva de 60 a 90 dias à medida que os algoritmos do Google aprendem quais usuários convertem melhor. Você deve esperar refinamentos contínuos durante os primeiros 3 meses.',
  },
  {
    question: 'Quais palavras-chave são mais eficazes para general contractors?',
    answer:
      'As palavras-chave de maior desempenho combinam o serviço com um modificador de localidade e intenção: "reforma de cozinha [cidade]", "reforma de banheiro [cidade]", "adição residencial perto de mim", "empreiteiro geral [cidade]". Evite palavras-chave genéricas como "renovação de casa" — elas são caras e trazem leads de baixa qualidade. Foque em palavras-chave específicas do serviço com intenção de compra clara.',
  },
  {
    question: 'Devo gerenciar o Google Ads internamente ou contratar uma agência?',
    answer:
      'O Google Ads para contractors exige gerenciamento especializado para ser rentável. O erro mais comum é lançar campanhas genéricas sem estrutura por serviço, sem landing pages dedicadas ou sem rastreamento de conversão adequado. Se você não tem experiência comprovada com campanhas de busca paga para construção, trabalhar com um especialista geralmente gera retorno significativamente maior do que tentar internamente.',
  },
]

const breadcrumbItems = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Google Ads para General Contractors' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Google Ads para General Contractors: Guia Completo',
      description:
        'Aprenda como o Google Ads para general contractors funciona, quais palavras-chave geram leads qualificados, quanto investir e como transformar cliques em projetos assinados.',
      url: `${SITE_URL}/br/blog/google-ads-para-general-contractors`,
      inLanguage: 'pt-BR',
      author: { '@type': 'Person', name: 'Tiago Vidigal' },
      publisher: { '@type': 'Organization', name: 'Marketing For Contractors', url: SITE_URL },
      datePublished: '2025-07-16',
      dateModified: '2025-07-16',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/br` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/br/blog` },
        { '@type': 'ListItem', position: 3, name: 'Google Ads para General Contractors', item: `${SITE_URL}/br/blog/google-ads-para-general-contractors` },
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

export default function GoogleAdsPTPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white flex flex-col">
        <AnnouncementBanner message="Somente 4 vagas disponíveis no momento para consultoria." />
        <NavbarPTCTAWrapper />
        <ReadingProgress />

        <main id="main-content" className="flex-1 pt-20">
          {/* Hero */}
          <section className="pt-14 pb-10 bg-white border-b border-[#D0D5DD]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <Breadcrumbs items={breadcrumbItems} />
              <div className="mt-6 max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-px bg-[#1565D8]" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                    Mídia Paga
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance leading-[1.05] mb-4">
                  Google Ads para General Contractors
                </h1>
                <p className="text-[#667085] text-lg leading-relaxed max-w-2xl">
                  Como configurar, gerenciar e otimizar campanhas no Google para gerar leads qualificados para projetos de construção e renovação residencial.
                </p>
                <div className="flex items-center gap-4 mt-5 text-[11px] text-[#667085]">
                  <span>Por <strong className="text-[#0A0A0A]">Tiago Vidigal</strong></span>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>18 min de leitura</span>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>Publicado em 16 de julho de 2025</span>
                </div>
              </div>
            </div>
          </section>

          {/* Body */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
              <article className="max-w-3xl">
                <TableOfContents items={tocItems} locale="pt-BR" variant="mobile" />

                <section id="funciona" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">O Google Ads Funciona para Contractors?</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Sim — e é um dos canais mais eficazes disponíveis para general contractors. O motivo é intenção: quando alguém pesquisa "reforma de banheiro [cidade]" ou "empreiteiro geral perto de mim", já está ativamente considerando contratar alguém. Você não está tentando criar demanda — está capturando demanda que já existe.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Porém, o Google Ads funciona bem apenas quando configurado corretamente. Campanhas mal estruturadas, palavras-chave genéricas e landing pages sem otimização de conversão transformam um canal de alto potencial em desperdício de orçamento.
                  </p>
                </section>

                <section id="como-funciona" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Como o Google Ads Funciona para Contractors</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    O Google Ads Search opera em um sistema de leilão. Quando alguém realiza uma pesquisa relacionada às suas palavras-chave, o Google realiza um leilão instantâneo para determinar quais anúncios aparecem e em qual posição. Sua posição depende de dois fatores: seu lance (quanto você está disposto a pagar por clique) e seu Índice de Qualidade (a relevância do seu anúncio e landing page para a pesquisa).
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Isso significa que um Índice de Qualidade alto permite pagar menos por clique do que concorrentes com anúncios e landing pages menos relevantes. Relevância e qualidade do anúncio são vantagens competitivas diretas no Google Ads.
                  </p>
                </section>

                <InlineCTA
                  locale="pt-BR"
                  headline="Quer saber se suas campanhas de Google Ads estão bem configuradas?"
                  body="Receba uma análise gratuita das suas campanhas atuais e veja exatamente onde há espaço para melhorar."
                  buttonLabel="Solicitar Análise Gratuita"
                />

                <section id="palavras-chave" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Estratégia de Palavras-Chave</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    A seleção de palavras-chave determina a qualidade dos leads. Para general contractors, as melhores palavras-chave combinam serviço específico com localidade e intenção de compra:
                  </p>
                  <ul className="list-none space-y-2 mb-6">
                    {[
                      'Reforma de cozinha [cidade]',
                      'Reforma de banheiro perto de mim',
                      'Adição residencial [estado]',
                      'Empreiteiro geral [cidade]',
                      'Empresa de renovação residencial [cidade]',
                    ].map((kw) => (
                      <li key={kw} className="flex items-start gap-2 text-sm text-[#3D3D3D]">
                        <span className="w-1 h-1 rounded-full bg-[#1565D8] mt-2 shrink-0" />
                        {kw}
                      </li>
                    ))}
                  </ul>
                  <CalloutBox type="warning" label="Evite palavras-chave genéricas">
                    Termos amplos como "renovação de casa" ou "empreiteiro" podem gerar muitos cliques caros de pessoas que não estão prontas para contratar. Para uma análise completa de keywords por serviço, tipos de correspondência e categorias de palavras negativas, consulte o{' '}
                    <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de melhores palavras-chave de Google Ads para general contractors</Link>.
                  </CalloutBox>
                </section>

                <section id="estrutura-campanha" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Estrutura de Campanha</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Estruturar campanhas separadas por serviço — Reforma de Cozinha, Reforma de Banheiro, Adições, Renovação Geral — permite controle granular sobre orçamento, lances e mensagem do anúncio. Cada campanha deve ter sua própria landing page correspondente ao serviço anunciado.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Essa estrutura também facilita a identificação de quais serviços têm melhor retorno sobre investimento, permitindo realocar orçamento dos serviços menos rentáveis para os mais lucrativos.
                  </p>
                </section>

                <section id="landing-pages" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Landing Pages que Convertem</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Enviar tráfego pago para a homepage do seu site desperdiça investimento. Cada campanha deve ter uma landing page dedicada que corresponda exatamente ao serviço e localidade do anúncio — Reforma de Cozinha em Austin, não apenas "Nossos Serviços".
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Os elementos de uma landing page de alta conversão para contractors incluem: headline específica para o serviço e localidade, formulário de contato ou botão de chamada visível acima da dobra, fotos de projetos concluídos, depoimentos de clientes e indicadores claros de confiança (licenças, anos de experiência, garantias).
                  </p>
                </section>

                <section id="lances-orcamento" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Lances e Gestão de Orçamento</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Para a maioria dos contractors iniciando com Google Ads, começar com lances manuais de CPC (custo por clique) oferece mais controle enquanto você coleta dados. Após acumular pelo menos 30 a 50 conversões por campanha, migrar para lances automatizados como Target CPA geralmente melhora os resultados.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Regras de lance por localidade — aumentar lances em cidades com maior taxa de fechamento e reduzir onde a qualidade dos leads é baixa — são uma das otimizações mais impactantes para contractors com área de atuação geográfica variada.
                  </p>
                </section>

                <section id="rastreamento" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Rastreamento de Conversões</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Sem rastreamento de conversão, você está gerenciando campanhas às cegas. O rastreamento mínimo para contractors deve incluir: envios de formulário de contato, chamadas telefônicas clicadas no anúncio ou na landing page, e visitas à página de agradecimento após o envio do formulário.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    O rastreamento de receita vai além: conecta cada conversão ao projeto que ela originou no CRM, permitindo calcular o custo real por projeto assinado por campanha. Esse dado é o que transforma o Google Ads de um custo em um investimento com retorno mensurável.
                  </p>
                </section>

                <InlineCTA
                  locale="pt-BR"
                  headline="Suas conversões estão sendo rastreadas corretamente?"
                  body="Muitos contractors perdem dados críticos de rastreamento sem saber. Uma análise gratuita revela as lacunas no seu setup atual."
                  buttonLabel="Ver Análise Gratuita"
                />

                <section id="qualidade-leads" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Melhoria da Qualidade de Leads</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Volume de leads sem qualidade desperdiça o tempo da equipe de vendas. Melhorar a qualidade dos leads começa com a segmentação: palavras-chave de alta intenção, segmentação geográfica precisa, horários de exibição dos anúncios alinhados com o horário comercial e listas de exclusão para buscas irrelevantes.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    No formulário de contato, perguntar sobre o tipo de projeto e faixa de orçamento ajuda a filtrar leads antes mesmo do primeiro contato. Isso aumenta a taxa de conversão de leads para estimativas e reduz o tempo gasto com prospects fora do perfil ideal.
                  </p>
                </section>

                <section id="quanto-investir" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Quanto Investir em Google Ads</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Um orçamento mínimo realista para general contractors é de $2.000 a $3.000 por mês em gasto com anúncios. Abaixo disso, o volume de dados é insuficiente para otimização e o custo de gerenciamento pode superar o retorno.
                  </p>
                  <div className="overflow-x-auto my-6">
                    <table className="w-full text-sm border border-[#D0D5DD]">
                      <thead>
                        <tr className="bg-[#F4F6F8]">
                          <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A] border-b border-[#D0D5DD]">Orçamento Mensal</th>
                          <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A] border-b border-[#D0D5DD]">Leads Estimados</th>
                          <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A] border-b border-[#D0D5DD]">Melhor para</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['$2.000–$3.000', '15–25 leads', 'Contractors começando com anúncios'],
                          ['$3.000–$6.000', '25–50 leads', 'Crescimento estável e otimização'],
                          ['$6.000–$12.000', '50–100 leads', 'Escala com múltiplos serviços'],
                          ['$12.000+', '100+ leads', 'Contractors com metas agressivas de crescimento'],
                        ].map(([budget, leads, best], i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]'}>
                            <td className="px-4 py-3 font-medium text-[#0A0A0A] border-b border-[#D0D5DD]">{budget}</td>
                            <td className="px-4 py-3 text-[#667085] border-b border-[#D0D5DD]">{leads}</td>
                            <td className="px-4 py-3 text-[#667085] border-b border-[#D0D5DD]">{best}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section id="ads-vs-lsa" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Google Ads vs Local Services Ads</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Os Local Services Ads (LSA) aparecem acima dos anúncios de pesquisa tradicionais e você paga por lead, não por clique. O Google Ads Search oferece mais controle sobre palavras-chave, mensagem e landing page, mas exige mais configuração e gerenciamento.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    A maioria dos contractors com melhor desempenho usa ambos: LSA para capturar pesquisas de alta intenção no topo da página e Google Ads Search para cobrir um volume maior de palavras-chave com segmentação mais precisa. Para uma comparação completa entre as duas plataformas — custos, controle, qualidade dos leads e elegibilidade — consulte o{' '}
                    <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      guia de Google Ads vs Local Services Ads para contractors
                    </Link>.
                  </p>
                </section>

                <section id="erros-comuns" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Erros Comuns dos Contractors no Google Ads</h2>
                  <ul className="list-none space-y-3">
                    {[
                      ['Enviar tráfego para a homepage', 'Crie landing pages específicas por serviço e localidade'],
                      ['Usar correspondência ampla sem lista de negativos', 'Use correspondência de frase e exata; adicione negativos semanalmente'],
                      ['Não rastrear conversões por origem', 'Configure rastreamento de chamadas e formulários por campanha'],
                      ['Parar campanhas prematuramente', 'O desempenho ótimo leva 60–90 dias; dados insuficientes levam a conclusões erradas'],
                      ['Ignorar o Índice de Qualidade', 'Anúncios e landing pages irrelevantes aumentam o custo por clique significativamente'],
                    ].map(([mistake, fix], i) => (
                      <li key={i} className="border border-[#D0D5DD] p-4">
                        <p className="text-sm font-semibold text-[#0A0A0A] mb-1">{mistake}</p>
                        <p className="text-sm text-[#667085]">{fix}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="receita" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Rastreamento de Receita pelo Google Ads</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    O rastreamento de conversão padrão do Google registra formulários e chamadas. O rastreamento de receita vai mais longe: conecta cada lead ao projeto que ele originou no CRM, permitindo calcular o ROI real de cada campanha com base em projetos assinados — não apenas em leads gerados.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Com esse nível de rastreamento, você pode tomar decisões como: dobrar o orçamento de campanhas de Adição Residencial porque o custo por projeto assinado é 40% menor do que Reforma de Cozinha. Sem esses dados, essas decisões são baseadas em suposições. Consulte o guia completo sobre{' '}
                    <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">qual é um bom custo por lead para general contractors</Link> para calcular seu CPL alvo com base no valor do projeto, margem e taxa de fechamento.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Nenhuma dessas otimizações importa se os leads gerados não recebem um follow-up consistente depois do clique. Veja{' '}
                    <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como fazer follow-up com leads de contractors</Link> para o sistema completo de resposta, qualificação e CRM.
                  </p>
                </section>

                <FAQSection items={faqItems} locale="pt-BR" />

                <EndArticleCTA
                  locale="pt-BR"
                  headline="Pronto para Gerar Mais Leads com Google Ads?"
                  body="Solicite uma análise gratuita e veja exatamente o que está limitando o desempenho das suas campanhas atuais — ou como começar do zero com a estrutura certa."
                  buttonLabel="Solicitar Análise Gratuita"
                />
              </article>

              {/* Sticky sidebar ToC */}
              <aside className="hidden lg:block sticky top-24 self-start">
                <TableOfContents items={tocItems} locale="pt-BR" variant="desktop" />
                <div className="mt-6 border border-[#D0D5DD] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-3">
                    Guia Relacionado
                  </p>
                  <Link
                    href="/br/marketing-para-general-contractors"
                    className="text-sm font-semibold text-[#0A0A0A] hover:text-[#1565D8] transition-colors leading-snug block"
                  >
                    Marketing para General Contractors: Guia Completo
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
