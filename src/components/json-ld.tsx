import { site } from "@/content/site";
import type { MenuItem, Weekday } from "@/content/types";
import { getMenu, visibleItem } from "@/lib/menu";
import { offerPrice } from "@/lib/money";
import { safeHref } from "@/lib/ordering";
import { heroPhoto, logoPhoto } from "@/lib/photos";
import { getSiteUrl } from "@/lib/site-url";

const DAY_URLS: Array<[Weekday, string]> = [
  ["sun", "https://schema.org/Sunday"],
  ["mon", "https://schema.org/Monday"],
  ["tue", "https://schema.org/Tuesday"],
  ["wed", "https://schema.org/Wednesday"],
  ["thu", "https://schema.org/Thursday"],
  ["fri", "https://schema.org/Friday"],
  ["sat", "https://schema.org/Saturday"],
];

function openingHours() {
  const { hours } = site;
  const specs = DAY_URLS.flatMap(([key, dayOfWeek]) => {
    const day = hours.byDay?.[key];
    if (day?.closed) return [];
    const opens = day?.openTime ?? (day ? null : hours.openTime);
    const closes = day?.closeTime ?? (day ? null : hours.closeTime);
    if (!opens || !closes) return [];
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes }];
  });
  return specs.length > 0 ? specs : undefined;
}

function menuItemDescription(item: MenuItem): string | undefined {
  const parts = [item.description?.trim(), item.pieces ? `${item.pieces} pieces` : ""].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

function restaurantMenu(url: string) {
  const sections = getMenu(site)
    .map((category) => {
      const items = category.items.filter(visibleItem);
      if (!category.name.trim() || items.length === 0) return null;
      return {
        "@type": "MenuSection",
        name: category.name.trim(),
        description: category.description?.trim() || undefined,
        hasMenuItem: items.map((item) => {
          const description = menuItemDescription(item);
          const entry: Record<string, unknown> = {
            "@type": "MenuItem",
            name: item.name.trim(),
          };
          if (description) entry.description = description;
          const price = typeof item.price === "number" ? offerPrice(item.price) : null;
          if (price) {
            entry.offers = {
              "@type": "Offer",
              price,
              priceCurrency: "USD",
              ...(item.priceFrom ? { description: "Starting price" } : {}),
            };
          }
          return entry;
        }),
      };
    })
    .filter((section) => section !== null);

  if (sections.length === 0) return undefined;
  return {
    "@type": "Menu",
    name: `${site.name} menu`,
    url: `${url}/#menu`,
    description: site.menuNote.trim() || undefined,
    hasMenuSection: sections,
  };
}

function faqPage() {
  const items = site.faq.filter((item) => item.question.trim() && item.answer.trim());
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function JsonLd() {
  const url = getSiteUrl();
  const sameAs = site.socials.map((social) => safeHref(social.href)).filter((href) => href !== null);
  const hours = openingHours();
  const menu = restaurantMenu(url);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: site.name,
    url,
    servesCuisine: ["Breakfast", "Lunch"],
    description: site.seo.description.trim() || site.description,
  };

  const hero = heroPhoto(site.photos, site.heroImage);
  if (hero) data.image = `${url}${hero.src.startsWith("/") ? hero.src : `/${hero.src}`}`;
  const logo = logoPhoto(site.photos);
  if (logo) data.logo = `${url}${logo.src.startsWith("/") ? logo.src : `/${logo.src}`}`;
  if (site.whatToExpect) data.acceptsReservations = false;
  if (site.phone.e164.trim()) data.telephone = site.phone.e164.trim();
  if (site.priceRange.trim()) data.priceRange = site.priceRange.trim();

  const street = [site.address.street, site.address.suite].map((part) => part.trim()).filter(Boolean).join(", ");
  if (street || site.address.city.trim()) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: street || undefined,
      addressLocality: site.address.city.trim() || undefined,
      addressRegion: site.address.region.trim() || undefined,
      postalCode: site.address.postalCode.trim() || undefined,
      addressCountry: site.address.country.trim() || undefined,
    };
  }

  const map = safeHref(site.mapUrl);
  if (map) data.hasMap = map;
  if (sameAs.length > 0) data.sameAs = sameAs;

  if (site.geo.latitude != null && site.geo.longitude != null) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    };
  }
  if (hours) data.openingHoursSpecification = hours;
  if (menu) data.hasMenu = menu;

  const blocks = [data, faqPage()].filter((block) => block !== null);

  return (
    <>
      {blocks.map((block) => (
        <script
          key={String(block["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
