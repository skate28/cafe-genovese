/**
 * Content shapes for Cafe Genovese.
 * Copied from skate28/catullos-italian `src/content/types.ts`. Type names and shapes are unchanged.
 * The only addition is the optional `FeatureFlags.catering` field, documented under
 * "CAFE GENOVESE EXTENSIONS" at the bottom of this file. Components hide or default it when absent.
 *
 * --- Original Catullo's Italian header (kept for reference) ---
 * Content shapes for Catullo's Italian.
 * Base shapes are copied UNCHANGED from Hana Yori (skate28/hana-yori src/content/types.ts) so a
 * Leads-authored site.ts written against those types drops in. Catullo's additions are all OPTIONAL
 * and listed under "CATULLO'S EXTENSIONS" at the bottom of this file; components hide or default
 * them when absent.
 *
 * --- Original Hana Yori header (kept for reference) ---
 * Content shapes for Hana Yori.
 * Copied UNCHANGED (shape-wise) from the Madame Brioche build
 * (madamebrioche/handoff/types.reference.ts), which extended the Sushi & Sub types.
 * Hana Yori needs no new fields, so this file is an exact superset of (identical to) the
 * Madame Brioche shapes and both site.ts files type-check against it.
 * All editable values live in `site.ts`. Components should tolerate empty fields.
 *
 * Hana Yori usage notes:
 *  - MenuItem `price` is left unset for sushi items whose current price could not be confirmed
 *    (render the item without a price, or "Ask for price"). Never invent one.
 *  - MenuItem `pieces` is used for sashimi (3 pc) where the menu prints it.
 *  - `customOrders` is used for the group-dinner / hibachi-party / large-takeout intake section.
 *  - `preorder` is used for the "text your takeout order" pitch (the shop takes phone orders only today).
 *  - Palette keys keep the Sushi & Sub names (ink / brand / accent / salmon / nori / rice / paper).
 *
 * Madame Brioche extension notes (kept for reference):
 *  1. PhotoCredit adds "toast-listing" and "unation-listing".
 *  2. MenuItem adds optional `priceFrom` and `isNew`.
 *  3. SiteContent adds optional `customOrders`.
 *
 * Original Sushi & Sub change notes (kept for reference):
 *  - PhotoCategory adds "food"; Photo gains a required `credit` key (no source URLs in site.ts).
 *  - MenuItem gains optional `pieces` and `number`.
 *  - New: `orderingLinks`, `seo`, `footerCredit`, `locationHint`, `mapUrl`, `priceRange`, `paymentNote`.
 *  - `rating` gains `source`. `preorder` kept for the text pre-order pitch.
 */

export type PhoneNumber = {
  /** Shown to people, e.g. "(904) 858-7032". */
  display: string;
  /** `tel:` href, e.g. "tel:+19048587032". */
  tel: string;
  /** E.164, e.g. "+19048587032". Also used for `sms:` links. */
  e164: string;
};

export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DayHours = {
  /** 24-hour "HH:MM", or null when that edge is still unknown. */
  openTime: string | null;
  closeTime: string | null;
  /** True closes the shop for the whole day. */
  closed?: boolean;
};

export type Hours = {
  /** IANA zone used to decide open vs closed. */
  timezone: string;
  /** Short public line. The per-day schedule below is what open/closed uses. */
  summary: string;
  /** Fallback window for a weekday missing from `byDay`. Null = unknown, don't assume. */
  openTime: string | null;
  closeTime: string | null;
  /** Per-day hours. This is the schedule open/closed reads. */
  byDay?: Partial<Record<Weekday, DayHours>>;
};

export type MenuItem = {
  id: string;
  /** Number printed on the shop's takeout menu, e.g. 1 for California. */
  number?: number;
  name: string;
  description?: string;
  /** Pieces per order, as printed. Omit when the menu leaves it blank. */
  pieces?: number;
  /** Dollars. Leave unset until a real price is confirmed. Never invent one. */
  price?: number;
  /** Seeded stand-in copy. Hidden once real items replace it. */
  placeholder?: boolean;
  /** EXTENSION: `price` is a starting price (size upcharges). Render as "$3.75+". */
  priceFrom?: boolean;
  /** EXTENSION: the shop labels the item "New!". Render a small badge; keep it out of `name`. */
  isNew?: boolean;
  /** CATULLO'S EXTENSION: a house signature / guest favorite. Featured in the story section. */
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  /** Shown under the heading, or when the category has no real items. */
  description?: string;
  items: MenuItem[];
};

export type PhotoCategory = "storefront" | "interior" | "food" | "menu-board" | "logo" | "drinks";

/** Where a photo came from. Full URLs live in photo-sources.md / images/MANIFEST.md, never here. */
export type PhotoCredit =
  | "google-maps-ugc"
  | "yelp-ugc"
  | "owner"
  | "nick-shoot"
  /** EXTENSION: image the business uploaded to its Toast ordering page (e.g. the logo). */
  | "toast-listing"
  /** EXTENSION: image posted on the business's UNation profile (Oct 2025). */
  | "unation-listing";

export type Photo = {
  /** Public path under `/images`, e.g. "/images/storefront-sign-dusk.jpg". */
  src: string;
  alt: string;
  category: PhotoCategory;
  credit: PhotoCredit;
  width?: number;
  height?: number;
  /** Homepage hero. The hero is a side column, not a full-bleed banner. */
  hero?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  /** Display name exactly as the platform shows it. Never a staff or owner name. */
  author?: string;
  /** Visible link text, e.g. "Google review". */
  sourceLabel: string;
  /** Reviews must link here. Testimonials without a URL are not shown. */
  sourceUrl: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type OrderingLink = {
  /** e.g. "Call to order", "DoorDash". */
  label: string;
  href: string;
  kind: "phone" | "sms" | "online" | "delivery";
};

/**
 * Key names kept from Sushi & Sub for drop-in reuse. Hana Yori roles:
 * ink = granite charcoal text, brand = logo red, accent = warm wood,
 * salmon = salmon orange (prices/badges), nori = deep nori green (secondary bands), rice = rice-paper cream page.
 * (Madame Brioche used: espresso, terracotta, counter sage, pastry gold, deep sage, cream.)
 *
 * Cafe Genovese roles (same keys):
 * ink = espresso text, brand = caramel buttons, accent = herb green,
 * salmon = honey (prices/badges), nori = dark roast bands, rice = oat linen page, paper = cards.
 */
export type Palette = {
  /** Espresso. Primary text, header/footer. */
  ink: string;
  /** Logo terracotta. Primary fills and buttons. */
  brand: string;
  brandDeep: string;
  /** Counter sage. Accent fills only — not body text on white. */
  accent: string;
  /** Pastry gold. Prices, badges ("New"), highlights. */
  salmon: string;
  /** Deep sage. Secondary sections. */
  nori: string;
  /** Cream. Page background. */
  rice: string;
  /** Cards. */
  paper: string;
};

/** EXTENSION: custom / bulk order intake (whole cakes, pastry boxes, group orders). */
export type CustomOrders = {
  heading: string;
  intro: string;
  /** Short bullet list of what can be requested. Only items the owner confirms. */
  examples: string[];
  /** e.g. "Please order at least 48 hours ahead." Empty hides it. */
  leadTimeNote: string;
  textButtonLabel: string;
  /** Body of the `sms:` link; prompts for date, item, size, servings, pickup time. */
  textMessage: string;
  /** Optional email for inquiries. Empty hides it. */
  email: string;
};

export type Rating = {
  value: number;
  count: number;
  /** e.g. "Google". */
  source: string;
};

export type SiteContent = {
  name: string;
  tagline: string;
  /** Used for the meta description fallback and Restaurant JSON-LD. */
  description: string;
  /** Free-text opening, e.g. "2004". Empty hides the line. */
  opened: string;
  address: {
    street: string;
    suite: string;
    neighborhood: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    /** Single line used for maps and the footer. */
    full: string;
  };
  /** Short wayfinding line shown under the address. */
  locationHint: string;
  /** Null coordinates keep the map on the street address. Do not guess. */
  geo: {
    latitude: number | null;
    longitude: number | null;
  };
  /** "Get directions" link. */
  mapUrl: string;
  phone: PhoneNumber;
  /** Optional after-hours / assistant number. Null uses the shop line. */
  afterHoursPhone: PhoneNumber | null;
  /** Optional number for "Text us" links. Null uses the shop line. */
  textNumber: PhoneNumber | null;
  /** Shown on the call button outside that day's open window. */
  closedNotice: string;
  hours: Hours;
  /** e.g. "$". Empty hides it. */
  priceRange: string;
  /** e.g. "Cash only". Empty hides it. */
  paymentNote: string;
  orderingLinks: OrderingLink[];
  socials: SocialLink[];
  /** Aggregate score only. Quotes belong in `testimonials`. */
  rating: Rating | null;
  testimonials: Testimonial[];
  faq: FaqItem[];
  menuNote: string;
  menu: MenuCategory[];
  photos: Photo[];
  /** Public path for the homepage hero. Wins over a photo `hero` flag. */
  heroImage?: string;
  palette: Palette;
  about: {
    heading: string;
    paragraphs: string[];
  };
  preorder: {
    heading: string;
    intro: string;
    textButtonLabel: string;
    /** Body of the `sms:` link. */
    textMessage: string;
    /** How far ahead a pickup date may be. */
    maxDaysAhead: number;
  };
  /** EXTENSION: optional custom-order section. Absent = hidden. */
  customOrders?: CustomOrders;
  /** CATULLO'S EXTENSION: "What to expect" (walk-in policy, line, wait). Absent = hidden. */
  whatToExpect?: WhatToExpect;
  /** CATULLO'S EXTENSION: pitch-only feature switches. Absent = every feature shows as "preview". */
  features?: FeatureFlags;
  /** CATULLO'S EXTENSION: extra verified links (e.g. eGift cards). Absent/empty = hidden. */
  extraLinks?: SocialLink[];
  /** CATULLO'S EXTENSION: short line under the hero title, e.g. "Handmade pasta · Since 2019". */
  heroKicker?: string;
  seo: {
    title: string;
    description: string;
  };
  /** Footer credit line. */
  footerCredit: string;
};

// ---------------------------------------------------------------------------
// CATULLO'S EXTENSIONS (all optional on SiteContent)
// ---------------------------------------------------------------------------

/**
 * "off"     = hidden everywhere.
 * "preview" = shown as a clearly labeled "Coming soon / ready to switch on" panel. No live action.
 * "live"    = the restaurant really offers it AND the data it needs is set (see FeatureFlags docs).
 *             If that data is missing the panel falls back to "preview".
 */
export type FeatureMode = "off" | "preview" | "live";

export type FeatureFlags = {
  /** Text-ahead takeout pre-orders. Live also needs `textNumber` (or an `sms` ordering link). */
  textPreorders?: FeatureMode;
  /** Join the waitlist / call-ahead. Live also needs `waitlistUrl` (or uses tap-to-call). */
  waitlist?: FeatureMode;
  /** After-hours AI phone answering. Live also needs `afterHoursPhone`. */
  aiPhone?: FeatureMode;
  /**
   * CAFE GENOVESE EXTENSION: catering / group-order requests.
   * Live also needs `customOrders.heading` plus a contact path (`customOrders.email`,
   * or texting switched on). If that data is missing the card stays "preview".
   * Absent is treated as "preview" (same default as the other feature modes).
   */
  catering?: FeatureMode;
  /** Live waitlist page (e.g. Yelp Waitlist / NextMe). Only a link the restaurant really uses. */
  waitlistUrl?: string;
};

export type ExpectItem = {
  title: string;
  body: string;
};

export type WhatToExpect = {
  heading: string;
  intro: string;
  /** e.g. "30–60 min". Empty hides the big wait-time callout. */
  typicalWait: string;
  items: ExpectItem[];
};

// ---------------------------------------------------------------------------
// CAFE GENOVESE EXTENSIONS
// ---------------------------------------------------------------------------
//
// One optional field, added for the catering Coming soon card:
//
//   FeatureFlags.catering?: FeatureMode
//
// No other types, fields, or required keys were added. Ordering links already
// exist as `SiteContent.orderingLinks` (`OrderingLink[]`). Text pre-orders use
// `features.textPreorders` + `preorder`. After-hours AI answering uses
// `features.aiPhone` + `afterHoursPhone`.
