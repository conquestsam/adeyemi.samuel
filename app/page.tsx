'use client';

import { useState } from 'react';
import { AvatarStage } from '@/components/ai/AvatarStage';
import { ChatPanel } from '@/components/ai/ChatPanel';
import { Header } from '@/components/layout/Header';
import { ThemePicker } from '@/components/ui/ThemePicker';
import { profile } from '@/content/profile';

const shirtColors = ['#374151', '#111827', '#0f766e', '#7c2d12', '#312e81'];

export default function Home() {
  const [avatarState, setAvatarState] = useState<'idle' | 'listening' | 'thinking' | 'speaking' | 'error'>('idle');
  const [shirtColor, setShirtColor] = useState(shirtColors[0]);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-gray-950 text-white">
      <Header />
      <AvatarStage state={avatarState} shirtColor={shirtColor} />
      <ThemePicker colors={shirtColors} value={shirtColor} onChange={setShirtColor} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-950/45 via-transparent to-gray-950/62" />

      <section className="relative z-10 flex min-h-screen flex-col justify-end px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-end justify-between gap-6">
          <div className="flex max-w-md items-end gap-4 pb-28 sm:pb-12">
            <AvatarStage
              state={avatarState}
              shirtColor={shirtColor}
              variant="badge"
              className="hidden shrink-0 sm:block"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">AI Portfolio</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">{profile.name}</h1>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                {profile.headline} based in {profile.location}.
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">{profile.availability}</p>
            </div>
          </div>
          <div className="hidden sm:block" />
        </div>

        <ChatPanel onVoiceStateChange={setAvatarState} />
      </section>

      <footer className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-xs text-gray-600">
        © 2026 {profile.name}
      </footer>
    </main>
  );
}
