import type { Metadata } from 'next'
import BlogHubClient from './blog-hub-client'
import { SITE_URL } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Marketing Resources for General Contractors | Blog',
  description:
    'Practical guides to help construction companies generate qualified leads, improve conversion rates, track revenue, and grow profitably.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      'en-US': `${SITE_URL}/blog`,
      'pt-BR': `${SITE_URL}/br/blog`,
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: 'Marketing Resources for General Contractors | Blog',
    description:
      'Practical guides to help construction companies generate qualified leads, improve conversion rates, track revenue, and grow profitably.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Resources for General Contractors | Blog',
    description:
      'Practical guides to help construction companies generate qualified leads, improve conversion rates, track revenue, and grow profitably.',
  },
}

export default function BlogPage() {
  return <BlogHubClient />
}
