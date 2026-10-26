# YoungHeartz

**Train Smart. Play Strong. Know Your Heart.**

An interactive cardiovascular health education website for student-athletes, parents, and coaches. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, Recharts, and Lucide icons.

> YoungHeartz provides educational information and does not replace professional medical advice, diagnosis, treatment, or sports participation clearance. **All medical content is pending qualified clinical review and must be reviewed before public launch.**

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
npm run build:app  # static export for the native apps (see "Native apps")
npx tsc --noEmit   # type-check
```

No API keys, databases, or paid services are required.

## Deployment

The site is fully static, with no server-side data. Any Next.js host works:

- **Vercel:** import the GitHub repo and deploy with the default settings.
- **Self-hosted:** `npm run build && npm run start` behind a reverse proxy, or use a Node/Docker host.

The production domain is **www.youngheartz.com** (Vercel redirects youngheartz.com there). The site URL defaults to `https://www.youngheartz.com` (in `src/lib/site.ts`) and is used for the sitemap, robots.txt, and Open Graph metadata. Override it with `NEXT_PUBLIC_SITE_URL` for preview deployments if needed.

## Native apps (iOS and Android with Capacitor)

The same site is bundled into native iPhone and Android apps with [Capacitor](https://capacitorjs.com). The app contains the whole site, so it works offline.

```bash
npm run build:app   # static export to out/ + copy into ios/ and android/
npm run ios         # build, then open the project in Xcode
npm run android     # build, then open the project in Android Studio
```

**One-time setup:**

- **iOS:** install **Xcode** from the Mac App Store. Open it once to accept the license and install the iOS simulator, then run `sudo xcode-select -s /Applications/Xcode.app`. In Xcode, select a simulator or your iPhone and press ▶. Running on your own iPhone needs a free Apple ID (Signing & Capabilities → Team). Publishing to the App Store needs the Apple Developer Program ($99/year).
- **Android:** install **Android Studio** (`brew install --cask android-studio`) and complete its setup wizard, which installs the SDK and an emulator. Open the project with `npm run android`, then press ▶. Publishing to Google Play needs a developer account ($25 one-time).

**How it works:**

- `BUILD_TARGET=app` switches Next.js to `output: "export"` with trailing slashes. The website build (`npm run build`) is unchanged.
- `capacitor.config.ts` sets the app ID (`com.youngheartz.app`, matching the youngheartz.com domain), the name, the splash screen, and edge-to-edge handling. Header and footer padding use `env(safe-area-inset-*)`, so content clears the notch and the home indicator.
- Icons and splash screens are generated from `assets/` with `npx capacitor-assets generate` (already done; re-run after changing the images).
- In the app, checklist **Print/Download** buttons become a native **Share** sheet, which can still print. External source links open in the phone's browser.
- Capacitor serves the home page for any URL without a file extension. `RouteRecovery` (in the root layout) detects this after an unexpected reload on a subpage and navigates to the right page.

**App Store listing:** `store/ios/app-store-listing.md` has the name, subtitle, description, keywords, privacy answers, age rating guidance, and reviewer notes. `store/ios/screenshots-6.9in/` has six 1320 × 2868 screenshots from the simulator. The iOS app is iPhone-only (`TARGETED_DEVICE_FAMILY = 1`).

**App store notes:** Apple may reject apps that mostly repackage a website (guideline 4.2), and it reviews health content closely (guideline 1.4.1). Finish the clinical review below before submitting. Apple also requires a support URL and privacy details in App Store Connect.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home: hero, why the heart matters, sports, warning signs, lab preview, learning journey (Explore → Learn → Experiment → Prove it), facts, parent/coach resources |
| `/explore-your-heart` | Interactive labeled heart diagram (8 structures), animated circulation loop, expandable explanations |
| `/athlete-health` | Topics A–J, each with simple and scientific explanations, an example, an interactive widget, a takeaway, and a knowledge check |
| `/warning-signs` | Six warning signs, Stop/Tell/Get checked, cardiac arrest vs. heart attack, conditions and screening, emergency response |
| `/congenital-heart-conditions` | Congenital heart conditions in athletes: basics, interactive defect explorer (6 types), sports & activity guidance, warning signs, athlete/family checklists, coach tips |
| `/heart-lab` | Heartbeat Simulator, Blood Flow Explorer, Exercise & Your Heart, Recovery Explorer, Myth vs. Fact |
| `/quiz` | Knowledge Challenge and the "What Would You Do?" scenario challenge |
| `/dashboard` | Local progress: knowledge checks passed, labs explored, quiz results, recommended next steps, reset |
| `/resources` | Parent and coach guides, 6 printable/downloadable checklists |
| `/stories` | Four clearly labeled fictional composite stories |
| `/about`, `/references`, `/privacy`, `/accessibility` | Supporting pages |

## Project structure

```
src/
  app/                    # routes (App Router), sitemap.ts, robots.ts, icon.svg
assets/                   # source images for native app icons and splash screens
ios/ android/             # Capacitor native projects (generated; web files copied in by `cap sync`)
capacitor.config.ts
  components/
    ui.tsx                # design system: Container, Section, Button, Card, Callout, Pill, SourceList, ReviewBadge…
    layout/               # header (desktop + mobile nav), footer, search dialog, theme toggle, logo
    heart/                # HeartDiagram (schematic SVG), AnatomyExplorer, CirculationLoop, DefectExplorer
    lab/                  # the five Heart Lab simulations
    learn/                # sort activity, quiz engine, knowledge check, topic widgets, dashboard
    resources/            # printable checklist cards and guide downloads
  content/                # ALL educational content, as typed data (edit content here)
    types.ts              # content model + review metadata
    references.ts         # verified source list
    anatomy.ts topics.ts warning-signs.ts congenital.ts labs.ts quizzes.ts resources.ts stories.ts
    links.ts              # pages suggested when a quiz question is missed
    search-index.ts       # site search index, built from the content files
  lib/
    progress.ts           # localStorage progress store (useSyncExternalStore)
    recovery-model.ts     # illustrative HR curve model (NOT physiologically calibrated)
    motion.ts shuffle.ts site.ts
```

## Editing content

All content is in `src/content/*.ts` and is type-checked. Each content item carries:

- `category` and `readingLevel` (`rookie` / `champion` / `ambassador`, i.e. beginner → advanced)
- `sources`: IDs from `references.ts`, rendered as links on the page
- `review`: `{ lastUpdated, status, reviewer, reviewedOn }`

`review.status` is `"pending"` everywhere. **Only set `status: "reviewed"` with a real reviewer's name, credentials, and date after an actual clinical review.** The UI then shows "Clinically reviewed by …" instead of "Clinical review: pending".

To add a reference, add it to `references.ts` with the date you verified the link, then use its `id` in any content item's `sources`.

## Privacy

- No accounts, ads, analytics, or third-party trackers.
- Progress is saved only in the browser's `localStorage` under `heartlab:progress:v1`; the theme is saved under `heartlab:theme`. Users can erase progress from the dashboard.
- No names, ages, birth dates, or health data are collected.

## Accessibility

Targets WCAG 2.2 AA: skip link, landmarks, keyboard-operable labs and diagram, a native `<dialog>` for search, live regions for changing results, data tables and text summaries for charts, reduced-motion support (SVG flow animations, ECG trace, and transitions stop), and AA contrast in both themes.

## Testing performed

- `npm run build`, `npm run lint`, and `tsc` all pass.
- All 14 routes, `sitemap.xml`, and `robots.txt` return 200; unknown routes return 404.
- Automated browser checks (headless Chrome over the DevTools protocol) covered: theme toggle and persistence; Ctrl/⌘+K search; anatomy selection by button, mouse, and keyboard; `?part=` deep links; circulation stages; heartbeat simulator; blood-flow steps and chamber selection; sports explorer and `?sport=`; the recovery chart updating with all three inputs; myth cards; topic knowledge checks; quiz scoring, retry, and suggested review links; scenario challenge; dashboard counts; progress persisting after reload; reset; skip link; mobile menu.
- No console errors or hydration warnings, including with reduced motion enabled.
- No horizontal overflow on any page at a 390 px mobile viewport.
- axe-core (WCAG 2.0/2.1/2.2 A and AA rules): 0 violations on all 14 pages in both light and dark mode.

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
6. **Content for younger readers:** a reading-level review of content for middle-school audiences.
7. **Media:** licensed photography and a professionally illustrated anatomical heart.
8. **Set `NEXT_PUBLIC_SITE_URL`** and add a real social sharing (Open Graph) image.
