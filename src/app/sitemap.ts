
import { MetadataRoute } from 'next';
import { services, locations } from '@/lib/data';
import { client } from '@/lib/sanity';

const BASE_URL = 'https://manyadigital.ar';

async function getBlogPosts() {
  const query = `*[_type == "post"] {
    "slug": slug.current,
    publishedAt
  }`;
  return await client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const blogPages = blogPosts.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'yearly' as 'yearly',
    priority: 0.9,
  }));

  const servicePages = services.map(service => ({
    url: `${BASE_URL}/servicios/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.8
  }));


  const locationPages = locations.map(location => ({
    url: `${BASE_URL}/ciudades/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.9
  }));

  return [...staticPages, ...blogPages, ...servicePages, ...locationPages];
}

