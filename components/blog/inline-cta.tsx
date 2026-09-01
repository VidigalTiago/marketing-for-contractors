import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCtaUrl, type SupportedLocale } from '@/lib/articles'
import { getBlogUI } from '@/lib/i18n'

interface InlineCTAProps {
  headline?: string
  body?: string
  buttonLabel?: string
  locale?: SupportedLocale
}

export default function InlineCTA({ headline, body, buttonLabel, locale = 'en-US' }: InlineCTAProps) {
  const ui = getBlogUI(locale)
  const ctaUrl = getCtaUrl(locale)
  return (
    <aside className="my-10 border-l-4 border-[#1565D8] bg-[#F4F6F8] px-6 py-6 relative">
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[#1565D8]/30" />
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-2">
        {ui.freeAssessment}
      </p>
      <h3 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight mb-2 text-balance">
        {headline ?? ui.inlineCTAHeading}
      </h3>
      <p className="text-sm text-[#667085] leading-relaxed mb-4">
        {body ?? ui.inlineCTABody}
      </p>
      <Link
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#1565D8] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#1255c0] transition-colors duration-200"
      >
        {buttonLabel ?? ui.ctaButton}
        <ArrowRight size={14} />
      </Link>
    </aside>
  )
}
