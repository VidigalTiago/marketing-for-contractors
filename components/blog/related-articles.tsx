import ArticleCard from './article-card'
import type { ArticleStatus, SupportedLocale } from '@/lib/articles'
import { getBlogUI } from '@/lib/i18n'

interface RelatedArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: number
  status: ArticleStatus
  href: string | null
  featuredImage?: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  locale?: SupportedLocale
}

export default function RelatedArticles({ articles, locale = 'en-US' }: RelatedArticlesProps) {
  const ui = getBlogUI(locale)
  return (
    <section className="mt-14" aria-labelledby="related-heading">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-5 h-px bg-[#1565D8]" />
        <h2 id="related-heading" className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
          {ui.relatedArticles}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            category={article.category}
            readingTime={article.readingTime}
            href={article.href}
            status={article.status}
            featuredImage={article.featuredImage}
            featuredImageAlt={article.title}
            locale={locale}
          />
        ))}
      </div>
    </section>
  )
}
