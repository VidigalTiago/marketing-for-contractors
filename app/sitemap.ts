import { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles'

const BASE = 'https://www.mktforcontractors.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const enArticles = getPublishedArticles('en-US')
  const ptArticles = getPublishedArticles('pt-BR')

  // The pillar guide gets a higher priority than regular blog posts.
  const PILLAR_PATHS = ['/general-contractor-marketing', '/br/marketing-para-general-contractors']

  const enArticleUrls: MetadataRoute.Sitemap = enArticles.map((article) => ({
    url: `${BASE}${article.path}`,
    lastModified: new Date(article.updatedDate),
    changeFrequency: 'monthly' as const,
    priority: PILLAR_PATHS.includes(article.path) ? 0.9 : 0.8,
  }))

  const ptArticleUrls: MetadataRoute.Sitemap = ptArticles.map((article) => ({
    url: `${BASE}${article.path}`,
    lastModified: new Date(article.updatedDate),
    changeFrequency: 'monthly' as const,
    priority: PILLAR_PATHS.includes(article.path) ? 0.9 : 0.8,
  }))

  return [
    // EN — core pages
    {
      url: BASE,
      lastModified: new Date('2025-07-09'),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date('2025-07-16'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...enArticleUrls,
    {
      url: `${BASE}/privacy-policy`,
      lastModified: new Date('2025-07-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },

    // PT-BR — core pages
    {
      url: `${BASE}/br`,
      lastModified: new Date('2025-07-09'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/br/blog`,
      lastModified: new Date('2025-07-16'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...ptArticleUrls,
  ]
}
