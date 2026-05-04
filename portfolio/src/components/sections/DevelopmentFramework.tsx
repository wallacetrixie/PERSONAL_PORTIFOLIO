import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface FrameworkStep {
  heading: string;
  description: string;
}

const developmentSteps: FrameworkStep[] = [
  {
    heading: 'Discovery',
    description: 'Understand your goals, challenges, and vision to align every decision.',
  },
  {
    heading: 'Architecture',
    description: 'Design a scalable, secure system tailored to your needs.',
  },
  {
    heading: 'Development',
    description: 'Write clean, efficient code with long-term reliability in mind.',
  },
  {
    heading: 'Testing',
    description: 'Rigorously test for performance, security, and seamless experience.',
  },
  {
    heading: 'Delivery',
    description: 'Deploy smoothly with minimal disruption and ongoing support.',
  },
];

const stairOffsets = ['md:mt-0', 'md:mt-[110px]', 'md:mt-[220px]', 'md:mt-[330px]', 'md:mt-[440px]'];

export const DevelopmentFramework = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [isLineActive, setIsLineActive] = useState(false);

  // Handle line animation on section intersection
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLineActive(true);
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    return () => sectionObserver.disconnect();
  }, []);

  // Handle step reveal animations
  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    stepRefs.current.forEach((step) => {
      if (step) stepObserver.observe(step);
    });

    return () => stepObserver.disconnect();
  }, []);

  return (
    <section
      id="development-framework"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 bg-[#121212] overflow-hidden"
      aria-labelledby="framework-heading"
    >
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
        backgroundSize: '100px 100px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.2em] text-[#8B5E3C] font-medium mb-6">PROCESS</p>
          <h2
            id="framework-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-[#F5F5F5] mb-8"
          >
            Development <span className="text-[#8B5E3C]">Framework</span>
          </h2>
          <p className="text-lg text-[#E8E8E8] max-w-3xl mx-auto leading-[1.8]">
            I approach every project with a five-step methodology ensuring precision, scalability, and architectural excellence from discovery to delivery.
          </p>
        </motion.div>

        {/* Framework Steps - Staircase Layout */}
        <div className="relative mt-12 lg:mt-14">
          {/* Connecting line - visible on desktop */}
          <div
            className={`framework-stair-line absolute left-0 right-0 top-[3.3rem] hidden md:block ${
              isLineActive ? 'is-active' : ''
            }`}
          />

          <div className="space-y-2 md:grid md:grid-cols-5 md:items-start md:gap-4 md:space-y-0">
            {developmentSteps.map((step, index) => (
              <div key={step.heading} className={`${stairOffsets[index]} md:self-start`}>
                <article
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  className="framework-step-reveal relative rounded-xl border border-[#8B5E3C]/60 bg-[#1a1a1a]/80 p-5 sm:p-6 md:h-[300px] md:w-full md:flex md:flex-col overflow-hidden"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  {/* Step number circle */}
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8B5E3C]/50 bg-[#8B5E3C]/70 text-sm font-semibold text-[#121212] sm:h-11 sm:w-11 sm:text-base">
                    {index + 1}
                  </div>

                  {/* Step heading */}
                  <h3 className="text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl font-playfair">
                    {step.heading}
                  </h3>

                  {/* Step description */}
                  <p className="mt-2 text-xs leading-snug text-[#E8E8E8] sm:text-sm md:flex-1">
                    {step.description}
                  </p>
                </article>

                {/* Mobile connector arrow */}
                {index < developmentSteps.length - 1 ? (
                  <div className="framework-mobile-next py-3 md:hidden">
                    <div className="mx-auto mb-1 h-6 w-px bg-gradient-to-b from-[#8B5E3C] to-[#8B5E3C]/50" />
                    <div className="mx-auto h-9 w-9 rounded-full border border-[#8B5E3C] bg-[#121212] text-[#8B5E3C] shadow-[0_8px_18px_rgba(139,94,60,0.15)]">
                      <svg
                        className="h-full w-full p-[8px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M7 14l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
