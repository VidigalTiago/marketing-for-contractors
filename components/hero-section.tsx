'use client'

import { ArrowRight } from 'lucide-react'
import HeroDashboard from './hero-dashboard'

interface HeroSectionProps {
  onCTAClick: () => void
}

const metrics = [
  { value: 'US$12.8M+', label: 'Attributed Revenue' },
  { value: '10+ Years', label: 'in Growth Marketing' },
]

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-60" />

      {/* Corner measurement marks */}
      <div className="absolute top-20 left-8 hidden lg:block">
        <div className="w-6 h-6 border-l border-t border-[#1565D8]/25" />
      </div>
      <div className="absolute bottom-12 right-8 hidden lg:block">
        <div className="w-6 h-6 border-r border-b border-[#1565D8]/25" />
      </div>
      <div className="absolute top-32 right-1/2 hidden lg:block">
        <div className="w-px h-8 bg-[#1565D8]/15" />
        <div className="text-[9px] text-[#1565D8]/40 tracking-widest mt-1 uppercase font-mono">+</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — copy */}
          <div className="space-y-8">


            {/* Main headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#0A0A0A] text-balance">
                Get More Renovation Clients From Your Marketing
              </h1>
              <p className="text-xl lg:text-2xl font-semibold text-[#1565D8] text-balance">
                More qualified leads. More estimates. More signed projects.
              </p>
            </div>

            {/* Supporting copy */}
            <p className="text-[#667085] text-base lg:text-lg leading-relaxed max-w-lg">
              I help General Contractors, builders, and home improvement companies get more real project opportunities through paid advertising, stronger follow-up systems, and clear sales tracking.
            </p>

            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {metrics.map((m) => (
                <div
                  key={m.value}
                  className="border border-[#D0D5DD] bg-white p-3 lg:p-4 relative"
                >
                  {/* micro corner mark */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-[#1565D8]/30" />
                  <p className="text-lg lg:text-xl font-extrabold text-[#0A0A0A] leading-tight">
                    {m.value}
                  </p>
                  <p className="text-[11px] text-[#667085] mt-1 leading-tight font-medium">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onCTAClick}
              className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-6 py-3.5 text-sm hover:bg-[#1255c0] transition-colors duration-200"
            >
              Start Your Consultation
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right column — dashboard */}
          <div className="relative">
            {/* Decorative axis label */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-2 opacity-40">
              <div className="h-px w-6 bg-[#1565D8]" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#1565D8] rotate-180"
                style={{ writingMode: 'vertical-lr' }}>
                Performance
              </span>
            </div>
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <HeroDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
