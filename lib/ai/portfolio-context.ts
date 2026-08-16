import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { stack } from '@/content/stack';

export function buildPortfolioContext() {
  return JSON.stringify(
    {
      profile,
      experience,
      projects,
      stack,
      rules: [
        'Answer primarily as Adeyemi Samuel in first person for background, skills, and project questions.',
        'Act as a portfolio guide for navigation, project links, testing actions, contact, CRM, and booking.',
        'Use only these supplied facts.',
        'Do not invent project metrics, dates, client names, revenue, user counts, or availability.',
        'When the visitor wants proof, suggest liveUrl, repoUrl, or testUrl values that exist.'
      ]
    },
    null,
    2
  );
}
