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

const SLUG = 'por-que-leads-de-contractors-nao-viram-agendamentos'
const ARTICLE_ID = 'contractor-leads-appointments'

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
  { id: 'a-etapa', label: 'A Etapa Que Ninguém Mede', level: 2 as const },
  { id: 'dois-numeros', label: 'Primeiro Separe em Dois Números', level: 2 as const },
  { id: 'sete-motivos', label: 'Os Sete Motivos, numa Tabela', level: 2 as const },
  { id: 'nao-era-pessoa', label: 'Motivo Um: Nunca Foi uma Pessoa', level: 2 as const },
  { id: 'nunca-falou', label: 'Motivo Dois: Você Nunca Falou com Ela', level: 2 as const },
  { id: 'outro-atendeu', label: 'Motivo Três: Outro Atendeu Primeiro', level: 2 as const },
  { id: 'pedido-grande', label: 'Motivo Quatro: O Pedido Era Grande Demais', level: 2 as const },
  { id: 'sem-caminho', label: 'Motivo Cinco: Não Havia Como Agendar', level: 2 as const },
  { id: 'ligacao-sem-rastreio', label: 'Motivo Seis: A Ligação Entrou sem Rastreio', level: 2 as const },
  { id: 'nada-registrado', label: 'Motivo Sete: Nada Foi Registrado', level: 2 as const },
  { id: 'medir', label: 'Como Medir a Etapa de Verdade', level: 2 as const },
  { id: 'devolver', label: 'Dizer ao Google Que o Agendamento Aconteceu', level: 2 as const },
  { id: 'diagnostico', label: 'Diagnosticar o Próprio Funil numa Tarde', level: 2 as const },
  { id: 'ordem-do-conserto', label: 'O Conserto, na Ordem', level: 2 as const },
  { id: 'faq', label: 'Perguntas Frequentes', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Início', href: '/br' },
  { label: 'Blog', href: '/br/blog' },
  { label: 'Por Que Leads de Contractors Não Viram Agendamentos' },
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
                href="/blog/why-contractor-leads-dont-turn-into-appointments"
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
                  O contractor fecha o mês e vê quarenta leads e nove orçamentos agendados. A plataforma de anúncio reporta quarenta conversões e parece saudável. A agenda de visita está vazia. Em algum lugar entre esses dois relatórios, trinta e um homeowners que levantaram a mão deixaram de existir, e ninguém sabe dizer para onde eles foram.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Esse buraco é uma etapa, não um acidente. Ele tem taxa de conversão própria, modos de falha próprios e consertos próprios, e é a parte menos instrumentada do marketing da maioria dos contractors. O investimento sobe, a contagem de lead sobe, o orçamento agendado não se move, e a conclusão tirada quase sempre é a errada: que o lead era ruim.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Às vezes era mesmo. Muitas vezes ele estava bom e a passagem de bastão estava quebrada. Este artigo separa os dois casos, percorre os sete pontos onde o lead morre antes de virar agendamento, e termina com um diagnóstico que você pode rodar nos seus próprios números esta semana. Para ver onde isso se encaixa no quadro maior, veja o{' '}
                  <Link href="/br/marketing-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">guia completo de marketing para general contractors</Link>.
                </p>
              </section>

              {/* A etapa */}
              <section id="a-etapa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Etapa Que Ninguém Mede</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quase todo contractor diz de cabeça dois números: quanto gastou e quantos leads entraram. Muitos sabem quantos projetos assinaram. Pouquíssimos sabem quantos daqueles leads chegaram a virar visita agendada, o que é estranho, porque essa etapa fica exatamente entre os dois números que todo mundo acompanha e explica a maior parte da diferença entre eles.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Ela passa sem medição porque não mora num sistema só. O lead chega na plataforma de anúncio. A conversa acontece num telefone. O agendamento vai para uma agenda. O resultado, se alguém registra, vai para um CRM. Nenhuma ferramenta é dona da etapa, então nenhum relatório mostra ela, então ela nunca é o número que alguém precisa defender.
                </p>
                <CalloutBox type="info" label="O sintoma">
                  Se volume de lead e receita assinada já andaram em direções opostas no seu negócio, a causa quase sempre está dentro dessa etapa. Lead subindo com orçamento agendado parado não é mistério. É uma taxa de conversão sem medição caindo.
                </CalloutBox>
              </section>

              {/* Dois números */}
              <section id="dois-numeros" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Primeiro Separe em Dois Números</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Antes de diagnosticar qualquer coisa, parta a etapa em duas. Lead para agendamento como taxa única diz que algo está errado e nada sobre o quê. Dois números dizem qual metade do negócio olhar:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Taxa de contato:</strong> dos leads que chegaram, com quantos você realmente falou, por voz ou por mensagem</li>
                  <li><strong className="text-[#0A0A0A]">Taxa de agendamento:</strong> dos leads com quem você falou, quantos aceitaram marcar uma data para o orçamento</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A combinação aponta direto para o problema:
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">O que você vê</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Onde o problema está de fato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Contato baixo, agendamento saudável', 'Operação: velocidade, canais, número de tentativas, ou lead que nunca foi real'],
                        ['Contato saudável, agendamento baixo', 'Qualificação antes, ou a conversa em si'],
                        ['Os dois baixos', 'Comece pela taxa de contato: agendamento medido em amostra minúscula é ruído'],
                        ['Os dois saudáveis e sem receita', 'O problema está depois, de orçamento para contrato assinado, não aqui'],
                      ].map(([seen, cause]) => (
                        <tr key={seen} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{seen}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{cause}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Reportar os dois como um número só é assim que uma empresa passa seis meses mexendo em qualidade de lead quando o problema real era que ninguém retornava ligação no sábado.
                </p>
              </section>

              {/* Sete motivos */}
              <section id="sete-motivos" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Os Sete Motivos, numa Tabela</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quase todo lead que não vira agendamento falha por um de sete motivos. Cada um tem um sinal diferente, e cada um tem um conserto diferente.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Motivo</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Como identificar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Nunca foi uma pessoa', 'Telefone que não completa, e-mail que volta, nome que não corresponde a nada'],
                        ['Você nunca falou com ela', 'Uma tentativa registrada, sem resposta, lead encerrado na cabeça de alguém'],
                        ['Outro atendeu primeiro', 'O homeowner diz que já contratou, horas ou um dia depois do contato'],
                        ['O pedido era grande demais', 'Conversa agradável, nenhuma data, promessa de pensar'],
                        ['Não havia como agendar', 'Lead entra fora do horário e a única opção oferecida é retorno de ligação'],
                        ['A ligação entrou sem rastreio', 'Existem agendamentos a que nenhuma origem pode ser atribuída'],
                        ['Nada foi registrado', 'Lead sem nenhuma atividade por semanas, ninguém sabe de quem é'],
                      ].map(([reason, tell]) => (
                        <tr key={reason} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{reason}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{tell}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Motivo um */}
              <section id="nao-era-pessoa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Um: Nunca Foi uma Pessoa</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Uma parte do que chega como lead não pode virar agendamento porque não existe ninguém do outro lado. O Google descreve lead inválido como envio falso ou de baixa qualidade feito por pessoas ou bots, incluindo quem preenche dados incorretos, como e-mail ou telefone falso.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A parte importante da própria orientação do Google é o limite que ele admite. O Google afirma que os filtros dele não evitam lead inválido sozinhos, porque a maior parte das checagens de tráfego acontece depois que o anúncio é exibido. Proteção contra ser cobrado por tráfego inválido não é a mesma coisa que nunca receber lead lixo, e é por isso que o Google chama qualidade de lead de responsabilidade compartilhada.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  As recomendações publicadas pelo Google para o lado do anunciante são concretas:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Colocar reCAPTCHA nos formulários do site</li>
                  <li>Usar duplo opt-in, confirmando por um link em e-mail antes de tratar o lead como válido</li>
                  <li>Validar no servidor, checando se o domínio de e-mail e o formato de telefone são reais</li>
                  <li>Usar metas de conversão específicas de geração de lead, não metas genéricas</li>
                  <li>Implementar a tag do Google e as conversões aprimoradas, para que o dado devolvido seja primário</li>
                </ul>
                <CalloutBox type="warning" label="Atenção">
                  Lead inválido não só gasta tempo. Devolvido à plataforma de anúncio como conversão, ele ensina o lance automático a buscar mais do mesmo. Lead lixo contado como vitória é pior que lead lixo contado corretamente.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Qualificação como um todo é assunto maior, tratado em{' '}
                  <Link href="/br/blog/como-gerar-leads-qualificados-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como gerar leads qualificados para contractors</Link>. Nesta etapa a pergunta é mais estreita: que percentual dos seus leads não agendados nunca foi contatável? Enquanto você não souber isso, toda outra taxa é calculada sobre um denominador em que você não confia.
                </p>
              </section>

              {/* Motivo dois */}
              <section id="nunca-falou" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Dois: Você Nunca Falou com Ela</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Esse é o maior vazamento isolado da maioria dos funis de contractor, e quase nunca é registrado pelo que é. O lead entra, alguém liga uma vez, chama e não atende, nenhum recado é deixado, e o lead silenciosamente vira lead ruim na memória de todos. Nada naquele homeowner mudou. A empresa simplesmente nunca falou com ele.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Três mecânicas decidem a frequência disso:
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Tentativas, não uma tentativa</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Uma ligação não é uma tentativa de falar com alguém, é um cara ou coroa. Quem preencheu formulário às nove da noite não está te evitando às dez da manhã seguinte, está trabalhando. Quantas tentativas, com que espaçamento e por quais canais é a disciplina de follow-up, tratada em{' '}
                  <Link href="/br/blog/como-fazer-follow-up-com-leads-de-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">como fazer follow-up com leads de contractors</Link>.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Número desconhecido é fácil de ignorar</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Ligação de um número que ninguém reconhece disputa atenção com todas as outras ligações desconhecidas que a pessoa recebe na semana, e a maioria delas não vale atender. Uma mensagem de texto enviada em menos de um minuto depois do formulário, dizendo o nome da empresa e o projeto que a pessoa pediu, transforma número desconhecido em número esperado. A ligação que vem depois é outra ligação.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Lead não chega em horário comercial</h3>
                <p className="text-[#667085] leading-relaxed">
                  Homeowner pesquisa reforma à noite e no fim de semana, que é exatamente quando não tem ninguém no escritório. Lead que espera até segunda de manhã passou dois dias sendo contatado por quem atendeu. Ou a cobertura se estende para quando o lead de fato chega, ou a primeira resposta tem que ser automática e a humana vem depois.
                </p>
              </section>

              {/* Motivo três */}
              <section id="outro-atendeu" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Três: Outro Atendeu Primeiro</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Homeowner planejando uma reforma de cozinha raramente procura um contractor só. Ele procura três ou quatro na mesma sentada, o que quer dizer que sua concorrência por aquele agendamento não é um discurso melhor, é um telefone mais rápido.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Isso muda como entender velocidade. Responder rápido não antecipa a conversa, decide se ela acontece. Quando o contractor retorna a ligação na tarde seguinte, muitas vezes a pessoa já marcou dois orçamentos e não tem motivo para marcar um terceiro.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Existe também um argumento de medição que não tem nada a ver com o homeowner. A orientação do Google para geração de lead recomenda escolher uma ação de conversão que aconteça dentro de 7 dias da interação com o anúncio, para otimização em tempo útil. Se o agendamento é o que você reporta como conversão, então um agendamento marcado três semanas depois do clique é um sinal mais fraco para o sistema de lance do que o mesmo agendamento marcado em dois dias. Follow-up lento estraga o dado, além do negócio.
                </p>
                <CalloutBox type="tip" label="O conserto mais barato deste artigo">
                  Uma mensagem automática de texto ou e-mail confirmando o contato, enviada em menos de um minuto, custa quase nada e faz dois serviços de uma vez. Diz ao homeowner que ele está na fila e não ignorado, e faz sua ligação de retorno ser esperada em vez de desconhecida.
                </CalloutBox>

                <InlineCTA
                  headline="Você Sabe Sua Taxa de Lead para Agendamento?"
                  body="Mapeamos onde seus leads param entre o formulário e a agenda, e mostramos qual dos sete vazamentos está custando orçamento de verdade."
                  buttonLabel="Solicitar Revisão Gratuita do Funil"
                  locale="pt-BR"
                />
              </section>

              {/* Motivo quatro */}
              <section id="pedido-grande" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Quatro: O Pedido Era Grande Demais</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Alguns leads são alcançados, qualificam, têm uma conversa agradável e ainda assim não agendam. A causa mais comum é que o único próximo passo oferecido era maior do que a pessoa estava pronta para aceitar.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Visita técnica é compromisso de verdade. Significa um estranho dentro de casa, um bloco de tempo reservado e, na cabeça do homeowner, o começo de ser vendido. Pedir isso no fim de uma primeira conversa funciona quando a pessoa está pronta e falha em silêncio quando não está, porque a resposta educada nunca é não, é que vai pensar.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Oferecer um passo intermediário menor converte uma parte relevante dessas conversas:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Uma conversa rápida por vídeo ou telefone sobre o projeto, antes de marcar qualquer visita</li>
                  <li>Uma faixa aproximada para trabalho parecido, enviada por escrito, com a visita como o passo que torna isso exato</li>
                  <li>Um horário específico oferecido em vez de uma pergunta aberta, porque escolher entre terça de manhã e quinta de tarde é mais fácil que escolher do nada</li>
                  <li>Uma descrição clara do que a visita envolve e quanto tempo leva, que remove a maior parte do motivo para hesitar</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  O último ponto é o mais pulado. Homeowner recusando agendamento muitas vezes está recusando um desconhecido, não recusando a sua empresa.
                </p>
              </section>

              {/* Motivo cinco */}
              <section id="sem-caminho" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Cinco: Não Havia Como Agendar</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Homeowner pronto para marcar às dez da noite, que encontra um número de telefone como única opção, é agendamento perdido esperando acontecer. A intenção existia e o mecanismo não.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Dois canais importam aqui, além do site. O Perfil da Empresa no Google hoje permite adicionar uma opção de WhatsApp ou de mensagem de texto às informações de contato, para o cliente falar com a empresa por mensagem direto do perfil. O Google registra que isso exige um Perfil da Empresa reivindicado e verificado, e que as opções de conversa estão disponíveis apenas em algumas regiões, então vale conferir em vez de supor.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Também vale saber o que deixou de existir, porque conselho vencido sobre isso está em todo lugar. O Google descontinuou os antigos recursos de chat e histórico de chamadas do Perfil da Empresa em 31 de julho de 2024, e afirma que esses recursos não estão mais disponíveis no perfil. Todo manual que ainda manda o contractor gerenciar lead pelo histórico de chat do Perfil da Empresa está descrevendo uma ferramenta que foi desligada.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  No site, o caminho de agendamento fica no topo de cada página de serviço, não só numa página de contato. O que um site de contractor precisa carregar está em{' '}
                  <Link href="/br/blog/o-que-todo-site-de-general-contractor-deve-ter" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">o que todo site de general contractor deve ter</Link>.
                </p>
              </section>

              {/* Motivo seis */}
              <section id="ligacao-sem-rastreio" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Seis: A Ligação Entrou sem Rastreio</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Para a maioria dos contractors o telefone é o funil, e ele costuma ser a parte menos instrumentada do negócio. Quando a ligação não é rastreada, duas coisas quebram juntas: você não sabe quais canais produzem as conversas que agendam, e não tem como dizer à plataforma de anúncio quais ligações valeram.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google Ads oferece dois jeitos de contar ligação como conversão. O conhecido é por duração: você define uma duração mínima em segundos, e toda ligação que dura pelo menos aquilo conta, o que filtra as ligações curtas que nunca iam conter agendamento. Isso exige o relatório de chamadas ativo, para que os números de encaminhamento do Google sejam usados.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O mais novo são as conversões de ligação qualificadas por IA, que leem o conteúdo da ligação em vez do tamanho dela. O Google afirma que, com a gravação de chamadas ativada, todas as ligações são gravadas e avaliadas por IA, e só as qualificadas contam como conversão, usando a duração como sinal alternativo quando a gravação não está disponível. Segundo o Google, a IA procura sinais de intenção como o cliente perguntando por serviços específicos, agendando uma consulta ou demonstrando disposição de comprar.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Duas restrições valem nota antes de planejar em cima disso. O Google afirma que a gravação de chamadas hoje só está disponível quando o número que liga e o que recebe estão nos Estados Unidos ou no Canadá, e que a gravação fica desativada por padrão para negócios de saúde e de serviços financeiros, que podem ativar manualmente.
                </p>
                <CalloutBox type="info" label="Por que isso pesa mais que antes">
                  O Google lista agendar uma consulta como um dos sinais de intenção que a IA procura. A plataforma está convergindo para visita agendada como a coisa que vale otimizar. O contractor que ainda reporta todo formulário preenchido como conversão de igual valor está alimentando esse sistema com o alvo errado.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Duração e nota de IA são as duas aproximações. A versão mais forte continua sendo registrar o resultado real de cada ligação no CRM e reportar os agendamentos de lá, que é o assunto da próxima seção.
                </p>
              </section>

              {/* Motivo sete */}
              <section id="nada-registrado" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Motivo Sete: Nada Foi Registrado</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O último motivo é o mais banal e o mais caro. O lead é alcançado, a conversa vai bem, o homeowner pede para ligar depois do feriado, e ninguém anota. Três semanas depois ninguém lembra, ninguém é dono daquilo, e o lead nunca foi marcado como perdido porque nunca foi marcado como nada.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Essa falha tem assinatura própria, e é fácil de procurar. Ordene seu pipeline pela data em que cada registro mudou de etapa, não pela data de criação. Um grupo de leads abertos sem nenhuma atividade registrada por semanas não é problema de qualidade de lead nem problema de marketing. É trabalho que foi pago e deixado na prateleira.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A estrutura mínima que evita isso é pequena:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Todo lead tem um responsável com nome, não uma caixa compartilhada</li>
                  <li>Todo lead tem uma etapa, incluindo uma explícita para contato tentado e não alcançado</li>
                  <li>Toda tentativa de contato é registrada com data e canal, inclusive as que falharam</li>
                  <li>Todo lead encerrado tem um motivo, escolhido de uma lista curta e fixa em vez de digitado livremente</li>
                  <li>Todo lead carrega sua origem, para a etapa poder ser medida por canal</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  A lista de motivo de perda é a peça que o contractor pula e a que paga. Sem ela, todo lead não agendado é arquivado na memória como lead ruim, que é a suposição mais cara deste artigo. Com ela, o padrão aparece: fora da área, fora do orçamento, nunca atendeu, fechou com outro, ainda não é hora. Essas cinco categorias levam a cinco decisões completamente diferentes.
                </p>
              </section>

              {/* Medir */}
              <section id="medir" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Como Medir a Etapa de Verdade</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quatro números, acompanhados por origem, bastam para conduzir bem essa etapa:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Taxa de contato:</strong> leads com quem você falou, divididos pelos leads recebidos</li>
                  <li><strong className="text-[#0A0A0A]">Taxa de agendamento:</strong> agendamentos feitos, divididos pelos leads com quem você falou</li>
                  <li><strong className="text-[#0A0A0A]">Tempo até o primeiro contato:</strong> a mediana, em minutos, dentro do horário de trabalho</li>
                  <li><strong className="text-[#0A0A0A]">Custo por agendamento:</strong> investimento dividido pelos agendamentos, que é o número que liga esta etapa ao orçamento</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  É no custo por agendamento que o argumento contra julgar canal por custo por lead fica visível. Pegue dois canais com o mesmo investimento:
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
                        ['Investimento', 'US$ 3.000', 'US$ 3.000'],
                        ['Leads', '60', '30'],
                        ['Custo por lead', 'US$ 50', 'US$ 100'],
                        ['Taxa de contato', '40%', '80%'],
                        ['Leads com quem falou', '24', '24'],
                        ['Taxa de agendamento', '25%', '50%'],
                        ['Agendamentos feitos', '6', '12'],
                        ['Custo por agendamento', 'US$ 500', 'US$ 250'],
                      ].map(([metric, a, b]) => (
                        <tr key={metric} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metric}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{a}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  O Canal B custa o dobro por lead, produz metade dos leads e agenda o dobro de orçamentos pelo mesmo dinheiro. Esta é uma ilustração hipotética escolhida para deixar a conta visível, não um benchmark de mercado. Num relatório de custo por lead, o Canal B é a linha que é cortada.
                </p>
                <p className="text-[#667085] leading-relaxed mt-4">
                  A mesma lógica uma etapa antes é o argumento para{' '}
                  <Link href="/br/blog/bom-custo-por-lead-para-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">julgar custo por lead contra o que um lead realmente vale</Link>, e uma etapa depois ela vira{' '}
                  <Link href="/br/blog/como-calcular-o-roi-de-marketing-para-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">ROI de marketing de verdade</Link>.
                </p>
              </section>

              {/* Devolver */}
              <section id="devolver" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Dizer ao Google Que o Agendamento Aconteceu</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Medir a etapa para os seus relatórios é metade do valor. A outra metade é devolver o resultado, porque o lance automático otimiza para o que você reporta como conversão. Reporte formulário preenchido e você recebe formulário preenchido. Reporte agendamento feito e o sistema começa a caçar quem agenda.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  O Google recomenda usar metas de conversão específicas de geração de lead, como lead qualificado, lead convertido, agendamento ou pedido de orçamento, e registra que essas metas ativam automaticamente proteções contra tráfego inválido feitas especificamente para campanhas de geração de lead. Escolher a meta, portanto, não é só colocar um rótulo.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Duas dessas metas têm significado específico que vale acertar. O Google substituiu a antiga meta de leads importados por lead qualificado e lead convertido, e define assim:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Lead qualificado:</strong> lead gerado pelo Google que foi qualificado fora do Google Ads, no seu CRM ou sistema interno de geração de lead</li>
                  <li><strong className="text-[#0A0A0A]">Lead convertido:</strong> lead gerado pelo Google que completou uma etapa escolhida do seu processo de conversão, normalmente fora da plataforma</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Para contractor, a visita agendada normalmente é a etapa certa para definir como resultado reportado. Ela acontece perto o suficiente do clique para ser sinal útil de otimização, é inequívoca, e, diferente de contrato assinado, não depende de um ciclo comercial de semanas. As conversões aprimoradas para leads são o mecanismo que devolve isso, com dado primário com hash saindo do CRM.
                </p>
                <CalloutBox type="tip" label="O pré-requisito que ninguém cita">
                  Nada disso funciona se a origem do lead não chegar ao CRM e o CRM não registrar no que o lead virou. Essa corrente é encanamento sem glamour, e é a diferença entre um sistema de lance que aprende do seu resultado comercial e um que adivinha.
                </CalloutBox>
              </section>

              {/* Diagnóstico */}
              <section id="diagnostico" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Diagnosticar o Próprio Funil numa Tarde</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Isso não exige software novo. Pegue os últimos 60 leads, jogue numa planilha e preencha cinco colunas: origem, data e hora de chegada, data e hora da primeira tentativa de contato, se você chegou a falar com a pessoa, e se o agendamento foi feito.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  As respostas aparecem na hora:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li>Conte os leads sem nenhuma tentativa de contato registrada. Esse número costuma ser o primeiro susto.</li>
                  <li>Calcule a mediana entre chegada e primeira tentativa, e olhe separado para noites e fins de semana.</li>
                  <li>Separe taxa de contato e taxa de agendamento, e leia as duas contra a tabela do começo deste artigo.</li>
                  <li>Conte quantos nunca completaram contato, o que aproxima sua fatia de lead inválido e inalcançável.</li>
                  <li>Quebre tudo por origem, porque quase sempre um canal está puxando a média para baixo.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  Sessenta leads não é amostra estatisticamente robusta e não precisa ser. Se vinte deles estão sem nenhuma tentativa de contato registrada, você não precisa de intervalo de confiança para saber o que consertar na segunda.
                </p>
              </section>

              {/* Ordem do conserto */}
              <section id="ordem-do-conserto" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">O Conserto, na Ordem</h2>
                <CalloutBox type="tip" label="Resumo">
                  Meça taxa de contato e taxa de agendamento separadas, responda mais rápido que a concorrência, deixe o próximo passo pequeno o bastante para a pessoa aceitar, registre toda tentativa e todo motivo de perda, e devolva o agendamento à plataforma de anúncio para ela otimizar por agenda em vez de formulário.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Instrumente a etapa: taxa de contato, taxa de agendamento, tempo até o primeiro contato e custo por agendamento, tudo por origem.</li>
                  <li>Envie uma confirmação automática em menos de um minuto para todo contato, por mensagem onde houver consentimento.</li>
                  <li>Defina uma meta de primeiro contato humano em minutos, e cubra as noites e os fins de semana em que o lead de fato chega.</li>
                  <li>Estabeleça um número mínimo de tentativas de contato, em pelo menos dois canais, antes de um lead poder ser encerrado.</li>
                  <li>Dê a quem atende o telefone acesso à agenda de orçamento e autoridade para comprometer um horário.</li>
                  <li>Ofereça um passo intermediário menor para quem ainda não está pronto para aceitar a visita.</li>
                  <li>Publique o caminho de agendamento em cada página de serviço, e adicione opção de mensagem ao Perfil da Empresa no Google onde estiver disponível.</li>
                  <li>Ative o relatório de chamadas, e decida de propósito entre duração mínima e conversões qualificadas por IA.</li>
                  <li>Coloque reCAPTCHA, duplo opt-in e validação no servidor, para menos lead inválido entrar na contagem.</li>
                  <li>Exija responsável, etapa e motivo de perda em todo registro de lead, de uma lista curta e fixa.</li>
                  <li>Reporte o agendamento como a conversão, usando meta específica de lead e conversões aprimoradas para leads.</li>
                  <li>Rode a auditoria dos 60 leads de novo um mês depois e compare, porque essa etapa volta a escorregar sem atenção.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Feito nessa ordem, o resultado usual é o volume de lead ficar exatamente onde estava e o orçamento agendado subir. É esse o ponto: essa etapa quase nunca se conserta comprando mais lead, e muitas vezes piora com isso. Para decidir quanto colocar atrás do sistema depois que a etapa segura, veja{' '}
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
                headline="Pare de Perder Lead Entre o Formulário e a Agenda"
                body="Auditamos sua etapa de lead para agendamento, mostramos qual dos sete vazamentos está custando mais orçamento e dizemos o que mudar primeiro."
                buttonLabel="Agendar Revisão Gratuita do Funil"
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
