import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { MapSection } from '../components/sections/MapSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { Skills } from './Skills';
import { SERVICES, TESTIMONIALS } from '../constants/services';

export const Home = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="services">
        <ServicesSection services={SERVICES} />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection testimonials={TESTIMONIALS} />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <section id="map">
        <MapSection />
      </section>
    </>
  );
};
