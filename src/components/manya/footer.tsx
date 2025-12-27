import Link from 'next/link';
import { Code, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4 flex items-center gap-2" passHref>
              <Code className="h-8 w-8 text-primary" strokeWidth={2}/>
              <span className="font-bold text-2xl">
                Manya Digital
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Potenciando marcas en el mundo digital.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">Navegación</h3>
            <ul className="space-y-3">
              <li><Link href="#servicios" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Servicios</Link></li>
              <li><Link href="#casos-de-exito" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Casos de Éxito</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Blog</Link></li>
              <li><Link href="#contacto" className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">Contacto</h3>
            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              <p>Buenos Aires, Argentina</p>
              <p><a href="mailto:hola@manyadigital.com" className="transition-colors duration-300 ease-in-out hover:text-primary">hola@manyadigital.com</a></p>
              <p><a href="tel:+5491112345678" className="transition-colors duration-300 ease-in-out hover:text-primary">+54 9 11 1234-5678</a></p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">Seguinos</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary" aria-label="Facebook">
                <Facebook className="h-6 w-6" strokeWidth={2}/>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary" aria-label="Instagram">
                <Instagram className="h-6 w-6" strokeWidth={2}/>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" strokeWidth={2}/>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Manya Digital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
