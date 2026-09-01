import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import AnnouncementBanner from '@/components/announcement-banner'
import NavbarCTAWrapper from '@/components/blog/navbar-cta-wrapper'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import TableOfContents from '@/components/blog/table-of-contents'
import EndArticleCTA from '@/components/blog/end-article-cta'
import FAQSection from '@/components/blog/faq-section'
import RelatedArticles from '@/components/blog/related-articles'
import ReadingProgress from '@/components/blog/reading-progress'
import InlineCTA from '@/components/blog/inline-cta'
import CalloutBox from '@/components/blog/callout-box'
import { SITE_URL, getRelatedArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Google Ads vs Local Services Ads for Contractors',
  description:
    'Compare Google Ads and Local Services Ads for general contractors. Learn how costs, lead quality, targeting, eligibility, and campaign control differ.',
  alternates: {
    canonical: `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
    languages: {
      'en-US': `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
      'pt-BR': `${SITE_URL}/br/blog/google-ads-vs-local-services-ads-para-contractors`,
    },
  },
  openGraph: {
    title: 'Google Ads vs Local Services Ads for Contractors',
    description:
      'Compare Google Ads and Local Services Ads for general contractors. Learn how costs, lead quality, targeting, eligibility, and campaign control differ.',
    url: `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
    type: 'article',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads vs Local Services Ads for Contractors',
    description:
      'Compare Google Ads and Local Services Ads for general contractors. Learn how costs, lead quality, targeting, eligibility, and campaign control differ.',
  },
}

const tocItems = [
  { id: 'platform-difference', label: 'What Is the Difference?', level: 2 as const },
  { id: 'how-search-ads-work', label: 'How Google Search Ads Work', level: 2 as const },
  { id: 'how-lsa-work', label: 'How Local Services Ads Work', level: 2 as const },
  { id: 'cost-model', label: 'Cost Model Comparison', level: 2 as const },
  { id: 'control', label: 'Which Platform Gives More Control?', level: 2 as const },
  { id: 'lead-quality', label: 'Which Produces Better Lead Quality?', level: 2 as const },
  { id: 'by-service', label: 'By Service Type', level: 2 as const },
  { id: 'high-ticket', label: 'High-Ticket Projects', level: 2 as const },
  { id: 'use-both', label: 'Using Both Together', level: 2 as const },
  { id: 'start-search-ads', label: 'When to Start With Google Ads', level: 2 as const },
  { id: 'start-lsa', label: 'When to Start With LSA', level: 2 as const },
  { id: 'common-mistakes', label: 'Common Mistakes', level: 2 as const },
  { id: 'measurement', label: 'How to Compare Performance', level: 2 as const },
  { id: 'which-is-better', label: 'Which Is Better?', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const faqItems = [
  {
    question: 'Are Local Services Ads available for general contractors?',
    answer:
      'Local Services Ads are available in many US markets for general contractors, but eligibility depends on your specific location, service category, and current Google policies. Not every market or category is covered, and Google may require business verification, background checks, and license documentation before your ads go live. Check the LSA eligibility tool in Google Ads to confirm availability for your area.',
  },
  {
    question: 'Is Google Ads or Local Services Ads cheaper?',
    answer:
      'Neither is automatically cheaper. Google Ads charges per click, and Local Services Ads charge per lead. A lower cost per raw lead from LSA does not mean a lower cost per qualified opportunity if a large percentage of those leads are outside your scope, too small, or unresponsive. The right comparison is cost per qualified lead, cost per estimate, and cost per signed project — not raw cost per click or cost per lead.',
  },
  {
    question: 'Do Local Services Ads charge per click?',
    answer:
      'No. Local Services Ads charge per lead, not per click. When a homeowner calls or messages through your LSA listing, Google charges your account for that lead. You can dispute leads that do not meet the eligibility criteria — for example, calls outside your service area or for services you do not offer — but not every dispute results in a credit.',
  },
  {
    question: 'Can contractors use Google Ads and Local Services Ads together?',
    answer:
      'Yes. Many contractors run both platforms simultaneously. LSA can capture direct local demand from eligible searches, while Google Search Ads provide greater control over keywords, landing pages, and campaign segmentation. Running both does not guarantee higher total results, but when managed correctly and tracked separately, it allows you to compare cost per qualified lead and signed revenue by source and allocate budget toward what is actually working.',
  },
  {
    question: 'Does a contractor need a Google Business Profile for LSA?',
    answer:
      'Yes. A verified Google Business Profile is a prerequisite for Local Services Ads. Google connects your LSA listing to your Business Profile, which is how your ratings and reviews appear in the ad. A complete, accurate, and well-reviewed Google Business Profile improves your LSA ranking and conversion rate.',
  },
  {
    question: 'Which platform is better for remodeling contractors?',
    answer:
      'Both platforms can work for remodeling contractors. Local Services Ads may be available for kitchen remodeling, bathroom remodeling, and other common residential categories depending on your location. Google Search Ads generally offer more control for contractors running specialized campaigns around specific services, project types, or locations. Many established remodeling companies use both and track them separately.',
  },
  {
    question: 'Are Local Services Ads good for large construction projects?',
    answer:
      'LSA can generate inquiries for large projects, but the platform is not designed for high-ticket project qualification. The lead format — a phone call or message — does not include budget, timeline, or scope information. For whole-home renovations, custom builds, or additions where project fit and budget qualification are critical, dedicated Google Search Ads with qualifying landing pages typically provide more control over the type of prospect who reaches out.',
  },
  {
    question: 'How should contractors track leads from both platforms?',
    answer:
      'Use separate tracking for each source. Assign unique call tracking numbers to your LSA listing and your Google Ads landing pages. Record each lead in your CRM with the original source. Track qualified lead rate, appointment rate, estimate rate, close rate, average project value, and signed revenue separately for each platform. The primary comparison should be cost per signed project and gross profit by source — not raw lead volume.',
  },
]

const relatedArticles = getRelatedArticles('google-ads-vs-local-services-ads', 'en-US')

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      headline: 'Google Ads vs Local Services Ads for General Contractors',
      description:
        'Compare Google Ads and Local Services Ads for general contractors. Learn how costs, lead quality, targeting, eligibility, and campaign control differ.',
      image: `${SITE_URL}/blog/google-ads-vs-lsa-contractors-hero.jpg`,
      datePublished: '2025-08-01',
      dateModified: '2025-08-01',
      inLanguage: 'en-US',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Marketing For Contractors',
        url: SITE_URL,
      },
      keywords: [
        'Google Ads vs Local Services Ads for contractors',
        'Local Services Ads for general contractors',
        'Google Ads for general contractors',
        'contractor advertising',
        'contractor lead generation',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Google Ads vs Local Services Ads for General Contractors',
          item: `${SITE_URL}/blog/google-ads-vs-local-services-ads-for-contractors`,
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

export default function GoogleAdsVsLSAArticle() {
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
            { label: 'Google Ads vs Local Services Ads for General Contractors' },
          ]} />

          {/* Header */}
          <header className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Google Ads
              </span>
              <span className="text-[#D0D5DD]">·</span>
              <span className="text-[10px] text-[#667085]">16 min read</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance leading-[1.05] mb-4">
              Google Ads vs Local Services Ads for General Contractors
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed max-w-2xl">
              Compare Google Search Ads and Local Services Ads to understand which platform offers the right combination of reach, control, lead quality, and profitability for your construction company.
            </p>
            <div className="flex items-center gap-4 mt-4 text-[11px] text-[#D0D5DD]">
              <span>Published August 1, 2025</span>
              <span>·</span>
              <span>Updated August 1, 2025</span>
            </div>
          </header>

          {/* Featured image placeholder */}
          <div
            className="w-full h-56 lg:h-80 bg-[#0A0A0A] blueprint-grid-dark flex items-center justify-center mb-10 max-w-3xl"
            role="img"
            aria-label="Comparison between Google Ads and Local Services Ads for general contractors"
          >
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              Google Ads vs Local Services Ads for General Contractors
            </span>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-12 lg:gap-16 items-start">
            {/* Article */}
            <article id="article-body" className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile ToC only */}
              <TableOfContents items={tocItems} variant="mobile" />

              <div className="space-y-10 text-[#0A0A0A]">

                {/* Intro */}
                <section aria-labelledby="h2-intro">
                  <p className="text-[#667085] leading-relaxed">
                    Both Google Search Ads and Local Services Ads can place a general contractor in front of high-intent local homeowners. But the two platforms work differently, charge differently, and require different levels of business verification, campaign management, and performance tracking.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Search Ads charge per click. Local Services Ads charge per lead. LSA eligibility varies by service category and location — not every contractor in every market can run them. And the best choice depends on your services, market, budget, project value, lead quality requirements, sales process, and ability to track results accurately.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    This guide compares both platforms across the factors that matter most to a general contractor making a real advertising decision.
                  </p>
                </section>

                {/* 1 */}
                <section id="platform-difference" aria-labelledby="h2-platform-difference">
                  <h2 id="h2-platform-difference" className="text-2xl font-extrabold tracking-tight mb-4">
                    What Is the Difference Between Google Ads and Local Services Ads?
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-6">
                    Google Search Ads are pay-per-click text ads that appear in standard search results. You choose keywords, write ad copy, build landing pages, and pay each time a homeowner clicks your ad. Local Services Ads are a separate product that appears above traditional ads. They show your business name, rating, and a phone number or message button. You pay per lead — meaning per call or message — rather than per click.
                  </p>

                  {/* Comparison table — horizontally scrollable on mobile */}
                  <div className="overflow-x-auto -mx-2 px-2">
                    <table className="w-full min-w-[560px] text-sm border-collapse">
                      <caption className="sr-only">Google Ads vs Local Services Ads comparison table</caption>
                      <thead>
                        <tr className="bg-[#0A0A0A] text-white">
                          <th scope="col" className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest w-[28%]">
                            Factor
                          </th>
                          <th scope="col" className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest w-[36%]">
                            Google Search Ads
                          </th>
                          <th scope="col" className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest w-[36%]">
                            Local Services Ads
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Placement', 'Top of search results (labeled "Sponsored")', 'Above search ads — separate "Local Services" block'],
                          ['Charging model', 'Per click (CPC)', 'Per lead (call or message)'],
                          ['Keyword control', 'Full control — exact, phrase, broad match', 'No direct keyword selection'],
                          ['Landing page control', 'Full control', 'No custom landing page — Google-hosted listing'],
                          ['Eligibility', 'Any business with a Google Ads account', 'Must meet location, category, and verification requirements'],
                          ['Verification', 'No mandatory business verification', 'Business and license verification required'],
                          ['Lead delivery', 'Click to your website or landing page', 'Direct phone call or message'],
                          ['Geographic targeting', 'Precise radius, ZIP code, or city targeting', 'Service area defined in your LSA profile'],
                          ['Budget control', 'Full daily/campaign-level control', 'Weekly budget with less granular control'],
                          ['Reporting', 'Detailed keyword, ad, and conversion data', 'Lead reports; limited keyword-level data'],
                          ['Best use case', 'Specialized services, high-ticket projects, testing', 'Eligible categories with strong reviews and fast response'],
                        ].map(([factor, search, lsa], i) => (
                          <tr key={factor} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]'}>
                            <td className="px-4 py-3 font-semibold text-[#0A0A0A] text-xs align-top border-b border-[#F4F6F8]">
                              {factor}
                            </td>
                            <td className="px-4 py-3 text-[#667085] text-xs align-top border-b border-[#F4F6F8]">
                              {search}
                            </td>
                            <td className="px-4 py-3 text-[#667085] text-xs align-top border-b border-[#F4F6F8]">
                              {lsa}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 2 */}
                <section id="how-search-ads-work" aria-labelledby="h2-how-search-ads-work">
                  <h2 id="h2-how-search-ads-work" className="text-2xl font-extrabold tracking-tight mb-4">
                    How Google Search Ads Work for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Google Search campaigns run through a keyword auction. When a homeowner searches for a term that matches your keywords — for example, "kitchen addition contractor near me" — Google runs an instant auction among all advertisers targeting that search. Your ad&apos;s position depends on your bid and your Quality Score, which reflects how relevant your ad and landing page are to the search.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    You pay when someone clicks your ad, not when it appears. The click takes the homeowner to a landing page you control. That page is where the lead conversion happens — through a form, a phone number, or a chat widget. You define which keywords trigger your ads, which match types to use, which searches to exclude with negative keywords, how much to bid, how to segment campaigns by service or location, and which landing page each ad sends traffic to.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Conversion tracking connects Google Ads to the form submissions and phone calls that happen on your landing page, allowing you to optimize toward actual lead actions rather than just traffic. For a deeper breakdown of how to set up and run Google Ads as a contractor, see the{' '}
                    <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      complete Google Ads guide for general contractors
                    </Link>.
                  </p>
                  <CalloutBox type="info" label="Key distinction">
                    <p>Google Search Ads give you direct control over every layer of the campaign — keywords, ads, landing pages, bids, budget, targeting, and tracking. That control also means more complexity. Campaigns that are not properly set up and managed regularly tend to waste budget.</p>
                  </CalloutBox>
                </section>

                {/* 3 */}
                <section id="how-lsa-work" aria-labelledby="h2-how-lsa-work">
                  <h2 id="h2-how-lsa-work" className="text-2xl font-extrabold tracking-tight mb-4">
                    How Local Services Ads Work for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Local Services Ads are a Google product designed to connect local service businesses with nearby customers. They appear above traditional search ads in a dedicated block, displaying your business name, review rating, and a contact option — typically a call button or message.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Eligibility depends on your location, service category, and Google&apos;s current coverage. General contracting is an eligible category in many US markets, but not all. Before running LSA, you must complete a business verification process that may include license documentation, insurance verification, and in some cases background screening for business owners or employees. Eligibility, screening requirements, and available features can vary by location, service category, and current Google policies.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Your LSA profile connects to your Google Business Profile. The reviews displayed in your LSA listing come from your Google Business Profile, which means that a strong review profile directly affects how your ad performs. You define your service areas and the job types you accept. When a homeowner contacts you through LSA, you are charged for that lead.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Lead management happens inside the LSA platform. You can mark leads as booked, archived, or disputed. If a lead does not qualify — for example, a call from outside your service area or for a service you do not offer — you can submit a dispute, though Google&apos;s decision on whether to issue a credit is not guaranteed.
                  </p>
                  <CalloutBox type="warning" label="Do not assume eligibility">
                    <p>Not every general contractor in every market is eligible for LSA. Availability varies by location and category, and Google can change coverage over time. Check current eligibility in your Google Ads account before factoring LSA into your advertising plan.</p>
                  </CalloutBox>
                </section>

                {/* 4 */}
                <section id="cost-model" aria-labelledby="h2-cost-model">
                  <h2 id="h2-cost-model" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads: Cost Model
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Google Search Ads charge per click. You pay when a homeowner clicks your ad and lands on your page — regardless of whether they fill out a form or call. A well-optimized campaign with a high-converting landing page turns a large percentage of those clicks into leads. A poorly set up campaign pays for clicks that never convert.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Local Services Ads charge per lead. You pay when a homeowner calls or messages you directly through the ad. This can feel more straightforward because you are only paying for an actual contact — not just a visit to your website. But paying per lead does not automatically make LSA more profitable.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    An LSA lead can still be:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm">
                    {[
                      'Outside your project scope',
                      'Too small to be worth your time',
                      'Outside your actual service area',
                      'From a homeowner who is only collecting quotes with no intent to start soon',
                      'Difficult to reach after the initial call',
                      'Unlikely to close at your price point',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The question is not which platform charges less per raw lead. The question is which platform produces a lower cost per qualified lead, per estimate, per signed project, and per dollar of gross profit. That comparison requires tracking both platforms through your CRM — not just counting leads at the top of the funnel.
                  </p>
                </section>

                {/* 5 */}
                <section id="control" aria-labelledby="h2-control">
                  <h2 id="h2-control" className="text-2xl font-extrabold tracking-tight mb-4">
                    Which Platform Gives Contractors More Control?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Google Search Ads give you substantially more direct control over your advertising. You choose the exact keywords that trigger your ads. You choose the match types — exact, phrase, or broad — that determine how closely a search must match your keyword. You write your ad headlines and descriptions. You build and control the landing page that receives each click. You define your bid strategy, daily budget, geographic radius, and audience signals. You set up conversion tracking to measure which clicks became leads. You build negative keyword lists to block irrelevant searches. You can segment campaigns by service type, project category, location, or season. For a detailed guide to keyword selection, match types, and negative keyword strategy, see{' '}
                    <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">best Google Ads keywords for general contractors</Link>.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Local Services Ads are simpler. You define your service areas and job types. You set a weekly budget. Google determines when and where your ad shows based on your profile, reviews, and responsiveness. You cannot choose the specific searches that trigger your listing, write custom ad copy, or send traffic to a landing page. The simplicity can be an advantage for a contractor who wants a lower-management direct-lead channel, but it also means less ability to control who sees your ad and who contacts you.
                  </p>
                  <CalloutBox type="info" label="Simplicity is not automatically good or bad">
                    <p>LSA&apos;s lower management overhead is useful if you have a strong Google Business Profile, competitive reviews, and fast response times. But reduced control means less ability to filter for qualified leads before they reach you.</p>
                  </CalloutBox>
                </section>

                {/* 6 — Inline CTA after lead quality section */}
                <section id="lead-quality" aria-labelledby="h2-lead-quality">
                  <h2 id="h2-lead-quality" className="text-2xl font-extrabold tracking-tight mb-4">
                    Which Platform Produces Better Lead Quality?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Lead quality is not determined by the platform alone. It is determined by the combination of search intent, targeting decisions, landing page qualification, job type settings, service area accuracy, and your sales process after the lead arrives. Both platforms can produce high-quality leads and both can produce low-quality leads depending on how they are configured and managed.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Reported lead volume is not enough to evaluate either platform. The metrics that matter are:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm">
                    {[
                      'Qualified lead rate — what percentage of total leads meet your project criteria',
                      'Appointment rate — what percentage of qualified leads schedule a site visit or consultation',
                      'Estimate rate — what percentage of appointments receive a formal estimate',
                      'Close rate — what percentage of estimates become signed contracts',
                      'Average project value — what the average signed project is worth',
                      'Signed revenue by source — total revenue attributable to each platform',
                      'Gross profit by source — revenue minus direct project costs',
                      'Customer acquisition cost — total ad spend divided by number of signed projects',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A platform that generates 30 leads per month with a 20% qualified rate and a 30% close rate produces 1.8 signed projects. A platform that generates 10 leads with a 70% qualified rate and a 50% close rate produces 3.5 signed projects. Volume alone does not tell the story.
                  </p>
                </section>

                <InlineCTA
                  headline="Which Channel Is Actually Producing Profitable Projects?"
                  body="We connect Google Ads, Local Services Ads, call tracking, CRM data, and signed revenue to show which campaigns are producing qualified opportunities and profitable projects."
                  buttonLabel="Request a Free Marketing Assessment"
                />

                {/* 7 */}
                <section id="by-service" aria-labelledby="h2-by-service">
                  <h2 id="h2-by-service" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads for Different Contractor Services
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    The platform comparison changes depending on the service category. Local Services Ads tend to perform better for services with high, consistent local search demand — categories where homeowners frequently search with clear intent and where reviews and fast response times drive conversion. Kitchen remodeling, bathroom remodeling, and roofing can fall into this category in many markets where LSA is available.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Google Search Ads tend to offer more advantage for services with specific, narrowly defined project types — home additions, ADU construction, custom homes, basement remodeling, or large renovations where keyword targeting, landing page messaging, and project qualification play a larger role in attracting the right lead.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    This is not an absolute rule. A contractor running LSA for kitchen remodeling in a market with strong coverage, excellent reviews, and fast response can outperform a poorly managed Google Ads campaign for the same service. The quality of execution matters as much as the platform choice.
                  </p>
                </section>

                {/* 8 */}
                <section id="high-ticket" aria-labelledby="h2-high-ticket">
                  <h2 id="h2-high-ticket" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads for High-Ticket Projects
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    For contractors focused on whole-home remodeling, additions, custom builds, large ADUs, or high-end renovations, lead qualification becomes the dominant concern. The challenge is not generating enough leads — it is generating leads where the project scope, budget, location, timeline, and decision-maker readiness align with what you build.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Google Search Ads, combined with dedicated landing pages that address project requirements and budget expectations, give you more ability to filter inquiries before they reach your phone. You can write ad copy that speaks specifically to a homeowner planning a major addition. You can build a landing page that focuses on projects above a minimum budget. You can use keywords that indicate higher intent and project scale.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    LSA can still contribute qualified opportunities for high-ticket projects when the category, local market, review profile, and job type settings align. A strong LSA presence for home additions in a high-income market with excellent reviews can generate worthwhile leads. But the LSA format — a direct call or message — does not provide pre-qualification before the lead reaches you. The qualification conversation happens with your team after the lead arrives.
                  </p>
                </section>

                {/* 9 */}
                <section id="use-both" aria-labelledby="h2-use-both">
                  <h2 id="h2-use-both" className="text-2xl font-extrabold tracking-tight mb-4">
                    Can Contractors Use Google Ads and Local Services Ads Together?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Yes. The two platforms can be complementary when tracked and managed separately. A practical combined approach:
                  </p>
                  <ol className="mt-4 space-y-3 text-[#667085] text-sm">
                    {[
                      'Use Local Services Ads to capture eligible direct local demand in categories and markets where you are verified.',
                      'Use Google Search Ads for strategic keywords, specialized services, and locations where you want more control over targeting and messaging.',
                      'Assign separate call tracking numbers to each platform so you can attribute every lead accurately.',
                      'Record the original lead source in your CRM for every contact.',
                      'Track qualified lead rate, appointment rate, estimate rate, close rate, signed revenue, and gross profit separately by source.',
                      'Compare cost per signed project and gross profit per dollar spent — not cost per lead.',
                      'Reallocate budget quarterly based on which source is producing the best qualified outcomes.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 shrink-0 bg-[#1565D8] text-white text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Running both platforms does not guarantee increased total visibility or results. It only makes sense if you have the budget, the tracking infrastructure, and the team capacity to manage and respond to leads from both sources effectively.
                  </p>
                </section>

                {/* 10 */}
                <section id="start-search-ads" aria-labelledby="h2-start-search-ads">
                  <h2 id="h2-start-search-ads" className="text-2xl font-extrabold tracking-tight mb-4">
                    When General Contractors Should Start With Google Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-4">
                    Consider starting with Google Search Ads when any of the following apply:
                  </p>
                  <ul className="space-y-2 text-[#667085] text-sm">
                    {[
                      'LSA is not available in your market or for your service category',
                      'You want direct control over the keywords that trigger your ads',
                      'You promote specialized services that benefit from specific keyword targeting',
                      'You need dedicated landing pages to qualify leads before they contact you',
                      'You want granular location targeting — specific ZIP codes, neighborhoods, or cities',
                      'You need advanced conversion tracking tied to form submissions and phone calls',
                      'You serve multiple project categories that warrant separate campaign structures',
                      'You want to test different offers, headlines, and landing page variations',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 11 */}
                <section id="start-lsa" aria-labelledby="h2-start-lsa">
                  <h2 id="h2-start-lsa" className="text-2xl font-extrabold tracking-tight mb-4">
                    When General Contractors Should Start With Local Services Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-4">
                    Consider starting with LSA when all of the following conditions are met:
                  </p>
                  <ul className="space-y-2 text-[#667085] text-sm">
                    {[
                      'You have confirmed LSA availability for your location and service category',
                      'You can complete the business verification process — license, insurance, and any applicable screening',
                      'Your Google Business Profile is complete, accurate, and actively maintained',
                      'Your review rating is competitive for your local market',
                      'You or your team can respond to incoming calls and messages quickly — slow response degrades LSA performance',
                      'Your team can qualify leads efficiently during the initial call',
                      'You want a simpler direct-lead channel without building and maintaining landing pages',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <CalloutBox type="warning" label="LSA still requires active management">
                    <p>Running Local Services Ads does not mean set-and-forget. Regularly reviewing lead quality, disputing ineligible leads, updating job types, maintaining response times, and managing your review profile are all ongoing requirements that affect both cost and performance.</p>
                  </CalloutBox>
                </section>

                {/* 12 */}
                <section id="common-mistakes" aria-labelledby="h2-common-mistakes">
                  <h2 id="h2-common-mistakes" className="text-2xl font-extrabold tracking-tight mb-4">
                    Common Mistakes Contractors Make With Both Platforms
                  </h2>
                  <ul className="space-y-3 text-[#667085] text-sm">
                    {[
                      { label: 'Treating all leads as equally valuable', desc: 'A call from a homeowner wanting a $3,000 repair is not the same as a call from someone planning a $180,000 addition. Tracking total lead volume without qualification rate hides this difference.' },
                      { label: 'Targeting an excessively large service area', desc: 'Expanding your area to capture more leads increases volume but decreases project fit and often increases travel time, reducing profitability.' },
                      { label: 'Failing to respond quickly', desc: 'Both platforms reward fast response. In LSA, slow response can reduce your ranking. In Google Ads, slow follow-up means leads go to a competitor who answered first.' },
                      { label: 'Not recording lead outcomes in a CRM', desc: 'Without CRM data, you cannot compare cost per signed project by source. You are optimizing based on lead count, not revenue.' },
                      { label: 'Optimizing only for lead volume', desc: 'More leads at a lower close rate and smaller average project value can produce less revenue and less profit than fewer, better-qualified leads.' },
                      { label: 'Ignoring small or low-value job inquiries', desc: 'LSA job types that attract small repairs or maintenance requests can inflate lead counts and cost without contributing to your core revenue.' },
                      { label: 'Not reviewing the search terms report in Google Ads', desc: 'Google Ads shows you exactly what searches triggered your ads. Reviewing this report regularly is the fastest way to find wasted spend and improve targeting.' },
                      { label: 'Selecting inaccurate job types in LSA', desc: 'Including job types that do not match your actual services generates leads for projects you do not offer, which wastes your LSA budget.' },
                      { label: 'Applying the same budget expectations to every service', desc: 'A kitchen remodeling campaign and a whole-home renovation campaign have different lead volumes, conversion rates, and average project values. Budget should reflect the economics of each service.' },
                      { label: 'Not connecting marketing spend to signed contracts', desc: 'If your reporting stops at leads, you cannot measure real advertising ROI. Connecting ad data to CRM outcomes is the only way to know whether your campaigns are actually profitable.' },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex items-start gap-3 border-l-2 border-[#D0D5DD] pl-4">
                        <div>
                          <span className="font-semibold text-[#0A0A0A]">{label}.</span>{' '}
                          <span>{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 13 */}
                <section id="measurement" aria-labelledby="h2-measurement">
                  <h2 id="h2-measurement" className="text-2xl font-extrabold tracking-tight mb-4">
                    How to Compare Google Ads and LSA Performance
                  </h2>
                  <p className="text-[#667085] leading-relaxed mb-4">
                    Build a simple measurement framework that tracks both platforms through the full sales process. The pipeline should look like this:
                  </p>
                  <div className="border border-[#D0D5DD] bg-[#F4F6F8] p-5 font-mono text-sm text-[#0A0A0A] space-y-1">
                    {[
                      'Advertising spend',
                      '→ Total leads',
                      '→ Qualified leads',
                      '→ Appointments',
                      '→ Estimates',
                      '→ Proposals',
                      '→ Signed projects',
                      '→ Signed revenue',
                      '→ Gross profit',
                    ].map((step) => (
                      <div key={step} className={step.startsWith('→') ? 'pl-4 text-[#667085]' : 'font-semibold'}>
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The primary comparison should not be cost per raw lead. The more useful comparisons are:
                  </p>
                  <ul className="mt-3 space-y-2 text-[#667085] text-sm">
                    {[
                      'Cost per qualified lead — total spend divided by leads that meet your project criteria',
                      'Cost per appointment — total spend divided by booked consultations',
                      'Cost per estimate — total spend divided by estimates delivered',
                      'Customer acquisition cost — total spend divided by signed projects',
                      'Signed revenue by source — revenue attributable to each platform',
                      'Gross profit by source — revenue minus direct costs, by platform',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1565D8] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 14 */}
                <section id="which-is-better" aria-labelledby="h2-which-is-better">
                  <h2 id="h2-which-is-better" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads: Which Is Better?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Neither platform is universally better. The right choice depends on your eligibility, service category, local market, budget, project value, lead quality requirements, sales process, and ability to track results accurately.
                  </p>
                  <ul className="mt-5 space-y-3 text-[#667085] text-sm">
                    {[
                      { label: 'Google Search Ads are generally better for', desc: 'keyword control, campaign segmentation, dedicated landing pages, advanced conversion tracking, high-ticket project qualification, and multi-service contractors who need granular optimization.' },
                      { label: 'Local Services Ads can be a strong channel for', desc: 'eligible businesses with a strong Google Business Profile, competitive reviews, fast response times, and service categories with consistent local search demand.' },
                      { label: 'Neither platform is automatically more profitable.', desc: 'The platform that generates more gross profit per dollar spent, at your actual conversion rates, for your actual service mix and market, is the right one.' },
                      { label: 'Many established contractors test both.', desc: 'Running both is practical when you have the budget, the tracking infrastructure, and the team to respond effectively to leads from both sources.' },
                      { label: 'Budget allocation should follow signed revenue and gross profit.', desc: 'Not lead volume, not cost per raw lead. The platforms that produce the highest gross profit per dollar invested should receive the most budget.' },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex items-start gap-3 border-l-2 border-[#1565D8] pl-4">
                        <div>
                          <span className="font-semibold text-[#0A0A0A]">{label}</span>{' '}
                          <span>{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* FAQ */}
                <FAQSection items={faqItems} />

                {/* End CTA */}
                <EndArticleCTA
                  headline="Build the Right Advertising Mix for Your Construction Company"
                  body="Get a contractor advertising strategy based on your services, market, project value, lead quality, and signed revenue."
                  buttonLabel="Schedule a Free Marketing Assessment"
                />

                {/* Related articles */}
                <RelatedArticles articles={relatedArticles} />

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
