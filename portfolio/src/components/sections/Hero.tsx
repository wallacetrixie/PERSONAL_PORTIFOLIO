import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import portraitImage from '../../assets/images/Potrait.jpg';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative lg:min-h-screen flex items-start lg:items-center justify-center overflow-hidden pt-4 lg:pt-0" style={{
      background: `conic-gradient(from 45deg at 0% 0%, #8B5E3C 0%, #0a0a0a 15%, #121212 50%, #0a0a0a 85%, #8B5E3C 100%)`
    }}>
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
        backgroundSize: '100px 100px'
      }} />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-0 lg:py-28">
        <div className="relative grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="relative z-10 space-y-8 order-2 lg:order-1"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: -60 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: 0.1 }}
          >
            {/* Name - Large, Elegant Playfair Display */}
            <div className="space-y-2">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-[#F5F5F5] leading-tight tracking-tight"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Wallace<br />Wambulwa
              </motion.h1>
              
              {/* Title - Spaced out Inter font */}
              <motion.p
                className="text-lg sm:text-xl font-inter text-[#8B5E3C] tracking-[0.15em] uppercase font-light"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Software Developer
              </motion.p>
            </div>

            {/* Description - Minimal, Clean */}
            <motion.p
              className="text-base lg:text-lg text-[#E8E8E8] max-w-lg leading-[1.8] font-light"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I build digital solutions that help businesses thrive.
            </motion.p>

            {/* CTA Buttons - Minimalist Design */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-10"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Solid Gold Button */}
              <motion.a
                href="#projects"
                aria-label="View my portfolio projects"
                className="px-10 py-3 bg-[#8B5E3C] text-[#121212] font-medium text-base flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#A67C52] hover:shadow-lg active:scale-95 rounded-sm"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              {/* Thin-lined Ivory Button */}
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label={`Send email to ${PERSONAL_INFO.email}`}
                className="px-10 py-3 border border-[#F5F5F5] text-[#F5F5F5] font-medium text-base flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#8B5E3C] hover:text-[#121212] hover:border-[#8B5E3C] hover:shadow-lg rounded-sm"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Portrait in Glassmorphic Container */}
          <motion.div
            className="hidden lg:flex justify-center items-start pt-12"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: 60 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm">
              {/* Subtle circular glow background */}
              <div className="absolute inset-0 rounded-full bg-[#8B5E3C]/5 blur-3xl" />

              {/* Portrait Container with Pop-Out Effect */}
              <div className="relative">
                {/* Golden border frame that portrait pops out of */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-80 h-80 border border-[#8B5E3C] rounded-full" />

                {/* Glass container with soft rounded corners */}
                <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-[#1a1a1a]/40 border border-[#8B5E3C] shadow-2xl p-2">
                  {/* Portrait Image - will pop out at top */}
                  <img
                    src={portraitImage}
                    alt="Wallace Wambulwa Professional Portrait"
                    className="w-full h-auto object-contain drop-shadow-lg"
                  />
                </div>

                {/* Additional subtle golden accent line at bottom */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#8B5E3C] to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
