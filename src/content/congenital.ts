import type { Checklist } from "./resources";
import { PENDING_REVIEW, type ContentMeta } from "./types";

export const congenitalMeta: ContentMeta = {
  category: "conditions",
  readingLevel: "champion",
  sources: [
    "cdc-chd-about",
    "cdc-chd-living",
    "nhlbi-congenital",
    "nhlbi-chd-types",
    "nhlbi-chd-diagnosis",
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

export interface DefectComparison {
  defectId: string;
  /** What to watch for in the animated blood-flow diagram. */
  flowNote: string;
  rows: { aspect: string; typical: string; condition: string }[];
}

/**
 * Side-by-side comparison of a typical heart and each example defect.
 * Simplified for education; pending clinical review like all content.
 */
export const defectComparisons: DefectComparison[] = [
  {
    defectId: "asd",
    flowNote: "Watch the red dots with cyan outlines: oxygen-rich blood crosses from the left atrium into the right atrium and goes back to the lungs.",
    rows: [
      { aspect: "Structure", typical: "A solid wall (septum) separates the right and left atria.", condition: "There is a hole in the wall between the atria." },
      { aspect: "Blood flow", typical: "Oxygen-poor blood (right side) and oxygen-rich blood (left side) stay separate.", condition: "Some oxygen-rich blood leaks from the left atrium into the right atrium and goes back to the lungs." },
      { aspect: "Effect on the heart", typical: "Each side pumps only the blood it should.", condition: "The right side and the lungs handle extra blood. Some small ASDs close on their own in childhood." },
    ],
  },
  {
    defectId: "vsd",
    flowNote: "Watch the red dots with cyan outlines: oxygen-rich blood crosses from the left ventricle into the right ventricle and is pumped back to the lungs.",
    rows: [
      { aspect: "Structure", typical: "A solid wall separates the right and left ventricles.", condition: "There is a hole in the wall between the ventricles." },
      { aspect: "Blood flow", typical: "Each ventricle pumps its own blood out — the right to the lungs, the left to the body.", condition: "When the ventricles squeeze, some oxygen-rich blood passes through the hole and is pumped back to the lungs." },
      { aspect: "Effect on the heart", typical: "The heart and lungs work at a normal load.", condition: "A large VSD can make the heart and lungs work harder. Small ones may cause few problems." },
    ],
  },
  {
    defectId: "pda",
    flowNote: "Watch the red dots with cyan outlines: blood flows from the aorta into the pulmonary artery and back to the lungs.",
    rows: [
      { aspect: "Structure", typical: "The ductus arteriosus — a vessel that links the aorta and pulmonary artery before birth — closes shortly after birth.", condition: "The connection stays open after birth." },
      { aspect: "Blood flow", typical: "Blood leaving the heart for the body and blood going to the lungs stay separate.", condition: "Some blood flows from the aorta into the pulmonary artery, sending extra blood to the lungs." },
      { aspect: "Effect on the heart", typical: "Normal workload.", condition: "A large opening can make the heart and lungs work harder. Small openings often close on their own." },
    ],
  },
  {
    defectId: "pulmonary-stenosis",
    flowNote: "Watch the blue dots slow down and bunch up as they squeeze through the narrowed pulmonary valve.",
    rows: [
      { aspect: "Structure", typical: "The pulmonary valve opens fully with each beat.", condition: "The pulmonary valve is narrowed or stiff." },
      { aspect: "Blood flow", typical: "Blood moves easily from the right ventricle to the lungs.", condition: "Less room for blood to pass from the right ventricle into the pulmonary artery." },
      { aspect: "Effect on the heart", typical: "The right ventricle pumps at a normal effort.", condition: "The right ventricle has to push harder. Mild cases often need no treatment." },
    ],
  },
  {
    defectId: "coarctation",
    flowNote: "Watch the red dots slow down as they squeeze through the narrowed part of the aorta.",
    rows: [
      { aspect: "Structure", typical: "The aorta is wide open along its length.", condition: "Part of the aorta is narrowed." },
      { aspect: "Blood flow", typical: "Oxygen-rich blood flows freely from the heart to the whole body.", condition: "Blood has to squeeze through the narrowed section to reach the rest of the body." },
      { aspect: "Effect on the heart", typical: "The left ventricle pumps at a normal effort.", condition: "The heart has to pump harder. It is considered a critical defect and is usually treated." },
    ],
  },
  {
    defectId: "tof",
    flowNote: "Watch the blue dots slow at the narrowed pulmonary valve — and the blue dots with cyan outlines that skip the lungs and go out the aorta to the body.",
    rows: [
      { aspect: "Structure", typical: "Separate ventricles, an open pulmonary valve, the aorta rising from the left ventricle, and a normal right ventricle wall.", condition: "Four problems together: a narrowed pulmonary valve, a large VSD, an aorta sitting over both ventricles, and a thickened right ventricle." },
      { aspect: "Blood flow", typical: "All oxygen-poor blood goes to the lungs before reaching the body.", condition: "Some oxygen-poor blood can bypass the lungs and go out to the body, so the blood carries less oxygen." },
      { aspect: "Effect on the heart", typical: "Normal workload and oxygen levels.", condition: "It is the most common complex congenital heart defect and is treated with surgery. People need follow-up care for life." },
    ],
  },
];

/** Overall comparison: a typical heart vs. a heart with a congenital condition. */
export const overallComparison = {
  rows: [
    { aspect: "What it is", typical: "The heart's chambers, valves, and vessels form in the typical way.", condition: "A difference in the heart's structure that is present at birth — from mild (a small hole) to severe (missing parts)." },
    { aspect: "When it's found", typical: "Nothing to find — there is no structural difference.", condition: "Before birth, at birth, or sometimes not until childhood or adulthood." },
    { aspect: "Blood flow", typical: "Oxygen-poor and oxygen-rich blood follow separate, one-way paths.", condition: "Blood flow through the heart or out to the body can be changed." },
    { aspect: "Physical activity", typical: "Follow general activity guidelines.", condition: "Most people can be physically active. The type and amount are guided by their cardiologist." },
    { aspect: "Follow-up care", typical: "Routine check-ups.", condition: "Regular cardiology visits, often for life — even after a repair." },
    { aspect: "Warning signs", typical: "Stop, tell an adult, and get checked for chest pain, fainting, or a racing heart with dizziness.", condition: "The same warning signs apply. Report them right away." },
  ],
  sources: ["cdc-chd-about", "cdc-chd-living", "nhlbi-congenital", "nhlbi-chd-types", "nhlbi-chd-living"],
};

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
