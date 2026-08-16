import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  HUBSPOT_PRIVATE_APP_TOKEN: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().default('conqueststat@icloud.com'),
  CONTACT_FROM_EMAIL: z.string().optional(),
  CALCOM_BOOKING_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000')
});

export const env = envSchema.parse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  HUBSPOT_PRIVATE_APP_TOKEN: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || 'conqueststat@icloud.com',
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CALCOM_BOOKING_URL: process.env.CALCOM_BOOKING_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
});
