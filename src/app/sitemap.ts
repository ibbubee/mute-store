import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const baseUrl = "https://mutestore.in";

  const staticPages = [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/shop`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const productPages = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: new Date(p.createdAt),
  }));

  return [...staticPages, ...productPages];
}
