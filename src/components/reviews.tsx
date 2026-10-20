import { Star } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { container, eyebrow, focusRing, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { hasReviews, reviewQuotes, reviewScores } from "@/lib/reviews";

export function Reviews() {
  if (!hasReviews(site)) return null;
  const scores = reviewScores(site);
  const quotes = reviewQuotes(site.testimonials);

  return (
    <section id="reviews" className="scroll-mt-24 py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>Reviews</p>
          <h2 className={cn(sectionTitle, "mt-4")}>
            What neighbors <span className="italic text-brand">say</span>
          </h2>
        </Reveal>

        {scores.length > 0 && (
          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {scores.map((rating) => (
              <li
                key={`${rating.source}-${rating.count}`}
                className="flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 ring-1 ring-ink/10"
              >
                <Star className="size-5 shrink-0 fill-honey text-honey" aria-hidden="true" />
                <div>
                  <p className="font-display text-4xl leading-none tabular-nums text-ink">{rating.value.toFixed(1)}</p>
                  <p className="mt-1 text-sm text-ink/75">
                    {rating.count.toLocaleString("en-US")} {rating.source} reviews
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {quotes.length > 0 && (
          <ul className={cn("grid gap-4", scores.length > 0 ? "mt-8" : "mt-10", quotes.length > 1 && "md:grid-cols-2")}>
            {quotes.map((item) => (
              <li key={`${item.sourceUrl}-${item.quote.slice(0, 24)}`} className="rounded-3xl bg-paper p-6 ring-1 ring-ink/10 sm:p-7">
                <blockquote>
                  <p className="font-display text-[1.65rem] leading-snug text-ink">“{item.quote}”</p>
                </blockquote>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("mt-5 inline-flex text-sm font-semibold text-brand underline-offset-4 hover:underline", focusRing)}
                >
                  {item.sourceLabel}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
