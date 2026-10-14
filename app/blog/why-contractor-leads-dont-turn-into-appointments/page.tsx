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

const SLUG = 'why-contractor-leads-dont-turn-into-appointments'
const ARTICLE_ID = 'contractor-leads-appointments'

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
  { id: 'the-stage', label: 'The Stage Nobody Measures', level: 2 as const },
  { id: 'two-numbers', label: 'Split It Into Two Numbers First', level: 2 as const },
  { id: 'seven-reasons', label: 'The Seven Reasons, in One Table', level: 2 as const },
  { id: 'not-a-person', label: 'Reason One: The Lead Was Never a Person', level: 2 as const },
  { id: 'never-reached', label: 'Reason Two: You Never Actually Reached Them', level: 2 as const },
  { id: 'answered-first', label: 'Reason Three: Someone Else Answered First', level: 2 as const },
  { id: 'ask-too-big', label: 'Reason Four: The Ask Was Too Big', level: 2 as const },
  { id: 'no-mechanism', label: 'Reason Five: There Was No Way to Book', level: 2 as const },
  { id: 'untracked-phone', label: 'Reason Six: The Call Came In Untracked', level: 2 as const },
  { id: 'nothing-written', label: 'Reason Seven: Nothing Was Written Down', level: 2 as const },
  { id: 'measure', label: 'How to Measure the Stage Properly', level: 2 as const },
  { id: 'feedback', label: 'Telling Google the Appointment Happened', level: 2 as const },
  { id: 'diagnose', label: 'Diagnosing Your Own Funnel in an Afternoon', level: 2 as const },
  { id: 'fix-order', label: 'The Fix, in Order', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Why Contractor Leads Do Not Turn Into Appointments' },
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
                href="/br/blog/por-que-leads-de-contractors-nao-viram-agendamentos"
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
                  A contractor looks at the month and sees forty leads and nine estimates booked. The ad platform reports forty conversions and looks healthy. The estimating calendar looks empty. Somewhere between those two reports, thirty one homeowners who raised their hand stopped existing, and nobody can say where they went.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  That gap is a stage, not an accident. It has its own conversion rate, its own failure modes, and its own fixes, and it is the single least instrumented part of most contractor marketing. Spend goes up, lead count goes up, booked estimates do not move, and the conclusion drawn is almost always the wrong one: that the leads were bad.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Sometimes they were. Often they were fine and the handoff was broken. This article separates the two, walks through the seven specific places a lead dies before it becomes an appointment, and ends with a diagnosis you can run on your own numbers this week. For where this sits in the wider picture, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">complete general contractor marketing guide</Link>.
                </p>
              </section>

              {/* The stage */}
              <section id="the-stage" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Stage Nobody Measures</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Most contractors can tell you two numbers without looking: how much they spent and how many leads came in. Many can tell you how many projects they signed. Very few can tell you how many of those leads ever became a booked appointment, which is strange, because that stage sits between the two numbers everyone does track and it explains most of the variance between them.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The reason it goes unmeasured is that it does not live in one system. The lead arrives in the ad platform. The conversation happens on a phone. The appointment lands on a calendar. The outcome, if anyone records it, goes in a CRM. No single tool owns the stage, so no single report shows it, so it is never anybody&apos;s number to defend.
                </p>
                <CalloutBox type="info" label="The symptom">
                  If lead volume and signed revenue have ever moved in opposite directions in your business, the cause is almost always inside this stage. Leads going up while estimates stay flat is not a mystery. It is an unmeasured conversion rate falling.
                </CalloutBox>
              </section>

              {/* Two numbers */}
              <section id="two-numbers" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Split It Into Two Numbers First</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Before diagnosing anything, break the stage in half. Lead to appointment as a single rate tells you that something is wrong and nothing about what. Two numbers tell you which half of the business to look at:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Contact rate:</strong> of the leads that arrived, what share did you ever actually speak with, by voice or by text</li>
                  <li><strong className="text-[#0A0A0A]">Booking rate:</strong> of the leads you spoke with, what share agreed to a date for an estimate</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The combination points at the problem directly:
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">What you see</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Where the problem actually is</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Low contact rate, healthy booking rate', 'Operations: speed, channels, number of attempts, or leads that were never real'],
                        ['Healthy contact rate, low booking rate', 'Qualification upstream, or the conversation itself'],
                        ['Both low', 'Start with contact rate, because booking rate measured on a tiny sample is noise'],
                        ['Both healthy, still no revenue', 'The problem is later, at estimate to signed contract, not here'],
                      ].map(([seen, cause]) => (
                        <tr key={seen} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{seen}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{cause}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Reporting the two as one number is how a company spends six months fixing lead quality when the real problem was that nobody called back on Saturdays.
                </p>
              </section>

              {/* Seven reasons */}
              <section id="seven-reasons" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Seven Reasons, in One Table</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Nearly every lead that fails to become an appointment fails for one of seven reasons. Each has a different tell, and each has a different fix.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F4F6F8]">
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">Reason</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0A0A0A] border border-[#D0D5DD]">How you can tell</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['It was never a person', 'Numbers that do not connect, emails that bounce, names that match nothing'],
                        ['You never reached them', 'One outbound attempt logged, no reply, lead closed in your head'],
                        ['Someone else answered first', 'Homeowner says they already hired someone, hours or a day after inquiring'],
                        ['The ask was too big', 'Pleasant conversation, no date, a promise to think about it'],
                        ['There was no way to book', 'Leads arrive outside hours and the only option offered is a callback'],
                        ['The call came in untracked', 'Appointments exist that no source can be assigned to'],
                        ['Nothing was written down', 'Leads with no logged activity for weeks, nobody sure whose they are'],
                      ].map(([reason, tell]) => (
                        <tr key={reason} className="even:bg-[#F9FAFB]">
                          <td className="px-4 py-3 font-medium text-[#0A0A0A] border border-[#D0D5DD]">{reason}</td>
                          <td className="px-4 py-3 text-[#667085] border border-[#D0D5DD]">{tell}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Reason one */}
              <section id="not-a-person" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason One: The Lead Was Never a Person</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Some share of what arrives as a lead cannot become an appointment because there is nobody on the other end. Google describes invalid leads as fake or low quality submissions from users or bots, including people who enter incorrect details such as fake email addresses or phone numbers.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The important part of Google&apos;s own guidance is the limit it admits to. Google states that its filters do not prevent invalid leads on their own, because most traffic checks happen after the ad serves. Protection from being charged for invalid traffic is not the same thing as never receiving a junk lead, and Google calls lead quality a shared responsibility for exactly that reason.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google&apos;s published recommendations for the advertiser side of that responsibility are concrete:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Add reCAPTCHA to web forms</li>
                  <li>Use double opt-in, confirming through a link in an email before treating the lead as valid</li>
                  <li>Validate server side, checking that email domains and phone number formats are real</li>
                  <li>Use lead-specific conversion goals rather than generic ones</li>
                  <li>Implement the Google tag and enhanced conversions so the data going back is first party</li>
                </ul>
                <CalloutBox type="warning" label="Watch out">
                  Invalid leads do not just waste time. Reported back to the ad platform as conversions, they teach automated bidding to find more of the same. A junk lead counted as a win is worse than a junk lead counted correctly.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Qualification as a whole is a larger subject, covered in{' '}
                  <Link href="/blog/how-to-generate-qualified-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to generate qualified contractor leads</Link>. For this stage, the only question is narrower: what share of your unbooked leads were never contactable at all? Until you know that, every other rate is calculated on a denominator you do not trust.
                </p>
              </section>

              {/* Reason two */}
              <section id="never-reached" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason Two: You Never Actually Reached Them</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This is the biggest single leak in most contractor funnels, and it is almost never recorded as what it is. A lead comes in, someone calls once, it rings out, no voicemail is left, and the lead quietly becomes a bad lead in everyone&apos;s memory. Nothing about that homeowner changed. The company just never spoke to them.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Three mechanics decide how often this happens:
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Attempts, not an attempt</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  One call is not an attempt to reach someone, it is a coin flip. A homeowner who filled out a form at nine in the evening is not avoiding you at ten the next morning, they are at work. How many attempts, spaced how far apart, and across which channels is the follow-up discipline covered in{' '}
                  <Link href="/blog/how-to-follow-up-with-contractor-leads" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how to follow up with contractor leads</Link>.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">An unknown number is easy to ignore</h3>
                <p className="text-[#667085] leading-relaxed mb-5">
                  A cold call from a number nobody recognizes competes with every other unknown call a person gets in a week, and most of those are not worth answering. A text message sent within a minute of the form submission, naming the company and the project the homeowner asked about, converts an unknown number into an expected one. The call that follows is a different call.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Leads do not arrive during business hours</h3>
                <p className="text-[#667085] leading-relaxed">
                  Homeowners research renovations in the evening and at weekends, which is precisely when nobody is in the office. A lead that waits until Monday morning has spent two days being contacted by whoever did answer. Either coverage extends to when the leads actually arrive, or the first response has to be automatic and the human one follows.
                </p>
              </section>

              {/* Reason three */}
              <section id="answered-first" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason Three: Someone Else Answered First</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A homeowner planning a kitchen remodel rarely contacts one contractor. They contact three or four in the same sitting, which means your competition for that appointment is not a better pitch, it is a faster phone.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This changes how speed should be understood. Responding quickly does not just move the conversation earlier, it decides whether the conversation happens at all. By the time a contractor returns a call the next afternoon, the homeowner has often already booked two estimates and has no reason to arrange a third.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  There is also a measurement argument for speed that has nothing to do with the homeowner. Google&apos;s guidance for lead generation advises choosing a conversion action that happens within 7 days of the ad interaction for timely optimization. If the appointment is what you report as the conversion, then an appointment arranged three weeks after the click is a weaker signal for the bidding system than the same appointment arranged in two days. Slow follow-up degrades the data as well as the deal.
                </p>
                <CalloutBox type="tip" label="The cheapest fix in this article">
                  An automatic text or email confirming the inquiry, sent in under a minute, costs almost nothing and does two jobs at once. It tells the homeowner they are in a queue rather than ignored, and it makes your follow-up call expected instead of unknown.
                </CalloutBox>

                <InlineCTA
                  headline="Do You Know Your Lead to Appointment Rate?"
                  body="We map where your leads stop between the form and the calendar, then show you which of the seven leaks is actually costing you estimates."
                  buttonLabel="Request a Free Funnel Review"
                />
              </section>

              {/* Reason four */}
              <section id="ask-too-big" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason Four: The Ask Was Too Big</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Some leads are reached, qualify, have a pleasant conversation, and still do not book. The usual cause is that the only next step offered was larger than the homeowner was ready to agree to.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A site visit is a real commitment. It means a stranger in the house, a block of time, and in the homeowner&apos;s mind the beginning of being sold to. Asking for that at the end of a first conversation works when the person is ready and fails silently when they are not, because the polite answer is never no, it is that they will think about it.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Offering a smaller intermediate step converts a meaningful share of those conversations:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>A short video or phone walkthrough of the project before any visit is scheduled</li>
                  <li>A ballpark range for similar work, sent in writing, with the visit as the step that makes it exact</li>
                  <li>A specific named slot rather than an open question, since choosing between Tuesday morning and Thursday afternoon is easier than choosing from nothing</li>
                  <li>A clear description of what the visit involves and how long it takes, which removes most of the reason to hesitate</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  The last point is the one most often skipped. A homeowner declining an appointment is frequently declining an unknown, not declining your company.
                </p>
              </section>

              {/* Reason five */}
              <section id="no-mechanism" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason Five: There Was No Way to Book</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A homeowner ready to schedule at ten at night, who finds a phone number as the only option, is a lost appointment waiting to happen. The intent was there and the mechanism was not.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Two channels matter here beyond the website. Google Business Profile now supports adding a WhatsApp or text messaging option to a business&apos;s contact information, so customers can reach the company by message directly from the profile. Google notes that this requires a claimed and verified Business Profile and that chat options are currently available for select regions, so it is worth checking rather than assuming.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  It is also worth knowing what no longer exists, because stale advice about this is everywhere. Google discontinued the older Business Profile chat and call history features as of July 31, 2024, and states that those features are no longer available in the profile. Any playbook still telling contractors to manage leads through Business Profile chat history is describing a tool that was switched off.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  On the site itself, the booking path belongs above the fold on every service page, not only on a contact page. What a contractor website needs to carry is covered in{' '}
                  <Link href="/blog/what-every-general-contractor-website-should-include" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">what every general contractor website should include</Link>.
                </p>
              </section>

              {/* Reason six */}
              <section id="untracked-phone" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason Six: The Call Came In Untracked</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  For most contractors the phone is the funnel, and it is frequently the least instrumented part of the business. When calls are not tracked, two things break at once: you cannot tell which channels produce the conversations that book, and you cannot tell the ad platform which calls were worth having.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google Ads offers two ways to count a call as a conversion. The familiar one is duration: you set a minimum call length in seconds, and every call that lasts at least that long counts, which filters out the short calls that were never going to contain a booking. That requires call reporting to be enabled so that Google forwarding numbers are used.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The newer one is AI-qualified call conversions, which reads the content of the call rather than its length. Google states that if call recording is on, all calls will be recorded and evaluated by AI, and only qualified calls will count as conversions, with duration used as a fallback signal when recording is unavailable. According to Google, the AI looks for signals of intent such as a customer inquiring about specific services, scheduling a consultation, or showing readiness to purchase.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Two constraints are worth noting before planning around it. Google states that call recording is currently only available when both the dialing and receiving phone numbers are located in the United States or Canada, and that recording stays off by default for health care and financial services businesses, which can enable it manually.
                </p>
                <CalloutBox type="info" label="Why this matters more than it used to">
                  Google lists scheduling a consultation as one of the intent signals the AI is looking for. The platform is converging on booked appointments as the thing worth optimizing toward. A contractor who still reports every form fill as an equal conversion is feeding that system the wrong target.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed">
                  Duration and AI scoring are both proxies. The strongest version is still to record the real outcome of each call in the CRM and report booked appointments from there, which is what the next section is about.
                </p>
              </section>

              {/* Reason seven */}
              <section id="nothing-written" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Reason Seven: Nothing Was Written Down</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The last reason is the most ordinary and the most expensive. A lead is reached, the conversation goes fine, the homeowner says to call back after a holiday, and nobody writes it down. Three weeks later nobody remembers, nobody owns it, and the lead was never marked lost because it was never marked anything.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This failure has a distinctive signature, and it is easy to look for. Sort your pipeline by the date each record last changed stage, not by the date it was created. A cluster of open leads with no activity logged for weeks is not a lead quality problem and not a marketing problem. It is work that was paid for and then left on a shelf.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The minimum structure that prevents it is small:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>Every lead has an owner by name, not a shared inbox</li>
                  <li>Every lead has a stage, including an explicit one for contact attempted but not reached</li>
                  <li>Every contact attempt is logged with its date and channel, including the ones that failed</li>
                  <li>Every closed lead has a reason, chosen from a short fixed list rather than typed freely</li>
                  <li>Every lead carries its source, so the stage can be measured per channel</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  The loss reason list is the piece contractors skip and the piece that pays. Without it, every unbooked lead gets filed in memory as a bad lead, which is the single most expensive assumption in this article. With it, the pattern becomes visible: out of area, out of budget, never answered, went with someone else, not ready yet. Those five categories lead to five completely different decisions.
                </p>
              </section>

              {/* Measure */}
              <section id="measure" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Measure the Stage Properly</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Four numbers, tracked by source, are enough to run this stage well:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Contact rate:</strong> leads you spoke with, divided by leads received</li>
                  <li><strong className="text-[#0A0A0A]">Booking rate:</strong> appointments booked, divided by leads you spoke with</li>
                  <li><strong className="text-[#0A0A0A]">Time to first contact:</strong> median, measured in minutes, inside working hours</li>
                  <li><strong className="text-[#0A0A0A]">Cost per booked appointment:</strong> spend divided by appointments, which is the number that connects this stage to the budget</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Cost per booked appointment is where the argument against judging channels on cost per lead becomes visible. Take two channels at the same spend:
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
                        ['Spend', '$3,000', '$3,000'],
                        ['Leads', '60', '30'],
                        ['Cost per lead', '$50', '$100'],
                        ['Contact rate', '40%', '80%'],
                        ['Leads spoken with', '24', '24'],
                        ['Booking rate', '25%', '50%'],
                        ['Appointments booked', '6', '12'],
                        ['Cost per booked appointment', '$500', '$250'],
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
                  Channel B costs twice as much per lead, produces half as many leads, and books twice as many estimates for the same money. This is a hypothetical illustration chosen to make the arithmetic visible, not an industry benchmark. On a cost per lead report, Channel B is the line item that gets cut.
                </p>
                <p className="text-[#667085] leading-relaxed mt-4">
                  The same logic applied one stage earlier is the argument for{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">judging cost per lead against what a lead is actually worth</Link>, and applied one stage later it becomes{' '}
                  <Link href="/blog/contractor-marketing-roi" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">real marketing ROI</Link>.
                </p>
              </section>

              {/* Feedback */}
              <section id="feedback" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Telling Google the Appointment Happened</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Measuring the stage for your own reports is half the value. The other half is sending the result back, because automated bidding optimizes toward whatever you report as a conversion. Report form fills and you get form fills. Report booked appointments and the system starts hunting for people who book.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Google recommends using conversion goals specific to lead generation, such as qualified lead, converted lead, book appointment, or request quote, and notes that these automatically trigger invalid traffic protections built specifically for lead generation campaigns. Choosing the goal is therefore not just a labelling exercise.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Two of those goals carry a specific meaning worth getting right. Google replaced the older imported leads goal with qualified leads and converted leads, and defines them this way:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li><strong className="text-[#0A0A0A]">Qualified lead:</strong> a Google generated lead that was further qualified offline, outside Google Ads, in your CRM or internal lead generation system</li>
                  <li><strong className="text-[#0A0A0A]">Converted lead:</strong> a Google generated lead that completed a chosen step in your lead conversion process, typically offline</li>
                </ul>
                <p className="text-[#667085] leading-relaxed mb-4">
                  For a contractor, the booked appointment is usually the right step to define as the reported outcome. It happens soon enough after the click to be a useful optimization signal, it is unambiguous, and unlike a signed contract it does not wait on a sales cycle measured in weeks. Enhanced conversions for leads is the mechanism that sends it back, using hashed first-party data from the CRM.
                </p>
                <CalloutBox type="tip" label="The prerequisite nobody mentions">
                  None of this works unless the lead source reaches the CRM and the CRM records what the lead became. That chain is unglamorous plumbing, and it is the difference between a bidding system that learns from your sales results and one that guesses.
                </CalloutBox>
              </section>

              {/* Diagnose */}
              <section id="diagnose" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Diagnosing Your Own Funnel in an Afternoon</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This does not need new software. Take the last 60 leads, put them in a spreadsheet, and fill in five columns: source, date and time it arrived, date and time of first contact attempt, whether you ever spoke with the person, and whether an appointment was booked.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  The answers fall out immediately:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li>Count the leads with no contact attempt logged at all. That number is usually the first shock.</li>
                  <li>Calculate the median gap between arrival and first attempt, and look at it separately for evenings and weekends.</li>
                  <li>Split contact rate and booking rate, then read them against the table earlier in this article.</li>
                  <li>Count how many never connected at all, which approximates your invalid and unreachable share.</li>
                  <li>Break all of it down by source, because one channel is almost always dragging the average.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  Sixty leads is not a statistically robust sample and it does not need to be. If twenty of them have no contact attempt recorded, you do not need a confidence interval to know what to fix on Monday.
                </p>
              </section>

              {/* Fix order */}
              <section id="fix-order" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Fix, in Order</h2>
                <CalloutBox type="tip" label="Summary">
                  Measure contact rate and booking rate separately, answer faster than the competition, make the next step small enough to say yes to, log every attempt and every loss reason, then report the booked appointment back to the ad platform so it optimizes for calendars instead of forms.
                </CalloutBox>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mt-5">
                  <li>Instrument the stage: contact rate, booking rate, time to first contact, cost per booked appointment, all by source.</li>
                  <li>Send an automatic acknowledgement within a minute of every inquiry, by text where you have consent.</li>
                  <li>Set a target for first human contact in minutes, and cover the evenings and weekends when leads actually arrive.</li>
                  <li>Define a minimum number of contact attempts across at least two channels before a lead can be closed.</li>
                  <li>Give the person answering the phone access to the estimating calendar and authority to commit a slot.</li>
                  <li>Offer a smaller intermediate step for homeowners not ready to agree to a site visit.</li>
                  <li>Publish a booking path on every service page, and add a message option to the Google Business Profile where available.</li>
                  <li>Turn on call reporting, and decide deliberately between a minimum call length and AI-qualified call conversions.</li>
                  <li>Add reCAPTCHA, double opt-in, and server-side validation so fewer invalid leads enter the count at all.</li>
                  <li>Require an owner, a stage, and a loss reason on every lead record, from a short fixed list.</li>
                  <li>Report the booked appointment back as the conversion, using a lead-specific goal and enhanced conversions for leads.</li>
                  <li>Re-run the 60 lead audit a month later and compare, because this stage drifts back without attention.</li>
                </ol>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Done in that order, the usual result is that lead volume stays exactly where it was and booked estimates rise. That is the whole point: this stage is almost never fixed by buying more leads, and it is frequently made worse by it. For how much to put behind the system once the stage holds, see{' '}
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
                headline="Stop Losing Leads Between the Form and the Calendar"
                body="We will audit your lead to appointment stage, show you which of the seven leaks is costing you the most estimates, and tell you what to change first."
                buttonLabel="Schedule a Free Funnel Review"
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
