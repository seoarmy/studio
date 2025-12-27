
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Gift, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const leadMagnetFormSchema = z.object({
  name: z.string().min(2, 'Se requiere tu nombre.'),
  email: z.string().email('Email inválido.'),
  company: z.string().optional(),
});

type LeadMagnetFormValues = z.infer<typeof leadMagnetFormSchema>;

export function BlogSidebar() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadMagnetFormValues>({
    resolver: zodResolver(leadMagnetFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
    },
  });

  const onSubmit: SubmitHandler<LeadMagnetFormValues> = async (data) => {
    setIsSubmitting(true);
    // Simular envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
      title: '¡Listo para descargar!',
      description: `Gracias, ${data.name}. Te hemos enviado la guía a tu email.`,
    });
    form.reset();
  };

  return (
    <div className="space-y-8">
      {/* Lead Magnet */}
      <Card className="bg-muted/30 border-primary/20 border-2">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Gift className="h-8 w-8" />
             </div>
          </div>
          <p className="font-semibold text-primary uppercase text-sm">Descargá gratis</p>
          <h3 className="font-headline text-xl font-bold mt-1">Guía completa de Meta Ads 2025</h3>
          
          <ul className="text-left space-y-2 mt-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Estrategias probadas</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Plantillas de campaña</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Checklist de optimización</span>
            </li>
          </ul>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6 text-left">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nombre*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email*" {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Empresa (opcional)" {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                    </>
                ) : 'Descargar ahora'}
              </Button>
            </form>
          </Form>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-4">
            <Lock className="h-3 w-3" />
            No spam. Nunca.
          </p>
        </CardContent>
      </Card>
      
      {/* Aquí irían los otros componentes del sidebar */}
    </div>
  );
}
