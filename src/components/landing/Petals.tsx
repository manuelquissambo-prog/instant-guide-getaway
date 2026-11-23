const petals = Array.from({ length: 14 }, (_, i) => ({ left: (i * 37) % 100, dur: 9 + (i % 5) * 2, delay: (i * 1.3) % 10, scale: 0.6 + (i % 4) * 0.2 }));
const sparkles = Array.from({ length: 12 }, (_, i) => ({ left: (i * 53) % 100, top: (i * 29) % 90, delay: (i * 0.7) % 3 }));

export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, scale: p.scale, opacity: 0.7 }} />
      ))}
      {sparkles.map((s, i) => (
        <span key={`s${i}`} className="sparkle" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
      ))}
    </div>
  );
}
