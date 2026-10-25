"use client";

import { Capacitor } from "@capacitor/core";
import { useHydrated } from "./progress";

/** True only inside the iOS/Android app, and only after hydration (so SSR markup matches). */
export function useIsNativeApp() {
  return useHydrated() && Capacitor.isNativePlatform();
}

export async function shareText(title: string, text: string) {
  const { Share } = await import("@capacitor/share");
  await Share.share({ title, text, dialogTitle: title });
}
