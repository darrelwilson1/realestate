import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllSlugs } from "@/lib/blog";
import { getDb } from "@/lib/mongodb";
import type { ListingDoc } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, listingSlugs] = await Promise.all([
    getAllSlugs(),
    fetchActiveListingSlugs(),
  ]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/listings`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const listingRoutes: MetadataRoute.Sitemap = listingSlugs.map((slug) => ({
    url: `${site.url}/listings/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...listingRoutes];
}

async function fetchActiveListingSlugs(): Promise<string[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<ListingDoc>("listings")
      .find({ status: "active" }, { projection: { slug: 1, _id: 0 } })
      .toArray();
    return docs.map((d) => d.slug);
  } catch {
    // Build can still run if MONGODB_URI is missing — empty list is the safe fallback.
    return [];
  }
}
