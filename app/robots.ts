import { siteConfig } from '@/config/site'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/home',
          '/login',
          '/signup',
          '/about',
          '/contact',
          '/terms',
          '/privacy',
          '/sitemap.xml',
          '/robots.txt',
        ],
        disallow: '/',
      },
      {
        userAgent: 'User-agent: Algolia Crawler',
        allow: '/',
        disallow: '/private/',
      },
    ],
    sitemap: siteConfig.sitemap,
  }
}
