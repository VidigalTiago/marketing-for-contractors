'use client'

import Image from 'next/image'

const clients = [
  // Ocultado temporariamente
  // { name: 'AIM Construction', logo: '/clients/aim-constr.png' },
  { name: 'Winterhill Builders', logo: '/clients/winterhill-builders.png' },
  { name: 'Home Identity', logo: '/clients/home-identity.png' },
  { name: 'Top GM Construction', logo: '/clients/top-gm-construction.png' },
]

export default function TrustSectionPT() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              Prova Social
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance">
            Empresas que Confiam no Meu Trabalho
          </h2>
        </div>

        {/* Logo grid */}
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {clients.map((client, i) => (
              <div
                key={i}
                className="flex items-center justify-center py-6 lg:py-8 px-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={80}
                    height={80}
                    className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-[9px] font-semibold text-[#D0D5DD] tracking-wide text-center uppercase">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
