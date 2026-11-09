'use client';

import React, { useState } from 'react';
import { useLang } from './Providers';
import { Profile } from '@/types/portfolio';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Linkedin, 
  Github, 
  Youtube, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface ContactProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactProps) {
  const { lang, t } = useLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send');
      }

      setStatus('success');
      setFeedback(t('تم إرسال رسالتك بنجاح! شكراً لتواصلك.', 'Your message has been sent successfully! Thank you.'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || t('حدث خطأ أثناء الإرسال. يرجى المحاولة ثانية.', 'An error occurred. Please try again.'));
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('قنوات التواصل', 'Get In Touch')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('تواصل معي للعمل أو الاستشارات', 'Start a Project or Collaboration')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t(
              'سواء كنت ترغب في مونتاج وتصحيح ألوان احترافي، استشارة أو فحص في إلكترونيات السيارات، أو تطوير تطبيق رقمي، يسعدني تواصلك!',
              'Whether looking for DaVinci Resolve color grading, automotive electronics consulting, or custom web engineering, let’s talk!'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'ar' ? profile.name : profile.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {lang === 'ar' ? profile.title : profile.titleEn}
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4">
                {/* Official Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('البريد الإلكتروني الرسمي', 'Official Email')}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{profile.email}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                {profile.whatsapp && (
                  <a
                    href={profile.socials.whatsapp || `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('المحادثة المباشرة (واتساب)', 'WhatsApp Chat')}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('تواصل فوري عبر الواتساب', 'Instant WhatsApp message')}</p>
                    </div>
                  </a>
                )}

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('الموقع الجغرافي', 'Location')}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {lang === 'ar' ? profile.location : profile.locationEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  {t('تابع أعمالي وحساباتي على الشبكات', 'Social & Professional Links')}
                </p>
                <div className="flex items-center gap-2.5">
                  {profile.socials.linkedin && (
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}

                  {profile.socials.github && (
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-700 transition"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}

                  {profile.socials.youtube && (
                    <a
                      href={profile.socials.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-red-500/10 transition"
                      title="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {t('أرسل رسالة مباشرة', 'Send a Direct Message')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('الاسم الكريم *', 'Your Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('مثال: أحمد محمود', 'e.g. John Doe')}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('البريد الإلكتروني *', 'Your Email *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('موضوع الرسالة', 'Subject')}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t('مشروع مونتاج / استشارة سيارات وإلكترونيات / أخرى', 'Project inquiry, Automotive consultation, etc.')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('تفاصيل الرسالة *', 'Your Message *')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('اكتب تفاصيل طلبك أو مشروعك هنا...', 'Provide details about your project or inquiry...')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                  />
                </div>

                {/* Feedback message */}
                {feedback && (
                  <div
                    className={`p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
                      status === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{feedback}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === 'loading'
                      ? t('جارٍ إرسال الرسالة...', 'Sending message...')
                      : t('إرسال الرسالة الآن', 'Send Message Now')}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
