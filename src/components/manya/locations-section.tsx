'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, MoveRight } from 'lucide-react';

export function LocationsSection({ data }: { data?: any }) {
    const title = data?.locationsTitle || 'En toda Argentina, cerca tuyo';
    const description = data?.locationsDescription || 'Con presencia en los puntos neurálgicos del país, combinamos el conocimiento local con una visión global para llevar tu marca al siguiente nivel.';
    const locations = data?.locationsList || [
        { name: 'Buenos Aires (CABA)', href: '/buenos-aires' },
        { name: 'Córdoba', href: '/cordoba' },
        { name: 'Neuquén', href: '/neuquen' },
        { name: 'Rosario', href: '/rosario' },
        { name: 'Mendoza', href: '/mendoza' },
    ];
    const mapImage = data?.locationsMapImage || 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=1000';

    return (
        <section id="donde-trabajamos" className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="space-y-12"
                    >
                        <div>
                            <h3 className="font-headline font-bold text-4xl md:text-5xl">
                                {title}
                            </h3>
                            <p className="mt-6 max-w-3xl text-muted-foreground md:text-lg">
                                {description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {locations.map((location: any) => (
                                <Link href={location.href || '#'} key={location.name} className="group">
                                    <Card className="h-full transition-all duration-300 ease-in-out group-hover:bg-muted/60 group-hover:shadow-md group-hover:-translate-y-1 border">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                                                <p className="font-semibold text-base md:text-lg leading-tight">{location.name}</p>
                                            </div>
                                            <MoveRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="overflow-hidden rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20 border-4 border-muted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    >
                        <Image
                            src={mapImage}
                            alt="Mapa de Argentina"
                            width={500}
                            height={600}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
