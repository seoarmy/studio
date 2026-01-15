
export const dynamic = 'force-dynamic';

import {
  Card, CardContent,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { MoveRight, Megaphone, Code2, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { servicesQuery } from '@/lib/queries';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Servicios de Marketing Digital y Desarrollo de Software | MANYA Digital',
  description:
    'Soluciones integrales para tu negocio: desde Marketing Digital y SEO hasta Desarrollo de Software a medida. Conocé todo lo que podemos hacer por vos.',
  openGraph: {
    type: 'website',
    url: '/servicios',
    title: 'Servicios de Marketing Digital y Desarrollo de Software | MANYA Digital',
    description: 'Soluciones integrales para tu negocio: Marketing Digital, SEO y Desarrollo de Software a medida.',
  },
};

const processSteps = [
  { title: 'Discovery', description: 'Nos metemos de lleno para conocer tu negocio, tus metas y tus dolores.' },
  { title: 'Estrategia', description: 'Con data en mano, diseñamos un plan a medida. Sin humo, solo acciones concretas.' },
  { title: 'Ejecución', description: 'Ponemos manos a la obra. Implementamos, medimos y te mantenemos al tanto de todo.' },
  { title: 'Optimización', description: 'El trabajo nunca termina. Analizamos resultados y ajustamos para mejorar continuamente.' }
];

const generalFaqs = [
  { question: '¿Trabajan solo con empresas de Argentina?', answer: 'Principalmente sí, pero trabajamos con clientes de todo el mundo, adaptando nuestras estrategias a cada mercado.' },
  { question: '¿Cómo se contrata un servicio?', answer: 'El primer paso es tener una reunión de Discovery para entender tus necesidades. Luego te presentamos una propuesta a medida.' },
  { question: '¿Hacen desarrollo y marketing juntos?', answer: '¡Sí! Es nuestra gran ventaja. Podemos crear tu producto digital (software/web) y luego encargarnos de su crecimiento con marketing.' },
  { question: '¿Tienen planes mensuales?', answer: 'Sí, para servicios como SEO, Redes Sociales y Mantenimiento de Software ofrecemos planes recurrentes. Para desarrollos puntuales, se trabaja por proyecto.' },
];

const marketingSlugs = ['seo', 'diseno-web', 'gestion-rrss', 'performance-marketing', 'automatizaciones'];
const softwareSlugs = ['erp', 'cms', 'gestion-proyectos', 'apps-medida', 'base-datos', 'paginas-web'];

export default async function ServiciosPage() {
  const allServices: any[] = await client.fetch(servicesQuery);

  const marketingServices = allServices.filter(s => marketingSlugs.includes(s.slug));
  const softwareServices = allServices.filter(s => softwareSlugs.includes(s.slug));

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de MANYA Digital',
    itemListElement: allServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.meta?.description || service.cta1?.p,
        url: `https://manyadigital.com.ar/servicios/${service.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'MANYA Digital',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 text-center md:py-32">
        <div className="container relative z-10">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Soluciones que <span className="text-primary">transforman</span> negocios
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Unimos lo mejor de dos mundos: estrategias de marketing que venden y software que potencia tu operación. Todo en un solo lugar.
          </p>
        </div>
      </div>

      <div className="container space-y-32 pb-24">

        {/* Marketing Section */}
        <section id="marketing">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Megaphone className="h-8 w-8" />
            </div>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Marketing Digital & Estrategia</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
              Hacemos que tu marca se vea, se escuche y, lo más importante, que venda. Estrategias basadas en datos para dominar tu mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingServices.map(service => (
              <Card key={service.slug} className="flex flex-col border-primary/20 hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-8 flex-grow flex flex-col">
                  <h3 className="font-headline text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground flex-grow mb-6 leading-relaxed">
                    {service.meta?.description || service.cta1?.p}
                  </p>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className={buttonVariants({ variant: "outline", className: "w-full group hover:bg-primary hover:text-primary-foreground" })}
                  >
                    Ver servicio
                    <MoveRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Software Section */}
        <section id="software" className="relative">
          {/* Decorative background element could go here */}
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Code2 className="h-8 w-8" />
            </div>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Desarrollo de Software & Tecnología</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
              Creamos las herramientas que tu negocio necesita para escalar. Desde aplicaciones a medida hasta sistemas de gestión complejos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareServices.map(service => (
              <Card key={service.slug} className="flex flex-col border-accent/20 hover:border-accent/50 transition-colors duration-300">
                <CardContent className="p-8 flex-grow flex flex-col">
                  <h3 className="font-headline text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground flex-grow mb-6 leading-relaxed">
                    {service.meta?.description || service.cta1?.p}
                  </p>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className={buttonVariants({ variant: "outline", className: "w-full group hover:bg-accent hover:text-accent-foreground" })}
                  >
                    Explorar solución
                    <MoveRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section id="proceso" className="rounded-3xl bg-muted/30 py-16 px-6 md:px-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Nuestro Proceso</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg">
            Metodología probada para garantizar resultados, sin importar el desafío.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center bg-background p-6 rounded-2xl shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-headline text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-headline text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h2>
            <p className="mt-4 text-muted-foreground">Resolvemos tus dudas antes de empezar.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {generalFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="mb-2">
                <AccordionTrigger className="text-left font-semibold text-lg p-4 bg-muted/30 rounded-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="font-headline font-bold text-2xl md:text-3xl">¿Listo para transformar tu negocio?</h3>
              <p className="mt-2 text-primary-foreground/80 text-lg">No importa si necesitás marketing, software o ambos. Tenemos el equipo para hacerlo realidad.</p>
            </div>
            <Link
              href="/contacto"
              className={buttonVariants({ size: "lg", variant: "secondary", className: "group shrink-0 rounded-full px-8 text-lg font-semibold" })}
            >
              Hablemos hoy
              <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </CardContent>
        </Card>

      </div>
    </>
  );
}
