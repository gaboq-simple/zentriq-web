import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: 'https://zentriq.mx', lastModified: now, priority: 1.0 },
    { url: 'https://zentriq.mx/zlot', lastModified: now, priority: 0.9 },
    { url: 'https://zentriq.mx/privacidad', lastModified: now, priority: 0.5 },
    { url: 'https://zentriq.mx/terminos', lastModified: now, priority: 0.5 },
    { url: 'https://zentriq.mx/eliminacion-de-datos', lastModified: now, priority: 0.5 },
  ];
}
