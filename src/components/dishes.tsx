import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { dishHighlights } from "@/lib/dishes";
import { formatPrice } from "@/lib/money";

/** House favorites. Hidden until confirmed items are marked signature or matched to a real photo. */
export function Dishes() {
  const dishes = dishHighlights(site);
  if (dishes.length === 0) return null;

  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="favorites-heading">
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>From the kitchen</p>
          <h2 id="favorites-heading" className={cn(sectionTitle, "mt-4 max-w-xl")}>
            The plates people come back for
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {dishes.map((dish, index) => {
            const amount =
              typeof dish.item.price === "number" && Number.isFinite(dish.item.price) && dish.item.price >= 0
                ? dish.item.price
                : null;
            const price = amount == null ? "" : formatPrice(amount, Boolean(dish.item.priceFrom));
            return (
              <li key={dish.item.id} className="min-w-0">
                <Reveal delay={0.05 * index} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-linen ring-1 ring-ink/10">
                    {dish.photo && (
                      <Image
                        src={dish.photo.src}
                        alt={dish.photo.alt}
                        width={dish.photo.width || 800}
                        height={dish.photo.height || 800}
                        sizes="(min-width: 1280px) 22vw, 50vw"
                        className="aspect-square w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 items-start justify-between gap-3 p-4">
                      <h3 className="font-display text-lg leading-tight text-ink sm:text-xl">{dish.item.name}</h3>
                      {price ? (
                        <p className="shrink-0 font-display text-base tabular-nums text-brand sm:text-lg">{price}</p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
