import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return [{url:siteUrl,priority:1},...projects.map(project=>({url:`${siteUrl}/projects/${project.slug}`,priority:0.7}))];
}
