import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, MessageSquareWarning, Compass, Download, ListChecks, PartyPopper, Heart, ShieldCheck, Lock, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CTAButton } from "@/components/landing/CTAButton";
import { Reveal } from "@/components/landing/Reveal";
import { Petals } from "@/components/landing/Petals";
import { Donut } from "@/components/landing/Donut";
import { BookMockup } from "@/components/landing/BookMockup";
import { OLD_PRICE, PRICE, SHOW_TESTIMONIALS } from "@/lib/checkout";

// Replace with your photo URL to show it in the About the author section.
const AUTHOR_PHOTO_URL = "";

const TITLE = "Wedding on a Budget | Plan Your Day for Under $10,000";
const DESC = "The simple step-by-step ebook that shows engaged couples where to spend, where to save, and how to plan a beautiful wedding for under $10,000.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Divider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-3 py-2" aria-hidden>
      <div className="gold-line flex-1" /><Heart className="h-4 w-4 text-gold" fill="currentColor" /><div className="gold-line flex-1" />
    </div>
  );
}

function Check({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="11" className="fill-blush stroke-gold" strokeWidth="1.5" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" className="check-path stroke-primary" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: `${delay}ms` }} />
    </svg>
  );
}

function Rings() {
  return (
    <svg viewBox="0 0 80 50" className="h-12 w-20" aria-hidden>
      <g className="animate-spin-slow" style={{ transformOrigin: "30px 25px" }}><circle cx="30" cy="25" r="15" fill="none" stroke="var(--gold)" strokeWidth="4" /></g>
      <circle cx="50" cy="25" r="15" fill="none" stroke="var(--gold)" strokeWidth="4" opacity=".85" />
      <circle cx="30" cy="10" r="2.5" fill="var(--primary-foreground)" />
    </svg>
  );
}

const inside = [
  "A complete budget breakdown for a wedding under $10,000",
  "A step-by-step planning checklist, from engagement to wedding day",
  "Money-saving tips for venue, catering, photography, attire and decor",
  "A printable checklist to keep you organized",
  "Instant digital download, read on phone, tablet or computer",
];
const forYou = [
  "You just got engaged and don't know where to start",
  "You want a beautiful wedding without going into debt",
  "You want a clear, practical plan instead of vague advice",
  "You want to save money without losing the magic",
];
const faqs = [
  ["How do I receive the ebook?", "Instantly by email after purchase."],
  ["Can I read it on my phone?", "Yes, on any phone, tablet or computer."],
  ["Is this a physical book?", "No, it's a digital ebook (PDF)."],
  ["What if I'm not satisfied?", "You're covered by our 7-day money-back guarantee."],
  ["Is payment secure?", "Yes, checkout is processed securely by Hotmart."],
];

function Index() {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pb-24 md:pb-0">
      <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
        Instant digital download · Read on any device
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="font-display text-lg font-bold text-primary">Wedding <span className="italic text-gold">on a</span> Budget</span>
          <a href="#pricing" className="rounded-full border border-gold px-4 py-2 text-sm font-bold text-primary transition hover:bg-blush">Get the Guide</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-hero relative overflow-hidden">
          <Petals />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
            <Reveal className="text-center md:text-left">
              <div className="mb-4 flex justify-center md:justify-start"><Rings /></div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Plan the Wedding of Your Dreams for <span className="italic text-gold">Under $10,000</span></h1>
              <p className="mt-6 text-lg text-muted-foreground">The simple step-by-step guide that shows you where to spend, where to save, and how to stay on budget, without sacrificing the day you've always imagined.</p>
              <div className="mt-8"><CTAButton /></div>
              <p className="mt-4 text-sm text-muted-foreground">Instant download · 7-Day Money-Back Guarantee · Secure checkout</p>
            </Reveal>
            <BookMockup />
          </div>
        </section>

        {/* Problem */}
        <section className="mx-auto max-w-5xl px-4 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Planning a wedding shouldn't mean starting your marriage in debt.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">Between venues, catering, photography and decor, the costs add up fast. Most couples feel overwhelmed and afraid of overspending. You deserve a clear plan, not more stress.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[[AlertTriangle, "Costs spiral out of control"], [MessageSquareWarning, "Too much conflicting advice"], [Compass, "No clear starting point"]].map(([Icon, t], i) => {
              const I = Icon as typeof Heart;
              return (
                <Reveal key={t as string} delay={i * 120} className="rounded-2xl bg-card p-8 shadow-soft transition hover:-translate-y-1">
                  <I className="mx-auto h-9 w-9 text-gold" /><p className="mt-4 font-display text-xl font-semibold text-primary">{t as string}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Solution + inside */}
        <section className="bg-blush px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Divider />
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Meet Wedding on a Budget</h2>
              <p className="mt-5 text-lg text-muted-foreground">A practical, easy-to-follow ebook that walks you through every stage of planning, from your first budget to your last detail, so you can celebrate beautifully and stay in control of your money.</p>
            </Reveal>
            <h3 className="mt-14 text-2xl font-bold">What's inside</h3>
            <ul className="mt-6 space-y-4 text-left">
              {inside.map((t, i) => (
                <Reveal as="li" key={t} delay={i * 120} className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
                  <Check delay={i * 150 + 300} /><span className="text-lg">{t}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Budget */}
        <section className="mx-auto max-w-5xl px-4 py-20">
          <Reveal className="text-center"><h2 className="text-3xl font-bold sm:text-4xl">See where your money goes</h2><Divider /></Reveal>
          <div className="mt-10"><Donut /></div>
        </section>

        {/* How it works */}
        <section className="bg-blush px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal><h2 className="text-3xl font-bold sm:text-4xl">How it works</h2></Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[[Download, "Get instant access"], [ListChecks, "Follow the step-by-step plan"], [PartyPopper, "Enjoy your dream wedding, stress-free"]].map(([Icon, t], i) => {
                const I = Icon as typeof Heart;
                return (
                  <Reveal key={t as string} delay={i * 120} className="relative rounded-2xl bg-card p-8 shadow-soft transition hover:-translate-y-1">
                    <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                    <I className="mx-auto h-9 w-9 text-gold" /><p className="mt-4 font-display text-xl font-semibold text-primary">{t as string}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who */}
        <section className="mx-auto max-w-3xl px-4 py-20">
          <Reveal className="text-center"><h2 className="text-3xl font-bold sm:text-4xl">This guide is perfect for you if...</h2></Reveal>
          <ul className="mt-10 space-y-4">
            {forYou.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 100} className="flex items-start gap-4 border-b border-border pb-4">
                <Heart className="mt-1 h-5 w-5 shrink-0 text-rose" fill="currentColor" /><span className="text-lg">{t}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 bg-blush px-4 py-20">
          <Reveal className="mx-auto max-w-md rounded-3xl border-2 border-gold bg-card p-8 text-center shadow-glow sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Wedding on a Budget — Complete Guide</h2>
            <div className="mt-6 flex items-baseline justify-center gap-3">
              {OLD_PRICE && <span className="text-xl text-muted-foreground line-through">{OLD_PRICE}</span>}
              <span className="font-display text-5xl font-bold text-primary">{PRICE}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">One-time payment · Instant access</p>
            <ul className="mt-6 space-y-2 text-left">
              {["The complete ebook", "Full budget breakdown", "Printable checklist"].map((t) => (
                <li key={t} className="flex items-center gap-3"><Heart className="h-4 w-4 text-gold" fill="currentColor" />{t}</li>
              ))}
            </ul>
            <CTAButton className="mt-8 w-full" />
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"><Lock className="h-4 w-4 shrink-0" />Secure checkout · Instant delivery by email · 7-Day Money-Back Guarantee</p>
          </Reveal>
        </section>

        {/* Guarantee */}
        <section className="mx-auto max-w-3xl px-4 py-20">
          <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-card p-8 text-center shadow-soft sm:flex-row sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-double border-gold bg-blush"><ShieldCheck className="h-12 w-12 text-gold" /></div>
            <p className="text-lg"><strong className="font-display text-xl text-primary">7-Day Money-Back Guarantee:</strong> If the guide isn't what you expected, let us know within 7 days and we'll refund you in full. No questions asked.</p>
          </Reveal>
        </section>

        {SHOW_TESTIMONIALS && <section aria-label="Testimonials" />}

        {/* Author */}
        <section className="bg-blush px-4 py-20">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row">
            {AUTHOR_PHOTO_URL ? (
              <img src={AUTHOR_PHOTO_URL} alt="Author of Wedding on a Budget" loading="lazy" className="h-32 w-32 shrink-0 rounded-full border-2 border-gold object-cover" />
            ) : (
              <div role="img" aria-label="Author photo placeholder" className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card"><User className="h-14 w-14 text-muted-foreground" /></div>
            )}
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold">About the author</h2>
              <p className="mt-3 text-lg text-muted-foreground">I created Wedding on a Budget after seeing how many couples feel pressured to overspend on their big day. This guide gives you a clear, simple plan to celebrate beautifully while staying in control of your money.</p>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-20">
          <Reveal className="text-center"><h2 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h2></Reveal>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q!}>
                <AccordionTrigger className="text-left text-lg font-semibold text-primary">{q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-primary px-4 py-24 text-center">
          <Petals />
          <Reveal className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-5xl">Your dream wedding is closer <span className="italic text-gold">(and cheaper)</span> than you think.</h2>
            <div className="mt-10"><CTAButton /></div>
          </Reveal>
        </section>
      </main>

      <footer className="px-4 py-10 text-center text-sm text-muted-foreground">
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Use</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} className="hover:text-primary">Cookie settings</button>
        </nav>
        <p className="mt-4">© 2026 Wedding on a Budget. All rights reserved.</p>
      </footer>

      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-gold bg-background/95 p-3 backdrop-blur transition-transform md:hidden ${sticky ? "translate-y-0" : "translate-y-full"}`}>
        <CTAButton className="w-full" />
      </div>
    </div>
  );
}
