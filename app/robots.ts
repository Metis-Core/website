import type { MetadataRoute } from 'next';

const SITE_URL = 'https://metisanalytica.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/account', '/auth', '/api', '/login', '/register', '/forgot-password'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
