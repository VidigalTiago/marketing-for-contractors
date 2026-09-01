'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import NavbarPT from '@/components/pt/navbar-pt'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import CategoryFilter from '@/components/blog/category-filter'
import BlogSearch from '@/components/blog/blog-search'
import ArticleCard from '@/components/blog/article-card'
import {
  getPublishedArticles,
  getRelatedArticles,
  getArticleBySlug,
  BLOG_CATEGORIES,
  CTA_URL_PT,
} from '@/lib/articles'
import { getBlogUI } from '@/lib/i18n'

const LOCALE = 'pt-BR' as const
const ui = getBlogUI(LOCALE)
const CTA_CLICK = () => window.open(CTA_URL_PT, '_blank')

const publishedArticles = getPublishedArticles(LOCALE)

// Coming-soon cards from the google-ads article's related list (pt-BR locale)
const comingSoonCards = getRelatedArticles('google-ads-for-general-contractors', LOCALE)
  .filter((r) => r.status === 'coming-soon')

const allCards = [
  ...publishedArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    readingTime: a.readingTime,
    publishedDate: a.publishedDate,
    href: a.path,
    status: 'published' as const,
    featuredImageAlt: a.featuredImageAlt,
    featuredImage: a.featuredImage,
  })),
  ...comingSoonCards.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    readingTime: r.readingTime,
    publishedDate: undefined as string | undefined,
    href: null as string | null,
    status: r.status,
    featuredImageAlt: undefined as string | undefined,
    featuredImage: undefined as string | undefined,
  })),
]

const featuredPillar = getArticleBySlug(LOCALE, 'marketing-para-general-contractors')

const ptCategories = BLOG_CATEGORIES[LOCALE]

export default function BlogHubClientPT() {
  const [activeCategory, setActiveCategory] = useState(ptCategories[0])
  const [search, setSearch] = useState('')

  const filtered = allCards.filter((card) => {
    const matchCat = activeCategory === ptCategories[0] || card.category === activeCategory
    const matchSearch =
      search.trim() === '' ||
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBanner message="Somente 4 vagas disponíveis no momento para consultoria." />
      <NavbarPT onCTAClick={CTA_CLICK} />

      <main id="main-content">
        <a
          href="#article-grid"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1565D8] focus:border focus:border-[#1565D8]"
        >
          {ui.skipToArticles}
        </a>

        {/* Hero */}
        <section className="pt-28 pb-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-40" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-[#1565D8]" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                  {ui.resourcesLabel}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-4 leading-[1.05]">
                {ui.blogHubTitle}
              </h1>
              <p className="text-[#667085] text-lg leading-relaxed mb-8 max-w-xl">
                {ui.blogHubDescription}
              </p>
              <BlogSearch
                value={search}
                onChange={setSearch}
                placeholder={ui.searchPlaceholder}
              />
            </div>
          </div>
        </section>

        {/* Featured pillar */}
        {featuredPillar && (
          <section className="py-12 bg-[#F4F6F8]" aria-labelledby="featured-heading-pt">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-px bg-[#1565D8]" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                  {ui.featuredGuide}
                </span>
              </div>
              <article className="border border-[#D0D5DD] bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#1565D8]" />
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-56 min-h-[200px] overflow-hidden bg-[#0A0A0A] lg:h-full">
                    <Image
                      src={featuredPillar.featuredImage ?? '/images/blog/marketing-for-general-contractors-complete-guide.svg'}
                      alt={featuredPillar.featuredImageAlt ?? 'Marketing para General Contractors: O Guia Completo'}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                        {featuredPillar.category}
                      </span>
                      <span className="text-[#D0D5DD]">·</span>
                      <span className="flex items-center gap-1 text-[10px] text-[#667085]">
                        <Clock size={11} />
                        {featuredPillar.readingTime} {ui.readingTimeLabel}
                      </span>
                    </div>
                    <h2 id="featured-heading-pt" className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0A0A0A] mb-3 text-balance">
                      {featuredPillar.title}
                    </h2>
                    <p className="text-[#667085] leading-relaxed mb-6 text-sm">
                      {featuredPillar.excerpt}
                    </p>
                    <Link
                      href={featuredPillar.path}
                      className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-5 py-2.5 text-sm hover:bg-[#1255c0] transition-colors duration-200 self-start"
                    >
                      {ui.readCompleteGuide}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Articles grid */}
        <section className="py-14 bg-white" id="article-grid" aria-labelledby="articles-heading-pt">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 id="articles-heading-pt" className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
                {ui.allArticles}
              </h2>
              <CategoryFilter
                categories={ptCategories}
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {filtered.length === 0 ? (
              <p className="text-sm text-[#667085] py-12 text-center">{ui.noArticlesFound}</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((card) => (
                  <ArticleCard
                    key={card.slug}
                    title={card.title}
                    excerpt={card.excerpt}
                    category={card.category}
                    readingTime={card.readingTime}
                    publishedDate={card.publishedDate}
                    href={card.href}
                    status={card.status}
                    featuredImageAlt={card.featuredImageAlt}
                    featuredImage={card.featuredImage}
                    locale={LOCALE}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0A0A0A] blueprint-grid-dark relative" aria-labelledby="blog-cta-heading-pt">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                {ui.freeAssessment}
              </span>
              <div className="w-5 h-px bg-[#1565D8]" />
            </div>
            <h2 id="blog-cta-heading-pt" className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance mb-4">
              Quer Gerar Mais Leads Qualificados para Sua Empresa de Construção?
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Entenda o que está limitando seu marketing atual e onde estão suas melhores oportunidades de crescimento nos EUA.
            </p>
            <Link
              href={CTA_URL_PT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-7 py-4 text-sm hover:bg-[#1255c0] transition-colors duration-200"
              data-event="consultation_cta_click"
            >
              Solicitar Análise Gratuita de Marketing
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
