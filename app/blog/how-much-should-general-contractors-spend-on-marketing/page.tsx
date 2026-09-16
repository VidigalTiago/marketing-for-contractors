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

const SLUG = 'how-much-should-general-contractors-spend-on-marketing'
const ARTICLE_ID = 'contractor-marketing-budget'

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
  { id: 'what-determines-budget', label: "What Determines a Contractor's Marketing Budget?", level: 2 as const },
  { id: 'percentage-method', label: 'The Percentage-of-Revenue Method', level: 2 as const },
  { id: 'goal-based-method', label: 'The Goal-Based Method', level: 2 as const },
  { id: 'comparing-methods', label: 'Comparing the Two Methods', level: 2 as const },
  { id: 'growth-stage', label: 'How Growth Stage Changes the Budget', level: 2 as const },
  { id: 'project-type', label: 'How Project Type Changes the Budget', level: 2 as const },
  { id: 'fixed-vs-variable', label: 'Fixed Costs vs Variable Ad Spend', level: 2 as const },
  { id: 'calculate-afford', label: 'How to Calculate What You Can Afford', level: 2 as const },
  { id: 'calculator', label: 'Contractor Lead Funnel Calculator', level: 2 as const },
  { id: 'allocation', label: 'How to Allocate Budget Across Channels', level: 2 as const },
  { id: 'paid-vs-seo', label: 'Paid Ads vs SEO', level: 2 as const },
  { id: 'increase-spend', label: 'When to Increase Marketing Spend', level: 2 as const },
  { id: 'decrease-spend', label: 'When to Reduce or Pause Spend', level: 2 as const },
  { id: 'mistakes', label: 'Common Budgeting Mistakes', level: 2 as const },
  { id: 'framework', label: 'A Practical Framework to Set Your Budget', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'How Much Should General Contractors Spend on Marketing?' },
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
                href="/br/blog/quanto-general-contractors-devem-investir-em-marketing"
                className="text-xs text-[#667085] border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors"
                hrefLang="pt-BR"
              >
                PT — Ver em Português
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
                  There is no single correct marketing budget for a general contractor. A budget that works for a kitchen and bathroom remodeling company in a competitive metro market can be far too small, or far too large, for a custom home builder in a smaller service area.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Two common approaches show up in most marketing planning: setting a percentage of revenue, or building the number up from a growth goal and a target customer acquisition cost. Neither one is automatically correct on its own.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article walks through both methods, how project type and growth stage change the right answer, and a practical framework for setting your own number. For the underlying lead-cost math this framework depends on, see the guide on{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what a good cost per lead looks like for general contractors</Link>.
                </p>
              </section>

              {/* What determines budget */}
              <section id="what-determines-budget" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Determines a Contractor&apos;s Marketing Budget?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A contractor marketing budget is shaped by several factors at once, not by any single rule of thumb:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Average signed project revenue and gross margin</li>
                  <li>Current lead-to-sale and qualified-lead-to-sale rates</li>
                  <li>How many additional signed projects the business wants per month</li>
                  <li>Sales cycle length for the services offered</li>
                  <li>Available project capacity to fulfill new work</li>
                  <li>How competitive the local market is for paid channels</li>
                  <li>Current mix of paid, organic, and referral demand</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Two businesses in the same market, offering the same services, can have entirely different appropriate budgets if one has a stronger close rate, better margins, or more available capacity than the other.
                </p>
              </section>

              {/* Percentage method */}
              <section id="percentage-method" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Percentage-of-Revenue Method</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The simplest approach ties marketing spend directly to revenue.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Marketing budget = Annual revenue × marketing percentage</p>
                  <p className="text-[#667085]">Example:</p>
                  <p>Annual revenue: $2,000,000</p>
                  <p>Marketing percentage: 5%</p>
                  <p className="font-bold mt-1">Annual marketing budget: $100,000</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  General small-business guidance often cites a range of roughly 2% to 10% of revenue, with businesses pursuing faster growth generally closer to the higher end. This range is not specific to construction, and it does not account for lead economics, margin, or sales-cycle length.
                </p>
                <CalloutBox type="info" label="Limitation">
                  Percentage-of-revenue is a budgeting shortcut, not a growth plan. It scales spend with revenue you already have, not with the revenue you are trying to generate.
                </CalloutBox>
              </section>

              {/* Goal-based method */}
              <section id="goal-based-method" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Goal-Based Method</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A goal-based, or bottom-up, budget starts from how many signed projects the business wants and what it can afford to spend acquiring each one.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Marketing budget = Desired signed projects × Target customer acquisition cost</p>
                  <p className="text-[#667085] mt-3">Example:</p>
                  <p>Desired signed projects per month: 4</p>
                  <p>Target customer acquisition cost: $3,000</p>
                  <p className="font-bold mt-1">Monthly marketing budget: 4 × $3,000 = $12,000</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  This method connects the budget directly to a growth target and to the lead economics covered in the{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">cost-per-lead framework</Link>. It does not, on its own, check whether that spend is realistic for the business&apos;s cash flow.
                </p>
              </section>

              {/* Comparing methods */}
              <section id="comparing-methods" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Comparing the Two Methods</h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Method</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Strength</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Weakness</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Percentage of revenue', 'Simple, scales with cash already coming in', 'Ignores lead economics and growth targets'],
                        ['Goal-based (CAC × volume)', 'Ties spend directly to growth goals', 'Does not check cash flow on its own'],
                      ].map(([method, strength, weakness]) => (
                        <tr key={method} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{method}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{strength}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{weakness}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  A practical approach uses the goal-based number as the primary budget and the percentage-of-revenue figure as a ceiling check. If the goal-based number is far above what the percentage method suggests, that gap is worth examining before committing the spend.
                </p>
              </section>

              {/* Growth stage */}
              <section id="growth-stage" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Growth Stage Changes the Budget</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A company building its pipeline from a small base of projects generally needs to invest ahead of current revenue to reach its next stage of growth. A more established company with a steady referral base and repeat customers may run a smaller, more efficiency-focused budget aimed at protecting margin rather than maximizing volume.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Neither stage is automatically right or wrong. The budget should reflect what the business is actually trying to do next, not a number copied from a different company at a different stage.
                </p>
              </section>

              {/* Project type */}
              <section id="project-type" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Project Type Changes the Budget</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Small repairs and single-room projects typically have shorter sales cycles and lower average revenue than additions, ADU construction, whole-home remodeling, or custom homes.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Higher-value, longer-cycle projects can often support a higher acquisition cost per signed project, but only when margins, close rate, and the business&apos;s capacity to deliver larger projects actually support that spend. A budget built for high-ticket work assumes a sales process capable of closing high-ticket work.
                </p>
              </section>

              {/* Fixed vs variable */}
              <section id="fixed-vs-variable" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Fixed Marketing Costs vs Variable Ad Spend</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A complete marketing budget includes two different categories of cost.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Variable ad spend:</strong> Google Ads, Local Services Ads, and other pay-per-click or pay-per-lead media</li>
                  <li><strong className="text-[#0A0A0A]">Fixed costs:</strong> CRM software, call tracking, website hosting and maintenance, creative production, agency retainers</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Fixed costs do not scale down automatically when lead volume drops, which is why they should be planned for separately rather than folded into the same percentage as ad spend.
                </p>
              </section>

              {/* Calculate afford */}
              <section id="calculate-afford" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Calculate What You Can Afford</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  This is the same underlying math used to find a maximum affordable cost per lead, applied at the level of a total monthly budget.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 1: Set a target customer acquisition cost</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Base this on gross profit per project and how much of it the business is willing to spend acquiring the project.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 2: Decide how many additional signed projects you want</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Check this against real fulfillment capacity, not just demand.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 3: Multiply target CAC by desired signed projects</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-4 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Monthly budget = Target CAC × Desired signed projects</p>
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 4: Add fixed marketing costs on top</h3>
                <p className="text-[#667085] leading-relaxed">
                  CRM, call tracking, and agency fees are not part of the CAC calculation above but still need to be funded.
                </p>
              </section>

              {/* Calculator */}
              <section id="calculator" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor Lead Funnel Calculator</h2>
                <p className="text-[#667085] leading-relaxed mb-2">
                  Use this calculator with your own monthly numbers to see the CAC and cost-per-lead figures your current budget is actually producing. All calculations run client-side and no data is stored or transmitted.
                </p>
                <ContractorLeadCalculator locale="en-US" />
              </section>

              {/* Allocation */}
              <section id="allocation" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Allocate Budget Across Channels</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There is no fixed ideal split across channels, but a few principles generally hold:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Concentrate budget in one or two high-intent channels before spreading it across many</li>
                  <li>Fund fixed costs (CRM, tracking, website maintenance) separately from variable media spend</li>
                  <li>Reallocate toward whichever channel produces the lowest cost per qualified lead and signed project, not the lowest cost per click</li>
                  <li>Review allocation on a schedule long enough to capture a full sales cycle, not week to week</li>
                </ul>
              </section>

              {/* Paid vs SEO */}
              <section id="paid-vs-seo" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Much Should Go to Paid Ads vs SEO?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Paid channels generally produce visibility quickly but stop producing leads as soon as spend stops. SEO requires upfront and ongoing investment with a longer time lag before it produces meaningful organic traffic, but it does not charge per click once rankings are established.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A contractor with limited cash flow tolerance for a long payback period will generally lean more heavily on paid channels early on, while a business planning multiple years ahead can treat SEO as a compounding asset worth funding alongside paid media rather than instead of it. For more on how the two channels compare directly, see{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads for general contractors</Link>.
                </p>
              </section>

              {/* Increase spend */}
              <section id="increase-spend" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">When to Increase Marketing Spend</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Customer acquisition cost is consistently below target</li>
                  <li>The business has available capacity to take on more signed projects</li>
                  <li>Close rate has not started declining as lead volume increases</li>
                  <li>Fixed costs are already covered and additional spend is genuinely incremental</li>
                </ul>

                <InlineCTA
                  headline="Not Sure If Your Budget Has Room to Grow?"
                  body="We look at your current CAC, close rate, and capacity to tell you whether increasing spend would produce more profitable projects or just more leads."
                  buttonLabel="Request a Free Marketing Assessment"
                />
              </section>

              {/* Decrease spend */}
              <section id="decrease-spend" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">When to Reduce or Pause Marketing Spend</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Customer acquisition cost has been above target for a sustained period</li>
                  <li>The business is already at full project capacity</li>
                  <li>Lead quality has declined without an identified, fixable cause</li>
                  <li>Cash flow cannot support the current pace of spend</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Cutting spend has a lag effect: leads and appointments already in the pipeline from prior spend typically continue converting for some time after a reduction, which can make the effect of a cut harder to read in the short term.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Contractor Budgeting Mistakes</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Copying a percentage of revenue from a different industry or a different type of contractor</li>
                  <li>Setting a budget without checking current fulfillment capacity</li>
                  <li>Ignoring fixed marketing costs when planning variable ad spend</li>
                  <li>Increasing spend before confirming the acquisition cost is actually profitable</li>
                  <li>Cutting spend the moment results dip, without checking for a lag effect</li>
                  <li>Spreading a small budget across too many channels at once</li>
                  <li>Never revisiting the budget after the business&apos;s margins or sales process change</li>
                </ul>
              </section>

              {/* Framework */}
              <section id="framework" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Practical Framework to Set Your Own Budget</h2>
                <CalloutBox type="tip" label="Summary">
                  Start from a goal-based number built on your target CAC, check it against a percentage-of-revenue ceiling, and add fixed costs on top.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Calculate gross profit per project using real signed revenue and margin.</li>
                  <li>Set a target customer acquisition cost based on that gross profit.</li>
                  <li>Decide how many additional signed projects you want per month, checked against capacity.</li>
                  <li>Multiply target CAC by desired signed projects for a variable ad spend figure.</li>
                  <li>Add fixed marketing costs (CRM, tracking, website, agency fees) on top.</li>
                  <li>Compare the total against a percentage-of-revenue ceiling as a cash flow sanity check.</li>
                  <li>Review the budget on a cycle long enough to capture full sales-cycle data, then adjust.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  For the full picture of how budget fits into a broader contractor marketing strategy, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">complete general contractor marketing guide</Link>. For how to measure whether the spend is paying off, see{' '}
                  <Link href="/blog/contractor-marketing-roi" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to calculate contractor marketing ROI</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Build a Marketing Budget Sized to Your Growth Goals"
                body="Get a clear, goal-based marketing budget built from your real project economics, not a generic percentage of revenue."
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
