import { Bike, MapPin, Phone, ShoppingBag } from "lucide-react";

import { HoursList } from "@/components/hours-list";
import { Reveal } from "@/components/reveal";
import { ClosedNotice, ShopStatusPill } from "@/components/shop-status";
import { buttonPrimary, buttonSecondary, container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { directionsHref, mapEmbedSrc } from "@/lib/maps";
import { orderingLinks } from "@/lib/ordering";
import { photosOfCategory } from "@/lib/photos";
import Image from "next/image";

const KIND_ICON = {
  phone: Phone,
  sms: Phone,
  online: ShoppingBag,
  delivery: Bike,
} as const;

export function Visit() {
  const links = orderingLinks(site);
  const kinds = new Set(links.map((link) => link.kind));
  const orderHeading = kinds.has("delivery")
    ? "Order for pickup or delivery"
    : kinds.has("online")
      ? "Order online"
      : "Call to order";
  const tel = telHref(site.phone);
  const directions = directionsHref(site);
  const map = mapEmbedSrc(site);
  const storefront = photosOfCategory("storefront", site.photos)[0];
  const initialNow = new Date().toISOString();
  const clock = {
    hours: site.hours,
    closedNotice: site.closedNotice,
    phone: site.phone,
    afterHoursPhone: site.afterHoursPhone,
  };

  return (
    <>
      {links.length > 0 && (
        <section id="order" className="py-20 sm:py-28">
          <div className={container}>
            <Reveal>
              <p className={eyebrow}>Order</p>
              <h2 className={cn(sectionTitle, "mt-4")}>{orderHeading}</h2>
            </Reveal>
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {links.map((link) => {
                const Icon = KIND_ICON[link.kind];
                const external = /^https?:/i.test(link.href);
                return (
                  <li key={`${link.kind}-${link.href}`}>
                    <a
                      href={link.href}
                      className={link.kind === "phone" ? buttonPrimary : buttonSecondary}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section id="visit" className="linen-grain py-20 sm:py-28">
        <div className={cn(container, "grid gap-8 lg:grid-cols-2")}>
          <Reveal>
            <div className="h-full rounded-[2rem] bg-paper p-7 ring-1 ring-ink/10 sm:p-9">
              <p className={eyebrow}>Hours</p>
              <h2 className={cn(sectionTitle, "mt-4 text-5xl")}>When the doors are open</h2>
              <div className="mt-5">
                <ShopStatusPill input={clock} />
              </div>
              <ClosedNotice input={clock} initialNow={initialNow} notice={site.closedNotice} className="mt-4 text-sm leading-relaxed text-ink/65" />
              <HoursList hours={site.hours} initialNow={initialNow} />
              {site.paymentNote.trim() && <p className="mt-4 text-sm text-ink/60">{site.paymentNote}</p>}
              {site.priceRange.trim() && <p className="mt-2 text-sm text-ink/60">Price range {site.priceRange}</p>}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-paper ring-1 ring-ink/10">
              {storefront && (
                <Image
                  src={storefront.src}
                  alt={storefront.alt}
                  width={storefront.width || 900}
                  height={storefront.height || 600}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="aspect-[16/8] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <p className={eyebrow}>Location</p>
                <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">Find the cafe</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/75">{site.address.full}</p>
                {site.locationHint.trim() && <p className="mt-2 text-sm text-ink/60">{site.locationHint}</p>}
                {tel && (
                  <a href={tel} className="mt-3 inline-flex font-semibold text-brand hover:text-brand-deep">
                    {phoneLabel(site.phone)}
                  </a>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {directions && (
                    <a href={directions} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                      <MapPin className="size-4" aria-hidden="true" />
                      Get directions
                    </a>
                  )}
                </div>
              </div>
              {map && (
                <iframe
                  title={`Map of ${site.name}`}
                  src={map}
                  className="h-64 w-full border-0 grayscale-[20%] sm:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
