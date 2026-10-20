import type { SiteContent, Weekday } from "@/content/types";
import { dayHours, formatClock } from "@/lib/hours";

const ORDER: Array<[Weekday, string]> = [
  ["mon", "Mon"],
  ["tue", "Tue"],
  ["wed", "Wed"],
  ["thu", "Thu"],
  ["fri", "Fri"],
  ["sat", "Sat"],
  ["sun", "Sun"],
];

/** "Doors open at 7 AM Mon–Fri." Built from the schedule; null when hours are unknown. */
export function nextOpeningSentence(content: SiteContent): string | null {
  const groups: Array<{ open: string; days: string[] }> = [];
  for (const [key, label] of ORDER) {
    const day = dayHours(content.hours, key);
    if (!day || day.closed || !day.openTime) continue;
    const last = groups[groups.length - 1];
    if (last && last.open === day.openTime) last.days.push(label);
    else groups.push({ open: day.openTime, days: [label] });
  }
  if (groups.length === 0) return null;
  const parts = groups.map((group) => {
    const range = group.days.length > 1 ? `${group.days[0]}–${group.days[group.days.length - 1]}` : group.days[0];
    return `${formatClock(group.open)} ${range}`;
  });
  const joined = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
  return `Doors open at ${joined}.`;
}
