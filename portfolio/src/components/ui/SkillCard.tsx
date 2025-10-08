import { motion } from 'framer-motion';
import type { SkillCategory } from '../../constants/skills';

interface SkillCardProps {
  category: SkillCategory;
  index: number;
  isInView: boolean;
  customVariants?: any;
  style?: React.CSSProperties;
}

export const SkillCard = ({ 
  category, 
  index, 
  isInView, 
  customVariants,
  style 
}: SkillCardProps) => {
  // Smoother, more fluid animations
  const cardVariants = customVariants || {
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
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing curve
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ 
        scale: 1.03, 
        rotateY: category.rotation * 1.5,
        transition: { 
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
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

        {/* Tech Icons - Smoother animations */}
        <div className="tech-icons" role="list" aria-label="Featured technologies">
          {category.techIcons.map((tech, idx) => (
            <motion.div
              key={tech.name}
              className="tech-icon"
              role="listitem"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                delay: 0.4 + index * 0.15 + idx * 0.08, 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: 'spring',
                stiffness: 100,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: 360,
                transition: { 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              title={tech.name}
              aria-label={tech.name}
            >
              {tech.icon}
            </motion.div>
          ))}
        </div>

        {/* Technologies List - Smoother animations */}
        <div className="technologies-list" role="list" aria-label="Technology stack">
          {category.technologies.map((tech, idx) => (
            <motion.span
              key={tech}
              className="tech-tag"
              role="listitem"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
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
