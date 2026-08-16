'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { profile } from '@/content/profile';
import { IconButton } from '@/components/ui/IconButton';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 text-sm font-medium text-white sm:text-base" aria-label="Adeyemi Samuel AI Portfolio home">
          <Image
            src="/brand/adeyemi-avatar-logo.svg"
            alt=""
            width={34}
            height={34}
            priority
            className="h-8 w-8 rounded-xl border border-white/10 bg-gray-950"
          />
          <span>Adeyemi</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-gray-400 sm:flex" aria-label="Portfolio links">
          <a href={profile.websiteUrl} className="transition-colors hover:text-white">
            Website
          </a>
          <a href="/resume" className="transition-colors hover:text-white">
            Resume
          </a>
          <a href={profile.githubUrl} className="transition-colors hover:text-white">
            GitHub
          </a>
          <a href={profile.linkedinUrl} className="transition-colors hover:text-white">
            LinkedIn
          </a>
        </nav>
        <IconButton label="Toggle menu" className="border-white/15 bg-gray-900/70 shadow-lg backdrop-blur-sm sm:hidden">
          <Menu size={18} />
        </IconButton>
      </div>
    </header>
  );
}
