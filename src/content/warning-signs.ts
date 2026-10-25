import { PENDING_REVIEW, type ContentMeta } from "./types";

export const warningMeta: ContentMeta = {
  category: "safety",
  readingLevel: "champion",
  sources: ["aap-sca-young", "aap-cardiomyopathy", "aha-hcm", "nhlbi-cardiac-arrest"],
  review: PENDING_REVIEW("2026-10-25"),
};

export interface WarningSign {
  id: string;
  title: string;
  description: string;
  why: string;
}

export const warningSigns: WarningSign[] = [
  {
    id: "chest-pain",
    title: "Chest pain or discomfort during exercise",
    description: "Pain, pressure, tightness, or discomfort in the chest that comes on with activity.",
    why: "Exercise-related chest pain can be a sign that the heart isn't getting enough blood or has a structural or rhythm problem. It needs a medical evaluation.",
  },
  {
    id: "fainting",
    title: "Unexplained fainting or near-fainting",
    description: "Passing out, nearly passing out, or sudden dizziness — especially during or right after exercise, or without a clear reason.",
    why: "Fainting during exercise can signal a serious heart rhythm or heart muscle condition, even if the athlete feels fine afterward.",
  },
  {
    id: "breathless",
    title: "Unusual shortness of breath",
    description: "Breathlessness that is out of proportion to the effort, or much worse than teammates doing the same work.",
    why: "It can have many causes, including asthma or illness, but it can also be related to the heart. A professional should find the cause.",
  },
  {
    id: "palpitations",
    title: "Palpitations with concerning symptoms",
    description: "A racing, pounding, fluttering, or irregular heartbeat — particularly with dizziness, chest pain, fainting, or shortness of breath.",
    why: "Feeling your heart beat fast during hard exercise is normal. A racing or irregular heartbeat that comes with other symptoms, or happens for no clear reason, should be checked.",
  },
  {
    id: "intolerance",
    title: "Unexplained exercise intolerance",
    description: "Getting worn out much faster than usual, or a sudden drop in ability to exercise, without an obvious reason.",
    why: "A new, unexplained drop in exercise ability can come from many conditions, including some heart conditions. Don't just push harder.",
  },
  {
    id: "family-history",
    title: "Family history of inherited heart conditions or sudden death",
    description:
      "A relative with an inherited heart muscle or electrical problem, or a family member who died suddenly and unexpectedly from a heart problem or unknown cause before age 50.",
    why: "Some heart conditions run in families. Sharing family history with a doctor helps them decide whether further testing is needed.",
  },
];

export const whatToDo = [
  { title: "Stop", text: "Stop the activity right away. Do not \"play through\" these symptoms." },
  { title: "Tell", text: "Tell a coach, athletic trainer, parent, or another trusted adult immediately." },
  { title: "Get checked", text: "Get evaluated by a healthcare professional before returning to sports." },
  { title: "Emergency?", text: "If someone collapses, is unresponsive, or isn't breathing normally — call 911 right away." },
];

export interface Condition {
  id: string;
  name: string;
  summary: string;
  details: string[];
  sources: string[];
}

export const conditions: Condition[] = [
  {
    id: "sca",
    name: "Sudden cardiac arrest (SCA)",
    summary: "The heart suddenly stops pumping effectively because of a dangerous electrical rhythm problem.",
    details: [
      "The person collapses, becomes unresponsive, and is not breathing normally (they may gasp). Without immediate treatment, it can be fatal within minutes.",
      "Immediate CPR and use of an AED (automated external defibrillator) can restore a normal rhythm and save lives.",
      "In young people, SCA is often caused by an underlying heart condition that hadn't been diagnosed. Some had warning symptoms beforehand; others had none.",
    ],
    sources: ["nhlbi-cardiac-arrest", "aap-sca-young", "aha-cardiac-arrest"],
  },
  {
    id: "scd",
    name: "Sudden cardiac death (SCD)",
    summary: "Death that results from sudden cardiac arrest when the heart cannot be restarted in time.",
    details: [
      "Sudden cardiac death is rare in young people, but it's devastating — which is why recognizing warning signs, knowing CPR, and having an AED nearby matter.",
      "Fast bystander action — calling 911, starting CPR, and using an AED — improves the chance of survival.",
    ],
    sources: ["aap-sca-young", "nhlbi-cardiac-arrest"],
  },
  {
    id: "hcm",
    name: "Hypertrophic cardiomyopathy (HCM)",
    summary: "An often-inherited condition in which the heart muscle becomes abnormally thick.",
    details: [
      "HCM is usually caused by gene changes and can run in families. Many people with it are undiagnosed.",
      "It can cause chest pain, shortness of breath with exertion, dizziness, or fainting, and can increase the risk of dangerous heart rhythms, especially during exercise.",
      "Most people with HCM live long lives with proper care. Diagnosis and decisions about sports participation are made by specialists.",
    ],
    sources: ["aha-hcm", "aha-hcm-athletes", "aap-sca-young"],
  },
  {
    id: "inherited-arrhythmias",
    name: "Inherited arrhythmia conditions",
    summary: "Conditions such as long QT syndrome that affect the heart's electrical system.",
    details: [
      "Electrical conditions can cause fast, chaotic heart rhythms that may lead to fainting or cardiac arrest, sometimes triggered by exercise, emotion, or sudden noise.",
      "Examples include long QT syndrome and Wolff-Parkinson-White syndrome (an extra electrical pathway).",
      "Family history of fainting, seizures, or sudden death can be an important clue for doctors.",
    ],
    sources: ["nhlbi-long-qt", "nhlbi-arrhythmias", "aap-sca-young"],
  },
  {
    id: "myocarditis",
    name: "Myocarditis",
    summary: "Inflammation of the heart muscle, often triggered by an infection such as a virus.",
    details: [
      "Symptoms can range from almost none to severe, and may include chest pain, shortness of breath, fatigue, or palpitations.",
      "If you've been sick and have chest pain, unusual breathlessness, or palpitations, talk to a healthcare professional before returning to hard training.",
      "Return to sports after myocarditis is decided by a medical team.",
    ],
    sources: ["nhlbi-heart-inflammation", "aap-sca-young"],
  },
  {
    id: "congenital",
    name: "Congenital heart conditions",
    summary: "Differences in the heart's structure that are present from birth.",
    details: [
      "Some are found in infancy; others aren't discovered until later. Coronary artery abnormalities are one example that can matter for athletes.",
      "Many people with congenital heart conditions — including those who've had surgery — can be active. Their care team guides which activities are appropriate.",
    ],
    sources: ["nhlbi-congenital", "aap-sca-young"],
  },
  {
    id: "screening",
    name: "Cardiac screening and sports participation evaluations",
    summary: "Pre-participation exams help clinicians look for warning signs, personal history, and family history.",
    details: [
      "A sports physical typically includes questions about symptoms and family history plus a physical exam. Answering honestly is one of the most important things an athlete and family can do.",
      "Additional testing (such as an ECG or echocardiogram) may be recommended for some athletes based on history, symptoms, or exam findings. Decisions about testing and clearance are made by healthcare professionals.",
      "No screening approach catches every condition — so symptoms that appear later should still be reported promptly.",
    ],
    sources: ["aap-sca-young"],
  },
];

export const arrestVsAttack = {
  rows: [
    { label: "What it is", arrest: "An electrical problem — the heart suddenly stops pumping effectively.", attack: "A circulation problem — blood flow to part of the heart muscle is blocked." },
    { label: "Is the person awake?", arrest: "No. They collapse, are unresponsive, and aren't breathing normally.", attack: "Usually yes. The heart usually keeps beating." },
    { label: "Typical symptoms", arrest: "Sudden collapse with no normal breathing; may have gasping.", attack: "Chest pain or pressure, discomfort in arms, back, neck, or jaw, shortness of breath, nausea, cold sweat." },
    { label: "What to do", arrest: "Call 911, start CPR right away, and use an AED as soon as one is available.", attack: "Call 911 right away. Don't wait to see if symptoms pass." },
  ],
  sources: ["aha-arrest-vs-attack", "nhlbi-heart-attack", "nhlbi-cardiac-arrest"],
};

export const emergencySteps = [
  {
    id: "recognize",
    title: "Recognize",
    text: "Someone collapses and is unresponsive and not breathing normally (gasping is not normal breathing). Assume cardiac arrest — even in a young, fit athlete. A collapse after a hit to the chest can also be cardiac arrest.",
  },
  {
    id: "call",
    title: "Call 911",
    text: "Call 911 (or your local emergency number) or point to a specific person and tell them to call. Put the phone on speaker — dispatchers can coach you.",
  },
  {
    id: "cpr",
    title: "Start CPR",
    text: "For a teen or adult who collapses: push hard and fast in the center of the chest — about 100–120 compressions per minute. Keep going until help takes over or an AED is ready.",
  },
  {
    id: "aed",
    title: "Use an AED",
    text: "Send someone to get the AED. Turn it on and follow its voice prompts. AEDs are designed for use by the public and only deliver a shock if one is needed.",
  },
  {
    id: "eap",
    title: "Follow the plan",
    text: "Teams and schools should have a written, practiced emergency action plan: who calls, who starts CPR, who gets the AED, and how responders reach the field.",
  },
];

export const emergencySources = ["aha-what-is-cpr", "nhlbi-defibrillators", "aap-sca-schools", "acc-cardiosmart-sca"];
