import { locations, locationDetails, ServiceDetail } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServicePageContent } from '@/components/manya/service-page-content';

export async function generateStaticParams() {
    return locations.map((location) => ({
        slug: location.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const location = locationDetails.find((p) => p.slug === params.slug);
    if (!location) {
        return {
            title: 'Ubicación no encontrada',
        }
    }
    return {
        title: location.meta.title,
        description: location.meta.description,
    }
}

export default function LocationPage({ params }: { params: { slug: string } }) {
    const location = locationDetails.find((p) => p.slug === params.slug);

    if (!location) {
        notFound();
    }

    // Casting to ServiceDetail because the structure is identical and we want to reuse the component
    return <ServicePageContent service={location as unknown as ServiceDetail} />;
}
