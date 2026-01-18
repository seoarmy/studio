
export const dynamic = 'force-dynamic';

import { client } from '@/lib/sanity';
import { serviceQuery, serviceSlugsQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageContent } from '@/components/manya/service-page-content';

export async function generateStaticParams() {
  const slugs = await client.fetch(serviceSlugsQuery);
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(serviceQuery, { slug });

  if (!data) {
    return {
      title: 'Servicio no encontrado',
    }
  }

  return {
    title: data.meta?.title || data.title,
    description: data.meta?.description,
    openGraph: {
      images: data.meta?.image ? [{ url: data.meta.image }] : undefined,
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await client.fetch(serviceQuery, { slug });

  if (!data) {
    notFound();
  }

  return <ServicePageContent service={data as any} />;
}
