type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | undefined>;
};

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('portfolio:event', { detail: event }));
}
