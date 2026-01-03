
import { client, urlFor } from '@/lib/sanity';
import { categoryPostsQuery, categoryQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = await client.fetch(categoryQuery, { slug });

    if (!category) return { title: 'Categoría no encontrada' };

    return {
        title: `${category.title} | Blog MANYA Digital`,
        description: category.description || `Artículos sobre ${category.title} en el blog de MANYA Digital.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [category, posts] = await Promise.all([
        client.fetch(categoryQuery, { slug }),
        client.fetch(categoryPostsQuery, { slug })
    ]);

    if (!category) notFound();

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = parseISO(dateString);
        return format(date, "dd 'de' MMMM, yyyy", { locale: es });
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Inicio',
                'item': 'https://manyadigital.com.ar',
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': 'https://manyadigital.com.ar/blog',
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': category.title,
                'item': `https://manyadigital.com.ar/blog/categoria/${slug}`,
            },
        ],
    };

    return (
        <div className="bg-background min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="container mx-auto px-4 py-8 md:px-6">
                <div className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground font-medium">{category.title}</span>
                </div>

                <div className="mb-12 text-center">
                    <Badge className="mb-4 px-4 py-1 text-sm uppercase tracking-wider" variant="outline">
                        Categoría
                    </Badge>
                    <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl text-primary">
                        {category.title}
                    </h1>
                    {category.description && (
                        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                            {category.description}
                        </p>
                    )}
                </div>

                {posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post: any) => (
                            <Card
                                key={post.slug}
                                className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border bg-card/50 backdrop-blur-sm group"
                            >
                                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        {post.mainImage && (
                                            <Image
                                                src={urlFor(post.mainImage).width(600).height(400).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        )}
                                    </div>
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                                            <span>{formatDate(post.publishedAt)}</span>
                                        </div>
                                        <CardTitle className="font-headline text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </CardContent>
                                    <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-border/50 mt-4">
                                        <span className="text-sm font-bold text-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
                                            Leer artículo completo <span className="ml-2">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                        <p className="text-xl text-muted-foreground">Todavía no hay artículos en esta categoría.</p>
                        <Button asChild className="mt-6 rounded-full px-8" variant="secondary">
                            <Link href="/blog">Volver al Blog</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
