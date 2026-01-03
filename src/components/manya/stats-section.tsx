'use client';
import { motion } from 'framer-motion';

const statVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StatsSection({ data }: { data?: any }) {
  const stats = data?.statsList || [
    { value: '150+', label: 'proyectos completados' },
    { value: '5', label: 'provincias en Argentina' },
    { value: '300%', label: 'ROI promedio' },
    { value: '24/7', label: 'automatizaciones activas' },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={statVariant}
              transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
            >
              <p className="font-headline text-5xl font-bold text-primary md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
