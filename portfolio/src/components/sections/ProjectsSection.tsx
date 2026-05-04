import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { CategoryFilter } from '../ui/CategoryFilter';
import { PROJECTS, PROJECT_CATEGORIES } from '../../constants';
import type { ProjectCategory } from '../../types';

interface ProjectsSectionProps {
  showHeader?: boolean;
  showFilter?: boolean;
  showStats?: boolean;
  showCTA?: boolean;
}

export const ProjectsSection = ({ 
  showHeader = true, 
  showFilter = true,
  showCTA = true 
}: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory as ProjectCategory);

  const displayedProjects = isMobile && !showAll 
    ? filteredProjects.slice(0, 3) 
    : filteredProjects;

  const hasMoreProjects = isMobile && filteredProjects.length > 3;

  const containerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="projects-section" className="relative min-h-screen py-24 lg:py-32 bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#3d2817] overflow-hidden">
      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23121212' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#8B5E3C] font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Portfolio
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-[#F5F5F5]"
            >
              Sample <span className="text-[#8B5E3C]">Projects</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-[#E8E8E8] max-w-3xl mx-auto mb-2"
            >
              Explore my collection of frontend and backend projects, showcasing modern web development practices,
              clean code architecture, and innovative solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm text-[#B0B0B0]"
            >
              Dashboard & Main Pages
            </motion.p>
          </motion.div>
        )}

        {showFilter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <CategoryFilter
              categories={PROJECT_CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
              >
                <ProjectCard
                  project={project}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMoreProjects && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-[#8B5E3C] text-[#121212] font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              <span>View More Projects</span>
              <ChevronDown size={20} />
            </motion.button>
          </motion.div>
        )}

        {hasMoreProjects && showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={() => {
                setShowAll(false);
                const projectsSection = document.getElementById('projects-section');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-[#8B5E3C] font-semibold rounded-lg shadow-lg transition-all duration-300 border border-[#8B5E3C]"
            >
              <span>View Less</span>
              <ChevronUp size={20} />
            </motion.button>
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2 font-playfair">
              No Projects Found
            </h3>
            <p className="text-[#B0B0B0]">
              Try selecting a different category.
            </p>
          </motion.div>
        )}

        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-[#1a1a1a] border border-[#8B5E3C] p-12 rounded-lg shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] font-playfair mb-4">
                Interested in Working Together?
              </h2>
              <p className="text-[#E8E8E8] text-lg mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#8B5E3C] text-[#121212] font-semibold rounded-lg shadow-lg transition-all duration-300"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="https://github.com/wallacetrixie"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-[#8B5E3C] font-semibold rounded-lg border border-[#8B5E3C] transition-all duration-300"
                >
                  View GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};