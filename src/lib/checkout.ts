export const CHECKOUT_URL = "https://pay.hotmart.com/U108457245Q";
export const SHOW_TESTIMONIALS = false;
export const PRICE = "$27";
export const OLD_PRICE: string = "";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/** Checkout link with the visitor's UTM parameters appended (browser only). */
export function checkoutUrlWithUtms(search: string): string {
  const from = new URLSearchParams(search);
  const url = new URL(CHECKOUT_URL);
  for (const k of UTM_KEYS) {
    const v = from.get(k);
    if (v) url.searchParams.set(k, v);
  }
  return url.toString();
}
