import type { SiteContent } from "./types";

/**
 * Cafe Genovese — the only editable content file. Data only.
 *
 * Shapes: ./types (the Catullo's Italian contract, plus optional `features.catering`).
 * See CONTENT_SCHEMA.md. Mark anything unconfirmed with `// TODO(Leads): verify`.
 *
 * This file is placeholders only. Hours are unconfirmed (null times, not a guessed schedule).
 * Menu items are `placeholder: true` and have no prices. Ordering links and social URLs are
 * empty until a real link is confirmed. Do not add owner names, reviewer names, or photo-source URLs.
 */

export const site: SiteContent = {
  name: "Cafe Genovese",
  tagline: "A family table for breakfast and lunch in St. Johns.",
  description:
    "Cafe Genovese is a family-run breakfast and lunch cafe at 1515 County Rd 210 W, Ste 108, St. Johns, FL 32259. Call (904) 829-0707. Hours and the menu are still being confirmed.",
  // TODO(Leads): year the cafe opened, if the owner wants it shown. Empty hides the line.
  opened: "",

  address: {
    street: "1515 County Rd 210 W",
    suite: "Ste 108",
    // TODO(Leads): neighborhood or plaza name, only if the owner confirms it.
    neighborhood: "",
    city: "St. Johns",
    region: "FL",
    postalCode: "32259",
    country: "US",
    full: "1515 County Rd 210 W, Ste 108, St. Johns, FL 32259",
  },
  // TODO(Leads): a short wayfinding line (plaza name, parking). Empty hides it.
  locationHint: "",

  // TODO(Leads): pin coordinates only from a confirmed map listing. Null keeps the map on the street address.
  geo: {
    latitude: null,
    longitude: null,
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Cafe%20Genovese%201515%20County%20Rd%20210%20W%20Ste%20108%20St.%20Johns%20FL%2032259",

  phone: {
    display: "(904) 829-0707",
    tel: "tel:+19048290707",
    e164: "+19048290707",
  },

  // TODO(Leads): set only when an after-hours line is actually live.
  afterHoursPhone: null,
  // TODO(Leads): set only when the cafe can receive order texts.
  textNumber: null,

  closedNotice: "Hours aren't confirmed yet. Call and we'll tell you if the doors are open.",

  // PLACEHOLDER. Times stay null so the page does not invent an open/closed schedule.
  // TODO(Leads): replace summary and byDay with verified hours. Use 24-hour "HH:MM". Set closed: true for days the cafe is dark.
  hours: {
    timezone: "America/New_York",
    summary: "Hours coming soon",
    openTime: null,
    closeTime: null,
    byDay: {
      mon: { openTime: null, closeTime: null },
      tue: { openTime: null, closeTime: null },
      wed: { openTime: null, closeTime: null },
      thu: { openTime: null, closeTime: null },
      fri: { openTime: null, closeTime: null },
      sat: { openTime: null, closeTime: null },
      sun: { openTime: null, closeTime: null },
    },
  },

  // TODO(Leads): "$", "$$", etc. Empty hides it.
  priceRange: "",
  // TODO(Leads): payment note, only if confirmed. Empty hides it.
  paymentNote: "",

  // TODO(Leads): add DoorDash, Toast, or other links only after the owner confirms them. Empty hides the section.
  orderingLinks: [],

  // TODO(Leads): the cafe's own Facebook (and any other) URL. Do not guess.
  socials: [],

  // TODO(Leads): aggregate rating only, after a recount. Quotes stay out of this file.
  rating: null,
  testimonials: [],

  // TODO(Leads): replace with answers the owner confirms. The two below only restate the address and phone.
  faq: [
    {
      question: "Where is Cafe Genovese?",
      answer: "1515 County Rd 210 W, Ste 108, St. Johns, FL 32259.",
    },
    {
      question: "How do I reach the cafe?",
      answer: "Call (904) 829-0707. Online ordering links will show here only after the cafe confirms them.",
    },
  ],

  menuNote:
    "Placeholder menu for layout only. These are not the cafe's dishes, and prices are left blank on purpose.",

  // PLACEHOLDER structure. Every item is placeholder: true and has no price.
  // TODO(Leads): replace this array with the real menu. Leave price unset until it is confirmed.
  menu: [
    {
      id: "morning-plates",
      name: "Morning plates",
      description: "Placeholder category for breakfast plates.",
      items: [
        {
          id: "sample-breakfast-plate",
          name: "Breakfast plate",
          description: "Placeholder. Eggs, a side, and toast — wording to be replaced.",
          placeholder: true,
        },
        {
          id: "sample-breakfast-burrito",
          name: "Breakfast burrito",
          description: "Placeholder. A filled tortilla. Not a confirmed dish.",
          placeholder: true,
        },
        {
          id: "sample-biscuits",
          name: "Biscuits and gravy",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-avocado-toast",
          name: "Avocado toast",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
      ],
    },
    {
      id: "eggs",
      name: "Eggs",
      description: "Placeholder category for egg dishes.",
      items: [
        {
          id: "sample-two-eggs",
          name: "Two eggs any style",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-omelette",
          name: "Build-your-own omelette",
          description: "Placeholder. Fillings are not confirmed.",
          placeholder: true,
        },
        {
          id: "sample-eggs-benedict",
          name: "Eggs Benedict",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-scramble",
          name: "Vegetable scramble",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
      ],
    },
    {
      id: "griddle",
      name: "From the griddle",
      description: "Placeholder category for pancakes, waffles, and French toast.",
      items: [
        {
          id: "sample-pancakes",
          name: "Buttermilk pancakes",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-waffle",
          name: "Belgian waffle",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-french-toast",
          name: "French toast",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-short-stack",
          name: "Short stack",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
      ],
    },
    {
      id: "sandwiches-salads",
      name: "Sandwiches & salads",
      description: "Placeholder category for the lunch side of the menu.",
      items: [
        {
          id: "sample-breakfast-sandwich",
          name: "Breakfast sandwich",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-club",
          name: "Cafe club",
          description: "Placeholder. Not a confirmed sandwich.",
          placeholder: true,
        },
        {
          id: "sample-grilled-cheese",
          name: "Grilled cheese",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-garden-salad",
          name: "Garden salad",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-chicken-salad",
          name: "Chicken salad",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
      ],
    },
    {
      id: "drinks",
      name: "Coffee & drinks",
      description: "Placeholder category for coffee and other drinks.",
      items: [
        {
          id: "sample-drip-coffee",
          name: "Drip coffee",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-espresso",
          name: "Espresso",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-tea",
          name: "Hot tea",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
        {
          id: "sample-juice",
          name: "Fresh juice",
          description: "Placeholder layout copy.",
          placeholder: true,
        },
      ],
    },
  ],

  // Real photos only, saved under public/images/ and referenced as /images/<file>.
  // None yet. Do not add stock or generated food photos.
  photos: [],

  palette: {
    ink: "#2A211C",
    brand: "#9A4524",
    brandDeep: "#6E3016",
    accent: "#2F5D45",
    salmon: "#E4B33A",
    nori: "#231C17",
    rice: "#F4EFE6",
    paper: "#FFFCF8",
  },

  about: {
    heading: "A family cafe, still writing its story",
    paragraphs: [
      "Placeholder. Cafe Genovese is a family-run breakfast and lunch cafe in St. Johns. This paragraph is stand-in copy for the pitch and should be replaced with the family's own words.",
      "Placeholder. The dining room, the regulars, and how the day starts — none of that is filled in yet. No names are included here on purpose.",
    ],
  },

  preorder: {
    heading: "Text pre-orders",
    intro:
      "A preview of texting a pickup order ahead of time. The cafe does not take text orders yet, so this card cannot send a message.",
    textButtonLabel: "Text your order",
    textMessage: "Hi Cafe Genovese — I'd like to place a pickup order.",
    maxDaysAhead: 7,
  },

  // Pitch previews only. "live" is ignored until the data that feature needs is set.
  // waitlist is off so this pitch shows catering instead of a waitlist the cafe has not asked for.
  features: {
    textPreorders: "preview",
    waitlist: "off",
    catering: "preview",
    aiPhone: "preview",
  },

  heroKicker: "Breakfast & lunch · St. Johns",

  seo: {
    title: "Cafe Genovese · Breakfast & lunch in St. Johns",
    description:
      "Family-run breakfast and lunch at 1515 County Rd 210 W, Ste 108, St. Johns, FL 32259. Call (904) 829-0707. Hours and menu coming soon.",
  },

  footerCredit: "Built by nicklopacki.com",
};
