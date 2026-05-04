import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { Service } from '../../constants/services';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Film grain SVG
  const filmGrainSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23121212' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`;

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-32 bg-[#121212] overflow-hidden"
      aria-labelledby="services-heading"
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
          <p className="text-sm tracking-[0.2em] text-[#8B5E3C] font-medium mb-6">SERVICES</p>
          <h1 
            id="services-heading"
            className="text-6xl lg:text-7xl font-bold text-[#F5F5F5] mb-8 font-playfair"
          >
            What I Offer
          </h1>
          <div className="w-12 h-px bg-[#8B5E3C] mb-8" />
          <p className="text-lg text-[#E8E8E8] max-w-2xl leading-[1.8]">
            Comprehensive solutions tailored to your business needs. From concept to deployment, I deliver results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 lg:mb-28">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              className="p-8 border border-[#8B5E3C] bg-[#1a1a1a]/60 backdrop-blur-xl rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4, borderColor: '#D4AF8C', transition: { duration: 0.3 } }}
            >
              {/* Title in Golden Brown */}
              <h3 className="text-xl font-bold text-[#8B5E3C] font-playfair mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#E8E8E8] text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.slice(0, 4).map((feature, featureIdx) => (
                  <motion.li
                    key={featureIdx}
                    className="flex items-center gap-3 text-[#B0B0B0] text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 + featureIdx * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-block p-8 border border-[#8B5E3C] bg-[#1a1a1a]/60 backdrop-blur-xl rounded-lg">
            <p className="text-[#E8E8E8] text-lg font-medium mb-6 max-w-2xl">
              Need a custom solution? Let's discuss your requirements and find the perfect fit for your project.
            </p>
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=wallacewambulwa@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-[#8B5E3C] bg-[#8B5E3C] text-[#121212] rounded-lg font-semibold transition-colors duration-300"
              whileHover={{ borderColor: '#D4AF8C', backgroundColor: '#D4AF8C', transition: { duration: 0.3 } }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
