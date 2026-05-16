import { Section } from '../components/ui/Section';
import { ContactSection } from '../components/sections/ContactSection';
import { useSEO } from '../hooks/useSEO';

export const Contact = () => {
  useSEO({
    title: 'Contact | Wallace Wambulwa - Get in Touch',
    description: 'Contact Wallace Wambulwa, a professional full-stack developer. Send me a message to discuss your project, collaboration opportunities, or any inquiries about my services.',
    keywords: 'Contact, Get in Touch, Wallace Wambulwa, Hire Developer, Project Inquiry, Collaboration',
    canonical: 'https://wallacewambulwa-gilt.vercel.app/contact',
    ogType: 'website',
  });

  return (
    <Section id="contact" className="min-h-screen">
      <ContactSection showHeader={true} id="contact" />
    </Section>
  );
};
