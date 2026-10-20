# Cafe Genovese

## Ownership

- **Content** owns `src/content/site.ts` and `public/images/`.
- **Code** owns everything else. See ARCHITECTURE.md and CONTENT_SCHEMA.md.

Never invent prices, hours, reviews, ordering links, or photos. No AI or stock photos of the food or the cafe. No owner personal names, reviewer names, or photo-source URLs in the client bundle. Coming soon cards stay previews until their feature flag is `"live"` and the data that flag needs is set. Indexing stays off until the owner approves (`ALLOW_INDEXING=true`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
