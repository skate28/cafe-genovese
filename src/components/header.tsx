import { Phone } from "lucide-react";

import { SectionMenu } from "@/components/section-menu";
import { buttonPrimary, container, focusRing } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import type { NavLink } from "@/lib/nav";

export function Header({ links }: { links: NavLink[] }) {
  const tel = telHref(site.phone);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-linen/85 backdrop-blur-md">
      <div className={cn(container, "flex h-16 items-center justify-between gap-2 sm:h-[4.5rem] sm:gap-3")}>
        <a href="#content" className={cn("shrink-0 rounded-md", focusRing)} aria-label={site.name}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={cn("text-sm font-medium text-ink/75 hover:text-ink", focusRing)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {tel && (
            <a href={tel} className={cn(buttonPrimary, "hidden min-h-11 px-4 sm:inline-flex")}>
              <Phone className="size-4" aria-hidden="true" />
              {phoneLabel(site.phone)}
            </a>
          )}
          <SectionMenu links={links} />
        </div>
      </div>
    </header>
  );
}
