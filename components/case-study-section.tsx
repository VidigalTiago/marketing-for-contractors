'use client'

import {
  BarChart, Bar, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const results = [
  { value: 'US$408K+', label: 'Managed in Advertising' },
  { value: 'US$9.6M+', label: 'Tracked Revenue' },
  { value: '158', label: 'Closed Projects' },
  { value: 'US$1M+', label: 'Best Month' },
]

const annualData = [
  { year: '2022', period: 'Mai–Dez', revenue: 302965, growth: null, label: 'Início' },
  { year: '2023', period: 'Jan–Dez', revenue: 1525123, growth: '+403%', label: null },
  { year: '2024', period: 'Jan–Dez', revenue: 2540101, growth: '+67%', label: null },
  { year: '2025', period: 'Jan–Nov', revenue: 5185802, growth: '+104%', label: null },
]

function formatRevenue(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

function formatRevenueAxis(value: number) {
  if (value === 0) return '$0M'
  return `$${(value / 1_000_000).toFixed(1)}M`
}

export default function CaseStudySection() {
  return (
    <section id="results" className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden">
      {/* Dark blueprint grid */}
      <div className="absolute inset-0 blueprint-grid-dark" />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              Case Study
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance max-w-3xl">
            Scaling a High-Ticket Home Renovation Business in Boston
          </h2>
        </div>

        {/* Narrative */}
        <div className="border border-white/10 bg-white/5 p-6 lg:p-10 mb-14 space-y-5">
          <p className="text-sm text-white/70 leading-relaxed">
            This was my first General Contractor case in the United States, which started in{' '}
            <strong className="text-white font-semibold">May 2022</strong>. From the beginning, I worked closely with the client to understand the business, structure the strategy, and solve the challenges that were limiting growth. Over time, the client became one of the strongest advocates of my work. He understood the methodology, recognized that sustainable growth required a real partnership, and remained committed throughout every phase of the project. The first few months were not easy. We faced operational challenges, friction, and disagreements, but through patience, transparency, and a structured approach, we identified the key levers that allowed the business to scale.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            In the first year, I focused on helping a small contractor specialized in{' '}
            <span className="text-[#1565D8] font-semibold">Roofing and Siding</span>. The company had limited results and a negative history with previous marketing agencies. As I became more involved in the strategy, I identified that the existing{' '}
            <span className="text-[#1565D8] font-semibold">landing page was not converting</span>{' '}
            effectively for the segment. I led the website restructuring process, working with the client to improve the messaging, user experience, and conversion flow. The changes produced an immediate improvement in the conversion rate from leads to estimates. Through campaign data, sales feedback, and market analysis, I also identified that the strongest demand and highest average contract values were coming from{' '}
            <span className="text-[#1565D8] font-semibold">interior remodeling</span>{' '}
            services. Based on this finding, I recommended shifting the strategy in the second year toward{' '}
            <strong className="text-white font-semibold">Kitchen Remodeling, Bathroom Remodeling, and Home Additions</strong>.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            The pivot proved to be the right decision. Interior remodeling campaigns generated a similar cost per click to Roofing and Siding campaigns, but the average contract value was significantly higher. During the same period, I identified another major constraint in the sales process: the company was losing opportunities because its pricing was not competitive. Subcontractor costs were reducing margins and making proposals less attractive compared with competitors. To address this, I worked with the client on a complete{' '}
            <strong className="text-white font-semibold">brand repositioning</strong>. This included a new visual identity, improved content, a redesigned website, stronger positioning, and a partnership with a local photography agency to increase the brand&apos;s perceived authority and credibility.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            On the acquisition and CRM side, I implemented{' '}
            <span className="text-[#1565D8] font-semibold">segmented email marketing automations</span>{' '}
            and nurture sequences for each service funnel. I also analyzed performance by location, identified the cities with the highest conversion rates, and applied{' '}
            <strong className="text-white font-semibold">geographic bid value rules</strong>{' '}
            within the advertising accounts. Beyond marketing execution, I advised the client on broader business decisions. One of my recommendations was relocating the company&apos;s office to a higher-income area, helping align its physical presence and brand positioning with the homeowner profile it wanted to attract.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            One of the most impactful insights came from deeper market and customer research. I identified that the ideal client for{' '}
            <span className="text-[#1565D8] font-semibold">Home Additions</span>{' '}
            was often a homeowner living in a multigenerational or inherited property — someone who already owned a valuable home but did not have enough liquidity to purchase a new one. These projects typically ranged from{' '}
            <strong className="text-white font-semibold">$200,000 to $500,000</strong>. Based on this insight, I restructured the campaigns, targeting, offers, and messaging around this specific customer profile. This strategy significantly accelerated both lead volume and average contract value. The project became much more than a paid media engagement — I worked alongside the client across marketing, branding, CRM, sales, pricing, positioning, and business strategy, helping transform a small Roofing and Siding contractor into a stronger and more sophisticated interior remodeling business.
          </p>

          {/* Final result callout */}
          <div className="border-l-2 border-[#1565D8] bg-[#1565D8]/10 px-5 py-4 mt-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1565D8] mb-2">Final Result</p>
            <p className="text-sm text-white/80 leading-relaxed">
              With all these strategies combined, we scaled the business from a{' '}
              <strong className="text-white">$200K/month target to over $600K/month</strong>. In{' '}
              <strong className="text-white">February 2025</strong>, the client posted a record month of over{' '}
              <strong className="text-white">$1 million in a single month</strong>. By November 2025, cumulative annual revenue had already surpassed{' '}
              <strong className="text-white">$5.1 million in just 11 months</strong> — making it the most successful year in the company&apos;s history.
            </p>
          </div>
        </div>

        {/* Result cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-14">
          {results.map((r) => (
            <div key={r.label} className="bg-[#0A0A0A] p-6 lg:p-8 flex flex-col gap-2">
              <p className="text-2xl lg:text-3xl font-extrabold text-white">{r.value}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider font-medium">{r.label}</p>
            </div>
          ))}
        </div>

        {/* Annual revenue evolution chart */}
        <div className="p-6 lg:p-8 mb-6 bg-[#0A0A0A]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">
                Annual Revenue Evolution
              </p>
              <p className="text-sm text-white/70 leading-snug">
                Exponential growth from May/2022 to Nov/2025
              </p>
            </div>
            <div className="flex items-center gap-2 border border-[#1565D8]/40 px-3 py-1.5 self-start">
              <TrendingUp size={12} className="text-[#1565D8]" />
              <span className="text-xs font-bold text-[#1565D8]">+1,612% in 3 years</span>
            </div>
          </div>

          {/* Year cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {annualData.map((d) => (
              <div key={d.year} className="border border-white/10 bg-white/5 p-4">
                <p className="text-xl font-extrabold text-white mb-0.5">{d.year}</p>
                <p className="text-[10px] text-white/35 uppercase tracking-wider mb-3">{d.period}</p>
                <p className="text-base font-bold text-[#1565D8] mb-1">
                  {formatRevenue(d.revenue)}
                </p>
                {d.growth ? (
                  <p className="text-xs text-white/50">{d.growth}</p>
                ) : (
                  <p className="text-xs text-white/30">Start</p>
                )}
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={annualData}
                margin={{ top: 20, right: 8, bottom: 0, left: 8 }}
                barCategoryGap="28%"
              >
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatRevenueAxis}
                  width={48}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{
                    backgroundColor: '#111',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 0,
                    fontSize: 11,
                    color: '#fff',
                    padding: '6px 12px',
                  }}
                  formatter={(v: number) => [formatRevenue(v), 'Revenue']}
                />
                <Bar dataKey="revenue" radius={0} label={false}>
                  {annualData.map((entry, index) => (
                    <Cell
                      key={entry.year}
                      fill={index === annualData.length - 1 ? '#1565D8' : `rgba(21,101,216,${0.35 + index * 0.15})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Best Year</p>
              <p className="text-sm font-bold text-[#1565D8]">2025: $5.19M in 11 months</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Average Growth</p>
              <p className="text-sm font-bold text-white">+191% per year</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Total Growth</p>
              <p className="text-sm font-bold text-[#1565D8]">+1,612% since 2022</p>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
