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
import ContractorLeadCalculator from '@/components/blog/contractor-lead-calculator'

const SLUG = 'google-ads-budget-for-general-contractors'
const ARTICLE_ID = 'google-ads-budget-for-general-contractors'

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
  { id: 'what-controls', label: 'What a Google Ads Budget Actually Controls', level: 2 as const },
  { id: 'daily-vs-monthly', label: 'Daily Budget vs Monthly Spending Limit', level: 2 as const },
  { id: 'budget-vs-bid', label: 'Budget vs Bid: Two Different Dials', level: 2 as const },
  { id: 'minimum-budget', label: 'Is There a Minimum Google Ads Budget for Contractors?', level: 2 as const },
  { id: 'by-service', label: 'How to Split Budget Across Services', level: 2 as const },
  { id: 'smart-bidding-learning', label: 'Smart Bidding, Budget Changes, and the Learning Status', level: 2 as const },
  { id: 'search-lost-is', label: 'How to Tell When Your Budget Is Actually Too Low', level: 2 as const },
  { id: 'pmax-lsa-budget', label: 'How Performance Max and Local Services Lead Goals Spend Budget', level: 2 as const },
  { id: 'calculator', label: 'Contractor Lead Funnel Calculator', level: 2 as const },
  { id: 'scaling', label: 'How to Scale Budget Without Breaking Performance', level: 2 as const },
  { id: 'reducing', label: 'When and How to Reduce Budget Safely', level: 2 as const },
  { id: 'location', label: 'How Location and Competition Change the Right Budget', level: 2 as const },
  { id: 'tying-to-cpl', label: 'Connecting Budget to Cost per Lead and Profit', level: 2 as const },
  { id: 'mistakes', label: 'Common Google Ads Budget Mistakes', level: 2 as const },
  { id: 'framework', label: 'A Practical Framework for Setting Your Budget', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'How Much Should General Contractors Spend on Google Ads?' },
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
                href="/br/blog/orcamento-de-google-ads-para-general-contractors"
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
                  A general contractor asking how much to spend on Google Ads is usually asking a narrower question than it sounds like. The decision to run paid search has already been made. What is actually missing is the number that goes in the budget field, and some way to know whether that number is too low, too high, or roughly right.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That is a different question from how much a construction company should spend on marketing overall, which depends on revenue targets, channel mix, and growth stage, covered in the{' '}
                  <Link href="/blog/how-much-should-general-contractors-spend-on-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">contractor marketing budget guide</Link>. This article stays one level down, inside the Google Ads account itself: what the daily budget number actually controls, how it behaves against Google&apos;s own spending rules, how it interacts with Smart Bidding, and how to tell when budget, rather than something else, is the real limit on performance.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  For the full strategy this fits into, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>.
                </p>
              </section>

              {/* What controls */}
              <section id="what-controls" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What a Google Ads Budget Actually Controls</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A Google Ads budget sets a ceiling on how much a campaign can spend. It does not control who sees the ad, how relevant the keywords are, how well the landing page converts, or how good the offer is. Those are the job of keyword selection, negative keywords, ad copy, audience settings, and the page the click lands on.
                </p>
                <CalloutBox type="info" label="Core Principle">
                  A budget increase can only buy more opportunities to compete in the auction. It cannot fix a weak ad, a broad keyword list, or a landing page that does not convert.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  That distinction matters because contractors frequently reach for budget as the first lever to pull when a campaign underperforms, when the actual problem is targeting, message match, or lead follow-up. The sections below cover how to tell which situation you are actually in.
                </p>
              </section>

              {/* Daily vs monthly */}
              <section id="daily-vs-monthly" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Daily Budget vs Monthly Spending Limit</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The number a contractor enters is an average daily budget. Google Ads Help describes it as the amount that specifies "how much you are roughly comfortable spending each day over the course of the month," and it can be edited at any time.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That word, average, matters. Google does not spend the exact same amount every single day. According to Google Ads Help, Google optimizes spend toward days with more opportunity for clicks and conversions, which means actual daily spend can run below or above the entered number, within two hard limits: a daily spending limit of "two times your average daily budget for most campaigns," and a monthly spending limit of "30.4 times your average daily budget for most campaigns," which corresponds to the average number of days in a month.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Example:</p>
                  <p>Average daily budget: $50</p>
                  <p>Maximum spend on any single day: $50 × 2 = $100</p>
                  <p className="font-bold mt-1">Maximum spend across a 30-day month: $50 × 30.4 = $1,520</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  This is why a campaign can show $90 spent on a Tuesday and $12 on a Sunday without anything being wrong. Google is reallocating spend toward the days it expects more clicks and conversions, inside the same monthly cap.
                </p>
              </section>

              {/* Budget vs bid */}
              <section id="budget-vs-bid" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Budget vs Bid: Two Different Dials</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Budget and bid answer different questions, and confusing them is one of the most common sources of wasted spend. Budget answers: how much can this campaign spend in total. Bid, or a bid strategy target under Smart Bidding such as target CPA or target ROAS, answers: how much am I willing to pay for a given click or conversion.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Lever</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">What It Controls</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Who Sets It</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Daily budget', 'Total ceiling on spend over a day, averaged across the month', 'Contractor, editable any time'],
                        ['Manual CPC bid', 'The highest amount you are willing to pay for a click', 'Contractor, per keyword or ad group'],
                        ['Target CPA / Target ROAS', 'What Smart Bidding aims to pay per conversion to hit a cost or return goal', 'Contractor sets the target, Google’s algorithm sets the actual bid per auction'],
                      ].map(([lever, controls, who]) => (
                        <tr key={lever} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{lever}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{controls}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{who}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  A campaign can have plenty of unspent budget left and still fail to spend it, because the bid is not competitive enough to win auctions. Before raising budget, it is worth confirming the account is actually constrained by budget and not by an uncompetitive bid or target.
                </p>
              </section>

              {/* Minimum budget */}
              <section id="minimum-budget" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Is There a Minimum Google Ads Budget for Contractors?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Ads Help does not publish a minimum recommended budget. There is no official floor that applies to every contractor, every service, or every metro area.
                </p>
                <CalloutBox type="warning" label="Do Not Borrow Someone Else's Number">
                  Published "average contractor cost-per-click" figures circulating online are not official Google data, and they vary enormously by service, market, and competition. The only reliable cost-per-click number is the one your own account is actually paying, visible in your account’s own auction data.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A practical way to think about a floor is this: the daily budget needs to be large enough, relative to your own account&apos;s real cost-per-click, to produce enough clicks across the day that the campaign is not exhausting its budget within the first hour or two. A budget that runs out early in the day stops competing for the rest of the day&apos;s searches, which shows up directly in the Search Lost IS (budget) metric covered later in this guide.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  There is also a data-volume consideration. Smart Bidding strategies need enough conversions flowing through the account to optimize effectively. A budget so small that the campaign generates only a handful of clicks a week gives the bidding algorithm very little to learn from, regardless of what target is set.
                </p>
              </section>

              {/* By service */}
              <section id="by-service" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Split Budget Across Services</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Running every service inside one combined campaign and one combined budget makes it difficult to tell which service is actually producing qualified leads and which is simply consuming the account’s spend. A kitchen remodeling keyword set with high search volume can quietly use up most of a shared budget before a lower-volume, sometimes higher-margin service such as home additions gets meaningful exposure.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Separating budget by campaign, one per major service, as covered in the{' '}
                  <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads for general contractors guide</Link>, makes it possible to set a different budget, bid strategy, and target for each service based on its own project value and margin, rather than letting one service determine the economics for all of them.
                </p>
              </section>

              {/* Smart Bidding learning */}
              <section id="smart-bidding-learning" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Smart Bidding, Budget Changes, and the Learning Status</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A persistent piece of contractor marketing folklore is that touching the budget "resets the algorithm" and should be avoided at all costs. According to Google Ads Help, that is not accurate for budget changes specifically.
                </p>
                <CalloutBox type="tip" label="What Actually Triggers Learning Status">
                  Google Ads Help states that updates to budgets, ROI targets, or targeting settings "take effect in the next auction, but never trigger &apos;Learning&apos; status." Learning status, which never lasts more than seven days, is triggered by a new or reactivated bid strategy, a change to which campaigns, ad groups, or keywords are included, or a significant change to the conversion goals being optimized toward, not by a budget edit on its own.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That does not mean budget should be changed carelessly. Google Ads Help also advises avoiding multiple target changes within a single conversion cycle unless there is a clear business reason, and the same discipline applies to budget: a campaign swung up and down every few days on short-term lead counts never gives the bidding algorithm, or the contractor, a stable enough window to judge whether a given budget level is actually working.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The practical takeaway is that a budget increase, by itself, does not cost you a week of disrupted performance the way changing the bid strategy or conversion goals can. It is safe to use budget as a responsive lever, as long as changes are deliberate and spaced out enough to actually measure the result.
                </p>
              </section>

              {/* Search Lost IS */}
              <section id="search-lost-is" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Tell When Your Budget Is Actually Too Low</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Ads reports two separate metrics for impressions a campaign could have earned but did not, and they point to opposite fixes. Confusing them leads to the single most common budget mistake: raising spend when the real problem was never spend at all.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Metric</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Google’s Definition</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">What Actually Fixes It</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Search Lost IS (budget)', 'The percentage of time your ads weren’t shown on the Search Network due to insufficient budget', 'Raising budget'],
                        ['Search Lost IS (rank)', 'The percentage of time your ads weren’t shown on the Search Network due to poor Ad Rank in the auction', 'Improving bid, Quality Score, or ad relevance, not budget'],
                      ].map(([metric, def, fix]) => (
                        <tr key={metric} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metric}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{def}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Both are available at the campaign level. Google Ads Help frames the general principle this way: "If your impression share is less than 100%, it means raising your bid or budget could help you show more often." The two Lost IS metrics tell you which half of that sentence applies to your account right now.
                </p>
              </section>

              {/* PMax / LSA budget */}
              <section id="pmax-lsa-budget" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Performance Max and Local Services Lead Goals Spend Budget</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Not every Google Ads budget behaves the same way. Google has been migrating Local Services Ads out of its own standalone dashboard and into Google Ads, where it now runs as a Performance Max campaign built around a pay-per-lead goal. According to Google Ads Help, that migration began in August 2026 for selected home and storefront service categories in the United States, expands to more advertiser groups through late 2026, and reaches accounts outside the US in 2027.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Inside a traditional Search campaign, budget caps total spend on clicks, charged whether or not that click becomes a lead. Inside a Local Services lead-goal campaign, budget instead caps total spend on valid leads, charged only when a homeowner calls or messages, with automatic credits available in some cases for leads that do not meet validity requirements. The same dollar figure in the budget field is capping two different things depending on which campaign type it belongs to.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  For the fuller comparison of how these two structures behave for contractors, see the{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads guide</Link>.
                </p>

                <InlineCTA
                  headline="Not Sure If Your Budget Is the Problem?"
                  body="We review your account’s real Search Lost IS, bid strategy, and budget pacing to tell you plainly whether spend is actually what is holding your lead flow back."
                  buttonLabel="Request a Free Marketing Assessment"
                />
              </section>

              {/* Calculator */}
              <section id="calculator" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor Lead Funnel Calculator</h2>
                <p className="text-[#667085] leading-relaxed mb-2">
                  Budget decisions ultimately trace back to the same funnel math as cost per lead. Use this calculator to work out your own maximum affordable budget from your project value, margin, and conversion rates. All calculations run client-side and no data is stored or transmitted.
                </p>
                <ContractorLeadCalculator locale="en-US" />
              </section>

              {/* Scaling */}
              <section id="scaling" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Scale Budget Without Breaking Performance</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The signal to scale is Search Lost IS (budget) staying consistently high while cost per qualified lead and customer acquisition cost remain inside target. That combination means there is more profitable demand available than the current budget is capturing.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Scaling gradually, rather than doubling a working budget overnight, makes it easier to confirm that the additional spend is reaching the same quality of searcher rather than pulling in broader, lower-intent traffic as the campaign spends further down the available demand. Since budget changes do not trigger Learning status, a contractor can make an incremental increase and watch cost per qualified lead over the following one to two weeks without worrying about disrupting the bidding algorithm itself.
                </p>
              </section>

              {/* Reducing */}
              <section id="reducing" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">When and How to Reduce Budget Safely</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Three situations usually justify reducing or pausing further budget growth: customer acquisition cost has stayed above target across a full sales cycle, not just a slow week; Search Lost IS (rank) rather than Search Lost IS (budget) is the dominant source of lost impressions, meaning more spend would not fix the actual bottleneck; or project capacity is already full enough that additional leads cannot be served on a reasonable timeline.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Reduce gradually and watch lead volume and quality over the following weeks rather than cutting sharply, since a sudden drop can remove the account from auctions it was previously winning comfortably, not just the marginal ones.
                </p>
              </section>

              {/* Location */}
              <section id="location" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Location and Competition Change the Right Budget</h2>
                <p className="text-[#667085] leading-relaxed">
                  The same daily budget buys a different number of clicks depending on local competition, since cost-per-click rises with the number of contractors bidding on the same searches in a given metro. A dense, competitive market may require a larger budget to produce the same click volume as a smaller or less contested one. The deeper breakdown of how location affects lead economics, beyond just click volume, is covered in the{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">cost-per-lead guide</Link>.
                </p>
              </section>

              {/* Tying to CPL */}
              <section id="tying-to-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Connecting Budget to Cost per Lead and Profit</h2>
                <p className="text-[#667085] leading-relaxed">
                  Everything in this guide is the operational layer that sits between two bigger questions already covered elsewhere: how much your business should spend on marketing in total, covered in the{' '}
                  <Link href="/blog/how-much-should-general-contractors-spend-on-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">contractor marketing budget guide</Link>, and what a profitable cost per lead looks like for your specific economics, covered in the{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">cost-per-lead guide</Link>. The daily Google Ads budget number is simply where those two answers meet inside the platform itself.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Google Ads Budget Mistakes</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Setting a budget from a published industry-average cost-per-click instead of the account&apos;s own auction data</li>
                  <li>Letting one high-volume service silently consume the entire shared budget</li>
                  <li>Swinging budget up and down every few days based on short-term lead counts</li>
                  <li>Never checking Search Lost IS (budget) or Search Lost IS (rank) at all</li>
                  <li>Raising budget to fix a problem that is actually a Search Lost IS (rank) issue</li>
                  <li>Combining a Search campaign and a Local Services lead-goal campaign under one undifferentiated budget</li>
                  <li>Increasing budget right before a seasonal slowdown without checking historical demand first</li>
                  <li>Never revisiting the budget after margins, close rate, or project capacity change</li>
                  <li>Treating the daily budget figure as a hard daily cap rather than understanding the monthly averaging behind it</li>
                  <li>Scaling budget further without first confirming a smaller increase actually produced more qualified leads</li>
                </ul>
              </section>

              {/* Framework */}
              <section id="framework" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Practical Framework for Setting Your Budget</h2>
                <CalloutBox type="tip" label="Summary">
                  The right Google Ads budget is the smallest number that still lets you capture the profitable demand you are missing, as measured by Search Lost IS (budget), without exceeding the customer acquisition cost your business can afford.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Start from your maximum affordable cost per lead, using your own project value, margin, and close rate.</li>
                  <li>Translate that into a daily budget using your account’s real cost-per-click, not a published average.</li>
                  <li>Give each major service its own campaign and its own budget.</li>
                  <li>Let Smart Bidding run for a full sales cycle before judging results; budget edits are safe, target and strategy edits are not.</li>
                  <li>Check Search Lost IS (budget) and Search Lost IS (rank) weekly to know which lever actually applies.</li>
                  <li>Scale gradually when budget, not rank, is the constraint, and reduce gradually when it is not.</li>
                  <li>Revisit the number whenever margin, close rate, or project capacity changes.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  For the complete marketing system this decision supports, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Stop Guessing at Your Google Ads Budget"
                body="We connect your real auction data, Search Lost IS, bid strategy, and signed revenue to tell you exactly how much your campaigns should be spending."
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
