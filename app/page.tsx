import { getPortfolioData } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const data = getPortfolioData();

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar cvUrl={data.profile.cvUrl} />
      <Hero profile={data.profile} />
      <ExperienceSection experiences={data.experiences} />
      <ProjectsSection projects={data.projects} />
      <SkillsSection 
        categories={data.skillCategories} 
        certificates={data.certificates} 
      />
      <ContactSection profile={data.profile} />
      <Footer />
    </main>
  );
}
