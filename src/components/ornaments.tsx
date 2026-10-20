import { cn } from "@/lib/cn";

export function HerbRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" className={cn("h-6 w-36 text-herb", className)} aria-hidden="true">
      <path d="M8 14h144" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70 14c2-10 8-12 14-8-6 2-8 8-8 14 4-8 10-10 16-6" fill="currentColor" />
    </svg>
  );
}
