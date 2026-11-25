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

const SLUG = 'por-que-o-google-ads-nao-esta-gerando-leads-para-contractors'
const ARTICLE_ID = 'contractor-google-ads-not-generating-leads'

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
  { id: 'status-do-anuncio', label: 'Confira Se o Anúncio Está de Fato Elegível para Aparecer', level: 2 as const },
  { id: 'limitado-por-orcamento', label: 'Limited by Budget Pode Parecer Falta de Demanda', level: 2 as const },
  { id: 'quality-score', label: 'Um Quality Score Baixo Está Encarecendo Cada Clique em Silêncio', level: 2 as const },
  { id: 'palavras-chave-negativas', label: 'Palavras-Chave Amplas e Negativas Faltando Compram o Clique Errado', level: 2 as const },
  { id: 'cliques-invalidos', label: 'Cliques Inválidos Já São Filtrados, Por Isso Raramente São o Problema Real', level: 2 as const },
  { id: 'rastreamento-conversao', label: 'Rastreamento de Conversão Quebrado Pode Esconder Leads Que Já Estão Acontecendo', level: 2 as const },
  { id: 'landing-page', label: 'A Landing Page É Onde o Clique Morre Antes de Virar Lead', level: 2 as const },
  { id: 'sobreposicao-lsa', label: 'Rodar Local Services Ads ao Mesmo Tempo Pode Esconder a Causa Real', level: 2 as const },
  { id: 'ligacoes-nao-registradas', label: 'Ligação Que Nunca É Registrada Parece Anúncio Que Não Funciona', level: 2 as const },
  { id: 'ordem-de-diagnostico', label: 'A Ordem Certa para Checar Cada Coisa', level: 2 as const },
  { id: 'erros-comuns', label: 'Erros Comuns Que Dificultam o Diagnóstico', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Por Que o Google Ads do Seu Contractor Não Está Gerando Leads' },
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
                href="/blog/contractor-google-ads-not-generating-leads"
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
                  Um general contractor olhando para uma conta de Google Ads que gasta dinheiro todo dia enquanto o telefone fica mudo geralmente está enfrentando vários problemas diferentes, não só um. Clique, impressão e lead ficam em camadas diferentes da mesma campanha, e uma falha em qualquer uma delas produz exatamente o mesmo sintoma por fora: dinheiro saindo, nada entrando.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Isso é diferente de uma campanha construída com a estratégia de palavra-chave errada, coberta no{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de palavras-chave de Google Ads</Link>, ou de uma campanha simplesmente subfinanciada para o mercado dela, coberta no{' '}
                  <Link href="/br/blog/orcamento-de-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de orçamento</Link>. Este artigo é a camada de diagnóstico que fica abaixo das duas: uma ordem específica para checar uma conta quando os leads pararam, ou nunca começaram, para que a causa real seja corrigida em vez da primeira coisa que parece suspeita.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Para a estratégia completa em que isso se encaixa, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* Status do anúncio */}
              <section id="status-do-anuncio" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Confira Se o Anúncio Está de Fato Elegível para Aparecer</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Antes de olhar para orçamento, palavra-chave ou landing page, confirme que o anúncio está de fato rodando. O Google Ads atribui um status a cada anúncio, e só um deles significa que o anúncio está totalmente dentro do leilão para toda busca que ele foi feito para capturar.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Definição do Google</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O Que Fazer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Eligible', 'Está de acordo com as políticas do Google Ads, então pode ser exibido para todos os públicos', 'Nada a corrigir aqui'],
                        ['Eligible (limited)', 'Pode ser exibido, mas não em todas as situações, por restrição de política, como uso de marca registrada ou conteúdo de jogos de azar', 'Confira a coluna de detalhes da política para a restrição específica'],
                        ['Under review', 'Ainda em análise, e será elegível para exibição se o Google determinar que está de acordo com a política', 'Espere; anúncio novo ou editado pode ficar aqui por pouco tempo'],
                        ['Disapproved', 'Não pode ser exibido porque o conteúdo ou o destino dele viola a política do Google Ads', 'Corrija a violação específica e reenvie'],
                        ['Not eligible', 'Não está sendo exibido porque a campanha está pausada, removida, encerrada ou pendente, ou o grupo de anúncios está pausado, removido ou incompleto', 'Confira o estado da campanha e do grupo de anúncios direto'],
                      ].map(([status, def, fix]) => (
                        <tr key={status} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{status}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{def}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#9EA5B3] mt-2 mb-4">Definições de status de anúncio, Central de Ajuda do Google Ads (tradução livre).</p>
                <CalloutBox type="warning" label="A Camada Mais Fácil de Pular">
                  Uma conta pode parecer totalmente ativa no painel, com orçamento gastando normalmente, enquanto o anúncio específico que o contractor acha que está rodando fica em Eligible (limited) ou Under review para parte das buscas para as quais foi criado. A coluna de status do anúncio, não o status da campanha, é a primeira coisa a checar.
                </CalloutBox>
              </section>

              {/* Limited by budget */}
              <section id="limitado-por-orcamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Limited by Budget Pode Parecer Falta de Demanda</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Se o status do anúncio é um Eligible limpo, a próxima camada é saber se a campanha está de fato competindo por buscas suficientes das disponíveis. A Central de Ajuda do Google Ads descreve o status de campanha &quot;Limited by budget&quot; como um sinal de que a campanha &quot;está com desempenho abaixo do esperado por causa de um orçamento limitado&quot; (tradução livre), ou, no caso do lance Maximize Clicks, que o contractor &quot;poderia aumentar o tráfego ajustando o orçamento&quot; (tradução livre). O Google Ads sugere um orçamento recomendado para a campanha sempre que esse status aparece.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O diagnóstico mais preciso, coberto em mais detalhe no{' '}
                  <Link href="/br/blog/orcamento-de-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de orçamento</Link>, é a métrica Search Lost IS (budget) no nível da campanha, que isola a porcentagem de leilões perdidos especificamente por gasto. Um Search Lost IS (budget) alto junto com um custo por lead saudável no resto da conta significa que existe demanda real sendo deixada de lado, não que as palavras-chave estão erradas.
                </p>
                <CalloutBox type="info" label="O Sinal Oposto">
                  O Search Lost IS (rank) é o inverso. Se esse número estiver alto, mais orçamento não resolve nada, porque a perda de leilão vem de lance ou relevância, não de gasto.
                </CalloutBox>
              </section>

              {/* Quality Score */}
              <section id="quality-score" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Um Quality Score Baixo Está Encarecendo Cada Clique em Silêncio</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Quality Score não decide diretamente se um lead acontece, mas decide quão caro e quão frequente são os leilões que o anúncio de um contractor de fato ganha. A Central de Ajuda do Google Ads divide a nota em três componentes: taxa de cliques esperada, &quot;a probabilidade de seu anúncio ser clicado quando exibido&quot; (tradução livre); relevância do anúncio, &quot;o quanto seu anúncio corresponde à intenção por trás da pesquisa do usuário&quot; (tradução livre); e experiência da página de destino, &quot;o quanto sua página de destino é relevante e útil para quem clica no seu anúncio&quot; (tradução livre).
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um contractor rodando um único ad group amplo para todos os serviços, com um anúncio genérico e uma landing page genérica, tende a ter nota baixa em relevância do anúncio e experiência da página ao mesmo tempo, já que nem o anúncio nem a página foram de fato escritos para a maioria das buscas que os acionam.{' '}
                  <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Separar campanhas por serviço</Link> é a correção estrutural; um anúncio mais específico e uma landing page por serviço são a correção de conteúdo.
                </p>
                <CalloutBox type="tip" label="Como Isso Aparece na Prática">
                  Um problema de Quality Score raramente aparece como zero lead. Ele aparece como um custo por clique que não para de subir enquanto o volume de lead fica estagnado, porque a conta está pagando mais para ganhar os mesmos leilões que um anúncio e uma página mais alinhados ganhariam mais barato.
                </CalloutBox>
              </section>

              {/* Palavras-chave negativas */}
              <section id="palavras-chave-negativas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Palavras-Chave Amplas e Negativas Faltando Compram o Clique Errado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um anúncio elegível, razoavelmente financiado e com boa nota de Quality Score ainda pode não gerar lead se os cliques que ele compra forem simplesmente a busca errada. Esse é um problema de volume disfarçado de problema de conversão: a campanha está recebendo clique real de gente real, só que não é gente procurando contratar um contractor.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O relatório de search terms mostra as pesquisas reais que acionaram o anúncio, o que é diferente da lista de palavra-chave que foi cadastrada. Revisá-lo regularmente e adicionar os termos irrelevantes como palavra-chave negativa, coberto em mais detalhe no{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de palavras-chave de Google Ads</Link>, é a correção direta. Categorias comuns para checar primeiro incluem pesquisas de emprego e carreira, pesquisas de DIY e tutorial, e pesquisas de um serviço que o negócio genuinamente não oferece. Uma campanha que nunca recebeu uma palavra-chave negativa, ou que não tem o search terms revisado há meses, é um dos motivos mais comuns e mais fáceis de corrigir para um contractor que vê gasto sem lead.
                </p>
              </section>

              {/* Cliques inválidos */}
              <section id="cliques-invalidos" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Cliques Inválidos Já São Filtrados, Por Isso Raramente São o Problema Real</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  É tentador culpar tráfego de bot ou clique de concorrente quando uma conta gasta sem converter, mas a própria definição de tráfego inválido da Central de Ajuda do Google Ads, &quot;tráfego que não representa interesse genuíno no seu negócio&quot; (tradução livre), cobrindo clique não humano, clique acidental por posicionamento ruim e clique intencional de concorrente, vem com um detalhe importante: a atividade inválida &quot;detectada antes do fim do mês é removida automaticamente da sua fatura e dos relatórios de campanha, então não é necessário reembolso&quot; (tradução livre). Atividade detectada depois ainda resulta em crédito na fatura seguinte.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Essa filtragem já acontecendo é exatamente o motivo pelo qual o clique inválido raramente é a explicação real para uma seca de lead. Os cliques que ainda aparecem no relatório de uma conta, por definição, já passaram pela detecção do Google. O problema muito mais comum é o clique completamente válido, de gente real, que simplesmente não está no mercado para contratar um contractor, o que é um problema de palavra-chave negativa e segmentação, não de fraude.
                </p>
                <CalloutBox type="warning" label="Onde Isso Mais Desperdiça Tempo">
                  Perseguir o clique fraudulento como explicação para a falta de lead geralmente atrasa encontrar a causa real, que mais frequentemente é rastreamento, segmentação ou landing page.
                </CalloutBox>
              </section>

              {/* Rastreamento de conversão */}
              <section id="rastreamento-conversao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Rastreamento de Conversão Quebrado Pode Esconder Leads Que Já Estão Acontecendo</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O motivo mais comum de uma conta de Google Ads mostrar zero lead enquanto o negócio está de fato recebendo ligação é que as conversões estão acontecendo, mas não sendo registradas. A orientação da Central de Ajuda do Google Ads sobre a tag do site lista causas específicas: a tag do Google precisa estar &quot;na seção &lt;head&gt; de todas as páginas do seu site&quot; (tradução livre), o auto-tagging precisa estar ativado para o Google conseguir &quot;adicionar automaticamente os parâmetros GCLID e AUID à sua landing page depois de um clique no anúncio&quot; (tradução livre), e &quot;os cookies precisam estar disponíveis no navegador no momento em que o cliente converte&quot; (tradução livre). A mesma orientação alerta contra instalar &quot;múltiplas tags do Google ou containers do Google Tag Manager... na mesma página&quot; (tradução livre), o que cria conflito em vez de redundância.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O Tag Assistant, aberto direto do menu de Metas no Google Ads, pode confirmar se uma ação de conversão específica está de fato disparando e sinalizar um status de Unverified ou Tag inactive antes de o contractor gastar mais tempo chutando.
                </p>
                <CalloutBox type="info" label="O Sintoma Que Parece Idêntico">
                  Uma ligação atendida num número rastreado que nunca é registrada como evento de conversão, porque a plataforma de call tracking e a ação de conversão do Google Ads nunca foram de fato conectadas, produz exatamente o mesmo sintoma de zero lead que uma campanha com demanda genuinamente nula. Checar a tag antes de tocar na campanha economiza o maior tempo.
                </CalloutBox>

                <InlineCTA
                  headline="Não Sabe Se Seus Leads Estão Sendo Rastreados de Verdade?"
                  body="Checamos se a sua tag de conversão, o call tracking e o CRM estão de fato capturando cada lead que suas campanhas geram antes de recomendar qualquer mudança."
                  buttonLabel="Solicitar uma Avaliação Gratuita de Marketing"
                />
              </section>

              {/* Landing page */}
              <section id="landing-page" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Landing Page É Onde o Clique Morre Antes de Virar Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Se o anúncio está elegível, o orçamento é suficiente, o Quality Score é razoável e o rastreamento de conversão está confirmado funcionando, a camada que resta é saber se a página em que o clique cai de fato convence alguém a agir. A orientação da Central de Ajuda do Google Ads sobre otimizar anúncios e landing pages afirma que &quot;quando alguém clica no seu anúncio, a expectativa é chegar numa página relevante para o que viu no anúncio&quot; (tradução livre), e recomenda escolher uma página que &quot;corresponda de perto ao seu anúncio e às suas palavras-chave&quot; (tradução livre). Também observa que &quot;a facilidade de navegação é algo que os usuários valorizam ainda mais em sites mobile&quot; (tradução livre).
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Um clique para &quot;kitchen remodeling contractor near me&quot; que cai numa homepage genérica, sem menção a cozinha e com o formulário de contato escondido bem abaixo de várias telas de conteúdo, trabalha contra o anúncio em vez de a favor dele. Para o checklist completo do que uma landing page de contractor precisa ter, veja{' '}
                  <Link href="/br/blog/o-que-todo-site-de-general-contractor-deve-ter" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">o que todo site de general contractor deve ter</Link>.
                </p>
              </section>

              {/* Sobreposição com LSA */}
              <section id="sobreposicao-lsa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Rodar Local Services Ads ao Mesmo Tempo Pode Esconder a Causa Real</h2>
                <p className="text-[#667085] leading-relaxed">
                  Um contractor rodando campanhas de Search e Local Services Ads juntas, ou no meio da migração que o Google vem fazendo, coberta no{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de Google Ads vs Local Services Ads</Link>, pode interpretar errado qual produto é de fato responsável por uma queda de lead. O Local Services Ads cobra por lead, não por clique, e uma pausa ou problema de elegibilidade desse lado pode parecer, numa olhada rápida no painel, idêntico a um problema de campanha de Search. Checar cada produto separadamente, com seu próprio número de call tracking, é o único jeito confiável de saber se o lead parou por causa da campanha de Search coberta neste guia ou por causa do lado de Local Services da conta.
                </p>
              </section>

              {/* Ligações não registradas */}
              <section id="ligacoes-nao-registradas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Ligação Que Nunca É Registrada Parece Anúncio Que Não Funciona</h2>
                <p className="text-[#667085] leading-relaxed">
                  Mesmo com uma conta de Google Ads perfeitamente configurada, um lead que liga para o número do site e nunca é anotado em lugar nenhum parece, do lado da publicidade, exatamente igual a um lead que nunca aconteceu. Essa é a mesma lacuna coberta em{' '}
                  <Link href="/br/blog/por-que-leads-de-contractors-nao-viram-agendamentos" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">por que leads de contractors não viram agendamentos</Link>: uma ligação não rastreada é invisível para o relatório de marketing e para o pipeline de vendas ao mesmo tempo. Antes de concluir que uma campanha de Google Ads parou de gerar lead, vale confirmar que toda ligação para o número rastreado está de fato chegando numa pessoa, sendo registrada em algum lugar, e não se perdendo numa ligação perdida, numa caixa de mensagem cheia, ou num número que nunca foi conectado ao call tracking.
                </p>
              </section>

              {/* Ordem de diagnóstico */}
              <section id="ordem-de-diagnostico" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Ordem Certa para Checar Cada Coisa</h2>
                <CalloutBox type="tip" label="Por Que a Ordem Importa Aqui">
                  Cada camada anterior pode produzir exatamente o mesmo sintoma de zero lead que um problema de landing page. Corrigir a landing page enquanto a tag de conversão ainda está quebrada nunca vai aparecer como progresso, mesmo que tenha genuinamente ajudado.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Confirme que o status do anúncio é Eligible, não limitado, em análise ou reprovado.</li>
                  <li>Confira o Search Lost IS (budget) contra o Search Lost IS (rank) para saber se o gasto ou a competitividade é a restrição.</li>
                  <li>Revise o relatório de search terms e adicione palavra-chave negativa para o que for claramente irrelevante.</li>
                  <li>Confirme que a tag de conversão está de fato disparando com o Tag Assistant, não só instalada.</li>
                  <li>Confira se o Local Services Ads, se estiver rodando, é onde a queda de fato aconteceu.</li>
                  <li>Confirme que toda ligação para o número rastreado está de fato sendo registrada, não só atendida.</li>
                  <li>Só então, revise a landing page em si contra o que o anúncio prometeu.</li>
                </ol>
              </section>

              {/* Erros comuns */}
              <section id="erros-comuns" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns Que Dificultam o Diagnóstico</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Reescrever o anúncio ou aumentar o lance antes de confirmar que o status do anúncio é um Eligible limpo</li>
                  <li>Aumentar o orçamento para corrigir o que é, na verdade, um problema de Search Lost IS (rank)</li>
                  <li>Assumir que volume baixo de lead significa clique inválido, quando o Google já filtrou esses</li>
                  <li>Nunca abrir o Tag Assistant, e assumir que a tag de conversão funciona porque foi instalada uma vez</li>
                  <li>Comparar resultado de campanha de Search com resultado de Local Services Ads sem call tracking separado para cada um</li>
                  <li>Culpar a landing page antes de confirmar que as conversões estão sendo registradas</li>
                  <li>Tratar uma semana fraca como tendência antes de checar se o ciclo de venda do serviço dura mais que uma semana</li>
                  <li>Mudar orçamento, palavra-chave e landing page na mesma semana, o que torna impossível saber qual mudança de fato ajudou</li>
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* CTA final */}
              <EndArticleCTA
                headline="Pare de Chutar Por Que Seu Google Ads Parou de Converter"
                body="Auditamos o status do anúncio, o Search Lost IS, o Quality Score, o rastreamento de conversão e a landing page na ordem que de fato encontra a causa real, não só a mais óbvia."
                buttonLabel="Agendar uma Avaliação Gratuita de Marketing"
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
