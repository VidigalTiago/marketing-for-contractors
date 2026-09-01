import {
  Home,
  Layers,
  TreePine,
  ChefHat,
  Bath,
  Grid3x3,
  PlusSquare,
  Building2,
} from 'lucide-react'

const categories = [
  { icon: Home, label: 'Roofing' },
  { icon: Layers, label: 'Siding' },
  { icon: TreePine, label: 'Decking' },
  { icon: ChefHat, label: 'Kitchen Remodeling' },
  { icon: Bath, label: 'Bathroom Remodeling' },
  { icon: Grid3x3, label: 'Flooring' },
  { icon: PlusSquare, label: 'Home Additions' },
  { icon: Building2, label: 'Custom Homes' },
]

export default function BuiltForSection() {
  return (
    <section id="segments" className="py-20 lg:py-28 bg-[#F4F6F8]" aria-labelledby="segments-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#1565D8]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1565D8]">
              Who This Is For
            </span>
          </div>
          <h2 id="segments-heading" className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A0A0A] text-balance mb-4">
            Built for Residential Construction Companies
          </h2>
          <p className="text-[#667085] text-base lg:text-lg leading-relaxed">
            This system is designed for contractors and builders selling high-value projects.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#D0D5DD] border border-[#D0D5DD]">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-white p-6 lg:p-8 flex flex-col items-start gap-4 group hover:bg-[#F4F6F8] transition-colors duration-200 relative"
            >
              {/* Micro corner */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#1565D8]/20 group-hover:border-[#1565D8]/50 transition-colors" />

              <div className="p-2.5 border border-[#D0D5DD] bg-[#F4F6F8] group-hover:border-[#1565D8]/30 group-hover:bg-[#1565D8]/5 transition-colors duration-200">
                <cat.icon size={20} className="text-[#0A0A0A] group-hover:text-[#1565D8] transition-colors duration-200" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-[#0A0A0A] leading-tight">
                {cat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-sm text-[#667085]">
          Whether you run crews of 5 or 50 — if your business depends on winning high-value residential projects, this system is built for you.
        </p>
      </div>
    </section>
  )
}
