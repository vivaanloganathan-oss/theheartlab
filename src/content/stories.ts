export interface Story {
  id: string;
  title: string;
  athlete: string;
  sport: string;
  theme: string;
  paragraphs: string[];
  lesson: string;
  learnMore: { href: string; label: string };
}

/**
 * All stories are fictional composites written for education. They are not
 * about real people. Replace or add real stories only with verified sources
 * and documented permission.
 */
export const stories: Story[] = [
  {
    id: "maya",
    title: "Maya Speaks Up",
    athlete: "Maya, 15",
    sport: "Cross-country",
    theme: "Recognizing symptoms",
    paragraphs: [
      "Maya had always been one of the stronger runners on her team. Early in the season, she noticed something new: on hard hill repeats, her chest felt tight and she got lightheaded. Each time, it faded after she stopped.",
      "She almost didn't say anything — she didn't want to look weak. But she remembered a lesson from health class: chest discomfort and lightheadedness during exercise are worth reporting, even if they go away.",
      "She told her coach after practice. Her coach thanked her, held her out of hard workouts, and called her parents. Maya's doctor examined her, asked about family history, and arranged further evaluation.",
      "Maya's care team guided her next steps. Whatever the result, she knew she'd done the right thing by speaking up early.",
    ],
    lesson: "Symptoms that go away still matter. Stop, tell, and get checked.",
    learnMore: { href: "/warning-signs", label: "Know the warning signs" },
  },
  {
    id: "jordan",
    title: "Jordan Knew Where the AED Was",
    athlete: "Jordan, 17",
    sport: "Basketball",
    theme: "A teammate helping in an emergency",
    paragraphs: [
      "During a summer scrimmage, an assistant coach collapsed on the sideline. He didn't respond, and his breathing didn't look normal.",
      "Jordan's team had practiced its emergency action plan at the start of the season. One player pointed at a parent and said, \"Call 911 — put it on speaker.\" Another started chest compressions, pushing hard and fast in the center of the chest. Jordan sprinted for the AED by the gym entrance.",
      "Jordan turned it on and followed the voice prompts. The team kept going until paramedics arrived and took over.",
      "Afterward, the team talked about how rehearsing the plan made it feel possible to act instead of freeze.",
    ],
    lesson: "Practice the plan. Know where the AED is. Anyone can help.",
    learnMore: { href: "/warning-signs#emergency", label: "Emergency response awareness" },
  },
  {
    id: "luis",
    title: "Luis and the Family Question",
    athlete: "Luis, 13",
    sport: "Soccer",
    theme: "The importance of medical evaluation",
    paragraphs: [
      "Filling out his sports physical form, Luis reached a question about relatives who died suddenly before age 50. He wasn't sure, so he asked his mom.",
      "She remembered that a cousin had died unexpectedly in his twenties, and nobody ever fully learned why. They wrote it down and brought it up at the appointment.",
      "The doctor explained that this kind of family history is important because some heart conditions run in families, and recommended further evaluation. The doctor — not the form, and not the family — decided what testing made sense.",
    ],
    lesson: "Honest family history helps clinicians decide whether more evaluation is needed.",
    learnMore: { href: "/resources#parents", label: "Family history checklist" },
  },
  {
    id: "ava",
    title: "Ava's Recovery Reset",
    athlete: "Ava, 19",
    sport: "Swimming",
    theme: "Safe training and recovery",
    paragraphs: [
      "Ava added extra sessions before conference meets, cut her sleep to fit in homework, and skipped rest days. Her times got slower, she felt exhausted, and she kept getting sick.",
      "Her athletic trainer helped her rebuild her week around recovery: consistent sleep, planned rest days, enough food and water, and easier sessions between hard ones.",
      "Her trainer also reminded her of something important: tiredness from heavy training is common, but chest pain, fainting, or a racing heart with dizziness are not \"just overtraining\" and should always be checked.",
    ],
    lesson: "Rest is part of training — and warning symptoms are never just fatigue.",
    learnMore: { href: "/athlete-health#overtraining", label: "Overtraining and recovery" },
  },
];
