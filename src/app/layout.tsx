import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "RELO-MATE",
  title: {
    default: "RELO-MATE | AI relocation checklist assistant",
    template: "%s | RELO-MATE",
  },
  description:
    "Turn confusing relocation and visa requirements into a simple, source-based checklist.",
  keywords: [
    "relocation checklist",
    "visa checklist",
    "moving abroad",
    "source-based guidance",
    "AI relocation assistant",
  ],
  authors: [{ name: "RELO-MATE" }],
  creator: "RELO-MATE",
  openGraph: {
    title: "RELO-MATE | AI relocation checklist assistant",
    description:
      "Turn confusing relocation and visa requirements into a simple, source-based checklist.",
    siteName: "RELO-MATE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RELO-MATE | AI relocation checklist assistant",
    description:
      "Turn confusing relocation and visa requirements into a simple, source-based checklist.",
  },
  category: "travel",
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
