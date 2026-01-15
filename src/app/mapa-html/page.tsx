import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map as MapIcon, FileText, Globe, Layers, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mapa del Sitio | MANYA Digital',
    description: 'Encontrá todo el contenido de MANYA Digital en nuestro mapa del sitio. Servicios, artículos del blog, ubicaciones y más.',
};

export const dynamic = 'force-dynamic';

export default async function MapaDelSitioPage() {
    const [posts, services, cities] = await Promise.all([
        client.fetch(`*[_type == "post"] | order(publishedAt desc) { title, "slug": slug.current }`),
        client.fetch(`*[_type == "service"] | order(title asc) { title, "slug": slug.current }`),
        client.fetch(`*[_type == "city"] | order(title asc) { title, "slug": slug.current }`)
    ]);

    const sections = [
        {
            title: 'Principales',
            icon: MapIcon,
            links: [
                { title: 'Inicio', href: '/' },
                { title: 'Servicios', href: '/servicios' },
                { title: 'Blog', href: '/blog' },
                { title: 'Contacto', href: '/contacto' },
            ]
        },
        {
            title: 'Servicios',
            icon: Layers,
            links: services.map((s: any) => ({ title: s.title, href: `/servicios/${s.slug}` }))
        },
        {
            title: 'Ubicaciones',
            icon: MapPin,
            links: cities.map((c: any) => ({ title: c.title, href: `/${c.slug}` }))
        },
        {
            title: 'Últimos Artículos',
            icon: FileText,
            links: posts.map((p: any) => ({ title: p.title, href: `/blog/${p.slug}` }))
        }
    ];

    return (
        <div className="container py-20 md:py-32">
            <div className="text-center mb-16">
                <h1 className="font-headline text-4xl font-bold md:text-5xl mb-6">Mapa del Sitio</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Una guía completa de todo el contenido disponible en MANYA Digital.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <Card key={section.title} className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {section.links.map((link: any) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm group"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
