'use client';

import { Calendar, Mail, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { profile } from '@/content/profile';
import { Button } from '@/components/ui/Button';
import { SectionShell } from '@/components/layout/SectionShell';

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [bookingUrl, setBookingUrl] = useState<string | undefined>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setBookingUrl(data.bookingUrl);
      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <SectionShell id="contact" eyebrow="Contact" title="Bring the next project into focus.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4 text-slate-300">
          <a className="flex items-center gap-3 hover:text-white" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
          <a className="flex items-center gap-3 hover:text-white" href={`tel:${profile.phone}`}><Phone size={18} /> {profile.phone}</a>
          <a className="flex items-center gap-3 hover:text-white" href={bookingUrl || '#contact'}><Calendar size={18} /> Book a call</a>
          <p className="pt-4 text-sm text-slate-400">Submissions can create a CRM lead and return a calendar booking path when credentials are configured.</p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-white/10 bg-white/5 p-6">
          <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
          <label className="grid gap-2 text-sm text-slate-300">
            Your name
            <input name="name" required className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cobalt" placeholder="John Doe" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Your email
            <input name="email" required type="email" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cobalt" placeholder="john@example.com" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Message
            <textarea name="message" required rows={5} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cobalt" placeholder="Tell me about your project..." />
          </label>
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send message'}
          </Button>
          {status === 'success' ? <p className="text-sm text-mint">Message received. You can now use the booking link to choose a time.</p> : null}
          {status === 'error' ? <p className="text-sm text-rose-300">Something failed. Please email Samuel directly.</p> : null}
        </form>
      </div>
    </SectionShell>
  );
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
