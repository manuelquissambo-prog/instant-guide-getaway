import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

const data = [
  { label: "Venue & catering", pct: 45, color: "var(--chart-1)" },
  { label: "Photography", pct: 15, color: "var(--chart-2)" },
  { label: "Attire & beauty", pct: 12, color: "var(--chart-3)" },
  { label: "Decor & flowers", pct: 10, color: "var(--chart-4)" },
  { label: "Music & extras", pct: 18, color: "var(--chart-5)" },
];

export function Donut() {
  const { ref, visible } = useInView<HTMLDivElement>();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let n = 0;
    const id = setInterval(() => { n += 250; setTotal(Math.min(n, 10000)); if (n >= 10000) clearInterval(id); }, 30);
    return () => clearInterval(id);
  }, [visible]);
  const r = 70, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-2">
      <div className="relative mx-auto w-64">
        <svg viewBox="0 0 180 180" className="-rotate-90" role="img" aria-label="Sample wedding budget donut chart">
          {data.map((d) => {
            const len = (d.pct / 100) * c;
            const el = (
              <circle key={d.label} cx="90" cy="90" r={r} fill="none" stroke={d.color} strokeWidth="22"
                strokeDasharray={`${visible ? len : 0} ${c}`} strokeDashoffset={-offset}
                style={{ transition: "stroke-dasharray 1.4s ease" }} />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-primary">${total.toLocaleString("en-US")}</span>
          <span className="text-sm text-muted-foreground">sample total</span>
        </div>
      </div>
      <ul className="space-y-3">
        {data.map((d) => (
          <li key={d.label} className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-soft">
            <span className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ background: d.color }} />{d.label}</span>
            <span className="font-bold text-primary">{d.pct}%</span>
          </li>
        ))}
        <li className="pt-2 text-sm italic text-muted-foreground">Illustrative example. Full breakdown inside the guide.</li>
      </ul>
    </div>
  );
}
