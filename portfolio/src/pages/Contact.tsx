import { Section } from '../components/ui/Section';
import { ContactSection } from '../components/sections/ContactSection';

export const Contact = () => {
  return (
    <Section id="contact" className="min-h-screen">
      <ContactSection showHeader={true} id="contact" />
    </Section>
  );
};
