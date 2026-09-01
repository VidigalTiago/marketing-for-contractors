'use client'

import { TrendingUp } from 'lucide-react'

const funnelStages = [
  { label: 'Cost per Lead', cost: '$237.50', color: 'from-purple-500 to-blue-500' },
  { label: 'Cost per Appointment', cost: '$450.73', color: 'from-blue-500 to-cyan-500' },
  { label: 'Cost per Proposal', cost: '$706.15', color: 'from-cyan-500 to-green-500' },
  { label: 'Cost per Signed Contract', cost: '$2,448.80', color: 'from-green-500 to-yellow-500' },
]

const metrics = [
  { label: 'Media Spend', value: '$6,164.60', subtitle: 'Average Monthly' },
  { label: 'Revenue', value: '$125,346.15', subtitle: 'Average Monthly' },
  { label: 'Media ROI', value: '4.26x', subtitle: 'Return on Investment' },
]

export default function BenchmarksSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              Benchmarks & Metrics
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance mb-3">
            See What Other General Contractors Are Investing to Generate More Jobs
          </h2>
          <p className="text-base text-white/70 leading-relaxed max-w-2xl">
            Based on historical residential construction campaign data, contractors generated an average <span className="text-[#1565D8] font-semibold">4.26x media ROI</span>. That means every US$1 invested in paid advertising generated US$4.26 in gross profit attributed to marketing.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side: Funnel */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-8">
              Average Cost to Move a Lead Through the Sales Process
            </h3>

            <div className="flex flex-col gap-0 flex-1">
              {funnelStages.map((stage, index) => {
                const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/6']
                const heights = ['h-1/4', 'h-1/4', 'h-1/4', 'h-1/4']
                return (
                  <div key={stage.label} className={`${heights[index]} flex items-center px-6 bg-gradient-to-r ${stage.color} transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20`}>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        {stage.label}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {stage.cost}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side: Metrics */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-8">
              Average Monthly Marketing Performance
            </h3>

            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="border border-[#1565D8]/30 bg-[#1565D8]/10 p-6 lg:p-7 rounded-sm hover:border-[#1565D8]/60 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#1565D8] mb-1">
                        {metric.label}
                      </p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">
                        {metric.subtitle}
                      </p>
                    </div>
                    {index === 2 && (
                      <TrendingUp size={18} className="text-[#1565D8]" />
                    )}
                  </div>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[11px] text-white/30 leading-relaxed max-w-3xl">
            Benchmarks are based on historical residential construction campaign performance. Results vary based on service type, local market, pricing, sales process, budget, competition, and speed of follow-up.
          </p>
        </div>
      </div>
    </section>
  )
}
