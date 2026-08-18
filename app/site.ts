const fallbackUrl = "https://mikekanyatsi.vercel.app";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, "");

export const siteName = "Mike / Web";
export const siteTitle = "Mike / Web | Freelance Web Designer in Ottawa";
export const siteDescription =
  "Bilingual freelance web designer and creative developer in Ottawa, serving businesses in Montréal and across Canada with modern websites, redesigns and platform integrations.";
