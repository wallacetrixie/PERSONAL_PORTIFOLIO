import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { DevelopmentFramework } from '../components/sections/DevelopmentFramework';
import { MapSection } from '../components/sections/MapSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { Skills } from './Skills';
import { SERVICES, TESTIMONIALS } from '../constants/services';
import { useSEO } from '../hooks/useSEO';

export const Home = () => {
  useSEO({
    title: 'Wallace Wambulwa | Full Stack Developer & Software Engineer Portfolio',
    description: 'Wallace Wambulwa - Professional Full Stack Developer specializing in React, TypeScript, Node.js, and modern web technologies. Explore my portfolio of 50+ completed projects, services, and technical expertise in software development.',
    keywords: 'Wallace Wambulwa, Full Stack Developer, Software Engineer, Web Developer, React Developer, TypeScript, JavaScript, Node.js, Python, Portfolio',
    canonical: 'https://wallacewambulwa-gilt.vercel.app',
    ogType: 'website',
  });

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
      <section id="development-framework">
        <DevelopmentFramework />
      </section>
      <section id="testimonials">
        <TestimonialsSection testimonials={TESTIMONIALS} />
      </section>
      <section id="map">
        <MapSection />
      </section>
    </>
  );
};
