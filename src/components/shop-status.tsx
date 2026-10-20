"use client";

import { useEffect, useState } from "react";

import type { PhoneNumber } from "@/content/types";
import { cn } from "@/lib/cn";
import {
  getShopStatus,
  hoursFallback,
  statusLabel,
  weekdayKey,
  type ShopClockInput,
  type ShopStatus,
  type StatusTone,
} from "@/lib/hours";

/** Cafe clock. The first paint uses the server timestamp so SSR and hydration match. */
function useCafeNow(initialNow: string): Date {
  const [now, setNow] = useState(() => new Date(initialNow));

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

export function ShopStatusPill({ input, className }: { input: ShopClockInput; className?: string }) {
  const summary = hoursFallback(input.hours);
  const [live, setLive] = useState<{ label: string; tone: StatusTone } | null>(null);

  useEffect(() => {
    const update = () => setLive(statusLabel(new Date(), input));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [input]);

  const label = live?.label ?? summary;
  const tone = live?.tone ?? "neutral";

  return (
    <p
      aria-live="polite"
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full bg-paper/85 px-3.5 py-1.5 text-left text-xs font-semibold leading-snug text-ink/80 ring-1 ring-ink/10 backdrop-blur",
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0">
        {tone === "open" && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-600 opacity-60" />}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            tone === "open" && "bg-emerald-600",
            tone === "closed" && "bg-brand",
            tone === "neutral" && "bg-honey",
          )}
        />
      </span>
      <span>{label}</span>
    </p>
  );
}

/** Shown only while the cafe is actually closed. Hidden when hours are unknown or the doors are open. */
export function ClosedNotice({
  input,
  initialNow,
  notice,
  className,
}: {
  input: ShopClockInput;
  initialNow: string;
  notice: string;
  className?: string;
}) {
  const now = useCafeNow(initialNow);
  const status = getShopStatus(now, input);
  const text = notice.trim();
  if (status.isOpen !== false || !text) return null;
  return <p className={className}>{text}</p>;
}

/** Today's weekday key in the cafe timezone. Uses the server timestamp on the first paint. */
export function useTodayKey(timeZone: string, initialNow: string): string | null {
  const now = useCafeNow(initialNow);
  return weekdayKey(now, timeZone);
}

export function callNumber(input: ShopClockInput, status: ShopStatus | null): PhoneNumber {
  return status?.call ?? input.phone;
}
