import { Injectable } from '@nestjs/common';
import { experience, profile, projects, quickPrompts, stack } from './portfolio.data';

@Injectable()
export class PortfolioService {
  getPortfolio() {
    return { profile, projects, experience, stack, quickPrompts };
  }

  getProjects() {
    return projects;
  }

  buildContext() {
    return JSON.stringify(
      {
        ...this.getPortfolio(),
        rules: [
          'Answer primarily as Adeyemi Samuel in first person.',
          'Act as a portfolio guide when opening project links, demos, testing paths, contact, CRM, or calendar booking.',
          'Use the old portfolio only as content and project reference, never as layout direction.',
          'Do not invent metrics, clients, dates, employers, user counts, revenue, or availability.',
          'When projects have liveUrl, repoUrl, or testUrl, offer them as links/buttons.'
        ]
      },
      null,
      2
    );
  }
}
