'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import CategoryFilter from '@/components/blog/category-filter'
import BlogSearch from '@/components/blog/blog-search'
import ArticleCard from '@/components/blog/article-card'
import { getPublishedArticles, getRelatedArticles, BLOG_CATEGORIES, CTA_URL } from '@/lib/articles'

const LOCALE = 'en-US' as const
const CTA_CLICK = () => window.open(CTA_URL, '_blank')

// All grid cards: published articles + coming-soon previews from related cards
const publishedArticles = getPublishedArticles(LOCALE)
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
    publishedDate: undefined,
    href: null,
    status: r.status,
    featuredImageAlt: undefined,
    featuredImage: undefined,
  })),
]

export default function BlogHubClient() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allCards.filter((card) => {
    const matchCat = activeCategory === BLOG_CATEGORIES[LOCALE][0] || card.category === activeCategory
    const matchSearch =
      search.trim() === '' ||
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBanner />
      <Navbar onCTAClick={CTA_CLICK} />

      <main id="main-content">
        {/* Skip to content */}
        <a
          href="#article-grid"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1565D8] focus:border focus:border-[#1565D8]"
        >
          Skip to articles
        </a>

        {/* Hero */}
        <section className="pt-28 pb-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-40" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-[#1565D8]" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                  Resources
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-4 leading-[1.05]">
                Marketing Resources for General Contractors
              </h1>
              <p className="text-[#667085] text-lg leading-relaxed mb-8 max-w-xl">
                Practical guides to help construction companies generate qualified leads, improve conversion rates, track revenue, and grow profitably.
              </p>
              <BlogSearch value={search} onChange={setSearch} />
            </div>
          </div>
        </section>

        {/* Featured pillar card */}
        <section className="py-12 bg-[#F4F6F8]" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Featured Guide
              </span>
            </div>
            <article className="border border-[#D0D5DD] bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#1565D8]" />
              <div className="grid lg:grid-cols-2">
                <div className="relative h-56 min-h-[200px] overflow-hidden bg-[#0A0A0A] lg:h-full">
                  <Image
                    src="/images/blog/marketing-for-general-contractors-complete-guide.svg"
                    alt="Marketing for General Contractors: The Complete Guide"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                      Contractor Growth
                    </span>
                    <span className="text-[#D0D5DD]">·</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#667085]">
                      <Clock size={11} />
                      25 min read
                    </span>
                  </div>
                  <h2 id="featured-heading" className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0A0A0A] mb-3 text-balance">
                    Marketing for General Contractors: The Complete Guide
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-6 text-sm">
                    A comprehensive overview of every marketing channel and strategy general contractors need to generate consistent, qualified leads — from Google Ads and local SEO to CRM systems and revenue tracking.
                  </p>
                  <Link
                    href="/general-contractor-marketing"
                    className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-5 py-2.5 text-sm hover:bg-[#1255c0] transition-colors duration-200 self-start"
                  >
                    Read the Complete Guide
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Articles */}
        <section className="py-14 bg-white" id="article-grid" aria-labelledby="articles-heading">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 id="articles-heading" className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
                All Articles
              </h2>
              <CategoryFilter
                categories={BLOG_CATEGORIES[LOCALE]}
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {filtered.length === 0 ? (
              <p className="text-sm text-[#667085] py-12 text-center">
                No articles found for your search.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((card) => (
                  <ArticleCard
                    key={card.slug}
                    title={card.title}
                    excerpt={card.excerpt}
                    category={card.category}
                    readingTime={card.readingTime}
                    publishedDate={'publishedDate' in card ? card.publishedDate : undefined}
                    href={card.href}
                    status={card.status}
                    featuredImageAlt={'featuredImageAlt' in card ? card.featuredImageAlt : undefined}
                    featuredImage={'featuredImage' in card ? card.featuredImage : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lead generation CTA */}
        <section className="py-16 bg-[#0A0A0A] blueprint-grid-dark relative" aria-labelledby="blog-cta-heading">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Free Assessment
              </span>
              <div className="w-5 h-px bg-[#1565D8]" />
            </div>
            <h2 id="blog-cta-heading" className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance mb-4">
              Want More Qualified Leads for Your Construction Company?
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto mb-8">
              Get a clear view of what is limiting your current marketing performance and where your best growth opportunities are.
            </p>
            <Link
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-7 py-4 text-sm hover:bg-[#1255c0] transition-colors duration-200"
              data-event="consultation_cta_click"
            >
              Request a Free Marketing Assessment
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
