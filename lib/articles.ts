// ─────────────────────────────────────────────────────────────────────────────
// lib/articles.ts
//
// Multilingual article data model.
//
// HOW TO ADD A BILINGUAL ARTICLE
// ──────────────────────────────
// 1. Create a new entry in `articles` with a unique `id`.
// 2. Add the "en-US" translation with its slug, path, title, meta, content, etc.
// 3. Add the "pt-BR" translation with the Portuguese slug, localized path, etc.
// 4. Set `status: 'published'` when both translations are ready to index.
// 5. Both versions will automatically appear in:
//    - Their respective blog hubs (/blog and /br/blog)
//    - The sitemap
//    - The hreflang alternate links
//    - The language switcher on each article page
// ─────────────────────────────────────────────────────────────────────────────

export type ArticleStatus = 'published' | 'draft' | 'coming-soon'
export type SupportedLocale = 'en-US' | 'pt-BR'

export const SITE_URL = 'https://www.mktforcontractors.com'

// CTA destinations per locale
export const CTA_URL = 'https://calendly.com/contact-mktforcontractors/90min'
export const CTA_URL_PT = 'https://wa.me/5531995745199?text=Ol%C3%A1%21+Tenho+interesse+em+saber+mais+sobre+suas+solu%C3%A7%C3%B5es+de+marketing+para+contractors.'

export function getCtaUrl(locale: SupportedLocale): string {
  return locale === 'pt-BR' ? CTA_URL_PT : CTA_URL
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string
  answer: string
}

export interface LocalizedArticle {
  locale: SupportedLocale
  slug: string
  /** Full path from root, e.g. "/blog/google-ads-for-general-contractors" */
  path: string
  title: string
  seoTitle: string
  metaDescription: string
  excerpt: string
  category: string
  primaryKeyword: string
  secondaryKeywords: string[]
  featuredImageAlt: string
  featuredImage?: string
  publishedDate: string
  updatedDate: string
  readingTime: number
  canonicalUrl: string
  faq?: FAQItem[]
}

export interface Article {
  id: string
  status: ArticleStatus
  featuredImage: string
  relatedArticleIds: string[]
  translations: Partial<Record<SupportedLocale, LocalizedArticle>>
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns all published articles that have a translation for the given locale. */
export function getPublishedArticles(locale: SupportedLocale = 'en-US'): LocalizedArticle[] {
  return articles
    .filter((a) => a.status === 'published' && a.translations[locale])
    .map((a) => ({ ...a.translations[locale]!, featuredImage: a.featuredImage }))
}

/** Find a localized article by slug for a given locale. Returns undefined if not found or not published. */
export function getArticleBySlug(locale: SupportedLocale, slug: string): LocalizedArticle | undefined {
  const article = articles.find(
    (a) => a.status === 'published' && a.translations[locale]?.slug === slug
  )
  return article?.translations[locale]
    ? { ...article.translations[locale]!, featuredImage: article.featuredImage }
    : undefined
}

/** Returns both locale paths for a given article id (for hreflang + language switcher). */
export function getAlternateLanguages(articleId: string): Partial<Record<SupportedLocale, string>> {
  const article = articles.find((a) => a.id === articleId)
  if (!article || article.status !== 'published') return {}
  const result: Partial<Record<SupportedLocale, string>> = {}
  for (const locale of ['en-US', 'pt-BR'] as SupportedLocale[]) {
    if (article.translations[locale]) {
      result[locale] = `${SITE_URL}${article.translations[locale]!.path}`
    }
  }
  return result
}

/** Returns the article id whose translation matches the given path (any locale). */
export function getArticleIdByPath(path: string): string | undefined {
  return articles.find((a) =>
    Object.values(a.translations).some((t) => t?.path === path)
  )?.id
}

/** Returns related localized article cards for a given article id and locale. */
export function getRelatedArticles(articleId: string, locale: SupportedLocale): RelatedArticleCard[] {
  const article = articles.find((a) => a.id === articleId)
  if (!article) return []
  return article.relatedArticleIds
    .map((rid) => getRelatedArticleCard(rid, locale))
    .filter(Boolean) as RelatedArticleCard[]
}

// Legacy compat — used by sitemap and old EN blog hub
export function getArticleBySlugEN(slug: string): LocalizedArticle | undefined {
  return getArticleBySlug('en-US', slug)
}

// ─── Related article cards (standalone cards for coming-soon + published) ────

export interface RelatedArticleCard {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: number
  status: ArticleStatus
  href: string | null
  featuredImage?: string
}

function getRelatedArticleCard(id: string, locale: SupportedLocale): RelatedArticleCard | null {
  // Check full articles registry first
  const article = articles.find((a) => a.id === id)
  if (article) {
    const t = article.translations[locale]
    if (t) {
      return {
        id,
        slug: t.slug,
        title: t.title,
        excerpt: t.excerpt,
        category: t.category,
        readingTime: t.readingTime,
        status: article.status,
        href: article.status === 'published' ? t.path : null,
        featuredImage: article.featuredImage,
      }
    }
    // No translation for this locale — still show as coming-soon card using EN fallback
    const enFallback = article.translations['en-US']
    if (enFallback) {
      return {
        id,
        slug: enFallback.slug,
        title: enFallback.title,
        excerpt: enFallback.excerpt,
        category: enFallback.category,
        readingTime: enFallback.readingTime,
        status: 'coming-soon',
        href: null,
      }
    }
  }
  // Fallback to standalone coming-soon cards
  const standalone = standaloneRelatedCards[locale]?.[id]
  if (standalone) return { id, ...standalone, href: null }
  return null
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: Record<SupportedLocale, string[]> = {
  'en-US': [
    'All',
    'Google Ads',
    'Local SEO',
    'Lead Generation',
    'Website Optimization',
    'CRM and Follow-Up',
    'Marketing Analytics',
    'Contractor Growth',
  ],
  'pt-BR': [
    'Todos',
    'Google Ads',
    'SEO Local',
    'Geração de Leads',
    'Otimização de Sites',
    'CRM e Follow-Up',
    'Métricas de Marketing',
    'Crescimento para Contractors',
  ],
}

// ─── Standalone coming-soon cards (for related articles not yet in articles[]) ─

const standaloneRelatedCards: Partial<Record<SupportedLocale, Record<string, Omit<RelatedArticleCard, 'id' | 'href'>>>> = {
  'en-US': {
    'contractor-marketing-roi': {
      slug: 'contractor-marketing-roi',
      title: 'How to Calculate Contractor Marketing ROI',
      excerpt: 'Step-by-step framework for calculating the real return on your marketing investment — from ad spend to signed revenue.',
      category: 'Marketing Analytics',
      readingTime: 8,
      status: 'coming-soon',
    },
    'local-seo-general-contractors': {
      slug: 'local-seo-general-contractors',
      title: 'Local SEO for General Contractors',
      excerpt: 'How to rank your construction company in Google Maps and local search results to generate organic leads in your service area.',
      category: 'Local SEO',
      readingTime: 11,
      status: 'coming-soon',
    },
  },
  'pt-BR': {
    'contractor-marketing-roi': {
      slug: 'como-calcular-o-roi-de-marketing-para-contractors',
      title: 'Como Calcular o ROI de Marketing para Contractors',
      excerpt: 'Framework passo a passo para calcular o retorno real do seu investimento em marketing — do gasto com anúncios à receita assinada.',
      category: 'Métricas de Marketing',
      readingTime: 8,
      status: 'coming-soon',
    },
    'local-seo-general-contractors': {
      slug: 'seo-local-para-general-contractors',
      title: 'SEO Local para General Contractors',
      excerpt: 'Como posicionar sua empresa de construção no Google Maps e nos resultados de busca local para gerar leads orgânicos na sua área de atuação.',
      category: 'SEO Local',
      readingTime: 11,
      status: 'coming-soon',
    },
  },
}

// ─── Article registry ─────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    id: 'follow-up-contractor-leads',
    status: 'published',
    featuredImage: '/images/blog/contractor-lead-follow-up-workflow.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-for-general-contractors',
      'good-cost-per-lead-for-general-contractors',
      'best-google-ads-keywords-for-general-contractors',
      'google-ads-vs-local-services-ads',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'how-to-follow-up-with-contractor-leads',
        path: '/blog/how-to-follow-up-with-contractor-leads',
        title: 'How to Follow Up With Contractor Leads and Win More Projects',
        seoTitle: 'How to Follow Up With Contractor Leads and Win More Projects',
        metaDescription: 'Learn how general contractors can follow up with new leads using calls, SMS, email, CRM workflows, reminders, and sales processes that convert more estimates into projects.',
        excerpt: 'A practical lead follow-up system for contractors — timing, channels, scripts, CRM workflows, and qualification processes designed to turn more inquiries into appointments, estimates, and signed projects.',
        category: 'CRM and Follow-Up',
        primaryKeyword: 'contractor lead follow-up',
        secondaryKeywords: [
          'How to follow up with contractor leads',
          'Contractor lead follow-up system',
          'General contractor lead follow-up',
          'Contractor sales follow-up',
          'Construction lead follow-up',
          'Contractor CRM follow-up',
          'Contractor SMS follow-up',
          'Contractor email follow-up',
          'How to convert contractor leads',
          'How to book more contractor estimates',
          'Construction sales process',
          'Contractor lead management',
        ],
        featuredImageAlt: 'Contractor lead follow-up workflow using calls SMS email and CRM',
        publishedDate: '2025-08-13',
        updatedDate: '2025-08-13',
        readingTime: 19,
        canonicalUrl: `${SITE_URL}/blog/how-to-follow-up-with-contractor-leads`,
        faq: [
          {
            question: 'How quickly should contractors follow up with new leads?',
            answer: 'High-intent inquiries generally benefit from a prompt acknowledgment, followed by human contact as soon as practical. An automated confirmation (SMS, email, or booking confirmation) can set expectations immediately, but it should not replace a human call, text, or email. There is no single universal number of minutes that applies to every contractor or lead source — the right pace depends on the lead source, the project type, and the team\'s actual sales capacity.',
          },
          {
            question: 'How many times should contractors follow up with a lead?',
            answer: 'There is no fixed number of attempts that guarantees a sale. A reasonable approach is to make several contact attempts across different channels (phone, SMS, email) over the days following the inquiry, varying the message rather than repeating the same one. After multiple unsuccessful attempts, move the lead to a nurture or "unable to contact" stage instead of deleting it — the opportunity may still be worth revisiting later.',
          },
          {
            question: 'Should contractors call or text new leads?',
            answer: 'Both channels play a role. Phone calls provide the most context for qualification and sales conversations, while SMS is convenient for quick confirmations and reminders when the lead has agreed to that channel. Email works well for details, documentation, and estimates. An effective follow-up system typically uses more than one channel rather than relying on a single one.',
          },
          {
            question: 'What should contractors say in the first follow-up?',
            answer: 'A practical first-call approach introduces you and your company, references the specific request, confirms the project type and location, asks about the desired outcome and timeline, and explains the next step. For example: "Hi Sarah, this is Mike from ABC Remodeling. You reached out about a kitchen renovation in Newton. I wanted to learn a little more about the project and see if we\'re a good fit." This is a framework to adapt, not a rigid script.',
          },
          {
            question: 'How should contractors follow up after sending an estimate?',
            answer: 'Every estimate should have a defined next follow-up date rather than being sent into an indefinite wait. A practical approach is to confirm receipt shortly after sending, then follow up to discuss questions, scope, materials, timeline, or budget concerns, and finally to determine whether the opportunity should stay active, move to a later date, or close. Framing the conversation around helping the prospect decide — rather than simply asking "did you decide yet?" — tends to be more productive.',
          },
          {
            question: 'When should contractors stop following up?',
            answer: 'Stop when the lead has explicitly opted out, when reasonable contact attempts across multiple channels have gone unanswered, or when the prospect has clearly chosen another contractor or path. At that point, move the opportunity to a long-term nurture stage rather than continuing frequent outreach. Persistence should increase clarity for the prospect, not pressure.',
          },
          {
            question: 'Do contractors need a CRM?',
            answer: 'A CRM is not strictly required, but it becomes increasingly valuable as lead volume and sales complexity grow. It creates one source of truth for contact information, lead source, notes, calls, appointments, estimate status, and lost reasons. Managing leads only through personal phones, email, spreadsheets, or memory is not automatically wrong, but it becomes harder to manage consistently as the business scales.',
          },
          {
            question: 'Can contractor lead follow-up be automated?',
            answer: 'Some parts of the process are good candidates for automation, including new-lead acknowledgment, lead assignment, appointment reminders, missed-call alerts, and follow-up task reminders. Qualification, scope discussions, sales conversations, and objection handling should generally remain human-led. The goal is to automate the process, not the relationship.',
          },
          {
            question: 'How can contractors re-engage old leads?',
            answer: 'Old leads — postponed projects, unanswered estimates, or seasonal inquiries — can sometimes be reactivated with a project check-in, a seasonal reminder, an availability update, or a relevant example of recent work. Reactivation messages should add real context rather than generic pressure, and anyone who has opted out should not be re-contacted.',
          },
          {
            question: 'How do contractors measure follow-up performance?',
            answer: 'Useful metrics include contact rate, qualification rate, appointment rate, show rate, estimate rate, proposal-to-sale rate, lead-to-sale rate, average response time, and lost-reason distribution. Reviewing these alongside advertising cost per lead helps distinguish whether a shortfall is a marketing problem, a follow-up problem, or a sales problem.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'como-fazer-follow-up-com-leads-de-contractors',
        path: '/br/blog/como-fazer-follow-up-com-leads-de-contractors',
        title: 'Como Fazer Follow-Up com Leads de Contractors e Fechar Mais Projetos',
        seoTitle: 'Como Fazer Follow-Up com Leads de Contractors e Fechar Mais Projetos',
        metaDescription: 'Aprenda como general contractors podem fazer follow-up de leads usando ligações, SMS, email, CRM e automações para gerar mais estimates e contratos.',
        excerpt: 'Um sistema prático de follow-up para contractors usando ligações, SMS, email, CRM, automações e qualificação para transformar mais leads em reuniões, estimates e contratos.',
        category: 'CRM e Follow-Up',
        primaryKeyword: 'follow-up de leads para contractors',
        secondaryKeywords: [
          'Follow-up para general contractors',
          'Como responder leads de construção',
          'Follow-up de leads de Google Ads',
          'CRM para contractors',
          'SMS para leads de contractors',
          'Email follow-up para contractors',
          'Como converter leads em clientes',
          'Leads para empresas de construção',
          'Processo comercial para contractors',
          'Como agendar mais estimates',
        ],
        featuredImageAlt: 'Fluxo de follow-up de leads para general contractors usando telefone SMS email e CRM',
        publishedDate: '2025-08-13',
        updatedDate: '2025-08-13',
        readingTime: 19,
        canonicalUrl: `${SITE_URL}/br/blog/como-fazer-follow-up-com-leads-de-contractors`,
        faq: [
          {
            question: 'Com que rapidez contractors devem fazer follow-up de novos leads?',
            answer: 'Leads de alta intenção geralmente se beneficiam de uma confirmação rápida, seguida de contato humano o mais breve possível. Uma confirmação automática (SMS, email ou confirmação de agendamento) ajuda a alinhar expectativas imediatamente, mas não substitui uma ligação, SMS ou email de uma pessoa. Não existe um número universal de minutos que se aplique a todo contractor ou lead source — o ritmo ideal depende da origem do lead, do tipo de projeto e da capacidade real da equipe de vendas.',
          },
          {
            question: 'Quantas vezes um contractor deve fazer follow-up de um lead?',
            answer: 'Não existe um número fixo de tentativas que garanta uma venda. Uma abordagem razoável é fazer várias tentativas de contato em canais diferentes (ligação, SMS, email) nos dias seguintes ao contato inicial, variando a mensagem em vez de repetir a mesma. Depois de várias tentativas sem sucesso, mova o lead para uma etapa de nurture ou "não foi possível contatar" em vez de excluí-lo — a oportunidade ainda pode valer a pena revisitar depois.',
          },
          {
            question: 'Contractors devem ligar ou enviar SMS para novos leads?',
            answer: 'Os dois canais têm um papel importante. Ligações oferecem mais contexto para qualificação e conversas comerciais, enquanto o SMS é conveniente para confirmações rápidas e reminders quando o lead concordou em usar esse canal. O email funciona bem para detalhes, documentação e estimates. Um sistema de follow-up eficaz normalmente usa mais de um canal em vez de depender de apenas um.',
          },
          {
            question: 'O que contractors devem dizer no primeiro follow-up?',
            answer: 'Uma abordagem prática para a primeira ligação é se apresentar junto com a empresa, mencionar a solicitação específica, confirmar o tipo de projeto e a localização, perguntar sobre o resultado desejado e o timeline, e explicar o próximo passo. Por exemplo: "Hi Sarah, this is Mike from ABC Remodeling. You reached out about a kitchen renovation in Newton. I wanted to learn a little more about the project and see if we\'re a good fit." Isso é um framework para adaptar, não um script rígido.',
          },
          {
            question: 'Como fazer follow-up depois de enviar um estimate?',
            answer: 'Todo estimate deveria ter uma data de follow-up definida, em vez de ser enviado para uma espera indefinida. Uma abordagem prática é confirmar o recebimento pouco depois de enviar, depois fazer follow-up para discutir dúvidas, escopo, materiais, timeline ou preocupações de orçamento, e por fim definir se a oportunidade deve continuar ativa, ser reagendada ou encerrada. Conduzir a conversa ajudando o prospect a decidir — em vez de simplesmente perguntar "você já decidiu?" — costuma ser mais produtivo.',
          },
          {
            question: 'Quando contractors devem parar de fazer follow-up?',
            answer: 'Pare quando o lead pedir explicitamente para não ser mais contatado, quando tentativas razoáveis em múltiplos canais não obtiverem resposta, ou quando o prospect claramente escolher outro contractor ou caminho. Nesse ponto, mova a oportunidade para uma etapa de nurture de longo prazo em vez de continuar com contatos frequentes. A persistência deve aumentar a clareza para o prospect, não a pressão.',
          },
          {
            question: 'Contractors precisam de um CRM?',
            answer: 'Um CRM não é estritamente obrigatório, mas se torna cada vez mais valioso conforme o volume de leads e a complexidade comercial crescem. Ele cria uma única fonte de verdade para informações de contato, origem do lead, notas, ligações, agendamentos, status do estimate e motivos de perda. Gerenciar leads apenas com telefones pessoais, email, planilhas ou memória não é necessariamente errado, mas se torna mais difícil manter de forma consistente conforme o negócio cresce.',
          },
          {
            question: 'O follow-up de leads de contractors pode ser automatizado?',
            answer: 'Algumas partes do processo são boas candidatas à automação, incluindo a confirmação de novo lead, a atribuição do lead, reminders de agendamento, alertas de ligação perdida e reminders de tarefas de follow-up. Qualificação, discussões de escopo, conversas comerciais e tratamento de objeções geralmente devem continuar sendo conduzidos por uma pessoa. O objetivo é automatizar o processo, não o relacionamento.',
          },
          {
            question: 'Como contractors podem reativar leads antigos?',
            answer: 'Leads antigos — projetos adiados, estimates sem resposta ou solicitações sazonais — às vezes podem ser reativados com um check-in sobre o projeto, um reminder sazonal, uma atualização de disponibilidade ou um exemplo relevante de trabalho recente. As mensagens de reativação devem agregar contexto real, em vez de pressão genérica, e quem pediu para não ser mais contatado não deve receber novas mensagens.',
          },
          {
            question: 'Como contractors medem a performance do follow-up?',
            answer: 'Métricas úteis incluem taxa de contato, taxa de qualificação, taxa de agendamento, taxa de comparecimento, taxa de estimates, taxa de proposta-para-venda, taxa de lead-para-venda, tempo médio de resposta e distribuição de motivos de perda. Analisar essas métricas junto com o custo por lead de anúncios ajuda a identificar se uma queda de resultado é um problema de marketing, de follow-up ou de vendas.',
          },
        ],
      },
    },
  },
  {
    id: 'good-cost-per-lead-for-general-contractors',
    status: 'published',
    featuredImage: '/images/blog/cost-per-lead-for-general-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-for-general-contractors',
      'google-ads-vs-local-services-ads',
      'best-google-ads-keywords-for-general-contractors',
      'follow-up-contractor-leads',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'good-cost-per-lead-for-general-contractors',
        path: '/blog/good-cost-per-lead-for-general-contractors',
        title: 'What Is a Good Cost per Lead for General Contractors?',
        seoTitle: 'What Is a Good Cost per Lead for General Contractors?',
        metaDescription: 'Learn how to calculate a profitable cost per lead for general contractors using project value, close rate, margins, lead quality, and customer acquisition cost.',
        excerpt: 'Learn how to calculate what your construction company can profitably pay for a lead based on project value, margins, qualification rates, close rates, and signed revenue.',
        category: 'Marketing Analytics',
        primaryKeyword: 'cost per lead for general contractors',
        secondaryKeywords: [
          'General contractor cost per lead',
          'Contractor lead cost',
          'Google Ads cost per lead for contractors',
          'Remodeling contractor cost per lead',
          'Construction lead generation cost',
          'Contractor customer acquisition cost',
          'Contractor marketing ROI',
          'Cost per qualified lead',
          'Contractor advertising cost',
          'General contractor lead generation',
        ],
        featuredImageAlt: 'Cost per lead calculation for a general contractor marketing campaign',
        publishedDate: '2025-08-03',
        updatedDate: '2025-08-03',
        readingTime: 20,
        canonicalUrl: `${SITE_URL}/blog/good-cost-per-lead-for-general-contractors`,
        faq: [
          {
            question: 'What is a good cost per lead for a general contractor?',
            answer: 'There is no universal answer. A good cost per lead for a general contractor is one that consistently produces qualified opportunities and signed projects at a total acquisition cost below what the business can sustainably afford. That number depends on average project revenue, gross margin, lead-to-sale conversion rate, and the company\'s target customer acquisition cost.',
          },
          {
            question: 'How do contractors calculate cost per lead?',
            answer: 'Cost per lead is calculated by dividing total advertising spend by the number of leads generated during the same period. For example, $5,000 in ad spend divided by 25 leads equals a $200 cost per lead. This calculation alone does not show whether those leads were qualified, reachable, or converted into projects.',
          },
          {
            question: 'What is the difference between CPL and cost per qualified lead?',
            answer: 'Cost per lead measures advertising spend divided by all leads received, including spam, wrong numbers, and out-of-scope inquiries. Cost per qualified lead measures advertising spend divided only by leads that met your qualification criteria. The second metric is more useful for evaluating marketing performance because it excludes inquiries that never had a realistic chance of becoming a project.',
          },
          {
            question: 'Is a lower cost per lead always better?',
            answer: 'No. A lower raw CPL can reflect low-quality traffic, broad targeting, or weak qualification standards. If a campaign generates cheap leads that rarely qualify or close, the real cost per signed project may be very high. The most important metrics are cost per qualified lead, customer acquisition cost, and gross profit per signed project — not raw lead volume or raw CPL.',
          },
          {
            question: 'How much should contractors spend on lead generation?',
            answer: 'A simplified approach is to multiply the number of signed projects needed per month by the target customer acquisition cost. For example, three projects at a $3,000 target CAC suggests an indicative acquisition budget of $9,000. The actual marketing budget may also need to include agency fees, software, call tracking, and other costs. Capacity constraints should also be considered — generating more work than the business can deliver creates its own problems.',
          },
          {
            question: 'Why are my contractor leads expensive?',
            answer: 'High CPL can result from several different root causes. Traffic problems include irrelevant searches, broad match keywords, and poor negative keyword management. Conversion problems include slow page load, weak message match, and unclear calls to action. Qualification problems include campaigns reaching the wrong project types or locations. Sales problems include slow response and inconsistent follow-up. Each root cause requires a different fix — lowering bids alone is usually not the solution.',
          },
          {
            question: 'How does close rate affect cost per lead?',
            answer: 'Close rate directly determines how much you can afford to pay per lead. With a fixed target customer acquisition cost, a higher close rate allows a higher maximum CPL. For example, a $3,000 target CAC with a 2% lead-to-sale rate supports a $60 maximum CPL. The same $3,000 target with a 10% rate supports a $300 maximum CPL. Improving the sales process increases the amount you can profitably invest in marketing.',
          },
          {
            question: 'What is the difference between CPL and CAC?',
            answer: 'Cost per lead measures the cost to generate an inquiry. Customer acquisition cost measures the cost to acquire a signed customer — it includes all leads that did not convert, not just the one that did. CAC is a more complete measure of marketing efficiency because it reflects the full sales funnel performance, not just the cost of traffic generation.',
          },
          {
            question: 'Should contractors measure CPL or ROAS?',
            answer: 'Both metrics provide useful but different views. CPL shows campaign-level efficiency. ROAS (attributed signed revenue divided by advertising spend) connects spend to revenue, but does not account for gross margin, agency fees, or fulfillment costs. A complete analysis should include CPL, cost per qualified lead, CAC, ROAS, gross margin, and capacity — reviewed together rather than in isolation.',
          },
          {
            question: 'How can contractors track which leads become signed projects?',
            answer: 'Tracking leads through to signed projects requires connecting advertising data to CRM records. Each lead should be entered with its original source, qualified or disqualified, moved through sales stages, and updated when a project is won or lost. Tools such as call tracking, UTM parameters, GCLID capture, and offline conversion imports can help connect ad platform data to business outcomes. The key principle is that the CRM must record the revenue and source of every signed project.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'bom-custo-por-lead-para-general-contractors',
        path: '/br/blog/bom-custo-por-lead-para-general-contractors',
        title: 'Qual É um Bom Custo por Lead para General Contractors?',
        seoTitle: 'Qual É um Bom Custo por Lead para General Contractors?',
        metaDescription: 'Aprenda a calcular um custo por lead lucrativo para general contractors usando valor do projeto, margem, qualidade dos leads, conversão e CAC.',
        excerpt: 'Aprenda quanto sua empresa de construção pode pagar por um lead sem comprometer a rentabilidade, usando valor dos projetos, margem, qualificação e taxa de fechamento.',
        category: 'Métricas de Marketing',
        primaryKeyword: 'custo por lead para general contractors',
        secondaryKeywords: [
          'CPL para general contractors',
          'Custo de lead para contractors',
          'Custo por lead Google Ads',
          'Lead para empresa de construção',
          'Custo de aquisição para contractors',
          'CAC para general contractors',
          'ROI de marketing para contractors',
          'Custo por lead qualificado',
          'Marketing para construction companies',
          'Leads para contractors nos EUA',
        ],
        featuredImageAlt: 'Cálculo de custo por lead para uma campanha de marketing de general contractor',
        publishedDate: '2025-08-03',
        updatedDate: '2025-08-03',
        readingTime: 20,
        canonicalUrl: `${SITE_URL}/br/blog/bom-custo-por-lead-para-general-contractors`,
        faq: [
          {
            question: 'Qual é um bom custo por lead para general contractors?',
            answer: 'Não existe uma resposta universal. Um bom custo por lead para um general contractor é aquele que gera consistentemente oportunidades qualificadas e contratos fechados a um custo de aquisição abaixo do que a empresa pode sustentar de forma lucrativa. Esse número depende da receita média por projeto, da margem bruta, da taxa de conversão lead-para-contrato e do CAC alvo da empresa.',
          },
          {
            question: 'Como contractors calculam o custo por lead?',
            answer: 'O custo por lead é calculado dividindo o total gasto em anúncios pelo número de leads gerados no mesmo período. Por exemplo, $5.000 em anúncios divididos por 25 leads equivale a um CPL de $200. Esse cálculo sozinho não mostra se os leads eram qualificados, acessíveis ou se foram convertidos em projetos.',
          },
          {
            question: 'Qual é a diferença entre CPL e custo por lead qualificado?',
            answer: 'O custo por lead mede o gasto em anúncios dividido por todos os leads recebidos, incluindo spam, números errados e contatos fora do escopo. O custo por lead qualificado mede o gasto dividido apenas pelos leads que atenderam aos seus critérios de qualificação. A segunda métrica é mais útil para avaliar a performance de marketing porque exclui contatos que nunca tiveram uma chance real de se tornar um projeto.',
          },
          {
            question: 'Um CPL mais baixo é sempre melhor?',
            answer: 'Não. Um CPL bruto mais baixo pode refletir tráfego de baixa qualidade, segmentação ampla demais ou critérios de qualificação fracos. Se uma campanha gera leads baratos que raramente qualificam ou fecham, o custo real por projeto assinado pode ser muito alto. As métricas mais importantes são custo por lead qualificado, CAC e lucro bruto por projeto assinado — não volume de leads ou CPL bruto.',
          },
          {
            question: 'Quanto contractors devem investir em geração de leads?',
            answer: 'Uma abordagem simplificada é multiplicar o número de projetos que precisa fechar por mês pelo CAC alvo. Por exemplo, três projetos com um CAC alvo de $3.000 sugere um orçamento indicativo de aquisição de $9.000. O orçamento real de marketing pode precisar incluir também taxas de agência, software, call tracking e outros custos. Limitações de capacidade operacional também devem ser consideradas.',
          },
          {
            question: 'Por que meus leads de construção são caros?',
            answer: 'Um CPL alto pode ter várias causas diferentes. Problemas de tráfego incluem pesquisas irrelevantes, palavras-chave muito amplas e má gestão de palavras-chave negativas. Problemas de conversão incluem página lenta, mensagem desconexa e call to action pouco claro. Problemas de qualificação incluem campanhas que alcançam tipos de projeto ou localizações erradas. Problemas de vendas incluem resposta lenta e follow-up inconsistente. Cada causa exige uma solução diferente — reduzir os lances isoladamente geralmente não resolve.',
          },
          {
            question: 'Como a taxa de fechamento afeta o custo por lead?',
            answer: 'A taxa de fechamento determina diretamente quanto você pode pagar por lead. Com um CAC alvo fixo, uma taxa de fechamento maior permite um CPL máximo maior. Por exemplo, um CAC alvo de $3.000 com uma taxa lead-para-contrato de 2% suporta um CPL máximo de $60. O mesmo alvo de $3.000 com uma taxa de 10% suporta um CPL máximo de $300. Melhorar o processo de vendas aumenta o valor que você pode investir de forma lucrativa em marketing.',
          },
          {
            question: 'Qual é a diferença entre CPL e CAC?',
            answer: 'O custo por lead mede o custo para gerar um contato. O custo de aquisição de cliente (CAC) mede o custo para fechar um contrato — inclui todos os leads que não converteram, não apenas o que fechou. O CAC é uma medida mais completa da eficiência de marketing porque reflete a performance de todo o funil de vendas, não apenas o custo de geração de tráfego.',
          },
          {
            question: 'Contractors devem medir CPL ou ROAS?',
            answer: 'As duas métricas oferecem visões úteis, mas diferentes. O CPL mostra eficiência no nível da campanha. O ROAS (receita assinada atribuída dividida pelo investimento em anúncios) conecta o gasto à receita, mas não considera margem bruta, taxas de agência ou custos de execução. Uma análise completa deve incluir CPL, custo por lead qualificado, CAC, ROAS, margem bruta e capacidade — avaliados em conjunto, não isoladamente.',
          },
          {
            question: 'Como contractors podem rastrear quais leads se tornam contratos fechados?',
            answer: 'Rastrear leads até contratos fechados exige conectar dados de anúncios aos registros do CRM. Cada lead deve ser registrado com sua fonte original, qualificado ou desqualificado, movido pelas etapas do processo de vendas e atualizado quando um projeto é ganho ou perdido. Ferramentas como call tracking, parâmetros UTM, captura de GCLID e importação de conversões offline podem ajudar a conectar os dados da plataforma de anúncios aos resultados do negócio. O princípio fundamental é que o CRM deve registrar a receita e a fonte de cada projeto assinado.',
          },
        ],
      },
    },
  },
  {
    id: 'best-google-ads-keywords-for-general-contractors',
    status: 'published',
    featuredImage: '/images/blog/google-ads-keywords-for-general-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-for-general-contractors',
      'google-ads-vs-local-services-ads',
      'cost-per-lead-contractors',
      'follow-up-contractor-leads',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'best-google-ads-keywords-for-general-contractors',
        path: '/blog/best-google-ads-keywords-for-general-contractors',
        title: 'Best Google Ads Keywords for General Contractors',
        seoTitle: 'Best Google Ads Keywords for General Contractors',
        metaDescription:
          'Discover high-intent Google Ads keywords for general contractors, remodeling companies, home additions, ADUs, decks, roofing, and other construction services.',
        excerpt:
          'Learn how to choose high-intent Google Ads keywords for your construction services, organize them by campaign, and prevent irrelevant searches from wasting your budget.',
        category: 'Google Ads',
        primaryKeyword: 'Google Ads keywords for general contractors',
        secondaryKeywords: [
          'Best keywords for general contractors',
          'Contractor Google Ads keywords',
          'General contractor keywords',
          'PPC keywords for contractors',
          'Construction company keywords',
          'Contractor advertising keywords',
          'Remodeling contractor keywords',
          'General contractor lead generation',
          'High-intent contractor keywords',
          'Negative keywords for contractors',
        ],
        featuredImageAlt: 'Google Ads keyword strategy for general contractors',
        publishedDate: '2025-08-02',
        updatedDate: '2025-08-02',
        readingTime: 18,
        canonicalUrl: `${SITE_URL}/blog/best-google-ads-keywords-for-general-contractors`,
        faq: [
          {
            question: 'What are the best Google Ads keywords for general contractors?',
            answer:
              'There is no single universal list. The most effective keywords for your campaigns are those that consistently produce qualified inquiries for your specific services, in your actual service area, at a cost that supports a profitable project. Keywords combining a specific service, a commercial modifier, and a geographic element — such as "kitchen remodeling contractor near me" or "home addition builder in [city]" — typically signal stronger hiring intent than generic or high-volume terms.',
          },
          {
            question: 'Should contractors use broad, phrase, or exact match?',
            answer:
              'Each match type involves trade-offs between reach, control, and the monitoring required to manage performance. Broad match can reach a wider range of relevant searches but depends heavily on accurate conversion data and active negative keyword management. Phrase match offers more directional control while still allowing intent-based variation. Exact match provides the most precise control but can limit reach. Many campaigns use a combination, adjusted based on budget, data quality, and campaign maturity.',
          },
          {
            question: 'What is the difference between a keyword and a search term?',
            answer:
              'A keyword is a word or phrase you add to your campaign to help Google understand which searches may be relevant to your ads. A search term is the actual phrase a user typed or spoke that caused your ad to be eligible to show. These are not always the same. Reviewing your search terms report regularly helps you identify which actual searches are triggering your ads, find new keyword opportunities, and build negative keyword lists to prevent irrelevant traffic.',
          },
          {
            question: 'Should contractors use "near me" keywords?',
            answer:
              '"Near me" searches represent strong local hiring intent — the user is looking for a contractor in their current location. Including "near me" variations in your campaigns can be effective, but the phrase itself is not a substitute for well-structured location targeting in your campaign settings. Geographic targeting in Google Ads controls where your ads appear regardless of whether the keyword contains a location modifier.',
          },
          {
            question: 'What negative keywords should contractors add?',
            answer:
              'Negative keywords prevent your ads from showing for searches that are unlikely to produce qualified leads. Common categories include employment terms (jobs, careers, hiring, salary), DIY and informational searches (how to, tutorial, DIY, plans), material and supply searches (lumber prices, materials, wholesale), and services outside your scope. The right negative keyword list depends on your specific services — only exclude terms for services you genuinely do not offer.',
          },
          {
            question: 'How many keywords should a contractor campaign have?',
            answer:
              'There is no fixed ideal number. A tightly focused ad group with a small number of closely related, high-intent keywords is generally more manageable and easier to optimize than an ad group with dozens of loosely related terms. Quality, relevance, and the alignment between keyword, ad, and landing page matter more than the total count. Start with the most commercially relevant keywords for each service and expand based on search term data.',
          },
          {
            question: 'Should every contractor service have a separate campaign?',
            answer:
              'Organizing campaigns by service allows you to control budget, bidding, and messaging independently for each service. If kitchen remodeling and ADU construction have different margins, close rates, and seasonal demand, combining them in one campaign makes it harder to optimize either. Separate campaigns also make it easier to measure cost per qualified lead and signed revenue by service, which is essential for making informed budget decisions.',
          },
          {
            question: 'How often should search terms be reviewed?',
            answer:
              'For active campaigns, reviewing search terms at least weekly — or more frequently when campaigns are new or when budgets are significant — helps you catch irrelevant traffic early, add negatives promptly, and identify new keyword themes. Less frequent review increases the risk of spending on searches that are not producing qualified leads.',
          },
          {
            question: 'Are high-volume keywords always better?',
            answer:
              'Not necessarily. High search volume indicates how many people search for a term, but it does not indicate whether those searches represent hiring intent, whether the competition is profitable to bid against, or whether the leads generated will match your service capabilities. A lower-volume keyword that consistently produces qualified estimates and signed projects may outperform a high-volume keyword that generates clicks without conversions.',
          },
          {
            question: 'How can contractors track which keywords generate revenue?',
            answer:
              'Connecting keyword performance to signed revenue requires tracking the full lead journey: from keyword to click, to form submission or call, to CRM entry, to qualification, to estimate, to signed contract. Using call tracking numbers tied to specific campaigns, recording lead sources in your CRM, and reviewing signed project revenue by source gives you the data needed to evaluate which keywords are actually producing profitable work — not just leads.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'melhores-palavras-chave-google-ads-para-general-contractors',
        path: '/br/blog/melhores-palavras-chave-google-ads-para-general-contractors',
        title: 'Melhores Palavras-Chave de Google Ads para General Contractors',
        seoTitle: 'Melhores Palavras-Chave de Google Ads para General Contractors',
        metaDescription:
          'Veja palavras-chave de alta intenção para general contractors, remodeling, home additions, ADUs, decks, roofing e outros serviços de construção nos EUA.',
        excerpt:
          'Aprenda como escolher palavras-chave de alta intenção para sua empresa de construção, organizar campanhas por serviço e evitar pesquisas que desperdiçam seu orçamento.',
        category: 'Google Ads',
        primaryKeyword: 'palavras-chave Google Ads para general contractors',
        secondaryKeywords: [
          'Palavras-chave para contractors',
          'Keywords para general contractors',
          'Google Ads para contractors',
          'Palavras-chave para empresas de construção',
          'Leads para general contractors',
          'Marketing para construction companies',
          'Keywords para remodeling contractors',
          'Anúncios para contractors nos EUA',
          'Palavras-chave de alta intenção',
          'Palavras-chave negativas para contractors',
        ],
        featuredImageAlt: 'Estratégia de palavras-chave de Google Ads para general contractors',
        publishedDate: '2025-08-02',
        updatedDate: '2025-08-02',
        readingTime: 18,
        canonicalUrl: `${SITE_URL}/br/blog/melhores-palavras-chave-google-ads-para-general-contractors`,
        faq: [
          {
            question: 'Quais são as melhores palavras-chave de Google Ads para general contractors?',
            answer:
              'Não existe uma lista universal. As keywords mais eficazes para suas campanhas são as que consistentemente geram contatos qualificados para seus serviços específicos, na sua área de atuação real, a um custo que viabiliza projetos lucrativos. Keywords que combinam um serviço específico, um modificador comercial e um elemento geográfico — como "kitchen remodeling contractor near me" ou "home addition builder in [city]" — geralmente indicam uma intenção de contratação mais forte do que termos genéricos ou de alto volume.',
          },
          {
            question: 'Contractors devem usar broad match, phrase match ou exact match?',
            answer:
              'Cada tipo de correspondência envolve trade-offs entre alcance, controle e o monitoramento necessário para gerenciar a performance. O broad match pode alcançar um volume maior de pesquisas relevantes, mas depende fortemente de dados de conversão precisos e de uma gestão ativa de palavras-chave negativas. O phrase match oferece mais controle direcional enquanto ainda permite variações baseadas em intenção. O exact match oferece o controle mais preciso, mas pode limitar o alcance. Muitas campanhas usam uma combinação dos três, ajustada conforme o orçamento, a qualidade dos dados e a maturidade da campanha.',
          },
          {
            question: 'Qual é a diferença entre keyword e search term?',
            answer:
              'Uma keyword é uma palavra ou frase que você adiciona à sua campanha para ajudar o Google a entender quais pesquisas podem ser relevantes para seus anúncios. Um search term é a frase real que o usuário digitou ou falou e que fez com que seu anúncio fosse elegível para ser exibido. Esses dois conceitos nem sempre são iguais. Revisar o relatório de search terms regularmente ajuda a identificar quais pesquisas estão acionando seus anúncios, encontrar novas oportunidades de keyword e construir listas de palavras-chave negativas para evitar tráfego irrelevante.',
          },
          {
            question: 'Contractors devem usar keywords com "near me"?',
            answer:
              'Pesquisas com "near me" representam uma forte intenção de contratação local — o usuário está procurando um contractor na sua localização atual. Incluir variações com "near me" nas suas campanhas pode ser eficaz, mas a frase em si não substitui uma segmentação geográfica bem configurada nas definições da campanha. A segmentação geográfica no Google Ads controla onde seus anúncios aparecem independentemente de a keyword conter um modificador de localização.',
          },
          {
            question: 'Quais palavras-chave negativas contractors devem adicionar?',
            answer:
              'Palavras-chave negativas evitam que seus anúncios sejam exibidos para pesquisas com baixa probabilidade de gerar leads qualificados. Categorias comuns incluem termos de emprego (jobs, careers, hiring, salary), pesquisas de DIY e informativas (how to, tutorial, DIY, plans), pesquisas de materiais e suprimentos (lumber prices, materials, wholesale) e serviços fora do seu escopo. A lista correta de palavras-chave negativas depende dos seus serviços específicos — exclua apenas termos de serviços que você genuinamente não oferece.',
          },
          {
            question: 'Quantas keywords uma campanha de contractor deve ter?',
            answer:
              'Não existe um número ideal fixo. Um ad group bem focado com um pequeno número de keywords relacionadas e de alta intenção geralmente é mais fácil de gerenciar e otimizar do que um ad group com dezenas de termos vagamente relacionados. Qualidade, relevância e o alinhamento entre keyword, anúncio e landing page importam mais do que a quantidade total. Comece com as keywords comercialmente mais relevantes para cada serviço e expanda com base nos dados de search terms.',
          },
          {
            question: 'Cada serviço de um contractor deve ter uma campanha separada?',
            answer:
              'Organizar campanhas por serviço permite controlar orçamento, lances e mensagem de forma independente para cada serviço. Se kitchen remodeling e ADU construction têm margens, taxas de fechamento e sazonalidade diferentes, combiná-los em uma única campanha dificulta a otimização de ambos. Campanhas separadas também facilitam a medição do custo por lead qualificado e da receita assinada por serviço, o que é essencial para decisões de orçamento bem fundamentadas.',
          },
          {
            question: 'Com que frequência os search terms devem ser revisados?',
            answer:
              'Para campanhas ativas, revisar os search terms pelo menos semanalmente — ou com mais frequência quando as campanhas são novas ou quando os orçamentos são significativos — ajuda a identificar tráfego irrelevante precocemente, adicionar negativas rapidamente e encontrar novos temas de keyword. Revisões menos frequentes aumentam o risco de gastar com pesquisas que não estão gerando leads qualificados.',
          },
          {
            question: 'Keywords de alto volume são sempre melhores?',
            answer:
              'Não necessariamente. Alto volume de pesquisa indica quantas pessoas buscam por um termo, mas não indica se essas buscas representam intenção de contratação, se a concorrência é rentável para disputar, ou se os leads gerados vão corresponder às suas capacidades de serviço. Uma keyword de menor volume que consistentemente gera orçamentos qualificados e projetos assinados pode superar uma keyword de alto volume que gera cliques sem conversões.',
          },
          {
            question: 'Como contractors podem rastrear quais keywords geram receita?',
            answer:
              'Conectar a performance das keywords à receita assinada exige rastrear a jornada completa do lead: da keyword ao clique, ao preenchimento de formulário ou ligação, à entrada no CRM, à qualificação, ao orçamento, até o contrato assinado. Usar números de call tracking vinculados a campanhas específicas, registrar a fonte dos leads no CRM e revisar a receita de projetos assinados por fonte fornece os dados necessários para avaliar quais keywords estão gerando trabalho realmente lucrativo — não apenas leads.',
          },
        ],
      },
    },
  },
  {
    id: 'google-ads-vs-local-services-ads',
    status: 'published',
    featuredImage: '/images/blog/google-ads-vs-local-services-ads.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-for-general-contractors',
      'best-google-ads-keywords-contractors',
      'cost-per-lead-contractors',
      'follow-up-contractor-leads',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'google-ads-vs-local-services-ads-for-contractors',
        path: '/blog/google-ads-vs-local-services-ads-for-contractors',
        title: 'Google Ads vs Local Services Ads for General Contractors',
        seoTitle: 'Google Ads vs Local Services Ads for Contractors',
        metaDescription:
          'Compare Google Ads and Local Services Ads for general contractors. Learn how costs, lead quality, targeting, eligibility, and campaign control differ.',
        excerpt:
          'Compare Google Search Ads and Local Services Ads to understand which platform offers the right combination of reach, control, lead quality, and profitability for your construction company.',
        category: 'Google Ads',
        primaryKeyword: 'Google Ads vs Local Services Ads for contractors',
        secondaryKeywords: [
          'Google Ads vs LSA for contractors',
          'Local Services Ads for general contractors',
          'Google Ads for general contractors',
          'Google Guaranteed for contractors',
          'contractor advertising',
          'contractor lead generation',
          'general contractor Google Ads',
          'Local Services Ads vs Google Ads',
          'best advertising for general contractors',
          'contractor PPC',
        ],
        featuredImageAlt: 'Comparison between Google Ads and Local Services Ads for general contractors',
        publishedDate: '2025-08-01',
        updatedDate: '2025-08-01',
        readingTime: 16,
        canonicalUrl: `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
        faq: [
          {
            question: 'Are Local Services Ads available for general contractors?',
            answer:
              'Local Services Ads are available in many US markets for general contractors, but eligibility depends on your specific location, service category, and current Google policies. Not every market or category is covered, and Google may require business verification, background checks, and license documentation before your ads go live. Check the LSA eligibility tool in Google Ads to confirm availability for your area.',
          },
          {
            question: 'Is Google Ads or Local Services Ads cheaper?',
            answer:
              'Neither is automatically cheaper. Google Ads charges per click, and Local Services Ads charge per lead. A lower cost per raw lead from LSA does not mean a lower cost per qualified opportunity if a large percentage of those leads are outside your scope, too small, or unresponsive. The right comparison is cost per qualified lead, cost per estimate, and cost per signed project — not raw cost per click or cost per lead.',
          },
          {
            question: 'Do Local Services Ads charge per click?',
            answer:
              'No. Local Services Ads charge per lead, not per click. When a homeowner calls or messages through your LSA listing, Google charges your account for that lead. You can dispute leads that do not meet the eligibility criteria — for example, calls outside your service area or for services you do not offer — but not every dispute results in a credit.',
          },
          {
            question: 'Can contractors use Google Ads and Local Services Ads together?',
            answer:
              'Yes. Many contractors run both platforms simultaneously. LSA can capture direct local demand from eligible searches, while Google Search Ads provide greater control over keywords, landing pages, and campaign segmentation. Running both does not guarantee higher total results, but when managed correctly and tracked separately, it allows you to compare cost per qualified lead and signed revenue by source and allocate budget toward what is actually working.',
          },
          {
            question: 'Does a contractor need a Google Business Profile for LSA?',
            answer:
              'Yes. A verified Google Business Profile is a prerequisite for Local Services Ads. Google connects your LSA listing to your Business Profile, which is how your ratings and reviews appear in the ad. A complete, accurate, and well-reviewed Google Business Profile improves your LSA ranking and conversion rate.',
          },
          {
            question: 'Which platform is better for remodeling contractors?',
            answer:
              'Both platforms can work for remodeling contractors. Local Services Ads may be available for kitchen remodeling, bathroom remodeling, and other common residential categories depending on your location. Google Search Ads generally offer more control for contractors running specialized campaigns around specific services, project types, or locations. Many established remodeling companies use both and track them separately.',
          },
          {
            question: 'Are Local Services Ads good for large construction projects?',
            answer:
              'LSA can generate inquiries for large projects, but the platform is not designed for high-ticket project qualification. The lead format — a phone call or message — does not include budget, timeline, or scope information. For whole-home renovations, custom builds, or additions where project fit and budget qualification are critical, dedicated Google Search Ads with qualifying landing pages typically provide more control over the type of prospect who reaches out.',
          },
          {
            question: 'How should contractors track leads from both platforms?',
            answer:
              'Use separate tracking for each source. Assign unique call tracking numbers to your LSA listing and your Google Ads landing pages. Record each lead in your CRM with the original source. Track qualified lead rate, appointment rate, estimate rate, close rate, average project value, and signed revenue separately for each platform. The primary comparison should be cost per signed project and gross profit by source — not raw lead volume.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'google-ads-vs-local-services-ads-para-contractors',
        path: '/br/blog/google-ads-vs-local-services-ads-para-contractors',
        title: 'Google Ads vs Local Services Ads para General Contractors',
        seoTitle: 'Google Ads vs Local Services Ads para Contractors',
        metaDescription:
          'Compare Google Ads e Local Services Ads para general contractors e entenda as diferenças de custo, leads, controle, elegibilidade e resultados.',
        excerpt:
          'Compare Google Search Ads e Local Services Ads para entender qual plataforma oferece a melhor combinação de alcance, controle, qualidade dos leads e rentabilidade para sua empresa de construção.',
        category: 'Google Ads',
        primaryKeyword: 'Google Ads vs Local Services Ads para contractors',
        secondaryKeywords: [
          'Google Ads ou Local Services Ads',
          'LSA para general contractors',
          'Google Ads para contractors',
          'Google Guaranteed para contractors',
          'Anúncios para empresas de construção',
          'Leads para general contractors',
          'Marketing para contractors nos EUA',
          'Local Services Ads para brasileiros nos EUA',
          'Melhor anúncio para general contractors',
          'PPC para empresas de construção',
        ],
        featuredImageAlt: 'Comparação entre Google Ads e Local Services Ads para general contractors',
        publishedDate: '2025-08-01',
        updatedDate: '2025-08-01',
        readingTime: 16,
        canonicalUrl: `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
        faq: [
          {
            question: 'O Local Services Ads está disponível para general contractors?',
            answer:
              'O Local Services Ads está disponível em muitos mercados dos EUA para general contractors, mas a elegibilidade depende da sua localização, categoria de serviço e políticas atuais do Google. Nem todo mercado ou categoria é coberto, e o Google pode exigir verificação de negócio, background check e documentação de licenças antes de ativar seus anúncios. Verifique a ferramenta de elegibilidade do LSA no Google Ads para confirmar a disponibilidade na sua área.',
          },
          {
            question: 'Google Ads ou Local Services Ads é mais barato?',
            answer:
              'Nenhuma das plataformas é automaticamente mais barata. O Google Ads cobra por clique e o Local Services Ads cobra por lead. Um custo por lead menor no LSA não significa um custo por oportunidade qualificada menor se uma grande parte desses leads estiver fora do escopo, for muito pequena ou não responder. A comparação correta é custo por lead qualificado, custo por orçamento e custo por projeto assinado — não custo por clique ou custo por lead bruto.',
          },
          {
            question: 'O Local Services Ads cobra por clique?',
            answer:
              'Não. O Local Services Ads cobra por lead, não por clique. Quando um homeowner liga ou envia mensagem pelo seu anúncio LSA, o Google cobra esse lead da sua conta. Você pode contestar leads que não atendam aos critérios de elegibilidade — como ligações fora da sua área de atendimento ou para serviços que você não oferece — mas nem toda contestação resulta em crédito.',
          },
          {
            question: 'Contractors podem usar Google Ads e Local Services Ads ao mesmo tempo?',
            answer:
              'Sim. Muitos contractors operam as duas plataformas simultaneamente. O LSA pode capturar demanda local direta de buscas elegíveis, enquanto o Google Search Ads oferece maior controle sobre palavras-chave, landing pages e segmentação de campanhas. Usar as duas não garante resultados maiores, mas quando gerenciado corretamente e rastreado separadamente, permite comparar custo por lead qualificado e receita assinada por fonte e alocar o orçamento para o que está gerando resultado.',
          },
          {
            question: 'Um contractor precisa de Google Business Profile para LSA?',
            answer:
              'Sim. Um Google Business Profile verificado é um pré-requisito para o Local Services Ads. O Google conecta seu anúncio LSA ao seu Business Profile, que é como suas avaliações aparecem no anúncio. Um Google Business Profile completo, preciso e com boas avaliações melhora seu ranking e taxa de conversão no LSA.',
          },
          {
            question: 'Qual plataforma é melhor para contractors de reforma?',
            answer:
              'As duas plataformas podem funcionar para contractors de reforma. O Local Services Ads pode estar disponível para remodelação de cozinha, banheiro e outras categorias residenciais comuns dependendo da sua localização. O Google Search Ads geralmente oferece mais controle para contractors que rodam campanhas especializadas por serviço, tipo de projeto ou localização. Muitas empresas de reforma consolidadas usam as duas e rastreiam separadamente.',
          },
          {
            question: 'O Local Services Ads é bom para projetos grandes de construção?',
            answer:
              'O LSA pode gerar contatos para projetos grandes, mas a plataforma não foi desenvolvida para qualificação de projetos de alto valor. O formato do lead — uma ligação ou mensagem — não inclui informações de orçamento, prazo ou escopo. Para reformas completas, construções personalizadas ou adições onde o encaixe do projeto e a qualificação do orçamento são críticos, o Google Search Ads com landing pages qualificadoras geralmente oferece mais controle sobre o tipo de prospect que entra em contato.',
          },
          {
            question: 'Como contractors devem rastrear leads das duas plataformas?',
            answer:
              'Use rastreamento separado para cada fonte. Atribua números de call tracking exclusivos ao seu anúncio LSA e às suas landing pages do Google Ads. Registre cada lead no CRM com a fonte original. Acompanhe taxa de lead qualificado, taxa de agendamento, taxa de orçamento, taxa de fechamento, valor médio de projeto e receita assinada separadamente para cada plataforma. A comparação principal deve ser custo por projeto assinado e lucro bruto por fonte — não volume de leads.',
          },
        ],
      },
    },
  },
  {
    id: 'google-ads-for-general-contractors',
    status: 'published',
    featuredImage: '/images/blog/google-ads-for-general-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-vs-local-services-ads',
      'best-google-ads-keywords-contractors',
      'cost-per-lead-contractors',
      'follow-up-contractor-leads',
      'contractor-marketing-roi',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'google-ads-for-general-contractors',
        path: '/blog/google-ads-for-general-contractors',
        title: 'Google Ads for General Contractors: How to Generate More Qualified Leads',
        seoTitle: 'Google Ads for General Contractors: Complete Guide',
        metaDescription:
          'Learn how Google Ads for general contractors works, which keywords generate qualified leads, how much to invest, and how to turn clicks into signed projects.',
        excerpt:
          'A complete guide to running Google Ads for general contractors — from keyword strategy and campaign setup to bid management, landing page optimization, and revenue tracking.',
        category: 'Google Ads',
        primaryKeyword: 'Google Ads for general contractors',
        secondaryKeywords: [
          'Google Ads for contractors',
          'general contractor advertising',
          'contractor lead generation',
          'PPC for contractors',
          'construction company Google Ads',
          'contractor marketing',
          'general contractor leads',
          'Google advertising for construction companies',
        ],
        featuredImageAlt: 'Google Ads campaign strategy for a general contractor',
        publishedDate: '2025-07-09',
        updatedDate: '2025-07-09',
        readingTime: 18,
        canonicalUrl: `${SITE_URL}/blog/google-ads-for-general-contractors`,
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'google-ads-para-general-contractors',
        path: '/br/blog/google-ads-para-general-contractors',
        title: 'Google Ads para General Contractors: Como Gerar Leads Mais Qualificados',
        seoTitle: 'Google Ads para General Contractors: Guia Completo',
        metaDescription:
          'Aprenda como usar Google Ads para gerar leads qualificados para sua empresa de construção nos Estados Unidos e transformar cliques em contratos.',
        excerpt:
          'Um guia completo sobre Google Ads para general contractors — da estratégia de palavras-chave e configuração de campanhas até gestão de lances, otimização de landing pages e acompanhamento de receita.',
        category: 'Google Ads',
        primaryKeyword: 'Google Ads para general contractors',
        secondaryKeywords: [
          'Google Ads para contractors',
          'leads para general contractors',
          'marketing para construction companies',
          'PPC para contractors',
          'anúncios para empresas de construção',
          'marketing para brasileiros nos EUA',
          'geração de leads para construção',
          'Google Ads para construção nos Estados Unidos',
        ],
        featuredImageAlt: 'Estratégia de campanhas Google Ads para um general contractor',
        publishedDate: '2025-07-09',
        updatedDate: '2025-07-09',
        readingTime: 18,
        canonicalUrl: `${SITE_URL}/br/blog/google-ads-para-general-contractors`,
      },
    },
  },
  {
    id: 'general-contractor-marketing-guide',
    status: 'published',
    featuredImage: '/images/blog/marketing-for-general-contractors-complete-guide.svg',
    relatedArticleIds: [
      'google-ads-for-general-contractors',
      'google-ads-vs-local-services-ads',
      'local-seo-general-contractors',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'general-contractor-marketing',
        path: '/general-contractor-marketing',
        title: 'Marketing for General Contractors: The Complete Guide',
        seoTitle: 'Marketing for General Contractors: The Complete Guide',
        metaDescription:
          'A complete guide to marketing for general contractors — covering Google Ads, local SEO, websites, CRM, lead tracking, and revenue attribution.',
        excerpt:
          'A comprehensive overview of every marketing channel and strategy general contractors need to generate consistent, qualified leads — from Google Ads and local SEO to CRM systems and revenue tracking.',
        category: 'Contractor Growth',
        primaryKeyword: 'marketing for general contractors',
        secondaryKeywords: [
          'contractor marketing',
          'general contractor advertising',
          'construction company marketing',
          'how to get clients for construction',
          'lead generation for contractors',
        ],
        featuredImageAlt: 'General contractor marketing strategy overview',
        publishedDate: '2025-07-09',
        updatedDate: '2025-07-09',
        readingTime: 25,
        canonicalUrl: `${SITE_URL}/general-contractor-marketing`,
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'marketing-para-general-contractors',
        path: '/br/marketing-para-general-contractors',
        title: 'Marketing para General Contractors nos Estados Unidos: Guia Completo',
        seoTitle: 'Marketing para General Contractors nos EUA: Guia Completo',
        metaDescription:
          'Aprenda como general contractors brasileiros podem gerar leads nos Estados Unidos usando Google Ads, SEO local, sites, CRM e acompanhamento de receita.',
        excerpt:
          'Um guia completo de marketing para general contractors — cobrindo Google Ads, SEO local, sites, CRM, acompanhamento de leads e atribuição de receita nos Estados Unidos.',
        category: 'Crescimento para Contractors',
        primaryKeyword: 'marketing para general contractors',
        secondaryKeywords: [
          'marketing para contractors',
          'marketing para brasileiros nos Estados Unidos',
          'marketing para empresas de construção nos EUA',
          'como conseguir clientes para construção nos EUA',
          'geração de leads para contractors',
        ],
        featuredImageAlt: 'Visão geral da estratégia de marketing para general contractors',
        publishedDate: '2025-07-09',
        updatedDate: '2025-07-09',
        readingTime: 25,
        canonicalUrl: `${SITE_URL}/br/marketing-para-general-contractors`,
      },
    },
  },
  {
    id: 'contractor-marketing-roi',
    status: 'published',
    featuredImage: '/images/blog/how-to-calculate-contractor-marketing-roi.svg',
    relatedArticleIds: ['general-contractor-marketing-guide', 'google-ads-for-general-contractors', 'good-cost-per-lead-for-general-contractors', 'follow-up-contractor-leads'],
    translations: {
      'en-US': {
        locale: 'en-US', slug: 'contractor-marketing-roi', path: '/blog/contractor-marketing-roi',
        title: 'How to Calculate Contractor Marketing ROI', seoTitle: 'How to Calculate Contractor Marketing ROI',
        metaDescription: 'Learn how contractors can calculate marketing ROI from ad spend to signed revenue and gross profit, with a practical formula, funnel, checklist, and calculator.',
        excerpt: 'A practical framework for measuring contractor marketing ROI from marketing spend to signed revenue and gross profit.', category: 'Marketing Analytics', primaryKeyword: 'contractor marketing ROI', secondaryKeywords: ['how to calculate contractor marketing ROI', 'contractor marketing return on investment', 'contractor marketing ROAS'], featuredImageAlt: 'Contractor marketing ROI measurement dashboard', publishedDate: '2026-08-18', updatedDate: '2026-08-18', readingTime: 14, canonicalUrl: `${SITE_URL}/blog/contractor-marketing-roi`,
        faq: [{ question: 'What is a good marketing ROI for a contractor?', answer: 'There is no universal benchmark. The right target depends on gross margin, sales cycle, attribution quality, and capacity.' }, { question: 'Should contractors measure ROI using revenue or profit?', answer: 'Gross-profit-based ROI is usually safer for decisions because revenue does not include delivery costs.' }],
      },
      'pt-BR': {
        locale: 'pt-BR', slug: 'como-calcular-o-roi-de-marketing-para-contractors', path: '/br/blog/como-calcular-o-roi-de-marketing-para-contractors',
        title: 'Como Calcular o ROI de Marketing para General Contractors', seoTitle: 'Como Calcular o ROI de Marketing para General Contractors',
        metaDescription: 'Aprenda a calcular o ROI de marketing para contractors usando investimento, receita assinada e lucro bruto, com fórmula, checklist e calculadora prática.',
        excerpt: 'Framework prático para medir ROI de marketing de contractors, da mídia ao lucro bruto.', category: 'Métricas de Marketing', primaryKeyword: 'ROI de marketing para contractors', secondaryKeywords: ['como calcular ROI de marketing', 'retorno de marketing para contractors', 'ROAS para contractors'], featuredImageAlt: 'Medição de ROI de marketing para contractors', publishedDate: '2026-08-18', updatedDate: '2026-08-18', readingTime: 14, canonicalUrl: `${SITE_URL}/br/blog/como-calcular-o-roi-de-marketing-para-contractors`,
        faq: [{ question: 'Qual é um bom ROI de marketing para contractors?', answer: 'Não existe um benchmark universal. A meta depende da margem bruta, do ciclo de vendas e da qualidade da atribuição.' }, { question: 'Contractors devem medir ROI usando receita ou lucro?', answer: 'ROI baseado em lucro bruto costuma ser mais seguro para decisões porque receita não considera custos de execução.' }],
      },
    },
  },
]

// ─── Legacy compat shims (keep existing imports working) ─────────────────────

/** @deprecated Use getPublishedArticles('en-US') instead */
export const relatedArticleCards = [
  ...Object.entries(standaloneRelatedCards['en-US']!).map(([id, card]) => ({
    slug: card.slug,
    title: card.title,
    excerpt: card.excerpt,
    category: card.category,
    readingTime: card.readingTime,
    status: card.status as ArticleStatus,
    href: null as string | null,
  })),
]
