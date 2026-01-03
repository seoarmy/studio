import { defineType } from 'sanity'
import { homeFields } from './homeFields'

export const home = defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'services', title: 'Servicios' },
        { name: 'whyUs', title: 'Por qué elegirnos' },
        { name: 'clients', title: 'Clientes' },
        { name: 'successCases', title: 'Casos de Éxito' },
        { name: 'testimonials', title: 'Testimonios' },
        { name: 'stats', title: 'Estadísticas' },
        { name: 'locations', title: 'Ubicaciones' },
        { name: 'faq', title: 'FAQ' },
        { name: 'finalCta', title: 'Final CTA' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: homeFields,
    preview: {
        select: {
            title: 'heroHeading',
        },
        prepare({ title }) {
            return {
                title: title || 'Home Page',
                subtitle: 'Main Landing Page',
            }
        },
    },
})
