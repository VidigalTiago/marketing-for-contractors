'use client'

import { useMemo, useState } from 'react'

type Props = { locale?: 'en-US' | 'pt-BR' }

export function ContractorRoiCalculator({ locale = 'en-US' }: Props) {
  const pt = locale === 'pt-BR'
  const [spend, setSpend] = useState('5000')
  const [revenue, setRevenue] = useState('30000')
  const [margin, setMargin] = useState('30')
  const [projects, setProjects] = useState('3')

  const result = useMemo(() => {
    const investment = Math.max(0, Number(spend) || 0)
    const sales = Math.max(0, Number(revenue) || 0)
    const grossProfit = sales * Math.min(100, Math.max(0, Number(margin) || 0)) / 100
    const roi = investment > 0 ? ((grossProfit - investment) / investment) * 100 : 0
    const roas = investment > 0 ? sales / investment : 0
    const cac = Number(projects) > 0 ? investment / Number(projects) : 0
    return { roi, roas, cac, grossProfit }
  }, [spend, revenue, margin, projects])

  const money = (value: number) => new Intl.NumberFormat(pt ? 'pt-BR' : 'en-US', { style: 'currency', currency: pt ? 'BRL' : 'USD', maximumFractionDigits: 0 }).format(value)

  return (
    <section id="roi-calculator" className="my-12 border border-[#D8E0EA] bg-[#F7F9FC] p-6 md:p-8" aria-labelledby="roi-calculator-title">
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1565D8]">{pt ? 'Ferramenta gratuita' : 'Free tool'}</p>
        <h2 id="roi-calculator-title" className="text-2xl font-bold tracking-tight text-[#0A0A0A]">{pt ? 'Calculadora de ROI de Marketing para Contractors' : 'Contractor Marketing ROI Calculator'}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">{pt ? 'Use uma estimativa simples para entender o retorno potencial. Nenhum dado é armazenado ou enviado.' : 'Use a simple estimate to understand potential return. No calculator data is stored or transmitted.'}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          [pt ? 'Investimento total em marketing' : 'Total marketing investment', spend, setSpend, pt ? 'Ex.: 5000' : 'e.g. 5000'],
          [pt ? 'Receita assinada atribuída' : 'Attributed signed revenue', revenue, setRevenue, pt ? 'Ex.: 30000' : 'e.g. 30000'],
          [pt ? 'Margem bruta (%)' : 'Gross margin (%)', margin, setMargin, '30'],
          [pt ? 'Projetos assinados' : 'Signed projects', projects, setProjects, '3'],
        ].map(([label, value, setter, placeholder]) => (
          <label key={label as string} className="grid gap-2 text-sm font-medium text-[#344054]">
            {label as string}
            <input type="number" min="0" value={value as string} placeholder={placeholder as string} onChange={(event) => (setter as (value: string) => void)(event.target.value)} className="h-11 border border-[#C8D2DF] bg-white px-3 text-[#0A0A0A] outline-none focus:border-[#1565D8]" />
          </label>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          [pt ? 'ROI baseado em lucro bruto' : 'Gross-profit-based ROI', `${result.roi.toFixed(1)}%`],
          [pt ? 'ROAS' : 'ROAS', `${result.roas.toFixed(2)}x`],
          [pt ? 'CAC estimado' : 'Estimated CAC', money(result.cac)],
        ].map(([label, value]) => <div key={label} className="border border-[#D8E0EA] bg-white p-4"><p className="text-xs text-[#667085]">{label}</p><p className="mt-1 text-2xl font-bold text-[#0A0A0A]">{value}</p></div>)}
      </div>
      <p className="mt-5 text-xs leading-5 text-[#667085]">{pt ? `Lucro bruto estimado: ${money(result.grossProfit)}. Esta calculadora é uma estimativa simplificada e não substitui análise financeira, tributária ou contábil.` : `Estimated gross profit: ${money(result.grossProfit)}. This calculator is a simplified estimate and does not replace financial, tax, or accounting analysis.`}</p>
    </section>
  )
}
