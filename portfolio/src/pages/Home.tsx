import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { Skills } from './Skills';

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />

      {/* Contact Preview Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        </div>
      </section>
    </>
  );
};
