

export interface TechIcon {
  name: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  tagline: string;
  color: 'cyan' | 'purple' | 'blue' | 'green' | 'orange' | 'pink';
  position: 'left' | 'center' | 'right';
  rotation: number;
  techIcons: TechIcon[];
  technologies: string[];
}

export interface SoftSkill {
  name: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string; // emoji icon
  color: 'cyan' | 'purple' | 'blue' | 'green' | 'orange' | 'pink';
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    tagline: 'I specialize in building scalable, interactive, and pixel-perfect web interfaces',
    color: 'cyan',
    position: 'left',
    rotation: -3,
    techIcons: [
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'Tailwind', icon: '🌊' }
    ],
    technologies: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 & CSS3',
      'Redux/Zustand',
      'Framer Motion',
      'Vue.js',
      'Vite'
    ]
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    tagline: 'I Turn ideas into delightful, intuitive user experiences',
    color: 'purple',
    position: 'center',
    rotation: 2,
    techIcons: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Adobe XD', icon: '📐' },
      { name: 'Sketch', icon: '✏️' }
    ],
    technologies: [
      'Figma',
      'Adobe XD',
      'Sketch',
      'Wireframing',
      'Prototyping',
      'Design Systems',
      'User Research',
      'Usability Testing',
      'Adobe Photoshop',
      'Illustrator'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    tagline: 'I specialize in designing reliable, secure, and scalable backend systems',
    color: 'blue',
    position: 'right',
    rotation: -2,
    techIcons: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express', icon: 'API' },
      { name: 'MongoDB', icon: '🗄️' }
    ],
    technologies: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'REST APIs',
      'GraphQL',
      'Firebase',
      'Prisma',
      'JWT Auth'
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    tagline: 'I streamline development with modern tooling and deployment',
    color: 'green',
    position: 'left',
    rotation: -3,
    techIcons: [
      { name: 'Git', icon: '🔀' },
      { name: 'Docker', icon: '🐳' },
      { name: 'AWS', icon: '☁️' }
    ],
    technologies: [
      'Git & GitHub',
      'Docker',
      'AWS (EC2, S3)',
      'Vercel',
      'Netlify',
      'Linux CLI',
      'CI/CD',
      'GitHub Actions',
      'Nginx',
      'PM2'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    tagline: 'I create responsive and native mobile experiences',
    color: 'orange',
    position: 'center',
    rotation: 2,
    techIcons: [
      { name: 'React Native', icon: '📱' },
      { name: 'PWA', icon: '⚡' },
      { name: 'Flutter', icon: '🎯' }
    ],
    technologies: [
      'React Native',
      'PWA',
      'Responsive Design',
      'Mobile-First',
      'Flutter',
      'Expo',
      'React Navigation',
      'AsyncStorage',
      'Push Notifications',
      'App Performance'
    ]
  },
  {
    id: 'network',
    title: 'Network Engineering',
    tagline: 'I design and secure  network infrastructure',
    color: 'pink',
    position: 'right',
    rotation: -2,
    techIcons: [
      { name: 'Cisco', icon: '🌐' },
      { name: 'Security', icon: '🔒' },
      { name: 'Routing', icon: '🔀' }
    ],
    technologies: [
      'Cisco Networking',
      'TCP/IP',
      'VPN Configuration',
      'Firewall Management',
      'DNS & DHCP',
      'Network Security',
      'Routing & Switching',
      'Load Balancing',
      'Network Monitoring',
      'Wireshark'
    ]
  }
];

export const SOFT_SKILLS: SoftSkill[] = [
  { 
    name: 'Problem Solving', 
    description: 'I develop creative solutions to complex challenges' 
  },
  { 
    name: 'Team Collaboration', 
    description: 'I foster effective communication and teamwork' 
  },
  { 
    name: 'Attention to Detail', 
    description: 'Precision and quality in every project' 
  },
  { 
    name: 'Adaptability', 
    description: 'I demonstrate quick learning and flexibility' 
  },
  { 
    name: 'Time Management', 
    description: 'I prioritize tasks efficiently and deliver on time' 
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'alx-software-engineering',
    title: 'ALX Software Engineering',
    issuer: 'ALX Africa',
    date: '2024',
    description: 'Comprehensive full-stack software engineering program covering modern web development, algorithms, data structures, system design, and professional software development practices.',
    icon: '🚀',
    color: 'cyan'
  },
  {
    id: 'bachelors-it',
    title: 'Bachelor of Science in Information Technology',
    issuer: 'Co-operative University of Kenya',
    date: '2025',
    description: 'Degree program covering computer science fundamentals, software engineering principles, database systems, networking, cybersecurity, and advanced programming concepts.',
    icon: '🎓',
    color: 'purple'
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    description: 'Foundation-level certification demonstrating knowledge of AWS Cloud, services, architecture, security, pricing, and support. Essential for cloud-based application development.',
    icon: '☁️',
    color: 'orange'
  },
  {
    id: 'aws-solutions-architect',
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    date: '2024',
    description: 'Professional certification validating expertise in designing distributed systems, implementing scalable applications, and architecting resilient solutions on AWS infrastructure.',
    icon: '🏗️',
    color: 'blue'
  },
  {
    id: 'responsive-web-design',
    title: 'Responsive Web Design Certification',
    issuer: 'freeCodeCamp',
    date: '2023',
    description: 'Certification demonstrating proficiency in HTML5, CSS3, Flexbox, CSS Grid, responsive design principles, and accessibility standards for modern web development.',
    icon: '📱',
    color: 'green'
  },
  {
    id: 'javascript-algorithms',
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    description: 'Advanced certification covering ES6+, functional programming, object-oriented programming, algorithms, data structures, and problem-solving techniques in JavaScript.',
    icon: '⚡',
    color: 'pink'
  }
];

// Split skill categories into two sections for layout
export const SKILL_CATEGORIES_SECTION_1 = SKILL_CATEGORIES.slice(0, 3);
export const SKILL_CATEGORIES_SECTION_2 = SKILL_CATEGORIES.slice(3, 6);
