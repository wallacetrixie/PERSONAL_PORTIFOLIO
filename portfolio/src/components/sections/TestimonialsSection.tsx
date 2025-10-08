import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../../constants/services';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-purple rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Client Feedback
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-gray-900 dark:text-white"
          >
            What Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple">Say</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take my word for it - hear what my clients have to say about working with me
          </motion.p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-24 h-24 text-primary-500" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Feedback */}
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 relative z-10 italic">
                    "{testimonials[currentIndex].feedback}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center justify-between">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Verified Client
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      {testimonials[currentIndex].date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={handlePrev}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary-600 w-8'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              {/* Feedback */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                "{testimonial.feedback}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {testimonial.name}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Happy Clients', value: '30+' },
            { label: 'Projects Completed', value: '50+' },
            { label: 'Client Satisfaction', value: '100%' },
            { label: '5-Star Reviews', value: testimonials.filter(t => t.rating === 5).length }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-primary-50 to-accent-purple/10 dark:from-primary-900/20 dark:to-accent-purple/20 rounded-2xl border border-primary-200 dark:border-primary-800"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-purple mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
