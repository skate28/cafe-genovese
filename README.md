# Cafe Genovese

Pitch site for Cafe Genovese, a family-run breakfast and lunch cafe at 1515 County Rd 210 W, Ste 108, St. Johns, FL 32259 · (904) 829-0707.

Next.js (App Router), TypeScript, Tailwind CSS, framer-motion, lucide-react. Hours, menu, and ordering links in this repo are placeholders. See [CONTENT_SCHEMA.md](./CONTENT_SCHEMA.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Content contract

All business copy, hours, menu, links, and photos live in `src/content/site.ts`. Types live in `src/content/types.ts` (the Catullo's Italian contract, plus one optional field). Content can replace `site.ts` wholesale. Components read the menu through `getMenu()` / `menuView()` in `src/lib/menu.ts`.

- Empty strings, empty arrays, and `null` hide the matching UI.
- `menu[].items[].placeholder: true` marks stand-in dishes. They render only while every item is still a placeholder, under a “Sample menu” label, and they are left out of JSON-LD. They hide once a real item exists. Leave `price` unset until a price is confirmed.
- Hours with null `openTime` / `closeTime` show as “To be confirmed”. The open/closed pill stays neutral until a real window is set. Timezone is `America/New_York`.
- `orderingLinks` renders only valid links present in content. An empty array hides the order section.
- `photos` renders only files referenced as `/images/...`. An empty array shows a text gallery state. Do not add stock or generated food photos.

### Cafe Genovese addition

`features.catering?: "off" | "preview" | "live"` drives the catering Coming soon card. Absent means `"preview"`. `"live"` is kept only when `customOrders.heading` is set and a contact path exists (`customOrders.email`, or texting switched on). Otherwise the card stays a labeled preview.

`features.textPreorders` and `features.aiPhone` work the same way (`textNumber` / an sms ordering link, and `afterHoursPhone`).

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
