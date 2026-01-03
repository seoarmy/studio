
export const dynamic = 'force-dynamic';

import { client } from '@/lib/sanity';
import { cityQuery, citySlugsQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';
import { ServicePageContent } from '@/components/manya/service-page-content';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const slugs = await client.fetch(citySlugsQuery);
    return slugs.map((slug: string) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await client.fetch(cityQuery, { slug });

    if (!data) {
        return {
            title: 'Ciudad no encontrada | MANYA Digital',
        }
    }

    return {
        title: data.meta?.title || data.title,
        description: data.meta?.description,
    }
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await client.fetch(cityQuery, { slug });

    if (!data) {
        notFound();
    }

    // Map Sanity data to the structure expected by ServicePageContent if needed
    // Assuming the structure now matches exactly due to my schema update
    return <ServicePageContent service={data as any} />;
}
