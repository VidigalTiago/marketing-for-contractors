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

const SLUG = 'o-que-todo-site-de-general-contractor-deve-ter'
const ARTICLE_ID = 'contractor-website-essentials'

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
  { id: 'para-que-serve', label: 'Pra Que Serve o Site de um Contractor', level: 2 as const },
  { id: 'primeira-tela', label: 'O Que Precisa Estar na Primeira Tela', level: 2 as const },
  { id: 'paginas-de-servico', label: 'Uma Página por Serviço', level: 2 as const },
  { id: 'area-de-atuacao', label: 'Área de Atuação e Páginas de Localização', level: 2 as const },
  { id: 'prova', label: 'Prova: Projetos, Avaliações e Credenciais', level: 2 as const },
  { id: 'caminhos-de-contato', label: 'Os Caminhos de Contato Que as Pessoas Usam', level: 2 as const },
  { id: 'formularios', label: 'Quantos Campos o Formulário Precisa Ter', level: 2 as const },
  { id: 'precos', label: 'Mostrar Preço ou Não?', level: 2 as const },
  { id: 'mobile', label: 'A Experiência no Celular', level: 2 as const },
  { id: 'velocidade', label: 'Velocidade e Core Web Vitals', level: 2 as const },
  { id: 'seo-tecnico', label: 'Fundações de SEO Técnico', level: 2 as const },
  { id: 'dados-estruturados', label: 'Dados Estruturados para Contractors', level: 2 as const },
  { id: 'rastreamento', label: 'Rastreamento Que Conecta Lead a Receita', level: 2 as const },
  { id: 'conteudo', label: 'Conteúdo Que Sustenta a Conversa Comercial', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns em Site de Contractor', level: 2 as const },
  { id: 'checklist', label: 'O Checklist do Site de Contractor', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'O Que Todo Site de General Contractor Deve Ter' },
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
                href="/blog/what-every-general-contractor-website-should-include"
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

              {/* Introdução */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  A maioria dos sites de contractor é julgada pelo critério errado. A pergunta que o dono costuma fazer é se o site parece profissional. A pergunta que decide se ele se paga é outra: um homeowner que cai ali consegue perceber, em poucos segundos, que esta empresa faz o tipo de obra que ele precisa, trabalha onde ele mora e pode ser contatada agora?
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O site de um general contractor não é um folheto. Ele é o destino de todo clique de Google Ads, de toda visita vinda do Google Business Profile, de toda indicação que quer conferir a empresa antes de ligar. Tudo que a empresa investe em geração de demanda passa por ali, o que significa que um site fraco encarece todos os outros canais ao mesmo tempo.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este artigo é um checklist do que precisa estar no site de um general contractor e por quê: as páginas, as provas, os caminhos de contato e as fundações técnicas. Pra entender como o site se encaixa no sistema de marketing como um todo, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia completo de marketing para general contractors</Link>.
                </p>
              </section>

              {/* Para que serve */}
              <section id="para-que-serve" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Pra Que Serve o Site de um Contractor</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um homeowner que chega no site de um contractor geralmente está tentando responder quatro perguntas, rápido:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Esta empresa faz o tipo específico de obra que eu preciso?</li>
                  <li>Ela trabalha onde fica o meu imóvel?</li>
                  <li>Existe evidência de que ela faz bem?</li>
                  <li>Como eu falo com ela, e o que acontece depois que eu falo?</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Todo elemento do site ou ajuda a responder uma dessas perguntas, ou disputa atenção com os que ajudam. Esse teste é o filtro mais útil que existe pra decidir o que construir e o que cortar.
                </p>
                <CalloutBox type="info" label="O critério">
                  O site está funcionando quando um homeowner qualificado consegue decidir entrar em contato sem precisar caçar nada. Capricho visual que não empurra essa decisão é decoração, não design.
                </CalloutBox>
              </section>

              {/* Primeira tela */}
              <section id="primeira-tela" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que Precisa Estar na Primeira Tela</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A primeira tela carrega o maior peso porque é a única parte que todo visitante vê. No mínimo ela precisa ter:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Um título específico:</strong> o que a empresa constrói e onde, não um slogan sobre qualidade</li>
                  <li><strong className="text-[#0A0A0A]">Telefone clicável:</strong> visível sem rolar a página, no celular e no desktop</li>
                  <li><strong className="text-[#0A0A0A]">Um call to action principal:</strong> um próximo passo claro, como pedir um orçamento</li>
                  <li><strong className="text-[#0A0A0A]">Um sinal de confiança:</strong> número da licença, anos de mercado, nota das avaliações ou uma credencial reconhecida</li>
                  <li><strong className="text-[#0A0A0A]">Foto de obra real:</strong> trabalho da própria empresa, não banco de imagem da casa de outra pessoa</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  &quot;Qualidade e compromisso desde 1998&quot; não diz nada em que o homeowner possa agir. &quot;Reforma de cozinha e banheiro na Grande Boston, licenciados e segurados&quot; já responde duas das quatro perguntas antes de ele rolar a tela.
                </p>
              </section>

              {/* Páginas de serviço */}
              <section id="paginas-de-servico" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Uma Página por Serviço</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma única página listando dez serviços não consegue ranquear bem pra nenhum deles, e não consegue falar de forma específica com o homeowner que está procurando um. Cada serviço que a empresa vende ativamente e quer ser encontrada geralmente merece a própria página.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma página de serviço que cumpre o papel normalmente cobre:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>O que o serviço inclui e onde ele normalmente para</li>
                  <li>Como é o processo, da primeira ligação à vistoria final</li>
                  <li>Prazo típico e os fatores que mudam esse prazo</li>
                  <li>Fotos de projetos concluídos daquele tipo específico</li>
                  <li>As dúvidas que homeowners fazem sempre sobre aquele serviço</li>
                  <li>Um call to action escrito pra aquele serviço, não um genérico</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  As páginas de serviço também são o que faz o tráfego pago funcionar. Mandar um anúncio de reforma de cozinha pra home desperdiça o clique. A{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">estrutura de palavras-chave de uma conta de Google Ads de contractor</Link>{' '}
                  deveria mapear nas páginas de serviço, uma pra uma.
                </p>
                <CalloutBox type="warning" label="Atenção">
                  Só crie página pra serviço que você realmente quer fazer mais. Uma página de um trabalho que a empresa pega a contragosto vai gerar contato exatamente daquele trabalho.
                </CalloutBox>
              </section>

              {/* Área de atuação */}
              <section id="area-de-atuacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Área de Atuação e Páginas de Localização</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Geografia é um filtro de qualificação. Um site que nunca diz onde a empresa trabalha vai coletar contatos de fora da área, e cada um deles consome tempo de vendas só pra ser desqualificado.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Declare a área de atuação de forma direta na home, na página de contato e em toda página de serviço. Além disso, uma página dedicada de localização se justifica quando a empresa tem algo específico a dizer sobre aquele mercado: projetos concluídos ali, familiaridade com o licenciamento local, tipos de imóvel comuns ou uma presença física real.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O erro clássico é gerar dezenas de páginas trocando o nome da cidade num template idêntico. Essas páginas não agregam nada pra quem lê e correm o risco de serem tratadas como conteúdo raso e duplicado. Um punhado de páginas de localização com substância costuma render mais do que um conjunto grande de páginas intercambiáveis.
                </p>
              </section>

              {/* Prova */}
              <section id="prova" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Prova: Projetos, Avaliações e Credenciais</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Construção é uma compra cara e de alta confiança, feita por alguém que vai deixar desconhecidos entrarem na casa dele por semanas. Prova não é uma seção opcional perto do rodapé.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Galeria de projetos</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Fotos reais de obras concluídas da própria empresa, organizadas por tipo de serviço pra que o visitante encontre trabalho parecido com o projeto dele. Pares de antes e depois convencem mais que a foto pronta sozinha, porque mostram o tamanho do que mudou.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Estudos de caso</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Um relato curto de um projeto (o problema, a abordagem, as restrições, o resultado) faz mais por uma compra considerada do que uma galeria sozinha. Três bons estudos de caso valem mais que trinta fotos sem legenda.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Avaliações</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Traga avaliações que possam ser verificadas fora do site, e atribua cada uma com pelo menos primeiro nome e cidade. Depoimento anônimo soa impossível de checar e pesa quase nada.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Credenciais</h3>
                <p className="text-[#667085] leading-relaxed">
                  Número da licença, status de seguro e bonding, certificações de fabricante e filiação a associações do setor. Informe com precisão e mantenha atualizado: uma certificação vencida exibida no site é pior do que certificação nenhuma.
                </p>
              </section>

              {/* Caminhos de contato */}
              <section id="caminhos-de-contato" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Os Caminhos de Contato Que as Pessoas Usam</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Pessoas diferentes entram em contato de formas diferentes, e um site que oferece só um caminho perde todo mundo que prefere outro. Um conjunto completo normalmente inclui:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Telefone clicável no cabeçalho, persistente no celular</li>
                  <li>Um formulário curto de pedido de orçamento, alcançável de qualquer página</li>
                  <li>SMS ou texto, se o negócio realmente tiver quem responda</li>
                  <li>Um email pra quem prefere escrever com calma</li>
                  <li>Agendamento online, se o processo comercial trabalha com consultas marcadas</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Tão importante quanto isso é o que o site diz que acontece depois. Informar em quanto tempo a pessoa pode esperar retorno cria uma expectativa que o negócio então precisa cumprir, e reduz o número de gente que manda pedido pra três contractors ao mesmo tempo porque não faz ideia se alguém vai ligar de volta.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Nada disso importa se o contato depois fica parado. O site gera o lead; o{' '}
                  <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">processo de follow-up</Link>{' '}
                  decide se ele vira projeto.
                </p>
              </section>

              {/* Formulários */}
              <section id="formularios" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Quantos Campos o Formulário Precisa Ter</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Existe um trade-off real aqui, e a resposta certa depende de qual problema o negócio tem hoje. Menos campos geralmente geram mais envios. Mais campos geralmente geram envios mais qualificados.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Problema atual</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O que fazer no formulário</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Poucos contatos', 'Reduza pra nome, telefone e uma linha de descrição. Qualifique na ligação.'],
                        ['Muitos contatos desqualificados', 'Adicione tipo de projeto, localização do imóvel e prazo aproximado como campos obrigatórios.'],
                        ['Contatos muito fora da faixa de orçamento', 'Adicione um seletor de faixa de investimento e publique contexto de preço na própria página.'],
                        ['Contatos de obra que você não faz', 'Transforme tipo de projeto numa lista fixa em vez de campo livre.'],
                      ].map(([problema, acao]) => (
                        <tr key={problema} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{problema}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{acao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Número bruto de envios é a métrica errada pra otimizar. Uma mudança de formulário que corta um terço dos envios e dobra o percentual que qualifica é uma melhoria, e só um rastreamento que segue o lead até o projeto assinado consegue mostrar isso. É a mesma lógica de olhar{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">custo por lead qualificado em vez de custo por lead bruto</Link>.
                </p>

                <InlineCTA
                  headline="Seu Site Está Custando Leads Qualificados?"
                  body="Analisamos seu site do jeito que um homeowner e um buscador enxergam, e mostramos o que está travando os pedidos de orçamento e o que corrigir primeiro."
                  buttonLabel="Solicite uma Análise Gratuita do Site"
                  locale="pt-BR"
                />
              </section>

              {/* Preços */}
              <section id="precos" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Mostrar Preço ou Não?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Preço exato raramente é viável em obra sob medida. Mas não publicar nada deixa o homeowner adivinhando, e quem adivinha o preço de uma reforma de cozinha erra feio nas duas direções.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um caminho intermediário funciona pra maioria dos contractors: publicar faixas típicas por serviço, um tamanho mínimo de projeto que a empresa aceita, ou uma explicação das variáveis que empurram o preço pra cima e pra baixo (escopo, materiais, obra estrutural, licenciamento, acesso ao imóvel).
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Contexto de preço é uma ferramenta de qualificação disfarçada de seção de conteúdo. Ele filtra contatos incompatíveis antes que consumam tempo de vendas, sem prender a empresa a um número que ela não consegue honrar.
                </p>
              </section>

              {/* Mobile */}
              <section id="mobile" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Experiência no Celular</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Boa parte das buscas por contractor acontece no celular, muitas vezes com a pessoa em pé no cômodo que ela quer mudar. Celular não é uma versão reduzida do site de verdade; pra muita gente é a única versão que vai existir.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Telefone clicável e visível sem rolar a tela</li>
                  <li>Formulário usável com um polegar só, com o teclado certo nos campos de telefone e email</li>
                  <li>Áreas de toque grandes o suficiente pra acertar sem dar zoom</li>
                  <li>Texto legível sem precisar aproximar</li>
                  <li>Galerias que carregam progressivamente em vez de travar a página</li>
                  <li>Nenhum popup cobrindo o conteúdo no instante em que a página abre</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Teste num celular de verdade, em rede móvel, não num navegador de desktop redimensionado. As duas coisas não são a mesma experiência.
                </p>
              </section>

              {/* Velocidade */}
              <section id="velocidade" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Velocidade e Core Web Vitals</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Velocidade afeta a geração de leads de duas formas separadas. Páginas mais lentas dão mais chance do visitante sair antes de chegar ao formulário ou ao telefone, o que derruba a taxa de conversão e encarece cada clique pago. E a experiência de página também é um dos sinais que o Google usa ao avaliar páginas.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google publica limites de Core Web Vitals pro que conta como boa experiência, medidos no percentil 75 dos carregamentos:
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p><strong>Largest Contentful Paint (LCP):</strong> 2,5 segundos ou menos</p>
                  <p><strong>Interaction to Next Paint (INP):</strong> 200 milissegundos ou menos</p>
                  <p><strong>Cumulative Layout Shift (CLS):</strong> 0,1 ou menos</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Em site de contractor os culpados são sempre os mesmos: fotos de obra sem compressão direto da câmera ou do celular, um page builder pesado carregando scripts que a página nem usa, widgets de avaliação e de chat embutidos, e vídeo no topo. Galeria de projeto é a causa número um, e também a mais fácil de resolver, com compressão, formatos modernos de imagem e carregamento sob demanda.
                </p>
              </section>

              {/* SEO técnico */}
              <section id="seo-tecnico" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Fundações de SEO Técnico</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Essa é a mecânica que permite aos buscadores entender e indexar o site. Nada disso é visível pro visitante, e tudo isso limita o quanto o site pode render se estiver errado.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Title tag e meta description únicos por página, escritos pra aquela página, não em template</li>
                  <li>Um H1 por página, com estrutura de H2 e H3 que reflita o conteúdo real</li>
                  <li>URLs descritivas que digam do que a página trata</li>
                  <li>Texto alternativo nas fotos de obra descrevendo o trabalho mostrado</li>
                  <li>Sitemap XML e um arquivo robots que não bloqueie nada importante</li>
                  <li>HTTPS no site inteiro, com uma única versão canônica de cada URL</li>
                  <li>Links internos conectando páginas de serviço, de localização e o guia pilar</li>
                  <li>Nome, endereço e telefone do negócio consistentes com o Google Business Profile</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Esse último ponto pesa mais pra contractor do que pra maioria dos negócios, porque boa parte da descoberta local passa pelo Google Business Profile e não pelo site. Dados de contato divergentes entre os dois enfraquecem os dois.
                </p>
              </section>

              {/* Dados estruturados */}
              <section id="dados-estruturados" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Dados Estruturados para Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Dados estruturados dizem explicitamente aos buscadores o que a página descreve, em vez de deixar que eles deduzam. O Schema.org tem um tipo dedicado <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">GeneralContractor</code>, que fica abaixo de <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">LocalBusiness</code> através de <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">HomeAndConstructionBusiness</code>.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">GeneralContractor:</strong> o próprio negócio, com nome, endereço, telefone, horário e área de atuação</li>
                  <li><strong className="text-[#0A0A0A]">Service:</strong> cada página de serviço individual</li>
                  <li><strong className="text-[#0A0A0A]">FAQPage:</strong> páginas com uma seção real de perguntas e respostas</li>
                  <li><strong className="text-[#0A0A0A]">BreadcrumbList:</strong> o caminho de navegação até a página</li>
                  <li><strong className="text-[#0A0A0A]">BlogPosting:</strong> artigos e guias</li>
                </ul>
                <CalloutBox type="warning" label="Atenção">
                  Dados estruturados descrevem o que já está na página. Marcar avaliações, serviços ou credenciais que não aparecem no conteúdo visível pode gerar penalidade manual em vez de resultado enriquecido.
                </CalloutBox>
              </section>

              {/* Rastreamento */}
              <section id="rastreamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Rastreamento Que Conecta Lead a Receita</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um site sem medição não pode ser melhorado, só redesenhado no instinto. O mínimo pra um site de contractor é:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Analytics com envio de formulário configurado como evento de conversão</li>
                  <li>Números de call tracking, pra que a ligação seja atribuída a uma origem em vez de se perder</li>
                  <li>Captura da origem no próprio formulário, incluindo referrer original e parâmetros de campanha</li>
                  <li>Leads caindo num CRM com essa origem anexada</li>
                  <li>Search Console conectado, pra ver quais buscas de fato chegam no site</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Ligação telefônica é onde o rastreamento de contractor costuma quebrar. Homeowner liga em vez de preencher formulário muito mais do que na maioria dos setores, e um site que só conta envio de formulário vai subestimar de forma consistente o que suas melhores páginas produzem. Com a origem chegando no CRM, fica possível medir{' '}
                  <Link href="/br/blog/como-calcular-o-roi-de-marketing-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">o ROI real de marketing</Link>{' '}
                  em vez de tráfego.
                </p>
              </section>

              {/* Conteúdo */}
              <section id="conteudo" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Conteúdo Que Sustenta a Conversa Comercial</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Além das páginas de serviço e de localização, o conteúdo que vale escrever é o que responde o que homeowners perguntam antes de contratar: quanto tempo leva uma obra daquele tipo, o que acontece se aparecer surpresa atrás da parede, quem cuida das licenças, como funciona o pagamento, o que a garantia cobre.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Essas respostas fazem duas coisas ao mesmo tempo. Capturam busca de gente em fase de pesquisa, e encurtam a conversa comercial com quem já está falando com a empresa, porque o terreno já foi preparado antes da primeira ligação.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  O teste útil pra qualquer artigo é se ele ajudaria um prospect real a decidir. Publicar numa cadência fixa sem um leitor específico em mente gera manutenção, não tráfego qualificado.
                </p>
              </section>

              {/* Erros */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns em Site de Contractor</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Foto de banco de imagem de casas em que a empresa nunca trabalhou</li>
                  <li>Uma única página listando todos os serviços em vez de uma página por serviço</li>
                  <li>Nenhuma menção à área de atuação em lugar nenhum do site</li>
                  <li>Telefone como imagem, ou enterrado no rodapé, ou não clicável no celular</li>
                  <li>Formulário que não dá confirmação nem indica o que acontece depois</li>
                  <li>Dezenas de páginas de cidade quase idênticas feitas de um template só</li>
                  <li>Fotos de galeria sem compressão deixando todas as páginas lentas</li>
                  <li>Credenciais e certificações mantidas no site depois de vencidas</li>
                  <li>Nenhum call tracking, o que torna os leads de telefone invisíveis em todo relatório</li>
                  <li>Redesign lançado sem ter medido o que o site anterior convertia</li>
                </ul>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Checklist do Site de Contractor</h2>
                <CalloutBox type="tip" label="Resumo">
                  Responda quatro perguntas rápido (o que você constrói, onde trabalha, prova de que faz bem, como falar com você) e depois garanta que as fundações técnicas e o rastreamento estão de pé pra provar que funciona.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Título específico nomeando os serviços e a área de atuação.</li>
                  <li>Telefone clicável visível sem rolar, em toda página.</li>
                  <li>Uma página por serviço que a empresa realmente quer fazer mais.</li>
                  <li>Área de atuação declarada, com página de localização só onde há substância.</li>
                  <li>Galeria com obras da própria empresa, organizada por serviço.</li>
                  <li>Avaliações e estudos de caso atribuíveis e verificáveis.</li>
                  <li>Licença, seguro e certificações, informados com precisão e atualizados.</li>
                  <li>Formulário dimensionado ao problema de qualificação que o negócio tem hoje.</li>
                  <li>Contexto de preço, mesmo quando preço exato não é possível.</li>
                  <li>Experiência no celular testada em aparelho real, em rede móvel.</li>
                  <li>Core Web Vitals dentro dos limites publicados pelo Google.</li>
                  <li>Títulos, headings, URLs, sitemap, HTTPS e links internos em ordem.</li>
                  <li>Dados estruturados batendo com o que está visível na página.</li>
                  <li>Analytics, call tracking, captura de origem e envio pro CRM ligados de ponta a ponta.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Um site construído nesse padrão aumenta o retorno de todo canal apontado pra ele. Pra decidir quanto investir nesses canais, veja{' '}
                  <Link href="/br/blog/quanto-general-contractors-devem-investir-em-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">quanto general contractors devem investir em marketing</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Transforme Seu Site em um Ativo de Geração de Leads"
                body="Receba uma lista específica e priorizada do que está impedindo seu site de converter homeowners qualificados em orçamentos agendados."
                buttonLabel="Agende uma Análise Gratuita do Site"
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
