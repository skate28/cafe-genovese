export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand";

export const buttonBase = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-[0.95rem] font-semibold leading-none transition duration-200 ${focusRing}`;

/** Caramel fill, linen label. Primary action. */
export const buttonPrimary = `${buttonBase} bg-brand text-linen shadow-[0_12px_28px_-16px] shadow-brand-deep hover:bg-brand-deep`;

/** Quiet outline on linen. */
export const buttonSecondary = `${buttonBase} bg-paper/80 text-ink ring-1 ring-inset ring-ink/15 hover:bg-ink hover:text-linen`;

/** Linen on dark roast. */
export const buttonLight = `${buttonBase} bg-linen text-ink hover:bg-paper`;

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const eyebrow = "text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-brand-deep";

export const sectionTitle =
  "font-display text-[2.5rem] font-medium leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl";
