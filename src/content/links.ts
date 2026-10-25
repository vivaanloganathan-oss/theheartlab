/** Pages suggested when a quiz question is missed. */
export const studyLinks = {
  anatomy: { href: "/explore-your-heart", label: "Explore Your Heart: heart anatomy" },
  circulation: { href: "/explore-your-heart#circulation", label: "Explore Your Heart: blood circulation" },
  pulse: { href: "/athlete-health#resting-heart-rate", label: "Athlete Health: resting heart rate" },
  endurance: { href: "/athlete-health#cardiovascular-endurance", label: "Athlete Health: cardiovascular endurance" },
  recovery: { href: "/athlete-health#sleep-recovery", label: "Athlete Health: sleep and recovery" },
  warningSigns: { href: "/warning-signs", label: "Know the warning signs" },
  arrestVsAttack: { href: "/warning-signs#arrest-vs-attack", label: "Cardiac arrest vs. heart attack" },
  emergency: { href: "/warning-signs#emergency", label: "Emergency response awareness" },
  congenital: { href: "/congenital-heart-conditions", label: "Congenital heart conditions in athletes" },
  eap: { href: "/resources#coaches", label: "Coaches: emergency action planning" },
} as const;
