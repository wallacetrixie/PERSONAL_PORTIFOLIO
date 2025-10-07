import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import type { SoftSkill } from '../../constants/skills';

interface SoftSkillsGridProps {
  skills: SoftSkill[];
}

export const SoftSkillsGrid = ({ skills }: SoftSkillsGridProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);

  // Auto-scroll animation for carousel
  useAnimationFrame((_time, delta) => {
    if (!isPaused && carouselRef.current) {
      scrollPosition.current += delta * 0.03; // Adjust speed here
      carouselRef.current.scrollLeft = scrollPosition.current;

      // Reset scroll when reaching the end (loop)
      if (scrollPosition.current >= carouselRef.current.scrollWidth / 2) {
        scrollPosition.current = 0;
      }
    }
  });

  return (
    <motion.div 
      className="mt-32 mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-light-text dark:text-white">
        Core Competencies
      </h3>
      <p className="text-center text-light-text-secondary dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Beyond technical skills, these soft skills drive collaboration and excellence
      </p>

      {/* Desktop Carousel View */}
      <div className="hidden lg:block relative overflow-hidden py-8">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate skills for seamless loop */}
          {[...skills, ...skills].map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="inline-block flex-shrink-0"
              onMouseEnter={() => {
                setIsPaused(true);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setHoveredIndex(null);
              }}
              animate={{
                scale: hoveredIndex === index ? 1.05 : 1,
                width: hoveredIndex === index ? 380 : 280
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className={`
                h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700
                p-6 transition-all duration-300
                ${hoveredIndex === index ? 'shadow-2xl dark:shadow-primary-500/20' : ''}
              `}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-purple flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <h4 className="text-xl font-bold text-light-text dark:text-white whitespace-normal">
                    {skill.name}
                  </h4>
                </div>
                
                <motion.p
                  className="text-sm text-light-text-secondary dark:text-gray-400 whitespace-normal leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-light-bg dark:from-dark-bg to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-light-bg dark:from-dark-bg to-transparent pointer-events-none" />
      </div>

      {/* Mobile List View */}
      <div className="lg:hidden px-4 max-w-3xl mx-auto space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex gap-4 items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-purple flex items-center justify-center">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-light-text dark:text-white mb-1">
                {skill.name}
              </h4>
              <p className="text-sm text-light-text-secondary dark:text-gray-400 italic leading-relaxed">
                {skill.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
