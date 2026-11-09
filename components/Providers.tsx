'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ar' | 'en';
type Theme = 'dark' | 'light';

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  theme: Theme;
  toggleTheme: () => void;
  t: (arText: string, enText: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'ar',
  setLang: () => {},
  dir: 'rtl',
  theme: 'dark',
  toggleTheme: () => {},
  t: (arText) => arText,
});

export const useLang = () => useContext(LangContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read stored language or default to Arabic
    const savedLang = localStorage.getItem('portfolio_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ar') {
      setLangState(savedLang);
    }

    // Read stored theme or default to dark
    const savedTheme = localStorage.getItem('portfolio_theme') as Theme;
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const t = (arText: string, enText: string) => {
    return lang === 'ar' ? arText : enText;
  };

  // Avoid layout shifts before mounting if possible
  return (
    <LangContext.Provider value={{ lang, setLang, dir, theme, toggleTheme, t }}>
      <div dir={dir} className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </LangContext.Provider>
  );
}
