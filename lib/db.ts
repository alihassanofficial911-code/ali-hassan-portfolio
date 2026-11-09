import fs from 'fs';
import path from 'path';
import { PortfolioData, ContactMessage, Project, Experience, SkillCategory, Certificate, Profile } from '@/types/portfolio';

// Default initial data bundled with project
import initialData from '@/data/portfolio-db.json';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio-db.json');
const TMP_DATA_PATH = path.join('/tmp', 'portfolio-db.json');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gzwtsldedcplrowmdlhx.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d3RzbGRlZGNwbHJvd21kbGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4OTIxNzksImV4cCI6MjEwODQ2ODE3OX0.HrfD4cUehV124-x_i5lc-arSvAqI0SASo2iYBOu2LU0';

// In-memory cache for fast runtime response
let memoryCache: PortfolioData | null = null;

function getActivePath(): string {
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

  // 1. Try reading from local file system
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
    console.error('Local read fallback:', error);
    memoryCache = initialData as PortfolioData;
    return memoryCache;
  }
}

export function savePortfolioData(data: PortfolioData): boolean {
  memoryCache = data;

  // 1. Save to local disk
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    try {
      fs.writeFileSync(TMP_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (tmpError) {
      console.warn('Local disk write failed, continuing with in-memory & cloud sync');
    }
  }

  // 2. Asynchronously sync to Supabase Cloud if configured
  if (SUPABASE_URL && SUPABASE_KEY) {
    syncToSupabase(data).catch((err) => {
      console.error('Supabase cloud sync error:', err);
    });
  }

  return true;
}

async function syncToSupabase(data: PortfolioData): Promise<void> {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/portfolio_data`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        id: 'current',
        data,
      }),
    });
  } catch (e) {
    console.error('Failed to sync data to Supabase:', e);
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

  // Also sync message to Supabase portfolio_messages table
  if (SUPABASE_URL && SUPABASE_KEY) {
    fetch(`${SUPABASE_URL}/rest/v1/portfolio_messages`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    }).catch((e) => console.error('Error inserting message to Supabase:', e));
  }

  return newMessage;
}

export function deleteContactMessage(id: string): boolean {
  const current = getPortfolioData();
  if (!current.messages) return true;
  current.messages = current.messages.filter((m) => m.id !== id);
  savePortfolioData(current);

  if (SUPABASE_URL && SUPABASE_KEY) {
    fetch(`${SUPABASE_URL}/rest/v1/portfolio_messages?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    }).catch((e) => console.error('Error deleting message from Supabase:', e));
  }

  return true;
}

export function verifyAdminPassword(input: string): boolean {
  const data = getPortfolioData();
  return (data.adminPassword || 'admin') === input;
}
