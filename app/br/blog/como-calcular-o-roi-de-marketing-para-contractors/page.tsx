import type { Metadata } from 'next'
import { ContractorRoiArticle, getRoiFaq } from '@/components/contractor-roi-article'

const SITE_URL = 'https://www.mktforcontractors.com'
const url = `${SITE_URL}/br/blog/como-calcular-o-roi-de-marketing-para-contractors`
export const metadata: Metadata = {
  title: 'Como Calcular o ROI de Marketing para General Contractors',
  description: 'Aprenda a calcular o ROI de marketing para contractors usando investimento, receita assinada e lucro bruto, com fórmula, checklist e calculadora prática.',
  alternates: { canonical: url, languages: { 'pt-BR': url, 'en-US': `${SITE_URL}/blog/contractor-marketing-roi`, 'x-default': `${SITE_URL}/blog/contractor-marketing-roi` } },
  openGraph: { title: 'Como Calcular o ROI de Marketing para General Contractors', description: 'Framework prático para medir ROI de marketing de contractors, da mídia ao lucro bruto.', url, type: 'article' },
}
export default function Page() {
  const faq = getRoiFaq('pt-BR')
  const jsonLd = [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'Como Calcular o ROI de Marketing para General Contractors', description: metadata.description, url, datePublished: '2026-08-18', dateModified: '2026-08-18', inLanguage: 'pt-BR', author: { '@type': 'Organization', name: 'Marketing For Contractors', url: SITE_URL }, publisher: { '@type': 'Organization', name: 'Marketing For Contractors', logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } }, mainEntityOfPage: { '@type': 'WebPage', '@id': url } }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/br` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/br/blog` }, { '@type': 'ListItem', position: 3, name: 'Como Calcular o ROI de Marketing para General Contractors', item: url }] }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }]
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><ContractorRoiArticle locale="pt-BR" /></>
}
