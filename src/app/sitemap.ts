import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/explore-your-heart",
  "/athlete-health",
  "/warning-signs",
  "/congenital-heart-conditions",
  "/heart-lab",
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
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.contentUpdated,
  }));
}
