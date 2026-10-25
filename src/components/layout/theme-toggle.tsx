"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_KEY = "heartlab:theme";

/** Runs in <head> before first paint so the saved or system theme never flashes. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") ?? "dark",
    () => null,
  );
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {}
      }}
      className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white hover:border-cyan"
      aria-label={theme ? `Switch to ${next} mode` : "Toggle color theme"}
    >
      {theme === "light" ? <Moon aria-hidden className="size-4" /> : <Sun aria-hidden className="size-4" />}
    </button>
  );
}
