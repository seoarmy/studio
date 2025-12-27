'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden md:h-screen">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <motion.div 
            className="absolute inset-0"
            style={{ y: offsetY * 0.3 }}
          >
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent"></div>
      </div>
      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground md:items-start md:text-left">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-bold text-4xl leading-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
            Llevamos tu Marca al Siguiente Nivel Digital
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground drop-shadow-md md:text-xl">
            Estrategias de marketing innovadoras para que tu negocio se destaque
            en el mercado argentino.
          </p>
          <Button asChild size="lg" className="mt-10 bg-gradient-to-r from-primary to-accent text-lg font-bold text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-primary/40 rounded-full px-8 py-6">
            <Link href="#contacto">Hablemos de tu Proyecto</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
