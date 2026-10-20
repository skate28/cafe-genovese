import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { ShopStatusPill } from "@/components/shop-status";
import { buttonLight, container } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { directionsHref } from "@/lib/maps";
import { heroPhoto } from "@/lib/photos";

const buttonOnPhoto = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold ring-1 ring-inset ring-linen/70 text-linen transition hover:bg-linen hover:text-ink focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-linen`;

export function Hero() {
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
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-roast text-linen">
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-roast via-roast/75 to-roast/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-roast/80 via-roast/35 to-transparent" aria-hidden="true" />
      <div className={cn(container, "relative z-10 flex min-h-[92svh] flex-col justify-end pb-16 pt-16 sm:pb-20")}>
        <div className="max-w-3xl">
          <ShopStatusPill input={clock} />
          {site.heroKicker?.trim() ? (
            <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-honey">{site.heroKicker}</p>
          ) : null}
          <h1 className="mt-3">
            <Wordmark tone="cream" size="hero" />
          </h1>
          <span className="mt-5 block h-1 w-16 rounded-full bg-honey" aria-hidden="true" />
          {site.tagline.trim() ? <p className="mt-6 max-w-xl text-lg leading-relaxed text-linen/90">{site.tagline}</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {tel ? (
              <a href={tel} className={buttonLight}>
                <Phone className="size-4" aria-hidden="true" />
                Call {phoneLabel(site.phone)}
              </a>
            ) : null}
            {directions ? (
              <a href={directions} target="_blank" rel="noopener noreferrer" className={buttonOnPhoto}>
                <MapPin className="size-4" aria-hidden="true" />
                Directions
              </a>
            ) : null}
          </div>
          {site.address.full.trim() ? <p className="mt-6 max-w-md text-sm leading-relaxed text-linen/80">{site.address.full}</p> : null}
          {site.rating && site.rating.count > 0 ? (
            <p className="mt-4 text-sm text-linen/75">
              {site.rating.value.toFixed(1)} · {site.rating.count.toLocaleString("en-US")} {site.rating.source} reviews
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
