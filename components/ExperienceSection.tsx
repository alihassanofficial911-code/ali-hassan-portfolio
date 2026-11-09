'use client';

import React from 'react';
import { useLang } from './Providers';
import { Experience } from '@/types/portfolio';
import Reveal from './Reveal';
import { 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Calendar, 
  MapPin, 
  Award,
  CheckCircle2
} from 'lucide-react';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const { lang, t } = useLang();

  const getTypeBadge = (type: Experience['type']) => {
    switch (type) {
      case 'education':
        return {
          icon: GraduationCap,
          labelAr: 'تعليم أكاديمي',
          labelEn: 'Academic Education',
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        };
      case 'internship':
        return {
          icon: Wrench,
          labelAr: 'تدريب ميداني عملي',
          labelEn: 'Field Internship',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        };
      case 'work':
      default:
        return {
          icon: Briefcase,
          labelAr: 'خبرة مهنية وإنتاج',
          labelEn: 'Professional Work',
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        };
    }
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>{t('المسار الأكاديمي والمهني', 'Academic & Career Journey')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('التعليم، التدريبات الميدانية، والخبرات', 'Education, Internships & Experience')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              'مسار متكامل يجمع بين الدراسة التخصصية بالكلية المصرية الكورية والتدريب العملي بمراكز صيانة السيارات والإنتاج الإبداعي.',
              'A journey combining specialized electronics engineering at the Egyptian-Korean Faculty, automotive center internships, and creative video post-production.'
            )}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-r-2 md:border-r-0 md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-0.5 md:before:bg-slate-800 space-y-12 pr-6 md:pr-0">
          
          {experiences.map((exp, index) => {
            const badge = getTypeBadge(exp.type);
            const BadgeIcon = badge.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute -right-[31px] md:right-auto md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-slate-950 border-4 border-emerald-500 z-10 shadow-lg shadow-emerald-500/30" />

                {/* Content Box */}
                <div className="w-full md:w-1/2 md:px-8">
                  <Reveal delay={index * 100}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl hover:border-emerald-500/40 transition duration-300 group">
                    
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{t(badge.labelAr, badge.labelEn)}</span>
                      </span>

                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{lang === 'ar' ? exp.period : exp.periodEn}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{lang === 'ar' ? exp.location : exp.locationEn}</span>
                        </span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">
                      {lang === 'ar' ? exp.role : exp.roleEn}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                      {lang === 'ar' ? exp.company : exp.companyEn}
                    </p>

                    {/* Description bullet points with enhanced crisp contrast */}
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {(lang === 'ar' ? exp.description : exp.descriptionEn).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Optional Certificate Link */}
                    {exp.certificateUrl && (
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-400"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{t('عرض شهادة التدريب', 'View Certificate')}</span>
                        </a>
                      </div>
                    )}
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
