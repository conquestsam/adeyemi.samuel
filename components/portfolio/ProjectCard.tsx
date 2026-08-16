import { ExternalLink, Github, TestTube2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact?: string;
  stack: readonly string[];
  liveUrl?: string;
  repoUrl?: string;
  testUrl?: string;
  testLabel?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 rounded-lg border border-white/10 bg-white/5 p-6">
      <div>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{project.summary}</p>
      </div>
      <div className="grid gap-3 text-sm text-slate-300">
        <p><span className="text-slate-500">Problem:</span> {project.problem}</p>
        <p><span className="text-slate-500">Solution:</span> {project.solution}</p>
        {project.impact ? <p><span className="text-slate-500">Impact:</span> {project.impact}</p> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {project.liveUrl ? <a className="inline-flex items-center gap-2 rounded-lg bg-cobalt px-3 py-2 text-sm font-medium text-white hover:bg-cobalt/90" href={project.liveUrl}><ExternalLink size={16} /> Live</a> : null}
        {project.repoUrl ? <a className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-sm font-medium text-white hover:bg-white/10" href={project.repoUrl}><Github size={16} /> Source</a> : null}
        {project.testUrl ? <a className="inline-flex items-center gap-2 rounded-lg border border-mint/40 px-3 py-2 text-sm font-medium text-mint hover:bg-mint/10" href={project.testUrl}><TestTube2 size={16} /> {project.testLabel || 'Test flow'}</a> : null}
      </div>
    </article>
  );
}
