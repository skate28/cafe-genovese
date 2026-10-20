import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Stacked lettering modeled on the storefront sign: small “Café” over a navy serif name. */
export function signLines(name: string): { small: string; large: string } {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2 && /^caf[eé]$/i.test(words[0] ?? "")) {
    return { small: "Café", large: words.slice(1).join(" ") };
  }
  if (words.length === 0) return { small: "", large: "Cafe" };
  if (words.length === 1) return { small: "", large: words[0] ?? "Cafe" };
  return { small: words.slice(0, -1).join(" "), large: words[words.length - 1] ?? "" };
}

export function Wordmark({
  tone = "navy",
  size = "nav",
  className,
}: {
  tone?: "navy" | "cream";
  size?: "nav" | "hero";
  className?: string;
}) {
  const { small, large } = signLines(site.name);
  const color = tone === "cream" ? "text-linen" : "text-brand";
  const hero = size === "hero";

  return (
    <span className={cn("font-sign inline-flex flex-col items-start leading-none", color, className)}>
      {small ? (
        <span
          className={cn(
            "pl-[0.08em] font-normal",
            hero ? "text-2xl tracking-[0.01em] sm:text-4xl" : "text-[0.62rem] tracking-[0.01em] sm:text-[0.72rem]",
          )}
        >
          {small}
        </span>
      ) : null}
      <span
        className={cn(
          "font-bold tracking-[-0.03em]",
          hero ? "text-[clamp(3.5rem,13vw,7.25rem)] leading-[0.84]" : "-mt-px text-[1.15rem] leading-none sm:text-[1.4rem]",
        )}
      >
        {large}
      </span>
    </span>
  );
}
