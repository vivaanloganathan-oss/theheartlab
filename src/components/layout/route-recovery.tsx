"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Inside the native app, Capacitor's local server answers every extension-less
 * URL with the home page's index.html. If a subpage is ever hard-loaded (e.g.
 * the webview restarts), the home page renders at the wrong URL. Detect that
 * and client-navigate to the real page. On the website this never triggers.
 */
export function RouteRecovery() {
  const router = useRouter();
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== "/" && path !== "/index.html" && document.getElementById("home-page")) {
      router.replace(path + window.location.search + window.location.hash);
    }
  }, [router]);
  return null;
}
