import { motion } from 'framer-motion';
import type { Testimonial } from '../../constants/services';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="relative min-h-screen py-24 lg:py-32 bg-[#121212] overflow-hidden">
      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-sm tracking-[0.2em] text-[#8B5E3C] font-medium mb-6 uppercase">
            Client Feedback
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-[#F5F5F5] mb-8">
            What Clients <span className="text-[#8B5E3C]">Say</span>
          </h2>
          <p className="text-lg text-[#E8E8E8] max-w-3xl mx-auto leading-[1.8]">
            Clear, direct feedback from people I’ve worked with across design, development, and digital delivery.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="h-full rounded-xl border border-[#8B5E3C]/50 bg-[#1a1a1a] p-8 flex flex-col shadow-lg"
            >
              <p className="text-[#E8E8E8] leading-[1.8] text-base flex-1 mb-8">
                “{testimonial.feedback}”
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-[#F5F5F5] font-playfair text-xl font-bold">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-[#B0B0B0] mt-1">Verified Client</p>
                </div>
                <div className="text-sm text-[#8B5E3C] font-medium whitespace-nowrap">
                  {testimonial.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
