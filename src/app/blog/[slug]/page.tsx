
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import { FinalCtaSection } from '@/components/manya/final-cta-section';
import { BlogSidebar } from '@/components/manya/blog-sidebar';
import { CustomPortableText } from '@/components/manya/portable-text';
import { client, urlFor } from '@/lib/sanity';
import type { Metadata } from 'next';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    readTime,
    mainImage,
    "author": author-> {
      name,
      image,
      "slug": slug.current
    },
    "categories": categories[]->title,
    intro,
    body,
    metaTitle,
    metaDescription
  }`;

  return await client.fetch(query, { slug });
}

async function getSidebarData() {
  const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc) [0...5] {
    title,
    "slug": slug.current,
    publishedAt
  }`;

  const categoriesQuery = `*[_type == "category"].title`;

  const [latestPosts, categories] = await Promise.all([
    client.fetch(latestPostsQuery),
    client.fetch(categoriesQuery)
  ]);

  return { latestPosts, categories };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : '/placeholder.png';
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, sidebarData] = await Promise.all([
    getPost(params.slug),
    getSidebarData()
  ]);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://manyadigital.ar/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).url() : '',
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Equipo MANYA',
      url: 'https://manyadigital.ar',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MANYA Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://manyadigital.ar/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM, yyyy", { locale: es });
  };

  return (
    <article className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Header */}
      <div className="container mx-auto px-4 pt-8 md:px-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="truncate text-foreground">{post.title}</span>
        </div>
      </div>

      <header className="container mx-auto px-4 py-8 text-center md:px-6 md:py-12">
        {post.categories?.[0] && (
          <Badge variant="default" className="mb-4">{post.categories[0]}</Badge>
        )}
        <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl max-w-4xl mx-auto">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-muted-foreground">
          {post.author?.slug ? (
            <Link href={`/autor/${post.author.slug}`} className="flex items-center gap-2 hover:text-primary transition-colors group">
              <Avatar className="h-8 w-8 group-hover:ring-2 ring-primary transition-all">
                {post.author?.image && (
                  <AvatarImage src={urlFor(post.author.image).width(100).height(100).url()} alt={post.author.name} />
                )}
                <AvatarFallback>{post.author?.name?.charAt(0) || 'M'}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author?.name || 'Equipo MANYA'}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {post.author?.image && (
                  <AvatarImage src={urlFor(post.author.image).width(100).height(100).url()} alt={post.author.name} />
                )}
                <AvatarFallback>{post.author?.name?.charAt(0) || 'M'}</AvatarFallback>
              </Avatar>
              <span>{post.author?.name || 'Equipo MANYA'}</span>
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>
      </header>

      {/* Imagen destacada */}
      {post.mainImage && (
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative h-80 md:h-[450px] lg:h-[550px] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contenido del post */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.intro && <CustomPortableText value={post.intro} />}
              {post.body && <CustomPortableText value={post.body} />}
            </div>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:sticky top-24 h-fit">
            <BlogSidebar
              latestPosts={sidebarData.latestPosts}
              categories={sidebarData.categories}
            />
          </aside>
        </div>
      </div>

      <div className="mt-24">
        <FinalCtaSection />
      </div>

    </article>
  );
}

