import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thermemo.id";

  const staticRoutes = [
    "",
    "/photobooth",
    "/online-photobooth",
    "/receipt-photobooth",
    "/vintage-photobooth",
    "/gallery",
    "/pricing",
    "/blog",
    "/about",
    "/booking",
    "/contact",
    "/faq",
    "/how-to-use",
    "/privacy",
    "/terms",
  ];

  const blogSlugs = [
    "kenapa-struk-kenangan",
    "behind-paper",
    "menyimpan-receipt",
    "ki-no-kata",
    "event-club-ghost",
    "quiet-magic",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : route === "/photobooth" ? 0.9 : 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
