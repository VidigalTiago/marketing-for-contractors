'use client'

import AnnouncementBanner from '@/components/announcement-banner'
import NavbarPT from '@/components/pt/navbar-pt'
import HeroSectionPT from '@/components/pt/hero-section-pt'
import BuiltForSectionPT from '@/components/pt/built-for-section-pt'
import FunnelSectionPT from '@/components/pt/funnel-section-pt'
import BenchmarksSectionPT from '@/components/pt/benchmarks-section-pt'
import AboutSectionPT from '@/components/pt/about-section-pt'
import CaseStudySectionPT from '@/components/pt/case-study-section-pt'
import TrustSectionPT from '@/components/pt/trust-section-pt'
import ServicesSectionPT from '@/components/pt/services-section-pt'
import PricingSectionPT from '@/components/pt/pricing-section-pt'
import PillarsSectionPT from '@/components/pt/pillars-section-pt'
import FinalCTASectionPT from '@/components/pt/final-cta-section-pt'
import FooterPT from '@/components/pt/footer-pt'

const whatsappClick = () => {
  const phoneNumber = '5531995745199'
  const message = 'Olá! Tenho interesse em saber mais sobre suas soluções de marketing para contractors.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

export default function BRPage() {
  return (
    <main>
      <AnnouncementBanner message="Somente 4 vagas disponíveis no momento para consultoria." />
      <NavbarPT onCTAClick={whatsappClick} />
      <HeroSectionPT onCTAClick={whatsappClick} />
      <BuiltForSectionPT />
      <FunnelSectionPT />
      <BenchmarksSectionPT />
      <AboutSectionPT />
      <CaseStudySectionPT />
      <TrustSectionPT />
      <ServicesSectionPT />
      <PricingSectionPT onCTAClick={whatsappClick} />
      <PillarsSectionPT />
      <FinalCTASectionPT onCTAClick={whatsappClick} />
      <FooterPT />
    </main>
  )
}
