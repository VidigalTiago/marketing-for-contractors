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

const SLUG = 'como-escolher-uma-agencia-de-marketing-para-general-contractors'
const ARTICLE_ID = 'choosing-a-marketing-agency-for-contractors'

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
  { id: 'por-que-contratar-uma-agencia', label: 'Por Que General Contractors Contratam uma Agência', level: 2 as const },
  { id: 'o-que-uma-agencia-faz', label: 'O Que uma Agência de Marketing para Contractors Realmente Faz', level: 2 as const },
  { id: 'agencia-vs-interno', label: 'Agência vs Marketeiro Interno vs Freelancer', level: 2 as const },
  { id: 'modelos-de-cobranca', label: 'Como Agências de Marketing para Contractors Cobram', level: 2 as const },
  { id: 'propriedade-das-contas', label: 'Quem Deve Ser Proprietário das Contas e dos Dados', level: 2 as const },
  { id: 'avaliar-cases', label: 'Como Avaliar Cases e Resultados Anteriores', level: 2 as const },
  { id: 'perguntas-para-fazer', label: 'Perguntas Para Fazer Antes de Contratar', level: 2 as const },
  { id: 'termos-de-contrato', label: 'Termos de Contrato Que Vale a Pena Ler com Atenção', level: 2 as const },
  { id: 'sinais-de-alerta', label: 'Sinais de Que a Agência Não É um Bom Encaixe', level: 2 as const },
  { id: 'periodo-de-teste', label: 'Definindo um Período de Teste Justo', level: 2 as const },
  { id: 'relatorios', label: 'Como É um Bom Relatório', level: 2 as const },
  { id: 'nicho-vs-generalista', label: 'Agência Especializada vs Agência Generalista', level: 2 as const },
  { id: 'erros-comuns', label: 'Erros Comuns ao Contratar uma Agência', level: 2 as const },
  { id: 'checklist', label: 'Um Checklist Simples de Avaliação de Agência', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Como Escolher uma Agência de Marketing para General Contractors' },
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
                href="/blog/choosing-a-marketing-agency-for-contractors"
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
                  Praticamente todo general contractor chega num ponto parecido: indicação e boca a boca deixam de ser suficientes para manter a agenda cheia, e o negócio precisa de um motor de marketing em que possa confiar. A decisão seguinte, contratar uma agência, é onde boa parte desse impulso se perde, porque o mercado de agências está cheio de fornecedores que parecem idênticos numa chamada de vendas e se comportam de forma muito diferente depois que o contrato é assinado.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O problema raramente é falta de agência disposta a assumir o negócio. É a falta de um framework claro para separar uma agência que vai gerar projeto assinado de uma que vai gerar um dashboard bonito e pouco mais. Modelo de cobrança, propriedade das contas, duração de contrato e hábito de relatório variam enormemente entre fornecedores, e boa parte dessa variação só fica visível depois da primeira fatura.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo percorre o que uma agência de marketing para contractors realmente faz, como as agências cobram pelo trabalho, quem deve ser o proprietário de qual conta, os termos de contrato que valem atenção, e as perguntas e sinais de alerta específicos que separam uma boa contratação de um erro caro. Para o sistema de marketing mais amplo em que essa decisão se encaixa, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* Por que contratar */}
              <section id="por-que-contratar-uma-agencia" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Por Que General Contractors Contratam uma Agência</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A decisão de contratar costuma seguir um de poucos padrões: o fluxo de leads por indicação estagnou ou caiu, o proprietário ou o gerente do escritório está gastando horas por semana em tarefas de marketing para as quais não foi treinado, um canal específico como Google Ads ou SEO local ficou técnico demais para administrar sem conhecimento dedicado, ou o negócio está entrando numa fase de crescimento que a indicação sozinha não consegue sustentar rápido o suficiente.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Nenhum desses motivos garante que contratar uma agência é a decisão certa a qualquer preço ou com qualquer fornecedor. Eles explicam por que a conversa começa. O que acontece depois dessa conversa, como a agência é escolhida e administrada, é o que determina se a decisão se paga.
                </p>
              </section>

              {/* O que faz */}
              <section id="o-que-uma-agencia-faz" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que uma Agência de Marketing para Contractors Realmente Faz</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  O escopo varia por fornecedor, mas a maioria das agências de marketing para contractors oferece alguma combinação das áreas de serviço abaixo. Nem toda agência cobre toda linha, e é exatamente por isso que o escopo precisa ser confirmado por escrito, não assumido.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Área de Serviço</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Entrega Típica</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Busca paga', 'Configuração de campanha Google Ads, gestão de palavras-chave e negativas, estratégia de lance'],
                        ['SEO local', 'Otimização do Google Business Profile, citações, estratégia de avaliações, páginas locais'],
                        ['Site', 'Design, hospedagem, copy focada em conversão, manutenção e atualização contínuas'],
                        ['Rastreamento', 'Números de call tracking, rastreamento de conversão, parâmetros UTM, integração com CRM'],
                        ['Conteúdo', 'Artigos de blog, páginas de serviço, cases, sequências de e-mail'],
                        ['Relatório', 'Revisão mensal de performance ligada a leads, agendamentos e receita assinada'],
                      ].map(([area, entrega]) => (
                        <tr key={area} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{area}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{entrega}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Uma agência full-service pode cobrir as seis linhas numa taxa só. Uma agência especializada pode cobrir só busca paga ou só SEO, deixando o contractor contratar separadamente o trabalho de site e conteúdo. Nenhum dos dois modelos está errado, mas os dois não são intercambiáveis, e comparar um retainer full-service com a taxa de um especialista de canal único sem ajustar pelo escopo é uma fonte comum de confusão ao comparar fornecedores.
                </p>
              </section>

              {/* Agência vs interno */}
              <section id="agencia-vs-interno" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Agência vs Marketeiro Interno vs Freelancer</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Uma agência não é a única opção, e nem sempre é a certa. A tabela abaixo resume as trocas entre os três caminhos mais comuns.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Opção</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Amplitude de Habilidade</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Estrutura de Custo</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Principal Fragilidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Agência', 'Vários especialistas em canais diferentes', 'Retainer mensal, percentual ou taxa de performance', 'Atenção dividida entre várias contas de cliente'],
                        ['Marketeiro interno', 'Conhecimento profundo só deste negócio', 'Salário em tempo integral, benefícios e ferramentas', 'Ponto único de falha; menos profundidade por especialidade'],
                        ['Freelancer', 'Especialidade estreita, focada num canal', 'Valor por hora ou por projeto, geralmente o custo fixo mais baixo', 'Disponibilidade limitada; sem backup se ficar indisponível'],
                      ].map(([opcao, amplitude, custo, fragilidade]) => (
                        <tr key={opcao} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{opcao}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{amplitude}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{custo}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{fragilidade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Muitos contractors já estabelecidos acabam chegando num modelo híbrido: um coordenador interno que administra o CRM, responde aos leads e cuida das avaliações, junto com uma agência ou freelancer para os canais técnicos, como busca paga, que realmente se beneficiam de conhecimento especializado e atualizado de plataforma. Para quanto do orçamento total qualquer uma dessas opções deveria consumir, veja o{' '}
                  <Link href="/br/blog/quanto-general-contractors-devem-investir-em-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de orçamento de marketing para general contractors</Link>.
                </p>
              </section>

              {/* Modelos de cobrança */}
              <section id="modelos-de-cobranca" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Agências de Marketing para Contractors Cobram</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quatro modelos de cobrança cobrem a maior parte do mercado. Nenhum é inerentemente melhor; cada um desloca risco e incentivo de forma diferente entre a agência e o contractor.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Retainer mensal fixo</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Uma taxa fixa para um escopo de trabalho definido, independente do resultado. Previsível para o orçamento, mas coloca todo o peso no contractor de confirmar que o escopo está sendo entregue, já que a taxa não se move com a performance.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Percentual do investimento em anúncios</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  A taxa de gestão escala com quanto é investido em anúncios. Comum especificamente na gestão de mídia paga. Vale perguntar se a agência tem algum incentivo para recomendar investir mais do que a conta realmente precisa.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Performance ou pagamento por lead</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  O contractor paga por lead, agendamento ou projeto assinado em vez de uma taxa fixa. Isso pode alinhar bem os incentivos, mas também levanta a mesma pergunta levantada na{' '}
                  <Link href="/br/blog/angi-leads-vs-google-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">comparação entre Angi Leads e Google Ads</Link>: se o lead é exclusivo do contractor ou compartilhado com outros negócios pagando pelo mesmo programa.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Taxa por projeto</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Uma taxa única para uma entrega definida, como um site novo ou um pacote de identidade de marca, sem componente de gestão contínua.
                </p>
                <CalloutBox type="warning" label="Um Preço Isolado Não Diz Nada">
                  A pergunta nunca é quanto uma agência cobra isoladamente. É o que essa taxa produz em leads qualificados e receita assinada, o que só pode ser avaliado depois de um ciclo de vendas real com dados de campanha, não a partir da proposta sozinha.
                </CalloutBox>
              </section>

              {/* Propriedade das contas */}
              <section id="propriedade-das-contas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quem Deve Ser Proprietário das Contas e dos Dados</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O contractor deve ser o proprietário de toda conta que a agência administra: a conta do Google Ads, o Google Business Profile, o domínio e a hospedagem do site, o CRM e a propriedade de analytics. O próprio Google Ads tem acesso por conta de gerenciamento justamente para que uma agência administre uma campanha sem ser a proprietária da conta subjacente, e o mesmo princípio vale para as outras plataformas.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma agência que insiste em manter esses ativos em nome próprio, em vez do contractor, cria um problema de aprisionamento que só fica visível quando a relação termina. Trocar de agência nesse momento pode significar perder anos de histórico de campanha e dados de conversão, perder o controle do site, ou, no pior caso, perder a própria ficha do Google Business Profile da qual toda a presença local depende.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Conta do Google Ads: propriedade do contractor, com acesso de gerenciamento concedido à agência</li>
                  <li>Google Business Profile: contractor cadastrado como proprietário verificado</li>
                  <li>Domínio e hospedagem do site: registrados em nome e na conta do contractor</li>
                  <li>Analytics e tag manager: propriedade do contractor, com acesso de usuário concedido à agência</li>
                  <li>Dados do CRM: exportáveis pelo contractor em qualquer momento, nunca trancados num software só da agência</li>
                </ul>
              </section>

              {/* Avaliar cases */}
              <section id="avaliar-cases" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Avaliar Cases e Resultados Anteriores</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um case com números impressionantes e nenhum contexto é material de marketing, não evidência. Uma avaliação útil exige perguntar qual período os números cobrem, se descrevem leads brutos ou leads qualificados, se se conectam a receita assinada ou param em cliques e impressões, e se o cliente está num ramo, tamanho de mercado e faixa de valor de projeto comparáveis.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O sinal mais forte não é um case nenhum. É uma conversa ao vivo com um cliente atual, idealmente num ramo parecido, disposto a descrever a relação com franqueza, incluindo qualquer coisa que tenha dado errado e como a agência lidou com isso. Uma agência confiante no próprio trabalho deveria conseguir apresentar essa referência sem hesitar.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Também é razoável pedir para ver um dashboard de campanha real, com nome de cliente oculto, em vez de uma captura de tela estática preparada para uma apresentação de vendas. Uma tela compartilhada com dado real e atual de conta é muito mais difícil de fabricar do que um slide.
                </p>
              </section>

              {/* Perguntas para fazer */}
              <section id="perguntas-para-fazer" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Perguntas Para Fazer Antes de Contratar uma Agência</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Quais serviços específicos estão incluídos nessa taxa, e o que custa extra?</li>
                  <li>Quem é o proprietário das contas de anúncio, do site e do Google Business Profile depois que o contrato terminar?</li>
                  <li>Como os leads são rastreados, e o relatório se conecta à receita assinada ou para em cliques e impressões?</li>
                  <li>Qual é o prazo mínimo de contrato, e qual é o aviso de cancelamento?</li>
                  <li>A agência tem experiência direta com general contractors ou empresas de construção especificamente?</li>
                  <li>Um cliente atual de um ramo parecido pode servir de referência com quem eu possa falar diretamente?</li>
                  <li>Quem é de fato o meu ponto de contato, e com que frequência vamos nos reunir para revisar resultados?</li>
                  <li>O que acontece com o histórico de campanha e os relatórios se eu decidir sair?</li>
                </ul>
              </section>

              {/* Termos de contrato */}
              <section id="termos-de-contrato" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Termos de Contrato Que Vale a Pena Ler com Atenção</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A conversa de vendas define a expectativa, mas o contrato define o que de fato acontece quando algo dá errado. Algumas cláusulas merecem atenção específica antes de assinar.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Duração do prazo mínimo e se ele renova automaticamente sem confirmação explícita</li>
                  <li>Aviso de cancelamento e se existe alguma taxa por rescisão antecipada</li>
                  <li>Propriedade de conta e de dado no fim do contrato, declarada explicitamente, não assumida</li>
                  <li>Processo e custo para mudança de escopo, como adicionar uma nova área de atuação</li>
                  <li>Entregas específicas e periodicidade de relatório, não linguagem vaga como &quot;otimização contínua&quot;</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Nenhuma dessas cláusulas garante bom resultado por si só. O que elas garantem é que os dois lados saibam exatamente o que acontece se a relação não funcionar, que é justamente o momento em que contrato vago causa mais dano.
                </p>
              </section>

              {/* Sinais de alerta */}
              <section id="sinais-de-alerta" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Sinais de Que a Agência Não É um Bom Encaixe</h2>
                <CalloutBox type="warning" label="Fique Atento a Isso">
                  Nenhuma agência legítima pode garantir um número específico de leads ou uma posição de primeira página no Google. Os dois resultados dependem de fatores fora do controle de qualquer fornecedor isolado, incluindo o próprio algoritmo e a dinâmica de leilão da plataforma.
                </CalloutBox>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mt-5">
                  <li>Recusar conceder ao contractor a propriedade das contas de anúncio ou do site</li>
                  <li>Relatório que cobre só cliques, impressões ou número bruto de leads, nunca receita assinada</li>
                  <li>Garantir um volume específico de leads ou uma posição de ranking antes de qualquer campanha ter rodado</li>
                  <li>Empurrar um contrato de longo prazo antes de produzir qualquer resultado que o justifique</li>
                  <li>Não conseguir ou não querer fornecer um cliente de referência disposto a falar diretamente</li>
                  <li>Respostas vagas sobre quem de fato é o ponto de contato no dia a dia</li>
                  <li>Resistência em explicar, em linguagem simples, como uma tática específica deve gerar projeto assinado</li>
                </ul>
              </section>

              {/* Período de teste */}
              <section id="periodo-de-teste" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Definindo um Período de Teste Justo</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Campanhas pagas geralmente precisam de quatro a oito semanas para o volume e a qualidade do lead se estabilizarem, enquanto o algoritmo da plataforma aprende e a agência refina a segmentação. Depois disso, o contractor ainda precisa de tempo para mover esses leads por agendamentos, estimates e contratos assinados antes que a relação possa ser julgada por resultado real de receita, não só por número de lead.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Uma janela de avaliação justa cobre um ciclo de vendas completo dos serviços anunciados, que é mais longo para projetos grandes de remodelação ou construção sob medida do que para trabalho pequeno de reparo. Avaliar uma agência depois de duas ou três semanas, antes de qualquer lead ter tido tempo de se tornar um projeto assinado, é uma das formas mais comuns de demitir cedo demais uma contratação genuinamente boa.
                </p>

                <InlineCTA
                  headline="Não Sabe Como Avaliar Sua Agência de Marketing Atual?"
                  body="Revisamos campanhas existentes, propriedade de conta e relatório pelo mesmo padrão que exigimos de nós mesmos, e dizemos claramente se o que você tem está funcionando."
                  buttonLabel="Peça uma Avaliação Gratuita de Marketing"
                />
              </section>

              {/* Relatórios */}
              <section id="relatorios" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como É um Bom Relatório</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Relatório que para em cliques, impressões e número bruto de lead descreve atividade de anúncio, não resultado de negócio. Um relatório útil conecta essa atividade às métricas que de fato importam: custo por lead qualificado, taxa de agendamento, taxa de estimate e receita assinada por canal. O detalhamento completo dessas métricas está em{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">qual é um bom custo por lead para general contractors</Link>, e o lado da receita está em{' '}
                  <Link href="/br/blog/como-calcular-o-roi-de-marketing-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como calcular o ROI de marketing para contractors</Link>.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Uma agência que não consegue produzir esse nível de relatório não está necessariamente agindo de má-fé, mas significa que o contractor está sendo pedido para confiar na relação sem o dado necessário para verificá-la.
                </p>
              </section>

              {/* Nicho vs generalista */}
              <section id="nicho-vs-generalista" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Agência Especializada em Contractors vs Agência Generalista</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma agência especializada em general contractors ou empresas de construção geralmente já chega familiarizada com segmentação por área de atuação, terminologia de permit e licenciamento, variação sazonal de demanda e os ciclos de venda longos e com vários pontos de contato típicos de projetos de construção. Essa familiaridade pode encurtar bastante o período de adaptação.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Uma agência de marketing generalista pode oferecer recursos criativos mais amplos, mais certificações de plataforma, ou taxas menores por atender uma gama mais ampla de setores, mas geralmente precisa de mais tempo para entender como um negócio de construção de fato gera e fecha leads antes de funcionar bem. Nenhum dos dois caminhos é automaticamente certo; o teste relevante é se a agência consegue produzir resultado com negócios que vendem do jeito que um general contractor vende, não se ela se especializa no ramo só pelo nome.
                </p>
              </section>

              {/* Erros comuns */}
              <section id="erros-comuns" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns ao Contratar uma Agência de Marketing para Contractors</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Escolher pela menor taxa mensal sem comparar o escopo de serviços</li>
                  <li>Assinar um contrato de longo prazo antes de existir qualquer dado de campanha</li>
                  <li>Deixar a agência ser proprietária das contas de anúncio, do site ou do Google Business Profile</li>
                  <li>Aceitar de cara um número garantido de leads ou uma posição de ranking</li>
                  <li>Avaliar performance depois de duas ou três semanas em vez de um ciclo de vendas completo</li>
                  <li>Pular a conversa com o cliente de referência em troca de um PDF de case bem produzido</li>
                  <li>Nunca confirmar por escrito quem de fato é o ponto de contato no dia a dia</li>
                  <li>Avaliar só cliques e leads em vez de agendamentos e receita assinada</li>
                  <li>Supor que o rótulo de especializada em contractors sozinho garante resultado melhor que uma generalista</li>
                </ul>
              </section>

              {/* Checklist / resposta final */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Um Checklist Simples de Avaliação de Agência</h2>
                <CalloutBox type="tip" label="Resumo">
                  Um bom encaixe de agência de marketing é aquele em que o contractor mantém a propriedade de toda conta, o relatório se conecta à receita assinada, o prazo de contrato é curto o bastante para saída sem um ciclo de vendas completo de evidência, e um cliente real está disposto a atestar a relação.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Confirme por escrito o escopo exato de serviços incluído na taxa.</li>
                  <li>Confirme que o contractor, não a agência, vai ser o proprietário de toda conta de anúncio, do site e do Google Business Profile.</li>
                  <li>Peça um cliente de referência de um ramo parecido e tenha a conversa diretamente.</li>
                  <li>Leia as cláusulas de prazo mínimo, aviso de cancelamento e mudança de escopo antes de assinar.</li>
                  <li>Defina a expectativa de um período de teste que cubra um ciclo de vendas completo, não algumas semanas.</li>
                  <li>Exija relatório que se conecte a agendamentos e receita assinada, não só a cliques e leads.</li>
                  <li>Trate qualquer número garantido de leads ou posição de ranking como motivo de cautela, não de confiança.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Para como orçar essa decisão depois que uma agência é escolhida, veja o{' '}
                  <Link href="/br/blog/quanto-general-contractors-devem-investir-em-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de orçamento de marketing para general contractors</Link>. Para o sistema de marketing completo que essa decisão sustenta, veja o{' '}
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
                headline="Pensando em Trocar de Agência de Marketing?"
                body="Revisamos suas campanhas atuais, a propriedade de conta e o relatório contra um padrão claro, e dizemos com franqueza o que está funcionando e o que não está."
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
