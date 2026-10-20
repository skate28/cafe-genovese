import type { Photo } from "@/content/types";

export function photoFileName(src: string): string {
  const path = src.trim().split("?")[0]?.split("#")[0] ?? "";
  return (path.split("/").pop() ?? "").toLowerCase();
}

export function isPublicPhoto(photo: Photo): boolean {
  const src = photo.src.trim();
  if (!src.startsWith("/images/") || !photo.alt.trim()) return false;
  if (/^https?:/i.test(src)) return false;
  return true;
}

export function photoDimensions(photo: Pick<Photo, "width" | "height" | "category">): {
  width: number;
  height: number;
} {
  if (photo.width && photo.width > 0 && photo.height && photo.height > 0) {
    return { width: photo.width, height: photo.height };
  }
  if (photo.category === "logo") return { width: 720, height: 720 };
  if (photo.category === "storefront" || photo.category === "menu-board") return { width: 700, height: 500 };
  return { width: 750, height: 1000 };
}

export function publicPhotos(photos: Photo[]): Photo[] {
  return photos.filter(isPublicPhoto);
}

/** Gallery skips the logo tile. It is the header mark, not a scene. */
export function galleryPhotos(photos: Photo[]): Photo[] {
  return publicPhotos(photos).filter((photo) => photo.category !== "logo");
}

export function photosOfCategory(category: Photo["category"], photos: Photo[]): Photo[] {
  return publicPhotos(photos).filter((photo) => photo.category === category);
}

/** Side-column hero. `heroImage` wins over a photo `hero` flag. */
export function heroPhoto(photos: Photo[], heroImage?: string): Photo | null {
  const explicit = heroImage?.trim();
  if (explicit) {
    const match = photos.find((photo) => photo.src.trim() === explicit);
    if (!match || !isPublicPhoto(match)) return null;
    return match;
  }
  return photos.find((photo) => photo.hero && isPublicPhoto(photo)) ?? null;
}

/** The site logo photo (category "logo"), if any. */
export function logoPhoto(photos: Photo[]): Photo | null {
  return publicPhotos(photos).find((photo) => photo.category === "logo") ?? null;
}

function slug(src: string): string {
  return photoFileName(src).replace(/\.[a-z0-9]+$/, "");
}

/**
 * Photo for a menu item, matched by file name: `/images/<item.id>.jpg` or `/images/<item.id>-anything.jpg`.
 * Food and drink photos only.
 */
export function photoForItemId(id: string, photos: Photo[], exclude: string[] = []): Photo | null {
  const food = publicPhotos(photos).filter((photo) => photo.category === "food" || photo.category === "drinks");
  const candidates = [
    ...food.filter((photo) => slug(photo.src) === id),
    ...food.filter((photo) => slug(photo.src).startsWith(`${id}-`)),
  ];
  return candidates.find((photo) => !exclude.includes(photo.src)) ?? candidates[0] ?? null;
}
