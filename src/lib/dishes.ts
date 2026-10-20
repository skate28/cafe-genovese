import { site } from "@/content/site";
import type { MenuItem, Photo, SiteContent } from "@/content/types";
import { menuView } from "@/lib/menu";
import { galleryPhotos, heroPhoto, photoForItemId } from "@/lib/photos";

export type Dish = { item: MenuItem; photo: Photo | null };

/**
 * Dish highlights: confirmed items that have a matching photo (signatures first),
 * then signatures without photos. Placeholder items are never featured.
 */
export function dishHighlights(content: SiteContent = site, max = 4): Dish[] {
  const hero = heroPhoto(content.photos, content.heroImage);
  const exclude = hero ? [hero.src] : [];
  const items = menuView(content).flatMap((category) => category.items).filter((item) => !item.placeholder);
  const withPhoto: Dish[] = [];
  const withoutPhoto: Dish[] = [];
  for (const item of items) {
    const photo = photoForItemId(item.id, content.photos, exclude);
    if (photo) {
      withPhoto.push({ item, photo });
      exclude.push(photo.src);
    } else if (item.signature) withoutPhoto.push({ item, photo: null });
  }
  withPhoto.sort((a, b) => Number(Boolean(b.item.signature)) - Number(Boolean(a.item.signature)));
  const list = withPhoto.length >= 1 ? withPhoto : withoutPhoto;
  return list.slice(0, max);
}

/** Gallery photos not already used by the hero or dish highlights. */
export function galleryRemainder(content: SiteContent = site): Photo[] {
  const used = new Set<string>();
  const hero = heroPhoto(content.photos, content.heroImage);
  if (hero) used.add(hero.src);
  for (const dish of dishHighlights(content)) if (dish.photo) used.add(dish.photo.src);
  const remainder = galleryPhotos(content.photos).filter((photo) => !used.has(photo.src));
  return remainder.length > 0 ? remainder : galleryPhotos(content.photos);
}
