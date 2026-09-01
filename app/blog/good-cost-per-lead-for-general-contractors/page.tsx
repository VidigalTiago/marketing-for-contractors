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

const SLUG = 'good-cost-per-lead-for-general-contractors'
const ARTICLE_ID = 'good-cost-per-lead-for-general-contractors'

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
  { id: 'what-is-cpl', label: 'What Is Cost per Lead?', level: 2 as const },
  { id: 'good-cpl', label: 'What Is a Good CPL for General Contractors?', level: 2 as const },
  { id: 'raw-vs-qualified', label: 'Raw CPL vs Cost per Qualified Lead', level: 2 as const },
  { id: 'cheap-leads', label: 'Why Cheap Leads Can Be Expensive', level: 2 as const },
  { id: 'expensive-leads', label: 'Why an Expensive Lead Can Still Be Profitable', level: 2 as const },
  { id: 'max-cpl', label: 'How to Calculate Your Maximum Affordable CPL', level: 2 as const },
  { id: 'qualified-lead-cpl', label: 'How to Calculate CPL Using Qualified Leads', level: 2 as const },
  { id: 'calculator', label: 'Contractor Lead Funnel Calculator', level: 2 as const },
  { id: 'project-type', label: 'How Project Type Changes an Acceptable CPL', level: 2 as const },
  { id: 'location', label: 'How Location Affects Contractor Lead Cost', level: 2 as const },
  { id: 'by-channel', label: 'Cost per Lead by Marketing Channel', level: 2 as const },
  { id: 'google-vs-lsa', label: 'Google Ads CPL vs Local Services Ads CPL', level: 2 as const },
  { id: 'landing-pages', label: 'How Landing Pages Affect Cost per Lead', level: 2 as const },
  { id: 'response-time', label: 'How Response Time Affects Lead Economics', level: 2 as const },
  { id: 'qualification', label: 'How Lead Qualification Affects CPL', level: 2 as const },
  { id: 'close-rate', label: 'How Close Rate Changes Your Affordable CPL', level: 2 as const },
  { id: 'cpl-vs-cac', label: 'Cost per Lead vs Customer Acquisition Cost', level: 2 as const },
  { id: 'cpl-vs-roas', label: 'Cost per Lead vs ROAS', level: 2 as const },
  { id: 'tracking', label: 'How to Track Qualified Leads and Signed Projects', level: 2 as const },
  { id: 'diagnose', label: 'How to Diagnose a CPL That Is Too High', level: 2 as const },
  { id: 'mistakes', label: 'Common Contractor CPL Mistakes', level: 2 as const },
  { id: 'budget', label: 'How Much Should a Contractor Budget for Lead Generation?', level: 2 as const },
  { id: 'final-answer', label: 'What Is a Good CPL? Final Answer', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'What Is a Good Cost per Lead for General Contractors?' },
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
                href="/br/blog/bom-custo-por-lead-para-general-contractors"
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
                  {article.updatedDate !== article.publishedDate && (
                    <span>· Updated {new Date(article.updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  )}
                </div>
              </header>

              {/* Introduction */}
              <section className="mb-10 scroll-mt-28">
                <p className="text-[#667085] leading-relaxed mb-4">
                  A good contractor cost per lead is not the cheapest CPL available. It is a cost that produces enough qualified and profitable projects to support the company&apos;s acquisition goals. A $50 lead can be expensive if it never qualifies. A $300 lead can be profitable if it consistently converts into a high-value project with healthy margins.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The question of what a good cost per lead is for a general contractor cannot be answered with one number. It depends on the economics of the specific business — average project value, gross margin, lead quality, close rate, and the company&apos;s target customer acquisition cost. Two contractors in the same market running the same campaign may have entirely different acceptable CPL ranges based on these factors.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article provides a practical framework for calculating your own maximum affordable cost per lead, understanding the metrics that matter alongside raw CPL, and diagnosing when lead costs are actually too high. For context on building the full marketing system, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>.
                </p>
              </section>

              {/* What Is CPL */}
              <section id="what-is-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Is Cost per Lead?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Cost per lead is the amount spent on advertising divided by the number of leads generated during the same period.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Cost per lead = Advertising spend ÷ Number of leads</p>
                  <p className="text-[#667085]">Example:</p>
                  <p>Advertising spend: $5,000</p>
                  <p>Leads generated: 25</p>
                  <p className="font-bold mt-1">Cost per lead: $200</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This calculation is easy to compute, which is why it is widely reported in marketing dashboards. The problem is that a raw CPL figure does not tell you whether the leads were real, qualified, reachable, inside the service area, appropriate for the contractor&apos;s services, large enough to be profitable, or converted into appointments or signed projects.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Reporting cost per lead without also tracking lead quality and downstream conversion is one of the most common ways construction companies misread marketing performance.
                </p>
              </section>

              {/* Good CPL */}
              <section id="good-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Is a Good Cost per Lead for General Contractors?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There is no universal answer. A good CPL must be evaluated relative to the economics of the specific business and market.
                </p>
                <CalloutBox type="info" label="Core Principle">
                  A good CPL is a profitable CPL, not necessarily a low CPL.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The relevant factors include average signed project value, gross margin per project, lead-to-sale conversion rate, lead quality and qualification rate, sales cycle length, service area size, available project capacity, and the target customer acquisition cost the business has set.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Contractors should be careful about comparing their CPL directly to national benchmark articles, different service categories, different states, emergency service businesses, small repair companies, or high-ticket remodeling companies. A CPL that is excellent for a foundation repair company may be unsustainable for a custom home builder, and vice versa.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The sections below explain how to calculate a maximum affordable CPL for your specific situation, using your own numbers.
                </p>
              </section>

              {/* Raw vs Qualified */}
              <section id="raw-vs-qualified" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Cost per Raw Lead vs Cost per Qualified Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A raw lead is any initial inquiry — a form submission, incoming call, chat message, booking request, or Local Services Ads contact. Raw leads include everything: people who are genuinely interested in your services, job applicants, competitors, spam, wrong numbers, and inquiries for services you do not offer.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A qualified lead is one that has passed a deliberate evaluation against your criteria. A qualified contractor lead might match criteria such as the correct project type, correct location, appropriate budget, realistic timeline, decision-maker involvement, property ownership, and minimum project size.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Example:</p>
                  <p>Advertising spend: $6,000</p>
                  <p>Raw leads: 40</p>
                  <p>Qualified leads: 12</p>
                  <p className="mt-2 font-bold">Raw CPL: $150</p>
                  <p className="font-bold">Cost per qualified lead: $500</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The cost per qualified lead is the more useful metric. A campaign with a $150 raw CPL that only produces $500-per-qualified-lead opportunities may be performing worse than a campaign with a $300 raw CPL that consistently produces $400-per-qualified-lead outcomes.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Your qualification criteria should reflect your actual services — only exclude categories for work you genuinely do not take on.
                </p>
              </section>

              {/* Cheap leads */}
              <section id="cheap-leads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Why Cheap Contractor Leads Can Be Expensive</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Low raw CPL can hide serious performance problems. Common sources of inexpensive but low-value leads include job seekers, vendors and subcontractors, spam, wrong numbers, DIY questions, material-only requests, small repairs, projects outside the service area, projects below the minimum size, and leads that cannot be contacted after multiple attempts.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  When these leads make up a large share of the total, an inexpensive raw CPL can mask a very high cost per qualified lead, a low appointment rate, high sales workload per signed project, a low proposal rate, a low average project value, a poor close rate, and ultimately a high customer acquisition cost.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Campaigns optimized purely for lead volume — without regard to lead type, qualification rate, or downstream conversion — often reduce raw CPL while increasing the real cost to acquire a signed project.
                </p>
              </section>

              {/* Expensive leads */}
              <section id="expensive-leads" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Why an Expensive Lead Can Still Be Profitable</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The following is a hypothetical illustration — not an industry benchmark.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Illustrative example:</p>
                  <p>Cost per qualified lead: $800</p>
                  <p>Qualified leads required per signed project: 5</p>
                  <p>Customer acquisition cost: $4,000</p>
                  <p>Average project revenue: $80,000</p>
                  <p>Gross margin: 30%</p>
                  <p className="mt-2 font-bold">Estimated gross profit before acquisition cost: $24,000</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Whether those economics actually work depends on overhead, sales costs, fulfillment risk, cash flow timing, project capacity, and actual margin versus estimated margin. The point is that a $800 CPL is not inherently too high or too low — it depends entirely on the project and business economics behind it.
                </p>
              </section>

              {/* Max CPL */}
              <section id="max-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Calculate Your Maximum Affordable Cost per Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  The following is a simplified model. A more complete analysis should use qualified leads and account for all sales stages.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 1: Determine average project revenue</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Use your actual signed project revenue, not quoted project value. Projects often change in scope between quote and completion.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 2: Estimate gross profit per project</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 my-4 font-mono text-sm text-[#0A0A0A]">
                  Gross profit per project = Average project revenue × Gross margin
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 3: Define a target customer acquisition cost</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Decide how much gross profit your business can allocate to acquiring a project. This is a business decision that depends on your overhead, growth targets, and competitive environment. There is no single correct percentage.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 4: Calculate the lead-to-sale conversion rate</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 my-4 font-mono text-sm text-[#0A0A0A]">
                  Lead-to-sale rate = Signed projects ÷ Total leads
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Step 5: Calculate maximum affordable CPL</h3>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-4 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Maximum affordable CPL = Target CAC × Lead-to-sale rate</p>
                  <p className="text-[#667085] mt-3">Example:</p>
                  <p>Target customer acquisition cost: $3,000</p>
                  <p>Lead-to-sale rate: 5%</p>
                  <p className="font-bold mt-1">Maximum affordable CPL: $3,000 × 5% = $150</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  This is a simplified model. A more detailed version uses qualified-lead-to-sale rate rather than raw lead-to-sale rate, and factors in all acquisition costs — not just ad spend.
                </p>
              </section>

              {/* Qualified lead CPL */}
              <section id="qualified-lead-cpl" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Calculate CPL Using Qualified Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  When you have reliable data on your qualified-lead-to-sale rate, you can calculate a more precise maximum cost per qualified lead.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="font-bold mb-2">Maximum cost per qualified lead = Target CAC × Qualified-lead-to-sale rate</p>
                  <p className="text-[#667085] mt-3">Example:</p>
                  <p>Target customer acquisition cost: $4,000</p>
                  <p>Qualified-lead-to-sale rate: 20%</p>
                  <p className="font-bold mt-1">Maximum cost per qualified lead: $4,000 × 20% = $800</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Separating raw and qualified leads gives you a more accurate view of where your marketing and sales processes are performing well and where they are not. A low raw CPL combined with a low qualified-lead-to-sale rate often indicates a targeting or qualification problem, not a pricing problem.
                </p>
              </section>

              {/* Calculator */}
              <section id="calculator" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor Lead Funnel Calculator</h2>
                <p className="text-[#667085] leading-relaxed mb-2">
                  Use this calculator to compute your key cost-per-lead metrics from your own monthly data. All calculations run client-side and no data is stored or transmitted.
                </p>
                <ContractorLeadCalculator locale="en-US" />
              </section>

              {/* Project type */}
              <section id="project-type" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Project Type Changes an Acceptable CPL</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The acceptable CPL range varies significantly depending on the types of projects a contractor pursues. Small repairs have lower average revenue than bathroom or kitchen remodeling. Deck construction, roofing replacement, and basement remodeling have different margin profiles, sales cycles, and competitive landscapes. Home additions, ADU construction, whole-home remodeling, and custom homes involve longer sales cycles, more complex qualification, and typically higher average project values.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Higher project value can support higher acquisition costs — but only when margins remain healthy, sales conversion is consistent, the business can fulfill the work, cash flow supports the sales cycle, and the leads actually match the intended project type.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Mixing project types in a single campaign without separating performance by service makes it difficult to evaluate whether any individual service is generating profitable results.
                </p>
              </section>

              {/* Location */}
              <section id="location" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Location Affects Contractor Lead Cost</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Lead economics vary across markets based on local competition levels, population density, search demand volume, property values, average project values in the area, seasonality, licensing requirements, travel distance between service locations, and service area size.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A lead in a dense urban market with many competing contractors may cost more per click than a lead in a less competitive suburban market — but the average project value may also differ significantly. The relevant question is not whether CPL is higher in one market, but whether the fully loaded acquisition cost produces profitable projects in that specific location.
                </p>
              </section>

              {/* By channel */}
              <section id="by-channel" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Cost per Lead by Marketing Channel</h2>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Different marketing channels have fundamentally different lead economics. The table below summarizes the key dimensions — it does not include unsupported cost figures.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Channel</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Typical Intent</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Charging Model</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Control</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Attribution Difficulty</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Main Lead-Quality Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Google Search Ads', 'High (active search)', 'Per click', 'High', 'Low–Medium', 'Broad match / weak negatives'],
                        ['Local Services Ads', 'High (local search)', 'Per lead', 'Low–Medium', 'Medium', 'Out-of-scope inquiries'],
                        ['SEO / Organic', 'Mixed', 'Upfront + ongoing cost', 'Medium', 'Medium', 'Informational intent traffic'],
                        ['Google Business Profile', 'High (local intent)', 'Free listing', 'Low', 'Medium', 'Review quality dependency'],
                        ['Meta Ads', 'Low–Medium (demand gen)', 'Per click / impression', 'High', 'High', 'Low hiring intent'],
                        ['Home-service marketplaces', 'Medium', 'Per lead (often shared)', 'Low', 'High', 'Lead shared with competitors'],
                        ['Referrals', 'High', 'Variable (commission / time)', 'Low', 'High', 'Inconsistent volume'],
                        ['Email reactivation', 'High (past contacts)', 'Marginal per send', 'Medium', 'Medium', 'List quality decay'],
                        ['Organic social', 'Low', 'Time investment', 'Low', 'High', 'Low direct conversion'],
                      ].map(([channel, intent, model, control, attribution, risk]) => (
                        <tr key={channel} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{channel}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{intent}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{model}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{control}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{attribution}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Google Search typically captures active demand from users already looking for a contractor. Local Services Ads can generate direct inquiries for eligible services and categories. SEO has upfront and ongoing costs but does not charge per click once rankings are established. Social advertising may generate awareness and demand rather than immediate hiring intent. Marketplace leads may be shared with competing contractors depending on the platform and program. Referral leads involve networking, commissions, or operational effort that has a real cost even when no direct fee is charged.
                </p>
              </section>

              {/* Google vs LSA */}
              <section id="google-vs-lsa" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Google Ads CPL vs Local Services Ads CPL</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Comparing the raw CPL between Google Search Ads and Local Services Ads can be misleading because the two platforms differ in charging method, lead delivery mechanism, targeting control, landing page use, qualification process, attribution, and service eligibility requirements.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A more useful comparison evaluates cost per qualified lead, appointment rate, estimate rate, customer acquisition cost, signed revenue, and gross profit — measured separately for each channel over a period long enough to capture full sales cycles.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  For a detailed side-by-side breakdown of how the two platforms work and how to evaluate them for your business, see the{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads comparison for contractors</Link>.
                </p>
              </section>

              {/* Landing pages */}
              <section id="landing-pages" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Landing Pages Affect Cost per Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The landing page a visitor reaches after clicking an ad directly influences how many of those clicks become leads, and what quality of lead completes the form or call. A page that converts at a higher rate lowers CPL by producing more leads from the same ad spend. A page that qualifies leads better reduces the volume of irrelevant inquiries, which lowers the cost per qualified lead even if raw CPL stays the same.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Key elements that influence landing page performance for contractors include a service-specific headline that matches the ad, a clear statement of the service area, real project images, genuine reviews, license and insurance information, a clear and specific call to action, project-type selection options on the form, a concise form with minimal friction, fast load speed, and a visible phone contact option.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Reducing CPL by lowering the qualification threshold — accepting any form submission as a lead — increases raw lead volume without improving business outcomes. The goal is not the lowest possible CPL. It is the lowest possible cost per qualified lead that produces profitable projects.
                </p>
              </section>

              {/* Response time */}
              <section id="response-time" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Response Time Affects Lead Economics</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Marketing cost can be wasted when leads are not contacted promptly or consistently. A lead that was generated by paid advertising but never reached — because of a missed call, delayed follow-up, or no after-hours process — represents the full CPL with zero chance of a return.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Effective follow-up includes an immediate acknowledgment when possible, direct calls, SMS reminders, email follow-up sequences, multiple contact attempts over a defined period, appointment reminders, CRM task management, clear ownership of each lead, and a defined process for after-hours and weekend inquiries.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Faster and more consistent follow-up generally reduces the risk of losing an active buyer to another contractor who responded first. For a practical follow-up system, see the article on{' '}
                  <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to follow up with contractor leads</Link>.
                </p>
              </section>

              {/* Qualification */}
              <section id="qualification" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Lead Qualification Affects CPL</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Qualification criteria define which inquiries are worth investing sales effort into. For contractors, relevant criteria typically include correct service type, project location within the service area, minimum project size, budget range, desired timeline, property ownership, decision-maker status, and whether financing is needed.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The balance matters. Too little qualification creates wasted sales time, inflated lead counts, and misleadingly low CPL figures that do not reflect actual business performance. Too much friction in the form or process may reduce completed inquiries from legitimate prospects who do not want to answer extensive questions before speaking with someone.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Qualification can and should occur across multiple touchpoints: the landing page form, the initial phone call or SMS, the CRM intake process, and the appointment itself. Each stage provides an opportunity to confirm fit before investing more time.
                </p>
              </section>

              {/* Close rate */}
              <section id="close-rate" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Close Rate Changes Your Affordable CPL</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The following is a mathematical example with a fixed target customer acquisition cost. It is not an industry benchmark.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Target customer acquisition cost: $3,000</p>
                  <p>Lead-to-sale rate: 2% → Maximum CPL: $60</p>
                  <p>Lead-to-sale rate: 5% → Maximum CPL: $150</p>
                  <p>Lead-to-sale rate: 10% → Maximum CPL: $300</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Improving the sales process — faster response, better qualification, stronger estimates, consistent follow-up — increases the number of leads that convert into signed projects. This directly increases the amount the contractor can profitably invest in marketing per lead, without needing to reduce CPL.
                </p>
              </section>

              {/* CPL vs CAC */}
              <section id="cpl-vs-cac" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Cost per Lead vs Customer Acquisition Cost</h2>
                <p className="text-[#667085] leading-relaxed mb-5">
                  These metrics measure different stages of the same funnel. CAC is closer to the final business outcome than raw CPL.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Metric</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Measures</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Best Used For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Cost per lead', 'Cost to generate an inquiry', 'Campaign efficiency'],
                        ['Cost per qualified lead', 'Cost to generate a relevant opportunity', 'Lead quality evaluation'],
                        ['Cost per appointment', 'Cost to create a scheduled sales conversation', 'Follow-up performance'],
                        ['Customer acquisition cost', 'Cost to acquire a signed customer', 'Business profitability'],
                      ].map(([metric, measures, use]) => (
                        <tr key={metric} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{metric}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{measures}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* CPL vs ROAS */}
              <section id="cpl-vs-roas" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Cost per Lead vs ROAS</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-3 my-4 font-mono text-sm text-[#0A0A0A]">
                  ROAS = Attributed signed revenue ÷ Advertising spend
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  ROAS connects advertising spend to revenue, which makes it more complete than raw CPL. However, revenue is not gross profit. A campaign with a 5x ROAS that generates $100,000 in revenue may still be unprofitable if margins are thin or if agency fees, sales costs, and fulfillment expenses are not accounted for.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Additional limitations include incomplete attribution (long sales cycles may cross attribution windows), signed project values that change after contract, canceled projects that distort reporting, and cash collection timing that does not match the reporting period.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Contractors should review CPL, cost per qualified lead, CAC, ROAS, gross margin, and project capacity together — not optimize toward any single metric in isolation.
                </p>
              </section>

              {/* Tracking */}
              <section id="tracking" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Track Qualified Leads and Signed Projects</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Connecting advertising spend to signed project revenue requires a structured tracking flow:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-[#667085] text-sm leading-relaxed mb-5 pl-1">
                  <li>Ad click or call → Lead created with source captured</li>
                  <li>Lead qualified or disqualified with reason recorded</li>
                  <li>Appointment scheduled (or lost with reason)</li>
                  <li>Estimate created</li>
                  <li>Proposal sent</li>
                  <li>Project won or lost with contract value and lost reason recorded</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Tools and concepts that support this flow include Google Ads conversion tracking, call tracking with source attribution, UTM parameters on all ad destinations, GCLID capture in CRM forms, CRM stage management, offline conversion imports, enhanced conversions for leads, and revenue attribution reporting.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The key principle is that the ad platform and the CRM must agree on what counts as a conversion. A form submission, a qualified lead, an appointment, and a signed contract each represent a different level of business value and should be tracked and valued separately.
                </p>

                <InlineCTA
                  headline="Do You Know What Your Leads Are Really Worth?"
                  body="We connect advertising spend, lead quality, appointments, estimates, CRM stages, and signed revenue to identify your true acquisition cost and most profitable campaigns."
                  buttonLabel="Request a Free Marketing Assessment"
                />
              </section>

              {/* Diagnose */}
              <section id="diagnose" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Diagnose a CPL That Is Too High</h2>
                <p className="text-[#667085] leading-relaxed mb-5">
                  High CPL rarely has a single cause. The diagnostic framework below identifies the most common root causes by category.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Traffic problem</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Possible indicators: irrelevant search terms triggering ads, broad match without adequate negative keywords, low-intent keywords, broad geographic targeting, or campaigns reaching wrong locations. For guidance on keyword strategy, see the{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">best Google Ads keywords for general contractors guide</Link>.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Conversion problem</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Possible indicators: slow page load, weak message match between ad and landing page, confusing or long form, limited trust signals, poor mobile experience, or unclear call to action.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Qualification problem</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Possible indicators: wrong project types, small jobs, wrong locations, unrealistic budgets, job applicants, vendors, or spam filling the lead count.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Sales problem</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Possible indicators: slow response time, inconsistent follow-up, missed calls, low appointment rate from contacted leads, poor estimate process, or no CRM accountability.
                </p>

                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Economics problem</h3>
                <p className="text-[#667085] leading-relaxed">
                  Possible indicators: low project margin, low average project value, excessive travel costs, poor close rate, capacity constraints, or a target CAC that is not aligned with actual project economics. Lowering bids is not always the correct solution — each root cause requires a different fix.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Contractor CPL Mistakes</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Comparing raw CPL across different services without adjusting for project value</li>
                  <li>Treating every form submission as a qualified lead</li>
                  <li>Ignoring spam and irrelevant contacts when calculating CPL</li>
                  <li>Not tracking phone calls as leads</li>
                  <li>Comparing CPL across different markets without accounting for local economics</li>
                  <li>Using signed revenue instead of gross profit when evaluating marketing performance</li>
                  <li>Ignoring sales labor, agency fees, and software costs in the acquisition cost</li>
                  <li>Measuring only one month for projects with longer sales cycles</li>
                  <li>Optimizing toward the cheapest leads rather than the most profitable ones</li>
                  <li>Failing to record lost reasons in the CRM</li>
                  <li>Not separating performance by service type</li>
                  <li>Not separating performance by service location</li>
                  <li>Ignoring follow-up performance as a factor in CPL outcomes</li>
                  <li>Stopping campaigns before enough sales-cycle data exists to evaluate them fairly</li>
                  <li>Keeping campaigns that generate leads but no signed revenue over extended periods</li>
                </ul>
              </section>

              {/* Budget */}
              <section id="budget" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Much Should a Contractor Budget for Lead Generation?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A simplified planning approach is to multiply the number of desired signed projects per month by the target customer acquisition cost.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p className="text-[#667085] mb-2">Simplified example:</p>
                  <p>Desired signed projects per month: 3</p>
                  <p>Target CAC: $3,000</p>
                  <p className="font-bold mt-1">Indicative acquisition budget: 3 × $3,000 = $9,000</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This is a planning model, not a guarantee. The actual marketing budget may also need to include agency fees, creative production, landing page development and maintenance, CRM software, call tracking, and sales support costs.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Fulfillment capacity must also be considered. Generating more signed projects than the business can deliver on schedule and at the expected quality level can damage customer experience, project margins, online reviews, and cash flow. Marketing investment should be calibrated to what the business can actually fulfill.
                </p>
              </section>

              {/* Final answer */}
              <section id="final-answer" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Is a Good CPL? Final Answer</h2>
                <CalloutBox type="tip" label="Summary">
                  A good cost per lead for a general contractor is one that consistently produces qualified opportunities and signed projects below the company&apos;s maximum profitable customer acquisition cost.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Calculate gross profit per project using actual signed revenue and real margin.</li>
                  <li>Set a target customer acquisition cost based on your growth goals and overhead.</li>
                  <li>Measure the real lead-to-sale rate using CRM data — not estimates.</li>
                  <li>Separate raw and qualified leads to understand true lead quality.</li>
                  <li>Calculate the maximum affordable CPL using your target CAC and lead-to-sale rate.</li>
                  <li>Compare performance by service type and location separately.</li>
                  <li>Track contracts, revenue, and lost reasons in the CRM.</li>
                  <li>Optimize toward gross profit per signed project, not lead volume or raw CPL.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  For the full picture of how CPL fits into a broader contractor marketing strategy, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">complete general contractor marketing guide</Link>. For how Google Ads campaigns are structured to generate these leads, see the{' '}
                  <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads for general contractors guide</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Turn Contractor Lead Costs Into Profitable Growth"
                body="Build a marketing system that tracks every opportunity from advertising spend to qualified lead, signed project, revenue, and gross profit."
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
