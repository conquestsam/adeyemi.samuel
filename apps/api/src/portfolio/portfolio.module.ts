import { Module } from '@nestjs/common';
import { HealthController, PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  controllers: [PortfolioController, HealthController],
  providers: [PortfolioService],
  exports: [PortfolioService]
})
export class PortfolioModule {}
