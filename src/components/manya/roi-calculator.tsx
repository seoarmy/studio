'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle, ArrowRight, Calculator, Check, ChevronsRight, Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const calculatorSchema = z.object({
    investment: z.coerce.number().min(1, 'La inversión debe ser mayor a 0.'),
    avgTicket: z.coerce.number().min(1, 'El ticket promedio debe ser mayor a 0.'),
    sales: z.coerce.number().int().min(0, 'Las ventas no pueden ser negativas.'),
    margin: z.coerce.number().min(0, 'El margen no puede ser negativo.').max(100, 'El margen no puede ser mayor a 100.'),
});

const leadSchema = z.object({
    email: z.string().email('Ingresá un email válido.'),
    name: z.string().min(2, 'Ingresá tu nombre.'),
    whatsapp: z.string().optional(),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;
type LeadValues = z.infer<typeof leadSchema>;

interface RoiResult {
    roi: number;
    monthlyProfit: number;
    potentialRoi: number;
    potentialProfit: number;
    moneyLeft: number;
}

export function RoiCalculator() {
    const [result, setResult] = useState<RoiResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const { toast } = useToast();

    const calculatorForm = useForm<CalculatorValues>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            investment: 100000,
            avgTicket: 25000,
            sales: 20,
            margin: 30,
        },
    });

    const leadForm = useForm<LeadValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            email: '',
            name: '',
            whatsapp: '',
        },
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(value);
    };

    const handleCalculation: SubmitHandler<CalculatorValues> = (data) => {
        setIsCalculating(true);
        
        const revenue = data.avgTicket * data.sales;
        const grossProfit = revenue * (data.margin / 100);
        const netProfit = grossProfit - data.investment;
        const roi = (netProfit / data.investment) * 100;
        
        // Simulación de potencial
        const potentialRoi = roi * 1.8 + 80;
        const potentialNetProfit = data.investment * (potentialRoi / 100);
        const moneyLeft = potentialNetProfit - netProfit;

        setTimeout(() => {
            setResult({
                roi,
                monthlyProfit: netProfit,
                potentialRoi,
                potentialProfit: potentialNetProfit,
                moneyLeft: moneyLeft > 0 ? moneyLeft : 0,
            });
            setIsCalculating(false);
        }, 800);
    };
    
    const handleLeadSubmit: SubmitHandler<LeadValues> = async (data) => {
        setIsSubmittingLead(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmittingLead(false);
        
        toast({
            title: '¡Plan en camino!',
            description: `Gracias, ${data.name}. En breve recibirás tu plan personalizado.`,
        });
        leadForm.reset();
        setResult(null);
        calculatorForm.reset();
    };

    return (
        <Card className="my-12 border-2 border-primary/20 shadow-xl shadow-primary/10 overflow-hidden">
            <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-3 font-headline text-xl md:text-2xl text-foreground">
                    <Calculator className="h-7 w-7 text-primary" />
                    Calculá el ROI de tu Marketing
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <Form {...calculatorForm}>
                    <form onSubmit={calculatorForm.handleSubmit(handleCalculation)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <FormField control={calculatorForm.control} name="investment" render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Cuánto invertís mensualmente?</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input type="number" placeholder="100000" className="pl-6" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={calculatorForm.control} name="avgTicket" render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Cuál es tu ticket promedio?</FormLabel>
                                <FormControl>
                                     <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input type="number" placeholder="25000" className="pl-6" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={calculatorForm.control} name="sales" render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Cuántas ventas hacés por mes?</FormLabel>
                                <FormControl><Input type="number" placeholder="20" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={calculatorForm.control} name="margin" render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Qué margen de ganancia tenés?</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type="number" placeholder="30" className="pr-6" {...field} />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="md:col-span-2">
                             <Button type="submit" className="w-full font-bold group" size="lg" disabled={isCalculating}>
                                {isCalculating ? <><Loader2 className="animate-spin" /> Calculando...</> : <>Calcular mi ROI <ChevronsRight className="transition-transform group-hover:translate-x-1" /></>}
                            </Button>
                        </div>
                    </form>
                </Form>

                <AnimatePresence>
                {isCalculating && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-center py-8">
                        <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                        <p className="mt-4 text-muted-foreground">Analizando tus números...</p>
                    </motion.div>
                )}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Separator className="my-8" />
                        <h3 className="text-center font-headline text-lg font-bold text-foreground">RESULTADO DE TU ANÁLISIS</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <Card className="bg-muted/30">
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">📊 Tu ROI actual</p>
                                    <p className="text-3xl font-bold text-primary">{result.roi.toFixed(0)}%</p>
                                </CardContent>
                            </Card>
                             <Card className="bg-muted/30">
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">💵 Ganancia Neta Mensual</p>
                                    <p className="text-3xl font-bold text-primary">{formatCurrency(result.monthlyProfit)}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-accent/10 border-accent/30">
                                <CardContent className="p-4">
                                    <p className="text-sm text-accent">📈 Potencial con optimización</p>
                                    <p className="text-3xl font-bold text-accent">{result.potentialRoi.toFixed(0)}%</p>
                                </CardContent>
                            </Card>
                             <Card className="bg-accent/10 border-accent/30">
                                <CardContent className="p-4">
                                    <p className="text-sm text-accent">💰 Podrías ganar (extra)</p>
                                    <p className="text-3xl font-bold text-accent">{formatCurrency(result.moneyLeft)}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {result.moneyLeft > 0 && (
                            <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive flex items-center gap-4">
                                <AlertCircle className="h-8 w-8 flex-shrink-0" />
                                <div>
                                    <p className="font-bold">¡Atención! Estás dejando de ganar {formatCurrency(result.moneyLeft)} por mes.</p>
                                    <p className="text-sm">Tu estrategia actual tiene un gran potencial de mejora.</p>
                                </div>
                            </div>
                        )}

                        <div className="text-center mt-8 p-6 bg-muted/30 rounded-lg">
                            <h4 className="font-headline text-xl font-bold text-foreground">¿Querés mejorar estos números?</h4>
                            <p className="mt-2 text-muted-foreground">👇 Dejanos tus datos y te mandamos un plan personalizado <span className="font-bold text-primary">GRATIS</span>.</p>
                            
                            <Form {...leadForm}>
                                <form onSubmit={leadForm.handleSubmit(handleLeadSubmit)} className="mt-6 max-w-lg mx-auto space-y-4">
                                     <FormField control={leadForm.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormControl><Input placeholder="Tu Email*" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={leadForm.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormControl><Input placeholder="Tu Nombre*" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={leadForm.control} name="whatsapp" render={({ field }) => (
                                        <FormItem>
                                            <FormControl><Input placeholder="Tu WhatsApp (Opcional)" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" size="lg" className="w-full font-bold group" disabled={isSubmittingLead}>
                                        {isSubmittingLead ? <><Loader2 className="animate-spin"/> Enviando...</> : <>Recibir mi Plan Gratis <PartyPopper className="transition-transform group-hover:scale-110" /></>}
                                    </Button>
                                </form>
                            </Form>
                        </div>

                    </motion.div>
                )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
