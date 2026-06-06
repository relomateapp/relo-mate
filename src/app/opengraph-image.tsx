import { ImageResponse } from "next/og"

export const alt =
  "RELO-MATE maps relocation requirements into a clear source-based checklist."

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f3f8f6",
          color: "#073b34",
          display: "flex",
          height: "100%",
          padding: 64,
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#073b34",
            color: "white",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            overflow: "hidden",
            padding: 56,
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(184, 243, 107, 0.95), rgba(88, 211, 176, 0.45))",
              borderRadius: 999,
              filter: "blur(10px)",
              height: 280,
              position: "absolute",
              right: -70,
              top: -80,
              width: 280,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                fontSize: 30,
                fontWeight: 800,
                gap: 18,
                letterSpacing: 2,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  background: "#b8f36b",
                  borderRadius: 22,
                  color: "#073b34",
                  display: "flex",
                  fontSize: 38,
                  height: 72,
                  justifyContent: "center",
                  width: 72,
                }}
              >
                R
              </div>
              RELO-MATE
            </div>
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 999,
                color: "#d6fff0",
                fontSize: 24,
                padding: "16px 22px",
              }}
            >
              Source-based plans
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                color: "#b8f36b",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Relocation checklist assistant
            </div>
            <div
              style={{
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 0.98,
                maxWidth: 850,
              }}
            >
              Your move, mapped with clarity.
            </div>
            <div
              style={{
                color: "rgba(235, 255, 247, 0.78)",
                fontSize: 32,
                lineHeight: 1.35,
                maxWidth: 790,
              }}
            >
              Turn confusing relocation and visa requirements into a simple,
              source-based checklist.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
