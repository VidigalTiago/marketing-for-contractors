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

const SLUG = 'angi-leads-vs-google-ads-for-contractors'
const ARTICLE_ID = 'angi-leads-vs-google-ads-for-contractors'

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
  { id: 'what-is-angi-leads', label: 'What Angi Leads Is and How It Works', level: 2 as const },
  { id: 'what-is-angi-ads', label: 'Angi Ads Is a Separate Program', level: 2 as const },
  { id: 'what-is-google-ads', label: 'What Google Ads Means for a Contractor in 2026', level: 2 as const },
  { id: 'pricing-model', label: 'Pricing Model: Shared Fee vs Owned Campaign', level: 2 as const },
  { id: 'exclusivity', label: 'Lead Exclusivity: The Core Difference', level: 2 as const },
  { id: 'control', label: 'Control Over Targeting and Spend', level: 2 as const },
  { id: 'reputation', label: 'Reputation and Eligibility Requirements', level: 2 as const },
  { id: 'comparison-table', label: 'Side-by-Side Comparison', level: 2 as const },
  { id: 'which-fits', label: 'Which Platform Fits Which Contractor', level: 2 as const },
  { id: 'using-both', label: 'Running Both at the Same Time', level: 2 as const },
  { id: 'mistakes', label: 'Common Mistakes When Choosing Between Them', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Angi Leads vs Google Ads for Contractors' },
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
                href="/br/blog/angi-leads-vs-google-ads-para-contractors"
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
                  {article.updatedDate !== article.publishedDate && (
                    <span>· Updated {new Date(article.updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  )}
                </div>
              </header>

              {/* Introduction */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  Angi Leads and Google Ads try to solve the same problem for a general contractor, getting in front of a homeowner who is ready to hire, but they work on almost opposite models. Angi Leads is a marketplace: a homeowner submits one request and Angi matches it to several contractors at once, each of whom pays a fee for that same lead. Google Ads is a campaign the contractor builds and runs directly, whether a traditional Search campaign funded per click on chosen keywords, or, since Local Services Ads folded into Google Ads during 2026, a Performance Max campaign built around a pay-per-lead goal.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Neither platform is a scam, and neither is automatically the right answer. The practical question for a contractor already busy running projects is which model fits the stage the business is actually in: how much time there is to manage a campaign, how established the review history already is, and how much it matters that a lead was sent to one contractor instead of several.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article compares the two platforms using their own published policies and help documentation, not third-party marketing claims. For the broader marketing system both channels fit into, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>.
                </p>
              </section>

              {/* What is Angi Leads */}
              <section id="what-is-angi-leads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Angi Leads Is and How It Works</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Angi Leads is the request-matching program formerly known as HomeAdvisor Pro, now operating under the combined Angi brand after Angie's List and HomeAdvisor merged. A homeowner fills out a service request describing a project, and Angi uses that completed profile to route the request to contractors who match the work type and service area.
                </p>
                <CalloutBox type="info" label="From Angi's Own Help Center">
                  Angi states that the completed service profile is used to "connect customers with multiple Angi Leads service professionals that can best complete their project." The same request is not sent to one contractor. It is sent to several at once.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Pricing runs on a pay-per-lead basis. Angi's own FAQ for professionals states that contractors "pay a nominal fee for each lead you match to," and that "different sized jobs have different Lead Fees," without publishing a fixed price list, directing contractors to contact sales for current rates. Angi also sets no expectation of volume: its help documentation states plainly, "We make no guarantee. As soon as a consumer submits a Service Request that matches your work preferences, we'll contact you."
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A contractor sets up the account by defining the type of work performed and the geography served, which determines which requests the business is eligible to be matched against. There is no bidding mechanism and no way to see how many other businesses received the same request.
                </p>
              </section>

              {/* What is Angi Ads */}
              <section id="what-is-angi-ads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Angi Ads Is a Separate Program</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Angi Leads and Angi Ads are frequently discussed as if they were one product, but Angi itself treats them as two different programs on the same platform. Angi Ads is paid placement rather than request matching: a business becomes "Angi Approved" when it has at least one review, maintains an average rating of 3 stars or higher, has its owner, principal, or relevant manager pass a background check, and holds all applicable state and local licenses.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Angi Approved businesses can then pay to advertise through Angi's website, magazine, and call center, and are listed above businesses that are not Angi Approved in search results. A business that does not meet the rating, background check, or licensing bar is not eligible for Angi Ads placement regardless of budget.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The practical distinction matters for this comparison: a contractor who says "Angi didn't work for me" may be describing Angi Leads, Angi Ads, or both, and the two have different eligibility requirements, different pricing logic, and different failure modes.
                </p>
              </section>

              {/* What is Google Ads */}
              <section id="what-is-google-ads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Google Ads Means for a Contractor in 2026</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A traditional Google Search campaign is keyword-based and charged per click. The contractor chooses the keywords, the geographic targeting, the budget, the bidding strategy, and the landing page the ad points to. For a full breakdown of keyword selection, see the{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">best Google Ads keywords for general contractors guide</Link>.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  What changed in 2026 is that Local Services Ads, previously a separate product with its own dashboard, is being folded directly into Google Ads. According to Google Ads Help, Local Services campaigns are migrating into Google Ads as a Performance Max campaign type built around a pay-per-lead goal. The rollout began in August 2026 for selected home and storefront service categories in the United States, expands to more advertiser groups through late 2026, and reaches non-US accounts in 2027.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Several things stay the same through that migration: the business still pays only for valid leads such as phone calls and messages, not for clicks; ads still appear on Google Search and Google Maps in the same positions; and targeting is still keywordless, based on service category and service area rather than keywords. What changes is the management surface, moving from a standalone LSA dashboard into the main Google Ads interface, and the bidding controls, with weekly budgets converting to daily averages and manual bid caps being removed.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  In practice, "Google Ads" for a contractor in 2026 covers two different pricing models under one roof: a click-based Search campaign the contractor builds from scratch, and a pay-per-lead Performance Max goal that absorbed what used to be the separate Local Services Ads product. For the full comparison of those two Google-owned options against each other, see{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads for general contractors</Link>.
                </p>
              </section>

              {/* Pricing model */}
              <section id="pricing-model" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Pricing Model: Shared Fee vs Owned Campaign</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  The three options a contractor is realistically choosing between charge in three different ways.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Platform</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Charging Basis</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Who Sets the Price</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Published Pricing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Angi Leads', 'Per lead, regardless of outcome', 'Angi, by job size and category', 'Not published; contact sales'],
                        ['Google Search Ads', 'Per click', 'Advertiser, via bids and budget', 'Visible in real time inside the platform'],
                        ['Local Services (Google Ads lead goal)', 'Per valid lead (call or message)', 'Advertiser sets a target cost per lead', 'Visible in real time inside the platform'],
                      ].map(([platform, basis, setter, pricing]) => (
                        <tr key={platform} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{platform}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{basis}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{setter}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{pricing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  On Angi Leads, the fee is set by Angi and is the same whether the contractor wins the job or not. On both Google Ads options, the contractor sets the budget and can adjust it in real time based on results. Neither pricing model is inherently cheaper. The relevant comparison is cost per qualified lead and cost per signed project, covered in detail in{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what is a good cost per lead for general contractors</Link>.
                </p>
              </section>

              {/* Exclusivity */}
              <section id="exclusivity" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Lead Exclusivity: The Core Difference</h2>
                <CalloutBox type="warning" label="The Difference That Matters Most">
                  Angi Leads can send one homeowner's request to several contractors who all pay for it. Google's own advertising policy prohibits that for Local Services: advertisers "may not sell or pass leads to other businesses," so a lead delivered through Local Services belongs to the business that received it, not to a pool of competitors.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google's own marketing for the product states the same thing from the homeowner's side: "Customers choose you: You only hear from customers who have specifically selected your profile out of all the rest." That framing describes Local Services Ads specifically, not a traditional Search campaign, where a click does not carry the same selected-you guarantee, but it does capture the structural difference between a Google Ads lead and an Angi Leads lead.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This does not automatically make a Local Services lead more valuable. The homeowner has already filtered among visible contractor profiles on Google before reaching out, while Angi's matching happens on the back end without the homeowner seeing who else is being contacted. The exclusivity is real, but it does not replace the need to qualify and follow up on every lead regardless of source.
                </p>
              </section>

              {/* Control */}
              <section id="control" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Control Over Targeting and Spend</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A Google Search campaign gives the most direct control: keyword selection, negative keywords, geographic radius, ad copy, landing page, and budget are all set by the contractor and can be changed at any time. A Local Services lead-goal campaign is keywordless, built around service categories and a defined service area, with the contractor setting a target cost per lead rather than a per-click bid.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Angi Leads sits at the other end of the control spectrum. The contractor defines the type of work and the geography served, which determines eligibility, but there is no bidding mechanism, no way to adjust how the request is routed, and no visibility into how many other businesses were matched to the same request. The tradeoff for that lack of control is a lower setup burden: there is no keyword research or landing page to build before the first lead can arrive.
                </p>
              </section>

              {/* Reputation requirements */}
              <section id="reputation" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reputation and Eligibility Requirements</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Both ecosystems gate their highest-visibility placement behind a reputation and licensing check, but the checks are run independently of each other and qualifying for one says nothing about the other.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><span className="font-medium text-[#0A0A0A]">Angi Approved (for Angi Ads):</span> at least one review, an average rating of 3 stars or higher, a passed background check on the owner, principal, or relevant manager, and valid state and local licenses.</li>
                  <li><span className="font-medium text-[#0A0A0A]">Google Guaranteed (for the Local Services lead goal):</span> a background check and license verification for eligible home improvement categories, required before the badge appears on a profile. Google has recently removed the need to submit a license document upfront for many North American categories during initial qualification through its Accelerated Verification flow, though the underlying license requirement from the relevant state or local authority has not gone away.</li>
                  <li><span className="font-medium text-[#0A0A0A]">Traditional Google Search Ads:</span> no trade license or background check gate to simply launch a campaign, only Google's general advertiser identity verification and standard ad policy compliance.</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Angi Leads itself, as opposed to Angi Ads, does not publish a review-score threshold for simply receiving matched requests, which is part of why it can produce volume for a business that is still building its review history.
                </p>

                <InlineCTA
                  headline="Not Sure Which Lead Source Is Actually Paying Off?"
                  body="We track every lead back to its source, whether it came from Angi, Google Search, or Local Services, so you can see cost per qualified lead and signed revenue by channel instead of guessing."
                  buttonLabel="Request a Free Marketing Assessment"
                />
              </section>

              {/* Comparison table */}
              <section id="comparison-table" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Side-by-Side Comparison</h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Dimension</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Angi Leads</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Google Ads (Search / Local Services)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Lead exclusivity', 'Shared with multiple pros per request', 'Exclusive on Local Services; Search leads come from your own ad'],
                        ['Setup effort', 'Low: define work type and geography', 'Higher: keywords, landing page, or lead-goal setup'],
                        ['Targeting control', 'Category and geography only, no bidding', 'Full control on Search; category and area on Local Services'],
                        ['Reputation gate', 'None for Angi Leads; rating and check for Angi Ads', 'None for Search Ads; background check for Local Services'],
                        ['Pricing transparency', 'Fee not published; varies by job size', 'Visible in real time inside the platform'],
                        ['Volume guarantee', 'Explicitly none', 'None, but spend and targeting are directly adjustable'],
                      ].map(([dimension, angi, google]) => (
                        <tr key={dimension} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{dimension}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{angi}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{google}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Which fits */}
              <section id="which-fits" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Which Platform Fits Which Contractor</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">A new business building its first reviews</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Angi Leads does not require an established review history to start receiving matched requests, which can produce volume while a business is still too new for Google Guaranteed or for local SEO to have built organic visibility. The real cost still has to be measured as cost per signed project once the win rate on shared leads is accounted for, not as the raw lead fee.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">An established business with reviews and valid licensing</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Once a business can pass the background check and license verification for Google Guaranteed, the Local Services lead goal offers exclusive leads at a pay-per-lead price the contractor can set and adjust, without the shared-request tradeoff of Angi Leads.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">A business with the capacity to manage a campaign directly</h3>
                <p className="text-[#667085] leading-relaxed">
                  A traditional Search campaign offers the most control over who sees the ad and what they see next, but it also carries the most setup and ongoing management work: keyword research, negative keyword maintenance, landing page quality, and conversion tracking. It fits a business with in-house marketing capacity or an agency relationship more than one hoping for a hands-off channel.
                </p>
              </section>

              {/* Using both */}
              <section id="using-both" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Running Both at the Same Time</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The two are not mutually exclusive, and many established local service businesses run more than one lead source at once rather than betting everything on a single channel. A full breakdown of how different channels compare on lead economics is in{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what is a good cost per lead for general contractors</Link>.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The requirement for running multiple channels profitably is tracking every lead back to its source in the CRM, using call tracking numbers or UTM parameters per channel, and comparing cost per qualified lead and signed revenue separately. A shared marketplace lead and an exclusive search lead are not the same unit of value, and averaging them together hides which channel is actually producing profitable work. For the follow-up discipline that makes any of these channels pay off, see{' '}
                  <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to follow up with contractor leads</Link>.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Mistakes When Choosing Between Them</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Comparing Angi's per-lead fee directly to Google's cost per click as if they measured the same thing</li>
                  <li>Assuming every Angi Leads request reaches only your business</li>
                  <li>Confusing Angi Ads (paid placement, rating-gated) with Angi Leads (request matching, no published rating gate)</li>
                  <li>Launching a Local Services lead goal before the background check and license verification are complete</li>
                  <li>Running a Search campaign without separating cost per qualified lead from raw cost per click</li>
                  <li>Judging either platform after a single slow week instead of a full sales cycle</li>
                  <li>Mixing leads from multiple sources in one CRM field instead of tracking source separately per channel</li>
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Find Out Which Lead Source Actually Grows Your Business"
                body="We set up tracking across every lead source, Angi, Google Search, and Local Services, so you can see cost per qualified lead and signed revenue by channel, not just by total spend."
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
