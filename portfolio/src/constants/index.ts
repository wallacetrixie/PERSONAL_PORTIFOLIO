import type { NavLink, SocialLink } from '../types';

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { id: '1', label: 'Home', path: '/' },
  { id: '2', label: 'About', path: '/about' },
  { id: '3', label: 'Projects', path: '/projects' },
  { id: '4', label: 'Contact', path: '/contact' },
];

// Social media links - Update with your actual URLs
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: '1',
    platform: 'github',
    url: 'https://github.com/wallacetrixie',
    icon: 'Github',
  },
  {
    id: '2',
    platform: 'linkedin',
    url: 'https://linkedin.com/in/yourprofile',
    icon: 'Linkedin',
  },
  {
    id: '3',
    platform: 'twitter',
    url: 'https://twitter.com/yourhandle',
    icon: 'Twitter',
  },
  {
    id: '4',
    platform: 'email',
    url: 'mailto:your.email@example.com',
    icon: 'Mail',
  },
];

// Personal Information
export const PERSONAL_INFO = {
  name: 'Wallace Wambulwa',
  title: 'Software Developer & Founder',
  company: 'E-sail Tech Company',
  bio: 'A passionate software developer specializing in building exceptional digital experiences.',
  email: 'your.email@example.com',
  location: 'Your Location',
  availability: 'Available for freelance work',
};

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

// Stagger children animation
export const STAGGER_CONTAINER = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Transition configurations
export const TRANSITIONS = {
  default: { duration: 0.3, ease: 'easeInOut' },
  smooth: { duration: 0.5, ease: 'easeInOut' },
  bounce: { type: 'spring', stiffness: 300, damping: 20 },
  springy: { type: 'spring', stiffness: 100, damping: 15 },
};
