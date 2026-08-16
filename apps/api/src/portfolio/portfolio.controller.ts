import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolio: PortfolioService) {}

  @Get()
  getPortfolio() {
    return this.portfolio.getPortfolio();
  }
}

@Controller()
export class HealthController {
  @Get()
  health() {
    return {
      status: 'ok',
      service: 'adeyemi-samuel-api',
      portfolio: '/portfolio',
      chat: '/ai/chat'
    };
  }
}
