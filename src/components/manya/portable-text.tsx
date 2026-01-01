import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { RoiCalculator } from './roi-calculator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            return (
                <div className="relative h-80 md:h-[450px] w-full my-8 overflow-hidden rounded-xl">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Imagen de blog'}
                        fill
                        className="object-cover"
                    />
                    {value.caption && (
                        <p className="text-center text-sm text-muted-foreground mt-2">{value.caption}</p>
                    )}
                </div>
            );
        },
        table: ({ value }) => {
            return (
                <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                        <tbody>
                            {value.rows.map((row: any, i: number) => (
                                <tr key={i} className="border-b border-border">
                                    {row.cells.map((cell: string, j: number) => (
                                        <td key={j} className="p-3 border-r border-border">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        },
        citation: ({ value }) => {
            return (
                <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                    <p className="text-xl">"{value.text}"</p>
                    {value.author && (
                        <cite className="block mt-2 text-sm not-italic font-semibold">
                            — {value.author} {value.source && <span className="font-normal">({value.source})</span>}
                        </cite>
                    )}
                </blockquote>
            );
        },
        calculator: ({ value }) => {
            if (value.type === 'roi') {
                return <div className="my-12"><RoiCalculator /></div>;
            }
            return <div className="p-4 bg-muted rounded-lg text-center my-8">Calculadora: {value.type}</div>;
        },
        cta: ({ value }) => {
            return (
                <div className={`my-12 p-8 rounded-2xl border-2 ${value.style === 'primary' ? 'bg-primary/5 border-primary/20' :
                        value.style === 'secondary' ? 'bg-secondary/5 border-secondary/20' : 'bg-background border-border'
                    }`}>
                    <h4 className="text-2xl font-bold mb-2">{value.title}</h4>
                    <p className="text-muted-foreground mb-6">{value.description}</p>
                    <Button asChild variant={value.style === 'outline' ? 'outline' : 'default'}>
                        <Link href={value.link || '#'}>{value.buttonText}</Link>
                    </Button>
                </div>
            );
        },
    },
    block: {
        h2: ({ children }) => <h2 className="font-headline text-3xl font-bold mt-12 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="font-headline text-2xl font-bold mt-8 mb-3">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="marker:text-primary">{children}</li>,
        number: ({ children }) => <li className="marker:text-primary">{children}</li>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <Link href={value.href} rel={rel} className="text-primary underline hover:text-primary/80 transition-colors">
                    {children}
                </Link>
            );
        },
        strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    },
};

export function CustomPortableText({ value }: { value: any }) {
    return <PortableText value={value} components={components} />;
}
