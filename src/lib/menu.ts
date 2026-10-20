import { site } from "@/content/site";
import type { MenuCategory, MenuItem, SiteContent } from "@/content/types";

export function visibleItem(item: MenuItem): boolean {
  return Boolean(item.name.trim()) && !item.placeholder;
}

/** Categories with a name and either real items or a description. Placeholder items are omitted. */
export function visibleCategories(menu: MenuCategory[]): MenuCategory[] {
  return menu.flatMap((category) => {
    if (!category.name.trim()) return [];
    const items = category.items.filter(visibleItem);
    if (items.length === 0 && !category.description?.trim()) return [];
    return [{ ...category, name: category.name.trim(), items }];
  });
}

/**
 * Menu data access.
 * Components read the menu through this function (and `menuView`) so a future admin editor
 * can swap `site.ts` for another store without touching the menu UI.
 */
export function getMenu(content: SiteContent = site): MenuCategory[] {
  return content.menu ?? [];
}

export type MenuView = {
  categories: MenuCategory[];
  /**
   * True when nothing on the menu is confirmed yet, so placeholder items are shown
   * as a labeled sample. Once any real item exists, placeholders are hidden.
   */
  sample: boolean;
};

export function menuView(content: SiteContent = site): MenuView {
  const menu = getMenu(content);
  const confirmed = visibleCategories(menu);
  const hasRealItems = confirmed.some((category) => category.items.length > 0);
  if (hasRealItems) return { categories: confirmed, sample: false };

  const sample = menu.flatMap((category) => {
    if (!category.name.trim()) return [];
    const items = category.items.filter((item) => item.name.trim());
    if (items.length === 0 && !category.description?.trim()) return [];
    return [{ ...category, name: category.name.trim(), items }];
  });

  return {
    categories: sample,
    sample: sample.some((category) => category.items.length > 0),
  };
}
