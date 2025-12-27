'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, Linkedin, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
    const jellyfishImage = PlaceHolderImages.find((p) => p.id === 'jellyfish');

  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 min-h-screen grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Columna Izquierda: Texto y CTA */}
        <div className="z-10 flex flex-col justify-center py-24">
          <div className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">De la idea al resultado</div>
          <h1 className="font-headline text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Marketing Digital que va más a fondo.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Dejá de tercerizar. Te damos la estrategia, la estética y la precisión de un equipo que cumple.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-primary/40 rounded-full px-8 py-6 text-lg">
                <Link href="#contacto">Pedí una consultoría gratis</Link>
            </Button>
            <p className="text-sm text-muted-foreground max-w-[200px]">Dejanos tu consulta y te damos 30 minutos sin cargo.</p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-6 text-foreground">
             <Card className="bg-card/5 border-border/20 backdrop-blur-sm">
                <CardContent className="p-6">
                    <h3 className="text-3xl font-bold text-primary">30+</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Servicios de SEO, IA y Automatización para potenciar tu negocio.</p>
                </CardContent>
             </Card>
             <Card className="bg-card/5 border-border/20 backdrop-blur-sm">
                <CardContent className="p-6">
                    <h3 className="text-3xl font-bold text-primary">150+</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Proyectos impulsados en más de 5 provincias de Argentina.</p>
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Columna Derecha: Imagen y Stats */}
        <div className="relative h-full w-full hidden lg:flex items-center justify-center">
           {jellyfishImage && (
             <Image
                src={jellyfishImage.imageUrl}
                alt="Marketing digital profundo"
                fill
                className="object-contain object-center scale-125"
                data-ai-hint={jellyfishImage.imageHint}
                priority
             />
           )}
           <div className="absolute top-[20%] right-0 flex flex-col gap-4">
            <Button variant="outline" size="icon" className="bg-card/10 border-border/20 backdrop-blur-sm hover:bg-card/30">
                <Linkedin className="h-5 w-5"/>
            </Button>
             <Button variant="outline" size="icon" className="bg-card/10 border-border/20 backdrop-blur-sm hover:bg-card/30">
                <Bot className="h-5 w-5"/>
            </Button>
           </div>

           <Card className="absolute bottom-[20%] right-0 w-64 bg-card/10 border-border/20 backdrop-blur-md rounded-2xl shadow-2xl">
                <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                        <Search className="h-8 w-8" />
                    </div>
                    <p className="font-bold text-lg text-foreground">SEO que factura</p>
                    <p className="text-sm text-muted-foreground mt-2">Sabemos cómo conseguir clientes sin que quemes tu presupuesto.</p>
                </CardContent>
           </Card>

        </div>
      </div>
    </section>
  );
}
