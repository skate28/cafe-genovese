import { site } from "@/content/site";
import { menuView } from "@/lib/menu";

export function Marquee() {
  const view = menuView(site);
  const names = view.categories.flatMap((category) => [category.name, ...category.items.map((item) => item.name)]);
  if (names.length === 0) return null;
  const line = names.join("  ·  ");

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
