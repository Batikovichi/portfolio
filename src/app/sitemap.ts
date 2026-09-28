import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  if (!siteUrl) return [];
  return [{url:siteUrl,priority:1},...projects.map(project=>({url:`${siteUrl}/projects/${project.slug}`,priority:0.7}))];
}
