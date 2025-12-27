import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';
import { FinalCtaSection } from '@/components/manya/final-cta-section';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: `${post.title} | Manya Digital Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-background text-foreground">
      {/* Header */}
      <div className="container mx-auto px-4 pt-12 md:px-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="truncate text-foreground">{post.title}</span>
        </div>
      </div>

      <header className="container mx-auto px-4 py-12 text-center md:px-6 md:py-16">
        <Badge variant="default" className="mb-4">{post.category}</Badge>
        <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl max-w-4xl mx-auto">
          {post.title}
        </h1>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar.src} alt={post.author.name} data-ai-hint={post.author.avatar.hint}/>
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
            </div>
        </div>
      </header>
      
      {/* Imagen destacada */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative h-64 md:h-96 lg:h-[500px] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
                src={post.image.src}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.image.hint}
                priority
            />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Contenido del post */}
            <div className="lg:col-span-8">
                 <div
                    className="prose prose-lg dark:prose-invert max-w-none 
                    prose-h2:font-headline prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:font-headline prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                    prose-li:marker:text-primary"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:sticky top-24 h-fit">
                {/* Tabla de Contenidos - Placeholder */}
                <div className="p-6 border rounded-2xl bg-card">
                    <h3 className="font-headline text-xl font-bold mb-4">En este artículo:</h3>
                    {/* Aquí iría la tabla de contenidos dinámica */}
                    <ul className="space-y-2">
                        <li><a href="#ia-generativa" className="text-muted-foreground hover:text-primary">1. IA Generativa</a></li>
                        <li><a href="#video-corto" className="text-muted-foreground hover:text-primary">2. Video Corto</a></li>
                        <li><a href="#seo-conversacional" className="text-muted-foreground hover:text-primary">3. SEO Conversacional</a></li>
                    </ul>
                </div>
            </aside>
        </div>
      </div>

      <div className="mt-24">
        <FinalCtaSection/>
      </div>

    </article>
  );
}