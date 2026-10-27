import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt = "SKINKARI. Same skin. Brighter days.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f8f2e7",
        color: "#dd4829",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 30, letterSpacing: 8 }}>
        SKINKARI · INDIAN SKINCARE FOR REAL LIFE
      </div>
      <div
        style={{
          fontSize: 116,
          fontWeight: 900,
          lineHeight: 0.94,
          letterSpacing: -6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>SAME SKIN.</span>
        <span>BRIGHTER DAYS.</span>
      </div>
      <div style={{ display: "flex", gap: 15 }}>
        {["#ed512e", "#86bde0", "#ed9eaf", "#68985c"].map((color) => (
          <div
            key={color}
            style={{ width: 245, height: 14, background: color }}
          />
        ))}
      </div>
    </div>,
    size,
  );
}
