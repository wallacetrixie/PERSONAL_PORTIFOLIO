import { motion } from 'framer-motion';
import { useState } from 'react';
import { Award, Calendar, Building2 } from 'lucide-react';
import type { Certification } from '../../constants/skills';

interface CertificationsSectionProps {
  certifications: Certification[];
}

const colorClasses = {
  cyan: {
    gradient: 'from-cyan-500/20 to-blue-500/20 dark:from-cyan-400/20 dark:to-blue-400/20',
    border: 'border-cyan-500/30 dark:border-cyan-400/30',
    icon: 'bg-gradient-to-br from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400',
    text: 'text-cyan-600 dark:text-cyan-400',
    shadow: 'shadow-cyan-500/20 dark:shadow-cyan-400/20'
  },
  purple: {
    gradient: 'from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20',
    border: 'border-purple-500/30 dark:border-purple-400/30',
    icon: 'bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400',
    text: 'text-purple-600 dark:text-purple-400',
    shadow: 'shadow-purple-500/20 dark:shadow-purple-400/20'
  },
  blue: {
    gradient: 'from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20',
    border: 'border-blue-500/30 dark:border-blue-400/30',
    icon: 'bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400',
    text: 'text-blue-600 dark:text-blue-400',
    shadow: 'shadow-blue-500/20 dark:shadow-blue-400/20'
  },
  green: {
    gradient: 'from-green-500/20 to-emerald-500/20 dark:from-green-400/20 dark:to-emerald-400/20',
    border: 'border-green-500/30 dark:border-green-400/30',
    icon: 'bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400',
    text: 'text-green-600 dark:text-green-400',
    shadow: 'shadow-green-500/20 dark:shadow-green-400/20'
  },
  orange: {
    gradient: 'from-orange-500/20 to-amber-500/20 dark:from-orange-400/20 dark:to-amber-400/20',
    border: 'border-orange-500/30 dark:border-orange-400/30',
    icon: 'bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400',
    text: 'text-orange-600 dark:text-orange-400',
    shadow: 'shadow-orange-500/20 dark:shadow-orange-400/20'
  },
  pink: {
    gradient: 'from-pink-500/20 to-rose-500/20 dark:from-pink-400/20 dark:to-rose-400/20',
    border: 'border-pink-500/30 dark:border-pink-400/30',
    icon: 'bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400',
    text: 'text-pink-600 dark:text-pink-400',
    shadow: 'shadow-pink-500/20 dark:shadow-pink-400/20'
  }
};

export const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div 
      className="mt-32 mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Award className="w-8 h-8 text-light-accent1 dark:text-primary-400" />
          <h3 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">
            Achievements & Certifications
          </h3>
          <Award className="w-8 h-8 text-light-accent2 dark:text-purple-400" />
        </motion.div>
        <motion.p 
          className="text-center text-light-text-secondary dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Professional qualifications and industry-recognized certifications that validate my expertise
        </motion.p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {certifications.map((cert, index) => {
          const colors = colorClasses[cert.color];
          const isHovered = hoveredIndex === index;
          
          return (
            <motion.div
              key={cert.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.4,
                type: "spring",
                stiffness: 100
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <motion.div
                className={`
                  relative h-full overflow-hidden
                  bg-gradient-to-br ${colors.gradient}
                  backdrop-blur-sm
                  border-2 ${colors.border}
                  rounded-2xl p-6
                  transition-all duration-300
                  ${isHovered ? `shadow-2xl ${colors.shadow}` : 'shadow-lg'}
                `}
                whileHover={{ 
                  y: -8,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0`}
                  animate={{
                    opacity: isHovered ? 0.5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Date Header */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className={`
                        w-16 h-16 rounded-xl ${colors.icon}
                        flex items-center justify-center text-3xl
                        shadow-lg
                      `}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {cert.icon}
                    </motion.div>
                    
                    <div className="flex items-center gap-1 text-sm text-light-text-secondary dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className={`
                    text-xl font-bold mb-2 ${colors.text}
                    line-clamp-2 min-h-[3.5rem]
                  `}>
                    {cert.title}
                  </h4>

                  {/* Issuer */}
                  <div className="flex items-center gap-2 mb-3 text-light-text dark:text-gray-300">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm font-medium line-clamp-1">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Description */}
                  <motion.p 
                    className="text-sm text-light-text-secondary dark:text-gray-400 leading-relaxed line-clamp-4"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {cert.description}
                  </motion.p>

                  {/* Decorative Corner Element */}
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 ${colors.gradient} blur-2xl rounded-full`}
                    animate={{
                      scale: isHovered ? 1.5 : 1,
                      opacity: isHovered ? 0.3 : 0.1
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.icon}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Decorative Element */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-light-accent1/10 to-light-accent2/10 dark:from-primary-500/10 dark:to-purple-500/10 backdrop-blur-sm border border-light-border dark:border-gray-700 rounded-full">
          <Award className="w-5 h-5 text-light-accent1 dark:text-primary-400" />
          <span className="text-sm font-semibold text-light-text dark:text-white">
            {certifications.length} Certifications & Counting
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
