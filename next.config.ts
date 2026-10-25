import path from "node:path";
import type { NextConfig } from "next";

/**
 * `npm run build:app` sets BUILD_TARGET=app to produce a fully static export in
 * `out/`, which Capacitor bundles into the iOS and Android apps.
 */
const isAppBuild = process.env.BUILD_TARGET === "app";

const nextConfig: NextConfig = {
  ...(isAppBuild && {
    output: "export",
    // Emits about/index.html etc., which the app's local web server resolves.
    trailingSlash: true,
  }),
  turbopack: {
    // Pin the project root (a stray package-lock.json in the home folder can otherwise confuse detection).
    root: path.resolve(import.meta.dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
