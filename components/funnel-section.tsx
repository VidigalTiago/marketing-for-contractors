import {
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

const funnelSteps = [
  { label: 'Ads', sub: 'Paid Traffic' },
  { label: 'Lead', sub: 'Contact Captured' },
  { label: 'Estimate', sub: 'Job Scoped' },
  { label: 'Signed Project', sub: 'Contract Closed' },
  { label: 'Revenue', sub: 'Money In' },
]

const problems = [
  'Not knowing which ads bring the best homeowners',
  'Leads not becoming estimates',
  'Estimates not becoming signed jobs',
  'No clear view of marketing ROI',
  'Leads getting lost because follow-up is slow',
  'No visibility into profitable services or locations',
]

export default function FunnelSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              The Real Problem
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-2">
            Most Contractors Do Not Have a Lead Problem
          </h2>
          <p className="text-2xl lg:text-3xl font-bold text-[#1565D8]">
            They have a system problem.
          </p>
        </div>

        {/* Funnel visual */}
        <div className="mb-16">
          {/* Desktop funnel */}
          <div className="hidden md:flex items-stretch gap-0 border border-[#D0D5DD] overflow-hidden">
            {funnelSteps.map((step, i) => (
              <div key={step.label} className="flex-1 flex items-center">
                <div
                  className={`flex-1 p-5 lg:p-6 flex flex-col items-center justify-center text-center ${
                    i === 0
                      ? 'bg-[#0A0A0A] text-white'
                      : i === funnelSteps.length - 1
                      ? 'bg-[#1565D8] text-white'
                      : 'bg-[#F4F6F8] text-[#0A0A0A]'
                  }`}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${
                    i === 0 || i === funnelSteps.length - 1 ? 'opacity-70' : 'text-[#667085]'
                  }`}>
                    Step {i + 1}
                  </p>
                  <p className="text-sm lg:text-base font-bold">{step.label}</p>
                  <p className={`text-[10px] mt-1 ${
                    i === 0 || i === funnelSteps.length - 1 ? 'opacity-60' : 'text-[#667085]'
                  }`}>
                    {step.sub}
                  </p>
                </div>
                {i < funnelSteps.length - 1 && (
                  <div className="flex-shrink-0 w-7 flex items-center justify-center bg-white border-y border-[#D0D5DD] self-stretch">
                    <ArrowRight size={14} className="text-[#D0D5DD]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile funnel */}
          <div className="md:hidden flex flex-col gap-0 border border-[#D0D5DD] overflow-hidden">
            {funnelSteps.map((step, i) => (
              <div key={step.label}>
                <div className={`px-5 py-4 flex items-center justify-between ${
                  i === 0
                    ? 'bg-[#0A0A0A] text-white'
                    : i === funnelSteps.length - 1
                    ? 'bg-[#1565D8] text-white'
                    : 'bg-[#F4F6F8] text-[#0A0A0A]'
                }`}>
                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-widest ${
                      i === 0 || i === funnelSteps.length - 1 ? 'opacity-60' : 'text-[#667085]'
                    }`}>Step {i + 1}</p>
                    <p className="text-sm font-bold">{step.label}</p>
                  </div>
                  <p className={`text-xs ${
                    i === 0 || i === funnelSteps.length - 1 ? 'opacity-60' : 'text-[#667085]'
                  }`}>{step.sub}</p>
                </div>
                {i < funnelSteps.length - 1 && (
                  <div className="flex justify-center py-1 border-x border-[#D0D5DD] bg-white">
                    <ArrowRight size={12} className="text-[#D0D5DD] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Problems grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border border-[#D0D5DD] bg-white p-4 lg:p-5 group hover:border-[#1565D8]/40 transition-colors duration-200"
            >
              <AlertCircle
                size={16}
                className="text-[#1565D8] mt-0.5 flex-shrink-0"
                strokeWidth={1.5}
              />
              <p className="text-sm text-[#0A0A0A] leading-relaxed font-medium">
                {problem}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
