# Cafe Genovese

Pitch site for Cafe Genovese, a family-run breakfast and lunch cafe at 1515 County Rd 210 W, Ste 108, St. Johns, FL 32259 · (904) 829-0707.

Next.js (App Router), TypeScript, Tailwind CSS, framer-motion, lucide-react. Hours, the 77-item menu, photos, and the call-only ordering link live in `src/content/site.ts`. See [CONTENT_SCHEMA.md](./CONTENT_SCHEMA.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Content contract

All business copy, hours, menu, links, and photos live in `src/content/site.ts`. Types live in `src/content/types.ts` (the Catullo's Italian contract, plus optional `features.catering` and `extraRatings`). Content can replace `site.ts` wholesale. Components read the menu through `getMenu()` / `menuView()` in `src/lib/menu.ts`.

- Empty strings, empty arrays, and `null` hide the matching UI.
- `menu[].items[].placeholder: true` marks stand-in dishes. They are omitted from the page and from JSON-LD. Leave `price` unset to hide the price. `priceFrom` renders as a starting price (`$8.99+`). Amounts under $1 render in cents (`75¢`).
- The hours pill shows `hours.summary` in the server HTML, then the live open/closed status in `America/New_York` after the page loads. A day without a window renders as an em dash.
- `orderingLinks` renders only valid links present in content. An empty array hides the order section.
- `photos` renders only files referenced as `/images/...`. An empty array hides the gallery. Do not add stock or generated food photos. Photo `credit` values stay in content and are not rendered.

### Cafe Genovese additions

`extraRatings?: Rating[]` lists more platform scores (Yelp, Tripadvisor) after `rating` in Reviews. Absent or empty hides those badges. Quotes come from `testimonials` and need a source link. Reviewer names are not rendered.

`features.catering`, `features.textPreorders`, `features.aiPhone`, and `features.waitlist` are not shown.

## Noindex

Search indexing is **off** until the owner signs off. The single switch is the environment variable `ALLOW_INDEXING`.

Leave it unset (or anything other than `true`) and the site:

- sends `X-Robots-Tag: noindex, nofollow` on every response
- sets robots metadata to `noindex, nofollow`
- serves `robots.txt` with `Disallow: /`

Set `ALLOW_INDEXING=true` and redeploy to remove all three. See `.env.example`.

## Deploy

Vercel, Next.js preset, repository root. No environment variables are required for the pitch preview.

```bash
npx vercel
```

Production deploys should keep `ALLOW_INDEXING` unset until the owner approves the site. `NEXT_PUBLIC_SITE_URL` is optional; on Vercel the project URL is used for canonical links and JSON-LD.
