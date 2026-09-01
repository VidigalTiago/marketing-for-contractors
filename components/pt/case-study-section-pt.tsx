'use client'

import {
  BarChart, Bar, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const results = [
  { value: 'US$408K+', label: 'Gerenciado em Publicidade' },
  { value: 'US$9.6M+', label: 'Receita Rastreada' },
  { value: '158', label: 'Projetos Fechados' },
  { value: 'US$1M+', label: 'Melhor Mês' },
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

export default function CaseStudySectionPT() {
  return (
    <section id="results" className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dark" />
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
              Estudo de Caso
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance max-w-3xl">
            Escalando uma Empresa de Reforma Residencial de Alto Valor em Boston
          </h2>
        </div>

        {/* Narrative */}
        <div className="border border-white/10 bg-white/5 p-6 lg:p-10 mb-14 space-y-5">
          <p className="text-sm text-white/70 leading-relaxed">
            Este foi nosso primeiro caso de Empreiteiro Geral nos Estados Unidos, iniciado em{' '}
            <strong className="text-white font-semibold">maio de 2022</strong>. O cliente se tornou um dos nossos maiores defensores — ele entendeu a metodologia, reconheceu que o trabalho é uma verdadeira parceria e manteve o comprometimento em todas as fases do projeto. Os primeiros meses não foram fáceis. Houve desafios, atritos e discordâncias reais. Mas com paciência e estrutura, encontramos as alavancas que fizeram o negócio crescer.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            No primeiro ano, o foco era em uma pequena construtora especializada em{' '}
            <span className="text-[#1565D8] font-semibold">Telhado e Revestimento</span>, com resultados limitados e um histórico negativo com agências anteriores. Entramos na estratégia e, ao resolver os desafios iniciais, percebemos que a{' '}
            <span className="text-[#1565D8] font-semibold">landing page não estava convertendo</span>{' '}
            para o segmento. Reconstruímos o site, o que melhorou imediatamente a conversão de lead para orçamento. Também identificamos que a maior demanda — e o maior ticket — estava em{' '}
            <span className="text-[#1565D8] font-semibold">reforma de interiores</span>, o que nos levou a mudar a estratégia no segundo ano para Cozinha, Banheiro e Ampliações.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            Essa mudança de direção provou ser a decisão certa. Os anúncios de reforma de interiores tinham o mesmo custo por clique que Telhado e Revestimento, mas o valor médio do contrato era significativamente maior. No mesmo período, identificamos que a equipe de vendas estava perdendo negócios por{' '}
            <span className="text-[#1565D8] font-semibold">precificação não competitiva</span> — subcontratados estavam cortando margens. Respondemos com um{' '}
            <strong className="text-white font-semibold">reposicionamento completo de marca</strong>: nova identidade visual, novo conteúdo, nova presença digital e uma parceria com uma agência local de fotografia para elevar a autoridade percebida da marca.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            Na estratégia, implementamos{' '}
            <span className="text-[#1565D8] font-semibold">automações de e-mail marketing</span>{' '}
            com sequências de nutrição segmentadas para cada funil de aquisição. Mapeamos as cidades com as maiores taxas de conversão e aplicamos{' '}
            <strong className="text-white font-semibold">regras de valor de lance</strong> por localização nas contas de anúncios. Também recomendamos que o cliente relocasse seu escritório para uma área de maior renda — alinhando sua presença física com o perfil de comprador que ele estava segmentando.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            Uma das descobertas mais impactantes veio de uma pesquisa de mercado mais profunda: o cliente ideal para{' '}
            <span className="text-[#1565D8] font-semibold">Ampliações</span> é um proprietário de imóvel em uma propriedade multigeracional ou herdada — alguém que tem uma boa casa, mas sem liquidez suficiente para comprar uma nova. Esses contratos geralmente variam entre{' '}
            <strong className="text-white font-semibold">$200.000 e $500.000</strong>. Reestruturamos campanhas e mensagens em torno desse insight, o que impulsionou uma aceleração significativa em volume e tamanho de contrato.
          </p>

          <div className="border-l-2 border-[#1565D8] bg-[#1565D8]/10 px-5 py-4 mt-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1565D8] mb-2">Resultado Final</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Com todas essas estratégias combinadas, escalamos o negócio de uma{' '}
              <strong className="text-white">meta de $200K/mês para mais de $600K/mês</strong>. Em{' '}
              <strong className="text-white">fevereiro de 2025</strong>, o cliente registrou um mês recorde de mais de{' '}
              <strong className="text-white">$1 milhão em um único mês</strong>. Até novembro de 2025, a receita anual acumulada já havia ultrapassado{' '}
              <strong className="text-white">$5,1 milhões em apenas 11 meses</strong> — tornando-o o ano mais bem-sucedido na história da empresa.
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">
                Evolução da Receita Anual
              </p>
              <p className="text-sm text-white/70 leading-snug">
                Crescimento exponencial de Mai/2022 a Nov/2025
              </p>
            </div>
            <div className="flex items-center gap-2 border border-[#1565D8]/40 px-3 py-1.5 self-start">
              <TrendingUp size={12} className="text-[#1565D8]" />
              <span className="text-xs font-bold text-[#1565D8]">+1.612% em 3 anos</span>
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
                  <p className="text-xs text-white/30">Início</p>
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
                  formatter={(v: number) => [formatRevenue(v), 'Receita']}
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
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Melhor Ano</p>
              <p className="text-sm font-bold text-[#1565D8]">2025: $5,19M em 11 meses</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Crescimento Médio</p>
              <p className="text-sm font-bold text-white">+191% ao ano</p>
            </div>
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Crescimento Total</p>
              <p className="text-sm font-bold text-[#1565D8]">+1.612% desde 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
