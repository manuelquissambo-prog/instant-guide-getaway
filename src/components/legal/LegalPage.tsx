import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-lg font-bold text-primary">Wedding <span className="italic text-gold">on a</span> Budget</Link>
          <Link to="/" className="text-sm font-bold text-primary hover:underline">← Back</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">{children}</div>
      </main>
      <footer className="px-4 py-10 text-center text-sm text-muted-foreground">
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Use</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </nav>
        <p className="mt-4">© 2026 Wedding on a Budget. All rights reserved.</p>
      </footer>
    </div>
  );
}
