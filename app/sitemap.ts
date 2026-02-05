import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app";

  // Main sections with anchor links
  const sections = [
    "",
    "#axioms",
    "#meaning-of-life",
    "#consciousness",
    "#our-universe",
    "#spacetime",
    "#higher-dimensions",
    "#infinity",
    "#black-holes",
    "#aliens",
    "#the-teeming-dark",
    "#omega-point",
    "#why",
    "#holos",
  ];

  const mainPages = sections.map((section) => ({
    url: `${baseUrl}${section}`,
    lastModified: new Date("2024-06-19"),
    changeFrequency: "monthly" as const,
    priority: section === "" ? 1.0 : 0.8,
  }));

  // Append other pages
  return [
    ...mainPages,
    {
      url: `${baseUrl}/logic`,
      lastModified: new Date("2024-06-19"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/predictions`,
      lastModified: new Date("2024-06-19"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/citations`,
      lastModified: new Date("2024-06-19"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
