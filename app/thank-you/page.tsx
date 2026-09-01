'use client'

import { useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { trackEvent } from '@/lib/mixpanel'
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'

const WHATSAPP_URL = `https://wa.me/5531995745199?text=${encodeURIComponent("Hi! I just submitted my information and would like to talk about growing my contracting business.")}`

export default function ThankYouPage() {
  useEffect(() => {
    trackEvent('consultation_scheduled', {
      path: '/thank-you',
    })
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onCTAClick={() => window.open(WHATSAPP_URL, '_blank')} />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl w-full text-center">

          {/* Check icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 border border-[#1565D8]/30 bg-[#1565D8]/8 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[#1565D8]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-8 bg-[#1565D8]" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
              Submission Confirmed
            </span>
            <div className="h-px w-8 bg-[#1565D8]" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-5">
            Thank You for Reaching Out
          </h1>

          {/* Body */}
          <p className="text-[#667085] text-base leading-relaxed mb-3">
            We have received your information and will be in touch shortly.
          </p>
          <p className="text-[#667085] text-base leading-relaxed mb-10">
            If you would like to talk sooner or have any questions before our call, feel free to reach out directly on WhatsApp.
          </p>

          {/* Divider */}
          <div className="border-t border-[#D0D5DD] mb-10" />

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1565D8] text-white font-semibold px-7 py-4 text-sm hover:bg-[#1255c0] transition-colors duration-200"
          >
            <MessageCircle size={18} />
            Talk to Us on WhatsApp
            <ArrowRight size={16} />
          </a>

          {/* Back link */}
          <div className="mt-8">
            <a
              href="/"
              className="text-xs text-[#667085] hover:text-[#0A0A0A] transition-colors duration-200 uppercase tracking-widest font-medium"
            >
              Back to Homepage
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
