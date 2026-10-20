import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = site.seo.title.trim() || site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const palette = site.palette;
  const words = site.name.trim().split(/\s+/).filter(Boolean);
  const lead = words.length > 1 ? words.slice(0, -1).join(" ") : "Cafe";
  const tail = words.length > 1 ? words[words.length - 1] : words[0] || "Cafe";
  const detail = [site.address.full.trim(), site.phone.display.trim()].filter(Boolean).join("   ·   ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          backgroundColor: palette.rice,
          backgroundImage: `radial-gradient(circle at 92% 8%, ${palette.salmon} 0%, ${palette.salmon} 18%, transparent 19%)`,
          color: palette.ink,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: palette.brandDeep }}>
          Breakfast and lunch · St. Johns
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: palette.brand }}>
            {lead}
          </div>
          <div style={{ display: "flex", fontSize: 132, lineHeight: 0.9, fontStyle: "italic", fontFamily: "Georgia, serif" }}>{tail}</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 32, color: palette.ink }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: palette.ink }}>{detail}</div>
      </div>
    ),
    { ...size },
  );
}
