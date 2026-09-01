'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarPTProps {
  onCTAClick: () => void
}

export default function NavbarPT({ onCTAClick }: NavbarPTProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Sobre', href: '/br/#about' },
    { label: 'Para quem é', href: '/br/#segments' },
    { label: 'O que você recebe', href: '/br/#services' },
    { label: 'Investimento', href: '/br/#investment' },
  ]

  return (
    <header
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="/br" className="flex items-center">
            <Image
              src="/logo-lockup.svg"
              alt="Marketing for Contractors"
              width={500}
              height={128}
              className="h-12 w-auto object-contain lg:h-14"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#667085] hover:text-foreground transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/br/blog"
              className="text-sm text-[#667085] hover:text-foreground transition-colors duration-200 font-medium"
            >
              Recursos
            </Link>
          </nav>

          {/* Language switcher — mostra idioma atual, link leva para EN */}
          <Link
            href="/"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#1565D8] transition-colors duration-200 border border-[#D0D5DD] px-3 py-1.5 hover:border-[#1565D8]"
            aria-label="Read in English"
          >
            <Globe size={13} />
            PT
          </Link>

          {/* Desktop CTA */}
          <button
            onClick={onCTAClick}
            className="hidden lg:flex items-center gap-2 bg-[#1565D8] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#1255c0] transition-colors duration-200"
          >
            Iniciar Consulta
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[#667085] hover:text-foreground transition-colors font-medium py-1"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/br/blog"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#667085] hover:text-[#1565D8] transition-colors font-medium py-1 border-t border-[#F4F6F8] pt-4"
            >
              Recursos
            </Link>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 text-sm text-[#667085] hover:text-[#1565D8] transition-colors font-medium py-1.5 border-t border-[#F4F6F8] pt-4"
            >
              <Globe size={14} />
              PT
            </Link>
            <button
              onClick={() => { setMobileOpen(false); onCTAClick() }}
              className="mt-2 bg-[#1565D8] text-white text-sm font-semibold px-5 py-3 hover:bg-[#1255c0] transition-colors text-center"
            >
              Iniciar Consulta
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
