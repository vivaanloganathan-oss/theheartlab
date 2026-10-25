import { PENDING_REVIEW, type ContentCategory, type Question, type ReadingLevel, type ReviewMeta } from "./types";

export type Illustration =
  | "heart-diagram"
  | "circulation"
  | "ecg"
  | "pulse"
  | "cardiac-output"
  | "warning"
  | "chain-of-survival"
  | "team";

export interface LessonSection {
  heading: string;
  body: string[];
  illustration?: Illustration;
}

export type Activity =
  | { type: "order"; prompt: string; items: string[] }
  | { type: "sort"; prompt: string; categories: string[]; items: { text: string; category: string }[] }
  | { type: "match"; prompt: string; pairs: { term: string; definition: string }[] };

export interface Module {
  id: string;
  level: ReadingLevel;
  title: string;
  summary: string;
  minutes: number;
  category: ContentCategory;
  sources: string[];
  review: ReviewMeta;
  lesson: LessonSection[];
  activity: Activity;
  quiz: Question[];
}

export interface Level {
  id: ReadingLevel;
  number: 1 | 2 | 3;
  name: string;
  audience: string;
  badge: string;
  modules: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  /** Module IDs that must all be complete. */
  requires: string[];
}

const review = PENDING_REVIEW("2026-10-25");

export const modules: Module[] = [
  // ───────────── LEVEL 1 — HEART ROOKIE ─────────────
  {
    id: "heart-anatomy",
    level: "rookie",
    title: "Heart Anatomy",
    summary: "Meet the four chambers, four valves, and the big vessels that make your heart a pump.",
    minutes: 8,
    category: "anatomy",
    sources: ["nhlbi-anatomy", "nhlbi-blood-flow"],
    review,
    lesson: [
      {
        heading: "Your heart is a two-sided pump",
        body: [
          "Your heart is a muscle about the size of your fist, sitting in the middle of your chest and tilted slightly to the left.",
          "It has two sides separated by a wall called the septum. The right side pumps blood to your lungs. The left side pumps blood to the rest of your body.",
        ],
        illustration: "heart-diagram",
      },
      {
        heading: "Four chambers",
        body: [
          "Each side has an upper chamber (an atrium) that receives blood and a lower chamber (a ventricle) that pumps it out.",
          "The left ventricle has the thickest, strongest wall because it pumps blood to your whole body.",
        ],
      },
      {
        heading: "Four valves keep traffic one-way",
        body: [
          "The tricuspid and mitral valves sit between the atria and ventricles. The pulmonary and aortic valves sit where blood leaves the ventricles.",
          "Valves open to let blood through and close to stop it from flowing backward. Their closing makes the \"lub-dub\" sound of your heartbeat.",
        ],
      },
      {
        heading: "Big vessels",
        body: [
          "The aorta carries oxygen-rich blood from the left ventricle to the body. The pulmonary arteries carry oxygen-poor blood to the lungs. The pulmonary veins bring oxygen-rich blood back to the heart.",
        ],
      },
    ],
    activity: {
      type: "match",
      prompt: "Match each heart part to its job.",
      pairs: [
        { term: "Left ventricle", definition: "Pumps oxygen-rich blood out to the body" },
        { term: "Right ventricle", definition: "Pumps oxygen-poor blood to the lungs" },
        { term: "Valves", definition: "Keep blood flowing in one direction" },
        { term: "Aorta", definition: "Largest artery leaving the heart" },
      ],
    },
    quiz: [
      {
        id: "ha1",
        kind: "multiple-choice",
        prompt: "How many chambers does the human heart have?",
        options: ["Two", "Three", "Four", "Six"],
        answerIndex: 2,
        explanation: "The heart has four chambers: right atrium, right ventricle, left atrium, and left ventricle.",
      },
      {
        id: "ha2",
        kind: "multiple-choice",
        prompt: "Which chamber has the thickest, strongest wall?",
        options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
        answerIndex: 3,
        explanation: "The left ventricle pumps blood to the entire body, so it has the thickest muscular wall.",
      },
      {
        id: "ha3",
        kind: "true-false",
        prompt: "True or false: Heart valves let blood flow in both directions.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Valves are one-way doors that stop blood from flowing backward.",
      },
      {
        id: "ha4",
        kind: "multiple-choice",
        prompt: "Where does the right side of the heart send blood?",
        options: ["To the brain", "To the lungs", "To the legs", "To the stomach"],
        answerIndex: 1,
        explanation: "The right side pumps oxygen-poor blood to the lungs to pick up oxygen.",
      },
      {
        id: "ha5",
        kind: "multiple-choice",
        prompt: "What makes the \"lub-dub\" sound of a heartbeat?",
        options: ["Blood hitting the ribs", "Valves closing", "The lungs filling", "Muscles stretching"],
        answerIndex: 1,
        explanation: "The heartbeat sounds come mainly from heart valves closing.",
      },
    ],
  },
  {
    id: "blood-circulation",
    level: "rookie",
    title: "Blood Circulation",
    summary: "Follow a drop of blood on its trip from body to heart to lungs and back.",
    minutes: 7,
    category: "anatomy",
    sources: ["nhlbi-blood-flow"],
    review,
    lesson: [
      {
        heading: "Two loops, one heart",
        body: [
          "Blood travels in two connected loops. The lung loop (pulmonary circulation) picks up oxygen. The body loop (systemic circulation) delivers it.",
          "Body → right heart → lungs → left heart → body. Then it repeats, again and again, with every beat.",
        ],
        illustration: "circulation",
      },
      {
        heading: "Oxygen pick-up and drop-off",
        body: [
          "In the lungs, blood gives off carbon dioxide and picks up oxygen. In the muscles and organs, blood drops off oxygen and collects carbon dioxide.",
          "Diagrams often show oxygen-rich blood in red and oxygen-poor blood in blue. Real blood is always red — just brighter or darker red.",
        ],
      },
      {
        heading: "Arteries, veins, and capillaries",
        body: [
          "Arteries carry blood away from the heart. Veins carry blood back to the heart. Capillaries are tiny vessels where oxygen and nutrients move into tissues.",
        ],
      },
    ],
    activity: {
      type: "order",
      prompt: "Put the stops in the order blood visits them, starting from the body.",
      items: ["Body (oxygen-poor blood returns)", "Right atrium", "Right ventricle", "Lungs", "Left atrium", "Left ventricle", "Aorta → body"],
    },
    quiz: [
      {
        id: "bc1",
        kind: "multiple-choice",
        prompt: "Where does blood pick up oxygen?",
        options: ["In the heart", "In the lungs", "In the muscles", "In the stomach"],
        answerIndex: 1,
        explanation: "Blood picks up oxygen and releases carbon dioxide in the lungs.",
      },
      {
        id: "bc2",
        kind: "multiple-choice",
        prompt: "Which vessels carry blood away from the heart?",
        options: ["Veins", "Arteries", "Capillaries", "Valves"],
        answerIndex: 1,
        explanation: "Arteries carry blood away from the heart; veins return it.",
      },
      {
        id: "bc3",
        kind: "true-false",
        prompt: "True or false: Oxygen-poor blood is actually blue.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Blood is always red. Blue is just a diagram convention.",
      },
      {
        id: "bc4",
        kind: "multiple-choice",
        prompt: "After leaving the lungs, oxygen-rich blood goes next to…",
        options: ["The right atrium", "The left atrium", "The aorta", "The legs"],
        answerIndex: 1,
        explanation: "Pulmonary veins bring oxygen-rich blood from the lungs to the left atrium.",
      },
      {
        id: "bc5",
        kind: "multiple-choice",
        prompt: "Where do oxygen and nutrients move from the blood into tissues?",
        options: ["Aorta", "Capillaries", "Valves", "Atria"],
        answerIndex: 1,
        explanation: "Capillaries are tiny vessels with thin walls where exchange with tissues happens.",
      },
    ],
  },
  {
    id: "understanding-pulse",
    level: "rookie",
    title: "Understanding Pulse",
    summary: "Learn what your pulse is, where to find it, and why everyone's is a little different.",
    minutes: 6,
    category: "physiology",
    sources: ["medlineplus-pulse", "nhlbi-heart-beats", "aha-heart-rate"],
    review,
    lesson: [
      {
        heading: "What is a pulse?",
        body: [
          "Each time your left ventricle pumps, a wave of pressure travels through your arteries. You can feel that wave as your pulse. Your pulse rate usually matches your heart rate.",
        ],
        illustration: "pulse",
      },
      {
        heading: "Where to find it",
        body: [
          "The easiest spots are the wrist (below the thumb) and the side of the neck. Use your index and middle fingers, not your thumb. Never press on both sides of the neck at once.",
          "Count beats for 30 seconds and multiply by 2, or count for 15 seconds and multiply by 4.",
        ],
      },
      {
        heading: "Everyone is different",
        body: [
          "For people about 10 and older, resting rates of about 60–100 beats per minute are commonly described as typical, and many well-trained athletes are lower.",
          "Your number depends on many things — fitness, genetics, sleep, stress, caffeine, illness, temperature. A typical number doesn't rule out a heart problem, and symptoms always matter more than a single reading.",
        ],
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which of these can change your heart rate? Sort each item.",
      categories: ["Can raise heart rate", "Can lower heart rate"],
      items: [
        { text: "Exercise", category: "Can raise heart rate" },
        { text: "Feeling nervous before a game", category: "Can raise heart rate" },
        { text: "Caffeine", category: "Can raise heart rate" },
        { text: "Having a fever", category: "Can raise heart rate" },
        { text: "Resting quietly", category: "Can lower heart rate" },
        { text: "Deep sleep", category: "Can lower heart rate" },
      ],
    },
    quiz: [
      {
        id: "up1",
        kind: "multiple-choice",
        prompt: "If you count 18 beats in 15 seconds, what is the rate per minute?",
        options: ["36", "54", "72", "90"],
        answerIndex: 2,
        explanation: "18 × 4 = 72 beats per minute.",
      },
      {
        id: "up2",
        kind: "multiple-choice",
        prompt: "Which fingers should you use to check a pulse?",
        options: ["Thumb", "Index and middle fingers", "Pinky", "Any finger"],
        answerIndex: 1,
        explanation: "Use your index and middle fingers. Your thumb has its own pulse that can confuse the count.",
      },
      {
        id: "up3",
        kind: "true-false",
        prompt: "True or false: Every healthy teen has the same resting heart rate.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Resting heart rate varies a lot between healthy people.",
      },
      {
        id: "up4",
        kind: "true-false",
        prompt: "True or false: A heart rate in the typical range proves you have no heart problems.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Many heart conditions don't change resting heart rate. Symptoms and family history still matter.",
      },
      {
        id: "up5",
        kind: "multiple-choice",
        prompt: "What causes the pulse you feel at your wrist?",
        options: ["Air moving in your lungs", "A pressure wave from each heartbeat", "Muscle twitching", "Your nerves firing"],
        answerIndex: 1,
        explanation: "Each heartbeat sends a pressure wave through the arteries that you feel as a pulse.",
      },
    ],
  },
  {
    id: "exercise-heart-rate",
    level: "rookie",
    title: "Why Exercise Affects Heart Rate",
    summary: "Discover why your heart speeds up when you play and slows down when you rest.",
    minutes: 7,
    category: "physiology",
    sources: ["nhlbi-heart-beats", "cdc-measuring-intensity"],
    review,
    lesson: [
      {
        heading: "Muscles need oxygen",
        body: [
          "Working muscles burn fuel using oxygen. The harder they work, the more oxygen they need — so your heart beats faster and harder to deliver more blood.",
        ],
        illustration: "ecg",
      },
      {
        heading: "Your body's control system",
        body: [
          "Your nervous system and hormones like adrenaline adjust heart rate automatically. You don't have to think about it.",
          "Even before you start, excitement can raise your heart rate.",
        ],
      },
      {
        heading: "The talk test",
        body: [
          "At moderate intensity you can talk but not sing. At vigorous intensity you can only say a few words without stopping for breath. It's a simple way to judge effort without any device.",
        ],
      },
    ],
    activity: {
      type: "order",
      prompt: "Order these activities from lowest to highest typical effort.",
      items: ["Sitting and reading", "Walking to class", "Easy jog", "Fast run", "All-out sprint"],
    },
    quiz: [
      {
        id: "eh1",
        kind: "multiple-choice",
        prompt: "Why does your heart rate go up during exercise?",
        options: ["To cool your skin only", "To deliver more oxygen to working muscles", "Because you are scared", "To slow breathing"],
        answerIndex: 1,
        explanation: "Working muscles need more oxygen, so the heart pumps more blood each minute.",
      },
      {
        id: "eh2",
        kind: "multiple-choice",
        prompt: "During vigorous activity, the talk test says you can…",
        options: ["Sing easily", "Talk in full paragraphs", "Say only a few words before pausing for breath", "Talk normally"],
        answerIndex: 2,
        explanation: "At vigorous intensity you can say only a few words without pausing for breath.",
      },
      {
        id: "eh3",
        kind: "true-false",
        prompt: "True or false: Your heart rate can rise before a game even if you're standing still.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. Excitement and adrenaline can raise heart rate before activity starts.",
      },
      {
        id: "eh4",
        kind: "multiple-choice",
        prompt: "Which hormone helps speed up the heart during exercise?",
        options: ["Insulin", "Adrenaline", "Melatonin", "Calcium"],
        answerIndex: 1,
        explanation: "Adrenaline (epinephrine) increases heart rate and the strength of contraction.",
      },
      {
        id: "eh5",
        kind: "scenario",
        scenario: "During practice, you feel your heart pounding fast while sprinting, and it settles when you rest. You feel fine otherwise.",
        prompt: "What is this most likely?",
        options: [
          "A normal response to hard exercise",
          "Definitely a heart condition",
          "A reason to never sprint again",
          "Something only a fitness watch can explain",
        ],
        answerIndex: 0,
        explanation:
          "A fast, strong heartbeat during hard effort that settles with rest is a normal response. If it ever comes with chest pain, dizziness, fainting, or happens without reason, stop and tell an adult.",
        relatedModule: "warning-signs",
      },
    ],
  },

  // ───────────── LEVEL 2 — HEART CHAMPION ─────────────
  {
    id: "exercise-physiology",
    level: "champion",
    title: "Exercise Physiology",
    summary: "Cardiac output, stroke volume, and how your body shifts blood to the muscles that need it.",
    minutes: 10,
    category: "physiology",
    sources: ["nhlbi-heart-beats", "odphp-pa-guidelines"],
    review,
    lesson: [
      {
        heading: "Cardiac output",
        body: [
          "Cardiac output is the amount of blood your heart pumps per minute. It equals heart rate × stroke volume (blood pumped per beat).",
          "During hard exercise, cardiac output can rise to several times its resting value.",
        ],
        illustration: "cardiac-output",
      },
      {
        heading: "Redirecting blood flow",
        body: [
          "During exercise, blood vessels in working muscles widen and more blood is sent there. Some blood also goes to the skin to release heat.",
        ],
      },
      {
        heading: "Energy systems",
        body: [
          "Aerobic energy uses oxygen and powers long, steady efforts. Anaerobic energy powers short, intense bursts. Most sports use both.",
        ],
      },
    ],
    activity: {
      type: "match",
      prompt: "Match each term to its meaning.",
      pairs: [
        { term: "Heart rate", definition: "Beats per minute" },
        { term: "Stroke volume", definition: "Blood pumped with each beat" },
        { term: "Cardiac output", definition: "Blood pumped per minute" },
        { term: "Aerobic", definition: "Energy production using oxygen" },
      ],
    },
    quiz: [
      {
        id: "ep1",
        kind: "multiple-choice",
        prompt: "If heart rate goes up and stroke volume stays the same, cardiac output…",
        options: ["Goes down", "Goes up", "Stays the same", "Drops to zero"],
        answerIndex: 1,
        explanation: "Cardiac output = heart rate × stroke volume, so a higher heart rate raises it.",
      },
      {
        id: "ep2",
        kind: "multiple-choice",
        prompt: "Where does extra blood flow go during exercise?",
        options: ["Mostly to the stomach", "To working muscles and the skin", "Only to the brain", "Nowhere — flow stays the same"],
        answerIndex: 1,
        explanation: "Blood is redirected to working muscles, and some goes to the skin to release heat.",
      },
      {
        id: "ep3",
        kind: "multiple-choice",
        prompt: "A 400 m all-out run uses…",
        options: ["Only aerobic energy", "Only anaerobic energy", "A mix, with a big anaerobic contribution", "No energy systems"],
        answerIndex: 2,
        explanation: "Hard efforts of this length draw heavily on anaerobic energy while aerobic energy also contributes.",
      },
      {
        id: "ep4",
        kind: "true-false",
        prompt: "True or false: Stroke volume is the amount of blood pumped per minute.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Stroke volume is per beat. Cardiac output is per minute.",
      },
      {
        id: "ep5",
        kind: "multiple-choice",
        prompt: "Why does some blood go to the skin during exercise?",
        options: ["To make you look red for fun", "To help release body heat", "To store oxygen", "To slow the heart"],
        answerIndex: 1,
        explanation: "Sending blood to the skin helps the body release heat.",
      },
    ],
  },
  {
    id: "cardio-endurance",
    level: "champion",
    title: "Cardiovascular Endurance",
    summary: "How training builds a stronger aerobic engine — and why it takes time.",
    minutes: 8,
    category: "training",
    sources: ["odphp-pa-guidelines", "cdc-child-activity"],
    review,
    lesson: [
      {
        heading: "What endurance training changes",
        body: [
          "With regular aerobic training, the heart can pump more blood per beat, muscles develop more capillaries, and muscle cells get better at using oxygen.",
          "As a result, many trained athletes have a lower heart rate at the same workload than they did before training.",
        ],
      },
      {
        heading: "Build gradually",
        body: [
          "Increase training load gradually and mix harder days with easier days. Guidelines recommend at least 60 minutes of moderate-to-vigorous activity daily for young people, mostly aerobic, plus muscle- and bone-strengthening activity at least 3 days a week.",
        ],
      },
      {
        heading: "Fitness doesn't mean immune",
        body: [
          "Even highly fit athletes can have heart conditions. Endurance never replaces paying attention to warning symptoms.",
        ],
        illustration: "warning",
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort these into healthy training habits vs. habits to avoid.",
      categories: ["Healthy habit", "Avoid"],
      items: [
        { text: "Increasing training gradually", category: "Healthy habit" },
        { text: "Mixing hard and easy days", category: "Healthy habit" },
        { text: "Taking planned rest days", category: "Healthy habit" },
        { text: "Doubling your mileage overnight", category: "Avoid" },
        { text: "Training through chest pain", category: "Avoid" },
        { text: "Skipping water in the heat", category: "Avoid" },
      ],
    },
    quiz: [
      {
        id: "ce1",
        kind: "multiple-choice",
        prompt: "Which is a typical adaptation to aerobic training?",
        options: ["Less blood pumped per beat", "More capillaries in muscles", "Weaker heart muscle", "Higher resting heart rate in everyone"],
        answerIndex: 1,
        explanation: "Aerobic training can increase capillaries in muscles and the amount of blood pumped per beat.",
      },
      {
        id: "ce2",
        kind: "multiple-choice",
        prompt: "How much daily physical activity is recommended for ages 6–17?",
        options: ["15 minutes", "30 minutes", "60 minutes or more", "3 hours minimum"],
        answerIndex: 2,
        explanation: "At least 60 minutes of moderate-to-vigorous activity per day.",
      },
      {
        id: "ce3",
        kind: "true-false",
        prompt: "True or false: Very fit athletes can't have heart conditions.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Fitness does not rule out inherited or acquired heart conditions.",
        relatedModule: "warning-signs",
      },
      {
        id: "ce4",
        kind: "multiple-choice",
        prompt: "What's the best way to build endurance?",
        options: ["Big jumps in training every day", "Gradual increases with rest and easier days", "Only sprinting", "Training only on game days"],
        answerIndex: 1,
        explanation: "Gradual progression with planned recovery lets the body adapt safely.",
      },
      {
        id: "ce5",
        kind: "multiple-choice",
        prompt: "After months of training, a runner's heart rate at the same easy pace is lower. Why?",
        options: [
          "Their heart is failing",
          "Each beat can pump more blood, so fewer beats are needed",
          "Their watch is broken",
          "They are dehydrated",
        ],
        answerIndex: 1,
        explanation: "Training can increase stroke volume, so the same cardiac output takes fewer beats.",
      },
    ],
  },
  {
    id: "recovery-hydration",
    level: "champion",
    title: "Recovery and Hydration",
    summary: "Sleep, water, food, and rest days — the training you do off the field.",
    minutes: 8,
    category: "recovery",
    sources: ["cdc-sleep", "cdc-water", "dietary-guidelines"],
    review,
    lesson: [
      {
        heading: "Recovery is part of training",
        body: [
          "Training stresses the body; recovery is when it rebuilds stronger. After exercise, heart rate drops quickly at first and then more gradually.",
          "Sleep is a big part of recovery: the CDC recommends 8–10 hours per 24 hours for teens ages 13–17 and 9–12 hours for ages 6–12.",
        ],
      },
      {
        heading: "Hydration",
        body: [
          "Sweat cools you but removes fluid. Losing too much fluid makes the heart work harder to circulate blood. Your body needs more water in heat, with more activity, and when you're sick.",
          "Signs like dizziness, confusion, or feeling very unwell in heat mean stop, cool down, and tell an adult.",
        ],
      },
      {
        heading: "Fuel",
        body: [
          "Balanced meals with whole grains, fruits, vegetables, and protein support training. Be cautious with energy drinks and supplements — ask a healthcare professional first.",
        ],
      },
    ],
    activity: {
      type: "sort",
      prompt: "Which of these support recovery?",
      categories: ["Supports recovery", "Works against recovery"],
      items: [
        { text: "8–10 hours of sleep (teens)", category: "Supports recovery" },
        { text: "Water before, during, and after practice", category: "Supports recovery" },
        { text: "A balanced meal after training", category: "Supports recovery" },
        { text: "Staying up late every night on your phone", category: "Works against recovery" },
        { text: "Energy drinks instead of water", category: "Works against recovery" },
        { text: "No rest days for weeks", category: "Works against recovery" },
      ],
    },
    quiz: [
      {
        id: "rh1",
        kind: "multiple-choice",
        prompt: "How much sleep does the CDC recommend for ages 6–12?",
        options: ["6–8 hours", "7–9 hours", "9–12 hours", "13–15 hours"],
        answerIndex: 2,
        explanation: "The CDC recommends 9–12 hours per 24 hours for ages 6–12.",
      },
      {
        id: "rh2",
        kind: "multiple-choice",
        prompt: "Why can dehydration make the heart work harder?",
        options: [
          "Lower fluid levels can reduce blood volume, so the heart beats faster to keep blood moving",
          "Water makes the heart heavier",
          "Dehydration slows the heart to zero",
          "It doesn't affect the heart at all",
        ],
        answerIndex: 0,
        explanation: "Fluid loss can reduce blood volume, and the heart typically compensates by beating faster.",
      },
      {
        id: "rh3",
        kind: "scenario",
        scenario: "At a hot practice, a teammate says they feel dizzy, confused, and sick to their stomach.",
        prompt: "What should happen?",
        options: [
          "Keep running to push through",
          "Stop activity, move to a cooler place, and tell the coach or athletic trainer right away",
          "Drink an energy drink and continue",
          "Ignore it until practice ends",
        ],
        answerIndex: 1,
        explanation:
          "These can be signs of a heat illness or another problem. Stop, cool down, and get an adult immediately. If they collapse or become unresponsive, call 911.",
      },
      {
        id: "rh4",
        kind: "true-false",
        prompt: "True or false: Heart rate drops fastest in the first minute or two after stopping exercise.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. Recovery is typically fastest at first, then levels off.",
      },
      {
        id: "rh5",
        kind: "multiple-choice",
        prompt: "What's a good default drink during practice?",
        options: ["Energy drink", "Soda", "Water", "Coffee"],
        answerIndex: 2,
        explanation: "Water is the best default choice for most practices.",
      },
    ],
  },
  {
    id: "warning-signs",
    level: "champion",
    title: "Warning Signs",
    summary: "The symptoms athletes should never ignore — and exactly what to do.",
    minutes: 10,
    category: "safety",
    sources: ["aap-sca-young", "aap-cardiomyopathy"],
    review,
    lesson: [
      {
        heading: "Symptoms you should never ignore",
        body: [
          "Chest pain or discomfort during exercise. Fainting or nearly fainting, especially during or right after exercise. Unusual shortness of breath. A racing or irregular heartbeat with other symptoms. An unexplained drop in your ability to exercise.",
          "Also important: a family history of inherited heart conditions or of sudden, unexplained death in a relative under 50.",
        ],
        illustration: "warning",
      },
      {
        heading: "Stop. Tell. Get checked.",
        body: [
          "If you have a warning symptom: stop the activity, tell a coach, athletic trainer, or parent right away, and get evaluated by a healthcare professional before returning to play.",
          "Never \"play through\" these symptoms, and never let a teammate do so. Only a healthcare professional can decide when it's safe to return.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Some young people who had sudden cardiac arrest had warning symptoms beforehand that didn't seem serious at the time. Speaking up early helps doctors find conditions that can be managed.",
        ],
      },
    ],
    activity: {
      type: "sort",
      prompt: "Sort each situation: expected during hard exercise, or a warning sign to report?",
      categories: ["Usually expected with hard exercise", "Warning sign — stop and report"],
      items: [
        { text: "Breathing hard after a sprint", category: "Usually expected with hard exercise" },
        { text: "Sore legs the day after a hard workout", category: "Usually expected with hard exercise" },
        { text: "Heart beating fast during a race, settling with rest", category: "Usually expected with hard exercise" },
        { text: "Chest pain while running", category: "Warning sign — stop and report" },
        { text: "Fainting during a game", category: "Warning sign — stop and report" },
        { text: "Racing heartbeat with dizziness at rest", category: "Warning sign — stop and report" },
      ],
    },
    quiz: [
      {
        id: "ws1",
        kind: "multiple-choice",
        prompt: "Which is a warning sign that needs medical evaluation?",
        options: ["Sweating during practice", "Fainting during exercise", "Breathing hard after sprints", "Being hungry after practice"],
        answerIndex: 1,
        explanation: "Fainting during exercise can signal a serious heart condition and always needs evaluation.",
      },
      {
        id: "ws2",
        kind: "scenario",
        scenario: "During conditioning, you feel chest tightness and get lightheaded. It goes away after a minute of rest.",
        prompt: "What should you do?",
        options: [
          "Finish the workout since it went away",
          "Stop, tell your coach or athletic trainer, and get checked by a healthcare professional before returning",
          "Wait to see if it happens three more times",
          "Look it up online and decide yourself",
        ],
        answerIndex: 1,
        explanation: "Chest discomfort with lightheadedness during exercise is a warning sign, even if it passes. Stop, tell, and get checked.",
      },
      {
        id: "ws3",
        kind: "true-false",
        prompt: "True or false: Family history of sudden unexplained death before age 50 is important to share with a doctor.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. Some heart conditions are inherited, and family history helps doctors decide on testing.",
      },
      {
        id: "ws4",
        kind: "multiple-choice",
        prompt: "Who decides when an athlete with warning symptoms can return to sports?",
        options: ["The athlete", "A teammate", "A healthcare professional", "A fitness app"],
        answerIndex: 2,
        explanation: "Return-to-play decisions after warning symptoms are made by healthcare professionals.",
      },
      {
        id: "ws5",
        kind: "true-false",
        prompt: "True or false: If your resting heart rate is normal, you can ignore chest pain during exercise.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. A normal heart rate never rules out heart disease. Chest pain during exercise needs evaluation.",
      },
    ],
  },

  // ───────────── LEVEL 3 — HEART AMBASSADOR ─────────────
  {
    id: "emergency-awareness",
    level: "ambassador",
    title: "Cardiac Emergency Awareness",
    summary: "Recognize cardiac arrest, understand how it differs from a heart attack, and know the chain of action.",
    minutes: 10,
    category: "emergency",
    sources: ["aha-arrest-vs-attack", "nhlbi-cardiac-arrest", "aap-sca-young"],
    review,
    lesson: [
      {
        heading: "Cardiac arrest vs. heart attack",
        body: [
          "Cardiac arrest is an electrical problem: the heart suddenly stops pumping effectively. The person collapses, is unresponsive, and isn't breathing normally.",
          "A heart attack is a circulation problem: blood flow to part of the heart muscle is blocked. The person is usually awake. Both are emergencies — call 911.",
        ],
      },
      {
        heading: "Recognize it",
        body: [
          "If an athlete collapses and is unresponsive and not breathing normally — including gasping — treat it as cardiac arrest. Don't assume it's a faint, a seizure, or exhaustion.",
        ],
      },
      {
        heading: "The chain of action",
        body: [
          "Call 911 → start CPR → get and use an AED → hand over to emergency responders. Every minute matters.",
        ],
        illustration: "chain-of-survival",
      },
    ],
    activity: {
      type: "order",
      prompt: "Put the emergency actions in order.",
      items: [
        "Recognize: collapsed, unresponsive, not breathing normally",
        "Call 911 (or have someone call)",
        "Start CPR — push hard and fast in the center of the chest",
        "Use the AED as soon as it arrives",
        "Continue until emergency responders take over",
      ],
    },
    quiz: [
      {
        id: "ea1",
        kind: "multiple-choice",
        prompt: "Cardiac arrest is mainly…",
        options: ["A blocked artery", "An electrical problem that stops effective pumping", "A muscle cramp", "A lung infection"],
        answerIndex: 1,
        explanation: "Cardiac arrest is caused by a malfunction of the heart's electrical system.",
      },
      {
        id: "ea2",
        kind: "true-false",
        prompt: "True or false: A person having a heart attack is usually awake.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. During a heart attack the heart usually keeps beating and the person is usually conscious.",
      },
      {
        id: "ea3",
        kind: "multiple-choice",
        prompt: "An athlete collapses and is gasping but unresponsive. This is…",
        options: ["Normal breathing — just wait", "Possible cardiac arrest — call 911 and start CPR", "Just exhaustion", "A reason to give water"],
        answerIndex: 1,
        explanation: "Gasping isn't normal breathing. Treat unresponsive + not breathing normally as cardiac arrest.",
      },
      {
        id: "ea4",
        kind: "multiple-choice",
        prompt: "What's the first action after recognizing possible cardiac arrest?",
        options: ["Post on social media", "Call 911 or have someone call", "Drive them home", "Wait five minutes"],
        answerIndex: 1,
        explanation: "Call 911 (or have a specific person call) immediately, then start CPR.",
      },
      {
        id: "ea5",
        kind: "true-false",
        prompt: "True or false: Both heart attack and cardiac arrest are emergencies that need 911.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. Call 911 for both.",
      },
    ],
  },
  {
    id: "cpr-aed",
    level: "ambassador",
    title: "CPR and AED Fundamentals",
    summary: "Hands-Only CPR basics and why anyone can use an AED. (Awareness only — not a certification.)",
    minutes: 10,
    category: "emergency",
    sources: ["aha-what-is-cpr", "nhlbi-defibrillators", "aap-sca-schools"],
    review,
    lesson: [
      {
        heading: "Hands-Only CPR",
        body: [
          "If you see a teen or adult suddenly collapse: call 911, then push hard and fast in the center of the chest. Aim for 100–120 compressions per minute.",
          "Infants, children, and people who collapse from drowning or breathing problems benefit from CPR that includes rescue breaths — formal training teaches this.",
        ],
        illustration: "chain-of-survival",
      },
      {
        heading: "AEDs are made for the public",
        body: [
          "An AED (automated external defibrillator) analyzes the heart rhythm and delivers a shock only if needed. Turn it on and follow the voice prompts.",
          "Know where the AEDs are at your school, gym, and fields.",
        ],
      },
      {
        heading: "Get trained",
        body: [
          "This lesson builds awareness. Hands-on CPR and AED training from a recognized organization is the best way to be ready. Ask your school, team, or local community organizations about classes.",
        ],
      },
    ],
    activity: {
      type: "match",
      prompt: "Match each item to the right description.",
      pairs: [
        { term: "Compression rate", definition: "About 100–120 per minute" },
        { term: "Hand position", definition: "Center of the chest" },
        { term: "AED", definition: "Device that analyzes rhythm and shocks only if needed" },
        { term: "AED voice prompts", definition: "Tell you what to do step by step" },
      ],
    },
    quiz: [
      {
        id: "ca1",
        kind: "multiple-choice",
        prompt: "What compression rate is recommended for Hands-Only CPR?",
        options: ["40–60 per minute", "60–80 per minute", "100–120 per minute", "150–200 per minute"],
        answerIndex: 2,
        explanation: "Push hard and fast at about 100–120 compressions per minute.",
      },
      {
        id: "ca2",
        kind: "true-false",
        prompt: "True or false: An AED will shock anyone it's attached to, whether they need it or not.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. AEDs analyze the rhythm and only advise a shock when it's needed.",
      },
      {
        id: "ca3",
        kind: "multiple-choice",
        prompt: "Where do you place your hands for chest compressions on a teen or adult?",
        options: ["On the stomach", "Center of the chest", "On the neck", "On the left shoulder"],
        answerIndex: 1,
        explanation: "Hands go in the center of the chest.",
      },
      {
        id: "ca4",
        kind: "true-false",
        prompt: "True or false: This lesson certifies you in CPR.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. This is awareness education. Certification requires hands-on training from a recognized provider.",
      },
      {
        id: "ca5",
        kind: "multiple-choice",
        prompt: "When the AED arrives, what should you do?",
        options: ["Wait for a doctor", "Turn it on and follow the voice prompts", "Read the full manual first", "Put it aside and keep watching"],
        answerIndex: 1,
        explanation: "Turn on the AED and follow its spoken instructions.",
      },
    ],
  },
  {
    id: "supporting-teammates",
    level: "ambassador",
    title: "Supporting Teammates",
    summary: "How to speak up, look out for each other, and help a teammate get checked.",
    minutes: 7,
    category: "community",
    sources: ["aap-sca-young"],
    review,
    lesson: [
      {
        heading: "Look out for each other",
        body: [
          "Teammates often notice first. If someone mentions chest pain, nearly fainting, or a racing heart, take it seriously.",
        ],
        illustration: "team",
      },
      {
        heading: "Speak up — it's not snitching",
        body: [
          "Encourage the teammate to tell an adult. If they won't, tell the coach or athletic trainer yourself. Reporting symptoms is about keeping someone safe, not getting them benched.",
        ],
      },
      {
        heading: "Respect privacy",
        body: [
          "A teammate's health information belongs to them. Support them without spreading details or guessing about diagnoses.",
        ],
      },
    ],
    activity: {
      type: "sort",
      prompt: "Helpful or unhelpful? Sort the responses to a teammate who says they felt faint during drills.",
      categories: ["Helpful", "Unhelpful"],
      items: [
        { text: "\"Let's tell Coach right now.\"", category: "Helpful" },
        { text: "\"I'll walk with you to the athletic trainer.\"", category: "Helpful" },
        { text: "\"That's important — you should get it checked.\"", category: "Helpful" },
        { text: "\"Just shake it off.\"", category: "Unhelpful" },
        { text: "\"Don't tell anyone or you'll lose your spot.\"", category: "Unhelpful" },
        { text: "Posting about it in the team group chat", category: "Unhelpful" },
      ],
    },
    quiz: [
      {
        id: "st1",
        kind: "scenario",
        scenario: "A teammate tells you they've been getting dizzy and their heart races during sprints, but asks you not to tell anyone.",
        prompt: "What's the best response?",
        options: [
          "Keep it secret",
          "Encourage them to tell an adult and, if they won't, tell the coach or athletic trainer yourself",
          "Tell them to drink more coffee",
          "Wait until they faint",
        ],
        answerIndex: 1,
        explanation: "These are warning signs. Their safety matters more than the secret — make sure a responsible adult knows.",
        relatedModule: "warning-signs",
      },
      {
        id: "st2",
        kind: "true-false",
        prompt: "True or false: Reporting a teammate's symptoms is about keeping them safe.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. Speaking up can help a teammate get evaluated early.",
      },
      {
        id: "st3",
        kind: "multiple-choice",
        prompt: "How should you handle a teammate's health information?",
        options: ["Share it in the group chat", "Respect their privacy and support them", "Guess their diagnosis", "Tell other teams"],
        answerIndex: 1,
        explanation: "Health information is private. Support your teammate without spreading details.",
      },
      {
        id: "st4",
        kind: "multiple-choice",
        prompt: "Who should you tell about a teammate's warning symptoms?",
        options: ["No one", "A coach, athletic trainer, or parent", "Only other players", "Social media"],
        answerIndex: 1,
        explanation: "A responsible adult — coach, athletic trainer, or parent — can make sure they get evaluated.",
      },
      {
        id: "st5",
        kind: "true-false",
        prompt: "True or false: Saying \"shake it off\" is a good response to a teammate who nearly fainted.",
        options: ["True", "False"],
        answerIndex: 1,
        explanation: "False. Near-fainting during exercise is a warning sign that needs attention.",
      },
    ],
  },
  {
    id: "heart-aware-culture",
    level: "ambassador",
    title: "Building a Heart-Aware Sports Culture",
    summary: "Emergency action plans, AED access, and a team culture where reporting symptoms is normal.",
    minutes: 8,
    category: "community",
    sources: ["aap-sca-schools", "aap-sca-young"],
    review,
    lesson: [
      {
        heading: "Make reporting normal",
        body: [
          "The safest teams treat reporting symptoms as part of being a good teammate. Coaches can say it out loud: \"If you feel chest pain, faint, or your heart races strangely — stop and tell us. You won't be in trouble.\"",
        ],
      },
      {
        heading: "Emergency action plans",
        body: [
          "A written, rehearsed emergency action plan (EAP) assigns roles: who calls 911, who starts CPR, who gets the AED, who meets the ambulance. Practicing it saves precious time.",
        ],
        illustration: "chain-of-survival",
      },
      {
        heading: "AED access and training",
        body: [
          "AEDs should be easy to reach from practice and game areas. CPR and AED training for staff and students helps schools be ready.",
          "Student-athletes can be ambassadors: ask where the AED is, encourage CPR classes, and share what you've learned.",
        ],
      },
    ],
    activity: {
      type: "match",
      prompt: "Match each emergency action plan role to its job.",
      pairs: [
        { term: "Caller", definition: "Calls 911 and gives the exact location" },
        { term: "CPR responder", definition: "Starts chest compressions right away" },
        { term: "AED runner", definition: "Brings the AED to the scene" },
        { term: "Guide", definition: "Meets EMS and leads them to the athlete" },
      ],
    },
    quiz: [
      {
        id: "hc1",
        kind: "multiple-choice",
        prompt: "What is an emergency action plan?",
        options: [
          "A training schedule",
          "A written, practiced plan assigning roles for emergencies",
          "A diet plan",
          "A list of team rules about uniforms",
        ],
        answerIndex: 1,
        explanation: "An EAP spells out who does what in an emergency and should be rehearsed.",
      },
      {
        id: "hc2",
        kind: "true-false",
        prompt: "True or false: Practicing the emergency action plan can save time in a real emergency.",
        options: ["True", "False"],
        answerIndex: 0,
        explanation: "True. Rehearsal helps everyone act quickly.",
      },
      {
        id: "hc3",
        kind: "multiple-choice",
        prompt: "Where should AEDs be?",
        options: ["Locked in a distant office", "Easy to reach from practice and game areas", "Only at hospitals", "In the coach's car"],
        answerIndex: 1,
        explanation: "AEDs should be quickly accessible where athletes train and compete.",
      },
      {
        id: "hc4",
        kind: "multiple-choice",
        prompt: "What message from coaches best supports a heart-aware culture?",
        options: [
          "\"Never complain.\"",
          "\"Tell us about chest pain, fainting, or a strange racing heart — you won't be in trouble.\"",
          "\"Only report injuries you can see.\"",
          "\"Tough athletes play through anything.\"",
        ],
        answerIndex: 1,
        explanation: "Making it safe to report symptoms helps athletes speak up early.",
      },
      {
        id: "hc5",
        kind: "multiple-choice",
        prompt: "How can a student-athlete be a heart ambassador?",
        options: [
          "Diagnose teammates",
          "Know where the AED is, encourage CPR training, and share what they've learned",
          "Decide who can play",
          "Track teammates' heart rates publicly",
        ],
        answerIndex: 1,
        explanation: "Ambassadors raise awareness — they don't diagnose or make clearance decisions.",
      },
    ],
  },
];

export const levels: Level[] = [
  {
    id: "rookie",
    number: 1,
    name: "Heart Rookie",
    audience: "Great starting point for middle school athletes and anyone new to heart science.",
    badge: "heart-explorer",
    modules: ["heart-anatomy", "blood-circulation", "understanding-pulse", "exercise-heart-rate"],
  },
  {
    id: "champion",
    number: 2,
    name: "Heart Champion",
    audience: "For high school athletes ready for exercise physiology and safety.",
    badge: "cardio-champion",
    modules: ["exercise-physiology", "cardio-endurance", "recovery-hydration", "warning-signs"],
  },
  {
    id: "ambassador",
    number: 3,
    name: "Heart Ambassador",
    audience: "For high school and college athletes, captains, and future leaders.",
    badge: "heart-safety-advocate",
    modules: ["emergency-awareness", "cpr-aed", "supporting-teammates", "heart-aware-culture"],
  },
];

export const badges: Badge[] = [
  {
    id: "heart-explorer",
    name: "Heart Explorer",
    description: "Completed every Level 1 — Heart Rookie module.",
    requires: levels[0].modules,
  },
  {
    id: "cardio-champion",
    name: "Cardio Champion",
    description: "Completed every Level 2 — Heart Champion module.",
    requires: levels[1].modules,
  },
  {
    id: "heart-safety-advocate",
    name: "Heart Safety Advocate",
    description: "Completed every Level 3 — Heart Ambassador module.",
    requires: levels[2].modules,
  },
  {
    id: "heart-lab-graduate",
    name: "Heart Lab Graduate",
    description: "Completed all 12 modules across all three levels.",
    requires: levels.flatMap((l) => l.modules),
  },
];

export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<string, Module>;

export function levelOf(moduleId: string) {
  return levels.find((l) => l.modules.includes(moduleId))!;
}
