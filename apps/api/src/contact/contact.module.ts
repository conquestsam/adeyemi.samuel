import { Module } from '@nestjs/common';
import { CalendarModule } from '../calendar/calendar.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [CalendarModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
