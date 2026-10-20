import { MapPin, Phone, UtensilsCrossed } from "lucide-react";

import { focusRing } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { telHref } from "@/lib/contact";
import { directionsHref } from "@/lib/maps";
import { menuView } from "@/lib/menu";

/** Sticky phone bar: tap to call, plus menu and directions when those sections exist. */
export function MobileBar() {
  const tel = telHref(site.phone);
  const directions = directionsHref(site);
  const hasMenu = menuView(site).categories.length > 0;
  if (!tel && !directions) return null;

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1.4fr_1fr_1fr] gap-1.5 rounded-full bg-roast/95 p-1.5 text-linen shadow-2xl shadow-roast/40 backdrop-blur md:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      {tel ? (
        <a href={tel} className={cn("flex min-h-12 items-center justify-center gap-2 rounded-full bg-honey text-sm font-semibold text-ink", focusRing)}>
          <Phone className="size-4" aria-hidden="true" />
          Call
        </a>
      ) : (
        <span />
      )}
      {hasMenu ? (
        <a href="#menu" className={cn("flex min-h-12 items-center justify-center gap-1.5 rounded-full text-sm font-medium", focusRing)}>
          <UtensilsCrossed className="size-4" aria-hidden="true" />
          Menu
        </a>
      ) : (
        <a href="#visit" className={cn("flex min-h-12 items-center justify-center rounded-full text-sm font-medium", focusRing)}>
          Visit
        </a>
      )}
      {directions ? (
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("flex min-h-12 items-center justify-center gap-1.5 rounded-full text-sm font-medium", focusRing)}
        >
          <MapPin className="size-4" aria-hidden="true" />
          Directions
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
