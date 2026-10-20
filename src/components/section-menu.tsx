"use client";

import { focusRing } from "@/components/styles";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/nav";

/** Phone navigation. Closes after a section link so the list does not cover the page. */
export function SectionMenu({ links }: { links: NavLink[] }) {
  return (
    <details className="relative lg:hidden">
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center rounded-full px-3 text-sm font-semibold ring-1 ring-ink/15",
          focusRing,
        )}
      >
        Sections
      </summary>
      <nav aria-label="Sections" className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-ink/10 bg-paper p-2 shadow-xl">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn("block rounded-xl px-3 py-3 text-sm font-medium hover:bg-linen", focusRing)}
            onClick={(event) => {
              const menu = event.currentTarget.closest("details");
              window.setTimeout(() => {
                if (menu) menu.open = false;
              }, 0);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
