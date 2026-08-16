import { env } from '@/lib/env';

export function getBookingUrl() {
  return env.CALCOM_BOOKING_URL || 'mailto:conqueststat@icloud.com?subject=Project%20conversation';
}
