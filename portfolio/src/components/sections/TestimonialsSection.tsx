import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Play, Pause } from 'lucide-react';
import type { Testimonial } from '../../constants/services';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  
  const AUTOPLAY_DELAY = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update every 50ms

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      // Clear existing intervals
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      
      // Reset progress
      setProgress(0);
      
      // Progress bar animation
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const increment = (PROGRESS_INTERVAL / AUTOPLAY_DELAY) * 100;
          return prev + increment;
        });
      }, PROGRESS_INTERVAL);
      
      // Auto advance to next slide
      intervalRef.current = setInterval(() => {
        handleNext();
      }, AUTOPLAY_DELAY);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isAutoPlaying]);

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setProgress(0);
  };

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
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
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
                <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-purple/5 dark:from-primary-500/10 dark:to-accent-purple/10" />
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-10 right-10 w-20 h-20 bg-primary-400/20 rounded-full blur-2xl"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-10 left-10 w-16 h-16 bg-accent-purple/20 rounded-full blur-2xl"
                    animate={{
                      y: [0, 20, 0],
                      x: [0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-24 h-24 text-primary-500" />
                  </div>

                  {/* Sparkles Icon - Top Left */}
                  <motion.div
                    className="absolute top-8 left-8 opacity-20"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-16 h-16 text-accent-purple" />
                  </motion.div>

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

            {/* Progress Bar */}
            <div className="mt-6 mb-4">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
                  style={{ width: `${isAutoPlaying ? progress : 0}%` }}
                  initial={{ width: 0 }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <motion.button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Autoplay Toggle */}
              <motion.button
                onClick={toggleAutoplay}
                className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
              >
                {isAutoPlaying ? (
                  <Pause className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Play className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
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

        {/* Bento Grid - Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-fr">
          {testimonials.map((testimonial, index) => {
            // Bento grid layout pattern - varying sizes
            const isLarge = index % 5 === 0; // Every 5th card is large
            const isMedium = index % 3 === 0 && !isLarge; // Every 3rd card is medium
            const colSpan = isLarge 
              ? 'md:col-span-4 lg:col-span-8' 
              : isMedium 
              ? 'md:col-span-3 lg:col-span-6' 
              : 'md:col-span-2 lg:col-span-4';
            
            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className={`${colSpan} group cursor-pointer`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setProgress(0);
                  window.scrollTo({ top: document.getElementById('testimonials')?.offsetTop || 0, behavior: 'smooth' });
                }}
              >
                <div className="relative h-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-white/40 dark:border-gray-700/40 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Glassmorphism gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-purple/5 dark:from-primary-500/10 dark:to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-purple/10 blur-xl opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Rating with animation */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <motion.div
                          key={starIndex}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: index * 0.08 + starIndex * 0.05,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              starIndex < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Feedback */}
                    <p className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed ${
                      isLarge ? 'text-base line-clamp-5' : 'text-sm line-clamp-4'
                    }`}>
                      "{testimonial.feedback}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-bold text-base shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {testimonial.name.charAt(0)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                          {testimonial.name}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.date}
                        </p>
                      </div>
                      
                      {/* Verified badge */}
                      <motion.div
                        className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-medium text-green-700 dark:text-green-400">Verified</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section with Glassmorphism */}
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
              className="relative group text-center p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Glassmorphism gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating particle effect */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-purple mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
              
              {/* Decorative shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
