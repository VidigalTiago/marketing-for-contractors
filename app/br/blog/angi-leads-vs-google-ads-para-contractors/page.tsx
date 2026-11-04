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

const SLUG = 'angi-leads-vs-google-ads-para-contractors'
const ARTICLE_ID = 'angi-leads-vs-google-ads-for-contractors'

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
        'x-default': alternates['en-US'] ?? article.canonicalUrl,
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
  { id: 'o-que-e-angi-leads', label: 'O Que É o Angi Leads e Como Funciona', level: 2 as const },
  { id: 'angi-ads', label: 'Angi Ads É um Programa Separado', level: 2 as const },
  { id: 'google-ads-2026', label: 'O Que o Google Ads Significa para um Contractor em 2026', level: 2 as const },
  { id: 'modelo-cobranca', label: 'Modelo de Cobrança: Taxa Compartilhada vs Campanha Própria', level: 2 as const },
  { id: 'exclusividade', label: 'Exclusividade do Lead: A Diferença Central', level: 2 as const },
  { id: 'controle', label: 'Controle de Segmentação e Investimento', level: 2 as const },
  { id: 'reputacao', label: 'Reputação e Exigências de Elegibilidade', level: 2 as const },
  { id: 'tabela-comparativa', label: 'Comparação Lado a Lado', level: 2 as const },
  { id: 'qual-encaixa', label: 'Qual Plataforma Se Encaixa em Qual Contractor', level: 2 as const },
  { id: 'usar-os-dois', label: 'Usar os Dois ao Mesmo Tempo', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns na Escolha Entre os Dois', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Angi Leads vs Google Ads para Contractors' },
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

          {/* Breadcrumbs + seletor de idioma */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
            <Breadcrumbs items={breadcrumbs} />
            {alternates['en-US'] && (
              <Link
                href="/blog/angi-leads-vs-google-ads-for-contractors"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
                hrefLang="en-US"
              >
                EN · Read in English
              </Link>
            )}
          </div>

          {/* ToC mobile */}
          <div className="lg:hidden mb-8">
            <TableOfContents items={tocItems} variant="mobile" />
          </div>

          <div className="flex gap-12">
            <article className="flex-1 min-w-0">

              {/* Cabeçalho do artigo */}
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
                  {article.updatedDate !== article.publishedDate && (
                    <span>· Atualizado em {new Date(article.updatedDate).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  )}
                </div>
              </header>

              {/* Introdução */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  Angi Leads e Google Ads tentam resolver o mesmo problema para um general contractor, aparecer na frente de um homeowner pronto para contratar, mas funcionam em modelos quase opostos. O Angi Leads é um marketplace: o homeowner envia uma solicitação e o Angi a encaminha para vários contractors ao mesmo tempo, e cada um deles paga uma taxa por esse mesmo lead. O Google Ads é uma campanha que o próprio contractor monta e administra, seja uma campanha de Search tradicional cobrada por clique em palavras-chave escolhidas por ele, seja, desde que o Local Services Ads passou a fazer parte do Google Ads durante 2026, uma campanha Performance Max construída em torno de uma meta de pagamento por lead.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Nenhuma das duas plataformas é uma fraude, e nenhuma é automaticamente a resposta certa. A pergunta prática para um contractor já ocupado tocando projetos é qual modelo se encaixa no estágio real do negócio: quanto tempo há para administrar uma campanha, quão consolidado já é o histórico de avaliações, e o quanto importa que um lead tenha sido enviado só para a sua empresa em vez de para várias.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo compara as duas plataformas usando as próprias políticas e documentações oficiais de cada uma, não afirmações de terceiros. Para o sistema de marketing mais amplo em que os dois canais se encaixam, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* O que é Angi Leads */}
              <section id="o-que-e-angi-leads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que É o Angi Leads e Como Funciona</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Angi Leads é o programa de correspondência de solicitações antes chamado de HomeAdvisor Pro, hoje operando sob a marca unificada Angi depois da fusão entre Angie's List e HomeAdvisor. O homeowner preenche uma solicitação de serviço descrevendo o projeto, e o Angi usa esse perfil completo para encaminhar a solicitação a contractors que correspondem ao tipo de trabalho e à área de atuação.
                </p>
                <CalloutBox type="info" label="Da Própria Central de Ajuda do Angi">
                  O Angi afirma que o perfil de serviço completo é usado para "conectar clientes com múltiplos profissionais do Angi Leads que possam concluir o projeto" (tradução livre). A mesma solicitação não é enviada a um único contractor. Ela é enviada a vários ao mesmo tempo.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A cobrança é por lead. A própria FAQ do Angi para profissionais afirma que o contractor "paga uma taxa nominal por cada lead correspondido" e que "projetos de tamanhos diferentes têm taxas de lead diferentes", sem publicar uma tabela de preços fixa, direcionando o contractor a falar com o time de vendas para valores atuais. O Angi também não cria nenhuma expectativa de volume: a própria documentação de ajuda afirma, "Não garantimos nada. No momento em que um consumidor envia uma solicitação de serviço que corresponde às suas preferências de trabalho, entraremos em contato" (tradução livre).
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O contractor configura a conta definindo o tipo de trabalho realizado e a área geográfica atendida, o que determina para quais solicitações o negócio é elegível. Não existe mecanismo de lance e não há como ver quantas outras empresas receberam a mesma solicitação.
                </p>
              </section>

              {/* Angi Ads */}
              <section id="angi-ads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Angi Ads É um Programa Separado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Angi Leads e Angi Ads costumam ser tratados como um produto só, mas o próprio Angi os trata como dois programas diferentes dentro da mesma plataforma. O Angi Ads é posicionamento pago, não correspondência de solicitações: uma empresa se torna "Angi Approved" quando tem pelo menos uma avaliação, mantém nota média de 3 estrelas ou mais, tem o proprietário, sócio-administrador ou gerente responsável aprovado em verificação de antecedentes, e possui todas as licenças estaduais e locais aplicáveis.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Empresas Angi Approved podem então pagar para anunciar pelo site, pela revista e pela central de atendimento do Angi, e aparecem listadas acima das empresas que não são Angi Approved nos resultados de busca. Uma empresa que não atinge a nota, a verificação de antecedentes ou a exigência de licença não é elegível para o posicionamento do Angi Ads, independentemente do orçamento disponível.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A distinção prática importa para esta comparação: um contractor que diz "o Angi não funcionou para mim" pode estar descrevendo o Angi Leads, o Angi Ads, ou os dois, e cada um tem exigências de elegibilidade, lógica de cobrança e formas de falhar diferentes.
                </p>
              </section>

              {/* Google Ads em 2026 */}
              <section id="google-ads-2026" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que o Google Ads Significa para um Contractor em 2026</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma campanha de Search tradicional do Google é baseada em palavras-chave e cobrada por clique. O contractor escolhe as keywords, a segmentação geográfica, o orçamento, a estratégia de lances e a landing page para onde o anúncio leva. Para o detalhamento completo de seleção de palavras-chave, veja{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">as melhores palavras-chave de Google Ads para general contractors</Link>.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O que mudou em 2026 é que o Local Services Ads, antes um produto separado com painel próprio, passou a fazer parte diretamente do Google Ads. Segundo a Central de Ajuda do Google Ads, as campanhas do Local Services estão migrando para dentro do Google Ads como um tipo de campanha Performance Max construído em torno de uma meta de pagamento por lead. A migração começou em agosto de 2026 para categorias selecionadas de serviços residenciais e com loja física nos Estados Unidos, se expande para mais grupos de anunciantes até o fim de 2026, e chega às contas fora dos EUA em 2027.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Várias coisas continuam iguais durante essa migração: a empresa continua pagando só por leads válidos, como ligações e mensagens, não por clique; os anúncios continuam aparecendo no Google Search e no Google Maps nas mesmas posições; e a segmentação continua sem palavras-chave, baseada em categoria de serviço e área de atuação. O que muda é a superfície de gestão, que sai de um painel independente do LSA para dentro da interface principal do Google Ads, e os controles de lance, com orçamentos semanais convertidos em médias diárias e limites manuais de lance sendo removidos.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Na prática, "Google Ads" para um contractor em 2026 cobre dois modelos de cobrança diferentes sob o mesmo guarda-chuva: uma campanha de Search cobrada por clique que o contractor monta do zero, e uma meta de pagamento por lead do Performance Max que absorveu o que antes era o produto separado Local Services Ads. Para a comparação completa entre essas duas opções do próprio Google, veja{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads para general contractors</Link>.
                </p>
              </section>

              {/* Modelo de cobrança */}
              <section id="modelo-cobranca" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Modelo de Cobrança: Taxa Compartilhada vs Campanha Própria</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  As três opções entre as quais um contractor está de fato escolhendo cobram de três formas diferentes.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Plataforma</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Base de Cobrança</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Quem Define o Preço</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Preço Publicado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Angi Leads', 'Por lead, independente do resultado', 'Angi, por tamanho de projeto e categoria', 'Não publicado; precisa falar com vendas'],
                        ['Google Search Ads', 'Por clique', 'Anunciante, via lances e orçamento', 'Visível em tempo real dentro da plataforma'],
                        ['Local Services (meta de lead do Google Ads)', 'Por lead válido (ligação ou mensagem)', 'Anunciante define um custo-alvo por lead', 'Visível em tempo real dentro da plataforma'],
                      ].map(([plataforma, base, quem, preco]) => (
                        <tr key={plataforma} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{plataforma}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{base}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{quem}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{preco}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  No Angi Leads, a taxa é definida pelo Angi e é a mesma independentemente de o contractor ganhar o projeto ou não. Nas duas opções do Google Ads, o contractor define o orçamento e pode ajustá-lo em tempo real com base nos resultados. Nenhum dos dois modelos de cobrança é inerentemente mais barato. A comparação relevante é custo por lead qualificado e custo por projeto assinado, detalhada em{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">qual é um bom custo por lead para general contractors</Link>.
                </p>
              </section>

              {/* Exclusividade */}
              <section id="exclusividade" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Exclusividade do Lead: A Diferença Central</h2>
                <CalloutBox type="warning" label="A Diferença Que Mais Importa">
                  O Angi Leads pode enviar a solicitação de um homeowner para vários contractors que pagam por ela. A própria política de anúncios do Google proíbe isso para o Local Services: os anunciantes "não podem vender ou passar leads para outras empresas", então um lead entregue pelo Local Services pertence à empresa que o recebeu, não a um grupo de concorrentes.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O próprio material de divulgação do Google afirma a mesma coisa do lado do homeowner: "O cliente escolhe você: você só é contatado por clientes que escolheram especificamente o seu perfil entre todos os outros" (tradução livre). Essa descrição é específica do Local Services Ads, não de uma campanha de Search tradicional, em que um clique não carrega a mesma garantia de "foi você quem escolheram", mas ela capta a diferença estrutural entre um lead do Google Ads e um lead do Angi Leads.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Isso não torna um lead do Local Services automaticamente mais valioso. O homeowner já filtrou entre os perfis de contractor visíveis no Google antes de entrar em contato, enquanto a correspondência do Angi acontece nos bastidores, sem o homeowner ver quem mais está sendo contatado. A exclusividade é real, mas não substitui a necessidade de qualificar e fazer follow-up de todo lead, independentemente da origem.
                </p>
              </section>

              {/* Controle */}
              <section id="controle" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Controle de Segmentação e Investimento</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma campanha de Search do Google dá o controle mais direto: seleção de palavras-chave, palavras-chave negativas, raio geográfico, texto do anúncio, landing page e orçamento são todos definidos pelo contractor e podem ser alterados a qualquer momento. Uma campanha com meta de lead do Local Services é sem palavras-chave, construída em torno de categorias de serviço e de uma área de atuação definida, com o contractor definindo um custo-alvo por lead em vez de um lance por clique.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O Angi Leads fica na outra ponta do espectro de controle. O contractor define o tipo de trabalho e a área geográfica atendida, o que determina a elegibilidade, mas não há mecanismo de lance, não há como ajustar como a solicitação é roteada, e não há visibilidade sobre quantas outras empresas foram correspondidas à mesma solicitação. A contrapartida dessa falta de controle é um esforço de configuração menor: não existe pesquisa de palavras-chave nem landing page para construir antes do primeiro lead poder chegar.
                </p>
              </section>

              {/* Reputação */}
              <section id="reputacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reputação e Exigências de Elegibilidade</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Os dois ecossistemas reservam seu posicionamento de maior visibilidade para quem passa por uma verificação de reputação e licenciamento, mas as verificações são independentes uma da outra, e se qualificar numa não diz nada sobre a outra.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><span className="font-medium text-[#0A0A0A]">Angi Approved (para o Angi Ads):</span> pelo menos uma avaliação, nota média de 3 estrelas ou mais, verificação de antecedentes aprovada do proprietário, sócio-administrador ou gerente responsável, e licenças estaduais e locais válidas.</li>
                  <li><span className="font-medium text-[#0A0A0A]">Google Guaranteed (para a meta de lead do Local Services):</span> verificação de antecedentes e de licença nas categorias de home improvement elegíveis, exigida antes do selo aparecer no perfil. O Google removeu recentemente a exigência de enviar o documento da licença de início em muitas categorias norte-americanas na qualificação inicial, pelo fluxo de Verificação Acelerada, embora a exigência de licença do órgão estadual ou local correspondente continue existindo.</li>
                  <li><span className="font-medium text-[#0A0A0A]">Google Search Ads tradicional:</span> sem exigência de licença do ofício nem verificação de antecedentes só para lançar uma campanha, apenas a verificação de identidade padrão do Google para anunciantes e o cumprimento das políticas gerais de anúncio.</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  O próprio Angi Leads, diferente do Angi Ads, não publica um limite de nota de avaliação só para receber solicitações correspondidas, o que é parte do motivo de conseguir gerar volume para uma empresa que ainda está construindo seu histórico de avaliações.
                </p>

                <InlineCTA
                  headline="Não Sabe Qual Origem de Lead Está Realmente Valendo a Pena?"
                  body="Rastreamos cada lead até sua origem, seja Angi, Google Search ou Local Services, para você ver custo por lead qualificado e receita assinada por canal em vez de adivinhar."
                  buttonLabel="Peça uma Avaliação Gratuita de Marketing"
                />
              </section>

              {/* Tabela comparativa */}
              <section id="tabela-comparativa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Comparação Lado a Lado</h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Dimensão</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Angi Leads</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Google Ads (Search / Local Services)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Exclusividade do lead', 'Compartilhado com vários pros por solicitação', 'Exclusivo no Local Services; leads de Search vêm do seu próprio anúncio'],
                        ['Esforço de configuração', 'Baixo: definir tipo de trabalho e área geográfica', 'Maior: palavras-chave, landing page ou configuração da meta de lead'],
                        ['Controle de segmentação', 'Só categoria e área, sem lance', 'Controle total no Search; categoria e área no Local Services'],
                        ['Barreira de reputação', 'Nenhuma no Angi Leads; nota e verificação no Angi Ads', 'Nenhuma no Search Ads; verificação de antecedentes no Local Services'],
                        ['Transparência de preço', 'Taxa não publicada; varia por tamanho de projeto', 'Visível em tempo real dentro da plataforma'],
                        ['Garantia de volume', 'Explicitamente nenhuma', 'Nenhuma, mas orçamento e segmentação são ajustáveis diretamente'],
                      ].map(([dimensao, angi, google]) => (
                        <tr key={dimensao} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{dimensao}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{angi}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{google}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Qual encaixa */}
              <section id="qual-encaixa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Qual Plataforma Se Encaixa em Qual Contractor</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Um negócio novo, construindo suas primeiras avaliações</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  O Angi Leads não exige um histórico de avaliações consolidado para começar a receber solicitações correspondidas, o que pode gerar volume enquanto um negócio ainda é jovem demais para o Google Guaranteed ou para o SEO local já ter construído visibilidade orgânica. O custo real ainda precisa ser medido como custo por projeto assinado depois de considerar a taxa de fechamento em leads compartilhados, não como a taxa bruta do lead.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Um negócio consolidado, com avaliações e licenciamento em dia</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Uma vez que a empresa consegue passar pela verificação de antecedentes e de licença para o Google Guaranteed, a meta de lead do Local Services oferece leads exclusivos a um preço por lead que o próprio contractor define e ajusta, sem a contrapartida de lead compartilhado do Angi Leads.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Um negócio com capacidade de administrar uma campanha diretamente</h3>
                <p className="text-[#667085] leading-relaxed">
                  Uma campanha de Search tradicional oferece o maior controle sobre quem vê o anúncio e o que vê a seguir, mas também carrega o maior trabalho de configuração e gestão contínua: pesquisa de palavras-chave, manutenção de negativas, qualidade da landing page e rastreamento de conversão. Encaixa melhor num negócio com capacidade de marketing interna ou uma agência do que num que espera um canal sem gestão nenhuma.
                </p>
              </section>

              {/* Usar os dois */}
              <section id="usar-os-dois" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Usar os Dois ao Mesmo Tempo</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Os dois não são mutuamente exclusivos, e muitas empresas de serviço local já estabelecidas rodam mais de uma origem de lead ao mesmo tempo, em vez de apostar tudo num único canal. O detalhamento completo de como diferentes canais se comparam em economia de lead está em{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">qual é um bom custo por lead para general contractors</Link>.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O requisito para rodar vários canais de forma lucrativa é rastrear todo lead até sua origem no CRM, usando números de call tracking ou parâmetros UTM por canal, e comparar custo por lead qualificado e receita assinada separadamente. Um lead compartilhado de marketplace e um lead exclusivo de busca não têm o mesmo valor por unidade, e misturá-los numa média só esconde qual canal está de fato gerando trabalho lucrativo. Para a disciplina de follow-up que faz qualquer um desses canais valer a pena, veja{' '}
                  <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como fazer follow-up com leads de contractors</Link>.
                </p>
              </section>

              {/* Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns na Escolha Entre os Dois</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Comparar a taxa por lead do Angi diretamente com o custo por clique do Google como se medissem a mesma coisa</li>
                  <li>Supor que toda solicitação do Angi Leads chega só para a sua empresa</li>
                  <li>Confundir Angi Ads (posicionamento pago, com barreira de nota) com Angi Leads (correspondência de solicitação, sem barreira de nota publicada)</li>
                  <li>Lançar uma meta de lead do Local Services antes de concluir a verificação de antecedentes e de licença</li>
                  <li>Rodar uma campanha de Search sem separar custo por lead qualificado do custo bruto por clique</li>
                  <li>Julgar qualquer uma das plataformas depois de uma única semana fraca, em vez de um ciclo de vendas completo</li>
                  <li>Misturar leads de várias origens num campo só do CRM em vez de rastrear a origem separadamente por canal</li>
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Descubra Qual Origem de Lead Realmente Faz Seu Negócio Crescer"
                body="Configuramos rastreamento em cada origem de lead, Angi, Google Search e Local Services, para você ver custo por lead qualificado e receita assinada por canal, não só o investimento total."
                buttonLabel="Agende uma Avaliação Gratuita de Marketing"
              />

              {/* Artigos relacionados */}
              <RelatedArticles articles={relatedArticles} locale="pt-BR" />
            </article>

            {/* ToC desktop */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Navegação do artigo">
              <TableOfContents items={tocItems} variant="desktop" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
