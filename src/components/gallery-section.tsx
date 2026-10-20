import { GalleryGrid } from "@/components/gallery";
import { MorningStillLife } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { galleryRemainder } from "@/lib/dishes";

export function Gallery() {
  const photos = galleryRemainder(site);

  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>Gallery</p>
          <h2 className={cn(sectionTitle, "mt-4")}>
            The cafe, <span className="italic text-brand">in daylight</span>
          </h2>
        </Reveal>
        {photos.length > 0 ? (
          <Reveal delay={0.08} className="mt-10">
            <GalleryGrid photos={photos} />
          </Reveal>
        ) : (
          <Reveal delay={0.08}>
            <div className="sunrise mt-10 grid items-center gap-6 overflow-hidden rounded-[2rem] px-6 py-10 ring-1 ring-ink/10 sm:grid-cols-[180px_1fr] sm:px-10">
              <MorningStillLife className="mx-auto max-w-[180px]" />
              <div>
                <p className="font-display text-3xl text-ink">No photos yet.</p>
                <p className="mt-3 max-w-md leading-relaxed text-ink/70">
                  This gallery only shows pictures saved in the cafe’s own image folder. Nothing stock, and nothing generated, until those photos are added.
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
