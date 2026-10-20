import { container, focusRing } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { directionsHref } from "@/lib/maps";
import { safeHref } from "@/lib/ordering";
import { logoPhoto } from "@/lib/photos";
import Image from "next/image";

export function Footer() {
  const tel = telHref(site.phone);
  const directions = directionsHref(site);
  const links = [...site.socials, ...(site.extraLinks ?? [])].flatMap((link) => {
    const href = safeHref(link.href);
    return href && link.label.trim() ? [{ label: link.label.trim(), href }] : [];
  });
  const logo = logoPhoto(site.photos);
  const credit = site.footerCredit.trim() || "Built by nicklopacki.com";

  return (
    <footer className="bg-roast pb-32 pt-16 text-linen md:pb-12">
      <div className={cn(container, "grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]")}>
        <div>
          <div className="flex items-center gap-4">
            {logo && (
              <Image src={logo.src} alt={logo.alt} width={64} height={64} className="size-16 rounded-2xl object-cover ring-1 ring-linen/20" />
            )}
            <Wordmark tone="cream" />
          </div>
          {site.tagline.trim() && <p className="mt-4 max-w-sm text-linen/70">{site.tagline}</p>}
        </div>
        <div className="space-y-2 text-sm text-linen/75">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-honey">Visit</p>
          <p>{site.address.full}</p>
          {directions && (
            <a href={directions} target="_blank" rel="noopener noreferrer" className={cn("inline-block underline-offset-4 hover:underline", focusRing)}>
              Get directions
            </a>
          )}
          {tel && (
            <p>
              <a href={tel} className={cn("font-semibold text-linen underline-offset-4 hover:underline", focusRing)}>
                {phoneLabel(site.phone)}
              </a>
            </p>
          )}
        </div>
        <div className="space-y-2 text-sm text-linen/75">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-honey">Hours</p>
          <p>{site.hours.summary.trim() || "Hours coming soon"}</p>
          {links.length > 0 && (
            <ul className="space-y-2 pt-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={cn("underline-offset-4 hover:underline", focusRing)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={cn(container, "mt-12 border-t border-linen/15 pt-6")}>
        <p className="text-xs text-linen/50">
          © {site.name}
          {site.opened.trim() ? ` · Est. ${site.opened.trim()}` : ""}
        </p>
        <p className="mt-3 text-xs text-linen/70">
          <a href="https://nicklopacki.com" className={cn("underline-offset-4 hover:text-linen hover:underline", focusRing)}>
            {credit}
          </a>
        </p>
      </div>
    </footer>
  );
}
