
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Gift, CheckCircle2, Lock, Loader2, Book, LayoutGrid, ChevronRight } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const leadMagnetFormSchema = z.object({
  name: z.string().min(2, { message: 'Por favor, ingresá tu nombre.' }),
  email: z.string().email({ message: 'Por favor, ingresá un email válido.' }),
  company: z.string().optional(),
});

type LeadMagnetFormValues = z.infer<typeof leadMagnetFormSchema>;

export function BlogSidebar() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const latestPosts = blogPosts.slice(0, 3);
  const categories = [...new Set(blogPosts.map(post => post.category))];

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast({
      title: '¡Listo para descargar!',
      description: `Gracias, ${data.name}. Te hemos enviado la guía a tu email.`,
    });
    form.reset();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM, yyyy", { locale: es });
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
      
      {/* Latest Posts */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className='flex items-center gap-2 font-headline text-xl'>
            <Book className="h-5 w-5 text-primary"/>
            Últimos Artículos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestPosts.map((post, index) => (
              <div key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group">
                  <p className="font-semibold group-hover:text-primary transition-colors">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                </Link>
                {index < latestPosts.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className='flex items-center gap-2 font-headline text-xl'>
            <LayoutGrid className="h-5 w-5 text-primary"/>
            Categorías
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <Link href={`/blog?categoria=${category}`} className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors group">
                  <span>{category}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
