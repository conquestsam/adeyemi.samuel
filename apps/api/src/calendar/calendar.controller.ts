import { Controller, Get } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendar: CalendarService) {}

  @Get('availability')
  availability() {
    return {
      provider: process.env.CALCOM_BOOKING_URL ? 'cal.com' : 'email',
      bookingUrl: this.calendar.getBookingUrl()
    };
  }
}
