import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  SKILL_CATEGORIES_SECTION_1, 
  SKILL_CATEGORIES_SECTION_2,
  SOFT_SKILLS,
  CERTIFICATIONS
} from '../constants/skills';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const softSkillsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const isInViewSection1 = useIntersectionObserver(section1Ref);
  const isInViewSection2 = useIntersectionObserver(section2Ref);
  const isInViewSoftSkills = useIntersectionObserver(softSkillsRef);
  const isInViewCert = useIntersectionObserver(certRef);

  // Auto-scroll carousel from right to left
  useAnimationFrame((_time, delta) => {
    if (!isPaused && carouselRef.current) {
      scrollPosition.current -= delta * 0.05; // Negative for RTL
      carouselRef.current.scrollLeft = Math.abs(scrollPosition.current);

      // Reset when reaching the start
      if (Math.abs(scrollPosition.current) >= carouselRef.current.scrollWidth / 2) {
        scrollPosition.current = 0;
        carouselRef.current.scrollLeft = 0;
      }
    }
  });

  // Film grain SVG
  const filmGrainSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23121212' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`;

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-32 bg-[#121212] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: filmGrainSVG }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.2em] text-[#8B5E3C] font-medium mb-6">EXPERTISE</p>
          <h1 
            id="skills-heading"
            className="text-6xl lg:text-7xl font-bold text-[#F5F5F5] mb-8 font-playfair"
          >
            Technical Skills
          </h1>
          <div className="w-12 h-px bg-[#8B5E3C] mb-8" />
          <p className="text-lg text-[#E8E8E8] max-w-2xl leading-[1.8]">
            A comprehensive toolkit spanning modern web development, cloud infrastructure, and enterprise solutions
          </p>
        </motion.div>

        {/* Core Competencies Grid */}
        <motion.div 
          ref={section1Ref}
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0 }}
          animate={isInViewSection1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] font-playfair mb-12">Core Competencies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES_SECTION_1.map((category, idx) => (
              <motion.div
                key={category.id}
                className="p-8 border border-[#8B5E3C] bg-[#1a1a1a]/60 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewSection1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, borderColor: '#D4AF8C', transition: { duration: 0.3 } }}
              >
                <h3 className="text-xl font-bold text-[#F5F5F5] font-playfair mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-[#8B5E3C] mb-6">
                  {category.tagline}
                </p>
                
                <div className="space-y-2">
                  {category.technologies.map((tech) => (
                    <motion.div
                      key={tech}
                      className="flex items-center gap-3 text-[#E8E8E8]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInViewSection1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full flex-shrink-0" />
                      <span className="text-sm">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advanced Technologies */}
        <motion.div 
          ref={section2Ref}
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0 }}
          animate={isInViewSection2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] font-playfair mb-12">Advanced Technologies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES_SECTION_2.map((category, idx) => (
              <motion.div
                key={category.id}
                className="p-8 border border-[#8B5E3C] bg-[#1a1a1a]/60 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewSection2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, borderColor: '#D4AF8C', transition: { duration: 0.3 } }}
              >
                <h3 className="text-xl font-bold text-[#F5F5F5] font-playfair mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-[#8B5E3C] mb-6">
                  {category.tagline}
                </p>
                
                <div className="space-y-2">
                  {category.technologies.map((tech) => (
                    <motion.div
                      key={tech}
                      className="flex items-center gap-3 text-[#E8E8E8]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInViewSection2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full flex-shrink-0" />
                      <span className="text-sm">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Attributes Carousel */}
        <motion.div 
          ref={softSkillsRef}
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0 }}
          animate={isInViewSoftSkills ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] font-playfair mb-12">Professional Attributes</h2>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-hidden whitespace-nowrap py-4"
              style={{ scrollBehavior: 'auto' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Duplicate skills for seamless loop */}
              {[...SOFT_SKILLS, ...SOFT_SKILLS].map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="inline-block flex-shrink-0"
                >
                  <div className="px-8 py-6 border border-[#8B5E3C] bg-[#1a1a1a]/60 rounded-lg min-w-[320px] h-full transition-all duration-300 hover:borderColor-[#D4AF8C] hover:bg-[#1a1a1a]/80">
                    <h3 className="text-lg font-bold text-[#F5F5F5] font-playfair mb-3">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-[#B0B0B0] leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121212] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121212] to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Certifications - Golden Brown Background */}
        <motion.div 
          ref={certRef}
          initial={{ opacity: 0 }}
          animate={isInViewCert ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] font-playfair mb-12">Certifications & Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                className="p-8 rounded-lg bg-[#8B5E3C]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewCert ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <h3 className="text-lg font-bold text-[#121212] font-playfair mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#1a1a1a] font-semibold mb-3">{cert.issuer}</p>
                <p className="text-xs text-[#2a2a2a] mb-4">{cert.date}</p>
                <p className="text-sm text-[#F5F5F5] leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
