import mixpanel from 'mixpanel-browser'

const TOKEN = 'f0a72ee94e168745b2d526535b213c97'

let initialized = false

export function initMixpanel() {
  if (initialized || typeof window === 'undefined') return
  mixpanel.init(TOKEN, {
    track_pageview: false, // we fire page_viewed manually
    persistence: 'localStorage',
  })
  initialized = true
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  initMixpanel()
  mixpanel.track(event, properties)
}
