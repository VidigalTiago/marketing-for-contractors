'use client'

import { CheckCircle2, AlertTriangle } from 'lucide-react'

const included = [
  'Paid media management',
  'CRM setup support',
  'Revenue dashboard',
  'Email follow-up automation',
  'Website conversion support',
  'Local SEO foundation',
]

const separateItems = [
  { label: 'Paid media management', value: 'US$1,500–3,000/month' },
  { label: 'CRM setup & sales pipeline', value: 'US$2,000–4,000' },
  { label: 'Revenue dashboard', value: 'US$800–2,000' },
  { label: 'Email follow-up automation', value: 'US$750–1,500' },
  { label: 'Website conversion support', value: 'US$750–2,500' },
  { label: 'Local SEO foundation', value: 'US$1,000–2,500' },
]

interface PricingSectionProps {
  onCTAClick: () => void
}

export default function PricingSection({ onCTAClick }: PricingSectionProps) {
  return (
    <section id="investment" className="py-20 lg:py-28 bg-white" aria-labelledby="investment-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              Investment
            </span>
          </div>
          <h2 id="investment-heading" className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-4">
            One Partner. One Connected System.
          </h2>
          <p className="text-[#667085] text-base lg:text-lg leading-relaxed">
            Most contractors need separate vendors for paid ads, website work, CRM setup, reporting, follow-up systems, and SEO. This partnership brings the essential pieces together.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* If purchased separately */}
          <div className="border border-[#D0D5DD] bg-[#F4F6F8] p-6 lg:p-8 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#D0D5DD]" />
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={16} className="text-[#667085]" strokeWidth={1.5} />
              <h3 className="text-sm font-bold text-[#667085] uppercase tracking-wider">
                If Purchased Separately
              </h3>
            </div>
            <div className="space-y-3 mb-6">
              {separateItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <span className="text-xs text-[#667085]">{item.label}</span>
                  <span className="text-xs font-semibold text-[#0A0A0A] whitespace-nowrap">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#D0D5DD] pt-4">
              <p className="text-xs text-[#667085] mb-1 font-medium">Setup + infrastructure</p>
              <p className="text-xl font-extrabold text-[#0A0A0A]">US$6,800–15,500+</p>
              <p className="text-xs text-[#667085] mt-2">+ US$1,500–3,000/month for paid media management</p>
            </div>
          </div>

          {/* Your Investment */}
          <div className="border-2 border-[#1565D8] bg-white p-6 lg:p-8 relative">
            {/* Corner marks */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#1565D8]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#1565D8]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#1565D8]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#1565D8]" />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#1565D8] px-3 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Limited Partner Availability
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-6">
              Your Investment
            </h3>

            <div className="mb-6">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-extrabold text-[#0A0A0A]">US$1,400</span>
                <span className="text-sm text-[#667085] mb-1.5">/month</span>
              </div>
              <p className="text-xs text-[#667085]">Plus ad spend</p>
            </div>

            <ul className="space-y-2.5 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#0A0A0A] font-medium">
                  <CheckCircle2 size={15} className="text-[#1565D8] flex-shrink-0" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={onCTAClick}
              data-event="consultation_cta_click"
              className="w-full bg-[#1565D8] text-white font-semibold text-sm py-3.5 hover:bg-[#1255c0] transition-colors duration-200"
            >
              Start Your Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
