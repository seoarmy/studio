import { HeroSection } from '@/components/manya/hero-section';
import { ServicesSection } from '@/components/manya/services-section';
import { SuccessCasesSection } from '@/components/manya/success-cases-section';
import { TestimonialsSection } from '@/components/manya/testimonials-section';
import { BlogPreviewSection } from '@/components/manya/blog-preview-section';
import { ContactSection } from '@/components/manya/contact-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SuccessCasesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
