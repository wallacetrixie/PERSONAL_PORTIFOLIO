import type { NavLink, Project } from '../types';

import greenStoreImg from '../assets/images/project1 GREEN STORE.png';
import aiHealthImg from '../assets/images/project 2 AI Health companion.png';
import solutionHubImg from '../assets/images/project 3 SolutionHub.png';
import forAuthImg from '../assets/images/project 4 ForAuth.png';
import taskifyImg from '../assets/images/project 5 Taskify.png';
import eventManagementImg from '../assets/images/project 6 EVENT_MANAGEMENT_SYSTEM.png';
import resumeMakerImg from '../assets/images/project 7 RESUME-MAKER.png';
import contentGuardImg from '../assets/images/project 8 Conten Guard.png';
import chatAppImg from '../assets/images/project 9 CHAT APP.png';

export const NAV_LINKS: NavLink[] = [
  { id: '1', label: 'Home', path: '/#hero' },
  { id: '2', label: 'About', path: '/#about' },
  { id: '3', label: 'Skills', path: '/#skills' },
  { id: '4', label: 'Services', path: '/#services' },
  { id: '5', label: 'Projects', path: '/#projects' },
  { id: '6', label: 'Testimonials', path: '/#testimonials' },
  { id: '7', label: 'Contact', path: '/#contact' },
  { id: '8', label: 'Location', path: '/#map' },
];


export const SOCIAL_LINKS = [
  {
    id: '1',
    platform: 'github',
    url: 'https://github.com/wallacetrixie',
    icon: 'Github',
  },
  {
    id: '2',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/wallace-wambulwa-b0a988278/',
    icon: 'Linkedin',
  },
  {
    id: '3',
    platform: 'facebook',
    url: 'https://www.facebook.com/wallace.wambulwa.7/',
    icon: 'Facebook',
  },
  {
    id: '4',
    platform: 'email',
    url: 'mailto:wallacewambulwa@gmail.com',
    icon: 'Mail',
  },
];

export const PERSONAL_INFO = {
  name: 'Wallace Wambulwa',
  title: 'Software Developer & Founder',
  company: 'Neo-Nexus Solutions',
  bio: 'I specialize in crafting innovative digital solutions that drive business growth and user satisfaction',
  email: 'wallacewambulwa@gmail.com',
  location: 'Nairobi,Kenya karen',
  availability: 'Available for freelance work',
};

export const ABOUT_INFO = {
  tagline: 'Get to Know Me',
  title: 'About Me',
  intro: {
    paragraph1: "I am a Software Developer dedicated to building efficient, scalable, and reliable solutions that solve real-world problems. I focus on developing clean, maintainable code and crafting systems that deliver both performance and impact.",
    paragraph2: "My goal is to create software that not only meets technical standards but also adds genuine value to users and businesses alike. To me, great software goes beyond functionality,it's about innovation, problem-solving, and delivering meaningful digital experiences.",
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

export const STAGGER_CONTAINER = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const TRANSITIONS = {
  default: { duration: 0.3, ease: 'easeInOut' },
  smooth: { duration: 0.5, ease: 'easeInOut' },
  bounce: { type: 'spring', stiffness: 300, damping: 20 },
  springy: { type: 'spring', stiffness: 100, damping: 15 },
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Green Store',
    description: 'A digital marketplace offering eco-friendly products like sustainable tools and meals. Features include product browsing, shopping cart, secure checkout with Stripe integration, and a fully responsive design.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Stripe UI', 'Responsive Design'],
    category: 'frontend',
    image: greenStoreImg,
    githubUrl: 'https://github.com/wallacetrixie',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Taskify',
    description: 'A job-searching platform that helps applicants find work and employers post opportunities. Features advanced search filters, user profiles, application tracking, and an intuitive UI/UX.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'State Management', 'UI/UX Design'],
    category: 'frontend',
    image: taskifyImg,
    githubUrl: 'https://github.com/wallacetrixie',
    demoUrl: 'https://example.com',
    featured: false,
  },
  {
    id: '3',
    title: 'Resume Maker',
    description: 'Web app that lets users build professional resumes via templates, live preview, and export to PDF. Includes customizable sections, multiple template options, and client-side PDF generation.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Template System', 'PDF Export', 'UX Principles'],
    category: 'frontend',
    image: resumeMakerImg,
    githubUrl: 'https://github.com/wallacetrixie',
    liveUrl: 'https://example.com',
    featured: false,
  },
  {
    id: '4',
    title: 'ForAUTH',
    description: 'Authentication & authorization system with JWT/OAuth support, role-based access control, password hashing, session management, and security best practices for enterprise applications.',
    technologies: ['Node.js', 'Express', 'MySQL/MongoDB', 'JWT', 'OAuth', 'Security'],
    category: 'backend',
    image: forAuthImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: true,
  },
  {
    id: '5',
    title: 'AI Health Companion',
    description: 'Backend engine for health data and AI-driven insights. Processes user health metrics, provides personalized recommendations, and integrates with external health APIs.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Data Validation', 'AI Integration'],
    category: 'backend',
    image: aiHealthImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
  },
  {
    id: '6',
    title: 'ContentGuard',
    description: 'Detect plagiarism and AI-generated content with comprehensive reports via admin dashboard. Uses NLP algorithms to analyze text similarity and identify potential issues.',
    technologies: ['Node.js', 'Express', 'MySQL/MongoDB', 'NLP', 'Text Analysis', 'Admin Dashboard'],
    category: 'backend',
    image: contentGuardImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
  },
  {
    id: '7',
    title: 'Solution Hub',
    description: 'Platform connecting freelancers & clients with job posting, user profiles, secure payments, rating system, and real-time notifications for seamless collaboration.',
    technologies: ['Node.js', 'Express', 'MySQL', 'Authentication', 'Payment Gateway', 'Real-time'],
    category: 'backend',
    image: solutionHubImg,
    githubUrl: 'https://github.com/wallacetrixie',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '8',
    title: 'Chat App',
    description: 'Real-time messaging application via WebSockets with message persistence, user presence, typing indicators, file sharing, and role-based chat rooms.',
    technologies: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redis', 'WebSocket', 'Real-time Events'],
    category: 'backend',
    image: chatAppImg,
    githubUrl: 'https://github.com/wallacetrixie',
    demoUrl: 'https://example.com',
    featured: false,
  },
  {
    id: '9',
    title: 'Event Management System',
    description: 'Comprehensive event management platform with ticketing, attendee registration, event scheduling, payment processing, and admin analytics dashboard.',
    technologies: ['Node.js', 'Express', 'MySQL', 'REST API', 'Payment Integration', 'Admin Panel'],
    category: 'backend',
    image: eventManagementImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
  },
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', count: PROJECTS.length },
  { id: 'frontend', label: 'Frontend', count: PROJECTS.filter(p => p.category === 'frontend').length },
  { id: 'backend', label: 'Backend', count: PROJECTS.filter(p => p.category === 'backend').length },
];
