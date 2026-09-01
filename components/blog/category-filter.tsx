'use client'

interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <nav aria-label="Article categories" className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          aria-pressed={active === cat}
          className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 border ${
            active === cat
              ? 'bg-[#1565D8] text-white border-[#1565D8]'
              : 'bg-white text-[#667085] border-[#D0D5DD] hover:border-[#1565D8] hover:text-[#1565D8]'
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  )
}
