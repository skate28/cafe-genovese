import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated mark: caramel tile, linen initial. No logo file yet. */
export default function Icon() {
  const initial = site.name.trim().charAt(0) || "C";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: site.palette.brand,
          color: site.palette.rice,
          fontSize: 42,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        {initial}
      </div>
    ),
    { ...size },
  );
}
