import { Reveal } from "@/components/reveal";
import { container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { nextOpeningSentence } from "@/lib/expect";

export function WhatToExpect() {
  const block = site.whatToExpect;
  if (!block || (block.items.length === 0 && !block.intro.trim() && !block.heading.trim())) return null;
  const opening = nextOpeningSentence(site);

  return (
    <section id="expect" className="py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>Before you come</p>
          {block.heading.trim() && <h2 className={cn(sectionTitle, "mt-4")}>{block.heading}</h2>}
          {block.intro.trim() && <p className="mt-5 text-lg leading-relaxed text-ink/70">{block.intro}</p>}
        </Reveal>
        {block.typicalWait.trim() && (
          <p className="mt-8 font-display text-4xl text-brand">{block.typicalWait}</p>
        )}
        {opening && <p className="mt-4 text-ink/70">{opening}</p>}
        {block.items.length > 0 && (
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {block.items.map((item) => (
              <li key={item.title} className="rounded-3xl bg-paper p-6 ring-1 ring-ink/10">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
