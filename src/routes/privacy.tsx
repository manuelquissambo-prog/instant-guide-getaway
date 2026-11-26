import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { SUPPORT_EMAIL } from "@/lib/site";

const T = "Privacy Policy | Wedding on a Budget";
const D = "How Wedding on a Budget handles visitor data, cookies, analytics and the Meta Pixel.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: T }, { name: "description", content: D },
      { property: "og:title", content: T }, { property: "og:description", content: D },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains what data this website collects, why, and the choices you have.</p>
      <h2>Purchases</h2>
      <p>Payments are processed by Hotmart on their own checkout page. We never see your card details. Hotmart shares the details needed to deliver your ebook and handle refunds.</p>
      <h2>Visit statistics</h2>
      <p>Lovable's analytics uses no cookies, stores nothing on your device, doesn't keep IP addresses and doesn't identify you. Lovable collects this data for us. <a className="underline" href="https://lovable.dev/privacy">Lovable's privacy policy</a> explains how it handles it.</p>
      <p>It records the pages visited, where visitors came from, their country, browser, operating system and device type, how long they stay, how fast pages load, errors, and which buttons and links are clicked. Detailed data is kept for 90 days and daily summaries for a year.</p>
      <p>Where we ask first, we record clicks and other actions only after you accept. Elsewhere, we record them until you say no. If your browser sends a Global Privacy Control signal, we never record them. Your choice is saved in your browser for 6 months after you reject and 12 months after you accept.</p>
      <p>We count basic visit statistics for every visitor, whatever you choose on our cookie banner: pages visited, time on page, page speed and errors. This uses no cookies and doesn't identify you.</p>
      <h2>Meta Pixel and advertising cookies</h2>
      <p>We use the Meta Pixel, provided by Meta Platforms, to measure and improve our Facebook and Instagram ads. It sets cookies (such as _fbp) and sends Meta the pages you view, how far you scroll, and when you click to go to checkout, together with technical data like your browser and IP address. We do not send your name, email or other personal details in these events. Meta may use this data for ad measurement, optimization and its own purposes under <a className="underline" href="https://www.facebook.com/privacy/policy/">Meta's privacy policy</a>.</p>
      <p>In the EU/EEA, the UK, Switzerland and Canada, the Meta Pixel loads only after you accept advertising cookies. Elsewhere it loads unless you reject it. A Global Privacy Control signal always blocks it. You can change or withdraw your choice at any time with the "Cookie settings" link in the page footer.</p>
      <h2>Necessary cookies</h2>
      <p>Our hosting provider sets one strictly necessary cookie. It makes sure every page you load comes from the same version of the site. It holds no information about you and expires within 7 days. Your cookie choices are also saved in your browser's local storage.</p>
      <h2>Contact</h2>
      <p>Questions about your data? Email <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
    </LegalPage>
  );
}
