// Type definitions for the portfolio application

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  featured: boolean;
  date?: string;
}

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'web' | 'mobile' | 'design' | 'other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
  color?: string;
}

export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'tools' 
  | 'design' 
  | 'other';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  gpa?: string;
  logo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  icon: string;
}

export type SocialPlatform = 
  | 'github' 
  | 'linkedin' 
  | 'twitter' 
  | 'email' 
  | 'instagram' 
  | 'behance'
  | 'dribbble'
  | 'other';

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
}

export interface NavLink {
  id: string;
  label: string;
  path: string;
  external?: boolean;
}

export interface Theme {
  mode: 'light' | 'dark';
}
