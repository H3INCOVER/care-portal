import { MetadataRoute } from "next";
import { getFacilities } from "@/lib/facilities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const facilities = await getFacilities();

  const baseUrl = "https://portal.h3incover.com";

  const facilityUrls = facilities
    .filter((facility) => facility.isPublished)
    .map((facility) => ({
      url: `${baseUrl}/facilities/${facility.slug}`,
      lastModified: new Date(
        facility.updatedAt || facility.createdAt || Date.now()
      ),
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/facilities`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact/edit`,
      lastModified: new Date(),
    },
    ...facilityUrls,
  ];
}