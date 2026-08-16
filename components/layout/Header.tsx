'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { profile } from '@/content/profile';
import { IconButton } from '@/components/ui/IconButton';

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: profile.websiteUrl, label: 'Website' },
    { href: '/resume', label: 'Resume' },
    { href: profile.githubUrl, label: 'GitHub' },
    { href: profile.linkedinUrl, label: 'LinkedIn' }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-white sm:text-base"
          aria-label="Adeyemi Samuel AI Portfolio home"
          onClick={() => setOpen(false)}
        >
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
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <IconButton
          label={open ? 'Close menu' : 'Open menu'}
          className="border-white/15 bg-gray-900/70 shadow-lg backdrop-blur-sm sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </IconButton>
      </div>
      {open ? (
        <nav
          id="mobile-navigation"
          className="mx-4 rounded-lg border border-white/10 bg-gray-950/92 p-2 shadow-2xl backdrop-blur-md sm:hidden"
          aria-label="Mobile portfolio links"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
