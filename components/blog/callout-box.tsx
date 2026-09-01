interface CalloutBoxProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'tip'
  label?: string
}

const styles = {
  info: {
    border: 'border-[#1565D8]/30',
    bg: 'bg-[#1565D8]/5',
    label: 'text-[#1565D8]',
    bar: 'bg-[#1565D8]',
  },
  warning: {
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    label: 'text-orange-600',
    bar: 'bg-orange-400',
  },
  tip: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    label: 'text-green-700',
    bar: 'bg-green-500',
  },
}

export default function CalloutBox({ children, type = 'info', label }: CalloutBoxProps) {
  const s = styles[type]
  const defaultLabel = type === 'info' ? 'Key Insight' : type === 'warning' ? 'Watch Out' : 'Pro Tip'

  return (
    <aside className={`my-8 border ${s.border} ${s.bg} rounded-sm relative overflow-hidden`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar}`} />
      <div className="px-5 py-4 pl-6">
        <p className={`text-[10px] font-semibold uppercase tracking-widest ${s.label} mb-2`}>
          {label ?? defaultLabel}
        </p>
        <div className="text-sm text-[#0A0A0A] leading-relaxed [&>p]:m-0">
          {children}
        </div>
      </div>
    </aside>
  )
}
