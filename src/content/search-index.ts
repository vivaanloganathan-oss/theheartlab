import { heartParts } from "./anatomy";
import { topics } from "./topics";
import { conditions, warningSigns } from "./warning-signs";
import { modules } from "./academy";
import { myths, sports } from "./labs";
import { stories } from "./stories";
import { checklists } from "./resources";

export interface SearchEntry {
  title: string;
  summary: string;
  href: string;
  section: string;
  keywords?: string;
}

const pages: SearchEntry[] = [
  { title: "Explore Your Heart", summary: "Interactive heart anatomy and blood circulation.", href: "/explore-your-heart", section: "Page", keywords: "anatomy chambers valves" },
  { title: "Athlete Health", summary: "Heart rate, recovery, endurance, hydration, sleep, and nutrition.", href: "/athlete-health", section: "Page" },
  { title: "Warning Signs", summary: "Symptoms athletes should never ignore and emergency response.", href: "/warning-signs", section: "Page", keywords: "symptoms emergency" },
  { title: "Emergency Response Awareness", summary: "Recognize cardiac arrest, call 911, start CPR, use an AED.", href: "/warning-signs#emergency", section: "Warning Signs", keywords: "cpr aed 911 collapse" },
  { title: "Cardiac Arrest vs. Heart Attack", summary: "How an electrical problem differs from a circulation problem.", href: "/warning-signs#arrest-vs-attack", section: "Warning Signs" },
  { title: "Heartbeat Simulator", summary: "See illustrative heart rates from rest to intense exercise.", href: "/heart-lab#heartbeat", section: "Heart Lab", keywords: "bpm ecg" },
  { title: "Blood Flow Explorer", summary: "Follow oxygen-rich and oxygen-poor blood through the heart.", href: "/heart-lab#blood-flow", section: "Heart Lab", keywords: "circulation oxygen" },
  { title: "Exercise and Your Heart", summary: "How different sports challenge the cardiovascular system.", href: "/heart-lab#sports", section: "Heart Lab" },
  { title: "Heart Rate Recovery Explorer", summary: "Adjust intensity and recovery time on a simulated chart.", href: "/heart-lab#recovery", section: "Heart Lab", keywords: "graph chart" },
  { title: "Myth vs. Fact", summary: "Flip cards that bust common heart myths.", href: "/heart-lab#myths", section: "Heart Lab" },
  { title: "Learning Academy", summary: "Three levels, twelve modules, quizzes, and badges.", href: "/academy", section: "Page", keywords: "lessons badges certificate" },
  { title: "Knowledge Challenge", summary: "Quiz yourself and try the What Would You Do? scenarios.", href: "/quiz", section: "Page", keywords: "quiz scenario" },
  { title: "My Dashboard", summary: "Your lessons, quiz results, badges, and certificates.", href: "/dashboard", section: "Page", keywords: "progress" },
  { title: "Parents and Coaches", summary: "Guides and printable checklists for adults who support athletes.", href: "/resources", section: "Page", keywords: "parents coaches checklist" },
  { title: "Athlete Stories", summary: "Fictional composite stories about speaking up and helping.", href: "/stories", section: "Page" },
  { title: "References", summary: "Medical sources behind our content.", href: "/references", section: "Page", keywords: "sources citations" },
  { title: "About", summary: "Our mission and how content is reviewed.", href: "/about", section: "Page" },
  { title: "Privacy", summary: "How The Heart Lab handles data.", href: "/privacy", section: "Page" },
  { title: "Accessibility", summary: "Our accessibility statement.", href: "/accessibility", section: "Page" },
];

export const searchIndex: SearchEntry[] = [
  ...pages,
  ...heartParts.map((p) => ({ title: p.name, summary: p.function, href: `/explore-your-heart?part=${p.id}`, section: "Heart anatomy" })),
  ...topics.map((t) => ({ title: t.title, summary: t.simple, href: `/athlete-health#${t.id}`, section: "Athlete Health" })),
  ...warningSigns.map((w) => ({ title: w.title, summary: w.description, href: `/warning-signs#${w.id}`, section: "Warning sign" })),
  ...conditions.map((c) => ({ title: c.name, summary: c.summary, href: `/warning-signs#${c.id}`, section: "Conditions" })),
  ...modules.map((m) => ({ title: m.title, summary: m.summary, href: `/academy/${m.id}`, section: "Academy module" })),
  ...sports.map((s) => ({ title: s.name, summary: s.pattern, href: `/heart-lab?sport=${s.id}#sports`, section: "Sport" })),
  ...myths.map((m) => ({ title: `Myth: ${m.myth}`, summary: m.fact, href: "/heart-lab#myths", section: "Myth vs. Fact" })),
  ...stories.map((s) => ({ title: s.title, summary: s.lesson, href: `/stories#${s.id}`, section: "Story" })),
  ...checklists.map((c) => ({ title: c.title, summary: c.intro, href: `/resources#${c.id}`, section: "Checklist" })),
];
