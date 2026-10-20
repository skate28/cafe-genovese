import { Reveal } from "@/components/reveal";
import { container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { dishHighlights } from "@/lib/dishes";
import Image from "next/image";

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
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish, index) => (
            <Reveal key={dish.item.id} delay={0.05 * index}>
              <li className="overflow-hidden rounded-3xl bg-linen ring-1 ring-ink/10">
                {dish.photo && (
                  <Image
                    src={dish.photo.src}
                    alt={dish.photo.alt}
                    width={dish.photo.width || 800}
                    height={dish.photo.height || 800}
                    sizes="(min-width: 1024px) 240px, 50vw"
                    className="aspect-square w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-display text-2xl text-ink">{dish.item.name}</h3>
                  {dish.item.description?.trim() && <p className="mt-2 text-sm leading-relaxed text-ink/65">{dish.item.description}</p>}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
