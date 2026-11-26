import { useEffect, useState } from "react";
import { CHECKOUT_URL, checkoutUrlWithUtms } from "@/lib/checkout";
import { trackInitiateCheckout } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

export function CTAButton({ className, children = "Get Instant Access" }: { className?: string; children?: React.ReactNode }) {
  const [href, setHref] = useState(CHECKOUT_URL);
  useEffect(() => {
    setHref(checkoutUrlWithUtms(window.location.search));
  }, []);
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackInitiateCheckout();
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const target = e.currentTarget.href;
    window.setTimeout(() => window.location.assign(target), 200);
  };
  return (
    <a href={href} target="_self" rel="noopener" onClick={onClick} className={cn("btn-cta", className)}>
      {children}
    </a>
  );
}
