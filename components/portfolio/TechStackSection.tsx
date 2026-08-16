import { stack } from '@/content/stack';
import { SectionShell } from '@/components/layout/SectionShell';
import { Badge } from '@/components/ui/Badge';

export function TechStackSection() {
  return (
    <SectionShell id="tech-stack" eyebrow="Tech Stack" title="Tools selected for shipping durable products.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item) => (
          <div key={item.name} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">{item.name}</h3>
              <Badge>{item.level}</Badge>
            </div>
            <p className="mt-3 text-sm text-slate-300">{item.recentUse}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
