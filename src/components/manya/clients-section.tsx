'use client';

import { Building, GraduationCap, HeartPulse, Hotel, Laptop, LineChart, Milestone, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const industries = [
  { name: 'E-commerce', icon: ShoppingCart },
  { name: 'Fintech', icon: LineChart },
  { name: 'Real Estate', icon: Building },
  { name: 'Wellness', icon: HeartPulse },
  { name: 'Hotelería', icon: Hotel },
  { name: 'Educación', icon: GraduationCap },
  { name: 'Tecnología', icon: Laptop },
  { name: 'Servicios Profesionales', icon: Milestone },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

export function ClientsSection() {
  return (
    <section id="nuestros-clientes" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            Sectores que Impulsamos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Hablamos el idioma de tu industria. Tenemos experiencia probada en los sectores más dinámicos de Argentina.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
              >
                <Card className="group h-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/15 bg-card border flex flex-col items-center justify-center text-center p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {industry.name}
                  </h3>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
