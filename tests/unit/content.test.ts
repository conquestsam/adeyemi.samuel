import { describe, expect, it } from 'vitest';
import { profileSchema, projectSchema } from '@/lib/content-schema';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { buildSystemPrompt } from '@/lib/ai/prompt-builder';

describe('portfolio content', () => {
  it('keeps profile contact details valid', () => {
    expect(profileSchema.parse(profile).email).toBe('conqueststat@icloud.com');
    expect(profile.githubUrl).not.toContain('undefined');
    expect(profile.linkedinUrl).not.toContain('undefined');
  });

  it('keeps project links valid when present', () => {
    for (const project of projects) {
      const parsed = projectSchema.parse(project);
      expect(JSON.stringify(parsed)).not.toContain('undefined');
    }
  });

  it('keeps the AI prompt grounded in public facts', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('Do not invent project metrics');
    expect(prompt).toContain('Adeyemi Samuel');
  });
});
