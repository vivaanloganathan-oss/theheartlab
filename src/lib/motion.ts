"use client";

import { useReducedMotion } from "motion/react";
import { useHydrated } from "./progress";

/**
 * Reduced-motion preference that is always `false` during SSR and the first
 * client render, so server and client markup match before hydration.
 */
export function useSafeReducedMotion() {
  const reduced = useReducedMotion();
  return useHydrated() && !!reduced;
}
