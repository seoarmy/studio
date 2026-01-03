import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SuccessCasesSection({ data }: { data?: any }) {
  const title = data?.successCasesTitle || 'Casos de Éxito';
  const description = data?.successCasesDescription || 'Resultados posta para clientes en Argentina. Así es como transformamos negocios.';
  const cases = data?.successCasesList || [];

  return (
    <section id="casos-de-exito" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h3 className="font-headline text-3xl font-bold md:text-4xl">
            {title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {cases.map((caseStudy: any) => (
            <Card key={caseStudy.title} className="overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl bg-card border">
              <div className="relative h-48 w-full">
                {caseStudy.image ? (
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
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
                  {caseStudy.stats?.map((stat: any) => (
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
