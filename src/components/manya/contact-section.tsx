'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
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
import { services } from '@/lib/data';
import { Loader2, Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Por favor, ingresá tu nombre completo.' }),
  email: z.string().email({ message: 'El formato del email no parece válido.' }),
  phone: z.string().min(10, { message: 'Por favor, ingresá un número de teléfono válido.' }),
  company: z.string().optional(),
  serviceOfInterest: z.string({ required_error: 'Por favor, seleccioná un servicio de interés.' }),
  location: z.string({ required_error: 'Por favor, seleccioná tu ubicación.' }),
  projectDetails: z.string().min(30, { message: 'Contanos un poco más, al menos 30 caracteres.' }),
  budget: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const locations = ['Buenos Aires', 'Córdoba', 'Neuquén', 'Rosario', 'Mendoza', 'Otra provincia'];
const budgets = ['< $500.000', '$500.000 - $1.000.000', '$1.000.000 - $3.000.000', '> $3.000.000', 'Prefiero discutirlo'];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceOfInterest: undefined,
      location: undefined,
      projectDetails: '',
      budget: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      toast({
        title: '¡Mensaje Enviado!',
        description: `Gracias por tu interés, ${data.name}. Nos vamos a poner en contacto con vos a la brevedad.`,
      });
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Hubo un problema al enviar tu mensaje. Por favor, intentá de nuevo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-24 md:py-32" id="contacto">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-64 -mb-64 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Column: Info & Pitch */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Estamos listos para ayudarte
              </div>
              <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Hablemos de tu <span className="text-primary">Proyecto</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cada gran proyecto comienza con una conversación. Contanos tus objetivos y descubramos cómo podemos potenciar tu marca juntos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Nuestras Oficinas", content: "Ambrosio Olmos 782, Córdoba", sub: "X5000, Argentina" },
                  { icon: Mail, title: "Email", content: "hola@manyadigital.com.ar", link: "mailto:hola@manyadigital.com.ar" },
                  { icon: Phone, title: "Teléfono / WhatsApp", content: "+54 11 5857-8004", link: "tel:+541158578004" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="text-muted-foreground transition-colors hover:text-primary">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">
                          {item.content}
                          {item.sub && <><br />{item.sub}</>}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border bg-background/50 p-6 backdrop-blur-sm">
                <h4 className="mb-4 font-semibold">¿Por qué elegirnos?</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Estrategias personalizadas para tu negocio",
                    "Equipo multidisciplinario de expertos",
                    "Reportes transparentes y medibles",
                    "Soporte continuo y proactivo"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Key Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl shadow-primary/5 ring-1 ring-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" className="h-11 bg-background/50" {...field} />
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
                              <FormLabel>Email corporativo</FormLabel>
                              <FormControl>
                                <Input placeholder="nombre@empresa.com" className="h-11 bg-background/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input placeholder="+54 ..." className="h-11 bg-background/50" {...field} />
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
                              <FormLabel>Empresa / Organización</FormLabel>
                              <FormControl>
                                <Input placeholder="Nombre de tu empresa" className="h-11 bg-background/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="serviceOfInterest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Servicio de interés</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 bg-background/50"><SelectValue placeholder="Seleccioná una opción" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem key={service.slug} value={service.title}>{service.title}</SelectItem>
                                  ))}
                                  <SelectItem value="No estoy seguro">No estoy seguro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Presupuesto estimado</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 bg-background/50"><SelectValue placeholder="Rango de inversión" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {budgets.map((b) => (
                                    <SelectItem key={b} value={b}>{b}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ubicación</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11 bg-background/50"><SelectValue placeholder="¿Dónde estás ubicado?" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locations.map((loc) => (
                                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detalles del proyecto</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Contanos brevemente sobre tus objetivos, audiencia y qué esperás lograr."
                                className="min-h-[150px] resize-none bg-background/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:to-primary shadow-lg shadow-primary/25 rounded-xl transition-all hover:scale-[1.01]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando mensaje...
                          </>
                        ) : (
                          <>
                            Enviar Consulta <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground mt-4">
                        Al enviar este formulario, aceptás nuestra política de privacidad. Tus datos están seguros con nosotros.
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
