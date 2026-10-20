"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import type { PhoneNumber } from "@/content/types";
import { cn } from "@/lib/cn";
import { getShopStatus, hoursConfirmed, nextOpeningLabel, weekdayKey, type ShopClockInput, type ShopStatus } from "@/lib/hours";

const noopSubscribe = () => () => {};

export function useShopStatus(input: ShopClockInput): ShopStatus | null {
  const [status, setStatus] = useState<ShopStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date(), input));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [input]);

  return status;
}

export function ShopStatusPill({ input, className }: { input: ShopClockInput; className?: string }) {
  const status = useShopStatus(input);
  const summary = input.hours.summary.trim() || "Hours coming soon";
  let label = summary;
  let short = "Hours coming soon";
  let tone: "open" | "closed" | "neutral" = "neutral";

  if (status?.isOpen === true) {
    label = status.todayWindow ? `Open now · until ${status.todayWindow.split("–")[1]}` : "Open now";
    short = "Open now";
    tone = "open";
  } else if (status?.isOpen === false) {
    const next = nextOpeningLabel(new Date(), input.hours);
    label = next ? `Closed now · ${next}` : "Closed now";
    short = "Closed now";
    tone = "closed";
  } else if (!hoursConfirmed(input.hours)) {
    label = summary;
    short = "Hours coming soon";
  }

  return (
    <p
      aria-live="polite"
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full bg-paper/85 px-3.5 py-1.5 text-left text-xs font-semibold leading-snug text-ink/80 ring-1 ring-ink/10 backdrop-blur",
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0">
        {tone === "open" && <span className="absolute inline-flex size-full animate-ping rounded-full bg-herb opacity-60" />}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            tone === "open" && "bg-herb",
            tone === "closed" && "bg-brand",
            tone === "neutral" && "bg-honey",
          )}
        />
      </span>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </p>
  );
}

/** Today's weekday key in the cafe timezone. Null on the server so static HTML stays neutral. */
export function useTodayKey(timeZone: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => weekdayKey(new Date(), timeZone),
    () => null,
  );
}

export function callNumber(input: ShopClockInput, status: ShopStatus | null): PhoneNumber {
  return status?.call ?? input.phone;
}
