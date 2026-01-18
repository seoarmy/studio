export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(homeQuery, {}, { next: { revalidate: 0 } });

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      images: data.seoImage ? [{ url: data.seoImage }] : undefined,
    },
  };
}

import { client } from '@/lib/sanity';
import { homeQuery } from '@/lib/queries';
import { HeroSection } from '@/components/manya/hero-section';
import { CustomSoftwareSection } from '@/components/manya/custom-software-section';
import { ServicesSection } from '@/components/manya/services-section';
import { StatsSection } from '@/components/manya/stats-section';
import { WhyUsSection } from '@/components/manya/why-us-section';
import { FinalCtaSection } from '@/components/manya/final-cta-section';
import { BlogPreviewSection } from '@/components/manya/blog-preview-section';
import { TestimonialsSection } from '@/components/manya/testimonials-section';
import { SuccessCasesSection } from '@/components/manya/success-cases-section';
import { FaqSection } from '@/components/manya/faq-section';
import { LocationsSection } from '@/components/manya/locations-section';
import { ClientsSection } from '@/components/manya/clients-section';

export default async function Home() {
  const data = await client.fetch(homeQuery, {}, { next: { revalidate: 0 } });

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://manyadigital.com.ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://manyadigital.com.ar/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <HeroSection data={data} />
      <CustomSoftwareSection data={data} />
      <ServicesSection data={data} />
      <WhyUsSection data={data} />
      <ClientsSection data={data} />
      <SuccessCasesSection data={data} />
      <TestimonialsSection data={data} />
      <StatsSection data={data} />
      <LocationsSection data={data} />
      <BlogPreviewSection />
      <FaqSection data={data} />
      <FinalCtaSection data={data} />
    </>
  );
}
