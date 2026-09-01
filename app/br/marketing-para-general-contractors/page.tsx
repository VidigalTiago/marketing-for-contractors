import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import NavbarPTCTAWrapper from '@/components/blog/navbar-pt-cta-wrapper'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import TableOfContents from '@/components/blog/table-of-contents'
import EndArticleCTA from '@/components/blog/end-article-cta'
import FAQSection from '@/components/blog/faq-section'
import ReadingProgress from '@/components/blog/reading-progress'
import InlineCTA from '@/components/blog/inline-cta'
import { SITE_URL } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Marketing para General Contractors: Guia Completo de Crescimento',
  description:
    'Aprenda como general contractors podem gerar leads qualificados com Google Ads, SEO, sites de alta conversão, CRM e rastreamento de receita.',
  alternates: {
    canonical: `${SITE_URL}/br/marketing-para-general-contractors`,
    languages: {
      'pt-BR': `${SITE_URL}/br/marketing-para-general-contractors`,
      'en-US': `${SITE_URL}/general-contractor-marketing`,
      'x-default': `${SITE_URL}/general-contractor-marketing`,
    },
  },
  openGraph: {
    title: 'Marketing para General Contractors: Guia Completo de Crescimento',
    description:
      'Aprenda como general contractors podem gerar leads qualificados com Google Ads, SEO, sites de alta conversão, CRM e rastreamento de receita.',
    url: `${SITE_URL}/br/marketing-para-general-contractors`,
    type: 'article',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing para General Contractors: Guia Completo de Crescimento',
    description:
      'Aprenda como general contractors podem gerar leads qualificados com Google Ads, SEO, sites de alta conversão, CRM e rastreamento de receita.',
  },
}

const tocItems = [
  { id: 'o-que-e', label: 'O que é Marketing para General Contractors?', level: 2 as const },
  { id: 'por-que-tradicional-nao-basta', label: 'Por que o Marketing Tradicional Não Basta', level: 2 as const },
  { id: 'estrategia', label: 'Como Construir uma Estratégia de Marketing', level: 2 as const },
  { id: 'google-ads', label: 'Google Ads para General Contractors', level: 2 as const },
  { id: 'local-services-ads', label: 'Local Services Ads', level: 2 as const },
  { id: 'seo-local', label: 'SEO Local e Google Maps', level: 2 as const },
  { id: 'site-conversao', label: 'Design de Site e Otimização de Conversão', level: 2 as const },
  { id: 'geracao-leads', label: 'Geração de Leads para Contractors', level: 2 as const },
  { id: 'qualificacao-leads', label: 'Qualificação e Follow-Up de Leads', level: 2 as const },
  { id: 'crm', label: 'CRM para General Contractors', level: 2 as const },
  { id: 'analytics', label: 'Analytics e Rastreamento de Receita', level: 2 as const },
  { id: 'orcamento', label: 'Quanto Investir em Marketing?', level: 2 as const },
  { id: 'metricas', label: 'Métricas de Marketing para Contractors', level: 2 as const },
  { id: 'escolher-agencia', label: 'Como Escolher uma Agência de Marketing', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const faqItems = [
  {
    question: 'Qual é a melhor estratégia de marketing para um general contractor?',
    answer:
      'A estratégia mais eficaz combina anúncios de busca pagos (Google Ads) para capturar proprietários ativamente buscando seus serviços, um site de alta conversão que transforma tráfego em leads, um CRM para gerenciar e fazer follow-up de cada contato, e relatórios que conectam o investimento em marketing a projetos assinados. Nenhum canal funciona de forma isolada.',
  },
  {
    question: 'Google Ads funciona para general contractors?',
    answer:
      'Sim. O Google Ads é um dos canais mais eficazes para geração de leads para general contractors porque captura proprietários no momento em que buscam ativamente pelos seus serviços. Diferente das redes sociais, onde você interrompe pessoas que podem ou não precisar do que você oferece, os anúncios de busca aparecem quando alguém digita "reforma de cozinha perto de mim" ou "construtor de adição residencial [cidade]".',
  },
  {
    question: 'Quanto um general contractor deve gastar em marketing?',
    answer:
      'A maioria dos general contractors investe entre 5% e 10% da receita anual em marketing. Para uma empresa faturando $1M, isso equivale a $50.000 a $100.000 por ano em marketing total, incluindo publicidade paga, site, CRM e gerenciamento de campanhas. Empresas em fase de crescimento frequentemente investem mais para ganhar participação de mercado.',
  },
  {
    question: 'Qual é o maior erro que os contractors cometem no marketing?',
    answer:
      'O maior erro é tratar cada canal de forma isolada sem um sistema de rastreamento que conecte leads a projetos assinados. Contractors frequentemente geram leads, mas não sabem quais campanhas produziram projetos reais. Sem esse dado, é impossível otimizar o investimento ou escalar o que está funcionando.',
  },
  {
    question: 'Marketing digital funciona para contractors de renovação residencial?',
    answer:
      'Sim — e é especialmente eficaz. Proprietários que buscam reformas de cozinha, banheiro ou adições residenciais usam o Google no início do processo de decisão. Uma estratégia bem estruturada de Google Ads, combinada com um site de alta conversão e processo de follow-up, cria um funil previsível de geração de leads.',
  },
]

const breadcrumbItems = [
  { label: 'Início', href: '/br' },
  { label: 'Marketing para General Contractors' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Marketing para General Contractors: Guia Completo de Crescimento',
      description:
        'Aprenda como general contractors podem gerar leads qualificados com Google Ads, SEO, sites de alta conversão, CRM e rastreamento de receita.',
      url: `${SITE_URL}/br/marketing-para-general-contractors`,
      inLanguage: 'pt-BR',
      author: { '@type': 'Person', name: 'Tiago Vidigal' },
      publisher: { '@type': 'Organization', name: 'Marketing For Contractors', url: SITE_URL },
      datePublished: '2025-07-01',
      dateModified: '2025-07-16',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/br` },
        { '@type': 'ListItem', position: 2, name: 'Marketing para General Contractors', item: `${SITE_URL}/br/marketing-para-general-contractors` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
}

export default function PillarPagePT() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white flex flex-col">
        <AnnouncementBanner message="Somente 4 vagas disponíveis no momento para consultoria." />
        <NavbarPTCTAWrapper />
        <ReadingProgress />

        <main id="main-content" className="flex-1 pt-20">
          {/* Hero */}
          <section className="pt-14 pb-10 bg-white border-b border-[#D0D5DD]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <Breadcrumbs items={breadcrumbItems} />
              <div className="mt-6 max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-px bg-[#1565D8]" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                    Guia Completo
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance leading-[1.05] mb-4">
                  Marketing para General Contractors
                </h1>
                <p className="text-[#667085] text-lg leading-relaxed max-w-2xl">
                  Tudo o que uma empresa de construção residencial precisa para gerar leads qualificados, melhorar a conversão e escalar com previsibilidade — do Google Ads ao rastreamento de receita.
                </p>
                <div className="flex items-center gap-4 mt-5 text-[11px] text-[#667085]">
                  <span>Por <strong className="text-[#0A0A0A]">Tiago Vidigal</strong></span>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>25 min de leitura</span>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>Atualizado em 16 de julho de 2025</span>
                </div>
              </div>
            </div>
          </section>

          {/* Body */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
              {/* Article content */}
              <article className="max-w-3xl">
                <TableOfContents items={tocItems} locale="pt-BR" variant="mobile" />

                <section id="o-que-e" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">O que é Marketing para General Contractors?</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Marketing para general contractors é o conjunto de estratégias e sistemas que uma empresa de construção usa para atrair proprietários qualificados, converter consultas em estimativas e transformar estimativas em projetos assinados. Vai muito além de anúncios — inclui o site, o processo de follow-up, o CRM e o rastreamento de receita.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    O marketing eficaz para contractors não gera apenas leads — gera os leads certos. Proprietários com o perfil correto, no serviço certo, com capacidade financeira para o tipo de projeto que você executa.
                  </p>
                </section>

                <section id="por-que-tradicional-nao-basta" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Por que o Marketing Tradicional Não Basta</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Indicações são imprevisíveis. Outdoors e panfletos não se traduzem em dados mensuráveis. Listar no Houzz ou Angi traz volume, mas frequentemente baixa qualidade. Nenhum desses canais oferece a visibilidade necessária para escalar de forma previsível.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    O marketing digital muda a equação: você pode capturar proprietários no exato momento em que buscam seus serviços, rastrear cada lead desde o clique até o projeto assinado e otimizar o investimento com base em receita real — não em impressões ou alcance.
                  </p>
                </section>

                <InlineCTA
                  locale="pt-BR"
                  headline="Quer saber o que está limitando a geração de leads da sua empresa?"
                  body="Solicite uma análise gratuita de marketing e veja exatamente onde estão as oportunidades de crescimento para o seu negócio."
                  buttonLabel="Solicitar Análise Gratuita"
                />

                <section id="estrategia" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Como Construir uma Estratégia de Marketing para Contractors</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Uma estratégia eficaz começa pela clareza: quem é seu cliente ideal, quais serviços têm a maior margem, e em quais mercados geográficos você quer crescer. Só então faz sentido escolher os canais.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    A sequência recomendada para a maioria dos general contractors é: (1) construir uma base de conversão s��lida com um site de alta performance, (2) ativar Google Ads para capturar demanda existente, (3) implementar um CRM para garantir que nenhum lead seja perdido, e (4) adicionar SEO local para construir presença orgânica de longo prazo.
                  </p>
                </section>

                <section id="google-ads" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Google Ads para General Contractors</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    O Google Ads é o canal de geração de leads mais eficaz para general contractors porque captura proprietários no momento em que buscam ativamente por seus serviços. Quando alguém digita "reforma de cozinha [cidade]" ou "construtor de adição residencial perto de mim", seu anúncio aparece na hora certa.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Os elementos que determinam o sucesso com Google Ads são: estrutura de campanha por serviço, seleção de palavras-chave com intenção de compra, landing pages otimizadas para conversão e rastreamento preciso de conversões conectado ao CRM.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Leia nosso guia completo:{' '}
                    <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] hover:underline font-medium">
                      Google Ads para General Contractors
                    </Link>.
                  </p>
                </section>

                <section id="local-services-ads" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Local Services Ads</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Os Local Services Ads (LSA) do Google aparecem acima dos anúncios de pesquisa convencionais e exibem o nome da empresa, avaliações e o selo "Google Guaranteed". Você paga por lead, não por clique, o que os torna eficientes para volumes iniciais de geração de leads.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    LSA e Google Ads Search funcionam melhor em conjunto: LSA captura pesquisas de alta intenção no topo da página, enquanto os anúncios de pesquisa cobrem um volume maior de palavras-chave e oferecem mais controle sobre segmentação e mensagem. Consulte a{' '}
                    <Link href="/br/blog/google-ads-vs-local-services-ads-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      comparação completa entre Google Ads e Local Services Ads
                    </Link>{' '}para uma análise detalhada de custos, elegibilidade, qualidade dos leads e controle.
                  </p>
                </section>

                <section id="seo-local" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">SEO Local e Google Maps</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    O SEO local ajuda sua empresa a aparecer organicamente quando proprietários buscam contractors na sua área. Envolve otimizar seu perfil do Google Business, construir citações consistentes em diretórios, gerar avaliações e criar páginas de serviço por localidade.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    SEO não gera resultados imediatos, mas constrói uma base de gera��ão de leads de longo prazo que não depende de investimento constante em publicidade. Ele amplifica o impacto de todas as outras iniciativas de marketing.
                  </p>
                </section>

                <section id="site-conversao" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Design de Site e Otimização de Conversão</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    O site é o ativo mais crítico na geração de leads para contractors. Todo dólar investido em anúncios e SEO passa pelo site antes de se tornar um lead. Um site mal estruturado desperdiça uma fatia significativa do seu investimento em marketing.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Sites de alta conversão para contractors seguem uma estrutura clara: proposta de valor específica para o serviço na área, prova social (avaliações, fotos de projetos concluídos), formulário ou botão de CTA visível logo acima da dobra, e carregamento rápido em dispositivos móveis.
                  </p>
                </section>

                <InlineCTA
                  locale="pt-BR"
                  headline="Seu site está convertendo visitors em leads qualificados?"
                  body="Uma análise gratuita do seu marketing mostra as maiores oportunidades de melhoria na conversão do seu site."
                  buttonLabel="Ver Análise Gratuita"
                />

                <section id="geracao-leads" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Geração de Leads para Contractors</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Geração de leads para contractors é o processo de atrair proprietários com interesse genuíno em seus serviços e convertê-los em contatos qualificados. Os canais mais eficazes incluem Google Ads Search, Local Services Ads, SEO local e automações de e-mail para leads que ainda não estão prontos para contratar.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    A qualidade dos leads importa mais do que o volume. Um sistema bem configurado filtra leads com ticket baixo ou incompatíveis com seu modelo de negócio antes que eles consumam tempo da sua equipe de vendas.
                  </p>
                </section>

                <section id="qualificacao-leads" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Qualificação e Follow-Up de Leads</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    A maioria dos leads para contractors não fecha na primeira conversa. Proprietários precisam de tempo, comparam orçamentos e às vezes paralisam por meses antes de decidir. Um processo estruturado de follow-up — com automações de e-mail e lembretes no CRM — recupera uma parcela significativa de leads que seriam perdidos. Para um framework completo — com scripts, pipeline de CRM e sequências de follow-up de estimates — veja{' '}
                <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como fazer follow-up com leads de contractors</Link>.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Velocidade de resposta é o fator de qualificação mais subestimado. Contractors que respondem leads em menos de 5 minutos têm taxas de conversão significativamente maiores do que os que demoram horas ou dias.
                  </p>
                </section>

                <section id="crm" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">CRM para General Contractors</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Um CRM (sistema de gestão de relacionamento com clientes) centraliza todos os leads, acompanha cada etapa do funil de vendas e garante que nenhuma oportunidade seja perdida. Para general contractors, as funcionalidades essenciais são: registro automático de leads, rastreamento de estimativas enviadas e status de fechamento, e visibilidade sobre receita por canal de origem.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    O CRM também é o elo que conecta o marketing à receita. Sem ele, é impossível saber quais campanhas geram projetos reais — apenas quais geram cliques ou formulários preenchidos.
                  </p>
                </section>

                <section id="analytics" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Analytics e Rastreamento de Receita</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    A maioria dos contractors rastreia cliques e formulários, mas não sabe quais campanhas geram projetos assinados. O rastreamento de receita conecta cada lead ao projeto que ele originou, permitindo calcular o ROI real de cada canal de marketing.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Um sistema de relatórios completo para contractors deve mostrar: custo por lead por campanha, taxa de conversão de lead para estimativa, taxa de fechamento de estimativas, valor médio do contrato por serviço e ROI total do marketing. Com esses dados, a alocação de orçamento se torna uma decisão baseada em números, não em intuição.
                  </p>
                </section>

                <section id="orcamento" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Quanto Investir em Marketing?</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    A maioria dos general contractors investe entre 5% e 10% da receita anual em marketing. Para uma empresa com faturamento de $1M, isso equivale a $50.000 a $100.000 por ano em marketing total — incluindo mídia paga, site, CRM e gerenciamento de campanhas.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    Empresas em fase de crescimento agressivo frequentemente investem acima de 10% para ganhar participação de mercado. O fator mais importante não é o percentual gasto, mas a visibilidade sobre o retorno gerado por cada dólar investido.
                  </p>
                </section>

                <section id="metricas" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Métricas de Marketing para Contractors</h2>
                  <div className="overflow-x-auto my-6">
                    <table className="w-full text-sm border border-[#D0D5DD]">
                      <thead>
                        <tr className="bg-[#F4F6F8]">
                          <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A] border-b border-[#D0D5DD]">Métrica</th>
                          <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A] border-b border-[#D0D5DD]">Referência</th>
                          <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A] border-b border-[#D0D5DD]">Por que importa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Custo por lead (CPL)', '$80–$200', 'Avalia a eficiência dos canais pagos'],
                          ['Taxa de conversão do site', '3%–8%', 'Mede a performance da landing page'],
                          ['Taxa de conversão lead→estimativa', '40%–70%', 'Avalia a qualidade dos leads e velocidade de resposta'],
                          ['Taxa de fechamento de estimativas', '25%–50%', 'Mede a competitividade das propostas'],
                          ['Custo por projeto assinado', 'Varia por serviço', 'O KPI real do ROI de marketing'],
                        ].map(([metric, bench, why], i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]'}>
                            <td className="px-4 py-3 font-medium text-[#0A0A0A] border-b border-[#D0D5DD]">{metric}</td>
                            <td className="px-4 py-3 text-[#667085] border-b border-[#D0D5DD]">{bench}</td>
                            <td className="px-4 py-3 text-[#667085] border-b border-[#D0D5DD]">{why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section id="escolher-agencia" className="mt-10">
                  <h2 className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight mb-4">Como Escolher uma Agência de Marketing para Contractors</h2>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    A maioria das agências de marketing oferece serviços genéricos que não foram desenvolvidos especificamente para o setor de construção residencial. Isso resulta em campanhas que geram volume de leads, mas não o tipo certo de projeto para o seu negócio.
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">
                    Ao avaliar uma agência, faça as perguntas certas: Eles rastreiam receita ou apenas leads? Eles têm experiência comprovada com general contractors? Eles oferecem visibilidade sobre custo por projeto assinado? Eles configuram e gerenciam o CRM ou apenas entregam leads?
                  </p>
                  <p className="text-[#3D3D3D] leading-relaxed">
                    A diferença entre uma agência especializada em contractors e uma agência genérica está na capacidade de conectar o investimento em marketing a projetos reais assinados — não apenas a cliques ou formulários preenchidos.
                  </p>
                </section>

                <FAQSection items={faqItems} locale="pt-BR" />

                <EndArticleCTA
                  locale="pt-BR"
                  headline="Pronto para Gerar Mais Leads Qualificados?"
                  body="Solicite uma análise gratuita do seu marketing e receba um diagnóstico claro do que está limitando o crescimento da sua empresa de construção."
                  buttonLabel="Solicitar Análise Gratuita"
                />
              </article>

              {/* Sticky sidebar ToC (desktop only) */}
              <aside className="hidden lg:block sticky top-24 self-start">
                <TableOfContents items={tocItems} locale="pt-BR" variant="desktop" />
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
