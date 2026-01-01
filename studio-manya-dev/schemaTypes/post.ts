import { defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Artículo de Blog',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texto Alternativo',
                }
            ]
        }),
        defineField({
            name: 'categories',
            title: 'Categorías',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Fecha de Publicación',
            type: 'datetime',
        }),
        defineField({
            name: 'excerpt',
            title: 'Extracto',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'readTime',
            title: 'Tiempo de Lectura',
            type: 'string',
            description: 'Ej: 8 min de lectura',
        }),
        defineField({
            name: 'tags',
            title: 'Etiquetas',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'metaTitle',
            title: 'Meta Título (SEO)',
            type: 'string',
            description: 'Título para buscadores (Google). Si se deja vacío, se usará el título del post.',
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Descripción (SEO)',
            type: 'text',
            rows: 3,
            description: 'Descripción para buscadores. Si se deja vacío, se usará el extracto.',
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: 'intro',
            title: 'Introducción',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'body',
            title: 'Contenido',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Texto Alternativo',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Leyenda',
                        }
                    ]
                },
                {
                    name: 'table',
                    type: 'table',
                    title: 'Tabla',
                },
                {
                    name: 'citation',
                    type: 'object',
                    title: 'Citación',
                    fields: [
                        { name: 'text', type: 'text', title: 'Texto de la cita', rows: 3 },
                        { name: 'author', type: 'string', title: 'Autor' },
                        { name: 'source', type: 'string', title: 'Fuente/Link' },
                    ],
                    preview: {
                        select: {
                            title: 'text',
                            subtitle: 'author',
                        },
                        prepare(selection) {
                            const { title, subtitle } = selection
                            return {
                                title: title ? `"${title.substring(0, 50)}..."` : 'Sin texto',
                                subtitle: subtitle ? `— ${subtitle}` : 'Sin autor',
                            }
                        },
                    },
                },
                {
                    name: 'calculator',
                    type: 'object',
                    title: 'Calculadora',
                    fields: [
                        {
                            name: 'type',
                            type: 'string',
                            title: 'Tipo de Calculadora',
                            options: {
                                list: [
                                    { title: 'Calculadora de ROI', value: 'roi' },
                                    { title: 'Calculadora de Hipoteca', value: 'mortgage' },
                                    { title: 'Calculadora de Ahorro', value: 'savings' },
                                    { title: 'Calculadora de Préstamo', value: 'loan' },
                                ],
                            },
                            initialValue: 'roi'
                        },
                    ],
                    preview: {
                        select: {
                            type: 'type',
                        },
                        prepare(selection) {
                            const { type } = selection
                            const titles = {
                                roi: 'Calculadora de ROI',
                                mortgage: 'Calculadora de Hipoteca',
                                savings: 'Calculadora de Ahorro',
                                loan: 'Calculadora de Préstamo',
                            }
                            return {
                                title: titles[type as keyof typeof titles] || 'Calculadora',
                                subtitle: 'Componente interactivo para el blog',
                            }
                        },
                    },
                },
                {
                    name: 'cta',
                    type: 'object',
                    title: 'Llamada a la acción (CTA)',
                    fields: [
                        { name: 'title', type: 'string', title: 'Título' },
                        { name: 'description', type: 'text', title: 'Descripción', rows: 2 },
                        { name: 'buttonText', type: 'string', title: 'Texto del Botón' },
                        { name: 'link', type: 'string', title: 'Enlace' },
                        {
                            name: 'style',
                            type: 'string',
                            title: 'Estilo',
                            options: {
                                list: [
                                    { title: 'Primario', value: 'primary' },
                                    { title: 'Secundario', value: 'secondary' },
                                    { title: 'Esquema (Outline)', value: 'outline' },
                                ],
                            },
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'buttonText',
                        },
                        prepare(selection) {
                            const { title, subtitle } = selection
                            return {
                                title: `CTA: ${title || 'Sin título'}`,
                                subtitle: `Botón: ${subtitle || 'Sin texto'}`,
                            }
                        },
                    },
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `por ${author}` }
        },
    },
})
