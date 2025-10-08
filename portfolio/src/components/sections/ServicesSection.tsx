import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Server, 
  Smartphone, 
  Cloud, 
  Zap,
  Check,
  ArrowRight
} from 'lucide-react';
import type { Service } from '../../constants/services';

interface ServicesSectionProps {
  services: Service[];
}

const iconMap = {
  Code2: Code2,
  Palette: Palette,
  Server: Server,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Zap: Zap,
};

const colorClasses = {
  cyan: {
    gradient: 'from-cyan-500/10 to-blue-500/10 dark:from-cyan-400/10 dark:to-blue-400/10',
    border: 'border-cyan-500/30 dark:border-cyan-400/30',
    icon: 'bg-gradient-to-br from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400',
    text: 'text-cyan-600 dark:text-cyan-400',
    shadow: 'shadow-cyan-500/20 dark:shadow-cyan-400/20',
    button: 'bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600'
  },
  purple: {
    gradient: 'from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10',
    border: 'border-purple-500/30 dark:border-purple-400/30',
    icon: 'bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400',
    text: 'text-purple-600 dark:text-purple-400',
    shadow: 'shadow-purple-500/20 dark:shadow-purple-400/20',
    button: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
  },
  blue: {
    gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10',
    border: 'border-blue-500/30 dark:border-blue-400/30',
    icon: 'bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400',
    text: 'text-blue-600 dark:text-blue-400',
    shadow: 'shadow-blue-500/20 dark:shadow-blue-400/20',
    button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
  },
  green: {
    gradient: 'from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10',
    border: 'border-green-500/30 dark:border-green-400/30',
    icon: 'bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400',
    text: 'text-green-600 dark:text-green-400',
    shadow: 'shadow-green-500/20 dark:shadow-green-400/20',
    button: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
  },
  orange: {
    gradient: 'from-orange-500/10 to-amber-500/10 dark:from-orange-400/10 dark:to-amber-400/10',
    border: 'border-orange-500/30 dark:border-orange-400/30',
    icon: 'bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400',
    text: 'text-orange-600 dark:text-orange-400',
    shadow: 'shadow-orange-500/20 dark:shadow-orange-400/20',
    button: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600'
  },
  pink: {
    gradient: 'from-pink-500/10 to-rose-500/10 dark:from-pink-400/10 dark:to-rose-400/10',
    border: 'border-pink-500/30 dark:border-pink-400/30',
    icon: 'bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400',
    text: 'text-pink-600 dark:text-pink-400',
    shadow: 'shadow-pink-500/20 dark:shadow-pink-400/20',
    button: 'bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600'
  }
};

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4"
          >
            What I Offer
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-gray-900 dark:text-white"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple">Services</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive solutions tailored to your business needs. From concept to deployment, I've got you covered.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
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
                    rounded-2xl p-8
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
                    {/* Icon */}
                    <motion.div 
                      className={`
                        w-16 h-16 rounded-xl ${colors.icon}
                        flex items-center justify-center mb-6
                        shadow-lg
                      `}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -10, 10, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {Icon && <Icon className="w-8 h-8 text-white" />}
                    </motion.div>

                    {/* Title */}
                    <h3 className={`
                      text-2xl font-bold mb-3 ${colors.text}
                    `}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <motion.li 
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                        >
                          <Check className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    {service.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 4).map((tech, idx) => (
                          <span 
                            key={idx}
                            className={`
                              text-xs px-3 py-1 rounded-full
                              bg-white/50 dark:bg-gray-800/50
                              ${colors.text}
                              border ${colors.border}
                            `}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Decorative Corner Element */}
                  <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 ${colors.gradient} blur-3xl rounded-full`}
                    animate={{
                      scale: isHovered ? 1.5 : 1,
                      opacity: isHovered ? 0.3 : 0.1
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Don't see what you're looking for? Let's discuss your custom requirements!
          </p>
          <motion.a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
