import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticleBySlug, getAlternateLanguages, getRelatedArticles, SITE_URL } from '@/lib/articles'
import Navbar from '@/components/navbar'
import NavbarCTAWrapper from '@/components/blog/navbar-cta-wrapper'
import TableOfContents from '@/components/blog/table-of-contents'
import RelatedArticles from '@/components/blog/related-articles'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import FAQSection from '@/components/blog/faq-section'
import InlineCTA from '@/components/blog/inline-cta'
import EndArticleCTA from '@/components/blog/end-article-cta'
import ReadingProgress from '@/components/blog/reading-progress'
import CalloutBox from '@/components/blog/callout-box'

const SLUG = 'best-google-ads-keywords-for-general-contractors'
const ARTICLE_ID = 'best-google-ads-keywords-for-general-contractors'

export async function generateMetadata(): Promise<Metadata> {
  const article = getArticleBySlug('en-US', SLUG)
  if (!article) return {}
  const alternates = getAlternateLanguages(ARTICLE_ID)
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: {
      canonical: article.canonicalUrl,
      languages: {
        'en-US': alternates['en-US'] ?? article.canonicalUrl,
        'pt-BR': alternates['pt-BR'] ?? '',
        'x-default': alternates['en-US'] ?? article.canonicalUrl,
      },
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: article.canonicalUrl,
      locale: 'en_US',
      alternateLocale: ['pt_BR'],
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
    },
  }
}

const tocItems = [
  { id: 'what-are-keywords', label: 'What Are Google Ads Keywords?', level: 2 as const },
  { id: 'good-keyword', label: 'What Makes a Good Contractor Keyword?', level: 2 as const },
  { id: 'general-contractor', label: 'General Contractor Keywords', level: 2 as const },
  { id: 'kitchen-remodeling', label: 'Kitchen Remodeling Keywords', level: 2 as const },
  { id: 'bathroom-remodeling', label: 'Bathroom Remodeling Keywords', level: 2 as const },
  { id: 'home-additions', label: 'Home Addition Keywords', level: 2 as const },
  { id: 'adu', label: 'ADU Contractor Keywords', level: 2 as const },
  { id: 'deck', label: 'Deck Builder Keywords', level: 2 as const },
  { id: 'roofing', label: 'Roofing Contractor Keywords', level: 2 as const },
  { id: 'basement', label: 'Basement Remodeling Keywords', level: 2 as const },
  { id: 'custom-home', label: 'Custom Home Builder Keywords', level: 2 as const },
  { id: 'location', label: 'Location-Based Keywords', level: 2 as const },
  { id: 'intent-modifiers', label: 'Commercial-Intent Modifiers', level: 2 as const },
  { id: 'info-vs-commercial', label: 'Informational vs Commercial Keywords', level: 2 as const },
  { id: 'match-types', label: 'Keyword Match Types', level: 2 as const },
  { id: 'negative-keywords', label: 'Negative Keywords', level: 2 as const },
  { id: 'campaign-structure', label: 'Organizing by Campaign and Ad Group', level: 2 as const },
  { id: 'project-value', label: 'Choosing Keywords by Project Value', level: 2 as const },
  { id: 'search-terms-report', label: 'How to Use the Search Terms Report', level: 2 as const },
  { id: 'performance', label: 'How to Evaluate Keyword Performance', level: 2 as const },
  { id: 'mistakes', label: 'Common Keyword Mistakes', level: 2 as const },
  { id: 'final-recommendations', label: 'Final Recommendations', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Best Google Ads Keywords for General Contractors' },
]

export default function Page() {
  const article = getArticleBySlug('en-US', SLUG)
  const alternates = getAlternateLanguages(ARTICLE_ID)
  const relatedArticles = getRelatedArticles(ARTICLE_ID, 'en-US')

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
        inLanguage: 'en-US',
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
          .concat([{ '@type': 'ListItem', position: breadcrumbs.filter((b) => b.href).length + 1, name: article.title, item: article.canonicalUrl }]),
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
      <NavbarCTAWrapper />

      <main className="bg-white pt-28 pb-20" id="article-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs + hreflang switcher */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
            <Breadcrumbs items={breadcrumbs} />
            {alternates['pt-BR'] && (
              <Link
                href="/br/blog/melhores-palavras-chave-google-ads-para-general-contractors"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
              >
                Ver em Português
              </Link>
            )}
          </div>

          {/* Article header */}
          <div className="max-w-3xl mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-3">
              {article.category} &middot; {article.readingTime} min read
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] leading-tight mb-4 text-balance">
              {article.title}
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed mb-6">{article.excerpt}</p>
            <p className="text-xs text-[#98A2B3]">
              Published {new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {article.updatedDate !== article.publishedDate && (
                <> &middot; Updated {new Date(article.updatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</>
              )}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-12 lg:gap-16 items-start">

            {/* Article body */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <TableOfContents items={tocItems} variant="mobile" />

              {/* Introduction */}
              <div className="prose-section mb-10">
                <p className="text-[#667085] leading-relaxed mb-4">
                  The most common mistake contractors make with Google Ads keywords is treating search volume as a proxy for value. A keyword with high monthly search volume may generate clicks from homeowners researching ideas, comparing costs, or looking for DIY information — none of whom are ready to hire a contractor this week.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The keywords that produce profitable construction leads typically connect three elements:
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 mb-4 font-mono text-sm text-[#0A0A0A]">
                  Service + hiring intent + location
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Examples with strong commercial intent:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 mb-4 pl-1">
                  <li>General contractor near me</li>
                  <li>Kitchen remodeling contractor in Boston</li>
                  <li>Home addition builder near me</li>
                  <li>ADU contractor in Los Angeles</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  A keyword strategy that prioritizes potential project value, qualification, and lead quality will generally outperform one built around click volume. This guide covers how to select, organize, and evaluate keywords for Google Ads campaigns targeting residential construction and remodeling projects. For a broader overview of how contractor campaigns work, see the{' '}
                  <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">complete Google Ads guide for general contractors</Link>.
                </p>
              </div>

              {/* H2: What Are Keywords */}
              <section id="what-are-keywords" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Are Google Ads Keywords?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  In Google Ads, a keyword is a word or phrase that you add to your campaign to help Google understand which searches may be relevant to your ads. When a user searches on Google, Google reviews your keywords — alongside your bids, quality score, and other signals — to determine whether your ad is eligible to appear.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A search term is the actual phrase a user typed or spoke that caused your ad to become eligible. Keywords and search terms are not always the same.
                </p>
                <CalloutBox type="info" label="Keyword ≠ Search term">
                  If you add the keyword <strong>kitchen remodeling contractor</strong>, your ad could potentially show for searches like "kitchen renovation company near me" or "hire kitchen remodeling contractor." The keyword triggered the ad; the search term is what the user actually typed. Reviewing your search terms report regularly helps you understand which actual searches your campaign is reaching.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Match types influence how closely a search needs to relate to your keyword before your ad becomes eligible. Modern Google Ads matching considers the meaning and intent of searches, not just literal word patterns. A keyword written without a specific match-type format is generally treated as broad match by default.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Because keywords and search terms can differ, contractors should review the search terms report regularly — not rely solely on the keyword list — to understand which searches are actually generating ad activity.
                </p>
              </section>

              {/* H2: Good Keyword */}
              <section id="good-keyword" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Makes a Good Contractor Keyword?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A good contractor keyword shares several characteristics:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-2 mb-4 pl-1">
                  <li><strong>Relevant service</strong> — it matches what you actually offer</li>
                  <li><strong>Commercial intent</strong> — it suggests the person may be looking to hire, not just research</li>
                  <li><strong>Geographic relevance</strong> — it targets a location you can serve profitably</li>
                  <li><strong>Clear project category</strong> — it describes a defined scope, not a vague topic</li>
                  <li><strong>Meaningful project value potential</strong> — the service type justifies the ad cost</li>
                  <li><strong>Alignment with the landing page</strong> — the search intent matches what the page addresses</li>
                  <li><strong>Alignment with your capabilities</strong> — you can actually deliver what the keyword implies</li>
                  <li><strong>Measurable conversion potential</strong> — the keyword can be tracked to leads and projects</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">A useful keyword framework:</p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 mb-4 font-mono text-sm text-[#0A0A0A]">
                  Service + contractor modifier + geographic modifier
                </div>
                <p className="text-[#667085] leading-relaxed mb-3">Examples:</p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Kitchen remodeling + contractor + near me</li>
                  <li>Home addition + builder + Boston</li>
                  <li>ADU + contractor + Los Angeles</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mt-4">
                  Not every effective keyword requires all three elements. Context, campaign structure, and match types also influence how keywords perform.
                </p>
              </section>

              {/* H2: General Contractor Keywords */}
              <section id="general-contractor" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">High-Intent Google Ads Keywords for General Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  These keywords represent searches that may indicate a homeowner is actively looking to hire a general contractor. Use <code className="bg-[#F4F6F8] px-1.5 py-0.5 text-xs">[city]</code>, <code className="bg-[#F4F6F8] px-1.5 py-0.5 text-xs">[state]</code>, and <code className="bg-[#F4F6F8] px-1.5 py-0.5 text-xs">[service area]</code> placeholders for your actual locations. Do not target locations you cannot serve or are not licensed to work in.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>General contractor near me</li>
                  <li>General contractor in [city]</li>
                  <li>Residential general contractor</li>
                  <li>Licensed general contractor near me</li>
                  <li>Local general contractor</li>
                  <li>General contracting company</li>
                  <li>Home renovation contractor</li>
                  <li>Home remodeling contractor near me</li>
                  <li>Construction contractor near me</li>
                  <li>General contractor estimate</li>
                </ul>
              </section>

              {/* H2: Kitchen */}
              <section id="kitchen-remodeling" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Kitchen Remodeling Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Kitchen remodeling is one of the most competitive residential categories. Keywords that combine a service modifier with a geographic element tend to attract higher-intent searches.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Kitchen remodeling contractor near me</li>
                  <li>Kitchen remodel company</li>
                  <li>Kitchen renovation contractor</li>
                  <li>Kitchen remodeling company in [city]</li>
                  <li>Custom kitchen remodeling</li>
                  <li>Full kitchen remodel contractor</li>
                  <li>High-end kitchen remodeling</li>
                  <li>Kitchen contractor estimate</li>
                  <li>Kitchen renovation company near me</li>
                  <li>Design-build kitchen remodeling</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-3">
                  Some searches suggest information-seeking rather than immediate hiring intent. These may perform better as SEO content targets, remarketing audiences, or upper-funnel content than as primary paid search keywords:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Kitchen ideas</li>
                  <li>Kitchen colors</li>
                  <li>Kitchen design inspiration</li>
                  <li>DIY kitchen remodel</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mt-4 text-sm italic">
                  Lower-intent keywords are not always irrelevant to every strategy — context, budget, and remarketing use cases matter.
                </p>
              </section>

              {/* H2: Bathroom */}
              <section id="bathroom-remodeling" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Bathroom Remodeling Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Bathroom remodeling searches can range from minor repairs to full master suite renovations. Aligning keywords with your actual service scope helps prevent mismatched leads.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Bathroom remodeling contractor near me</li>
                  <li>Bathroom renovation company</li>
                  <li>Bathroom remodeler in [city]</li>
                  <li>Full bathroom renovation</li>
                  <li>Master bathroom remodeling contractor</li>
                  <li>Bathroom renovation estimate</li>
                  <li>Bathroom remodeling company near me</li>
                  <li>Custom bathroom remodel</li>
                  <li>Shower remodeling contractor</li>
                  <li>Bathroom design-build contractor</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Repair-oriented searches (leaking shower, broken tile repair, faucet replacement) typically signal a different project type and budget than full remodel searches. If you do not handle small repairs, consider adding common repair terms as negatives.
                </p>
              </section>

              {/* H2: Home Addition */}
              <section id="home-additions" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Home Addition Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Home additions represent high project values and longer sales cycles. Keywords in this category attract prospects who are generally further along in their research, but project qualification — budget, timeline, permits — is especially important before committing significant bid budget.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Home addition contractor near me</li>
                  <li>Room addition contractor</li>
                  <li>Home addition builder</li>
                  <li>Second-story addition contractor</li>
                  <li>House extension contractor</li>
                  <li>Home expansion contractor</li>
                  <li>Addition contractor in [city]</li>
                  <li>Home addition estimate</li>
                  <li>Design-build home addition</li>
                  <li>General contractor for home addition</li>
                </ul>
              </section>

              {/* H2: ADU */}
              <section id="adu" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">ADU Contractor Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  ADU (accessory dwelling unit) terminology and demand vary significantly by state and local regulations. Target ADU keywords only where your licensing and local permitting allow you to operate. Do not make claims about ADU permitting or regulations without confirming current local requirements.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>ADU contractor near me</li>
                  <li>ADU builder in [city]</li>
                  <li>Accessory dwelling unit contractor</li>
                  <li>Garage conversion contractor</li>
                  <li>Backyard ADU builder</li>
                  <li>Detached ADU contractor</li>
                  <li>ADU construction company</li>
                  <li>ADU design-build company</li>
                  <li>ADU construction estimate</li>
                  <li>General contractor for ADU</li>
                </ul>
              </section>

              {/* H2: Deck */}
              <section id="deck" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Deck Builder Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Deck construction searches are distinct from searches about deck materials, staining, or furniture. Adding negative keywords for these categories prevents unqualified clicks.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Deck builder near me</li>
                  <li>Deck contractor in [city]</li>
                  <li>Custom deck builder</li>
                  <li>Composite deck contractor</li>
                  <li>Wood deck builder</li>
                  <li>Deck construction company</li>
                  <li>Deck replacement contractor</li>
                  <li>Deck installation company</li>
                  <li>Backyard deck contractor</li>
                  <li>Deck construction estimate</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-2">Consider adding negatives for:</p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Deck furniture / deck chairs / deck accessories</li>
                  <li>Deck stain / deck paint / deck sealer</li>
                  <li>DIY deck plans / deck blueprints</li>
                  <li>Deck materials / lumber</li>
                </ul>
              </section>

              {/* H2: Roofing */}
              <section id="roofing" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Roofing Contractor Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Roofing searches can reflect emergency repair situations or planned replacement projects. These represent different urgencies, budgets, and decision timelines. Mixing them in a single ad group can make it harder to tailor ads and landing pages to the specific intent.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Roofing contractor near me</li>
                  <li>Roof replacement contractor</li>
                  <li>Roofing company in [city]</li>
                  <li>Residential roofing contractor</li>
                  <li>New roof estimate</li>
                  <li>Licensed roofing company</li>
                  <li>Roof installation contractor</li>
                  <li>Local roofing company</li>
                  <li>Metal roofing contractor</li>
                  <li>Shingle roof contractor</li>
                </ul>
              </section>

              {/* H2: Basement */}
              <section id="basement" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Basement Remodeling Keywords</h2>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Basement remodeling contractor</li>
                  <li>Basement finishing company</li>
                  <li>Basement renovation contractor near me</li>
                  <li>Finished basement contractor</li>
                  <li>Basement conversion contractor</li>
                  <li>Basement remodel estimate</li>
                  <li>Basement remodeling company in [city]</li>
                  <li>Basement design-build company</li>
                  <li>Custom basement renovation</li>
                  <li>Basement finishing contractor near me</li>
                </ul>
              </section>

              {/* H2: Custom Home */}
              <section id="custom-home" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Custom Home Builder Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Custom home builder searches typically attract prospects with serious project intent, but they may also include people at an early research phase comparing builders, floor plans, and pricing. Landing pages should clearly communicate your specific capabilities, process, and service area.
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Custom home builder near me</li>
                  <li>Custom home builder in [city]</li>
                  <li>Luxury home builder</li>
                  <li>Design-build custom homes</li>
                  <li>New home construction company</li>
                  <li>Custom house contractor</li>
                  <li>Residential home builder</li>
                  <li>Local custom home builder</li>
                  <li>Build a custom home</li>
                  <li>Custom home construction company</li>
                </ul>
              </section>

              {/* H2: Location */}
              <section id="location" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Location-Based Contractor Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Geographic modifiers help connect searches with local hiring intent. Common patterns:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Near me</li>
                  <li>In [city]</li>
                  <li>[service] in [city]</li>
                  <li>[service] near [neighborhood]</li>
                  <li>[service] in [county]</li>
                  <li>Local [service]</li>
                  <li>[state] contractor</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Only target locations you can serve profitably. Factors to consider when deciding which locations to target:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1">
                  <li>Travel distance and crew time</li>
                  <li>Licensing requirements by jurisdiction</li>
                  <li>Average project value in that area</li>
                  <li>Historical lead quality and close rate from that location</li>
                  <li>Property values and remodeling investment levels</li>
                  <li>Crew availability and capacity</li>
                  <li>Service-area restrictions</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mt-4">
                  Automatically creating campaigns for every surrounding city is not recommended without reviewing whether those markets actually produce profitable leads.
                </p>
              </section>

              {/* H2: Intent Modifiers */}
              <section id="intent-modifiers" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Commercial-Intent Keyword Modifiers</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Modifiers paired with a service name can signal different types of intent. Examples:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse mb-4">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Modifier</th>
                        <th className="text-left px-4 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Likely intent signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['contractor / company / builder', 'Likely looking to hire a professional'],
                        ['near me / local / in [city]', 'Geographic intent, often high hiring intent'],
                        ['licensed / certified', 'Quality or credential verification'],
                        ['estimate / quote', 'Actively comparing or planning'],
                        ['hire / find', 'Direct hiring language'],
                        ['design-build / full-service', 'Turnkey project preference'],
                        ['custom / high-end / luxury', 'Project scope or budget signal'],
                        ['replacement', 'Defined project need, not just research'],
                      ].map(([mod, intent]) => (
                        <tr key={mod} className="border-b border-[#F4F6F8]">
                          <td className="px-4 py-2 border border-[#D0D5DD] text-[#667085] font-mono text-xs">{mod}</td>
                          <td className="px-4 py-2 border border-[#D0D5DD] text-[#667085]">{intent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed text-sm italic">
                  Note: words like "best" do not reliably indicate a user who is ready to hire immediately.
                </p>
              </section>

              {/* H2: Info vs Commercial */}
              <section id="info-vs-commercial" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Informational Keywords vs Commercial Keywords</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Informational searches and commercial searches require different responses. Using informational terms as primary keywords in a high-intent Search campaign often leads to high click volume with low conversion rates.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Search</th>
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Likely intent</th>
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Paid search fit</th>
                        <th className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">Recommended action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Kitchen remodeling contractor near me', 'Commercial — likely hiring', 'High', 'Primary campaign keyword'],
                        ['Kitchen renovation company in Boston', 'Commercial — local hire', 'High', 'Primary campaign keyword'],
                        ['Kitchen remodel cost', 'Informational / commercial', 'Medium', 'Dedicated cost landing page or negative'],
                        ['Kitchen remodel ideas', 'Informational', 'Low', 'SEO content or negative keyword'],
                        ['How to remodel a kitchen', 'Informational / DIY', 'Low', 'SEO content or negative keyword'],
                        ['Best kitchen layouts', 'Informational', 'Low', 'SEO or negative keyword'],
                      ].map(([search, intent, fit, action]) => (
                        <tr key={search} className="border-b border-[#F4F6F8]">
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{search}</td>
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{intent}</td>
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{fit}</td>
                          <td className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* H2: Match Types */}
              <section id="match-types" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Keyword Match Types for Contractor Campaigns</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Google Ads currently supports three positive match types for Search campaigns. Modern matching considers the meaning and intent of searches — not just literal word patterns.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Broad Match</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Broad match allows your keyword to match searches related to its meaning, including terms that may not contain any of your keyword words. It provides the greatest reach and can surface search themes you had not considered. However, it depends heavily on accurate conversion data and active negative keyword management. Without reliable tracking, broad match can generate significant irrelevant traffic.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Phrase Match</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Phrase match shows ads for searches that include the meaning of your keyword. It is not strictly defined as requiring each word in the same order — Google&apos;s matching considers intent and meaning. It offers more directional control than broad match while still allowing some variation.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Exact Match</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Exact match provides the most precise control of the three positive match types. It can still match searches with the same meaning or intent as your keyword — it is not limited to identical text only. It limits reach compared to the other match types but typically produces more predictable traffic.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        {['Match type', 'Reach', 'Control', 'Discovery', 'Monitoring need', 'Potential use'].map((h) => (
                          <th key={h} className="text-left px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Broad', 'High', 'Low', 'High', 'High', 'Campaigns with strong conversion data'],
                        ['Phrase', 'Medium', 'Medium', 'Medium', 'Medium', 'Directional targeting with flexibility'],
                        ['Exact', 'Low', 'High', 'Low', 'Lower', 'Precision targeting on proven terms'],
                      ].map(([type, ...rest]) => (
                        <tr key={type} className="border-b border-[#F4F6F8]">
                          <td className="px-3 py-2 border border-[#D0D5DD] font-semibold text-[#0A0A0A] text-xs">{type}</td>
                          {rest.map((cell, i) => (
                            <td key={i} className="px-3 py-2 border border-[#D0D5DD] text-[#667085] text-xs">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-4 text-sm italic">
                  No single match type is universally best. The right combination depends on campaign maturity, conversion data quality, and budget.
                </p>
              </section>

              {/* H2: Negative Keywords */}
              <section id="negative-keywords" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Negative Keywords for General Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Negative keywords prevent your ads from showing for searches that are unlikely to produce qualified leads. Unlike positive keywords, negative keywords use their own matching logic and require separate management. Building a thorough negative keyword list is one of the most impactful actions you can take to improve lead quality and reduce wasted spend.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Employment and education</h3>
                <ul className="list-disc list-inside text-[#667085] space-y-1 pl-1 mb-4">
                  {['Jobs', 'Careers', 'Salary', 'Employment', 'Apprenticeship', 'Training', 'Course', 'Classes', 'Certification exam', 'Resume'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">DIY and informational</h3>
                <ul className="list-disc list-inside text-[#667085] space-y-1 pl-1 mb-4">
                  {['DIY', 'How to', 'Tutorial', 'Plans', 'Blueprint', 'Ideas', 'Images', 'Pictures', 'Definition', 'Meaning'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Materials and equipment</h3>
                <ul className="list-disc list-inside text-[#667085] space-y-1 pl-1 mb-4">
                  {['Materials only', 'Supplies', 'Wholesale', 'Used tools', 'Equipment rental', 'Calculator', 'Software'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Low-fit services</h3>
                <p className="text-[#667085] leading-relaxed mb-2">Only add these if you genuinely do not offer the related service:</p>
                <ul className="list-disc list-inside text-[#667085] space-y-1 pl-1 mb-4">
                  {['Handyman', 'Small repair', 'Furniture', 'Cleaning', 'Painting only'].map(k => <li key={k}>{k}</li>)}
                </ul>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Commercial or residential exclusions</h3>
                <p className="text-[#667085] leading-relaxed">
                  Residential-only contractors may need to exclude commercial project searches. Commercial-only contractors may need to exclude residential searches. Review actual search terms to identify which exclusions are relevant to your business.
                </p>
              </section>

              {/* H2: Campaign Structure */}
              <section id="campaign-structure" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Organize Keywords by Campaign and Ad Group</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Campaign structure should reflect your actual service offerings and budget priorities. Organizing by service allows independent control of bids, budgets, and messaging for each category.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 font-mono text-xs text-[#0A0A0A] mb-4 overflow-x-auto">
                  <pre>{`Campaign: Kitchen Remodeling
  Ad group: Kitchen remodeling contractor
  Ad group: Kitchen renovation company
  Ad group: Custom kitchen remodeling

Campaign: Home Additions
  Ad group: Home addition contractor
  Ad group: Room addition builder
  Ad group: Second-story additions

Campaign: ADU Construction
  Ad group: ADU contractor
  Ad group: Garage conversion
  Ad group: Detached ADU builder`}</pre>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Tightly relevant groups help maintain consistency across the full search path:
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 font-mono text-xs text-[#0A0A0A] mb-4">
                  Search → Keyword → Ad → Landing page → Lead qualification
                </div>
                <p className="text-[#667085] leading-relaxed">
                  You do not need a separate ad group for every minor keyword variation. When keywords share the same meaning and landing page intent, keeping them together is often more practical and easier to manage.
                </p>
              </section>

              {/* H2: Project Value */}
              <section id="project-value" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Choose Keywords Based on Project Value</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Not all keywords deserve the same bid or budget allocation. When evaluating which services to prioritize in your campaigns, consider:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-2 pl-1 mb-4">
                  <li><strong>Average contract value</strong> — higher-value services can support higher cost per lead</li>
                  <li><strong>Gross margin</strong> — profitable services justify more aggressive bidding</li>
                  <li><strong>Lead-to-sale rate</strong> — a higher close rate changes your allowable cost per lead</li>
                  <li><strong>Customer acquisition target</strong> — your maximum allowable spend to acquire a project (see{' '}
                    <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to calculate your target CPL</Link>)</li>
                  <li><strong>Crew capacity</strong> — can you actually fulfill more leads for this service?</li>
                  <li><strong>Sales cycle length</strong> — longer cycles tie up budget without quick feedback</li>
                  <li><strong>Qualification requirements</strong> — some projects need more screening before investment</li>
                  <li><strong>Service-area economics</strong> — property values and remodeling investment levels vary by location</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  A keyword that generates fewer but higher-value inquiries may outperform a high-volume keyword in terms of actual signed revenue. Prioritize keywords where you can measure the full outcome — from click to qualified lead to signed contract.
                </p>
              </section>

              {/* H2: Search Terms Report */}
              <section id="search-terms-report" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Use the Search Terms Report</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The search terms report in Google Ads shows the actual searches that generated activity on your ads. It is one of the most important tools for managing keyword performance because it reveals the gap between the keywords you added and the searches that actually triggered your ads.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">Use it to:</p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-1 pl-1 mb-4">
                  <li>Find the actual language your target customers use</li>
                  <li>Identify negative keywords from irrelevant searches</li>
                  <li>Discover new keyword themes worth adding</li>
                  <li>Compare the meaning of search terms with your selected keywords</li>
                  <li>Identify geographic patterns in your traffic</li>
                  <li>Evaluate which searches correlate with qualified leads</li>
                  <li>Refine campaign and ad group structure</li>
                </ul>
                <CalloutBox type="warning" label="Not all searches are visible">
                  Google does not show every search query that triggered your ads. The report shows a subset of searches. This means your negative keyword work is never complete — you may be paying for irrelevant searches that are not visible in the report.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-4">
                  Connect search-term analysis with your actual lead outcomes. When a search term produces a lead, record what happened: Was it qualified? Did it result in an estimate? Did the project get signed? Connecting search terms to CRM stages, call recordings, and signed revenue gives you the data to make real keyword decisions.
                </p>
              </section>

              {/* Inline CTA */}
              <InlineCTA
                headline="Are the Right Searches Producing the Right Projects?"
                body="We analyze your keywords, search terms, landing pages, lead quality, and signed revenue to identify which searches are producing profitable construction projects."
                buttonLabel="Request a Free Marketing Assessment"
              />

              {/* H2: Performance */}
              <section id="performance" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Evaluate Keyword Performance</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Clicks and impressions measure visibility and traffic — they do not measure business results. Evaluating keyword performance requires tracking further down the conversion path:
                </p>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-2 pl-1">
                  <li><strong>Impressions</strong> — how often the ad appeared</li>
                  <li><strong>Click-through rate (CTR)</strong> — percentage of impressions that resulted in clicks</li>
                  <li><strong>Cost per click (CPC)</strong> — average cost for each click</li>
                  <li><strong>Conversion rate</strong> — percentage of clicks that became leads</li>
                  <li><strong>Cost per lead</strong> — total spend divided by leads generated</li>
                  <li><strong>Qualified lead rate</strong> — percentage of leads that met your project criteria</li>
                  <li><strong>Cost per qualified lead</strong> — spend divided by qualified leads</li>
                  <li><strong>Appointment rate</strong> — qualified leads that resulted in meetings</li>
                  <li><strong>Estimate rate</strong> — appointments that resulted in submitted estimates</li>
                  <li><strong>Close rate</strong> — estimates that resulted in signed contracts</li>
                  <li><strong>Customer acquisition cost</strong> — total spend to acquire one signed project</li>
                  <li><strong>Signed revenue</strong> — contract value tied to the keyword source</li>
                  <li><strong>Gross profit by source</strong> — the most meaningful long-term metric</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mt-4">
                  A keyword with a high CTR may still be unprofitable if the leads it generates are low quality. A keyword with a low CTR may produce the most profitable projects. Optimize toward signed revenue and gross profit, not clicks.
                </p>
              </section>

              {/* H2: Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Keyword Mistakes Contractors Make</h2>
                <ul className="list-disc list-inside text-[#667085] leading-relaxed space-y-2 pl-1">
                  <li>Using one campaign for every service — prevents service-level budget control</li>
                  <li>Targeting keywords that are too broad — attracts low-intent or irrelevant traffic</li>
                  <li>Ignoring the search terms report — misses irrelevant searches costing real money</li>
                  <li>Not building or maintaining negative keyword lists</li>
                  <li>Mixing emergency repairs and major remodels in one ad group</li>
                  <li>Targeting service areas that are unprofitable to serve</li>
                  <li>Sending all keywords to the homepage instead of relevant service pages</li>
                  <li>Optimizing for raw lead volume instead of qualified opportunities</li>
                  <li>Using informational terms as primary commercial keywords</li>
                  <li>Treating all match types identically without evaluating reach vs control trade-offs</li>
                  <li>Copying competitor keyword lists without validating lead quality</li>
                  <li>Keeping keywords that generate leads but produce no signed projects</li>
                  <li>Failing to connect keyword spend to signed revenue in the CRM</li>
                </ul>
              </section>

              {/* H2: Final Recommendations */}
              <section id="final-recommendations" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Best Google Ads Keywords for General Contractors: Final Recommendations</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There is no static universal list of the best contractor keywords. The best keywords for your campaigns are those that consistently produce qualified, profitable projects for your specific services, in your actual service area, at a cost that supports your business economics.
                </p>
                <ol className="list-decimal list-inside text-[#667085] leading-relaxed space-y-2 pl-1 mb-4">
                  <li>Start with the services that generate the most profitable projects for your business</li>
                  <li>Prioritize commercial intent over search volume</li>
                  <li>Add geographic relevance for locations you can serve profitably</li>
                  <li>Organize campaigns by service, not by keyword volume</li>
                  <li>Match landing pages to keyword intent — not your homepage</li>
                  <li>Use match types intentionally based on your campaign goals and data quality</li>
                  <li>Build and regularly update your negative keyword lists</li>
                  <li>Review the search terms report to understand what your ads are actually matching</li>
                  <li>Track qualified leads — not just form fills or calls</li>
                  <li>Optimize toward signed projects and gross profit by source</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  For context on how keyword strategy fits into a complete contractor marketing system, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>. To understand how Google Search Ads compare to Local Services Ads as a channel choice, see{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads for contractors</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Build a More Profitable Contractor Keyword Strategy"
                body="Create a Google Ads campaign focused on qualified searches, profitable services, and measurable signed revenue."
                buttonLabel="Schedule a Free Marketing Assessment"
              />

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} locale="en-US" />
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Article navigation">
              <TableOfContents items={tocItems} variant="desktop" />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
