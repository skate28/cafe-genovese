# Content schema — Cafe Genovese

Content owns `src/content/site.ts` and `public/images/`. Replace `site.ts` wholesale; components never hard-code business copy, prices, hours, or photos.

- Types: `src/content/types.ts`. Names and shapes match skate28/catullos-italian. `site.ts` imports them from `./types`.
- Cafe Genovese additions, documented at the bottom of `types.ts`: optional `features.catering`, and optional `extraRatings` (`Rating[]`).
- `site.ts` stays data only: `export const site: SiteContent = { ... }`.
- Empty strings, empty arrays, and `null` hide the matching UI.
- Mark anything unconfirmed with `// TODO(Leads): verify`.

## Rules

- Do not invent prices, hours, reviews, ordering links, or social URLs.
- No owner or staff personal names, reviewer names, or photo-source URLs in `site.ts` (it can ship to the browser).
- Photo `credit` is a key only. Keep source URLs out of the repo’s client code.
- No AI-generated or stock photos of the food or the cafe. Real files only, in `public/images/`, referenced as `/images/<file>`.
- Testimonials need an http(s) `sourceUrl` or they are not shown. `author` is never rendered.

## Fields

| Field | Renders as | Empty → |
| --- | --- | --- |
| `name`, `tagline` | Wordmark, hero, footer | tagline hidden |
| `description` | Meta fallback, JSON-LD | — |
| `opened` | “Since” line | hidden |
| `address.*`, `address.full` | Hero, visit, footer, map, JSON-LD | — |
| `locationHint` | Line under the address | hidden |
| `geo.latitude/longitude` | Map pin + JSON-LD. Null uses the street address | address embed |
| `mapUrl` | Directions buttons | buttons hidden |
| `phone` | Every call button | — |
| `afterHoursPhone` | Not shown. Stored for a possible later answering line | hidden |
| `textNumber` | Not shown. No text-ordering link is rendered | hidden |
| `closedNotice` | Shown on the hours card only while the cafe is closed | hidden |
| `hours` | Weekly table, today highlighted. The pill starts as `hours.summary`, then shows open/closed in America/New_York | em dash |
| `hours.summary` | Pill text before the live clock, and the footer | schedule, or “Hours coming soon” only when nothing is set |
| `priceRange`, `paymentNote` | Small lines on the hours card | hidden |
| `orderingLinks[]` | Order section. Invalid or blank hrefs are dropped | section hidden |
| `socials[]`, `extraLinks[]` | Footer | hidden |
| `rating` | Hero line, and the first Reviews badge (score, count, source). No Review JSON-LD | hidden |
| `extraRatings[]` | Reviews badges after `rating` | hidden |
| `testimonials[]` | Review quotes plus a `sourceLabel` link to `sourceUrl`. `author` is never rendered. Rows without an http(s) `sourceUrl` are skipped | section hidden when this, `rating`, and `extraRatings` are all empty |
| `faq[]` | Accordion | section hidden |
| `menuNote` | Under the menu heading | hidden |
| `menu[]` | Tabbed menu. Read through `getMenu()` / `menuView()` | section hidden |
| `menu[].items[].price` | Right-aligned price. Under $1 renders as cents (`75¢`). `priceFrom` adds a plus. Included as an Offer in JSON-LD | price omitted |
| `menu[].items[].placeholder` | Never shown, and omitted from JSON-LD | — |
| `photos[]`, `heroImage` | Hero, story, favorites, gallery, visit. Logo category is the header mark, not the gallery | illustrated hero, empty gallery note |
| `palette` | CSS variables | fallbacks in `globals.css` |
| `about` | Our story | section hidden |
| `preorder` | Not shown | — |
| `customOrders` | Not shown | hidden |
| `whatToExpect` | “Before you come” | section hidden |
| `features.textPreorders`, `features.aiPhone`, `features.catering`, `features.waitlist` | Not shown, whatever the value | hidden |
| `heroKicker` | Line above the hero title | hidden |
| `seo.title/description` | Title, meta, Open Graph | name / description |
| `footerCredit` | Last footer line, linked to https://nicklopacki.com | “Built by nicklopacki.com” |

The homepage does not render a Coming soon section, text ordering, catering, or an after-hours phone card.

## Menu storage

UI code calls `getMenu()` in `src/lib/menu.ts`. Replacing that function is how an admin menu editor would attach later. Do not read `site.menu` from components.
