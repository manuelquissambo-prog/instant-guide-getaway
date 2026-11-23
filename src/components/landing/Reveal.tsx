import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", visible && "is-visible", className)}>
      {children}
    </Tag>
  );
}
