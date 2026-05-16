import { Section } from '../components/ui/Section';
import { useSEO } from '../hooks/useSEO';

export const About = () => {
  useSEO({
    title: 'About | Wallace Wambulwa - Full Stack Developer',
    description: 'Learn about Wallace Wambulwa, a passionate full-stack developer from Kenya with expertise in React, TypeScript, Node.js, and modern web technologies. Discover my background, experience, and approach to software development.',
    keywords: 'About, Wallace Wambulwa, Developer Bio, Software Engineer, Full Stack, Kenya, Experience',
    canonical: 'https://wallacewambulwa-gilt.vercel.app/about',
    ogType: 'profile',
  });

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
