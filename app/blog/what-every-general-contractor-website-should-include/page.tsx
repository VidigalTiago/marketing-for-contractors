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

const SLUG = 'what-every-general-contractor-website-should-include'
const ARTICLE_ID = 'contractor-website-essentials'

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
  { id: 'website-job', label: 'What a Contractor Website Is Actually For', level: 2 as const },
  { id: 'above-the-fold', label: 'What Belongs Above the Fold', level: 2 as const },
  { id: 'service-pages', label: 'One Page per Service', level: 2 as const },
  { id: 'service-area', label: 'Service Area and Location Pages', level: 2 as const },
  { id: 'proof', label: 'Proof: Projects, Reviews, and Credentials', level: 2 as const },
  { id: 'contact-paths', label: 'Contact Paths Homeowners Actually Use', level: 2 as const },
  { id: 'forms', label: 'How Many Form Fields Your Site Needs', level: 2 as const },
  { id: 'pricing', label: 'Should You Show Prices?', level: 2 as const },
  { id: 'mobile', label: 'The Mobile Experience', level: 2 as const },
  { id: 'speed', label: 'Site Speed and Core Web Vitals', level: 2 as const },
  { id: 'seo-foundations', label: 'Technical SEO Foundations', level: 2 as const },
  { id: 'structured-data', label: 'Structured Data for Contractors', level: 2 as const },
  { id: 'tracking', label: 'Tracking That Connects Leads to Revenue', level: 2 as const },
  { id: 'content', label: 'Content That Supports the Sales Conversation', level: 2 as const },
  { id: 'mistakes', label: 'Common Contractor Website Mistakes', level: 2 as const },
  { id: 'checklist', label: 'The Contractor Website Checklist', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'What Every General Contractor Website Should Include' },
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
                href="/br/blog/o-que-todo-site-de-general-contractor-deve-ter"
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
                  Most contractor websites are judged by the wrong standard. The question owners usually ask is whether the site looks professional. The question that decides whether it pays for itself is whether a homeowner who lands on it can tell, within a few seconds, that this company builds what they need, works where they live, and can be contacted right now.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A general contractor website is not a brochure. It is the destination for every Google Ads click, every Google Business Profile visit, every referral who wants to check the company out before calling. Everything the company spends on demand generation passes through it, which means a weak site raises the cost of every other channel at once.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This article is a checklist of what belongs on a general contractor website and why, covering the pages, the proof, the contact paths, and the technical foundations. For how the site fits into the broader marketing system, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">complete general contractor marketing guide</Link>.
                </p>
              </section>

              {/* Website job */}
              <section id="website-job" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What a Contractor Website Is Actually For</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A homeowner arriving on a contractor site is usually trying to answer four questions, fast:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Does this company do the specific kind of work I need?</li>
                  <li>Do they work where my property is?</li>
                  <li>Is there evidence they do it well?</li>
                  <li>How do I reach them, and what happens after I do?</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Every element on the site either helps answer one of those questions or competes for attention with the ones that do. That test is the most useful filter available when deciding what to build and what to cut.
                </p>
                <CalloutBox type="info" label="The standard">
                  A contractor website is working when a qualified homeowner can decide to contact you without having to hunt for anything. Visual polish that does not move that decision forward is decoration, not design.
                </CalloutBox>
              </section>

              {/* Above the fold */}
              <section id="above-the-fold" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Belongs Above the Fold</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The first screen carries the most weight because it is the only part every visitor sees. At minimum it should contain:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">A specific headline:</strong> what the company builds and where, not a slogan about quality or craftsmanship</li>
                  <li><strong className="text-[#0A0A0A]">A tappable phone number:</strong> visible without scrolling, on both mobile and desktop</li>
                  <li><strong className="text-[#0A0A0A]">A primary call to action:</strong> one clear next step, such as requesting an estimate</li>
                  <li><strong className="text-[#0A0A0A]">A trust signal:</strong> license number, years in business, review rating, or a recognizable credential</li>
                  <li><strong className="text-[#0A0A0A]">Real project imagery:</strong> the company&apos;s own work, not stock photography of someone else&apos;s house</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  &quot;Quality craftsmanship since 1998&quot; tells a homeowner nothing they can act on. &quot;Kitchen and bathroom remodeling in Greater Boston, licensed and insured&quot; answers two of the four questions before they scroll.
                </p>
              </section>

              {/* Service pages */}
              <section id="service-pages" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">One Page per Service</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A single services page listing ten offerings cannot rank well for any of them, and it cannot speak specifically to the homeowner searching for one. Each service the company actively sells and wants to be found for generally deserves its own page.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A service page that does its job usually covers:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>What the service includes and where it typically stops</li>
                  <li>What the process looks like from first call to final walkthrough</li>
                  <li>Typical timeline and the factors that change it</li>
                  <li>Photos of completed projects of that specific type</li>
                  <li>Questions homeowners consistently ask about that service</li>
                  <li>A call to action written for that service, not a generic one</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Service pages are also what makes paid traffic work. Sending a kitchen remodeling ad to the home page wastes the click. The{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">keyword structure of a contractor Google Ads account</Link>{' '}
                  should map onto the service pages, one to one.
                </p>
                <CalloutBox type="warning" label="Watch out">
                  Only build pages for services you genuinely want more of. A page for work the company takes on reluctantly will generate inquiries for exactly that work.
                </CalloutBox>
              </section>

              {/* Service area */}
              <section id="service-area" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Service Area and Location Pages</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Geography is a qualification filter. A site that never states where the company works will collect inquiries from outside the service area, and every one of those costs sales time to disqualify.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  State the service area plainly on the home page, the contact page, and every service page. Beyond that, a dedicated location page can earn its place when the company has something specific to say about that market: completed projects there, familiarity with local permitting, common property types, or a genuine physical presence.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The failure mode is generating dozens of pages by swapping a city name into an identical template. Those pages add nothing for a reader and risk being treated as thin, duplicated content. A handful of substantive location pages generally outperforms a large set of interchangeable ones.
                </p>
              </section>

              {/* Proof */}
              <section id="proof" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Proof: Projects, Reviews, and Credentials</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Construction is a high-trust, high-cost purchase made by someone who will let strangers into their home for weeks. Proof is not a nice-to-have section near the footer.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Project galleries</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Real photos of the company&apos;s own completed work, organized by service type so a visitor can find work resembling their own project. Before and after pairs are more persuasive than finished shots alone, because they show the scope of what changed.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Case studies</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  A short write-up of a project (the problem, the approach, the constraints, the result) does more for a considered purchase than a gallery alone. Three strong case studies beat thirty captionless photos.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Reviews</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  Pull in reviews that can be verified externally, and attribute them with at least a first name and town. Anonymous testimonials read as unverifiable and carry very little weight.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Credentials</h3>
                <p className="text-[#667085] leading-relaxed">
                  License number, insurance and bonding status, manufacturer certifications, and trade association membership. State them accurately and keep them current: a lapsed certification displayed on a site is worse than no certification at all.
                </p>
              </section>

              {/* Contact paths */}
              <section id="contact-paths" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contact Paths Homeowners Actually Use</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Different people contact a contractor in different ways, and a site that offers only one path loses everyone who prefers another. A complete set usually includes:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>A tappable phone number in the header, persistent on mobile</li>
                  <li>A short estimate request form, reachable from every page</li>
                  <li>Text or SMS, if the business can actually staff it</li>
                  <li>An email address for people who prefer to write at length</li>
                  <li>Online scheduling, if the sales process supports booked consultations</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Just as important is what the site says happens next. Telling a visitor when they can expect a response sets an expectation the business then has to meet, and it reduces the number of people who submit to three contractors at once because they have no idea whether anyone will call back.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  None of this matters if the inquiry then sits unanswered. The site generates the lead; the{' '}
                  <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">follow-up process</Link>{' '}
                  decides whether it becomes a project.
                </p>
              </section>

              {/* Forms */}
              <section id="forms" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Many Form Fields Your Site Needs</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There is a real trade-off here, and the right answer depends on which problem the business currently has. Fewer fields generally produce more submissions. More fields generally produce better qualified submissions.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Current problem</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Form approach</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Too few inquiries', 'Cut to name, phone, and a one-line project description. Qualify on the call.'],
                        ['Too many unqualified inquiries', 'Add project type, property location, and rough timeline as required fields.'],
                        ['Inquiries far outside budget range', 'Add a budget range selector, and publish price context elsewhere on the page.'],
                        ['Inquiries for work you do not do', 'Make project type a fixed list rather than a free-text field.'],
                      ].map(([problem, approach]) => (
                        <tr key={problem} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{problem}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{approach}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Raw submission count is the wrong number to optimize. A form change that cuts submissions by a third while doubling the share that qualify is an improvement, and only tracking that follows leads through to signed projects will show it. That is the same logic behind{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">cost per qualified lead rather than raw cost per lead</Link>.
                </p>

                <InlineCTA
                  headline="Is Your Website Costing You Qualified Leads?"
                  body="We review your site the way a homeowner and a search engine each see it, then show you what is blocking estimate requests and what to fix first."
                  buttonLabel="Request a Free Website Review"
                />
              </section>

              {/* Pricing */}
              <section id="pricing" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Should You Show Prices?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Exact pricing is rarely practical for custom construction work. But publishing nothing leaves homeowners to guess, and people guessing about the price of a kitchen remodel guess badly in both directions.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A middle path works for most contractors: publish typical project ranges by service, a minimum project size the company takes on, or an explanation of the variables that move a price up and down (scope, materials, structural work, permitting, site access).
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Price context is a qualification tool disguised as a content section. It filters out mismatched inquiries before they consume sales time, without committing the company to a number it cannot honor.
                </p>
              </section>

              {/* Mobile */}
              <section id="mobile" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Mobile Experience</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A large share of contractor searches happen on a phone, often standing in the room the homeowner wants to change. Mobile is not a scaled-down version of the real site; for many visitors it is the only version they will ever see.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Phone number tappable, and visible without scrolling</li>
                  <li>Forms usable with one thumb, with correct keyboard types for phone and email fields</li>
                  <li>Tap targets large enough to hit without zooming</li>
                  <li>Body text readable without pinching</li>
                  <li>Galleries that load progressively instead of stalling the page</li>
                  <li>No interstitial popup covering the content the moment the page loads</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Test on a real phone on cellular data, not on a desktop browser resized to a narrow window. The two are not the same experience.
                </p>
              </section>

              {/* Speed */}
              <section id="speed" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Site Speed and Core Web Vitals</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Speed affects contractor lead generation in two separate ways. Slower pages give visitors more chance to leave before reaching the form or the phone number, which lowers conversion rate and pushes up the effective cost of every paid click. Page experience is also one of the signals Google uses when evaluating pages.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google publishes Core Web Vitals thresholds for what counts as a good experience, assessed at the 75th percentile of page loads:
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p><strong>Largest Contentful Paint (LCP):</strong> 2.5 seconds or less</p>
                  <p><strong>Interaction to Next Paint (INP):</strong> 200 milliseconds or less</p>
                  <p><strong>Cumulative Layout Shift (CLS):</strong> 0.1 or less</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  On contractor sites the usual culprits are predictable: uncompressed project photos straight off a camera or phone, a heavy page builder loading scripts nothing on the page uses, embedded review and chat widgets, and hero video. Project galleries are the single most common cause, and also the easiest to fix through compression, modern image formats, and lazy loading.
                </p>
              </section>

              {/* SEO foundations */}
              <section id="seo-foundations" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Technical SEO Foundations</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  These are the mechanics that let search engines understand and index the site. None of them are visible to a visitor, and all of them limit how well the site can perform if they are wrong.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>A unique title tag and meta description per page, written for the page, not templated</li>
                  <li>One H1 per page, with H2 and H3 structure that reflects the actual content</li>
                  <li>Descriptive URLs that state what the page is about</li>
                  <li>Alt text on project images that describes the work shown</li>
                  <li>An XML sitemap and a robots file that does not block anything important</li>
                  <li>HTTPS across the whole site, with a single canonical version of every URL</li>
                  <li>Internal links connecting service pages, location pages, and the pillar guide</li>
                  <li>Business name, address, and phone number consistent with the Google Business Profile</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  That last point matters more for contractors than for most businesses, because so much local discovery runs through Google Business Profile rather than the site itself. Inconsistent contact details across the two undermine both.
                </p>
              </section>

              {/* Structured data */}
              <section id="structured-data" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Structured Data for Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Structured data tells search engines explicitly what a page describes, instead of leaving them to infer it. Schema.org includes a dedicated <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">GeneralContractor</code> type, which sits under <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">LocalBusiness</code> by way of <code className="text-[#0A0A0A] bg-[#F4F6F8] px-1.5 py-0.5 text-[13px]">HomeAndConstructionBusiness</code>.
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">GeneralContractor:</strong> the business itself, with name, address, phone, hours, and service area</li>
                  <li><strong className="text-[#0A0A0A]">Service:</strong> each individual service page</li>
                  <li><strong className="text-[#0A0A0A]">FAQPage:</strong> pages with a genuine question and answer section</li>
                  <li><strong className="text-[#0A0A0A]">BreadcrumbList:</strong> the navigation path to the page</li>
                  <li><strong className="text-[#0A0A0A]">BlogPosting:</strong> articles and guides</li>
                </ul>
                <CalloutBox type="warning" label="Watch out">
                  Structured data describes what is already on the page. Marking up reviews, services, or credentials that do not appear in the visible content can cause manual action problems rather than earn richer results.
                </CalloutBox>
              </section>

              {/* Tracking */}
              <section id="tracking" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Tracking That Connects Leads to Revenue</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A website with no measurement cannot be improved, only redesigned on instinct. The minimum setup for a contractor site is:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Analytics with form submissions configured as a conversion event</li>
                  <li>Call tracking numbers, so phone inquiries are attributed to a source rather than lost</li>
                  <li>Source capture on the form itself, including the original referrer and any campaign parameters</li>
                  <li>Leads flowing into a CRM with that source attached</li>
                  <li>Search Console connected, to see which queries actually reach the site</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Phone calls are where most contractor tracking breaks. Homeowners call rather than fill out forms far more often than in most industries, and a site that only counts form submissions will consistently understate what its best pages produce. Once source data reaches the CRM, it becomes possible to measure{' '}
                  <Link href="/blog/contractor-marketing-roi" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">actual marketing ROI</Link>{' '}
                  rather than traffic.
                </p>
              </section>

              {/* Content */}
              <section id="content" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Content That Supports the Sales Conversation</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Beyond service and location pages, the content worth writing is the content that answers what homeowners ask before they hire: how long a project of this type takes, what happens if something is found behind the wall, who handles permits, how payment is structured, what the warranty covers.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Those answers do two jobs at once. They capture search traffic from people in the research stage, and they shorten the sales conversation for people already talking to the company, because the groundwork has been laid before the first call.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The useful test for any article is whether it would help a real prospect decide. Publishing on a schedule with no specific reader in mind produces maintenance work rather than qualified traffic.
                </p>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Contractor Website Mistakes</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Stock photography of houses the company never worked on</li>
                  <li>A single page listing every service instead of a page per service</li>
                  <li>No service area stated anywhere on the site</li>
                  <li>Phone number as an image, or buried in a footer, or not tappable on mobile</li>
                  <li>A contact form that gives no confirmation and no indication of what happens next</li>
                  <li>Dozens of near identical city pages built from one template</li>
                  <li>Uncompressed gallery photos that make every page slow</li>
                  <li>Credentials and certifications left on the site after they lapsed</li>
                  <li>No call tracking, so phone leads are invisible in every report</li>
                  <li>A redesign launched without measuring what the previous site converted</li>
                </ul>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Contractor Website Checklist</h2>
                <CalloutBox type="tip" label="Summary">
                  Answer four questions fast (what you build, where you work, proof you do it well, how to reach you), then make sure the technical foundations and tracking are in place to prove it is working.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Specific headline naming the services and the service area.</li>
                  <li>Tappable phone number visible without scrolling, on every page.</li>
                  <li>One page per service the company actively wants more of.</li>
                  <li>Service area stated plainly, with location pages only where there is substance.</li>
                  <li>Project gallery of the company&apos;s own work, organized by service.</li>
                  <li>Reviews and case studies that can be attributed and verified.</li>
                  <li>License, insurance, and certifications, stated accurately and kept current.</li>
                  <li>An estimate form sized to the qualification problem the business actually has.</li>
                  <li>Price context, even if exact pricing is not possible.</li>
                  <li>Mobile experience tested on a real phone, on cellular data.</li>
                  <li>Core Web Vitals within Google&apos;s published thresholds.</li>
                  <li>Titles, headings, URLs, sitemap, HTTPS, and internal links in order.</li>
                  <li>Structured data matching what is visible on the page.</li>
                  <li>Analytics, call tracking, source capture, and CRM handoff wired end to end.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  A site built to this standard raises the return on every channel pointed at it. For how much to invest across those channels, see{' '}
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
                headline="Turn Your Website Into a Lead Generation Asset"
                body="Get a specific, prioritized list of what is preventing your site from converting qualified homeowners into booked estimates."
                buttonLabel="Schedule a Free Website Review"
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
