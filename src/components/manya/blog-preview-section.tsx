import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { client, urlFor } from '@/lib/sanity';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

async function getLatestPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...3] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage
  }`;

  return await client.fetch(query);
}

export async function BlogPreviewSection() {
  const latestPosts = await getLatestPosts();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM, yyyy", { locale: es });
  };

  return (
    <section id="blog" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h3 className="font-headline text-3xl font-bold md:text-4xl">
            Desde Nuestro Rincón Digital
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Análisis, tendencias y consejos sobre el universo del marketing
            digital en Argentina.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post: any) => (
            <Card key={post.slug} className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl bg-card border">
              <Link href={`/blog/${post.slug}`} className="block group h-full flex flex-col">
                <div className="relative h-48 w-full">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl leading-tight transition-colors duration-300 ease-in-out group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4 text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
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

