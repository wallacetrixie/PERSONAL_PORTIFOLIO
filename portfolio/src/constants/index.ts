import type { NavLink, SocialLink } from '../types';

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { id: '1', label: 'Home', path: '/' },
  { id: '2', label: 'About', path: '/about' },
  { id: '3', label: 'Projects', path: '/projects' },
  { id: '4', label: 'Skills', path: '/skills' },
  { id: '5', label: 'Contact', path: '/contact' },
];


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
    url: 'https://linkedin.com/in/wallacewambulwa',
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
  email: 'wallacewambulwa@gmail.com',
  location: 'Nairobi,Kenya karen',
  availability: 'Available for freelance work',
};

// About Section Information
export const ABOUT_INFO = {
  tagline: 'Get to Know Me',
  title: 'About Me',
  intro: {
    paragraph1: "I'm a Backend Engineer and UI/UX Designer dedicated to creating efficient, and reliable digital experiences. I specialize in designing intuitive interfaces and building robust backend systems that users love and businesses depend on.",
    paragraph2: "My goal is to bridge the gap between design and functionality, transforming ideas into scalable, high-performing solutions that deliver real impact. I believe that great software is not just about writing code—it's about solving problems and creating meaningful experiences.",
  },
  metrics: {
    experience: 5,
    projects: 50,
    clients: 30,
  },
  skills: [
    { name: 'Clean Code', category: 'development' },
    { name: 'Backend Development', category: 'development' },
    { name: 'UI/UX Design', category: 'design' },
    { name: 'Performance Optimization', category: 'development' },
    { name: 'Quality Assurance', category: 'development' },
    { name: 'Team Collaboration', category: 'soft-skills' },
  ],
  cta: {
    primary: {
      text: 'View My Work',
      link: '#projects',
    },
    secondary: {
      text: "Let's Connect",
      link: '#contact',
    },
  },
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
