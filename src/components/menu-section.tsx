import { Phone } from "lucide-react";

import { MenuTabs } from "@/components/menu-tabs";
import { Reveal } from "@/components/reveal";
import { buttonPrimary, container, eyebrow, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { telHref } from "@/lib/contact";
import { menuView } from "@/lib/menu";

export function MenuSection() {
  const view = menuView(site);
  if (view.categories.length === 0) return null;
  const tel = telHref(site.phone);

  return (
    <section id="menu" className="bg-paper py-20 sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>The menu</p>
          <h2 className={cn(sectionTitle, "mt-4")}>
            Breakfast through <span className="italic text-brand">lunch</span>
          </h2>
          {site.menuNote.trim() && <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">{site.menuNote}</p>}
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="overflow-hidden rounded-[2rem] bg-linen p-3 shadow-[0_30px_80px_-48px] shadow-roast ring-1 ring-ink/10 sm:p-4">
            <div className="napkin rounded-[1.4rem] bg-linen/40 px-4 py-8 sm:px-8 sm:py-10">
              {view.sample && (
                <p className="mb-6 inline-flex rounded-full bg-honey px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Sample menu · placeholder · not final
                </p>
              )}
              <MenuTabs categories={view.categories} />
              {tel && (
                <a href={tel} className={cn(buttonPrimary, "mt-10")}>
                  <Phone className="size-4" aria-hidden="true" />
                  Call for the current menu
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
