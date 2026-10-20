import { ComingSoon } from "@/components/coming-soon";
import { Dishes } from "@/components/dishes";
import { WhatToExpect } from "@/components/expect";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { MenuSection } from "@/components/menu-section";
import { Story } from "@/components/story";
import { Visit } from "@/components/visit";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <Marquee />
      <Story />
      <Dishes />
      <MenuSection />
      <WhatToExpect />
      <ComingSoon />
      <Gallery />
      <Visit />
      <Faq />
    </main>
  );
}
