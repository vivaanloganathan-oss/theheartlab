import { badges, levels, modules, type Badge } from "@/content/academy";
import { isModuleComplete, type Progress } from "./progress";

export function completedModuleIds(progress: Progress) {
  return modules.filter((m) => isModuleComplete(progress.modules[m.id])).map((m) => m.id);
}

export function earnedBadges(progress: Progress): Badge[] {
  const done = new Set(completedModuleIds(progress));
  return badges.filter((b) => b.requires.every((id) => done.has(id)));
}

/** Next modules to study: first incomplete module(s) in level order. */
export function recommendedModules(progress: Progress, count = 3) {
  const order = levels.flatMap((l) => l.modules);
  return order
    .filter((id) => !isModuleComplete(progress.modules[id]))
    .slice(0, count)
    .map((id) => modules.find((m) => m.id === id)!);
}
