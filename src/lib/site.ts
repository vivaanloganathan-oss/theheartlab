export const site = {
  name: "YoungHeartz",
  tagline: "Train Smart. Play Strong. Know Your Heart.",
  description:
    "Interactive, evidence-based cardiovascular health education for student-athletes, parents, and coaches.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youngheartz.com",
  disclaimer:
    "YoungHeartz provides educational information and does not replace professional medical advice, diagnosis, treatment, or sports participation clearance.",
  /** Public contact address for feedback, corrections, privacy, and accessibility. */
  contactEmail: "vivaan.loganathan@gmail.com",
  /** ISO date the bundled content was last edited. */
  contentUpdated: "2026-10-25",
};

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/explore-your-heart", label: "Explore Your Heart" },
  { href: "/athlete-health", label: "Athlete Health" },
  { href: "/warning-signs", label: "Warning Signs" },
  { href: "/congenital-heart-conditions", label: "Congenital Hearts" },
  { href: "/heart-lab", label: "Heart Lab" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  { href: "/quiz", label: "Knowledge Challenge" },
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/stories", label: "Athlete Stories" },
  { href: "/references", label: "References" },
  { href: "/contact", label: "Contact & Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
] as const;
