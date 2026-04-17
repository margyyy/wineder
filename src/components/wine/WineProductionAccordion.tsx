"use client";

import { useState } from "react";

type Props = {
  description: string;
};

export function WineProductionAccordion({ description }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border border-vm-border rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-vm-bg transition-colors"
      >
        <span className="font-bold text-vm-ink">Scopri la produzione</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-vm-muted flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 text-vm-ink leading-relaxed border-t border-vm-border">
          {description}
        </div>
      )}
    </section>
  );
}
