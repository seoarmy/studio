import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: '7f88m3q2',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false, // Set to true for production
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
