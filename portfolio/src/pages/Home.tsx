import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';

export const Home = () => {
  return (
    <>
      <Hero />
      <About />

      {/* Projects Preview Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        </div>
      </section>

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
