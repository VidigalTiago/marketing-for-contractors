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
import ContractorFollowUpTimeline from '@/components/blog/contractor-follow-up-timeline'

const SLUG = 'como-fazer-follow-up-com-leads-de-contractors'
const ARTICLE_ID = 'follow-up-contractor-leads'

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
  { id: 'o-que-e-follow-up', label: 'O Que É Follow-Up de Leads para Contractors?', level: 2 as const },
  { id: 'por-que-parar', label: 'Por Que Leads de Contractors Param de Responder?', level: 2 as const },
  { id: 'funil', label: 'O Funil de Follow-Up para Contractors', level: 2 as const },
  { id: 'rapidez-resposta', label: 'Com Que Rapidez um Contractor Deve Responder um Lead?', level: 2 as const },
  { id: 'canais', label: 'Qual Canal Usar para Fazer Follow-Up?', level: 2 as const },
  { id: 'sequencia', label: 'Sequência de Follow-Up para Leads', level: 2 as const },
  { id: 'script-ligacao', label: 'Script para a Primeira Ligação', level: 2 as const },
  { id: 'qualificacao', label: 'Perguntas para Qualificar Leads', level: 2 as const },
  { id: 'follow-up-agendamento', label: 'Follow-Up Depois de Agendar um Estimate', level: 2 as const },
  { id: 'follow-up-estimate', label: 'Follow-Up Depois de Enviar um Estimate', level: 2 as const },
  { id: 'sequencia-proposta', label: 'Sequência de Follow-Up de Propostas', level: 2 as const },
  { id: 'por-que-crm', label: 'Por Que Contractors Precisam de CRM', level: 2 as const },
  { id: 'pipeline-crm', label: 'Pipeline de CRM para General Contractors', level: 2 as const },
  { id: 'automacao', label: 'Automação de Follow-Up para Contractors', level: 2 as const },
  { id: 'exemplo-automacao', label: 'Exemplo de Automação de CRM', level: 2 as const },
  { id: 'ligacoes-perdidas', label: 'Follow-Up de Ligações Perdidas', level: 2 as const },
  { id: 'reativar-leads', label: 'Como Reativar Leads Antigos', level: 2 as const },
  { id: 'sem-ser-inconveniente', label: 'Como Fazer Follow-Up Sem Ser Inconveniente', level: 2 as const },
  { id: 'metricas', label: 'Métricas de Follow-Up que Contractors Devem Acompanhar', level: 2 as const },
  { id: 'cpl-follow-up', label: 'Como o Follow-Up Afeta o Custo por Lead', level: 2 as const },
  { id: 'erros', label: 'Erros Comuns de Follow-Up', level: 2 as const },
  { id: 'checklist', label: 'Checklist de Follow-Up para Contractors', level: 2 as const },
  { id: 'sistema-final', label: 'Sistema Final de Follow-Up', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Como Fazer Follow-Up com Leads de Contractors' },
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
                href="/blog/how-to-follow-up-with-contractor-leads"
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
                  <span>Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </header>

              {/* Introdução */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  A maioria dos contractors investe dinheiro de verdade gerando leads via Google Ads, Local Services Ads, SEO, Google Business Profile, indicações e Meta Ads. Depois disso, o resultado se quebra silenciosamente: ligações não são atendidas, leads de formulário não recebem confirmação imediata, o vendedor liga uma vez e desiste, estimates são enviados sem nenhum plano de follow-up, e os leads ficam acumulados em planilhas ou celulares pessoais sem que ninguém saiba por que as oportunidades foram perdidas.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Gerar um lead é apenas o começo do processo comercial. Um contractor precisa de um funil mensurável — lead, contatado, qualificado, agendamento, estimate, proposta, follow-up, projeto assinado — com um responsável, uma etapa e uma próxima ação claros para cada oportunidade aberta.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Este guia é um sistema prático de follow-up de leads para contractors: timing de resposta, canais, scripts, workflows de CRM e etapas de qualificação para converter mais solicitações em projetos assinados. Ele se conecta ao{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>, que cobre o sistema completo de marketing no qual esse processo de follow-up se encaixa.
                </p>
              </section>

              {/* O que é follow-up */}
              <section id="o-que-e-follow-up" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Que É Follow-Up de Leads para Contractors?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Follow-up de leads para contractors é o processo estruturado que a empresa executa depois que uma solicitação entra no pipeline — cada ligação, SMS, email e atualização no CRM entre &quot;alguém preencheu um formulário&quot; e &quot;um projeto assinado&quot;.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  É útil separar quatro atividades relacionadas, mas distintas: geração de leads (trazer a solicitação para dentro), gestão de leads (organizar e acompanhar), qualificação de leads (confirmar que é um fit real) e follow-up comercial (levar até a decisão).
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  Marketing gera a oportunidade → O processo comercial converte a oportunidade
                </div>
                <p className="text-[#667085] leading-relaxed">
                  As duas metades dessa frase devem ser medidas separadamente. Uma campanha de marketing pode performar bem enquanto o processo de follow-up falha — e o contrário também é comum.
                </p>
              </section>

              {/* Por que param de responder */}
              <section id="por-que-parar" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Por Que Leads de Contractors Param de Responder?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um lead ficar quieto raramente significa a mesma coisa duas vezes. Motivos comuns incluem:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Eles contataram vários contractors e estão comparando opções</li>
                  <li>Ainda estão pesquisando e não estão prontos para decidir</li>
                  <li>O timeline do projeto mudou</li>
                  <li>Não foram contatados rápido o suficiente</li>
                  <li>O contractor não deu um próximo passo claro</li>
                  <li>O lead não reconhece o número que está ligando</li>
                  <li>O projeto não é urgente</li>
                  <li>O cônjuge ou outro decisor ainda não se posicionou</li>
                  <li>As expectativas de orçamento mudaram, ou o financiamento não foi resolvido</li>
                  <li>Eles receberam outros estimates</li>
                  <li>A primeira interação gerou pouca confiança</li>
                  <li>O lead nunca foi qualificado corretamente</li>
                </ul>
                <CalloutBox type="info" label="Insight Importante">
                  Nem todo lead que não responde é um lead ruim. Alguns têm baixa intenção, não são um bom fit, ainda não estão prontos ou simplesmente são difíceis de contatar — tratar todos como falhas leva às correções erradas.
                </CalloutBox>
              </section>

              {/* Funil */}
              <section id="funil" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Funil de Follow-Up para Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um sistema prático de follow-up move cada lead por uma sequência visível de etapas: novo lead, primeira resposta, contatado, qualificado, agendamento, estimate ou consulta, proposta enviada, follow-up de proposta e, por fim, ganho, perdido ou nurture.
                </p>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Cada etapa precisa de um objetivo, um responsável, uma ação exigida, um status no CRM e uma próxima data de follow-up. Explore o funil abaixo.
                </p>
                <ContractorFollowUpTimeline locale="pt-BR" />
                <CalloutBox type="warning" label="Atenção">
                  Nenhuma oportunidade ativa deveria existir sem um responsável, uma etapa, uma próxima ação e uma data para essa ação. Oportunidades sem esses quatro elementos são as que silenciosamente esfriam.
                </CalloutBox>
              </section>

              {/* Rapidez de resposta */}
              <section id="rapidez-resposta" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Com Que Rapidez um Contractor Deve Responder um Lead?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Leads de alta intenção geralmente se beneficiam de uma confirmação rápida. Não existe um número universal de minutos que se aplique a todo contractor e origem de lead — o ritmo ideal depende da origem do lead, do tipo de projeto e da capacidade real da equipe de vendas.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Confirmação automática imediata</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma confirmação por SMS, email ou de agendamento pode alinhar expectativas na hora — por exemplo: &quot;Hi John, this is Mike from ABC Remodeling. I just received your request about your kitchen remodel in Boston. I&apos;ll give you a quick call shortly to learn more about the project.&quot; Isso é um exemplo, não o único script aceitável.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Contato humano o mais breve possível</h3>
                <p className="text-[#667085] leading-relaxed">
                  Uma mensagem automática não substitui uma ligação, SMS ou email feito por uma pessoa. Ela ganha tempo e ajuda no tom — a conversa comercial em si ainda precisa de alguém no telefone.
                </p>
              </section>

              {/* Canais */}
              <section id="canais" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Qual Canal Usar para Fazer Follow-Up?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um sistema eficaz geralmente usa mais de um canal em vez de depender de apenas um.
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm border border-[#D0D5DD]">
                    <thead>
                      <tr className="bg-[#F4F6F8] text-left">
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Canal</th>
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Melhor Uso</th>
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Ponto Forte</th>
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Limitação</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#667085]">
                      <tr className="border-b border-[#F4F6F8]">
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">Telefone</td>
                        <td className="px-4 py-3">Qualificação e conversa comercial</td>
                        <td className="px-4 py-3">Alto contexto</td>
                        <td className="px-4 py-3">O lead pode não atender</td>
                      </tr>
                      <tr className="border-b border-[#F4F6F8]">
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">SMS</td>
                        <td className="px-4 py-3">Comunicação rápida e reminders</td>
                        <td className="px-4 py-3">Conveniente</td>
                        <td className="px-4 py-3">Exige mensagens concisas e consentimento adequado</td>
                      </tr>
                      <tr className="border-b border-[#F4F6F8]">
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">Email</td>
                        <td className="px-4 py-3">Detalhes, estimates, documentação</td>
                        <td className="px-4 py-3">Bom para comunicação mais longa</td>
                        <td className="px-4 py-3">Menor urgência</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">Voicemail</td>
                        <td className="px-4 py-3">Apoio ao follow-up de ligações perdidas</td>
                        <td className="px-4 py-3">Adiciona contexto</td>
                        <td className="px-4 py-3">Não deveria ser o único canal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Sequência */}
              <section id="sequencia" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Sequência de Follow-Up para Leads</h2>
                <CalloutBox type="info" label="Exemplo de Fluxo">
                  Adapte isso ao seu ciclo de vendas e às suas exigências de comunicação — não é uma regra universal.
                </CalloutBox>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 mt-5">Nova solicitação</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Enviar uma confirmação imediata, fazer uma ligação humana quando possível, seguir com SMS se apropriado e enviar uma confirmação por email.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Se não houver resposta</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Fazer tentativas adicionais de contato nos dias seguintes, variando telefone, SMS e email em vez de enviar a mesma mensagem repetidamente.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Depois de várias tentativas sem sucesso</h3>
                <p className="text-[#667085] leading-relaxed">
                  Mover o lead para Nurture / Não Foi Possível Contatar em vez de excluí-lo — uma reativação futura ainda pode ser valiosa. Evite mensagens excessivas ou invasivas.
                </p>
              </section>

              {/* Script da ligação */}
              <section id="script-ligacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Script para a Primeira Ligação</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Isso é um framework de conversa, não um script rígido:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-5">
                  <li>Se apresente e apresente sua empresa</li>
                  <li>Mencione a solicitação</li>
                  <li>Confirme o tipo de projeto</li>
                  <li>Confirme a localização</li>
                  <li>Entenda o resultado desejado</li>
                  <li>Pergunte sobre o timeline</li>
                  <li>Esclareça o escopo do projeto</li>
                  <li>Determine se o projeto é um bom fit para a empresa</li>
                  <li>Explique o próximo passo</li>
                  <li>Agende a reunião quando qualificado</li>
                </ol>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 text-sm text-[#0A0A0A] italic">
                  &quot;Hi Sarah, this is Mike from ABC Remodeling. You reached out about a kitchen renovation in Newton. I wanted to learn a little more about the project and see if we&apos;re a good fit.&quot;
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Evite uma linguagem comercial agressiva — o objetivo da primeira ligação é entender o projeto, não fechar na hora.
                </p>
              </section>

              {/* Perguntas de qualificação */}
              <section id="qualificacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Perguntas para Qualificar Leads</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Que tipo de projeto você está planejando?</li>
                  <li>Onde fica o imóvel?</li>
                  <li>Quais áreas do imóvel serão reformadas?</li>
                  <li>Qual resultado você está buscando?</li>
                  <li>Quando você gostaria que o projeto começasse?</li>
                  <li>Você já falou com outros contractors?</li>
                  <li>Você já tem plantas ou desenhos?</li>
                  <li>Você já tem uma faixa de orçamento em mente?</li>
                  <li>Quem estará envolvido na decisão?</li>
                  <li>O proprietário do imóvel está envolvido?</li>
                  <li>Você já considerou financiamento, se necessário?</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  As exigências de qualificação variam por serviço — não force todas as perguntas em um formulário de entrada. Algumas perguntas são melhor conduzidas naturalmente durante a ligação.
                </p>
              </section>

              {/* Follow-up após agendamento */}
              <section id="follow-up-agendamento" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Fazer Follow-Up Depois de Agendar um Estimate</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Faltas em agendamentos são uma fonte comum de tempo comercial perdido. Um sistema simples de reminder ajuda:
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Quando o agendamento é feito</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Enviar uma confirmação com data, horário, endereço, contato, o que preparar e como reagendar.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Antes do agendamento</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Enviar um reminder pelo canal de comunicação que o lead aceitou usar.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">No dia do agendamento</h3>
                <p className="text-[#667085] leading-relaxed">
                  Uma confirmação curta opcional pode ajudar, mas evite tornar a sequência excessiva — reminders devem reduzir a incerteza e tornar o processo mais profissional, não sobrecarregar.
                </p>
              </section>

              {/* Follow-up após estimate */}
              <section id="follow-up-estimate" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Fazer Follow-Up Depois de Enviar um Estimate</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Contractors costumam enviar um estimate e depois esperar indefinidamente. Substitua isso por um pipeline definido: estimate preparado, estimate enviado, follow-up agendado, cliente avaliando, revisão solicitada, decisão pendente, ganho, perdido ou nurture de longo prazo.
                </p>
                <CalloutBox type="tip" label="Dica Prática">
                  Todo estimate deveria ter uma próxima data de follow-up definida antes de ser enviado — não adicionada depois, se o cliente ficar quieto.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Conduza a conversa ajudando o prospect a decidir, em vez de simplesmente perguntar &quot;você já decidiu?&quot; — por exemplo: &quot;Hi Sarah, I wanted to make sure you received the proposal and see whether you had any questions about the scope, timeline, or next steps.&quot;
                </p>
              </section>

              {/* Sequência de proposta */}
              <section id="sequencia-proposta" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Sequência de Follow-Up de Propostas</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Pouco depois de enviar</h3>
                <p className="text-[#667085] leading-relaxed mb-4">Confirmar o recebimento.</p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Follow-up</h3>
                <p className="text-[#667085] leading-relaxed mb-4">Discutir dúvidas, escopo, materiais, timeline, preocupações de orçamento e o processo de decisão.</p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Follow-up adicional</h3>
                <p className="text-[#667085] leading-relaxed mb-4">Tentar entender se o projeto foi adiado, um concorrente foi escolhido, o preço é um problema, o escopo mudou, eles estão esperando financiamento ou precisam de outro decisor.</p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Follow-up final ativo</h3>
                <p className="text-[#667085] leading-relaxed">
                  Perguntar se a oportunidade deve continuar ativa, ser reagendada para depois, ou ser encerrada. Dias exatos não devem ser tratados como regras universais — dependem do ciclo de vendas e do tipo de projeto.
                </p>
              </section>

              {/* Por que CRM */}
              <section id="por-que-crm" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Por Que Contractors Precisam de CRM para Follow-Up de Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um CRM cria uma única fonte de verdade para informações de contato, origem do lead, tipo de projeto, localização, notas, ligações, SMS, emails, agendamentos, status do estimate, valor da proposta, tarefas de follow-up, motivos de perda e receita.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Gerenciar leads apenas com telefones pessoais, uma caixa de email, WhatsApp, planilhas, memória ou anotações em papel não é necessariamente errado — planilhas podem funcionar bem em baixo volume. Elas simplesmente se tornam mais difíceis de manter de forma consistente conforme o volume de leads e a complexidade comercial aumentam.
                </p>
              </section>

              {/* Pipeline de CRM */}
              <section id="pipeline-crm" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Pipeline de CRM para General Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um pipeline inicial, adaptável ao seu processo comercial real:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li>Novo Lead</li>
                  <li>Tentando Contato</li>
                  <li>Contatado</li>
                  <li>Qualificado</li>
                  <li>Reunião Agendada</li>
                  <li>Estimate Agendado</li>
                  <li>Proposta Enviada</li>
                  <li>Negociação / Decisão</li>
                  <li>Ganho</li>
                  <li>Perdido</li>
                  <li>Nurture de Longo Prazo</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  Para cada etapa, defina uma condição de entrada, a próxima ação exigida e a condição de saída — essa estrutura é o que torna o pipeline acionável, e não apenas decorativo.
                </p>
              </section>

              {/* Automação */}
              <section id="automacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Automação de Follow-Up para Contractors</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Boas oportunidades de automação</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Confirmação de novo lead</li>
                  <li>Atribuição do lead</li>
                  <li>Criação de tarefas comerciais</li>
                  <li>Reminders de agendamento</li>
                  <li>Alertas de ligação perdida</li>
                  <li>Reminders de follow-up</li>
                  <li>Confirmações por email</li>
                  <li>Alertas de pipeline</li>
                  <li>Alertas de leads antigos</li>
                  <li>Reminders de reativação</li>
                </ul>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Atividades conduzidas por pessoas</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Qualificação</li>
                  <li>Perguntas complexas</li>
                  <li>Discussões de escopo</li>
                  <li>Conversas comerciais</li>
                  <li>Apresentação de estimate</li>
                  <li>Negociação</li>
                  <li>Tratamento de objeções</li>
                  <li>Construção de relacionamento</li>
                </ul>
                <CalloutBox type="info" label="Princípio Central">
                  Automatize o processo, não o relacionamento.
                </CalloutBox>
              </section>

              {/* Exemplo de automação */}
              <section id="exemplo-automacao" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Exemplo de Automação de CRM para Contractors</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-xs sm:text-sm text-[#0A0A0A] leading-relaxed">
                  Formulário do Site / Google Ads / LSA / Ligação<br />↓<br />Lead Criado no CRM<br />↓<br />Origem + UTM + GCLID Capturados<br />↓<br />Atribuído a um Vendedor<br />↓<br />Confirmação por SMS / Email<br />↓<br />Tarefa de Ligação Criada<br />↓<br />Qualificado<br />↓<br />Reunião<br />↓<br />Estimate<br />↓<br />Proposta<br />↓<br />Ganho / Perdido<br />↓<br />Receita + Motivo de Perda
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Essa estrutura é o que permite uma atribuição de marketing real — conectando o clique no anúncio até a receita assinada.
                </p>
              </section>

              {/* Ligações perdidas */}
              <section id="ligacoes-perdidas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Fazer Follow-Up de Ligações Perdidas</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Um workflow de ligação perdida normalmente inclui um processo de retorno, uma notificação de ligação perdida, uma confirmação por SMS quando apropriado, criação de tarefa no CRM e rastreamento de origem.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 text-sm text-[#0A0A0A] italic">
                  &quot;Hi John, this is ABC Remodeling. Sorry we missed your call. Were you reaching out about a remodeling project?&quot;
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Se uma mensagem como essa for automática, não a apresente como enviada manualmente — clareza gera confiança.
                </p>
              </section>

              {/* Reativar leads */}
              <section id="reativar-leads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Reativar Leads Antigos</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Leads antigos costumam incluir projetos adiados, leads que pararam de responder, estimates não aceitos, projetos sazonais, leads esperando financiamento ou leads com timeline futuro. Ideias razoáveis de reativação incluem um check-in sobre o projeto, um reminder sazonal, uma atualização de disponibilidade, um exemplo relevante de trabalho recente, uma atualização de financiamento quando aplicável, ou uma atualização de área de atendimento.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Evite mensagens do tipo spam e nunca envie mensagens repetidas para quem pediu para não ser mais contatado.
                </p>
              </section>

              {/* Sem ser inconveniente */}
              <section id="sem-ser-inconveniente" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Fazer Follow-Up Sem Ser Inconveniente</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Follow-up útil</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Agrega contexto</li>
                  <li>Responde dúvidas</li>
                  <li>Oferece próximos passos</li>
                  <li>Faz referência ao projeto real</li>
                  <li>Respeita as preferências de comunicação</li>
                  <li>Para quando apropriado</li>
                </ul>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Follow-up ruim</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Mesma mensagem repetidamente</li>
                  <li>Urgência artificial</li>
                  <li>Mensagens genéricas diárias</li>
                  <li>Sem contexto do projeto</li>
                  <li>Pressão agressiva</li>
                  <li>Ignorar pedidos de opt-out</li>
                  <li>Continuar indefinidamente</li>
                </ul>
                <CalloutBox type="tip" label="Princípio Central">
                  A persistência deve aumentar a clareza, não a pressão.
                </CalloutBox>
              </section>

              {/* Métricas */}
              <section id="metricas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Métricas de Follow-Up que Contractors Devem Acompanhar</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A] space-y-1">
                  <p>Taxa de resposta = Leads que respondem ÷ Leads contatados</p>
                  <p>Taxa de contato = Leads contatados com sucesso ÷ Total de leads</p>
                  <p>Taxa de qualificação = Leads qualificados ÷ Total de leads</p>
                  <p>Taxa de agendamento = Agendamentos ÷ Leads qualificados</p>
                  <p>Taxa de comparecimento = Agendamentos realizados ÷ Agendamentos marcados</p>
                  <p>Taxa de estimates = Estimates ÷ Leads qualificados</p>
                  <p>Taxa de proposta-para-venda = Projetos assinados ÷ Propostas</p>
                  <p>Taxa de lead-para-venda = Projetos assinados ÷ Total de leads</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Também acompanhe o tempo médio de resposta, tentativas de follow-up por oportunidade, distribuição de motivos de perda, receita assinada por origem e custo de aquisição de cliente.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Juntas, essas métricas ajudam a diferenciar um problema de marketing de um problema de follow-up e de um problema de vendas.
                </p>
              </section>

              {/* CPL */}
              <section id="cpl-follow-up" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como o Follow-Up Afeta o Custo por Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A performance do follow-up muda diretamente o que um{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">bom custo por lead</Link>{' '}
                  realmente entrega. Suponha que dois contractors gastem $5.000 cada e gerem 25 leads cada — ambos têm um CPL de $200.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p>Contractor A fecha 1 projeto</p>
                  <p>Contractor B fecha 3 projetos</p>
                  <p className="font-bold mt-2">Mesmo CPL de anúncios. Resultado de negócio completamente diferente.</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Aumentar a taxa de contato, a qualificação, a taxa de agendamento, o follow-up de estimates e a taxa de fechamento pode melhorar a economia de marketing sem gerar nenhum lead adicional — a performance do follow-up está diretamente conectada ao custo de aquisição de cliente.
                </p>
              </section>

              <InlineCTA
                headline="Quantos Leads Você Está Perdendo Depois do Primeiro Contato?"
                body="Conectamos seus anúncios, site, ligações, SMS, CRM, reuniões, estimates e contratos para que cada lead qualificado tenha um próximo passo claro."
                buttonLabel="Solicitar uma Análise Gratuita"
                locale="pt-BR"
              />

              {/* Erros comuns */}
              <section id="erros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Erros Comuns de Follow-Up</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Ligar uma vez e desistir</li>
                  <li>Nenhuma confirmação imediata</li>
                  <li>Nenhum CRM</li>
                  <li>Nenhum responsável pelo lead</li>
                  <li>Nenhuma data de próxima ação</li>
                  <li>Nenhum workflow de ligação perdida</li>
                  <li>Nenhum reminder de agendamento</li>
                  <li>Enviar um estimate sem agendar follow-up</li>
                  <li>Tratar todo lead da mesma forma</li>
                  <li>Não registrar os motivos de perda</li>
                  <li>Esquecer oportunidades antigas</li>
                  <li>Usar telefones pessoais sem visibilidade centralizada</li>
                  <li>Medir volume de leads em vez de resultados comerciais</li>
                  <li>Automatizar demais as conversas</li>
                  <li>Enviar mensagens repetitivas</li>
                  <li>Ignorar as preferências de comunicação do cliente</li>
                </ul>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Checklist de Follow-Up para Contractors</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Novos leads entram no CRM automaticamente</li>
                  <li>A origem do lead é capturada</li>
                  <li>O lead é atribuído</li>
                  <li>Existe uma confirmação imediata</li>
                  <li>Uma tarefa de follow-up humano é criada</li>
                  <li>As ligações são rastreadas</li>
                  <li>O SMS é rastreado quando aplicável</li>
                  <li>Os critérios de qualificação estão documentados</li>
                  <li>Os agendamentos disparam reminders</li>
                  <li>Todo estimate tem uma data de follow-up</li>
                  <li>As etapas da proposta são visíveis</li>
                  <li>Os motivos de perda são registrados</li>
                  <li>Leads antigos têm um processo de nurture</li>
                  <li>A receita é associada ao lead original</li>
                  <li>As métricas de marketing e vendas são revisadas juntas</li>
                </ul>
              </section>

              {/* Sistema final */}
              <section id="sistema-final" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Sistema Final de Follow-Up para Contractors</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  Gerar → Responder → Qualificar → Agendar → Estimate → Follow-Up → Fechar → Medir
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A performance de marketing não deveria parar em &quot;lead gerado&quot;. Ela deveria continuar até &quot;ganho / perdido + receita + motivo&quot;.
                </p>
                <CalloutBox type="tip" label="Conclusão">
                  O contractor com mais leads não vence automaticamente. O contractor com o melhor sistema para converter demanda qualificada em projetos assinados pode superar concorrentes gastando o mesmo em marketing.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Para o panorama completo de como isso se encaixa em um sistema mais amplo, consulte o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de marketing para general contractors</Link>, o{' '}
                  <Link href="/br/blog/google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia de Google Ads para general contractors</Link>, e{' '}
                  <Link href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como a intenção de busca molda a estratégia de palavras-chave</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Perguntas Frequentes</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Crie um Sistema de Follow-Up que Converta Mais Projetos"
                body="Transforme seus leads em um pipeline comercial mensurável usando CRM, qualificação, automações, reminders e acompanhamento de receita."
                buttonLabel="Agendar uma Análise Gratuita"
                locale="pt-BR"
              />

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} locale="pt-BR" />
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Navegação do artigo">
              <TableOfContents items={tocItems} variant="desktop" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
