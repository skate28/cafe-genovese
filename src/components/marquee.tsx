import type { MenuCategory } from "@/content/types";
import { site } from "@/content/site";
import { menuView } from "@/lib/menu";

/** Category headings are skipped when the category has a single item, and no label is repeated. */
function stripLabels(categories: MenuCategory[]): string[] {
  const seen = new Set<string>();
  const labels: string[] = [];
  const add = (label: string) => {
    const trimmed = label.trim();
    const key = trimmed.toLocaleLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    labels.push(trimmed);
  };

  for (const category of categories) {
    if (category.items.length !== 1) add(category.name);
    for (const item of category.items) add(item.name);
  }
  return labels;
}

export function Marquee() {
  const labels = stripLabels(menuView(site));
  if (labels.length === 0) return null;
  const line = labels.join("  ·  ");

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-herb text-linen" aria-hidden="true">
      <div className="animate-marquee flex w-max py-3">
        {[0, 1].map((copy) => (
          <p key={copy} className="px-6 font-display text-lg italic tracking-tight">
            {line}
            <span className="px-6">·</span>
          </p>
        ))}
      </div>
    </div>
  );
}
