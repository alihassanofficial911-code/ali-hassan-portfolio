'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from './Providers';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLang();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-start space-y-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {t('علي حسن • مهندس إلكترونيات ومونتير فيديو ومطور ويب', 'Ali Hassan • Electronics Engineer, Video Editor & Developer')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t(
                'طالب بالفرقة الرابعة بالكلية المصرية الكورية للتكنولوجيا الصناعية والطاقة',
                '4th-Year Student at Egyptian-Korean Faculty of Technological Industry & Energy'
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
              title={t('العودة للأعلى', 'Scroll to top')}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} {t('جميع الحقوق محفوظة — علي حسن (Ali Hassan)', 'All rights reserved — Ali Hassan')}</p>
          <Link
            href="/admin"
            className="text-[11px] text-slate-400/50 hover:text-slate-300 dark:text-slate-600 dark:hover:text-slate-400 transition"
            title="Management"
          >
            {t('بوابة الإدارة', 'Portal')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
