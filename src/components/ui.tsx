import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { AlertTriangle, Info, ShieldAlert, ExternalLink, Stethoscope } from "lucide-react";
import { getReference } from "@/content/references";
import type { ReviewMeta } from "@/content/types";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({
  className,
  tone = "default",
  ...props
}: ComponentProps<"section"> & { tone?: "default" | "elevated" | "navy" }) {
  return (
    <section
      data-theme={tone === "navy" ? "dark" : undefined}
      className={cx(
        "py-16 sm:py-24",
        tone === "elevated" && "bg-bg-sunken",
        tone === "navy" && "bg-navy text-white",
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "red" }) {
  return (
    <p
      className={cx(
        "font-display text-sm font-bold uppercase tracking-[0.2em]",
        tone === "cyan" ? "text-cyan-ink" : "text-red-ink",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className="mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance sm:text-5xl"
      >
        {title}
      </Tag>
      {intro && <div className="mt-4 text-lg text-fg-muted text-pretty">{intro}</div>}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const buttonVariants = {
  primary: "bg-heart text-navy hover:bg-[#ff5b68]",
  secondary: "border border-line bg-bg-elev text-fg hover:border-cyan",
  cyan: "bg-cyan text-navy hover:bg-[#4fd6f0]",
  ghost: "text-fg hover:bg-bg-sunken",
  onDark: "border border-white/25 text-white hover:border-cyan hover:bg-white/5",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cx(buttonBase, buttonVariants[variant], className);
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cx("rounded-2xl border border-line bg-bg-elev p-6 shadow-sm shadow-black/5", className)}
      {...props}
    />
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "red" | "cyan" | "green";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tone === "neutral" && "bg-bg-sunken text-fg-muted",
        tone === "red" && "bg-heart/15 text-red-ink",
        tone === "cyan" && "bg-cyan/15 text-cyan-ink",
        tone === "green" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
      )}
    >
      {children}
    </span>
  );
}

const calloutStyles = {
  info: { icon: Info, cls: "border-cyan/40 bg-cyan/10", iconCls: "text-cyan-ink" },
  warning: { icon: AlertTriangle, cls: "border-amber-500/50 bg-amber-500/10", iconCls: "text-amber-600 dark:text-amber-300" },
  danger: { icon: ShieldAlert, cls: "border-heart/50 bg-heart/10", iconCls: "text-red-ink" },
} as const;

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof calloutStyles;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const { icon: Icon, cls, iconCls } = calloutStyles[tone];
  return (
    <div className={cx("flex gap-3 rounded-xl border p-4 text-sm", cls, className)} role="note">
      <Icon aria-hidden className={cx("mt-0.5 size-5 shrink-0", iconCls)} />
      <div className="space-y-1">
        {title && <p className="font-bold">{title}</p>}
        <div className="text-fg-muted [&_strong]:text-fg">{children}</div>
      </div>
    </div>
  );
}

/** Label for anything simulated, so it's never mistaken for a personal measurement. */
export function SimulationLabel({ children }: { children?: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-200">
      <AlertTriangle aria-hidden className="size-3.5" />
      {children ?? "Educational illustration — not a personal measurement or diagnostic test."}
    </p>
  );
}

export function SourceList({ ids, className }: { ids: string[]; className?: string }) {
  if (ids.length === 0) return null;
  return (
    <div className={cx("text-xs text-fg-muted", className)}>
      <p className="font-semibold uppercase tracking-wider">Sources</p>
      <ul className="mt-1 space-y-1">
        {ids.map((id) => {
          const ref = getReference(id);
          return (
            <li key={id}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center gap-1 py-0.5 underline decoration-line underline-offset-2 hover:text-fg"
              >
                {ref.organization}: {ref.title}
                <ExternalLink aria-hidden className="mt-0.5 size-3 shrink-0" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ReviewBadge({ review }: { review: ReviewMeta }) {
  return (
    <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-muted">
      <Stethoscope aria-hidden className="size-3.5" />
      {review.status === "reviewed" && review.reviewer ? (
        <span>
          Clinically reviewed by {review.reviewer}
          {review.reviewedOn && <> on {review.reviewedOn}</>}
        </span>
      ) : (
        <span>Clinical review: pending</span>
      )}
      <span aria-hidden>·</span>
      <span>Updated {review.lastUpdated}</span>
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div data-theme="dark" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-heart/25 blur-3xl" />
        <div className="absolute -bottom-40 left-10 size-96 rounded-full bg-cyan/20 blur-3xl" />
        <CourtLines className="absolute inset-0 h-full w-full text-white/[0.06]" />
      </div>
      <Container className="relative py-16 sm:py-20">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="mt-5 max-w-2xl text-lg text-white/80 text-pretty">{intro}</div>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </div>
  );
}

/** Decorative sports-court line art used behind dark heroes. */
export function CourtLines({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="3">
      <rect x="40" y="40" width="1120" height="520" rx="8" />
      <line x1="600" y1="40" x2="600" y2="560" />
      <circle cx="600" cy="300" r="90" />
      <path d="M40 160 H230 V440 H40" />
      <path d="M1160 160 H970 V440 H1160" />
      <path d="M230 230 A70 70 0 0 1 230 370" />
      <path d="M970 230 A70 70 0 0 0 970 370" />
      <path d="M40 90 Q470 300 40 510" />
      <path d="M1160 90 Q730 300 1160 510" />
    </svg>
  );
}

/** Stylised ECG-style line. Decorative only. */
export function EcgLine({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 600 80" fill="none" preserveAspectRatio="none">
      <path
        className={animated ? "ecg-animate" : undefined}
        d="M0 40 H170 L185 40 L195 30 L205 40 H225 L235 52 L250 4 L265 72 L277 40 H300 L320 28 L345 40 H600"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
