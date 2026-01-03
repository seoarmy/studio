'use client';

import { Bot, MapPin, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Bot: Bot,
  MapPin: MapPin,
  BarChart3: BarChart3,
};

export function WhyUsSection({ data }: { data?: any }) {
  const title = data?.whyUsTitle || '¿Por qué elegir Manya?';
  const description = data?.whyUsDescription || 'Porque no somos una agencia de marketing digital más. Somos tu socio estratégico en Argentina, combinando tecnología de punta, conocimiento local y un enfoque obsesivo en resultados tangibles para tu negocio.';
  const reasons = data?.whyUsReasons || [
    {
      icon: 'Bot',
      title: 'IA al servicio del marketing',
      description: 'No es moda, son resultados. Usamos IA para optimizar cada acción y potenciar tus estrategias.',
    },
    {
      icon: 'MapPin',
      title: 'Conocimiento local, alcance global',
      description: 'Con equipos en 5 provincias, entendemos el mercado argentino. Innovación real desde acá para el mundo.',
    },
    {
      icon: 'BarChart3',
      title: 'Resultados medibles y transparentes',
      description: 'Te damos acceso a un dashboard en tiempo real. Cuentas claras conservan la amistad (y los clientes).',
    },
  ];
  const image = data?.whyUsImage || 'https://images.unsplash.com/photo-1551288049-bbda38a5f85d?auto=format&fit=crop&q=80&w=1000';

  return (
    <section id="por-que-elegirnos" className="py-24 md:py-32 bg-background">
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
            <ul className="space-y-8">
              {reasons.map((reason: any, index: number) => {
                const Icon = iconMap[reason.icon] || BarChart3;
                return (
                  <li key={index} className="flex gap-6 items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-1">
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xl font-bold font-headline">{reason.title}</p>
                      <p className="mt-2 text-muted-foreground">{reason.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <Image
              src={image}
              alt="Dashboard de resultados"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
