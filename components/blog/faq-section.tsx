'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SupportedLocale } from '@/lib/articles'
import { getBlogUI } from '@/lib/i18n'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
  heading?: string
  locale?: SupportedLocale
}

export default function FAQSection({ items, heading, locale = 'en-US' }: FAQSectionProps) {
  const ui = getBlogUI(locale)
  const resolvedHeading = heading ?? ui.faqHeading
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mt-14" aria-labelledby="faq-heading">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-5 h-px bg-[#1565D8]" />
        <h2 id="faq-heading" className="text-xl font-extrabold text-[#0A0A0A] tracking-tight">
          {resolvedHeading}
        </h2>
      </div>
      <div className="divide-y divide-[#D0D5DD] border border-[#D0D5DD]">
        {items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <h3 className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                {item.question}
              </h3>
              <ChevronDown
                size={16}
                className={`shrink-0 mt-0.5 text-[#667085] transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 bg-[#F4F6F8]">
                <p className="text-sm text-[#667085] leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
