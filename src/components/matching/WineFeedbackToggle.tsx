"use client";

import { useState } from "react";
import { saveLike, removeLike, type PassportEntry } from "../../lib/passport-storage";

type Props = {
  sessionId: string;
  wineId: number;
  passportEntry: Omit<PassportEntry, "wineId">;
  onDone?: () => void;
};

async function submitFeedback(sessionId: string, wineId: number, feedback: "LIKE" | "DISLIKE") {
  const response = await fetch("/api/matching/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, wineId, feedback }),
  });
  if (!response.ok) throw new Error("Feedback request failed");
  return response.json();
}

export function WineFeedbackToggle({ sessionId, wineId, passportEntry, onDone }: Props) {
  const [sent, setSent] = useState<"LIKE" | "DISLIKE" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handle(feedback: "LIKE" | "DISLIKE") {
    if (loading) return;
    if (sent === feedback) return;
    setLoading(true);
    try {
      await submitFeedback(sessionId, wineId, feedback);
      if (feedback === "LIKE") {
        saveLike({ wineId, ...passportEntry });
      } else {
        removeLike(wineId);
      }
      setSent(feedback);
      onDone?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <p className="text-xs font-bold uppercase tracking-widest text-vm-muted m-0">Hai già assaggiato questo vino?</p>
      {sent && (
        <p className="text-xs text-vm-muted m-0">
          {sent === "LIKE" ? "Grazie! Terremo conto che ti è piaciuto." : "Grazie! Terremo conto che non ti è piaciuto."}{" "}
          <span className="opacity-60">Puoi cambiare idea.</span>
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={() => handle("LIKE")}
          className={[
            "flex flex-col items-center justify-center gap-1.5 min-h-[72px] px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer disabled:opacity-50",
            sent === "LIKE"
              ? "border-emerald-500 bg-emerald-100 text-emerald-900 ring-2 ring-emerald-300"
              : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100",
          ].join(" ")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={sent === "LIKE" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          <span>L'ho bevuto</span>
          <span className="text-xs font-normal opacity-80">e mi è piaciuto</span>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handle("DISLIKE")}
          className={[
            "flex flex-col items-center justify-center gap-1.5 min-h-[72px] px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer disabled:opacity-50",
            sent === "DISLIKE"
              ? "border-vm-accent bg-red-50 text-vm-accent ring-2 ring-vm-accent/30"
              : "border-vm-border bg-vm-surface text-vm-muted hover:border-vm-accent/50 hover:text-vm-accent hover:bg-red-50",
          ].join(" ")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={sent === "DISLIKE" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
            <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
          </svg>
          <span>L'ho bevuto</span>
          <span className="text-xs font-normal opacity-80">e non mi è piaciuto</span>
        </button>
      </div>
    </div>
  );
}
