const fs = require('fs');

const customSoftwareServices = [
    {
        title: 'ERP',
        slug: 'erp',
        description: 'Sistemas de gestión empresarial integrados para optimizar todos tus procesos de negocio.',
        herodTitle: 'Sistemas ERP a Medida',
        heroSubservices: ['Gestión de Inventario', 'Contabilidad Integrada', 'Automatización de Procesos', 'Reportes en Tiempo Real'],
    },
    {
        title: 'CMS',
        slug: 'cms',
        description: 'Sistemas de gestión de contenidos personalizados para controlar tu presencia digital.',
        herodTitle: 'CMS Personalizados y Headless',
        heroSubservices: ['Sanity.io', 'Contentful', 'WordPress a Medida', 'Gestión de Medios'],
    },
    {
        title: 'Gestión de Proyectos',
        slug: 'gestion-proyectos',
        description: 'Herramientas a medida para planificar, ejecutar y dar seguimiento a tus proyectos.',
        herodTitle: 'Software de Gestión de Proyectos',
        heroSubservices: ['Kanban Personalizado', 'Seguimiento de Tareas', 'Gestión de Recursos', 'Colaboración en Equipo'],
    },
    {
        title: 'Apps a Medida',
        slug: 'apps-medida',
        description: 'Desarrollo de aplicaciones personalizadas que resuelven las necesidades específicas de tu negocio.',
        herodTitle: 'Desarrollo de Apps y Software a Medida',
        heroSubservices: ['Apps Móviles (iOS/Android)', 'Web Apps Progresivas (PWA)', 'SaaS', 'MVPs'],
    },
    {
        title: 'Base de Datos',
        slug: 'base-datos',
        description: 'Diseño e implementación de soluciones de almacenamiento escalables y seguras.',
        herodTitle: 'Arquitectura y Gestión de Bases de Datos',
        heroSubservices: ['SQL y NoSQL', 'Migración de Datos', 'Optimización de Consultas', 'Seguridad de Datos'],
    },
    {
        title: 'Páginas Web',
        slug: 'paginas-web',
        description: 'Desarrollo web profesional y personalizado que convierte visitantes en clientes.',
        herodTitle: 'Desarrollo de Sitios Web Profesionales',
        heroSubservices: ['Landing Pages', 'Sitios Corporativos', 'E-commerce', 'Portfolios'],
    },
];

const ndjson = customSoftwareServices.map(service => {
    return JSON.stringify({
        _type: 'service',
        _id: `service-${service.slug}`,
        title: service.title,
        slug: { _type: 'slug', current: service.slug },
        meta: {
            title: `${service.title} | Soluciones de Software a Medida - MANYA Digital`,
            description: service.description
        },
        hero: {
            h1: service.herodTitle,
            subservices: service.heroSubservices
        },
        cta1: {
            h2: `¿Necesitás una solución de ${service.title}?`,
            p: service.description,
            button: 'Consultar ahora'
        },
        why: {
            h3: `¿Por qué elegir nuestro desarrollo de ${service.title}?`,
            points: [
                { title: 'Personalización Total', description: 'Adaptamos el software a tus procesos, no al revés.' },
                { title: 'Escalabilidad', description: 'Preparado para crecer junto con tu negocio.' },
                { title: 'Soporte Local', description: 'Equipo de desarrollo experto basado en Argentina.' },
                { title: 'Tecnología Moderna', description: 'Utilizamos el stack tecnológico más robusto y actual.' }
            ]
        },
        cta2: {
            h2: 'Hablemos de tu proyecto',
            button: 'Agendar reunión'
        },
        howWeHelp: {
            h3: 'Nuestro proceso de desarrollo',
            p: 'Desde la idea hasta el despliegue, te acompañamos en cada etapa.',
            points: [
                'Relevamiento y análisis de requerimientos.',
                'Diseño de arquitectura y UX/UI.',
                'Desarrollo iterativo con metodologías ágiles.',
                'Testing exhaustivo y QA.',
                'Despliegue y mantenimiento continuo.'
            ]
        },
        factors: {
            h3: 'Factores clave en el desarrollo',
            p: 'Nos enfocamos en la calidad y el rendimiento.',
            points: [
                'Código limpio y mantenible.',
                'Seguridad desde el diseño.',
                'Performance optimizada.',
                'Experiencia de usuario intuitiva.',
                'Integraciones con otros sistemas.'
            ]
        },
        rank: { // Reusing section name for "Capabilities"
            h3: 'Capacidades Técnicas',
            points: [
                { title: 'Backend Robusto', description: 'Node.js, Python, Go.' },
                { title: 'Frontend Moderno', description: 'React, Next.js, Vue.' },
                { title: 'Infraestructura Cloud', description: 'AWS, Google Cloud, Azure.' },
                { title: 'DevOps', description: 'CI/CD, Docker, Kubernetes.' }
            ]
        },
        position: {
            h3: 'Software que impulsa tu negocio',
            p: 'Invertir en software a medida es invertir en la eficiencia y el futuro de tu empresa.',
            button: 'Iniciar desarrollo'
        },
        faqs: [
            { question: `¿Cuánto tiempo toma desarrollar un ${service.title}?`, answer: 'Los tiempos varían según la complejidad del proyecto. Un MVP puede estar listo en 4-8 semanas, mientras que sistemas más complejos requieren meses de desarrollo.' },
            { question: '¿Qué tecnologías utilizan?', answer: 'Elegimos la tecnología adecuada para cada proyecto. Comúnmente usamos React/Next.js para frontend, Node.js/Python para backend y bases de datos SQL/NoSQL.' },
            { question: '¿Me entregan el código fuente?', answer: 'Sí, trabajamos con total transparencia. Al finalizar el proyecto y el pago, el código es 100% de tu propiedad.' },
            { question: '¿Ofrecen mantenimiento post-lanzamiento?', answer: 'Sí, ofrecemos planes de mantenimiento y soporte para asegurar que tu software siga funcionando perfectamente y se actualice con nuevas funcionalidades.' }
        ]
    });
}).join('\n');

fs.writeFileSync('custom-software-import.ndjson', ndjson);
console.log('generated custom-software-import.ndjson');
