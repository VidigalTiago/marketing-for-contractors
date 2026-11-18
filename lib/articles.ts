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

// CTA destinations per locale.
//
// Both locales point to Calendly (decisão do Tiago, 2026-09-16). The PT blog
// CTA used to open WhatsApp; every blog CTA now books a call instead, in both
// languages. The two constants stay separate so a PT-specific Calendly event
// can be swapped in later without touching any call site.
//
// This is the ONLY place a blog CTA destination is declared. The navbar
// wrapper, the blog hub, and every InlineCTA / EndArticleCTA read from here.
// Do not hardcode a CTA URL anywhere else.
//
// ⚠️ Not the same thing as the WhatsApp links on /br and the thank-you pages:
// those are post-conversion contact, exist in EN too, and are unrelated to this.
export const CTA_URL = 'https://calendly.com/contact-mktforcontractors/90min'
export const CTA_URL_PT = 'https://calendly.com/contact-mktforcontractors/90min'

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
      'contractor-leads-appointments',
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
      'contractor-marketing-budget',
      'contractor-website-essentials',
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
      'angi-leads-vs-google-ads-for-contractors',
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
      'contractor-website-essentials',
      'google-ads-budget-for-general-contractors',
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
    relatedArticleIds: ['general-contractor-marketing-guide', 'google-ads-for-general-contractors', 'good-cost-per-lead-for-general-contractors', 'follow-up-contractor-leads', 'contractor-marketing-budget', 'choosing-a-marketing-agency-for-contractors'],
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
  {
    id: 'contractor-marketing-budget',
    status: 'published',
    featuredImage: '/images/blog/contractor-marketing-budget.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'good-cost-per-lead-for-general-contractors',
      'contractor-marketing-roi',
      'google-ads-for-general-contractors',
      'google-ads-budget-for-general-contractors',
      'choosing-a-marketing-agency-for-contractors',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'how-much-should-general-contractors-spend-on-marketing',
        path: '/blog/how-much-should-general-contractors-spend-on-marketing',
        title: 'How Much Should General Contractors Spend on Marketing?',
        seoTitle: 'How Much Should General Contractors Spend on Marketing?',
        metaDescription: 'Learn how to set a marketing budget for a construction company using the percentage-of-revenue method, the goal-based method, and your target customer acquisition cost.',
        excerpt: 'A practical framework for setting a contractor marketing budget, comparing the percentage-of-revenue method with a goal-based approach built on customer acquisition cost.',
        category: 'Marketing Analytics',
        primaryKeyword: 'how much should general contractors spend on marketing',
        secondaryKeywords: [
          'contractor marketing budget',
          'construction company marketing budget',
          'general contractor advertising budget',
          'marketing budget for contractors',
          'how much to spend on Google Ads for contractors',
          'contractor marketing spend',
          'percentage of revenue marketing budget',
          'contractor customer acquisition cost',
        ],
        featuredImageAlt: 'Marketing budget allocation chart for a general contractor',
        publishedDate: '2026-09-16',
        updatedDate: '2026-09-16',
        readingTime: 15,
        canonicalUrl: `${SITE_URL}/blog/how-much-should-general-contractors-spend-on-marketing`,
        faq: [
          {
            question: 'How much should a general contractor spend on marketing?',
            answer: 'There is no universal number. A reasonable marketing budget depends on average project value, gross margin, sales cycle, current lead-to-sale rate, and how many additional signed projects the business wants per month. A goal-based calculation, using target customer acquisition cost multiplied by desired signed projects, generally gives a more accurate number than a fixed percentage of revenue.',
          },
          {
            question: 'What percentage of revenue should contractors spend on marketing?',
            answer: 'General small-business guidance often cites a range of roughly 2% to 10% of revenue, with newer or faster-growing businesses closer to the higher end. This range is not specific to construction and does not account for lead economics, so it works better as a sanity check on cash flow than as the primary way to size a contractor marketing budget.',
          },
          {
            question: 'Should contractors use a fixed percentage or a goal-based budget?',
            answer: 'Both have a role. A goal-based budget, built from target customer acquisition cost and the number of signed projects wanted, sizes spend to actual growth goals and lead economics. A percentage-of-revenue figure is a useful ceiling check to confirm the goal-based number does not outpace what the business can sustain in cash flow. Relying on only one method can either underfund growth or overcommit cash.',
          },
          {
            question: 'Does project type change how much a contractor should spend?',
            answer: 'Yes. Businesses focused on small repairs typically have shorter sales cycles and lower average project values than businesses focused on additions, ADUs, or custom homes. Higher-value, longer-cycle projects can often support a higher acquisition cost per signed project, but only when margins, close rate, and fulfillment capacity support it.',
          },
          {
            question: 'What counts as marketing spend versus a fixed marketing cost?',
            answer: 'Variable ad spend includes Google Ads, Local Services Ads, and other pay-per-click or pay-per-lead media. Fixed marketing costs include CRM software, call tracking, website hosting and maintenance, creative production, and agency retainers. Both belong in a complete marketing budget, but they behave differently: fixed costs do not scale down automatically when lead volume drops.',
          },
          {
            question: 'When should a contractor increase marketing spend?',
            answer: 'Signals that support increasing spend include a customer acquisition cost consistently below target, available project capacity to take on more work, and a close rate that has not started declining as lead volume grows. Increasing spend without available capacity to deliver the additional projects can create fulfillment and quality problems instead of growth.',
          },
          {
            question: 'When should a contractor reduce or pause marketing spend?',
            answer: 'Consider reducing or reallocating spend when customer acquisition cost is sustained above target, when the business is already at full project capacity, when lead quality has declined without a clear fix, or when cash flow cannot support the current pace of investment. Pausing spend has a lag effect, since the pipeline built from prior spend typically continues to convert for some time after a cut.',
          },
          {
            question: 'How should contractors allocate a marketing budget across channels?',
            answer: 'A common approach is to concentrate budget in one or two high-intent channels, such as Google Search Ads or Local Services Ads, before spreading spend across many channels. Fixed costs such as CRM and website maintenance should be planned for separately from variable ad spend, and budget should be reallocated toward whichever channel is producing the lowest cost per qualified lead and signed project, not simply the lowest cost per click.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'quanto-general-contractors-devem-investir-em-marketing',
        path: '/br/blog/quanto-general-contractors-devem-investir-em-marketing',
        title: 'Quanto General Contractors Devem Investir em Marketing?',
        seoTitle: 'Quanto General Contractors Devem Investir em Marketing?',
        metaDescription: 'Aprenda a definir o orçamento de marketing de uma empresa de construção usando o método de percentual da receita, o método por meta e o CAC alvo.',
        excerpt: 'Um framework prático para definir o orçamento de marketing de um general contractor, comparando o método de percentual da receita com uma abordagem por meta baseada no custo de aquisição de cliente.',
        category: 'Métricas de Marketing',
        primaryKeyword: 'quanto general contractors devem investir em marketing',
        secondaryKeywords: [
          'orçamento de marketing para contractors',
          'orçamento de marketing para empresa de construção',
          'quanto investir em Google Ads para contractors',
          'orçamento de anúncios para general contractors',
          'investimento em marketing para contractors',
          'percentual da receita em marketing',
          'CAC para general contractors',
        ],
        featuredImageAlt: 'Gráfico de alocação de orçamento de marketing para um general contractor',
        publishedDate: '2026-09-16',
        updatedDate: '2026-09-16',
        readingTime: 15,
        canonicalUrl: `${SITE_URL}/br/blog/quanto-general-contractors-devem-investir-em-marketing`,
        faq: [
          {
            question: 'Quanto um general contractor deve investir em marketing?',
            answer: 'Não existe um número universal. Um orçamento razoável depende do valor médio do projeto, da margem bruta, do ciclo de vendas, da taxa atual de conversão de lead para contrato e de quantos projetos assinados a mais o negócio quer por mês. Um cálculo por meta, usando o CAC alvo multiplicado pelos projetos assinados desejados, costuma dar um número mais preciso do que um percentual fixo da receita.',
          },
          {
            question: 'Qual percentual da receita contractors devem investir em marketing?',
            answer: 'Orientações gerais para pequenas empresas costumam citar uma faixa de aproximadamente 2% a 10% da receita, com negócios mais novos ou em crescimento mais acelerado próximos da faixa mais alta. Essa faixa não é específica de construção e não considera a economia de lead, então funciona melhor como uma checagem de fluxo de caixa do que como a forma principal de dimensionar o orçamento de marketing de um contractor.',
          },
          {
            question: 'Contractors devem usar percentual fixo ou orçamento por meta?',
            answer: 'Os dois têm um papel. Um orçamento por meta, construído a partir do CAC alvo e do número de projetos assinados desejados, dimensiona o investimento conforme os objetivos reais de crescimento e a economia de lead. Um percentual da receita é útil como teto de checagem, pra confirmar que o número da meta não ultrapassa o que o negócio consegue sustentar em fluxo de caixa. Depender de apenas um dos métodos pode tanto subfinanciar o crescimento quanto comprometer o caixa.',
          },
          {
            question: 'O tipo de projeto muda quanto um contractor deve investir?',
            answer: 'Sim. Negócios focados em pequenos reparos geralmente têm ciclos de venda mais curtos e valor médio de projeto menor do que negócios focados em adições, ADUs ou casas personalizadas. Projetos de maior valor e ciclo mais longo geralmente suportam um custo de aquisição por projeto assinado mais alto, mas só quando margem, taxa de fechamento e capacidade de execução sustentam isso.',
          },
          {
            question: 'O que conta como investimento em marketing e o que é custo fixo?',
            answer: 'O investimento variável em mídia inclui Google Ads, Local Services Ads e outras mídias pagas por clique ou por lead. Os custos fixos de marketing incluem software de CRM, call tracking, hospedagem e manutenção do site, produção de criativo e taxas de agência. Os dois entram num orçamento de marketing completo, mas se comportam de forma diferente: o custo fixo não cai automaticamente quando o volume de leads cai.',
          },
          {
            question: 'Quando um contractor deve aumentar o investimento em marketing?',
            answer: 'Sinais que sustentam aumentar o investimento incluem um CAC consistentemente abaixo da meta, capacidade disponível para assumir mais projetos e uma taxa de fechamento que não começou a cair conforme o volume de leads cresce. Aumentar o investimento sem capacidade disponível pra entregar os projetos adicionais pode criar problemas de execução e qualidade em vez de crescimento.',
          },
          {
            question: 'Quando um contractor deve reduzir ou pausar o investimento em marketing?',
            answer: 'Considere reduzir ou realocar o investimento quando o CAC estiver sustentadamente acima da meta, quando o negócio já estiver com a capacidade de projetos lotada, quando a qualidade dos leads tiver caído sem uma causa clara de conserto, ou quando o fluxo de caixa não sustentar o ritmo atual de investimento. Pausar o investimento tem efeito de atraso, já que o pipeline construído pelo investimento anterior costuma continuar convertendo por um tempo depois do corte.',
          },
          {
            question: 'Como contractors devem alocar o orçamento de marketing entre canais?',
            answer: 'Uma abordagem comum é concentrar o orçamento em um ou dois canais de alta intenção, como Google Search Ads ou Local Services Ads, antes de espalhar o investimento por muitos canais. Custos fixos como CRM e manutenção do site devem ser planejados separadamente do investimento variável em mídia, e o orçamento deve ser realocado pro canal que estiver gerando o menor custo por lead qualificado e projeto assinado, não simplesmente o menor custo por clique.',
          },
        ],
      },
    },
  },
  {
    id: 'contractor-website-essentials',
    status: 'published',
    featuredImage: '/images/blog/general-contractor-website-essentials.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'good-cost-per-lead-for-general-contractors',
      'follow-up-contractor-leads',
      'google-ads-for-general-contractors',
      'contractor-marketing-budget',
      'local-seo-general-contractors',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'what-every-general-contractor-website-should-include',
        path: '/blog/what-every-general-contractor-website-should-include',
        title: 'What Every General Contractor Website Should Include',
        seoTitle: 'What Every General Contractor Website Should Include',
        metaDescription: 'What a general contractor website needs to generate leads: service pages, service area pages, proof, contact paths, forms, site speed, structured data, and tracking.',
        excerpt: 'A practical checklist of the pages, proof, contact paths, and technical foundations a general contractor website needs to turn visitors into qualified estimate requests.',
        category: 'Website Optimization',
        primaryKeyword: 'general contractor website',
        secondaryKeywords: [
          'what every general contractor website should include',
          'contractor website checklist',
          'construction company website',
          'contractor website design',
          'general contractor website pages',
          'contractor website conversion',
          'contractor website SEO',
          'contractor landing page',
          'contractor website forms',
          'construction website structured data',
        ],
        featuredImageAlt: 'Checklist of the essential pages and elements on a general contractor website',
        publishedDate: '2026-09-16',
        updatedDate: '2026-09-16',
        readingTime: 16,
        canonicalUrl: `${SITE_URL}/blog/what-every-general-contractor-website-should-include`,
        faq: [
          {
            question: 'What should a general contractor website include?',
            answer: 'At a minimum: a clear statement of what the company builds and where, one page per core service, coverage of the service area, visible proof of past work and credentials, multiple contact paths including a tappable phone number, a short estimate request form, fast mobile performance, structured data identifying the business, and tracking that connects form submissions and calls back to their source. Anything beyond that list should earn its place by helping a homeowner decide or helping the business measure results.',
          },
          {
            question: 'How many pages does a contractor website need?',
            answer: 'There is no fixed number. A functional site generally needs a home page, one page per core service, an about page, a project gallery, a contact page, and enough service area coverage to match where the company actually works. A larger site is not automatically better: pages that exist only to add volume tend to compete with each other in search and add maintenance work without adding leads.',
          },
          {
            question: 'Should a contractor have a separate page for every service?',
            answer: 'Every service the company actively sells and wants to be found for generally deserves its own page. A single page listing ten services cannot rank well for any of them or speak specifically to the homeowner searching for one. Services the company rarely takes on, or takes on only as part of a larger project, can usually be covered inside a related page instead of getting a page of their own.',
          },
          {
            question: 'Should contractors create a page for every city they serve?',
            answer: 'Only for cities where the company genuinely works and can say something specific: local projects, permitting realities, typical property types, or a real presence. Pages generated by swapping a city name into an otherwise identical template add little value for a reader and risk being treated as thin, duplicated content. A smaller set of substantive location pages is usually more effective than a large set of interchangeable ones.',
          },
          {
            question: 'How many fields should a contractor contact form have?',
            answer: 'Fewer fields generally produce more submissions, while more fields generally produce better qualified submissions. The practical answer depends on which problem the business actually has. A contractor overwhelmed with unqualified inquiries benefits from adding qualifying fields such as project type, location, and timeline. A contractor with too few inquiries benefits from cutting the form down to name, phone, and a short description, then qualifying on the follow-up call.',
          },
          {
            question: 'Does website speed affect contractor lead generation?',
            answer: 'Yes, in two ways. Slower pages give visitors more opportunity to leave before the form or phone number is reachable, which lowers conversion rate and raises effective cost per lead on paid traffic. Page experience is also part of how Google evaluates pages. Google publishes Core Web Vitals thresholds for a good experience at the 75th percentile of page loads: 2.5 seconds or less for Largest Contentful Paint, 200 milliseconds or less for Interaction to Next Paint, and 0.1 or less for Cumulative Layout Shift.',
          },
          {
            question: 'Should a contractor website show prices?',
            answer: 'Showing exact prices is rarely practical for custom construction work, but showing nothing at all leaves homeowners to guess, which produces inquiries from people far outside the company\'s range. A middle path works for most contractors: publish typical project ranges, a starting project minimum, or the factors that move a price up or down. This filters out mismatched inquiries before they reach the sales process without committing to a number the company cannot honor.',
          },
          {
            question: 'What structured data should a contractor website use?',
            answer: 'Schema.org includes a GeneralContractor type, which sits under LocalBusiness through HomeAndConstructionBusiness, and is the natural fit for identifying the business itself. Beyond that, service pages can use Service markup, FAQ sections can use FAQPage markup, and articles can use BlogPosting markup. Structured data describes what is already on the page. It does not substitute for the content itself, and marking up claims that do not appear on the page can cause problems rather than help.',
          },
          {
            question: 'Do contractors need a blog on their website?',
            answer: 'A blog is not required, but content that answers the questions homeowners actually ask before hiring can support both search visibility and the sales conversation. The useful test is whether an article would help a real prospect decide. Publishing on a schedule with no clear reader in mind adds maintenance work without adding qualified traffic.',
          },
          {
            question: 'How do you know if a contractor website is working?',
            answer: 'Measure outcomes, not appearance. Track form submissions and calls by source, the share of inquiries that qualify, how many become booked estimates, and how many become signed projects. A site that produces plenty of inquiries that never qualify has a targeting or qualification problem, not a design problem. Without tracking that connects submissions back to their source, none of those questions can be answered.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'o-que-todo-site-de-general-contractor-deve-ter',
        path: '/br/blog/o-que-todo-site-de-general-contractor-deve-ter',
        title: 'O Que Todo Site de General Contractor Deve Ter',
        seoTitle: 'O Que Todo Site de General Contractor Deve Ter',
        metaDescription: 'O que o site de um general contractor precisa ter pra gerar leads: páginas de serviço, área de atuação, prova, formulários, velocidade, dados estruturados e rastreamento.',
        excerpt: 'Um checklist prático das páginas, provas, caminhos de contato e fundações técnicas que o site de um general contractor precisa ter pra transformar visitantes em pedidos de orçamento qualificados.',
        category: 'Otimização de Sites',
        primaryKeyword: 'site para general contractor',
        secondaryKeywords: [
          'o que todo site de contractor deve ter',
          'checklist de site para contractors',
          'site para empresa de construção',
          'design de site para contractors',
          'páginas de site para general contractors',
          'conversão em site de contractor',
          'SEO para site de contractor',
          'landing page para contractors',
          'formulário de site para contractors',
          'dados estruturados para empresa de construção',
        ],
        featuredImageAlt: 'Checklist das páginas e elementos essenciais de um site de general contractor',
        publishedDate: '2026-09-16',
        updatedDate: '2026-09-16',
        readingTime: 16,
        canonicalUrl: `${SITE_URL}/br/blog/o-que-todo-site-de-general-contractor-deve-ter`,
        faq: [
          {
            question: 'O que o site de um general contractor precisa ter?',
            answer: 'No mínimo: uma frase clara sobre o que a empresa constrói e onde, uma página por serviço principal, cobertura da área de atuação, prova visível de trabalhos anteriores e credenciais, vários caminhos de contato incluindo um telefone clicável, um formulário curto de pedido de orçamento, boa performance no celular, dados estruturados identificando o negócio e rastreamento que conecte formulários e ligações à sua origem. Qualquer coisa além dessa lista precisa justificar o espaço ajudando o homeowner a decidir ou ajudando o negócio a medir resultado.',
          },
          {
            question: 'Quantas páginas um site de contractor precisa ter?',
            answer: 'Não existe um número fixo. Um site funcional geralmente precisa de home, uma página por serviço principal, uma página sobre a empresa, uma galeria de projetos, uma página de contato e cobertura suficiente da área onde a empresa realmente trabalha. Site maior não é automaticamente melhor: páginas que existem só pra aumentar o volume tendem a competir entre si na busca e criam manutenção sem gerar lead.',
          },
          {
            question: 'Cada serviço precisa de uma página separada?',
            answer: 'Todo serviço que a empresa vende ativamente e quer ser encontrada geralmente merece a própria página. Uma única página listando dez serviços não consegue ranquear bem pra nenhum deles nem falar de forma específica com o homeowner que está procurando um. Serviços que a empresa raramente pega, ou pega só como parte de um projeto maior, normalmente podem ser cobertos dentro de uma página relacionada em vez de ganhar uma página própria.',
          },
          {
            question: 'Contractors devem criar uma página pra cada cidade que atendem?',
            answer: 'Só pra cidades onde a empresa realmente trabalha e tem algo específico a dizer: projetos locais, particularidades de licenciamento, tipos de imóvel comuns ou presença real. Páginas geradas trocando o nome da cidade num template idêntico agregam pouco pra quem lê e correm o risco de serem tratadas como conteúdo raso e duplicado. Um conjunto menor de páginas de localização com substância costuma funcionar melhor do que um conjunto grande de páginas intercambiáveis.',
          },
          {
            question: 'Quantos campos o formulário de contato deve ter?',
            answer: 'Menos campos geralmente geram mais envios, e mais campos geralmente geram envios mais qualificados. A resposta prática depende de qual problema o negócio realmente tem. Um contractor afogado em contatos desqualificados ganha adicionando campos de qualificação como tipo de projeto, localização e prazo. Um contractor com poucos contatos ganha reduzindo o formulário a nome, telefone e uma descrição curta, e qualificando na ligação de follow-up.',
          },
          {
            question: 'A velocidade do site afeta a geração de leads?',
            answer: 'Sim, de duas formas. Páginas mais lentas dão mais oportunidade pro visitante sair antes de chegar ao formulário ou ao telefone, o que reduz a taxa de conversão e aumenta o custo por lead efetivo no tráfego pago. A experiência de página também faz parte de como o Google avalia páginas. O Google publica limites de Core Web Vitals para uma boa experiência no percentil 75 dos carregamentos: 2,5 segundos ou menos para Largest Contentful Paint, 200 milissegundos ou menos para Interaction to Next Paint e 0,1 ou menos para Cumulative Layout Shift.',
          },
          {
            question: 'O site de um contractor deve mostrar preços?',
            answer: 'Mostrar preço exato raramente é viável em obra sob medida, mas não mostrar nada deixa o homeowner adivinhando, o que gera contatos de gente bem fora da faixa da empresa. Um caminho intermediário funciona pra maioria: publicar faixas típicas de projeto, um valor mínimo de projeto ou os fatores que empurram o preço pra cima e pra baixo. Isso filtra contatos incompatíveis antes de chegarem ao processo comercial, sem prender a empresa a um número que ela não consegue honrar.',
          },
          {
            question: 'Quais dados estruturados um site de contractor deve usar?',
            answer: 'O Schema.org tem um tipo GeneralContractor, que fica abaixo de LocalBusiness através de HomeAndConstructionBusiness, e é o encaixe natural pra identificar o próprio negócio. Além disso, páginas de serviço podem usar a marcação Service, seções de perguntas frequentes podem usar FAQPage e artigos podem usar BlogPosting. Dados estruturados descrevem o que já está na página. Eles não substituem o conteúdo, e marcar afirmações que não aparecem na página pode causar problema em vez de ajudar.',
          },
          {
            question: 'Contractors precisam de blog no site?',
            answer: 'Blog não é obrigatório, mas conteúdo que responde às perguntas que homeowners realmente fazem antes de contratar sustenta tanto a visibilidade na busca quanto a conversa comercial. O teste útil é se o artigo ajudaria um prospect real a decidir. Publicar numa cadência fixa sem um leitor claro em mente cria manutenção sem gerar tráfego qualificado.',
          },
          {
            question: 'Como saber se o site está funcionando?',
            answer: 'Meça resultado, não aparência. Acompanhe envios de formulário e ligações por origem, o percentual de contatos que qualifica, quantos viram orçamento agendado e quantos viram projeto assinado. Um site que gera muitos contatos que nunca qualificam tem um problema de segmentação ou de qualificação, não de design. Sem rastreamento conectando os envios à origem, nenhuma dessas perguntas pode ser respondida.',
          },
        ],
      },
    },
  },
  {
    id: 'qualified-contractor-leads',
    status: 'published',
    featuredImage: '/images/blog/qualified-contractor-leads.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'good-cost-per-lead-for-general-contractors',
      'follow-up-contractor-leads',
      'contractor-website-essentials',
      'best-google-ads-keywords-for-general-contractors',
      'contractor-leads-appointments',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'how-to-generate-qualified-contractor-leads',
        path: '/blog/how-to-generate-qualified-contractor-leads',
        title: 'How to Generate Qualified Contractor Leads',
        seoTitle: 'How to Generate Qualified Contractor Leads',
        metaDescription: 'How to generate qualified contractor leads: define qualification, filter before the click, qualify at the form and on the phone, and teach Google Ads which leads were worth having.',
        excerpt: 'A system for generating contractor leads that actually convert: how to define qualification, filter at every stage from targeting to phone call, and feed the result back so the platforms optimize for quality instead of volume.',
        category: 'Lead Generation',
        primaryKeyword: 'qualified contractor leads',
        secondaryKeywords: [
          'how to generate qualified contractor leads',
          'contractor lead generation',
          'construction lead generation',
          'lead qualification for contractors',
          'general contractor leads',
          'cost per qualified lead',
          'contractor lead quality',
          'local services ads pay per lead',
          'enhanced conversions for leads',
          'contractor lead qualification questions',
        ],
        featuredImageAlt: 'Qualification funnel narrowing all contractor inquiries down to qualified leads',
        publishedDate: '2026-10-07',
        updatedDate: '2026-10-07',
        readingTime: 15,
        canonicalUrl: `${SITE_URL}/blog/how-to-generate-qualified-contractor-leads`,
        faq: [
          {
            question: 'What is a qualified contractor lead?',
            answer: 'A qualified lead is an inquiry that passes every filter the business actually cares about: the work is something the company does and wants more of, the property sits inside the service area, the budget is within the range the company works in, the timeline is real rather than exploratory, and the person making contact can decide to hire. An inquiry missing any one of those is still a lead in a report, but it cannot become a project, which is why raw lead counts are a poor measure of a marketing program.',
          },
          {
            question: 'How do you generate more qualified contractor leads?',
            answer: 'Qualification happens at five points, not one. Targeting decides who ever sees the ad, ad copy and landing page decide who bothers to click and contact, the form decides what you learn before the call, the call decides whether the lead becomes a booked estimate, and the data you send back to the ad platform decides whether it finds more people like the ones who bought. Most contractors work only on the first point and wonder why lead volume rose while signed work did not.',
          },
          {
            question: 'Is it better to have fewer, better leads or more leads?',
            answer: 'It depends on where the bottleneck is. A company whose sales capacity is full should raise qualification and accept fewer inquiries, because every unqualified call displaces a real one. A company with idle estimators should widen intake first, since a lead that is never generated cannot be qualified. The decision belongs to whichever constraint is actually binding, and the only way to know is to measure qualification rate alongside lead volume.',
          },
          {
            question: 'What qualification questions should contractors ask?',
            answer: 'Five areas cover most of it: what specifically needs to be done, where the property is, when the homeowner wants work to start, what range they have in mind or whether they have budgeted at all, and who else is involved in the decision. Asking about budget directly makes many contractors uncomfortable, but offering a typical range for that kind of project and asking whether it sounds workable gets the same answer without an interrogation.',
          },
          {
            question: 'How do you measure contractor lead quality?',
            answer: 'Track qualification rate, which is the share of inquiries that pass your qualification criteria, and cost per qualified lead rather than cost per lead. Then carry both through to booked estimates and signed projects, by source. A channel with a high cost per lead and a high qualification rate can easily deliver cheaper signed work than a channel producing inexpensive inquiries that never qualify.',
          },
          {
            question: 'What is the difference between pay per click and pay per lead for contractors?',
            answer: 'With pay per click you are charged when someone clicks, whether or not they ever contact you, so the risk of a wasted click sits with you. With pay per lead you are charged when contact happens. Google describes its Local Services Ads model as paying only for valid, qualified leads such as phone calls, message leads, or bookings, rather than standard ad clicks. Neither model guarantees the lead is qualified by your own standards: a charged lead can still be outside your service area or outside your budget range.',
          },
          {
            question: 'Can you get a credit for a bad Local Services Ads lead?',
            answer: 'Google operates automated lead credits for Local Services Ads, where charged leads are reassessed and credits are generally applied to the account balance within 30 days. The feature is available in the United States and Canada, and excluded for health care verticals, tax specialists, and advertisers in EMEA. Google also lists situations that do not earn a credit, including a valid lead received outside business hours, a customer asking for advice, a canceled booking, someone researching projects or prices, and a lead who never responded to your return call or message.',
          },
          {
            question: 'Is Local Services Ads changing in 2026?',
            answer: 'Yes. Google has documented a transition of Local Services Ads into Performance Max campaigns with pay-per-lead goals, starting August 2026 for selected home and storefront service categories in the United States, expanding to service-area businesses and custom configurations in late 2026, and reaching non-United States accounts and remaining categories in 2027. The pay-per-lead billing model carries over, weekly budgets become daily average budgets, and manual bidding along with vertical-level target CPA is deprecated.',
          },
          {
            question: 'How do you tell Google Ads which leads were qualified?',
            answer: 'Google Ads supports lead-specific conversion goals including qualified lead, converted lead, book appointment, and request quote, and its documentation notes that using these goals activates invalid traffic protections built for lead generation. Enhanced conversions for leads then sends hashed first-party data back from your CRM so the qualified outcome is attributed to the ad interaction that produced it. Google advises choosing qualified lead or converted lead as the goal, picking a conversion action with at least 15 conversions in the last 30 days, and uploading data regularly, ideally daily.',
          },
          {
            question: 'How many service areas can a contractor list on Google Business Profile?',
            answer: 'Google Business Profile allows up to 20 service areas, defined by cities, postal codes, or other areas served, and advises that the overall boundary should not extend more than about two hours of driving time from where the business is based. Listing areas the company will not realistically travel to produces inquiries that cannot be served, which is unqualified volume created on purpose.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'como-gerar-leads-qualificados-para-contractors',
        path: '/br/blog/como-gerar-leads-qualificados-para-contractors',
        title: 'Como Gerar Leads Qualificados para Contractors',
        seoTitle: 'Como Gerar Leads Qualificados para Contractors',
        metaDescription: 'Como gerar leads qualificados para contractors: definir qualificação, filtrar antes do clique, qualificar no formulário e na ligação, e ensinar ao Google Ads quais leads valeram.',
        excerpt: 'Um sistema para gerar leads de contractor que de fato fecham: como definir qualificação, filtrar em cada etapa da segmentação à ligação, e devolver o resultado para as plataformas otimizarem por qualidade em vez de volume.',
        category: 'Geração de Leads',
        primaryKeyword: 'leads qualificados para contractors',
        secondaryKeywords: [
          'como gerar leads qualificados para contractors',
          'geração de leads para contractors',
          'geração de leads para construção',
          'qualificação de leads para contractors',
          'leads para general contractors',
          'custo por lead qualificado',
          'qualidade de lead para contractors',
          'local services ads pagamento por lead',
          'conversões aprimoradas para leads',
          'perguntas de qualificação de lead',
        ],
        featuredImageAlt: 'Funil de qualificação reduzindo todos os contatos até os leads qualificados',
        publishedDate: '2026-10-07',
        updatedDate: '2026-10-07',
        readingTime: 15,
        canonicalUrl: `${SITE_URL}/br/blog/como-gerar-leads-qualificados-para-contractors`,
        faq: [
          {
            question: 'O que é um lead qualificado para contractor?',
            answer: 'Lead qualificado é o contato que passa por todos os filtros que o negócio realmente leva em conta: o serviço é algo que a empresa faz e quer fazer mais, o imóvel está dentro da área de atuação, o orçamento está na faixa em que a empresa trabalha, o prazo é real e não exploratório, e quem procurou tem poder de decidir a contratação. Um contato que falha em qualquer um desses pontos continua sendo lead no relatório, mas não pode virar projeto. É por isso que contagem bruta de lead é uma medida ruim de programa de marketing.',
          },
          {
            question: 'Como gerar mais leads qualificados?',
            answer: 'A qualificação acontece em cinco pontos, não em um. A segmentação decide quem chega a ver o anúncio, o anúncio e a página decidem quem clica e entra em contato, o formulário decide o que você sabe antes da ligação, a ligação decide se o lead vira orçamento agendado, e o dado que você devolve à plataforma decide se ela vai buscar mais gente parecida com quem comprou. A maioria dos contractors trabalha só no primeiro ponto e depois estranha o volume de lead subir sem o volume de obra assinada subir.',
          },
          {
            question: 'É melhor ter menos leads bons ou mais leads?',
            answer: 'Depende de onde está o gargalo. Uma empresa com a capacidade comercial cheia deve subir a qualificação e aceitar menos contatos, porque cada ligação desqualificada ocupa o lugar de uma real. Uma empresa com orçamentista parado deve primeiro ampliar a entrada, já que lead que nunca foi gerado não tem como ser qualificado. A decisão pertence à restrição que está de fato travando, e o único jeito de saber é medir taxa de qualificação junto com volume de lead.',
          },
          {
            question: 'Quais perguntas de qualificação fazer?',
            answer: 'Cinco áreas cobrem quase tudo: o que exatamente precisa ser feito, onde está o imóvel, quando a pessoa quer começar, qual faixa de valor ela tem em mente ou se já orçou alguma coisa, e quem mais participa da decisão. Perguntar de orçamento direto incomoda muitos contractors, mas apresentar uma faixa típica para aquele tipo de projeto e perguntar se faz sentido traz a mesma resposta sem parecer interrogatório.',
          },
          {
            question: 'Como medir a qualidade do lead?',
            answer: 'Acompanhe a taxa de qualificação, que é o percentual de contatos que passam pelos seus critérios, e o custo por lead qualificado em vez do custo por lead. Depois leve os dois até orçamento agendado e projeto assinado, por origem. Um canal com custo por lead alto e taxa de qualificação alta pode entregar obra assinada mais barata do que um canal que produz contato baratinho que nunca qualifica.',
          },
          {
            question: 'Qual a diferença entre pagar por clique e pagar por lead?',
            answer: 'No pagamento por clique você é cobrado quando alguém clica, tenha entrado em contato ou não, então o risco do clique desperdiçado é seu. No pagamento por lead você é cobrado quando o contato acontece. O Google descreve o modelo do Local Services Ads como pagar apenas por leads válidos e qualificados, como ligações, mensagens ou agendamentos, em vez de cliques comuns. Nenhum dos dois modelos garante que o lead seja qualificado pelo seu critério: um lead cobrado pode estar fora da sua área ou fora da sua faixa de orçamento.',
          },
          {
            question: 'Dá para pedir crédito de um lead ruim no Local Services Ads?',
            answer: 'O Google opera créditos automáticos de lead no Local Services Ads, em que leads cobrados são reavaliados e o crédito costuma entrar no saldo da conta em até 30 dias. O recurso existe nos Estados Unidos e no Canadá, e está excluído para verticais de saúde, especialistas em impostos e anunciantes da região EMEA. O Google também lista situações que não geram crédito, entre elas lead válido recebido fora do horário de funcionamento, cliente pedindo orientação, agendamento cancelado, pessoa pesquisando projetos ou preços, e lead que nunca respondeu ao retorno da sua ligação ou mensagem.',
          },
          {
            question: 'O Local Services Ads vai mudar em 2026?',
            answer: 'Sim. O Google documentou a migração do Local Services Ads para campanhas Performance Max com meta de pagamento por lead, começando em agosto de 2026 para categorias selecionadas de serviços residenciais e de loja nos Estados Unidos, se estendendo a negócios com área de atuação e configurações personalizadas no fim de 2026, e chegando a contas fora dos Estados Unidos e às categorias restantes em 2027. O modelo de cobrança por lead continua, o orçamento semanal passa a ser orçamento diário médio, e o lance manual junto com o CPA alvo por vertical deixa de existir.',
          },
          {
            question: 'Como dizer ao Google Ads quais leads foram qualificados?',
            answer: 'O Google Ads tem metas de conversão específicas de geração de lead, incluindo lead qualificado, lead convertido, agendamento e pedido de orçamento, e a documentação dele registra que usar essas metas ativa proteções contra tráfego inválido feitas para geração de lead. As conversões aprimoradas para leads então devolvem dado primário com hash do seu CRM, para que o resultado qualificado seja atribuído à interação com o anúncio que o produziu. O Google orienta escolher lead qualificado ou lead convertido como meta, usar uma ação de conversão com pelo menos 15 conversões nos últimos 30 dias, e subir o dado com regularidade, de preferência diária.',
          },
          {
            question: 'Quantas áreas de atuação cabem no Perfil da Empresa no Google?',
            answer: 'O Perfil da Empresa no Google permite até 20 áreas de atuação, definidas por cidades, códigos postais ou outras áreas atendidas, e orienta que o limite geral não passe de cerca de duas horas de deslocamento a partir de onde o negócio fica. Listar área onde a empresa não vai realmente se deslocar produz contato que não pode ser atendido, ou seja, volume desqualificado criado de propósito.',
          },
        ],
      },
    },
  },
  {
    id: 'contractor-leads-appointments',
    status: 'published',
    featuredImage: '/images/blog/contractor-leads-appointments.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'qualified-contractor-leads',
      'follow-up-contractor-leads',
      'contractor-website-essentials',
      'good-cost-per-lead-for-general-contractors',
      'contractor-marketing-roi',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'why-contractor-leads-dont-turn-into-appointments',
        path: '/blog/why-contractor-leads-dont-turn-into-appointments',
        title: 'Why Contractor Leads Don\'t Turn Into Appointments',
        seoTitle: 'Why Contractor Leads Don\'t Turn Into Appointments',
        metaDescription: 'Why contractor leads never become booked appointments: invalid leads, leads you never reach, an ask that is too big, no way to book, untracked phone calls, and nothing written down.',
        excerpt: 'The lead to appointment stage is where most contractor funnels leak, and almost nobody measures it. Here are the seven places it breaks, how to tell which one is yours, and what to fix first.',
        category: 'CRM and Follow-Up',
        primaryKeyword: 'contractor leads not turning into appointments',
        secondaryKeywords: [
          'why contractor leads don\'t turn into appointments',
          'lead to appointment conversion rate',
          'contractor appointment setting',
          'book more estimates contractor',
          'contractor lead response time',
          'invalid leads google ads',
          'call tracking for contractors',
          'book appointment conversion goal',
          'contractor CRM lead stages',
          'contractor sales pipeline',
        ],
        featuredImageAlt: 'Funnel showing where contractor leads are lost between inquiry and booked appointment',
        publishedDate: '2026-10-14',
        updatedDate: '2026-10-14',
        readingTime: 14,
        canonicalUrl: `${SITE_URL}/blog/why-contractor-leads-dont-turn-into-appointments`,
        faq: [
          {
            question: 'Why do contractor leads never turn into appointments?',
            answer: 'Because lead to appointment is a stage with its own failure modes, and most contractors treat it as a single event instead. A lead can fail to become an appointment because it was never a real person, because nobody ever reached the homeowner, because another contractor answered first, because the only next step offered was a commitment the homeowner was not ready for, because there was no mechanism to book at all, because the call came in on a line nobody tracks, or because the outcome was never recorded and the lead simply went stale. Each of those has a different fix, which is why a single answer to the question is usually wrong.',
          },
          {
            question: 'What is a good lead to appointment rate for a contractor?',
            answer: 'There is no industry number worth trusting here, because the word lead means something different in every system it appears in. A channel that counts any inbound message and a paid search account that counts completed forms will produce lead to appointment rates that cannot be compared. The useful version is your own baseline, measured per source over a long enough period to be stable, and then watched for movement. A rate that drops while spend stays flat is the signal, not the absolute number.',
          },
          {
            question: 'How fast should a contractor respond to a new lead?',
            answer: 'Fast enough to be the first contractor the homeowner actually speaks to, which in practice means minutes rather than hours during working time. A homeowner requesting estimates usually contacts several companies at once, so response speed decides how many of these conversations happen at all rather than just when they happen. There is a measurement reason too: Google advises choosing a conversion action that happens within 7 days of the ad interaction for timely optimization, so a booked appointment that takes three weeks to arrange is a worse signal to report than the same appointment booked in two days.',
          },
          {
            question: 'How do I know whether my leads are fake?',
            answer: 'Google describes invalid leads as fake or low quality submissions from users or bots, including people who enter incorrect details such as fake email addresses or phone numbers. The tell is a cluster of leads where the phone number does not connect, the email bounces, and the name does not match anything. Google is explicit that its own filters do not prevent invalid leads on their own, since most traffic checks happen after the ad serves, and it recommends adding reCAPTCHA to forms, using double opt-in confirmation, and validating email domains and phone formats server side. Google calls lead quality a shared responsibility for this reason.',
          },
          {
            question: 'Why do people fill out a form and then not answer the phone?',
            answer: 'Usually because the call arrived later than the homeowner expected, from a number they do not recognize, at a time they cannot talk about a renovation. None of that means the lead was bad. It means the only channel attempted was the one with the highest chance of being ignored. A text message confirming the inquiry within a minute of submission, naming the company and the project, turns an unknown number into an expected call. The number of attempts and their spacing is the follow-up discipline covered separately.',
          },
          {
            question: 'Should the appointment be booked on the first call?',
            answer: 'Yes, whenever the lead qualifies, because every gap between the conversation and a date on the calendar is a chance for the homeowner to book someone else first. Ending a qualified call with a promise to send some times is the most common way a good lead becomes no appointment. If the person answering the phone cannot see the estimating calendar and commit to a slot, that is an operational problem dressed up as a marketing problem.',
          },
          {
            question: 'How do I track which phone calls turn into appointments?',
            answer: 'Google Ads phone call conversion tracking lets you set a minimum call length in seconds, and every call that lasts at least that long counts as a conversion, which filters out the short calls that were never going to contain a booking. That requires call reporting to be enabled so Google forwarding numbers are used. It is a proxy rather than a true appointment count, so the stronger version is to record the actual outcome of each call in the CRM and report booked appointments back from there.',
          },
          {
            question: 'What are AI-qualified call conversions?',
            answer: 'It is a Google Ads feature where calls are evaluated by AI rather than only by duration. Google states that if call recording is on, all calls will be recorded and evaluated by AI, and only qualified calls will count as conversions, with call duration used as a fallback signal when recording is not available. Google says the AI looks for signals of intent such as a customer inquiring about specific services, scheduling a consultation, or showing readiness to purchase. Call recording is currently only available when both the dialing and receiving phone numbers are located in the United States or Canada, and it stays off by default for health care and financial services businesses.',
          },
          {
            question: 'How do I tell Google Ads that an appointment was booked?',
            answer: 'Use a lead-specific conversion goal rather than a generic one. Google recommends goals such as qualified lead, converted lead, book appointment, or request quote, and notes that these automatically trigger invalid traffic protections built specifically for lead generation. Qualified lead tracks leads that were further qualified offline in your CRM, and converted lead tracks leads that completed a step you define in your lead conversion process. The two replaced the older imported leads goal. Enhanced conversions for leads is the mechanism that sends the offline outcome back from the CRM.',
          },
          {
            question: 'Is the problem my leads or my sales process?',
            answer: 'Separate the stage into two numbers and the answer appears. Contact rate is the share of leads you ever actually spoke with. Booking rate is the share of the leads you spoke with that agreed to an appointment. A low contact rate with a healthy booking rate is an operations problem: speed, channels, attempts. A healthy contact rate with a low booking rate is either a qualification problem upstream or a sales problem on the call. Reporting the two together as one lead to appointment number hides which of those you are actually looking at.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'por-que-leads-de-contractors-nao-viram-agendamentos',
        path: '/br/blog/por-que-leads-de-contractors-nao-viram-agendamentos',
        title: 'Por Que Leads de Contractors Não Viram Agendamentos',
        seoTitle: 'Por Que Leads de Contractors Não Viram Agendamentos',
        metaDescription: 'Por que lead de contractor não vira visita agendada: lead inválido, lead que você nunca alcançou, pedido grande demais, nenhuma forma de agendar, ligação sem rastreio e nada registrado.',
        excerpt: 'A etapa entre lead e agendamento é onde a maioria dos funis de contractor vaza, e quase ninguém mede. São sete pontos de quebra: veja como descobrir qual é o seu e o que consertar primeiro.',
        category: 'CRM e Follow-Up',
        primaryKeyword: 'lead de contractor que não vira agendamento',
        secondaryKeywords: [
          'por que leads de contractors não viram agendamentos',
          'taxa de conversão de lead para agendamento',
          'agendamento de visita para contractor',
          'agendar mais orçamentos',
          'tempo de resposta ao lead',
          'leads inválidos no google ads',
          'rastreamento de ligações para contractors',
          'meta de conversão de agendamento',
          'etapas de lead no CRM',
          'pipeline comercial para contractors',
        ],
        featuredImageAlt: 'Funil mostrando onde o lead de contractor se perde entre o contato e a visita agendada',
        publishedDate: '2026-10-14',
        updatedDate: '2026-10-14',
        readingTime: 14,
        canonicalUrl: `${SITE_URL}/br/blog/por-que-leads-de-contractors-nao-viram-agendamentos`,
        faq: [
          {
            question: 'Por que lead de contractor nunca vira agendamento?',
            answer: 'Porque lead para agendamento é uma etapa com modos de falha próprios, e a maioria dos contractors trata isso como um evento único. Um lead pode não virar agendamento porque nunca foi uma pessoa real, porque ninguém conseguiu falar com o homeowner, porque outro contractor atendeu primeiro, porque o único próximo passo oferecido era um compromisso para o qual a pessoa não estava pronta, porque não existia nenhuma forma de agendar, porque a ligação entrou numa linha que ninguém rastreia, ou porque o resultado nunca foi registrado e o lead simplesmente esfriou. Cada um desses tem conserto diferente, e é por isso que uma resposta única para a pergunta quase sempre erra.',
          },
          {
            question: 'Qual é uma boa taxa de lead para agendamento?',
            answer: 'Não existe número de mercado confiável aqui, porque a palavra lead significa coisa diferente em cada sistema onde ela aparece. Um canal que conta qualquer mensagem recebida e uma conta de busca paga que conta formulário completo produzem taxas que não podem ser comparadas. O que serve é a sua própria linha de base, medida por origem, num período longo o suficiente para ser estável, e depois observada no movimento. Taxa caindo com investimento parado é o sinal, não o número absoluto.',
          },
          {
            question: 'Em quanto tempo responder a um lead novo?',
            answer: 'Rápido o suficiente para ser o primeiro contractor com quem o homeowner de fato fala, o que na prática significa minutos e não horas dentro do horário de trabalho. Quem pede orçamento normalmente procura várias empresas ao mesmo tempo, então a velocidade decide quantas dessas conversas acontecem, não só quando acontecem. Existe também um motivo de medição: o Google orienta escolher uma ação de conversão que aconteça dentro de 7 dias da interação com o anúncio para otimização em tempo útil, então um agendamento que levou três semanas para ser marcado é um sinal pior de devolver do que o mesmo agendamento feito em dois dias.',
          },
          {
            question: 'Como saber se meus leads são falsos?',
            answer: 'O Google descreve lead inválido como envio falso ou de baixa qualidade feito por pessoas ou bots, incluindo quem preenche dados incorretos como e-mail ou telefone falso. O sinal é um grupo de leads em que o telefone não completa, o e-mail volta e o nome não corresponde a nada. O Google é explícito ao dizer que os filtros dele não evitam lead inválido sozinhos, já que a maior parte das checagens de tráfego acontece depois que o anúncio é exibido, e recomenda colocar reCAPTCHA no formulário, usar confirmação por duplo opt-in e validar domínio de e-mail e formato de telefone no servidor. É por isso que o Google chama qualidade de lead de responsabilidade compartilhada.',
          },
          {
            question: 'Por que a pessoa preenche o formulário e depois não atende?',
            answer: 'Normalmente porque a ligação chegou depois do que ela esperava, de um número que ela não reconhece, num horário em que não dá para falar de reforma. Nada disso quer dizer que o lead era ruim. Quer dizer que o único canal tentado foi o que tem a maior chance de ser ignorado. Uma mensagem de texto confirmando o contato em menos de um minuto, dizendo o nome da empresa e o projeto, transforma um número desconhecido em ligação esperada. Quantas tentativas fazer e com que espaçamento é a disciplina de follow-up, tratada em artigo próprio.',
          },
          {
            question: 'A visita deve ser agendada já na primeira ligação?',
            answer: 'Sim, sempre que o lead qualificar, porque todo intervalo entre a conversa e uma data na agenda é uma chance de a pessoa fechar com outro antes. Encerrar uma ligação qualificada prometendo mandar alguns horários é a forma mais comum de um lead bom virar nenhum agendamento. Se quem atende o telefone não consegue ver a agenda de orçamento e comprometer um horário, isso é problema de operação vestido de problema de marketing.',
          },
          {
            question: 'Como rastrear quais ligações viram agendamento?',
            answer: 'O rastreamento de conversão de ligação do Google Ads permite definir uma duração mínima em segundos, e toda ligação que dura pelo menos aquele tempo conta como conversão, o que filtra as ligações curtas que nunca iam conter um agendamento. Isso exige o relatório de chamadas ativo, para que os números de encaminhamento do Google sejam usados. É uma aproximação, não uma contagem real de agendamento, então a versão mais forte é registrar o resultado de cada ligação no CRM e devolver dali os agendamentos feitos.',
          },
          {
            question: 'O que são conversões de ligação qualificadas por IA?',
            answer: 'É um recurso do Google Ads em que as ligações são avaliadas por IA em vez de só pela duração. O Google afirma que, com a gravação de chamadas ativada, todas as ligações são gravadas e avaliadas por IA, e só as qualificadas contam como conversão, usando a duração como sinal alternativo quando a gravação não está disponível. O Google diz que a IA procura sinais de intenção, como o cliente perguntando por serviços específicos, agendando uma consulta ou demonstrando disposição de comprar. A gravação de chamadas hoje só está disponível quando o número que liga e o que recebe estão nos Estados Unidos ou no Canadá, e fica desativada por padrão para negócios de saúde e de serviços financeiros.',
          },
          {
            question: 'Como dizer ao Google Ads que o agendamento aconteceu?',
            answer: 'Use uma meta de conversão específica de geração de lead em vez de uma genérica. O Google recomenda metas como lead qualificado, lead convertido, agendamento ou pedido de orçamento, e registra que essas metas ativam automaticamente proteções contra tráfego inválido feitas especificamente para geração de lead. Lead qualificado acompanha lead que foi qualificado fora do Google Ads, no seu CRM, e lead convertido acompanha lead que completou uma etapa que você define no seu processo. As duas substituíram a antiga meta de leads importados. As conversões aprimoradas para leads são o mecanismo que devolve esse resultado do CRM.',
          },
          {
            question: 'O problema são meus leads ou meu comercial?',
            answer: 'Separe a etapa em dois números e a resposta aparece. Taxa de contato é o percentual de leads com quem você realmente falou. Taxa de agendamento é o percentual dos leads com quem você falou que aceitou marcar a visita. Taxa de contato baixa com taxa de agendamento saudável é problema de operação: velocidade, canais, tentativas. Taxa de contato saudável com taxa de agendamento baixa é problema de qualificação antes, ou problema comercial na ligação. Reportar os dois juntos como um número só de lead para agendamento esconde qual dos dois você está olhando.',
          },
        ],
      },
    },
  },
  {
    id: 'local-seo-general-contractors',
    status: 'published',
    featuredImage: '/images/blog/local-seo-general-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'contractor-website-essentials',
      'qualified-contractor-leads',
      'google-ads-vs-local-services-ads',
      'contractor-leads-appointments',
      'good-cost-per-lead-for-general-contractors',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'local-seo-general-contractors',
        path: '/blog/local-seo-general-contractors',
        title: 'Local SEO for General Contractors',
        seoTitle: 'Local SEO for General Contractors: A Practical Guide',
        metaDescription: 'How general contractors rank in Google Maps and local search: Google\'s three ranking factors, service areas, reviews, citations, and structured data.',
        excerpt: 'How to rank your construction company in Google Maps and local search results, using Google\'s own ranking factors, to generate organic leads in your service area.',
        category: 'Local SEO',
        primaryKeyword: 'local SEO for general contractors',
        secondaryKeywords: [
          'local SEO for contractors',
          'Google Business Profile for contractors',
          'construction company SEO',
          'general contractor SEO',
          'Google Maps ranking for contractors',
          'service area business Google',
          'contractor citations and reviews',
          'local search ranking factors',
          'SEO for home services businesses',
          'organic leads for contractors',
        ],
        featuredImageAlt: 'Local SEO ranking framework for a general contractor Business Profile',
        publishedDate: '2026-10-28',
        updatedDate: '2026-10-28',
        readingTime: 17,
        canonicalUrl: `${SITE_URL}/blog/local-seo-general-contractors`,
        faq: [
          {
            question: 'What is local SEO for a general contractor?',
            answer: 'Local SEO is the work of making a construction company visible and credible in Google Maps and in the local results that appear above the regular organic listings when someone searches for a contractor near them. For a general contractor, that mainly means a complete and accurate Google Business Profile, service pages that match the services and cities actually served, structured data that describes the business correctly, and a pattern of reviews and citations that signal the business is established and trusted in its area.',
          },
          {
            question: 'What are Google\'s three local ranking factors?',
            answer: 'Google states that local ranking depends on relevance, distance, and prominence. Relevance is how well a Business Profile matches what someone is searching for. Distance is how far the business is from the person searching, or from the area they specified. Prominence is how well known the business is, based on signals such as the quantity and quality of reviews and links from across the web. Google is explicit that there is no way to pay for a better local ranking.',
          },
          {
            question: 'How many service areas can a contractor set in their Google Business Profile?',
            answer: 'Google allows up to 20 service areas, defined by cities, postal codes, or other areas served. Google also states that the boundaries of the overall service area should not extend more than about two hours of driving time from where the business is based. Listing areas far outside a realistic driving radius works against relevance rather than for it.',
          },
          {
            question: 'Can a general contractor hide their business address on Google?',
            answer: 'Yes, and Google requires it in a specific case. For a service-area business that does not welcome customers to its own address, such as most general contractors who work at the client\'s property, Google\'s guidance is to remove the address and enter a service area instead. A contractor who does have a public office or showroom that customers visit keeps the address visible.',
          },
          {
            question: 'Is it against Google\'s policy to offer a discount in exchange for a review?',
            answer: 'Yes. Google\'s policy on incentivized and biased content prohibits offering payment, discounts, free goods, or any other benefit in exchange for posting, revising, or removing a review. Businesses found doing this can have reviews unpublished, lose the ability to receive new reviews for a period, or have a warning displayed on the profile. Asking satisfied customers to leave an honest review, with no incentive attached, is the compliant way to build review volume.',
          },
          {
            question: 'What structured data should a general contractor\'s website use?',
            answer: 'Google\'s structured data documentation requires a name and a complete address for LocalBusiness eligibility, and recommends adding opening hours, a telephone number, geographic coordinates, a price range, and a working URL. Google also advises using the most specific LocalBusiness subtype available rather than the generic one. Schema.org defines GeneralContractor as a subtype of HomeAndConstructionBusiness, which is the appropriate type for a construction company rather than a generic local business.',
          },
          {
            question: 'Should a contractor select many categories on their Google Business Profile?',
            answer: 'No. Google\'s own guidance recommends using as few categories as possible to describe the core of the business, and suggests testing each candidate category against the question "this business IS a," not "this business HAS a." A general contractor should choose the category that matches its primary trade first, and avoid adding categories purely as a way to rank for extra keywords.',
          },
          {
            question: 'How is local SEO different from Google Ads or Local Services Ads?',
            answer: 'Local SEO builds organic visibility in Maps and search results without a per-click or per-lead charge, but it takes time to build and cannot be turned on for an immediate spike in volume. Google Ads and Local Services Ads buy placement and leads immediately but stop producing results the moment spend stops. The two are not substitutes for each other. A contractor relying only on paid channels is renting visibility, while local SEO is closer to owning it, and the strongest programs run both at once.',
          },
          {
            question: 'What is NAP consistency and why does it matter for a contractor?',
            answer: 'NAP stands for name, address, and phone number. It refers to the practice of keeping those three details identical across the Google Business Profile, the website, and every other directory or citation where the business appears. This is general local SEO practice rather than a documented Google ranking rule, but it matters because mismatched details make it harder for Google, and for the homeowner reading the listing, to confirm that all the mentions of the business refer to the same, real company.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'seo-local-para-general-contractors',
        path: '/br/blog/seo-local-para-general-contractors',
        title: 'SEO Local para General Contractors',
        seoTitle: 'SEO Local para General Contractors: Guia Prático',
        metaDescription: 'Como general contractors aparecem no Google Maps e na busca local: os três fatores de ranqueamento do Google, área de atuação, avaliações, citações e dados estruturados.',
        excerpt: 'Como posicionar sua empresa de construção no Google Maps e nos resultados de busca local, usando os próprios fatores de ranqueamento do Google, para gerar leads orgânicos na sua área de atuação.',
        category: 'SEO Local',
        primaryKeyword: 'SEO local para general contractors',
        secondaryKeywords: [
          'SEO local para contractors',
          'Google Business Profile para contractors',
          'SEO para empresa de construção',
          'SEO para general contractor',
          'ranqueamento no Google Maps para contractors',
          'área de atuação no Google',
          'citações e avaliações para contractors',
          'fatores de ranqueamento local',
          'SEO para empresas de home services',
          'leads orgânicos para contractors',
        ],
        featuredImageAlt: 'Framework de SEO local para o Perfil da Empresa de um general contractor',
        publishedDate: '2026-10-28',
        updatedDate: '2026-10-28',
        readingTime: 17,
        canonicalUrl: `${SITE_URL}/br/blog/seo-local-para-general-contractors`,
        faq: [
          {
            question: 'O que é SEO local para um general contractor?',
            answer: 'SEO local é o trabalho de tornar uma empresa de construção visível e confiável no Google Maps e nos resultados locais que aparecem acima da lista orgânica comum quando alguém busca um contractor por perto. Para um general contractor, isso significa principalmente um Perfil da Empresa completo e correto no Google, páginas de serviço que correspondem de verdade aos serviços e cidades atendidas, dados estruturados que descrevem a empresa corretamente, e um padrão de avaliações e citações que mostra que a empresa é estabelecida e confiável na sua região.',
          },
          {
            question: 'Quais são os três fatores de ranqueamento local do Google?',
            answer: 'O Google afirma que o ranqueamento local depende de relevância, distância e proeminência. Relevância é o quanto um Perfil da Empresa corresponde ao que a pessoa está buscando. Distância é a distância entre a empresa e quem está buscando, ou a área que a pessoa indicou. Proeminência é o quão conhecida a empresa é, com base em sinais como a quantidade e a qualidade das avaliações e os links que apontam para ela pela web. O Google é explícito ao dizer que não existe forma de pagar por um ranqueamento local melhor.',
          },
          {
            question: 'Quantas áreas de atuação um contractor pode definir no Perfil da Empresa?',
            answer: 'O Google permite até 20 áreas de atuação, definidas por cidades, CEPs ou outras regiões atendidas. O Google também afirma que os limites da área de atuação no total não devem passar de cerca de duas horas de deslocamento de carro a partir de onde a empresa está baseada. Listar áreas muito além de um raio realista de deslocamento trabalha contra a relevância, não a favor dela.',
          },
          {
            question: 'Um general contractor pode esconder o endereço da empresa no Google?',
            answer: 'Sim, e o Google exige isso num caso específico. Para uma empresa de área de atuação que não recebe clientes no próprio endereço, como a maioria dos general contractors, que trabalham no imóvel do cliente, a orientação do Google é remover o endereço e informar uma área de atuação em vez dele. Um contractor que de fato tem um escritório ou showroom público visitado por clientes mantém o endereço visível.',
          },
          {
            question: 'É contra a política do Google oferecer desconto em troca de uma avaliação?',
            answer: 'Sim. A política do Google sobre conteúdo incentivado e tendencioso proíbe oferecer pagamento, desconto, produto gratuito ou qualquer outro benefício em troca de publicar, revisar ou remover uma avaliação. A empresa flagrada fazendo isso pode ter avaliações despublicadas, perder a capacidade de receber avaliações novas por um período, ou ter um aviso exibido no perfil. Pedir para o cliente satisfeito deixar uma avaliação honesta, sem nenhum incentivo associado, é a forma dentro da política de construir volume de avaliações.',
          },
          {
            question: 'Quais dados estruturados o site de um general contractor deve usar?',
            answer: 'A documentação de dados estruturados do Google exige nome e endereço completo para elegibilidade como LocalBusiness, e recomenda acrescentar horário de funcionamento, telefone, coordenadas geográficas, faixa de preço e uma URL funcional. O Google também orienta usar o subtipo de LocalBusiness mais específico disponível em vez do genérico. O schema.org define GeneralContractor como subtipo de HomeAndConstructionBusiness, que é o tipo correto para uma empresa de construção em vez de um negócio local genérico.',
          },
          {
            question: 'Um contractor deve selecionar muitas categorias no Perfil da Empresa?',
            answer: 'Não. A própria orientação do Google recomenda usar o menor número possível de categorias para descrever o núcleo do negócio, e sugere testar cada categoria candidata contra a pergunta "esta empresa É uma", não "esta empresa TEM uma". Um general contractor deve escolher primeiro a categoria que corresponde ao seu ofício principal, e evitar acrescentar categorias só como forma de ranquear para palavras-chave extras.',
          },
          {
            question: 'Qual a diferença entre SEO local e Google Ads ou Local Services Ads?',
            answer: 'SEO local constrói visibilidade orgânica no Maps e na busca sem cobrança por clique ou por lead, mas leva tempo para se construir e não pode ser ligado para gerar um pico imediato de volume. Google Ads e Local Services Ads compram posição e leads imediatamente, mas param de produzir resultado no momento em que o investimento para. Os dois não são substitutos um do outro. Um contractor que depende só de canal pago está alugando visibilidade, enquanto o SEO local está mais perto de ser dono dela, e os programas mais fortes rodam os dois ao mesmo tempo.',
          },
          {
            question: 'O que é consistência de NAP e por que importa para um contractor?',
            answer: 'NAP é a sigla em inglês para nome, endereço e telefone (name, address, phone). Refere-se à prática de manter esses três dados idênticos no Perfil da Empresa do Google, no site e em todo outro diretório ou citação em que a empresa aparece. Isso é prática geral de SEO local, não uma regra de ranqueamento documentada pelo Google, mas importa porque dados divergentes dificultam tanto para o Google quanto para o homeowner lendo o anúncio confirmar que todas as menções à empresa são da mesma empresa real.',
          },
        ],
      },
    },
  },
  {
    id: 'angi-leads-vs-google-ads-for-contractors',
    status: 'published',
    featuredImage: '/images/blog/angi-leads-vs-google-ads-for-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-for-general-contractors',
      'google-ads-vs-local-services-ads',
      'good-cost-per-lead-for-general-contractors',
      'qualified-contractor-leads',
      'local-seo-general-contractors',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'angi-leads-vs-google-ads-for-contractors',
        path: '/blog/angi-leads-vs-google-ads-for-contractors',
        title: 'Angi Leads vs Google Ads for Contractors',
        seoTitle: 'Angi Leads vs Google Ads for Contractors',
        metaDescription: 'Compare Angi Leads and Google Ads for general contractors: shared vs exclusive leads, pricing model, eligibility requirements, and which fits which business.',
        excerpt: 'A practical comparison of Angi Leads and Google Ads for general contractors, covering how leads are shared or kept exclusive, how each platform prices and qualifies a business, and which one fits a given stage of growth.',
        category: 'Google Ads',
        primaryKeyword: 'Angi Leads vs Google Ads for contractors',
        secondaryKeywords: [
          'Angi Leads for contractors',
          'Angi vs Google Ads',
          'is Angi Leads worth it for contractors',
          'Angi Approved vs Google Guaranteed',
          'Local Services Ads vs Angi Leads',
          'shared leads vs exclusive leads contractors',
          'general contractor lead generation platforms',
          'Angi Ads for contractors',
          'contractor marketing platform comparison',
          'where should contractors generate leads',
        ],
        featuredImageAlt: 'Comparison of a shared lead on Angi Leads versus an exclusive lead on Google Ads for a general contractor',
        publishedDate: '2026-11-04',
        updatedDate: '2026-11-04',
        readingTime: 15,
        canonicalUrl: `${SITE_URL}/blog/angi-leads-vs-google-ads-for-contractors`,
        faq: [
          {
            question: 'What is the main difference between Angi Leads and Google Ads?',
            answer: 'Angi Leads is a marketplace: a homeowner submits one service request and Angi matches it to multiple contractors at the same time, each of whom pays a fee for that same lead. Google Ads is a campaign the contractor builds and runs directly, either a traditional Search campaign paid per click on chosen keywords, or, since Local Services Ads folded into Google Ads in 2026, a Performance Max campaign built around a pay-per-lead goal. The core difference is who controls the campaign and whether the lead is shared with competitors.',
          },
          {
            question: 'Are Angi Leads shared with other contractors?',
            answer: 'Yes. Angi\'s own help center for professionals states that a completed service request is used to "connect customers with multiple Angi Leads service professionals that can best complete their project." The same homeowner inquiry can reach several competing contractors at once, and each one is charged the lead fee regardless of whether they win the job.',
          },
          {
            question: 'How much does Angi Leads cost?',
            answer: 'Angi does not publish a fixed price list. Its own FAQ for professionals states that contractors "pay a nominal fee for each lead you match to," and that "different sized jobs have different Lead Fees," directing contractors to contact sales for current rates. Angi also states explicitly that it makes no guarantee about lead volume.',
          },
          {
            question: 'What is Angi Ads, and is it the same as Angi Leads?',
            answer: 'No. Angi Ads and Angi Leads are two different programs on the same platform. Angi Ads is paid placement: a business that has at least one review, maintains an average rating of 3 stars or higher, passes a background check on its owner, principal, or manager, and holds valid licenses can become "Angi Approved" and pay to be listed above non-approved businesses in search results. Angi Leads is the request-matching program described above. A contractor can run one, both, or neither.',
          },
          {
            question: 'Does Google Ads require a background check like Angi?',
            answer: 'It depends on which part of Google Ads. A traditional Search campaign, where a contractor bids on keywords, does not require a trade license or background check to launch, only standard identity verification under Google\'s general advertiser policies. Local Services, now managed inside Google Ads as a Performance Max lead goal, does require a background check and license verification for home improvement categories before a business can earn the Google Guaranteed badge, though Google has recently removed the need to submit a license document upfront for many North American categories at initial qualification while the license itself is still required.',
          },
          {
            question: 'What happened to Local Services Ads in 2026?',
            answer: 'Google began migrating Local Services Ads out of its own standalone dashboard and into Google Ads, where it now runs as a Performance Max campaign built around a pay-per-lead goal. According to Google Ads Help, the rollout started in August 2026 for selected home and storefront service categories in the United States, expands to more advertiser groups through late 2026, and reaches non-US accounts in 2027. Ads still appear on Google Search and Google Maps in the same positions, and the business still pays only for valid leads such as calls and messages, not for clicks.',
          },
          {
            question: 'Can a contractor run Angi Leads and Google Ads at the same time?',
            answer: 'Yes, and many established local service businesses run more than one lead source at once rather than choosing a single channel. The requirement for doing this profitably is tracking every lead back to its source in the CRM and comparing cost per qualified lead and signed revenue separately by channel, since a shared marketplace lead and an exclusive search lead are not the same unit of value and should never be averaged together.',
          },
          {
            question: 'Is Angi Leads a good fit for a new contractor with few reviews?',
            answer: 'It can be, because Angi\'s matching does not require the volume of reviews or search history that often helps on Google. The tradeoff is that the same lead is being pitched to competitors at the same time, so the real comparison is not the lead fee but the cost per signed project once the win rate on shared leads is factored in. A contractor still building its review base may use Angi Leads for initial volume while building toward Google Guaranteed eligibility and local SEO at the same time.',
          },
          {
            question: 'Which platform gives a contractor more control over targeting?',
            answer: 'Google Ads gives more direct control. A Search campaign lets a contractor choose keywords, locations, budget, and ad copy, and the Local Services lead-goal campaign lets a contractor set service categories, service areas, and a target cost per lead inside Google Ads. Angi Leads lets a contractor set the type of work and the geography served, but has no bidding mechanism and no control over how many other contractors are matched to the same request.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'angi-leads-vs-google-ads-para-contractors',
        path: '/br/blog/angi-leads-vs-google-ads-para-contractors',
        title: 'Angi Leads vs Google Ads para Contractors',
        seoTitle: 'Angi Leads vs Google Ads para Contractors',
        metaDescription: 'Compare Angi Leads e Google Ads para general contractors: lead compartilhado ou exclusivo, modelo de cobrança, exigências de elegibilidade e qual se encaixa em qual negócio.',
        excerpt: 'Uma comparação prática entre Angi Leads e Google Ads para general contractors, mostrando como cada plataforma compartilha ou reserva o lead, como cobra e qualifica a empresa, e qual se encaixa melhor em cada estágio de crescimento.',
        category: 'Google Ads',
        primaryKeyword: 'Angi Leads vs Google Ads para contractors',
        secondaryKeywords: [
          'Angi Leads para contractors',
          'Angi vs Google Ads',
          'Angi Leads vale a pena para contractors',
          'Angi Approved vs Google Guaranteed',
          'Local Services Ads vs Angi Leads',
          'lead compartilhado vs lead exclusivo',
          'plataformas de geração de leads para contractors',
          'Angi Ads para contractors',
          'comparação de plataformas de marketing para contractors',
          'onde um contractor deve gerar leads',
        ],
        featuredImageAlt: 'Comparação entre um lead compartilhado no Angi Leads e um lead exclusivo no Google Ads para um general contractor',
        publishedDate: '2026-11-04',
        updatedDate: '2026-11-04',
        readingTime: 15,
        canonicalUrl: `${SITE_URL}/br/blog/angi-leads-vs-google-ads-para-contractors`,
        faq: [
          {
            question: 'Qual é a principal diferença entre Angi Leads e Google Ads?',
            answer: 'O Angi Leads é um marketplace: o homeowner envia uma solicitação de serviço e o Angi encaminha essa mesma solicitação para vários contractors ao mesmo tempo, e cada um deles paga uma taxa por esse lead. O Google Ads é uma campanha que o próprio contractor monta e administra, seja uma campanha de Search tradicional cobrada por clique em palavras-chave escolhidas por ele, seja, desde que o Local Services Ads passou a fazer parte do Google Ads em 2026, uma campanha Performance Max construída em torno de uma meta de pagamento por lead. A diferença central é quem controla a campanha e se o lead é compartilhado com concorrentes.',
          },
          {
            question: 'Os leads do Angi Leads são compartilhados com outros contractors?',
            answer: 'Sim. A própria central de ajuda do Angi para profissionais afirma que uma solicitação de serviço completa é usada para "conectar clientes com múltiplos profissionais do Angi Leads que possam concluir o projeto" (tradução livre). A mesma solicitação de um homeowner pode chegar a vários contractors concorrentes ao mesmo tempo, e cada um é cobrado pela taxa do lead, independentemente de ganhar o projeto ou não.',
          },
          {
            question: 'Quanto custa o Angi Leads?',
            answer: 'O Angi não publica uma tabela de preços fixa. A própria FAQ para profissionais afirma que o contractor "paga uma taxa nominal por cada lead correspondido" e que "projetos de tamanhos diferentes têm taxas de lead diferentes", direcionando o contractor a entrar em contato com o time de vendas para valores atuais. O Angi também afirma explicitamente que não garante volume de leads.',
          },
          {
            question: 'O que é o Angi Ads, e é a mesma coisa que o Angi Leads?',
            answer: 'Não. Angi Ads e Angi Leads são dois programas diferentes dentro da mesma plataforma. O Angi Ads é posicionamento pago: uma empresa com pelo menos uma avaliação, nota média de 3 estrelas ou mais, aprovação em verificação de antecedentes do proprietário, sócio-administrador ou gerente, e licenças válidas pode se tornar "Angi Approved" e pagar para aparecer listada acima das empresas não aprovadas nos resultados de busca. O Angi Leads é o programa de correspondência de solicitações descrito acima. Um contractor pode usar um, os dois, ou nenhum.',
          },
          {
            question: 'O Google Ads exige verificação de antecedentes como o Angi?',
            answer: 'Depende de qual parte do Google Ads. Uma campanha de Search tradicional, em que o contractor dá lances em palavras-chave, não exige licença do ofício nem verificação de antecedentes para começar, só a verificação de identidade padrão das políticas gerais de anunciante do Google. O Local Services, hoje administrado dentro do Google Ads como uma meta de lead do Performance Max, exige verificação de antecedentes e de licença nas categorias de home improvement antes de a empresa receber o selo Google Guaranteed, embora o Google tenha removido recentemente a exigência de enviar o documento da licença de início em muitas categorias norte-americanas na qualificação inicial, mesmo que a licença em si continue sendo exigida.',
          },
          {
            question: 'O que aconteceu com o Local Services Ads em 2026?',
            answer: 'O Google começou a migrar o Local Services Ads do seu próprio painel independente para dentro do Google Ads, onde agora roda como uma campanha Performance Max construída em torno de uma meta de pagamento por lead. Segundo a Central de Ajuda do Google Ads, a migração começou em agosto de 2026 para categorias selecionadas de serviços residenciais e com loja física nos Estados Unidos, se expande para mais grupos de anunciantes até o fim de 2026, e chega às contas fora dos EUA em 2027. Os anúncios continuam aparecendo no Google Search e no Google Maps nas mesmas posições, e a empresa continua pagando só por leads válidos, como ligações e mensagens, não por clique.',
          },
          {
            question: 'Um contractor pode usar Angi Leads e Google Ads ao mesmo tempo?',
            answer: 'Sim, e muitas empresas de serviço local já estabelecidas rodam mais de uma origem de lead ao mesmo tempo, em vez de escolher um único canal. O requisito para fazer isso de forma lucrativa é rastrear todo lead até sua origem no CRM e comparar o custo por lead qualificado e a receita assinada separadamente por canal, porque um lead compartilhado de marketplace e um lead exclusivo de busca não têm o mesmo valor por unidade e nunca deveriam ser misturados numa média só.',
          },
          {
            question: 'O Angi Leads é uma boa opção para um contractor novo, com poucas avaliações?',
            answer: 'Pode ser, porque a correspondência do Angi não exige o volume de avaliações ou de histórico de busca que costuma ajudar no Google. O lado negativo é que o mesmo lead está sendo oferecido a concorrentes ao mesmo tempo, então a comparação real não é a taxa do lead, e sim o custo por projeto assinado depois de considerar a taxa de fechamento em leads compartilhados. Um contractor que ainda está construindo sua base de avaliações pode usar o Angi Leads para gerar volume inicial enquanto constrói elegibilidade para o Google Guaranteed e para o SEO local ao mesmo tempo.',
          },
          {
            question: 'Qual plataforma dá mais controle de segmentação ao contractor?',
            answer: 'O Google Ads dá controle mais direto. Uma campanha de Search permite escolher palavras-chave, localização, orçamento e o texto do anúncio, e a campanha de meta de lead do Local Services permite definir categorias de serviço, área de atuação e um custo-alvo por lead dentro do próprio Google Ads. O Angi Leads permite definir o tipo de trabalho e a área geográfica atendida, mas não tem mecanismo de lance e não dá controle sobre quantos outros contractors são correspondidos à mesma solicitação.',
          },
        ],
      },
    },
  },
  {
    id: 'choosing-a-marketing-agency-for-contractors',
    status: 'published',
    featuredImage: '/images/blog/choosing-a-marketing-agency-for-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'contractor-marketing-budget',
      'contractor-marketing-roi',
      'good-cost-per-lead-for-general-contractors',
      'qualified-contractor-leads',
      'angi-leads-vs-google-ads-for-contractors',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'choosing-a-marketing-agency-for-contractors',
        path: '/blog/choosing-a-marketing-agency-for-contractors',
        title: 'How to Choose a Marketing Agency for Your Construction Company',
        seoTitle: 'How to Choose a Marketing Agency for Your Construction Company',
        metaDescription: 'A practical framework for evaluating a marketing agency for a general contracting business, covering pricing models, account ownership, contract terms, and red flags.',
        excerpt: 'How to evaluate a marketing agency for a general contracting business, from pricing models and account ownership to contract terms, red flags, and the questions worth asking before signing.',
        category: 'Contractor Growth',
        primaryKeyword: 'how to choose a marketing agency for general contractors',
        secondaryKeywords: [
          'marketing agency for general contractors',
          'contractor marketing agency',
          'hiring a marketing agency for a construction company',
          'questions to ask a marketing agency',
          'construction marketing agency pricing',
          'in-house marketer vs marketing agency',
          'signs a marketing agency is not working',
          'contractor marketing agency contract',
          'best marketing agency for contractors',
          'marketing agency red flags for contractors',
        ],
        featuredImageAlt: 'Checklist for evaluating a marketing agency for a general contracting business',
        publishedDate: '2026-11-11',
        updatedDate: '2026-11-11',
        readingTime: 17,
        canonicalUrl: `${SITE_URL}/blog/choosing-a-marketing-agency-for-contractors`,
        faq: [
          {
            question: 'How much does a marketing agency cost for a general contractor?',
            answer: 'There is no single market rate. Agencies price contractor marketing work through flat monthly retainers, a percentage of ad spend, performance-based fees tied to leads or appointments, or a one-time project fee for a specific deliverable such as a website. The right question is not what an agency charges in isolation, but what it charges relative to the signed revenue and customer acquisition cost it produces, which can only be evaluated after a full sales cycle of real campaign data.',
          },
          {
            question: 'Should a general contractor hire an agency or build an in-house marketing team?',
            answer: 'It depends on budget, growth stage, and how much marketing work needs to happen at once. An agency typically brings broader platform expertise and faster setup across multiple channels without a full-time salary commitment. An in-house marketer offers more day-to-day availability and institutional knowledge of the business, but usually covers fewer specialties and creates a single point of failure if that person leaves. Many established contractors run a hybrid model: an in-house coordinator who manages CRM and content, paired with an agency for paid media and technical SEO.',
          },
          {
            question: 'What should be included in a contractor marketing agency service package?',
            answer: 'A complete package typically includes campaign management for the channels in scope, such as Google Ads or local SEO, a maintained and conversion-focused website, call tracking and lead tracking setup, monthly reporting tied to leads and signed revenue rather than only clicks and impressions, and a defined point of contact. Services like content writing, review management, and CRM configuration are common additions, but not every agency includes them by default, so scope should be confirmed in writing before signing.',
          },
          {
            question: 'Who should own the Google Ads account and the website, the contractor or the agency?',
            answer: 'The contractor should own the Google Ads account, the Google Business Profile, the website domain and hosting, and the analytics property, regardless of which agency manages them day to day. Google Ads supports manager account access specifically so an agency can run campaigns without owning the underlying account. An agency that insists on owning these assets in its own name creates a lock-in risk: switching agencies later can mean losing campaign history, website control, or the business listing itself.',
          },
          {
            question: 'How long should a contractor wait before judging a new marketing agency?',
            answer: 'Long enough to cover a full sales cycle for the services being marketed, not just the first invoice. Paid campaigns typically need four to eight weeks before lead volume and quality stabilize, and the contractor needs additional time after that to move leads through appointments, estimates, and signed contracts. Judging an agency on raw lead count after two weeks, before any of those leads have had time to become a signed project, usually produces the wrong conclusion in either direction.',
          },
          {
            question: 'What are the biggest red flags when evaluating a contractor marketing agency?',
            answer: 'Common red flags include refusing to let the contractor own the ad account, website, or Google Business Profile; reporting only on clicks and impressions instead of leads and signed revenue; guaranteeing a specific number of leads or a first-page ranking, which no legitimate agency can promise; requiring a long-term contract with no visible results to point to; and being unable to produce a reference client willing to speak directly about results.',
          },
          {
            question: 'Should a contractor sign a long-term contract with a marketing agency?',
            answer: 'A short initial term, generally three to six months, gives both sides enough time to evaluate results across a real sales cycle without locking the business into a full year before any data exists. Longer terms can make sense once the relationship is established and producing measurable signed revenue, but a brand-new agency relationship with a twelve-month minimum and no easy exit clause shifts risk heavily toward the contractor.',
          },
          {
            question: 'What questions should a contractor ask before hiring a marketing agency?',
            answer: 'Useful questions include which specific services are included in the fee, who owns the ad accounts and website after the engagement ends, how leads are tracked and reported, whether reporting ties back to signed revenue or only to clicks and impressions, what the minimum contract term and cancellation notice are, whether the agency has direct experience with general contractors or construction companies, and whether a current client in a similar trade is willing to serve as a reference.',
          },
          {
            question: 'What is the difference between a contractor-specific agency and a general marketing agency?',
            answer: 'A contractor-specific agency usually understands service-area targeting, licensing and permit language, seasonal demand patterns, and the long sales cycles typical of construction projects without needing to be educated on the industry first. A general marketing agency may bring broader creative resources or platform certifications, but often needs a longer ramp-up period to understand how a construction business actually sells. Neither type is automatically better; the relevant question is whether the agency can show results with businesses that sell the way a general contractor sells.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'como-escolher-uma-agencia-de-marketing-para-general-contractors',
        path: '/br/blog/como-escolher-uma-agencia-de-marketing-para-general-contractors',
        title: 'Como Escolher uma Agência de Marketing para General Contractors',
        seoTitle: 'Como Escolher uma Agência de Marketing para General Contractors',
        metaDescription: 'Um framework prático para avaliar uma agência de marketing para general contractors, cobrindo modelos de cobrança, propriedade das contas, termos de contrato e sinais de alerta.',
        excerpt: 'Como avaliar uma agência de marketing para general contractors, dos modelos de cobrança e propriedade das contas aos termos de contrato, sinais de alerta e perguntas que vale fazer antes de assinar.',
        category: 'Crescimento para Contractors',
        primaryKeyword: 'como escolher uma agência de marketing para general contractors',
        secondaryKeywords: [
          'agência de marketing para general contractors',
          'agência de marketing para contractors',
          'contratar agência de marketing para construtora',
          'perguntas para fazer a uma agência de marketing',
          'preço de agência de marketing para construção',
          'marketing interno vs agência de marketing',
          'sinais de que a agência de marketing não está funcionando',
          'contrato com agência de marketing para contractors',
          'melhor agência de marketing para contractors',
          'sinais de alerta de agência de marketing',
        ],
        featuredImageAlt: 'Checklist para avaliar uma agência de marketing para general contractors',
        publishedDate: '2026-11-11',
        updatedDate: '2026-11-11',
        readingTime: 17,
        canonicalUrl: `${SITE_URL}/br/blog/como-escolher-uma-agencia-de-marketing-para-general-contractors`,
        faq: [
          {
            question: 'Quanto custa uma agência de marketing para um general contractor?',
            answer: 'Não existe uma tarifa única de mercado. Agências cobram o trabalho de marketing para contractors por retainer mensal fixo, por percentual do investimento em anúncios, por taxa de performance ligada a leads ou agendamentos, ou por projeto fechado para uma entrega específica como um site. A pergunta certa não é quanto a agência cobra isoladamente, e sim quanto ela cobra em relação à receita assinada e ao custo de aquisição que ela gera, o que só pode ser avaliado depois de um ciclo de vendas completo com dados reais de campanha.',
          },
          {
            question: 'O general contractor deve contratar uma agência ou montar um time interno de marketing?',
            answer: 'Depende do orçamento, do estágio de crescimento do negócio e de quanto trabalho de marketing precisa acontecer de uma vez. Uma agência costuma trazer conhecimento mais amplo de plataforma e configuração mais rápida em vários canais, sem o compromisso de um salário em tempo integral. Um marketeiro interno oferece mais disponibilidade no dia a dia e conhecimento institucional do negócio, mas geralmente cobre menos especialidades e cria um ponto único de falha se essa pessoa sair. Muitos contractors já estabelecidos rodam um modelo híbrido: um coordenador interno que administra CRM e conteúdo, junto com uma agência para mídia paga e SEO técnico.',
          },
          {
            question: 'O que deveria estar incluso no pacote de serviços de uma agência de marketing para contractors?',
            answer: 'Um pacote completo normalmente inclui gestão de campanha para os canais contratados, como Google Ads ou SEO local, um site mantido e focado em conversão, configuração de call tracking e rastreamento de leads, relatório mensal ligado a leads e receita assinada, não só a cliques e impressões, e um ponto de contato definido. Serviços como redação de conteúdo, gestão de avaliações e configuração de CRM são adições comuns, mas nem toda agência os inclui por padrão, então o escopo deve ser confirmado por escrito antes de assinar.',
          },
          {
            question: 'Quem deve ser o proprietário da conta do Google Ads e do site, o contractor ou a agência?',
            answer: 'O contractor deve ser o proprietário da conta do Google Ads, do Google Business Profile, do domínio e da hospedagem do site, e da propriedade de analytics, independentemente de qual agência administra isso no dia a dia. O próprio Google Ads tem acesso por conta de gerenciamento justamente para que uma agência administre campanhas sem ser a proprietária da conta subjacente. Uma agência que insiste em ser a proprietária desses ativos em nome próprio cria um risco de aprisionamento: trocar de agência depois pode significar perder o histórico de campanha, o controle do site, ou a própria ficha do negócio.',
          },
          {
            question: 'Quanto tempo o contractor deve esperar antes de avaliar uma nova agência de marketing?',
            answer: 'Tempo suficiente para cobrir um ciclo de vendas completo dos serviços anunciados, não só a primeira fatura. Campanhas pagas geralmente precisam de quatro a oito semanas para o volume e a qualidade dos leads se estabilizarem, e o contractor precisa de tempo adicional depois disso para mover esses leads por agendamentos, estimates e contratos assinados. Avaliar uma agência pelo número bruto de leads depois de duas semanas, antes de qualquer um desses leads ter tido tempo de se tornar um projeto assinado, costuma produzir a conclusão errada nos dois sentidos.',
          },
          {
            question: 'Quais são os maiores sinais de alerta ao avaliar uma agência de marketing para contractors?',
            answer: 'Sinais de alerta comuns incluem recusar deixar o contractor ser o proprietário da conta de anúncios, do site ou do Google Business Profile; reportar só cliques e impressões em vez de leads e receita assinada; garantir um número específico de leads ou uma posição de primeira página, o que nenhuma agência legítima pode prometer; exigir um contrato de longo prazo sem nenhum resultado visível para apontar; e não conseguir apresentar um cliente de referência disposto a falar diretamente sobre os resultados.',
          },
          {
            question: 'O contractor deve assinar um contrato de longo prazo com uma agência de marketing?',
            answer: 'Um prazo inicial curto, geralmente de três a seis meses, dá tempo suficiente para os dois lados avaliarem resultados ao longo de um ciclo de vendas real sem travar o negócio num ano inteiro antes de existir qualquer dado. Prazos mais longos podem fazer sentido depois que a relação está estabelecida e produzindo receita assinada mensurável, mas uma relação nova de agência com mínimo de doze meses e sem cláusula de saída fácil desloca o risco fortemente para o lado do contractor.',
          },
          {
            question: 'Que perguntas o contractor deve fazer antes de contratar uma agência de marketing?',
            answer: 'Perguntas úteis incluem quais serviços específicos estão incluídos na taxa, quem é o proprietário das contas de anúncio e do site depois que o contrato terminar, como os leads são rastreados e reportados, se o relatório se conecta à receita assinada ou só a cliques e impressões, quais são o prazo mínimo de contrato e o aviso de cancelamento, se a agência tem experiência direta com general contractors ou empresas de construção, e se um cliente atual de um ramo parecido está disposto a servir de referência.',
          },
          {
            question: 'Qual é a diferença entre uma agência especializada em contractors e uma agência de marketing generalista?',
            answer: 'Uma agência especializada em contractors geralmente já entende segmentação por área de atuação, linguagem de licenciamento e permit, padrões sazonais de demanda e os ciclos de venda longos típicos de projetos de construção, sem precisar ser educada sobre o setor primeiro. Uma agência generalista pode trazer recursos criativos mais amplos ou certificações de plataforma, mas costuma precisar de um período de adaptação mais longo para entender como um negócio de construção de fato vende. Nenhum dos dois tipos é automaticamente melhor; a pergunta relevante é se a agência consegue mostrar resultados com negócios que vendem do jeito que um general contractor vende.',
          },
        ],
      },
    },
  },
  {
    id: 'google-ads-budget-for-general-contractors',
    status: 'published',
    featuredImage: '/images/blog/google-ads-budget-for-general-contractors.svg',
    relatedArticleIds: [
      'general-contractor-marketing-guide',
      'google-ads-for-general-contractors',
      'contractor-marketing-budget',
      'good-cost-per-lead-for-general-contractors',
      'best-google-ads-keywords-for-general-contractors',
      'google-ads-vs-local-services-ads',
    ],
    translations: {
      'en-US': {
        locale: 'en-US',
        slug: 'google-ads-budget-for-general-contractors',
        path: '/blog/google-ads-budget-for-general-contractors',
        title: 'How Much Should General Contractors Spend on Google Ads?',
        seoTitle: 'How Much Should General Contractors Spend on Google Ads?',
        metaDescription: 'How Google Ads budgets actually work for general contractors: daily vs monthly limits, Smart Bidding and budget changes, Search Lost IS (budget), and how to set a budget by service.',
        excerpt: 'A practical breakdown of how Google Ads budgets work for general contractors: daily and monthly spending limits, how Smart Bidding reacts to budget changes, the Search Lost IS (budget) signal, and how to split and scale budget by service.',
        category: 'Google Ads',
        primaryKeyword: 'how much should general contractors spend on Google Ads',
        secondaryKeywords: [
          'Google Ads budget for contractors',
          'contractor Google Ads daily budget',
          'how much to spend on Google Ads for a construction company',
          'Google Ads monthly spending limit',
          'Search Lost IS budget',
          'Smart Bidding learning status budget',
          'Performance Max budget for contractors',
          'Local Services Ads budget',
          'Google Ads budget by service',
          'minimum Google Ads budget for general contractors',
        ],
        featuredImageAlt: 'Daily and monthly Google Ads budget math for a general contractor campaign',
        publishedDate: '2026-11-18',
        updatedDate: '2026-11-18',
        readingTime: 14,
        canonicalUrl: `${SITE_URL}/blog/google-ads-budget-for-general-contractors`,
        faq: [
          {
            question: 'How much should a general contractor spend on Google Ads?',
            answer: 'There is no universal number. The right figure comes from working backward from your target customer acquisition cost and lead-to-sale rate, the same math covered in the cost-per-lead and marketing-budget guides, then converting that into a daily number using the actual cost-per-click your own account sees, not a published industry average. Once a budget is set, the Search Lost IS (budget) metric tells you whether that number is actually the thing limiting your results.',
          },
          {
            question: 'What is the difference between a Google Ads budget and a bid?',
            answer: 'A budget is the ceiling on how much you are willing to spend over a day or month. A bid, or a bid strategy target such as target CPA or target ROAS under Smart Bidding, is how much you are willing to pay for a given click or conversion. Google Ads Help describes manual CPC bidding as letting you "set the highest amount that you\'re willing to pay for a click on your ad." A campaign can have plenty of budget left and still not spend it if the bid or bid strategy is not competitive enough to win auctions.',
          },
          {
            question: 'Can Google Ads spend more than my daily budget?',
            answer: 'Yes, on individual days. According to Google Ads Help, Google optimizes spend toward days with more opportunity and may spend up to your daily spending limit, which is "two times your average daily budget for most campaigns," on any single day. Across a full month, spend is capped by the monthly spending limit, "30.4 times your average daily budget for most campaigns." A campaign spending double its daily budget on one day is not a billing error by itself; it is the averaging mechanism working as documented.',
          },
          {
            question: 'Does raising my Google Ads budget restart the Smart Bidding learning period?',
            answer: 'No, as of Google\'s current documentation. Google Ads Help states that "updates to budgets, ROI targets, or targeting settings take effect in the next auction, but never trigger \'Learning\' status." Learning status, which never lasts more than seven days, is triggered specifically by a new or reactivated bid strategy, a change in which campaigns, ad groups, or keywords are included, or a significant change to the conversion goals being optimized toward, not by a budget edit on its own.',
          },
          {
            question: 'How do I know if my Google Ads budget is too low for a contractor campaign?',
            answer: 'Check Search Lost IS (budget) at the campaign level, defined by Google Ads Help as "the percentage of time that your ads weren\'t shown on the Search Network due to insufficient budget." A high number there means budget is the real constraint and raising it can capture more of the demand already searching for your services. A high Search Lost IS (rank) instead means the problem is Ad Rank, from bid or quality, not budget, and spending more will not fix it on its own.',
          },
          {
            question: 'Should a general contractor run one Google Ads budget or split it by service?',
            answer: 'Splitting budget by campaign, one per major service such as kitchen remodeling, bathroom remodeling, or home additions, is the practical way to prevent a single high-volume service from quietly consuming the entire account\'s spend before the lower-volume, sometimes higher-margin services get a chance to show. This is an account-structure decision, not a documented Google rule, but it mirrors the campaign segmentation already covered in the Google Ads for general contractors guide.',
          },
          {
            question: 'How does budget work differently for Local Services lead-goal campaigns inside Google Ads?',
            answer: 'Google has been migrating Local Services Ads out of its standalone dashboard into Google Ads, where it runs as a Performance Max campaign built around a pay-per-lead goal. According to Google Ads Help, that migration began in August 2026 for selected home and storefront categories in the United States and continues rolling out through 2027. Inside that structure, the budget you set caps total spend on valid leads, charged when a homeowner calls or messages, rather than capping clicks the way a traditional Search campaign budget does.',
          },
          {
            question: 'When should a general contractor increase or decrease Google Ads budget?',
            answer: 'Increase gradually when Search Lost IS (budget) is consistently high and the campaign is already hitting its target cost per qualified lead or customer acquisition cost, since that combination means profitable demand is being left on the table. Decrease, or at least pause scaling, when customer acquisition cost has been above target for a full sales cycle, when Search Lost IS (rank) rather than budget is the dominant lost-impression cause, or when project capacity is already full. For the broader question of how this fits inside total marketing spend, see the contractor marketing budget guide.',
          },
        ],
      },
      'pt-BR': {
        locale: 'pt-BR',
        slug: 'orcamento-de-google-ads-para-general-contractors',
        path: '/br/blog/orcamento-de-google-ads-para-general-contractors',
        title: 'Quanto um General Contractor Deve Investir no Google Ads?',
        seoTitle: 'Quanto um General Contractor Deve Investir no Google Ads?',
        metaDescription: 'Como o orçamento do Google Ads realmente funciona para general contractors: limite diário e mensal, Smart Bidding e mudanças de orçamento, Search Lost IS (budget) e como dividir o orçamento por serviço.',
        excerpt: 'Um panorama prático de como o orçamento do Google Ads funciona para general contractors: limites diário e mensal de gasto, como o Smart Bidding reage a mudanças de orçamento, o sinal do Search Lost IS (budget) e como dividir e escalar o orçamento por serviço.',
        category: 'Google Ads',
        primaryKeyword: 'quanto investir em Google Ads para general contractors',
        secondaryKeywords: [
          'orçamento de Google Ads para contractors',
          'orçamento diário de Google Ads para contractor',
          'quanto gastar em Google Ads para construtora',
          'limite mensal de gasto do Google Ads',
          'Search Lost IS budget',
          'status de aprendizado do Smart Bidding e orçamento',
          'orçamento de Performance Max para contractors',
          'orçamento do Local Services Ads',
          'orçamento de Google Ads por serviço',
          'orçamento mínimo de Google Ads para general contractors',
        ],
        featuredImageAlt: 'Matemática do orçamento diário e mensal do Google Ads para a campanha de um general contractor',
        publishedDate: '2026-11-18',
        updatedDate: '2026-11-18',
        readingTime: 14,
        canonicalUrl: `${SITE_URL}/br/blog/orcamento-de-google-ads-para-general-contractors`,
        faq: [
          {
            question: 'Quanto um general contractor deve investir no Google Ads?',
            answer: 'Não existe um número universal. O valor certo nasce de partir do custo de aquisição de cliente desejado e da taxa de conversão de lead em venda, a mesma conta dos guias de custo por lead e de orçamento de marketing, e depois converter isso num número diário usando o custo por clique real da sua própria conta, nunca uma média de mercado publicada. Depois de definido, a métrica Search Lost IS (budget) mostra se esse número é de fato o que está limitando seu resultado.',
          },
          {
            question: 'Qual é a diferença entre orçamento e lance no Google Ads?',
            answer: 'O orçamento é o teto de quanto você está disposto a gastar num dia ou num mês. O lance, ou a meta de uma estratégia de Smart Bidding como CPA-alvo ou ROAS-alvo, é quanto você está disposto a pagar por um clique ou conversão específica. A Central de Ajuda do Google Ads descreve o lance manual de CPC como a forma de "definir o valor máximo que você está disposto a pagar por um clique no seu anúncio". Uma campanha pode ter orçamento de sobra e ainda assim não gastá-lo se o lance ou a estratégia de lance não for competitiva o suficiente para ganhar os leilões.',
          },
          {
            question: 'O Google Ads pode gastar mais do que meu orçamento diário?',
            answer: 'Sim, em dias específicos. Segundo a Central de Ajuda do Google Ads, o Google otimiza o gasto para os dias com mais oportunidade e pode gastar até o limite diário de gasto, que é "duas vezes o seu orçamento diário médio para a maioria das campanhas", num único dia. No mês inteiro, o gasto é limitado pelo limite mensal, "30,4 vezes o seu orçamento diário médio para a maioria das campanhas". Uma campanha que gasta o dobro do orçamento diário num dia não é, por si só, um erro de cobrança: é o mecanismo de média funcionando como documentado.',
          },
          {
            question: 'Aumentar o orçamento do Google Ads reinicia o período de aprendizado do Smart Bidding?',
            answer: 'Não, segundo a documentação atual do Google. A Central de Ajuda do Google Ads afirma que "atualizações de orçamento, metas de retorno ou configurações de segmentação entram em vigor no próximo leilão, mas nunca disparam o status \'Learning\'" (tradução livre). O status Learning, que nunca dura mais de sete dias, é disparado especificamente por uma estratégia de lance nova ou reativada, por uma mudança em quais campanhas, grupos de anúncios ou palavras-chave estão incluídos, ou por uma mudança significativa nas metas de conversão otimizadas, não por uma edição de orçamento isolada.',
          },
          {
            question: 'Como saber se o orçamento do Google Ads está baixo demais para a campanha de um contractor?',
            answer: 'Confira o Search Lost IS (budget) no nível da campanha, definido pela Central de Ajuda do Google Ads como "a porcentagem de tempo em que seus anúncios não foram exibidos na Rede de Pesquisa por falta de orçamento" (tradução livre). Um número alto ali indica que o orçamento é de fato a restrição, e aumentá-lo pode capturar mais da demanda que já está procurando pelos seus serviços. Já um Search Lost IS (rank) alto indica que o problema é o Ad Rank, por lance ou qualidade, não orçamento, e gastar mais não resolve isso por si só.',
          },
          {
            question: 'O general contractor deve rodar um orçamento único ou dividir por serviço?',
            answer: 'Dividir o orçamento por campanha, uma para cada serviço principal como reforma de cozinha, reforma de banheiro ou home addition, é o jeito prático de evitar que um serviço de alto volume consuma silenciosamente o orçamento da conta inteira antes que os serviços de menor volume, às vezes de margem maior, tenham chance de aparecer. Isso é uma decisão de estrutura de conta, não uma regra documentada pelo Google, mas segue a mesma segmentação de campanha já coberta no guia de Google Ads para general contractors.',
          },
          {
            question: 'Como o orçamento funciona de forma diferente nas campanhas de meta de lead do Local Services dentro do Google Ads?',
            answer: 'O Google vem migrando o Local Services Ads do seu painel independente para dentro do Google Ads, onde passa a rodar como uma campanha Performance Max construída em torno de uma meta de pagamento por lead. Segundo a Central de Ajuda do Google Ads, essa migração começou em agosto de 2026 para categorias selecionadas de serviços residenciais e com loja física nos Estados Unidos, e continua se expandindo até 2027. Dentro dessa estrutura, o orçamento definido limita o gasto total com leads válidos, cobrados quando o homeowner liga ou envia mensagem, em vez de limitar cliques como faz o orçamento de uma campanha de Search tradicional.',
          },
          {
            question: 'Quando o general contractor deve aumentar ou diminuir o orçamento do Google Ads?',
            answer: 'Aumente gradualmente quando o Search Lost IS (budget) estiver consistentemente alto e a campanha já estiver batendo a meta de custo por lead qualificado ou custo de aquisição de cliente, porque essa combinação significa que existe demanda rentável sendo deixada de lado. Diminua, ou pelo menos pause o aumento, quando o custo de aquisição de cliente estiver acima da meta por um ciclo de vendas completo, quando o Search Lost IS (rank), e não o orçamento, for a causa dominante de impressões perdidas, ou quando a capacidade de produção já estiver no limite. Para a pergunta mais ampla de como isso se encaixa no orçamento total de marketing, veja o guia de orçamento de marketing para contractors.',
          },
        ],
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
