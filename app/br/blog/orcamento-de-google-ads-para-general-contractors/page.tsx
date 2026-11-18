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

const SLUG = 'orcamento-de-google-ads-para-general-contractors'
const ARTICLE_ID = 'google-ads-budget-for-general-contractors'

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
  { id: 'o-que-controla', label: 'O Que o Orçamento do Google Ads Realmente Controla', level: 2 as const },
  { id: 'diario-vs-mensal', label: 'Orçamento Diário vs Limite Mensal de Gasto', level: 2 as const },
  { id: 'orcamento-vs-lance', label: 'Orçamento vs Lance: Dois Controles Diferentes', level: 2 as const },
  { id: 'orcamento-minimo', label: 'Existe um Orçamento Mínimo de Google Ads para Contractors?', level: 2 as const },
  { id: 'por-servico', label: 'Como Dividir o Orçamento por Serviço', level: 2 as const },
  { id: 'smart-bidding-aprendizado', label: 'Smart Bidding, Mudanças de Orçamento e o Status de Aprendizado', level: 2 as const },
  { id: 'search-lost-is', label: 'Como Saber Se o Orçamento Está Baixo Demais', level: 2 as const },
  { id: 'pmax-lsa-orcamento', label: 'Como Performance Max e Local Services Gastam o Orçamento', level: 2 as const },
  { id: 'calculadora', label: 'Calculadora de Funil de Leads para Contractors', level: 2 as const },
  { id: 'escalar', label: 'Como Escalar o Orçamento Sem Quebrar a Performance', level: 2 as const },
  { id: 'reduzir', label: 'Quando e Como Reduzir o Orçamento com Segurança', level: 2 as const },
  { id: 'localizacao', label: 'Como Localização e Concorrência Mudam o Orçamento Certo', level: 2 as const },
  { id: 'ligar-ao-cpl', label: 'Conectando o Orçamento ao Custo por Lead e ao Lucro', level: 2 as const },
  { id: 'erros-comuns', label: 'Erros Comuns de Orçamento no Google Ads', level: 2 as const },
  { id: 'framework', label: 'Um Framework Prático para Definir Seu Orçamento', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Quanto um General Contractor Deve Investir no Google Ads?' },
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
                href="/blog/google-ads-budget-for-general-contractors"
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
                  Quando um general contractor pergunta quanto deve investir no Google Ads, geralmente está perguntando algo mais específico do que parece. A decisão de rodar busca paga já foi tomada. O que falta é o número que vai no campo de orçamento, e algum jeito de saber se esse número está baixo demais, alto demais, ou mais ou menos certo.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Essa é uma pergunta diferente de quanto uma construtora deve investir em marketing no total, que depende de meta de receita, mix de canais e estágio de crescimento, coberta no{' '}
                  <Link href="/br/blog/quanto-general-contractors-devem-investir-em-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de orçamento de marketing para contractors</Link>. Este artigo fica um nível abaixo, dentro da própria conta do Google Ads: o que o número de orçamento diário realmente controla, como ele se comporta dentro das próprias regras de gasto do Google, como interage com o Smart Bidding, e como saber quando o orçamento, e não outra coisa, é o limite real da performance.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Para a estratégia completa em que isso se encaixa, veja o{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de estratégia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* O que controla */}
              <section id="o-que-controla" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que o Orçamento do Google Ads Realmente Controla</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O orçamento do Google Ads define um teto de quanto uma campanha pode gastar. Ele não controla quem vê o anúncio, quão relevantes são as palavras-chave, quão bem a landing page converte, ou quão boa é a oferta. Isso é trabalho da escolha de palavras-chave, das palavras-chave negativas, do texto do anúncio, da configuração de público e da página em que o clique chega.
                </p>
                <CalloutBox type="info" label="Princípio Central">
                  Um aumento de orçamento só compra mais oportunidades de competir no leilão. Ele não corrige um anúncio fraco, uma lista de palavras-chave ampla demais, ou uma landing page que não converte.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Essa distinção importa porque contractors costumam recorrer ao orçamento como o primeiro botão a apertar quando uma campanha vai mal, quando o problema real é segmentação, correspondência de mensagem ou follow-up de lead. As seções abaixo mostram como saber em qual situação você realmente está.
                </p>
              </section>

              {/* Diário vs mensal */}
              <section id="diario-vs-mensal" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Orçamento Diário vs Limite Mensal de Gasto</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O número que o contractor digita é um orçamento diário médio. A Central de Ajuda do Google Ads descreve esse valor como o que especifica "o quanto você está razoavelmente confortável em gastar por dia ao longo do mês" (tradução livre), e ele pode ser editado em qualquer momento.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A palavra média importa. O Google não gasta exatamente o mesmo valor todos os dias. Segundo a Central de Ajuda do Google Ads, o Google otimiza o gasto em direção aos dias com mais oportunidade de cliques e conversões, o que significa que o gasto real do dia pode ficar abaixo ou acima do número digitado, dentro de dois limites fixos: um limite diário de gasto de "duas vezes o seu orçamento diário médio para a maioria das campanhas", e um limite mensal de "30,4 vezes o seu orçamento diário médio para a maioria das campanhas", que corresponde à média de dias num mês.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Exemplo:</p>
                  <p>Orçamento diário médio: $50</p>
                  <p>Gasto máximo num único dia: $50 × 2 = $100</p>
                  <p className="font-bold mt-1">Gasto máximo num mês de 30 dias: $50 × 30,4 = $1.520</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  É por isso que uma campanha pode mostrar $90 gastos numa terça e $12 num domingo sem nada estar errado. O Google está realocando o gasto para os dias em que espera mais cliques e conversões, dentro do mesmo teto mensal.
                </p>
              </section>

              {/* Orçamento vs lance */}
              <section id="orcamento-vs-lance" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Orçamento vs Lance: Dois Controles Diferentes</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Orçamento e lance respondem a perguntas diferentes, e confundir os dois é uma das fontes mais comuns de gasto desperdiçado. O orçamento responde: quanto essa campanha pode gastar no total. O lance, ou a meta de uma estratégia de Smart Bidding como CPA-alvo ou ROAS-alvo, responde: quanto estou disposto a pagar por um clique ou conversão específica.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Controle</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O Que Controla</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Quem Define</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Orçamento diário', 'Teto total de gasto num dia, calculado em média ao longo do mês', 'O contractor, editável a qualquer momento'],
                        ['Lance manual de CPC', 'O valor máximo que você está disposto a pagar por um clique', 'O contractor, por palavra-chave ou grupo de anúncios'],
                        ['CPA-alvo / ROAS-alvo', 'Quanto o Smart Bidding busca pagar por conversão para atingir uma meta de custo ou retorno', 'O contractor define a meta, o algoritmo do Google define o lance real em cada leilão'],
                      ].map(([controle, oQueControla, quemDefine]) => (
                        <tr key={controle} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{controle}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{oQueControla}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{quemDefine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Uma campanha pode ter orçamento de sobra e ainda assim não conseguir gastá-lo, porque o lance não é competitivo o suficiente para ganhar os leilões. Antes de aumentar o orçamento, vale confirmar se a conta está de fato limitada por orçamento, e não por um lance pouco competitivo.
                </p>
              </section>

              {/* Orçamento mínimo */}
              <section id="orcamento-minimo" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Existe um Orçamento Mínimo de Google Ads para Contractors?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A Central de Ajuda do Google Ads não publica um orçamento mínimo recomendado. Não existe um piso oficial que valha para todo contractor, todo serviço ou toda região.
                </p>
                <CalloutBox type="warning" label="Não Copie o Número de Outra Pessoa">
                  Números de "custo por clique médio de contractor" que circulam pela internet não são dados oficiais do Google, e variam enormemente por serviço, mercado e concorrência. O único custo por clique confiável é o que a sua própria conta está de fato pagando, visível nos dados de leilão da sua conta.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um jeito prático de pensar num piso é este: o orçamento diário precisa ser grande o suficiente, em relação ao custo por clique real da sua própria conta, para gerar cliques suficientes ao longo do dia, de forma que a campanha não esgote o orçamento já na primeira ou segunda hora. Um orçamento que acaba cedo no dia para de competir pelas buscas do resto do dia, o que aparece diretamente na métrica Search Lost IS (budget), coberta mais adiante neste guia.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Também existe uma questão de volume de dado. Estratégias de Smart Bidding precisam de conversões suficientes passando pela conta para otimizar de forma eficaz. Um orçamento tão pequeno que a campanha gera só um punhado de cliques por semana dá muito pouco para o algoritmo de lances aprender, independentemente da meta definida.
                </p>
              </section>

              {/* Por serviço */}
              <section id="por-servico" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Dividir o Orçamento por Serviço</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Rodar todos os serviços dentro de uma única campanha e um único orçamento dificulta saber qual serviço está de fato gerando leads qualificados e qual está só consumindo o gasto da conta. Um conjunto de palavras-chave de reforma de cozinha, com alto volume de busca, pode consumir silenciosamente a maior parte de um orçamento compartilhado antes que um serviço de menor volume, às vezes de margem maior, como home addition, tenha exposição significativa.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Separar o orçamento por campanha, uma para cada serviço principal, como coberto no{' '}
                  <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de Google Ads para general contractors</Link>, permite definir um orçamento, uma estratégia de lance e uma meta diferentes para cada serviço, de acordo com o próprio valor de projeto e a própria margem, em vez de deixar um serviço determinar a economia de todos os outros.
                </p>
              </section>

              {/* Smart Bidding e aprendizado */}
              <section id="smart-bidding-aprendizado" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Smart Bidding, Mudanças de Orçamento e o Status de Aprendizado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um mito persistente no marketing para contractors é que tocar no orçamento "reinicia o algoritmo" e deve ser evitado a todo custo. Segundo a Central de Ajuda do Google Ads, isso não é verdade especificamente para mudanças de orçamento.
                </p>
                <CalloutBox type="tip" label="O Que Realmente Dispara o Status de Aprendizado">
                  A Central de Ajuda do Google Ads afirma que atualizações de orçamento, metas de retorno ou configurações de segmentação "entram em vigor no próximo leilão, mas nunca disparam o status 'Learning'" (tradução livre). O status Learning, que nunca dura mais de sete dias, é disparado por uma estratégia de lance nova ou reativada, por uma mudança em quais campanhas, grupos de anúncios ou palavras-chave estão incluídos, ou por uma mudança significativa nas metas de conversão otimizadas, não por uma edição de orçamento isolada.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Isso não significa que o orçamento deva ser mudado sem cuidado. A Central de Ajuda do Google Ads também recomenda evitar múltiplas mudanças de meta dentro de um único ciclo de conversão sem uma razão de negócio clara, e a mesma disciplina vale para o orçamento: uma campanha alterada para cima e para baixo a cada poucos dias, com base em contagens de lead de curto prazo, nunca dá ao algoritmo de lances, ou ao contractor, uma janela estável o suficiente para julgar se um determinado nível de orçamento está de fato funcionando.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Na prática, isso significa que um aumento de orçamento, por si só, não custa uma semana de performance desorganizada do jeito que mudar a estratégia de lance ou as metas de conversão pode custar. É seguro usar o orçamento como um controle de resposta rápida, desde que as mudanças sejam deliberadas e espaçadas o suficiente para de fato medir o resultado.
                </p>
              </section>

              {/* Search Lost IS */}
              <section id="search-lost-is" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Saber Se o Orçamento Está Baixo Demais</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google Ads reporta duas métricas separadas para impressões que uma campanha poderia ter ganhado, mas não ganhou, e elas apontam para correções opostas. Confundir as duas leva ao erro de orçamento mais comum de todos: aumentar o gasto quando o problema real nunca foi gasto.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Métrica</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Definição do Google</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O Que Realmente Resolve</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Search Lost IS (budget)', 'A porcentagem de tempo em que seus anúncios não foram exibidos na Rede de Pesquisa por falta de orçamento', 'Aumentar o orçamento'],
                        ['Search Lost IS (rank)', 'A porcentagem de tempo em que seus anúncios não foram exibidos na Rede de Pesquisa por Ad Rank baixo no leilão', 'Melhorar lance, Índice de Qualidade ou relevância do anúncio, não orçamento'],
                      ].map(([metrica, def, resolve]) => (
                        <tr key={metrica} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metrica}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{def}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{resolve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  As duas estão disponíveis no nível de campanha. A Central de Ajuda do Google Ads resume o princípio geral assim: "se sua parcela de impressões for menor que 100%, aumentar o lance ou o orçamento pode ajudar a exibir o anúncio com mais frequência" (tradução livre). As duas métricas de Lost IS mostram qual metade dessa frase vale para a sua conta agora.
                </p>
              </section>

              {/* PMax / LSA */}
              <section id="pmax-lsa-orcamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Performance Max e o Local Services Gastam o Orçamento</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Nem todo orçamento do Google Ads se comporta do mesmo jeito. O Google vem migrando o Local Services Ads do seu painel independente para dentro do Google Ads, onde agora roda como uma campanha Performance Max construída em torno de uma meta de pagamento por lead. Segundo a Central de Ajuda do Google Ads, essa migração começou em agosto de 2026 para categorias selecionadas de serviços residenciais e com loja física nos Estados Unidos, se expande para mais grupos de anunciantes até o fim de 2026, e chega a contas fora dos EUA em 2027.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Dentro de uma campanha de Search tradicional, o orçamento limita o gasto total com cliques, cobrados independentemente de o clique virar lead ou não. Dentro de uma campanha de meta de lead do Local Services, o orçamento limita o gasto total com leads válidos, cobrados só quando o homeowner liga ou envia mensagem, com crédito automático disponível em alguns casos para leads que não atendem aos requisitos de validade. O mesmo valor em dólares no campo de orçamento está limitando duas coisas diferentes, dependendo do tipo de campanha a que pertence.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Para a comparação completa de como essas duas estruturas se comportam para contractors, veja o{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de Google Ads vs Local Services Ads</Link>.
                </p>

                <InlineCTA
                  headline="Não Sabe Se o Orçamento É o Problema?"
                  body="Revisamos o Search Lost IS real da sua conta, a estratégia de lance e o ritmo de gasto para dizer claramente se o orçamento é de fato o que está travando seu fluxo de leads."
                  buttonLabel="Solicitar uma Avaliação Gratuita de Marketing"
                />
              </section>

              {/* Calculadora */}
              <section id="calculadora" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Calculadora de Funil de Leads para Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-2">
                  Decisões de orçamento, no fim, voltam para a mesma conta de custo por lead. Use esta calculadora para chegar ao seu orçamento máximo viável a partir do valor de projeto, da margem e das taxas de conversão. Todos os cálculos rodam no navegador e nenhum dado é armazenado ou transmitido.
                </p>
                <ContractorLeadCalculator locale="pt-BR" />
              </section>

              {/* Escalar */}
              <section id="escalar" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Escalar o Orçamento Sem Quebrar a Performance</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O sinal para escalar é o Search Lost IS (budget) ficando consistentemente alto enquanto o custo por lead qualificado e o custo de aquisição de cliente permanecem dentro da meta. Essa combinação significa que existe mais demanda rentável disponível do que o orçamento atual está capturando.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Escalar gradualmente, em vez de dobrar um orçamento que já funciona de uma vez, facilita confirmar que o gasto adicional está alcançando a mesma qualidade de pesquisador, em vez de atrair tráfego mais amplo e de menor intenção conforme a campanha avança pela demanda disponível. Como mudanças de orçamento não disparam o status Learning, o contractor pode fazer um aumento gradual e acompanhar o custo por lead qualificado nas uma ou duas semanas seguintes sem se preocupar em desorganizar o algoritmo de lances.
                </p>
              </section>

              {/* Reduzir */}
              <section id="reduzir" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quando e Como Reduzir o Orçamento com Segurança</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Três situações costumam justificar reduzir ou pausar o crescimento do orçamento: o custo de aquisição de cliente ficou acima da meta por um ciclo de vendas completo, não só uma semana fraca; o Search Lost IS (rank), e não o Search Lost IS (budget), é a causa dominante de impressões perdidas, o que significa que mais gasto não resolveria o problema real; ou a capacidade de produção já está no limite o suficiente para que leads adicionais não possam ser atendidos num prazo razoável.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Reduza gradualmente e acompanhe o volume e a qualidade dos leads nas semanas seguintes, em vez de cortar bruscamente, já que uma queda súbita pode tirar a conta de leilões que ela vinha ganhando com conforto, não só os marginais.
                </p>
              </section>

              {/* Localização */}
              <section id="localizacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Localização e Concorrência Mudam o Orçamento Certo</h2>
                <p className="text-[#667085] leading-relaxed">
                  O mesmo orçamento diário compra um número diferente de cliques dependendo da concorrência local, já que o custo por clique sobe com o número de contractors dando lances nas mesmas buscas numa determinada região. Um mercado denso e competitivo pode exigir um orçamento maior para gerar o mesmo volume de clique que um mercado menor ou menos disputado. O detalhamento mais profundo de como a localização afeta a economia do lead, além do volume de clique, está no{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de custo por lead</Link>.
                </p>
              </section>

              {/* Ligar ao CPL */}
              <section id="ligar-ao-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Conectando o Orçamento ao Custo por Lead e ao Lucro</h2>
                <p className="text-[#667085] leading-relaxed">
                  Tudo neste guia é a camada operacional que fica entre duas perguntas maiores já cobertas em outro lugar: quanto o seu negócio deve investir em marketing no total, coberto no{' '}
                  <Link href="/br/blog/quanto-general-contractors-devem-investir-em-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de orçamento de marketing para contractors</Link>, e como é um custo por lead rentável para a sua economia específica, coberto no{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de custo por lead</Link>. O número de orçamento diário do Google Ads é simplesmente onde essas duas respostas se encontram dentro da própria plataforma.
                </p>
              </section>

              {/* Erros comuns */}
              <section id="erros-comuns" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns de Orçamento no Google Ads</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Definir o orçamento a partir de um custo por clique médio do setor, publicado por terceiros, em vez dos dados de leilão da própria conta</li>
                  <li>Deixar um serviço de alto volume consumir silenciosamente o orçamento compartilhado inteiro</li>
                  <li>Mudar o orçamento para cima e para baixo a cada poucos dias com base em contagens de lead de curto prazo</li>
                  <li>Nunca checar o Search Lost IS (budget) ou o Search Lost IS (rank)</li>
                  <li>Aumentar o orçamento para corrigir um problema que é, na verdade, de Search Lost IS (rank)</li>
                  <li>Combinar uma campanha de Search e uma campanha de meta de lead do Local Services num orçamento único e indiferenciado</li>
                  <li>Aumentar o orçamento pouco antes de uma baixa sazonal sem checar a demanda histórica primeiro</li>
                  <li>Nunca revisitar o orçamento depois que margem, taxa de fechamento ou capacidade de produção mudam</li>
                  <li>Tratar o número do orçamento diário como um teto diário rígido, em vez de entender a média mensal por trás dele</li>
                  <li>Escalar o orçamento de novo sem confirmar primeiro que um aumento menor de fato gerou mais leads qualificados</li>
                </ul>
              </section>

              {/* Framework */}
              <section id="framework" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Um Framework Prático para Definir Seu Orçamento</h2>
                <CalloutBox type="tip" label="Resumo">
                  O orçamento certo de Google Ads é o menor número que ainda permite capturar a demanda rentável que está sendo perdida, medida pelo Search Lost IS (budget), sem ultrapassar o custo de aquisição de cliente que o negócio pode pagar.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Parta do seu custo por lead máximo viável, usando o valor de projeto, a margem e a taxa de fechamento reais.</li>
                  <li>Converta isso num orçamento diário usando o custo por clique real da sua conta, não uma média publicada.</li>
                  <li>Dê a cada serviço principal a sua própria campanha e o seu próprio orçamento.</li>
                  <li>Deixe o Smart Bidding rodar por um ciclo de vendas completo antes de julgar o resultado; editar orçamento é seguro, editar meta ou estratégia não é.</li>
                  <li>Confira o Search Lost IS (budget) e o Search Lost IS (rank) semanalmente para saber qual controle realmente se aplica.</li>
                  <li>Escale gradualmente quando o orçamento, e não o rank, for a restrição, e reduza gradualmente quando não for.</li>
                  <li>Revisite o número sempre que margem, taxa de fechamento ou capacidade de produção mudarem.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Para o sistema completo de marketing que essa decisão sustenta, veja o{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de estratégia de marketing para general contractors</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* CTA final */}
              <EndArticleCTA
                headline="Pare de Chutar o Orçamento do Google Ads"
                body="Conectamos os dados reais de leilão da sua conta, o Search Lost IS, a estratégia de lance e a receita assinada para dizer exatamente quanto suas campanhas deveriam estar gastando."
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
