import type { Metadata } from "next";
import "./globals.css";
import { siteDescription, siteName, siteTitle, siteUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Mike Kanyatsi", url: siteUrl }],
  creator: "Mike Kanyatsi",
  category: "Web design and development",
  verification: {
    google: "JKm5mDnHC7-Q6gSb_bjdbIRYzpVinpUnnjDCRJEGBZ0",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: "/",
    siteName,
    locale: "en_CA",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mike Kanyatsi freelance web design portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#mike-kanyatsi`,
      name: "Mike Kanyatsi",
      url: siteUrl,
      email: "mailto:mmkanyatsi@gmail.com",
      jobTitle: "Freelance Web Designer and Creative Developer",
      image: `${siteUrl}/icon.svg`,
      sameAs: ["https://www.linkedin.com/in/mikekanyatsi/"],
      knowsLanguage: ["English", "French"],
      areaServed: ["Ottawa", "Montréal", "Canada"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      image: `${siteUrl}/icon.svg`,
      description: siteDescription,
      inLanguage: ["en-CA", "fr-CA"],
      author: { "@id": `${siteUrl}/#mike-kanyatsi` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#web-design-service`,
      name: "Bilingual web design and creative development",
      serviceType: "Website design, redesign and development",
      provider: { "@id": `${siteUrl}/#mike-kanyatsi` },
      areaServed: ["Ottawa", "Montréal", "Canada"],
      url: `${siteUrl}/#services`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
