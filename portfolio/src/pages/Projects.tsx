import { Section } from '../components/ui/Section';
import { ProjectsSection } from '../components/sections/ProjectsSection';

export const Projects = () => {
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
