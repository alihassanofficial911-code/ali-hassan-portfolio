'use client';

import React from 'react';
import Image from 'next/image';
import { useLang } from './Providers';
import { Profile } from '@/types/portfolio';
import { 
  Cpu, 
  Film, 
  Code2, 
  Download, 
  ArrowRight, 
  ArrowLeft, 
  MessageSquare, 
  Sparkles,
  GraduationCap,
  Wrench,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const { lang, t } = useLang();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/15 to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content (Left in LTR, Right in RTL) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Academic Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/80 border border-slate-700/60 shadow-inner">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                {t(
                  'طالب بالفرقة الرابعة • الكلية المصرية الكورية للتكنولوجيا الصناعية والطاقة',
                  '4th-Year Student • Egyptian-Korean Faculty of Tech & Energy'
                )}
              </span>
            </div>

            {/* Name Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                <span>{t('مرحباً، أنا ', "Hello, I'm ")}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500">
                  {lang === 'ar' ? profile.name : profile.nameEn}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? profile.title : profile.titleEn}
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {lang === 'ar' ? profile.bio : profile.bioEn}
            </p>

            {/* 3 Main Pillars Mini Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Electronics & Automotive */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-500/20 flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {t('إلكترونيات وسيارات', 'Automotive Electronics')}
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t('ECU • نيسان • مصر حلوان', 'ECU • Nissan • MHA')}
                  </p>
                </div>
              </div>

              {/* DaVinci Resolve */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-purple-500/20 flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {t('مونتاج وتدريج ألوان', 'DaVinci Resolve')}
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t('Colorist • Fusion VFX', 'Cinematic Color & VFX')}
                  </p>
                </div>
              </div>

              {/* Web & AI Platforms */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {t('تطوير منصات ويب', 'Web & AI Apps')}
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t('Next.js • منصة Medicology', 'Next.js • Medicology')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <span>{t('تصفح معرض أعمالي', 'Explore My Portfolio')}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>

              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
                >
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>{t('تحميل السيرة الذاتية (CV)', 'Download CV (PDF)')}</span>
                </a>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>{t('تواصل معي', 'Get in Touch')}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Avatar & Interactive Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 md:w-96">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 rounded-3xl blur-lg opacity-60 animate-pulse" />
              
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
                {/* Profile Image */}
                <div className="relative h-96 sm:h-[420px] w-full">
                  <Image
                    src={profile.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"}
                    alt={lang === 'ar' ? profile.name : profile.nameEn}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                {/* Floating Card at Bottom of Avatar */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {t('الكلية المصرية الكورية', 'Egyptian-Korean Faculty')}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {t('الفرقة الرابعة', '4th Year')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {t('قسم الإلكترونيات • تدريبات نيسان ومصر حلوان', 'Electronics Dept • Nissan & MHA Trained')}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: DaVinci Resolve */}
              <div className="absolute -top-3 -right-3 sm:-right-6 bg-slate-900/90 backdrop-blur-md border border-purple-500/30 text-white px-3 py-2 rounded-xl shadow-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                <span className="text-xs font-bold text-purple-300">
                  DaVinci Resolve & Fusion
                </span>
              </div>

              {/* Floating Badge 2: Medicology Live */}
              <a
                href="https://medicology-eg.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="absolute -bottom-3 -left-3 sm:-left-6 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 text-white px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 hover:border-cyan-400 transition group"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-bold text-cyan-300">
                  Medicology Platform
                </span>
                <ExternalLink className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition" />
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
