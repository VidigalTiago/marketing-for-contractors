import { TrendingUp, Database, BarChart2 } from 'lucide-react'
import Image from 'next/image'

const capabilities = [
  {
    icon: TrendingUp,
    title: 'Paid Advertising',
    desc: 'Google, Meta, Bing, YouTube and more — managed to drive qualified leads.',
  },
  {
    icon: Database,
    title: 'Sales & CRM Systems',
    desc: 'Pipeline visibility from first contact to signed contract.',
  },
  {
    icon: BarChart2,
    title: 'Revenue Tracking',
    desc: 'Dashboards that show where your revenue actually comes from.',
  },
]

const platforms = [
  'Google Ads', 'Meta Ads', 'Bing Ads', 'YouTube', 'TikTok', 'LinkedIn',
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — portrait */}
          <div className="relative">
            {/* Blueprint corner accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-[#1565D8]/30 z-10" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-[#1565D8]/30 z-10" />

            <div className="bg-[#D0D5DD] aspect-[4/5] w-full max-w-sm relative overflow-hidden border border-[#D0D5DD]">
              <Image
                src="/profile.jpg"
                alt="Marketing for Contractors"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 384px"
                priority
              />

              {/* Measurement lines */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 opacity-50">
                <div className="h-px w-8 bg-[#1565D8]" />
                <span className="text-[9px] font-mono text-[#1565D8] uppercase tracking-widest">Profile</span>
              </div>
            </div>

            {/* Ad spend tag */}
            <div className="mt-4 inline-flex items-center gap-2 border border-[#D0D5DD] bg-white px-4 py-2.5">
              <div className="w-2 h-2 bg-[#1565D8]" />
              <span className="text-xs font-semibold text-[#0A0A0A]">US$20M+ in Ad Spend Managed</span>
            </div>
          </div>

          {/* Right — content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-[#1565D8]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
                  About
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-6">
                Meet Your Growth Partner
              </h2>
              <div className="space-y-4 text-[#667085] text-base leading-relaxed">
                <p>
                  I&apos;m Tiago Vidigal, a Growth Marketing and Data professional with over 10 years of experience helping businesses grow across B2B, e-commerce, high-ticket services, and residential construction.
                </p>
                <p>
                  Throughout my career, I have managed more than US$20M in paid media across Google, Bing, Meta, LinkedIn, TikTok, YouTube, and other channels. My work combines paid acquisition, analytics, conversion optimization, CRM, forecasting, and sales alignment.
                </p>
                <p>
                  One of the projects I led was for a U.S. home renovation company. I helped build the full system behind its growth: paid media campaigns, landing pages, tracking, lead qualification, CRM structure, sales pipeline reporting, and optimization based on closed revenue. The result was a scalable acquisition engine that supported growth from an early-stage operation to more than US$1M in monthly attributed revenue.
                </p>
                <p>
                  For contractors, I apply that same experience to help generate better leads, improve follow-up, identify what drives sales, and close more profitable jobs.
                </p>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#667085] mb-3">
                Platforms Managed
              </p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <span
                    key={p}
                    className="border border-[#D0D5DD] bg-white px-3 py-1.5 text-xs font-medium text-[#0A0A0A]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Capability cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="border border-[#D0D5DD] bg-white p-4 relative group hover:border-[#1565D8]/40 transition-colors duration-200"
                >
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-[#1565D8]/20 group-hover:border-[#1565D8]/50 transition-colors" />
                  <cap.icon size={18} className="text-[#1565D8] mb-3" strokeWidth={1.5} />
                  <p className="text-xs font-bold text-[#0A0A0A] mb-1.5">{cap.title}</p>
                  <p className="text-[11px] text-[#667085] leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
