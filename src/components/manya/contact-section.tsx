'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzeContactQuestion } from '@/app/actions';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  serviceOfInterest: z.string().optional(),
  question: z.string().min(10, 'Tu mensaje debe tener al menos 10 caracteres'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const mapImage = PlaceHolderImages.find((p) => p.id === 'map');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      serviceOfInterest: '',
      question: '',
    },
  });

  const handleQuestionBlur = async () => {
    const question = form.getValues('question');
    if (question.length > 20) {
      setIsAnalyzing(true);
      try {
        const result = await analyzeContactQuestion({ question });
        if (result.success && result.data) {
          const { name, email, serviceOfInterest, urgency } = result.data;
          if (name && !form.getValues('name')) form.setValue('name', name);
          if (email && !form.getValues('email')) form.setValue('email', email);
          if (serviceOfInterest && !form.getValues('serviceOfInterest')) {
            const matchedService = services.find((s) =>
              s.title.toLowerCase().includes(serviceOfInterest.toLowerCase())
            );
            if (matchedService) {
              form.setValue('serviceOfInterest', matchedService.title);
            }
          }
          toast({
            title: '¡Formulario inteligente activado!',
            description: 'Hemos pre-completado algunos campos por vos.',
          });
        }
      } catch (error) {
        console.error('Error analyzing question:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsSubmitting(false);

    toast({
      title: '¡Mensaje Enviado!',
      description: `Gracias por tu interés, ${data.name}. Nos pondremos en contacto a la brevedad.`,
    });
    form.reset();
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Contactanos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            ¿Listo para empezar? Contanos tu idea y la haremos realidad.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1"/>
                        <span>Av. Corrientes 1234, Piso 5<br/>C1043AAS, Buenos Aires, Argentina</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary"/>
                        <a href="mailto:hola@manyadigital.com" className="hover:text-primary">hola@manyadigital.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary"/>
                        <a href="tel:+5491112345678" className="hover:text-primary">+54 9 11 1234-5678</a>
                    </div>
                </CardContent>
             </Card>
             <div className="overflow-hidden rounded-lg shadow-lg">
                {mapImage && <Image src={mapImage.imageUrl} alt="Ubicación" width={600} height={450} className="w-full" data-ai-hint={mapImage.imageHint} />}
             </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="p-4 sm:p-6 md:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tu Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Juan Pérez" {...field} />
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
                        <FormLabel>Tu Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: juan.perez@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicio de Interés</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccioná un servicio (opcional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem
                                key={service.title}
                                value={service.title}
                              >
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿En qué podemos ayudarte?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Contanos sobre tu proyecto, objetivos y necesidades..."
                            className="min-h-[120px]"
                            {...field}
                            onBlur={handleQuestionBlur}
                          />
                        </FormControl>
                        {isAnalyzing && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                Analizando tu consulta...
                            </div>
                        )}
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
                    ) : (
                        'Enviar Mensaje'
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
