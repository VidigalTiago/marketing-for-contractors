'use client'

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { TrendingUp, Users, FileText, CheckSquare, DollarSign } from 'lucide-react'

const revenueData = [
  { month: 'Jan', value: 44000 },
  { month: 'Feb', value: 62000 },
  { month: 'Mar', value: 78000 },
  { month: 'Apr', value: 95000 },
  { month: 'May', value: 134000 },
  { month: 'Jun', value: 178000 },
  { month: 'Jul', value: 215000 },
  { month: 'Aug', value: 268000 },
  { month: 'Sep', value: 312000 },
  { month: 'Oct', value: 378000 },
  { month: 'Nov', value: 420000 },
  { month: 'Dec', value: 445000 },
]

const leadsData = [
  { month: 'Jan', value: 18 },
  { month: 'Feb', value: 24 },
  { month: 'Mar', value: 31 },
  { month: 'Apr', value: 28 },
  { month: 'May', value: 42 },
  { month: 'Jun', value: 56 },
  { month: 'Jul', value: 63 },
  { month: 'Aug', value: 71 },
]

const metrics = [
  {
    icon: DollarSign,
    label: 'Ad Spend',
    value: '$12,400',
    change: '+8.2%',
    positive: true,
  },
  {
    icon: Users,
    label: 'Leads',
    value: '71',
    change: '+12.7%',
    positive: true,
  },
  {
    icon: FileText,
    label: 'Estimates',
    value: '38',
    change: '+5.4%',
    positive: true,
  },
  {
    icon: CheckSquare,
    label: 'Signed Jobs',
    value: '14',
    change: '+16.7%',
    positive: true,
  },
]

export default function HeroDashboard() {
  return (
    <div className="relative w-full h-full bg-white border border-[#D0D5DD] shadow-lg overflow-hidden">
      {/* Blueprint corner marks */}
      <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-[#1565D8]/30" />
      <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-[#1565D8]/30" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-[#1565D8]/30" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-[#1565D8]/30" />

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#667085]">Marketing Dashboard</p>
            <p className="text-xs text-[#667085] mt-0.5">Last 12 months · Updated live</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-green-700">Live</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[#F4F6F8] border border-[#D0D5DD] p-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-[#667085] uppercase tracking-wider">{m.label}</span>
                <m.icon size={12} className="text-[#1565D8]" />
              </div>
              <div className="flex items-end gap-1.5">
                <span className="text-lg font-bold text-[#0A0A0A] leading-none">{m.value}</span>
                <span className="text-[10px] font-semibold text-green-600 mb-0.5">{m.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="bg-[#F4F6F8] border border-[#D0D5DD] p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#667085]">Revenue Tracked</span>
            <div className="flex items-center gap-1">
              <TrendingUp size={11} className="text-[#1565D8]" />
              <span className="text-[10px] font-bold text-[#1565D8]">+911%</span>
            </div>
          </div>
          <div className="flex items-end justify-between mb-1.5">
            <span className="text-sm font-bold text-[#0A0A0A]">$445K</span>
            <span className="text-[10px] text-[#667085]">best month</span>
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1565D8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1565D8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1565D8"
                  strokeWidth={2}
                  fill="url(#revGrad)"
                  dot={false}
                />
                <Tooltip
                  contentStyle={{ fontSize: 10, padding: '4px 8px', border: '1px solid #D0D5DD', borderRadius: 0 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`, 'Revenue']}
                  labelFormatter={(l) => l}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-1">
            {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
              <span key={m} className="text-[9px] text-[#667085]">{m}</span>
            ))}
          </div>
        </div>

        {/* Leads chart */}
        <div className="bg-[#F4F6F8] border border-[#D0D5DD] p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#667085]">Monthly Leads</span>
            <span className="text-[10px] font-bold text-[#0A0A0A]">71 this month</span>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barSize={12}>
                <Bar dataKey="value" fill="#1565D8" radius={[1, 1, 0, 0]} />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#667085' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 10, padding: '4px 8px', border: '1px solid #D0D5DD', borderRadius: 0 }}
                  formatter={(v: number) => [v, 'Leads']}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue total */}
        <div className="border border-[#1565D8]/30 bg-[#1565D8]/5 p-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#667085]">Total Revenue Tracked</p>
            <p className="text-xl font-bold text-[#0A0A0A] mt-0.5">$9.6M+</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#667085]">Closed Projects</p>
            <p className="text-xl font-bold text-[#1565D8] mt-0.5">158</p>
          </div>
        </div>
      </div>
    </div>
  )
}
