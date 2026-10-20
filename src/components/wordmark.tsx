import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function splitName(name: string): { lead: string; tail: string } {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { lead: "", tail: "Cafe" };
  if (words.length === 1) return { lead: "", tail: words[0] };
  return { lead: words.slice(0, -1).join(" "), tail: words[words.length - 1] };
}

export function Wordmark({ tone = "ink", className }: { tone?: "ink" | "linen"; className?: string }) {
  const { lead, tail } = splitName(site.name);
  const muted = tone === "linen" ? "text-linen/70" : "text-brand-deep";
  const main = tone === "linen" ? "text-linen" : "text-ink";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      {lead && <span className={cn("text-[0.62rem] font-semibold uppercase tracking-[0.28em]", muted)}>{lead}</span>}
      <span className={cn("font-display text-[1.35rem] font-medium italic tracking-tight sm:text-[1.65rem]", main)}>{tail}</span>
    </span>
  );
}
