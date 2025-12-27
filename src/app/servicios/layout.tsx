
import { FinalCtaSection } from '@/components/manya/final-cta-section';

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <main>{children}</main>
        </div>
        <FinalCtaSection />
    </div>
  );
}
