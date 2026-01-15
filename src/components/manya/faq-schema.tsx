
import Script from 'next/script';
import { useId } from 'react';

interface Faq {
    question: string;
    answer: string;
}

export function FaqSchema({ faqs }: { faqs: Faq[] }) {
    if (!faqs || faqs.length === 0) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    const id = useId();

    return (
        <Script
            id={`faq-schema-${id}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
