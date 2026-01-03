
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity';
import type { Metadata } from 'next';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const metadata: Metadata = {
  title: 'Blog | MANYA Digital',
  description:
    'Las últimas tendencias, noticias y consejos de marketing digital relevantes para el mercado argentino.',
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog | MANYA Digital',
    description: 'Análisis, tendencias y consejos sobre el universo del marketing digital en Argentina.',
  },
};

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage,
    "categories": categories[]-> { title, "slug": slug.current },
    "author": author-> {
      name,
      "slug": slug.current
    }
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
        title,
        "slug": slug.current
    }`;
  return await client.fetch(query);
}

export default async function BlogPage() {
  const [blogPosts, categories] = await Promise.all([getPosts(), getCategories()]);

  const blogSchema = {
    // ... existing schema code
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de MANYA Digital',
    description: 'Las últimas tendencias, noticias y consejos de marketing digital relevantes para el mercado argentino.',
    publisher: {
      '@type': 'Organization',
      name: 'MANYA Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://manyadigital.com.ar/logo.png',
      },
    },
    blogPost: blogPosts.map((post: any) => ({
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://manyadigital.com.ar/blog/${post.slug}`,
      },
      headline: post.title,
      image: post.mainImage ? urlFor(post.mainImage).url() : '',
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Equipo MANYA',
      },
    })),
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM, yyyy", { locale: es });
  };


  return (
    <div className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl text-primary">
            Nuestro Rincón Digital
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-xl">
            Análisis, tendencias y consejos sobre el universo del marketing
            digital en Argentina.
          </p>

          {/* Category Filter */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild variant="default" className="rounded-full px-6">
              <Link href="/blog">Todos</Link>
            </Button>
            {categories.map((cat: any) => (
              <Button key={cat.slug} asChild variant="outline" className="rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-all">
                <Link href={`/blog/categoria/${cat.slug}`}>{cat.title}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post: any) => (
            <Card
              key={post.slug}
              className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border bg-card/50 backdrop-blur-sm"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </Link>
                {post.categories?.[0] && (
                  <Link href={`/blog/categoria/${post.categories[0].slug}`} className="absolute top-4 right-4 z-10">
                    <Badge className="px-3 py-1 hover:bg-primary-foreground hover:text-primary transition-colors cursor-pointer" variant="default">
                      {post.categories[0].title}
                    </Badge>
                  </Link>
                )}
              </div>
              <Link href={`/blog/${post.slug}`} className="flex flex-col flex-grow">
                <CardHeader className="space-y-1">
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {formatDate(post.publishedAt)}
                  </div>
                  <CardTitle className="font-headline text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="font-bold text-primary flex items-center group-hover:translate-x-1 transition-transform">
                    Leer más <span className="ml-2">→</span>
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

