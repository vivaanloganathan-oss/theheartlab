import type { Reference } from "./types";

/**
 * Every reference below was opened (or, for sites that block automated
 * requests, confirmed through search-engine listings of the official domain)
 * on the `verifiedOn` date. Re-verify links before each content release.
 */
const VERIFIED = "2026-10-25";

export const references: Reference[] = [
  {
    id: "nhlbi-anatomy",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "How the Heart Works — Heart Anatomy",
    url: "https://www.nhlbi.nih.gov/health/heart/anatomy",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-blood-flow",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "How the Heart Works — How Blood Flows through the Heart",
    url: "https://www.nhlbi.nih.gov/health/heart/blood-flow",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-heart-beats",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "How the Heart Works — How the Heart Beats",
    url: "https://www.nhlbi.nih.gov/health/heart/heart-beats",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-cardiac-arrest",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Cardiac Arrest — What Is Cardiac Arrest?",
    url: "https://www.nhlbi.nih.gov/health/cardiac-arrest",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-heart-attack",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Heart Attack",
    url: "https://www.nhlbi.nih.gov/health/heart-attack",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-cardiomyopathy",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Cardiomyopathy",
    url: "https://www.nhlbi.nih.gov/health/cardiomyopathy",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-arrhythmias",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Arrhythmias — Types",
    url: "https://www.nhlbi.nih.gov/health/arrhythmias/types",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-long-qt",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Long QT Syndrome",
    url: "https://www.nhlbi.nih.gov/health/long-qt-syndrome",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-heart-inflammation",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Heart Inflammation (including myocarditis)",
    url: "https://www.nhlbi.nih.gov/health/heart-inflammation",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-congenital",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Congenital Heart Defects",
    url: "https://www.nhlbi.nih.gov/health/congenital-heart-defects",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-defibrillators",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Defibrillators",
    url: "https://www.nhlbi.nih.gov/health/defibrillators",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-heart-healthy-living",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Heart-Healthy Living",
    url: "https://www.nhlbi.nih.gov/health/heart-healthy-living",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-chd-types",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Congenital Heart Defects — Types",
    url: "https://www.nhlbi.nih.gov/health/congenital-heart-defects/types",
    verifiedOn: VERIFIED,
  },
  {
    id: "nhlbi-chd-living",
    organization: "National Heart, Lung, and Blood Institute (NIH)",
    title: "Congenital Heart Defects — Living With",
    url: "https://www.nhlbi.nih.gov/health/congenital-heart-defects/living-with",
    verifiedOn: VERIFIED,
  },
  {
    id: "cdc-chd-about",
    organization: "Centers for Disease Control and Prevention",
    title: "About Congenital Heart Defects",
    url: "https://www.cdc.gov/heart-defects/about/index.html",
    verifiedOn: VERIFIED,
  },
  {
    id: "cdc-chd-living",
    organization: "Centers for Disease Control and Prevention",
    title: "Living with a Congenital Heart Defect",
    url: "https://www.cdc.gov/heart-defects/living-with/index.html",
    verifiedOn: VERIFIED,
  },
  {
    id: "aha-chd-activity",
    organization: "American Heart Association",
    title: "Congenital Heart Disease and Physical Activity",
    url: "https://www.heart.org/en/health-topics/congenital-heart-defects/care-and-treatment-for-congenital-heart-defects/congenital-heart-defects-and-physical-activity",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "acc-achd-guideline",
    organization: "American College of Cardiology",
    title: "New ACC/AHA Guideline Addresses Management of Congenital Heart Disease in Adults (2025)",
    url: "https://www.acc.org/latest-in-cardiology/articles/2025/12/18/16/40/new-acc-aha-guideline-addresses-management-of-congenital-heart-disease-in-adults",
    verifiedOn: VERIFIED,
  },
  {
    id: "aha-cardiac-arrest",
    organization: "American Heart Association",
    title: "What Is Cardiac Arrest?",
    url: "https://www.heart.org/en/health-topics/cardiac-arrest/about-cardiac-arrest",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "aha-arrest-vs-attack",
    organization: "American Heart Association",
    title: "Heart Attack or Sudden Cardiac Arrest: How Are They Different?",
    url: "https://www.heart.org/en/health-topics/heart-attack/about-heart-attacks/heart-attack-or-sudden-cardiac-arrest-how-are-they-different",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "aha-heart-rate",
    organization: "American Heart Association",
    title: "All About Heart Rate (Pulse)",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "aha-hcm",
    organization: "American Heart Association",
    title: "Hypertrophic Cardiomyopathy (HCM)",
    url: "https://www.heart.org/en/health-topics/cardiomyopathy/what-is-cardiomyopathy-in-adults/hypertrophic-cardiomyopathy",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "aha-hcm-athletes",
    organization: "American Heart Association",
    title: "HCM in Young Adults and Student Athletes",
    url: "https://www.heart.org/en/health-topics/cardiomyopathy/what-is-cardiomyopathy-in-adults/hcm-in-young-adults-and-student-athletes",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "aha-what-is-cpr",
    organization: "American Heart Association",
    title: "What is CPR",
    url: "https://cpr.heart.org/en/resources/what-is-cpr",
    verifiedOn: VERIFIED,
    note: "heart.org blocks automated link checks; confirmed via search listing of the official page.",
  },
  {
    id: "aap-sca-young",
    organization: "American Academy of Pediatrics — HealthyChildren.org",
    title: "Sudden Cardiac Arrest in Young People",
    url: "https://www.healthychildren.org/English/health-issues/injuries-emergencies/sports-injuries/Pages/Sudden-Cardiac-Death.aspx",
    verifiedOn: VERIFIED,
  },
  {
    id: "aap-sca-schools",
    organization: "American Academy of Pediatrics — HealthyChildren.org",
    title: "Preparing for Sudden Cardiac Arrest in Schools: The Essential Role of CPR & AEDs",
    url: "https://www.healthychildren.org/English/health-issues/injuries-emergencies/sports-injuries/Pages/Preparing-for-Sudden-Cardiac-Arrest-in-Schools.aspx",
    verifiedOn: VERIFIED,
  },
  {
    id: "aap-cardiomyopathy",
    organization: "American Academy of Pediatrics — HealthyChildren.org",
    title: "Cardiomyopathy in Children & Teens",
    url: "https://www.healthychildren.org/English/health-issues/conditions/heart/Pages/pediatric-cardiomyopathy.aspx",
    verifiedOn: VERIFIED,
  },
  {
    id: "acc-cardiosmart-sca",
    organization: "American College of Cardiology — CardioSmart",
    title: "Sudden Cardiac Arrest",
    url: "https://www.cardiosmart.org/topics/sudden-cardiac-arrest",
    verifiedOn: VERIFIED,
  },
  {
    id: "cdc-child-activity",
    organization: "Centers for Disease Control and Prevention",
    title: "Child Activity: An Overview",
    url: "https://www.cdc.gov/physical-activity-basics/guidelines/children.html",
    verifiedOn: VERIFIED,
  },
  {
    id: "cdc-measuring-intensity",
    organization: "Centers for Disease Control and Prevention",
    title: "How to Measure Physical Activity Intensity",
    url: "https://www.cdc.gov/physical-activity-basics/measuring/index.html",
    verifiedOn: VERIFIED,
  },
  {
    id: "cdc-sleep",
    organization: "Centers for Disease Control and Prevention",
    title: "About Sleep",
    url: "https://www.cdc.gov/sleep/about/index.html",
    verifiedOn: VERIFIED,
  },
  {
    id: "cdc-water",
    organization: "Centers for Disease Control and Prevention",
    title: "About Water and Healthier Drinks",
    url: "https://www.cdc.gov/healthy-weight-growth/water-healthy-drinks/index.html",
    verifiedOn: VERIFIED,
  },
  {
    id: "medlineplus-pulse",
    organization: "MedlinePlus (U.S. National Library of Medicine)",
    title: "Pulse",
    url: "https://medlineplus.gov/ency/article/003399.htm",
    verifiedOn: VERIFIED,
  },
  {
    id: "odphp-pa-guidelines",
    organization: "U.S. Department of Health and Human Services (ODPHP)",
    title: "Physical Activity Guidelines for Americans — Current Guidelines",
    url: "https://odphp.health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines/current-guidelines",
    verifiedOn: VERIFIED,
  },
  {
    id: "dietary-guidelines",
    organization: "U.S. Departments of Agriculture and Health and Human Services",
    title: "Dietary Guidelines for Americans",
    url: "https://www.dietaryguidelines.gov/",
    verifiedOn: VERIFIED,
  },
];

const byId = new Map(references.map((r) => [r.id, r]));

export function getReference(id: string): Reference {
  const ref = byId.get(id);
  if (!ref) throw new Error(`Unknown reference id: ${id}`);
  return ref;
}
