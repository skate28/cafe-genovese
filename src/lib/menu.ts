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

/** What the page shows. Placeholder items are dropped and are never rendered as a sample menu. */
export function menuView(content: SiteContent = site): MenuCategory[] {
  return visibleCategories(getMenu(content));
}
