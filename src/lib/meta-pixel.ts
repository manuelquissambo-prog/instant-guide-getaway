import { canTrack, onConsentChange, readChoice } from "@/lib/consent";

const PIXEL_ID = "28931126203182271";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;

function dispatch(...args: unknown[]) {
  const fbq = window.fbq;
  if (typeof fbq === "function") fbq(...args);
}

function loadScript() {
  if (document.getElementById("meta-pixel-script")) return;
  const s = document.createElement("script");
  s.id = "meta-pixel-script";
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
}

function initPixel() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  if (typeof window.fbq !== "function") {
    // Meta's standard base-code stub, so the SDK can drain the queue.
    const n = function (this: unknown) {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      if (n.callMethod) n.callMethod.apply(n, args as unknown as unknown[]);
      else n.queue!.push(args as unknown as unknown[]);
    } as unknown as Fbq;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
  }
  loadScript();
  dispatch("init", PIXEL_ID, {}, { agent: "lovable" });
  dispatch("track", "PageView");
}

export function initMetaPixel() {
  if (typeof window === "undefined") return;
  void canTrack("advertising").then((allowed) => {
    if (allowed) initPixel();
  });
  onConsentChange(() => {
    if (readChoice("advertising") === "granted") {
      if (initialized) dispatch("consent", "grant");
      else initPixel();
    } else if (initialized) {
      dispatch("consent", "revoke");
    }
  });
}

export function trackInitiateCheckout() {
  try {
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;
    if (readChoice("advertising") === "denied") return;
    dispatch("track", "InitiateCheckout");
  } catch {
    // Tracking must never block checkout.
  }
}
