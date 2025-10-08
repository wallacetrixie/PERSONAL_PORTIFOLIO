export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies?: string[];
  pricing: string;
  color: 'cyan' | 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  feedback: string;
  date: string;
  project?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Website Development',
    description: 'Custom, responsive websites built with modern technologies. From landing pages to complex web applications, I create digital experiences that engage users and drive results.',
    icon: 'Code2',
    features: [
      'Responsive Design',
      'SEO Optimized',
      'Fast Performance',
      'Modern UI/UX',
      'Cross-browser Compatible'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    pricing: 'Starting from $500',
    color: 'cyan'
  },
  {
    id: 'software-development',
    title: 'Software Development & Maintenance',
    description: 'End-to-end software solutions tailored to your business needs. From concept to deployment and ongoing maintenance, I ensure your software remains reliable and up-to-date.',
    icon: 'Palette',
    features: [
      'Custom Software Solutions',
      'Bug Fixes & Updates',
      'Performance Optimization',
      'Technical Support',
      'Code Refactoring'
    ],
    technologies: ['Node.js', 'Python', 'React', 'PostgreSQL'],
    pricing: 'Contact for quote',
    color: 'purple'
  },
  {
    id: 'database-design',
    title: 'Database Design & Optimization',
    description: 'Efficient database architecture and optimization for maximum performance. I design scalable database solutions that handle your data securely and efficiently.',
    icon: 'Server',
    features: [
      'Schema Design',
      'Query Optimization',
      'Data Migration',
      'Backup Solutions',
      'Performance Tuning'
    ],
    technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
    pricing: 'Starting from $400',
    color: 'blue'
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. Build once, deploy everywhere with modern mobile technologies.',
    icon: 'Smartphone',
    features: [
      'iOS & Android Apps',
      'Cross-platform Solutions',
      'Push Notifications',
      'Offline Support',
      'App Store Deployment'
    ],
    technologies: ['React Native', 'Flutter', 'Firebase'],
    pricing: 'Starting from $1,000',
    color: 'green'
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud Services',
    description: 'Streamline your development workflow with modern DevOps practices and cloud infrastructure. Deploy faster, scale effortlessly, and maintain high availability.',
    icon: 'Cloud',
    features: [
      'CI/CD Pipelines',
      'Cloud Migration',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Security Best Practices'
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
    pricing: 'Starting from $600',
    color: 'orange'
  },
  {
    id: 'technical-consultation',
    title: 'Technical Consultation',
    description: 'Expert guidance on technology decisions, architecture design, and project planning. Get strategic insights to make informed technical choices for your business.',
    icon: 'Lightbulb',
    features: [
      'Technology Assessment',
      'Architecture Planning',
      'Code Review',
      'Best Practices',
      'Team Training'
    ],
    pricing: '$100/hour',
    color: 'pink'
  },
  {
    id: 'api-integration',
    title: 'System Integration & API Development',
    description: 'Seamless integration of third-party services and custom API development. Connect your systems, automate workflows, and enhance functionality.',
    icon: 'Zap',
    features: [
      'RESTful APIs',
      'GraphQL Services',
      'Third-party Integration',
      'API Documentation',
      'Webhook Implementation'
    ],
    technologies: ['Express', 'FastAPI', 'GraphQL', 'REST'],
    pricing: 'Starting from $350',
    color: 'cyan'
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'End-to-end project coordination ensuring timely delivery and quality results. From planning to execution, I manage every aspect of your tech projects.',
    icon: 'Target',
    features: [
      'Agile Methodology',
      'Sprint Planning',
      'Team Coordination',
      'Progress Tracking',
      'Risk Management'
    ],
    pricing: 'Contact for quote',
    color: 'blue'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechVision Inc.',
    rating: 5,
    feedback: 'Wallace delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and efficient. Highly recommended!',
    date: 'September 2024',
    project: 'E-commerce Platform'
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'StartupHub',
    rating: 5,
    feedback: 'Working with Wallace was a game-changer for our startup. He built our mobile app from scratch and delivered it ahead of schedule. His code quality and communication skills are outstanding.',
    date: 'August 2024',
    project: 'Mobile App Development'
  },
  {
    id: 'testimonial-3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'GreenLeaf Solutions',
    rating: 5,
    feedback: 'The website Wallace created for us perfectly captures our brand identity. Our online engagement has increased by 150% since launch. Professional, creative, and highly skilled!',
    date: 'July 2024',
    project: 'Corporate Website'
  },
  {
    id: 'testimonial-4',
    name: 'David Omondi',
    role: 'Founder',
    company: 'AfriTech Ventures',
    rating: 5,
    feedback: 'Wallace helped us migrate our infrastructure to AWS, significantly reducing our costs while improving performance. His DevOps expertise is top-notch. A true professional!',
    date: 'June 2024',
    project: 'Cloud Migration'
  },
  {
    id: 'testimonial-5',
    name: 'Lisa Thompson',
    role: 'Operations Manager',
    company: 'RetailPro Systems',
    rating: 5,
    feedback: 'The inventory management system Wallace developed has streamlined our operations tremendously. His understanding of business needs combined with technical skills is impressive.',
    date: 'May 2024',
    project: 'Inventory Management System'
  },
  {
    id: 'testimonial-6',
    name: 'James Kimani',
    role: 'CTO',
    company: 'FinanceHub Kenya',
    rating: 5,
    feedback: 'Wallace integrated multiple payment systems into our platform seamlessly. His API development skills and problem-solving abilities are exceptional. Will definitely work with him again!',
    date: 'April 2024',
    project: 'Payment Integration'
  }
];
