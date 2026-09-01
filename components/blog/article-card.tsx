import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { ArticleStatus, SupportedLocale } from '@/lib/articles'
import { getBlogUI, formatArticleDate } from '@/lib/i18n'

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  readingTime: number
  publishedDate?: string
  href: string | null
  status: ArticleStatus
  featuredImageAlt?: string
  featuredImage?: string
  locale?: SupportedLocale
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  readingTime,
  publishedDate,
  href,
  status,
  featuredImageAlt,
  featuredImage,
  locale = 'en-US',
}: ArticleCardProps) {
  const ui = getBlogUI(locale)
  const isComingSoon = status === 'coming-soon' || !href

  return (
    <article className="border border-[#D0D5DD] bg-white flex flex-col h-full relative group">
      {/* Corner mark */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#1565D8]/30" />

      {/* Image placeholder */}
      <div className="w-full h-44 bg-[#F4F6F8] flex items-center justify-center overflow-hidden">
        {isComingSoon ? (
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D0D5DD]">
            {ui.comingSoon}
          </span>
        ) : featuredImage ? (
          <Image
            src={featuredImage}
            alt={featuredImageAlt ?? title}
            width={1200}
            height={675}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full bg-[#F4F6F8] blueprint-grid flex items-center justify-center">
            <span className="text-[10px] font-mono text-[#1565D8]/30 uppercase tracking-widest">
              {featuredImageAlt ?? category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category + reading time */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
            {category}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#667085]">
            <Clock size={11} />
            {readingTime} {ui.readingTimeLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-[#0A0A0A] leading-snug tracking-tight mb-2 text-balance">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#667085] leading-relaxed flex-1 mb-4">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F4F6F8]">
          {publishedDate && (
            <time className="text-[10px] text-[#D0D5DD] font-medium">
              {formatArticleDate(publishedDate, locale)}
            </time>
          )}
          {isComingSoon ? (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D0D5DD] ml-auto">
              {ui.comingSoon}
            </span>
          ) : (
            <Link
              href={href!}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1565D8] hover:text-[#1255c0] transition-colors ml-auto"
            >
              {ui.readArticle}
              <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
