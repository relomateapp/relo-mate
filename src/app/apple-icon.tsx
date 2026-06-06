import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#073b34",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "12px solid #b8f36b",
            borderBottom: "0",
            borderLeftColor: "transparent",
            borderRadius: "90px 90px 0 0",
            borderRightColor: "transparent",
            height: 74,
            left: 48,
            position: "absolute",
            top: 84,
            width: 84,
          }}
        />
        <div
          style={{
            background: "white",
            borderRadius: 999,
            height: 26,
            left: 39,
            position: "absolute",
            top: 116,
            width: 26,
          }}
        />
        <div
          style={{
            background: "white",
            borderRadius: 999,
            height: 26,
            position: "absolute",
            right: 39,
            top: 116,
            width: 26,
          }}
        />
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          R
        </div>
      </div>
    ),
    size,
  )
}
