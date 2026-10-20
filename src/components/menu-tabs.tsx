"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { focusRing } from "@/components/styles";
import type { MenuCategory } from "@/content/types";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/money";

function CategoryBody({ category }: { category: MenuCategory }) {
  return (
    <div>
      {category.description?.trim() && <p className="max-w-2xl text-ink/65">{category.description}</p>}
      <ul className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {category.items.map((item, index) => (
          <li key={`${category.id}-${item.id}-${index}`} className="break-inside-avoid">
            <div className="flex items-baseline gap-3">
              <span className="min-w-0 font-display text-xl text-ink">
                {item.number ? <span className="mr-2 text-sm text-ink/40">{item.number}.</span> : null}
                {item.name}
              </span>
              {typeof item.price === "number" && Number.isFinite(item.price) && (
                <>
                  <span className="leader" aria-hidden="true" />
                  <span className="shrink-0 font-display text-lg text-brand-deep">{formatPrice(item.price, item.priceFrom)}</span>
                </>
              )}
            </div>
            {(item.signature || item.isNew || item.pieces) && (
              <p className="mt-1 flex flex-wrap gap-3 text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                {item.signature && <span className="text-brand">House favorite</span>}
                {item.isNew && <span className="text-herb">New</span>}
                {item.pieces ? <span className="text-ink/45">{item.pieces} pc</span> : null}
              </p>
            )}
            {item.description?.trim() && <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const reduce = useReducedMotion();
  const current = categories.find((category) => category.id === active) ?? categories[0];
  if (!current) return null;

  return (
    <div>
      <div role="tablist" aria-label="Menu categories" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
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
                "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                selected ? "bg-ink text-linen" : "bg-paper text-ink/70 ring-1 ring-ink/10 hover:text-ink",
                focusRing,
              )}
            >
              {category.name}
              <span className={cn("ml-2 text-xs", selected ? "text-linen/70" : "text-ink/40")}>{category.items.length}</span>
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
