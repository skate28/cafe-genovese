import { MapPin, Phone } from "lucide-react";

import { MorningStillLife } from "@/components/ornaments";
import { ShopStatusPill } from "@/components/shop-status";
import { buttonPrimary, buttonSecondary, container } from "@/components/styles";
import { splitName } from "@/components/wordmark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { directionsHref } from "@/lib/maps";
import { heroPhoto } from "@/lib/photos";
import Image from "next/image";

export function Hero() {
  const { lead, tail } = splitName(site.name);
  const tel = telHref(site.phone);
  const directions = directionsHref(site);
  const photo = heroPhoto(site.photos, site.heroImage);
  const clock = {
    hours: site.hours,
    closedNotice: site.closedNotice,
    phone: site.phone,
    afterHoursPhone: site.afterHoursPhone,
  };

  return (
    <section className="sunrise linen-grain relative overflow-hidden">
      <div className={cn(container, "grid items-center gap-10 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6")}>
        <div>
          <ShopStatusPill input={clock} />
          {site.heroKicker?.trim() && (
            <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-brand-deep">{site.heroKicker}</p>
          )}
          <h1 className="mt-3 font-display text-[clamp(3.4rem,15vw,7.5rem)] font-medium leading-[0.84] tracking-[-0.04em] text-ink">
            {lead && <span className="block text-[0.42em] font-sans font-semibold uppercase tracking-[0.18em] text-brand-deep">{lead}</span>}
            <span className="block italic">{tail}</span>
          </h1>
          {site.tagline.trim() && <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">{site.tagline}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {tel && (
              <a href={tel} className={buttonPrimary}>
                <Phone className="size-4" aria-hidden="true" />
                Call {phoneLabel(site.phone)}
              </a>
            )}
            {directions && (
              <a href={directions} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                <MapPin className="size-4" aria-hidden="true" />
                Directions
              </a>
            )}
          </div>
          {site.address.full.trim() && <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/60">{site.address.full}</p>}
          {site.rating && site.rating.count > 0 && (
            <p className="mt-4 text-sm text-ink/60">
              {site.rating.value.toFixed(1)} · {site.rating.count.toLocaleString("en-US")} {site.rating.source} reviews
            </p>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {photo ? (
            <div className="overflow-hidden rounded-[2rem] bg-paper shadow-[0_30px_70px_-40px] shadow-roast ring-1 ring-ink/10">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width || 900}
                height={photo.height || 1100}
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          ) : (
            <MorningStillLife />
          )}
        </div>
      </div>
    </section>
  );
}
