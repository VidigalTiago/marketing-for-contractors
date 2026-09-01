'use client'

import { useState } from 'react'

type Locale = 'en-US' | 'pt-BR'

interface Stage {
  label: string
  objective: string
  action: string
  channels: string
  crmStatus: string
  metric: string
}

interface TimelineLabels {
  heading: string
  subheading: string
  objectiveLabel: string
  actionLabel: string
  channelsLabel: string
  crmStatusLabel: string
  metricLabel: string
  stages: Stage[]
}

const EN: TimelineLabels = {
  heading: 'The Contractor Lead Follow-Up Funnel',
  subheading: 'Select a stage to see its objective, recommended action, channels, CRM status, and the metric to track.',
  objectiveLabel: 'Objective',
  actionLabel: 'Recommended action',
  channelsLabel: 'Communication channels',
  crmStatusLabel: 'CRM status',
  metricLabel: 'Metric to track',
  stages: [
    {
      label: 'New Lead',
      objective: 'Capture the inquiry with its source before any contact is attempted.',
      action: 'Log the lead automatically with source, UTM, and contact details as soon as it arrives.',
      channels: 'Website form, phone call, Google Ads, Local Services Ads',
      crmStatus: 'New Lead',
      metric: 'Total leads by source',
    },
    {
      label: 'Contacted',
      objective: 'Acknowledge the inquiry quickly and establish human contact.',
      action: 'Send an automated confirmation, then place a call or send a message as soon as practical.',
      channels: 'Phone, SMS, email',
      crmStatus: 'Attempting Contact / Contacted',
      metric: 'Contact rate, average response time',
    },
    {
      label: 'Qualification',
      objective: 'Confirm the project fits the company before investing more sales time.',
      action: 'Ask about project type, location, timeline, and scope during the call.',
      channels: 'Phone, in-person conversation',
      crmStatus: 'Qualified',
      metric: 'Qualification rate',
    },
    {
      label: 'Appointment',
      objective: 'Schedule and confirm an in-person or virtual visit.',
      action: 'Send booking confirmation and a reminder before the scheduled time.',
      channels: 'SMS, email, calendar invite',
      crmStatus: 'Appointment Scheduled',
      metric: 'Appointment rate, show rate',
    },
    {
      label: 'Estimate',
      objective: 'Deliver a scoped estimate based on the site visit or consultation.',
      action: 'Prepare and send the estimate with a defined follow-up date attached.',
      channels: 'Email, in-person, phone',
      crmStatus: 'Estimate Scheduled / Sent',
      metric: 'Estimate rate',
    },
    {
      label: 'Proposal',
      objective: 'Help the prospect evaluate the proposal and move toward a decision.',
      action: 'Confirm receipt, then follow up on scope, budget, and decision timing.',
      channels: 'Phone, email, SMS',
      crmStatus: 'Proposal Sent / Negotiation',
      metric: 'Proposal-to-sale rate',
    },
    {
      label: 'Closed',
      objective: 'Record the outcome and connect it back to the original lead source.',
      action: 'Mark the opportunity Won or Lost, record the reason, and log signed revenue.',
      channels: 'CRM record update',
      crmStatus: 'Won / Lost / Long-Term Nurture',
      metric: 'Lead-to-sale rate, revenue by source',
    },
  ],
}

const PT: TimelineLabels = {
  heading: 'O Funil de Follow-Up de Leads para Contractors',
  subheading: 'Selecione uma etapa para ver o objetivo, a ação recomendada, os canais, o status no CRM e a métrica a acompanhar.',
  objectiveLabel: 'Objetivo',
  actionLabel: 'Ação recomendada',
  channelsLabel: 'Canais de comunicação',
  crmStatusLabel: 'Status no CRM',
  metricLabel: 'Métrica a acompanhar',
  stages: [
    {
      label: 'Novo Lead',
      objective: 'Capturar a solicitação com sua origem antes de qualquer tentativa de contato.',
      action: 'Registrar o lead automaticamente com origem, UTM e dados de contato logo que ele chega.',
      channels: 'Formulário do site, ligação, Google Ads, Local Services Ads',
      crmStatus: 'Novo Lead',
      metric: 'Total de leads por origem',
    },
    {
      label: 'Contato Feito',
      objective: 'Reconhecer a solicitação rapidamente e estabelecer contato humano.',
      action: 'Enviar uma confirmação automática e depois ligar ou enviar uma mensagem o mais breve possível.',
      channels: 'Telefone, SMS, email',
      crmStatus: 'Tentando Contato / Contato Feito',
      metric: 'Taxa de contato, tempo médio de resposta',
    },
    {
      label: 'Qualificação',
      objective: 'Confirmar que o projeto é adequado para a empresa antes de investir mais tempo comercial.',
      action: 'Perguntar sobre tipo de projeto, localização, timeline e escopo durante a ligação.',
      channels: 'Telefone, conversa presencial',
      crmStatus: 'Qualificado',
      metric: 'Taxa de qualificação',
    },
    {
      label: 'Agendamento',
      objective: 'Agendar e confirmar uma visita presencial ou virtual.',
      action: 'Enviar confirmação de agendamento e um reminder antes do horário marcado.',
      channels: 'SMS, email, convite de agenda',
      crmStatus: 'Reunião Agendada',
      metric: 'Taxa de agendamento, taxa de comparecimento',
    },
    {
      label: 'Estimate',
      objective: 'Entregar um estimate com escopo definido com base na visita ou consulta.',
      action: 'Preparar e enviar o estimate com uma data de follow-up já definida.',
      channels: 'Email, presencial, telefone',
      crmStatus: 'Estimate Agendado / Enviado',
      metric: 'Taxa de estimates',
    },
    {
      label: 'Proposta',
      objective: 'Ajudar o prospect a avaliar a proposta e avançar para uma decisão.',
      action: 'Confirmar o recebimento e depois fazer follow-up sobre escopo, orçamento e prazo de decisão.',
      channels: 'Telefone, email, SMS',
      crmStatus: 'Proposta Enviada / Negociação',
      metric: 'Taxa de proposta-para-venda',
    },
    {
      label: 'Fechado',
      objective: 'Registrar o resultado e conectá-lo de volta à origem do lead.',
      action: 'Marcar a oportunidade como Ganha ou Perdida, registrar o motivo e a receita assinada.',
      channels: 'Atualização no registro do CRM',
      crmStatus: 'Ganho / Perdido / Nurture de Longo Prazo',
      metric: 'Taxa de lead-para-venda, receita por origem',
    },
  ],
}

export default function ContractorFollowUpTimeline({ locale = 'en-US' }: { locale?: Locale }) {
  const t = locale === 'pt-BR' ? PT : EN
  const [activeIndex, setActiveIndex] = useState(0)
  const active = t.stages[activeIndex]

  return (
    <div className="my-10 border border-[#D0D5DD] bg-white">
      <div className="px-5 sm:px-6 py-5 border-b border-[#F4F6F8]">
        <h3 className="text-lg font-extrabold text-[#0A0A0A] tracking-tight mb-1 text-balance">
          {t.heading}
        </h3>
        <p className="text-sm text-[#667085] leading-relaxed">{t.subheading}</p>
      </div>

      {/* Stage selector — horizontally scrollable on mobile, wraps on desktop */}
      <div
        role="tablist"
        aria-label={t.heading}
        className="flex flex-wrap gap-2 px-5 sm:px-6 py-4 border-b border-[#F4F6F8] bg-[#F4F6F8]"
      >
        {t.stages.map((stage, i) => (
          <button
            key={stage.label}
            role="tab"
            type="button"
            aria-selected={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 border ${
              i === activeIndex
                ? 'bg-[#1565D8] text-white border-[#1565D8]'
                : 'bg-white text-[#667085] border-[#D0D5DD] hover:border-[#1565D8] hover:text-[#1565D8]'
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                i === activeIndex ? 'bg-white text-[#1565D8]' : 'bg-[#F4F6F8] text-[#667085]'
              }`}
            >
              {i + 1}
            </span>
            {stage.label}
          </button>
        ))}
      </div>

      {/* Active stage detail panel — also serves as SSR fallback content */}
      <div role="tabpanel" className="px-5 sm:px-6 py-6">
        <h4 className="text-base font-bold text-[#0A0A0A] mb-4">{active.label}</h4>
        <dl className="grid sm:grid-cols-2 gap-5">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-1.5">
              {t.objectiveLabel}
            </dt>
            <dd className="text-sm text-[#0A0A0A] leading-relaxed">{active.objective}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-1.5">
              {t.actionLabel}
            </dt>
            <dd className="text-sm text-[#0A0A0A] leading-relaxed">{active.action}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-1.5">
              {t.channelsLabel}
            </dt>
            <dd className="text-sm text-[#0A0A0A] leading-relaxed">{active.channels}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-1.5">
              {t.crmStatusLabel}
            </dt>
            <dd className="text-sm text-[#0A0A0A] leading-relaxed">{active.crmStatus}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8] mb-1.5">
              {t.metricLabel}
            </dt>
            <dd className="text-sm text-[#0A0A0A] leading-relaxed">{active.metric}</dd>
          </div>
        </dl>
      </div>

      {/* Server-rendered fallback: full list, visually hidden once JS/CSS renders the tabs above but present in the DOM for crawlers and no-JS clients */}
      <noscript>
        <div className="px-5 sm:px-6 py-6 border-t border-[#F4F6F8]">
          {t.stages.map((stage) => (
            <div key={stage.label} className="mb-6 last:mb-0">
              <h4 className="text-sm font-bold text-[#0A0A0A] mb-2">{stage.label}</h4>
              <p className="text-sm text-[#667085] leading-relaxed">
                {t.objectiveLabel}: {stage.objective}
              </p>
            </div>
          ))}
        </div>
      </noscript>
    </div>
  )
}
