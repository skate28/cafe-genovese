import { site } from "@/content/site";
import { galleryPhotos } from "@/lib/photos";
import { menuView } from "@/lib/menu";
import { orderingLinks } from "@/lib/ordering";
import { hasReviews } from "@/lib/reviews";

export type NavLink = {
  href: string;
  label: string;
};

export function primaryNav(): NavLink[] {
  const about = Boolean(site.about.heading.trim() || site.about.paragraphs.some((paragraph) => paragraph.trim()));
  return [
    { href: "#story", label: "Our story", show: about },
    { href: "#menu", label: "Menu", show: menuView(site).length > 0 },
    { href: "#expect", label: "What to expect", show: Boolean(site.whatToExpect?.items.length) },
    { href: "#reviews", label: "Reviews", show: hasReviews(site) },
    { href: "#order", label: "Order", show: orderingLinks(site).length > 0 },
    { href: "#gallery", label: "Gallery", show: true },
    { href: "#visit", label: "Visit", show: true },
  ]
    .filter((link) => link.show)
    .map(({ href, label }) => ({ href, label }));
}

export function hasGalleryPhotos(): boolean {
  return galleryPhotos(site.photos).length > 0;
}
