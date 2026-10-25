"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

/** Native-app setup. Does nothing on the website. */
export function NativeInit() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    document.documentElement.classList.add("native-app");
    import("@capacitor/status-bar").then(({ StatusBar, Style }) => {
      // Light status-bar text over the red emergency banner / navy header.
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    });
  }, []);
  return null;
}
