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

const SLUG = 'seo-local-para-general-contractors'
const ARTICLE_ID = 'local-seo-general-contractors'

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
  { id: 'o-que-e-seo-local', label: 'O Que É SEO Local para um General Contractor', level: 2 as const },
  { id: 'tres-fatores', label: 'Os Três Fatores que o Google Usa para Ranquear Resultados Locais', level: 2 as const },
  { id: 'categorias', label: 'Escolhendo Categorias de Negócio Corretas', level: 2 as const },
  { id: 'area-atuacao', label: 'Configurando uma Área de Atuação sem Loja Física', level: 2 as const },
  { id: 'avaliacoes', label: 'Avaliações e a Linha que Você Não Pode Cruzar', level: 2 as const },
  { id: 'citacoes', label: 'Citações e Links: A Outra Metade da Proeminência', level: 2 as const },
  { id: 'paginas-servico', label: 'Páginas de Serviço por Cidade e Tipo de Projeto', level: 2 as const },
  { id: 'dados-estruturados', label: 'Dados Estruturados para um Negócio Local', level: 2 as const },
  { id: 'seo-vs-anuncios', label: 'SEO Local vs Google Ads e Local Services Ads', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns de SEO Local em Contractors', level: 2 as const },
  { id: 'medir', label: 'Como Medir o Progresso do SEO Local', level: 2 as const },
  { id: 'checklist', label: 'Checklist de SEO Local para os Primeiros 90 Dias', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'SEO Local para General Contractors' },
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
                href="/blog/local-seo-general-contractors"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
                hrefLang="en-US"
              >
                EN · Read in English
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
                  <span>Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </header>

              {/* Introduction */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um homeowner buscando uma reforma de cozinha hoje à noite não vai ligar para um contractor a três estados de distância. Ele vai olhar o mapa que o Google mostra, escolher dois ou três nomes que parecem próximos, estabelecidos e bem avaliados, e começar por ali. Esse mapa é o primeiro filtro de todo o processo de venda, e ele acontece antes de um site carregar, antes de um anúncio ser clicado e antes de qualquer conversa com um vendedor.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  SEO local é o trabalho de conquistar um lugar nesse primeiro filtro. Para um general contractor não é uma disciplina misteriosa com truques secretos. O Google publica, com as próprias palavras, o que determina o ranqueamento local, o que uma empresa de área de atuação pode fazer com o endereço, e o que é e não é permitido em relação a avaliações. Boa parte do que circula como dica de SEO local é uma repetição, às vezes imprecisa, de orientação que o Google já tornou pública.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo parte diretamente dessa orientação oficial: os três fatores que o Google nomeia para o ranqueamento local, como uma empresa de área de atuação deve ser configurada, a linha que o Google traça em torno de avaliações, e os dados estruturados que a própria documentação do Google recomenda. Para entender onde isso entra dentro de um programa completo de marketing, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* O que é SEO local */}
              <section id="o-que-e-seo-local" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que É SEO Local para um General Contractor</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  SEO nacional tenta ranquear uma página para uma palavra-chave em qualquer lugar onde a busca acontece. SEO local tenta ranquear um negócio específico para buscas ligadas a um lugar específico, e aparece em duas superfícies diferentes: o pacote local com mapa e pins, e os resultados orgânicos comuns abaixo dele. Um general contractor precisa aparecer nos dois, mas o pacote local costuma ser onde o primeiro olhar acontece.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  As entradas que movem o ranqueamento local são diferentes das que movem o ranqueamento orgânico nacional. O Perfil da Empresa no Google, não só o site, é uma superfície de ranqueamento primária por si só. Avaliações, área de atuação, categorias e informações do negócio pesam de um jeito que não tem equivalente para um negócio que não está ligado a um local físico ou raio de atendimento.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  É por essa diferença que um contractor pode ter um site rápido e bem escrito e ainda assim ser invisível na busca local, e por que corrigir SEO local geralmente começa pelo Perfil da Empresa, não pelo site.
                </p>
              </section>

              {/* Três fatores */}
              <section id="tres-fatores" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Os Três Fatores que o Google Usa para Ranquear Resultados Locais</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A própria documentação do Perfil da Empresa do Google nomeia três fatores que determinam o ranqueamento da busca local: relevância, distância e proeminência. Tudo neste artigo é uma aplicação de um desses três.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Fator</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Definição do Google</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O que o Contractor Controla</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Relevância', 'O quanto um Perfil da Empresa corresponde ao que a pessoa está buscando', 'Categorias, descrição do negócio, serviços, páginas de serviço, completude do perfil'],
                        ['Distância', 'A distância entre cada empresa e quem está buscando, ou a área que a pessoa indicou', 'Endereço correto ou área de atuação correta, limites de área de atuação corretos'],
                        ['Proeminência', 'O quão conhecido um lugar é, com base em informação que o Google tem sobre ele pela web', 'Quantidade e qualidade de avaliações, citações, links, presença geral online'],
                      ].map(([factor, def, control]) => (
                        <tr key={factor} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{factor}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{def}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{control}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CalloutBox type="info" label="Direto do Google">
                  O Google afirma claramente que não existe forma de pedir ou pagar por um ranqueamento local melhor. Toda palanca deste artigo é informação que você dá ao Google sobre o seu negócio, ou evidência que o Google encontra sobre ele em outro lugar. Não existe um quarto canal.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-4">
                  Distância é o único fator que um contractor não consegue mudar para uma busca individual. Nenhuma empresa consegue ficar fisicamente mais perto de um homeowner específico. O que um contractor controla é se o perfil informa a área de atuação certa desde o início, o que é tratado em seção própria mais abaixo.
                </p>
              </section>

              {/* Categorias */}
              <section id="categorias" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Escolhendo Categorias de Negócio Corretas</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Categorias alimentam a relevância diretamente, e a própria orientação do Google sobre escolhê-las é mais estreita do que a maioria dos contractors espera. O Google recomenda usar o menor número possível de categorias para descrever o núcleo do negócio, não o maior número que se aplica.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O teste sugerido pelo Google é escolher categorias que completem a frase "esta empresa É uma", não "esta empresa TEM uma". Um general contractor que também faz telhado é um general contractor com um serviço de telhado, não um negócio que deveria listar toda categoria adjacente que é capaz de executar. A orientação do Google também é explícita ao dizer que categorias não devem ser usadas só como palavra-chave para tentar ranquear em buscas extras.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">O teste de categoria do Google</p>
                  <p className="text-[#667085]">Pergunte de cada categoria candidata: minha empresa <em>É</em> isso, ou minha empresa apenas <em>TEM</em> isso como uma oferta entre várias? Mantenha as categorias que passam no teste do É.</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Na prática isso significa escolher primeiro a categoria principal que corresponde com mais precisão ao ofício central (general contractor, reforma de cozinha, empresa de telhado, e assim por diante), e só depois acrescentar o pequeno número de categorias adicionais que de fato descrevem o que a empresa é, não tudo que ela está disposta a orçar.
                </p>
              </section>

              {/* Área de atuação */}
              <section id="area-atuacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Configurando uma Área de Atuação sem Loja Física</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A maioria dos general contractors não tem um showroom que o cliente visita. A orientação do Google para essa situação exata é específica: uma empresa de área de atuação que não recebe clientes no próprio endereço deve remover o endereço e informar uma área de atuação em vez dele.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google impõe dois limites rígidos sobre como essa área de atuação pode ser definida:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>No máximo 20 áreas de atuação, definidas por cidades, CEPs ou outras áreas nomeadas</li>
                  <li>Um limite geral que não deve passar de cerca de duas horas de deslocamento de carro a partir de onde a empresa está baseada</li>
                </ul>
                <CalloutBox type="warning" label="Cuidado">
                  Listar área de atuação muito além de um raio realista de deslocamento não amplia a relevância, ela dilui. Um contractor que afirma cobrir um estado inteiro enquanto na prática atende um raio de 40 minutos está dizendo ao Google que o negócio é relevante para buscas que ele nunca vai atender de forma lucrativa.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Um contractor que de fato tem um escritório público ou um showroom que clientes de verdade visitam é um caso diferente, e mantém esse endereço visível em vez de escondê-lo. A distinção é se os clientes vão até a empresa, não se a empresa tem ou não um endereço.
                </p>
              </section>

              {/* Avaliações */}
              <section id="avaliacoes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Avaliações e a Linha que Você Não Pode Cruzar</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Avaliações alimentam a proeminência diretamente, e o Google nomeia tanto a quantidade quanto a qualidade das avaliações como sinal de proeminência. A forma recomendada pelo Google de construir esse sinal é responder às avaliações, o que ele descreve como evidência de que a empresa valoriza seus clientes, e acumular avaliações genuínas ao longo do tempo.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Existe uma linha firme aqui, e é uma violação de política, não uma zona cinzenta. A política do Google sobre conteúdo incentivado e tendencioso proíbe oferecer pagamento, desconto, produto gratuito ou qualquer outro benefício em troca de o cliente publicar, revisar ou remover uma avaliação. Um cartão-presente por uma avaliação de cinco estrelas, um desconto por "deixar uma avaliação legal" e um pedido para retirar uma avaliação negativa em troca de reembolso são todos a mesma violação.
                </p>
                <CalloutBox type="warning" label="O que acontece se a empresa for pega">
                  O Google afirma que empresas flagradas nesse tipo de atividade de engajamento falso podem ter avaliações despublicadas, perder a capacidade de receber avaliações novas por um período definido, ou ter um aviso exibido no perfil informando o consumidor que avaliações falsas foram removidas. O risco não é um puxão de orelha, é o próprio canal de avaliações ficar no escuro.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  A versão dentro da política de pedir avaliações é simplesmente pedir, logo depois que o projeto termina, sem nenhum benefício associado ao resultado, e responder às avaliações que chegam, boas ou más. Para como isso se encaixa num sistema completo de leads e follow-up, veja{' '}
                  <Link href="/br/blog/como-gerar-leads-qualificados-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como gerar leads qualificados para contractors</Link>.
                </p>

                <InlineCTA
                  headline="Seu Perfil da Empresa Está Realmente Trabalhando a Seu Favor?"
                  body="Auditamos categorias, área de atuação, padrão de avaliações e citações contra a própria orientação do Google, e mostramos exatamente o que está travando seu ranqueamento local."
                  buttonLabel="Peça uma Avaliação Gratuita de SEO Local"
                />
              </section>

              {/* Citações */}
              <section id="citacoes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Citações e Links: A Outra Metade da Proeminência</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google nomeia links de sites apontando para uma empresa, junto com avaliações, como parte do que torna um lugar proeminente. Para um contractor, esses links costumam vir de diretórios, associações do setor, câmaras de comércio locais, páginas de parceiros fornecedores e fabricantes, e cobertura de imprensa de projetos concluídos, mais do que de uma campanha deliberada de construção de links.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma citação é uma menção ao nome, endereço e telefone da empresa em outro site, com ou sem link. Manter esses três dados, geralmente chamados de NAP (nome, endereço, telefone), idênticos em todo lugar em que aparecem é prática padrão de SEO local. Isso não é uma regra que o Google publicou como fator de ranqueamento nesses termos, mas a lógica por trás é direta: uma empresa listada sob três endereços ou telefones levemente diferentes é mais difícil, tanto para o Google quanto para um homeowner conferindo o anúncio, de confirmar como uma única empresa real e contínua.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A versão prática disso não tem glamour: reivindicar ou corrigir anúncios nos diretórios que importam no ofício e na região do contractor, garantir que nome, endereço e telefone correspondam exatamente ao Perfil da Empresa, e deixar que as menções naturais que uma empresa em crescimento ganha façam o resto.
                </p>
              </section>

              {/* Páginas de serviço */}
              <section id="paginas-servico" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Páginas de Serviço por Cidade e Tipo de Projeto</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Relevância não é decidida só pelo Perfil da Empresa. As próprias páginas do site dizem ao Google, e ao homeowner que as lê, exatamente o que a empresa faz e onde. Uma única página afirmando cobrir todo serviço em toda cidade que a empresa está disposta a dirigir até é mais difícil para o Google corresponder com confiança a uma busca específica do que um conjunto de páginas focadas.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma estrutura que costuma funcionar bem para um general contractor combina dois eixos: uma página por serviço principal (reforma de cozinha, reforma de banheiro, ampliações, telhado, e assim por diante) e, onde a empresa de fato atende mercados distintos, uma página por cidade ou região principal dentro da área de atuação. Cada página deve descrever trabalho real feito naquele serviço ou localização, não um modelo raso repetido só trocando o nome da cidade.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O que essas páginas precisam além do conteúdo escrito, incluindo prova, caminhos de contato e performance técnica, está completo em{' '}
                  <Link href="/br/blog/o-que-todo-site-de-general-contractor-deve-ter" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">o que todo site de general contractor deve ter</Link>.
                </p>
              </section>

              {/* Dados estruturados */}
              <section id="dados-estruturados" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Dados Estruturados para um Negócio Local</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Dados estruturados são marcação legível por máquina no site que declara fatos sobre a empresa de forma explícita, em vez de deixar o Google inferir a partir do texto. A própria documentação do Google exige nome da empresa e endereço completo para elegibilidade como LocalBusiness, e recomenda acrescentar horário de funcionamento, telefone, coordenadas geográficas, faixa de preço e uma URL de site funcional.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A documentação do Google também faz uma recomendação específica sobre qual tipo usar: usar o subtipo de LocalBusiness mais específico disponível, não o genérico. O schema.org define uma hierarquia de tipos exatamente para isso, com <code className="text-xs bg-[#F4F6F8] px-1.5 py-0.5 border border-[#D0D5DD]">GeneralContractor</code> definido como subtipo de <code className="text-xs bg-[#F4F6F8] px-1.5 py-0.5 border border-[#D0D5DD]">HomeAndConstructionBusiness</code>, que por sua vez é subtipo de <code className="text-xs bg-[#F4F6F8] px-1.5 py-0.5 border border-[#D0D5DD]">LocalBusiness</code>. Marcar uma empresa de construção como um LocalBusiness genérico, quando existe um tipo mais específico e correto, é deixar informação de relevância na mesa.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Dados estruturados mínimos para o site de um general contractor:</p>
                  <p>"@type": "GeneralContractor"</p>
                  <p>name, address (exigidos para elegibilidade)</p>
                  <p>telephone, openingHoursSpecification, geo, priceRange, url (recomendados)</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Uma empresa de área de atuação que esconde o endereço físico no Perfil da Empresa do Google ainda deve marcar um endereço postal ou operacional nos dados estruturados onde ela tiver um, ou omitir o campo de endereço inteiramente em vez de publicar um enganoso. Dados estruturados e Perfil da Empresa devem contar a mesma história, não duas histórias diferentes.
                </p>
              </section>

              {/* SEO vs anúncios */}
              <section id="seo-vs-anuncios" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">SEO Local vs Google Ads e Local Services Ads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  SEO local e canais pagos locais respondem perguntas diferentes, e tratá-los como opções concorrentes em vez de complementares é um erro comum de planejamento. SEO local constrói uma posição no Maps e nos resultados orgânicos que continua gerando visibilidade sem cobrança por clique ou por lead, mas leva meses para se construir, não pode ser ligado para uma semana específica, e compete pelos mesmos sinais, relevância, distância e proeminência, com todo outro contractor da região.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Ads e Local Services Ads compram posição e leads num prazo muito mais rápido, mas no momento em que o investimento para, a visibilidade para também. Um contractor que depende só de posição paga está alugando o topo da página de resultados todo mês. Um contractor que também construiu SEO local ainda é dono de uma posição quando o orçamento aperta.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Para uma comparação completa entre os dois canais pagos, veja{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads para general contractors</Link>. Os programas mais fortes rodam canais pagos e orgânicos locais ao mesmo tempo, em vez de escolher entre eles.
                </p>
              </section>

              {/* Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns de SEO Local em Contractors</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Selecionar uma lista longa de categorias em vez das poucas que de fato passam no teste "É uma" do Google</li>
                  <li>Manter um endereço de loja visível no Perfil da Empresa quando clientes nunca o visitam de fato</li>
                  <li>Declarar uma área de atuação muito maior que um raio realista de deslocamento</li>
                  <li>Oferecer desconto, brinde ou reembolso em troca de uma avaliação, o que viola diretamente a política do Google</li>
                  <li>Nunca responder às avaliações, positivas ou negativas</li>
                  <li>Deixar nome, endereço ou telefone da empresa ficarem dessincronizados entre diretórios</li>
                  <li>Publicar uma única página genérica em vez de páginas específicas por serviço e por cidade de fato atendida</li>
                  <li>Marcar o site como LocalBusiness genérico em vez do subtipo específico de GeneralContractor ou construção</li>
                  <li>Tratar SEO local e anúncios locais pagos como substitutos em vez de rodar os dois juntos</li>
                  <li>Abandonar o Perfil da Empresa depois da configuração inicial em vez de manter horário, fotos e serviços atualizados</li>
                </ul>
              </section>

              {/* Medir */}
              <section id="medir" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Medir o Progresso do SEO Local</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  SEO local não tem um número único de dashboard como uma campanha paga, então o progresso precisa ser lido em conjunto a partir de alguns sinais diferentes, não de uma métrica isolada:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Dados de performance do Perfil da Empresa: ligações, pedidos de rota e cliques para o site originados do próprio perfil</li>
                  <li>Volume de avaliações e tendência da nota ao longo do tempo, não uma foto isolada</li>
                  <li>Tráfego orgânico de busca para páginas de serviço e de cidade, medido separadamente do tráfego pago</li>
                  <li>Posição de ranqueamento para a busca pela marca e para as buscas de serviço-mais-cidade que mais importam para o negócio</li>
                  <li>Dados de origem de lead no CRM, para que um lead atribuído a orgânico ou ao Maps seja registrado como tal, em vez de cair num grupo "outros"</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  A mesma disciplina que vale para leads pagos vale aqui: um lead vindo de SEO local ainda precisa ser rastreado até um projeto assinado para saber se o canal está de fato funcionando, não só gerando visibilidade. O framework para conectar qualquer origem de lead à receita assinada está em{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">qual é um bom custo por lead para general contractors</Link>.
                </p>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Checklist de SEO Local para os Primeiros 90 Dias</h2>
                <CalloutBox type="tip" label="Resumo">
                  Ranqueamento local se resume a relevância, distância e proeminência. Cada item abaixo é um investimento em um desses três, ligado diretamente a orientação que o próprio Google publicou.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Reivindicar e verificar o Perfil da Empresa no Google, se isso ainda não foi feito.</li>
                  <li>Reduzir a lista de categorias às poucas que de fato passam no teste "esta empresa É uma".</li>
                  <li>Configurar a área de atuação corretamente: esconder o endereço se clientes nunca são atendidos no local, e manter o limite dentro de um raio realista de deslocamento.</li>
                  <li>Preencher todos os campos disponíveis: horário, telefone, site, descrição do negócio, serviços, atributos e fotos.</li>
                  <li>Começar um processo simples e dentro da política para pedir avaliação a todo cliente satisfeito, sem nenhum incentivo associado.</li>
                  <li>Responder a toda avaliação que chegar, positiva ou negativa.</li>
                  <li>Auditar nome, endereço e telefone da empresa nos diretórios que importam no ofício e corrigir qualquer divergência.</li>
                  <li>Construir ou reescrever páginas de serviço por ofício e por cidade, cada uma com conteúdo real e específico daquele serviço e localização.</li>
                  <li>Acrescentar dados estruturados de GeneralContractor ou o subtipo de construção correto ao site.</li>
                  <li>Configurar o rastreamento para que leads orgânicos e do Maps sejam registrados por origem no CRM, não agrupados.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Nada disso substitui canais pagos, e nada disso produz resultado da noite para o dia. Constrói a posição que continua gerando visibilidade muito depois de qualquer campanha paga terminar. Para o sistema completo em que isso se encaixa, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Transforme a Busca Local numa Fonte Real de Leads"
                body="Construímos Perfis da Empresa, páginas de serviço e dados estruturados que seguem a própria orientação de ranqueamento do Google, para sua empresa aparecer onde os homeowners já estão procurando."
                buttonLabel="Peça uma Avaliação Gratuita de SEO Local"
              />

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} locale="pt-BR" />
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Article navigation">
              <TableOfContents items={tocItems} variant="desktop" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
