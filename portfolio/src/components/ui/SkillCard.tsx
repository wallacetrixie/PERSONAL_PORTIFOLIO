import { motion, type Variants } from 'framer-motion';
import type { SkillCategory } from '../../constants/skills';
import { useEffect, useState } from 'react';

interface SkillCardProps {
  category: SkillCategory;
  index: number;
  isInView: boolean;
  customVariants?: Variants;
  style?: React.CSSProperties;
}

export const SkillCard = ({ 
  category, 
  index, 
  isInView, 
  customVariants,
  style 
}: SkillCardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-friendly variants with minimal animation
  const mobileCardVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  // Desktop variants with full animations
  const desktopCardVariants: Variants = customVariants || {
    hidden: { 
      opacity: 0, 
      scale: 0.96,
      y: 24
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: index * 0.12,
        duration: 0.55,
        ease: [0.22, 0.44, 0, 1]
      }
    }
  };

  const cardVariants = isMobile ? mobileCardVariants : desktopCardVariants;

  // Mobile-friendly icon variants with slide-in effect
  const mobileIconVariants: Variants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1
    }
  };

  const desktopIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  const iconVariants = isMobile ? mobileIconVariants : desktopIconVariants;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={!isMobile ? { 
        scale: 1.02,
        y: -4,
        transition: { 
          duration: 0.25,
          ease: 'easeOut'
        }
      } : {}}
      className={`skill-card-futuristic skill-card-${category.color}`}
      style={style}
      aria-label={`${category.title} skills`}
    >
      {/* Card Content */}
      <div className="skill-card-content">
        <h3 className="skill-card-title-futuristic">
          {category.title}
        </h3>
        <p className="skill-card-tagline-futuristic">
          {category.tagline}
        </p>

        {/* Tech Icons - Enhanced for mobile with slide-in */}
        <div className="tech-icons" role="list" aria-label="Featured technologies">
          {category.techIcons.map((tech, idx) => (
            <motion.div
              key={tech.name}
              className="tech-icon"
              role="listitem"
              variants={iconVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={isMobile ? {
                delay: 0.2 + idx * 0.06,
                duration: 0.35,
                ease: 'easeOut'
              } : { 
                delay: 0.35 + index * 0.12 + idx * 0.06, 
                duration: 0.45,
                ease: [0.22, 0.44, 0, 1]
              }}
              whileHover={!isMobile ? { 
                scale: 1.08,
                y: -2,
                transition: { 
                  duration: 0.25,
                  ease: 'easeOut'
                }
              } : {}}
              title={tech.name}
              aria-label={tech.name}
            >
              {tech.icon}
            </motion.div>
          ))}
        </div>

        {/* Technologies List - Simplified for mobile */}
        <div className="technologies-list" role="list" aria-label="Technology stack">
          {category.technologies.map((tech, idx) => (
            <motion.span
              key={tech}
              className="tech-tag"
              role="listitem"
              initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? {
                delay: 0.3 + idx * 0.03,
                duration: 0.3
              } : { 
                delay: 0.5 + index * 0.15 + idx * 0.05, 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`card-glow-futuristic glow-${category.color}`} aria-hidden="true"></div>
    </motion.div>
  );
};
