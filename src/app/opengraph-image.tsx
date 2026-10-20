import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { signLines } from "@/components/wordmark";
import { site } from "@/content/site";

export const alt = site.seo.title.trim() || site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/LibreBaskerville-Regular.ttf")),
    readFile(join(process.cwd(), "src/fonts/LibreBaskerville-Bold.ttf")),
  ]);
  const palette = site.palette;
  const { small, large } = signLines(site.name);
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
          padding: "72px 80px",
          background: palette.rice,
          color: palette.ink,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: palette.brand }}>
            Breakfast and lunch · St. Johns
          </div>
          <div style={{ width: 84, height: 84, borderRadius: 999, background: palette.accent, display: "flex" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {small ? (
            <div style={{ display: "flex", fontFamily: "Sign", fontSize: 42, fontWeight: 400, color: palette.brand }}>{small}</div>
          ) : null}
          <div style={{ display: "flex", fontFamily: "Sign", fontSize: 132, fontWeight: 700, lineHeight: 0.9, color: palette.brand }}>
            {large}
          </div>
          <div style={{ display: "flex", width: 92, height: 8, marginTop: 22, borderRadius: 99, background: palette.salmon }} />
          <div style={{ display: "flex", marginTop: 22, maxWidth: 920, fontSize: 30, lineHeight: 1.35, color: palette.ink }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: palette.brandDeep }}>{detail}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sign", data: regular, weight: 400, style: "normal" },
        { name: "Sign", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
