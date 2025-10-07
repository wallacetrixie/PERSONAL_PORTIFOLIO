import { motion } from 'framer-motion';
import type { SoftSkill } from '../../constants/skills';

interface SoftSkillsGridProps {
  skills: SoftSkill[];
}

export const SoftSkillsGrid = ({ skills }: SoftSkillsGridProps) => {
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

      <div 
        className="flex flex-wrap justify-center gap-4 px-4 max-w-5xl mx-auto"
        role="list"
        aria-label="Soft skills"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="soft-skill-button"
            role="listitem"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.4,
              type: 'spring',
              stiffness: 200
            }}
            whileHover="hover"
          >
            <motion.div className="soft-skill-content">
              <span className="soft-skill-title">{skill.name}</span>
              <motion.p 
                className="soft-skill-desc"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                variants={{
                  hover: {
                    opacity: 1,
                    height: 'auto',
                    marginTop: 8,
                    transition: { duration: 0.3 }
                  }
                }}
              >
                {skill.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
