'use client'

import Navbar from '@/components/navbar'
import { CTA_URL } from '@/lib/articles'

export default function NavbarCTAWrapper() {
  return <Navbar onCTAClick={() => window.open(CTA_URL, '_blank')} />
}
