'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Lock, 
  Unlock, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Upload, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  User, 
  Briefcase, 
  Cpu, 
  FileText, 
  Mail, 
  Download, 
  RefreshCw,
  Film,
  Code2,
  ExternalLink,
  X
} from 'lucide-react';
import { 
  PortfolioData, 
  Profile, 
  Project, 
  Experience, 
  SkillCategory, 
  Certificate, 
  ContactMessage 
} from '@/types/portfolio';

type ActiveTab = 'profile' | 'projects' | 'experience' | 'skills' | 'messages' | 'backup';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals for Projects
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Modals for Experience
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  // Modals for Certificate
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);

  // Check auth status on load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const json = await res.json();
      if (json.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setAuthError(json.error || 'كلمة المرور غير صحيحة');
      }
    } catch (err: any) {
      setAuthError('تعذر الاتصال بالسيرفر');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setData(null);
  };

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setErrorMessage('فشل تحميل البيانات');
    }
  };

  const saveAllData = async (newData?: PortfolioData) => {
    const toSave = newData || data;
    if (!toSave) return;

    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage('');

    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      });
      const json = await res.json();

      if (res.ok) {
        setSaveSuccess(true);
        if (newData) setData(newData);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        setErrorMessage(json.error || 'فشل حفظ التعديلات');
      }
    } catch (err: any) {
      setErrorMessage('خطأ في الاتصال بالخادم أثناء الحفظ');
    } finally {
      setIsSaving(false);
    }
  };

  // Upload Helper
  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        return json.url;
      }
      alert('فشل رفع الملف: ' + (json.error || 'Unknown error'));
      return null;
    } catch (e) {
      alert('خطأ أثناء رفع الملف');
      return null;
    }
  };

  // If loading auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          <span>جارٍ التحقق من الصلاحيات...</span>
        </div>
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 p-[2px] mx-auto shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم الموقع الشخصي</h1>
            <p className="text-xs text-slate-400">
              الوصول مقصور على المهندس علي حسن لإدارة المحتوى والسيرة الذاتية
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                كلمة مرور لوحة التحكم (Admin Password)
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="أدخل كلمة المرور (الافتراضية: admin)"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                كلمة المرور الافتراضية الأولية: <span className="font-mono text-emerald-400">admin</span> (يمكنك تغييرها من داخل اللوحة).
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
              <span>تسجيل الدخول إلى لوحة التحكم</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 inline-flex items-center gap-1.5 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>العودة لمعاينة الموقع الرئيسي</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated but data is not loaded yet
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          <span>جارٍ تحميل بيانات الموقع...</span>
        </div>
      </div>
    );
  }

  // ================= MAIN CMS DASHBOARD =================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm">
            AH
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>لوحة التحكم الشخصية</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                Full CMS Active
              </span>
            </h1>
            <p className="text-xs text-slate-400">إدارة كل محتويات بورتفوليو علي حسن مباشرة</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Save Status Banner */}
          {saveSuccess && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>تم حفظ التعديلات بنجاح!</span>
            </span>
          )}

          {errorMessage && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </span>
          )}

          {/* Quick Save Button */}
          <button
            onClick={() => saveAllData()}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}</span>
          </button>

          {/* View Public Site */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">معاينة الموقع الحي</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body with Tabs */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'profile'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>البيانات الشخصية و الـ CV</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'projects'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الأعمال والمشاريع ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'experience'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>التعليم والتدريب الميداني ({data.experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'skills'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>المهارات والشهادات</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'messages'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>رسائل الزوار ({data.messages?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'backup'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>النسخ الاحتياطي وقاعدة البيانات</span>
          </button>
        </div>

        {/* TAB 1: PROFILE & CV */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                <span>تعديل الهوية والبيانات الشخصية</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الاسم بالعربية</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الاسم بالإنجليزية (Name in English)</label>
                  <input
                    type="text"
                    value={data.profile.nameEn}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, nameEn: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">المسمى المهني والأكاديمي (عربي)</label>
                  <textarea
                    rows={2}
                    value={data.profile.title}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, title: e.target.value } })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">المسمى المهني والأكاديمي (English)</label>
                  <textarea
                    rows={2}
                    value={data.profile.titleEn}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, titleEn: e.target.value } })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">النبذة التعريفية الشاملة (عربي)</label>
                  <textarea
                    rows={3}
                    value={data.profile.bio}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">النبذة التعريفية (English Bio)</label>
                  <textarea
                    rows={3}
                    value={data.profile.bioEn}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, bioEn: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Media & CV */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Avatar */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">الصورة الشخصية (Avatar)</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                      <Image
                        src={data.profile.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={data.profile.avatar}
                        onChange={(e) => setData({ ...data, profile: { ...data.profile, avatar: e.target.value } })}
                        placeholder="رابط الصورة أو ارفع ملف..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition">
                        <Upload className="w-3.5 h-3.5 text-emerald-400" />
                        <span>رفع صورة جديدة من جهازك</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(file);
                              if (url) {
                                setData({ ...data, profile: { ...data.profile, avatar: url } });
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* CV Upload */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">ملف السيرة الذاتية (CV PDF)</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={data.profile.cvUrl}
                      onChange={(e) => setData({ ...data, profile: { ...data.profile, cvUrl: e.target.value } })}
                      placeholder="رابط ملف الـ CV..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع ملف CV جديد (PDF)</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(file);
                              if (url) {
                                setData({ ...data, profile: { ...data.profile, cvUrl: url } });
                              }
                            }
                          }}
                        />
                      </label>
                      {data.profile.cvUrl && (
                        <a
                          href={data.profile.cvUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>معاينة الـ CV الحالي</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Contact & Socials */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني الرسمي</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, email: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">رقم الهاتف / الواتساب</label>
                  <input
                    type="text"
                    value={data.profile.whatsapp}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, whatsapp: e.target.value, phone: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">الموقع الجغرافي (Location)</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, location: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">رابط LinkedIn</label>
                  <input
                    type="text"
                    value={data.profile.socials.linkedin || ''}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, socials: { ...data.profile.socials, linkedin: e.target.value } } })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">رابط GitHub</label>
                  <input
                    type="text"
                    value={data.profile.socials.github || ''}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, socials: { ...data.profile.socials, github: e.target.value } } })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">رابط YouTube</label>
                  <input
                    type="text"
                    value={data.profile.socials.youtube || ''}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, socials: { ...data.profile.socials, youtube: e.target.value } } })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Password update */}
              <div className="pt-6 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 max-w-md space-y-2">
                  <label className="block text-xs font-bold text-white">تغيير كلمة مرور لوحة التحكم</label>
                  <input
                    type="text"
                    value={data.adminPassword || 'admin'}
                    onChange={(e) => setData({ ...data, adminPassword: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                  <p className="text-[11px] text-slate-400">احرص على تذكر هذه الكلمة لتسجيل الدخول مستقبلاً.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">إدارة الأعمال والمشاريع وفيديوهات المونتاج</h2>
                <p className="text-xs text-slate-400">أضف أعمالاً جديدة أو عدّل أو احذف أي مشروع في ثوانٍ</p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    title: '',
                    titleEn: '',
                    category: 'video',
                    description: '',
                    descriptionEn: '',
                    tools: [],
                    imageUrl: '',
                    videoUrl: '',
                    demoUrl: '',
                    githubUrl: '',
                    featured: false,
                    date: new Date().getFullYear().toString(),
                  });
                  setProjectModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مشروع / عمل جديد</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-950">
                    <Image
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        {project.category === 'video' ? 'مونتاج DaVinci' : project.category === 'electronics' ? 'إلكترونيات وسيارات' : 'تطوير ويب'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-grow">
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{project.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.tools.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {t}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-[10px] text-slate-500">+{project.tools.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{project.date}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject({ ...project });
                          setProjectModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition"
                        title="تعديل المشروع"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف مشروع "${project.title}"؟`)) {
                            const updated = {
                              ...data,
                              projects: data.projects.filter((p) => p.id !== project.id),
                            };
                            saveAllData(updated);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                        title="حذف المشروع"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE MANAGER */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">إدارة التدريبات الميدانية وأماكن العمل والتعليم</h2>
                <p className="text-xs text-slate-400">إضافة أو تعديل دراستك بالكلية المصرية الكورية، تدريبات نيسان ومصر حلوان وغيرها</p>
              </div>

              <button
                onClick={() => {
                  setEditingExp({
                    id: `exp-${Date.now()}`,
                    role: '',
                    roleEn: '',
                    company: '',
                    companyEn: '',
                    period: '2024',
                    periodEn: '2024',
                    location: 'القاهرة، مصر',
                    locationEn: 'Cairo, Egypt',
                    type: 'internship',
                    description: [''],
                    descriptionEn: [''],
                    certificateUrl: '',
                  });
                  setExpModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خبرة / تدريب جديد</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                        {exp.type === 'education' ? 'تعليم أكاديمي' : exp.type === 'internship' ? 'تدريب عملي' : 'عمل مهني'}
                      </span>
                      <span className="text-xs text-slate-400">{exp.period} • {exp.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-semibold text-cyan-400">{exp.company}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{exp.description[0]}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingExp({ ...exp });
                        setExpModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition"
                      title="تعديل"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`هل أنت متأكد من حذف "${exp.role}"؟`)) {
                          const updated = {
                            ...data,
                            experiences: data.experiences.filter((e) => e.id !== exp.id),
                          };
                          saveAllData(updated);
                        }
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS & CERTIFICATES */}
        {activeTab === 'skills' && (
          <div className="space-y-10">
            {/* Skills */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>إدارة المهارات ونسب الإتقان</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.skillCategories.map((cat, catIdx) => (
                  <div key={cat.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                      <button
                        onClick={() => {
                          const name = prompt('أدخل اسم المهارة الجديدة:');
                          if (name) {
                            const newCategories = [...data.skillCategories];
                            newCategories[catIdx].skills.push({
                              name,
                              nameEn: name,
                              level: 85,
                              badge: 'Pro',
                            });
                            setData({ ...data, skillCategories: newCategories });
                          }
                        }}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة مهارة</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-semibold">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-emerald-400">{skill.level}%</span>
                              <button
                                onClick={() => {
                                  const newCategories = [...data.skillCategories];
                                  newCategories[catIdx].skills.splice(sIdx, 1);
                                  setData({ ...data, skillCategories: newCategories });
                                }}
                                className="text-slate-500 hover:text-red-400"
                                title="حذف المهارة"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={skill.level}
                            onChange={(e) => {
                              const newCategories = [...data.skillCategories];
                              newCategories[catIdx].skills[sIdx].level = parseInt(e.target.value);
                              setData({ ...data, skillCategories: newCategories });
                            }}
                            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>الشهادات والاعتمادات الرسمية</span>
                </h2>

                <button
                  onClick={() => {
                    setEditingCert({
                      id: `cert-${Date.now()}`,
                      title: '',
                      titleEn: '',
                      issuer: '',
                      issuerEn: '',
                      date: new Date().getFullYear().toString(),
                      credentialUrl: '#',
                      imageUrl: '',
                    });
                    setCertModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة شهادة جديدة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.certificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-950">
                      <Image
                        src={cert.imageUrl || 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?q=80&w=600&auto=format&fit=crop'}
                        alt={cert.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-2">{cert.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer} • {cert.date}</p>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-slate-800">
                      <button
                        onClick={() => {
                          if (confirm(`حذف شهادة "${cert.title}"؟`)) {
                            const updated = {
                              ...data,
                              certificates: data.certificates.filter((c) => c.id !== cert.id),
                            };
                            saveAllData(updated);
                          }
                        }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">رسائل الزوار الواردة من الموقع</h2>
              <p className="text-xs text-slate-400">الرسائل المرسلة عبر نموذج التواصل في الصفحة الرئيسية تُحفظ هنا تلقائياً</p>
            </div>

            {(!data.messages || data.messages.length === 0) ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400">
                <Mail className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                <p className="text-sm font-semibold">لا توجد رسائل واردة حتى الآن.</p>
                <p className="text-xs text-slate-500 mt-1">عندما يرسل لك شخص رسالة من الصفحة الرئيسية ستظهر هنا فوراً!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.messages.map((msg) => (
                  <div key={msg.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">{msg.name}</h3>
                        <a href={`mailto:${msg.email}`} className="text-xs text-emerald-400 hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">
                          {new Date(msg.createdAt).toLocaleString('ar-EG')}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm('هل تريد حذف هذه الرسالة؟')) {
                              const updated = {
                                ...data,
                                messages: data.messages.filter((m) => m.id !== msg.id),
                              };
                              saveAllData(updated);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                          title="حذف الرسالة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-300 mb-1">الموضوع: {msg.subject}</p>
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: BACKUP & DATABASE EXPORT */}
        {activeTab === 'backup' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <span>النسخ الاحتياطي وقاعدة البيانات المباشرة</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                جميع البيانات محفوظة محلياً في ملف <code className="text-emerald-400 font-mono">data/portfolio-db.json</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-200">تحميل نسخة احتياطية من ملف قاعدة البيانات (JSON)</h3>
              <p className="text-xs text-slate-400">
                يمكنك تنزيل ملف JSON الكامل لبياناتك والاحتفاظ به أو نقله لأي استضافة سحابية في أي وقت.
              </p>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `ali-hassan-portfolio-backup-${Date.now()}.json`;
                  a.click();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                <Download className="w-4 h-4" />
                <span>تحميل نسخة احتياطية (JSON Download)</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-2">
              <h3 className="text-sm font-bold text-cyan-300">جاهزية الربط بـ Supabase (Supabase Ready)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                هيكل قاعدة البيانات مصمم بنظام الجداول العلائقية (Relational Schema: Profile, Projects, Experiences, Skills, Certificates, Messages). عندما ترغب في تشغيل قاعدة بيانات Supabase سحابية، يكفي فقط إضافة مفاتيح الـ Supabase في ملف <code className="font-mono text-cyan-400">.env.local</code>، وجميع الواجهات جاهزة للربط الفوري!
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ================= PROJECT MODAL ================= */}
      {projectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProject.title ? 'تعديل بيانات المشروع' : 'إضافة مشروع / عمل جديد'}
              </h3>
              <button onClick={() => setProjectModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">التصنيف الأساسي للمشروع</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                >
                  <option value="video">مونتاج وفيديو وتصحيح ألوان DaVinci Resolve</option>
                  <option value="electronics">إلكترونيات وهندسة سيارات (ECU, OBD-II, SOLIDWORKS)</option>
                  <option value="web">تطوير منصات وتطبيقات ويب (Next.js, AI, etc.)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان المشروع (عربي)</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان المشروع (English)</label>
                  <input
                    type="text"
                    value={editingProject.titleEn}
                    onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">وصف المشروع (عربي)</label>
                <textarea
                  rows={2}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">وصف المشروع (English)</label>
                <textarea
                  rows={2}
                  value={editingProject.descriptionEn}
                  onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  التقنيات والأدوات المستخدمة (مفصولة بفاصلة ،)
                </label>
                <input
                  type="text"
                  value={editingProject.tools.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="مثال: DaVinci Resolve, Fusion, Next.js, OBD-II"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              {/* Image & Video URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">صورة الغلاف (Image URL أو رفع)</label>
                  <input
                    type="text"
                    value={editingProject.imageUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs mb-1"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold">
                    <Upload className="w-3 h-3" />
                    <span>رفع صورة من جهازك</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingProject({ ...editingProject, imageUrl: url });
                        }
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رابط الفيديو (YouTube / MP4)</label>
                  <input
                    type="text"
                    value={editingProject.videoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs mb-1"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold">
                    <Upload className="w-3 h-3" />
                    <span>رفع فيديو من جهازك (MP4)</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingProject({ ...editingProject, videoUrl: url });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رابط المعاينة الحية (Demo / Live URL)</label>
                  <input
                    type="text"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رابط GitHub (إن وجد)</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span>تمييز كمشروع بارز في الصفحة الرئيسية (Featured)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  const existingIdx = data.projects.findIndex((p) => p.id === editingProject.id);
                  let newProjects = [...data.projects];
                  if (existingIdx >= 0) {
                    newProjects[existingIdx] = editingProject;
                  } else {
                    newProjects.unshift(editingProject);
                  }
                  saveAllData({ ...data, projects: newProjects });
                  setProjectModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                حفظ المشروع
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EXPERIENCE MODAL ================= */}
      {expModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingExp.role ? 'تعديل التدريب / الخبرة' : 'إضافة تدريب ميداني أو دراسة جديدة'}
              </h3>
              <button onClick={() => setExpModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">النوع</label>
                <select
                  value={editingExp.type}
                  onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option value="education">دراسة أكاديمية (Education)</option>
                  <option value="internship">تدريب ميداني وعملي (Internship - نيسان / مصر حلوان)</option>
                  <option value="work">عمل مهني / فريلانس (Work / Freelance)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المسمى الوظيفي / التخصص (عربي)</label>
                  <input
                    type="text"
                    value={editingExp.role}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المسمى (English)</label>
                  <input
                    type="text"
                    value={editingExp.roleEn}
                    onChange={(e) => setEditingExp({ ...editingExp, roleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المؤسسة / المركز (عربي)</label>
                  <input
                    type="text"
                    value={editingExp.company}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    placeholder="مثال: مركز خدمة نيسان / الكلية المصرية الكورية"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المؤسسة (English)</label>
                  <input
                    type="text"
                    value={editingExp.companyEn}
                    onChange={(e) => setEditingExp({ ...editingExp, companyEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">الفترة الزمنية (مثال: صيف 2024)</label>
                  <input
                    type="text"
                    value={editingExp.period}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value, periodEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المكان (مثال: القاهرة، مصر)</label>
                  <input
                    type="text"
                    value={editingExp.location}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value, locationEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  المهام والتفاصيل (كل سطر يعتبر نقطة مستقلة في القائمة)
                </label>
                <textarea
                  rows={4}
                  value={editingExp.description.join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n').filter(Boolean);
                    setEditingExp({
                      ...editingExp,
                      description: lines,
                      descriptionEn: lines,
                    });
                  }}
                  placeholder="سطر 1: فحص وبرمجة حساسات المحرك&#10;سطر 2: استخدام أجهزة فحص الـ OBD-II"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">رابط أو ملف شهادة التدريب (اختياري)</label>
                <input
                  type="text"
                  value={editingExp.certificateUrl || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, certificateUrl: e.target.value })}
                  placeholder="https://... أو ارفع ملف"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs mb-1"
                />
                <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold">
                  <Upload className="w-3 h-3" />
                  <span>رفع صورة / ملف الشهادة</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file);
                        if (url) setEditingExp({ ...editingExp, certificateUrl: url });
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setExpModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  const existingIdx = data.experiences.findIndex((e) => e.id === editingExp.id);
                  let newExps = [...data.experiences];
                  if (existingIdx >= 0) {
                    newExps[existingIdx] = editingExp;
                  } else {
                    newExps.unshift(editingExp);
                  }
                  saveAllData({ ...data, experiences: newExps });
                  setExpModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20"
              >
                حفظ التدريب / الخبرة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CERTIFICATE MODAL ================= */}
      {certModalOpen && editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">إضافة شهادة معتمدة جديدة</h3>
              <button onClick={() => setCertModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">اسم الشهادة (عربي)</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value, titleEn: e.target.value })}
                  placeholder="مثال: شهادة تدريب صيانة إلكترونيات السيارات"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الجهة المانحة (عربي)</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value, issuerEn: e.target.value })}
                  placeholder="مثال: مركز خدمة نيسان المعتمد"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">السنة / التاريخ</label>
                <input
                  type="text"
                  value={editingCert.date}
                  onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">صورة الشهادة</label>
                <input
                  type="text"
                  value={editingCert.imageUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })}
                  placeholder="رابط الصورة أو ارفع ملف..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs mb-1"
                />
                <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold">
                  <Upload className="w-3 h-3" />
                  <span>رفع صورة الشهادة من جهازك</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file);
                        if (url) setEditingCert({ ...editingCert, imageUrl: url });
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCertModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  const newCerts = [...data.certificates, editingCert];
                  saveAllData({ ...data, certificates: newCerts });
                  setCertModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                إضافة الشهادة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
