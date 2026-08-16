import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  websiteUrl: z.string().url(),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  availability: z.string().min(1),
  summary: z.string().min(1)
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  impact: z.string().optional(),
  image: z.string().min(1),
  stack: z.array(z.string()),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  testUrl: z.string().url().optional(),
  testLabel: z.string().optional(),
  featured: z.boolean(),
  approvedMetrics: z.array(z.string())
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  message: z.string().min(10, 'Please share a little more context.'),
  company: z.string().optional(),
  source: z.string().optional()
});
