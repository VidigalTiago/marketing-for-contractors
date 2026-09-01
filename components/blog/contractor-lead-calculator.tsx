'use client'

import { useState, useId } from 'react'

type Locale = 'en-US' | 'pt-BR'

interface CalculatorLabels {
  heading: string
  adSpend: string
  rawLeads: string
  qualifiedLeads: string
  appointments: string
  estimates: string
  signedProjects: string
  avgRevenue: string
  grossMargin: string
  calculate: string
  reset: string
  resultsHeading: string
  rawCPL: string
  costPerQualifiedLead: string
  costPerAppointment: string
  costPerEstimate: string
  cac: string
  qualificationRate: string
  leadToAppointmentRate: string
  estimateToSaleRate: string
  leadToSaleRate: string
  signedRevenue: string
  estimatedGrossProfit: string
  roas: string
  grossProfitAfterAds: string
  disclaimer: string
  na: string
  invalidInputs: string
}

const EN: CalculatorLabels = {
  heading: 'Contractor Lead Funnel Calculator',
  adSpend: 'Monthly advertising spend ($)',
  rawLeads: 'Raw leads',
  qualifiedLeads: 'Qualified leads',
  appointments: 'Appointments booked',
  estimates: 'Estimates completed',
  signedProjects: 'Signed projects',
  avgRevenue: 'Average project revenue ($)',
  grossMargin: 'Gross margin (%)',
  calculate: 'Calculate',
  reset: 'Reset',
  resultsHeading: 'Results',
  rawCPL: 'Raw cost per lead',
  costPerQualifiedLead: 'Cost per qualified lead',
  costPerAppointment: 'Cost per appointment',
  costPerEstimate: 'Cost per estimate',
  cac: 'Customer acquisition cost (CAC)',
  qualificationRate: 'Lead qualification rate',
  leadToAppointmentRate: 'Lead-to-appointment rate',
  estimateToSaleRate: 'Estimate-to-sale rate',
  leadToSaleRate: 'Lead-to-sale rate',
  signedRevenue: 'Signed revenue',
  estimatedGrossProfit: 'Estimated gross profit',
  roas: 'ROAS (revenue ÷ ad spend)',
  grossProfitAfterAds: 'Estimated gross profit after ad spend',
  disclaimer: 'This calculator provides a simplified marketing estimate and does not replace financial or accounting analysis.',
  na: 'N/A',
  invalidInputs: 'Please enter valid numbers greater than zero where required.',
}

const PT: CalculatorLabels = {
  heading: 'Calculadora do Funil de Leads',
  adSpend: 'Investimento mensal em anúncios ($)',
  rawLeads: 'Total de leads',
  qualifiedLeads: 'Leads qualificados',
  appointments: 'Reuniões agendadas',
  estimates: 'Estimates realizados',
  signedProjects: 'Contratos fechados',
  avgRevenue: 'Receita média por projeto ($)',
  grossMargin: 'Margem bruta (%)',
  calculate: 'Calcular',
  reset: 'Reiniciar',
  resultsHeading: 'Resultados',
  rawCPL: 'Custo por lead',
  costPerQualifiedLead: 'Custo por lead qualificado',
  costPerAppointment: 'Custo por reunião',
  costPerEstimate: 'Custo por estimate',
  cac: 'Custo de aquisição de cliente (CAC)',
  qualificationRate: 'Taxa de qualificação',
  leadToAppointmentRate: 'Taxa de conversão lead → reunião',
  estimateToSaleRate: 'Taxa de estimate → contrato',
  leadToSaleRate: 'Taxa de fechamento geral',
  signedRevenue: 'Receita gerada',
  estimatedGrossProfit: 'Lucro bruto estimado',
  roas: 'ROAS (receita ÷ investimento)',
  grossProfitAfterAds: 'Lucro bruto após investimento em anúncios',
  disclaimer: 'Esta calculadora fornece uma estimativa simplificada de marketing e não substitui uma análise financeira ou contábil.',
  na: 'N/D',
  invalidInputs: 'Por favor, insira valores numéricos válidos maiores que zero onde necessário.',
}

function fmt(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function fmtPct(n: number): string {
  return `${n.toFixed(1)}%`
}

function fmtRoas(n: number): string {
  return `${n.toFixed(2)}x`
}

interface Results {
  rawCPL: number | null
  costPerQualifiedLead: number | null
  costPerAppointment: number | null
  costPerEstimate: number | null
  cac: number | null
  qualificationRate: number | null
  leadToAppointmentRate: number | null
  estimateToSaleRate: number | null
  leadToSaleRate: number | null
  signedRevenue: number | null
  estimatedGrossProfit: number | null
  roas: number | null
  grossProfitAfterAds: number | null
}

function calculate(
  adSpend: number,
  rawLeads: number,
  qualifiedLeads: number,
  appointments: number,
  estimates: number,
  signedProjects: number,
  avgRevenue: number,
  grossMarginPct: number,
): Results {
  const safe = (num: number, denom: number): number | null =>
    denom > 0 ? num / denom : null

  const pct = (num: number, denom: number): number | null =>
    denom > 0 ? (num / denom) * 100 : null

  const signedRevenue = signedProjects > 0 && avgRevenue > 0 ? signedProjects * avgRevenue : null
  const grossMarginDecimal = grossMarginPct / 100
  const estimatedGrossProfit = signedRevenue != null ? signedRevenue * grossMarginDecimal : null
  const roas = signedRevenue != null && adSpend > 0 ? signedRevenue / adSpend : null
  const grossProfitAfterAds = estimatedGrossProfit != null && adSpend > 0 ? estimatedGrossProfit - adSpend : null

  return {
    rawCPL: safe(adSpend, rawLeads),
    costPerQualifiedLead: safe(adSpend, qualifiedLeads),
    costPerAppointment: safe(adSpend, appointments),
    costPerEstimate: safe(adSpend, estimates),
    cac: safe(adSpend, signedProjects),
    qualificationRate: pct(qualifiedLeads, rawLeads),
    leadToAppointmentRate: pct(appointments, rawLeads),
    estimateToSaleRate: pct(signedProjects, estimates),
    leadToSaleRate: pct(signedProjects, rawLeads),
    signedRevenue,
    estimatedGrossProfit,
    roas,
    grossProfitAfterAds,
  }
}

interface ContractorLeadCalculatorProps {
  locale?: Locale
}

export default function ContractorLeadCalculator({ locale = 'en-US' }: ContractorLeadCalculatorProps) {
  const L = locale === 'pt-BR' ? PT : EN
  const uid = useId()

  const [adSpend, setAdSpend] = useState('')
  const [rawLeads, setRawLeads] = useState('')
  const [qualifiedLeads, setQualifiedLeads] = useState('')
  const [appointments, setAppointments] = useState('')
  const [estimates, setEstimates] = useState('')
  const [signedProjects, setSignedProjects] = useState('')
  const [avgRevenue, setAvgRevenue] = useState('')
  const [grossMargin, setGrossMargin] = useState('')
  const [results, setResults] = useState<Results | null>(null)
  const [error, setError] = useState('')

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const spend = parseFloat(adSpend)
    const raw = parseFloat(rawLeads)
    const qualified = parseFloat(qualifiedLeads)
    const appts = parseFloat(appointments)
    const ests = parseFloat(estimates)
    const signed = parseFloat(signedProjects)
    const revenue = parseFloat(avgRevenue)
    const margin = parseFloat(grossMargin)

    if (isNaN(spend) || spend <= 0 || isNaN(raw) || raw <= 0) {
      setError(L.invalidInputs)
      return
    }

    setResults(calculate(
      spend,
      raw,
      isNaN(qualified) ? 0 : qualified,
      isNaN(appts) ? 0 : appts,
      isNaN(ests) ? 0 : ests,
      isNaN(signed) ? 0 : signed,
      isNaN(revenue) ? 0 : revenue,
      isNaN(margin) ? 0 : margin,
    ))
  }

  function handleReset() {
    setAdSpend('')
    setRawLeads('')
    setQualifiedLeads('')
    setAppointments('')
    setEstimates('')
    setSignedProjects('')
    setAvgRevenue('')
    setGrossMargin('')
    setResults(null)
    setError('')
  }

  const currencyRows: Array<{ label: string; value: number | null }> = results ? [
    { label: L.rawCPL, value: results.rawCPL },
    { label: L.costPerQualifiedLead, value: results.costPerQualifiedLead },
    { label: L.costPerAppointment, value: results.costPerAppointment },
    { label: L.costPerEstimate, value: results.costPerEstimate },
    { label: L.cac, value: results.cac },
    { label: L.signedRevenue, value: results.signedRevenue },
    { label: L.estimatedGrossProfit, value: results.estimatedGrossProfit },
    { label: L.grossProfitAfterAds, value: results.grossProfitAfterAds },
  ] : []

  const rateRows: Array<{ label: string; value: number | null; isRoas?: boolean }> = results ? [
    { label: L.qualificationRate, value: results.qualificationRate },
    { label: L.leadToAppointmentRate, value: results.leadToAppointmentRate },
    { label: L.estimateToSaleRate, value: results.estimateToSaleRate },
    { label: L.leadToSaleRate, value: results.leadToSaleRate },
    { label: L.roas, value: results.roas, isRoas: true },
  ] : []

  const inputClass = 'w-full border border-[#D0D5DD] px-3 py-2 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#1565D8] focus:ring-1 focus:ring-[#1565D8] bg-white'
  const labelClass = 'block text-xs font-semibold text-[#3D3D3D] mb-1'

  return (
    <div className="my-10 border border-[#D0D5DD] bg-[#F4F6F8]">
      <div className="px-6 py-5 border-b border-[#D0D5DD] bg-white">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-1">
          {locale === 'pt-BR' ? 'Calculadora' : 'Calculator'}
        </p>
        <h3 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight">{L.heading}</h3>
      </div>

      <form onSubmit={handleCalculate} noValidate className="px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor={`${uid}-adSpend`} className={labelClass}>{L.adSpend}</label>
            <input
              id={`${uid}-adSpend`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={adSpend}
              onChange={(e) => setAdSpend(e.target.value)}
              className={inputClass}
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-rawLeads`} className={labelClass}>{L.rawLeads}</label>
            <input
              id={`${uid}-rawLeads`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={rawLeads}
              onChange={(e) => setRawLeads(e.target.value)}
              className={inputClass}
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-qualifiedLeads`} className={labelClass}>{L.qualifiedLeads}</label>
            <input
              id={`${uid}-qualifiedLeads`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={qualifiedLeads}
              onChange={(e) => setQualifiedLeads(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-appointments`} className={labelClass}>{L.appointments}</label>
            <input
              id={`${uid}-appointments`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={appointments}
              onChange={(e) => setAppointments(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-estimates`} className={labelClass}>{L.estimates}</label>
            <input
              id={`${uid}-estimates`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={estimates}
              onChange={(e) => setEstimates(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-signedProjects`} className={labelClass}>{L.signedProjects}</label>
            <input
              id={`${uid}-signedProjects`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={signedProjects}
              onChange={(e) => setSignedProjects(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-avgRevenue`} className={labelClass}>{L.avgRevenue}</label>
            <input
              id={`${uid}-avgRevenue`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={avgRevenue}
              onChange={(e) => setAvgRevenue(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-grossMargin`} className={labelClass}>{L.grossMargin}</label>
            <input
              id={`${uid}-grossMargin`}
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="any"
              value={grossMargin}
              onChange={(e) => setGrossMargin(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#1565D8] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#1255c0] transition-colors duration-200"
          >
            {L.calculate}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="border border-[#D0D5DD] text-sm font-semibold text-[#667085] px-5 py-2.5 hover:border-[#1565D8] hover:text-[#1565D8] transition-colors duration-200 bg-white"
          >
            {L.reset}
          </button>
        </div>
      </form>

      {results && (
        <div className="px-6 pb-6">
          <h4 className="text-sm font-extrabold text-[#0A0A0A] uppercase tracking-widest mb-4 border-t border-[#D0D5DD] pt-5">
            {L.resultsHeading}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
            <div>
              {currencyRows.map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-[#E5E8EC] last:border-0">
                  <span className="text-xs text-[#667085]">{row.label}</span>
                  <span className="text-sm font-bold text-[#0A0A0A] tabular-nums">
                    {row.value != null ? fmt(row.value) : L.na}
                  </span>
                </div>
              ))}
            </div>
            <div>
              {rateRows.map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-[#E5E8EC] last:border-0">
                  <span className="text-xs text-[#667085]">{row.label}</span>
                  <span className="text-sm font-bold text-[#0A0A0A] tabular-nums">
                    {row.value != null
                      ? row.isRoas
                        ? fmtRoas(row.value)
                        : fmtPct(row.value)
                      : L.na}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-6 pb-5">
        <p className="text-[11px] text-[#9EA5B3] leading-relaxed italic">{L.disclaimer}</p>
      </div>
    </div>
  )
}
