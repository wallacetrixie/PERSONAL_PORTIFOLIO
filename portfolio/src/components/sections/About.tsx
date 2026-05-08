import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { ABOUT_INFO } from '../../constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import portraitImage from '../../assets/images/Potrait.jpg';
import resumePDF from '../../assets/My Resume.pdf';

export const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const observerOptions = useMemo(
    () => ({
      threshold: 0.2,
      triggerOnce: true,
    }),
    []
  );

  const isInView = useIntersectionObserver(sectionRef, observerOptions);


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 bg-gradient-to-br from-[#2a1f15] via-[#3d2817] to-[#1a1a1a]"
      aria-labelledby="about-heading"
    >
      {/* Film grain texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
        backgroundSize: '100px 100px'
      }} />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-24 space-y-6"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-light tracking-[0.2em] uppercase text-[#8B5E3C]">
            {ABOUT_INFO.tagline}
          </span>
          <h2
            id="about-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-[#F5F5F5] tracking-tight"
          >
            {ABOUT_INFO.title}
          </h2>
          <div className="w-12 h-px bg-[#8B5E3C]" />
        </motion.div>

        {/* Mobile Portrait Image - Only visible on small screens */}
        <motion.div
          className="mb-16 lg:hidden flex justify-center"
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-xs">
            {/* Subtle circular glow background */}
            <div className="absolute inset-0 rounded-full bg-[#8B5E3C]/5 blur-3xl" />

            {/* Glass container with soft rounded corners */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-[#1a1a1a]/40 border border-[#8B5E3C] shadow-2xl p-2">
              {/* Portrait Image */}
              <img
                src={portraitImage}
                alt="Wallace Wambulwa Professional Portrait"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Introduction Paragraphs */}
            <div className="space-y-8">
              <p className="text-base lg:text-lg font-inter text-[#E8E8E8] leading-[1.8]">
                {ABOUT_INFO.intro.paragraph1}
              </p>
              <p className="text-base lg:text-lg font-inter text-[#B0B0B0] leading-[1.8]">
                {ABOUT_INFO.intro.paragraph2}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#8B5E3C]/30" />

            {/* Resume CTA Button */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#8B5E3C] text-[#F5F5F5] font-inter font-semibold tracking-wide hover:bg-[#A67C52] transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <span>View Resume</span>
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Highlights */}
          <motion.div
            className="space-y-8"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Stats Cards */}
            <div className="space-y-4">
              {[
                { value: '5+', label: 'Years of Experience' },
                { value: '50+', label: 'Projects Completed' },
                { value: '30+', label: 'Satisfied Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-start gap-6 p-6 border-l border-[#8B5E3C] bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/60 transition-all duration-300"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-[#8B5E3C]">
                    <span className="text-2xl font-playfair font-bold text-[#8B5E3C]">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-inter text-[#B0B0B0]">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Highlight Box */}
            <motion.div
              className="p-8 border border-[#8B5E3C]/40 bg-[#1a1a1a]/60 backdrop-blur-sm"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-16 bg-[#8B5E3C]" />
                <div className="space-y-2">
                  <h4 className="text-lg font-playfair font-bold text-[#F5F5F5]">
                    Currently Available
                  </h4>
                  <p className="text-sm font-inter text-[#B0B0B0]">
                    Open for freelance projects and full-time opportunities. Let's create something exceptional together.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
