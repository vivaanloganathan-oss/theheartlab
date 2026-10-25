import { PENDING_REVIEW, type ContentMeta } from "./types";

export const labsMeta: ContentMeta = {
  category: "physiology",
  readingLevel: "champion",
  sources: ["nhlbi-heart-beats", "cdc-measuring-intensity", "nhlbi-blood-flow", "aha-heart-rate"],
  review: PENDING_REVIEW("2026-10-25"),
};

export interface ActivityState {
  id: string;
  label: string;
  /** Illustrative only — chosen to show the direction of change, not a target for any person. */
  bpm: number;
  explanation: string;
}

export const activityStates: ActivityState[] = [
  {
    id: "rest",
    label: "Rest",
    bpm: 68,
    explanation:
      "Sitting calmly. Your muscles need relatively little oxygen, so your heart can beat slowly. Resting rates vary widely between healthy people.",
  },
  {
    id: "walking",
    label: "Walking",
    bpm: 95,
    explanation: "Light activity. Leg muscles need more oxygen, so heart rate and breathing rise a little.",
  },
  {
    id: "jogging",
    label: "Jogging",
    bpm: 135,
    explanation:
      "Moderate effort — you can talk but not sing. The heart beats faster and each beat pumps more blood to keep up with demand.",
  },
  {
    id: "running",
    label: "Running",
    bpm: 160,
    explanation:
      "Vigorous effort — you can only say a few words at a time. Cardiac output is several times higher than at rest.",
  },
  {
    id: "intense",
    label: "Intense exercise",
    bpm: 185,
    explanation:
      "Near-maximal effort, like the end of a sprint. This can only be held briefly. Individual maximum heart rates vary a lot from person to person.",
  },
  {
    id: "recovery",
    label: "Recovery",
    bpm: 110,
    explanation:
      "After stopping, heart rate falls quickly at first and then more gradually as the body clears waste products, cools down, and restores balance.",
  },
];

export interface Sport {
  id: string;
  name: string;
  pattern: string;
  demands: string;
  adaptations: string;
  /** Simplified, qualitative emphasis on a 1–5 scale. Varies by position, level, and training. */
  profile: { endurance: number; bursts: number; power: number };
  tip: string;
}

export const sports: Sport[] = [
  {
    id: "basketball",
    name: "Basketball",
    pattern: "Intermittent: repeated sprints, cuts, and jumps with short recoveries.",
    demands: "Heart rate rises and falls repeatedly. The aerobic system supports recovery between explosive plays.",
    adaptations: "Better recovery between sprints and improved ability to repeat high-intensity efforts.",
    profile: { endurance: 3, bursts: 5, power: 4 },
    tip: "Use time-outs and substitutions to hydrate, and report dizziness or chest discomfort right away.",
  },
  {
    id: "football",
    name: "Football",
    pattern: "Short, very intense plays separated by rest between snaps.",
    demands: "Mostly anaerobic bursts with frequent recovery. Heavy equipment and heat increase cardiovascular and heat stress.",
    adaptations: "Improved power and repeated-sprint ability; conditioning helps recovery between plays and drives.",
    profile: { endurance: 2, bursts: 5, power: 5 },
    tip: "Heat acclimatization, hydration plans, and an emergency action plan are especially important in hot weather.",
  },
  {
    id: "soccer",
    name: "Soccer",
    pattern: "Long periods of continuous running mixed with sprints.",
    demands: "High aerobic demand over a long game, with many short high-intensity efforts.",
    adaptations: "Larger stroke volume and better oxygen use support work rate late in the game.",
    profile: { endurance: 5, bursts: 4, power: 3 },
    tip: "Plan fluids around halftime and breaks, especially in heat.",
  },
  {
    id: "track",
    name: "Track and field",
    pattern: "Varies widely: sprints and jumps are short and explosive; distance events are long and steady.",
    demands: "Sprinters rely heavily on anaerobic energy; distance runners rely mostly on aerobic energy.",
    adaptations: "Distance training strongly builds aerobic capacity; sprint training builds power and speed.",
    profile: { endurance: 4, bursts: 4, power: 4 },
    tip: "Your event changes the demand. Cool down after races to support recovery.",
  },
  {
    id: "swimming",
    name: "Swimming",
    pattern: "Continuous, rhythmic effort using both arms and legs, with controlled breathing.",
    demands: "Strong aerobic demand. Lying horizontally in water changes how blood returns to the heart compared with running.",
    adaptations: "Improved aerobic capacity and breathing control.",
    profile: { endurance: 5, bursts: 3, power: 3 },
    tip: "Never swim alone. Lifeguards and coaches should be trained in CPR and AED use.",
  },
  {
    id: "tennis",
    name: "Tennis",
    pattern: "Short rallies with brief rests between points, over long matches.",
    demands: "Mixed demand: explosive movement during points, aerobic recovery between points and games.",
    adaptations: "Improved repeated-sprint recovery and endurance for long matches.",
    profile: { endurance: 4, bursts: 4, power: 3 },
    tip: "Use changeovers to drink water and cool down in the shade.",
  },
  {
    id: "cycling",
    name: "Cycling",
    pattern: "Mostly continuous, steady effort with surges on climbs and sprints.",
    demands: "High aerobic demand over long durations.",
    adaptations: "Large improvements in aerobic capacity and muscle endurance.",
    profile: { endurance: 5, bursts: 3, power: 3 },
    tip: "Carry water on long rides and ride with a partner when you can.",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    pattern: "Short, explosive rallies with jumps and dives, then rest between points.",
    demands: "Mostly short anaerobic bursts with frequent recovery.",
    adaptations: "Improved jumping power and recovery between rallies.",
    profile: { endurance: 2, bursts: 4, power: 5 },
    tip: "Indoor gyms can get hot — keep water on the bench.",
  },
];

export interface Myth {
  id: string;
  myth: string;
  fact: string;
  sources: string[];
}

export const myths: Myth[] = [
  {
    id: "older-only",
    myth: "Only older adults have heart problems.",
    fact: "Heart conditions can affect people of any age. Some are present from birth or inherited, such as hypertrophic cardiomyopathy or long QT syndrome, and sudden cardiac arrest can happen in young people.",
    sources: ["aap-sca-young", "nhlbi-congenital"],
  },
  {
    id: "athletes-healthy",
    myth: "All athletes have perfectly healthy hearts.",
    fact: "Being fit doesn't rule out heart conditions. Some inherited conditions can go unnoticed in athletes, which is why symptoms and family history matter.",
    sources: ["aha-hcm-athletes", "aap-sca-young"],
  },
  {
    id: "feel-fit",
    myth: "If I feel fit, I don't need to pay attention to symptoms.",
    fact: "Chest pain, fainting, unusual shortness of breath, or a racing heart with other symptoms during exercise always deserve attention — no matter how fit you feel. Stop, tell an adult, and get checked.",
    sources: ["aap-sca-young", "aap-cardiomyopathy"],
  },
  {
    id: "aed-doctor",
    myth: "An AED can only be used by a doctor.",
    fact: "AEDs are designed for use by the public. They give spoken instructions and only deliver a shock if one is needed. Anyone can turn one on and follow the prompts.",
    sources: ["nhlbi-defibrillators", "aha-what-is-cpr"],
  },
  {
    id: "attack-arrest",
    myth: "A heart attack and cardiac arrest are the same thing.",
    fact: "A heart attack is a blockage of blood flow to the heart muscle; the person is usually awake. Cardiac arrest is an electrical problem where the heart suddenly stops pumping effectively, and the person collapses.",
    sources: ["aha-arrest-vs-attack"],
  },
  {
    id: "cpr-hurt",
    myth: "I could make things worse by doing CPR, so it's safer to wait.",
    fact: "Someone in cardiac arrest needs help immediately. Calling 911 and starting CPR right away gives them the best chance — dispatchers can coach you through it.",
    sources: ["aha-what-is-cpr", "nhlbi-cardiac-arrest"],
  },
  {
    id: "normal-hr",
    myth: "A normal heart-rate reading means my heart is fine.",
    fact: "A heart rate in the typical range can't rule out heart disease. Many conditions don't change resting heart rate. Symptoms and family history still matter.",
    sources: ["aha-heart-rate", "aap-sca-young"],
  },
  {
    id: "gasping",
    myth: "If someone who collapsed is gasping, they're breathing and don't need CPR.",
    fact: "Gasping is not normal breathing. Someone who collapses and is unresponsive with gasping or no normal breathing may be in cardiac arrest — call 911 and start CPR.",
    sources: ["aha-what-is-cpr", "acc-cardiosmart-sca"],
  },
];

export interface Fact {
  id: string;
  stat: string;
  text: string;
  source: string;
}

export const facts: Fact[] = [
  {
    id: "activity",
    stat: "60+ min",
    text: "of moderate-to-vigorous physical activity each day is recommended for kids and teens ages 6–17.",
    source: "cdc-child-activity",
  },
  {
    id: "sleep",
    stat: "8–10 hrs",
    text: "of sleep per 24 hours is recommended for teens ages 13–17.",
    source: "cdc-sleep",
  },
  {
    id: "cpr-rate",
    stat: "100–120",
    text: "chest compressions per minute is the recommended pace for Hands-Only CPR on a teen or adult.",
    source: "aha-what-is-cpr",
  },
  {
    id: "minutes",
    stat: "Minutes",
    text: "matter: sudden cardiac arrest can be fatal if not treated within minutes, so bystander CPR and AED use are critical.",
    source: "aap-sca-young",
  },
];
