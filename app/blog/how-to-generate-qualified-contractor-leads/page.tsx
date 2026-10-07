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

const SLUG = 'how-to-generate-qualified-contractor-leads'
const ARTICLE_ID = 'qualified-contractor-leads'

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
  { id: 'what-qualified-means', label: 'What "Qualified" Actually Means', level: 2 as const },
  { id: 'five-filters', label: 'The Five Qualification Filters', level: 2 as const },
  { id: 'where-qualification-happens', label: 'Where Qualification Actually Happens', level: 2 as const },
  { id: 'targeting', label: 'Filter One: Targeting', level: 2 as const },
  { id: 'pay-per-lead', label: 'Pay per Click vs Pay per Lead', level: 2 as const },
  { id: 'lsa-transition', label: 'What Changes for Local Services Ads in 2026', level: 2 as const },
  { id: 'message', label: 'Filter Two: The Message and the Page', level: 2 as const },
  { id: 'form', label: 'Filter Three: The Form', level: 2 as const },
  { id: 'phone', label: 'Filter Four: The First Conversation', level: 2 as const },
  { id: 'feedback-loop', label: 'Filter Five: Teaching the Platform What Qualified Means', level: 2 as const },
  { id: 'google-business-profile', label: 'Google Business Profile and Honest Geography', level: 2 as const },
  { id: 'numbers', label: 'The Numbers That Tell You It Is Working', level: 2 as const },
  { id: 'volume-question', label: 'When More Leads Is the Right Answer', level: 2 as const },
  { id: 'mistakes', label: 'Why Contractor Leads Come In Unqualified', level: 2 as const },
  { id: 'checklist', label: 'The Qualified Lead System, in Order', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'How to Generate Qualified Contractor Leads' },
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
                href="/br/blog/como-gerar-leads-qualificados-para-contractors"
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
                  Almost every contractor who asks for more leads already has leads. What they do not have is leads worth calling back. The phone rings with price shoppers, with homeowners two hours outside the service area, with people wanting a repair the company stopped doing three years ago, and with tenants who cannot authorize work on a property they do not own.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That is why &quot;generate more leads&quot; is the wrong objective. Lead volume is easy to buy. A looser keyword list, a wider radius, and a shorter form will raise it next week. None of that raises signed revenue, because the constraint was never the number of inquiries.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article lays out qualification as a system: what qualified means in concrete terms, the five points where filtering happens, and how to send the outcome back to the ad platforms so they start looking for the people who actually buy. For how this fits the wider picture, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">complete general contractor marketing guide</Link>.
                </p>
              </section>

              {/* What qualified means */}
              <section id="what-qualified-means" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What &quot;Qualified&quot; Actually Means</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Qualified is not a quality rating. It is a yes or no answer to a specific question: could this inquiry become a project this company wants, at a price this company works for, in a timeframe that is real?
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The definition is specific to the business, which is exactly why generic lead generation advice fails. A design-build firm taking whole-house renovations and a handyman operation booking half-day jobs are both general contractors, and a lead that is excellent for one is noise for the other. Before buying a single click, the definition has to be written down in terms anyone on the team can apply to a voicemail.
                </p>
                <CalloutBox type="info" label="The test">
                  If two people in your office would disagree about whether yesterday&apos;s inquiry counted as a qualified lead, you do not have a qualification standard. You have an opinion, and you cannot optimize marketing against an opinion.
                </CalloutBox>
              </section>

              {/* Five filters */}
              <section id="five-filters" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Five Qualification Filters</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Nearly every disqualified contractor lead fails on one of five dimensions. Writing your own thresholds next to each one turns a vague standard into a usable one.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Filter</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">The question it answers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Service fit', 'Is this work the company does, and work it wants more of rather than tolerates?'],
                        ['Geography', 'Is the property inside the area the company will actually travel to and crew profitably?'],
                        ['Budget', 'Is the expected spend inside the range the company works in, at either end?'],
                        ['Timeline', 'Is there a real intention to start, or is this research for a project two years out?'],
                        ['Authority', 'Can the person making contact decide to hire, or sign off with someone reachable?'],
                      ].map(([filter, question]) => (
                        <tr key={filter} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{filter}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{question}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Budget deserves a note, because contractors usually apply it in one direction only. A lead that is too large can be as unqualified as one that is too small: a company set up for kitchen remodels that wins a ground-up addition often loses money learning how to deliver it.
                </p>
              </section>

              {/* Where qualification happens */}
              <section id="where-qualification-happens" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Where Qualification Actually Happens</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Qualification is usually treated as a phone task: a lead arrives, someone calls, they find out it is not a fit. That works, and it is also the most expensive possible place to discover the mismatch, because the click was already paid for and the sales time was already spent.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There are five points where an unqualified inquiry can be stopped, and they get progressively more expensive:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Targeting:</strong> who ever sees the ad, costs nothing to filter</li>
                  <li><strong className="text-[#0A0A0A]">Message and page:</strong> who decides to click and contact, costs an impression</li>
                  <li><strong className="text-[#0A0A0A]">Form:</strong> what you learn before anyone picks up a phone, costs a click</li>
                  <li><strong className="text-[#0A0A0A]">First conversation:</strong> the human check, costs sales time</li>
                  <li><strong className="text-[#0A0A0A]">Feedback loop:</strong> teaching the platform what happened, costs setup once and then pays back</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  Most contractors run filters four and nothing else. The compounding gains are in one, two, three, and five.
                </p>
              </section>

              {/* Targeting */}
              <section id="targeting" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filter One: Targeting</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The cheapest disqualification is the one that happens before an impression is ever served. Three levers do most of the work.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Keyword intent, not keyword volume</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Search intent separates a homeowner ready to hire from someone planning a weekend project. &quot;Kitchen remodel contractor near me&quot; and &quot;how to remodel a kitchen yourself&quot; describe two different people, and only one of them will ever sign a contract. The{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">keyword structure behind a contractor account</Link>{' '}
                  is the first qualification filter, long before anyone sees a form.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Negative keywords as a standing process</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Negative keywords are where intent filtering is maintained, not where it is set up once. Words signalling research, employment, training, wholesale pricing, and do-it-yourself work accumulate constantly as search behaviour shifts. Reviewing the search terms report on a schedule and adding negatives is unglamorous and it is the single highest-return recurring task in most contractor accounts.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Geography that matches the crew, not the ambition</h3>
                <p className="text-[#667085] leading-relaxed">
                  A radius drawn to cover a metro area the company would like to serve, rather than the area it can crew profitably, manufactures unqualified leads at full price. Target the area where jobs are actually won, and treat expansion as a deliberate test with its own budget rather than an assumption baked into every campaign.
                </p>
              </section>

              {/* Pay per lead */}
              <section id="pay-per-lead" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Pay per Click vs Pay per Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  How a channel bills you changes where the risk sits, and it is worth being precise about it. With pay per click you are charged when someone clicks, whether or not they ever make contact. With pay per lead you are charged when contact happens.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google describes the Local Services Ads model as paying only for valid, qualified leads such as phone calls, message leads, or bookings, rather than standard ad clicks. That shifts the cost of a wasted click away from the advertiser, which is a genuine advantage.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  It does not, however, mean every charged lead is qualified by your standard. Google operates automated lead credits for Local Services Ads, where charged leads are reassessed and credits are generally applied to the account balance within 30 days. The feature is available in the United States and Canada, and excluded for health care verticals, tax specialists, and advertisers in EMEA. Google also publishes situations that do not earn a credit, including:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>A valid lead received outside your business hours</li>
                  <li>A customer asking for advice</li>
                  <li>A canceled booking</li>
                  <li>Someone researching projects or prices</li>
                  <li>A lead who never responded to your return call or message</li>
                </ul>
                <CalloutBox type="warning" label="Watch out">
                  Read that list again. A price shopper and a lead who never calls you back are both billable. Pay per lead removes the risk of the empty click, not the work of qualifying the people who do make contact.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  There is also a measurement trap here. &quot;Lead&quot; is defined differently by every platform, so a cost per lead from a pay-per-lead channel that counts any inbound message is not comparable to one from a paid search account that counts completed forms. Comparing the two numbers directly produces confident, wrong conclusions about where the budget should go.
                </p>
              </section>

              {/* LSA transition */}
              <section id="lsa-transition" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Changes for Local Services Ads in 2026</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Anyone relying on Local Services Ads for lead flow should know this is moving. Google has documented a transition of Local Services Ads into Performance Max campaigns with pay-per-lead goals:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">August 2026:</strong> selected home and storefront service categories in the United States, including plumbing, HVAC, electrical, appliance repair, house cleaning, lawn care, roofing, pest control, and moving</li>
                  <li><strong className="text-[#0A0A0A]">Late 2026:</strong> service-area businesses and accounts with custom configurations</li>
                  <li><strong className="text-[#0A0A0A]">2027:</strong> accounts outside the United States and the remaining business categories</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The pay-per-lead billing model carries over. What changes mechanically is that weekly budgets become daily average budgets, and manual bidding along with vertical-level target CPA is deprecated. Google also notes that historical performance reports do not transfer across, and that advertisers get email notice 14 days and 7 days before their migration.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The practical consequence for lead quality is direct. Once bidding is automated rather than manual, the system optimizes toward whatever outcome you report back to it. A contractor who reports every inbound inquiry as a conversion is instructing an automated bidder to find more inquiries of any kind. That makes the feedback loop below less of a refinement and more of a prerequisite.
                </p>

                <InlineCTA
                  headline="Are You Paying for Leads That Cannot Become Projects?"
                  body="We audit where your unqualified leads enter the funnel, from keywords and geography through to what your ad platforms are being told counts as a conversion."
                  buttonLabel="Request a Free Lead Quality Audit"
                />
              </section>

              {/* Message */}
              <section id="message" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filter Two: The Message and the Page</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Ad copy and landing pages are usually written to maximize the number of people who respond. Written instead to attract the right people and repel the wrong ones, the same impressions produce a materially different mix of inquiries.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Four things do most of the filtering:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Name the service precisely:</strong> &quot;full kitchen and bath remodeling&quot; rather than &quot;home improvement services&quot;</li>
                  <li><strong className="text-[#0A0A0A]">State the geography:</strong> the towns or metro area, in the ad text and on the page</li>
                  <li><strong className="text-[#0A0A0A]">Give price context:</strong> a typical project range or a stated project minimum</li>
                  <li><strong className="text-[#0A0A0A]">Describe the customer:</strong> a line about who the company works best with lets the wrong reader self-select out</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Price context is the one contractors resist most and the one that filters hardest. Publishing a typical range, or simply a minimum project size, costs some inquiries from people who were never going to buy and saves the sales time those inquiries would have consumed. The alternative is letting homeowners guess, and people guessing at the price of a renovation guess badly in both directions.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The destination matters as much as the message: sending a kitchen remodeling ad to a home page wastes the click. Service-specific pages are covered in{' '}
                  <Link href="/blog/what-every-general-contractor-website-should-include" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what every general contractor website should include</Link>.
                </p>
              </section>

              {/* Form */}
              <section id="form" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filter Three: The Form</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The form is the last filter that costs nothing to operate, and it is the one where the trade-off is sharpest. Fewer fields generally produce more submissions. More fields generally produce better qualified submissions. Neither is correct in the abstract.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  For qualification specifically, four fields carry most of the signal:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Project type,</strong> as a fixed list rather than free text, so the service-fit filter is applied by the homeowner</li>
                  <li><strong className="text-[#0A0A0A]">Property location,</strong> ideally postal code, which settles geography before anyone calls</li>
                  <li><strong className="text-[#0A0A0A]">Timeline,</strong> as a range from immediate to exploratory, which separates buyers from researchers</li>
                  <li><strong className="text-[#0A0A0A]">Budget range,</strong> as bands rather than an open number, which is the single most effective field and the one most often left out</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Fields like these cut raw submissions. That is the point, and it is why raw submission count is the wrong number to optimize a form against. The same reasoning applies to how channels get compared, which is the argument behind using{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">cost per qualified lead rather than cost per lead</Link>.
                </p>
              </section>

              {/* Phone */}
              <section id="phone" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filter Four: The First Conversation</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Some qualification can only be done by a person. The goal of the first call is not to sell the project. It is to decide, quickly and politely, whether this inquiry deserves a site visit, which is the most expensive thing a contractor gives away for free.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Five questions cover it:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li>What specifically are you looking to have done?</li>
                  <li>Where is the property?</li>
                  <li>When are you hoping to start?</li>
                  <li>Have you set a budget range for this, or would a typical range be useful?</li>
                  <li>Is there anyone else involved in the decision?</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Question four is where most contractors flinch. Offering a range first and asking whether it sounds workable gets the same information as asking about budget outright, without the interrogation. &quot;Projects like this usually land between X and Y. Does that fit what you had in mind?&quot; ends the conversation early in the cases where it should end early.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Two operational notes matter as much as the script. Speed of response decides how many of these conversations happen at all, since a homeowner who contacted several contractors is talking to whoever answered first. And the outcome of each call has to be recorded somewhere structured, because that record is what makes the next filter possible.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  What happens after this call is its own discipline, covered in{' '}
                  <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to follow up with contractor leads</Link>.
                </p>
              </section>

              {/* Feedback loop */}
              <section id="feedback-loop" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Filter Five: Teaching the Platform What Qualified Means</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This is the filter that almost no contractor operates, and the one that compounds. Automated bidding optimizes toward the conversions you report. Report every form submission as a conversion and the system will dutifully find more form submissions, including from the people your sales team spends its day disqualifying.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Ads supports conversion goals specific to lead generation, including <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">qualified lead</code>, <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">converted lead</code>, <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">book appointment</code>, and <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">request quote</code>. Google&apos;s documentation notes that using these lead-generation goals activates invalid traffic protections built specifically for lead generation, so the choice of goal is not merely a label.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The mechanism that carries the offline outcome back is enhanced conversions for leads, the successor to offline conversion import. It sends hashed first-party data from your CRM back to Google so a qualified or signed outcome is attributed to the ad interaction that produced it. Google reports that advertisers using enhanced conversions for leads measure on average 10 percent more conversions than with standard offline conversion import.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google&apos;s published guidance for this setup includes:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Choose qualified lead or converted lead as the conversion goal</li>
                  <li>Use a conversion action with at least 15 conversions in the last 30 days</li>
                  <li>Upload data regularly, ideally daily</li>
                  <li>Favour conversion actions that occur within 7 days of the ad interaction</li>
                  <li>Map the full path from first interaction to closed sale rather than optimizing raw volume</li>
                </ul>
                <CalloutBox type="tip" label="Why this is the leverage point">
                  Filters one through four stop bad leads one at a time. This one changes what the ad platform is hunting for, which means the improvement applies to every future impression rather than to a single inquiry.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  The prerequisite is unglamorous: lead source has to reach the CRM, and the CRM has to record what the lead became. Without that chain, there is nothing to send back, and no amount of bid strategy tuning substitutes for it. The same chain is what makes{' '}
                  <Link href="/blog/contractor-marketing-roi" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">real marketing ROI</Link>{' '}
                  calculable at all.
                </p>
              </section>

              {/* GBP */}
              <section id="google-business-profile" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Google Business Profile and Honest Geography</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A large share of contractor discovery happens in Google Maps and the local pack rather than on the website, and the service area set on the Business Profile decides who finds the company there.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Business Profile allows up to 20 service areas, defined by cities, postal codes, or other areas served, and Google advises that the overall boundary should not extend more than about two hours of driving time from where the business is based. Google also asks that service areas be as specific and accurate as possible.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Listing the maximum because the slots exist is a reliable way to manufacture unqualified inquiries. Every area listed that the company will not realistically travel to produces calls that have to be turned down, which costs sales time and collects the kind of reviews that come from homeowners who felt they were strung along.
                </p>
              </section>

              {/* Numbers */}
              <section id="numbers" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Numbers That Tell You It Is Working</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Four metrics, tracked by source, are enough to run this well:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Qualification rate:</strong> share of inquiries that pass your criteria</li>
                  <li><strong className="text-[#0A0A0A]">Cost per qualified lead:</strong> spend divided by qualified leads, not by total leads</li>
                  <li><strong className="text-[#0A0A0A]">Booked estimate rate:</strong> share of qualified leads that become site visits</li>
                  <li><strong className="text-[#0A0A0A]">Cost per signed project:</strong> the only number that connects to the bank account</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The reason cost per qualified lead matters more than cost per lead is easiest to see with arithmetic. Take two channels at the same spend:
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]"></th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Channel A</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Channel B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Spend', '$2,000', '$2,000'],
                        ['Leads', '40', '16'],
                        ['Cost per lead', '$50', '$125'],
                        ['Qualification rate', '25%', '75%'],
                        ['Qualified leads', '10', '12'],
                        ['Cost per qualified lead', '$200', '$167'],
                      ].map(([metric, a, b]) => (
                        <tr key={metric} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metric}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{a}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Channel B costs two and a half times as much per lead and delivers more qualified leads for less money, while generating 24 fewer phone calls for the office to work through. This is a hypothetical illustration chosen to make the arithmetic visible, not an industry benchmark. Reported on cost per lead alone, Channel B looks like the obvious thing to cut.
                </p>
              </section>

              {/* Volume question */}
              <section id="volume-question" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">When More Leads Is the Right Answer</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Qualification can be overdone. Filters are not free: every one of them also removes some inquiries that would have converted. Tightening qualification while estimators sit idle shrinks the business in the name of efficiency.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The decision depends on which constraint is actually binding:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Sales capacity is full:</strong> raise qualification, because each unqualified call now displaces a real one</li>
                  <li><strong className="text-[#0A0A0A]">Capacity is idle:</strong> widen intake first, since a lead never generated cannot be qualified</li>
                  <li><strong className="text-[#0A0A0A]">Plenty of leads, nothing signing:</strong> the problem is qualification or follow-up, and more spend will make it worse</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  There is also a data floor to respect. Automated bidding needs enough conversion events to learn from, which is the reason behind Google&apos;s guidance to use a conversion action with at least 15 conversions in the last 30 days. Qualifying so aggressively that the reported conversion count collapses can leave the bidding system with too little signal to work with.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Why Contractor Leads Come In Unqualified</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>No written definition of qualified, so no one can agree on what to optimize</li>
                  <li>Every form submission reported to the ad platform as a conversion of equal value</li>
                  <li>The same lead counted twice because two overlapping conversion actions are both set as primary</li>
                  <li>Service area set to where the company wishes it worked rather than where it crews profitably</li>
                  <li>Broad keywords with a negative keyword list that was built once and never revisited</li>
                  <li>No price context anywhere, so every budget level feels invited to inquire</li>
                  <li>Ads pointed at the home page instead of the matching service page</li>
                  <li>Lead source never reaching the CRM, making the feedback loop impossible</li>
                  <li>Cost per lead compared across channels that each define a lead differently</li>
                  <li>Phone leads untracked, so the channels that produce the best conversations look like the weakest</li>
                </ul>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Qualified Lead System, in Order</h2>
                <CalloutBox type="tip" label="Summary">
                  Define qualified in writing, filter earliest and cheapest first, qualify on the call with five questions, and send the outcome back to the platform so it hunts for buyers instead of inquiries.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Write the qualification standard down, with thresholds for service, geography, budget, timeline, and authority.</li>
                  <li>Set targeting to the area the company crews profitably, not the area it aspires to.</li>
                  <li>Build keywords around hiring intent, and review the search terms report on a schedule.</li>
                  <li>Name the service and the service area in the ad copy, and publish price context.</li>
                  <li>Send every ad to its matching service page, never the home page.</li>
                  <li>Add project type, location, timeline, and budget range to the form as structured fields.</li>
                  <li>Respond fast enough to be the first contractor the homeowner actually speaks to.</li>
                  <li>Run the five qualification questions on every first call, and record the outcome.</li>
                  <li>Keep the Google Business Profile service area honest, within Google&apos;s 20 area and two hour guidance.</li>
                  <li>Set lead-specific conversion goals such as qualified lead or converted lead.</li>
                  <li>Wire enhanced conversions for leads from the CRM, and upload daily.</li>
                  <li>Report qualification rate and cost per qualified lead by source, never cost per lead alone.</li>
                  <li>Reassess whether to tighten or widen intake based on which constraint is currently binding.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Run in that order, lead volume often falls while signed revenue rises. That is the expected result, and the reason lead count makes such a poor performance target. For deciding how much to put behind the system once it works, see{' '}
                  <Link href="/blog/how-much-should-general-contractors-spend-on-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how much general contractors should spend on marketing</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Get Leads Your Estimators Want to Call Back"
                body="We will show you exactly where unqualified leads enter your funnel and what to change first, from targeting through to the conversion data your ad platforms are learning from."
                buttonLabel="Schedule a Free Lead Quality Audit"
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
