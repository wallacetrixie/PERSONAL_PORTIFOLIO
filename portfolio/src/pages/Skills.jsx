import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Skills.css';

export const Skills = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isSection1InView = useInView(section1Ref, { once: true, amount: 0.3 });
  const isSection2InView = useInView(section2Ref, { once: true, amount: 0.3 });

  // Main 6 Skill Categories - split into two sections
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      tagline: 'Building scalable, interactive, and pixel-perfect web interfaces',
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
      tagline: 'Turning ideas into delightful, intuitive user experiences',
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
      tagline: 'Designing reliable, secure, and scalable backend systems',
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
      tagline: 'Streamlining development with modern tooling and deployment',
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
      tagline: 'Creating responsive and native mobile experiences',
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
      id: 'performance',
      title: 'Performance & Testing',
      tagline: 'Optimizing apps for speed, reliability, and quality',
      color: 'pink',
      position: 'right',
      rotation: -2,
      techIcons: [
        { name: 'Jest', icon: '🧪' },
        { name: 'Lighthouse', icon: '🔦' },
        { name: 'Webpack', icon: '📦' }
      ],
      technologies: [
        'Jest',
        'React Testing Library',
        'Vitest',
        'Lighthouse',
        'Web Vitals',
        'Webpack',
        'Code Splitting',
        'Lazy Loading',
        'Performance Monitoring',
        'SEO Optimization'
      ]
    }
  ];

  // Split into two sections
  const skillCategoriesSection1 = skillCategories.slice(0, 3);
  const skillCategoriesSection2 = skillCategories.slice(3, 6);

  // Soft Skills
  const softSkills = [
    { name: 'Problem Solving', description: 'Creative solutions to complex challenges' },
    { name: 'Team Collaboration', description: 'Effective communication and teamwork' },
    { name: 'Attention to Detail', description: 'Precision and quality in every project' },
    { name: 'Adaptability', description: 'Quick learning and flexibility' },
    { name: 'Time Management', description: 'Efficient prioritization and delivery' }
  ];

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -20,
      y: 50
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        delay: index * 0.3,
        duration: 0.8,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  return (
    <section 
      id="skills" 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0a0e27 0%, #16213e 50%, #0a0e27 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing Orbs */}
        <motion.div 
          className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3], 
            opacity: [0.4, 0.2, 0.4],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(168, 85, 247, 0.5)'
            }}
          >
            SKILLS
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl font-semibold text-white/90"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Skills & Technologies
          </motion.p>
        </motion.div>

        {/* SECTION 1 - First 3 Skills */}
        <div ref={section1Ref} className="relative min-h-[700px] mb-32">
          {/* Desktop Layout - Staircase */}
          <div className="hidden lg:block relative">
            {skillCategoriesSection1.map((category, index) => {
              // Staircase positions
              const positions = [
                { top: '0px', left: '5%' },           // Frontend - top left
                { top: '140px', left: '35%' },        // UI/UX - middle height, center
                { top: '280px', right: '5%' }         // Backend - bottom height, right
              ];

              return (
                <motion.div
                  key={category.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isSection1InView ? 'visible' : 'hidden'}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: category.rotation * 2,
                    transition: { duration: 0.3 }
                  }}
                  className={`skill-card-futuristic skill-card-${category.color}`}
                  style={{
                    position: 'absolute',
                    ...positions[index],
                    transform: `rotate(${category.rotation}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Content */}
                  <div className="skill-card-content">
                    <h3 className="skill-card-title-futuristic">
                      {category.title}
                    </h3>
                    <p className="skill-card-tagline-futuristic">
                      {category.tagline}
                    </p>

                    {/* Tech Icons */}
                    <div className="tech-icons">
                      {category.techIcons.map((tech, idx) => (
                        <motion.div
                          key={tech.name}
                          className="tech-icon"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isSection1InView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1 + index * 0.3 + idx * 0.1 }}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                          title={tech.name}
                        >
                          {tech.icon}
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies List */}
                    <div className="technologies-list">
                      {category.technologies.map((tech, idx) => (
                        <motion.span
                          key={tech}
                          className="tech-tag"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isSection1InView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.2 + index * 0.3 + idx * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className={`card-glow-futuristic glow-${category.color}`}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/Tablet Layout - Stacked */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {skillCategoriesSection1.map((category, index) => (
              <motion.div
                key={category.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isSection1InView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.05 }}
                className={`skill-card-futuristic skill-card-${category.color}`}
              >
                <div className="skill-card-content">
                  <h3 className="skill-card-title-futuristic">
                    {category.title}
                  </h3>
                  <p className="skill-card-tagline-futuristic">
                    {category.tagline}
                  </p>

                  {/* Tech Icons */}
                  <div className="tech-icons">
                    {category.techIcons.map((tech, idx) => (
                      <motion.div
                        key={tech.name}
                        className="tech-icon"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isSection1InView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.2 + idx * 0.1 }}
                        title={tech.name}
                      >
                        {tech.icon}
                      </motion.div>
                    ))}
                  </div>

                  {/* Technologies List */}
                  <div className="technologies-list">
                    {category.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className="tech-tag"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isSection1InView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1 + index * 0.2 + idx * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className={`card-glow-futuristic glow-${category.color}`}></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2 - Next 3 Skills */}
        <div ref={section2Ref} className="relative min-h-[700px] mb-20">
          {/* Desktop Layout - Staircase */}
          <div className="hidden lg:block relative">
            {skillCategoriesSection2.map((category, index) => {
              // Staircase positions for section 2
              const positions = [
                { top: '0px', left: '5%' },           // DevOps - top left
                { top: '140px', left: '35%' },        // Mobile - middle height, center
                { top: '280px', right: '5%' }         // Performance - bottom height, right
              ];

              return (
                <motion.div
                  key={category.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isSection2InView ? 'visible' : 'hidden'}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: category.rotation * 2,
                    transition: { duration: 0.3 }
                  }}
                  className={`skill-card-futuristic skill-card-${category.color}`}
                  style={{
                    position: 'absolute',
                    ...positions[index],
                    transform: `rotate(${category.rotation}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Content */}
                  <div className="skill-card-content">
                    <h3 className="skill-card-title-futuristic">
                      {category.title}
                    </h3>
                    <p className="skill-card-tagline-futuristic">
                      {category.tagline}
                    </p>

                    {/* Tech Icons */}
                    <div className="tech-icons">
                      {category.techIcons.map((tech, idx) => (
                        <motion.div
                          key={tech.name}
                          className="tech-icon"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isSection2InView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1 + index * 0.3 + idx * 0.1 }}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                          title={tech.name}
                        >
                          {tech.icon}
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies List */}
                    <div className="technologies-list">
                      {category.technologies.map((tech, idx) => (
                        <motion.span
                          key={tech}
                          className="tech-tag"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isSection2InView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.2 + index * 0.3 + idx * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className={`card-glow-futuristic glow-${category.color}`}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/Tablet Layout - Stacked */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {skillCategoriesSection2.map((category, index) => (
              <motion.div
                key={category.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isSection2InView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.05 }}
                className={`skill-card-futuristic skill-card-${category.color}`}
              >
                <div className="skill-card-content">
                  <h3 className="skill-card-title-futuristic">
                    {category.title}
                  </h3>
                  <p className="skill-card-tagline-futuristic">
                    {category.tagline}
                  </p>

                  {/* Tech Icons */}
                  <div className="tech-icons">
                    {category.techIcons.map((tech, idx) => (
                      <motion.div
                        key={tech.name}
                        className="tech-icon"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isSection2InView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.2 + idx * 0.1 }}
                        title={tech.name}
                      >
                        {tech.icon}
                      </motion.div>
                    ))}
                  </div>

                  {/* Technologies List */}
                  <div className="technologies-list">
                    {category.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className="tech-tag"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isSection2InView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1 + index * 0.2 + idx * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className={`card-glow-futuristic glow-${category.color}`}></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Skills Section */}
        <motion.div 
          className="mt-32 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Core Competencies
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Beyond technical skills, these soft skills drive collaboration and excellence
          </p>

          <div className="flex flex-wrap justify-center gap-4 px-4 max-w-5xl mx-auto">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="soft-skill-button"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover="hover"
              >
                <motion.div className="soft-skill-content">
                  <span className="soft-skill-title">{skill.name}</span>
                  <motion.p 
                    className="soft-skill-desc"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    variants={{
                      hover: {
                        opacity: 1,
                        height: 'auto',
                        marginTop: 8,
                        transition: { duration: 0.3 }
                      }
                    }}
                  >
                    {skill.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
