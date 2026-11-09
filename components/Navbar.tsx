'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from './Providers';
import { 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  Download, 
  Lock, 
  Cpu, 
  Film, 
  Code2,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  cvUrl?: string;
}

export default function Navbar({ cvUrl }: NavbarProps) {
  const { lang, setLang, theme, toggleTheme, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', labelAr: 'عن علي', labelEn: 'About' },
    { href: '#experience', labelAr: 'التعليم والتدريب', labelEn: 'Experience' },
    { href: '#projects', labelAr: 'معرض الأعمال', labelEn: 'Portfolio' },
    { href: '#skills', labelAr: 'المهارات والشهادات', labelEn: 'Skills & Certs' },
    { href: '#contact', labelAr: 'تواصل معي', labelEn: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 dark:bg-slate-950/90 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-lg">
                  AH
                </span>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t('علي حسن', 'Ali Hassan')}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1 ml-1" />
                  {t('متاح للمشاريع', 'Available')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {t('إلكترونيات • مونتاج سينمائي • برمجة', 'Electronics • Video • Code')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {t(item.labelAr, item.labelEn)}
              </a>
            ))}
          </nav>

          {/* Quick Actions (Lang, Theme, CV, Admin) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={t('تغيير اللغة', 'Change Language')}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            {/* CV Download Button */}
            {cvUrl && (
              <a
                href={cvUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('تحميل السيرة الذاتية', 'Download CV')}</span>
              </a>
            )}

            {/* Admin discrete entry */}
            <Link
              href="/admin"
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={t('لوحة التحكم', 'Admin Portal')}
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 dark:bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
            >
              {t(item.labelAr, item.labelEn)}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {cvUrl && (
              <a
                href={cvUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-600 text-white font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                <span>{t('تحميل السيرة الذاتية (CV)', 'Download CV')}</span>
              </a>
            )}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 text-slate-300 font-medium text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>{t('لوحة تحكم الموقع (/admin)', 'Admin Dashboard (/admin)')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
