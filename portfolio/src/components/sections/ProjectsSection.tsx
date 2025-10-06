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
  showStats = true,
  showCTA = true 
}: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  // Filter projects based on selected category
  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory as ProjectCategory);

  // For mobile, show only 3 projects initially
  const displayedProjects = isMobile && !showAll 
    ? filteredProjects.slice(0, 3) 
    : filteredProjects;

  const hasMoreProjects = isMobile && filteredProjects.length > 3;

  // Enhanced animation variants for container with slide effect
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

  // Card animation variants with slide effect
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
    <section id="projects-section" className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Portfolio
            </motion.p>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-gray-900 dark:text-white"
            >
              Sample<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple">Projects</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-2"
            >
              Explore my collection of frontend and backend projects, showcasing modern web development practices,
              clean code architecture, and innovative solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm text-gray-500 dark:text-gray-500"
            >
              Dashboard & Main Pages
            </motion.p>
          </motion.div>
        )}

        {/* Category Filter */}
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

        {/* Projects Grid */}
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

        {/* View More Button (Mobile Only) */}
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
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View More Projects</span>
              <ChevronDown size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* View Less Button (Mobile Only - after showing all) */}
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
                // Scroll to top of projects section smoothly
                const projectsSection = document.getElementById('projects-section');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-dark-card text-primary-500 dark:text-primary-400 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary-500 dark:border-primary-400"
            >
              <span>View Less</span>
              <ChevronUp size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category.
            </p>
          </motion.div>
        )}

        {/* Stats Section */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="p-6 bg-white dark:bg-dark-card rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                {PROJECTS.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Total Projects
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-dark-card rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-blue-500 dark:text-blue-400 mb-2">
                {PROJECTS.filter(p => p.category === 'frontend').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Frontend Projects
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-dark-card rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-green-500 dark:text-green-400 mb-2">
                {PROJECTS.filter(p => p.category === 'backend').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Backend Projects
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-primary-500 to-accent-purple p-12 rounded-2xl shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Interested in Working Together?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-500 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="https://github.com/wallacetrixie"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
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