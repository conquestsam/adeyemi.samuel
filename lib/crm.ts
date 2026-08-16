type LeadInput = {
  name?: string;
  email?: string;
  message?: string;
  source: string;
  projectSlug?: string;
};

export async function createLead(input: LeadInput) {
  if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN || !input.email) {
    return { skipped: true, reason: 'HubSpot token or email missing' };
  }

  const { Client } = await import('@hubspot/api-client');
  const hubspot = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN });
  const [firstName, ...rest] = (input.name || '').trim().split(' ');

  await hubspot.crm.contacts.basicApi.create({
    properties: {
      email: input.email,
      firstname: firstName,
      lastname: rest.join(' '),
      message: input.message || '',
      lead_source: input.source,
      project_interest: input.projectSlug || ''
    }
  });

  return { skipped: false };
}
