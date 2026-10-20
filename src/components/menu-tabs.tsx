"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { focusRing } from "@/components/styles";
import type { MenuCategory } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/money";

function CategoryBody({ category }: { category: MenuCategory }) {
  return (
    <div>
      {category.description?.trim() ? <p className="max-w-2xl text-ink/70">{category.description}</p> : null}
      <ul className="mt-6 grid gap-x-12 gap-y-5 md:grid-cols-2">
        {category.items.map((item, index) => {
          const price = typeof item.price === "number" && Number.isFinite(item.price) ? item.price : null;
          return (
            <li key={`${category.id}-${item.id}-${index}`} className="break-inside-avoid border-b border-line/80 pb-4">
              <div className="flex items-baseline gap-3">
                <span className="min-w-0 font-display text-xl text-ink">
                  {item.number ? <span className="mr-2 text-sm text-ink/40">{item.number}.</span> : null}
                  {item.name}
                </span>
                {price != null ? (
                  <>
                    <span className="leader" aria-hidden="true" />
                    <span className="shrink-0 font-display text-lg text-brand">{formatPrice(price, item.priceFrom)}</span>
                  </>
                ) : null}
              </div>
              {(item.signature || item.isNew || item.pieces) && (
                <p className="mt-1 flex flex-wrap gap-3 text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                  {item.signature ? <span className="text-brand">House favorite</span> : null}
                  {item.isNew ? <span className="text-herb">New</span> : null}
                  {item.pieces ? <span className="text-ink/45">{item.pieces} pc</span> : null}
                </p>
              )}
              {item.description?.trim() ? <p className="mt-1 text-sm leading-relaxed text-ink/65">{item.description}</p> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const current = categories.find((category) => category.id === active) ?? categories[0];

  useEffect(() => {
    const list = listRef.current;
    const tab = current ? document.getElementById(`tab-${current.id}`) : null;
    if (!list || !tab) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [current, reduce]);

  if (!current) return null;

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Menu categories"
        className="sticky top-16 z-30 -mx-4 flex gap-2 overflow-x-auto bg-linen/95 px-4 py-3 backdrop-blur sm:top-[4.5rem] sm:mx-0 sm:rounded-full sm:px-2"
      >
        {categories.map((category) => {
          const selected = category.id === current.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`panel-${category.id}`}
              onClick={() => setActive(category.id)}
              className={cn(
                "shrink-0 snap-start rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                selected ? "bg-brand text-linen" : "bg-paper text-ink/75 ring-1 ring-ink/10 hover:text-ink",
                focusRing,
              )}
            >
              {category.name}
              <span className={cn("ml-2 text-xs tabular-nums", selected ? "text-linen/70" : "text-ink/40")}>{category.items.length}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="pt-6"
        >
          <CategoryBody category={current} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
