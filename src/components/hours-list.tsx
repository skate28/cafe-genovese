"use client";

import { useTodayKey } from "@/components/shop-status";
import type { Hours, Weekday } from "@/content/types";
import { cn } from "@/lib/cn";
import { dayHours, formatClock, hoursConfirmed } from "@/lib/hours";

const DAYS: Array<[Weekday, string]> = [
  ["mon", "Monday"],
  ["tue", "Tuesday"],
  ["wed", "Wednesday"],
  ["thu", "Thursday"],
  ["fri", "Friday"],
  ["sat", "Saturday"],
  ["sun", "Sunday"],
];

function rowValue(hours: Hours, key: Weekday): string {
  if (!hoursConfirmed(hours)) return "To be confirmed";
  const day = dayHours(hours, key);
  if (day?.closed) return "Closed";
  if (day?.openTime && day.closeTime) return `${formatClock(day.openTime)} – ${formatClock(day.closeTime)}`;
  return "To be confirmed";
}

export function HoursList({ hours }: { hours: Hours }) {
  const today = useTodayKey(hours.timezone || "America/New_York");

  return (
    <dl className="mt-2 divide-y divide-line">
      {DAYS.map(([key, label]) => {
        const value = rowValue(hours, key);
        const isToday = key === today;
        return (
          <div
            key={key}
            className={cn(
              "flex items-center justify-between gap-4 py-3 text-[0.95rem]",
              isToday ? "text-ink" : "text-ink/70",
            )}
          >
            <dt className={cn("flex items-center gap-2", isToday && "font-semibold")}>
              {label}
              {isToday && (
                <span className="rounded-full bg-honey px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-ink">
                  Today
                </span>
              )}
            </dt>
            <dd className={cn("text-right tabular-nums", value === "Closed" && "text-ink/45", isToday && "font-semibold")}>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
