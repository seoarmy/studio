
import { defineField, defineType } from 'sanity'
import { landingFields } from './landingTemplate'

export const service = defineType({
    name: 'service',
    title: 'Servicios de Landing',
    type: 'document',
    groups: [
        { name: 'general', title: 'General' },
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero' },
        { name: 'cta1', title: 'CTA 1' },
        { name: 'why', title: 'Por qué' },
        { name: 'cta2', title: 'CTA 2' },
        { name: 'howWeHelp', title: 'Cómo ayudamos' },
        { name: 'factors', title: 'Factores' },
        { name: 'rank', title: 'Rank' },
        { name: 'position', title: 'Posición' },
        { name: 'faqs', title: 'FAQ' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Nombre del Servicio',
            type: 'string',
            group: 'general',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'general',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        ...landingFields
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Nuevo Servicio',
                subtitle: 'Página de Servicio (Template)',
            }
        },
    },
})
