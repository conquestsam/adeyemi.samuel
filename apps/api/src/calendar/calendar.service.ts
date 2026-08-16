import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  getBookingUrl() {
    return process.env.CALCOM_BOOKING_URL || 'mailto:conqueststat@icloud.com?subject=Project%20conversation';
  }
}
