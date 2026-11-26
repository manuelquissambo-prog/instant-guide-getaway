import { useEffect, useRef, useState } from "react";
import { needsAnswer, readChoice, saveChoices, onConsentChange } from "@/lib/consent";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [gpc, setGpc] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGpc((navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
    void needsAnswer(["analytics", "advertising"]).then((n) => n && setOpen(true));
    const openSettings = () => {
      setAnalytics(readChoice("analytics") === "granted");
      setAds(readChoice("advertising") === "granted");
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    const off = onConsentChange(() => {});
    return () => { window.removeEventListener("open-cookie-settings", openSettings); off(); };
  }, []);
  useEffect(() => { if (open) ref.current?.focus(); }, [open, settings]);

  if (!open) return null;
  const all = (c: "granted" | "denied") => { saveChoices({ analytics: c, advertising: c }); setOpen(false); setSettings(false); };
  const btn = "flex-1 rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-blush";

  return (
    <div ref={ref} tabIndex={-1} role="region" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-lg rounded-2xl border border-gold bg-card p-5 text-card-foreground shadow-soft outline-none">
      {!settings ? (
        <>
          <p className="text-sm">We count visits without cookies. If you accept, we also measure clicks and other actions, and use advertising cookies to measure and improve our ads. <a href="#" className="underline">Privacy Policy</a></p>
          <div className="mt-4 flex gap-2">
            <button type="button" className={btn} onClick={() => all("denied")}>Reject all</button>
            <button type="button" className={btn} onClick={() => all("granted")}>Accept all</button>
          </div>
          <button type="button" className="mt-3 w-full text-sm text-muted-foreground underline" onClick={() => { setAnalytics(false); setAds(false); setSettings(true); }}>Cookie settings</button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold">Cookie settings</h2>
          {gpc && <p className="mt-2 text-sm text-muted-foreground">Your browser's privacy signal applies, so optional tracking is off.</p>}
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex justify-between"><span>Necessary</span><span className="text-muted-foreground">Always on</span></div>
            <label className="flex justify-between"><span>Analytics, provided by Lovable</span><input type="checkbox" disabled={gpc} checked={!gpc && analytics} onChange={(e) => setAnalytics(e.target.checked)} /></label>
            <label className="flex justify-between"><span>Advertising, provided by Meta</span><input type="checkbox" disabled={gpc} checked={!gpc && ads} onChange={(e) => setAds(e.target.checked)} /></label>
          </div>
          <button type="button" className={`${btn} mt-4 w-full`} onClick={() => { saveChoices({ analytics: analytics ? "granted" : "denied", advertising: ads ? "granted" : "denied" }); setOpen(false); setSettings(false); }}>Save choices</button>
        </>
      )}
    </div>
  );
}
