"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchIndex } from "@/content/search-index";

function score(entry: (typeof searchIndex)[number], terms: string[]) {
  const title = entry.title.toLowerCase();
  const body = `${entry.summary} ${entry.keywords ?? ""} ${entry.section}`.toLowerCase();
  let total = 0;
  for (const t of terms) {
    if (title.includes(t)) total += 3;
    else if (body.includes(t)) total += 1;
    else return 0;
  }
  return total;
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const listId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return searchIndex
      .map((e) => ({ e, s: score(e, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [query]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label="Search YoungHeartz"
      className="mx-auto mt-[10vh] w-[min(42rem,calc(100%-2rem))] rounded-2xl border border-line bg-bg-elev p-0 text-fg shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search aria-hidden className="size-5 text-fg-muted" />
        <label htmlFor="site-search" className="sr-only">
          Search topics, lessons, and labs
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics, lessons, labs…"
          aria-controls={listId}
          className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-fg-muted"
        />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-bg-sunken"
          aria-label="Close search"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-2">
        <p className="sr-only" aria-live="polite">
          {query ? `${results.length} results` : ""}
        </p>
        {query && results.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-fg-muted">No matches for “{query}”. Try “AED”, “pulse”, or “valves”.</p>
        )}
        {!query && (
          <p className="px-3 py-6 text-center text-sm text-fg-muted">
            Try “cardiac arrest”, “recovery”, “left ventricle”, or “hydration”.
          </p>
        )}
        <ul id={listId}>
          {results.map((r) => (
            <li key={r.href + r.title}>
              <Link
                href={r.href}
                onClick={onClose}
                className="block rounded-xl px-3 py-3 hover:bg-bg-sunken focus-visible:bg-bg-sunken"
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-cyan-ink">{r.section}</span>
                <span className="block font-semibold">{r.title}</span>
                <span className="line-clamp-2 block text-sm text-fg-muted">{r.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
