import type { Metadata } from 'next'
import { ContractorRoiArticle, getRoiFaq } from '@/components/contractor-roi-article'

const SITE_URL = 'https://www.mktforcontractors.com'
const url = `${SITE_URL}/blog/contractor-marketing-roi`
export const metadata: Metadata = {
  title: 'How to Calculate Contractor Marketing ROI',
  description: 'Learn how contractors can calculate marketing ROI from ad spend to signed revenue and gross profit, with a practical formula, funnel, checklist, and calculator.',
  alternates: { canonical: url, languages: { 'en-US': url, 'pt-BR': `${SITE_URL}/br/blog/como-calcular-o-roi-de-marketing-para-contractors`, 'x-default': url } },
  openGraph: { title: 'How to Calculate Contractor Marketing ROI', description: 'A practical framework for measuring contractor marketing ROI from marketing spend to signed revenue and gross profit.', url, type: 'article' },
}
export default function Page() {
  const faq = getRoiFaq('en-US')
  const jsonLd = [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'How to Calculate Contractor Marketing ROI', description: metadata.description, url, datePublished: '2026-08-18', dateModified: '2026-08-18', author: { '@type': 'Organization', name: 'Marketing For Contractors', url: SITE_URL }, publisher: { '@type': 'Organization', name: 'Marketing For Contractors', logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } }, mainEntityOfPage: { '@type': 'WebPage', '@id': url } }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` }, { '@type': 'ListItem', position: 3, name: 'How to Calculate Contractor Marketing ROI', item: url }] }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }]
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><ContractorRoiArticle /></>
}
