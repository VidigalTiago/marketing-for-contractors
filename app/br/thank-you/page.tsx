'use client'

import NavbarPT from '@/components/pt/navbar-pt'
import FooterPT from '@/components/pt/footer-pt'
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'

const WHATSAPP_URL = `https://wa.me/5531995745199?text=${encodeURIComponent('Olá! Acabei de enviar minhas informações e gostaria de conversar sobre como crescer meu negócio de construção.')}`

export default function ThankYouBRPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarPT onCTAClick={() => window.open(WHATSAPP_URL, '_blank')} />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl w-full text-center">

          {/* Check icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 border border-[#1565D8]/30 bg-[#1565D8]/8 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[#1565D8]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-8 bg-[#1565D8]" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
              Envio Confirmado
            </span>
            <div className="h-px w-8 bg-[#1565D8]" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-5">
            Obrigado por Entrar em Contato
          </h1>

          {/* Body */}
          <p className="text-[#667085] text-base leading-relaxed mb-3">
            Recebemos suas informações e entraremos em contato em breve.
          </p>
          <p className="text-[#667085] text-base leading-relaxed mb-10">
            Se preferir conversar antes ou tiver alguma dúvida, pode nos chamar diretamente pelo WhatsApp.
          </p>

          {/* Divider */}
          <div className="border-t border-[#D0D5DD] mb-10" />

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1565D8] text-white font-semibold px-7 py-4 text-sm hover:bg-[#1255c0] transition-colors duration-200"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
            <ArrowRight size={16} />
          </a>

          {/* Back link */}
          <div className="mt-8">
            <a
              href="/br"
              className="text-xs text-[#667085] hover:text-[#0A0A0A] transition-colors duration-200 uppercase tracking-widest font-medium"
            >
              Voltar para o Início
            </a>
          </div>

        </div>
      </main>

      <FooterPT />
    </div>
  )
}
