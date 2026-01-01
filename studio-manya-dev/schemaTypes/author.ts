import { defineField, defineType } from 'sanity'

export const authorType = defineType({
    name: 'author',
    title: 'Autor',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Cargo / Rol',
            type: 'string',
            description: 'Ej: SEO | MARKETING',
        }),
        defineField({
            name: 'image',
            title: 'Imagen de Perfil',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'shortBio',
            title: 'Biografía Corta',
            type: 'text',
            rows: 3,
            description: 'Se muestra en la cabecera destacada.',
        }),
        defineField({
            name: 'bio',
            title: 'Biografía Completa',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'specialties',
            title: 'Áreas de Especialización',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'email',
            title: 'Email de Contacto',
            type: 'string',
        }),
        defineField({
            name: 'social',
            title: 'Redes Sociales',
            type: 'object',
            fields: [
                { name: 'linkedin', type: 'url', title: 'LinkedIn' },
                { name: 'instagram', type: 'url', title: 'Instagram' },
                { name: 'facebook', type: 'url', title: 'Facebook' },
                { name: 'twitter', type: 'url', title: 'Twitter/X' },
            ],
        }),
        defineField({
            name: 'externalPublications',
            title: 'Otras publicaciones externas',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Título' },
                        { name: 'url', type: 'url', title: 'URL' },
                        { name: 'source', type: 'string', title: 'Fuente (Ej: El Cronista, La Nación)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'metaTitle',
            title: 'Meta Título (SEO)',
            type: 'string',
            description: 'Título para buscadores. Si se deja vacío, se usará el nombre.',
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Descripción (SEO)',
            type: 'text',
            rows: 3,
            description: 'Descripción para buscadores. Si se deja vacío, se usará la biografía corta.',
            validation: (Rule) => Rule.max(160),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
})
