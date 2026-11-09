import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ali-hassan-portfolio.vercel.app'),
  title: {
    default: 'Ali Hassan | Electronics Engineer & DaVinci Resolve Video Editor',
    template: '%s | Ali Hassan',
  },
  description: 'الموقع الشخصي ومعرض أعمال علي حسن - طالب بالفرقة الرابعة قسم الإلكترونيات بالكلية المصرية الكورية، مصحح ألوان ومونتير DaVinci Resolve، وأخصائي إلكترونيات وهندسة سيارات ومطور منصات ويب سحابية.',
  keywords: [
    'Ali Hassan',
    'علي حسن',
    'Electronics Engineer',
    'Automotive Systems',
    'DaVinci Resolve Studio',
    'DaVinci Fusion',
    'Color Grading',
    'Egyptian Korean Faculty',
    'الكلية المصرية الكورية',
    'Medicology',
    'Next.js',
    'ECU Diagnostics',
    'SOLIDWORKS'
  ],
  authors: [{ name: 'Ali Hassan', url: 'mailto:alihassanofficial911@gmail.com' }],
  creator: 'Ali Hassan',
  publisher: 'Ali Hassan',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: ['en_US'],
    url: 'https://ali-hassan-portfolio.vercel.app',
    siteName: 'Ali Hassan Portfolio & Showcase',
    title: 'Ali Hassan | Electronics Engineer & DaVinci Resolve Video Editor',
    description: 'الموقع الشخصي ومعرض أعمال علي حسن - طالب بالفرقة الرابعة قسم الإلكترونيات بالكلية المصرية الكورية، مصحح ألوان ومونتير DaVinci Resolve، وأخصائي إلكترونيات وهندسة سيارات.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Ali Hassan - Portfolio & Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Hassan | Electronics Engineer & DaVinci Resolve Video Editor',
    description: 'طالب بالفرقة الرابعة قسم إلكترونيات بالكلية المصرية الكورية، مصحح ألوان ومونتير DaVinci Resolve، ومطور تطبيقات ويب.',
    images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <body className={`${cairo.variable} font-sans bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-300`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
