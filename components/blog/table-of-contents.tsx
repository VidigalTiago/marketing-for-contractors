'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SupportedLocale } from '@/lib/articles'
import { getBlogUI } from '@/lib/i18n'

export interface TocItem {
  id: string
  label: string
  level: 2 | 3
}

interface TableOfContentsProps {
  items: TocItem[]
  locale?: SupportedLocale
  /** 'mobile' renders only the collapsible bar. 'desktop' renders only the sticky sidebar. Default renders both. */
  variant?: 'mobile' | 'desktop' | 'both'
}

export default function TableOfContents({ items, locale = 'en-US', variant = 'both' }: TableOfContentsProps) {
  const ui = getBlogUI(locale)
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile: collapsible */}
      <nav
        className={`${variant === 'desktop' ? 'hidden' : 'lg:hidden'} border border-[#D0D5DD] bg-[#F4F6F8] mb-8`}
        aria-label="Table of contents"
      >
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#0A0A0A]"
          aria-expanded={mobileOpen}
        >
          {ui.tableOfContents}
          <ChevronDown
            size={16}
            className={`text-[#667085] transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {mobileOpen && (
          <ol className="px-4 pb-4 flex flex-col gap-2 border-t border-[#D0D5DD] pt-3">
            {items.map((item) => (
              <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                <button
                  onClick={() => handleClick(item.id)}
                  className="text-sm text-[#667085] hover:text-[#1565D8] transition-colors text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        )}
      </nav>

      {/* Desktop: sticky sidebar */}
      <nav
        className={`${variant === 'mobile' ? 'hidden' : 'hidden lg:block'} sticky top-28 self-start`}
        aria-label="Table of contents"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#667085] mb-3">
          On this page
        </p>
        <ol className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-xs text-left leading-snug transition-colors duration-150 hover:text-[#1565D8] ${
                  activeId === item.id
                    ? 'text-[#1565D8] font-semibold'
                    : 'text-[#667085]'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
