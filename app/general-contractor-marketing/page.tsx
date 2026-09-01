import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import TableOfContents from '@/components/blog/table-of-contents'
import EndArticleCTA from '@/components/blog/end-article-cta'
import FAQSection from '@/components/blog/faq-section'
import ReadingProgress from '@/components/blog/reading-progress'
import InlineCTA from '@/components/blog/inline-cta'
import NavbarCTAWrapper from '@/components/blog/navbar-cta-wrapper'
import { SITE_URL, CTA_URL } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Marketing for General Contractors: The Complete Guide',
  description:
    'A complete guide to marketing for general contractors — Google Ads, SEO, high-converting websites, CRM follow-up, and revenue tracking to generate more qualified leads.',
  alternates: {
    canonical: `${SITE_URL}/general-contractor-marketing`,
    languages: {
      'en-US': `${SITE_URL}/general-contractor-marketing`,
      'pt-BR': `${SITE_URL}/br/marketing-para-general-contractors`,
      'x-default': `${SITE_URL}/general-contractor-marketing`,
    },
  },
  openGraph: {
    title: 'Marketing for General Contractors: The Complete Guide',
    description:
      'A complete guide to marketing for general contractors — Google Ads, SEO, high-converting websites, CRM follow-up, and revenue tracking to generate more qualified leads.',
    url: `${SITE_URL}/general-contractor-marketing`,
    type: 'article',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing for General Contractors: The Complete Guide',
    description:
      'A complete guide to marketing for general contractors — Google Ads, SEO, high-converting websites, CRM follow-up, and revenue tracking to generate more qualified leads.',
  },
}

const tocItems = [
  { id: 'what-is-gc-marketing', label: 'What Is General Contractor Marketing?', level: 2 as const },
  { id: 'why-traditional-not-enough', label: 'Why Traditional Marketing Is Not Enough', level: 2 as const },
  { id: 'build-a-strategy', label: 'How to Build a Contractor Marketing Strategy', level: 2 as const },
  { id: 'google-ads', label: 'Google Ads for General Contractors', level: 2 as const },
  { id: 'local-services-ads', label: 'Local Services Ads', level: 2 as const },
  { id: 'local-seo', label: 'Local SEO and Google Maps', level: 2 as const },
  { id: 'website-conversion', label: 'Website Design and Conversion Optimization', level: 2 as const },
  { id: 'lead-generation', label: 'Contractor Lead Generation', level: 2 as const },
  { id: 'lead-qualification', label: 'Lead Qualification and Follow-Up', level: 2 as const },
  { id: 'crm', label: 'CRM for General Contractors', level: 2 as const },
  { id: 'analytics-tracking', label: 'Marketing Analytics and Revenue Tracking', level: 2 as const },
  { id: 'marketing-budget', label: 'How Much Should Contractors Spend on Marketing?', level: 2 as const },
  { id: 'metrics', label: 'Contractor Marketing Metrics', level: 2 as const },
  { id: 'choosing-agency', label: 'Choosing a Contractor Marketing Agency', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const faqItems = [
  {
    question: 'What is the best marketing strategy for a general contractor?',
    answer:
      'The most effective strategy combines paid search advertising (Google Ads) to capture homeowners actively searching for your services, a high-converting website that turns traffic into leads, a CRM to manage and follow up with every inquiry, and reporting that connects your marketing spend to signed project revenue. There is no single channel that works in isolation.',
  },
  {
    question: 'How much should a general contractor spend on marketing?',
    answer:
      'Most residential construction companies that are actively growing invest between 5% and 10% of their target revenue in marketing. For a contractor targeting $2M in annual revenue, that is a $100,000 to $200,000 annual marketing budget. This includes ad spend, agency fees, technology, and creative production.',
  },
  {
    question: 'Does Google Ads work for general contractors?',
    answer:
      'Yes. Google Ads is one of the highest-intent channels available for contractors. Homeowners searching for terms like "kitchen remodeling contractor near me" or "home addition builder" are actively looking to hire. The challenge is setting up campaigns correctly, targeting the right keywords, sending traffic to a high-converting landing page, and having a follow-up system ready to work every lead.',
  },
  {
    question: 'How long does it take for contractor marketing to produce results?',
    answer:
      'Google Ads can start generating leads within the first two to four weeks of launch. However, reaching consistent lead flow and cost efficiency typically takes three to six months as the campaigns gather data and are optimized. SEO takes longer — six to twelve months to see meaningful organic traffic growth. CRM and follow-up improvements can produce faster returns because they improve the conversion rate of leads you are already receiving.',
  },
  {
    question: 'What is a good cost per lead for general contractors?',
    answer:
      'Cost per lead varies significantly by service type, market, and competition. For general contractors in mid-size markets, a reasonable range is $80 to $250 per qualified lead from Google Ads. Higher-ticket services like home additions or custom homes may have higher lead costs but also much higher average contract values. The most important metric is not cost per lead but cost per signed project relative to your average contract value.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Marketing for General Contractors: The Complete Guide',
      description:
        'A complete guide to marketing for general contractors — Google Ads, SEO, high-converting websites, CRM follow-up, and revenue tracking to generate more qualified leads.',
      image: `${SITE_URL}/og-image.png`,
      datePublished: '2025-07-09',
      dateModified: '2025-07-09',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/general-contractor-marketing` },
      publisher: {
        '@type': 'Organization',
        name: 'Marketing For Contractors',
        url: SITE_URL,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Marketing for General Contractors: The Complete Guide',
          item: `${SITE_URL}/general-contractor-marketing`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
}

export default function PillarPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <AnnouncementBanner />
      <NavbarCTAWrapper />

      <main id="main-content" className="flex-1 pt-28 pb-20">
        {/* Skip to content */}
        <a
          href="#article-body"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1565D8] focus:border focus:border-[#1565D8]"
        >
          Skip to content
        </a>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Marketing for General Contractors Guide' },
          ]} />

          {/* Header */}
          <header className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Contractor Growth
              </span>
              <span className="text-[#D0D5DD]">·</span>
              <span className="text-[10px] text-[#667085]">25 min read</span>
            </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance leading-[1.05] mb-4">
            Marketing for General Contractors: The Complete Guide
          </h1>
            <p className="text-lg text-[#667085] leading-relaxed max-w-2xl">
              A comprehensive overview of every marketing system general contractors need to generate consistent qualified leads, convert more estimates into signed projects, and track revenue from every campaign.
            </p>
            <div className="flex items-center gap-4 mt-4 text-[11px] text-[#D0D5DD]">
              <span>Published July 9, 2025</span>
              <span>·</span>
              <span>Updated July 9, 2025</span>
            </div>
          </header>

          {/* Two-column layout: article + ToC */}
          <div className="flex gap-12 lg:gap-16 items-start">
            {/* Article body */}
            <article id="article-body" className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile ToC only */}
              <TableOfContents items={tocItems} variant="mobile" />

              <div className="prose-content space-y-10 text-[#0A0A0A]">

                {/* 1 */}
                <section id="what-is-gc-marketing" aria-labelledby="h2-what-is-gc-marketing">
                  <h2 id="h2-what-is-gc-marketing" className="text-2xl font-extrabold tracking-tight mb-4">
                    What Is General Contractor Marketing?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    General contractor marketing is the set of systems and strategies a construction company uses to attract homeowners who are ready to hire, convert those inquiries into booked estimates, and track which marketing activities are actually producing signed projects. It goes beyond running ads or having a website — it encompasses paid media, organic search, conversion optimization, lead management, follow-up, and revenue attribution.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Unlike marketing for consumer products, contractor marketing targets high-consideration purchases with long sales cycles. A homeowner searching for a kitchen remodeling contractor is not making an impulse decision. They are researching, comparing, and evaluating trust before they call. Effective contractor marketing must address every stage of that decision process.
                  </p>
                </section>

                {/* 2 */}
                <section id="why-traditional-not-enough" aria-labelledby="h2-why-traditional">
                  <h2 id="h2-why-traditional" className="text-2xl font-extrabold tracking-tight mb-4">
                    Why Traditional Contractor Marketing Is Not Enough
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Referrals and yard signs built many contracting businesses, but they have a fundamental limitation: you cannot control or scale them. When referral volume drops, revenue drops. When a competitor runs aggressive paid advertising in your market, they capture the homeowners you should be reaching.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Traditional marketing methods also lack visibility. You cannot see how many leads referrals are generating, what your actual cost per lead is, or which projects came from which source. Without that data, you cannot make informed decisions about where to invest more or cut back.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The most successful general contractors today treat marketing as a measurable system with inputs, outputs, and performance metrics — not as a set of activities they hope will produce results.
                  </p>
                </section>

                {/* 3 */}
                <section id="build-a-strategy" aria-labelledby="h2-strategy">
                  <h2 id="h2-strategy" className="text-2xl font-extrabold tracking-tight mb-4">
                    How to Build a Contractor Marketing Strategy
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    An effective contractor marketing strategy starts with clarity on three things: who your ideal client is, what services generate the most profitable projects, and what geographic market you are targeting. Without that clarity, every marketing dollar is less efficient.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    From there, a complete strategy requires:
                  </p>
                  <ol className="mt-4 space-y-2 text-[#667085] text-sm leading-relaxed list-decimal list-inside">
                    <li>A high-converting website built around your target services and market</li>
                    <li>Paid search campaigns to capture homeowners actively searching for what you offer</li>
                    <li>A CRM to track every lead from first contact through signed contract</li>
                    <li>A follow-up system to convert inquiries that do not book immediately</li>
                    <li>Reporting that connects ad spend to actual signed revenue</li>
                  </ol>
                </section>

                {/* 4 */}
                <section id="google-ads" aria-labelledby="h2-google-ads">
                  <h2 id="h2-google-ads" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Google Ads is typically the highest-ROI paid channel for general contractors because it captures homeowners at the moment of intent. When someone searches for "kitchen remodeling contractor near me" or "home addition builder [city]," they are actively looking to hire. That search intent is extremely valuable.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Effective Google Ads campaigns for contractors require more than just setting a budget and writing a few ads. Keyword selection, match type strategy, negative keyword management, landing page quality, and conversion tracking all determine whether your campaigns generate profitable leads or burn through budget without results. For guidance on choosing and organizing high-intent search terms, see{' '}
                    <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      the best Google Ads keywords for general contractors
                    </Link>.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    For a complete breakdown of how to structure, manage, and optimize Google Ads campaigns as a general contractor, read the full{' '}
                    <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:text-[#1255c0] transition-colors">
                      Google Ads for general contractors guide
                    </Link>
                    , which covers keyword strategy, bidding, landing pages, and revenue attribution.
                  </p>
                </section>

                {/* 5 */}
                <section id="local-services-ads" aria-labelledby="h2-lsa">
                  <h2 id="h2-lsa" className="text-2xl font-extrabold tracking-tight mb-4">
                    Local Services Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Local Services Ads (LSAs) appear above traditional search results and Google Ads and only charge per lead, not per click. They are tied to your Google Business Profile and require a verification process. For contractors who qualify, LSAs can be a cost-effective complement to traditional Google Search campaigns.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The limitation of LSAs is that you have less control over which searches trigger your ads and less ability to optimize based on lead quality. For most contractors, LSAs work best as an additional channel alongside Search campaigns, not as a replacement. See the full{' '}
                    <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      Google Ads vs Local Services Ads comparison
                    </Link>{' '}for a detailed breakdown of costs, eligibility, lead quality, and control.
                  </p>
                </section>

                {/* 6 */}
                <section id="local-seo" aria-labelledby="h2-seo">
                  <h2 id="h2-seo" className="text-2xl font-extrabold tracking-tight mb-4">
                    Local SEO and Google Maps
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Local SEO helps your business appear when homeowners search for contractors in your area through organic results and Google Maps. A well-optimized Google Business Profile can drive significant lead volume from people searching for services near them.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The key elements of local SEO for contractors include a complete and accurate Google Business Profile, consistent NAP (Name, Address, Phone) data across the web, genuine client reviews, location-specific service pages on your website, and local citations in relevant directories. SEO takes longer to produce results than paid advertising but creates compounding visibility over time.
                  </p>
                </section>

                {/* 7 */}
                <section id="website-conversion" aria-labelledby="h2-website">
                  <h2 id="h2-website" className="text-2xl font-extrabold tracking-tight mb-4">
                    Website Design and Conversion Optimization
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Your website is the center of your marketing system. All paid ads, SEO, referrals, and social traffic eventually land there. A website that does not convert visitors into leads wastes every dollar you spend driving traffic to it.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    High-converting contractor websites share common characteristics: clear service-specific landing pages, strong social proof (photos, testimonials, project galleries), a prominent and low-friction contact form or call button, fast load times, and mobile-first design. The goal is not just to look professional — it is to convert visitors into inquiries at the highest possible rate.
                  </p>
                </section>

                {/* 8 */}
                <section id="lead-generation" aria-labelledby="h2-leads">
                  <h2 id="h2-leads" className="text-2xl font-extrabold tracking-tight mb-4">
                    Contractor Lead Generation
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Contractor lead generation combines traffic sources (paid ads, SEO, referrals) with a conversion system (landing pages, forms, calls) to produce a consistent flow of homeowner inquiries. The quality of those leads matters as much as the volume.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Lead quality is determined by targeting (are you reaching the right homeowners in the right geography for the right services?), the qualifying information you capture in your intake process, and the speed and quality of your follow-up. Many contractors focus on generating more leads when the real opportunity is converting more of the leads they already have.
                  </p>
                </section>

                {/* 9 */}
                <section id="lead-qualification" aria-labelledby="h2-qualification">
                  <h2 id="h2-qualification" className="text-2xl font-extrabold tracking-tight mb-4">
                    Lead Qualification and Follow-Up
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Most contractor leads do not convert on first contact. Research consistently shows that homeowners contact multiple contractors before making a decision. Your follow-up system — the speed, frequency, and quality of your outreach — is a significant competitive advantage.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A basic follow-up system should include an immediate response to every form submission (automated or manual), at least two to three follow-up attempts across different channels (phone, text, email) within the first 48 hours, and a CRM-tracked nurture sequence for leads who do not respond initially. Contractors who follow up systematically convert significantly more estimates into signed contracts than those who call once and move on. For a complete framework — including scripts, CRM pipelines, and estimate follow-up sequences — see{' '}
                <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to follow up with contractor leads</Link>.
                  </p>
                </section>

                {/* 10 */}
                <section id="crm" aria-labelledby="h2-crm">
                  <h2 id="h2-crm" className="text-2xl font-extrabold tracking-tight mb-4">
                    CRM for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    A CRM (Customer Relationship Management) system gives you visibility into every lead in your pipeline — where they came from, where they are in the sales process, and what follow-up actions are pending. Without a CRM, leads fall through the cracks and you have no way to measure your actual conversion rate from lead to estimate to signed contract.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    For general contractors, a CRM does not need to be complex. It needs to capture every lead automatically, assign follow-up tasks, track the status of each opportunity, and report on conversion rates at each stage. That data allows you to identify bottlenecks — whether the problem is not enough leads, too many unresponded inquiries, or a low estimate-to-contract close rate.
                  </p>
                </section>

                <InlineCTA
                  headline="Are You Tracking Revenue From Your Marketing?"
                  body="Most contractors measure leads. The ones growing profitably measure signed revenue per campaign. We connect your ad spend to CRM data and signed projects so you always know exactly what your marketing is producing."
                  buttonLabel="Request a Free Marketing Assessment"
                />

                {/* 11 */}
                <section id="analytics-tracking" aria-labelledby="h2-analytics">
                  <h2 id="h2-analytics" className="text-2xl font-extrabold tracking-tight mb-4">
                    Marketing Analytics and Revenue Tracking
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Most contractors track lead volume. The ones making the best marketing decisions track revenue per channel — connecting ad spend data to CRM pipeline data to understand which campaigns are actually producing signed projects and at what cost.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    At minimum, your analytics setup should track: where every lead comes from (source, campaign, keyword), how many leads become booked estimates, how many estimates become signed contracts, and the average contract value by source. With that data, you can calculate your true cost per signed project and allocate budget to the channels and campaigns producing the best return.
                  </p>
                </section>

                {/* 12 */}
                <section id="marketing-budget" aria-labelledby="h2-budget">
                  <h2 id="h2-budget" className="text-2xl font-extrabold tracking-tight mb-4">
                    How Much Should Contractors Spend on Marketing?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    The most useful framework for setting a contractor marketing budget is working backward from your revenue goal. If you want to generate $3M in revenue, what is your average project size? How many signed projects does that require? What is your estimate-to-close rate? How many leads do you need to get those estimates? What does it cost to generate that many qualified leads?
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A general benchmark for residential construction companies that are actively investing in growth is 5% to 10% of target revenue. This includes all marketing costs: ad spend, agency management fees, technology tools, website maintenance, and creative production. Contractors who are just starting to invest in marketing should be prepared for a period of data collection and optimization before reaching full efficiency.
                  </p>
                </section>

                {/* 13 */}
                <section id="metrics" aria-labelledby="h2-metrics">
                  <h2 id="h2-metrics" className="text-2xl font-extrabold tracking-tight mb-4">
                    Contractor Marketing Metrics
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    The metrics that matter most for contractor marketing are:
                  </p>
                  <ul className="mt-4 space-y-2 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li><strong className="text-[#0A0A0A]">Cost per qualified lead</strong> — how much you spend to generate one viable inquiry</li>
                    <li><strong className="text-[#0A0A0A]">Lead-to-estimate rate</strong> — what percentage of leads become booked site visits</li>
                    <li><strong className="text-[#0A0A0A]">Estimate-to-contract rate</strong> — what percentage of estimates you close</li>
                    <li><strong className="text-[#0A0A0A]">Cost per signed project</strong> — total marketing spend divided by signed contracts</li>
                    <li><strong className="text-[#0A0A0A]">Revenue per marketing dollar</strong> — the ROI of your marketing investment</li>
                    <li><strong className="text-[#0A0A0A]">Average project value by source</strong> — which channels attract higher-value projects</li>
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Tracking these metrics consistently allows you to make informed budget decisions and identify where in the funnel you have the most room for improvement. For benchmarks on what a healthy cost per lead looks like by service type and market, see{' '}
                    <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      what is a good cost per lead for general contractors
                    </Link>.
                  </p>
                </section>

                {/* 14 */}
                <section id="choosing-agency" aria-labelledby="h2-agency">
                  <h2 id="h2-agency" className="text-2xl font-extrabold tracking-tight mb-4">
                    Choosing a Contractor Marketing Agency
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Most marketing agencies work across industries and apply the same general strategy to every client. Contractor marketing has specific requirements — local targeting, intent-based search, long sales cycles, high average contract values — that require industry-specific expertise to execute well.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    When evaluating a contractor marketing partner, ask for specific examples of results generated for similar companies, understand exactly how they will track your results beyond lead volume, and confirm that they have processes for connecting marketing data to your actual signed revenue. An agency that cannot show you cost per signed project is not measuring what matters.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Also verify that they will own and manage your ad accounts directly — not inside a shared or agency-controlled account that you lose access to if you stop working together.
                  </p>
                </section>

                {/* FAQ */}
                <FAQSection items={faqItems} />

                {/* End CTA */}
                <EndArticleCTA
                  headline="Build a Complete Marketing System for Your Construction Company"
                  body="Get a contractor marketing system designed to generate qualified opportunities and track them from the original search to the signed project."
                  buttonLabel="Schedule a Free Marketing Assessment"
                />
              </div>
            </article>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start" aria-label="Article navigation">
              <TableOfContents items={tocItems} variant="desktop" />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
