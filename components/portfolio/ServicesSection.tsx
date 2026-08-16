import { SectionShell } from '@/components/layout/SectionShell';

const services = [
  'Full-stack web applications',
  'AI-assisted product features',
  'API and backend systems',
  'SaaS dashboards and workflows'
];

export function ServicesSection() {
  return (
    <SectionShell id="services" eyebrow="Services" title="Focused engineering support for product teams.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service} className="rounded-lg border border-white/10 bg-white/5 p-5 text-slate-200">
            {service}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
