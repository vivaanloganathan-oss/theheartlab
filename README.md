# The Heart Lab

**Train Smart. Play Strong. Know Your Heart.**

An interactive cardiovascular health education website for student-athletes, parents, and coaches. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, Recharts, and Lucide icons.

> The Heart Lab provides educational information and does not replace professional medical advice, diagnosis, treatment, or sports participation clearance. **All medical content is pending qualified clinical review and must be reviewed before public launch.**

---

## Quick start

Requirements: Node.js 20.9+ (tested with Node 26) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (all pages are statically prerendered)
npm run start      # serve the production build
npm run lint       # ESLint
npx tsc --noEmit   # type-check
```

No API keys, databases, or paid services are required.

## Deployment

The site is fully static, with no server-side data. Any Next.js host works:

- **Vercel:** import the GitHub repo and deploy with the default settings.
- **Self-hosted:** `npm run build && npm run start` behind a reverse proxy, or use a Node/Docker host.

Set `NEXT_PUBLIC_SITE_URL` to your production URL (for example `https://theheartlab.org`) so the sitemap, robots.txt, and Open Graph metadata use absolute URLs.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home: hero, why the heart matters, sports, warning signs, lab preview, learning journey, facts, parent/coach resources |
| `/explore-your-heart` | Interactive labeled heart diagram (8 structures), animated circulation loop, expandable explanations |
| `/athlete-health` | Topics A–J, each with simple and scientific explanations, an example, an interactive widget, a takeaway, and a knowledge check |
| `/warning-signs` | Six warning signs, Stop/Tell/Get checked, cardiac arrest vs. heart attack, conditions and screening, emergency response |
| `/heart-lab` | Heartbeat Simulator, Blood Flow Explorer, Exercise & Your Heart, Recovery Explorer, Myth vs. Fact |
| `/academy` and `/academy/[moduleId]` | 3 levels × 4 modules: lesson, activity, 5-question quiz, progress, badges, certificates |
| `/quiz` | Knowledge Challenge and the "What Would You Do?" scenario challenge |
| `/dashboard` | Local progress: modules, quiz results, badges, recommended next lessons, certificates, reset |
| `/resources` | Parent and coach guides, 6 printable/downloadable checklists |
| `/stories` | Four clearly labeled fictional composite stories |
| `/about`, `/references`, `/privacy`, `/accessibility` | Supporting pages |

## Project structure

```
src/
  app/                    # routes (App Router), sitemap.ts, robots.ts, icon.svg
  components/
    ui.tsx                # design system: Container, Section, Button, Card, Callout, Pill, SourceList, ReviewBadge…
    layout/               # header (desktop + mobile nav), footer, search dialog, theme toggle, logo
    heart/                # HeartDiagram (schematic SVG), AnatomyExplorer, CirculationLoop
    lab/                  # the five Heart Lab simulations
    learn/                # activities, quiz engine, module player, topic widgets, dashboard, certificate
    resources/            # printable checklist cards and guide downloads
  content/                # ALL educational content, as typed data (edit content here)
    types.ts              # content model + review metadata
    references.ts         # verified source list
    anatomy.ts topics.ts warning-signs.ts labs.ts academy.ts quizzes.ts resources.ts stories.ts
    search-index.ts       # site search index, built from the content files
  lib/
    progress.ts           # localStorage progress store (useSyncExternalStore)
    badges.ts             # badge and recommendation logic
    recovery-model.ts     # illustrative HR curve model (NOT physiologically calibrated)
    motion.ts shuffle.ts site.ts
```

## Editing content

All content is in `src/content/*.ts` and is type-checked. Each content item carries:

- `category` and `readingLevel` (`rookie` / `champion` / `ambassador`)
- `sources`: IDs from `references.ts`, rendered as links on the page
- `review`: `{ lastUpdated, status, reviewer, reviewedOn }`

`review.status` is `"pending"` everywhere. **Only set `status: "reviewed"` with a real reviewer's name, credentials, and date after an actual clinical review.** The UI then shows "Clinically reviewed by …" instead of "Clinical review: pending".

To add a reference, add it to `references.ts` with the date you verified the link, then use its `id` in any content item's `sources`.

## Privacy

- No accounts, ads, analytics, or third-party trackers.
- Progress is saved only in the browser's `localStorage` under `heartlab:progress:v1`; the theme is saved under `heartlab:theme`. Users can erase progress from the dashboard.
- No names, ages, birth dates, or health data are collected. The optional certificate name is never stored.

## Accessibility

Targets WCAG 2.2 AA: skip link, landmarks, keyboard-operable labs and diagram, a native `<dialog>` for search and certificates, live regions for changing results, data tables and text summaries for charts, reduced-motion support (SVG flow animations, ECG trace, and transitions stop), and AA contrast in both themes.

## Testing performed

- `npm run build`, `npm run lint`, and `tsc` all pass.
- All 14 routes, the 12 module pages, `sitemap.xml`, and `robots.txt` return 200; unknown routes return 404.
- Automated browser checks (headless Chrome over the DevTools protocol) covered: theme toggle and persistence; Ctrl/⌘+K search; anatomy selection by button, mouse, and keyboard; `?part=` deep links; circulation stages; heartbeat simulator; blood-flow steps and chamber selection; sports explorer and `?sport=`; the recovery chart updating with all three inputs; myth cards; topic knowledge checks; quiz scoring, retry, and suggested lessons; scenario challenge; completing all 12 modules (lesson → activity → quiz); failing a quiz (3/5) not completing a module; all 4 badges unlocking; certificate rendering; dashboard; progress persisting after reload; reset; skip link; mobile menu.
- No console errors or hydration warnings, including with reduced motion enabled.
- No horizontal overflow on any page at a 390 px mobile viewport.
- axe-core (WCAG 2.0/2.1/2.2 A and AA rules): 0 violations on all 15 pages in both light and dark mode.

There is no committed automated test suite yet. The checks above were run during development.

## Known limitations

- **No sports photography.** The design uses SVG illustrations and court-line graphics. Licensed photos of student-athletes (with releases) should be added before launch.
- **Schematic heart diagram.** The anatomy diagram is a labeled schematic, not a realistic medical illustration. A professionally illustrated, clinically reviewed SVG is recommended.
- **Simulations are illustrative.** Heart rates, the ECG-style trace, and recovery curves come from simple teaching models. They are labeled everywhere as not personal measurements, not diagnostic, and not clearance.
- **No videos yet.** If videos are added, they need captions and transcripts.
- **US-centric emergency number.** The site says "911 (or your local emergency number)"; localize this for other regions.

## Before public launch: clinical review and launch requirements

1. **Clinical review of all medical content** by qualified clinicians, ideally a pediatric or sports cardiologist plus a sports medicine physician or athletic trainer. This covers every file in `src/content/`, including warning signs, conditions, emergency steps, myth/fact answers, quiz explanations, sport descriptions, overtraining signs, family-history checklist items, and illustrative simulator values. Then record reviewers in each item's `review` field.
2. **Re-verify every reference** in `references.ts`. heart.org pages blocked automated checks and were confirmed only through search listings; open them manually.
3. **CPR/AED wording review** against current AHA guidelines, and confirm the "awareness, not certification" language with legal or compliance.
4. **Privacy and legal review:** assess COPPA, FERPA, and state student-privacy laws before adding accounts, analytics, or school dashboards. Add the operator's contact details to `/privacy` and `/accessibility`.
5. **Accessibility audit** with real assistive-technology users (screen readers, switch, and voice control), beyond the automated axe checks.
6. **Content for younger readers:** a reading-level review of Level 1 content for middle-school audiences.
7. **Media:** licensed photography and a professionally illustrated anatomical heart.
8. **Set `NEXT_PUBLIC_SITE_URL`** and add a real social sharing (Open Graph) image.
