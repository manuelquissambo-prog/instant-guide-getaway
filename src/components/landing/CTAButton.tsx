import { CHECKOUT_URL } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export function CTAButton({ className, children = "Get Instant Access" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a href={CHECKOUT_URL} target="_self" rel="noopener" className={cn("btn-cta", className)}>
      {children}
    </a>
  );
}
