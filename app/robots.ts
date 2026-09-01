import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // AI / AEO crawlers — explicitly allowed so the site can be cited by
      // answer engines (Perplexity, ChatGPT, Claude, Google AI Overviews, Apple Intelligence).
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Bytespider (TikTok/ByteDance) — blocked, does not respect content licensing norms
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.mktforcontractors.com/sitemap.xml',
  }
}
