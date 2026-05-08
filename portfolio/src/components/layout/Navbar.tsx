import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { NAV_LINKS } from '../../constants';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
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
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 border-b border-white/5 py-6"
      >
        <nav className="container mx-auto px-4 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">

            {/* Brand Logo - Minimalist */}
            <Link
              to="/"
              className="font-playfair font-bold text-lg text-[#F5F5F5] tracking-tight hover:text-[#D4AF8C] transition-colors duration-300"
              aria-label="Azma Digital - Home"
            >
              Azma Digital
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {NAV_LINKS.map((link) => {
                const hash = link.path.includes('#') ? link.path.split('#')[1] : '';
                const isActive = location.hash === `#${hash}` || (hash === 'hero' && !location.hash);

                const handleClick = (e: React.MouseEvent) => {
                  e.preventDefault();
                  const element = document.getElementById(hash);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', `#${hash}`);
                  }
                };

                return (
                  <a
                    key={link.id}
                    href={link.path}
                    onClick={handleClick}
                    className="relative group"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ y: -2 }}
                    >
                      <span
                        className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                          isActive
                            ? 'text-[#FFD700]'
                            : 'text-[#FFFFFF] group-hover:text-[#D4AF8C]'
                        }`}
                      >
                        {link.label}
                      </span>

                      {/* Tiny golden dot active indicator */}
                      {isActive && (
                        <motion.div
                          className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mt-2"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      )}
                    </motion.div>
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#F5F5F5] hover:text-[#8B5E3C] transition-colors duration-300"
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
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-full sm:w-72 bg-[#121212] z-50 lg:hidden border-l border-[#8B5E3C]/30"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full pt-24 px-6">
                {/* Close Button in Menu Header */}
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 right-6 p-2 text-[#F5F5F5] hover:text-[#8B5E3C] transition-colors duration-300"
                  aria-label="Close mobile menu"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ rotate: 0, opacity: 1 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                </motion.button>

                {/* Navigation Links */}
                <nav className="flex-1" aria-label="Mobile navigation">
                  <ul className="space-y-8">
                    {NAV_LINKS.map((link, index) => {
                      const hash = link.path.includes('#') ? link.path.split('#')[1] : '';
                      const isActive = location.hash === `#${hash}` || (hash === 'hero' && !location.hash);

                      const handleClick = (e: React.MouseEvent) => {
                        e.preventDefault();
                        const element = document.getElementById(hash);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          window.history.pushState(null, '', `#${hash}`);
                          setIsMenuOpen(false);
                        }
                      };

                      return (
                        <motion.li
                          key={link.id}
                          custom={index}
                          variants={mobileMenuItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <a
                            href={link.path}
                            onClick={handleClick}
                            className={`block text-lg tracking-wide transition-colors duration-300 ${
                              isActive
                                ? 'text-[#FFD700] font-light'
                                : 'text-[#FFFFFF] font-light hover:text-[#D4AF8C]'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {link.label}
                            {isActive && (
                              <motion.div
                                className="w-1.5 h-1.5 bg-[#FFD700] rounded-full mt-3"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
