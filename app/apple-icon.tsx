import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
          color: "#fafafa",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>ARS</div>
        $
      </div>
    ),
    { ...size },
  );
}
