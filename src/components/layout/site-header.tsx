"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { cx } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-heart text-navy">
        <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 px-4 py-1.5 text-center text-xs font-bold sm:text-sm">
          <Phone aria-hidden className="size-3.5" />
          <span className="sm:hidden">Emergency? Call 911.</span>
          <span className="hidden sm:inline">
            Someone collapsed or not breathing normally? Call 911 (or your local emergency number) now.
          </span>
          <Link href="/warning-signs#emergency" className="underline underline-offset-2">
            Emergency steps
          </Link>
        </p>
      </div>
      <div className="border-b border-white/10 bg-navy/95 text-white backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label="The Heart Lab — home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "rounded-full px-3 py-2 text-sm font-semibold text-white/75 hover:text-white",
                      isActive(item.href) && "bg-white/10 text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 hover:border-cyan"
              aria-label="Search The Heart Lab"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <Search aria-hidden className="size-4" />
            </button>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 hover:border-cyan xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Main"
          hidden={!menuOpen}
          className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/10 xl:hidden"
        >
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6">
            {[...mainNav, { href: "/quiz", label: "Knowledge Challenge" }, { href: "/dashboard", label: "My Dashboard" }].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "block rounded-xl px-4 py-3 font-display text-lg font-bold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-white",
                      isActive(item.href) && "bg-white/10 text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
