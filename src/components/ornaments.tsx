import { cn } from "@/lib/cn";

/** Sun, plate, and cup — a drawn still life, not a photograph. */
export function MorningStillLife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 460" className={cn("h-auto w-full", className)} aria-hidden="true">
      <circle cx="250" cy="168" r="118" fill="var(--cg-honey)" opacity="0.95" />
      <g className="origin-[250px_168px] animate-sun" fill="none" stroke="var(--cg-honey)" strokeWidth="8" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          const x1 = 250 + Math.cos(angle) * 138;
          const y1 = 168 + Math.sin(angle) * 138;
          const x2 = 250 + Math.cos(angle) * 162;
          const y2 = 168 + Math.sin(angle) * 162;
          return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <ellipse cx="210" cy="360" rx="150" ry="28" fill="var(--cg-ink)" opacity="0.08" />
      <ellipse cx="210" cy="332" rx="132" ry="22" fill="var(--cg-paper)" stroke="var(--cg-ink)" strokeOpacity="0.18" />
      <ellipse cx="210" cy="328" rx="96" ry="14" fill="none" stroke="var(--cg-honey)" strokeWidth="3" />
      <g transform="translate(168 214)">
        <path d="M18 46h70c6 28-8 48-35 48S12 74 18 46Z" fill="var(--cg-paper)" stroke="var(--cg-ink)" strokeWidth="3" />
        <path d="M88 58c22 2 32 16 24 32-8 16-28 16-36 4" fill="none" stroke="var(--cg-ink)" strokeWidth="3" strokeLinecap="round" />
        <path d="M36 46c2-28 16-40 32-28" fill="none" stroke="var(--cg-ink)" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 18c8-16 8-16 16-8" fill="none" stroke="var(--cg-ink)" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(286 250)" fill="var(--cg-herb)">
        <path d="M28 70c0-30 8-48 22-66-20 8-36 30-40 58 8 6 14 8 18 8Z" />
        <path d="M28 70c2-26-10-46-28-58 16 16 24 36 24 58h4Z" opacity="0.85" />
        <path d="M30 70c18 2 28 16 24 28" fill="none" stroke="var(--cg-herb)" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function HerbRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" className={cn("h-6 w-36 text-herb", className)} aria-hidden="true">
      <path d="M8 14h144" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70 14c2-10 8-12 14-8-6 2-8 8-8 14 4-8 10-10 16-6" fill="currentColor" />
    </svg>
  );
}
