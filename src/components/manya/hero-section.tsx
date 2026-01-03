
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Bot, Briefcase, Layers } from 'lucide-react';
import { motion } from 'framer-motion';


const iconVariants = (duration: number) => ({
  initial: { y: 0 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
});

const lucideIconMap: Record<string, any> = {
  Bot,
  Award,
  Layers,
  Briefcase,
};

export function HeroSection({ data }: { data?: any }) {
  const subheading = data?.heroSubheading || 'Agencia de Marketing Digital en Argentina';
  const heading = data?.heroHeading || 'No vendemos humo. Hacemos crecer tu negocio';
  const description = data?.heroDescription || 'Somos la agencia de marketing online que tu negocio necesita. Te damos la estrategia, la estética y la precisión de un equipo que cumple con SEO, IA y Automatizaciones.';
  const ctaText = data?.heroCtaText || 'Pedí una consultoría gratis';
  const ctaLink = data?.heroCtaLink || '/contacto';
  const floatingIcons = data?.heroFloatingIcons || [
    { icon: 'Bot', color: 'primary' },
    { icon: 'Award', color: 'accent' },
    { icon: 'Layers', color: 'secondary' },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 min-h-screen grid lg:grid-cols-2 gap-8 items-center">

        {/* Columna Izquierda: Texto y CTA */}
        <div className="z-10 flex flex-col justify-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">{subheading}</h1>
            <h3 className="font-headline text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              {heading}
            </h3>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-primary/40 rounded-full px-8 py-6 text-lg">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
            <p className="text-sm text-muted-foreground max-w-[200px]">Dejanos tu consulta y te damos 30 minutos sin cargo.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 text-foreground"
          >
            <Card className="bg-background/50 border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">30+</p>
                  <p className="mt-1 text-sm text-muted-foreground">Servicios de SEO, IA y Automatización.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background/50 border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">150+</p>
                  <p className="mt-1 text-sm text-muted-foreground">Proyectos impulsados en Argentina.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Columna Derecha: Iconos 3D */}
        <div className="relative h-full w-full hidden lg:flex items-center justify-center">
          {floatingIcons[0] && (
            <motion.div
              variants={iconVariants(5)}
              initial="initial"
              animate="animate"
              className={`absolute top-1/4 left-1/4 w-24 h-24 bg-${floatingIcons[0].color}/10 rounded-full flex items-center justify-center shadow-lg`}
            >
              {(() => {
                const Icon = lucideIconMap[floatingIcons[0].icon] || Bot;
                return <Icon className={`h-12 w-12 text-${floatingIcons[0].color}`} strokeWidth={1.5} />;
              })()}
            </motion.div>
          )}
          {floatingIcons[1] && (
            <motion.div
              variants={iconVariants(7)}
              initial="initial"
              animate="animate"
              className={`absolute top-1/2 right-1/4 w-28 h-28 bg-${floatingIcons[1].color}/10 rounded-full flex items-center justify-center shadow-xl`}
            >
              {(() => {
                const Icon = lucideIconMap[floatingIcons[1].icon] || Award;
                return <Icon className={`h-14 w-14 text-${floatingIcons[1].color}`} strokeWidth={1.5} />;
              })()}
            </motion.div>
          )}
          {floatingIcons[2] && (
            <motion.div
              variants={iconVariants(6)}
              initial="initial"
              animate="animate"
              className={`absolute bottom-1/4 left-1/3 w-20 h-20 bg-${floatingIcons[2].color}/10 border rounded-full flex items-center justify-center shadow-md`}
            >
              {(() => {
                const Icon = lucideIconMap[floatingIcons[2].icon] || Layers;
                return <Icon className={`h-10 w-10 text-${floatingIcons[2].color || 'foreground/80'}`} strokeWidth={1.5} />;
              })()}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
