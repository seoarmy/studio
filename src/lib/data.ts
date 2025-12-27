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
  { name: 'Análisis Predictivo', href: '/analisis-predictivo' },
  { name: 'Contacto', href: '#contacto' },
];

export const services = [
  {
    icon: 'TrendingUp',
    title: 'SEO (Search Engine Optimization)',
    description:
      'Posicionamos tu marca en la cima de los resultados de búsqueda para atraer clientes calificados de forma orgánica y sostenida.',
  },
  {
    icon: 'MousePointerClick',
    title: 'SEM (Search Engine Marketing)',
    description:
      'Creamos y gestionamos campañas de pago por clic (PPC) en Google Ads para generar tráfico y conversiones inmediatas.',
  },
  {
    icon: 'Share2',
    title: 'Gestión de Redes Sociales',
    description:
      'Construimos y gestionamos tu comunidad online, creando contenido atractivo que genera engagement y fideliza a tu audiencia.',
  },
  {
    icon: 'Mail',
    title: 'Email Marketing',
    description:
      'Diseñamos estrategias de email marketing personalizadas para nutrir leads, informar a tus clientes y potenciar tus ventas.',
  },
  {
    icon: 'PenTool',
    title: 'Marketing de Contenidos',
    description:
      'Producimos contenido de valor (blogs, videos, ebooks) que posiciona tu marca como referente y atrae a tu público objetivo.',
  },
  {
    icon: 'BarChart3',
    title: 'Analítica Web',
    description:
      'Medimos, analizamos y reportamos el rendimiento de tus activos digitales para optimizar tus estrategias y maximizar el ROI.',
  },
];

export const successCases = [
  {
    client: 'Tienda de Moda Online',
    title: 'Explosión de Ventas con Campañas SEM',
    description:
      'Para una tienda de moda emergente en Argentina, diseñamos campañas en Google Shopping y redes sociales que dispararon sus ventas.',
    image: getImage('success-2'),
    stats: [
      { value: '+450%', label: 'Aumento en Ventas' },
      { value: '5.2X', label: 'Retorno de Inversión (ROAS)' },
    ],
  },
  {
    client: 'Consultora de Negocios B2B',
    title: 'Liderazgo de Mercado con SEO y Contenido',
    description:
      'A través de una estrategia de SEO técnico y marketing de contenidos, posicionamos a nuestro cliente como líder de opinión en su nicho.',
    image: getImage('success-1'),
    stats: [
      { value: '+300%', label: 'Tráfico Orgánico Calificado' },
      { value: 'Top 3', label: 'Ranking para Palabras Clave' },
    ],
  },
  {
    client: 'Restaurante Local',
    title: 'Comunidad Fiel en Redes Sociales',
    description:
      'Gestionamos las redes sociales de un restaurante en Buenos Aires, creando una comunidad activa y aumentando las reservas.',
    image: getImage('success-3'),
    stats: [
      { value: '+80%', label: 'Aumento de Engagement' },
      { value: '+40%', label: 'Reservas desde Redes' },
    ],
  },
];

export const testimonials = [
  {
    quote:
      'Manya Digital transformó nuestra presencia online. El equipo es profesional, creativo y siempre un paso adelante. ¡Nuestros resultados hablan por sí solos!',
    name: 'Javier Morales',
    title: 'CEO de TechBaires',
    avatar: getImage('testimonial-2'),
  },
  {
    quote:
      'Desde que trabajamos con Manya, nuestro e-commerce no para de crecer. Entienden perfectamente el mercado argentino y cómo llegar a nuestros clientes.',
    name: 'Sofía Rossi',
    title: 'Fundadora de Moda Urbana',
    avatar: getImage('testimonial-3'),
  },
  {
    quote:
      'La estrategia de contenidos y SEO que implementaron fue impecable. Nos posicionaron como referentes en un sector muy competitivo.',
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
      'El ecosistema digital argentino está en constante cambio. Te contamos las tendencias clave que tu negocio no puede ignorar este año.',
    date: '15 de Julio, 2024',
    image: getImage('blog-1'),
  },
  {
    slug: 'el-poder-de-la-ia-en-redes-sociales',
    title: 'El Poder de la IA para Potenciar tu Estrategia en Redes Sociales',
    excerpt:
      'La inteligencia artificial ya no es el futuro, es el presente. Descubrí cómo aplicarla para optimizar tus campañas y contenidos.',
    date: '02 de Julio, 2024',
    image: getImage('blog-2'),
  },
  {
    slug: 'seo-local-clave-para-negocios-fisicos',
    title: 'SEO Local: La Clave para que Negocios Físicos Triunfen Online',
    excerpt:
      'Si tenés un local, tienda o restaurante, el SEO local es tu mejor aliado para atraer clientes de tu zona. Te explicamos cómo empezar.',
    date: '20 de Junio, 2024',
    image: getImage('blog-3'),
  },
];
