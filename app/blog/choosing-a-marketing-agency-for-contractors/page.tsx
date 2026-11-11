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

const SLUG = 'choosing-a-marketing-agency-for-contractors'
const ARTICLE_ID = 'choosing-a-marketing-agency-for-contractors'

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
  { id: 'why-hire-an-agency', label: 'Why General Contractors Hire a Marketing Agency', level: 2 as const },
  { id: 'what-they-do', label: 'What a Contractor Marketing Agency Actually Does', level: 2 as const },
  { id: 'agency-vs-inhouse', label: 'Agency vs In-House Marketer vs Freelancer', level: 2 as const },
  { id: 'pricing-models', label: 'How Contractor Marketing Agencies Price Their Services', level: 2 as const },
  { id: 'ownership', label: 'Who Should Own the Ad Accounts, Website, and Data', level: 2 as const },
  { id: 'case-studies', label: 'How to Evaluate Case Studies and Past Results', level: 2 as const },
  { id: 'questions-to-ask', label: 'Questions to Ask Before Hiring an Agency', level: 2 as const },
  { id: 'contract-terms', label: 'Contract Terms Worth Reading Closely', level: 2 as const },
  { id: 'red-flags', label: 'Signs a Marketing Agency Is Not a Fit', level: 2 as const },
  { id: 'trial-period', label: 'Setting a Fair Trial Period', level: 2 as const },
  { id: 'reporting', label: 'What Good Reporting Looks Like', level: 2 as const },
  { id: 'niche-vs-generalist', label: 'Contractor-Specific Agency vs General Agency', level: 2 as const },
  { id: 'mistakes', label: 'Common Mistakes When Hiring an Agency', level: 2 as const },
  { id: 'checklist', label: 'A Simple Agency Evaluation Checklist', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'How to Choose a Marketing Agency for Your Construction Company' },
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
                href="/br/blog/como-escolher-uma-agencia-de-marketing-para-general-contractors"
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
                  Most general contractors reach the same point eventually: referrals and word of mouth stop being enough to fill the schedule, and the business needs a marketing engine it can rely on. The next decision, hiring an agency, is where a lot of that momentum gets lost, because the agency landscape is crowded with vendors who look identical on a sales call and perform very differently once the contract is signed.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The problem is rarely a lack of agencies willing to take the business. It is a lack of a clear framework for telling a agency that will produce signed projects apart from one that will produce a nice-looking dashboard and little else. Pricing models, account ownership, contract length, and reporting habits vary enormously between vendors, and most of that variation is invisible until after the first invoice.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article walks through what a contractor marketing agency actually does, how agencies price their work, who should own which accounts, the contract terms worth reading closely, and the specific questions and red flags that separate a good hire from an expensive mistake. For the broader marketing system this decision fits into, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>.
                </p>
              </section>

              {/* Why hire an agency */}
              <section id="why-hire-an-agency" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Why General Contractors Hire a Marketing Agency</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The decision to hire usually follows one of a few patterns: lead flow from referrals has plateaued or declined, the owner or office manager is spending hours each week on marketing tasks they are not trained for, a specific channel such as Google Ads or local SEO has grown too technical to manage without dedicated expertise, or the business is entering a growth phase that referrals alone cannot support fast enough.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  None of these reasons guarantee that hiring an agency is the right move at any price or with any vendor. They explain why the conversation starts. What happens after that conversation, how the agency is selected and managed, is what determines whether the decision pays for itself.
                </p>
              </section>

              {/* What they do */}
              <section id="what-they-do" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What a Contractor Marketing Agency Actually Does</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Scope varies by vendor, but most contractor marketing agencies offer some combination of the service areas below. Not every agency covers every row, which is exactly why scope needs to be confirmed in writing rather than assumed.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Service Area</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Typical Deliverable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Paid search', 'Google Ads campaign setup, keyword and negative keyword management, bid strategy'],
                        ['Local SEO', 'Google Business Profile optimization, citations, review strategy, local landing pages'],
                        ['Website', 'Design, hosting, conversion-focused copy, ongoing maintenance and updates'],
                        ['Tracking', 'Call tracking numbers, conversion tracking, UTM parameters, CRM integration'],
                        ['Content', 'Blog articles, service pages, case studies, email sequences'],
                        ['Reporting', 'Monthly performance review tied to leads, appointments, and signed revenue'],
                      ].map(([area, deliverable]) => (
                        <tr key={area} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{area}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{deliverable}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  A full-service agency may cover all six rows under one fee. A specialist agency may cover only paid search or only SEO, leaving the contractor to hire separately for website and content work. Neither model is wrong, but the two are not interchangeable, and comparing a full-service retainer to a single-channel specialist fee without adjusting for scope is a common source of confusion when shopping between vendors.
                </p>
              </section>

              {/* Agency vs in-house */}
              <section id="agency-vs-inhouse" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Agency vs In-House Marketer vs Freelancer</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  An agency is not the only option, and it is not always the right one. The table below summarizes the trade-offs across the three most common paths.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Option</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Breadth of Skill</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Cost Structure</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Key Weakness</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Agency', 'Multiple specialists across channels', 'Monthly retainer, percentage, or performance fee', 'Shared attention across multiple client accounts'],
                        ['In-house marketer', 'Deep knowledge of this one business', 'Full-time salary, benefits, and tools', 'Single point of failure; limited specialty depth'],
                        ['Freelancer', 'Narrow, channel-specific expertise', 'Hourly or project rate, usually lowest fixed cost', 'Limited availability; no backup if unavailable'],
                      ].map(([option, breadth, cost, weakness]) => (
                        <tr key={option} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{option}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{breadth}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{cost}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{weakness}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Many established contractors eventually land on a hybrid: an in-house coordinator who owns the CRM, responds to leads, and manages reviews, paired with an agency or freelancer for the technical channels, such as paid search, that genuinely benefit from specialized, up-to-date platform knowledge. For how much of the overall budget any of these options should consume, see the{' '}
                  <Link href="/blog/how-much-should-general-contractors-spend-on-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">contractor marketing budget guide</Link>.
                </p>
              </section>

              {/* Pricing models */}
              <section id="pricing-models" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Contractor Marketing Agencies Price Their Services</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Four pricing models cover most of the market. None is inherently better; each shifts risk and incentives differently between the agency and the contractor.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Flat monthly retainer</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  A fixed fee for a defined scope of work, independent of results. Predictable for budgeting, but it puts the full burden on the contractor to confirm the scope is being delivered, since the fee does not move with performance.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Percentage of ad spend</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  The management fee scales with how much is spent on advertising. Common in paid media management specifically. Worth checking whether the agency has any incentive to recommend spending more than the account actually needs.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Performance-based or pay-per-lead</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  The contractor pays per lead, appointment, or signed project rather than a flat fee. This can align incentives well, but it also raises the same question raised in the{' '}
                  <Link href="/blog/angi-leads-vs-google-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Angi Leads vs Google Ads comparison</Link>: whether the lead is exclusive to the contractor or shared with other businesses paying for the same program.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Project-based fee</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  A one-time fee for a defined deliverable, such as a new website or a brand identity package, with no ongoing management component.
                </p>
                <CalloutBox type="warning" label="A Price in Isolation Tells You Nothing">
                  The question is never what an agency charges by itself. It is what that fee produces in qualified leads and signed revenue, which can only be judged after a real sales cycle of campaign data, not from the proposal alone.
                </CalloutBox>
              </section>

              {/* Ownership */}
              <section id="ownership" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Who Should Own the Ad Accounts, Website, and Data</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The contractor should own every account the agency manages: the Google Ads account, the Google Business Profile, the website domain and hosting, the CRM, and the analytics property. Google Ads supports manager account access specifically so an agency can operate a campaign without owning the underlying account, and the same principle applies to the other platforms.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  An agency that insists on holding these assets under its own name or its own account, rather than the contractor&apos;s, creates a lock-in problem that only becomes visible when the relationship ends. Switching agencies at that point can mean losing years of campaign history and conversion data, losing control of the website, or in the worst case losing the Google Business Profile listing that the entire local presence depends on.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Google Ads account: contractor-owned, agency granted manager access</li>
                  <li>Google Business Profile: contractor listed as the verified owner</li>
                  <li>Website domain and hosting: registered in the contractor&apos;s name and account</li>
                  <li>Analytics and tag manager: contractor-owned property, agency granted user access</li>
                  <li>CRM data: exportable by the contractor at any time, not locked inside agency-only software</li>
                </ul>
              </section>

              {/* Case studies */}
              <section id="case-studies" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Evaluate Case Studies and Past Results</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A case study with impressive-looking numbers and no context is marketing material, not evidence. Useful evaluation requires asking what time period the numbers cover, whether they describe raw leads or qualified leads, whether they tie back to signed revenue or stop at clicks and impressions, and whether the client is in a comparable trade, market size, and project value range.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The strongest signal is not a case study at all. It is a live conversation with a current client, ideally one in a similar trade, who is willing to describe the relationship candidly, including anything that has gone wrong and how the agency handled it. An agency confident in its own work should be able to produce that reference without hesitation.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  It is also reasonable to ask to see an actual campaign dashboard, with client names redacted, rather than a static screenshot prepared for a sales deck. A screen-share of real, current account data is much harder to fabricate than a slide.
                </p>
              </section>

              {/* Questions to ask */}
              <section id="questions-to-ask" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Questions to Ask Before Hiring an Agency</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>What specific services are included in this fee, and what costs extra?</li>
                  <li>Who owns the ad accounts, website, and Google Business Profile after the engagement ends?</li>
                  <li>How are leads tracked, and does reporting connect to signed revenue or stop at clicks and impressions?</li>
                  <li>What is the minimum contract term, and what is the cancellation notice period?</li>
                  <li>Does the agency have direct experience with general contractors or construction companies specifically?</li>
                  <li>Can a current client in a similar trade serve as a reference I can speak with directly?</li>
                  <li>Who is my actual point of contact, and how often will we meet to review results?</li>
                  <li>What happens to historical campaign data and reporting if I decide to leave?</li>
                </ul>
              </section>

              {/* Contract terms */}
              <section id="contract-terms" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contract Terms Worth Reading Closely</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The sales conversation sets expectations, but the contract sets what actually happens when something goes wrong. A few clauses deserve specific attention before signing.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Minimum term length and whether it auto-renews without an explicit confirmation</li>
                  <li>Cancellation notice period and whether any early-termination fee applies</li>
                  <li>Account and data ownership upon termination, stated explicitly rather than assumed</li>
                  <li>Process and cost for changes in scope, such as adding a new service area</li>
                  <li>Specific deliverables and reporting cadence, not vague language like &quot;ongoing optimization&quot;</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  None of these clauses guarantee good results on their own. What they guarantee is that both sides know exactly what happens if the relationship does not work out, which is the point at which vague contracts cause the most damage.
                </p>
              </section>

              {/* Red flags */}
              <section id="red-flags" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Signs a Marketing Agency Is Not a Fit</h2>
                <CalloutBox type="warning" label="Watch For These">
                  No legitimate agency can guarantee a specific number of leads or a first-page Google ranking. Both outcomes depend on factors outside any single vendor&apos;s control, including the platform&apos;s own algorithm and auction dynamics.
                </CalloutBox>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mt-5">
                  <li>Refusing to grant the contractor ownership of the ad accounts or website</li>
                  <li>Reporting that only covers clicks, impressions, or raw lead counts, never signed revenue</li>
                  <li>Guaranteeing a specific lead volume or ranking position before any campaign has run</li>
                  <li>Pushing a long-term contract before producing any results to justify it</li>
                  <li>Unable or unwilling to provide a reference client willing to speak directly</li>
                  <li>Vague answers about who the day-to-day point of contact actually is</li>
                  <li>Reluctance to explain, in plain language, how a specific tactic is expected to produce signed projects</li>
                </ul>
              </section>

              {/* Trial period */}
              <section id="trial-period" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Setting a Fair Trial Period</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Paid campaigns typically need four to eight weeks before lead volume and quality stabilize as the platform&apos;s algorithm learns and the agency refines targeting. After that, the contractor still needs time to move those leads through appointments, estimates, and signed contracts before the relationship can be judged on real revenue outcomes rather than lead counts alone.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A fair evaluation window covers a full sales cycle for the services being marketed, which is longer for large remodeling or custom-build projects than for small repair work. Judging an agency after two or three weeks, before any lead has had time to become a signed project, is one of the most common ways a genuinely good hire gets fired too early.
                </p>

                <InlineCTA
                  headline="Not Sure How to Evaluate Your Current Marketing Agency?"
                  body="We review existing campaigns, account ownership, and reporting against the same standard we hold ourselves to, and tell you plainly whether what you have is working."
                  buttonLabel="Request a Free Marketing Assessment"
                />
              </section>

              {/* Reporting */}
              <section id="reporting" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Good Reporting Looks Like</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Reporting that stops at clicks, impressions, and raw lead counts describes advertising activity, not business results. Useful reporting connects that activity to the metrics that actually matter: cost per qualified lead, appointment rate, estimate rate, and signed revenue by channel. The full breakdown of these metrics is covered in{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what is a good cost per lead for general contractors</Link>, and the revenue side is covered in{' '}
                  <Link href="/blog/contractor-marketing-roi" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to calculate contractor marketing ROI</Link>.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  An agency that cannot produce this level of reporting is not necessarily acting in bad faith, but it does mean the contractor is being asked to trust the relationship without the data needed to verify it.
                </p>
              </section>

              {/* Niche vs generalist */}
              <section id="niche-vs-generalist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor-Specific Agency vs General Agency</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  An agency that specializes in general contractors or construction companies usually arrives already familiar with service-area targeting, permit and licensing terminology, seasonal demand swings, and the long, multi-touch sales cycles typical of construction projects. That familiarity can shorten the ramp-up period considerably.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A general marketing agency may offer broader creative resources, more platform certifications, or lower rates from serving a wider range of industries, but it usually needs more time to understand how a construction business actually generates and closes leads before it functions well. Neither path is automatically correct; the relevant test is whether the agency can produce results with businesses that sell the way a general contractor sells, not whether it specializes in the trade by name alone.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Mistakes When Hiring a Contractor Marketing Agency</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Choosing based on the lowest monthly fee without comparing scope of services</li>
                  <li>Signing a long-term contract before any campaign data exists</li>
                  <li>Letting the agency own the ad accounts, website, or Google Business Profile</li>
                  <li>Accepting a guaranteed lead count or ranking position at face value</li>
                  <li>Judging performance after two or three weeks instead of a full sales cycle</li>
                  <li>Skipping the reference-client conversation in favor of a polished case study PDF</li>
                  <li>Never confirming in writing who the actual day-to-day point of contact is</li>
                  <li>Evaluating only clicks and leads instead of appointments and signed revenue</li>
                  <li>Assuming a contractor-specific label alone guarantees better results than a generalist</li>
                </ul>
              </section>

              {/* Checklist / final answer */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Simple Agency Evaluation Checklist</h2>
                <CalloutBox type="tip" label="Summary">
                  A good marketing agency fit is one where the contractor retains ownership of every account, the reporting connects to signed revenue, the contract term is short enough to exit without a real sales cycle of evidence, and a real client is willing to vouch for the relationship.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Confirm the exact scope of services included in the fee, in writing.</li>
                  <li>Confirm the contractor, not the agency, will own every ad account, the website, and the Google Business Profile.</li>
                  <li>Ask for a reference client in a similar trade and have the conversation directly.</li>
                  <li>Read the minimum term, cancellation notice, and scope-change clauses before signing.</li>
                  <li>Set expectations for a trial period that covers a full sales cycle, not a few weeks.</li>
                  <li>Require reporting that ties back to appointments and signed revenue, not just clicks and leads.</li>
                  <li>Treat any guaranteed lead count or ranking position as a reason for caution, not confidence.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  For how to budget for this decision once an agency is selected, see the{' '}
                  <Link href="/blog/how-much-should-general-contractors-spend-on-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">contractor marketing budget guide</Link>. For the complete marketing system this decision supports, see the{' '}
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
                headline="Considering a Change in Marketing Agencies?"
                body="We will review your current campaigns, account ownership, and reporting against a clear standard, and tell you plainly what is working and what is not."
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
