import type { Metadata } from 'next';
import { Download, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/Header';

const resumeUrl = '/resume/adeyemi-samuel-cv.pdf';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'View and download the CV/resume of Adeyemi Samuel, Senior Product Engineer with AI, automation, mobile, fintech, and SaaS product engineering experience.',
  alternates: {
    canonical: '/resume'
  },
  openGraph: {
    title: 'Adeyemi Samuel Resume',
    description:
      'In-app resume viewer for Adeyemi Samuel, Senior Full Stack Developer.',
    url: '/resume',
    type: 'profile'
  }
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Resume</p>
            <h1 className="mt-2 text-2xl font-semibold">Adeyemi Samuel CV</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Senior Full Stack Developer with AI-assisted product, mobile, fintech, social app, SaaS, and backend engineering experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm text-gray-100 transition hover:bg-white/14"
            >
              <Download size={16} />
              Download
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm text-gray-100 transition hover:bg-white/14"
            >
              <ExternalLink size={16} />
              Open PDF
            </a>
          </div>
        </div>

        <div className="min-h-[72vh] flex-1 overflow-hidden rounded-lg border border-white/10 bg-gray-900/70 shadow-2xl">
          <object
            data={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
            type="application/pdf"
            className="h-[72vh] w-full sm:h-[78vh]"
            aria-label="Adeyemi Samuel resume PDF"
          >
            <iframe
              title="Adeyemi Samuel resume"
              src={`${resumeUrl}#toolbar=1&navpanes=0&view=FitH`}
              className="h-[72vh] w-full sm:h-[78vh]"
            />
          </object>
        </div>
      </section>
    </main>
  );
}
