import { PENDING_REVIEW, type ContentMeta, type Question } from "./types";

export type TopicWidget =
  | "pulse-math"
  | "talk-test"
  | "recovery-compare"
  | "cardiac-output"
  | "energy-sort"
  | "hydration"
  | "sleep"
  | "plate"
  | "training-week"
  | "adaptation-sort";

export interface Topic extends ContentMeta {
  id: string;
  letter: string;
  title: string;
  simple: string;
  example: string;
  science: string[];
  takeaway: string;
  widget: TopicWidget;
  check: Question;
}

const review = PENDING_REVIEW("2026-10-25");

export const topics: Topic[] = [
  {
    id: "resting-heart-rate",
    letter: "A",
    title: "Resting Heart Rate",
    category: "physiology",
    readingLevel: "rookie",
    sources: ["nhlbi-heart-beats", "medlineplus-pulse", "aha-heart-rate"],
    review,
    simple:
      "Your resting heart rate is how many times your heart beats in one minute when you are calm and sitting or lying still.",
    example:
      "Two teammates of the same age can have quite different resting heart rates — and both can be completely healthy. Fitness, genetics, stress, caffeine, illness, sleep, and even the temperature of the room all play a part.",
    science: [
      "Each heartbeat begins with an electrical signal from the sinoatrial (SA) node, the heart's natural pacemaker in the right atrium. Your nervous system and hormones speed this pacemaker up or slow it down.",
      "For people about 10 and older, a resting rate of roughly 60–100 beats per minute is commonly described as typical. Many well-trained athletes have lower resting rates, sometimes in the 40s–50s, because each beat moves more blood.",
      "A number on its own does not tell you whether a heart is healthy. A resting rate inside the typical range does not rule out a heart condition, and a lower rate is not automatically a sign of fitness. Rates that are consistently outside the usual range — or any rate that comes with symptoms — are worth discussing with a healthcare professional.",
    ],
    takeaway: "Resting heart rate varies from person to person. Learn what is usual for you, and pay attention to symptoms, not just numbers.",
    widget: "pulse-math",
    check: {
      id: "topic-a",
      kind: "multiple-choice",
      prompt: "Which statement about resting heart rate is most accurate?",
      options: [
        "Every healthy athlete has a resting heart rate of exactly 60 bpm.",
        "Resting heart rate naturally varies between people, and a normal number cannot rule out a heart problem.",
        "A lower resting heart rate always means you are fitter.",
        "Resting heart rate only changes with age.",
      ],
      answerIndex: 1,
      explanation:
        "Resting heart rate is shaped by fitness, genetics, sleep, stress, illness, and more. A typical number is reassuring for many people, but it can't rule out heart disease on its own.",
    },
  },
  {
    id: "exercise-heart-rate",
    letter: "B",
    title: "Heart Rate During Exercise",
    category: "physiology",
    readingLevel: "rookie",
    sources: ["nhlbi-heart-beats", "cdc-measuring-intensity", "cdc-child-activity"],
    review,
    simple:
      "When you move, your muscles need more oxygen. Your heart speeds up and pumps harder to deliver it.",
    example:
      "Walking to practice, your heart rate rises a little. During a full-court press or a 400 m race, it rises a lot. When you slow down, it starts to come back down.",
    science: [
      "During exercise, signals from the nervous system and hormones such as adrenaline raise heart rate and make each contraction stronger, increasing the amount of blood pumped per minute.",
      "A practical way to judge intensity is the talk test: during moderate activity you can talk but not sing; during vigorous activity you can't say more than a few words without pausing for breath.",
      "Formulas such as \"220 minus age\" only estimate an average maximum heart rate across many people. Real individual maximums vary widely, so these formulas should not be treated as a personal limit or target.",
    ],
    takeaway:
      "Heart rate rises with effort to deliver oxygen. How you feel — breathing, ability to talk, and any symptoms — matters as much as any number.",
    widget: "talk-test",
    check: {
      id: "topic-b",
      kind: "multiple-choice",
      prompt: "During moderate-intensity activity, the talk test says you can usually…",
      options: [
        "Sing your favorite song easily",
        "Talk, but not sing",
        "Say only one word at a time",
        "Not speak at all",
      ],
      answerIndex: 1,
      explanation: "The CDC's talk test: at moderate intensity you can talk but not sing; at vigorous intensity you can only say a few words before pausing for breath.",
    },
  },
  {
    id: "heart-rate-recovery",
    letter: "C",
    title: "Heart Rate Recovery",
    category: "recovery",
    readingLevel: "champion",
    sources: ["nhlbi-heart-beats", "aha-heart-rate"],
    review,
    simple: "Heart rate recovery is how your heart rate comes back down after you stop exercising.",
    example:
      "After a set of sprints, your heart rate drops quickly at first, then more slowly. With consistent training, many athletes notice it settles a bit sooner than it used to.",
    science: [
      "When exercise stops, the part of the nervous system that slows the heart (parasympathetic, or \"rest and digest\") becomes more active again, and heart rate falls.",
      "Recovery is usually fastest in the first minute or two and then levels off gradually. How quickly it falls depends on fitness, hydration, temperature, how hard you worked, sleep, illness, and individual differences.",
      "Recovery numbers from a watch or a simulator are not a medical test. They cannot show whether a heart is healthy or whether someone is ready to play.",
    ],
    takeaway:
      "Recovery shows how your body settles after effort. It is useful for learning about training — not for diagnosing anything.",
    widget: "recovery-compare",
    check: {
      id: "topic-c",
      kind: "true-false",
      prompt: "True or false: A fast heart-rate recovery proves that an athlete's heart is healthy.",
      options: ["True", "False"],
      answerIndex: 1,
      explanation:
        "False. Recovery is influenced by many things and can't rule out heart conditions. Symptoms such as chest pain or fainting always need medical evaluation, regardless of recovery numbers.",
    },
  },
  {
    id: "cardiovascular-endurance",
    letter: "D",
    title: "Cardiovascular Endurance",
    category: "training",
    readingLevel: "champion",
    sources: ["odphp-pa-guidelines", "cdc-child-activity"],
    review,
    simple:
      "Cardiovascular endurance is how well your heart, lungs, and blood vessels supply oxygen to your muscles during longer activity.",
    example:
      "A soccer midfielder who can keep making runs late in the second half is relying on cardiovascular endurance.",
    science: [
      "Cardiac output is the amount of blood the heart pumps each minute. It equals heart rate × stroke volume (the amount pumped per beat).",
      "With regular aerobic training, stroke volume can increase, muscles can grow more capillaries, and muscle cells can become better at using oxygen. The same work can then be done with less strain.",
      "Endurance builds gradually. Guidelines for young people recommend at least 60 minutes of moderate-to-vigorous activity each day, mostly aerobic.",
    ],
    takeaway: "Endurance grows with steady, progressive training: the heart can pump more blood per beat, and muscles use oxygen better.",
    widget: "cardiac-output",
    check: {
      id: "topic-d",
      kind: "multiple-choice",
      prompt: "Cardiac output equals…",
      options: [
        "Heart rate × stroke volume",
        "Heart rate ÷ breathing rate",
        "Blood pressure × age",
        "Stroke volume − heart rate",
      ],
      answerIndex: 0,
      explanation: "Cardiac output (blood pumped per minute) = heart rate (beats per minute) × stroke volume (blood per beat).",
    },
  },
  {
    id: "aerobic-anaerobic",
    letter: "E",
    title: "Aerobic vs. Anaerobic Activity",
    category: "training",
    readingLevel: "champion",
    sources: ["odphp-pa-guidelines", "cdc-measuring-intensity"],
    review,
    simple:
      "Aerobic activity uses oxygen to make energy steadily over longer periods. Anaerobic activity makes quick energy for short, intense bursts without relying mainly on oxygen.",
    example:
      "A long, steady swim is mostly aerobic. A 50 m sprint, a vertical jump, or a heavy lift relies heavily on anaerobic energy.",
    science: [
      "Aerobic metabolism uses oxygen delivered by the heart and lungs to break down carbohydrates and fats. It can continue for a long time.",
      "Anaerobic systems produce energy very quickly but only for short periods, which is why all-out efforts can't be held for long.",
      "Most sports mix both. Basketball and soccer combine steady movement with repeated sprints, and the aerobic system helps you recover between bursts.",
    ],
    takeaway: "Nearly every sport uses both energy systems. A strong aerobic base helps you recover between hard efforts.",
    widget: "energy-sort",
    check: {
      id: "topic-e",
      kind: "multiple-choice",
      prompt: "Which activity relies most heavily on anaerobic energy?",
      options: ["A 45-minute easy bike ride", "A 100 m sprint", "A long walk", "Gentle stretching"],
      answerIndex: 1,
      explanation: "Short, all-out efforts like a 100 m sprint draw heavily on anaerobic energy. Longer, steady activities are mostly aerobic.",
    },
  },
  {
    id: "hydration",
    letter: "F",
    title: "Hydration and Cardiovascular Health",
    category: "recovery",
    readingLevel: "rookie",
    sources: ["cdc-water"],
    review,
    simple:
      "Water helps your body control its temperature and keeps blood volume up, which makes it easier for your heart to do its job.",
    example:
      "At a hot afternoon practice you sweat a lot. Drinking water before, during, and after helps replace what you lose.",
    science: [
      "Sweat cools you, but it also removes fluid. When fluid loss lowers blood volume, the heart typically has to beat faster to keep blood flowing.",
      "Your body needs more water in hot weather, when you are more active, or when you are sick with fever, vomiting, or diarrhea.",
      "Dehydration can cause unclear thinking, mood changes, and overheating. Water is a good default choice over sugary drinks.",
    ],
    takeaway:
      "Plan your water like you plan your practice — especially in heat. Feeling dizzy, confused, or unwell in the heat means stop and tell an adult.",
    widget: "hydration",
    check: {
      id: "topic-f",
      kind: "multiple-choice",
      prompt: "When does your body generally need more water?",
      options: [
        "Only when you feel very thirsty",
        "In hot weather, during more activity, and when sick with fever",
        "Only during games, not practices",
        "Only in winter",
      ],
      answerIndex: 1,
      explanation: "The CDC notes your body needs more water in hot climates, when you're more physically active, and when you have a fever, diarrhea, or vomiting.",
    },
  },
  {
    id: "sleep-recovery",
    letter: "G",
    title: "Sleep and Recovery",
    category: "recovery",
    readingLevel: "rookie",
    sources: ["cdc-sleep", "nhlbi-heart-healthy-living"],
    review,
    simple: "Sleep is when your body repairs itself and your heart gets a chance to rest at a slower pace.",
    example:
      "After a week of late nights before a tournament, many athletes feel slower and more tired. Sleep is part of training.",
    science: [
      "During deep sleep, heart rate and blood pressure normally drop, giving the cardiovascular system a period of lower demand.",
      "The CDC recommends 9–12 hours of sleep per 24 hours for ages 6–12 and 8–10 hours for teens ages 13–17.",
      "Regularly getting too little sleep is linked with poorer heart health over time, as well as slower reaction time and mood changes.",
    ],
    takeaway: "Protect your sleep like you protect your training time. Consistent sleep supports recovery and heart health.",
    widget: "sleep",
    check: {
      id: "topic-g",
      kind: "multiple-choice",
      prompt: "How much sleep does the CDC recommend for teens ages 13–17?",
      options: ["5–6 hours", "6–7 hours", "8–10 hours", "12–14 hours"],
      answerIndex: 2,
      explanation: "The CDC recommends 8–10 hours per 24 hours for teens ages 13–17.",
    },
  },
  {
    id: "nutrition",
    letter: "H",
    title: "Nutrition and Heart Health",
    category: "recovery",
    readingLevel: "rookie",
    sources: ["dietary-guidelines", "nhlbi-heart-healthy-living"],
    review,
    simple:
      "What you eat fuels your training and supports your heart and blood vessels over your whole life.",
    example:
      "A balanced meal with whole grains, fruits or vegetables, and a protein source before practice gives you steady energy.",
    science: [
      "Heart-healthy eating patterns emphasize vegetables, fruits, whole grains, lean proteins, nuts, beans, and low-fat dairy, while limiting added sugars, sodium, and saturated fat.",
      "Athletes often need more total energy and carbohydrates to fuel training. Needs vary by body size, sport, and training load.",
      "Products marketed as \"energy\" drinks often contain high doses of caffeine and other stimulants. Talk with a healthcare professional before using supplements or stimulants.",
    ],
    takeaway:
      "Eat a variety of whole foods, drink water, and be cautious with stimulants and supplements. A registered dietitian can help with sport-specific plans.",
    widget: "plate",
    check: {
      id: "topic-h",
      kind: "multiple-choice",
      prompt: "Which choice best fits a heart-healthy eating pattern?",
      options: [
        "Mostly fried snacks and soda",
        "Vegetables, fruits, whole grains, and lean proteins",
        "Only protein shakes",
        "Skipping meals before practice",
      ],
      answerIndex: 1,
      explanation: "Heart-healthy patterns emphasize vegetables, fruits, whole grains, and lean proteins while limiting added sugars, sodium, and saturated fat.",
    },
  },
  {
    id: "overtraining",
    letter: "I",
    title: "Overtraining and Recovery",
    category: "recovery",
    readingLevel: "champion",
    sources: ["odphp-pa-guidelines", "cdc-sleep"],
    review,
    simple:
      "Training breaks your body down a little; rest builds it back stronger. Too much training without enough recovery can backfire.",
    example:
      "An athlete who adds extra workouts every day and skips rest days may start feeling constantly tired, sore, and moody, and performance may drop.",
    science: [
      "Fitness improves when training stress is followed by enough recovery — sleep, nutrition, hydration, and rest days.",
      "Commonly described signs that recovery isn't keeping up include ongoing fatigue, declining performance, trouble sleeping, mood changes, frequent illness, and nagging injuries.",
      "These signs overlap with many other causes, including illness. Persistent changes deserve a conversation with a coach, athletic trainer, or healthcare professional. Exercise-related chest pain, fainting, or unusual shortness of breath are not \"just overtraining\" — they need medical evaluation.",
    ],
    takeaway: "Rest days are part of the plan. Don't explain away warning symptoms as just being tired.",
    widget: "training-week",
    check: {
      id: "topic-i",
      kind: "multiple-choice",
      prompt: "An athlete has had chest pain during the last two practices and thinks they're just overtrained. What's the best step?",
      options: [
        "Train through it to build toughness",
        "Take one rest day and return to full practice",
        "Stop exercising and get a medical evaluation before returning",
        "Drink an energy drink before practice",
      ],
      answerIndex: 2,
      explanation: "Chest pain with exercise is a warning sign. Stop activity, tell a coach or parent, and get evaluated by a healthcare professional.",
      relatedModule: "warning-signs",
    },
  },
  {
    id: "adaptation-vs-problem",
    letter: "J",
    title: "Athletic Adaptation vs. Potential Heart Problems",
    category: "safety",
    readingLevel: "ambassador",
    sources: ["aap-sca-young", "aha-hcm-athletes", "medlineplus-pulse"],
    review,
    simple:
      "Training changes the heart in healthy ways. But some heart conditions can look similar on tests or cause symptoms that should never be ignored.",
    example:
      "A trained cross-country runner may have a slower resting heart rate — often a normal training effect. A teammate who faints during a race needs a medical evaluation, even if they feel fine afterward.",
    science: [
      "Regular intense training can lead to healthy changes sometimes called the \"athlete's heart\": a lower resting heart rate and, in some athletes, modest enlargement of heart chambers or thickening of heart walls.",
      "Some inherited conditions, such as hypertrophic cardiomyopathy (HCM), also involve a thickened heart wall. Telling healthy adaptation apart from disease requires evaluation by qualified clinicians, sometimes with specialized tests.",
      "Only a healthcare professional can make that distinction. Symptoms — like chest pain, fainting, or unusual shortness of breath during exercise — always deserve attention, whatever an athlete's fitness level.",
    ],
    takeaway:
      "Being fit doesn't make you immune to heart problems. Symptoms matter more than fitness level, and only clinicians can tell adaptation from disease.",
    widget: "adaptation-sort",
    check: {
      id: "topic-j",
      kind: "multiple-choice",
      prompt: "Who can tell the difference between healthy athletic heart changes and a heart condition?",
      options: [
        "A fitness tracker",
        "A teammate with the same sport",
        "A qualified healthcare professional, sometimes with specialized testing",
        "The athlete, based on how fit they feel",
      ],
      answerIndex: 2,
      explanation: "Distinguishing athlete's heart from conditions like HCM requires clinical evaluation. Fitness level or wearable data can't make that call.",
    },
  },
];
