export function sanitizeMessage(message: string) {
  return message.trim().slice(0, 2000);
}
