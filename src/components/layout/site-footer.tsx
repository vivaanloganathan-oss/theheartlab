import Link from "next/link";
import { footerNav, mainNav, site } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy pb-[env(safe-area-inset-bottom)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-cyan">{site.tagline}</p>
            <p className="mt-4 max-w-md text-sm text-white/70">{site.disclaimer}</p>
            <p className="mt-3 max-w-md text-sm text-white/70">
              <strong className="text-white">In an emergency, call 911</strong> (or your local emergency number). Do
              not use this website to decide whether to seek care.
            </p>
          </div>
          <nav aria-label="Site sections">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/60">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {mainNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="More">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/60">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            Educational content last updated {site.contentUpdated}. All medical content is pending qualified clinical
            review.
          </p>
          <p>No ads. No trackers. Progress stays in your browser.</p>
        </div>
      </div>
    </footer>
  );
}
