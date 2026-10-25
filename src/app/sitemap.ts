import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required so the route is prerendered for the static export used by the native apps.
export const dynamic = "force-static";

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
  "/contact",
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
