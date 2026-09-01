'use client'

import { Search } from 'lucide-react'

interface BlogSearchProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export default function BlogSearch({ value, onChange, placeholder = 'Search contractor marketing articles' }: BlogSearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <label htmlFor="blog-search" className="sr-only">
        {placeholder}
      </label>
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D0D5DD] pointer-events-none"
        aria-hidden="true"
      />
      <input
        id="blog-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#D0D5DD] bg-white pl-9 pr-4 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors"
      />
    </div>
  )
}
