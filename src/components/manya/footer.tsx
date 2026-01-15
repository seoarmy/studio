import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4 flex items-center" passHref>
              <Image
                src="/logo.png"
                alt="MANYA Digital"
                width={360}
                height={90}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Innovación real desde Argentina para el mundo.
            </p>
          </div>
          <div>
            <p className="mb-4 font-semibold text-lg font-headline">Navegación</p>
            <ul className="space-y-3">
              <li><Link href="/servicios" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Servicios</Link></li>
              <li><Link href="/#por-que-elegirnos" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Por qué elegirnos</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Blog</Link></li>
              <li><Link href="/contacto" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-semibold text-lg font-headline">Contacto</p>
            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              <p>Presencia en toda Argentina</p>
              <p><a href="mailto:hola@manyadigital.com.ar" className="transition-colors duration-300 ease-in-out hover:text-primary">hola@manyadigital.com.ar</a></p>
              <p><a href="tel:+541158578004" className="transition-colors duration-300 ease-in-out hover:text-primary">+54 11 5857-8004</a></p>
            </address>
          </div>
          <div>
            <p className="mb-4 font-semibold text-lg font-headline">Seguinos</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary" aria-label="Facebook">
                <Facebook className="h-6 w-6" strokeWidth={2} />
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary" aria-label="Instagram">
                <Instagram className="h-6 w-6" strokeWidth={2} />
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MANYA Digital. Todos los derechos reservados. | <Link href="/sitemap" className="hover:text-primary">Mapa del sitio</Link></p>
        </div>
      </div>
    </footer>
  );
}
