import { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/tools-data';

const BASE_URL = 'https://carouselgem.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        '',
        '/create',
        '/tools'
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    const toolRoutes = TOOLS.map((tool) => ({
        url: `${BASE_URL}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...toolRoutes];
}
