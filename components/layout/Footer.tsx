import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 {profile.name}</p>
        <p>Voice sessions start only when you activate the mic. Chat transcripts are ephemeral by default.</p>
      </div>
    </footer>
  );
}
