import { profile } from '@/content/profile';
import { SectionShell } from '@/components/layout/SectionShell';
import { Badge } from '@/components/ui/Badge';

export function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="About" title="Full-stack engineering with practical product sense.">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <p className="text-lg leading-8 text-slate-300">{profile.summary}</p>
        <div className="grid gap-3">
          {['Frontend systems', 'Backend APIs', 'AI product features', 'Deployment workflows'].map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
