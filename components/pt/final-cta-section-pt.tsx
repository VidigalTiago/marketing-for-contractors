'use client'

import { ArrowRight } from 'lucide-react'

interface FinalCTASectionPTProps {
  onCTAClick: () => void
}

export default function FinalCTASectionPT({ onCTAClick }: FinalCTASectionPTProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dark" />

      <div className="absolute top-8 left-8 w-10 h-10 border-l-2 border-t-2 border-[#1565D8]/30" />
      <div className="absolute top-8 right-8 w-10 h-10 border-r-2 border-t-2 border-[#1565D8]/30" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-l-2 border-b-2 border-[#1565D8]/30" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-r-2 border-b-2 border-[#1565D8]/30" />

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="h-px w-16 bg-[#1565D8]/20" />
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="h-px w-16 bg-[#1565D8]/20" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 border border-[#1565D8]/40 px-3 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 bg-[#1565D8]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
            Comece Hoje
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance mb-6">
          Pronto para Conseguir Mais Leads Qualificados para a sua Construtora?
        </h2>

        <p className="text-[#667085] text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Construa um sistema de marketing que ajude você a gerar leads melhores, rastrear orçamentos e entender o que está impulsionando a receita.
        </p>

        <button
          onClick={onCTAClick}
          className="inline-flex items-center gap-2 bg-[#1565D8] text-white font-semibold px-8 py-4 text-sm hover:bg-[#1255c0] transition-colors duration-200 mb-5"
        >
          Iniciar Consulta
          <ArrowRight size={16} />
        </button>

        <p className="text-xs text-white/25">
          Disponibilidade limitada para novos parceiros de construção.
        </p>
      </div>
    </section>
  )
}
