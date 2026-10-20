# Cafe Genovese — architecture

Pitch site for Cafe Genovese (family-run breakfast and lunch), 1515 County Rd 210 W, Ste 108, St. Johns, FL 32259.
Next.js App Router · React · TypeScript · Tailwind CSS v4 · framer-motion · lucide-react · zod.

Folder layout matches `skate28/catullos-italian`. The visual design is separate: oat linen, caramel, honey, and herb, set in Fraunces and Figtree.

## Files

| Owner | Files |
| --- | --- |
| **Content** | `src/content/site.ts` (data only), `public/images/` |
| **Code** | `src/app/`, `src/components/`, `src/lib/`, `src/content/types.ts`, config |

Content contract: [CONTENT_SCHEMA.md](./CONTENT_SCHEMA.md). Base types are Catullo's Italian. The only addition is optional `features.catering`.

Page order: Hero (call, directions, open/closed pill) → menu marquee → Our story → favorites (only when confirmed) → Menu → What to expect (only when set) → Coming soon → Gallery → Order (only when links exist) → Hours & location → FAQ → Footer.
Phones get a sticky Call / Menu / Directions bar.

## Menu data layer

`src/lib/menu.ts`. `getMenu()` is the only read of `site.menu`. `menuView()` decides what the page shows. A future admin editor should replace `getMenu()` and leave the components alone.

Placeholder items are never rendered. JSON-LD uses `visibleItem()`, which drops placeholders. An item with a numeric `price` gets an Offer; an item without one stays unpriced.

## Feature flags

`src/lib/features.ts`. `textPreorders`, `waitlist`, `aiPhone`, and `catering` are `off | preview | live`, default `preview`. `live` drops back to `preview` unless the data it needs is set. No `sms:` link renders while texting is not live. Preview cards say “Coming soon” and do not submit anything.

## Indexing

Off until the owner approves. Only `ALLOW_INDEXING=true` enables it. Otherwise `robots.txt` disallows `/`, metadata robots is `noindex, nofollow`, and every response sends `X-Robots-Tag: noindex, nofollow`.

## Client bundle

Client components receive slices (hours, menu categories, photo src/alt). They do not import `site.ts`, so reviewer names and photo-source URLs are not pulled into client JavaScript. Do not put those values in `site.ts` either.

## Deploy

Vercel, Next.js preset, repo root. No env vars required for the pitch. Set `ALLOW_INDEXING=true` only after owner sign-off.
