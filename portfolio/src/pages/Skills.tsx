import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SkillsSection } from '../components/sections/SkillsSection';
import { SoftSkillsGrid } from '../components/ui/SoftSkillsGrid';
import { 
  SKILL_CATEGORIES_SECTION_1, 
  SKILL_CATEGORIES_SECTION_2,
  SOFT_SKILLS 
} from '../constants/skills';
import './Skills.css';

export const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-light-bg via-white to-light-bg-secondary dark:from-[#0a0e27] dark:via-[#16213e] dark:to-[#0a0e27]"
      aria-labelledby="skills-heading"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Glowing Orbs */}
        <motion.div 
          className="absolute top-20 left-1/4 w-96 h-96 bg-light-accent1/5 dark:bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-light-accent2/5 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3], 
            opacity: [0.2, 0.1, 0.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            id="skills-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight bg-gradient-to-r from-light-accent1 via-light-accent2 to-pink-500 dark:from-cyan-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 40px rgba(37, 99, 235, 0.2)'
            }}
          >
            SKILLS
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-light-text dark:text-white/90"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Skills & Technologies
          </motion.p>
        </motion.div>

        {/* First Section - Frontend, Design, Backend */}
        <SkillsSection 
          categories={SKILL_CATEGORIES_SECTION_1} 
          sectionRef={section1Ref}
        />

        {/* Second Section - DevOps, Mobile, Network */}
        <SkillsSection 
          categories={SKILL_CATEGORIES_SECTION_2} 
          sectionRef={section2Ref}
        />

        {/* Soft Skills Section */}
        <SoftSkillsGrid skills={SOFT_SKILLS} />
      </div>
    </section>
  );
};
