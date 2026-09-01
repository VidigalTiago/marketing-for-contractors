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
import { SITE_URL, relatedArticleCards } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Google Ads for General Contractors: Complete Guide',
  description:
    'Learn how Google Ads for general contractors works, which keywords generate qualified leads, how much to invest, and how to turn clicks into signed projects.',
  alternates: {
    canonical: `${SITE_URL}/blog/google-ads-for-general-contractors`,
    languages: {
      'en-US': `${SITE_URL}/blog/google-ads-for-general-contractors`,
      'pt-BR': `${SITE_URL}/br/blog/google-ads-para-general-contractors`,
    },
  },
  openGraph: {
    title: 'Google Ads for General Contractors: Complete Guide',
    description:
      'Learn how Google Ads for general contractors works, which keywords generate qualified leads, how much to invest, and how to turn clicks into signed projects.',
    url: `${SITE_URL}/blog/google-ads-for-general-contractors`,
    type: 'article',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads for General Contractors: Complete Guide',
    description:
      'Learn how Google Ads for general contractors works, which keywords generate qualified leads, how much to invest, and how to turn clicks into signed projects.',
  },
}

const tocItems = [
  { id: 'does-it-work', label: 'Does Google Ads Work for Contractors?', level: 2 as const },
  { id: 'how-it-works', label: 'How Google Ads Works for Contractors', level: 2 as const },
  { id: 'keyword-strategy', label: 'Keyword Strategy', level: 2 as const },
  { id: 'campaign-structure', label: 'Campaign Structure', level: 2 as const },
  { id: 'landing-pages', label: 'Landing Pages That Convert', level: 2 as const },
  { id: 'bidding', label: 'Bidding and Budget Management', level: 2 as const },
  { id: 'conversion-tracking', label: 'Conversion Tracking', level: 2 as const },
  { id: 'lead-quality', label: 'Improving Lead Quality', level: 2 as const },
  { id: 'how-much-to-spend', label: 'How Much to Spend on Google Ads', level: 2 as const },
  { id: 'google-ads-vs-lsa', label: 'Google Ads vs Local Services Ads', level: 2 as const },
  { id: 'common-mistakes', label: 'Common Mistakes Contractors Make', level: 2 as const },
  { id: 'revenue-tracking', label: 'Tracking Revenue From Google Ads', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const faqItems = [
  {
    question: 'Does Google Ads work for general contractors?',
    answer:
      'Yes. Google Ads is one of the most effective lead generation channels for general contractors because it captures homeowners at the moment they are actively searching for your services. Unlike social media advertising where you interrupt people who may or may not need what you offer, Google Search Ads appear when someone types in "kitchen remodeling contractor near me" or "home addition builder [city]." That search intent makes these leads significantly more likely to convert into estimates and signed projects. The key is proper setup — the right keywords, a high-converting landing page, and a follow-up system ready to work every lead.',
  },
  {
    question: 'How much should a general contractor spend on Google Ads?',
    answer:
      'There is no universal answer, but most general contractors in competitive markets need a minimum monthly ad spend of $2,000 to $3,000 to generate enough data and lead volume to optimize campaigns effectively. Contractors targeting higher-ticket services like home additions, custom builds, or large renovations in competitive markets often invest $5,000 to $15,000 per month in ad spend alone. The right budget depends on your market, the services you offer, your average project value, and how many qualified leads you need per month to hit your revenue goals.',
  },
  {
    question: 'What are the best Google Ads keywords for contractors?',
    answer:
      'The best keywords for general contractors are specific, service-based, location-modified search terms that indicate the searcher is ready to hire. Examples include "[service] contractor near me," "[service] contractor [city name]," "hire a [service] contractor," and "best [service] contractors in [city]." Avoid broad match keywords like just "contractor" or "home improvement" — they generate traffic from homeowners doing research, not homeowners ready to hire, and they waste significant budget. Negative keyword lists are equally important: excluding terms like "DIY," "jobs," "certification," and "cost to become" prevents your ads from showing to non-buyers.',
  },
  {
    question: 'Is Google Ads better than Facebook Ads for contractors?',
    answer:
      'For most general contractors, Google Search Ads generate higher-quality leads than Facebook Ads because the intent is different. Google captures demand that already exists — homeowners actively searching for a contractor. Facebook creates demand by reaching homeowners who are not currently searching, which typically results in higher lead volume but lower close rates. Facebook can be effective for retargeting people who have already visited your website and for brand awareness in your local market. For direct lead generation, most contractors get better ROI from Google Search first, then expand to Facebook and other channels once their Google campaigns are performing well.',
  },
  {
    question: 'Should contractors use Google Ads or Local Services Ads?',
    answer:
      'Both can be valuable, but they work differently. Google Search Ads give you much more control — you choose your keywords, write your ads, control your landing page, and can optimize based on detailed performance data. Local Services Ads charge per lead rather than per click and appear above traditional ads, but you have less control over targeting and optimization. Most contractors that are serious about lead generation use both: LSAs for the prominent placement and pay-per-lead model, and Google Search Ads for greater control and scalability.',
  },
  {
    question: 'How long does it take for contractor Google Ads to work?',
    answer:
      'Most contractors start seeing their first leads within the first two to three weeks of launching a properly set up campaign. However, reaching consistent lead flow and cost efficiency typically takes three to six months. During that period, Google\'s algorithms are learning which searches and audiences convert best, and your campaigns need ongoing optimization — adjusting bids, refining keywords, improving ad copy, and testing landing pages. Expect the first month to be a learning phase, with meaningful improvement in month two and three, and strong performance from month four onward.',
  },
  {
    question: 'Why are my Google Ads leads low quality?',
    answer:
      'Low-quality leads from Google Ads are almost always a targeting problem. The most common causes are keywords that are too broad (attracting homeowners who are researching, not ready to hire), missing negative keywords (allowing your ads to show for irrelevant searches like DIY guides or contractor job listings), geographic targeting that is too wide (including areas you do not actually serve), and a landing page that does not filter for qualified buyers. Reviewing your search term report in Google Ads will show you exactly which searches are triggering your ads — that data usually reveals the targeting issues causing the quality problem.',
  },
  {
    question: 'How can contractors track revenue from Google Ads?',
    answer:
      'Tracking revenue from Google Ads requires connecting three systems: Google Ads (where leads originate), your CRM (where lead status and project value are tracked), and your reporting setup (where you connect ad spend to signed revenue). Start by making sure every lead capture method — forms, calls, and chats — fires a conversion event back to Google Ads. Then ensure your CRM records the original lead source for every contact. Finally, build a simple report that shows total ad spend by campaign alongside the revenue from projects that originated from each campaign. This gives you a true cost per signed project rather than just a cost per lead.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      headline: 'Google Ads for General Contractors: How to Generate More Qualified Leads',
      description:
        'Learn how Google Ads for general contractors works, which keywords generate qualified leads, how much to invest, and how to turn clicks into signed projects.',
      image: `${SITE_URL}/blog/google-ads-contractors-hero.jpg`,
      datePublished: '2025-07-09',
      dateModified: '2025-07-09',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/google-ads-for-general-contractors`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Marketing For Contractors',
        url: SITE_URL,
      },
      keywords: [
        'Google Ads for general contractors',
        'Google Ads for contractors',
        'general contractor advertising',
        'contractor lead generation',
        'PPC for contractors',
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
          name: 'Google Ads for General Contractors',
          item: `${SITE_URL}/blog/google-ads-for-general-contractors`,
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

export default function GoogleAdsArticle() {
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
            { label: 'Google Ads for General Contractors' },
          ]} />

          {/* Header */}
          <header className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Google Ads
              </span>
              <span className="text-[#D0D5DD]">·</span>
              <span className="text-[10px] text-[#667085]">18 min read</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] text-balance leading-[1.05] mb-4">
              Google Ads for General Contractors: How to Generate More Qualified Leads
            </h1>
            <p className="text-lg text-[#667085] leading-relaxed max-w-2xl">
              A complete guide to running Google Ads for general contractors — from keyword strategy and campaign setup to bid management, landing page optimization, and revenue tracking.
            </p>
            <div className="flex items-center gap-4 mt-4 text-[11px] text-[#D0D5DD]">
              <span>Published July 9, 2025</span>
              <span>·</span>
              <span>Updated July 9, 2025</span>
            </div>
          </header>

          {/* Featured image */}
          <div
            className="w-full h-56 lg:h-80 bg-[#0A0A0A] blueprint-grid-dark flex items-center justify-center mb-10 max-w-3xl"
            role="img"
            aria-label="Google Ads campaign strategy for a general contractor"
          >
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              Google Ads campaign strategy for a general contractor
            </span>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-12 lg:gap-16 items-start">
            {/* Article */}
            <article id="article-body" className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile ToC only */}
              <TableOfContents items={tocItems} variant="mobile" />

              <div className="space-y-10 text-[#0A0A0A]">

                {/* 1 */}
                <section id="does-it-work" aria-labelledby="h2-does-it-work">
                  <h2 id="h2-does-it-work" className="text-2xl font-extrabold tracking-tight mb-4">
                    Does Google Ads Work for General Contractors?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Yes — and for a specific reason that makes it especially valuable for construction companies. Google Ads captures homeowners at the exact moment they are searching for a contractor. When someone types "kitchen remodeling contractor near me" into Google, they are not browsing or being entertained. They are actively looking to hire someone.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    That search intent is what separates Google Ads from most other marketing channels. You are not interrupting someone's social media feed or hoping your yard sign gets noticed. You are appearing directly in front of a homeowner who has already decided they need a contractor and is now evaluating their options.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The challenge is that Google Ads is highly competitive in most construction markets, and most contractors who run campaigns without proper setup end up paying for clicks from homeowners who are researching costs, looking for DIY instructions, or searching for contractor employment. The quality of your campaigns determines whether you generate qualified project leads or burn through budget with nothing to show for it.
                  </p>
                </section>

                {/* 2 */}
                <section id="how-it-works" aria-labelledby="h2-how-it-works">
                  <h2 id="h2-how-it-works" className="text-2xl font-extrabold tracking-tight mb-4">
                    How Google Ads Works for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Google Search Ads work through an auction. When a homeowner searches for a term that matches your keywords, Google runs an instant auction among all advertisers targeting that search. The winning ads appear at the top of the results page, above the organic listings.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Your position in that auction is determined by two factors: your bid (how much you are willing to pay per click) and your Quality Score (a rating of how relevant your ad and landing page are to the search). A high Quality Score can let you outrank competitors who are bidding more than you, and it reduces your actual cost per click.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    You only pay when someone actually clicks your ad — not when it appears. This pay-per-click model means your spend is directly tied to traffic, though traffic is not the same as leads. Converting those clicks into actual inquiries requires a relevant landing page and a clear call to action.
                  </p>
                  <CalloutBox type="info" label="Key Principle">
                    <p>Google Ads pays for traffic, not leads. A click becomes a lead only when a homeowner fills out a form or calls your number. Your landing page is what converts clicks into contacts — it is where most campaigns win or lose.</p>
                  </CalloutBox>
                </section>

                {/* 3 */}
                <section id="keyword-strategy" aria-labelledby="h2-keywords">
                  <h2 id="h2-keywords" className="text-2xl font-extrabold tracking-tight mb-4">
                    Keyword Strategy for Contractor Google Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Keyword selection is the most important decision you make in a Google Ads campaign. The keywords you target determine who sees your ads and, consequently, the quality of leads you receive.
                  </p>

                  <h3 className="text-lg font-bold text-[#0A0A0A] mt-6 mb-3">High-intent keywords to target</h3>
                  <p className="text-[#667085] leading-relaxed">
                    The keywords that consistently produce qualified contractor leads are specific, service-focused, and modified with location or hiring intent signals:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>[service] contractor near me (e.g., "kitchen remodeling contractor near me")</li>
                    <li>[service] contractor [city] (e.g., "home addition contractor Denver")</li>
                    <li>hire a [service] contractor</li>
                    <li>best [service] contractors in [city]</li>
                    <li>[service] company near me</li>
                    <li>[service] builders in [city]</li>
                  </ul>

                  <h3 className="text-lg font-bold text-[#0A0A0A] mt-6 mb-3">Keywords to avoid</h3>
                  <p className="text-[#667085] leading-relaxed">
                    Broad, generic keywords attract homeowners who are researching, not hiring. Avoid:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>Just "contractor" or "home improvement" without service or location context</li>
                    <li>"How much does [service] cost" — research intent, not hiring intent</li>
                    <li>"DIY [service]" — they want to do it themselves</li>
                    <li>"[service] permit" — administrative research, not hiring</li>
                  </ul>

                  <h3 className="text-lg font-bold text-[#0A0A0A] mt-6 mb-3">Negative keywords</h3>
                  <p className="text-[#667085] leading-relaxed">
                    Negative keywords are terms you exclude so your ads do not show for irrelevant searches. A well-maintained negative keyword list is often the difference between a profitable campaign and a money-losing one. Essential negatives for contractors include: jobs, employment, hiring, salary, certification, license exam, training, DIY, YouTube, how to, free, cheap (if you serve premium markets), and any geographic areas you do not serve. For a complete breakdown of keyword selection by service, match type guidance, and negative keyword categories, see the{' '}
                    <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">best Google Ads keywords for general contractors guide</Link>.
                  </p>
                </section>

                {/* 4 */}
                <section id="campaign-structure" aria-labelledby="h2-structure">
                  <h2 id="h2-structure" className="text-2xl font-extrabold tracking-tight mb-4">
                    Campaign Structure for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    A well-structured Google Ads account organizes campaigns by service type and intent level, giving you control over budget allocation, bidding, and ad messaging at a granular level.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    A practical structure for a general contractor running multiple services:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>One campaign per primary service (kitchen remodeling, bathroom renovation, home additions, etc.)</li>
                    <li>Ad groups organized by keyword theme within each campaign</li>
                    <li>Separate landing pages for each service, matching the specific ad and keyword</li>
                    <li>Separate campaigns for branded keywords (your company name searches)</li>
                    <li>A remarketing campaign targeting website visitors who did not convert</li>
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    This structure lets you see exactly which services are generating leads at what cost, shift budget toward your most profitable services, and write ads that speak directly to what the homeowner searched for.
                  </p>
                </section>

                {/* 5 */}
                <section id="landing-pages" aria-labelledby="h2-landing-pages">
                  <h2 id="h2-landing-pages" className="text-2xl font-extrabold tracking-tight mb-4">
                    Landing Pages That Convert Contractor Ad Clicks
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Your landing page is where your campaign either produces leads or loses them. Sending Google Ads traffic to your homepage is one of the most common and costly mistakes contractors make. A homepage designed to communicate your full brand story is not optimized to convert a homeowner who searched for one specific service.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Effective contractor landing pages have:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>A headline that matches the search intent (e.g., "Kitchen Remodeling Contractors in Denver")</li>
                    <li>A prominent phone number and contact form above the fold</li>
                    <li>Project photos relevant to the service being advertised</li>
                    <li>Specific social proof: reviews, project photos, years in business, service area</li>
                    <li>A simple, low-friction form (name, phone, project description is enough to start)</li>
                    <li>Fast load time — every second of delay reduces conversion rate</li>
                    <li>Mobile-first design — most homeowners search on mobile</li>
                  </ul>
                </section>

                {/* 6 */}
                <section id="bidding" aria-labelledby="h2-bidding">
                  <h2 id="h2-bidding" className="text-2xl font-extrabold tracking-tight mb-4">
                    Bidding and Budget Management
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    New contractor campaigns typically start with manual bidding or a conservative automated strategy like Maximize Clicks with a target CPC cap. This gives you control while the campaign gathers conversion data. Once you have at least 20 to 30 tracked conversions per month, switching to Target CPA (cost per acquisition) bidding allows Google to optimize toward leads rather than just clicks.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Budget allocation should reflect your service priorities. If kitchen remodeling generates your highest-value projects, that campaign should receive the most budget. Start with enough to generate meaningful data — under $50 per day per campaign, you will struggle to get enough clicks to optimize. Most contractors in competitive markets need a minimum of $75 to $150 per day in total ad spend to generate consistent lead volume.
                  </p>
                  <CalloutBox type="tip" label="Budget Reality Check">
                    <p>If your total monthly ad budget is under $1,500, you may not have enough traffic to optimize campaigns effectively. Consider focusing on one or two services in a tighter geographic area to concentrate your budget where it can make a meaningful impact.</p>
                  </CalloutBox>
                </section>

                {/* 7 */}
                <section id="conversion-tracking" aria-labelledby="h2-tracking">
                  <h2 id="h2-tracking" className="text-2xl font-extrabold tracking-tight mb-4">
                    Conversion Tracking for Contractor Google Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Conversion tracking is non-negotiable. Without it, you cannot know which keywords, ads, or campaigns are generating leads, and you are flying blind when making optimization decisions.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Every lead capture method needs to fire a conversion event back to Google Ads:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>Form submissions — track the thank-you page view or form submission event</li>
                    <li>Phone calls from ads — use Google Ads call tracking on your headline phone number</li>
                    <li>Phone calls from your website — use Google's website call conversion tracking</li>
                    <li>Live chat contacts — if you use a chat tool, fire a conversion event on chat start or contact submission</li>
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Once conversion tracking is in place, you can see your actual cost per lead by campaign, ad group, and keyword — and use that data to shift budget toward what is working and pause what is not.
                  </p>
                </section>

                {/* 8 */}
                <section id="lead-quality" aria-labelledby="h2-lead-quality">
                  <h2 id="h2-lead-quality" className="text-2xl font-extrabold tracking-tight mb-4">
                    Improving Lead Quality From Google Ads
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    High lead volume with low lead quality is a common problem in contractor Google Ads campaigns. If you are getting many inquiries from homeowners with tiny budgets, wrong service types, or outside your service area, the issue is almost always in your targeting setup.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Actions that consistently improve lead quality:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>Review your Search Terms report weekly and add irrelevant terms as negative keywords</li>
                    <li>Tighten your geographic targeting to only the zip codes or cities you actually serve</li>
                    <li>Add a project budget qualifier to your contact form (a dropdown or minimum project size field)</li>
                    <li>Use ad copy that pre-qualifies — mention your market positioning, project minimums, or service focus</li>
                    <li>Pause keywords with high click volume but zero conversions after 50+ clicks</li>
                  </ul>
                </section>

                {/* Inline CTA */}
                <InlineCTA
                  headline="Are Your Google Ads Producing Revenue or Just Leads?"
                  body="We connect ad campaigns, landing pages, lead follow-up, CRM data, and signed revenue so you can see which marketing investments are actually producing profitable projects."
                  buttonLabel="Request a Free Marketing Assessment"
                />

                {/* 9 */}
                <section id="how-much-to-spend" aria-labelledby="h2-budget-amount">
                  <h2 id="h2-budget-amount" className="text-2xl font-extrabold tracking-tight mb-4">
                    How Much Should a General Contractor Spend on Google Ads?
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    The right Google Ads budget for a contractor depends on your market, the competition level for your services, your average project value, and how many signed projects you need per month. The framework below helps you calculate a starting point.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    Working backward from a revenue goal:
                  </p>
                  <ol className="mt-3 space-y-2 text-[#667085] text-sm leading-relaxed list-decimal list-inside">
                    <li>Determine your monthly revenue goal (e.g., $200,000)</li>
                    <li>Divide by your average project value (e.g., $25,000) = 8 signed projects needed</li>
                    <li>Divide by your estimate-to-contract close rate (e.g., 40%) = 20 estimates needed</li>
                    <li>Divide by your lead-to-estimate rate (e.g., 50%) = 40 qualified leads needed</li>
                    <li>Multiply by your target cost per lead (e.g., $150) = $6,000 monthly ad spend</li>
                  </ol>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    This is a starting framework, not a guarantee. Actual cost per lead varies based on competition and market, and your rates will change as you optimize. But it gives you a rational basis for your budget rather than picking a number arbitrarily.
                  </p>
                </section>

                {/* 10 */}
                <section id="google-ads-vs-lsa" aria-labelledby="h2-lsa">
                  <h2 id="h2-lsa" className="text-2xl font-extrabold tracking-tight mb-4">
                    Google Ads vs Local Services Ads for General Contractors
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Local Services Ads (LSAs) appear above traditional Google Ads in search results and charge per lead rather than per click. They are tied to your Google Business Profile and require business verification. For contractors who qualify, they can be a cost-effective complement to Search campaigns. For a full side-by-side breakdown of how the two platforms compare on cost, control, lead quality, and eligibility, see the{' '}
                    <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">
                      Google Ads vs Local Services Ads guide for contractors
                    </Link>.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The key differences:
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#F4F6F8]">
                          <th className="border border-[#D0D5DD] px-4 py-2.5 text-left text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider">Feature</th>
                          <th className="border border-[#D0D5DD] px-4 py-2.5 text-left text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider">Google Search Ads</th>
                          <th className="border border-[#D0D5DD] px-4 py-2.5 text-left text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider">Local Services Ads</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#667085]">
                        <tr>
                          <td className="border border-[#D0D5DD] px-4 py-2.5 font-medium text-[#0A0A0A]">Pricing</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Pay per click</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Pay per lead</td>
                        </tr>
                        <tr className="bg-[#F4F6F8]/50">
                          <td className="border border-[#D0D5DD] px-4 py-2.5 font-medium text-[#0A0A0A]">Keyword control</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Full control</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Limited</td>
                        </tr>
                        <tr>
                          <td className="border border-[#D0D5DD] px-4 py-2.5 font-medium text-[#0A0A0A]">Landing page</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Your landing page</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Google profile</td>
                        </tr>
                        <tr className="bg-[#F4F6F8]/50">
                          <td className="border border-[#D0D5DD] px-4 py-2.5 font-medium text-[#0A0A0A]">Optimization data</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Detailed</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Limited</td>
                        </tr>
                        <tr>
                          <td className="border border-[#D0D5DD] px-4 py-2.5 font-medium text-[#0A0A0A]">Trust signal</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Ad label</td>
                          <td className="border border-[#D0D5DD] px-4 py-2.5">Google-verified badge</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    For most serious contractors, the best approach is to run both — LSAs for the prominent placement and trust signal, and Google Search Ads for control, scalability, and detailed optimization data.
                  </p>
                </section>

                {/* 11 */}
                <section id="common-mistakes" aria-labelledby="h2-mistakes">
                  <h2 id="h2-mistakes" className="text-2xl font-extrabold tracking-tight mb-4">
                    Common Google Ads Mistakes Contractors Make
                  </h2>
                  <ul className="space-y-3 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li><strong className="text-[#0A0A0A]">Sending traffic to the homepage.</strong> Every service needs its own landing page that matches the ad's message.</li>
                    <li><strong className="text-[#0A0A0A]">Using broad match keywords without controls.</strong> Broad match without a robust negative keyword list will drain your budget on irrelevant searches.</li>
                    <li><strong className="text-[#0A0A0A]">Not tracking conversions.</strong> Running campaigns without conversion tracking means you have no data to optimize.</li>
                    <li><strong className="text-[#0A0A0A]">Targeting too wide a geography.</strong> Targeting a 50-mile radius when you realistically serve a 15-mile area dilutes your budget across areas that will never produce revenue.</li>
                    <li><strong className="text-[#0A0A0A]">Pausing campaigns too early.</strong> Google Ads needs a learning period. Pausing a campaign after two weeks because leads are expensive does not give it enough time to optimize.</li>
                    <li><strong className="text-[#0A0A0A]">No follow-up system.</strong> Getting the lead is only half the equation. If you are not responding within hours and following up multiple times, you are converting a fraction of what your campaigns could produce. See{' '}
                    <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to follow up with contractor leads</Link> for a complete system.</li>
                    <li><strong className="text-[#0A0A0A]">Running broad services in one campaign.</strong> Mixing roofing, kitchen remodeling, and additions into one campaign makes it impossible to control budget or write relevant ad copy for each service.</li>
                  </ul>
                </section>

                {/* 12 */}
                <section id="revenue-tracking" aria-labelledby="h2-revenue">
                  <h2 id="h2-revenue" className="text-2xl font-extrabold tracking-tight mb-4">
                    Tracking Revenue From Google Ads Campaigns
                  </h2>
                  <p className="text-[#667085] leading-relaxed">
                    Most contractor marketers measure Google Ads by cost per lead. That is a start, but it is not enough. Two campaigns might both generate leads at $150 each, but if one campaign&apos;s leads close at 20% and the other&apos;s close at 50%, they are performing very differently. And if one campaign generates $15,000 average projects and the other generates $50,000 average projects, the cost-per-lead metric tells you almost nothing useful. See the full guide on{' '}
                    <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what is a good cost per lead for general contractors</Link> to calculate your target CPL based on project value, margin, and close rate.
                  </p>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    The contractors making the best marketing decisions connect their Google Ads data to their CRM so they can see:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[#667085] text-sm leading-relaxed list-disc list-inside">
                    <li>How many leads each campaign generates</li>
                    <li>What percentage of those leads become booked estimates</li>
                    <li>What percentage of estimates become signed contracts</li>
                    <li>The average project value from each campaign</li>
                    <li>The total revenue generated and cost per signed project by campaign</li>
                  </ul>
                  <p className="text-[#667085] leading-relaxed mt-4">
                    With that data, you can calculate your true return on ad spend and make confident decisions about budget allocation. You stop optimizing for cheap leads and start optimizing for profitable revenue — which is a fundamentally different and more valuable approach. This is part of a broader{' '}
                    <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:text-[#1255c0] transition-colors">
                      general contractor marketing strategy
                    </Link>{' '}
                    that connects every channel to signed project outcomes.
                  </p>
                </section>

                {/* FAQ */}
                <FAQSection items={faqItems} />

                {/* End CTA */}
                <EndArticleCTA
                  headline="Build a Complete Google Ads System for Your Construction Company"
                  body="Get a contractor marketing system designed to generate qualified opportunities and track them from the original search to the signed project."
                  buttonLabel="Schedule a Free Marketing Assessment"
                />

                {/* Related articles */}
                <RelatedArticles articles={relatedArticleCards} />
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
