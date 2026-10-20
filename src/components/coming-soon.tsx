import { Bot, ClipboardList, MessageSquareText, UtensilsCrossed } from "lucide-react";
import type { ComponentType } from "react";

import { Reveal } from "@/components/reveal";
import { buttonPrimary, container, sectionTitle } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneLabel, telHref } from "@/lib/contact";
import { anyFeatureVisible, featureMode, waitlistHref, type FeatureKey } from "@/lib/features";
import { liveSmsHref, safeHref } from "@/lib/ordering";

type Card = {
  key: FeatureKey;
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  example: string;
  liveHref: string | null;
  liveLabel: string;
};

function cateringAction(): { href: string; label: string } | null {
  const orders = site.customOrders;
  if (!orders) return null;
  const email = orders.email.trim();
  if (email) {
    const href = safeHref(email.startsWith("mailto:") ? email : `mailto:${email}`);
    if (href) return { href, label: orders.textButtonLabel.trim() || "Request catering" };
  }
  const sms = liveSmsHref(orders.textMessage, site);
  if (!sms) return null;
  return { href: sms, label: orders.textButtonLabel.trim() || "Text a catering request" };
}

function cards(): Card[] {
  const catering = cateringAction();
  const after = telHref(site.afterHoursPhone);
  return [
    {
      key: "textPreorders",
      icon: MessageSquareText,
      title: site.preorder.heading.trim() || "Text pre-orders",
      body:
        site.preorder.intro.trim() ||
        "Text a pickup order ahead and get a confirmation back. This is a preview, not a live text line.",
      example: "“Two breakfast plates for 9:15?” → “We’ll confirm once text orders are switched on.”",
      liveHref: liveSmsHref(site.preorder.textMessage, site),
      liveLabel: site.preorder.textButtonLabel.trim() || "Text your order",
    },
    {
      key: "catering",
      icon: UtensilsCrossed,
      title: site.customOrders?.heading.trim() || "Catering requests",
      body:
        site.customOrders?.intro.trim() ||
        "A preview of asking about trays, office breakfasts, and group orders. Catering requests are not open yet.",
      example: "“Breakfast for 12 on Friday?” → “We’ll reply once catering requests are switched on.”",
      liveHref: catering?.href ?? null,
      liveLabel: catering?.label ?? "Request catering",
    },
    {
      key: "aiPhone",
      icon: Bot,
      title: "After-hours AI phone answering",
      body: "A preview of an assistant that could share hours and directions when the cafe is closed. It is not answering the phone.",
      example: "“What time do you open?” → “Hours are still being confirmed — please call during the day.”",
      liveHref: after,
      liveLabel: site.afterHoursPhone ? `Call ${phoneLabel(site.afterHoursPhone)}` : "Call",
    },
    {
      key: "waitlist",
      icon: ClipboardList,
      title: "Waitlist",
      body: "A preview of joining a list before you arrive. The cafe is not running a waitlist from this site.",
      example: "“Party of 4, added.” → “We’ll text you when a table is close — once this is switched on.”",
      liveHref: waitlistHref(site) ?? telHref(site.phone),
      liveLabel: waitlistHref(site) ? "Join the waitlist" : "Call the cafe",
    },
  ];
}

export function ComingSoon() {
  if (!anyFeatureVisible(site)) return null;
  const visible = cards()
    .map((card) => ({ ...card, mode: featureMode(card.key, site) }))
    .filter((card) => card.mode !== "off");

  return (
    <section id="soon" className="relative overflow-hidden bg-roast py-20 text-linen sm:py-28">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-honey">Coming soon</p>
          <h2 className={cn(sectionTitle, "mt-4 text-linen")}>
            A few things <span className="italic text-honey">on the way</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-linen/75">
            These cards are previews, not live services. Nothing here places an order, books catering, or answers the phone.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {visible.map((card, index) => {
            const isLive = card.mode === "live" && Boolean(card.liveHref);
            const Icon = card.icon;
            return (
              <Reveal key={card.key} delay={0.06 * index}>
                <article className="ticket flex h-full flex-col rounded-3xl border border-dashed border-linen/25 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-linen text-brand">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                        isLive ? "bg-herb text-linen" : "bg-honey text-ink",
                      )}
                    >
                      {isLive ? "Available now" : "Coming soon"}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-linen">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-linen/70">{card.body}</p>
                  {!isLive && (
                    <figure className="mt-5 rounded-2xl bg-linen/8 p-4 text-sm italic leading-relaxed text-linen/80 ring-1 ring-linen/10">
                      <figcaption className="mb-1 text-[0.62rem] font-bold uppercase not-italic tracking-[0.16em] text-honey">
                        Preview · example only
                      </figcaption>
                      {card.example}
                    </figure>
                  )}
                  {isLive && site.customOrders?.leadTimeNote.trim() && card.key === "catering" && (
                    <p className="mt-4 text-sm text-linen/70">{site.customOrders.leadTimeNote}</p>
                  )}
                  <div className="mt-auto pt-6">
                    {isLive && card.liveHref ? (
                      <a href={card.liveHref} className={cn(buttonPrimary, "w-full")}>
                        {card.liveLabel}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-linen/10 px-5 text-sm font-semibold text-linen/50"
                      >
                        Not available yet
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
