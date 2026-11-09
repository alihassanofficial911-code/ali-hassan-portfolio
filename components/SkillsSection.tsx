'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLang } from './Providers';
import { SkillCategory, Certificate } from '@/types/portfolio';
import Reveal from './Reveal';
import { 
  Award, 
  Cpu, 
  Film, 
  Code2, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  X,
  FileCheck
} from 'lucide-react';

interface SkillsProps {
  categories: SkillCategory[];
  certificates: Certificate[];
}

export default function SkillsSection({ categories, certificates }: SkillsProps) {
  const { lang, t } = useLang();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [certImageErrors, setCertImageErrors] = useState<Record<string, boolean>>({});

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'cat-electronics':
        return Cpu;
      case 'cat-video':
        return Film;
      case 'cat-dev':
        return Code2;
      default:
        return Globe;
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          header: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
          bar: 'bg-emerald-500',
        };
      case 'purple':
        return {
          header: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
          bar: 'bg-purple-500',
        };
      case 'cyan':
        return {
          header: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
          bar: 'bg-cyan-500',
        };
      case 'amber':
      default:
        return {
          header: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
          bar: 'bg-amber-500',
        };
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Skills Part */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t('القدرات والكفاءات', 'Competencies & Tools')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('المهارات التخصصية والأدوات', 'Specialized Skills & Technical Toolkit')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              {t(
                'مزيج فريد يربط بين هندسة إلكترونيات السيارات، المونتاج السينمائي الاحترافي، والبرمجة الحديثة.',
                'A unique blend connecting automotive electronics engineering, cinematic post-production, and modern software development.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => {
              const Icon = getCategoryIcon(cat.id);
              const theme = getCategoryColor(cat.color);

              return (
                <Reveal key={cat.id} delay={idx * 100}>
                  <div
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 h-full"
                  >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${theme.header}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {lang === 'ar' ? cat.name : cat.nameEn}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {cat.skills.length} {t('مهارات متقدمة', 'Key Skills')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {lang === 'ar' ? skill.name : (skill.nameEn || skill.name)}
                          </span>
                          <div className="flex items-center gap-2">
                            {skill.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                {skill.badge}
                              </span>
                            )}
                            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${theme.bar} transition-all duration-1000`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Certificates Gallery */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <FileCheck className="w-3.5 h-3.5" />
              <span>{t('الاعتمادات والتكريمات', 'Credentials & Honors')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('الشهادات والتدريبات المعتمدة', 'Certificates & Accredited Trainings')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              {t(
                'شهادات موثقة من مراكز الخدمة والجهات الأكاديمية والمهنية.',
                'Official certifications from automotive centers, academic institutions, and training bodies.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, cIdx) => (
              <Reveal key={cert.id} delay={cIdx * 90}>
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="cursor-pointer group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
                >
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                  {certImageErrors[cert.id] || !cert.imageUrl ? (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 p-4 flex flex-col items-center justify-center text-center border-b border-emerald-500/20">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2 shadow-inner">
                        <Award className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-white line-clamp-1">
                        {lang === 'ar' ? cert.title : cert.titleEn}
                      </span>
                      <span className="text-[10px] text-emerald-400 mt-1 font-semibold">
                        {t('اعتماد رسمي موثق', 'Verified Credential')}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={cert.imageUrl}
                      alt={lang === 'ar' ? cert.title : cert.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => setCertImageErrors((prev) => ({ ...prev, [cert.id]: true }))}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white z-10">
                    <span className="font-semibold">{cert.date}</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <Award className="w-3 h-3" />
                      {t('معاينة', 'Preview')}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {lang === 'ar' ? cert.title : cert.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'ar' ? cert.issuer : cert.issuerEn}
                  </p>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 truncate">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="font-bold text-base text-white truncate">
                  {lang === 'ar' ? selectedCert.title : selectedCert.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Display either image or elegant diploma fallback card */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              {certImageErrors[selectedCert.id] || !selectedCert.imageUrl ? (
                <div className="w-full h-full p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-center relative border-4 border-double border-emerald-500/30 rounded-xl">
                  {/* Decorative corner seals */}
                  <div className="absolute top-3 left-3 text-emerald-500/30 text-xs font-serif font-black">★ ★ ★</div>
                  <div className="absolute top-3 right-3 text-emerald-500/30 text-xs font-serif font-black">★ ★ ★</div>
                  
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
                    <Award className="w-8 h-8 text-emerald-400" />
                  </div>

                  <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">
                    {t('شهادة تدريب معتمدة', 'Official Certificate of Training')}
                  </p>

                  <h3 className="text-lg sm:text-xl font-black text-white max-w-md my-2">
                    {lang === 'ar' ? selectedCert.title : selectedCert.titleEn}
                  </h3>

                  <p className="text-sm font-semibold text-cyan-400 mb-2">
                    {lang === 'ar' ? selectedCert.issuer : selectedCert.issuerEn}
                  </p>

                  <p className="text-xs text-slate-400 max-w-sm">
                    {t(
                      'مُنحت للمهندس علي حسن تقديراً لاجتياز متطلبات التدريب الفني والعملي بكفاءة عالية.',
                      'Awarded to Ali Hassan for successfully demonstrating professional technical and practical competency.'
                    )}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-xs text-slate-400 px-4">
                    <span>{t('تاريخ الإصدار: ', 'Issued: ')}{selectedCert.date}</span>
                    <span className="text-emerald-400 font-semibold">{t('حالة الاعتماد: موثق ✓', 'Status: Accredited ✓')}</span>
                  </div>
                </div>
              ) : (
                <Image
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  onError={() => setCertImageErrors((prev) => ({ ...prev, [selectedCert.id]: true }))}
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400">
                <span className="font-bold text-slate-300">
                  {lang === 'ar' ? selectedCert.issuer : selectedCert.issuerEn}
                </span>{' '}
                • {selectedCert.date}
              </div>
              {selectedCert.credentialUrl && selectedCert.credentialUrl !== '#' && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <span>{t('التحقق من الشهادة', 'Verify Credential')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
