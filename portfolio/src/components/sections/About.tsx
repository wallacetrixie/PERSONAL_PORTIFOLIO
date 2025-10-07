import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef, useState, useMemo, memo } from 'react';
import { Code2, Palette, Server, Zap, Award, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import portraitImage from '../../assets/images/worksetup.png';
import { ABOUT_INFO } from '../../constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCountUp } from '../../hooks/useCountUp';


const ANIMATION_CONFIG = {
  countUpDuration: 2000,
  observerThreshold: 0.2,
  imageTransitionDuration: 500,
  staggerDelay: 0.2,
  itemDelay: 0.1,
} as const;

// Static array outside component to prevent recreation on each render
const DECORATIVE_DOTS = Array.from({ length: 16 }, (_, i) => i);

// ============================================================================
// TYPES
// ============================================================================
interface Skill {
  icon: LucideIcon;
  label: string;
  color: string;
}


const SKILLS: Skill[] = [
  { icon: Code2, label: 'Clean Code', color: 'text-primary-600 dark:text-primary-400' },
  { icon: Server, label: 'Backend', color: 'text-green-600 dark:text-green-400' },
  { icon: Palette, label: 'UI/UX', color: 'text-purple-600 dark:text-purple-400' },
  { icon: Zap, label: 'Performance', color: 'text-yellow-600 dark:text-yellow-400' },
  { icon: Award, label: 'Quality', color: 'text-pink-600 dark:text-pink-400' },
  { icon: Users, label: 'Collaboration', color: 'text-indigo-600 dark:text-indigo-400' },
];


interface GradientOrbProps {
  className: string;
  animationDuration: number;
  prefersReducedMotion: boolean;
}

const GradientOrb = memo(({ className, animationDuration, prefersReducedMotion }: GradientOrbProps) => (
  <motion.div
    className={className}
    animate={
      prefersReducedMotion
        ? {}
        : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }
    }
    transition={{ duration: animationDuration, repeat: Infinity, ease: 'easeInOut' }}
  />
));

GradientOrb.displayName = 'GradientOrb';

// Metric Card Component
interface MetricCardProps {
  value: number;
  suffix: string;
  label: string;
  color: string;
  isInView: boolean;
  hasBorder?: 'left' | 'right' | 'both' | 'none';
}

const MetricCard = memo(({ value, suffix, label, color, isInView, hasBorder = 'none' }: MetricCardProps) => {
  const borderClasses = {
    left: 'border-l border-light-border dark:border-gray-700',
    right: 'border-r border-light-border dark:border-gray-700',
    both: 'border-x border-light-border dark:border-gray-700',
    none: '',
  };

  return (
    <div className={`text-center ${borderClasses[hasBorder]}`}>
      <motion.div
        className={`text-3xl sm:text-4xl font-bold ${color} mb-1`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {value}{suffix}
      </motion.div>
      <div className="text-sm text-light-text-secondary dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Memoize intersection observer options to prevent recreation
  const observerOptions = useMemo(
    () => ({
      threshold: ANIMATION_CONFIG.observerThreshold,
      triggerOnce: true,
    }),
    []
  );

  // Detect when section is in view
  const isInView = useIntersectionObserver(sectionRef, observerOptions);

  // Animated metrics with consistent duration
  const experienceYears = useCountUp(
    isInView ? ABOUT_INFO.metrics.experience : 0,
    ANIMATION_CONFIG.countUpDuration
  );
  const projectsCompleted = useCountUp(
    isInView ? ABOUT_INFO.metrics.projects : 0,
    ANIMATION_CONFIG.countUpDuration
  );
  const clientsSatisfied = useCountUp(
    isInView ? ABOUT_INFO.metrics.clients : 0,
    ANIMATION_CONFIG.countUpDuration
  );

  // Animation variants
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: ANIMATION_CONFIG.staggerDelay,
          delayChildren: ANIMATION_CONFIG.itemDelay,
        },
      },
    }),
    []
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      },
    }),
    []
  );

  const imageVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8, x: 50 },
      visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
      },
    }),
    []
  );

  const skillIconVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * ANIMATION_CONFIG.itemDelay,
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99] as const,
        },
      }),
    }),
    []
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-light-bg dark:bg-gray-900"
      aria-labelledby="about-heading"
    >
      {/* Background Decorative Elements - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Single optimized gradient orb */}
        <GradientOrb
          className="absolute -top-40 -right-40 w-96 h-96 bg-light-accent1/5 dark:bg-primary-500/20 rounded-full blur-3xl"
          animationDuration={10}
          prefersReducedMotion={!!prefersReducedMotion}
        />

        {/* Abstract geometric shape - simpler animation */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-light-accent1/10 dark:border-primary-500/20 rounded-lg"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: [0, 45, 0],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Section Title */}
            <motion.div variants={itemVariants}>
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-light-accent1 dark:text-primary-400 mb-3">
                {ABOUT_INFO.tagline}
              </span>
              <h2 
                id="about-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-light-text dark:text-white"
              >
                {ABOUT_INFO.title.split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-light-accent1 via-blue-600 to-light-accent2 dark:from-primary-400 dark:via-primary-500 dark:to-purple-500 text-transparent bg-clip-text">{ABOUT_INFO.title.split(' ')[1]}</span>
              </h2>
            </motion.div>

            {/* Introduction Paragraphs - Using constants */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-base sm:text-lg text-light-text-secondary dark:text-gray-300 leading-relaxed">
                {ABOUT_INFO.intro.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-light-text-secondary dark:text-gray-300 leading-relaxed">
                {ABOUT_INFO.intro.paragraph2}
              </p>
            </motion.div>

            {/* Metrics - Improved cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 py-8 border-y border-light-border dark:border-gray-700"
              role="region"
              aria-label="Professional metrics"
            >
              <MetricCard
                value={experienceYears}
                suffix="+"
                label="Years Experience"
                color="text-light-accent1 dark:text-primary-400"
                isInView={isInView}
                hasBorder="none"
              />
              <MetricCard
                value={projectsCompleted}
                suffix="+"
                label="Projects Done"
                color="text-light-accent2 dark:text-purple-400"
                isInView={isInView}
                hasBorder="both"
              />
              <MetricCard
                value={clientsSatisfied}
                suffix="+"
                label="Happy Clients"
                color="text-green-600 dark:text-green-400"
                isInView={isInView}
                hasBorder="none"
              />
            </motion.div>

            {/* Skills Icons - Improved grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-white">
                What I Bring to the Table
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {SKILLS.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.label}
                      custom={index}
                      variants={prefersReducedMotion ? undefined : skillIconVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-white dark:bg-gray-800/50 hover:bg-light-bg-secondary dark:hover:bg-gray-800 transition-colors group cursor-default shadow-soft dark:shadow-none border border-light-border dark:border-transparent"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -5 }}
                    >
                      <Icon
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${skill.color} transition-transform group-hover:scale-110`}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium text-light-text-secondary dark:text-gray-300 text-center">
                        {skill.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Buttons - With accessibility improvements */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <a
                href={ABOUT_INFO.cta.primary.link}
                className="px-6 py-3 bg-light-accent1 hover:bg-blue-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-soft dark:shadow-lg hover:shadow-soft-shadow-hover-light dark:hover:shadow-xl hover:scale-105"
                aria-label="View my portfolio projects"
              >
                {ABOUT_INFO.cta.primary.text}
              </a>
              <a
                href={ABOUT_INFO.cta.secondary.link}
                className="px-6 py-3 bg-light-bg-secondary dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-light-text dark:text-white font-semibold rounded-lg transition-all duration-300 shadow-soft dark:shadow-none border border-light-border dark:border-transparent"
                aria-label="Get in touch via contact form"
              >
                {ABOUT_INFO.cta.secondary.text}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Simplified background decoration */}
            <div 
              className="absolute -inset-4 bg-gradient-to-br from-light-accent1 via-light-accent2 to-pink-500 dark:from-primary-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl blur-2xl opacity-10 dark:opacity-20" 
              aria-hidden="true"
            />
            
            {/* Image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-light-card-hover dark:shadow-2xl border border-light-border dark:border-transparent">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-light-bg-secondary to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
              )}
              
              {/* Main image - With dimensions to prevent layout shift */}
              <motion.img
                src={portraitImage}
                alt="Wallace Wambulwa - Backend Engineer and UI/UX Designer"
                loading="lazy"
                width={600}
                height={800}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-auto object-cover transition-opacity duration-${ANIMATION_CONFIG.imageTransitionDuration} ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Subtle overlay gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent pointer-events-none" 
                aria-hidden="true"
              />
            </div>

            {/* Floating badge - Improved accessibility */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-light-card dark:bg-gray-800 rounded-2xl shadow-light-card-hover dark:shadow-xl p-4 sm:p-6 border border-light-border dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              role="status"
              aria-label="Current availability status"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-light-accent1 to-light-accent2 dark:from-primary-500 dark:to-purple-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-light-text dark:text-white">
                    Available for Work
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-gray-400">
                    Let's build something great
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative dots pattern - Memoized array */}
            <div 
              className="absolute -top-8 -right-8 w-24 h-24 grid grid-cols-4 gap-2 opacity-20" 
              aria-hidden="true"
            >
              {DECORATIVE_DOTS.map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-light-accent1 dark:bg-primary-500"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
