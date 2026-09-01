import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticleBySlug, getAlternateLanguages, getRelatedArticles, SITE_URL } from '@/lib/articles'
import NavbarPtCTAWrapper from '@/components/blog/navbar-pt-cta-wrapper'
import TableOfContents from '@/components/blog/table-of-contents'
import RelatedArticles from '@/components/blog/related-articles'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import FAQSection from '@/components/blog/faq-section'
import InlineCTA from '@/components/blog/inline-cta'
import EndArticleCTA from '@/components/blog/end-article-cta'
import ReadingProgress from '@/components/blog/reading-progress'
import CalloutBox from '@/components/blog/callout-box'
import ContractorLeadCalculator from '@/components/blog/contractor-lead-calculator'

const SLUG = 'bom-custo-por-lead-para-general-contractors'
const ARTICLE_ID = 'good-cost-per-lead-for-general-contractors'

export async function generateMetadata(): Promise<Metadata> {
  const article = getArticleBySlug('pt-BR', SLUG)
  if (!article) return {}
  const alternates = getAlternateLanguages(ARTICLE_ID)
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: {
      canonical: article.canonicalUrl,
      languages: {
        'en-US': alternates['en-US'] ?? '',
        'pt-BR': alternates['pt-BR'] ?? article.canonicalUrl,
        'x-default': alternates['en-US'] ?? '',
      },
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: article.canonicalUrl,
      locale: 'pt_BR',
      alternateLocale: ['en_US'],
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
    },
  }
}

const tocItems = [
  { id: 'o-que-e-cpl', label: 'O Que É Custo por Lead?', level: 2 as const },
  { id: 'bom-cpl', label: 'Qual É um Bom CPL para General Contractors?', level: 2 as const },
  { id: 'bruto-vs-qualificado', label: 'CPL Bruto vs Custo por Lead Qualificado', level: 2 as const },
  { id: 'leads-baratos', label: 'Por Que Leads Baratos Podem Sair Caros', level: 2 as const },
  { id: 'lead-caro', label: 'Por Que um Lead Caro Ainda Pode Ser Lucrativo', level: 2 as const },
  { id: 'cpl-maximo', label: 'Como Calcular Seu CPL Máximo', level: 2 as const },
  { id: 'cpl-qualificado', label: 'Como Calcular o Custo por Lead Qualificado', level: 2 as const },
  { id: 'calculadora', label: 'Calculadora do Funil de Leads', level: 2 as const },
  { id: 'tipo-projeto', label: 'Como o Tipo de Projeto Muda o CPL Aceitável', level: 2 as const },
  { id: 'localizacao', label: 'Como a Localização Afeta o Custo dos Leads', level: 2 as const },
  { id: 'por-canal', label: 'Custo por Lead por Canal de Marketing', level: 2 as const },
  { id: 'google-vs-lsa', label: 'CPL de Google Ads vs Local Services Ads', level: 2 as const },
  { id: 'landing-page', label: 'Como a Landing Page Afeta o CPL', level: 2 as const },
  { id: 'tempo-resposta', label: 'Como o Tempo de Resposta Afeta o Resultado', level: 2 as const },
  { id: 'qualificacao', label: 'Como a Qualificação Afeta o CPL', level: 2 as const },
  { id: 'taxa-fechamento', label: 'Como a Taxa de Fechamento Muda o CPL Aceitável', level: 2 as const },
  { id: 'cpl-vs-cac', label: 'Custo por Lead vs CAC', level: 2 as const },
  { id: 'cpl-vs-roas', label: 'Custo por Lead vs ROAS', level: 2 as const },
  { id: 'rastreamento', label: 'Como Acompanhar Leads Qualificados e Contratos Fechados', level: 2 as const },
  { id: 'diagnosticar', label: 'Como Diagnosticar um CPL Alto', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns ao Avaliar o Custo por Lead', level: 2 as const },
  { id: 'orcamento', label: 'Quanto Investir em Geração de Leads', level: 2 as const },
  { id: 'resposta-final', label: 'Afinal, Qual É um Bom CPL?', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Qual É um Bom Custo por Lead para General Contractors?' },
]

export default function Page() {
  const article = getArticleBySlug('pt-BR', SLUG)
  const alternates = getAlternateLanguages(ARTICLE_ID)
  const relatedArticles = getRelatedArticles(ARTICLE_ID, 'pt-BR')

  if (!article) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.metaDescription,
        url: article.canonicalUrl,
        datePublished: article.publishedDate,
        dateModified: article.updatedDate,
        inLanguage: 'pt-BR',
        author: { '@type': 'Organization', name: 'Marketing For Contractors', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Marketing For Contractors', url: SITE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': article.canonicalUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs
          .filter((b) => b.href)
          .map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.label,
            item: b.href?.startsWith('http') ? b.href : `${SITE_URL}${b.href}`,
          }))
          .concat([{
            '@type': 'ListItem',
            position: breadcrumbs.filter((b) => b.href).length + 1,
            name: article.title,
            item: article.canonicalUrl,
          }]),
      },
      ...(article.faq && article.faq.length > 0
        ? [{
            '@type': 'FAQPage',
            mainEntity: article.faq.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }]
        : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <NavbarPtCTAWrapper />

      <main className="bg-white pt-28 pb-20" id="article-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs + hreflang switcher */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
            <Breadcrumbs items={breadcrumbs} />
            {alternates['en-US'] && (
              <Link
                href="/blog/good-cost-per-lead-for-general-contractors"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
                hrefLang="en-US"
              >
                EN — Read in English
              </Link>
            )}
          </div>

          {/* Mobile ToC */}
          <div className="lg:hidden mb-8">
            <TableOfContents items={tocItems} variant="mobile" />
          </div>

          <div className="flex gap-12">
            <article className="flex-1 min-w-0">

              {/* Article header */}
              <header className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-px bg-[#1565D8]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
                    {article.category}
                  </span>
                  <span className="text-xs text-[#9EA5B3]">·</span>
                  <span className="text-xs text-[#9EA5B3]">{article.readingTime} min de leitura</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] tracking-tight leading-tight mb-4 text-balance">
                  {article.title}
                </h1>
                <p className="text-lg text-[#667085] leading-relaxed mb-6 max-w-2xl">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9EA5B3] border-t border-[#F4F6F8] pt-4">
                  <span>Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </header>

              {/* Introdução */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um bom custo por lead para contractor não é o CPL mais barato disponível. É um custo que gera oportunidades qualificadas e projetos lucrativos suficientes para sustentar as metas de aquisição da empresa. Um lead de $50 pode sair caro se nunca qualificar. Um lead de $300 pode ser lucrativo se converter consistentemente em um projeto de alto valor com boa margem.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A pergunta sobre qual é um bom custo por lead para general contractors não tem uma resposta universal. Depende da economia específica do negócio — valor médio dos projetos, margem bruta, qualidade dos leads, close rate e o CAC alvo que a empresa definiu. Dois contractors no mesmo mercado rodando a mesma campanha podem ter faixas de CPL aceitável completamente diferentes com base nesses fatores.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo oferece um framework prático para calcular seu CPL máximo acessível, entender as métricas que importam além do CPL bruto e diagnosticar quando os custos de lead estão realmente altos demais. Para o contexto completo sobre a construção do sistema de marketing, consulte o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* O Que É CPL */}
              <section id="o-que-e-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que É Custo por Lead?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Custo por lead (CPL) é o valor gasto em anúncios dividido pelo número de leads gerados no mesmo período.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Custo por lead = Investimento em anúncios ÷ Número de leads</p>
                  <p className="text-[#667085]">Exemplo:</p>
                  <p>Investimento em anúncios: $5.000</p>
                  <p>Leads gerados: 25</p>
                  <p className="font-bold mt-1">Custo por lead: $200</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Esse cálculo é simples de fazer, por isso aparece com frequência em dashboards de marketing. O problema é que um CPL bruto sozinho não mostra se os leads eram reais, qualificados, acessíveis, dentro da área de atuação, adequados para os serviços do contractor, grandes o suficiente para ser rentáveis, ou se foram convertidos em reuniões e projetos assinados.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Reportar custo por lead sem acompanhar a qualidade dos leads e a conversão downstream é uma das formas mais comuns de empresas de construção avaliarem mal a performance de marketing.
                </p>
              </section>

              {/* Bom CPL */}
              <section id="bom-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Qual É um Bom Custo por Lead para General Contractors?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Não existe uma resposta universal. Um bom CPL precisa ser avaliado em relação à economia específica do negócio e do mercado.
                </p>
                <CalloutBox type="info" label="Princípio Central">
                  Um bom CPL é um CPL lucrativo, não necessariamente um CPL baixo.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Os fatores relevantes incluem o valor médio dos projetos assinados, a margem bruta por projeto, a taxa de conversão lead-para-contrato, a qualidade e a taxa de qualificação dos leads, a duração do ciclo de vendas, o tamanho da área de atuação, a capacidade disponível de projetos e o custo de aquisição de cliente (CAC) alvo que a empresa definiu.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Contractors devem ter cuidado ao comparar seu CPL diretamente com artigos de benchmarks nacionais, categorias de serviço diferentes, outros estados, empresas de serviços emergenciais, empresas de reparos pequenos ou empresas de remodeling de alto ticket. Um CPL excelente para uma empresa de repair pode ser insustentável para um custom home builder, e vice-versa.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  As seções abaixo explicam como calcular um CPL máximo acessível para a sua situação específica, usando seus próprios números.
                </p>
              </section>

              {/* Bruto vs Qualificado */}
              <section id="bruto-vs-qualificado" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Custo por Lead Bruto vs Custo por Lead Qualificado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um lead bruto é qualquer contato inicial — um formulário preenchido, uma ligação recebida, uma mensagem de chat, uma solicitação de agendamento ou um contato via Local Services Ads. Leads brutos incluem tudo: pessoas genuinamente interessadas nos seus serviços, candidatos a emprego, concorrentes, spam, números errados e contatos para serviços que você não oferece.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um lead qualificado é aquele que passou por uma avaliação deliberada com base nos seus critérios. Um lead qualificado para contractor pode atender critérios como tipo de projeto correto, localização correta, orçamento adequado, cronograma realista, envolvimento do decisor, propriedade do imóvel e tamanho mínimo do projeto.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Exemplo:</p>
                  <p>Investimento em anúncios: $6.000</p>
                  <p>Leads brutos: 40</p>
                  <p>Leads qualificados: 12</p>
                  <p className="mt-2 font-bold">CPL bruto: $150</p>
                  <p className="font-bold">Custo por lead qualificado: $500</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O custo por lead qualificado é a métrica mais útil. Uma campanha com CPL bruto de $150 que gera oportunidades a $500 por lead qualificado pode estar performando pior do que uma campanha com CPL bruto de $300 que gera consistentemente oportunidades a $400 por lead qualificado.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Seus critérios de qualificação devem refletir seus serviços reais — exclua apenas as categorias de trabalho que você genuinamente não aceita.
                </p>
              </section>

              {/* Leads baratos */}
              <section id="leads-baratos" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Por Que Leads Baratos Podem Sair Caros</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um CPL bruto baixo pode esconder problemas sérios de performance. Fontes comuns de leads baratos mas de baixo valor incluem candidatos a emprego, fornecedores e subcontratados, spam, números errados, perguntas de quem vai fazer o serviço sozinho, solicitações só de material, reparos pequenos, projetos fora da área de atuação, projetos abaixo do tamanho mínimo e leads que não atendem após múltiplas tentativas de contato.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quando esses contatos representam uma grande parcela do total, um CPL bruto baixo pode mascarar um custo por lead qualificado muito alto, uma taxa de agendamento baixa, muito trabalho de vendas por projeto assinado, uma taxa de proposta baixa, um valor médio de projeto baixo, uma close rate ruim e, no final, um custo de aquisição de cliente elevado.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Campanhas otimizadas puramente por volume de leads — sem considerar o tipo de lead, a taxa de qualificação ou a conversão downstream — frequentemente reduzem o CPL bruto enquanto aumentam o custo real para fechar um projeto.
                </p>
              </section>

              {/* Lead caro */}
              <section id="lead-caro" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Por Que um Lead Caro Ainda Pode Ser Lucrativo</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O exemplo a seguir é ilustrativo — não é um benchmark de mercado.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Exemplo ilustrativo:</p>
                  <p>Custo por lead qualificado: $800</p>
                  <p>Leads qualificados necessários por projeto assinado: 5</p>
                  <p>Custo de aquisição de cliente: $4.000</p>
                  <p>Receita média do projeto: $80.000</p>
                  <p>Margem bruta: 30%</p>
                  <p className="mt-2 font-bold">Lucro bruto estimado antes do custo de aquisição: $24.000</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Se esses números funcionam ou não depende do overhead, dos custos de vendas, do risco de execução, do fluxo de caixa, da capacidade de projetos e da margem real versus estimada. O ponto é que um CPL de $800 não é inerentemente alto ou baixo demais — depende completamente da economia do projeto e do negócio por trás dele.
                </p>
              </section>

              {/* CPL Máximo */}
              <section id="cpl-maximo" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Calcular Seu CPL Máximo</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  O modelo a seguir é simplificado. Uma análise mais completa deve usar a taxa de conversão de leads qualificados e considerar todas as etapas do funil de vendas.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 1: Determine a receita média por projeto</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Use a receita real dos projetos assinados, não o valor orçado. Projetos costumam mudar de escopo entre o orçamento e a conclusão.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 2: Estime o lucro bruto por projeto</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 my-4 font-mono text-sm text-[#0A0A0A]">
                  Lucro bruto por projeto = Receita média × Margem bruta
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 3: Defina um CAC alvo</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Decida quanto do lucro bruto sua empresa pode alocar para adquirir um projeto. Essa é uma decisão de negócio que depende do seu overhead, das metas de crescimento e do ambiente competitivo. Não existe um percentual universalmente correto.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 4: Calcule a taxa de conversão lead-para-contrato</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 my-4 font-mono text-sm text-[#0A0A0A]">
                  Taxa lead-para-contrato = Projetos assinados ÷ Total de leads
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 5: Calcule o CPL máximo acessível</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-4 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">CPL máximo acessível = CAC alvo × Taxa lead-para-contrato</p>
                  <p className="text-[#667085] mt-3">Exemplo:</p>
                  <p>CAC alvo: $3.000</p>
                  <p>Taxa lead-para-contrato: 5%</p>
                  <p className="font-bold mt-1">CPL máximo acessível: $3.000 × 5% = $150</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Este é um modelo simplificado. Uma versão mais detalhada usa a taxa de conversão de leads qualificados e considera todos os custos de aquisição — não apenas o investimento em anúncios.
                </p>
              </section>

              {/* CPL Qualificado */}
              <section id="cpl-qualificado" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Calcular o Custo por Lead Qualificado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quando você tem dados confiáveis sobre sua taxa de conversão de leads qualificados, pode calcular um custo máximo por lead qualificado mais preciso.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">CPL qualificado máximo = CAC alvo × Taxa lead qualificado-para-contrato</p>
                  <p className="text-[#667085] mt-3">Exemplo:</p>
                  <p>CAC alvo: $4.000</p>
                  <p>Taxa lead qualificado-para-contrato: 20%</p>
                  <p className="font-bold mt-1">CPL qualificado máximo: $4.000 × 20% = $800</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Separar leads brutos de qualificados oferece uma visão mais precisa de onde o marketing e o processo de vendas estão performando bem e onde não estão. Um CPL bruto baixo combinado com uma baixa taxa de conversão de leads qualificados frequentemente indica um problema de segmentação ou qualificação, não de preço.
                </p>
              </section>

              {/* Calculadora */}
              <section id="calculadora" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Calculadora do Funil de Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-2">
                  Use esta calculadora para calcular suas principais métricas de custo por lead com seus próprios dados mensais. Todos os cálculos rodam no seu navegador e nenhum dado é armazenado ou transmitido.
                </p>
                <ContractorLeadCalculator locale="pt-BR" />
              </section>

              {/* Tipo de projeto */}
              <section id="tipo-projeto" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como o Tipo de Projeto Muda o CPL Aceitável</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A faixa de CPL aceitável varia significativamente dependendo dos tipos de projetos que o contractor busca. Reparos pequenos têm receita média menor do que remodeling de banheiro ou cozinha. Deck construction, substituição de telhado e remodeling de basement têm perfis de margem, ciclos de venda e ambientes competitivos diferentes. Home additions, ADU construction, whole-home remodeling e custom homes envolvem ciclos de venda mais longos, qualificação mais complexa e, em geral, valores de projeto médios mais altos.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um valor de projeto mais alto pode suportar custos de aquisição mais altos — mas somente quando as margens permanecem saudáveis, a conversão de vendas é consistente, a empresa consegue executar o trabalho, o fluxo de caixa suporta o ciclo de vendas e os leads realmente correspondem ao tipo de projeto pretendido.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Misturar tipos de projeto em uma única campanha sem separar a performance por serviço dificulta avaliar se algum serviço individual está gerando resultados lucrativos.
                </p>
              </section>

              {/* Localização */}
              <section id="localizacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como a Localização Afeta o Custo dos Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A economia dos leads varia entre mercados com base no nível de concorrência local, na densidade populacional, no volume de busca, nos valores dos imóveis, nos valores médios de projeto na área, na sazonalidade, nos requisitos de licenciamento, na distância de deslocamento entre locais de serviço e no tamanho da área de atuação.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Um lead em um mercado urbano denso com muitos contractors concorrentes pode custar mais por clique do que um lead em um mercado suburbano menos competitivo — mas o valor médio do projeto também pode ser significativamente diferente. A pergunta relevante não é se o CPL é mais alto em um mercado, mas se o custo de aquisição total gera projetos lucrativos naquela localização específica.
                </p>
              </section>

              {/* Por canal */}
              <section id="por-canal" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Custo por Lead por Canal de Marketing</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Diferentes canais de marketing têm economias de lead fundamentalmente diferentes. A tabela abaixo resume as dimensões principais — não inclui valores numéricos sem suporte de dados.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Canal</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Intenção Típica</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Modelo de Cobrança</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Controle</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Dificuldade de Atribuição</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Principal Risco de Qualidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Google Search Ads', 'Alta (busca ativa)', 'Por clique', 'Alto', 'Baixa–Média', 'Broad match / negativas fracas'],
                        ['Local Services Ads', 'Alta (busca local)', 'Por lead', 'Baixo–Médio', 'Média', 'Contatos fora do escopo'],
                        ['SEO / Orgânico', 'Mista', 'Custo inicial + contínuo', 'Médio', 'Média', 'Tráfego de intenção informacional'],
                        ['Google Business Profile', 'Alta (intenção local)', 'Listagem gratuita', 'Baixo', 'Média', 'Dependência da qualidade das avaliações'],
                        ['Meta Ads', 'Baixa–Média (geração de demanda)', 'Por clique / impressão', 'Alto', 'Alta', 'Baixa intenção de contratar'],
                        ['Marketplaces de serviços', 'Média', 'Por lead (frequentemente compartilhado)', 'Baixo', 'Alta', 'Lead compartilhado com concorrentes'],
                        ['Indicações', 'Alta', 'Variável (comissão / tempo)', 'Baixo', 'Alta', 'Volume inconsistente'],
                        ['Reativação por e-mail', 'Alta (contatos anteriores)', 'Custo marginal por envio', 'Médio', 'Média', 'Deterioração da lista'],
                        ['Social orgânico', 'Baixa', 'Investimento de tempo', 'Baixo', 'Alta', 'Baixa conversão direta'],
                      ].map(([channel, intent, model, control, attribution, risk]) => (
                        <tr key={channel} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{channel}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{intent}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{model}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{control}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{attribution}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  O Google Search captura demanda ativa de usuários já procurando um contractor. O Local Services Ads pode gerar contatos diretos para serviços e categorias elegíveis. O SEO tem custos iniciais e contínuos, mas não cobra por clique depois que os rankings são estabelecidos. Os Meta Ads podem gerar awareness e demanda, mas não capturam intenção imediata de contratar. Leads de marketplaces podem ser compartilhados com contractors concorrentes dependendo da plataforma e do programa. Indicações envolvem networking, comissões ou esforço operacional que têm um custo real mesmo quando não há taxa direta.
                </p>
              </section>

              {/* Google vs LSA */}
              <section id="google-vs-lsa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">CPL de Google Ads vs Local Services Ads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Comparar apenas o CPL bruto entre Google Search Ads e Local Services Ads pode ser enganoso porque as duas plataformas diferem em método de cobrança, mecanismo de entrega de leads, controle de segmentação, uso de landing page, processo de qualificação, atribuição e requisitos de elegibilidade de serviço.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma comparação mais útil avalia custo por lead qualificado, taxa de agendamento, taxa de estimate, custo de aquisição de cliente, receita assinada e lucro bruto — medidos separadamente para cada canal ao longo de um período longo o suficiente para capturar ciclos de venda completos.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Para um comparativo detalhado de como as duas plataformas funcionam e como avaliá-las para o seu negócio, consulte o artigo sobre{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads para contractors</Link>.
                </p>
              </section>

              {/* Landing page */}
              <section id="landing-page" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como a Landing Page Afeta o CPL</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A landing page que o visitante acessa após clicar em um anúncio influencia diretamente quantos desses cliques se tornam leads e qual é a qualidade do lead que preenche o formulário ou liga. Uma página que converte mais reduz o CPL ao gerar mais leads com o mesmo investimento. Uma página que qualifica melhor os leads reduz o volume de contatos irrelevantes, diminuindo o custo por lead qualificado mesmo que o CPL bruto permaneça igual.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Elementos-chave que influenciam a performance da landing page para contractors incluem um título específico do serviço que corresponde ao anúncio, uma declaração clara da área de atuação, fotos reais de projetos, avaliações genuínas, informações de licença e seguro, um call to action claro e específico, opções de seleção de tipo de projeto no formulário, um formulário conciso com mínimo de atrito, carregamento rápido e uma opção de contato por telefone visível.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Reduzir o CPL baixando o critério de qualificação — aceitando qualquer formulário como lead — aumenta o volume bruto sem melhorar os resultados do negócio. O objetivo não é o menor CPL possível. É o menor custo possível por lead qualificado que gera projetos lucrativos.
                </p>
              </section>

              {/* Tempo de resposta */}
              <section id="tempo-resposta" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como o Tempo de Resposta Afeta o Resultado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O investimento em marketing pode ser desperdiçado quando leads não são contatados com rapidez e consistência. Um lead gerado por anúncios pagos que nunca foi alcançado — por causa de uma ligação perdida, follow-up atrasado ou ausência de processo para fora do horário comercial — representa o CPL completo com zero chance de retorno.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um follow-up eficaz inclui um acknowledgment imediato quando possível, ligações diretas, lembretes por SMS, sequências de e-mail, múltiplas tentativas de contato em um período definido, lembretes de reunião, gestão de tarefas no CRM, responsabilidade clara por cada lead e um processo definido para contatos fora do horário e fins de semana.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Um follow-up mais rápido e consistente reduz o risco de perder um comprador ativo para outro contractor que respondeu primeiro. Para um sistema prático de follow-up, veja o artigo sobre{' '}
                  <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como fazer follow-up com leads de contractors</Link>.
                </p>
              </section>

              {/* Qualificação */}
              <section id="qualificacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como a Qualificação Afeta o CPL</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Os critérios de qualificação definem em quais contatos vale a pena investir esforço de vendas. Para contractors, os critérios relevantes geralmente incluem tipo de serviço correto, localização do projeto dentro da área de atuação, tamanho mínimo do projeto, faixa de orçamento, cronograma desejado, propriedade do imóvel, status do decisor e necessidade de financiamento.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O equilíbrio importa. Qualificação insuficiente cria desperdício de tempo de vendas, contagens de leads infladas e CPLs enganosamente baixos que não refletem a performance real do negócio. Atrito excessivo no processo pode reduzir o preenchimento de formulários por prospects legítimos que não querem responder a muitas perguntas antes de falar com alguém.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A qualificação pode e deve ocorrer em múltiplos pontos de contato: o formulário da landing page, a ligação ou SMS inicial, o processo de entrada no CRM e a própria reunião. Cada etapa oferece uma oportunidade para confirmar o encaixe antes de investir mais tempo.
                </p>
              </section>

              {/* Taxa de fechamento */}
              <section id="taxa-fechamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como a Taxa de Fechamento Muda o CPL Aceitável</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O exemplo a seguir é matemático com um CAC alvo fixo. Não é um benchmark do setor.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">CAC alvo: $3.000</p>
                  <p>Taxa lead-para-contrato: 2% → CPL máximo: $60</p>
                  <p>Taxa lead-para-contrato: 5% → CPL máximo: $150</p>
                  <p>Taxa lead-para-contrato: 10% → CPL máximo: $300</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Melhorar o processo de vendas — resposta mais rápida, melhor qualificação, estimates mais sólidos, follow-up consistente — aumenta o número de leads que convertem em projetos assinados. Isso aumenta diretamente o valor que o contractor pode investir de forma lucrativa em marketing por lead, sem precisar reduzir o CPL.
                </p>
              </section>

              {/* CPL vs CAC */}
              <section id="cpl-vs-cac" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Custo por Lead vs CAC</h2>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Essas métricas medem diferentes estágios do mesmo funil. O CAC está mais próximo do resultado final do negócio do que o CPL bruto.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Métrica</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O Que Mede</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Melhor Uso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Custo por lead', 'Custo para gerar um contato', 'Eficiência de campanha'],
                        ['Custo por lead qualificado', 'Custo para gerar uma oportunidade relevante', 'Avaliação de qualidade dos leads'],
                        ['Custo por reunião', 'Custo para criar uma conversa de vendas agendada', 'Performance de follow-up'],
                        ['Custo de aquisição de cliente', 'Custo para fechar um contrato', 'Rentabilidade do negócio'],
                      ].map(([metric, measures, use]) => (
                        <tr key={metric} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metric}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{measures}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* CPL vs ROAS */}
              <section id="cpl-vs-roas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Custo por Lead vs ROAS</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 my-4 font-mono text-sm text-[#0A0A0A]">
                  ROAS = Receita atribuída assinada ÷ Investimento em anúncios
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O ROAS conecta o investimento em anúncios à receita, o que o torna mais completo do que o CPL bruto. Porém, receita não é lucro bruto. Uma campanha com ROAS de 5x que gera $100.000 em receita ainda pode ser não lucrativa se as margens forem apertadas ou se taxas de agência, custos de vendas e despesas de execução não forem considerados.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Outras limitações incluem atribuição incompleta (ciclos de venda longos podem cruzar janelas de atribuição), valores de projetos assinados que mudam após o contrato, projetos cancelados que distorcem o relatório e timing de recebimento que não coincide com o período de reporte.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Contractors devem revisar CPL, custo por lead qualificado, CAC, ROAS, margem bruta e capacidade de projetos em conjunto — não otimizar para uma única métrica de forma isolada.
                </p>
              </section>

              {/* Rastreamento */}
              <section id="rastreamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Acompanhar Leads Qualificados e Contratos Fechados</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Conectar o investimento em anúncios à receita de projetos assinados exige um fluxo de rastreamento estruturado:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-[#667085] text-sm leading-relaxed mb-5 pl-1">
                  <li>Clique no anúncio ou ligação recebida → Lead criado com fonte registrada</li>
                  <li>Lead qualificado ou desqualificado com motivo registrado</li>
                  <li>Reunião agendada (ou perdida com motivo registrado)</li>
                  <li>Estimate realizado</li>
                  <li>Proposta enviada</li>
                  <li>Projeto ganho ou perdido com valor do contrato e motivo de perda registrados</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Ferramentas e conceitos que suportam esse fluxo incluem acompanhamento de conversões do Google Ads, call tracking com atribuição de fonte, parâmetros UTM em todos os destinos de anúncio, captura de GCLID nos formulários do CRM, gestão de etapas no CRM, importação de conversões offline, enhanced conversions for leads e relatórios de atribuição de receita.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O princípio fundamental é que a plataforma de anúncios e o CRM precisam estar de acordo sobre o que conta como conversão. Um formulário preenchido, um lead qualificado, uma reunião agendada e um contrato assinado representam níveis diferentes de valor para o negócio e devem ser rastreados e valorados separadamente.
                </p>

                <InlineCTA
                  headline="Você Sabe Quanto Seus Leads Realmente Valem?"
                  body="Conectamos investimento em anúncios, qualidade dos leads, reuniões, estimates, etapas do CRM e contratos fechados para identificar seu custo real de aquisição e suas campanhas mais lucrativas."
                  buttonLabel="Solicitar uma Análise Gratuita"
                  locale="pt-BR"
                />
              </section>

              {/* Diagnosticar */}
              <section id="diagnosticar" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Diagnosticar um CPL Alto</h2>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Um CPL alto raramente tem uma única causa. O framework de diagnóstico abaixo identifica as causas raiz mais comuns por categoria.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Problema de tráfego</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Indicadores possíveis: termos de busca irrelevantes ativando anúncios, broad match sem palavras-chave negativas adequadas, palavras-chave de baixa intenção, segmentação geográfica ampla demais ou campanhas alcançando localizações erradas. Para orientação sobre estratégia de keywords, consulte o artigo sobre{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">melhores palavras-chave para Google Ads para general contractors</Link>.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Problema de conversão</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Indicadores possíveis: página com carregamento lento, mensagem desconectada entre anúncio e landing page, formulário confuso ou longo, pouco trust, experiência ruim no mobile ou call to action pouco claro.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Problema de qualificação</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Indicadores possíveis: tipos de projeto errados, trabalhos pequenos, localizações erradas, orçamentos irrealistas, candidatos a emprego, fornecedores ou spam preenchendo a contagem de leads.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Problema de vendas</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Indicadores possíveis: tempo de resposta lento, follow-up inconsistente, ligações perdidas, baixa taxa de agendamento a partir dos contatos feitos, processo de estimate fraco ou falta de responsabilização no CRM.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Problema de economia</h3>
                <p className="text-[#667085] leading-relaxed">
                  Indicadores possíveis: margem de projeto baixa, valor médio de projeto baixo, custos excessivos de deslocamento, close rate ruim, restrições de capacidade ou um CAC alvo desalinhado com a economia real dos projetos. Reduzir lances não é sempre a solução correta — cada causa raiz exige uma correção diferente.
                </p>
              </section>

              {/* Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns ao Avaliar o Custo por Lead</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Comparar CPL bruto entre serviços diferentes sem ajustar pelo valor do projeto</li>
                  <li>Tratar qualquer formulário preenchido como um lead qualificado</li>
                  <li>Ignorar spam e contatos irrelevantes ao calcular o CPL</li>
                  <li>Não rastrear ligações recebidas como leads</li>
                  <li>Comparar CPL entre mercados diferentes sem considerar a economia local</li>
                  <li>Usar receita assinada em vez de lucro bruto para avaliar a performance de marketing</li>
                  <li>Ignorar custos de vendas, taxas de agência e software no custo de aquisição</li>
                  <li>Medir apenas um mês para projetos com ciclos de venda mais longos</li>
                  <li>Otimizar para os leads mais baratos em vez dos mais lucrativos</li>
                  <li>Não registrar motivos de perda no CRM</li>
                  <li>Não separar a performance por tipo de serviço</li>
                  <li>Não separar a performance por localização do serviço</li>
                  <li>Ignorar a performance de follow-up como fator nos resultados de CPL</li>
                  <li>Encerrar campanhas antes de existirem dados de ciclo de venda suficientes para avaliá-las com justiça</li>
                  <li>Manter campanhas que geram leads mas nenhuma receita assinada por períodos prolongados</li>
                </ul>
              </section>

              {/* Orçamento */}
              <section id="orcamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quanto Investir em Geração de Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma abordagem simplificada de planejamento é multiplicar o número de projetos desejados por mês pelo CAC alvo.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Exemplo simplificado:</p>
                  <p>Projetos desejados por mês: 3</p>
                  <p>CAC alvo: $3.000</p>
                  <p className="font-bold mt-1">Orçamento indicativo de aquisição: 3 × $3.000 = $9.000</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Este é um modelo de planejamento, não uma garantia. O orçamento real de marketing pode precisar incluir também taxas de agência, produção de criativos, desenvolvimento e manutenção de landing pages, software de CRM, call tracking e custos de suporte de vendas.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A capacidade de execução também deve ser considerada. Gerar mais projetos assinados do que a empresa consegue entregar no prazo e na qualidade esperada pode prejudicar a experiência do cliente, as margens do projeto, as avaliações online e o fluxo de caixa. O investimento em marketing deve ser calibrado ao que a empresa consegue realmente executar.
                </p>
              </section>

              {/* Resposta final */}
              <section id="resposta-final" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Afinal, Qual É um Bom CPL?</h2>
                <CalloutBox type="tip" label="Conclusão">
                  Um bom custo por lead para um general contractor é aquele que gera consistentemente oportunidades qualificadas e projetos assinados abaixo do custo de aquisição máximo lucrativo da empresa.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Calcule o lucro bruto por projeto usando receita real assinada e margem real.</li>
                  <li>Defina um CAC alvo com base nas suas metas de crescimento e overhead.</li>
                  <li>Meça a taxa real lead-para-contrato usando dados do CRM — não estimativas.</li>
                  <li>Separe leads brutos de qualificados para entender a qualidade real dos leads.</li>
                  <li>Calcule o CPL máximo acessível usando seu CAC alvo e taxa de conversão.</li>
                  <li>Compare a performance por tipo de serviço e localização separadamente.</li>
                  <li>Registre contratos, receita e motivos de perda no CRM.</li>
                  <li>Otimize para lucro bruto por projeto assinado, não para volume de leads ou CPL bruto.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Para o contexto completo de como o CPL se encaixa em uma estratégia de marketing mais ampla para contractors, consulte o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia completo de marketing para general contractors</Link>. Para como as campanhas de Google Ads são estruturadas para gerar esses leads, consulte o{' '}
                  <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de Google Ads para general contractors</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Transforme o Custo dos Leads em Crescimento Lucrativo"
                body="Crie um sistema de marketing que acompanhe cada oportunidade desde o investimento em anúncios até o lead qualificado, contrato fechado, receita e lucro bruto."
                buttonLabel="Agendar uma Análise Gratuita"
                locale="pt-BR"
              />

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} locale="pt-BR" />
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Navegação do artigo">
              <TableOfContents items={tocItems} variant="desktop" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
