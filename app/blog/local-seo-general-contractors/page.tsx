import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticleBySlug, getAlternateLanguages, getRelatedArticles, SITE_URL } from '@/lib/articles'
import NavbarCTAWrapper from '@/components/blog/navbar-cta-wrapper'
import TableOfContents from '@/components/blog/table-of-contents'
import RelatedArticles from '@/components/blog/related-articles'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import FAQSection from '@/components/blog/faq-section'
import InlineCTA from '@/components/blog/inline-cta'
import EndArticleCTA from '@/components/blog/end-article-cta'
import ReadingProgress from '@/components/blog/reading-progress'
import CalloutBox from '@/components/blog/callout-box'

const SLUG = 'local-seo-general-contractors'
const ARTICLE_ID = 'local-seo-general-contractors'

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
  { id: 'what-is-local-seo', label: 'What Local SEO Means for a General Contractor', level: 2 as const },
  { id: 'three-factors', label: "The Three Factors Google Uses to Rank Local Results", level: 2 as const },
  { id: 'categories', label: 'Choosing Accurate Business Categories', level: 2 as const },
  { id: 'service-area', label: 'Setting Up a Service Area Without a Storefront', level: 2 as const },
  { id: 'reviews', label: 'Reviews and the Line You Cannot Cross', level: 2 as const },
  { id: 'citations', label: 'Citations and Links: The Other Half of Prominence', level: 2 as const },
  { id: 'service-pages', label: 'Service Pages by City and Project Type', level: 2 as const },
  { id: 'structured-data', label: 'Structured Data for a Local Business', level: 2 as const },
  { id: 'seo-vs-ads', label: 'Local SEO vs Google Ads and Local Services Ads', level: 2 as const },
  { id: 'mistakes', label: 'Common Local SEO Mistakes for Contractors', level: 2 as const },
  { id: 'measure', label: 'How to Measure Local SEO Progress', level: 2 as const },
  { id: 'checklist', label: 'A 90-Day Local SEO Starting Checklist', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Local SEO for General Contractors' },
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
      <NavbarCTAWrapper />

      <main className="bg-white pt-28 pb-20" id="article-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs + hreflang switcher */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
            <Breadcrumbs items={breadcrumbs} />
            {alternates['pt-BR'] && (
              <Link
                href="/br/blog/seo-local-para-general-contractors"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
                hrefLang="pt-BR"
              >
                PT · Ver em Português
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
                  <span className="text-xs text-[#9EA5B3]">{article.readingTime} min read</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] tracking-tight leading-tight mb-4 text-balance">
                  {article.title}
                </h1>
                <p className="text-lg text-[#667085] leading-relaxed mb-6 max-w-2xl">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9EA5B3] border-t border-[#F4F6F8] pt-4">
                  <span>Published {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </header>

              {/* Introduction */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  A homeowner searching for a kitchen remodel tonight is not going to call a contractor three states away. They are going to look at the map Google shows them, pick two or three names that look close, established, and well reviewed, and start there. That map is the first filter in the entire sales process, and it runs before a website loads, before an ad is clicked, and before anyone has spoken to a salesperson.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Local SEO is the work of winning a place in that first filter. For a general contractor it is not a mysterious discipline with secret tricks. Google publishes, in its own words, what determines local ranking, what a service-area business is allowed to do with its address, and what is and is not allowed when it comes to reviews. Most of what passes for local SEO advice is a restatement, sometimes an inaccurate one, of guidance Google has already made public.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article works from that official guidance directly: the three factors Google names for local ranking, how a service-area business should be configured, the line Google draws around reviews, and the structured data Google's own documentation recommends. For where this sits inside a complete marketing program, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing guide</Link>.
                </p>
              </section>

              {/* What is local SEO */}
              <section id="what-is-local-seo" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Local SEO Means for a General Contractor</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  National SEO tries to rank a page for a keyword anywhere a search happens. Local SEO tries to rank a specific business for searches tied to a specific place, and it shows up in two different surfaces: the Local Pack and Maps results that appear with pins and a map, and the regular organic results underneath. A general contractor needs to show up in both, but the Local Pack is usually where the first look happens.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The inputs that drive local ranking are different from the inputs that drive national organic ranking. A Google Business Profile, not just the website, is a primary ranking surface in its own right. Reviews, service areas, categories, and business information carry weight that has no equivalent for a business that is not tied to a physical location or service radius.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  That difference is why a contractor can have a fast, well-written website and still be invisible in local search, and why fixing local SEO usually starts with the Business Profile rather than with the website.
                </p>
              </section>

              {/* Three factors */}
              <section id="three-factors" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Three Factors Google Uses to Rank Local Results</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google's own Business Profile documentation names three factors that determine local search ranking: relevance, distance, and prominence. Everything in this article is an application of one of the three.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Factor</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Google's Definition</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">What a Contractor Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Relevance', "How well a Business Profile matches what someone is searching for", 'Categories, business description, services, service pages, completeness of profile information'],
                        ['Distance', "How far each business is from the person searching, or from the area they specified", 'Accurate business address or service area, correct service area boundaries'],
                        ['Prominence', 'How well known a place is, based on information Google has about it from across the web', 'Review quantity and quality, citations, links, overall online presence'],
                      ].map(([factor, def, control]) => (
                        <tr key={factor} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{factor}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{def}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{control}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CalloutBox type="info" label="Straight from Google">
                  Google states plainly that there is no way to request or pay for a better local ranking. Every lever in this article is either information you give Google about your business or evidence Google finds about it elsewhere. There is no fourth channel.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-4">
                  Distance is the one factor a contractor cannot change for an individual search. Nobody can make their business physically closer to a given homeowner. What a contractor can control is whether their profile tells Google the right service area in the first place, which is covered in its own section below.
                </p>
              </section>

              {/* Categories */}
              <section id="categories" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Choosing Accurate Business Categories</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Categories feed relevance directly, and Google's own guidance on choosing them is narrower than most contractors expect. Google recommends using as few categories as possible to describe the core of the business, not as many as apply.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google's suggested test is to pick categories that complete the sentence "this business IS a," not "this business HAS a." A general contractor that also does roofing is a general contractor with a roofing service, not a business that should list every adjacent category it is capable of performing. Google's guidance is also explicit that categories should not be used solely as keywords to try to rank for extra searches.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Google's category test</p>
                  <p className="text-[#667085]">Ask of every candidate category: does my business <em>IS</em> this, or does my business merely <em>HAVE</em> this as one offering among several? Keep the categories that pass the IS test.</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  In practice this means picking the single primary category that most precisely matches the core trade (general contractor, kitchen remodeler, roofing contractor, and so on), then adding only the small number of additional categories that genuinely describe what the business is, not everything it is willing to quote.
                </p>
              </section>

              {/* Service area */}
              <section id="service-area" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Setting Up a Service Area Without a Storefront</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Most general contractors do not have a showroom customers walk into. Google's guidance for this exact situation is specific: a service-area business that does not serve customers at its own address should remove the address and enter a service area instead.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google places two hard limits on how that service area can be defined:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>A maximum of 20 service areas, defined by cities, postal codes, or other named areas</li>
                  <li>An overall boundary that should not extend more than about two hours of driving time from where the business is based</li>
                </ul>
                <CalloutBox type="warning" label="Watch out">
                  Listing service areas far beyond a realistic driving radius does not expand relevance, it dilutes it. A contractor who claims coverage of an entire state while actually working a 40-minute radius is telling Google the business is relevant to searches it will never profitably serve.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  A contractor who does have a public office or a showroom that customers actually visit is a different case, and keeps that address visible rather than hiding it. The distinction is whether customers come to the business, not whether the business has an address at all.
                </p>
              </section>

              {/* Reviews */}
              <section id="reviews" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reviews and the Line You Cannot Cross</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Reviews feed prominence directly, and Google names both the quantity and the quality of reviews as a prominence signal. Google's recommended way to build that signal is to respond to reviews, which it frames as evidence that a business values its customers, and to accumulate genuine reviews over time.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There is a firm line here, and it is a policy violation, not a gray area. Google's policy on incentivized and biased content prohibits offering payment, a discount, free goods, or any other benefit in exchange for a customer posting, revising, or removing a review. A gift card for a five-star review, a discount for "leaving us a nice review," and a request to take down a negative review in exchange for a refund are all the same violation.
                </p>
                <CalloutBox type="warning" label="What happens if a business gets caught">
                  Google states that businesses found running this kind of fake-engagement activity can have reviews unpublished, lose the ability to receive new reviews for a set period, or have a warning displayed on the profile telling consumers that fake reviews were removed. The risk is not a slap on the wrist, it is the review channel itself going dark.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  The compliant version of asking for reviews is simply asking, right after a project finishes, with no benefit attached to the outcome, and responding to the reviews that come in either way. For how that fits into a full lead and follow-up system, see{' '}
                  <Link href="/blog/how-to-generate-qualified-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to generate qualified contractor leads</Link>.
                </p>

                <InlineCTA
                  headline="Is Your Business Profile Actually Working For You?"
                  body="We audit categories, service areas, review patterns, and citations against Google's own guidance, then tell you exactly what is holding back your local ranking."
                  buttonLabel="Request a Free Local SEO Review"
                />
              </section>

              {/* Citations */}
              <section id="citations" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Citations and Links: The Other Half of Prominence</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google names website links pointing to a business, alongside reviews, as part of what makes a place prominent. For a contractor, those links usually come from directories, trade associations, local chambers of commerce, supplier and manufacturer partner pages, and press coverage of completed projects, rather than from a deliberate link-building campaign.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A citation is a mention of the business name, address, and phone number on another site, with or without a link. Keeping those three details, commonly shortened to NAP, identical everywhere they appear is standard local SEO practice. This is not a rule Google has published as a ranking factor in those terms, but the logic behind it is straightforward: a business listed under three slightly different addresses or phone numbers is harder for Google, and for a homeowner cross-checking a listing, to confirm as one real, continuous business.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The practical version of this is unglamorous: claim or correct listings on the directories that matter in the contractor's trade and region, make sure the name, address, and phone number match the Business Profile exactly, and let the natural mentions a growing business earns do the rest.
                </p>
              </section>

              {/* Service pages */}
              <section id="service-pages" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Service Pages by City and Project Type</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Relevance is not only decided by the Business Profile. The website's own pages tell Google, and the homeowner reading them, exactly what the business does and where. A single page claiming to cover every service in every city the business will drive to is harder for Google to match confidently to a specific search than a set of focused pages.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A structure that tends to work well for a general contractor combines two axes: one page per core service (kitchen remodeling, bathroom remodeling, additions, roofing, and so on) and, where the business genuinely serves distinct markets, one page per major city or region inside the service area. Each page should describe real work done in that service or location, not a thin template repeated with the city name swapped out.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  What those pages need beyond the written content, including proof, contact paths, and technical performance, is covered in full in{' '}
                  <Link href="/blog/what-every-general-contractor-website-should-include" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what every general contractor website should include</Link>.
                </p>
              </section>

              {/* Structured data */}
              <section id="structured-data" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Structured Data for a Local Business</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Structured data is machine-readable markup on the website that states facts about the business explicitly, instead of leaving Google to infer them from text. Google's own documentation requires a business name and a complete address for LocalBusiness eligibility, and recommends adding opening hours, a telephone number, geographic coordinates, a price range, and a working website URL.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google's documentation also makes a specific recommendation on which type to use: use the most specific LocalBusiness subtype available rather than the generic one. Schema.org defines a type hierarchy for exactly this purpose, with <code className="text-xs bg-[#F4F6F8] px-1.5 py-0.5 border border-[#D0D5DD]">GeneralContractor</code> defined as a subtype of <code className="text-xs bg-[#F4F6F8] px-1.5 py-0.5 border border-[#D0D5DD]">HomeAndConstructionBusiness</code>, itself a subtype of <code className="text-xs bg-[#F4F6F8] px-1.5 py-0.5 border border-[#D0D5DD]">LocalBusiness</code>. Marking up a construction company as a generic LocalBusiness, when a more specific and accurate type exists, is leaving relevance information on the table.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Minimum structured data for a general contractor site:</p>
                  <p>"@type": "GeneralContractor"</p>
                  <p>name, address (required for eligibility)</p>
                  <p>telephone, openingHoursSpecification, geo, priceRange, url (recommended)</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  A service-area business that hides its street address in its Google Business Profile should still mark up a mailing or operating address in structured data where it has one, or omit the address field entirely rather than publish a misleading one. Structured data and the Business Profile should tell the same story, not two different ones.
                </p>
              </section>

              {/* SEO vs ads */}
              <section id="seo-vs-ads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Local SEO vs Google Ads and Local Services Ads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Local SEO and paid local channels answer different questions, and treating them as competing options rather than complementary ones is a common planning mistake. Local SEO builds a position in Maps and organic results that keeps producing visibility without a per-click or per-lead charge, but it takes months to build, cannot be switched on for a specific week, and competes on the same signals, relevance, distance, and prominence, with every other contractor in the area.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Ads and Local Services Ads buy placement and leads on a much faster timeline, but the moment spend stops, so does the visibility. A contractor relying only on paid placement is renting the top of the results page every single month. A contractor who has also built local SEO still owns a position when the budget tightens.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  For a full breakdown of how the two paid channels differ from each other, see{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads for general contractors</Link>. The strongest programs run paid and organic local channels at the same time rather than choosing between them.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Local SEO Mistakes for Contractors</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Selecting a long list of categories instead of the few that actually pass Google's "IS a" test</li>
                  <li>Keeping a storefront address visible in the Business Profile when customers never actually visit it</li>
                  <li>Claiming a service area far wider than a realistic driving radius</li>
                  <li>Offering a discount, gift, or refund in exchange for a review, which violates Google's policy outright</li>
                  <li>Never responding to reviews, positive or negative</li>
                  <li>Letting the business name, address, or phone number drift out of sync across directories</li>
                  <li>Publishing one generic page instead of specific pages per service and per city actually served</li>
                  <li>Marking up the website as a generic LocalBusiness instead of the specific GeneralContractor or construction subtype</li>
                  <li>Treating local SEO and paid local ads as substitutes instead of running both together</li>
                  <li>Abandoning the Business Profile after the initial setup instead of keeping hours, photos, and services current</li>
                </ul>
              </section>

              {/* Measure */}
              <section id="measure" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Measure Local SEO Progress</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Local SEO does not have a single dashboard number the way a paid campaign does, so progress has to be read across a few different signals together rather than from one metric alone:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Business Profile performance data: calls, direction requests, and website clicks originating from the profile itself</li>
                  <li>Review volume and rating trend over time, not a single snapshot</li>
                  <li>Organic search traffic to service and city pages, tracked separately from paid traffic</li>
                  <li>Ranking position for the branded search and the core service-plus-city searches that matter most to the business</li>
                  <li>Lead source data in the CRM, so an organic or Maps-attributed lead is recorded as such rather than folded into an "other" bucket</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  The same discipline that applies to paid leads applies here: a lead sourced from local SEO still has to be tracked through to a signed project to know whether the channel is actually working, not just generating visibility. The framework for connecting any lead source to signed revenue is covered in{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what is a good cost per lead for general contractors</Link>.
                </p>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A 90-Day Local SEO Starting Checklist</h2>
                <CalloutBox type="tip" label="Summary">
                  Local ranking comes down to relevance, distance, and prominence. Every item below is an investment in one of those three, directly tied to guidance Google has published itself.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Claim and verify the Google Business Profile if that has not already been done.</li>
                  <li>Reduce the category list to the few that genuinely pass the "this business IS a" test.</li>
                  <li>Set the service area correctly: hide the address if customers are never served on-site, and keep the boundary within a realistic driving radius.</li>
                  <li>Fill in every available field: hours, phone, website, business description, services, attributes, and photos.</li>
                  <li>Start a simple, compliant process for asking every satisfied customer for a review, with no incentive attached.</li>
                  <li>Respond to every review that comes in, positive or negative.</li>
                  <li>Audit the business name, address, and phone number across the directories that matter in the trade and fix any mismatches.</li>
                  <li>Build or rewrite service pages by trade and by city, each with real content specific to that service and location.</li>
                  <li>Add GeneralContractor or the correct construction-specific structured data to the website.</li>
                  <li>Set up tracking so organic and Maps-sourced leads are recorded by source in the CRM, not lumped together.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  None of this replaces paid channels, and none of it produces results overnight. It builds the position that keeps generating visibility long after any single ad campaign ends. For the complete system this fits into, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing guide</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Turn Local Search Into a Real Lead Source"
                body="We build Business Profiles, service pages, and structured data that follow Google's own ranking guidance, so your company shows up where homeowners are already looking."
                buttonLabel="Schedule a Free Local SEO Review"
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
