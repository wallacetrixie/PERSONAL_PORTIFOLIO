import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download, Mail, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import portraitImage from '../../assets/images/Potrait.jpg';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  // Smooth scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Spiral SVG */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5"
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              className="text-primary-500"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.2,76.2C26.6,83.4,13.3,85.2,-0.9,86.7C-15.1,88.2,-30.2,89.4,-43.8,82.9C-57.4,76.4,-69.5,62.2,-77.8,46.2C-86.1,30.2,-90.6,12.4,-89.7,-5.1C-88.8,-22.6,-82.5,-39.8,-72.6,-54.3C-62.7,-68.8,-49.2,-80.6,-34.3,-87.3C-19.4,-94,-9.7,-95.6,2.4,-99.3C14.5,-103,30.6,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </motion.div>

        {/* Abstract Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary-500/30 rounded-full"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-purple-500/30"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating Particles */}
        {!prefersReducedMotion &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
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
            <motion.div
              className="inline-block"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-primary-400 font-medium text-lg md:text-xl flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-2xl">👋</span> Hello, I'm
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">{PERSONAL_INFO.name.split(' ')[0]} </span>
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-purple-500 text-transparent bg-clip-text">
                {PERSONAL_INFO.name.split(' ')[1]}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {PERSONAL_INFO.title}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {PERSONAL_INFO.bio} Building innovative solutions at{' '}
              <span className="text-primary-400 font-semibold">{PERSONAL_INFO.company}</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Primary Button */}
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg overflow-hidden shadow-lg shadow-primary-500/50 hover:shadow-xl hover:shadow-primary-500/70 transition-shadow"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Secondary Button */}
              <motion.a
                href="#contact"
                className="group px-8 py-4 bg-transparent border-2 border-primary-500 text-primary-400 font-semibold rounded-lg hover:bg-primary-500/10 transition-colors flex items-center gap-2"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </motion.a>

              {/* Download CV Button */}
              <motion.a
                href="/cv.pdf"
                download
                className="group px-8 py-4 bg-gray-800 border-2 border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 hover:border-gray-600 transition-colors flex items-center gap-2"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download CV
              </motion.a>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              className="flex items-center gap-3 justify-center lg:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
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
              </div>
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
              <motion.div
                className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full border-2 border-primary-500/30"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.05, 1],
                        rotate: [0, 360],
                      }
                }
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[250px] h-[250px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-purple-500/30"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.08, 1],
                        rotate: [360, 0],
                      }
                }
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Portrait Image with Floating Animation */}
            <motion.div
              className="relative z-10"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -20, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            >
              <div className="relative w-[250px] h-[250px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl shadow-primary-500/30">
                  <img
                    src={portraitImage}
                    alt={`${PERSONAL_INFO.name} - Professional Portrait`}
                    className="w-full h-full object-cover object-center scale-110"
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group cursor-pointer"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to next section"
      >
        <span className="text-sm font-medium">Scroll Down</span>
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 group-hover:text-primary-400 transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
};
