import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = '', id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`py-20 ${className}`}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
};
