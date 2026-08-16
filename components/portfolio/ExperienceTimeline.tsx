import { experience } from '@/content/experience';
import { SectionShell } from '@/components/layout/SectionShell';
import { Badge } from '@/components/ui/Badge';

export function ExperienceTimeline() {
  return (
    <SectionShell id="experience" eyebrow="Experience" title="Built around delivery, maintainability, and iteration.">
      <div className="space-y-6">
        {experience.map((item) => (
          <article key={`${item.company}-${item.role}`} className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                <p className="text-slate-300">{item.company}</p>
              </div>
              <p className="text-sm text-slate-400">{item.start} - {item.end}</p>
            </div>
            <p className="mt-4 text-slate-300">{item.summary}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300">
              {item.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
