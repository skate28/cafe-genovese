import { GalleryGrid, type GalleryShot } from "@/components/gallery";
import { Reveal } from "@/components/reveal";
import { container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { galleryPhotos } from "@/lib/photos";

function shots(): GalleryShot[] {
  return galleryPhotos(site.photos).map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    category: photo.category,
  }));
}

export function Gallery() {
  const photos = shots();
  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-24 py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>Gallery</p>
          <h2 className={cn(sectionTitle, "mt-4")}>
            From the counter, <span className="italic text-brand">and the grill</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <GalleryGrid photos={photos} />
        </Reveal>
      </div>
    </section>
  );
}
