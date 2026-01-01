
const authors = [
    {
        _type: 'author',
        _id: 'author-manya-team',
        name: 'Equipo MANYA Digital',
    }
]

const categories = [
    { _type: 'category', _id: 'cat-estrategia', title: 'Estrategia Digital' },
    { _type: 'category', _id: 'cat-redes', title: 'Redes Sociales' },
    { _type: 'category', _id: 'cat-seo', title: 'SEO' },
]

const posts = [
    {
        _type: 'post',
        _id: 'post-tendencias-2024',
        title: 'Top 5 Tendencias de Marketing Digital en Argentina para 2024',
        slug: { _type: 'slug', current: 'tendencias-marketing-digital-argentina-2024' },
        excerpt: 'El mundo digital argento no para de cambiar. Te contamos las posta que tu negocio no puede dejar pasar este año.',
        publishedAt: '2024-07-15T00:00:00Z',
        readTime: '8 min de lectura',
        tags: ['Marketing Digital', 'Tendencias', 'IA', 'SEO'],
        author: { _type: 'reference', _ref: 'author-manya-team' },
        categories: [{ _type: 'reference', _ref: 'cat-estrategia' }],
    },
    {
        _type: 'post',
        _id: 'post-ia-redes',
        title: 'El Poder de la IA para Potenciar tu Estrategia en Redes Sociales',
        slug: { _type: 'slug', current: 'el-poder-de-la-ia-en-redes-sociales' },
        excerpt: 'La inteligencia artificial ya no es el futuro, es el ahora. Descubrí cómo usarla para optimizar tus campañas y contenidos.',
        publishedAt: '2024-07-02T00:00:00Z',
        readTime: '10 min de lectura',
        tags: ['IA', 'Redes Sociales', 'Automatización'],
        author: { _type: 'reference', _ref: 'author-manya-team' },
        categories: [{ _type: 'reference', _ref: 'cat-redes' }],
    },
    {
        _type: 'post',
        _id: 'post-seo-local',
        title: 'SEO Local: La Clave para que Negocios a la Calle la Rompan Online',
        slug: { _type: 'slug', current: 'seo-local-clave-para-negocios-fisicos' },
        excerpt: 'Si tenés un local, tienda o boliche, el SEO local es tu mejor amigo para atraer clientes de tu barrio. Te explicamos cómo arrancar.',
        publishedAt: '2024-06-20T00:00:00Z',
        readTime: '12 min de lectura',
        tags: ['SEO', 'Negocios Locales', 'Google My Business'],
        author: { _type: 'reference', _ref: 'author-manya-team' },
        categories: [{ _type: 'reference', _ref: 'cat-seo' }],
    }
]

const allData = [...authors, ...categories, ...posts]
allData.forEach(doc => console.log(JSON.stringify(doc)))
