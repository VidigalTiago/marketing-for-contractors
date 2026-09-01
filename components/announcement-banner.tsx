'use client'

interface AnnouncementBannerProps {
  message?: string
}

export default function AnnouncementBanner({ message }: AnnouncementBannerProps) {
  const text = message ?? 'Only 4 spots available right now for new clients.'

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white overflow-hidden h-8">
      <div className="flex items-center h-full">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-xs font-semibold uppercase tracking-widest">
              {text}
              <span className="mx-6 opacity-50">—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
