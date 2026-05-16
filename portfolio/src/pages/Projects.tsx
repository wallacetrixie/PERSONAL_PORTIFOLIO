import { Section } from '../components/ui/Section';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { useSEO } from '../hooks/useSEO';

export const Projects = () => {
  useSEO({
    title: 'Projects | Wallace Wambulwa - Full Stack Developer Portfolio',
    description: 'Explore Wallace Wambulwa\'s portfolio of 50+ completed projects showcasing expertise in React, TypeScript, Node.js, Python, and modern web technologies. Featured frontend, backend, and full-stack projects with detailed technical implementation.',
    keywords: 'Projects, Portfolio, Web Development, React, TypeScript, Node.js, Frontend, Backend, Full Stack, Software Engineering',
    canonical: 'https://wallacewambulwa-gilt.vercel.app/projects',
    ogType: 'website',
  });

  return (
    <Section id="projects" className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <ProjectsSection 
        showHeader={true}
        showFilter={true}
        showStats={true}
        showCTA={true}
      />
    </Section>
  );
};
