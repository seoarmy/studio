
const { JSDOM } = require('jsdom');

function htmlToPortableText(html) {
    if (!html) return [];
    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    const blocks = [];

    function processNode(node, index) {
        const key = `block-${Math.random().toString(36).substr(2, 9)}`;

        if (node.nodeType === 3) { // Text node
            const text = node.textContent.trim();
            if (text) {
                blocks.push({
                    _key: key,
                    _type: 'block',
                    style: 'normal',
                    children: [{ _key: `${key}-span`, _type: 'span', text: text }],
                    markDefs: []
                });
            }
            return;
        }

        if (node.nodeType === 1) { // Element node
            const tagName = node.tagName.toLowerCase();

            if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                let style = 'normal';
                if (tagName.startsWith('h')) style = tagName;

                blocks.push({
                    _key: key,
                    _type: 'block',
                    style: style,
                    children: [{ _key: `${key}-span`, _type: 'span', text: node.textContent.trim() }],
                    markDefs: []
                });
            } else if (tagName === 'blockquote') {
                blocks.push({
                    _key: key,
                    _type: 'citation',
                    text: node.textContent.trim(),
                    author: 'Anónimo',
                });
            } else if (tagName === 'ul' || tagName === 'ol') {
                const listItem = tagName === 'ul' ? 'bullet' : 'number';
                Array.from(node.children).forEach((li, i) => {
                    const liKey = `${key}-li-${i}`;
                    blocks.push({
                        _key: liKey,
                        _type: 'block',
                        style: 'normal',
                        listItem: listItem,
                        children: [{ _key: `${liKey}-span`, _type: 'span', text: li.textContent.trim() }],
                        markDefs: []
                    });
                });
            } else if (tagName === 'table') {
                const rows = [];
                const trs = Array.from(node.querySelectorAll('tr'));
                trs.forEach((tr, i) => {
                    const cells = Array.from(tr.querySelectorAll('th, td')).map(cell => cell.textContent.trim());
                    rows.push({
                        _key: `row-${i}`,
                        _type: 'tableRow',
                        cells: cells
                    });
                });
                blocks.push({
                    _key: key,
                    _type: 'table',
                    rows: rows
                });
            } else if (tagName === 'div' && node.getAttribute('style')?.includes('background-color')) {
                const title = node.querySelector('h4')?.textContent.trim();
                const description = node.querySelector('p')?.textContent.trim();
                const button = node.querySelector('a');
                blocks.push({
                    _key: key,
                    _type: 'cta',
                    title: title || 'CTA',
                    description: description || '',
                    buttonText: button?.textContent.trim() || 'Saber más',
                    link: button?.getAttribute('href') || '#',
                    style: 'primary'
                });
            } else {
                Array.from(node.childNodes).forEach((child, i) => processNode(child, i));
            }
        }
    }

    Array.from(body.childNodes).forEach((node, i) => processNode(node, i));

    // Filter out empty blocks or duplicates if any
    return blocks;
}

const authors = [
    {
        _id: 'author-pietro',
        _type: 'author',
        name: 'Pietro Fiorillo',
        slug: { _type: 'slug', current: 'pietro-fiorillo' },
        role: 'SEO 💻 | MARKETING',
        shortBio: 'Con más de 15 años de experiencia en el sector automovilístico, Pietro es reconocido por sus análisis profundos y reseñas técnicas que combinan expertise profesional con pasión genuina por los vehículos.',
        specialties: ['SEO Estratégico', 'Performance Marketing', 'Growth Hacking', 'Analítica Avanzada'],
        email: 'pietro@manyadigital.ar',
        social: {
            linkedin: 'https://linkedin.com/in/pietrofiorillo',
            instagram: 'https://instagram.com/pietrofiorillo',
            facebook: 'https://facebook.com/pietrofiorillo'
        },
        externalPublications: [
            { _key: 'pub-1', title: '¿Cuál es el mejor SUV eléctrico en 2025?', url: 'https://example.com/1', source: 'El Cronista' },
            { _key: 'pub-2', title: 'Audi Q3 TDI 150 CV', url: 'https://example.com/2', source: 'La Nación' },
            { _key: 'pub-3', title: 'La revolución de los coches autónomos', url: 'https://example.com/3', source: 'Infobae' }
        ],
        metaTitle: 'Pietro Fiorillo | Experto en SEO y Marketing Digital',
        metaDescription: 'Conocé a Pietro Fiorillo, especialista en estrategias de crecimiento digital y SEO con más de 15 años de experiencia.'
    },
    {
        _id: 'author-manya-team',
        _type: 'author',
        name: 'Equipo MANYA Digital',
        slug: { _type: 'slug', current: 'equipo-manya' },
        role: 'Agencia de Marketing',
        shortBio: 'Expertos en potenciar negocios digitales en Argentina y el mundo.'
    }
];

const categories = [
    { _type: 'category', _id: 'cat-estrategia', title: 'Estrategia Digital' },
    { _type: 'category', _id: 'cat-redes', title: 'Redes Sociales' },
    { _type: 'category', _id: 'cat-seo', title: 'SEO' },
];

const rawPosts = [
    {
        slug: 'tendencias-marketing-digital-argentina-2024',
        title: 'Top 5 Tendencias de Marketing Digital en Argentina para 2024',
        excerpt: 'El mundo digital argento no para de cambiar. Te contamos las posta que tu negocio no puede dejar pasar este año.',
        date: '2024-07-15',
        category: 'cat-estrategia',
        readTime: '8 min de lectura',
        tags: ['Marketing Digital', 'Tendencias', 'IA', 'SEO'],
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
    `
    },
    {
        slug: 'el-poder-de-la-ia-en-redes-sociales',
        title: 'El Poder de la IA para Potenciar tu Estrategia en Redes Sociales',
        excerpt: 'La inteligencia artificial ya no es el futuro, es el ahora. Descubrí cómo usarla para optimizar tus campañas y contenidos.',
        date: '2024-07-02',
        category: 'cat-redes',
        readTime: '10 min de lectura',
        tags: ['IA', 'Redes Sociales', 'Automatización'],
        intro: `<p>La inteligencia artificial (IA) ha dejado de ser una promesa futurista para convertirse en una herramienta indispensable en el arsenal de cualquier estratega de redes sociales. Si sentís que estás corriendo detrás de las tendencias y te cuesta generar contenido relevante de forma consistente, la IA es tu mejor aliada para cambiar el juego.</p>`,
        content: `<p>En este artículo, vamos a desglosar cómo la IA puede potenciar tu estrategia en redes sociales, desde la creación de contenido hasta el análisis de métricas, para que puedas trabajar de manera más inteligente, no más dura.</p>`
    },
    {
        slug: 'seo-local-clave-para-negocios-fisicos',
        title: 'SEO Local: La Clave para que Negocios a la Calle la Rompan Online',
        excerpt: 'Si tenés un local, tienda o boliche, el SEO local es tu mejor amigo para atraer clientes de tu barrio. Te explicamos cómo arrancar.',
        date: '2024-06-20',
        category: 'cat-seo',
        readTime: '12 min de lectura',
        tags: ['SEO', 'Negocios Locales', 'Google My Business'],
        intro: `<p>¿Tenés un negocio con una ubicación física? Entonces, más que nadie, necesitás que la gente de tu zona te encuentre. De nada sirve tener el mejor producto o servicio si tus vecinos no saben que existís. Acá es donde entra el SEO Local, tu arma secreta para dominar las búsquedas "cerca de mí".</p>`,
        content: `<p>Olvidate de competir con gigantes a nivel nacional. Tu objetivo es ser el rey de tu barrio, y en esta guía te vamos a mostrar exactamente cómo lograrlo.</p>`
    }
];

const posts = rawPosts.map((p, index) => {
    const body = htmlToPortableText(p.content);

    // Insert ROI calculator at the beginning of the body
    body.unshift({
        _key: `calc-${index}`,
        _type: 'calculator',
        type: 'roi'
    });

    return {
        _type: 'post',
        _id: `post-${index}`,
        title: p.title,
        slug: { _type: 'slug', current: p.slug },
        excerpt: p.excerpt,
        publishedAt: new Date(p.date).toISOString(),
        readTime: p.readTime,
        tags: p.tags,
        author: { _type: 'reference', _ref: index === 0 ? 'author-pietro' : 'author-manya-team' },
        categories: [{ _key: `cat-${index}`, _type: 'reference', _ref: p.category }],
        intro: htmlToPortableText(p.intro),
        body: body,
        metaTitle: p.title,
        metaDescription: p.excerpt
    };
});

const allData = [...authors, ...categories, ...posts];
allData.forEach(doc => console.log(JSON.stringify(doc)));
