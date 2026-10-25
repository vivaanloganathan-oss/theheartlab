/**
 * Shared content model for The Heart Lab.
 *
 * Every piece of educational content carries review metadata so editors can
 * track clinical review. `review.status` stays "pending" until a qualified
 * clinician has actually reviewed the item — never mark content as reviewed
 * without a real reviewer.
 */

export type ReadingLevel = "rookie" | "champion" | "ambassador";

export type ContentCategory =
  | "anatomy"
  | "physiology"
  | "training"
  | "recovery"
  | "safety"
  | "emergency"
  | "conditions"
  | "community";

export interface ReviewMeta {
  /** ISO date the content was last edited. */
  lastUpdated: string;
  /** "pending" until a qualified clinician signs off. */
  status: "pending" | "reviewed";
  /** Name and credentials of the clinical reviewer, once reviewed. */
  reviewer: string | null;
  /** ISO date of the clinical review, once reviewed. */
  reviewedOn: string | null;
}

export interface ContentMeta {
  category: ContentCategory;
  readingLevel: ReadingLevel;
  /** IDs from `references.ts`. */
  sources: string[];
  review: ReviewMeta;
}

export interface Reference {
  id: string;
  organization: string;
  title: string;
  url: string;
  /** ISO date the link was last confirmed to resolve and match its description. */
  verifiedOn: string;
  note?: string;
}

export type QuestionKind = "multiple-choice" | "true-false" | "scenario";

export interface Question {
  id: string;
  kind: QuestionKind;
  prompt: string;
  /** Optional context shown above the prompt (used for scenarios). */
  scenario?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  /** Academy module ID to suggest when this question is missed. */
  relatedModule?: string;
}

export const PENDING_REVIEW = (lastUpdated: string): ReviewMeta => ({
  lastUpdated,
  status: "pending",
  reviewer: null,
  reviewedOn: null,
});
