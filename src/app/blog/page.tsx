import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { blogPosts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog | Manya Digital',
  description:
    'Las últimas tendencias, noticias y consejos de marketing digital relevantes para el mercado argentino.',
};

export default function BlogPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Nuestro Rincón Digital
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Análisis, tendencias y consejos sobre el universo del marketing
            digital en Argentina.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card
              key={post.slug}
              id={post.slug}
              className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl border bg-card"
            >
                <Link href={`/blog/${post.slug}`} className="block group h-full flex flex-col">
                    <div className="relative h-56 w-full">
                        <Image
                        src={post.image.src}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post.image.hint}
                        />
                         <Badge className="absolute top-4 right-4" variant="default">{post.category}</Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                        </CardTitle>
                        <CardDescription>{post.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                        <span className="font-semibold text-primary hover:underline">
                            Leer más &rarr;
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
