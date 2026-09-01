import { CheckCircle2 } from 'lucide-react'

const services = [
  {
    title: 'Paid Media Management Across the Right Platforms',
    tag: 'Core Service',
    tagColor: 'bg-[#0A0A0A] text-white',
    marketValue: 'US$1,500–3,000/month',
    items: [
      'Google Ads',
      'Microsoft/Bing Ads',
      'Google Local Services Ads',
      'Facebook and Instagram Ads',
      'YouTube Ads',
      'Retargeting',
      'Budget management',
      'Call, form, and lead tracking',
      'Monthly reporting',
    ],
    note: null,
  },
  {
    title: 'CRM Setup & Sales Pipeline Visibility',
    tag: 'Included Bonus',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$2,000–4,000',
    items: [
      'Lead source tracking',
      'Lead stages',
      'Appointment tracking',
      'Estimate tracking',
      'Signed job tracking',
      'Lost opportunity tracking',
    ],
    note: null,
  },
  {
    title: 'Revenue Dashboard',
    tag: 'Included Bonus',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$800–2,000',
    items: [
      'Ad spend',
      'Leads',
      'Estimates',
      'Signed jobs',
      'Revenue',
      'Cost per lead',
      'Cost per customer',
    ],
    note: null,
  },
  {
    title: 'Email Follow-Up Automation',
    tag: 'Included Bonus',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$750–1,500',
    items: [
      'New lead follow-up',
      'Missed call follow-up',
      'Estimate reminders',
      'Appointment reminders',
      'Old lead reactivation',
    ],
    note: null,
  },
  {
    title: 'Conversion-Focused Website Support',
    tag: 'Included Bonus',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$750–2,500',
    items: [
      'Landing page recommendations',
      'Form improvements',
      'Call button improvements',
      'Estimate request pages',
      'Conversion tracking',
    ],
    note: 'Full website redesigns and custom landing pages are quoted separately.',
  },
  {
    title: 'Local SEO Foundation',
    tag: 'Included Bonus',
    tagColor: 'bg-[#1565D8] text-white',
    marketValue: 'US$1,000–2,500',
    items: [
      'Local SEO audit',
      'Service-page priorities',
      'Keyword opportunities',
      'Technical issue review',
      'Local visibility roadmap',
    ],
    note: 'Ongoing SEO content production and link building are not included.',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F4F6F8]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              What You Get
            </span>
          </div>
          <h2 id="services-heading" className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance">
            What You Get
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-[#D0D5DD] p-6 relative flex flex-col group hover:border-[#1565D8]/40 transition-colors duration-200"
            >
              {/* Corner mark */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#1565D8]/20 group-hover:border-[#1565D8]/50 transition-colors" />

              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${service.tagColor}`}>
                  {service.tag}
                </span>
                <span className="text-[10px] text-[#667085] font-medium">
                  Market: {service.marketValue}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-[#0A0A0A] leading-snug mb-5">
                {service.title}
              </h3>

              {/* Items */}
              <ul className="space-y-2 flex-1">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-[#667085]">
                    <CheckCircle2 size={13} className="text-[#1565D8] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Note */}
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
