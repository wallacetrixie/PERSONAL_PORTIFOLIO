import { Section } from '../components/ui/Section';

export const About = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-8">About Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          This page is under construction. Check back soon for more information about my background,
          experience, and journey in software development.
        </p>
      </div>
    </Section>
  );
};
