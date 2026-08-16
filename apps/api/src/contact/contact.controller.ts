import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CalendarService } from '../calendar/calendar.service';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly contact: ContactService,
    private readonly calendar: CalendarService
  ) {}

  @Post()
  @HttpCode(200)
  async submit(@Body() body: { name: string; email: string; message: string; company?: string; source?: string }) {
    if (body.company) return { ok: true, bookingUrl: this.calendar.getBookingUrl() };
    await this.contact.submit(body);
    return { ok: true, bookingUrl: this.calendar.getBookingUrl() };
  }
}
