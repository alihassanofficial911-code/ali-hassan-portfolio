'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLang } from './Providers';
import { Project, ProjectCategory } from '@/types/portfolio';
import Reveal from './Reveal';
import { 
  FolderGit2, 
  Film, 
  Cpu, 
  Code2, 
  ExternalLink, 
  Github, 
  Play, 
  X,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const categories: { key: ProjectCategory; labelAr: string; labelEn: string; icon: any; count: number }[] = [
    { 
      key: 'all', 
      labelAr: 'جميع الأعمال', 
      labelEn: 'All Projects', 
      icon: Layers, 
      count: projects.length 
    },
    { 
      key: 'video', 
      labelAr: 'مونتاج وفيديو DaVinci Resolve', 
      labelEn: 'DaVinci Resolve & Video', 
      icon: Film, 
      count: projects.filter(p => p.category === 'video').length 
    },
    { 
      key: 'electronics', 
      labelAr: 'إلكترونيات وهندسة سيارات', 
      labelEn: 'Electronics & Automotive', 
      icon: Cpu, 
      count: projects.filter(p => p.category === 'electronics').length 
    },
    { 
      key: 'web', 
      labelAr: 'تطوير مواقع وتطبيقات', 
      labelEn: 'Web & AI Apps', 
      icon: Code2, 
      count: projects.filter(p => p.category === 'web').length 
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const getCategoryTheme = (cat: Project['category']) => {
    switch (cat) {
      case 'video':
        return {
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          labelAr: 'مونتاج وتصحيح ألوان DaVinci',
          labelEn: 'DaVinci Video & Colorist',
          icon: Film,
          glow: 'hover:border-purple-500/50',
        };
      case 'electronics':
        return {
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          labelAr: 'إلكترونيات وهندسة سيارات',
          labelEn: 'Electronics & Automotive',
          icon: Cpu,
          glow: 'hover:border-emerald-500/50',
        };
      case 'web':
      default:
        return {
          badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          labelAr: 'تطوير منصات وتطبيقات ويب',
          labelEn: 'Web & AI Platform',
          icon: Code2,
          glow: 'hover:border-cyan-500/50',
        };
    }
  };

  // Convert YouTube link to embed url
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="projects" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('معرض الإنجازات والمشاريع', 'Showcase & Works')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('أحدث المشاريع والأعمال', 'Featured Projects & Creations')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              'تصفح أعمالي في مجالات الإلكترونيات وأنظمة السيارات، فيديوهات ومونتاج DaVinci Resolve، وتطبيقات الويب السحابية.',
              'Browse my work across Automotive Electronics, DaVinci Resolve post-production, and cloud web applications.'
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-slate-950 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 dark:bg-emerald-500 dark:text-slate-950 dark:border-emerald-400'
                    : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <CatIcon className="w-4 h-4" />
                <span>{t(cat.labelAr, cat.labelEn)}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${isActive ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const theme = getCategoryTheme(project.category);
            const ThemeIcon = theme.icon;

            return (
              <Reveal key={project.id} delay={index * 70}>
                <div
                  className={`h-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${theme.glow} group`}
                >
                {/* Media Preview Container */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'}
                    alt={lang === 'ar' ? project.title : project.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border backdrop-blur-md pointer-events-auto ${theme.badge}`}>
                      <ThemeIcon className="w-3.5 h-3.5" />
                      <span>{t(theme.labelAr, theme.labelEn)}</span>
                    </span>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md pointer-events-auto">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{t('مميز', 'Featured')}</span>
                      </span>
                    )}
                  </div>

                  {/* Video Play Overlay Button */}
                  {project.videoUrl && (
                    <button
                      onClick={() => setSelectedVideoUrl(project.videoUrl || null)}
                      className="absolute inset-0 flex items-center justify-center group/btn"
                      aria-label="Play Video"
                    >
                      <div className="w-14 h-14 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover/btn:scale-110 border border-white/20">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {lang === 'ar' ? project.title : project.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {lang === 'ar' ? project.description : project.descriptionEn}
                    </p>
                  </div>

                  {/* Tools / Tags */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-400">
                        {project.date}
                      </span>

                      <div className="flex items-center gap-2">
                        {project.videoUrl && (
                          <button
                            onClick={() => setSelectedVideoUrl(project.videoUrl || null)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-semibold transition"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{t('تشغيل الفيديو', 'Watch Video')}</span>
                          </button>
                        )}

                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold transition"
                          >
                            <span>{t('معاينة حية', 'Live Demo')}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>

      </div>

      {/* Video Lightbox Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-400" />
                {t('مشغل أعمال المونتاج والفيديو', 'Video & Color Grading Showcase Player')}
              </span>
              <button
                onClick={() => setSelectedVideoUrl(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {selectedVideoUrl.includes('youtube') || selectedVideoUrl.includes('youtu.be') ? (
                <iframe
                  src={getEmbedUrl(selectedVideoUrl)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
