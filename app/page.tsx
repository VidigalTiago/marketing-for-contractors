'use client'

import AnnouncementBanner from '@/components/announcement-banner'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import BuiltForSection from '@/components/built-for-section'
import FunnelSection from '@/components/funnel-section'
import BenchmarksSection from '@/components/benchmarks-section'
import AboutSection from '@/components/about-section'
import CaseStudySection from '@/components/case-study-section'
import TrustSection from '@/components/trust-section'
import ServicesSection from '@/components/services-section'
import PricingSection from '@/components/pricing-section'
import PillarsSection from '@/components/pillars-section'
import FinalCTASection from '@/components/final-cta-section'
import Footer from '@/components/footer'

const handleCTAClick = () => {
  window.open('https://calendly.com/contact-mktforcontractors/90min', '_blank')
}

export default function Page() {
  return (
    <main>
      <AnnouncementBanner />
      <Navbar onCTAClick={handleCTAClick} />
      <HeroSection onCTAClick={handleCTAClick} />
      <BuiltForSection />
      <FunnelSection />
      <BenchmarksSection />
      <AboutSection />
      <CaseStudySection />
      <TrustSection />
      <ServicesSection />
      <PricingSection onCTAClick={handleCTAClick} />
      <PillarsSection />
      <FinalCTASection onCTAClick={handleCTAClick} />
      <Footer />
    </main>
  )
}
