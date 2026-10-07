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

const SLUG = 'como-gerar-leads-qualificados-para-contractors'
const ARTICLE_ID = 'qualified-contractor-leads'

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
  { id: 'o-que-e-qualificado', label: 'O Que "Qualificado" Quer Dizer', level: 2 as const },
  { id: 'cinco-filtros', label: 'Os Cinco Filtros de Qualificação', level: 2 as const },
  { id: 'onde-acontece', label: 'Onde a Qualificação Acontece de Fato', level: 2 as const },
  { id: 'segmentacao', label: 'Filtro Um: Segmentação', level: 2 as const },
  { id: 'por-lead', label: 'Pagar por Clique ou Pagar por Lead', level: 2 as const },
  { id: 'mudanca-lsa', label: 'O Que Muda no Local Services Ads em 2026', level: 2 as const },
  { id: 'mensagem', label: 'Filtro Dois: A Mensagem e a Página', level: 2 as const },
  { id: 'formulario', label: 'Filtro Três: O Formulário', level: 2 as const },
  { id: 'ligacao', label: 'Filtro Quatro: A Primeira Conversa', level: 2 as const },
  { id: 'retroalimentacao', label: 'Filtro Cinco: Ensinar à Plataforma o Que É Qualificado', level: 2 as const },
  { id: 'perfil-da-empresa', label: 'Perfil da Empresa e Geografia Honesta', level: 2 as const },
  { id: 'numeros', label: 'Os Números Que Mostram Se Está Funcionando', level: 2 as const },
  { id: 'questao-do-volume', label: 'Quando Mais Lead É a Resposta Certa', level: 2 as const },
  { id: 'erros', label: 'Por Que o Lead Chega Desqualificado', level: 2 as const },
  { id: 'checklist', label: 'O Sistema de Lead Qualificado, na Ordem', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Como Gerar Leads Qualificados para Contractors' },
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
                href="/blog/how-to-generate-qualified-contractor-leads"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
                hrefLang="en-US"
              >
                EN · Read in English
              </Link>
            )}
          </div>

          {/* Mobile ToC */}
          <div className="lg:hidden mb-8">
            <TableOfContents items={tocItems} variant="mobile" locale="pt-BR" />
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

              {/* Introdução */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quase todo contractor que pede mais lead já tem lead. O que ele não tem é lead que valha a ligação de volta. O telefone toca com gente pesquisando preço, com homeowner a duas horas da área de atuação, com pedido de um serviço que a empresa parou de fazer três anos atrás, e com inquilino que não pode autorizar obra num imóvel que não é dele.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  É por isso que &quot;gerar mais lead&quot; é o objetivo errado. Volume de lead é fácil de comprar. Uma lista de palavras-chave mais solta, um raio mais largo e um formulário mais curto resolvem isso na semana que vem. Nada disso aumenta receita assinada, porque a restrição nunca foi o número de contatos.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo trata qualificação como sistema: o que qualificado significa em termos concretos, os cinco pontos onde o filtro acontece, e como devolver o resultado às plataformas de anúncio para elas começarem a procurar quem de fato compra. Para ver como isso se encaixa no quadro maior, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia completo de marketing para general contractors</Link>.
                </p>
              </section>

              {/* O que é qualificado */}
              <section id="o-que-e-qualificado" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que &quot;Qualificado&quot; Quer Dizer</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Qualificado não é uma nota de qualidade. É a resposta sim ou não a uma pergunta específica: esse contato pode virar um projeto que esta empresa quer, num valor em que esta empresa trabalha, num prazo que é real?
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A definição é específica de cada negócio, e é exatamente por isso que conselho genérico de geração de lead não funciona. Uma empresa de design-build que pega reforma de casa inteira e uma operação de serviços pequenos que fecha trabalho de meio dia são as duas general contractors, e um lead excelente para uma é ruído para a outra. Antes de comprar um único clique, essa definição precisa estar escrita em termos que qualquer pessoa do time consiga aplicar a um recado na caixa postal.
                </p>
                <CalloutBox type="info" label="O teste">
                  Se duas pessoas do seu escritório discordariam sobre o contato de ontem ter sido ou não um lead qualificado, você não tem um critério de qualificação. Você tem uma opinião, e não dá para otimizar marketing contra uma opinião.
                </CalloutBox>
              </section>

              {/* Cinco filtros */}
              <section id="cinco-filtros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Os Cinco Filtros de Qualificação</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quase todo lead desqualificado de contractor falha em uma de cinco dimensões. Escrever os seus próprios limites ao lado de cada uma transforma um critério vago em critério usável.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Filtro</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">A pergunta que ele responde</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Encaixe de serviço', 'É um serviço que a empresa faz, e que ela quer mais, não apenas tolera?'],
                        ['Geografia', 'O imóvel está dentro da área onde a empresa realmente se desloca e aloca equipe com lucro?'],
                        ['Orçamento', 'O valor esperado está na faixa em que a empresa trabalha, nas duas pontas?'],
                        ['Prazo', 'Existe intenção real de começar, ou é pesquisa para um projeto de dois anos à frente?'],
                        ['Decisão', 'Quem procurou pode decidir a contratação, ou aprova com alguém acessível?'],
                      ].map(([filtro, pergunta]) => (
                        <tr key={filtro} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{filtro}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{pergunta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Orçamento merece uma observação, porque contractor costuma aplicar esse filtro só em uma direção. Lead grande demais pode ser tão desqualificado quanto lead pequeno demais: uma empresa montada para reforma de cozinha que ganha uma ampliação do zero muitas vezes perde dinheiro aprendendo a entregar aquilo.
                </p>
              </section>

              {/* Onde acontece */}
              <section id="onde-acontece" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Onde a Qualificação Acontece de Fato</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Qualificação normalmente é tratada como tarefa de telefone: o lead chega, alguém liga, descobre que não encaixa. Isso funciona, e é também o lugar mais caro possível para descobrir o desencaixe, porque o clique já foi pago e o tempo comercial já foi gasto.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  São cinco pontos onde um contato desqualificado pode ser barrado, e eles ficam progressivamente mais caros:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Segmentação:</strong> quem chega a ver o anúncio, filtrar não custa nada</li>
                  <li><strong className="text-[#0A0A0A]">Mensagem e página:</strong> quem decide clicar e falar com você, custa uma impressão</li>
                  <li><strong className="text-[#0A0A0A]">Formulário:</strong> o que você descobre antes de alguém pegar o telefone, custa um clique</li>
                  <li><strong className="text-[#0A0A0A]">Primeira conversa:</strong> a checagem humana, custa tempo comercial</li>
                  <li><strong className="text-[#0A0A0A]">Retroalimentação:</strong> ensinar à plataforma o que aconteceu, custa a configuração uma vez e depois se paga</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  A maioria dos contractors opera o filtro quatro e mais nada. O ganho que acumula está no um, no dois, no três e no cinco.
                </p>
              </section>

              {/* Segmentação */}
              <section id="segmentacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filtro Um: Segmentação</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A desqualificação mais barata é a que acontece antes de a impressão ser servida. Três alavancas fazem quase todo o trabalho.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Intenção da palavra-chave, não volume</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  A intenção de busca separa o homeowner pronto para contratar de quem está planejando um projeto de fim de semana. &quot;Kitchen remodel contractor near me&quot; e &quot;how to remodel a kitchen yourself&quot; descrevem duas pessoas diferentes, e só uma delas vai assinar contrato algum dia. A{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">estrutura de palavras-chave de uma conta de contractor</Link>{' '}
                  é o primeiro filtro de qualificação, muito antes de alguém ver um formulário.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Palavra-chave negativa como processo contínuo</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Palavra-chave negativa é onde o filtro de intenção se mantém, não onde ele é montado uma vez. Termos que indicam pesquisa, vaga de emprego, curso, preço de atacado e trabalho feito pelo próprio dono aparecem sem parar, conforme o comportamento de busca muda. Revisar o relatório de termos de pesquisa com regularidade e adicionar negativas é tarefa sem glamour nenhum, e é a tarefa recorrente de maior retorno na maioria das contas de contractor.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Geografia da equipe, não da ambição</h3>
                <p className="text-[#667085] leading-relaxed">
                  Um raio desenhado para cobrir a região metropolitana que a empresa gostaria de atender, em vez da área onde ela consegue alocar equipe com lucro, fabrica lead desqualificado a preço cheio. Segmente a área onde a obra é realmente ganha, e trate expansão como teste deliberado, com verba própria, em vez de premissa embutida em toda campanha.
                </p>
              </section>

              {/* Por lead */}
              <section id="por-lead" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Pagar por Clique ou Pagar por Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O jeito como o canal cobra muda onde fica o risco, e vale ser preciso sobre isso. No pagamento por clique você é cobrado quando alguém clica, tenha entrado em contato ou não. No pagamento por lead você é cobrado quando o contato acontece.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google descreve o modelo do Local Services Ads como pagar apenas por leads válidos e qualificados, como ligações, mensagens ou agendamentos, em vez de cliques comuns. Isso tira do anunciante o custo do clique desperdiçado, o que é uma vantagem real.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Só que isso não significa que todo lead cobrado seja qualificado pelo seu critério. O Google opera créditos automáticos de lead no Local Services Ads, em que leads cobrados são reavaliados e o crédito costuma entrar no saldo da conta em até 30 dias. O recurso existe nos Estados Unidos e no Canadá, e está excluído para verticais de saúde, especialistas em impostos e anunciantes da região EMEA. O Google também publica as situações que não geram crédito, entre elas:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Lead válido recebido fora do horário de funcionamento</li>
                  <li>Cliente pedindo orientação</li>
                  <li>Agendamento cancelado</li>
                  <li>Pessoa pesquisando projetos ou preços</li>
                  <li>Lead que nunca respondeu ao retorno da sua ligação ou mensagem</li>
                </ul>
                <CalloutBox type="warning" label="Atenção">
                  Releia essa lista. Quem só pesquisa preço e quem nunca retorna a sua ligação são os dois cobráveis. Pagar por lead elimina o risco do clique vazio, não o trabalho de qualificar quem entrou em contato.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Existe também uma armadilha de medição aqui. &quot;Lead&quot; é definido de forma diferente por cada plataforma, então o custo por lead de um canal que cobra por lead e conta qualquer mensagem recebida não é comparável ao de uma conta de busca paga que conta formulário completo. Comparar os dois números direto produz conclusão confiante e errada sobre onde a verba deveria ir.
                </p>
              </section>

              {/* Mudança LSA */}
              <section id="mudanca-lsa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que Muda no Local Services Ads em 2026</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quem depende do Local Services Ads para fluxo de lead precisa saber que isso está se movendo. O Google documentou a migração do Local Services Ads para campanhas Performance Max com meta de pagamento por lead:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Agosto de 2026:</strong> categorias selecionadas de serviços residenciais e de loja nos Estados Unidos, incluindo encanamento, climatização, elétrica, conserto de eletrodomésticos, limpeza residencial, jardinagem, telhado, controle de pragas e mudanças</li>
                  <li><strong className="text-[#0A0A0A]">Fim de 2026:</strong> negócios com área de atuação e contas com configuração personalizada</li>
                  <li><strong className="text-[#0A0A0A]">2027:</strong> contas fora dos Estados Unidos e as categorias restantes</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O modelo de cobrança por lead continua. O que muda na mecânica é que o orçamento semanal passa a ser orçamento diário médio, e o lance manual junto com o CPA alvo por vertical deixa de existir. O Google também registra que os relatórios históricos de desempenho não são transferidos, e que o anunciante recebe aviso por e-mail 14 dias e 7 dias antes da migração da conta dele.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A consequência prática para qualidade de lead é direta. Quando o lance passa a ser automático em vez de manual, o sistema otimiza para o resultado que você reporta de volta para ele. Um contractor que reporta todo contato recebido como conversão está instruindo um otimizador automático a buscar mais contato de qualquer tipo. Isso faz da retroalimentação abaixo menos um refinamento e mais um pré-requisito.
                </p>

                <InlineCTA
                  headline="Você Está Pagando por Lead Que Não Pode Virar Obra?"
                  body="Auditamos onde o lead desqualificado entra no seu funil, das palavras-chave e da geografia até o que suas plataformas de anúncio estão aprendendo que conta como conversão."
                  buttonLabel="Solicitar Auditoria Gratuita de Qualidade de Lead"
                  locale="pt-BR"
                />
              </section>

              {/* Mensagem */}
              <section id="mensagem" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filtro Dois: A Mensagem e a Página</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Texto de anúncio e landing page normalmente são escritos para maximizar quantas pessoas respondem. Escritos em vez disso para atrair a pessoa certa e afastar a errada, as mesmas impressões produzem uma mistura de contatos bem diferente.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quatro coisas fazem quase todo o filtro:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Nomear o serviço com precisão:</strong> &quot;reforma completa de cozinha e banheiro&quot; em vez de &quot;serviços de melhoria residencial&quot;</li>
                  <li><strong className="text-[#0A0A0A]">Declarar a geografia:</strong> as cidades ou a região, no texto do anúncio e na página</li>
                  <li><strong className="text-[#0A0A0A]">Dar contexto de preço:</strong> uma faixa típica de projeto ou um valor mínimo declarado</li>
                  <li><strong className="text-[#0A0A0A]">Descrever o cliente:</strong> uma linha sobre com quem a empresa trabalha melhor deixa o leitor errado se autoexcluir</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Contexto de preço é o que contractor mais resiste e o que filtra mais forte. Publicar uma faixa típica, ou simplesmente um tamanho mínimo de projeto, custa alguns contatos de quem nunca ia comprar e economiza o tempo comercial que esses contatos teriam consumido. A alternativa é deixar o homeowner adivinhar, e quem adivinha preço de reforma adivinha mal nas duas direções.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O destino importa tanto quanto a mensagem: mandar anúncio de reforma de cozinha para a home desperdiça o clique. Páginas por serviço estão cobertas em{' '}
                  <Link href="/br/blog/o-que-todo-site-de-general-contractor-deve-ter" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">o que todo site de general contractor deve ter</Link>.
                </p>
              </section>

              {/* Formulário */}
              <section id="formulario" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filtro Três: O Formulário</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O formulário é o último filtro que não custa nada para operar, e é onde o trade-off é mais afiado. Menos campos geralmente geram mais envios. Mais campos geralmente geram envios mais qualificados. Nenhum dos dois está certo no abstrato.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Para qualificação em específico, quatro campos carregam quase todo o sinal:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Tipo de projeto,</strong> como lista fixa e não texto livre, para o filtro de encaixe de serviço ser aplicado pelo próprio homeowner</li>
                  <li><strong className="text-[#0A0A0A]">Localização do imóvel,</strong> de preferência o código postal, que resolve geografia antes de qualquer ligação</li>
                  <li><strong className="text-[#0A0A0A]">Prazo,</strong> como faixa de imediato a exploratório, que separa comprador de pesquisador</li>
                  <li><strong className="text-[#0A0A0A]">Faixa de orçamento,</strong> em bandas e não em número aberto, que é o campo mais eficaz e o mais frequentemente omitido</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Campos assim reduzem o volume bruto de envio. É esse o objetivo, e é por isso que contagem bruta de envio é o número errado para otimizar um formulário. O mesmo raciocínio vale para como os canais são comparados, que é o argumento por trás de usar{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">custo por lead qualificado em vez de custo por lead</Link>.
                </p>
              </section>

              {/* Ligação */}
              <section id="ligacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filtro Quatro: A Primeira Conversa</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Parte da qualificação só uma pessoa consegue fazer. O objetivo da primeira ligação não é vender o projeto. É decidir, rápido e com educação, se esse contato merece uma visita técnica, que é a coisa mais cara que um contractor dá de graça.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Cinco perguntas cobrem isso:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li>O que exatamente você quer que seja feito?</li>
                  <li>Onde fica o imóvel?</li>
                  <li>Quando você espera começar?</li>
                  <li>Você já definiu uma faixa de orçamento, ou uma faixa típica ajudaria?</li>
                  <li>Mais alguém participa dessa decisão?</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A pergunta quatro é onde a maioria dos contractors hesita. Apresentar a faixa primeiro e perguntar se faz sentido traz a mesma informação que perguntar de orçamento direto, sem o tom de interrogatório. &quot;Projeto desse tipo normalmente fica entre X e Y. Isso bate com o que você tinha em mente?&quot; encerra a conversa cedo nos casos em que ela deve ser encerrada cedo.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Duas observações operacionais importam tanto quanto o roteiro. A velocidade de resposta decide quantas dessas conversas acontecem, já que o homeowner que procurou vários contractors está falando com quem atendeu primeiro. E o resultado de cada ligação tem que ser registrado em algum lugar estruturado, porque esse registro é o que torna o próximo filtro possível.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O que vem depois dessa ligação é uma disciplina própria, coberta em{' '}
                  <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como fazer follow-up com leads de contractors</Link>.
                </p>
              </section>

              {/* Retroalimentação */}
              <section id="retroalimentacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filtro Cinco: Ensinar à Plataforma o Que É Qualificado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Este é o filtro que quase nenhum contractor opera, e o único que acumula. Lance automático otimiza para as conversões que você reporta. Reporte todo envio de formulário como conversão e o sistema vai obedientemente achar mais envio de formulário, inclusive das pessoas que o seu time comercial passa o dia desqualificando.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google Ads tem metas de conversão específicas de geração de lead, incluindo <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">lead qualificado</code>, <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">lead convertido</code>, <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">agendamento</code> e <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">pedido de orçamento</code>. A documentação do Google registra que usar essas metas de geração de lead ativa proteções contra tráfego inválido feitas especificamente para geração de lead, então a escolha da meta não é só um rótulo.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O mecanismo que leva o resultado offline de volta é o de conversões aprimoradas para leads, sucessor da importação de conversões offline. Ele devolve ao Google dado primário com hash do seu CRM, para que o resultado qualificado ou assinado seja atribuído à interação com o anúncio que o produziu. O Google reporta que anunciantes usando conversões aprimoradas para leads medem em média 10 por cento mais conversões do que com a importação padrão de conversões offline.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A orientação publicada pelo Google para essa configuração inclui:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Escolher lead qualificado ou lead convertido como meta de conversão</li>
                  <li>Usar uma ação de conversão com pelo menos 15 conversões nos últimos 30 dias</li>
                  <li>Subir o dado com regularidade, de preferência diária</li>
                  <li>Preferir ações de conversão que acontecem em até 7 dias da interação com o anúncio</li>
                  <li>Mapear o caminho completo do primeiro contato à venda fechada, em vez de otimizar volume bruto</li>
                </ul>
                <CalloutBox type="tip" label="Por que aqui está a alavanca">
                  Os filtros de um a quatro barram lead ruim um por um. Este muda o que a plataforma de anúncio está caçando, o que significa que a melhoria vale para toda impressão futura e não para um contato só.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  O pré-requisito é sem glamour: a origem do lead precisa chegar ao CRM, e o CRM precisa registrar no que o lead se transformou. Sem essa corrente não há nada para devolver, e nenhum ajuste de estratégia de lance substitui isso. É a mesma corrente que torna o{' '}
                  <Link href="/br/blog/como-calcular-o-roi-de-marketing-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">ROI real de marketing</Link>{' '}
                  calculável.
                </p>
              </section>

              {/* Perfil da empresa */}
              <section id="perfil-da-empresa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Perfil da Empresa e Geografia Honesta</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Boa parte da descoberta de contractor acontece no Google Maps e no bloco local, não no site, e a área de atuação definida no Perfil da Empresa decide quem encontra a empresa ali.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Perfil da Empresa no Google permite até 20 áreas de atuação, definidas por cidades, códigos postais ou outras áreas atendidas, e o Google orienta que o limite geral não passe de cerca de duas horas de deslocamento a partir de onde o negócio fica. O Google também pede que a área de atuação seja o mais específica e precisa possível.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Preencher o máximo só porque os espaços existem é um jeito confiável de fabricar contato desqualificado. Toda área listada onde a empresa não vai realmente se deslocar produz ligação que precisa ser recusada, o que custa tempo comercial e rende o tipo de avaliação que vem de homeowner que se sentiu enrolado.
                </p>
              </section>

              {/* Números */}
              <section id="numeros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Os Números Que Mostram Se Está Funcionando</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quatro métricas, acompanhadas por origem, bastam para conduzir isso bem:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Taxa de qualificação:</strong> percentual de contatos que passam pelos seus critérios</li>
                  <li><strong className="text-[#0A0A0A]">Custo por lead qualificado:</strong> gasto dividido por lead qualificado, não por lead total</li>
                  <li><strong className="text-[#0A0A0A]">Taxa de orçamento agendado:</strong> percentual de lead qualificado que vira visita técnica</li>
                  <li><strong className="text-[#0A0A0A]">Custo por projeto assinado:</strong> o único número que se liga à conta bancária</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O motivo de custo por lead qualificado importar mais que custo por lead fica mais fácil de ver com aritmética. Veja dois canais no mesmo gasto:
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]"></th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Canal A</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Canal B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Gasto', 'US$ 2.000', 'US$ 2.000'],
                        ['Leads', '40', '16'],
                        ['Custo por lead', 'US$ 50', 'US$ 125'],
                        ['Taxa de qualificação', '25%', '75%'],
                        ['Leads qualificados', '10', '12'],
                        ['Custo por lead qualificado', 'US$ 200', 'US$ 167'],
                      ].map(([metrica, a, b]) => (
                        <tr key={metrica} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metrica}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{a}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  O Canal B custa duas vezes e meia mais por lead e entrega mais lead qualificado por menos dinheiro, enquanto gera 24 ligações a menos para o escritório atender. Esta é uma ilustração hipotética escolhida para deixar a aritmética visível, não um benchmark de mercado. Reportado só por custo por lead, o Canal B parece a coisa óbvia a cortar.
                </p>
              </section>

              {/* Questão do volume */}
              <section id="questao-do-volume" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quando Mais Lead É a Resposta Certa</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Dá para exagerar na qualificação. Filtro não é de graça: cada um deles também remove alguns contatos que teriam fechado. Apertar a qualificação enquanto o orçamentista está parado encolhe o negócio em nome da eficiência.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A decisão depende de qual restrição está de fato travando:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Capacidade comercial cheia:</strong> suba a qualificação, porque agora cada ligação desqualificada ocupa o lugar de uma real</li>
                  <li><strong className="text-[#0A0A0A]">Capacidade ociosa:</strong> amplie a entrada primeiro, já que lead nunca gerado não tem como ser qualificado</li>
                  <li><strong className="text-[#0A0A0A]">Lead de sobra e nada assinando:</strong> o problema é qualificação ou follow-up, e mais verba vai piorar</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Existe também um piso de dado a respeitar. Lance automático precisa de evento de conversão suficiente para aprender, o que é a razão da orientação do Google de usar uma ação de conversão com pelo menos 15 conversões nos últimos 30 dias. Qualificar de forma tão agressiva que a contagem de conversão reportada desabe pode deixar o sistema de lance com sinal insuficiente para trabalhar.
                </p>
              </section>

              {/* Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Por Que o Lead Chega Desqualificado</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Nenhuma definição escrita de qualificado, então ninguém consegue combinar o que otimizar</li>
                  <li>Todo envio de formulário reportado à plataforma como conversão de valor igual</li>
                  <li>O mesmo lead contado duas vezes porque duas ações de conversão sobrepostas estão as duas como primárias</li>
                  <li>Área de atuação definida onde a empresa gostaria de trabalhar, não onde ela aloca equipe com lucro</li>
                  <li>Palavras-chave amplas com lista de negativas montada uma vez e nunca revisitada</li>
                  <li>Nenhum contexto de preço em lugar nenhum, então todo nível de orçamento se sente convidado</li>
                  <li>Anúncio apontado para a home em vez da página do serviço correspondente</li>
                  <li>Origem do lead nunca chegando ao CRM, o que torna a retroalimentação impossível</li>
                  <li>Custo por lead comparado entre canais que definem lead de formas diferentes</li>
                  <li>Lead por telefone sem rastreamento, então os canais que geram as melhores conversas parecem os mais fracos</li>
                </ul>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Sistema de Lead Qualificado, na Ordem</h2>
                <CalloutBox type="tip" label="Resumo">
                  Defina qualificado por escrito, filtre o mais cedo e mais barato primeiro, qualifique na ligação com cinco perguntas, e devolva o resultado para a plataforma caçar comprador em vez de contato.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Escreva o critério de qualificação, com limites de serviço, geografia, orçamento, prazo e decisão.</li>
                  <li>Segmente a área onde a empresa aloca equipe com lucro, não a área que ela ambiciona.</li>
                  <li>Monte palavras-chave em torno de intenção de contratar, e revise o relatório de termos com regularidade.</li>
                  <li>Nomeie o serviço e a área no texto do anúncio, e publique contexto de preço.</li>
                  <li>Mande cada anúncio para a página do serviço correspondente, nunca para a home.</li>
                  <li>Adicione tipo de projeto, localização, prazo e faixa de orçamento ao formulário como campos estruturados.</li>
                  <li>Responda rápido o suficiente para ser o primeiro contractor com quem o homeowner realmente fala.</li>
                  <li>Rode as cinco perguntas de qualificação em toda primeira ligação, e registre o resultado.</li>
                  <li>Mantenha honesta a área de atuação do Perfil da Empresa, dentro das 20 áreas e das duas horas que o Google orienta.</li>
                  <li>Configure metas de conversão específicas de lead, como lead qualificado ou lead convertido.</li>
                  <li>Ligue as conversões aprimoradas para leads a partir do CRM, e suba o dado diariamente.</li>
                  <li>Reporte taxa de qualificação e custo por lead qualificado por origem, nunca custo por lead sozinho.</li>
                  <li>Reavalie se é hora de apertar ou de ampliar a entrada, conforme a restrição que está travando agora.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Rodando nessa ordem, o volume de lead muitas vezes cai enquanto a receita assinada sobe. Esse é o resultado esperado, e a razão de contagem de lead ser uma meta de desempenho tão ruim. Para decidir quanto colocar atrás do sistema depois que ele funciona, veja{' '}
                  <Link href="/br/blog/quanto-general-contractors-devem-investir-em-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">quanto general contractors devem investir em marketing</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} locale="pt-BR" />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Receba Lead Que Seu Time Quer Ligar de Volta"
                body="Mostramos exatamente onde o lead desqualificado entra no seu funil e o que mudar primeiro, da segmentação até o dado de conversão que suas plataformas estão usando para aprender."
                buttonLabel="Agendar Auditoria Gratuita de Qualidade de Lead"
                locale="pt-BR"
              />

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} locale="pt-BR" />
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Navegação do artigo">
              <TableOfContents items={tocItems} variant="desktop" locale="pt-BR" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
