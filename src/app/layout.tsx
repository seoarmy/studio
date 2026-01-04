
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/manya/header';
import { Footer } from '@/components/manya/footer';
import { Toaster } from '@/components/ui/toaster';
import { Code } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://manyadigital.com.ar'),
  title: {
    default: 'Agencia de Marketing Digital en Argentina | MANYA Digital',
    template: '%s | MANYA Digital',
  },
  description:
    'MANYA Digital es tu agencia de marketing en Argentina. Potenciamos tu marca con estrategias de SEO, IA y marketing online a medida para que alcances tus objetivos.',
  keywords: ['agencia de marketing', 'agencia de marketing digital', 'agencia de marketing digital en argentina', 'marketing online', 'seo', 'ia', 'automatizaciones'],
  creator: 'MANYA Digital',
  publisher: 'MANYA Digital',
  openGraph: {
    title: 'Agencia de Marketing Digital en Argentina | MANYA Digital',
    description: 'Potenciamos tu marca con estrategias de SEO, IA y marketing online a medida.',
    url: 'https://manyadigital.com.ar',
    siteName: 'MANYA Digital',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'MANYA Digital - Agencia de Marketing Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agencia de Marketing Digital en Argentina | MANYA Digital',
    description: 'Potenciamos tu marca con estrategias de SEO, IA y marketing online a medida.',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MANYA Digital',
    url: 'https://manyadigital.com.ar',
    logo: 'https://manyadigital.com.ar/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+541158578004',
      contactType: 'customer service',
      areaServed: 'AR',
      availableLanguage: ['es'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ambrosio Olmos 782',
      addressLocality: 'Córdoba',
      addressRegion: 'CBA',
      postalCode: 'X5000',
      addressCountry: 'AR',
    },
    sameAs: [
      'https://www.facebook.com/manyadigital',
      'https://www.instagram.com/manyadigital',
      'https://www.linkedin.com/company/manyadigital',
    ], // Reemplazar con las URLs reales
  };

  return (
    <html lang="es" className="!scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className='font-sans bg-background text-foreground antialiased'
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
