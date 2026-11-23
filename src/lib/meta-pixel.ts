import { canTrack, onConsentChange } from "@/lib/consent";

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
  if (!fbq) return;
  if (typeof fbq.callMethod === "function") {
    fbq.callMethod.apply(fbq, args);
  } else if (Array.isArray(fbq.queue)) {
    fbq.queue.push(args);
  }
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
  const existing = window.fbq;
  const fbq = (
    typeof existing === "function"
      ? existing
      : (...args: unknown[]) => {
          dispatch(...args);
        }
  ) as Fbq;
  if (!Array.isArray(fbq.queue)) fbq.queue = [];
  if (typeof fbq.push !== "function") fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  loadScript();
  dispatch("init", PIXEL_ID, {}, { agent: "lovable" });
  dispatch("track", "PageView");
}

export function initMetaPixel() {
  if (typeof window === "undefined") return;
  void canTrack("advertising").then((allowed) => {
    if (allowed) initPixel();
  });
  onConsentChange((purpose, granted) => {
    if (purpose === "advertising" && granted) initPixel();
  });
}

export function trackInitiateCheckout() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  dispatch("track", "InitiateCheckout");
}
