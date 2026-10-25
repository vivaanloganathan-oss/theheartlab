import { PENDING_REVIEW, type ContentMeta } from "./types";

export interface Checklist {
  id: string;
  audience: "parents" | "coaches";
  title: string;
  intro: string;
  items: string[];
}

export interface GuideSection {
  id: string;
  title: string;
  body: string[];
}

export const resourcesMeta: ContentMeta = {
  category: "community",
  readingLevel: "ambassador",
  sources: ["aap-sca-young", "aap-sca-schools", "aha-what-is-cpr", "nhlbi-defibrillators"],
  review: PENDING_REVIEW("2026-10-25"),
};

export const parentGuide: GuideSection[] = [
  {
    id: "understanding",
    title: "Understanding athlete heart health",
    body: [
      "Most young athletes have healthy hearts, and regular activity is good for them. A small number have heart conditions that may not have been diagnosed — some are inherited.",
      "Knowing the warning signs and your family history are two of the most useful things a parent can do.",
    ],
  },
  {
    id: "family-history",
    title: "Family medical history awareness",
    body: [
      "Talk with relatives about heart conditions in the family. Important history includes: sudden or unexplained death before age 50, unexplained fainting or seizures, drowning or single-car accidents without a clear cause, and known inherited heart muscle or rhythm conditions.",
      "Share this with your child's healthcare professional. Update it when you learn something new.",
    ],
  },
  {
    id: "recognizing",
    title: "Recognizing warning signs",
    body: [
      "Chest pain during exercise, fainting or near-fainting (especially with exercise), unusual shortness of breath, a racing or irregular heartbeat with other symptoms, and an unexplained drop in exercise ability all deserve medical evaluation.",
      "Encourage your child to tell you or a coach right away — and make sure they know they won't be in trouble for speaking up.",
    ],
  },
  {
    id: "physicals",
    title: "Preparing for sports physicals",
    body: [
      "Fill out history forms carefully and honestly — the questions about symptoms and family history matter.",
      "Bring a list of medications and supplements, and mention any symptoms your child has noticed, even if they went away.",
    ],
  },
];

export const coachGuide: GuideSection[] = [
  {
    id: "recognizing",
    title: "Recognizing concerning symptoms",
    body: [
      "Remove an athlete from activity if they report or show chest pain, fainting or near-fainting, unusual shortness of breath, palpitations with other symptoms, or an unexplained drop in ability. Return to play should follow medical evaluation.",
      "A collapse without contact — or after a blow to the chest — should be treated as possible cardiac arrest until proven otherwise.",
    ],
  },
  {
    id: "reporting",
    title: "Encouraging athletes to report symptoms",
    body: [
      "Tell your team, early and often, that reporting symptoms is expected and won't be punished. Model it: praise athletes who speak up.",
      "Avoid language like \"play through it\" for chest pain, fainting, or breathing problems.",
    ],
  },
  {
    id: "eap",
    title: "Emergency action planning",
    body: [
      "Have a written, venue-specific emergency action plan that names who calls 911, who starts CPR, who retrieves the AED, and who guides EMS. Include addresses and access points for every practice and game location.",
      "Rehearse it with staff — and athletes — at the start of every season.",
    ],
  },
  {
    id: "cpr-aed",
    title: "CPR and AED training awareness",
    body: [
      "Coaches and staff benefit from current, hands-on CPR and AED training from a recognized provider. Know where every AED is, check that it's accessible during practices and events, and make sure it's maintained.",
    ],
  },
  {
    id: "culture",
    title: "Creating a supportive safety culture",
    body: [
      "Normalize hydration breaks, rest days, and honest conversations about how athletes feel. A culture of safety helps athletes perform and stay in the game longer.",
    ],
  },
];

export const checklists: Checklist[] = [
  {
    id: "family-history",
    audience: "parents",
    title: "Family Heart History Checklist",
    intro: "Ask relatives about these and share anything you learn with your child's healthcare professional.",
    items: [
      "Any relative who died suddenly and unexpectedly before age 50",
      "Any relative with unexplained fainting, seizures, or drowning",
      "Known inherited heart conditions (e.g., hypertrophic cardiomyopathy, long QT syndrome)",
      "Relatives with a pacemaker or implanted defibrillator at a young age",
      "Any relative diagnosed with heart disease before age 50",
    ],
  },
  {
    id: "sports-physical",
    audience: "parents",
    title: "Sports Physical Prep Checklist",
    intro: "Bring this with you to your child's pre-participation evaluation.",
    items: [
      "Completed history form (answered honestly and fully)",
      "Family heart history notes",
      "List of medications, supplements, and energy drinks used",
      "Any symptoms noticed during exercise — even if they went away",
      "Questions for the healthcare professional (see list below)",
    ],
  },
  {
    id: "questions",
    audience: "parents",
    title: "Questions to Ask a Healthcare Professional",
    intro: "Use these to start a conversation. Your clinician will guide what's relevant for your child.",
    items: [
      "Based on my child's history and our family history, is any additional heart evaluation recommended?",
      "Which symptoms should make us stop activity and call you?",
      "Are any of my child's medications or supplements a concern during exercise?",
      "How should we approach returning to sports after an illness?",
      "Where can our family learn CPR?",
    ],
  },
  {
    id: "eap",
    audience: "coaches",
    title: "Emergency Action Plan Checklist",
    intro: "Review before every season and at every new venue.",
    items: [
      "Written EAP for each practice and game venue",
      "Roles assigned: caller, CPR responder, AED runner, EMS guide",
      "Exact address and access points (gates, doors) for EMS",
      "AED location known; reachable quickly from every field or court",
      "AED checked and maintained per manufacturer guidance",
      "Phone available at every practice",
      "EAP rehearsed with staff and athletes this season",
    ],
  },
  {
    id: "symptoms",
    audience: "coaches",
    title: "Symptom Response Checklist",
    intro: "Remove from activity and refer for medical evaluation if an athlete reports or shows:",
    items: [
      "Chest pain or discomfort with exercise",
      "Fainting or near-fainting, especially during or right after exercise",
      "Unusual or disproportionate shortness of breath",
      "Racing, pounding, or irregular heartbeat with other symptoms",
      "Unexplained drop in exercise ability",
      "Collapse → call 911, start CPR, get the AED",
    ],
  },
  {
    id: "culture",
    audience: "coaches",
    title: "Heart-Safe Team Culture Checklist",
    intro: "Small habits that make it easier for athletes to speak up.",
    items: [
      "Told the team that reporting symptoms is expected and won't be punished",
      "Water available and breaks scheduled, especially in heat",
      "Rest days built into the training plan",
      "CPR/AED training opportunities shared with athletes and families",
      "Athletes know where the AED is",
    ],
  },
];
