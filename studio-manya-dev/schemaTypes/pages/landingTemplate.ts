
import { defineField } from 'sanity'

export const landingFields = [
    // --- META ---
    defineField({
        name: 'meta',
        title: 'SEO / Meta Data',
        type: 'object',
        group: 'seo',
        fields: [
            { name: 'title', type: 'string', title: 'Meta Title' },
            { name: 'description', type: 'text', title: 'Meta Description' },
            { name: 'image', type: 'image', title: 'Meta Image', options: { hotspot: true } },
        ]
    }),

    // --- HERO ---
    defineField({
        name: 'hero',
        title: 'Hero Section',
        type: 'object',
        group: 'hero',
        fields: [
            { name: 'h1', type: 'string', title: 'H1 Title' },
            {
                name: 'subservices',
                type: 'array',
                title: 'Sub-services (Badges)',
                of: [{ type: 'string' }]
            },
        ]
    }),

    // --- CTA 1 ---
    defineField({
        name: 'cta1',
        title: 'CTA Section 1',
        type: 'object',
        group: 'cta1',
        fields: [
            { name: 'h2', type: 'string', title: 'H2 Title' },
            { name: 'p', type: 'text', title: 'Paragraph' },
            { name: 'button', type: 'string', title: 'Button Text' },
        ]
    }),

    // --- WHY ---
    defineField({
        name: 'why',
        title: 'Why Section',
        type: 'object',
        group: 'why',
        fields: [
            { name: 'h3', type: 'string', title: 'H3 Title' },
            {
                name: 'points',
                type: 'array',
                title: 'Points',
                of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                    ]
                }]
            },
        ]
    }),

    // --- CTA 2 ---
    defineField({
        name: 'cta2',
        title: 'CTA Section 2',
        type: 'object',
        group: 'cta2',
        fields: [
            { name: 'h2', type: 'string', title: 'H2 Title' },
            { name: 'button', type: 'string', title: 'Button Text' },
        ]
    }),

    // --- HOW WE HELP ---
    defineField({
        name: 'howWeHelp',
        title: 'How We Help Section',
        type: 'object',
        group: 'howWeHelp',
        fields: [
            { name: 'h3', type: 'string', title: 'H3 Title' },
            { name: 'p', type: 'text', title: 'Paragraph' },
            {
                name: 'points',
                type: 'array',
                title: 'Points (Bullets)',
                of: [{ type: 'string' }]
            },
            {
                name: 'image',
                type: 'image',
                title: 'Section Image',
                options: { hotspot: true }
            },
        ]
    }),

    // --- FACTORS ---
    defineField({
        name: 'factors',
        title: 'Factors Section',
        type: 'object',
        group: 'factors',
        fields: [
            { name: 'h3', type: 'string', title: 'H3 Title' },
            { name: 'p', type: 'text', title: 'Paragraph' },
            {
                name: 'points',
                type: 'array',
                title: 'Points (Bullets)',
                of: [{ type: 'string' }]
            },
            {
                name: 'image',
                type: 'image',
                title: 'Section Image',
                options: { hotspot: true }
            },
        ]
    }),

    // --- RANK ---
    defineField({
        name: 'rank',
        title: 'Rank Section',
        type: 'object',
        group: 'rank',
        fields: [
            { name: 'h3', type: 'string', title: 'H3 Title' },
            {
                name: 'points',
                type: 'array',
                title: 'Points',
                of: [{
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description' },
                    ]
                }]
            },
        ]
    }),

    // --- POSITION ---
    defineField({
        name: 'position',
        title: 'Position Section',
        type: 'object',
        group: 'position',
        fields: [
            { name: 'h3', type: 'string', title: 'H3 Title' },
            { name: 'p', type: 'text', title: 'Paragraph' },
            { name: 'button', type: 'string', title: 'Button Text' },
            {
                name: 'image',
                type: 'image',
                title: 'Section Image',
                options: { hotspot: true }
            },
        ]
    }),

    // --- FAQS ---
    defineField({
        name: 'faqs',
        title: 'FAQs',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                { name: 'question', type: 'string', title: 'Question' },
                { name: 'answer', type: 'text', title: 'Answer' },
            ]
        }],
        group: 'faqs',
    }),
]
