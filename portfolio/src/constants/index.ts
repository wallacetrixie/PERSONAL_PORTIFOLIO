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
  { id: '7', label: 'Location', path: '/#map' },
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
  company: 'Wallace W. DevWorks Solutions',
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
    longDescription: 'Green Store is a comprehensive e-commerce platform dedicated to promoting sustainable living through eco-friendly products. The platform offers a seamless shopping experience with advanced filtering, real-time inventory management, and secure payment processing. Built with modern web technologies, it provides a fast, responsive interface that works flawlessly across all devices.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Stripe UI', 'Responsive Design'],
    category: 'frontend',
    image: greenStoreImg,
    githubUrl: 'https://github.com/wallacetrixie',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2024-09',
    problemSolved: 'Many consumers want to make environmentally conscious purchases but struggle to find reliable platforms that exclusively offer verified eco-friendly products. Traditional e-commerce sites mix sustainable and non-sustainable products, making it difficult for eco-conscious shoppers to trust their purchases. Green Store solves this by providing a curated marketplace with verified sustainable products, transparent sourcing information, and environmental impact metrics for each purchase.',
    features: [
      'Advanced product filtering by category, price, and sustainability rating',
      'Real-time shopping cart with persistent state',
      'Secure checkout with Stripe payment integration',
      'Product reviews and ratings system',
      'Wishlist functionality',
      'Order tracking and history',
      'Responsive design optimized for mobile, tablet, and desktop',
      'Dark mode support',
      'Environmental impact calculator showing CO2 savings'
    ],
    detailedTechStack: [
      {
        technology: 'React 18',
        purpose: 'Component-based UI library for building interactive interfaces',
        reason: 'Chosen for its virtual DOM performance, extensive ecosystem, and component reusability. React\'s hooks system allows for clean state management and side effects handling.'
      },
      {
        technology: 'TypeScript',
        purpose: 'Static type checking and improved developer experience',
        reason: 'Prevents runtime errors through compile-time type checking, provides better IDE support with autocomplete and refactoring tools, and improves code maintainability.'
      },
      {
        technology: 'Tailwind CSS',
        purpose: 'Utility-first CSS framework for rapid UI development',
        reason: 'Enables fast prototyping with consistent design, reduces CSS bundle size through purging unused styles, and provides responsive design utilities out of the box.'
      },
      {
        technology: 'Stripe API',
        purpose: 'Payment processing and checkout management',
        reason: 'Industry-leading security compliance (PCI DSS), extensive documentation, built-in fraud detection, and support for multiple payment methods.'
      },
      {
        technology: 'React Router',
        purpose: 'Client-side routing and navigation',
        reason: 'Provides declarative routing with nested routes, programmatic navigation, and URL parameter handling for dynamic product pages.'
      },
      {
        technology: 'Axios',
        purpose: 'HTTP client for API communication',
        reason: 'Offers request/response interceptors for global error handling, automatic JSON transformation, and built-in CSRF protection.'
      }
    ],
    challenges: [
      {
        challenge: 'Optimizing performance with large product catalogs (1000+ items)',
        solution: 'Implemented virtual scrolling with react-window for rendering only visible items, lazy loading images with intersection observer, and pagination with React Query for efficient data fetching and caching.'
      },
      {
        challenge: 'Managing complex shopping cart state across multiple components',
        solution: 'Created a custom React Context with useReducer for centralized cart state management, persisting cart data to localStorage with automatic synchronization across browser tabs.'
      },
      {
        challenge: 'Ensuring secure payment processing without handling sensitive data',
        solution: 'Integrated Stripe Elements with tokenization to ensure credit card data never touches our servers, implementing PCI compliance through Stripe\'s hosted payment forms.'
      },
      {
        challenge: 'Responsive image loading affecting page performance',
        solution: 'Implemented responsive images with srcset, WebP format with fallbacks, and blur-up loading technique using base64-encoded placeholders for smooth loading experience.'
      }
    ],
    tradeOffs: [
      {
        decision: 'Using client-side rendering instead of SSR',
        reasoning: 'Prioritized faster development iteration and simpler hosting (static site), accepting slightly slower initial page load. For an e-commerce MVP, time-to-market was more critical than perfect SEO.'
      },
      {
        decision: 'Choosing Stripe over custom payment solution',
        reasoning: 'Trading custom control for security and compliance. Stripe handles PCI compliance, fraud detection, and international payments, saving months of development and legal compliance work.'
      },
      {
        decision: 'Context API over Redux for state management',
        reasoning: 'For this application\'s moderate complexity, Context API provides sufficient state management without Redux\'s boilerplate. This reduces bundle size and improves maintainability.'
      }
    ],
    architecture: {
      description: 'Green Store follows a modern frontend architecture with a component-based structure, centralized state management, and clean separation of concerns.',
      components: [
        'Presentation Layer: Reusable UI components (ProductCard, CartItem, CheckoutForm)',
        'State Management: Context API for cart, user preferences, and authentication state',
        'API Layer: Custom hooks (useProducts, useCart) abstracting API calls',
        'Routing Layer: Protected routes for user dashboard and order history',
        'Utility Layer: Helpers for formatting, validation, and calculations'
      ]
    },
    testing: {
      approach: 'Comprehensive testing strategy covering unit, integration, and E2E tests',
      frameworks: ['Jest', 'React Testing Library', 'Cypress'],
      coverage: '85%'
    },
    scalingConsiderations: [
      'Implement CDN for static assets and product images to reduce server load and improve global performance',
      'Add server-side rendering (Next.js) for better SEO and initial page load performance',
      'Introduce Redis caching layer for frequently accessed product data and search results',
      'Implement database read replicas for handling increased traffic during sales events',
      'Use microservices architecture to separate payment, inventory, and user services for independent scaling',
      'Add rate limiting and API throttling to prevent abuse and ensure fair resource distribution'
    ],
    metrics: [
      { label: 'Page Load Time', value: '1.2s' },
      { label: 'Lighthouse Score', value: '95/100' },
      { label: 'Test Coverage', value: '85%' },
      { label: 'Bundle Size', value: '180KB (gzipped)' }
    ]
  },
  {
    id: '2',
    title: 'Taskify',
    description: 'A job-searching platform that helps applicants find work and employers post opportunities. Features advanced search filters, user profiles, application tracking, and an intuitive UI/UX.',
    longDescription: 'Taskify revolutionizes the job search experience by connecting talented professionals with employers through an intelligent matching system. The platform features advanced search algorithms, real-time notifications, application tracking, and a streamlined interface that makes finding the perfect job opportunity effortless.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'State Management', 'UI/UX Design'],
    category: 'frontend',
    image: taskifyImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
    date: '2024-07',
    problemSolved: 'Traditional job boards overwhelm users with irrelevant listings and complex application processes. Applicants waste hours searching through mismatched positions, while employers struggle to find qualified candidates. Taskify solves this by implementing intelligent job matching based on skills, experience, and preferences, while providing a streamlined application workflow that saves time for both parties.',
    features: [
      'AI-powered job recommendations based on user profile and behavior',
      'Advanced filtering by location, salary, experience level, and job type',
      'One-click application with saved profile information',
      'Real-time application status tracking with notifications',
      'Employer dashboard for job posting and candidate management',
      'In-app messaging between employers and candidates',
      'Resume builder integrated into the platform',
      'Salary comparison and market insights',
      'Job alerts via email and push notifications'
    ],
    detailedTechStack: [
      {
        technology: 'React 18',
        purpose: 'Building dynamic and interactive user interfaces',
        reason: 'Provides excellent performance for real-time updates, supports concurrent rendering for smooth user experience, and has extensive community support for job board features.'
      },
      {
        technology: 'TypeScript',
        purpose: 'Type-safe development with enhanced code quality',
        reason: 'Critical for managing complex data structures (job listings, user profiles, applications) and preventing runtime errors in production.'
      },
      {
        technology: 'Tailwind CSS',
        purpose: 'Rapid UI development with consistent styling',
        reason: 'Enables quick iteration on design, maintains consistency across components, and optimizes CSS output for production.'
      },
      {
        technology: 'React Router v6',
        purpose: 'Declarative routing and navigation management',
        reason: 'Provides nested routing for complex page structures, protected routes for authentication, and smooth transitions between views.'
      },
      {
        technology: 'Zustand',
        purpose: 'Lightweight state management solution',
        reason: 'Simpler than Redux with less boilerplate, provides excellent performance, and integrates seamlessly with React hooks.'
      },
      {
        technology: 'React Query',
        purpose: 'Server state management and caching',
        reason: 'Handles background refetching, caching, and synchronization of job listings, reducing API calls and improving performance.'
      }
    ],
    challenges: [
      {
        challenge: 'Real-time job listing updates without page refresh',
        solution: 'Implemented React Query with WebSocket connections for live updates. Used optimistic UI updates to show changes immediately while confirming with the server in the background.'
      },
      {
        challenge: 'Complex search filters with multiple criteria',
        solution: 'Built a compound filter system using URL parameters for shareable search results. Implemented debouncing for search inputs to reduce API calls while maintaining responsiveness.'
      },
      {
        challenge: 'Managing application state across multiple user sessions',
        solution: 'Combined Zustand for client state with React Query for server state. Implemented persistent storage with automatic sync across browser tabs using BroadcastChannel API.'
      },
      {
        challenge: 'Performance degradation with large job listings',
        solution: 'Implemented infinite scroll with intersection observer, virtualized lists for rendering thousands of jobs efficiently, and skeleton loading states for better perceived performance.'
      }
    ],
    tradeOffs: [
      {
        decision: 'Zustand over Redux for state management',
        reasoning: 'Chose simplicity and performance over Redux\'s extensive ecosystem. For Taskify\'s needs, Zustand provides sufficient functionality with significantly less boilerplate code.'
      },
      {
        decision: 'Client-side filtering vs. server-side filtering',
        reasoning: 'Implemented hybrid approach: initial filtering on server for database optimization, with client-side refinement for instant feedback. This balances server load with user experience.'
      },
      {
        decision: 'Single-page application instead of multi-page',
        reasoning: 'Prioritized seamless navigation and instant page transitions over SEO optimization. For authenticated job search experience, UX takes precedence over organic search traffic.'
      }
    ],
    architecture: {
      description: 'Taskify uses a modular frontend architecture with feature-based organization, promoting code reusability and maintainability.',
      components: [
        'Feature Modules: Jobs, Applications, Profile, Messages organized by domain',
        'Shared UI Library: Reusable components (Button, Input, Modal, Card)',
        'State Layer: Zustand stores for UI state, React Query for server state',
        'API Layer: Axios instance with interceptors for authentication and error handling',
        'Routing Layer: Protected routes, public routes, and role-based access control',
        'Utility Layer: Formatters, validators, and helper functions'
      ]
    },
    testing: {
      approach: 'Test-driven development with focus on user interactions and critical paths',
      frameworks: ['Jest', 'React Testing Library', 'MSW for API mocking'],
      coverage: '78%'
    },
    scalingConsiderations: [
      'Implement code splitting by route to reduce initial bundle size',
      'Add service workers for offline functionality and faster subsequent loads',
      'Use ElasticSearch for advanced job search with fuzzy matching and faceted filtering',
      'Implement GraphQL for efficient data fetching and reducing over-fetching',
      'Add edge caching for static job listings to improve global performance',
      'Introduce progressive web app (PWA) features for mobile app-like experience'
    ],
    metrics: [
      { label: 'Time to Interactive', value: '1.8s' },
      { label: 'First Contentful Paint', value: '0.9s' },
      { label: 'Test Coverage', value: '78%' },
      { label: 'Accessibility Score', value: '98/100' }
    ]
  },
  {
    id: '3',
    title: 'Resume Maker',
    description: 'Web app that lets users build professional resumes via templates, live preview, and export to PDF. Includes customizable sections, multiple template options, and client-side PDF generation.',
    longDescription: 'Resume Maker empowers job seekers to create professional, ATS-friendly resumes in minutes. The platform offers multiple professionally designed templates, real-time preview, drag-and-drop section ordering, and high-quality PDF export. Built with modern web technologies, it provides an intuitive interface that guides users through the resume creation process.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Template System', 'PDF Export', 'UX Principles'],
    category: 'frontend',
    image: resumeMakerImg,
    githubUrl: 'https://github.com/wallacetrixie',
    liveUrl: 'https://example.com',
    featured: false,
    date: '2024-06',
    problemSolved: 'Creating a professional resume often requires expensive software or design skills. Many free tools produce poorly formatted documents that don\'t pass Applicant Tracking Systems (ATS). Resume Maker solves this by providing free, professionally designed templates that are ATS-optimized, with an intuitive editor that requires no design experience.',
    features: [
      'Multiple professional resume templates (Modern, Classic, Creative)',
      'Real-time preview with instant updates',
      'Drag-and-drop section reordering',
      'ATS-optimized formatting',
      'High-quality PDF export with proper typography',
      'Auto-save to prevent data loss',
      'Import from LinkedIn',
      'Pre-written content suggestions',
      'Multiple color schemes and font options'
    ],
    detailedTechStack: [
      {
        technology: 'React 18',
        purpose: 'Interactive resume editor with real-time preview',
        reason: 'Enables smooth editing experience with instant visual feedback, component reusability for different resume sections, and efficient re-rendering only for changed content.'
      },
      {
        technology: 'TypeScript',
        purpose: 'Type-safe resume data structure and template system',
        reason: 'Ensures data consistency across templates, prevents errors in complex nested resume sections, and provides excellent IDE support for template development.'
      },
      {
        technology: 'Tailwind CSS',
        purpose: 'Rapid template design and customization',
        reason: 'Allows quick creation of different resume styles, ensures print-friendly layouts, and maintains consistent spacing and typography across templates.'
      },
      {
        technology: 'jsPDF & html2canvas',
        purpose: 'Client-side PDF generation',
        reason: 'Enables instant PDF export without server dependencies, maintains perfect layout fidelity, and supports high-quality rendering for print.'
      },
      {
        technology: 'React DnD',
        purpose: 'Drag-and-drop section reordering',
        reason: 'Provides smooth, accessible drag-and-drop interactions, handles complex nested section hierarchies, and maintains touch device compatibility.'
      },
      {
        technology: 'Formik & Yup',
        purpose: 'Form management and validation',
        reason: 'Simplifies complex form handling with nested objects, provides real-time validation feedback, and reduces boilerplate for form state management.'
      }
    ],
    challenges: [
      {
        challenge: 'Ensuring PDF output matches on-screen preview pixel-perfect',
        solution: 'Implemented custom rendering pipeline using html2canvas with fixed DPI settings, standardized fonts available across systems, and careful CSS styling to ensure print media compatibility.'
      },
      {
        challenge: 'Handling complex nested form state for resume sections',
        solution: 'Used Formik with nested field arrays and custom validation schemas. Implemented auto-save with debouncing to preserve user data without overwhelming storage.'
      },
      {
        challenge: 'Making templates ATS-friendly while maintaining visual appeal',
        solution: 'Researched ATS parsing algorithms and used semantic HTML structure, proper heading hierarchy, and avoided complex layouts. Tested with actual ATS systems to validate compatibility.'
      },
      {
        challenge: 'Performance issues when rendering long resumes',
        solution: 'Implemented virtualization for long content sections, optimized re-renders with React.memo and useMemo, and lazy-loaded template assets to improve initial page load.'
      }
    ],
    tradeOffs: [
      {
        decision: 'Client-side PDF generation vs. server-side rendering',
        reasoning: 'Chose client-side for instant export without server load, accepting larger bundle size. This enables offline functionality and reduces hosting costs significantly.'
      },
      {
        decision: 'Limited template customization vs. full design freedom',
        reasoning: 'Restricted to predefined layouts to maintain ATS compatibility and professional appearance. Power users may want more control, but majority benefit from guided experience.'
      },
      {
        decision: 'Local storage vs. cloud storage for resume data',
        reasoning: 'Prioritized privacy and speed with local storage, accepting risk of data loss on device change. Added export/import functionality as backup solution.'
      }
    ],
    architecture: {
      description: 'Resume Maker employs a template-driven architecture with separation between data, presentation, and export layers.',
      components: [
        'Editor Component: Form-based editor with validation and auto-save',
        'Preview Component: Real-time resume rendering with selected template',
        'Template Engine: Pluggable template system supporting multiple designs',
        'Export Engine: PDF generation with print-optimized styling',
        'Data Layer: Resume data model with validation and serialization'
      ]
    },
    testing: {
      approach: 'Component testing with visual regression testing for templates',
      frameworks: ['Jest', 'React Testing Library', 'Percy for visual testing'],
      coverage: '82%'
    },
    scalingConsiderations: [
      'Add cloud sync with user accounts for cross-device access',
      'Implement collaborative editing for career counselors',
      'Add AI-powered content suggestions using GPT integration',
      'Create mobile app version using React Native with shared business logic',
      'Implement template marketplace for designers to contribute',
      'Add analytics to track which templates perform best in job applications'
    ],
    metrics: [
      { label: 'PDF Generation Time', value: '0.8s' },
      { label: 'Bundle Size', value: '220KB (gzipped)' },
      { label: 'Test Coverage', value: '82%' },
      { label: 'Mobile Performance', value: '92/100' }
    ]
  },
  {
    id: '4',
    title: 'ForAUTH',
    description: 'Authentication & authorization system with JWT/OAuth support, role-based access control, password hashing, session management, and security best practices for enterprise applications.',
    longDescription: 'ForAUTH is a robust, enterprise-grade authentication and authorization system designed to handle secure user management at scale. It implements industry best practices for password security, session management, and access control, providing a solid foundation for any application requiring user authentication. The system supports multiple authentication strategies including JWT, OAuth 2.0, and SAML, with comprehensive audit logging and security monitoring.',
    technologies: ['Node.js', 'Express', 'MySQL/MongoDB', 'JWT', 'OAuth', 'Security'],
    category: 'backend',
    image: forAuthImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: true,
    date: '2024-08',
    problemSolved: 'Many applications reinvent authentication from scratch, leading to security vulnerabilities, compliance issues, and wasted development time. ForAUTH provides a battle-tested, production-ready authentication system that handles complex scenarios like multi-factor authentication, password reset flows, session management, and role-based access control, allowing developers to focus on business logic rather than security plumbing.',
    features: [
      'Multiple authentication strategies (JWT, OAuth 2.0, SAML)',
      'Role-based access control (RBAC) with granular permissions',
      'Multi-factor authentication (TOTP, SMS, Email)',
      'Password hashing with bcrypt and configurable salt rounds',
      'Session management with Redis for distributed systems',
      'Account lockout after failed login attempts',
      'Password reset with time-limited tokens',
      'Email verification and account activation',
      'Comprehensive audit logging for compliance',
      'Rate limiting to prevent brute force attacks',
      'CORS configuration for API security',
      'Refresh token rotation for enhanced security'
    ],
    detailedTechStack: [
      {
        technology: 'Node.js',
        purpose: 'Runtime environment for high-performance authentication server',
        reason: 'Non-blocking I/O perfect for handling thousands of concurrent authentication requests, extensive security packages ecosystem, and excellent performance for I/O-intensive operations.'
      },
      {
        technology: 'Express.js',
        purpose: 'Web framework for building RESTful authentication APIs',
        reason: 'Mature ecosystem with extensive middleware support for security (helmet, cors), flexible routing for complex authentication flows, and excellent documentation.'
      },
      {
        technology: 'MySQL',
        purpose: 'Relational database for storing user credentials and relationships',
        reason: 'ACID compliance for data integrity, proven track record in handling sensitive user data, excellent support for complex queries with roles and permissions.'
      },
      {
        technology: 'MongoDB',
        purpose: 'Document database for flexible user profile storage',
        reason: 'Schema flexibility for varying user attributes across different applications, horizontal scaling capabilities, and excellent performance for read-heavy authentication operations.'
      },
      {
        technology: 'bcrypt',
        purpose: 'Password hashing with adaptive cost factor',
        reason: 'Industry-standard for password hashing, resistant to rainbow table attacks, computational cost increases with hardware advances maintaining security over time.'
      },
      {
        technology: 'jsonwebtoken (JWT)',
        purpose: 'Stateless authentication token generation and verification',
        reason: 'Enables stateless authentication for microservices, supports claims-based authorization, and provides cryptographic signature verification.'
      },
      {
        technology: 'Passport.js',
        purpose: 'Authentication middleware supporting 500+ strategies',
        reason: 'Pluggable architecture for multiple auth providers, extensive community support, and simple integration with social logins.'
      },
      {
        technology: 'Redis',
        purpose: 'Session storage and token blacklisting',
        reason: 'In-memory performance for rapid session lookups, TTL support for automatic session expiration, and atomic operations for token blacklisting.'
      }
    ],
    challenges: [
      {
        challenge: 'Preventing timing attacks in password verification',
        solution: 'Implemented constant-time comparison functions for all authentication checks, ensuring equal response time regardless of correctness. Added artificial delays to further obscure timing information.'
      },
      {
        challenge: 'Managing token refresh without security vulnerabilities',
        solution: 'Implemented refresh token rotation with family tracking. Each refresh generates a new refresh token and invalidates the old one. If an old token is reused, entire token family is revoked, detecting potential token theft.'
      },
      {
        challenge: 'Scaling session storage across multiple servers',
        solution: 'Moved from in-memory sessions to Redis cluster with replication. Implemented session sharding by user ID for optimal distribution and failover capabilities.'
      },
      {
        challenge: 'Handling race conditions in concurrent login attempts',
        solution: 'Used database transactions with row-level locking for account lockout logic. Implemented distributed locks using Redis for critical sections in authentication flow.'
      }
    ],
    tradeOffs: [
      {
        decision: 'JWT vs. session-based authentication',
        reasoning: 'Implemented hybrid approach using JWT for API authentication (stateless, scalable) and sessions for web app (revocable, secure). This provides flexibility for different use cases while maintaining security.'
      },
      {
        decision: 'Bcrypt cost factor of 12',
        reasoning: 'Balances security (resistant to GPU cracking) with performance (200-300ms per hash). Higher values would provide more security but unacceptable login delays.'
      },
      {
        decision: 'Storing refresh tokens in database vs. Redis',
        reasoning: 'Chose database for persistence and audit trail, accepting slight performance hit. Critical security data shouldn\'t risk loss from Redis eviction or failure.'
      }
    ],
    architecture: {
      description: 'ForAUTH follows a layered architecture with clear separation between authentication, authorization, and business logic.',
      components: [
        'API Layer: RESTful endpoints for authentication operations',
        'Authentication Layer: Passport strategies, JWT verification, password hashing',
        'Authorization Layer: RBAC middleware, permission checking, scope validation',
        'Session Layer: Redis-backed session management with distributed support',
        'Database Layer: Repository pattern for user and token storage',
        'Audit Layer: Comprehensive logging of all authentication events',
        'Security Layer: Rate limiting, CORS, helmet, input validation'
      ]
    },
    testing: {
      approach: 'Security-focused testing with penetration testing and vulnerability scanning',
      frameworks: ['Jest', 'Supertest', 'OWASP ZAP for security testing'],
      coverage: '92%'
    },
    scalingConsiderations: [
      'Implement Redis Cluster for horizontal scaling of session storage',
      'Add database read replicas for user profile lookups',
      'Implement rate limiting at multiple levels (IP, user, global)',
      'Add geographic distribution with data residency compliance',
      'Implement key rotation for JWT signing keys',
      'Add anomaly detection for unusual login patterns',
      'Use connection pooling to handle high concurrent authentication requests'
    ],
    metrics: [
      { label: 'Authentication Time', value: '180ms avg' },
      { label: 'Concurrent Users', value: '10,000+' },
      { label: 'Test Coverage', value: '92%' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: '5',
    title: 'AI Health Companion',
    description: 'Backend engine for health data and AI-driven insights. Processes user health metrics, provides personalized recommendations, and integrates with external health APIs.',
    longDescription: 'AI Health Companion is an intelligent health monitoring system that processes user vitals, activity data, and medical history to provide personalized health insights and recommendations. The system integrates with wearable devices, processes large volumes of health data in real-time, and uses machine learning models to detect health patterns and anomalies. Built with scalability and HIPAA compliance in mind, it provides a secure platform for health data management.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Data Validation', 'AI Integration'],
    category: 'backend',
    image: aiHealthImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
    date: '2024-05',
    problemSolved: 'Individuals struggle to make sense of their health data from multiple sources (fitness trackers, medical records, lab results). Without expert interpretation, valuable health insights remain hidden. AI Health Companion aggregates data from multiple sources, applies machine learning to detect patterns, and provides actionable health recommendations, making preventive healthcare accessible to everyone.',
    features: [
      'Real-time health metric processing from wearable devices',
      'AI-powered health insights and anomaly detection',
      'Personalized wellness recommendations',
      'Integration with popular fitness APIs (Fitbit, Apple Health, Google Fit)',
      'Medication reminders and tracking',
      'Symptom tracking and correlation analysis',
      'Emergency contact alerts for critical readings',
      'HIPAA-compliant data storage and transmission',
      'Health report generation and export',
      'Appointment scheduling with healthcare providers'
    ],
    detailedTechStack: [
      {
        technology: 'Node.js',
        purpose: 'Asynchronous processing of real-time health data streams',
        reason: 'Event-driven architecture ideal for handling continuous data streams from wearables, non-blocking I/O for concurrent processing of multiple user data feeds.'
      },
      {
        technology: 'Express.js',
        purpose: 'RESTful API for health data ingestion and retrieval',
        reason: 'Lightweight and flexible for building APIs with health data validation middleware, excellent routing for complex health data endpoints.'
      },
      {
        technology: 'MongoDB',
        purpose: 'Time-series health data storage with flexible schema',
        reason: 'Excellent for storing varying health metrics across different devices, built-in time-series collections for efficient querying of temporal health data, horizontal scaling for growing data volumes.'
      },
      {
        technology: 'TensorFlow.js',
        purpose: 'Machine learning model inference for health predictions',
        reason: 'Enables server-side ML inference without Python dependencies, pre-trained models for vital sign anomaly detection, real-time predictions with low latency.'
      },
      {
        technology: 'Bull Queue',
        purpose: 'Background job processing for data analysis',
        reason: 'Reliable job queue for processing heavy ML computations asynchronously, retry logic for failed analysis tasks, priority queue for urgent health alerts.'
      },
      {
        technology: 'Joi',
        purpose: 'Schema validation for health data integrity',
        reason: 'Ensures incoming health data meets quality standards, custom validators for medical units and ranges, detailed error messages for data correction.'
      }
    ],
    challenges: [
      {
        challenge: 'Processing and storing large volumes of time-series health data efficiently',
        solution: 'Implemented MongoDB time-series collections with automatic data rollup. Older data is aggregated into hourly/daily averages, reducing storage while maintaining historical trends. Added data retention policies to archive old data to cold storage.'
      },
      {
        challenge: 'Integrating with multiple health APIs with different data formats',
        solution: 'Created adapter pattern with normalizers for each API provider. All external data is transformed into standard internal format, allowing uniform processing regardless of source. Implemented webhook handlers for real-time data push.'
      },
      {
        challenge: 'Ensuring HIPAA compliance for health data',
        solution: 'Implemented end-to-end encryption for data at rest and in transit, comprehensive audit logging for all data access, role-based access control for medical professionals, and regular security audits. Used AWS HIPAA-eligible services for infrastructure.'
      },
      {
        challenge: 'Detecting health anomalies with minimal false positives',
        solution: 'Trained ML models on large datasets of normal vs. abnormal vital signs. Implemented ensemble learning combining multiple models for better accuracy. Added user-specific baselines that adapt over time to individual health patterns.'
      }
    ],
    tradeOffs: [
      {
        decision: 'MongoDB vs. InfluxDB for time-series data',
        reasoning: 'Chose MongoDB for its flexibility with complex health records and mature ecosystem, accepting slightly lower time-series optimization. MongoDB\'s aggregation pipeline provides sufficient performance for our scale.'
      },
      {
        decision: 'Real-time processing vs. batch processing for ML inference',
        reasoning: 'Implemented hybrid approach: critical vitals analyzed in real-time, comprehensive health insights generated in nightly batch jobs. Balances responsiveness with computational efficiency.'
      },
      {
        decision: 'Storing health data in same region vs. global distribution',
        reasoning: 'Prioritized data residency for HIPAA compliance, keeping data in single region per user. This limits latency optimization but ensures regulatory compliance.'
      }
    ],
    architecture: {
      description: 'AI Health Companion uses microservices architecture with separate services for data ingestion, analysis, and recommendations.',
      components: [
        'API Gateway: Request routing and authentication',
        'Data Ingestion Service: Normalizes data from various sources',
        'Processing Service: Real-time metric validation and storage',
        'Analysis Service: ML-powered pattern detection and insights',
        'Notification Service: Alerts for critical health events',
        'Integration Service: Connectors for external health APIs',
        'Compliance Service: Audit logging and data encryption'
      ]
    },
    testing: {
      approach: 'Data-driven testing with synthetic health data and privacy-preserving test datasets',
      frameworks: ['Jest', 'Supertest', 'Mock service workers for API testing'],
      coverage: '88%'
    },
    scalingConsiderations: [
      'Implement event streaming with Kafka for real-time data pipeline',
      'Add read replicas for MongoDB to handle increasing query load',
      'Use Redis caching for frequently accessed health summaries',
      'Implement data sharding by user ID for horizontal scaling',
      'Add ML model serving layer with TensorFlow Serving for better performance',
      'Implement CDN for serving health reports and visualizations',
      'Add GraphQL layer for flexible data querying by mobile apps'
    ],
    metrics: [
      { label: 'Data Processing Latency', value: '< 500ms' },
      { label: 'API Response Time', value: '120ms avg' },
      { label: 'Daily Data Points', value: '10M+' },
      { label: 'Uptime', value: '99.95%' }
    ]
  },
  {
    id: '6',
    title: 'ContentGuard',
    description: 'Detect plagiarism and AI-generated content with comprehensive reports via admin dashboard. Uses NLP algorithms to analyze text similarity and identify potential issues.',
    longDescription: 'ContentGuard is an advanced content analysis platform that helps educators, publishers, and content managers detect plagiarism and AI-generated text. Using state-of-the-art NLP algorithms and machine learning models, it analyzes text for originality, provides similarity scores against billions of web pages, and identifies patterns characteristic of AI-generated content. The system includes a comprehensive admin dashboard for managing submissions, viewing detailed reports, and tracking trends.',
    technologies: ['Node.js', 'Express', 'MySQL/MongoDB', 'NLP', 'Text Analysis', 'Admin Dashboard'],
    category: 'backend',
    image: contentGuardImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
    date: '2024-04',
    problemSolved: 'With the rise of AI writing tools, educators and publishers struggle to verify content authenticity. Traditional plagiarism detectors miss AI-generated content, and manual verification is time-consuming. ContentGuard provides automated detection of both plagiarism and AI-generated text, with detailed reports explaining detection reasoning, saving hours of manual review while maintaining academic integrity.',
    features: [
      'Multi-source plagiarism detection against web, academic papers, and internal database',
      'AI-generated content detection using GPT fingerprinting',
      'Similarity scoring with highlighted matching sections',
      'Batch processing for large document sets',
      'API integration for LMS platforms (Canvas, Moodle, Blackboard)',
      'Detailed HTML reports with visual similarity mapping',
      'False positive flagging and machine learning retraining',
      'Admin dashboard with analytics and trends',
      'White-label solution for institutional branding',
      'Multi-language support for 50+ languages'
    ],
    detailedTechStack: [
      {
        technology: 'Node.js',
        purpose: 'High-performance text processing engine',
        reason: 'Async I/O ideal for processing multiple documents concurrently, excellent libraries for NLP and text analysis, efficient memory management for large text processing.'
      },
      {
        technology: 'Express.js',
        purpose: 'RESTful API for document submission and report retrieval',
        reason: 'Simple routing for upload endpoints, middleware support for file processing, streaming responses for large reports.'
      },
      {
        technology: 'MongoDB',
        purpose: 'Storage for analyzed documents and fingerprints',
        reason: 'Flexible schema for varying document metadata, full-text search capabilities, efficient storage of text embeddings and similarity matrices.'
      },
      {
        technology: 'Natural (NLP library)',
        purpose: 'Text preprocessing and tokenization',
        reason: 'Comprehensive NLP tools for JavaScript, tokenization and stemming for 50+ languages, efficient n-gram generation for fingerprinting.'
      },
      {
        technology: 'TensorFlow.js',
        purpose: 'AI detection model inference',
        reason: 'Pre-trained models for AI text detection, transformer-based embeddings for semantic similarity, GPU acceleration for faster analysis.'
      },
      {
        technology: 'ElasticSearch',
        purpose: 'Fast similarity search across document corpus',
        reason: 'Blazing fast full-text search, fuzzy matching for paraphrase detection, scalable to billions of documents.'
      },
      {
        technology: 'Bull Queue',
        purpose: 'Asynchronous document processing pipeline',
        reason: 'Reliable job queue for long-running analysis tasks, priority queue for urgent checks, retry logic for failed analyses.'
      }
    ],
    challenges: [
      {
        challenge: 'Detecting sophisticated paraphrasing and rewording',
        solution: 'Implemented semantic similarity using sentence embeddings instead of exact string matching. Used BERT-based models to understand meaning rather than just words, catching paraphrases that simple algorithms miss.'
      },
      {
        challenge: 'Reducing false positives in AI detection',
        solution: 'Created ensemble model combining multiple detection approaches: perplexity analysis, burstiness detection, and GPT-specific patterns. Added confidence scores and human-in-the-loop verification for borderline cases.'
      },
      {
        challenge: 'Processing large documents (100+ pages) efficiently',
        solution: 'Implemented chunking strategy that divides documents into overlapping sections, processes in parallel, then aggregates results. Added caching for previously analyzed sections to speed up resubmissions.'
      },
      {
        challenge: 'Scaling similarity search across billions of documents',
        solution: 'Used ElasticSearch with custom analyzers for text fingerprinting. Implemented LSH (Locality-Sensitive Hashing) for approximate nearest neighbor search, reducing search time from hours to seconds.'
      }
    ],
    tradeOffs: [
      {
        decision: 'Cloud-based vs. self-hosted NLP models',
        reasoning: 'Used self-hosted TensorFlow.js models for data privacy and cost efficiency at scale, accepting higher infrastructure complexity. Privacy is critical for academic documents.'
      },
      {
        decision: 'Real-time vs. queued processing',
        reasoning: 'Implemented queue-based processing for thorough analysis, accepting 2-5 minute wait times. Users prefer accuracy over instant results for content verification.'
      },
      {
        decision: 'MongoDB vs. PostgreSQL for document storage',
        reasoning: 'Chose MongoDB for flexible document schemas and better performance with large text fields, accepting less rigid data relationships. Text analysis benefits from document-oriented storage.'
      }
    ],
    architecture: {
      description: 'ContentGuard uses a pipeline architecture with separate stages for preprocessing, analysis, and reporting.',
      components: [
        'Upload Service: Document ingestion with format validation',
        'Preprocessing Service: Text extraction, cleaning, and normalization',
        'Plagiarism Engine: Web search, database comparison, similarity scoring',
        'AI Detection Engine: ML model inference for AI-generated content',
        'Report Generator: HTML/PDF report creation with visualizations',
        'Admin Dashboard: Analytics, user management, system monitoring',
        'API Gateway: LMS integrations and webhook notifications'
      ]
    },
    testing: {
      approach: 'Accuracy testing with known plagiarized and AI-generated samples',
      frameworks: ['Jest', 'Supertest', 'Custom test corpus with labeled data'],
      coverage: '86%'
    },
    scalingConsiderations: [
      'Implement horizontal scaling of analysis workers for parallel processing',
      'Add CDN for report delivery and caching',
      'Use message queue (RabbitMQ/Kafka) for distributed processing',
      'Implement database sharding for document storage',
      'Add GPU-accelerated instances for faster ML inference',
      'Implement result caching for frequently checked documents',
      'Add global load balancing for international customers'
    ],
    metrics: [
      { label: 'Detection Accuracy', value: '94%' },
      { label: 'Processing Time', value: '2-5min avg' },
      { label: 'Daily Documents', value: '50,000+' },
      { label: 'False Positive Rate', value: '< 3%' }
    ]
  },
  {
    id: '7',
    title: 'Solution Hub',
    description: 'Platform connecting freelancers & clients with job posting, user profiles, secure payments, rating system, and real-time notifications for seamless collaboration.',
    longDescription: 'Solution Hub is a comprehensive freelancing platform that bridges the gap between talented freelancers and businesses seeking expertise. The platform features intelligent job matching, secure escrow payments, milestone-based project management, and a robust rating system. Built to handle high transaction volumes with strong data integrity, it provides a trusted marketplace for digital services with real-time collaboration tools and dispute resolution mechanisms.',
    technologies: ['Node.js', 'Express', 'MySQL', 'Authentication', 'Payment Gateway', 'Real-time'],
    category: 'backend',
    image: solutionHubImg,
    githubUrl: 'https://github.com/wallacetrixie',
    liveUrl: 'https://example.com',
    featured: true,
    date: '2024-10',
    problemSolved: 'Freelancers and clients struggle with payment security, trust issues, and project misunderstandings on traditional platforms. High fees, delayed payments, and lack of escrow protection create friction. Solution Hub solves this with escrow-based payments, milestone tracking, transparent rating systems, and built-in communication tools, ensuring fair transactions and successful project completion for both parties.',
    features: [
      'Job posting with detailed requirements and budget ranges',
      'Freelancer profiles with portfolio, skills, and verified credentials',
      'Proposal system with custom bids and timelines',
      'Escrow payment system with milestone-based release',
      'Real-time messaging and file sharing',
      'Video call integration for consultations',
      'Time tracking for hourly projects',
      'Dispute resolution system with admin mediation',
      'Rating and review system with verified badges',
      'Invoice generation and payment history',
      'Automated tax documentation (1099 forms)',
      'Multi-currency support with automatic conversion'
    ],
    detailedTechStack: [
      {
        technology: 'Node.js',
        purpose: 'Scalable backend for handling concurrent users and real-time features',
        reason: 'Event-driven architecture perfect for real-time notifications and messaging, non-blocking I/O for handling multiple simultaneous connections, excellent ecosystem for payment integrations.'
      },
      {
        technology: 'Express.js',
        purpose: 'RESTful API framework for platform operations',
        reason: 'Flexible routing for complex marketplace logic, extensive middleware ecosystem for authentication and validation, streaming support for large file uploads.'
      },
      {
        technology: 'MySQL',
        purpose: 'Transactional database for financial records and user data',
        reason: 'ACID compliance critical for payment transactions, strong referential integrity for user-project relationships, excellent query optimization for complex joins.'
      },
      {
        technology: 'Stripe Connect',
        purpose: 'Payment processing and marketplace payouts',
        reason: 'Built specifically for marketplace platforms, handles complex split payments, automated payout scheduling, comprehensive fraud detection.'
      },
      {
        technology: 'Socket.io',
        purpose: 'Real-time messaging and notifications',
        reason: 'Bidirectional communication for instant messaging, automatic reconnection handling, room-based architecture for private conversations.'
      },
      {
        technology: 'Redis',
        purpose: 'Session management and caching',
        reason: 'Fast session lookups for authenticated users, pub/sub for real-time notifications, caching for frequently accessed profile data.'
      },
      {
        technology: 'AWS S3',
        purpose: 'File storage for portfolios and project deliverables',
        reason: 'Scalable storage for user uploads, CDN integration for fast delivery, versioning support for project iterations.'
      }
    ],
    challenges: [
      {
        challenge: 'Implementing secure escrow payments with milestone releases',
        solution: 'Built state machine for payment lifecycle (pending → escrowed → released → completed). Used database transactions to ensure atomic payment operations. Implemented webhook listeners for Stripe events with idempotency keys to handle network failures.'
      },
      {
        challenge: 'Handling dispute resolution fairly between parties',
        solution: 'Created structured dispute process with evidence submission, admin review queue, and automated reminders. Implemented time-decay scoring that favors users with consistent positive history. Added mediation chat with transcript logging for transparency.'
      },
      {
        challenge: 'Preventing rating manipulation and fake reviews',
        solution: 'Implemented verified transaction requirement for reviews - only completed paid projects can be reviewed. Added ML-based review sentiment analysis to flag suspicious patterns. Rate-limited reviews per user to prevent spam.'
      },
      {
        challenge: 'Scaling real-time messaging with thousands of concurrent users',
        solution: 'Implemented Socket.io clustering with Redis adapter for horizontal scaling. Used room-based architecture to limit message broadcasting scope. Added message queuing for offline users with push notifications.'
      }
    ],
    tradeOffs: [
      {
        decision: 'Stripe Connect vs. custom payment solution',
        reasoning: 'Chose Stripe for compliance and marketplace features, accepting 2.9% + $0.30 fees. Building custom payment processing would require months and significant compliance overhead.'
      },
      {
        decision: 'MySQL vs. MongoDB for transactional data',
        reasoning: 'Prioritized ACID compliance for financial transactions over schema flexibility. Payment integrity is non-negotiable, and relational structure fits marketplace data model well.'
      },
      {
        decision: 'Synchronous vs. asynchronous payment processing',
        reasoning: 'Implemented hybrid: immediate charge with asynchronous payout processing. Users see instant confirmation while background jobs handle reconciliation and error handling.'
      }
    ],
    architecture: {
      description: 'Solution Hub uses microservices architecture with separate services for core business logic, payments, messaging, and notifications.',
      components: [
        'API Gateway: Request routing, rate limiting, authentication',
        'User Service: Profile management, authentication, verification',
        'Job Service: Job posting, matching, search functionality',
        'Payment Service: Escrow, milestone management, payouts',
        'Messaging Service: Real-time chat, file sharing, notifications',
        'Review Service: Rating system, dispute resolution',
        'Analytics Service: Platform metrics, user insights',
        'Notification Service: Email, SMS, push notifications'
      ]
    },
    testing: {
      approach: 'Integration testing focused on payment workflows and user journeys',
      frameworks: ['Jest', 'Supertest', 'Stripe test mode', 'Database transactions for test isolation'],
      coverage: '89%'
    },
    scalingConsiderations: [
      'Implement database read replicas for user profile queries',
      'Add Elasticsearch for advanced job search with faceted filtering',
      'Use message queue (RabbitMQ) for decoupling services',
      'Implement CDN for static assets and user portfolio files',
      'Add horizontal pod autoscaling for handling traffic spikes',
      'Implement database sharding by geographic region',
      'Add GraphQL gateway for flexible client data fetching'
    ],
    metrics: [
      { label: 'Transaction Success Rate', value: '99.7%' },
      { label: 'API Response Time', value: '95ms avg' },
      { label: 'Concurrent Users', value: '5,000+' },
      { label: 'Uptime', value: '99.95%' }
    ]
  },
  {
    id: '8',
    title: 'Chat App',
    description: 'Real-time messaging application via WebSockets with message persistence, user presence, typing indicators, file sharing, and role-based chat rooms.',
    longDescription: 'Chat App is a feature-rich, real-time messaging platform built for teams and communities. It supports instant messaging, file sharing, voice/video calls, and organized channels with granular permission controls. Built on WebSocket technology with Redis pub/sub, it provides sub-second message delivery while maintaining message history, search capabilities, and end-to-end encryption options for sensitive conversations.',
    technologies: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redis', 'WebSocket', 'Real-time Events'],
    category: 'backend',
    image: chatAppImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
    date: '2024-03',
    problemSolved: 'Traditional messaging platforms either lack advanced features or are difficult to self-host and customize. Teams need real-time communication that works reliably at scale, with features like threading, reactions, and file sharing. Chat App provides Slack-like functionality with the flexibility of self-hosting, giving organizations full control over their communication data and customization options.',
    features: [
      'Real-time messaging with sub-second latency',
      'Public and private channels with permission controls',
      'Direct messaging and group conversations',
      'Message threading for organized discussions',
      'Emoji reactions and custom emoji support',
      'File and image sharing with preview generation',
      'Code snippet sharing with syntax highlighting',
      'User presence indicators (online, away, busy)',
      'Typing indicators showing active participants',
      'Message search with full-text indexing',
      'Message editing and deletion with history',
      'Read receipts and delivery confirmation',
      'Push notifications for mentions and DMs',
      'Voice and video calling integration'
    ],
    detailedTechStack: [
      {
        technology: 'Node.js',
        purpose: 'High-performance WebSocket server for real-time communication',
        reason: 'Event-driven architecture ideal for WebSocket connections, handles thousands of concurrent connections efficiently, excellent library support for real-time features.'
      },
      {
        technology: 'Socket.io',
        purpose: 'WebSocket library with automatic fallbacks and reconnection',
        reason: 'Provides WebSocket with polling fallback for broad browser support, automatic reconnection handling, room-based architecture for channel management, binary data support for file sharing.'
      },
      {
        technology: 'MongoDB',
        purpose: 'Message storage with flexible schema for different content types',
        reason: 'Excellent for write-heavy workloads (millions of messages), flexible schema for varied message types (text, files, system messages), efficient pagination for message history.'
      },
      {
        technology: 'Redis',
        purpose: 'Pub/Sub for message broadcasting and presence tracking',
        reason: 'In-memory speed for real-time operations, pub/sub pattern for distributing messages across server instances, sorted sets for online user tracking, TTL support for presence expiration.'
      },
      {
        technology: 'Express.js',
        purpose: 'REST API for channel management and authentication',
        reason: 'Handles non-realtime operations (user profiles, channel settings), serves as health check endpoint for load balancers, provides authentication middleware for WebSocket upgrade.'
      },
      {
        technology: 'JWT',
        purpose: 'Stateless authentication for WebSocket connections',
        reason: 'Enables authentication without session storage, tokens can be validated across multiple server instances, supports claims-based authorization for channel permissions.'
      },
      {
        technology: 'Sharp',
        purpose: 'Image processing for thumbnails and previews',
        reason: 'Fast image resizing for generating thumbnails, supports multiple formats (JPG, PNG, WebP), memory-efficient processing of user-uploaded images.'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining message ordering across distributed servers',
        solution: 'Implemented vector clocks for logical message ordering and Redis streams for guaranteed delivery order. Each message gets a monotonic ID from Redis INCR, ensuring global ordering even with multiple servers.'
      },
      {
        challenge: 'Handling reconnections without message loss',
        solution: 'Clients send last received message ID on reconnect. Server queries MongoDB for any missed messages and replays them in order. Implemented exponential backoff for reconnection attempts to prevent server overload.'
      },
      {
        challenge: 'Scaling WebSocket connections across multiple servers',
        solution: 'Used Socket.io Redis adapter for message broadcasting across server instances. Implemented sticky sessions at load balancer level to maintain WebSocket connections. Added health checks to gracefully handle server failures.'
      },
      {
        challenge: 'Efficient full-text search across millions of messages',
        solution: 'Integrated ElasticSearch for message indexing with real-time updates. Implemented search result highlighting and relevance scoring. Added filters for date ranges, channels, and users to narrow results.'
      }
    ],
    tradeOffs: [
      {
        decision: 'WebSocket vs. HTTP polling',
        reasoning: 'Chose WebSocket for true real-time experience with lower latency and reduced server load, accepting increased infrastructure complexity. Socket.io provides polling fallback for older browsers.'
      },
      {
        decision: 'MongoDB vs. PostgreSQL for message storage',
        reasoning: 'Selected MongoDB for better write performance and flexible message schema, accepting less rigid data integrity. Chat apps are write-heavy and benefit from document storage.'
      },
      {
        decision: 'Storing all message history vs. time-based retention',
        reasoning: 'Implemented configurable retention (30/90/365 days or unlimited) based on organization needs, balancing storage costs with historical access. Archived old messages to cold storage.'
      }
    ],
    architecture: {
      description: 'Chat App uses event-driven architecture with WebSocket servers, message queue, and separate storage layers.',
      components: [
        'WebSocket Server Cluster: Multiple Socket.io instances with load balancing',
        'Message Queue: Redis pub/sub for inter-server communication',
        'Message Store: MongoDB for persistent message storage',
        'Presence Service: Redis sorted sets for online user tracking',
        'File Service: S3 for file storage with CDN delivery',
        'Search Service: ElasticSearch for full-text message search',
        'Notification Service: Push notifications for offline users',
        'API Server: REST endpoints for channel and user management'
      ]
    },
    testing: {
      approach: 'Real-time testing with simulated concurrent users and message load',
      frameworks: ['Jest', 'Socket.io-client for integration tests', 'Artillery for load testing'],
      coverage: '84%'
    },
    scalingConsiderations: [
      'Implement message sharding by channel ID for distributed storage',
      'Add dedicated servers for high-traffic channels',
      'Use CDN for file uploads and media sharing',
      'Implement message pagination with cursor-based navigation',
      'Add database read replicas for message history queries',
      'Use Kubernetes for auto-scaling WebSocket pods based on connections',
      'Implement message compression for bandwidth optimization'
    ],
    metrics: [
      { label: 'Message Latency', value: '< 50ms' },
      { label: 'Concurrent Connections', value: '50,000+' },
      { label: 'Messages Per Second', value: '10,000+' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: '9',
    title: 'Event Management System',
    description: 'Comprehensive event management platform with ticketing, attendee registration, event scheduling, payment processing, and admin analytics dashboard.',
    longDescription: 'Event Management System is an all-in-one platform for organizing conferences, concerts, workshops, and corporate events. It handles everything from event creation and ticketing to attendee check-in and post-event analytics. With support for multiple ticket tiers, early-bird pricing, promo codes, and seamless payment processing, it provides event organizers with professional tools to manage events of any size. The system includes QR code-based check-in, automated email campaigns, and comprehensive reporting dashboards.',
    technologies: ['Node.js', 'Express', 'MySQL', 'REST API', 'Payment Integration', 'Admin Panel'],
    category: 'backend',
    image: eventManagementImg,
    githubUrl: 'https://github.com/wallacetrixie',
    featured: false,
    date: '2024-02',
    problemSolved: 'Organizing events involves juggling multiple tools - ticketing platforms, email services, payment processors, and analytics tools. Each additional tool adds cost, complexity, and data silos. Event Management System consolidates all event management needs into one platform, providing integrated ticketing, marketing, payments, and analytics, reducing costs and eliminating data synchronization issues between disparate systems.',
    features: [
      'Event creation with customizable landing pages',
      'Multiple ticket types with tier-based pricing',
      'Early-bird and time-limited promotional pricing',
      'Discount codes and referral tracking',
      'Secure payment processing with Stripe integration',
      'QR code ticket generation and validation',
      'Mobile check-in app for event staff',
      'Automated email campaigns (confirmation, reminders, updates)',
      'Attendee management with custom registration fields',
      'Waitlist management for sold-out events',
      'Refund and ticket transfer handling',
      'Real-time attendance tracking dashboard',
      'Post-event analytics and reporting',
      'Integration with calendar apps (Google, Outlook)',
      'Multi-event management for recurring series'
    ],
    detailedTechStack: [
      {
        technology: 'Node.js',
        purpose: 'Backend server for handling ticketing operations and API requests',
        reason: 'Asynchronous processing ideal for handling concurrent ticket purchases during flash sales, excellent performance for I/O operations, rich ecosystem for payment and email integrations.'
      },
      {
        technology: 'Express.js',
        purpose: 'RESTful API framework for event and ticketing endpoints',
        reason: 'Flexible routing for complex event workflows, middleware support for authentication and validation, simple integration with template engines for email generation.'
      },
      {
        technology: 'MySQL',
        purpose: 'Relational database for transactional ticket sales',
        reason: 'ACID compliance critical for preventing double-booking, strong data integrity for financial transactions, complex joins for analytics queries, row-level locking for inventory management.'
      },
      {
        technology: 'Stripe',
        purpose: 'Payment processing for ticket sales',
        reason: 'PCI compliance handled automatically, support for multiple payment methods, instant and delayed capture for deposit scenarios, robust refund API, comprehensive transaction reporting.'
      },
      {
        technology: 'Nodemailer',
        purpose: 'Automated email delivery for tickets and updates',
        reason: 'Supports major email services and SMTP, HTML email templates with attachments, batch sending for mass communications, error handling and retry logic.'
      },
      {
        technology: 'QRCode',
        purpose: 'QR code generation for ticket validation',
        reason: 'Fast generation of unique QR codes, supports embedding ticket data for offline validation, customizable size and error correction level.'
      },
      {
        technology: 'Bull',
        purpose: 'Job queue for background tasks',
        reason: 'Reliable processing of email campaigns without blocking API, scheduled jobs for reminder emails, retry logic for failed email delivery, priority queue for urgent notifications.'
      },
      {
        technology: 'Redis',
        purpose: 'Caching and rate limiting',
        reason: 'Fast caching of event details for reduced database load, rate limiting to prevent ticket hoarding bots, distributed locks for preventing ticket overselling during high concurrency.'
      }
    ],
    challenges: [
      {
        challenge: 'Preventing ticket overselling during high-demand events',
        solution: 'Implemented row-level pessimistic locking with transaction isolation. Used Redis distributed locks for additional protection. Added ticket reservation system that holds tickets for 10 minutes during checkout, preventing others from purchasing while cart is active.'
      },
      {
        challenge: 'Handling flash sales with thousands of simultaneous purchases',
        solution: 'Implemented queue-based ticketing system that processes purchases in order. Added waiting room with position indicator. Used database connection pooling and Redis caching for hot event data. Load tested to 10,000 concurrent users.'
      },
      {
        challenge: 'Generating and validating tickets securely',
        solution: 'Created signed JWT tokens encoded in QR codes with event ID, ticket ID, and HMAC signature. Check-in app validates signature cryptographically, works offline, prevents ticket duplication and fraud.'
      },
      {
        challenge: 'Managing refunds and ticket transfers maintaining data integrity',
        solution: 'Implemented state machine for ticket lifecycle (purchased → valid → checked-in → refunded). Used database transactions for atomic operations. Created audit log table tracking all ticket status changes for dispute resolution.'
      }
    ],
    tradeOffs: [
      {
        decision: 'Immediate ticket issuance vs. payment confirmation',
        reasoning: 'Implemented hybrid approach: tickets issued immediately with "payment pending" status, marked valid after Stripe webhook confirms payment. Provides instant confirmation while maintaining payment security.'
      },
      {
        decision: 'MySQL vs. MongoDB for event data',
        reasoning: 'Chose MySQL for its transactional guarantees and data integrity, critical for preventing financial discrepancies. Relational structure fits event-ticket-attendee relationships naturally.'
      },
      {
        decision: 'Synchronous vs. asynchronous email sending',
        reasoning: 'Used asynchronous job queue for emails to prevent API timeouts, accepting slight delay in email delivery. Users get instant purchase confirmation with ticket delivered seconds later.'
      }
    ],
    architecture: {
      description: 'Event Management System follows a monolithic architecture with background job processing, optimized for transactional integrity.',
      components: [
        'API Server: Event management, ticket sales, attendee operations',
        'Payment Service: Stripe integration with webhook handlers',
        'Ticketing Engine: Inventory management with reservation system',
        'Email Service: Automated campaigns and transactional emails',
        'QR Generation Service: Secure ticket code creation',
        'Check-in Service: Mobile API for ticket validation',
        'Analytics Engine: Real-time dashboards and reporting',
        'Admin Panel: Event organizer dashboard for management'
      ]
    },
    testing: {
      approach: 'Load testing focused on concurrent ticket purchases and race conditions',
      frameworks: ['Jest', 'Supertest', 'Artillery for load testing', 'Stripe test mode'],
      coverage: '91%'
    },
    scalingConsiderations: [
      'Implement database read replicas for analytics queries',
      'Add CDN for event images and landing pages',
      'Use horizontal pod autoscaling for handling flash sales',
      'Implement database sharding by event ID for large-scale events',
      'Add Elasticsearch for advanced event search and filtering',
      'Use message queue (RabbitMQ) for decoupling email service',
      'Implement Redis cluster for distributed caching and locking'
    ],
    metrics: [
      { label: 'Ticket Processing Time', value: '< 200ms' },
      { label: 'Concurrent Purchases', value: '1,000+' },
      { label: 'Test Coverage', value: '91%' },
      { label: 'Payment Success Rate', value: '99.8%' }
    ]
  },
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', count: PROJECTS.length },
  { id: 'frontend', label: 'Frontend', count: PROJECTS.filter(p => p.category === 'frontend').length },
  { id: 'backend', label: 'Backend', count: PROJECTS.filter(p => p.category === 'backend').length },
];
