import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RELO-MATE | AI relocation checklist assistant",
  description:
    "Turn confusing relocation and visa requirements into a simple, source-based checklist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
