import { PlaceHolderImages } from './placeholder-images';
import type { ImagePlaceholder } from './placeholder-images';

const getImage = (id: string): { src: string; hint: string } => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return {
    src: image?.imageUrl || '',
    hint: image?.imageHint || '',
  };
};

export const navLinks = [
  { name: 'Servicios', href: '/servicios' },
  { name: 'Por qué elegirnos', href: '#por-que-elegirnos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
];

export const services = [
  {
    icon: 'TrendingUp',
    title: 'SEO',
    slug: 'seo',
    description:
      'Posicionamiento orgánico con estrategias basadas en datos e IA.',
  },
  {
    icon: 'PencilRuler',
    title: 'Diseño Web',
    slug: 'diseno-web',
    description:
      'Sitios web que convierten, diseñados para la experiencia del usuario.',
  },
  {
    icon: 'Share2',
    title: 'Gestión de RRSS',
    slug: 'gestion-rrss',
    description:
      'Community management estratégico que genera engagement real.',
  },
  {
    icon: 'MousePointerClick',
    title: 'Performance Marketing',
    slug: 'performance-marketing',
    description: 'Meta Ads y Google Ads optimizados con machine learning.',
  },
  {
    icon: 'Users',
    title: 'CRM',
    slug: 'crm',
    description: 'Gestión inteligente de clientes que maximiza el lifetime value.',
  },
  {
    icon: 'Component',
    title: 'Automatizaciones',
    slug: 'automatizaciones',
    description: 'Workflows inteligentes con IA que escalan tu operación.',
  },
];

export const successCases = [
  {
    client: 'Tienda de Moda Online',
    title: 'Explosión de Ventas con Campañas de SEM',
    description:
      'Para una tienda de pilcha emergente en Argentina, armamos campañas en Google Shopping y redes que hicieron explotar sus ventas.',
    image: getImage('success-2'),
    stats: [
      { value: '+450%', label: 'de Aumento en Ventas' },
      { value: '5.2X', label: 'de Retorno de Inversión (ROAS)' },
    ],
  },
  {
    client: 'Consultora de Negocios B2B',
    title: 'Liderazgo de Mercado con SEO y Contenido',
    description:
      'Con una estrategia de SEO técnico y marketing de contenidos, pusimos a nuestro cliente como un capo en su rubro.',
    image: getImage('success-1'),
    stats: [
      { value: '+300%', label: 'de Tráfico Orgánico Calificado' },
      { value: 'Top 3', label: 'en Rankings para Palabras Clave' },
    ],
  },
  {
    client: 'Restaurante Local',
    title: 'Comunidad Fiel en Redes Sociales',
    description:
      'Manejamos las redes de un bodegón en Buenos Aires, creando una comunidad activa que multiplicó las reservas.',
    image: getImage('success-3'),
    stats: [
      { value: '+80%', label: 'de Aumento de Interacción' },
      { value: '+40%', label: 'de Reservas desde Redes' },
    ],
  },
];

export const testimonials = [
  {
    quote:
      'Manya Digital transformó nuestra presencia online. El equipo es súper profesional, creativo y siempre están un paso adelante. ¡Los resultados hablan solos!',
    name: 'Javier Morales',
    title: 'CEO de TechBaires',
    avatar: getImage('testimonial-2'),
  },
  {
    quote:
      'Desde que laburamos con Manya, nuestro e-commerce no para de crecer. Entienden perfecto el mercado argentino y cómo llegarle a la gente.',
    name: 'Sofía Rossi',
    title: 'Fundadora de Moda Urbana',
    avatar: getImage('testimonial-3'),
  },
  {
    quote:
      'La estrategia de contenidos y SEO que armaron fue impecable. Nos posicionaron como referentes en un sector muy competitivo. Unos cracks.',
    name: 'Martín Gonzalez',
    title: 'Director de FinanzasCorp',
    avatar: getImage('testimonial-1'),
  },
];

export const blogPosts = [
  {
    slug: 'tendencias-marketing-digital-argentina-2024',
    title: 'Top 5 Tendencias de Marketing Digital en Argentina para 2024',
    excerpt:
      'El mundo digital argento no para de cambiar. Te contamos las posta que tu negocio no puede dejar pasar este año.',
    date: '15 de Julio, 2024',
    image: getImage('blog-1'),
    category: 'Estrategia Digital',
    author: {
        name: 'Equipo Manya Digital',
        avatar: getImage('testimonial-1'),
    },
    readTime: '8 min de lectura',
    lastUpdated: '16 de Julio, 2024',
    intro: `<p>El marketing digital en Argentina es un ecosistema en constante evolución. Para que tu marca no se quede atrás, es crucial estar al tanto de las últimas tendencias. Acá te dejamos un resumen de las 5 más importantes para lo que queda de 2024.</p>`,
    content: `
        <h2 id="ia-generativa">1. IA Generativa para Contenidos</h2>
        <p>La inteligencia artificial generativa está revolucionando la forma en que creamos contenido. Herramientas como ChatGPT, Gemini o Midjourney permiten generar textos, imágenes y hasta videos en segundos. Esto no reemplaza la creatividad humana, pero sí la potencia, permitiendo escalar la producción de contenido y personalizarlo a un nivel nunca antes visto. Desde copys para anuncios hasta borradores de artículos de blog, la IA es tu nuevo copiloto creativo.</p>
        
        <div style="background-color: hsl(var(--primary)/0.1); border-left: 4px solid hsl(var(--primary)); padding: 1.5rem; border-radius: 0.75rem; margin: 2rem 0;">
            <h4 style="font-size: 1.25rem; font-weight: 700; color: hsl(var(--primary)); margin-top: 0;">¿Querés aplicar IA en tu estrategia?</h4>
            <p style="margin-top: 0.5rem; color: hsl(var(--foreground));">Nosotros te ayudamos a integrar herramientas de inteligencia artificial para potenciar tu marketing.</p>
            <a href="/contacto" style="display: inline-block; margin-top: 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 0.5rem 1.5rem; border-radius: 9999px; text-decoration: none; font-weight: 600;">Hablemos</a>
        </div>

        <h2 id="video-corto">2. El Reinado del Video Corto</h2>
        <p>TikTok, Instagram Reels, YouTube Shorts... el formato de video vertical y corto sigue siendo el rey indiscutido del engagement. Los usuarios prefieren consumir contenido rápido, entretenido y auténtico. Las marcas que logran contar historias y mostrar sus productos de manera creativa en videos de 15 a 60 segundos tienen una ventaja competitiva enorme.</p>
        
        <blockquote>"Si no estás creando videos cortos, estás dejando pasar la mayor oportunidad de conectar con tu audiencia hoy."</blockquote>

        <h2 id="seo-conversacional">3. SEO conversacional y Búsqueda por Voz</h2>
        <p>Cada vez más gente usa asistentes de voz como Google Assistant o Siri para buscar información. Esto cambia la forma en que debemos pensar el SEO. Ya no se trata solo de palabras clave, sino de responder preguntas completas y naturales. Optimizar tu contenido para búsquedas conversacionales (long-tail keywords) es clave para capturar este tráfico en crecimiento.</p>
        
        <ul>
            <li><strong>Optimizar para preguntas:</strong> Crear contenido que responda directamente a "quién", "qué", "dónde", "cuándo", "por qué" y "cómo".</li>
            <li><strong>Featured Snippets:</strong> Apuntar a aparecer en los fragmentos destacados de Google, que son los que suelen leer los asistentes de voz.</li>
            <li><strong>SEO Local:</strong> Asegurarse de que la información de tu negocio (dirección, horarios) esté actualizada para búsquedas "cerca de mí".</li>
        </ul>

        <table>
            <thead>
                <tr>
                    <th>Formato de Búsqueda</th>
                    <th>Ejemplo</th>
                    <th>Enfoque SEO</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tradicional</td>
                    <td>"restaurantes palermo"</td>
                    <td>Palabras clave cortas</td>
                </tr>
                <tr>
                    <td>Conversacional</td>
                    <td>"cuáles son los mejores restaurantes para ir con chicos en palermo"</td>
                    <td>Preguntas y long-tail</td>
                </tr>
            </tbody>
        </table>

        <h2 id="privacidad">4. Marketing en un Mundo sin Cookies</h2>
        <p>La desaparición de las cookies de terceros nos obliga a repensar la forma en que personalizamos y medimos la publicidad. El foco se traslada hacia la recolección de datos de primera mano (First-Party Data). Estrategias como el email marketing, los programas de lealtad y la creación de contenido de valor para obtener datos de los usuarios de forma consentida son más importantes que nunca.</p>
        
        <h2 id="comercio-social">5. Social Commerce y Live Shopping</h2>
        <p>Las redes sociales ya no son solo para mostrar productos, sino para venderlos directamente. Plataformas como Instagram y TikTok están integrando cada vez más funciones de e-commerce que permiten a los usuarios comprar sin salir de la app. El "live shopping" (ventas en vivo) también está ganando terreno, creando una experiencia de compra interactiva y generando un sentido de urgencia que impulsa las ventas.</p>
    `,
    tags: ['Marketing Digital', 'Tendencias', 'IA', 'SEO'],
  },
  {
    slug: 'el-poder-de-la-ia-en-redes-sociales',
    title: 'El Poder de la IA para Potenciar tu Estrategia en Redes Sociales',
    excerpt:
      'La inteligencia artificial ya no es el futuro, es el ahora. Descubrí cómo usarla para optimizar tus campañas y contenidos.',
    date: '02 de Julio, 2024',
    image: getImage('blog-2'),
    category: 'Redes Sociales',
    author: {
        name: 'Equipo Manya Digital',
        avatar: getImage('testimonial-2'),
    },
    readTime: '10 min de lectura',
    lastUpdated: null,
    intro: `<p>La inteligencia artificial (IA) ha dejado de ser una promesa futurista para convertirse en una herramienta indispensable en el arsenal de cualquier estratega de redes sociales. Si sentís que estás corriendo detrás de las tendencias y te cuesta generar contenido relevante de forma consistente, la IA es tu mejor aliada para cambiar el juego.</p>`,
    content: `<p>En este artículo, vamos a desglosar cómo la IA puede potenciar tu estrategia en redes sociales, desde la creación de contenido hasta el análisis de métricas, para que puedas trabajar de manera más inteligente, no más dura.</p>`,
    tags: ['IA', 'Redes Sociales', 'Automatización'],
  },
  {
    slug: 'seo-local-clave-para-negocios-fisicos',
    title: 'SEO Local: La Clave para que Negocios a la Calle la Rompan Online',
    excerpt:
      'Si tenés un local, tienda o boliche, el SEO local es tu mejor amigo para atraer clientes de tu barrio. Te explicamos cómo arrancar.',
    date: '20 de Junio, 2024',
    image: getImage('blog-3'),
    category: 'SEO',
    author: {
        name: 'Equipo Manya Digital',
        avatar: getImage('testimonial-3'),
    },
    readTime: '12 min de lectura',
    lastUpdated: null,
    intro: `<p>¿Tenés un negocio con una ubicación física? Entonces, más que nadie, necesitás que la gente de tu zona te encuentre. De nada sirve tener el mejor producto o servicio si tus vecinos no saben que existís. Acá es donde entra el SEO Local, tu arma secreta para dominar las búsquedas "cerca de mí".</p>`,
    content: `<p>Olvidate de competir con gigantes a nivel nacional. Tu objetivo es ser el rey de tu barrio, y en esta guía te vamos a mostrar exactamente cómo lograrlo.</p>`,
    tags: ['SEO', 'Negocios Locales', 'Google My Business'],
  },
];
