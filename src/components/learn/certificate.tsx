"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Download, FileBadge, Printer, X } from "lucide-react";
import type { Badge } from "@/content/academy";
import { Button } from "@/components/ui";

const W = 1600;
const H = 1131;
const DISCLAIMER =
  "Educational achievement only. This is not CPR certification, a medical qualification, or sports participation clearance.";

function drawCertificate(canvas: HTMLCanvasElement, badge: Badge, name: string, dateText: string) {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#071426";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#20C7E8";
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 2;
  ctx.strokeRect(62, 62, W - 124, H - 124);

  // heart mark
  ctx.save();
  ctx.translate(W / 2 - 60, 120);
  ctx.scale(3, 3);
  ctx.fillStyle = "#F04452";
  ctx.fill(new Path2D("M20 34 C 8 25, 1 18, 1 10.5 C 1 5, 5 1, 10.5 1 C 14.5 1, 18 3.5, 20 7 C 22 3.5, 25.5 1, 29.5 1 C 35 1, 39 5, 39 10.5 C 39 18, 32 25, 20 34 Z"));
  ctx.restore();

  ctx.textAlign = "center";
  ctx.fillStyle = "#20C7E8";
  ctx.font = "700 34px 'Barlow Condensed', 'Arial Narrow', sans-serif";
  ctx.fillText("THE HEART LAB · CERTIFICATE OF LEARNING", W / 2, 320);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 110px 'Barlow Condensed', 'Arial Narrow', sans-serif";
  ctx.fillText(badge.name.toUpperCase(), W / 2, 450);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "400 34px Inter, Arial, sans-serif";
  ctx.fillText("This certifies that", W / 2, 540);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 72px Inter, Arial, sans-serif";
  ctx.fillText(name.trim() || "Heart Lab Learner", W / 2, 640);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "400 34px Inter, Arial, sans-serif";
  ctx.fillText(badge.description, W / 2, 720);
  ctx.fillText(`Awarded ${dateText}`, W / 2, 780);

  ctx.fillStyle = "#F04452";
  ctx.font = "700 30px 'Barlow Condensed', 'Arial Narrow', sans-serif";
  ctx.fillText("TRAIN SMART. PLAY STRONG. KNOW YOUR HEART.", W / 2, 880);

  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "400 24px Inter, Arial, sans-serif";
  ctx.fillText(DISCLAIMER, W / 2, 1010);
}

export function CertificateButton({ badge, earnedOn }: { badge: Badge; earnedOn?: string | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [fallbackDate] = useState(() => new Date().toISOString());
  const nameId = useId();
  const dateText = new Date(earnedOn ?? fallbackDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open && canvasRef.current) drawCertificate(canvasRef.current, badge, name, dateText);
  }, [open, badge, name, dateText]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `heart-lab-${badge.id}-certificate.png`;
    a.click();
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <FileBadge aria-hidden className="size-4" /> Certificate
      </Button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label={`${badge.name} certificate`}
        className="m-auto w-[min(56rem,calc(100%-2rem))] rounded-3xl border border-line bg-bg-elev p-0 text-fg backdrop:bg-navy/80"
      >
        <div className="flex items-center justify-between border-b border-line p-4 no-print">
          <h2 className="font-display text-2xl font-bold uppercase">{badge.name} certificate</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="inline-flex size-9 items-center justify-center rounded-full hover:bg-bg-sunken">
            <X aria-hidden className="size-4" />
          </button>
        </div>
        <div className="space-y-4 p-4">
          <div className="no-print">
            <label htmlFor={nameId} className="text-sm font-semibold">
              Name to show (optional — not saved anywhere)
            </label>
            <input
              id={nameId}
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              placeholder="Heart Lab Learner"
              className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2"
            />
          </div>
          <div className="print-area">
            <canvas ref={canvasRef} className="h-auto w-full rounded-xl" role="img" aria-label={`Certificate: ${badge.name}, awarded ${dateText}. ${DISCLAIMER}`} />
          </div>
          <p className="text-xs text-fg-muted no-print">{DISCLAIMER}</p>
          <div className="flex flex-wrap gap-2 no-print">
            <Button onClick={download}>
              <Download aria-hidden className="size-4" /> Download PNG
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              <Printer aria-hidden className="size-4" /> Print
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
