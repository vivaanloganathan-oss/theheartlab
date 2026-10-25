import { studyLinks } from "./links";
import type { Checklist } from "./resources";
import { PENDING_REVIEW, type ContentMeta, type Question } from "./types";

export const congenitalMeta: ContentMeta = {
  category: "conditions",
  readingLevel: "champion",
  sources: [
    "cdc-chd-about",
    "cdc-chd-living",
    "nhlbi-congenital",
    "nhlbi-chd-types",
    "nhlbi-chd-living",
    "aha-chd-activity",
    "acc-achd-guideline",
    "aap-sca-young",
  ],
  review: PENDING_REVIEW("2026-10-25"),
};

export const quickFacts = [
  { stat: "~1%", text: "of U.S. births involve a congenital heart defect — about 40,000 babies each year.", source: "cdc-chd-about" },
  { stat: "#1", text: "Congenital heart defects are the most common type of birth defect.", source: "nhlbi-congenital" },
  { stat: "Mild → severe", text: "They range from a small hole in the heart to missing parts of the heart.", source: "cdc-chd-about" },
  { stat: "Any age", text: "Some are found before birth; others aren't detected until childhood or adulthood.", source: "cdc-chd-about" },
];

export interface DefectType {
  id: string;
  name: string;
  short: string;
  description: string;
  /** Heart structures involved, for the diagram highlight. */
  where: string;
}

/** Examples only — there are many other types. Descriptions are simplified. */
export const defectTypes: DefectType[] = [
  {
    id: "asd",
    name: "Atrial septal defect (ASD)",
    short: "Hole between the upper chambers",
    description:
      "A hole in the wall (septum) between the heart's two upper chambers, the atria. Some small ASDs close on their own during childhood.",
    where: "Wall between the right and left atria",
  },
  {
    id: "vsd",
    name: "Ventricular septal defect (VSD)",
    short: "Hole between the lower chambers",
    description:
      "A hole in the wall between the two lower chambers, the ventricles. A large VSD can make the heart and lungs work harder.",
    where: "Wall between the right and left ventricles",
  },
  {
    id: "pda",
    name: "Patent ductus arteriosus (PDA)",
    short: "A connection that didn't close",
    description:
      "A connection between the aorta and the pulmonary artery that normally closes after birth but stays open. Small openings often close on their own.",
    where: "Between the aorta and the pulmonary artery",
  },
  {
    id: "pulmonary-stenosis",
    name: "Pulmonary valve stenosis",
    short: "A narrow or stiff valve",
    description:
      "The pulmonary valve is narrowed or stiff, which affects blood flow from the right ventricle to the pulmonary artery. Many children don't need treatment.",
    where: "Pulmonary valve (right ventricle → lungs)",
  },
  {
    id: "coarctation",
    name: "Coarctation of the aorta",
    short: "A narrowed aorta",
    description:
      "A narrowing of part of the aorta, the main artery carrying blood to the body. It is considered a critical heart defect and is usually treated.",
    where: "Aorta",
  },
  {
    id: "tof",
    name: "Tetralogy of Fallot",
    short: "Four defects together",
    description:
      "The most common complex congenital heart defect. It combines four problems: pulmonary stenosis, a large VSD, an aorta positioned over both ventricles, and a thickened right ventricle. It is treated with surgery.",
    where: "Several structures at once",
  },
];

export const sportsPoints = [
  {
    title: "Most people can be active",
    text: "Most people with congenital heart defects can be physically active, and physical activity can help the heart become strong. The right type and amount depends on the person.",
    sources: ["nhlbi-chd-living", "cdc-chd-living"],
  },
  {
    title: "Your cardiologist sets the plan",
    text: "Ask your cardiologist which activities are safe for you — especially for competitive, contact, or high-impact sports. Decisions are individual and depend on your heart's anatomy, repairs, rhythm, and function.",
    sources: ["aha-chd-activity", "nhlbi-chd-living"],
  },
  {
    title: "Competitive sports: evaluate first",
    text: "For adults with congenital heart disease, the 2025 ACC/AHA guideline says competitive sports participation is reasonable after a comprehensive evaluation by an adult congenital heart disease specialist that weighs each person's risks and benefits.",
    sources: ["acc-achd-guideline"],
  },
  {
    title: "Repaired doesn't always mean cured",
    text: "Many people with a heart defect are not cured, even after repair. Regular visits with a cardiologist are important for life — including during the move from pediatric to adult care.",
    sources: ["cdc-chd-living"],
  },
];

export const athleteChecklists: Checklist[] = [
  {
    id: "chd-athlete",
    audience: "parents",
    title: "Athlete With a Congenital Heart Condition: Season Checklist",
    intro: "For athletes and families. Review it with your cardiologist before each season.",
    items: [
      "I know the name of my heart condition and any surgeries or procedures I've had",
      "My cardiologist has told me which sports and activity levels are right for me",
      "My coach and athletic trainer know what they need to know (with my family's permission)",
      "I've told any new doctor — including at sports physicals — about my heart condition",
      "I have regular cardiology check-ups scheduled",
      "I know which symptoms mean stop, tell an adult, and get checked",
      "My team has an emergency action plan and knows where the AED is",
    ],
  },
  {
    id: "chd-questions",
    audience: "parents",
    title: "Questions to Ask Your Cardiologist About Sports",
    intro: "Bring these to your next appointment. Your cardiologist will tailor the answers to you.",
    items: [
      "Which sports and positions are a good fit for my heart?",
      "Are there limits on intensity, contact, or heavy lifting?",
      "Do I need any tests (for example, an exercise test) before the season?",
      "Which symptoms should make me stop and call you?",
      "Do any of my medications affect exercise, heat, or hydration?",
      "How often should I be seen, and when should I move to an adult congenital heart specialist?",
    ],
  },
];

export const coachTips = [
  "Follow the athlete's written activity guidance from their cardiologist — don't set limits or push past them on your own.",
  "Keep health information private. Share only what's needed with staff who need it, with the family's permission.",
  "Treat the athlete like any teammate. Most athletes with congenital heart conditions can be active and included.",
  "Never ask an athlete to play through chest pain, fainting, unusual shortness of breath, or a racing heart with dizziness.",
  "Make sure the emergency action plan is practiced and the AED is reachable at every practice and game.",
];

export const congenitalQuiz: Question[] = [
  {
    id: "chd1",
    kind: "true-false",
    prompt: "True or false: Congenital heart defects are always found at birth.",
    options: ["True", "False"],
    answerIndex: 1,
    explanation: "False. Some are found before birth or at birth, but others aren't detected until childhood or adulthood.",
    related: studyLinks.congenital,
  },
  {
    id: "chd2",
    kind: "multiple-choice",
    prompt: "Who should decide which sports are right for an athlete with a congenital heart condition?",
    options: ["The athlete alone", "The coach", "The athlete's cardiologist, together with the athlete and family", "A fitness app"],
    answerIndex: 2,
    explanation: "Activity decisions are individual and should be made with the athlete's cardiologist, using shared decision-making with the athlete and family.",
    related: studyLinks.congenital,
  },
  {
    id: "chd3",
    kind: "true-false",
    prompt: "True or false: Once a heart defect is repaired with surgery, no more check-ups are needed.",
    options: ["True", "False"],
    answerIndex: 1,
    explanation: "False. Many people are not cured even after repair, so regular cardiology visits are important for life.",
    related: studyLinks.congenital,
  },
  {
    id: "chd4",
    kind: "scenario",
    scenario:
      "A teammate who had heart surgery as a baby says they feel dizzy and their heart is racing during sprints today.",
    prompt: "What's the best thing to do?",
    options: [
      "Tell them to push through — they've been cleared before",
      "Have them stop, tell the coach or athletic trainer right away, and make sure they get checked",
      "Keep it a secret so they don't get benched",
      "Wait until after practice",
    ],
    answerIndex: 1,
    explanation:
      "Dizziness with a racing heart during exercise is a warning sign for anyone. Stop, tell an adult right away, and get evaluated. If they collapse, call 911, start CPR, and use an AED.",
    related: studyLinks.warningSigns,
  },
  {
    id: "chd5",
    kind: "multiple-choice",
    prompt: "Which statement is most accurate?",
    options: [
      "People with congenital heart defects should never exercise",
      "Most people with congenital heart defects can be physically active, with guidance from their care team",
      "All congenital heart defects are severe",
      "Only adults can have congenital heart defects",
    ],
    answerIndex: 1,
    explanation:
      "Most people with congenital heart defects can be physically active. The right type and amount of activity depends on the person and is guided by their care team.",
    related: studyLinks.congenital,
  },
];
