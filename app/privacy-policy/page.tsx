'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function PrivacyPolicyPage() {
  const handleCTAClick = () => {
    window.open('https://calendly.com/contact-mktforcontractors/90min', '_blank')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onCTAClick={handleCTAClick} />

      {/* Main content */}
      <main className="flex-1 px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#667085]">
              Last Updated: July 9, 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-[#0A0A0A]">
            <section>
              <p className="text-base leading-relaxed text-[#667085]">
                Marketing For Contractors ("we," "us," or "our") operates https://mktforcontractors.com (the "Website").
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                This Privacy Policy explains how we collect, use, store, share, and protect personal information when you visit our Website, submit a form, contact us, or use our services.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">1. INFORMATION WE COLLECT</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Information you provide directly may include:</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#667085]">
                    <li>Name</li>
                    <li>Company name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Website URL</li>
                    <li>Services offered</li>
                    <li>Monthly advertising budget</li>
                    <li>Message content</li>
                    <li>Any other information you voluntarily submit through our forms or communications</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Information collected automatically may include:</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#667085]">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Operating system</li>
                    <li>Pages viewed</li>
                    <li>Referral source</li>
                    <li>Approximate location</li>
                    <li>Date and time of visits</li>
                    <li>Website interactions, including form submissions, button clicks, and page views</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">2. HOW WE USE YOUR INFORMATION</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">We may use your information to:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Respond to inquiries and partnership requests</li>
                <li>Evaluate whether our services may be a fit for your business</li>
                <li>Contact you about your inquiry, proposal, onboarding, or services</li>
                <li>Schedule meetings or consultations</li>
                <li>Provide marketing, consulting, and related services</li>
                <li>Improve our Website, offers, content, and user experience</li>
                <li>Measure advertising and website performance</li>
                <li>Protect our Website and business against fraud, abuse, or security threats</li>
                <li>Comply with legal, tax, and regulatory obligations</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4 font-semibold">We do not sell your personal information.</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">3. MARKETING COMMUNICATIONS</h2>
              <p className="text-base leading-relaxed text-[#667085]">
                When you submit information through our Website, you may receive business communications from Marketing For Contractors by email, phone, text message, or other relevant channels regarding your inquiry or our services.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-3">
                You may opt out of marketing emails at any time by clicking the unsubscribe link included in the email or by contacting us at contact@mktforcontractors.com.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">4. COOKIES, ANALYTICS, AND ADVERTISING TECHNOLOGIES</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                We may use cookies, analytics tools, conversion tracking, pixels, and similar technologies to understand Website usage and measure marketing performance.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mb-3 font-semibold">These tools may include:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Google Analytics</li>
                <li>Google Tag Manager</li>
                <li>Google Ads conversion tracking</li>
                <li>Meta Pixel</li>
                <li>LinkedIn Insight Tag</li>
                <li>Microsoft Advertising / Bing tracking</li>
                <li>Call tracking tools</li>
                <li>CRM platforms</li>
                <li>Form-processing and scheduling tools</li>
                <li>Email marketing and automation tools</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                These technologies may collect information such as page visits, traffic source, device information, browser information, and actions taken on our Website.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-3">
                You can manage or block cookies through your browser settings. Disabling cookies may affect certain Website features.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">5. HOW WE SHARE INFORMATION</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                We may share personal information only when reasonably necessary to operate our business, provide services, or comply with legal obligations.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mb-3 font-semibold">This may include trusted service providers such as:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Website hosting and infrastructure providers</li>
                <li>CRM and sales platforms</li>
                <li>Analytics and advertising platforms</li>
                <li>Email, scheduling, and communications tools</li>
                <li>Form-processing tools</li>
                <li>Professional advisors, including accountants and legal advisors</li>
                <li>Government authorities or other parties when required by law</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4 font-semibold">
                We do not sell, rent, or trade personal information to third parties.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">6. DATA RETENTION</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">We retain personal information only for as long as reasonably necessary to:</p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Respond to inquiries</li>
                <li>Manage business relationships</li>
                <li>Provide services</li>
                <li>Maintain business records</li>
                <li>Resolve disputes</li>
                <li>Meet legal, tax, or regulatory obligations</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                When personal information is no longer needed, we may delete, anonymize, or securely retain it as required by applicable law.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">7. DATA SECURITY</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                We use reasonable administrative, technical, and organizational measures designed to protect personal information from unauthorized access, loss, misuse, alteration, or disclosure.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                However, no internet transmission, website, or storage system is completely secure. Please do not submit highly sensitive information through the Website unless specifically requested through a secure channel.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">8. INTERNATIONAL DATA TRANSFERS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Our service providers may process or store information in countries other than your country of residence.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                Where applicable, we take reasonable steps to ensure that international data transfers are handled in accordance with applicable data protection laws.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">9. YOUR RIGHTS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Depending on your location and applicable law, you may have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#667085]">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of personal information</li>
                <li>Request restriction of certain processing activities</li>
                <li>Object to certain uses of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Request information about how your data is used or shared</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="text-base leading-relaxed text-[#667085] mt-4">
                To make a request, contact us at contact@mktforcontractors.com.
              </p>
              <p className="text-base leading-relaxed text-[#667085] mt-3">
                We may need to verify your identity before processing certain requests.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">10. THIRD-PARTY LINKS</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Our Website may include links to third-party websites, platforms, or services. We are not responsible for the privacy practices, security, or content of those third-party sites.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                We recommend reviewing the privacy policy of any third-party website you visit.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">11. CHILDREN&apos;S PRIVACY</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                Our Website and services are intended for business owners and professionals. They are not directed to children under 13.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information through our Website, contact us so we can take appropriate action.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">12. CHANGES TO THIS POLICY</h2>
              <p className="text-base leading-relaxed text-[#667085] mb-3">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-base leading-relaxed text-[#667085]">
                When we make changes, we will update the "Last Updated" date at the top of this page. Your continued use of the Website after an updated policy is posted means you accept the revised policy.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold mb-4">13. CONTACT US</h2>
              <div className="bg-[#F4F6F8] border border-[#D0D5DD] p-6 rounded">
                <p className="text-base text-[#0A0A0A]">
                  <span className="font-semibold">Marketing For Contractors</span><br />
                  HOTWAY TECH & ART LTDA<br />
                  Conselheiro Lafaiete, MG - Brazil<br />
                  <span className="font-semibold">Email:</span> contact@mktforcontractors.com<br />
                  <span className="font-semibold">Website:</span> https://mktforcontractors.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
