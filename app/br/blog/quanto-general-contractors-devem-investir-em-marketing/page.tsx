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

const SLUG = 'quanto-general-contractors-devem-investir-em-marketing'
const ARTICLE_ID = 'contractor-marketing-budget'

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
  { id: 'o-que-determina', label: 'O Que Determina o Orçamento de Marketing de um Contractor?', level: 2 as const },
  { id: 'metodo-percentual', label: 'O Método de Percentual da Receita', level: 2 as const },
  { id: 'metodo-por-meta', label: 'O Método por Meta', level: 2 as const },
  { id: 'comparando-metodos', label: 'Comparando os Dois Métodos', level: 2 as const },
  { id: 'estagio-crescimento', label: 'Como o Estágio de Crescimento Muda o Orçamento', level: 2 as const },
  { id: 'tipo-projeto', label: 'Como o Tipo de Projeto Muda o Orçamento', level: 2 as const },
  { id: 'fixo-vs-variavel', label: 'Custo Fixo vs Investimento Variável em Mídia', level: 2 as const },
  { id: 'calcular-quanto-cabe', label: 'Como Calcular Quanto Você Pode Investir', level: 2 as const },
  { id: 'calculadora', label: 'Calculadora do Funil de Leads', level: 2 as const },
  { id: 'alocacao', label: 'Como Alocar o Orçamento Entre Canais', level: 2 as const },
  { id: 'pago-vs-seo', label: 'Anúncios Pagos vs SEO', level: 2 as const },
  { id: 'aumentar-investimento', label: 'Quando Aumentar o Investimento', level: 2 as const },
  { id: 'reduzir-investimento', label: 'Quando Reduzir ou Pausar o Investimento', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns ao Definir o Orçamento', level: 2 as const },
  { id: 'framework', label: 'Um Framework Prático para Definir Seu Orçamento', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Quanto General Contractors Devem Investir em Marketing?' },
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
                href="/blog/how-much-should-general-contractors-spend-on-marketing"
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
                  <span>Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </header>

              {/* Introdução */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  Não existe um orçamento de marketing correto único para um general contractor. Um orçamento que funciona pra uma empresa de reforma de cozinha e banheiro num mercado metropolitano competitivo pode ser pequeno demais, ou grande demais, pra um construtor de casas personalizadas numa área de atuação menor.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Duas abordagens comuns aparecem na maioria dos planejamentos de marketing: definir um percentual da receita, ou construir o número a partir de uma meta de crescimento e um CAC alvo. Nenhuma das duas está automaticamente certa sozinha.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo passa pelos dois métodos, como o tipo de projeto e o estágio de crescimento mudam a resposta certa, e um framework prático pra definir o seu próprio número. Pra entender a matemática de custo de lead por trás desse framework, veja o guia sobre{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">qual é um bom custo por lead para general contractors</Link>.
                </p>
              </section>

              {/* O que determina */}
              <section id="o-que-determina" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que Determina o Orçamento de Marketing de um Contractor?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O orçamento de marketing de um contractor é moldado por vários fatores ao mesmo tempo, não por uma regra única:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Receita média por projeto assinado e margem bruta</li>
                  <li>Taxas atuais de conversão de lead para contrato e de lead qualificado para contrato</li>
                  <li>Quantos projetos assinados a mais o negócio quer por mês</li>
                  <li>Duração do ciclo de vendas dos serviços oferecidos</li>
                  <li>Capacidade disponível pra executar trabalho novo</li>
                  <li>Quão competitivo é o mercado local pros canais pagos</li>
                  <li>Mix atual de demanda paga, orgânica e por indicação</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Dois negócios no mesmo mercado, oferecendo os mesmos serviços, podem ter orçamentos apropriados completamente diferentes se um tiver uma taxa de fechamento mais forte, margens melhores ou mais capacidade disponível que o outro.
                </p>
              </section>

              {/* Método percentual */}
              <section id="metodo-percentual" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Método de Percentual da Receita</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A abordagem mais simples vincula o investimento em marketing diretamente à receita.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Orçamento de marketing = Receita anual × percentual de marketing</p>
                  <p className="text-[#667085]">Exemplo:</p>
                  <p>Receita anual: $2.000.000</p>
                  <p>Percentual de marketing: 5%</p>
                  <p className="font-bold mt-1">Orçamento anual de marketing: $100.000</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Orientações gerais para pequenas empresas costumam citar uma faixa de aproximadamente 2% a 10% da receita, com negócios buscando crescimento mais rápido geralmente mais próximos da faixa mais alta. Essa faixa não é específica de construção e não considera a economia de lead, margem ou duração do ciclo de vendas.
                </p>
                <CalloutBox type="info" label="Limitação">
                  Percentual da receita é um atalho de orçamento, não um plano de crescimento. Ele escala o investimento com a receita que você já tem, não com a receita que você está tentando gerar.
                </CalloutBox>
              </section>

              {/* Método por meta */}
              <section id="metodo-por-meta" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Método por Meta</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um orçamento por meta parte de quantos projetos assinados o negócio quer e de quanto ele pode investir pra adquirir cada um.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Orçamento de marketing = Projetos assinados desejados × CAC alvo</p>
                  <p className="text-[#667085] mt-3">Exemplo:</p>
                  <p>Projetos assinados desejados por mês: 4</p>
                  <p>CAC alvo: $3.000</p>
                  <p className="font-bold mt-1">Orçamento mensal de marketing: 4 × $3.000 = $12.000</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Esse método conecta o orçamento diretamente a uma meta de crescimento e à economia de lead do{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">framework de custo por lead</Link>. Sozinho, ele não confirma se esse investimento é realista pro fluxo de caixa do negócio.
                </p>
              </section>

              {/* Comparando */}
              <section id="comparando-metodos" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Comparando os Dois Métodos</h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Método</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Ponto forte</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Ponto fraco</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Percentual da receita', 'Simples, escala com o caixa que já entra', 'Ignora a economia de lead e as metas de crescimento'],
                        ['Por meta (CAC × volume)', 'Conecta o investimento direto às metas de crescimento', 'Não confere o fluxo de caixa sozinho'],
                      ].map(([metodo, forte, fraco]) => (
                        <tr key={metodo} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metodo}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{forte}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{fraco}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Uma abordagem prática usa o número por meta como orçamento principal e o percentual da receita como um teto de checagem. Se o número por meta estiver bem acima do que o método percentual sugere, essa diferença vale a pena examinar antes de comprometer o investimento.
                </p>
              </section>

              {/* Estágio de crescimento */}
              <section id="estagio-crescimento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como o Estágio de Crescimento Muda o Orçamento</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma empresa construindo seu pipeline a partir de uma base pequena de projetos geralmente precisa investir à frente da receita atual pra chegar no próximo estágio de crescimento. Uma empresa mais estabelecida, com uma base sólida de indicação e clientes recorrentes, pode rodar um orçamento menor, mais focado em eficiência do que em maximizar volume.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Nenhum estágio está automaticamente certo ou errado. O orçamento deve refletir o que o negócio está realmente tentando fazer a seguir, não um número copiado de outra empresa num estágio diferente.
                </p>
              </section>

              {/* Tipo de projeto */}
              <section id="tipo-projeto" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como o Tipo de Projeto Muda o Orçamento</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Pequenos reparos e projetos de um cômodo só geralmente têm ciclos de venda mais curtos e receita média menor do que adições, construção de ADU, reforma de casa inteira ou casas personalizadas.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Projetos de maior valor e ciclo mais longo costumam suportar um custo de aquisição por projeto assinado mais alto, mas só quando margem, taxa de fechamento e a capacidade do negócio de entregar projetos maiores realmente sustentam esse investimento. Um orçamento montado pra trabalho de alto ticket pressupõe um processo de vendas capaz de fechar trabalho de alto ticket.
                </p>
              </section>

              {/* Fixo vs variável */}
              <section id="fixo-vs-variavel" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Custo Fixo de Marketing vs Investimento Variável em Mídia</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um orçamento de marketing completo inclui duas categorias diferentes de custo.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Investimento variável em mídia:</strong> Google Ads, Local Services Ads e outras mídias pagas por clique ou por lead</li>
                  <li><strong className="text-[#0A0A0A]">Custos fixos:</strong> software de CRM, call tracking, hospedagem e manutenção do site, produção de criativo, taxas de agência</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Custos fixos não caem automaticamente quando o volume de leads cai, por isso devem ser planejados separadamente em vez de somados ao mesmo percentual do investimento em mídia.
                </p>
              </section>

              {/* Calcular quanto cabe */}
              <section id="calcular-quanto-cabe" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Calcular Quanto Você Pode Investir</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  É a mesma matemática usada pra achar o custo por lead máximo aceitável, aplicada no nível de um orçamento mensal total.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 1: Defina um CAC alvo</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Baseie isso no lucro bruto por projeto e em quanto dele o negócio está disposto a investir pra adquirir o projeto.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 2: Decida quantos projetos assinados a mais você quer</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Confira isso contra a capacidade real de execução, não só a demanda.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 3: Multiplique o CAC alvo pelos projetos assinados desejados</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-4 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Orçamento mensal = CAC alvo × Projetos assinados desejados</p>
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Passo 4: Some os custos fixos de marketing por cima</h3>
                <p className="text-[#667085] leading-relaxed">
                  CRM, call tracking e taxas de agência não entram no cálculo de CAC acima, mas ainda precisam ser bancados.
                </p>
              </section>

              {/* Calculadora */}
              <section id="calculadora" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Calculadora do Funil de Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-2">
                  Use essa calculadora com os seus próprios números mensais pra ver o CAC e o custo por lead que o seu orçamento atual está realmente gerando. Todos os cálculos rodam no seu navegador e nenhum dado é armazenado ou transmitido.
                </p>
                <ContractorLeadCalculator locale="pt-BR" />
              </section>

              {/* Alocação */}
              <section id="alocacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Alocar o Orçamento Entre Canais</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Não existe uma divisão ideal fixa entre canais, mas alguns princípios geralmente valem:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Concentre o orçamento em um ou dois canais de alta intenção antes de espalhar por muitos</li>
                  <li>Banque custos fixos (CRM, tracking, manutenção do site) separadamente do investimento variável em mídia</li>
                  <li>Realoque pro canal que gera o menor custo por lead qualificado e projeto assinado, não o menor custo por clique</li>
                  <li>Revise a alocação num ciclo longo o bastante pra capturar um ciclo de vendas completo, não semana a semana</li>
                </ul>
              </section>

              {/* Pago vs SEO */}
              <section id="pago-vs-seo" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quanto Investir em Anúncios Pagos vs SEO?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Canais pagos geralmente geram visibilidade rápido, mas param de gerar lead assim que o investimento para. SEO exige investimento inicial e contínuo, com um atraso maior antes de gerar tráfego orgânico relevante, mas não cobra por clique depois que o ranqueamento se estabelece.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Um contractor com pouca tolerância de fluxo de caixa pra um retorno de longo prazo geralmente vai se apoiar mais em canais pagos no início, enquanto um negócio planejando vários anos à frente pode tratar SEO como um ativo que se acumula com o tempo, valendo a pena bancar junto com a mídia paga em vez de no lugar dela. Pra ver como os dois canais se comparam diretamente, veja{' '}
                  <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads para general contractors</Link>.
                </p>
              </section>

              {/* Aumentar investimento */}
              <section id="aumentar-investimento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quando Aumentar o Investimento em Marketing</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>O CAC está consistentemente abaixo da meta</li>
                  <li>O negócio tem capacidade disponível pra assumir mais projetos assinados</li>
                  <li>A taxa de fechamento não começou a cair conforme o volume de leads aumenta</li>
                  <li>Os custos fixos já estão cobertos e o investimento adicional é genuinamente incremental</li>
                </ul>

                <InlineCTA
                  headline="Não Sabe Se Seu Orçamento Tem Espaço Pra Crescer?"
                  body="Analisamos seu CAC atual, taxa de fechamento e capacidade pra dizer se aumentar o investimento geraria projetos mais lucrativos ou só mais leads."
                  buttonLabel="Solicite uma Avaliação Gratuita"
                  locale="pt-BR"
                />
              </section>

              {/* Reduzir investimento */}
              <section id="reduzir-investimento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quando Reduzir ou Pausar o Investimento em Marketing</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>O CAC está acima da meta de forma sustentada</li>
                  <li>O negócio já está com a capacidade de projetos lotada</li>
                  <li>A qualidade dos leads caiu sem uma causa identificada e corrigível</li>
                  <li>O fluxo de caixa não sustenta o ritmo atual de investimento</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Cortar investimento tem efeito de atraso: leads e agendamentos já no pipeline a partir do investimento anterior geralmente continuam convertendo por um tempo depois de um corte, o que pode dificultar ler o efeito do corte no curto prazo.
                </p>
              </section>

              {/* Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns ao Definir o Orçamento</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Copiar um percentual de receita de outro setor ou de outro tipo de contractor</li>
                  <li>Definir um orçamento sem checar a capacidade de execução atual</li>
                  <li>Ignorar os custos fixos de marketing ao planejar o investimento variável</li>
                  <li>Aumentar o investimento antes de confirmar que o custo de aquisição é realmente lucrativo</li>
                  <li>Cortar o investimento assim que os resultados caem, sem checar o efeito de atraso</li>
                  <li>Espalhar um orçamento pequeno por canais demais ao mesmo tempo</li>
                  <li>Nunca revisar o orçamento depois que a margem ou o processo de vendas do negócio muda</li>
                </ul>
              </section>

              {/* Framework */}
              <section id="framework" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Um Framework Prático para Definir Seu Orçamento</h2>
                <CalloutBox type="tip" label="Resumo">
                  Parta de um número por meta construído a partir do seu CAC alvo, confira contra um teto de percentual da receita, e some os custos fixos por cima.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Calcule o lucro bruto por projeto usando receita assinada real e margem real.</li>
                  <li>Defina um CAC alvo baseado nesse lucro bruto.</li>
                  <li>Decida quantos projetos assinados a mais você quer por mês, conferido contra a capacidade.</li>
                  <li>Multiplique o CAC alvo pelos projetos assinados desejados pra um número de investimento variável em mídia.</li>
                  <li>Some os custos fixos de marketing (CRM, tracking, site, taxas de agência) por cima.</li>
                  <li>Compare o total contra um teto de percentual da receita como checagem de fluxo de caixa.</li>
                  <li>Revise o orçamento num ciclo longo o bastante pra capturar dados de um ciclo de vendas completo, e ajuste.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Pra ver o quadro completo de como o orçamento se encaixa numa estratégia de marketing mais ampla, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia completo de marketing para general contractors</Link>. Pra medir se o investimento está valendo a pena, veja{' '}
                  <Link href="/br/blog/como-calcular-o-roi-de-marketing-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como calcular o ROI de marketing para contractors</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Construa um Orçamento de Marketing do Tamanho das Suas Metas"
                body="Tenha um orçamento de marketing claro e baseado em meta, construído a partir da economia real dos seus projetos, não de um percentual genérico da receita."
                buttonLabel="Agende uma Avaliação Gratuita"
                locale="pt-BR"
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
