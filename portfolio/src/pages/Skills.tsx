import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';

export const Skills = () => {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Tools',
      items: ['Git', 'VS Code', 'Docker', 'Figma'],
    },
  ];

  return (
    <Section id="skills" className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Technologies I work with
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillSet, index) => (
          <motion.div
            key={skillSet.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {skillSet.category}
            </h3>
            <ul className="space-y-2">
              {skillSet.items.map((skill) => (
                <li
                  key={skill}
                  className="text-gray-700 dark:text-gray-300"
                >
                  • {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
