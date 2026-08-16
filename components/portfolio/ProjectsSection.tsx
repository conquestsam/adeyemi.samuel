import { projects } from '@/content/projects';
import { SectionShell } from '@/components/layout/SectionShell';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

export function ProjectsSection() {
  return (
    <SectionShell id="projects" eyebrow="Projects" title="Project proof with live, source, and testing paths.">
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}
