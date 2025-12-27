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
  { name: 'Servicios', href: '#servicios' },
  { name: 'Casos de Éxito', href: '#casos-de-exito' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '#contacto' },
];

export const services = [
  {
    icon: 'TrendingUp',
    title: 'SEO (Search Engine Optimization)',
    description:
      'Posicionamos tu marca en los primeros resultados de búsqueda para atraer clientes calificados de forma orgánica y sostenida.',
  },
  {
    icon: 'MousePointerClick',
    title: 'SEM (Search Engine Marketing)',
    description:
      'Creamos y gestionamos campañas de pago por clic (PPC) en Google Ads para generar tráfico y conversiones de una.',
  },
  {
    icon: 'Share2',
    title: 'Gestión de Redes Sociales',
    description:
      'Construimos y gestionamos tu comunidad online, creando contenido que engancha, genera interacción y fideliza a tu audiencia.',
  },
  {
    icon: 'Mail',
    title: 'Email Marketing',
    description:
      'Diseñamos estrategias de email marketing personalizadas para nutrir leads, mantener informados a tus clientes y potenciar tus ventas.',
  },
  {
    icon: 'PenTool',
    title: 'Marketing de Contenidos',
    description:
      'Producimos contenido de valor (blogs, videos, ebooks) que posiciona a tu marca como referente y atrae a tu público.',
  },
  {
    icon: 'BarChart3',
    title: 'Analítica Web',
    description:
      'Medimos, analizamos y te contamos el rendimiento de tus activos digitales para optimizar tus estrategias y maximizar el retorno de inversión.',
  },
];

export const successCases = [
  {
    client: 'Tienda de Moda Online',
    title: 'Explosión de Ventas con Campañas de SEM',
    description:
      'Para una tienda de moda emergente en Argentina, diseñamos campañas en Google Shopping y redes sociales que hicieron explotar sus ventas.',
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
      'A través de una estrategia de SEO técnico y marketing de contenidos, posicionamos a nuestro cliente como un líder de opinión en su nicho.',
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
      'Manejamos las redes sociales de un restaurante en Buenos Aires, creando una comunidad activa que multiplicó las reservas.',
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
      'Manya Digital transformó nuestra presencia online. El equipo es súper profesional, creativo y siempre está un paso adelante. ¡Nuestros resultados lo dicen todo!',
    name: 'Javier Morales',
    title: 'CEO de TechBaires',
    avatar: getImage('testimonial-2'),
  },
  {
    quote:
      'Desde que laburamos con Manya, nuestro e-commerce no para de crecer. Entienden perfecto el mercado argentino y cómo llegarle a nuestros clientes.',
    name: 'Sofía Rossi',
    title: 'Fundadora de Moda Urbana',
    avatar: getImage('testimonial-3'),
  },
  {
    quote:
      'La estrategia de contenidos y SEO que armaron fue impecable. Nos posicionaron como referentes en un sector muy competitivo.',
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
      'El mundo digital argentino no para de cambiar. Te contamos las tendencias clave que tu negocio no puede dejar pasar este año.',
    date: '15 de Julio, 2024',
    image: getImage('blog-1'),
  },
  {
    slug: 'el-poder-de-la-ia-en-redes-sociales',
    title: 'El Poder de la IA para Potenciar tu Estrategia en Redes Sociales',
    excerpt:
      'La inteligencia artificial ya no es el futuro, es el ahora. Descubrí cómo usarla para optimizar tus campañas y contenidos.',
    date: '02 de Julio, 2024',
    image: getImage('blog-2'),
  },
  {
    slug: 'seo-local-clave-para-negocios-fisicos',
    title: 'SEO Local: La Clave para que Negocios a la Calle Triunfen Online',
    excerpt:
      'Si tenés un local, tienda o restaurante, el SEO local es tu mejor amigo para atraer clientes de tu zona. Te explicamos cómo arrancar.',
    date: '20 de Junio, 2024',
    image: getImage('blog-3'),
  },
];
