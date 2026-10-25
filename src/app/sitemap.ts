import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { modules } from "@/content/academy";

const routes = [
  "",
  "/explore-your-heart",
  "/athlete-health",
  "/warning-signs",
  "/heart-lab",
  "/academy",
  "/quiz",
  "/dashboard",
  "/resources",
  "/stories",
  "/about",
  "/references",
  "/privacy",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...modules.map((m) => `/academy/${m.id}`)].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.contentUpdated,
  }));
}
