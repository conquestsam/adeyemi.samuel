import { Resend } from 'resend';
import { env } from '@/lib/env';

type ContactEmail = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(input: ContactEmail) {
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
    return { skipped: true, reason: 'Resend credentials missing' };
  }

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject: `Portfolio inquiry from ${input.name}`,
    text: `${input.name} <${input.email}> wrote:\n\n${input.message}`
  });

  return { skipped: false };
}
