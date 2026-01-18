
import { defineField } from 'sanity'

export const homeFields = [
    // --- HERO SECTION ---
    defineField({
        name: 'heroSubheading',
        title: 'Subheading (Pequeno Texto Superior)',
        type: 'string',
        group: 'hero',
        initialValue: 'Agencia de Marketing Digital en Argentina',
    }),
    defineField({
        name: 'heroHeading',
        title: 'Heading (Titulo Principal)',
        type: 'string',
        group: 'hero',
        initialValue: 'No vendemos humo. Hacemos crecer tu negocio',
    }),
    defineField({
        name: 'heroDescription',
        title: 'Description',
        type: 'text',
        group: 'hero',
        initialValue: 'Somos la agencia de marketing online que tu negocio necesita. Te damos la estrategia, la estética y la precisión de un equipo que cumple con SEO, IA y Automatizaciones.',
    }),
    defineField({
        name: 'heroCtaText',
        title: 'CTA Text',
        type: 'string',
        group: 'hero',
        initialValue: 'Pedí una consultoría gratis',
    }),
    defineField({
        name: 'heroCtaLink',
        title: 'CTA Link',
        type: 'string',
        group: 'hero',
        initialValue: '/contacto',
    }),
    defineField({
        name: 'heroImage',
        title: 'Hero Image (Optional)',
        type: 'image',
        group: 'hero',
        options: { hotspot: true },
    }),
    defineField({
        name: 'heroFloatingIcons',
        title: 'Floating Icons',
        type: 'array',
        group: 'hero',
        of: [{
            type: 'object',
            fields: [
                { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
                { name: 'color', type: 'string', title: 'Color Class (e.g. primary, accent)' },
            ]
        }],
        initialValue: [
            { icon: 'Bot', color: 'primary' },
            { icon: 'Award', color: 'accent' },
            { icon: 'Layers', color: 'secondary' },
        ]
    }),

    // --- SERVICES SECTION ---
    defineField({
        name: 'servicesTitle',
        title: 'Title',
        type: 'string',
        group: 'services',
        initialValue: 'Soluciones de nuestra Agencia de Marketing',
    }),
    defineField({
        name: 'servicesDescription',
        title: 'Description',
        type: 'text',
        group: 'services',
        initialValue: 'Nuestra agencia de marketing digital no cree en soluciones universales. Vos traés el desafío, nosotros armamos el mix de herramientas que realmente funciona para tu negocio en Argentina.',
    }),

    // --- WHY US SECTION ---
    defineField({
        name: 'whyUsTitle',
        title: 'Title',
        type: 'string',
        group: 'whyUs',
        initialValue: '¿Por qué elegir Manya?',
    }),
    defineField({
        name: 'whyUsDescription',
        title: 'Description',
        type: 'text',
        group: 'whyUs',
        initialValue: 'Porque no somos una agencia de marketing digital más. Somos tu socio estratégico en Argentina, combinando tecnología de punta, conocimiento local y un enfoque obsesivo en resultados tangibles para tu negocio.',
    }),
    defineField({
        name: 'whyUsImage',
        title: 'Image',
        type: 'image',
        group: 'whyUs',
        options: { hotspot: true },
    }),
    defineField({
        name: 'whyUsReasons',
        title: 'Reasons',
        type: 'array',
        group: 'whyUs',
        of: [{
            type: 'object',
            fields: [
                { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description' },
            ]
        }],
        initialValue: [
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
        ]
    }),

    // --- CLIENTS SECTION ---
    defineField({
        name: 'clientsTitle',
        title: 'Title',
        type: 'string',
        group: 'clients',
        initialValue: 'Sectores que Impulsamos',
    }),
    defineField({
        name: 'clientsDescription',
        title: 'Description',
        type: 'text',
        group: 'clients',
        initialValue: 'Hablamos el idioma de tu industria. Tenemos experiencia probada en los sectores más dinámicos de Argentina.',
    }),
    defineField({
        name: 'clientIndustries',
        title: 'Industries',
        type: 'array',
        group: 'clients',
        of: [{
            type: 'object',
            fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'icon', type: 'string', title: 'Icon Name' },
            ]
        }],
        initialValue: [
            { name: 'E-commerce', icon: 'ShoppingCart' },
            { name: 'Fintech', icon: 'LineChart' },
            { name: 'Real Estate', icon: 'Building' },
            { name: 'Wellness', icon: 'HeartPulse' },
            { name: 'Hotelería', icon: 'Hotel' },
            { name: 'Educación', icon: 'GraduationCap' },
            { name: 'Tecnología', icon: 'Laptop' },
            { name: 'Servicios Profesionales', icon: 'Milestone' },
        ]
    }),

    // --- SUCCESS CASES SECTION ---
    defineField({
        name: 'successCasesTitle',
        title: 'Title',
        type: 'string',
        group: 'successCases',
        initialValue: 'Casos de Éxito',
    }),
    defineField({
        name: 'successCasesDescription',
        title: 'Description',
        type: 'text',
        group: 'successCases',
        initialValue: 'Resultados posta para clientes en Argentina. Así es como transformamos negocios.',
    }),
    defineField({
        name: 'successCasesList',
        title: 'Cases',
        type: 'array',
        group: 'successCases',
        of: [{
            type: 'object',
            fields: [
                { name: 'client', type: 'string', title: 'Client' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                {
                    name: 'stats',
                    type: 'array',
                    title: 'Stats',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'value', type: 'string', title: 'Value' },
                            { name: 'label', type: 'string', title: 'Label' },
                        ]
                    }]
                }
            ]
        }],
        initialValue: [
            {
                client: 'Tienda de Moda Online',
                title: 'Explosión de Ventas con Campañas de SEM',
                description: 'Para una tienda de pilcha emergente en Argentina, armamos campañas en Google Shopping y redes que hicieron explotar sus ventas.',
                stats: [
                    { value: '+450%', label: 'de Aumento en Ventas' },
                    { value: '5.2X', label: 'de Retorno de Inversión (ROAS)' },
                ],
            },
            {
                client: 'Consultora de Negocios B2B',
                title: 'Liderazgo de Mercado con SEO y Contenido',
                description: 'Con una estrategia de SEO técnico y marketing de contenidos, pusimos a nuestro cliente como un capo en su rubro.',
                stats: [
                    { value: '+300%', label: 'de Tráfico Orgánico Calificado' },
                    { value: 'Top 3', label: 'en Rankings para Palabras Clave' },
                ],
            },
            {
                client: 'Restaurante Local',
                title: 'Comunidad Fiel en Redes Sociales',
                description: 'Manejamos las redes de un bodegón en Buenos Aires, creando una comunidad activa que multiplicó las reservas.',
                stats: [
                    { value: '+80%', label: 'de Aumento de Interacción' },
                    { value: '+40%', label: 'de Reservas desde Redes' },
                ],
            },
        ]
    }),

    // --- TESTIMONIALS SECTION ---
    defineField({
        name: 'testimonialsTitle',
        title: 'Title',
        type: 'string',
        group: 'testimonials',
        initialValue: 'Lo que Dicen Nuestros Clientes',
    }),
    defineField({
        name: 'testimonialsDescription',
        title: 'Description',
        type: 'text',
        group: 'testimonials',
        initialValue: 'La confianza y los resultados son nuestros pilares. Hablan ellos.',
    }),
    defineField({
        name: 'testimonialsList',
        title: 'Testimonials',
        type: 'array',
        group: 'testimonials',
        of: [{
            type: 'object',
            fields: [
                { name: 'quote', type: 'text', title: 'Quote' },
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'title', type: 'string', title: 'Title/Position' },
                { name: 'avatar', type: 'image', title: 'Avatar', options: { hotspot: true } },
            ]
        }],
        initialValue: [
            {
                quote: 'MANYA Digital transformó nuestra presencia online. El equipo es súper profesional, creativo y siempre están un paso adelante. ¡Los resultados hablan solos!',
                name: 'Javier Morales',
                title: 'CEO de TechBaires',
            },
            {
                quote: 'Desde que laburamos con MANYA, nuestro e-commerce no para de crecer. Entienden perfecto el mercado argentino y cómo llegarle a la gente.',
                name: 'Sofía Rossi',
                title: 'Fundadora de Moda Urbana',
            },
            {
                quote: 'La estrategia de contenidos y SEO que armaron fue impecable. Nos posicionaron como referentes en un sector muy competitivo. Unos cracks.',
                name: 'Martín Gonzalez',
                title: 'Director de FinanzasCorp',
            },
            {
                quote: 'Necesitábamos resultados rápidos y MANYA los entregó. Las campañas de Google Ads que manejaron nos trajeron clientes de calidad desde el primer mes.',
                name: 'Carolina Méndez',
                title: 'Gerente de Marketing en Inmobiliaria del Sur',
            },
            {
                quote: 'Lo que más valoro es la transparencia. Siempre sé dónde va cada peso invertido y qué resultados estamos obteniendo. Así se trabaja.',
                name: 'Diego Fernández',
                title: 'Dueño de Café & Co',
            },
            {
                quote: 'Implementaron un CRM que cambió completamente nuestra forma de trabajar. Ahora tenemos todo organizado y no perdemos ningún lead. Increíble.',
                name: 'Luciana Torres',
                title: 'Directora Comercial de EduTech',
            },
            {
                quote: 'El equipo de MANYA no solo ejecuta, sino que propone ideas constantemente. Nos ayudaron a automatizar procesos que nos ahorraron horas de trabajo.',
                name: 'Roberto Paz',
                title: 'Fundador de LogiExpress',
            },
        ]
    }),

    // --- STATS SECTION ---
    defineField({
        name: 'statsList',
        title: 'Stats',
        type: 'array',
        group: 'stats',
        of: [{
            type: 'object',
            fields: [
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'label', type: 'string', title: 'Label' },
            ]
        }],
        initialValue: [
            { value: '150+', label: 'proyectos completados' },
            { value: '5', label: 'provincias en Argentina' },
            { value: '300%', label: 'ROI promedio' },
            { value: '24/7', label: 'automatizaciones activas' },
        ]
    }),

    // --- LOCATIONS SECTION ---
    defineField({
        name: 'locationsTitle',
        title: 'Title',
        type: 'string',
        group: 'locations',
        initialValue: 'En toda Argentina, cerca tuyo',
    }),
    defineField({
        name: 'locationsDescription',
        title: 'Description',
        type: 'text',
        group: 'locations',
        initialValue: 'Con presencia en los puntos neurálgicos del país, combinamos el conocimiento local con una visión global para llevar tu marca al siguiente nivel.',
    }),
    defineField({
        name: 'locationsMapImage',
        title: 'Map Image',
        type: 'image',
        group: 'locations',
        options: { hotspot: true },
    }),
    defineField({
        name: 'locationsList',
        title: 'Locations',
        type: 'array',
        group: 'locations',
        of: [{
            type: 'object',
            fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'href', type: 'string', title: 'Link' },
            ]
        }],
        initialValue: [
            { name: 'Buenos Aires (CABA)', href: '/buenos-aires' },
            { name: 'Córdoba', href: '/cordoba' },
            { name: 'Neuquén', href: '/neuquen' },
            { name: 'Rosario', href: '/rosario' },
            { name: 'Mendoza', href: '/mendoza' },
        ]
    }),

    // --- FAQ SECTION ---
    defineField({
        name: 'faqTitle',
        title: 'Title',
        type: 'string',
        group: 'faq',
        initialValue: 'Preguntas Frecuentes',
    }),
    defineField({
        name: 'faqDescription',
        title: 'Description',
        type: 'text',
        group: 'faq',
        initialValue: 'Resolvemos algunas de las dudas más comunes que tienen nuestros clientes.',
    }),
    defineField({
        name: 'faqList',
        title: 'FAQs',
        type: 'array',
        group: 'faq',
        of: [{
            type: 'object',
            fields: [
                { name: 'question', type: 'string', title: 'Question' },
                { name: 'answer', type: 'text', title: 'Answer' },
            ]
        }],
        initialValue: [
            {
                question: '¿Qué tipo de empresas pueden beneficiarse de sus servicios?',
                answer: 'Trabajamos con una amplia variedad de clientes, desde startups y pymes hasta grandes empresas en Argentina y Latinoamérica. Si buscas crecer, mejorar tu presencia online y obtener resultados medibles, podemos ayudarte.',
            },
            {
                question: '¿Cómo miden el éxito de una campaña?',
                answer: 'Definimos KPIs (Indicadores Clave de Rendimiento) claros desde el principio. Te damos acceso a un dashboard en tiempo real para que sigas el progreso. Nos enfocamos en métricas que impactan tu negocio, como leads, ventas y retorno de inversión (ROI).',
            },
            {
                question: '¿Cuánto tardan en verse los resultados del SEO?',
                answer: 'El SEO es una estrategia a mediano-largo plazo. Generalmente, se empiezan a ver resultados significativos entre los 3 y 6 meses, dependiendo de la competencia de tu sector, el estado actual de tu web y la intensidad de la estrategia.',
            },
            {
                question: '¿Qué es el "Performance Marketing"?',
                answer: 'Es marketing enfocado 100% en resultados. A través de campañas en plataformas como Google Ads y Meta Ads, optimizamos la inversión publicitaria para maximizar el retorno (ROAS) y conseguir los objetivos de negocio de la forma más eficiente.',
            },
            {
                question: '¿Realmente necesito un CRM?',
                answer: 'Si querés escalar tu negocio y profesionalizar tu proceso de ventas y marketing, un CRM es fundamental. Te permite centralizar la información de tus clientes, automatizar la comunicación y entender mejor su comportamiento para vender más.',
            },
            {
                question: '¿Manejan presupuestos publicitarios pequeños?',
                answer: '¡Sí! Creemos que toda empresa merece crecer. Diseñamos estrategias a medida que se adaptan a differentes niveles de inversión, siempre buscando maximizar el retorno de cada peso invertido, sin importar el tamaño del presupuesto.',
            },
            {
                question: '¿En qué se diferencia MANYA Digital de otras agencias?',
                answer: 'Nos obsesionan los resultados y la tecnología. No solo ejecutamos, sino que construimos sistemas de crecimiento integrando estrategia, creatividad y un uso intensivo de datos e inteligencia artificial para tomar mejores decisiones.',
            },
            {
                question: '¿Ofrecen servicios por fuera de Argentina?',
                answer: 'Aunque nuestro core está en Argentina, tenemos experiencia y hemos lanzado campañas exitosas en otros mercados de habla hispana como Uruguay, Chile, Colombia y México. ¡Consultanos por tu caso!',
            },
            {
                question: '¿Qué necesito para empezar a trabajar con ustedes?',
                answer: 'Solo tenés que tener ganas de crecer y estar dispuesto a trabajar en equipo. El primer paso es agendar una llamada inicial sin costo para que nos cuentes tu proyecto, tus objetivos y veamos si somos el partner indicado para vos.',
            },
            {
                question: '¿Cómo es el proceso de onboarding?',
                answer: 'Una vez que cerramos el acuerdo, tenemos una reunión de kick-off para definir objetivos y alinear expectativas. Luego, te damos acceso a todas las herramientas de seguimiento y nos ponemos manos a la obra. ¡La comunicación es constante!',
            },
        ]
    }),

    // --- FINAL CTA SECTION ---
    defineField({
        name: 'finalCtaTitle',
        title: 'Title',
        type: 'string',
        group: 'finalCta',
        initialValue: '¿Listo para crecer?',
    }),
    defineField({
        name: 'finalCtaDescription',
        title: 'Description',
        type: 'text',
        group: 'finalCta',
        initialValue: 'Dejanos tu consulta y te damos 30 minutos sin cargo para analizar tu proyecto.',
    }),
    defineField({
        name: 'finalCtaButtonText',
        title: 'Button Text',
        type: 'string',
        group: 'finalCta',
        initialValue: 'Hablemos de tu proyecto',
    }),
    defineField({
        name: 'finalCtaLink',
        title: 'Link',
        type: 'string',
        group: 'finalCta',
        initialValue: '/contacto',
    }),

    // --- SEO ---
    defineField({
        name: 'seoTitle',
        title: 'SEO Title',
        type: 'string',
        group: 'seo',
        initialValue: 'Agencia de Marketing Digital en Argentina | MANYA Digital',
    }),
    defineField({
        name: 'seoDescription',
        title: 'SEO Description',
        type: 'text',
        group: 'seo',
        initialValue: 'Potenciá tu negocio con estrategias de SEO, Publicidad, Diseño Web y Automatizaciones. Consultoría gratuita.',
    }),
    defineField({
        name: 'seoImage',
        title: 'SEO Image',
        type: 'image',
        group: 'seo',
        options: { hotspot: true },
    }),
]

