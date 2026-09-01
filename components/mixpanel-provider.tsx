'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { initMixpanel, trackEvent } from '@/lib/mixpanel'

export default function MixpanelProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initMixpanel()
  }, [])

  useEffect(() => {
    trackEvent('page_viewed', {
      path: pathname,
      search: searchParams.toString(),
      referrer: document.referrer || undefined,
    })
  }, [pathname, searchParams])

  return null
}
