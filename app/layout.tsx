import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import MixpanelProvider from '@/components/mixpanel-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Marketing For Contractors | Lead Generation for Contractors',
  description:
    'Marketing For Contractors helps general contractors and home renovation companies generate better leads, more estimates, and more signed projects through paid media and sales tracking.',
  keywords: [
    'marketing for contractors',
    'marketing for general contractors',
    'contractor lead generation',
    'construction marketing',
    'home renovation marketing',
    'paid ads for contractors',
    'lead generation for remodeling companies',
    'marketing for roofers',
    'marketing for home improvement companies',
  ],
  alternates: {
    canonical: 'https://www.mktforcontractors.com',
    languages: {
      'en-US': 'https://www.mktforcontractors.com',
      'pt-BR': 'https://www.mktforcontractors.com/br',
      'x-default': 'https://www.mktforcontractors.com',
    },
  },
  openGraph: {
    title: 'Marketing For Contractors | Lead Generation for Contractors',
    description:
      'Get better leads, more estimates, and more signed projects with a paid media and sales tracking system built for residential construction companies.',
    url: 'https://www.mktforcontractors.com',
    siteName: 'Marketing For Contractors',
    type: 'website',
    images: [
      {
        url: 'https://www.mktforcontractors.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Marketing For Contractors — Lead Generation for Residential Construction Companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing For Contractors | Lead Generation for Contractors',
    description:
      'Paid media, lead tracking, CRM visibility, and reporting for residential construction companies.',
    images: ['https://www.mktforcontractors.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Marketing For Contractors',
                legalName: 'HOTWAY TECH & ART LTDA',
                url: 'https://www.mktforcontractors.com',
                email: 'contact@mktforcontractors.com',
                logo: 'https://www.mktforcontractors.com/logo.png',
                founder: {
                  '@type': 'Person',
                  name: 'Tiago Vidigal',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Marketing For Contractors',
                url: 'https://www.mktforcontractors.com',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: 'Marketing For Contractors',
                url: 'https://www.mktforcontractors.com',
                email: 'contact@mktforcontractors.com',
                description:
                  'Paid media, lead generation, CRM tracking, sales visibility, and revenue reporting for residential construction companies.',
                areaServed: 'United States',
                serviceType: [
                  'Paid Media Management',
                  'Contractor Lead Generation',
                  'CRM Setup',
                  'Revenue Dashboard',
                  'Email Follow-Up Automation',
                  'Website Conversion Support',
                  'Local SEO Foundation',
                ],
                offers: {
                  '@type': 'Offer',
                  price: '1400',
                  priceCurrency: 'USD',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '1400',
                    priceCurrency: 'USD',
                    unitText: 'MONTH',
                    billingDuration: 'P1M',
                  },
                },
              },
            ]),
          }}
        />
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xt2w1bkxs5");
            `,
          }}
        />
        {/* Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18309351468"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18309351468');
            `,
          }}
        />
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1396030869009828');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1396030869009828&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased font-sans">
        <Suspense fallback={null}>
          <MixpanelProvider />
        </Suspense>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
