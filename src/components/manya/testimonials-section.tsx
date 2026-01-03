import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TestimonialsSection({ data }: { data?: any }) {
  const title = data?.testimonialsTitle || 'Lo que Dicen Nuestros Clientes';
  const description = data?.testimonialsDescription || 'La confianza y los resultados son nuestros pilares. Hablan ellos.';
  const testimonials = data?.testimonialsList || [];

  return (
    <section id="testimonios" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h3 className="font-headline text-3xl font-bold md:text-4xl">
            {title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial: any, index: number) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-lg bg-card border">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <p className="mb-4 text-muted-foreground flex-grow">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              ?.split(' ')
                              .map((n: string) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex transition-transform duration-300 ease-in-out hover:scale-110" />
          <CarouselNext className="hidden sm:flex transition-transform duration-300 ease-in-out hover:scale-110" />
        </Carousel>
      </div>
    </section>
  );
}
