import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { NAV_LINKS, PERSONAL_INFO } from '../../constants';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const scrollPosition = useScrollPosition();
  const scrollProgress = useScrollProgress();
  const location = useLocation();

  // Scroll threshold for navbar transformation
  const SCROLL_THRESHOLD = 80;
  const isScrolled = scrollPosition > SCROLL_THRESHOLD;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Animation variants
  const navbarVariants: Variants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as any
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  };

  const mobileMenuItemVariants: Variants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any
      }
    })
  };

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-light-card dark:shadow-lg py-3'
            : 'bg-white/70 dark:bg-transparent backdrop-blur-md py-5 shadow-soft dark:shadow-none'
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <Link 
              to="/" 
              className="relative group"
              aria-label="Wallace Wambulwa - Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Decorative orbiting accent */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-light-accent1 to-blue-500 dark:from-cyan-500 dark:to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <div className="relative flex items-center gap-2 text-2xl lg:text-3xl font-bold font-poppins">
                  {/* Developer Avatar Logo */}
                  <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-light-accent1 via-blue-500 to-emerald-500 dark:from-cyan-500 dark:via-blue-500 dark:to-emerald-500 flex items-center justify-center shadow-lg">
                    <Code2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Brand Name */}
                  <span className="bg-gradient-to-r from-light-accent1 via-blue-500 to-emerald-500 dark:from-cyan-500 dark:via-blue-500 dark:to-emerald-500 bg-clip-text text-transparent">
                    walify
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path || 
                  (link.path.includes('#') && location.pathname === '/' && location.hash === link.path.split('#')[1] ? `#${location.hash.split('#')[1]}` : '');
                
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    className="relative px-4 py-2 group"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="relative"
                    >
                      <span
                        className={`font-medium text-base transition-colors duration-300 ${
                          isActive
                            ? 'text-light-accent1 dark:text-cyan-400'
                            : 'text-light-text-secondary dark:text-gray-300 group-hover:text-light-accent1 dark:group-hover:text-cyan-400'
                        }`}
                      >
                        {link.label}
                      </span>
                      
                      {/* Animated underline */}
                      <motion.div
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-light-accent1 to-blue-600 dark:from-cyan-500 dark:to-blue-500 rounded-full ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ originX: 0 }}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-4 ml-8">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-light-bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 shadow-soft dark:shadow-none"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <AnimatePresence mode="wait">
                  {theme === 'light' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-light-text" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-3">
              {/* Mobile Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-light-bg-secondary dark:bg-gray-800 shadow-soft dark:shadow-none"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-light-text" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
              </motion.button>

              {/* Hamburger Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-light-bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-soft dark:shadow-none"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-light-text dark:text-gray-200" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-light-text dark:text-gray-200" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-light-accent1 via-blue-600 to-emerald-500 dark:from-cyan-500 dark:via-blue-500 dark:to-emerald-500 origin-left"
          style={{ width: `${scrollProgress}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-light-card dark:bg-gray-900 z-50 lg:hidden shadow-2xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-gray-800">
                  <h2 className="text-xl font-bold text-light-text dark:text-white">Menu</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-light-text dark:text-gray-200" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {NAV_LINKS.map((link, index) => {
                      const isActive = location.pathname === link.path || 
                        (link.path.includes('#') && location.pathname === '/' && location.hash === link.path.split('#')[1] ? `#${location.hash.split('#')[1]}` : '');
                      
                      return (
                        <motion.li
                          key={link.id}
                          custom={index}
                          variants={mobileMenuItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-4 py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-light-accent1 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white shadow-soft-shadow-light dark:shadow-lg'
                                : 'text-light-text dark:text-gray-300 hover:bg-light-bg-secondary dark:hover:bg-gray-800'
                            }`}
                          >
                            <motion.div
                              whileHover={{ x: 8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.label}
                            </motion.div>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Social Links */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={mobileMenuItemVariants}
                  initial="closed"
                  animate="open"
                  className="p-6 border-t border-light-border dark:border-gray-800"
                >
                  <h3 className="text-sm font-semibold text-light-text-secondary dark:text-gray-400 uppercase tracking-wider mb-4">
                    Connect
                  </h3>
                  <div className="flex items-center space-x-4">
                    <a
                      href="https://github.com/wallacetrixie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-light-bg-secondary dark:bg-gray-800 hover:bg-light-accent1 dark:hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-soft dark:shadow-none"
                      aria-label="GitHub profile"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-light-bg-secondary dark:bg-gray-800 hover:bg-light-accent1 dark:hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-soft dark:shadow-none"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      className="p-3 rounded-full bg-light-bg-secondary dark:bg-gray-800 hover:bg-light-accent1 dark:hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-soft dark:shadow-none"
                      aria-label="Send email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
