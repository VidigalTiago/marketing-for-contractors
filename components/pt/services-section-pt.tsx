import { CheckCircle2 } from 'lucide-react'

const services = [
  {
    title: 'Gestão de Mídia Paga nas Plataformas Certas',
    tag: 'Serviço Principal',
    tagColor: 'bg-[#0A0A0A] text-white',
    marketValue: 'US$1.500–3.000/mês',
    items: [
      'Google Ads',
      'Microsoft/Bing Ads',
      'Google Local Services Ads',
      'Facebook e Instagram Ads',
      'YouTube Ads',
      'Retargeting',
      'Gestão de orçamento',
      'Rastreamento de chamadas, formulários e leads',
      'Relatório mensal',
    ],
    note: null,
  },
  {
    title: 'Configuração de CRM e Visibilidade do Pipeline de Vendas',
    tag: 'Bônus Incluído',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$2.000–4.000',
    items: [
      'Rastreamento da origem do lead',
      'Etapas do lead',
      'Rastreamento de agendamentos',
      'Rastreamento de orçamentos',
      'Rastreamento de projetos assinados',
      'Rastreamento de oportunidades perdidas',
    ],
    note: null,
  },
  {
    title: 'Dashboard de Receita',
    tag: 'Bônus Incluído',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$800–2.000',
    items: [
      'Verba de anúncios',
      'Leads',
      'Orçamentos',
      'Projetos assinados',
      'Receita',
      'Custo por lead',
      'Custo por cliente',
    ],
    note: null,
  },
  {
    title: 'Automação de Follow-Up por E-mail',
    tag: 'Bônus Incluído',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$750–1.500',
    items: [
      'Follow-up de novo lead',
      'Follow-up de chamada perdida',
      'Lembretes de orçamento',
      'Lembretes de agendamento',
      'Reativação de leads antigos',
    ],
    note: null,
  },
  {
    title: 'Suporte ao Site Focado em Conversão',
    tag: 'Bônus Incluído',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$750–2.500',
    items: [
      'Recomendações de landing page',
      'Melhorias de formulário',
      'Melhorias no botão de ligação',
      'Páginas de solicitação de orçamento',
      'Rastreamento de conversão',
    ],
    note: 'Redesign completo do site e landing pages personalizadas são cotados separadamente.',
  },
  {
    title: 'Base de SEO Local',
    tag: 'Bônus Incluído',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$1.000–2.500',
    items: [
      'Auditoria de SEO local',
      'Prioridades de páginas de serviço',
      'Oportunidades de palavras-chave',
      'Revisão de problemas técnicos',
      'Roadmap de visibilidade local',
    ],
    note: 'Produção contínua de conteúdo SEO e link building não estão incluídos.',
  },
]

export default function ServicesSectionPT() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              O Que Você Recebe
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance">
            O Que Você Recebe
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-[#D0D5DD] p-6 relative flex flex-col group hover:border-[#1565D8]/40 transition-colors duration-200"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#1565D8]/20 group-hover:border-[#1565D8]/50 transition-colors" />

              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${service.tagColor}`}>
                  {service.tag}
                </span>
                <span className="text-[10px] text-[#667085] font-medium">
                  Mercado: {service.marketValue}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0A0A0A] leading-snug mb-5">
                {service.title}
              </h3>

              <ul className="space-y-2 flex-1">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-[#667085]">
                    <CheckCircle2 size={13} className="text-[#1565D8] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>

              {service.note && (
                <p className="mt-4 text-[11px] text-[#667085] border-t border-[#D0D5DD] pt-3 leading-relaxed">
                  {service.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
