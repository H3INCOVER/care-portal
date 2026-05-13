import { MetadataRoute } from "next";

import facilities from "@/data/facilities.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portal.h3incover.com";

  const staticPages = [
    "",
    "/facilities",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const facilityPages = facilities.map((facility) => ({
    url: `${baseUrl}/facilities/${facility.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...facilityPages,
  ];
}