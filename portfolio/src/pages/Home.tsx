import { Hero } from '../components/sections/Hero';

export const Home = () => {
  return (
    <>
      <Hero />
      
      {/* About Section - This will be scrolled to from Hero */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            More content coming soon...
          </p>
        </div>
      </section>

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
