import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Mike Kanyatsi — Independent Web Designer & Creative Developer";
  const description = "Bilingual, high-impact websites for established businesses across Ottawa, Montréal and beyond.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [`${origin}/og.svg`] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.svg`] },
  };
}

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
