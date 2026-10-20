import type { Rating, SiteContent, Testimonial } from "@/content/types";
import { safeHref } from "@/lib/ordering";

export type ReviewScore = {
  value: number;
  count: number;
  source: string;
};

export type ReviewQuote = {
  quote: string;
  sourceLabel: string;
  sourceUrl: string;
};

function score(rating: Rating | null | undefined): ReviewScore | null {
  if (!rating || !Number.isFinite(rating.value)) return null;
  const source = rating.source.trim();
  if (!source || !Number.isFinite(rating.count)) return null;
  return { value: rating.value, count: rating.count, source };
}

/** `rating` first, then each `extraRatings` entry. Incomplete rows are dropped. */
export function reviewScores(content: SiteContent): ReviewScore[] {
  const primary = score(content.rating);
  const extras = (content.extraRatings ?? []).flatMap((rating) => {
    const row = score(rating);
    return row ? [row] : [];
  });
  return primary ? [primary, ...extras] : extras;
}

function reviewHref(url: string): string | null {
  const href = safeHref(url);
  if (!href || !/^https?:/i.test(href)) return null;
  return href;
}

/**
 * Quotes that have a real source link. `author` is never copied onto the result.
 * Testimonials without an http(s) `sourceUrl` are skipped.
 */
export function reviewQuotes(testimonials: Testimonial[]): ReviewQuote[] {
  return testimonials.flatMap((item) => {
    const quote = item.quote.trim();
    const sourceUrl = reviewHref(item.sourceUrl);
    if (!quote || !sourceUrl) return [];
    const sourceLabel = item.sourceLabel.trim() || "Review";
    return [{ quote, sourceLabel, sourceUrl }];
  });
}

export function hasReviews(content: SiteContent): boolean {
  return reviewScores(content).length > 0 || reviewQuotes(content.testimonials).length > 0;
}
