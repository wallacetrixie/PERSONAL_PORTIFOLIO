import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { PERSONAL_INFO } from '../../constants';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import portraitImage from '../../assets/images/Potrait.jpg';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const firstName = PERSONAL_INFO.name.split(' ')[0];
  const lastName = PERSONAL_INFO.name.split(' ')[1];
  const fullName = `${firstName} ${lastName}`;
  
  const { displayedText: typedName, isComplete } = useTypingEffect({
    text: fullName,
    speed: 100,
    delay: 500,
  });

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-light-bg via-white to-light-bg-secondary dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-light-accent1/10 dark:bg-primary-500/20 rounded-full blur-3xl opacity-30"
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-light-accent2/10 dark:bg-purple-500/20 rounded-full blur-3xl opacity-20"
        />

        {/* Spiral SVG */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 dark:opacity-5"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              className="text-light-accent1 dark:text-primary-500"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.2,76.2C26.6,83.4,13.3,85.2,-0.9,86.7C-15.1,88.2,-30.2,89.4,-43.8,82.9C-57.4,76.4,-69.5,62.2,-77.8,46.2C-86.1,30.2,-90.6,12.4,-89.7,-5.1C-88.8,-22.6,-82.5,-39.8,-72.6,-54.3C-62.7,-68.8,-49.2,-80.6,-34.3,-87.3C-19.4,-94,-9.7,-95.6,2.4,-99.3C14.5,-103,30.6,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        {/* Abstract Shapes */}
        <div
          className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-light-accent1/20 dark:border-primary-500/30 rounded-full"
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-light-accent2/20 dark:border-purple-500/30"
        />

        {/* Floating Particles - Removed for cleaner look */}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left order-2 lg:order-1"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -50 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.2 }}
          >
            {/* Greeting */}
            {/* Headline with Typing Effect */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight min-h-[1.2em] flex flex-wrap items-baseline justify-center lg:justify-start gap-x-2 md:gap-x-3"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {typedName.split(' ').map((word, index) => {
                if (index === 0) {
                  return (
                    <span key={index} className="text-light-text dark:text-white inline-block">
                      {word}
                    </span>
                  );
                }
                return (
                  <span
                    key={index}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple inline-block"
                  >
                    {word}
                  </span>
                );
              })}
              {/* Blinking Cursor */}
              {!isComplete && (
                <motion.span
                  className="inline-block w-1 h-[0.9em] bg-light-accent1 dark:bg-primary-500"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                />
              )}
            </motion.h1>

            {/* Tagline - Static Display */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-light-text-secondary dark:text-gray-300 font-medium"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {PERSONAL_INFO.title}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-light-text-secondary dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion || isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              {PERSONAL_INFO.bio} Building innovative solutions at{' '}
              <span className="text-light-accent1 dark:text-primary-300 font-semibold">{PERSONAL_INFO.company}</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion || isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              {/* Primary Button */}
              <motion.a
                href="#projects"
                aria-label="View my portfolio projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-light-accent1 to-blue-600 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-lg overflow-hidden shadow-soft-shadow-light dark:shadow-lg dark:shadow-primary-500/50 hover:shadow-soft-shadow-hover-light dark:hover:shadow-xl dark:hover:shadow-primary-500/70 transition-all duration-300"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-light-accent2 dark:from-primary-600 dark:to-purple-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Secondary Button */}
              <motion.a
                href="#contact"
                aria-label="Contact me to discuss your project"
                className="group px-8 py-4 bg-white dark:bg-white/5 backdrop-blur-sm border-2 border-light-accent1/50 dark:border-primary-500/50 text-light-accent1 dark:text-primary-400 font-semibold rounded-lg hover:bg-light-bg-secondary dark:hover:bg-primary-500/10 hover:border-light-accent1 dark:hover:border-primary-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-soft dark:shadow-none"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Let's Talk
              </motion.a>
            </motion.div>

            {/* Social Proof Stats - Hidden on small screens */}
            <motion.div
              className="hidden md:flex flex-wrap gap-6 pt-6 border-t border-light-border dark:border-gray-800 justify-center lg:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion || isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-2xl md:text-3xl font-bold text-light-accent1 dark:text-primary-400">50+</div>
                <div className="text-xs md:text-sm text-light-text-secondary dark:text-gray-300">Projects Completed</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-2xl md:text-3xl font-bold text-light-accent1 dark:text-primary-400">5+</div>
                <div className="text-xs md:text-sm text-light-text-secondary dark:text-gray-300">Years Experience</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-2xl md:text-3xl font-bold text-light-accent1 dark:text-primary-400">30+</div>
                <div className="text-xs md:text-sm text-light-text-secondary dark:text-gray-300">Happy Clients</div>
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              className="flex items-center gap-3 justify-center lg:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion || isComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="#contact"
                aria-label="I am currently available for freelance work - click to contact"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full hover:bg-green-500/20 transition-colors group"
              >
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 text-sm font-medium">{PERSONAL_INFO.availability}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Portrait Image */}
          <motion.div
            className="relative flex justify-center items-center order-1 lg:order-2"
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? undefined : { type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }}
          >
            {/* Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full border-2 border-light-accent1/20 dark:border-primary-500/30"
              />
              <div
                className="absolute w-[190px] h-[190px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-light-accent2/20 dark:border-purple-500/30"
              />
            </div>

            {/* Portrait Image - Fixed Position */}
            <div className="relative">
              <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-light-accent1 via-light-accent2 to-pink-500 dark:from-primary-500 dark:via-purple-500 dark:to-pink-500 rounded-full blur-xl opacity-30 md:opacity-50" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 md:border-4 border-light-bg-secondary dark:border-gray-800 shadow-2xl shadow-light-accent1/20 dark:shadow-primary-500/30">
                  {/* Loading Skeleton */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-light-bg-secondary dark:bg-gray-800 animate-pulse rounded-full flex items-center justify-center">
                      <div className="text-light-text-secondary dark:text-gray-600 text-sm">Loading...</div>
                    </div>
                  )}
                  
                  <img
                    src={portraitImage}
                    alt={`${PERSONAL_INFO.name} - Professional Portrait`}
                    className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>

                {/* Decorative Dots */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 grid grid-cols-3 gap-2"
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-primary-500/60 rounded-full" />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Prompt - Hidden on small screens */}
      <motion.button
        onClick={scrollToNextSection}
        className="hidden md:flex absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-2 text-light-text-secondary dark:text-gray-300 hover:text-light-accent1 dark:hover:text-primary-400 transition-colors duration-300 group cursor-pointer z-20"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Scroll down to next section"
      >
        <span className="text-xs md:text-sm font-medium text-center">Scroll Down</span>
        <motion.div
          className="flex items-center justify-center"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 md:w-7 md:h-7 group-hover:text-light-accent1 dark:group-hover:text-primary-400 transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
};
