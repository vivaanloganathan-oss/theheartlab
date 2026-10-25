import type { Question } from "./types";

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const knowledgeChallenge: QuizSet = {
  id: "knowledge-challenge",
  title: "Knowledge Challenge",
  description: "Ten mixed questions on anatomy, exercise, recovery, and safety.",
  questions: [
    {
      id: "kc1",
      kind: "multiple-choice",
      prompt: "Which chamber pumps oxygen-rich blood out to the body?",
      options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
      answerIndex: 3,
      explanation: "The left ventricle pumps oxygen-rich blood into the aorta and out to the body.",
      relatedModule: "heart-anatomy",
    },
    {
      id: "kc2",
      kind: "multiple-choice",
      prompt: "Put it in order: after the right ventricle, blood goes to…",
      options: ["The aorta", "The lungs", "The left atrium", "The brain"],
      answerIndex: 1,
      explanation: "The right ventricle pumps blood through the pulmonary arteries to the lungs.",
      relatedModule: "blood-circulation",
    },
    {
      id: "kc3",
      kind: "true-false",
      prompt: "True or false: There is one \"normal\" resting heart rate that applies to every athlete.",
      options: ["True", "False"],
      answerIndex: 1,
      explanation: "False. Resting heart rate varies between healthy people because of fitness, genetics, and many other factors.",
      relatedModule: "understanding-pulse",
    },
    {
      id: "kc4",
      kind: "multiple-choice",
      prompt: "Cardiac output is…",
      options: ["Heart rate × stroke volume", "Breaths per minute", "Blood pressure ÷ heart rate", "The size of the heart"],
      answerIndex: 0,
      explanation: "Cardiac output = heart rate × stroke volume.",
      relatedModule: "exercise-physiology",
    },
    {
      id: "kc5",
      kind: "multiple-choice",
      prompt: "Which is a warning sign that needs medical evaluation?",
      options: ["Sore muscles the next day", "Breathing hard after sprints", "Chest pain during exercise", "Feeling hungry after practice"],
      answerIndex: 2,
      explanation: "Chest pain or discomfort during exercise is a warning sign. Stop, tell an adult, and get checked.",
      relatedModule: "warning-signs",
    },
    {
      id: "kc6",
      kind: "true-false",
      prompt: "True or false: Cardiac arrest and heart attack are the same thing.",
      options: ["True", "False"],
      answerIndex: 1,
      explanation: "False. Cardiac arrest is an electrical problem where the heart stops pumping effectively; a heart attack is a blockage of blood flow.",
      relatedModule: "emergency-awareness",
    },
    {
      id: "kc7",
      kind: "multiple-choice",
      prompt: "Who can use an AED?",
      options: ["Only doctors", "Only paramedics", "Anyone — it gives voice instructions", "Only certified coaches"],
      answerIndex: 2,
      explanation: "AEDs are designed for use by the public and guide the user with voice prompts.",
      relatedModule: "cpr-aed",
    },
    {
      id: "kc8",
      kind: "multiple-choice",
      prompt: "How much sleep does the CDC recommend for teens ages 13–17?",
      options: ["5–6 hours", "6–7 hours", "8–10 hours", "11–13 hours"],
      answerIndex: 2,
      explanation: "8–10 hours per 24 hours.",
      relatedModule: "recovery-hydration",
    },
    {
      id: "kc9",
      kind: "scenario",
      scenario: "Your friend says their resting heart rate is in the typical range, so their chest pain during practice must be nothing.",
      prompt: "Is that right?",
      options: [
        "Yes — a normal heart rate rules out heart problems",
        "No — a normal heart rate can't rule out heart disease; chest pain during exercise needs evaluation",
        "Yes — but only if they feel fit",
        "Only if their watch agrees",
      ],
      answerIndex: 1,
      explanation: "A typical heart rate doesn't rule out heart conditions. Exercise-related chest pain needs a medical evaluation.",
      relatedModule: "warning-signs",
    },
    {
      id: "kc10",
      kind: "multiple-choice",
      prompt: "What is an emergency action plan?",
      options: [
        "A written, practiced plan for who does what in an emergency",
        "A workout program",
        "A form for sports clearance",
        "A list of team snacks",
      ],
      answerIndex: 0,
      explanation: "An EAP assigns roles — calling 911, CPR, getting the AED, guiding EMS — and should be rehearsed.",
      relatedModule: "heart-aware-culture",
    },
  ],
};

export const scenarioChallenge: QuizSet = {
  id: "what-would-you-do",
  title: "What Would You Do?",
  description: "Five real-world situations. Pick the best response and learn why.",
  questions: [
    {
      id: "wy1",
      kind: "scenario",
      scenario: "A teammate collapses during basketball practice. They are unresponsive and not breathing normally.",
      prompt: "What should you do first?",
      options: [
        "Wait a minute to see if they wake up",
        "Call 911 (or have a specific person call), start CPR, and send someone for the AED",
        "Give them water",
        "Move them to the locker room",
      ],
      answerIndex: 1,
      explanation:
        "Treat this as possible cardiac arrest. Call 911 or point to a specific person to call, start Hands-Only CPR — push hard and fast in the center of the chest — and use the AED as soon as it arrives by following its voice prompts.",
      relatedModule: "emergency-awareness",
    },
    {
      id: "wy2",
      kind: "scenario",
      scenario: "The AED arrives while someone is doing CPR on a collapsed player.",
      prompt: "What happens next?",
      options: [
        "Wait for paramedics before using it",
        "Turn the AED on and follow its voice prompts; keep CPR interruptions as short as possible",
        "Only a doctor can open it",
        "Stop CPR and wait for the player to wake up",
      ],
      answerIndex: 1,
      explanation:
        "Anyone can use an AED. Turn it on and follow the prompts. It analyzes the rhythm and only advises a shock if needed. Resume CPR when the AED tells you to.",
      relatedModule: "cpr-aed",
    },
    {
      id: "wy3",
      kind: "scenario",
      scenario: "During a soccer game, you feel your heart suddenly racing and fluttering, and you feel dizzy.",
      prompt: "What should you do?",
      options: [
        "Keep playing — it's probably adrenaline",
        "Signal to come off, stop playing, tell your coach or athletic trainer, and get evaluated by a healthcare professional",
        "Drink an energy drink",
        "Check your watch and keep playing if the number looks okay",
      ],
      answerIndex: 1,
      explanation:
        "A racing or irregular heartbeat with dizziness is a warning sign. Stop, tell an adult, and get evaluated. If symptoms are severe or you faint, someone should call 911.",
      relatedModule: "warning-signs",
    },
    {
      id: "wy4",
      kind: "scenario",
      scenario: "Your parent mentions that an uncle died suddenly of an unknown heart problem at age 35.",
      prompt: "What's the best next step?",
      options: [
        "Nothing — it was a different person",
        "Share this family history with your doctor, including at your sports physical",
        "Stop playing sports forever",
        "Look up a diagnosis online",
      ],
      answerIndex: 1,
      explanation:
        "Sudden, unexplained death in a relative under 50 is important family history. Your doctor can decide whether further evaluation is needed.",
      relatedModule: "warning-signs",
    },
    {
      id: "wy5",
      kind: "scenario",
      scenario: "A friend has been sick with a virus. They're back at practice but say they get short of breath and their chest feels tight.",
      prompt: "What should you encourage?",
      options: [
        "Push harder to get fitness back quickly",
        "Stop training and talk to a healthcare professional before returning to hard exercise",
        "Ignore it — everyone feels tired after being sick",
        "Take extra caffeine",
      ],
      answerIndex: 1,
      explanation:
        "Chest symptoms or unusual breathlessness after a viral illness should be checked by a healthcare professional before hard training, since infections can sometimes affect the heart.",
      relatedModule: "warning-signs",
    },
  ],
};

export const quizSets = [knowledgeChallenge, scenarioChallenge];
