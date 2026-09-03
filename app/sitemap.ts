import type { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const SITE_URL = 'https://metisanalytica.com';

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/',              changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about',         changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services',      changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products',      changeFrequency: 'weekly', priority: 0.9 },
  { path: '/consultation',  changeFrequency: 'monthly', priority: 0.8 },
  { path: '/careers',       changeFrequency: 'daily',   priority: 0.8 },
  { path: '/contact',       changeFrequency: 'yearly',  priority: 0.6 },
  { path: '/feedback',      changeFrequency: 'yearly',  priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  try {
    const supabase = await createSupabaseServerClient();

    const [careersRes, productsRes] = await Promise.all([
      supabase.from('career_positions').select('slug, updated_at').eq('is_active', true),
      supabase.from('products').select('slug, updated_at').eq('is_active', true),
    ]);

    for (const p of careersRes.data ?? []) {
      entries.push({
        url: `${SITE_URL}/careers/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    for (const p of productsRes.data ?? []) {
      entries.push({
        url: `${SITE_URL}/products/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch (e) {
    // Sitemap should never break — fall back to static routes if the DB is down.
    console.error('[sitemap] failed to load dynamic routes', e);
  }

  return entries;
}
