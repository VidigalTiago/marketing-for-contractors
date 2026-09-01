'use client'

import NavbarPT from '@/components/pt/navbar-pt'
import { CTA_URL_PT } from '@/lib/articles'

export default function NavbarPTCTAWrapper() {
  return <NavbarPT onCTAClick={() => window.open(CTA_URL_PT, '_blank')} />
}
