import Link from 'next/link';
import { BotMessageSquare, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4 flex items-center gap-2" passHref>
              <BotMessageSquare className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">
                Manya Digital
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Potenciando marcas en el mundo digital.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Navegación</h3>
            <ul className="space-y-2">
              <li><Link href="#servicios" className="text-sm text-muted-foreground hover:text-primary">Servicios</Link></li>
              <li><Link href="#casos-de-exito" className="text-sm text-muted-foreground hover:text-primary">Casos de Éxito</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="#contacto" className="text-sm text-muted-foreground hover:text-primary">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Contacto</h3>
            <address className="not-italic space-y-2 text-sm text-muted-foreground">
              <p>Buenos Aires, Argentina</p>
              <p><a href="mailto:hola@manyadigital.com" className="hover:text-primary">hola@manyadigital.com</a></p>
              <p><a href="tel:+5491112345678" className="hover:text-primary">+54 9 11 1234-5678</a></p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Seguinos</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Manya Digital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
