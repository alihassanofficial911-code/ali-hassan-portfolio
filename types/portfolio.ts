export type ProjectCategory = 'all' | 'video' | 'electronics' | 'web';

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  youtube?: string;
  behance?: string;
  whatsapp?: string;
  email?: string;
}

export interface Profile {
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioEn: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationEn: string;
  avatar: string;
  cvUrl: string;
  socials: SocialLinks;
}

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: 'video' | 'electronics' | 'web';
  description: string;
  descriptionEn: string;
  tools: string[];
  imageUrl: string;
  videoUrl?: string; // YouTube, Vimeo, MP4 link
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}

export interface Experience {
  id: string;
  role: string;
  roleEn: string;
  company: string;
  companyEn: string;
  period: string;
  periodEn: string;
  location: string;
  locationEn: string;
  type: 'education' | 'internship' | 'work';
  description: string[];
  descriptionEn: string[];
  certificateUrl?: string;
}

export interface SkillItem {
  name: string;
  nameEn?: string;
  level: number; // 1 - 100
  badge?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  skills: SkillItem[];
}

export interface Certificate {
  id: string;
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  certificates: Certificate[];
  messages: ContactMessage[];
  adminPassword: string; // for simple local authentication
}
