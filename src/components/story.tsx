import { HerbRule } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { photosOfCategory } from "@/lib/photos";
import Image from "next/image";

export function Story() {
  const paragraphs = site.about.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
  const heading = site.about.heading.trim();
  if (!heading && paragraphs.length === 0) return null;
  const interiors = photosOfCategory("interior", site.photos).slice(0, 2);

  return (
    <section id="story" className="py-20 sm:py-28">
      <div className={cn(container, "grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]")}>
        <Reveal>
          <p className={eyebrow}>Our story</p>
          {heading && <h2 className={cn(sectionTitle, "mt-4")}>{heading}</h2>}
          <HerbRule className="mt-6" />
          {site.opened.trim() && <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Since {site.opened.trim()}</p>}
        </Reveal>
        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.05 * index}>
              <p className={cn("leading-relaxed text-ink/75", index === 0 ? "font-display text-2xl leading-snug text-ink sm:text-3xl" : "text-base")}>
                {paragraph}
              </p>
            </Reveal>
          ))}
          {interiors.length > 0 && (
            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              {interiors.map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width || 800}
                  height={photo.height || 600}
                  sizes="(min-width: 1024px) 280px, 100vw"
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
