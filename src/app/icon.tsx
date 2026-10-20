import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { signLines } from "@/components/wordmark";
import { site } from "@/content/site";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/** Navy serif mark in the storefront’s stacked lettering. No raster logo. */
export default async function Icon() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/LibreBaskerville-Regular.ttf")),
    readFile(join(process.cwd(), "src/fonts/LibreBaskerville-Bold.ttf")),
  ]);
  const { small, large } = signLines(site.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: site.palette.brand,
          color: site.palette.rice,
        }}
      >
        {small ? (
          <div style={{ display: "flex", fontFamily: "Sign", fontSize: 26, fontWeight: 400 }}>{small}</div>
        ) : null}
        <div style={{ display: "flex", fontFamily: "Sign", fontSize: 34, fontWeight: 700, marginTop: 2 }}>{large}</div>
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
