'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getCampaignAnalysis } from '../actions';
import {
  Loader2,
  BarChart,
  ShieldAlert,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

const analysisSchema = z.object({
  campaignDescription: z
    .string()
    .min(50, 'La descripción debe tener al menos 50 caracteres.'),
  marketConditions: z
    .string()
    .min(20, 'Las condiciones deben tener al menos 20 caracteres.'),
  historicalData: z.string().optional(),
});

type AnalysisFormValues = z.infer<typeof analysisSchema>;
type AnalysisResult = {
  predictedImpact: string;
  riskAssessment: string;
  recommendations: string;
};

export default function PredictiveAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      campaignDescription: '',
      marketConditions: 'Mercado argentino actual, alta competitividad en e-commerce.',
      historicalData: '',
    },
  });

  const onSubmit: SubmitHandler<AnalysisFormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getCampaignAnalysis(data);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error en el Análisis',
          description: response.error || 'No se pudo completar el análisis.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error inesperado',
        description:
          'Ocurrió un error al comunicarse con el servicio de análisis.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          Análisis Predictivo de Campañas
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Utilizá nuestra IA para simular el impacto potencial de tu próxima
          campaña de marketing en Argentina.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simulador de Campaña</CardTitle>
          <CardDescription>
            Completá los detalles para recibir un análisis predictivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="campaignDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción de la Campaña</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Lanzamiento de nueva línea de zapatillas veganas para millenials en CABA, con un presupuesto de $500,000 ARS y foco en Instagram y TikTok."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condiciones del Mercado</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Alta inflación, consumidores buscando opciones sostenibles, aumento del uso de billeteras virtuales."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Datos Históricos (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Campaña anterior similar tuvo un CPC de $50 ARS y una tasa de conversión del 2%."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Análisis Predictivo
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            Nuestra IA está procesando los datos. Esto puede tardar unos
            segundos...
          </p>
        </div>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Resultados del Análisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2">
                <BarChart className="h-5 w-5 text-primary" />
                Impacto Previsto
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {result.predictedImpact}
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                Análisis de Riesgos
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {result.riskAssessment}
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Recomendaciones
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {result.recommendations}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
