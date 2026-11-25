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

const SLUG = 'contractor-google-ads-not-generating-leads'
const ARTICLE_ID = 'contractor-google-ads-not-generating-leads'

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
  { id: 'ad-status', label: 'Check Whether the Ad Is Actually Eligible to Show', level: 2 as const },
  { id: 'limited-by-budget', label: 'Limited by Budget Can Look Like No Demand', level: 2 as const },
  { id: 'quality-score', label: 'A Low Quality Score Is Quietly Raising What Each Click Costs', level: 2 as const },
  { id: 'keywords-negatives', label: 'Broad Keywords and Missing Negatives Are Buying the Wrong Clicks', level: 2 as const },
  { id: 'invalid-clicks', label: 'Invalid Clicks Are Already Filtered, Which Is Why They Are Rarely the Real Problem', level: 2 as const },
  { id: 'conversion-tracking', label: 'Broken Conversion Tracking Can Hide Leads That Are Actually Happening', level: 2 as const },
  { id: 'landing-page', label: 'The Landing Page Is Where Clicks Die Before Becoming a Lead', level: 2 as const },
  { id: 'lsa-overlap', label: 'Running Local Services Ads at the Same Time Can Mask the Real Cause', level: 2 as const },
  { id: 'untracked-calls', label: 'Phone Calls That Never Get Logged Look Like the Ads Are Not Working', level: 2 as const },
  { id: 'diagnostic-order', label: 'The Order to Check Things In', level: 2 as const },
  { id: 'mistakes', label: 'Common Mistakes That Make Diagnosis Harder', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Why Your Contractor Google Ads Are Not Generating Leads' },
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
                href="/br/blog/por-que-o-google-ads-nao-esta-gerando-leads-para-contractors"
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
                  A general contractor looking at a Google Ads account that spends money every day while the phone stays quiet is usually facing several different problems, not one. Clicks, impressions, and leads sit at different layers of the same campaign, and a failure at any one of them produces the exact same symptom from the outside: money going out, nothing coming in.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That is different from a campaign built on the wrong keyword strategy, covered in the{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads keywords guide</Link>, or a campaign that is simply underfunded for its market, covered in the{' '}
                  <Link href="/blog/google-ads-budget-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">budget guide</Link>. This article is the troubleshooting layer underneath both: a specific order to check an account in when leads have stopped, or never started, so the real cause gets fixed instead of the first thing that looks suspicious.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  For the complete strategy this fits into, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing guide</Link>.
                </p>
              </section>

              {/* Ad status */}
              <section id="ad-status" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Check Whether the Ad Is Actually Eligible to Show</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Before looking at budget, keywords, or the landing page, confirm the ad is actually running. Google Ads assigns every ad a status, and only one of them means the ad is fully in the auction for every search it was built to catch.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Google&apos;s Definition</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">What To Do</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Eligible', 'Complies with the Google Ads policies, so it can be shown to all audiences', 'Nothing to fix here'],
                        ['Eligible (limited)', 'Can run, but not in all situations because of policy restrictions, such as trademark use or gambling-related content', 'Check the policy details column for the specific restriction'],
                        ['Under review', 'Still being reviewed and will be eligible to serve if Google determines it complies with policy', 'Wait; new ads and edits can sit here briefly'],
                        ['Disapproved', 'Can’t run because its content or its destination violates Google Ads policy', 'Fix the specific violation and resubmit'],
                        ['Not eligible', 'Isn’t serving because the campaign is paused, removed, ended, or pending, or the ad group is paused, removed, or incomplete', 'Check campaign and ad group state directly'],
                      ].map(([status, def, fix]) => (
                        <tr key={status} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{status}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{def}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#9EA5B3] mt-2 mb-4">Ad status definitions, Google Ads Help.</p>
                <CalloutBox type="warning" label="The Easiest Layer to Skip">
                  An account can look fully active in the dashboard, budget spending normally, while the specific ad a contractor assumes is running sits in Eligible (limited) or Under review for a subset of the searches it was built for. The ad status column, not the campaign status, is the first thing to check.
                </CalloutBox>
              </section>

              {/* Limited by budget */}
              <section id="limited-by-budget" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Limited by Budget Can Look Like No Demand</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  If the ad status is a clean Eligible, the next layer is whether the campaign is actually competing for enough of the available searches. Google Ads Help describes the &quot;Limited by budget&quot; campaign status as a signal that the campaign &quot;is underperforming due to a limited budget,&quot; or, for Maximize Clicks bidding, that the contractor &quot;could increase traffic by adjusting your budget.&quot; Google Ads surfaces a recommended budget for the campaign whenever this status appears.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The sharper diagnostic, covered in more depth in the{' '}
                  <Link href="/blog/google-ads-budget-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">budget guide</Link>, is the Search Lost IS (budget) metric at the campaign level, which isolates the percentage of auctions lost specifically to spend. A high Search Lost IS (budget) alongside a healthy cost per lead elsewhere in the account means real demand is being left uncaptured, not that the keywords are wrong.
                </p>
                <CalloutBox type="info" label="The Opposite Signal">
                  Search Lost IS (rank) is the inverse. If that number is high instead, more budget will not fix anything, since the auction loss is coming from bid or relevance, not spend.
                </CalloutBox>
              </section>

              {/* Quality Score */}
              <section id="quality-score" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">A Low Quality Score Is Quietly Raising What Each Click Costs</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Quality Score does not directly decide whether a lead happens, but it decides how expensive and how frequent the auctions are that a contractor&apos;s ad can actually win. Google Ads Help breaks the score into three components: expected clickthrough rate, &quot;the likelihood that your ad will be clicked when shown&quot;; ad relevance, &quot;how closely your ad matches the intent behind a user&apos;s search&quot;; and landing page experience, &quot;how relevant and useful your landing page is to people who click your ad.&quot;
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A contractor running one broad ad group for every service, with one generic ad and one generic landing page, tends to score poorly on ad relevance and landing page experience at the same time, since neither the ad nor the page is actually written for most of the searches triggering it.{' '}
                  <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Separating campaigns by service</Link> is the structural fix; a tighter ad and a service-specific landing page are the content fix.
                </p>
                <CalloutBox type="tip" label="What This Actually Looks Like">
                  A Quality Score problem rarely shows up as zero leads. It shows up as a cost per click that keeps climbing while lead volume stays flat, because the account is paying more to win the same auctions a better-aligned ad and page would win more cheaply.
                </CalloutBox>
              </section>

              {/* Keywords and negatives */}
              <section id="keywords-negatives" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Broad Keywords and Missing Negatives Are Buying the Wrong Clicks</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  An ad that is eligible, reasonably funded, and scoring well on Quality Score can still fail to produce leads if the clicks it buys are simply the wrong searches. This is a volume problem disguised as a conversion problem: the campaign is getting real clicks from real people, just not people who are looking to hire a contractor.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  The search terms report shows the actual queries that triggered the ad, which is different from the keyword list that was entered. Reviewing it regularly and adding the irrelevant terms as negative keywords, covered in more detail in the{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads keywords guide</Link>, is the direct fix. Common categories worth checking first include job-seeker and career searches, DIY and tutorial searches, and searches for a service the business genuinely does not offer. A campaign that has never had a negative keyword added, or has not had its search terms reviewed in months, is one of the most common and most fixable reasons a contractor sees spend without leads.
                </p>
              </section>

              {/* Invalid clicks */}
              <section id="invalid-clicks" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Invalid Clicks Are Already Filtered, Which Is Why They Are Rarely the Real Problem</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  It is tempting to blame bot traffic or competitor clicks when an account spends without converting, but Google Ads Help&apos;s own definition of invalid traffic, &quot;traffic that doesn&apos;t represent genuine interest in your business,&quot; covering non-human clicks, accidental clicks from poor placement, and intentional clicks from competitors, comes with an important detail: invalid activity &quot;detected before the end of the month is automatically removed from your billing and campaign reports, so no refunds are necessary.&quot; Activity caught later still results in a credit on the next invoice.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That filtering already happening is exactly why invalid clicks are rarely the real explanation for a lead drought. The clicks still showing up in an account&apos;s reporting, by definition, already passed through Google&apos;s detection. The far more common issue is clicks that are completely valid, from real people, who simply are not in the market to hire a contractor, which is a negative keyword and targeting problem, not a fraud problem.
                </p>
                <CalloutBox type="warning" label="Where This Wastes the Most Time">
                  Chasing click fraud as the explanation for missing leads usually delays finding the actual cause, which is more often tracking, targeting, or the landing page.
                </CalloutBox>
              </section>

              {/* Conversion tracking */}
              <section id="conversion-tracking" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Broken Conversion Tracking Can Hide Leads That Are Actually Happening</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The single most common reason a Google Ads account shows zero leads while the business is actually getting calls is that the conversions are happening but not being recorded. Google Ads Help&apos;s sitewide tagging guidance lists specific requirements: the Google tag needs to sit &quot;in the &lt;head&gt; section of every page on your website,&quot; auto-tagging has to be enabled so Google can &quot;automatically add the GCLID and AUID parameters to your landing page after an ad click,&quot; and &quot;cookies need to be available in the browser when a customer converts.&quot; The same guidance warns against installing &quot;multiple Google tags or Google Tag Manager containers... on the same page,&quot; which creates conflicts rather than redundancy.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Tag Assistant, launched directly from the Goals menu in Google Ads, can confirm whether a specific conversion action is firing correctly and flag a status of Unverified or Tag inactive before a contractor spends more time guessing.
                </p>
                <CalloutBox type="info" label="The Symptom That Looks Identical">
                  A call answered on a tracked number that never gets logged as a conversion event, because the call tracking platform and the Google Ads conversion action were never actually connected, produces the exact same zero-leads symptom as a campaign with genuinely no demand. Checking the tag before touching the campaign saves the most time.
                </CalloutBox>

                <InlineCTA
                  headline="Not Sure If Your Leads Are Being Tracked At All?"
                  body="We check whether your conversion tag, call tracking, and CRM are actually capturing every lead your campaigns generate before recommending a single dollar of changes."
                  buttonLabel="Request a Free Marketing Assessment"
                />
              </section>

              {/* Landing page */}
              <section id="landing-page" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Landing Page Is Where Clicks Die Before Becoming a Lead</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  If the ad is eligible, the budget is sufficient, Quality Score is reasonable, and conversion tracking is confirmed working, the remaining layer is whether the page the click lands on actually convinces anyone to take action. Google Ads Help&apos;s guidance on optimizing ads and landing pages states that &quot;when someone clicks on your ad, they expect to land on a page that&apos;s relevant to what they saw in your ad,&quot; and recommends choosing a page that &quot;closely matches your ad and keywords.&quot; It also notes that &quot;ease of navigation is something users value even more on mobile websites.&quot;
                </p>
                <p className="text-[#667085] leading-relaxed">
                  A click for &quot;kitchen remodeling contractor near me&quot; that lands on a generic homepage, with no mention of kitchens and a contact form buried below several screens of content, is working against the ad rather than with it. For the full checklist of what a contractor landing page needs, see{' '}
                  <Link href="/blog/what-every-general-contractor-website-should-include" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what every general contractor website should include</Link>.
                </p>
              </section>

              {/* LSA overlap */}
              <section id="lsa-overlap" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Running Local Services Ads at the Same Time Can Mask the Real Cause</h2>
                <p className="text-[#667085] leading-relaxed">
                  A contractor running Search campaigns and Local Services Ads together, or in the middle of the migration Google has been rolling out, covered in the{' '}
                  <Link href="/blog/google-ads-vs-local-services-ads-for-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads vs Local Services Ads guide</Link>, can misread which product is actually responsible for a drop in leads. Local Services Ads bills per lead rather than per click, and a pause or eligibility issue on that side can look identical, from a dashboard glance, to a Search campaign problem. Checking each product separately, with its own call tracking number, is the only reliable way to tell whether leads stopped because of the Search campaign covered in this guide or because of the Local Services side of the account.
                </p>
              </section>

              {/* Untracked calls */}
              <section id="untracked-calls" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Phone Calls That Never Get Logged Look Like the Ads Are Not Working</h2>
                <p className="text-[#667085] leading-relaxed">
                  Even with a perfectly configured Google Ads account, a lead that calls the number on the website and never gets written down anywhere looks, from the advertising side, exactly like a lead that never happened. This is the same gap covered in{' '}
                  <Link href="/blog/why-contractor-leads-dont-turn-into-appointments" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">why contractor leads don&apos;t turn into appointments</Link>: an untracked call is invisible to the marketing report and the sales pipeline at the same time. Before concluding that a Google Ads campaign has stopped generating leads, it is worth confirming that every call to the tracked number is actually reaching a person, being logged somewhere, and not being lost to a missed call, a full voicemail, or a number that was never connected to call tracking in the first place.
                </p>
              </section>

              {/* Diagnostic order */}
              <section id="diagnostic-order" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Order to Check Things In</h2>
                <CalloutBox type="tip" label="Why Order Matters Here">
                  Each earlier layer can produce the exact same zero-leads symptom as a landing page problem. Fixing a landing page while the conversion tag is still broken will never show up as progress, even if it genuinely helped.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Confirm ad status is Eligible, not limited, under review, or disapproved.</li>
                  <li>Check Search Lost IS (budget) versus Search Lost IS (rank) to see whether spend or competitiveness is the constraint.</li>
                  <li>Review the search terms report and add negative keywords for anything clearly irrelevant.</li>
                  <li>Confirm the conversion tag is firing correctly with Tag Assistant, not just installed.</li>
                  <li>Check whether Local Services Ads, if running, is where the drop actually happened.</li>
                  <li>Confirm every call to the tracked number is actually being logged, not just answered.</li>
                  <li>Only then, review the landing page itself against what the ad promised.</li>
                </ol>
              </section>

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Mistakes That Make Diagnosis Harder</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Rewriting ad copy or raising bids before confirming the ad status is a clean Eligible</li>
                  <li>Raising budget to fix what is actually a Search Lost IS (rank) problem</li>
                  <li>Assuming low lead volume means invalid clicks, when Google has already filtered those</li>
                  <li>Never opening Tag Assistant, and assuming the conversion tag works because it was installed once</li>
                  <li>Comparing Search campaign results to Local Services Ads results without separate call tracking for each</li>
                  <li>Blaming the landing page before confirming conversions are even being recorded</li>
                  <li>Treating one slow week as a trend before checking whether the sales cycle for the service runs longer than a week</li>
                  <li>Changing budget, keywords, and the landing page in the same week, which makes it impossible to tell which change actually helped</li>
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Stop Guessing at Why Your Google Ads Stopped Converting"
                body="We audit your ad status, Search Lost IS, Quality Score, conversion tracking, and landing page in the order that actually finds the real cause, not just the obvious one."
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
