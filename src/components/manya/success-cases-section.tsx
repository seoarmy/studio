import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { successCases } from '@/lib/data';

export function SuccessCasesSection() {
  return (
    <section id="casos-de-exito" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Casos de Éxito
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Resultados posta para clientes en Argentina. Así es como
            transformamos negocios.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {successCases.map((caseStudy) => (
            <Card key={caseStudy.title} className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl bg-card">
              <div className="relative h-48 w-full">
                <Image
                  src={caseStudy.image.src}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                  data-ai-hint={caseStudy.image.hint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {caseStudy.title}
                </CardTitle>
                <CardDescription>
                  Cliente: {caseStudy.client}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {caseStudy.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stats.map((stat) => (
                    <Badge key={stat.label} variant="secondary" className="text-sm">
                      <span className="font-bold text-primary">{stat.value}</span>
                      <span className="ml-2 text-secondary-foreground">{stat.label}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
