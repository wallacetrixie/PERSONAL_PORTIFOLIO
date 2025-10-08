export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies?: string[];
  color: 'cyan' | 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  feedback: string;
  date: string;
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
    color: 'orange'
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
    color: 'pink'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Grace Wanjiku',
    rating: 5,
    feedback: 'Wallace delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and efficient. Highly recommended!',
    date: 'September 2024'
  },
  {
    id: 'testimonial-2',
    name: 'Brian Ochieng',
    rating: 5,
    feedback: 'Working with Wallace was a game-changer for our business. He built our mobile app from scratch and delivered it ahead of schedule. His code quality and communication skills are outstanding.',
    date: 'August 2024'
  },
  {
    id: 'testimonial-3',
    name: 'Faith Muthoni',
    rating: 5,
    feedback: 'The website Wallace created for us perfectly captures our brand identity. Our online engagement has increased significantly since launch. Professional, creative, and highly skilled!',
    date: 'July 2024'
  },
  {
    id: 'testimonial-4',
    name: 'David Kamau',
    rating: 5,
    feedback: 'Wallace helped us migrate our infrastructure to the cloud, significantly reducing our costs while improving performance. His expertise is top-notch. A true professional!',
    date: 'June 2024'
  },
  {
    id: 'testimonial-5',
    name: 'Mary Akinyi',
    rating: 5,
    feedback: 'The inventory management system Wallace developed has streamlined our operations tremendously. His understanding of business needs combined with technical skills is impressive.',
    date: 'May 2024'
  },
  {
    id: 'testimonial-6',
    name: 'Peter Mwangi',
    rating: 5,
    feedback: 'Wallace integrated multiple payment systems into our platform seamlessly. His API development skills and problem-solving abilities are exceptional. Will definitely work with him again!',
    date: 'April 2024'
  }
];
