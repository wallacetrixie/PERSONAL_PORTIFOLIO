

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

// Split skill categories into two sections for layout
export const SKILL_CATEGORIES_SECTION_1 = SKILL_CATEGORIES.slice(0, 3);
export const SKILL_CATEGORIES_SECTION_2 = SKILL_CATEGORIES.slice(3, 6);
