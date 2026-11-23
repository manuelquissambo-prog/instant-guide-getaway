import { Heart } from "lucide-react";
export function BookMockup() {
  return (
    <div className="animate-float mx-auto w-60 sm:w-72" aria-label="Wedding on a Budget ebook cover" role="img">
      <div className="relative aspect-[3/4] rounded-r-2xl rounded-l-md border-2 border-gold bg-gradient-to-br from-primary to-accent p-6 shadow-glow">
        <div className="absolute inset-y-0 left-3 w-px bg-gold/60" />
        <div className="flex h-full flex-col items-center justify-between text-center text-primary-foreground">
          <Heart className="h-6 w-6 text-gold" fill="currentColor" />
          <div>
            <p className="font-display text-4xl font-bold leading-tight">Wedding<br /><span className="italic text-gold">on a</span><br />Budget</p>
            <div className="gold-line my-4" />
            <p className="text-xs uppercase tracking-widest">The step-by-step guide to planning your day for under $10,000</p>
          </div>
          <p className="text-xs tracking-[0.3em] text-gold">EBOOK</p>
        </div>
      </div>
    </div>
  );
}
