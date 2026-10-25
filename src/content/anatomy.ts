import { PENDING_REVIEW, type ContentMeta } from "./types";

export type HeartPartId =
  | "right-atrium"
  | "right-ventricle"
  | "left-atrium"
  | "left-ventricle"
  | "valves"
  | "aorta"
  | "pulmonary-arteries"
  | "pulmonary-veins";

export interface HeartPart {
  id: HeartPartId;
  name: string;
  oxygen: "rich" | "poor" | "both";
  function: string;
  importance: string;
  athletics: string;
}

export const anatomyMeta: ContentMeta = {
  category: "anatomy",
  readingLevel: "rookie",
  sources: ["nhlbi-anatomy", "nhlbi-blood-flow", "nhlbi-heart-beats"],
  review: PENDING_REVIEW("2026-10-25"),
};

export const heartParts: HeartPart[] = [
  {
    id: "right-atrium",
    name: "Right atrium",
    oxygen: "poor",
    function:
      "Receives oxygen-poor blood returning from the body through two large veins (the superior and inferior vena cava), then passes it down to the right ventricle.",
    importance:
      "It is the heart's \"receiving room\" for blood coming back from the body. It is also home to the sinoatrial (SA) node — the heart's natural pacemaker that starts each heartbeat.",
    athletics:
      "During exercise, working muscles send much more blood back toward the heart. The right atrium helps keep that returning blood moving so the heart can keep up.",
  },
  {
    id: "right-ventricle",
    name: "Right ventricle",
    oxygen: "poor",
    function:
      "Pumps oxygen-poor blood through the pulmonary valve into the pulmonary artery, which carries it to the lungs.",
    importance:
      "It powers the short trip to the lungs, where blood drops off carbon dioxide and picks up fresh oxygen.",
    athletics:
      "When you breathe hard during a sprint, the right ventricle is sending more blood through your lungs every minute so it can be re-loaded with oxygen.",
  },
  {
    id: "left-atrium",
    name: "Left atrium",
    oxygen: "rich",
    function:
      "Receives freshly oxygenated blood from the lungs through the pulmonary veins and passes it through the mitral valve to the left ventricle.",
    importance:
      "It collects the oxygen-rich blood your whole body is waiting for and helps fill the left ventricle before each big pump.",
    athletics:
      "Good filling of the left ventricle means more oxygen-rich blood can be sent out with each beat — important when muscles demand more oxygen.",
  },
  {
    id: "left-ventricle",
    name: "Left ventricle",
    oxygen: "rich",
    function:
      "Pumps oxygen-rich blood through the aortic valve into the aorta and out to the entire body.",
    importance:
      "It is the heart's strongest chamber, generating the high pressure needed to push blood all the way to your fingers and toes.",
    athletics:
      "With regular training, the amount of blood the heart pumps per beat (stroke volume) can increase. That is one reason a trained athlete's heart may beat more slowly at rest.",
  },
  {
    id: "valves",
    name: "Heart valves",
    oxygen: "both",
    function:
      "Four one-way valves — tricuspid, pulmonary, mitral, and aortic — open to let blood move forward and close to stop it from flowing backward.",
    importance:
      "They keep blood moving in the right direction. The \"lub-dub\" sound of a heartbeat comes from valves closing.",
    athletics:
      "As your heart rate rises, the valves open and close more times per minute, keeping every beat moving blood forward efficiently.",
  },
  {
    id: "aorta",
    name: "Aorta",
    oxygen: "rich",
    function:
      "The body's largest artery. It carries oxygen-rich blood from the left ventricle to branches that supply the brain, muscles, and every organ.",
    importance: "Every bit of oxygen-rich blood leaving the heart for the body passes through the aorta first.",
    athletics:
      "During activity, blood leaving through the aorta is directed toward working muscles, the heart itself, and the skin to help release heat.",
  },
  {
    id: "pulmonary-arteries",
    name: "Pulmonary arteries",
    oxygen: "poor",
    function:
      "Carry oxygen-poor blood from the right ventricle to the lungs. They are the only arteries in the body that carry oxygen-poor blood.",
    importance: "They deliver blood to the lungs so it can pick up oxygen and release carbon dioxide.",
    athletics:
      "Heavier breathing during exercise works hand in hand with greater blood flow through the pulmonary arteries to load more oxygen.",
  },
  {
    id: "pulmonary-veins",
    name: "Pulmonary veins",
    oxygen: "rich",
    function:
      "Carry oxygen-rich blood from the lungs back to the left atrium. They are the only veins in the body that carry oxygen-rich blood.",
    importance: "They complete the lung loop, returning freshly oxygenated blood to the left side of the heart.",
    athletics:
      "Every breath you take during a game ends up, through these veins, as oxygen headed for your working muscles.",
  },
];

export const heartPartById = Object.fromEntries(heartParts.map((p) => [p.id, p])) as Record<HeartPartId, HeartPart>;

/** The path blood takes, in order, used by the blood-flow explorer. */
export const flowSteps: { part: HeartPartId | "body" | "lungs"; title: string; text: string; oxygen: "rich" | "poor" }[] = [
  { part: "body", title: "Body → heart", text: "Oxygen-poor blood returns from the body through the superior and inferior vena cava.", oxygen: "poor" },
  { part: "right-atrium", title: "Right atrium", text: "Blood collects in the right atrium, then flows through the tricuspid valve.", oxygen: "poor" },
  { part: "right-ventricle", title: "Right ventricle", text: "The right ventricle pumps blood through the pulmonary valve.", oxygen: "poor" },
  { part: "pulmonary-arteries", title: "Pulmonary arteries", text: "The pulmonary arteries carry oxygen-poor blood to the lungs.", oxygen: "poor" },
  { part: "lungs", title: "Lungs", text: "In the lungs, blood releases carbon dioxide and picks up oxygen.", oxygen: "rich" },
  { part: "pulmonary-veins", title: "Pulmonary veins", text: "Oxygen-rich blood returns to the heart through the pulmonary veins.", oxygen: "rich" },
  { part: "left-atrium", title: "Left atrium", text: "Blood collects in the left atrium, then flows through the mitral valve.", oxygen: "rich" },
  { part: "left-ventricle", title: "Left ventricle", text: "The strong left ventricle pumps blood through the aortic valve.", oxygen: "rich" },
  { part: "aorta", title: "Aorta → body", text: "The aorta sends oxygen-rich blood out to the brain, muscles, and organs.", oxygen: "rich" },
];
