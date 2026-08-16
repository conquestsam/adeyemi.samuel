import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  applicationName: 'Adeyemi Samuel AI Portfolio',
  title: {
    default: 'Adeyemi Samuel | AI Full Stack Developer Portfolio',
    template: '%s | Adeyemi Samuel'
  },
  description:
    'Voice-enabled AI portfolio for Adeyemi Samuel, a full stack developer building modern web apps, APIs, and AI-assisted product features.',
  keywords: [
    'Adeyemi Samuel',
    'Adeyemi portfolio',
    'Full Stack Developer',
    'AI portfolio',
    'NestJS developer',
    'React developer',
    'TypeScript developer',
    'Brussels full stack developer'
  ],
  authors: [{ name: 'Adeyemi Samuel', url: 'https://adeyemisamuel.vercel.app/' }],
  creator: 'Adeyemi Samuel',
  publisher: 'Adeyemi Samuel',
  category: 'portfolio',
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/brand/adeyemi-avatar-logo.svg', type: 'image/svg+xml', sizes: '512x512' }
    ],
    apple: [{ url: '/brand/adeyemi-avatar-logo.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg']
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Adeyemi Samuel | AI Full Stack Developer Portfolio',
    description:
      'Explore Samuel’s work through an AI avatar, project links, tech stack, experience, and booking-ready contact flow.',
    type: 'website',
    url: '/',
    siteName: 'Adeyemi Samuel AI Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/brand/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Adeyemi Samuel AI Portfolio avatar preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adeyemi Samuel | AI Full Stack Developer Portfolio',
    description:
      'Voice-enabled AI portfolio with a WebGL avatar, project guide, NestJS API, and contact workflows.',
    images: ['/brand/og-image.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-950">
        {children}
        <Toaster theme="dark" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
