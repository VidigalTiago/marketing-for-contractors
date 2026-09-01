import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticleBySlug, getAlternateLanguages, getRelatedArticles, SITE_URL } from '@/lib/articles'
import NavbarPT from '@/components/pt/navbar-pt'
import NavbarPTCTAWrapper from '@/components/blog/navbar-pt-cta-wrapper'
import TableOfContents from '@/components/blog/table-of-contents'
import RelatedArticles from '@/components/blog/related-articles'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import FAQSection from '@/components/blog/faq-section'
import InlineCTA from '@/components/blog/inline-cta'
import EndArticleCTA from '@/components/blog/end-article-cta'
import ReadingProgress from '@/components/blog/reading-progress'
import CalloutBox from '@/components/blog/callout-box'
import { CTA_URL_PT } from '@/lib/articles'

const SLUG = 'melhores-palavras-chave-google-ads-para-general-contractors'
const ARTICLE_ID = 'best-google-ads-keywords-for-general-contractors'

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
        'pt-BR': alternates['pt-BR'] ?? article.canonicalUrl,
        'en-US': alternates['en-US'] ?? '',
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
  { id: 'o-que-sao-keywords', label: 'O Que São Palavras-Chave no Google Ads?', level: 2 as const },
  { id: 'boa-keyword', label: 'O Que Torna uma Keyword Boa?', level: 2 as const },
  { id: 'general-contractor', label: 'Keywords para General Contractors', level: 2 as const },
  { id: 'kitchen-remodeling', label: 'Palavras-Chave para Kitchen Remodeling', level: 2 as const },
  { id: 'bathroom-remodeling', label: 'Palavras-Chave para Bathroom Remodeling', level: 2 as const },
  { id: 'home-additions', label: 'Palavras-Chave para Home Additions', level: 2 as const },
  { id: 'adu', label: 'Palavras-Chave para ADU Contractors', level: 2 as const },
  { id: 'deck', label: 'Palavras-Chave para Deck Builders', level: 2 as const },
  { id: 'roofing', label: 'Palavras-Chave para Roofing Contractors', level: 2 as const },
  { id: 'basement', label: 'Palavras-Chave para Basement Remodeling', level: 2 as const },
  { id: 'custom-home', label: 'Palavras-Chave para Custom Home Builders', level: 2 as const },
  { id: 'localizacao', label: 'Palavras-Chave Baseadas em Localização', level: 2 as const },
  { id: 'modificadores', label: 'Modificadores de Intenção Comercial', level: 2 as const },
  { id: 'informativas-vs-comerciais', label: 'Informativas vs Comerciais', level: 2 as const },
  { id: 'tipos-correspondencia', label: 'Tipos de Correspondência', level: 2 as const },
  { id: 'negativas', label: 'Palavras-Chave Negativas', level: 2 as const },
  { id: 'estrutura-campanhas', label: 'Organizando por Campanha e Ad Group', level: 2 as const },
  { id: 'valor-projeto', label: 'Keywords pelo Valor do Projeto', level: 2 as const },
  { id: 'relatorio-search-terms', label: 'Relatório de Search Terms', level: 2 as const },
  { id: 'performance', label: 'Avaliando a Performance', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns na Estratégia', level: 2 as const },
  { id: 'recomendacoes-finais', label: 'Recomendações Finais', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Melhores Palavras-Chave para General Contractors' },
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
          .concat([{ '@type': 'ListItem', position: breadcrumbs.filter((b) => b.href).length + 1, name: article.title, item: article.canonicalUrl }]),
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
      <NavbarPTCTAWrapper />

      <main className="bg-white pt-28 pb-20" id="article-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs + hreflang switcher */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
            <Breadcrumbs items={breadcrumbs} />
            {alternates['en-US'] && (
              <Link
                href="/blog/best-google-ads-keywords-for-general-contractors"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
              >
                Read in English
              </Link>
            )}
          </div>

          {/* Article header */}
          <div className="max-w-3xl mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-3">
              {article.category} &middot; {article.readingTime} min de leitura
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] leading-tight mb-4 text-balance">
              {article.title}
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed mb-6">{article.excerpt}</p>
            <p className="text-xs text-[#98A2B3]">
              Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
              {article.updatedDate !== article.publishedDate && (
                <> &middot; Atualizado em {new Date(article.updatedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</>
              )}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-12 lg:gap-16 items-start">

            {/* Article body */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <TableOfContents items={tocItems} locale="pt-BR" variant="mobile" />

              {/* Introdução */}
              <div className="prose-section mb-10">
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  O erro mais comum que contractors cometem com palavras-chave de Google Ads é tratar volume de busca como sinônimo de valor. Uma keyword com alto volume mensal pode gerar cliques de homeowners pesquisando ideias, comparando preços ou buscando informações para fazer eles mesmos — nenhum deles pronto para contratar um profissional esta semana.
                </p>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  As keywords que geram leads lucrativos para construção geralmente combinam três elementos:
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 mb-4 font-mono text-sm text-[#0A0A0A]">
                  Serviço + intenção de contratação + localização
                </div>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Exemplos com forte intenção comercial:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 mb-4 pl-1">
                  <li>General contractor near me</li>
                  <li>Kitchen remodeling contractor in Boston</li>
                  <li>Home addition builder near me</li>
                  <li>ADU contractor in Los Angeles</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Uma estratégia de keywords que prioriza o valor potencial do projeto, a qualificação e a qualidade dos leads geralmente supera uma estratégia focada em volume de cliques. Este guia cobre como selecionar, organizar e avaliar keywords para campanhas de Google Ads voltadas para projetos de construção e reforma residencial. Para uma visão completa de como campanhas para contractors funcionam, veja o{' '}
                  <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia completo de Google Ads para general contractors</Link>.
                </p>
              </div>

              {/* H2: O Que São Keywords */}
              <section id="o-que-sao-keywords" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que São Palavras-Chave no Google Ads?</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  No Google Ads, uma keyword é uma palavra ou frase que você adiciona à sua campanha para ajudar o Google a entender quais pesquisas podem ser relevantes para seus anúncios. Quando um usuário faz uma busca, o Google analisa suas keywords — junto com seus lances, quality score e outros sinais — para determinar se seu anúncio é elegível para ser exibido.
                </p>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Um search term é a frase real que o usuário digitou ou falou e que fez seu anúncio se tornar elegível. Keywords e search terms nem sempre são iguais.
                </p>
                <CalloutBox type="info" label="Keyword ≠ Search term">
                  Se você adiciona a keyword <strong>kitchen remodeling contractor</strong>, seu anúncio pode aparecer para buscas como "kitchen renovation company near me" ou "hire kitchen remodeling contractor." A keyword acionou o anúncio; o search term é o que o usuário realmente digitou. Revisar o relatório de search terms regularmente ajuda a entender quais buscas reais sua campanha está alcançando.
                </CalloutBox>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Os tipos de correspondência (match types) influenciam o grau de proximidade necessário entre uma busca e sua keyword para que o anúncio seja elegível. O Google Ads moderno considera o significado e a intenção das pesquisas, não apenas padrões literais de palavras. Uma keyword escrita sem um formato específico de match type geralmente é tratada como broad match por padrão.
                </p>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Como keywords e search terms podem diferir, contractors devem revisar o relatório de search terms regularmente — não depender apenas da lista de keywords — para entender quais buscas estão realmente gerando atividade nos anúncios.
                </p>
              </section>

              {/* H2: Boa Keyword */}
              <section id="boa-keyword" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que Torna uma Keyword Boa para Contractors?</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Uma boa keyword para contractors compartilha várias características:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-2 mb-4 pl-1">
                  <li><strong>Serviço relevante</strong> — corresponde ao que você realmente oferece</li>
                  <li><strong>Intenção comercial</strong> — sugere que a pessoa pode estar procurando contratar, não apenas pesquisar</li>
                  <li><strong>Relevância geográfica</strong> — segmenta uma localização que você pode atender com lucro</li>
                  <li><strong>Categoria de projeto clara</strong> — descreve um escopo definido, não um tema vago</li>
                  <li><strong>Potencial de valor do projeto</strong> — o tipo de serviço justifica o custo do anúncio</li>
                  <li><strong>Alinhamento com a landing page</strong> — a intenção da busca corresponde ao que a página apresenta</li>
                  <li><strong>Alinhamento com suas capacidades</strong> — você pode entregar o que a keyword implica</li>
                  <li><strong>Potencial de conversão mensurável</strong> — a keyword pode ser rastreada até leads e projetos</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">Um framework útil para keywords:</p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 mb-4 font-mono text-sm text-[#0A0A0A]">
                  Serviço + modificador de contratação + modificador geográfico
                </div>
                <p className="text-[#3D3D3D] leading-relaxed mb-3">Exemplos:</p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Kitchen remodeling + contractor + near me</li>
                  <li>Home addition + builder + Boston</li>
                  <li>ADU + contractor + Los Angeles</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed mt-4">
                  Nem toda keyword eficaz exige os três elementos. Contexto, estrutura da campanha e match types também influenciam a performance.
                </p>
              </section>

              {/* H2: General Contractor */}
              <section id="general-contractor" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave de Alta Intenção para General Contractors</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Estas keywords representam buscas que podem indicar que um homeowner está ativamente procurando contratar um general contractor. Use os placeholders <code className="bg-[#F4F6F8] px-1.5 py-0.5 text-xs">[city]</code>, <code className="bg-[#F4F6F8] px-1.5 py-0.5 text-xs">[state]</code> e <code className="bg-[#F4F6F8] px-1.5 py-0.5 text-xs">[service area]</code> para suas localizações reais.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>General contractor near me</li>
                  <li>General contractor in [city]</li>
                  <li>Residential general contractor</li>
                  <li>Licensed general contractor near me</li>
                  <li>Local general contractor</li>
                  <li>General contracting company</li>
                  <li>Home renovation contractor</li>
                  <li>Home remodeling contractor near me</li>
                  <li>Construction contractor near me</li>
                  <li>General contractor estimate</li>
                </ul>
              </section>

              {/* H2: Kitchen */}
              <section id="kitchen-remodeling" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Kitchen Remodeling</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Kitchen remodeling é uma das categorias residenciais mais competitivas. Keywords que combinam um modificador de serviço com elemento geográfico tendem a atrair buscas de maior intenção.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Kitchen remodeling contractor near me</li>
                  <li>Kitchen remodel company</li>
                  <li>Kitchen renovation contractor</li>
                  <li>Kitchen remodeling company in [city]</li>
                  <li>Custom kitchen remodeling</li>
                  <li>Full kitchen remodel contractor</li>
                  <li>High-end kitchen remodeling</li>
                  <li>Kitchen contractor estimate</li>
                  <li>Kitchen renovation company near me</li>
                  <li>Design-build kitchen remodeling</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed mb-3">
                  Algumas buscas sugerem intenção informativa em vez de contratação imediata. Essas podem ser melhores como alvos de conteúdo SEO, públicos de remarketing ou conteúdo de topo de funil:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Kitchen ideas</li>
                  <li>Kitchen colors</li>
                  <li>Kitchen design inspiration</li>
                  <li>DIY kitchen remodel</li>
                </ul>
              </section>

              {/* H2: Bathroom */}
              <section id="bathroom-remodeling" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Bathroom Remodeling</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Buscas de bathroom remodeling podem variar de pequenos reparos a reformas completas de suíte master. Alinhar keywords ao escopo real dos seus serviços ajuda a evitar leads incompatíveis.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Bathroom remodeling contractor near me</li>
                  <li>Bathroom renovation company</li>
                  <li>Bathroom remodeler in [city]</li>
                  <li>Full bathroom renovation</li>
                  <li>Master bathroom remodeling contractor</li>
                  <li>Bathroom renovation estimate</li>
                  <li>Bathroom remodeling company near me</li>
                  <li>Custom bathroom remodel</li>
                  <li>Shower remodeling contractor</li>
                  <li>Bathroom design-build contractor</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Buscas orientadas a reparos (leaking shower, broken tile repair, faucet replacement) geralmente indicam um tipo de projeto e orçamento diferente de uma reforma completa. Se você não realiza pequenos reparos, considere adicionar termos comuns de reparo como negativos.
                </p>
              </section>

              {/* H2: Home Addition */}
              <section id="home-additions" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Home Additions</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Home additions representam altos valores de projeto e ciclos de venda mais longos. Keywords nessa categoria atraem prospects geralmente mais avançados na pesquisa, mas a qualificação do projeto — orçamento, prazo, licenças — é especialmente importante antes de investir budget significativo de lances.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Home addition contractor near me</li>
                  <li>Room addition contractor</li>
                  <li>Home addition builder</li>
                  <li>Second-story addition contractor</li>
                  <li>House extension contractor</li>
                  <li>Home expansion contractor</li>
                  <li>Addition contractor in [city]</li>
                  <li>Home addition estimate</li>
                  <li>Design-build home addition</li>
                  <li>General contractor for home addition</li>
                </ul>
              </section>

              {/* H2: ADU */}
              <section id="adu" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para ADU Contractors</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  A terminologia e a demanda por ADU (accessory dwelling unit) variam significativamente por estado e regulamentações locais. Segmente keywords de ADU apenas onde sua licença e as permissões locais permitem operação.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>ADU contractor near me</li>
                  <li>ADU builder in [city]</li>
                  <li>Accessory dwelling unit contractor</li>
                  <li>Garage conversion contractor</li>
                  <li>Backyard ADU builder</li>
                  <li>Detached ADU contractor</li>
                  <li>ADU construction company</li>
                  <li>ADU design-build company</li>
                  <li>ADU construction estimate</li>
                  <li>General contractor for ADU</li>
                </ul>
              </section>

              {/* H2: Deck */}
              <section id="deck" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Deck Builders</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Buscas por construção de deck são distintas de buscas sobre materiais, selantes ou móveis de deck. Adicionar palavras-chave negativas para essas categorias evita cliques não qualificados.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Deck builder near me</li>
                  <li>Deck contractor in [city]</li>
                  <li>Custom deck builder</li>
                  <li>Composite deck contractor</li>
                  <li>Wood deck builder</li>
                  <li>Deck construction company</li>
                  <li>Deck replacement contractor</li>
                  <li>Deck installation company</li>
                  <li>Backyard deck contractor</li>
                  <li>Deck construction estimate</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed mb-2">Considere adicionar como negativas:</p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Deck furniture / deck chairs / deck accessories</li>
                  <li>Deck stain / deck paint / deck sealer</li>
                  <li>DIY deck plans / deck blueprints</li>
                  <li>Deck materials / lumber</li>
                </ul>
              </section>

              {/* H2: Roofing */}
              <section id="roofing" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Roofing Contractors</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Buscas de roofing podem refletir situações de reparo emergencial ou projetos de substituição planejados. Essas situações representam urgências, orçamentos e prazos de decisão diferentes. Misturá-las em um único ad group dificulta a personalização dos anúncios e das landing pages para a intenção específica.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Roofing contractor near me</li>
                  <li>Roof replacement contractor</li>
                  <li>Roofing company in [city]</li>
                  <li>Residential roofing contractor</li>
                  <li>New roof estimate</li>
                  <li>Licensed roofing company</li>
                  <li>Roof installation contractor</li>
                  <li>Local roofing company</li>
                  <li>Metal roofing contractor</li>
                  <li>Shingle roof contractor</li>
                </ul>
              </section>

              {/* H2: Basement */}
              <section id="basement" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Basement Remodeling</h2>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Basement remodeling contractor</li>
                  <li>Basement finishing company</li>
                  <li>Basement renovation contractor near me</li>
                  <li>Finished basement contractor</li>
                  <li>Basement conversion contractor</li>
                  <li>Basement remodel estimate</li>
                  <li>Basement remodeling company in [city]</li>
                  <li>Basement design-build company</li>
                  <li>Custom basement renovation</li>
                  <li>Basement finishing contractor near me</li>
                </ul>
              </section>

              {/* H2: Custom Home */}
              <section id="custom-home" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave para Custom Home Builders</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Buscas por custom home builders geralmente atraem prospects com intenção séria de projeto, mas também podem incluir pessoas em fase inicial de pesquisa comparando construtores, plantas e preços. As landing pages devem comunicar claramente suas capacidades específicas, processo e área de atuação.
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Custom home builder near me</li>
                  <li>Custom home builder in [city]</li>
                  <li>Luxury home builder</li>
                  <li>Design-build custom homes</li>
                  <li>New home construction company</li>
                  <li>Custom house contractor</li>
                  <li>Residential home builder</li>
                  <li>Local custom home builder</li>
                  <li>Build a custom home</li>
                  <li>Custom home construction company</li>
                </ul>
              </section>

              {/* H2: Localização */}
              <section id="localizacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave Baseadas em Localização</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Modificadores geográficos ajudam a conectar buscas com intenção de contratação local. Padrões comuns:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Near me</li>
                  <li>In [city]</li>
                  <li>[serviço] in [city]</li>
                  <li>[serviço] near [neighborhood]</li>
                  <li>[serviço] in [county]</li>
                  <li>Local [serviço]</li>
                  <li>[state] contractor</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Segmente apenas localizações que você pode atender com lucro. Fatores a considerar ao decidir quais locais segmentar:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1">
                  <li>Distância de deslocamento e tempo da equipe</li>
                  <li>Requisitos de licença por jurisdição</li>
                  <li>Valor médio de projeto na área</li>
                  <li>Qualidade histórica dos leads e taxa de fechamento da localização</li>
                  <li>Valores imobiliários e níveis de investimento em reformas</li>
                  <li>Disponibilidade e capacidade da equipe</li>
                </ul>
              </section>

              {/* H2: Modificadores */}
              <section id="modificadores" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Modificadores de Intenção Comercial</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Modificadores combinados com o nome de um serviço podem sinalizar diferentes tipos de intenção:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse mb-4">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Modificador</th>
                        <th className="text-left px-4 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Sinal de intenção provável</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['contractor / company / builder', 'Provavelmente procurando contratar um profissional'],
                        ['near me / local / in [city]', 'Intenção geográfica, frequentemente alta intenção de contratar'],
                        ['licensed / certified', 'Verificação de qualidade ou credenciais'],
                        ['estimate / quote', 'Comparando ativamente ou planejando'],
                        ['hire / find', 'Linguagem direta de contratação'],
                        ['design-build / full-service', 'Preferência por projeto completo'],
                        ['custom / high-end / luxury', 'Sinal de escopo ou orçamento do projeto'],
                        ['replacement', 'Necessidade definida de projeto, não apenas pesquisa'],
                      ].map(([mod, intent]) => (
                        <tr key={mod} className="border-b border-[#F4F6F8]">
                          <td className="px-4 py-2 border border-[#D0D5DD] text-[#667085] font-mono text-xs">{mod}</td>
                          <td className="px-4 py-2 border border-[#D0D5DD] text-[#667085]">{intent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* H2: Info vs Comercial */}
              <section id="informativas-vs-comerciais" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave Informativas vs Comerciais</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Buscas informativas e comerciais exigem respostas diferentes. Usar termos informativos como keywords principais em uma campanha de alta intenção frequentemente leva a alto volume de cliques com baixa taxa de conversão.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Busca</th>
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Intenção provável</th>
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Adequação paid</th>
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Ação recomendada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Kitchen remodeling contractor near me', 'Comercial — provável contratação', 'Alta', 'Keyword principal da campanha'],
                        ['Kitchen renovation company in Boston', 'Comercial — contratação local', 'Alta', 'Keyword principal da campanha'],
                        ['Kitchen remodel cost', 'Informativa / comercial', 'Média', 'Landing page de custo ou negativa'],
                        ['Kitchen remodel ideas', 'Informativa', 'Baixa', 'Conteúdo SEO ou negativa'],
                        ['How to remodel a kitchen', 'Informativa / DIY', 'Baixa', 'Conteúdo SEO ou negativa'],
                        ['Best kitchen layouts', 'Informativa', 'Baixa', 'SEO ou negativa'],
                      ].map(([search, intent, fit, action]) => (
                        <tr key={search} className="border-b border-[#F4F6F8]">
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{search}</td>
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{intent}</td>
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{fit}</td>
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* H2: Match Types */}
              <section id="tipos-correspondencia" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Tipos de Correspondência no Google Ads</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-6">
                  O Google Ads atualmente suporta três match types positivos para campanhas de Search. O matching moderno considera o significado e a intenção das pesquisas — não apenas padrões literais de palavras.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Broad Match</h3>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  O broad match permite que sua keyword corresponda a buscas relacionadas ao seu significado, incluindo termos que podem não conter nenhuma das suas palavras-chave. Oferece o maior alcance e pode revelar temas de busca que você não havia considerado. No entanto, depende fortemente de dados de conversão precisos e gerenciamento ativo de palavras-chave negativas. Sem rastreamento confiável, o broad match pode gerar tráfego irrelevante significativo.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Phrase Match</h3>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  O phrase match exibe anúncios para buscas que incluem o significado da sua keyword. Não é definido estritamente como exigir cada palavra na mesma ordem — o matching do Google considera intenção e significado. Oferece mais controle direcional do que o broad match, permitindo ainda alguma variação.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Exact Match</h3>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  O exact match oferece o controle mais preciso dos três match types positivos. Ainda pode corresponder a buscas com o mesmo significado ou intenção da sua keyword — não se limita apenas a texto idêntico. Limita o alcance em comparação com os outros match types, mas geralmente produz tráfego mais previsível.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        {['Match type', 'Alcance', 'Controle', 'Descoberta', 'Monitoramento', 'Uso potencial'].map((h) => (
                          <th key={h} className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Broad', 'Alto', 'Baixo', 'Alto', 'Alto', 'Campanhas com dados sólidos de conversão'],
                        ['Phrase', 'Médio', 'Médio', 'Médio', 'Médio', 'Segmentação direcional com flexibilidade'],
                        ['Exact', 'Baixo', 'Alto', 'Baixo', 'Menor', 'Precisão em termos comprovados'],
                      ].map(([type, ...rest]) => (
                        <tr key={type} className="border-b border-[#F4F6F8]">
                          <td className="px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A] text-xs">{type}</td>
                          {rest.map((cell, i) => (
                            <td key={i} className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* H2: Negativas */}
              <section id="negativas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave Negativas para General Contractors</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Palavras-chave negativas evitam que seus anúncios sejam exibidos para buscas com baixa probabilidade de gerar leads qualificados. Ao contrário das keywords positivas, as negativas usam uma lógica de correspondência própria e requerem gerenciamento separado.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Emprego e educação</h3>
                <ul className="list-disc list-inside text-[#3D3D3D] space-y-1 pl-1 mb-4">
                  {['Jobs', 'Careers', 'Salary', 'Employment', 'Apprenticeship', 'Training', 'Course', 'Classes', 'Certification exam', 'Resume'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">DIY e informativo</h3>
                <ul className="list-disc list-inside text-[#3D3D3D] space-y-1 pl-1 mb-4">
                  {['DIY', 'How to', 'Tutorial', 'Plans', 'Blueprint', 'Ideas', 'Images', 'Pictures', 'Definition', 'Meaning'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Materiais e equipamentos</h3>
                <ul className="list-disc list-inside text-[#3D3D3D] space-y-1 pl-1 mb-4">
                  {['Materials only', 'Supplies', 'Wholesale', 'Used tools', 'Equipment rental', 'Calculator', 'Software'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Serviços fora do escopo</h3>
                <p className="text-[#3D3D3D] leading-relaxed mb-2">Adicione apenas se você genuinamente não oferece o serviço relacionado:</p>
                <ul className="list-disc list-inside text-[#3D3D3D] space-y-1 pl-1 mb-4">
                  {['Handyman', 'Small repair', 'Furniture', 'Cleaning', 'Painting only'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Exclusões comerciais ou residenciais</h3>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Contractors residenciais podem precisar excluir buscas de projetos comerciais. Contractors comerciais podem precisar excluir buscas residenciais. Revise os search terms reais para identificar quais exclusões são relevantes para o seu negócio.
                </p>
              </section>

              {/* H2: Estrutura de Campanhas */}
              <section id="estrutura-campanhas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Organizar Keywords por Campanha e Ad Group</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  A estrutura da campanha deve refletir seus serviços reais e prioridades de orçamento. Organizar por serviço permite controle independente de lances, budgets e mensagens para cada categoria.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 font-mono text-xs text-[#0A0A0A] mb-4 overflow-x-auto">
                  <pre>{`Campanha: Kitchen Remodeling
  Ad group: Kitchen remodeling contractor
  Ad group: Kitchen renovation company
  Ad group: Custom kitchen remodeling

Campanha: Home Additions
  Ad group: Home addition contractor
  Ad group: Room addition builder
  Ad group: Second-story additions

Campanha: ADU Construction
  Ad group: ADU contractor
  Ad group: Garage conversion
  Ad group: Detached ADU builder`}</pre>
                </div>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Ad groups relevantes e bem definidos ajudam a manter consistência em todo o caminho de busca:
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 font-mono text-xs text-[#0A0A0A] mb-4">
                  Busca → Keyword → Anúncio → Landing page → Qualificação do lead
                </div>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Você não precisa de um ad group separado para cada pequena variação de keyword. Quando keywords compartilham o mesmo significado e intenção de landing page, mantê-las juntas é geralmente mais prático e fácil de gerenciar.
                </p>
              </section>

              {/* H2: Valor do Projeto */}
              <section id="valor-projeto" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Escolher Keywords pelo Valor do Projeto</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Nem todas as keywords merecem o mesmo lance ou alocação de orçamento. Ao avaliar quais serviços priorizar nas suas campanhas, considere:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-2 pl-1 mb-4">
                  <li><strong>Valor médio do contrato</strong> — serviços de maior valor suportam um custo por lead mais alto</li>
                  <li><strong>Margem bruta</strong> — serviços lucrativos justificam lances mais agressivos</li>
                  <li><strong>Taxa de fechamento</strong> — uma taxa de conversão mais alta altera seu custo máximo aceitável por lead</li>
                  <li><strong>Meta de custo de aquisição</strong> — seu gasto máximo permitido para adquirir um projeto (veja{' '}
                    <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como calcular seu CPL alvo</Link>)</li>
                  <li><strong>Capacidade da equipe</strong> — você consegue realmente executar mais leads para esse serviço?</li>
                  <li><strong>Duração do ciclo de venda</strong> — ciclos mais longos prendem orçamento sem feedback rápido</li>
                  <li><strong>Requisitos de qualificação</strong> — alguns projetos exigem mais triagem antes do investimento</li>
                  <li><strong>Economia da área de atuação</strong> — valores imobiliários e níveis de investimento em reformas variam por localização</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Uma keyword que gera menos contatos, mas de maior valor, pode superar uma keyword de alto volume em termos de receita assinada real. Priorize keywords onde você consegue medir o resultado completo — do clique ao lead qualificado até o contrato assinado.
                </p>
              </section>

              {/* H2: Relatório de Search Terms */}
              <section id="relatorio-search-terms" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Usar o Relatório de Termos de Pesquisa</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  O relatório de search terms no Google Ads mostra as buscas reais que geraram atividade nos seus anúncios. É uma das ferramentas mais importantes para gerenciar a performance de keywords porque revela a diferença entre as keywords que você adicionou e as buscas que realmente acionaram seus anúncios.
                </p>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">Use-o para:</p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Encontrar a linguagem real que seus clientes-alvo usam</li>
                  <li>Identificar palavras-chave negativas a partir de buscas irrelevantes</li>
                  <li>Descobrir novos temas de keyword que valem ser adicionados</li>
                  <li>Comparar o significado dos search terms com suas keywords selecionadas</li>
                  <li>Identificar padrões geográficos no seu tráfego</li>
                  <li>Avaliar quais buscas se correlacionam com leads qualificados</li>
                  <li>Refinar a estrutura de campanha e ad group</li>
                </ul>
                <CalloutBox type="warning" label="Nem todas as buscas são visíveis">
                  O Google não exibe todas as consultas de busca que acionaram seus anúncios. O relatório mostra um subconjunto das buscas. Isso significa que o trabalho com palavras-chave negativas nunca está completo — você pode estar pagando por buscas irrelevantes que não aparecem no relatório.
                </CalloutBox>
                <p className="text-[#3D3D3D] leading-relaxed mt-4">
                  Conecte a análise de search terms com os resultados reais dos seus leads. Quando um search term gera um lead, registre o que aconteceu: foi qualificado? Resultou em um orçamento? O projeto foi assinado? Conectar search terms a estágios do CRM, gravações de chamadas e receita assinada fornece os dados necessários para tomar decisões reais de keyword.
                </p>
              </section>

              {/* Inline CTA */}
              <InlineCTA
                headline="As Pesquisas Certas Estão Gerando os Projetos Certos?"
                body="Analisamos suas keywords, termos de pesquisa, landing pages, qualidade dos leads e contratos fechados para identificar quais buscas estão gerando projetos lucrativos."
                buttonLabel="Solicitar uma Análise Gratuita"
              />

              {/* H2: Performance */}
              <section id="performance" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Avaliar a Performance das Palavras-Chave</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Cliques e impressões medem visibilidade e tráfego — não medem resultados de negócio. Avaliar a performance de keywords exige rastrear mais abaixo no caminho de conversão:
                </p>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-2 pl-1">
                  <li><strong>Impressões</strong> — quantas vezes o anúncio foi exibido</li>
                  <li><strong>Taxa de cliques (CTR)</strong> — porcentagem de impressões que resultaram em cliques</li>
                  <li><strong>Custo por clique (CPC)</strong> — custo médio por cada clique</li>
                  <li><strong>Taxa de conversão</strong> — porcentagem de cliques que se tornaram leads</li>
                  <li><strong>Custo por lead</strong> — gasto total dividido pelos leads gerados</li>
                  <li><strong>Taxa de lead qualificado</strong> — porcentagem de leads que atenderam seus critérios de projeto</li>
                  <li><strong>Custo por lead qualificado</strong> — gasto dividido por leads qualificados</li>
                  <li><strong>Taxa de agendamento</strong> — leads qualificados que resultaram em reuniões</li>
                  <li><strong>Taxa de orçamento</strong> — agendamentos que resultaram em orçamentos enviados</li>
                  <li><strong>Taxa de fechamento</strong> — orçamentos que resultaram em contratos assinados</li>
                  <li><strong>Custo de aquisição de cliente</strong> — gasto total para adquirir um projeto assinado</li>
                  <li><strong>Receita assinada</strong> — valor do contrato vinculado à fonte da keyword</li>
                  <li><strong>Lucro bruto por fonte</strong> — a métrica mais significativa a longo prazo</li>
                </ul>
                <p className="text-[#3D3D3D] leading-relaxed mt-4">
                  Uma keyword com alto CTR ainda pode ser não lucrativa se os leads que gera são de baixa qualidade. Otimize em direção à receita assinada e ao lucro bruto, não a cliques.
                </p>
              </section>

              {/* H2: Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns na Estratégia de Keywords para Contractors</h2>
                <ul className="list-disc list-inside text-[#3D3D3D] leading-relaxed space-y-2 pl-1">
                  <li>Usar uma campanha para todos os serviços — impede controle de orçamento por serviço</li>
                  <li>Segmentar keywords muito amplas — atrai tráfego de baixa intenção ou irrelevante</li>
                  <li>Ignorar o relatório de search terms — perde buscas irrelevantes custando dinheiro real</li>
                  <li>Não construir ou manter listas de palavras-chave negativas</li>
                  <li>Misturar reparos emergenciais e grandes reformas em um único ad group</li>
                  <li>Segmentar áreas de serviço não lucrativas para atender</li>
                  <li>Enviar todas as keywords para a homepage em vez de páginas de serviço relevantes</li>
                  <li>Otimizar para volume bruto de leads em vez de oportunidades qualificadas</li>
                  <li>Usar termos informativos como keywords comerciais principais</li>
                  <li>Tratar todos os match types de forma idêntica sem avaliar trade-offs</li>
                  <li>Copiar listas de keywords de concorrentes sem validar a qualidade dos leads</li>
                  <li>Manter keywords que geram leads mas não produzem projetos assinados</li>
                  <li>Não conectar gasto de keywords à receita assinada no CRM</li>
                </ul>
              </section>

              {/* H2: Recomendações Finais */}
              <section id="recomendacoes-finais" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Recomendações Finais</h2>
                <p className="text-[#3D3D3D] leading-relaxed mb-4">
                  Não existe uma lista universal estática de melhores keywords para contractors. As melhores keywords para suas campanhas são as que consistentemente produzem projetos qualificados e lucrativos para seus serviços específicos, na sua área de atuação real, a um custo que sustenta a economia do seu negócio.
                </p>
                <ol className="list-decimal list-inside text-[#3D3D3D] leading-relaxed space-y-2 pl-1 mb-4">
                  <li>Comece com os serviços que geram os projetos mais lucrativos para o seu negócio</li>
                  <li>Priorize intenção comercial em vez de volume de busca</li>
                  <li>Adicione relevância geográfica para localizações que você pode atender com lucro</li>
                  <li>Organize campanhas por serviço, não por volume de keyword</li>
                  <li>Alinhe landing pages à intenção da keyword — não envie tudo para a homepage</li>
                  <li>Use match types de forma intencional baseada nos objetivos e na qualidade dos dados</li>
                  <li>Construa e atualize regularmente suas listas de palavras-chave negativas</li>
                  <li>Revise o relatório de search terms para entender o que seus anúncios estão realmente correspondendo</li>
                  <li>Rastreie leads qualificados — não apenas preenchimentos de formulário ou ligações</li>
                  <li>Otimize em direção a projetos assinados e lucro bruto por fonte</li>
                </ol>
                <p className="text-[#3D3D3D] leading-relaxed">
                  Para contexto sobre como a estratégia de keywords se encaixa em um sistema completo de marketing para contractors, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>. Para entender como o Google Search Ads se compara ao Local Services Ads como escolha de canal, veja{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads para contractors</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} locale="pt-BR" />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Crie uma Estratégia de Keywords Mais Lucrativa"
                body="Tenha uma campanha de Google Ads focada em pesquisas qualificadas, serviços rentáveis e receita comprovadamente gerada."
                buttonLabel="Agendar uma Análise Gratuita"
                locale="pt-BR"
              />

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} locale="pt-BR" />
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Navegação do artigo">
              <TableOfContents items={tocItems} locale="pt-BR" variant="desktop" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
