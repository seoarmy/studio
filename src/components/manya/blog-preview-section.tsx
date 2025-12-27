import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';

export function BlogPreviewSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Desde Nuestro Rincón Digital
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Análisis, tendencias y consejos sobre el universo del marketing
            digital en Argentina.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl bg-card">
              <Link href={`/blog#${post.slug}`} className="block group">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image.src}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.image.hint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl leading-tight transition-colors duration-300 ease-in-out group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {post.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-foreground">
            <Link href="/blog">Ir al Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
