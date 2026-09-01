import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCtaUrl, type SupportedLocale } from '@/lib/articles'
import { getBlogUI } from '@/lib/i18n'

interface EndArticleCTAProps {
  headline?: string
  body?: string
  buttonLabel?: string
  locale?: SupportedLocale
}

export default function EndArticleCTA({ headline, body, buttonLabel, locale = 'en-US' }: EndArticleCTAProps) {
  const ui = getBlogUI(locale)
  const ctaUrl = getCtaUrl(locale)
  return (
    <section className="mt-14 border border-[#D0D5DD] bg-white p-8 lg:p-10 relative" aria-label="Call to action">
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#1565D8]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#1565D8]" />
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-px bg-[#1565D8]" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
          {ui.nextStep}
        </span>
      </div>
      <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0A0A0A] tracking-tight mb-3 text-balance">
        {headline ?? ui.inlineCTAHeading}
      </h2>
      <p className="text-[#667085] leading-relaxed mb-6 max-w-xl">
        {body ?? ui.inlineCTABody}
      </p>
      <Link
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-6 py-3.5 text-sm hover:bg-[#1255c0] transition-colors duration-200"
        data-event="consultation_cta_click"
      >
        {buttonLabel ?? ui.ctaButton}
        <ArrowRight size={16} />
      </Link>
    </section>
  )
}
