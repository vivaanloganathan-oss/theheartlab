"use client";

import { useId, useRef, useState } from "react";
import { Download, Printer, Share2 } from "lucide-react";
import type { Checklist, GuideSection } from "@/content/resources";
import { site } from "@/lib/site";
import { Button } from "@/components/ui";
import { shareText, useIsNativeApp } from "@/lib/native";

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const footer = `\n---\n${site.name} — ${site.tagline}\n${site.disclaimer}\nIn an emergency, call 911 (or your local emergency number).\n`;

function printElement(el: HTMLElement | null) {
  if (!el) return;
  el.classList.add("print-area");
  window.print();
  el.classList.remove("print-area");
}

export function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const ref = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const id = useId();
  const native = useIsNativeApp();

  const asText = () =>
    `${checklist.title.toUpperCase()}\n\n${checklist.intro}\n\n${checklist.items.map((i) => `[ ] ${i}`).join("\n")}\n${footer}`;

  return (
    <div id={checklist.id} ref={ref} className="scroll-mt-32 rounded-3xl border border-line bg-bg-elev p-6">
      <h3 className="font-display text-2xl font-bold uppercase">{checklist.title}</h3>
      <p className="mt-1 text-sm text-fg-muted">{checklist.intro}</p>
      <ul className="mt-4 space-y-2">
        {checklist.items.map((item, i) => (
          <li key={item}>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-[#20C7E8]"
                checked={!!checked[i]}
                onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                aria-describedby={id}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p id={id} className="sr-only">
        Checkboxes are for your use on this page only and aren&apos;t saved.
      </p>
      <p className="mt-4 hidden text-xs print:block">{site.disclaimer}</p>
      <div className="no-print mt-5 flex flex-wrap gap-2">
        {native ? (
          <Button variant="secondary" onClick={() => shareText(checklist.title, asText())}>
            <Share2 aria-hidden className="size-4" /> Share or print
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => printElement(ref.current)}>
              <Printer aria-hidden className="size-4" /> Print
            </Button>
            <Button variant="secondary" onClick={() => downloadText(`heart-lab-${checklist.id}-checklist.txt`, asText())}>
              <Download aria-hidden className="size-4" /> Download
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function GuideDownload({ title, sections, filename }: { title: string; sections: GuideSection[]; filename: string }) {
  const native = useIsNativeApp();
  const text = () =>
    `${title.toUpperCase()}\n\n${sections.map((s) => `${s.title}\n${s.body.join("\n\n")}`).join("\n\n")}\n${footer}`;
  return native ? (
    <Button variant="cyan" onClick={() => shareText(title, text())}>
      <Share2 aria-hidden className="size-4" /> Share full guide
    </Button>
  ) : (
    <Button variant="cyan" onClick={() => downloadText(filename, text())}>
      <Download aria-hidden className="size-4" /> Download full guide (.txt)
    </Button>
  );
}
