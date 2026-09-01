import type { SupportedLocale } from './articles'

// UI strings per locale — used by blog components via props or direct import.
// Never use this for indexable article content (use the article data model instead).

export interface BlogUIStrings {
  searchPlaceholder: string
  featuredGuide: string
  allCategoriesLabel: string
  readingTimeLabel: string
  readArticle: string
  readCompleteGuide: string
  comingSoon: string
  relatedArticles: string
  tableOfContents: string
  onThisPage: string
  publishedLabel: string
  updatedLabel: string
  allArticles: string
  noArticlesFound: string
  skipToArticles: string
  faqHeading: string
  nextStep: string
  freeAssessment: string
  freeConsultation: string
  ctaButton: string
  inlineCTAHeading: string
  inlineCTABody: string
  endCTANextStep: string
  languageSwitcher: string
  blogHubTitle: string
  blogHubDescription: string
  resourcesLabel: string
}

export const blogUI: Record<SupportedLocale, BlogUIStrings> = {
  'en-US': {
    searchPlaceholder: 'Search articles',
    featuredGuide: 'Featured Guide',
    allCategoriesLabel: 'All',
    readingTimeLabel: 'min read',
    readArticle: 'Read Article',
    readCompleteGuide: 'Read the Complete Guide',
    comingSoon: 'Coming Soon',
    relatedArticles: 'Related Contractor Marketing Guides',
    tableOfContents: 'Table of Contents',
    onThisPage: 'On this page',
    publishedLabel: 'Published',
    updatedLabel: 'Updated',
    allArticles: 'All Articles',
    noArticlesFound: 'No articles found for your search.',
    skipToArticles: 'Skip to articles',
    faqHeading: 'Frequently Asked Questions',
    nextStep: 'Next Step',
    freeAssessment: 'Free Assessment',
    freeConsultation: 'Free Assessment',
    ctaButton: 'Start Your Consultation',
    inlineCTAHeading: 'Ready to Get More Qualified Leads?',
    inlineCTABody: 'We help residential construction companies build a real lead generation system — paid media, CRM tracking, and revenue visibility.',
    endCTANextStep: 'Next Step',
    languageSwitcher: 'Português',
    blogHubTitle: 'Contractor Marketing Resources',
    blogHubDescription: 'Practical guides and frameworks to help general contractors generate more qualified leads, close more estimates, and grow their construction businesses.',
    resourcesLabel: 'Resources',
  },
  'pt-BR': {
    searchPlaceholder: 'Buscar artigos sobre marketing',
    featuredGuide: 'Guia em destaque',
    allCategoriesLabel: 'Todos',
    readingTimeLabel: 'min de leitura',
    readArticle: 'Ler artigo',
    readCompleteGuide: 'Ler o guia completo',
    comingSoon: 'Em breve',
    relatedArticles: 'Guias relacionados',
    tableOfContents: 'Índice',
    onThisPage: 'Nesta página',
    publishedLabel: 'Publicado em',
    updatedLabel: 'Atualizado em',
    allArticles: 'Todos os artigos',
    noArticlesFound: 'Nenhum artigo encontrado para sua busca.',
    skipToArticles: 'Ir para os artigos',
    faqHeading: 'Perguntas Frequentes',
    nextStep: 'Próximo Passo',
    freeAssessment: 'Análise Gratuita',
    freeConsultation: 'Análise Gratuita',
    ctaButton: 'Falar com um Especialista',
    inlineCTAHeading: 'Pronto para Gerar Mais Leads Qualificados?',
    inlineCTABody: 'Ajudamos empresas de construção residencial nos EUA a construir um sistema real de geração de leads — mídia paga, CRM e visibilidade de receita.',
    endCTANextStep: 'Próximo Passo',
    languageSwitcher: 'English',
    blogHubTitle: 'Recursos de Marketing para Contractors',
    blogHubDescription: 'Guias práticos e frameworks para ajudar general contractors a gerar mais leads qualificados, fechar mais orçamentos e crescer nos Estados Unidos.',
    resourcesLabel: 'Recursos',
  },
}

export function getBlogUI(locale: SupportedLocale): BlogUIStrings {
  return blogUI[locale]
}

/** Formats a date string according to the locale. */
export function formatArticleDate(dateStr: string, locale: SupportedLocale): string {
  return new Date(dateStr).toLocaleDateString(
    locale === 'pt-BR' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}
