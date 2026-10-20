import Link from "next/link";

import { buttonPrimary } from "@/components/styles";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main id="content" className="sunrise flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep">404</p>
        <h1 className="mt-4 font-display text-5xl italic text-ink">That page isn’t on the menu.</h1>
        <p className="mt-4 text-lg text-ink/70">Hours, the menu, and directions are on the home page.</p>
        <Link href="/" className={`${buttonPrimary} mt-8`}>
          Back to {site.name}
        </Link>
      </div>
    </main>
  );
}
