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
      scale: 0.95,
      rotateY: -5,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'spring' as const,
        stiffness: 80,
        damping: 15
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
        scale: 1.03, 
        rotateY: category.rotation * 1.5,
        transition: { 
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
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
                delay: 0.2 + idx * 0.08,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1], // Slight bounce effect
                type: 'spring',
                stiffness: 120,
                damping: 10
              } : { 
                delay: 0.4 + index * 0.15 + idx * 0.08, 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: 'spring',
                stiffness: 100,
                damping: 12
              }}
              whileHover={!isMobile ? { 
                scale: 1.15, 
                rotate: 360,
                transition: { 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
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
