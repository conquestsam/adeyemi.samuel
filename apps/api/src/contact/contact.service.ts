import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { Client } from '@hubspot/api-client';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  source?: string;
};

@Injectable()
export class ContactService {
  async submit(payload: ContactPayload) {
    await Promise.allSettled([this.sendEmail(payload), this.createLead(payload)]);
    return { ok: true };
  }

  private async sendEmail(payload: ContactPayload) {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || 'conqueststat@icloud.com',
      replyTo: payload.email,
      subject: `Portfolio inquiry from ${payload.name}`,
      text: `${payload.name} <${payload.email}> wrote:\n\n${payload.message}`
    });
  }

  private async createLead(payload: ContactPayload) {
    if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) return;

    const hubspot = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN });
    const [firstName, ...rest] = payload.name.trim().split(' ');
    await hubspot.crm.contacts.basicApi.create({
      properties: {
        email: payload.email,
        firstname: firstName,
        lastname: rest.join(' '),
        message: payload.message,
        lead_source: payload.source || 'contact_form'
      }
    });
  }
}
