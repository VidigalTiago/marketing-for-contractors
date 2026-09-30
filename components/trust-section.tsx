'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const clients = [
  // Ocultado temporariamente
  // { name: 'AIM Construction', logo: '/clients/aim-constr.png' },
  { name: 'Winterhill Builders', logo: '/clients/winterhill-builders.png' },
  { name: 'Home Identity', logo: '/clients/home-identity.png' },
  { name: 'Top GM Construction', logo: '/clients/top-gm-construction.png' },
  { name: 'Forma Construction', logo: '/logos/forma-construction.webp' },
]

const VISIBLE = 4
const INTERVAL = 3000

export default function TrustSection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % clients.length)
        setAnimating(false)
      }, 300)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const visible = Array.from({ length: VISIBLE }, (_, i) => clients[(current + i) % clients.length])

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              Social Proof
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance">
            Companies That Trust My Work
          </h2>
        </div>

        {/* Logo carousel */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 transition-opacity duration-300"
          style={{ opacity: animating ? 0 : 1 }}
        >
          {visible.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
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

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {clients.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ver cliente ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                i === current ? 'bg-[#1565D8]' : 'bg-[#D0D5DD]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
