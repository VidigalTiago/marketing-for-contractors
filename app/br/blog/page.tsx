import type { Metadata } from 'next'
import BlogHubClientPT from './blog-hub-client-pt'
import { SITE_URL } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Recursos de Marketing para Contractors | Blog',
  description:
    'Guias práticos para ajudar general contractors a gerar leads qualificados, melhorar taxas de conversão, acompanhar receita e crescer nos Estados Unidos.',
  alternates: {
    canonical: `${SITE_URL}/br/blog`,
    languages: {
      'en-US': `${SITE_URL}/blog`,
      'pt-BR': `${SITE_URL}/br/blog`,
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: 'Recursos de Marketing para Contractors | Blog',
    description:
      'Guias práticos para ajudar general contractors a gerar leads qualificados, melhorar taxas de conversão, acompanhar receita e crescer nos Estados Unidos.',
    url: `${SITE_URL}/br/blog`,
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos de Marketing para Contractors | Blog',
    description:
      'Guias práticos para ajudar general contractors a gerar leads qualificados, melhorar taxas de conversão, acompanhar receita e crescer nos Estados Unidos.',
  },
}

export default function BlogPagePT() {
  return <BlogHubClientPT />
}
