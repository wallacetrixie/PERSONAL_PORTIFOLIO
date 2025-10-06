import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Skills } from './Skills';

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};
