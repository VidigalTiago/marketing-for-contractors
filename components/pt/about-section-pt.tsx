import { TrendingUp, Database, BarChart2 } from 'lucide-react'
import Image from 'next/image'

const capabilities = [
  {
    icon: TrendingUp,
    title: 'Publicidade Paga',
    desc: 'Google, Meta, Bing, YouTube e mais — gerenciados para atrair leads qualificados.',
  },
  {
    icon: Database,
    title: 'Sistemas de Vendas e CRM',
    desc: 'Visibilidade do pipeline desde o primeiro contato até o contrato assinado.',
  },
  {
    icon: BarChart2,
    title: 'Rastreamento de Receita',
    desc: 'Dashboards que mostram de onde vem a sua receita de verdade.',
  },
]

const platforms = [
  'Google Ads', 'Meta Ads', 'Bing Ads', 'YouTube', 'TikTok', 'LinkedIn',
]

export default function AboutSectionPT() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — portrait */}
          <div className="relative">
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
              <div className="absolute bottom-4 left-4 flex items-center gap-1 opacity-50">
                <div className="h-px w-8 bg-[#1565D8]" />
                <span className="text-[9px] font-mono text-[#1565D8] uppercase tracking-widest">Perfil</span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 border border-[#D0D5DD] bg-white px-4 py-2.5">
              <div className="w-2 h-2 bg-[#1565D8]" />
              <span className="text-xs font-semibold text-[#0A0A0A]">Mais de US$20M em Verba Gerenciada</span>
            </div>
          </div>

          {/* Right — content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-[#1565D8]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
                  Sobre
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-6">
                Conheça Seu Parceiro de Crescimento
              </h2>
              <div className="space-y-4 text-[#667085] text-base leading-relaxed">
                <p>
                  Sou Tiago Vidigal, profissional de Growth Marketing e Dados com mais de 10 anos de experiência ajudando empresas a crescerem em B2B, e-commerce, serviços de alto valor e construção residencial.
                </p>
                <p>
                  Ao longo da minha carreira, gerenciei mais de US$20M em mídia paga no Google, Bing, Meta, LinkedIn, TikTok, YouTube e outros canais. Meu trabalho combina aquisição paga, analytics, otimização de conversão, CRM, previsão e alinhamento com vendas.
                </p>
                <p>
                  Um dos projetos que liderei foi para uma empresa americana de reforma residencial. Ajudei a construir o sistema completo por trás do crescimento: campanhas de mídia paga, landing pages, rastreamento, qualificação de leads, estrutura de CRM, relatórios de pipeline de vendas e otimização com base na receita fechada. O resultado foi um motor de aquisição escalável que sustentou o crescimento de uma operação inicial para mais de US$1M em receita atribuída mensalmente.
                </p>
                <p>
                  Para empreiteiros, aplico essa mesma experiência para ajudar a gerar leads melhores, melhorar o acompanhamento, identificar o que impulsiona as vendas e fechar mais projetos lucrativos.
                </p>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#667085] mb-3">
                Plataformas Gerenciadas
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
