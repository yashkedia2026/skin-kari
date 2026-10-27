import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt = "SKINKARI. Indian Skincare for Real Life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#faf8f1",
        color: "#101010",
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
          fontSize: 104,
          fontWeight: 900,
          lineHeight: 0.94,
          letterSpacing: -6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>INDIAN SKINCARE.</span>
        <span>FOR REAL LIFE.</span>
      </div>
      <div style={{ display: "flex", gap: 15 }}>
        {["#00744f", "#ffb022", "#0785ef", "#ea338a"].map((color) => (
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
