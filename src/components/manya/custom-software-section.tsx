'use client';
import {
    Database,
    FileCode,
    Laptop,
    LayoutDashboard,
    ListTodo,
    Users,
    Globe,
} from 'lucide-react';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';

const customSoftwareServices = [
    {
        icon: 'LayoutDashboard',
        title: 'ERP',
        slug: 'erp',
        description:
            'Sistemas de gestión empresarial integrados para optimizar todos tus procesos de negocio.',
    },
    {
        icon: 'FileCode',
        title: 'CMS',
        slug: 'cms',
        description:
            'Sistemas de gestión de contenidos personalizados para controlar tu presencia digital.',
    },
    {
        icon: 'ListTodo',
        title: 'Gestión de Proyectos',
        slug: 'gestion-proyectos',
        description:
            'Herramientas a medida para planificar, ejecutar y dar seguimiento a tus proyectos.',
    },
    {
        icon: 'Laptop',
        title: 'Apps a Medida',
        slug: 'apps-medida',
        description:
            'Desarrollo de aplicaciones personalizadas que resuelven las necesidades específicas de tu negocio.',
    },
    {
        icon: 'Database',
        title: 'Base de Datos',
        slug: 'base-datos',
        description:
            'Diseño e implementación de soluciones de almacenamiento escalables y seguras.',
    },
    {
        icon: 'Users',
        title: 'CRM',
        slug: 'crm',
        description:
            'Gestión inteligente de clientes que maximiza el lifetime value y automatiza tu embudo de ventas.',
    },
    {
        icon: 'Globe',
        title: 'Páginas Web',
        slug: 'paginas-web',
        description:
            'Desarrollo web profesional y personalizado que convierte visitantes en clientes.',
    },
];

const iconMap: { [key: string]: React.ComponentType<any> } = {
    LayoutDashboard,
    FileCode,
    ListTodo,
    Laptop,
    Database,
    Users,
    Globe,
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export function CustomSoftwareSection({ data }: { data?: any }) {
    const title = data?.customSoftwareTitle || 'Desarrollo de Software a Medida';
    const description =
        data?.customSoftwareDescription ||
        'Transformamos tus ideas en soluciones digitales potentes. Desarrollamos software personalizado que se adapta perfectamente a las necesidades de tu negocio, desde sistemas de gestión empresarial hasta aplicaciones web complejas.';

    return (
        <section id="desarrollo-software" className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="mb-16 text-center"
                >
                    <h2 className="font-headline text-4xl font-bold md:text-5xl">
                        {title}
                    </h2>
                    <p className="mt-4 mx-auto max-w-2xl text-muted-foreground md:text-lg">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                >
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 py-4">
                            {customSoftwareServices.map((service, index) => {
                                const Icon = iconMap[service.icon];
                                return (
                                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <div className="h-full p-1">
                                            <Link href={`/servicios/${service.slug}`} className="block h-full group">
                                                <Card className="h-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 bg-card border flex flex-col justify-between hover:border-accent cursor-pointer">
                                                    <CardHeader className="p-8">
                                                        {Icon && (
                                                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
                                                                <Icon className="h-8 w-8" strokeWidth={2} />
                                                            </div>
                                                        )}
                                                        <CardTitle className="text-xl font-bold font-headline transition-colors duration-300 group-hover:text-accent">
                                                            {service.title}
                                                        </CardTitle>
                                                        <CardDescription className="pt-4 text-base text-muted-foreground">
                                                            {service.description}
                                                        </CardDescription>
                                                    </CardHeader>
                                                </Card>
                                            </Link>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex" />
                        <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                >
                    <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <p className="text-muted-foreground">
                            ¿Tenés un proyecto en mente?
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/40"
                        >
                            Hablemos de tu proyecto
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
