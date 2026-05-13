import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Generates /opengraph-image at build/request time — used as fallback OG when a page
// doesn't define its own. Edge runtime keeps it fast.
export const runtime = "edge";

export const alt = `${site.name} — Las Vegas Luxury Real Estate`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,214,10,0.3), transparent 70%), #0a0a0b",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ffd60a",
              boxShadow: "0 0 30px #ffd60a",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            {site.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Las Vegas luxury, sold with discretion.
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 900 }}>
            Boutique representation across The Ridges, MacDonald Highlands,
            Ascaya, and Lake Las Vegas.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#a1a1aa",
          }}
        >
          <div>darrelsrealestate.com</div>
          <div>NV License BS.0190234</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
