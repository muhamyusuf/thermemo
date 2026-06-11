type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, payload?: EventPayload) => void;
    clarity?: (command: "event", name: string) => void;
  }
}

export function trackEvent(name: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, payload);
  window.clarity?.("event", name);
}
