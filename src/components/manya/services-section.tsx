'use client';
import {
  TrendingUp,
  MousePointerClick,
  Share2,
  Mail,
  PenTool,
  BarChart3,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { services } from '@/lib/data';
import { motion } from 'framer-motion';

const iconMap: { [key: string]: React.ElementType } = {
  TrendingUp,
  MousePointerClick,
  Share2,
  Mail,
  PenTool,
  BarChart3,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="font-bold text-4xl md:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-muted-foreground md:text-lg">
            Un abanico de soluciones para impulsar tu presencia online y alcanzar
            tus objetivos de negocio.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card
                  className="h-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 bg-card border border-border"
                >
                  <CardHeader className="p-8">
                    {Icon && (
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                        <Icon className="h-8 w-8" strokeWidth={2} />
                      </div>
                    )}
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                    <CardDescription className="pt-2 text-base text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
