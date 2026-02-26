import { MetadataRoute } from 'next';
import { PSEO_SLUGS } from '@/lib/pseo-slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://roleoffer.com';
  
  const staticPages = [
    '',
    '/benchmark',
    '/calculator',
    '/results',
    '/offer-letter',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  const compensationPages = PSEO_SLUGS.map((slug) => ({
    url: `${baseUrl}/compensation/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  return [...staticPages, ...compensationPages];
}
