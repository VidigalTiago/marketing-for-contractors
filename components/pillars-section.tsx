import { Users, MessageSquare, BarChart2 } from 'lucide-react'

const pillars = [
  {
    icon: Users,
    title: 'Better Leads',
    desc: 'Reach homeowners actively searching for your services. Target the right markets, service types, and job sizes.',
  },
  {
    icon: MessageSquare,
    title: 'Better Follow-Up',
    desc: 'Automated sequences that keep your pipeline moving — from the first inquiry to the signed contract.',
  },
  {
    icon: BarChart2,
    title: 'Better Visibility',
    desc: 'A clear view of what is generating revenue, what is not, and where your best opportunities are being lost.',
  },
]

export default function PillarsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              The System
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance">
            Built for Contractors Who Want More Than Just Ads
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-[#D0D5DD] border border-[#D0D5DD] mb-12">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="bg-white p-8 lg:p-10 relative group hover:bg-[#F4F6F8] transition-colors duration-200">
              {/* Corner mark */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#1565D8]/20 group-hover:border-[#1565D8]/50 transition-colors" />

              {/* Number */}
              <p className="text-[10px] font-mono text-[#D0D5DD] mb-6 uppercase tracking-widest">
                0{i + 1}
              </p>

              <div className="p-3 border border-[#D0D5DD] bg-[#F4F6F8] inline-flex mb-5 group-hover:border-[#1565D8]/30 group-hover:bg-[#1565D8]/5 transition-colors duration-200">
                <pillar.icon size={22} className="text-[#1565D8]" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-extrabold text-[#0A0A0A] mb-3">{pillar.title}</h3>
              <p className="text-sm text-[#667085] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Supporting text */}
        <p className="text-sm text-[#667085] max-w-2xl leading-relaxed">
          Your ads, leads, follow-up, estimates, and sales tracking should work together. This system is designed to show you what is creating revenue and where opportunities are being lost.
        </p>
      </div>
    </section>
  )
}
