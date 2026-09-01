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
import ContractorFollowUpTimeline from '@/components/blog/contractor-follow-up-timeline'

const SLUG = 'how-to-follow-up-with-contractor-leads'
const ARTICLE_ID = 'follow-up-contractor-leads'

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
  { id: 'what-is-follow-up', label: 'What Is Contractor Lead Follow-Up?', level: 2 as const },
  { id: 'why-stop-responding', label: 'Why Contractor Leads Stop Responding', level: 2 as const },
  { id: 'funnel', label: 'The Contractor Lead Follow-Up Funnel', level: 2 as const },
  { id: 'response-time', label: 'How Fast Should Contractors Respond?', level: 2 as const },
  { id: 'channels', label: 'Which Channel Should Contractors Use?', level: 2 as const },
  { id: 'sequence', label: 'Contractor Lead Follow-Up Sequence', level: 2 as const },
  { id: 'first-call', label: 'First Call Script for Contractor Leads', level: 2 as const },
  { id: 'qualification', label: 'Lead Qualification Questions', level: 2 as const },
  { id: 'appointment-follow-up', label: 'Follow-Up After Scheduling an Estimate', level: 2 as const },
  { id: 'estimate-follow-up', label: 'Follow-Up After Sending an Estimate', level: 2 as const },
  { id: 'estimate-sequence', label: 'Estimate Follow-Up Sequence', level: 2 as const },
  { id: 'why-crm', label: 'Why Contractors Need a CRM', level: 2 as const },
  { id: 'crm-pipeline', label: 'Recommended CRM Pipeline', level: 2 as const },
  { id: 'automation', label: 'Lead Follow-Up Automation', level: 2 as const },
  { id: 'automation-example', label: 'Example CRM Automation', level: 2 as const },
  { id: 'missed-calls', label: 'Following Up on Missed Calls', level: 2 as const },
  { id: 're-engage', label: 'Re-Engaging Old Leads', level: 2 as const },
  { id: 'not-annoying', label: 'Following Up Without Being Annoying', level: 2 as const },
  { id: 'metrics', label: 'Follow-Up Metrics to Track', level: 2 as const },
  { id: 'cpl-economics', label: 'How Follow-Up Changes CPL Economics', level: 2 as const },
  { id: 'mistakes', label: 'Common Follow-Up Mistakes', level: 2 as const },
  { id: 'checklist', label: 'Lead Follow-Up Checklist', level: 2 as const },
  { id: 'final-system', label: 'Final Follow-Up System', level: 2 as const },
  { id: 'faq', label: 'Frequently Asked Questions', level: 2 as const },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'How to Follow Up With Contractor Leads' },
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
                href="/br/blog/como-fazer-follow-up-com-leads-de-contractors"
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
                  Most contractors spend real money generating leads from Google Ads, Local Services Ads, SEO, Google Business Profile, referrals, and Meta Ads. Then performance quietly breaks after the lead arrives: calls go unanswered, form leads receive no immediate confirmation, salespeople call once and give up, estimates go out with no follow-up plan, and leads pile up in spreadsheets or personal phones with nobody sure why opportunities were lost.
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Generating a lead is only the beginning of the sales process. A contractor needs a measurable funnel — lead, contacted, qualified, appointment, estimate, proposal, follow-up, signed project — with a clear owner, stage, and next action for every open opportunity.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  This guide is a practical system for contractor lead follow-up: response timing, channels, scripts, CRM workflows, and qualification steps designed to convert more inquiries into signed projects. It builds on the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>, which covers the full contractor marketing system this follow-up process sits inside of.
                </p>
              </section>

              {/* What is follow-up */}
              <section id="what-is-follow-up" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">What Is Contractor Lead Follow-Up?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Contractor lead follow-up is the structured process a business runs after an inquiry enters the pipeline — every call, text, email, and CRM update between &quot;a stranger filled out a form&quot; and &quot;a signed project.&quot;
                </p>
                <p className="text-[#667085] leading-relaxed mb-4">
                  It is useful to separate four related but distinct activities: lead generation (getting the inquiry in the door), lead management (organizing and tracking it), lead qualification (confirming it is a real fit), and sales follow-up (moving it toward a decision).
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  Marketing generates the opportunity → Sales process converts the opportunity
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Both halves of that sentence should be measured separately. A marketing campaign can perform well while the sales follow-up process fails, and the reverse is just as common.
                </p>
              </section>

              {/* Why leads stop responding */}
              <section id="why-stop-responding" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Why Contractor Leads Stop Responding</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A lead going quiet rarely means the same thing twice. Common reasons include:
                </p>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>They contacted multiple contractors and are comparing options</li>
                  <li>They are still researching and not ready to commit</li>
                  <li>Their project timeline changed</li>
                  <li>They were not contacted quickly enough</li>
                  <li>The contractor provided no clear next step</li>
                  <li>The lead does not recognize the number calling</li>
                  <li>The project is not urgent</li>
                  <li>A spouse or co-decision-maker has not weighed in yet</li>
                  <li>Budget expectations changed, or financing is unresolved</li>
                  <li>They received other estimates</li>
                  <li>The first interaction created little trust</li>
                  <li>The lead was never properly qualified in the first place</li>
                </ul>
                <CalloutBox type="info" label="Key Insight">
                  Not every non-responsive lead is a bad lead. Some are low intent, a poor fit, not ready yet, or simply difficult to reach — treating all of them as failures leads to the wrong fixes.
                </CalloutBox>
              </section>

              {/* Funnel */}
              <section id="funnel" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">The Contractor Lead Follow-Up Funnel</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A practical follow-up system moves every lead through a visible sequence of stages: new lead, first response, contacted, qualified, appointment scheduled, estimate or consultation, proposal sent, proposal follow-up, and finally won, lost, or nurture.
                </p>
                <p className="text-[#667085] leading-relaxed mb-6">
                  Each stage needs a purpose, a responsible person, a required action, a CRM status, and a next follow-up date. Explore the funnel below.
                </p>
                <ContractorFollowUpTimeline locale="en-US" />
                <CalloutBox type="warning" label="Watch Out">
                  No active opportunity should exist without an owner, a stage, a next action, and a next-action date. Opportunities without these four things are the ones that quietly go cold.
                </CalloutBox>
              </section>

              {/* Response time */}
              <section id="response-time" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Fast Should Contractors Respond to New Leads?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  High-intent inquiries generally benefit from prompt acknowledgment. There is no single universal number of minutes that applies to every contractor and lead source — the right pace depends on lead source, project type, and real sales capacity.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Immediate automated acknowledgment</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  An SMS confirmation, email confirmation, or booking confirmation can set expectations right away — for example: &quot;Hi John, this is Mike from ABC Remodeling. I just received your request about your kitchen remodel in Boston. I&apos;ll give you a quick call shortly to learn more about the project.&quot; This is one example, not the only acceptable script.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Human contact as soon as practical</h3>
                <p className="text-[#667085] leading-relaxed">
                  An automated message is not a replacement for a human call, text, or email. It buys time and sets a tone — the actual sales conversation still needs a person on the line.
                </p>
              </section>

              {/* Channels */}
              <section id="channels" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Which Channel Should Contractors Use for Follow-Up?</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  An effective system generally uses more than one channel rather than relying on a single one.
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm border border-[#D0D5DD]">
                    <thead>
                      <tr className="bg-[#F4F6F8] text-left">
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Channel</th>
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Best Use</th>
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Strength</th>
                        <th className="px-4 py-3 font-bold text-[#0A0A0A] border-b border-[#D0D5DD]">Limitation</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#667085]">
                      <tr className="border-b border-[#F4F6F8]">
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">Phone</td>
                        <td className="px-4 py-3">Qualification and sales conversation</td>
                        <td className="px-4 py-3">High context</td>
                        <td className="px-4 py-3">Lead may not answer</td>
                      </tr>
                      <tr className="border-b border-[#F4F6F8]">
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">SMS</td>
                        <td className="px-4 py-3">Quick communication and reminders</td>
                        <td className="px-4 py-3">Convenient</td>
                        <td className="px-4 py-3">Requires concise messaging and appropriate consent</td>
                      </tr>
                      <tr className="border-b border-[#F4F6F8]">
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">Email</td>
                        <td className="px-4 py-3">Details, estimates, documentation</td>
                        <td className="px-4 py-3">Good for longer communication</td>
                        <td className="px-4 py-3">Lower urgency</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-[#0A0A0A]">Voicemail</td>
                        <td className="px-4 py-3">Supporting missed-call follow-up</td>
                        <td className="px-4 py-3">Adds context</td>
                        <td className="px-4 py-3">Should not be the only channel</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Sequence */}
              <section id="sequence" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor Lead Follow-Up Sequence</h2>
                <CalloutBox type="info" label="Example Workflow">
                  Adapt this to your sales cycle and communication requirements — it is not a universal rule.
                </CalloutBox>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 mt-5">New inquiry</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Send an immediate confirmation, place a human call when practical, follow with SMS if appropriate, and send an email confirmation.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">If there is no response</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Make additional contact attempts over the following days, varying phone, SMS, and email rather than sending the same message repeatedly.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">After multiple unsuccessful attempts</h3>
                <p className="text-[#667085] leading-relaxed">
                  Move the lead to Nurture / Unable to Contact instead of deleting it — future reactivation may still be valuable. Avoid excessive or intrusive messaging.
                </p>
              </section>

              {/* First call script */}
              <section id="first-call" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">First Call Script for Contractor Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  This is a conversational framework, not a rigid sales script:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-5">
                  <li>Introduce yourself and your company</li>
                  <li>Mention the request</li>
                  <li>Confirm the type of project</li>
                  <li>Confirm the location</li>
                  <li>Understand the desired outcome</li>
                  <li>Ask about timeline</li>
                  <li>Clarify project scope</li>
                  <li>Determine whether the project fits the company</li>
                  <li>Explain the next step</li>
                  <li>Schedule the appointment when qualified</li>
                </ol>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 text-sm text-[#0A0A0A] italic">
                  &quot;Hi Sarah, this is Mike from ABC Remodeling. You reached out about a kitchen renovation in Newton. I wanted to learn a little more about the project and see if we&apos;re a good fit.&quot;
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Avoid aggressive sales language — the goal of the first call is understanding the project, not closing on the spot.
                </p>
              </section>

              {/* Qualification questions */}
              <section id="qualification" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Lead Qualification Questions Contractors Should Ask</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-4">
                  <li>What type of project are you planning?</li>
                  <li>Where is the property located?</li>
                  <li>What areas of the property will be renovated?</li>
                  <li>What result are you trying to achieve?</li>
                  <li>When would you ideally like the project to begin?</li>
                  <li>Have you already spoken with other contractors?</li>
                  <li>Do you have plans or drawings?</li>
                  <li>Do you already have a budget range in mind?</li>
                  <li>Who will be involved in the decision?</li>
                  <li>Is the property owner involved?</li>
                  <li>Have you considered financing if needed?</li>
                </ul>
                <p className="text-[#667085] leading-relaxed">
                  Qualification requirements vary by service — do not force every question into an intake form. Some questions are better handled naturally during the call.
                </p>
              </section>

              {/* Appointment follow-up */}
              <section id="appointment-follow-up" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Follow Up After Scheduling an Estimate</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Appointment no-shows are a common source of wasted sales time. A simple reminder system helps:
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">When the appointment is booked</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Send a confirmation with the date, time, address, contact person, what to prepare, and how to reschedule.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Before the appointment</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Send a reminder through the communication channel the lead has agreed to use.
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Day of appointment</h3>
                <p className="text-[#667085] leading-relaxed">
                  An optional short confirmation can help, but keep the sequence from becoming excessive — reminders should reduce uncertainty and make the process feel professional, not overwhelming.
                </p>
              </section>

              {/* Estimate follow-up */}
              <section id="estimate-follow-up" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Follow Up After Sending an Estimate</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Contractors often send an estimate and then wait indefinitely. Replace that with a defined pipeline: estimate prepared, estimate sent, follow-up scheduled, client reviewing, revision requested, decision pending, won, lost, or long-term nurture.
                </p>
                <CalloutBox type="tip" label="Pro Tip">
                  Every estimate should have a next follow-up date attached before it is sent — not added later if the client goes quiet.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-5">
                  Focus the conversation on helping the prospect make a decision rather than asking &quot;did you decide yet?&quot; — for example: &quot;Hi Sarah, I wanted to make sure you received the proposal and see whether you had any questions about the scope, timeline, or next steps.&quot;
                </p>
              </section>

              {/* Estimate follow-up sequence */}
              <section id="estimate-sequence" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Estimate Follow-Up Sequence</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Shortly after sending</h3>
                <p className="text-[#667085] leading-relaxed mb-4">Confirm receipt.</p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Follow-up</h3>
                <p className="text-[#667085] leading-relaxed mb-4">Discuss questions, scope, materials, timeline, budget concerns, and the decision process.</p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Additional follow-up</h3>
                <p className="text-[#667085] leading-relaxed mb-4">Try to understand whether the project is delayed, a competitor was selected, price is an issue, scope changed, they are waiting on financing, or they need another decision-maker.</p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Final active follow-up</h3>
                <p className="text-[#667085] leading-relaxed">
                  Ask whether the opportunity should stay active, move to a later date, or be closed. Exact days should not be treated as universal requirements — they depend on the sales cycle and project type.
                </p>
              </section>

              {/* Why CRM */}
              <section id="why-crm" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Why Contractors Need a CRM for Lead Follow-Up</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A CRM creates one source of truth for contact information, lead source, project type, location, notes, calls, SMS, emails, appointments, estimate status, proposal value, follow-up tasks, lost reasons, and revenue.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Managing leads only through personal phones, an email inbox, WhatsApp, spreadsheets, memory, or paper notes is not automatically wrong — spreadsheets can work fine at low volume. They simply become harder to manage consistently as lead volume and sales complexity increase.
                </p>
              </section>

              {/* CRM pipeline */}
              <section id="crm-pipeline" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Recommended CRM Pipeline for General Contractors</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A starting-point pipeline, adaptable to your real sales process:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#667085] leading-relaxed pl-1 mb-4">
                  <li>New Lead</li>
                  <li>Attempting Contact</li>
                  <li>Contacted</li>
                  <li>Qualified</li>
                  <li>Appointment Scheduled</li>
                  <li>Estimate Scheduled</li>
                  <li>Proposal Sent</li>
                  <li>Negotiation / Decision</li>
                  <li>Won</li>
                  <li>Lost</li>
                  <li>Long-Term Nurture</li>
                </ol>
                <p className="text-[#667085] leading-relaxed">
                  For each stage, define an entry condition, the required next action, and the exit condition — that structure is what makes the pipeline actionable instead of decorative.
                </p>
              </section>

              {/* Automation */}
              <section id="automation" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Lead Follow-Up Automation for Contractors</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Good automation opportunities</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>New lead acknowledgment</li>
                  <li>Lead assignment</li>
                  <li>Sales task creation</li>
                  <li>Appointment reminders</li>
                  <li>Missed-call alerts</li>
                  <li>Follow-up reminders</li>
                  <li>Email confirmations</li>
                  <li>Pipeline alerts</li>
                  <li>Lead aging alerts</li>
                  <li>Re-engagement reminders</li>
                </ul>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Human-led activities</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Qualification</li>
                  <li>Complex questions</li>
                  <li>Scope discussions</li>
                  <li>Sales conversations</li>
                  <li>Estimate presentation</li>
                  <li>Negotiation</li>
                  <li>Objection handling</li>
                  <li>Relationship building</li>
                </ul>
                <CalloutBox type="info" label="Core Principle">
                  Automate the process, not the relationship.
                </CalloutBox>
              </section>

              {/* Automation example */}
              <section id="automation-example" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Example Contractor CRM Automation</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-xs sm:text-sm text-[#0A0A0A] leading-relaxed">
                  Website Form / Google Ads / LSA / Phone Call<br />↓<br />CRM Lead Created<br />↓<br />Source + UTM + GCLID Captured<br />↓<br />Assigned to Salesperson<br />↓<br />SMS / Email Confirmation<br />↓<br />Call Task Created<br />↓<br />Qualified<br />↓<br />Appointment<br />↓<br />Estimate<br />↓<br />Proposal<br />↓<br />Won / Lost<br />↓<br />Revenue + Lost Reason
                </div>
                <p className="text-[#667085] leading-relaxed">
                  This structure is what enables real marketing attribution — connecting the ad click all the way to signed revenue.
                </p>
              </section>

              {/* Missed calls */}
              <section id="missed-calls" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Follow Up With Missed Calls</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  A missed-call workflow typically includes a call-back process, a missed-call notification, an SMS acknowledgment where appropriate, CRM task creation, and source tracking.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 text-sm text-[#0A0A0A] italic">
                  &quot;Hi John, this is ABC Remodeling. Sorry we missed your call. Were you reaching out about a remodeling project?&quot;
                </div>
                <p className="text-[#667085] leading-relaxed">
                  If a message like this is automated, do not present it as manually sent — clarity builds trust.
                </p>
              </section>

              {/* Re-engage */}
              <section id="re-engage" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Re-Engage Old Contractor Leads</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Old leads often include postponed projects, leads who stopped responding, unaccepted estimates, seasonal projects, leads waiting on financing, or leads with a future timeline. Reasonable reactivation ideas include a project check-in, a seasonal reminder, an availability update, a relevant new project example, a financing update where applicable, or a service-area update.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Avoid spammy messaging, and never repeatedly message someone who has opted out.
                </p>
              </section>

              {/* Not annoying */}
              <section id="not-annoying" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How to Follow Up Without Being Annoying</h2>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Useful follow-up</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Adds context</li>
                  <li>Answers questions</li>
                  <li>Provides next steps</li>
                  <li>References the actual project</li>
                  <li>Respects communication preferences</li>
                  <li>Stops when appropriate</li>
                </ul>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Bad follow-up</h3>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1 mb-5">
                  <li>Same message repeatedly</li>
                  <li>Artificial urgency</li>
                  <li>Daily generic messages</li>
                  <li>No project context</li>
                  <li>Aggressive pressure</li>
                  <li>Ignoring opt-outs</li>
                  <li>Continuing indefinitely</li>
                </ul>
                <CalloutBox type="tip" label="Core Principle">
                  Persistence should increase clarity, not pressure.
                </CalloutBox>
              </section>

              {/* Metrics */}
              <section id="metrics" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor Follow-Up Metrics to Track</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A] space-y-1">
                  <p>Lead response rate = Leads that respond ÷ Leads contacted</p>
                  <p>Contact rate = Successfully contacted leads ÷ Total leads</p>
                  <p>Qualification rate = Qualified leads ÷ Total leads</p>
                  <p>Appointment rate = Appointments ÷ Qualified leads</p>
                  <p>Show rate = Completed appointments ÷ Scheduled appointments</p>
                  <p>Estimate rate = Estimates ÷ Qualified leads</p>
                  <p>Proposal-to-sale rate = Signed projects ÷ Proposals</p>
                  <p>Lead-to-sale rate = Signed projects ÷ Total leads</p>
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Also track average response time, follow-up attempts per opportunity, lost-reason distribution, signed revenue by source, and customer acquisition cost.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Together, these metrics help distinguish a marketing problem from a follow-up problem from a sales problem.
                </p>
              </section>

              {/* CPL economics */}
              <section id="cpl-economics" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">How Follow-Up Changes Cost per Lead Economics</h2>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Follow-up performance directly changes what a{' '}
                  <Link href="/blog/good-cost-per-lead-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">good cost per lead</Link>{' '}
                  actually delivers. Suppose two contractors each spend $5,000 and each generate 25 leads — both have a $200 CPL.
                </p>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  <p>Contractor A closes 1 project</p>
                  <p>Contractor B closes 3 projects</p>
                  <p className="font-bold mt-2">Same advertising CPL. Completely different business result.</p>
                </div>
                <p className="text-[#667085] leading-relaxed">
                  Increasing contact rate, qualification, appointment rate, estimate follow-up, and close rate can improve marketing economics without generating a single additional lead — follow-up performance is directly connected to customer acquisition cost.
                </p>
              </section>

              <InlineCTA
                headline="How Many Leads Are You Losing After They Contact You?"
                body="We connect your ads, website, calls, SMS, CRM, appointments, estimates, and signed projects so every qualified lead has a clear next step."
                buttonLabel="Request a Free Marketing Assessment"
              />

              {/* Mistakes */}
              <section id="mistakes" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Common Contractor Follow-Up Mistakes</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>Calling once and giving up</li>
                  <li>No immediate acknowledgment</li>
                  <li>No CRM</li>
                  <li>No lead owner</li>
                  <li>No next-action date</li>
                  <li>No missed-call workflow</li>
                  <li>No appointment reminders</li>
                  <li>Sending an estimate without scheduling follow-up</li>
                  <li>Treating every lead the same</li>
                  <li>Failing to record lost reasons</li>
                  <li>Forgetting old opportunities</li>
                  <li>Using personal phones without centralized visibility</li>
                  <li>Measuring lead volume instead of sales outcomes</li>
                  <li>Over-automating conversations</li>
                  <li>Sending repetitive messages</li>
                  <li>Ignoring customer communication preferences</li>
                </ul>
              </section>

              {/* Checklist */}
              <section id="checklist" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Contractor Lead Follow-Up Checklist</h2>
                <ul className="space-y-2 text-sm text-[#667085] leading-relaxed list-disc list-inside pl-1">
                  <li>New leads enter the CRM automatically</li>
                  <li>Lead source is captured</li>
                  <li>Lead is assigned</li>
                  <li>Immediate acknowledgment exists</li>
                  <li>Human follow-up task is created</li>
                  <li>Calls are tracked</li>
                  <li>SMS is tracked where applicable</li>
                  <li>Qualification criteria are documented</li>
                  <li>Appointments trigger reminders</li>
                  <li>Every estimate has a follow-up date</li>
                  <li>Proposal stages are visible</li>
                  <li>Lost reasons are recorded</li>
                  <li>Old leads have a nurture process</li>
                  <li>Revenue is associated with the original lead</li>
                  <li>Marketing and sales metrics are reviewed together</li>
                </ul>
              </section>

              {/* Final system */}
              <section id="final-system" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-4">Final Contractor Lead Follow-Up System</h2>
                <div className="bg-[#F4F6F8] border border-[#D0D5DD] px-5 py-4 my-6 font-mono text-sm text-[#0A0A0A]">
                  Generate → Respond → Qualify → Schedule → Estimate → Follow Up → Close → Measure
                </div>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Marketing performance should not stop at &quot;lead generated.&quot; It should continue until &quot;won / lost + revenue + reason.&quot;
                </p>
                <CalloutBox type="tip" label="Final Takeaway">
                  The contractor with the most leads does not automatically win. The contractor with the better system for converting qualified demand into signed projects may outperform competitors while spending the same amount on marketing.
                </CalloutBox>
                <p className="text-[#667085] leading-relaxed mt-5">
                  For the full picture of how this fits into a broader system, see the{' '}
                  <Link href="/general-contractor-marketing" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">general contractor marketing strategy guide</Link>, the{' '}
                  <Link href="/blog/google-ads-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">Google Ads for general contractors guide</Link>, and{' '}
                  <Link href="/blog/best-google-ads-keywords-for-general-contractors" className="text-[#1565D8] underline underline-offset-2 hover:no-underline">how contractor search intent shapes keyword strategy</Link>.
                </p>
              </section>

              {/* FAQ */}
              <section id="faq" className="mb-10 scroll-mt-28">
                <h2 className="text-2xl font-black text-[#0A0A0A] mb-6">Frequently Asked Questions</h2>
                {article.faq && <FAQSection items={article.faq} />}
              </section>

              {/* End CTA */}
              <EndArticleCTA
                headline="Build a Lead Follow-Up System That Converts More Projects"
                body="Turn contractor leads into a measurable sales pipeline with CRM workflows, qualification, reminders, attribution, and revenue tracking."
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
