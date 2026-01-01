import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import { CustomPortableText } from '@/components/manya/portable-text';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    Mail,
    ExternalLink,
    ChevronRight,
    ArrowRight,
    Globe,
    Share2
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Metadata } from 'next';

type AuthorPageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const query = `*[_type == "author"] { "slug": slug.current }`;
    const authors = await client.fetch(query);
    return authors.map((author: { slug: string }) => ({
        slug: author.slug,
    }));
}

async function getAuthor(slug: string) {
    const query = `*[_type == "author" && slug.current == $slug][0] {
    name,
    role,
    image,
    shortBio,
    bio,
    specialties,
    email,
    social,
    externalPublications,
    metaTitle,
    metaDescription
  }`;
    return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
    const author = await getAuthor(params.slug);

    if (!author) {
        return {
            title: 'Autor no encontrado',
        };
    }

    const title = author.metaTitle || `${author.name} | Autor en MANYA Digital`;
    const description = author.metaDescription || author.shortBio;
    const imageUrl = author.image ? urlFor(author.image).width(1200).height(630).url() : '/placeholder.png';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'profile',
            images: [{ url: imageUrl }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

async function getAuthorPosts(authorSlug: string) {
    const query = `*[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) [0...3] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    "categories": categories[]->title
  }`;
    return await client.fetch(query, { authorSlug });
}

async function getOtherAuthors(currentSlug: string) {
    const query = `*[_type == "author" && slug.current != $currentSlug] [0...5] {
    name,
    role,
    image,
    "slug": slug.current
  }`;
    return await client.fetch(query, { currentSlug });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const [author, posts, otherAuthors] = await Promise.all([
        getAuthor(params.slug),
        getAuthorPosts(params.slug),
        getOtherAuthors(params.slug)
    ]);

    if (!author) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = parseISO(dateString);
        return format(date, "dd 'de' MMMM, yyyy", { locale: es });
    };

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        description: author.shortBio,
        image: author.image ? urlFor(author.image).url() : '',
        url: `https://manyadigital.ar/autor/${params.slug}`,
        sameAs: [
            author.social?.linkedin,
            author.social?.instagram,
            author.social?.facebook,
            author.social?.twitter,
        ].filter(Boolean),
    };

    return (
        <div className="bg-background min-h-screen pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 pt-8 md:px-6">
                <div className="flex items-center text-sm text-muted-foreground/60">
                    <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
                    <span className="truncate text-foreground font-medium">{author.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Author Header Card - Premium Glassmorphism */}
                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 md:p-16 text-white shadow-2xl transition-all duration-500 hover:shadow-primary/20">
                            {/* Animated Background Elements */}
                            <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px] transition-all duration-700 group-hover:bg-primary/30" />
                            <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-64 w-64 rounded-full bg-accent/10 blur-[80px]" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
                                <div className="relative h-40 w-40 md:h-48 md:w-48 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent animate-pulse opacity-20 blur-xl" />
                                    <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/10 shadow-2xl">
                                        {author.image ? (
                                            <Image
                                                src={urlFor(author.image).width(400).height(400).url()}
                                                alt={author.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-white/5 flex items-center justify-center text-5xl font-bold">
                                                {author.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-center md:text-left space-y-4">
                                    <div className="space-y-1">
                                        <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tight leading-none">
                                            {author.name}
                                        </h1>
                                        {author.role && (
                                            <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold tracking-widest uppercase text-sm">
                                                <span className="h-px w-8 bg-primary/50" />
                                                {author.role}
                                            </div>
                                        )}
                                    </div>
                                    {author.shortBio && (
                                        <p className="text-lg md:text-xl leading-relaxed text-slate-300 font-medium max-w-2xl">
                                            {author.shortBio}
                                        </p>
                                    )}

                                    {/* Quick Socials in Header */}
                                    <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                                        {author.social?.linkedin && (
                                            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                                <Linkedin className="h-5 w-5" />
                                            </a>
                                        )}
                                        {author.social?.twitter && (
                                            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                                <Twitter className="h-5 w-5" />
                                            </a>
                                        )}
                                        {author.email && (
                                            <a href={`mailto:${author.email}`} className="text-slate-400 hover:text-white transition-colors">
                                                <Mail className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Specialties - Modern Chips */}
                        {author.specialties && author.specialties.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/70">
                                        Áreas de Especialización
                                    </h2>
                                    <div className="h-px flex-grow bg-border/50" />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {author.specialties.map((spec: string) => (
                                        <Badge key={spec} variant="outline" className="px-5 py-2 text-sm font-semibold rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                                            {spec}
                                        </Badge>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Biography - Enhanced Typography */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <h2 className="font-headline text-3xl md:text-4xl font-bold">Biografía</h2>
                                <div className="h-1 w-12 bg-primary rounded-full" />
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-headings:font-headline">
                                {author.bio ? (
                                    <CustomPortableText value={author.bio} />
                                ) : (
                                    <p className="text-muted-foreground italic">No hay biografía disponible.</p>
                                )}
                            </div>
                        </section>

                        {/* Latest Articles - Premium Grid */}
                        {posts && posts.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <h2 className="font-headline text-3xl font-bold">Últimos Artículos</h2>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                                            {posts.length}
                                        </Badge>
                                    </div>
                                    <Link href="/blog" className="hidden md:flex items-center text-sm font-bold text-primary hover:gap-2 transition-all">
                                        Ver todos <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {posts.map((post: any) => (
                                        <Card key={post.slug} className="group h-full flex flex-col overflow-hidden border-none bg-transparent shadow-none">
                                            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full space-y-5">
                                                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                                                    {post.mainImage ? (
                                                        <Image
                                                            src={urlFor(post.mainImage).width(600).height(450).url()}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full bg-muted flex items-center justify-center">
                                                            <Share2 className="h-10 w-10 text-muted-foreground/20" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                                <div className="space-y-3 flex-grow">
                                                    <div className="flex items-center gap-2">
                                                        {post.categories?.[0] && (
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                                {post.categories[0]}
                                                            </span>
                                                        )}
                                                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                            {formatDate(post.publishedAt)}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-headline text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                        </Card>
                                    ))}
                                </div>
                                <div className="md:hidden text-center pt-4">
                                    <Button asChild variant="outline" className="rounded-full w-full">
                                        <Link href="/blog">Ver todos los artículos</Link>
                                    </Button>
                                </div>
                            </section>
                        )}

                        {/* External Publications - Interactive List */}
                        {author.externalPublications && author.externalPublications.length > 0 && (
                            <section className="space-y-8">
                                <h2 className="font-headline text-2xl font-bold">Otras publicaciones externas</h2>
                                <div className="grid gap-4">
                                    {author.externalPublications.map((pub: any, i: number) => (
                                        <a
                                            key={i}
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-6 rounded-3xl bg-muted/20 border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-white/5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    <Globe className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg group-hover:text-primary transition-colors">{pub.title}</p>
                                                    {pub.source && (
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{pub.source}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-muted/30 group-hover:bg-primary/10 group-hover:text-primary transition-all group-hover:translate-x-1">
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar - Sticky & Clean */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Contact & Social Card */}
                        <div className="sticky top-24 space-y-8">
                            <Card className="rounded-[2rem] border-none shadow-xl bg-card overflow-hidden">
                                <div className="p-8 space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                            Contacto y Redes
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Conectá con {author.name.split(' ')[0]} para colaboraciones o consultas.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {author.social?.linkedin && (
                                            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-[#0077b5] hover:text-white transition-all duration-300 group">
                                                <Linkedin className="h-6 w-6" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
                                            </a>
                                        )}
                                        {author.social?.instagram && (
                                            <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-300 group">
                                                <Instagram className="h-6 w-6" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
                                            </a>
                                        )}
                                        {author.social?.facebook && (
                                            <a href={author.social.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-[#1877f2] hover:text-white transition-all duration-300 group">
                                                <Facebook className="h-6 w-6" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Facebook</span>
                                            </a>
                                        )}
                                        {author.social?.twitter && (
                                            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-black hover:text-white transition-all duration-300 group">
                                                <Twitter className="h-6 w-6" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Twitter</span>
                                            </a>
                                        )}
                                    </div>

                                    {author.email && (
                                        <Button asChild className="w-full h-14 rounded-2xl font-bold text-base shadow-lg shadow-primary/20">
                                            <a href={`mailto:${author.email}`}>
                                                <Mail className="mr-2 h-5 w-5" /> Enviar Email
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </Card>

                            {/* Other Authors - Minimalist List */}
                            {otherAuthors && otherAuthors.length > 0 && (
                                <div className="space-y-6 px-2">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                        Otros Expertos
                                    </h3>
                                    <div className="space-y-4">
                                        {otherAuthors.map((other: any) => (
                                            <Link
                                                key={other.slug}
                                                href={`/autor/${other.slug}`}
                                                className="flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                                                        {other.image && (
                                                            <AvatarImage src={urlFor(other.image).width(100).height(100).url()} alt={other.name} />
                                                        )}
                                                        <AvatarFallback className="bg-muted text-xs font-bold">{other.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{other.name}</p>
                                                        {other.role && <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{other.role}</p>}
                                                    </div>
                                                </div>
                                                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-muted/50 opacity-0 group-hover:opacity-100 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
