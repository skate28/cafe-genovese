import { Reveal } from "@/components/reveal";
import { container, eyebrow, focusRing, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Faq() {
  const items = site.faq.filter((item) => item.question.trim() && item.answer.trim());
  if (items.length === 0) return null;

  return (
    <section id="faq" className="bg-paper py-20 sm:py-28">
      <div className={cn(container, "grid gap-10 lg:grid-cols-[0.8fr_1.2fr]")}>
        <Reveal>
          <p className={eyebrow}>Questions</p>
          <h2 className={cn(sectionTitle, "mt-4")}>Good things to know</h2>
        </Reveal>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className={cn("cursor-pointer list-none py-4 font-display text-2xl text-ink", focusRing)}>
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span aria-hidden="true" className="text-brand transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="max-w-xl pb-5 leading-relaxed text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
