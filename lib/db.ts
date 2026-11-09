import fs from 'fs';
import path from 'path';
import { PortfolioData, ContactMessage, Project, Experience, SkillCategory, Certificate, Profile } from '@/types/portfolio';

// Default initial data bundled with project
import initialData from '@/data/portfolio-db.json';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio-db.json');
const TMP_DATA_PATH = path.join('/tmp', 'portfolio-db.json');

// In-memory cache for fast runtime response
let memoryCache: PortfolioData | null = null;

function getActivePath(): string {
  // If running in a serverless environment (like Vercel) and /tmp file exists, prefer it
  try {
    if (fs.existsSync(TMP_DATA_PATH)) {
      return TMP_DATA_PATH;
    }
  } catch (e) {}
  return DATA_PATH;
}

export function getPortfolioData(): PortfolioData {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    const activePath = getActivePath();
    if (fs.existsSync(activePath)) {
      const raw = fs.readFileSync(activePath, 'utf8');
      memoryCache = JSON.parse(raw) as PortfolioData;
      return memoryCache;
    }

    if (!fs.existsSync(DATA_PATH)) {
      const dir = path.dirname(DATA_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_PATH, JSON.stringify(initialData, null, 2), 'utf8');
    }
    memoryCache = initialData as PortfolioData;
    return memoryCache;
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    memoryCache = initialData as PortfolioData;
    return memoryCache;
  }
}

export function savePortfolioData(data: PortfolioData): boolean {
  memoryCache = data;

  // 1. Try writing to primary project path (works locally and in standard containers)
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    // 2. If write fails (e.g. read-only filesystem on Vercel serverless), write to /tmp
    try {
      fs.writeFileSync(TMP_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (tmpError) {
      console.error('Fallback /tmp write error:', tmpError);
      return false;
    }
  }
}

export function updateProfile(profile: Profile): boolean {
  const current = getPortfolioData();
  current.profile = profile;
  return savePortfolioData(current);
}

export function addProject(project: Project): boolean {
  const current = getPortfolioData();
  current.projects.unshift(project);
  return savePortfolioData(current);
}

export function updateProject(id: string, updated: Partial<Project>): boolean {
  const current = getPortfolioData();
  const index = current.projects.findIndex((p) => p.id === id);
  if (index === -1) return false;
  current.projects[index] = { ...current.projects[index], ...updated };
  return savePortfolioData(current);
}

export function deleteProject(id: string): boolean {
  const current = getPortfolioData();
  current.projects = current.projects.filter((p) => p.id !== id);
  return savePortfolioData(current);
}

export function addExperience(exp: Experience): boolean {
  const current = getPortfolioData();
  current.experiences.unshift(exp);
  return savePortfolioData(current);
}

export function updateExperience(id: string, updated: Partial<Experience>): boolean {
  const current = getPortfolioData();
  const index = current.experiences.findIndex((e) => e.id === id);
  if (index === -1) return false;
  current.experiences[index] = { ...current.experiences[index], ...updated };
  return savePortfolioData(current);
}

export function deleteExperience(id: string): boolean {
  const current = getPortfolioData();
  current.experiences = current.experiences.filter((e) => e.id !== id);
  return savePortfolioData(current);
}

export function saveSkills(categories: SkillCategory[]): boolean {
  const current = getPortfolioData();
  current.skillCategories = categories;
  return savePortfolioData(current);
}

export function saveCertificates(certificates: Certificate[]): boolean {
  const current = getPortfolioData();
  current.certificates = certificates;
  return savePortfolioData(current);
}

export function addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  const current = getPortfolioData();
  const newMessage: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  if (!current.messages) current.messages = [];
  current.messages.unshift(newMessage);
  savePortfolioData(current);
  return newMessage;
}

export function deleteContactMessage(id: string): boolean {
  const current = getPortfolioData();
  if (!current.messages) return true;
  current.messages = current.messages.filter((m) => m.id !== id);
  return savePortfolioData(current);
}

export function verifyAdminPassword(input: string): boolean {
  const data = getPortfolioData();
  return (data.adminPassword || 'admin') === input;
}
