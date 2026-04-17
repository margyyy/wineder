"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAdditiveDetail, getSafetyColors } from "../../lib/data/additives-knowledge";

type Additive = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  additives: Additive[];
};

function AdditiveCard({ additive }: { additive: Additive }) {
  const [open, setOpen] = useState(false);
  const detail = getAdditiveDetail(additive.name);
  const safety = detail ? getSafetyColors(detail.safetyLevel) : null;

  return (
    <div className="border border-vm-border rounded-xl overflow-hidden bg-vm-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 text-left cursor-pointer hover:bg-vm-bg/60 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {detail?.code && (
              <span className="text-xs font-bold font-mono text-vm-muted bg-vm-border/60 px-1.5 py-0.5 rounded">
                {detail.code}
              </span>
            )}
            <span className="font-semibold text-sm text-vm-ink">{additive.name}</span>
            {safety && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${safety.bg} ${safety.text}`}>
                {safety.label}
              </span>
            )}
          </div>
          {detail && (
            <p className="text-xs text-vm-muted mt-0.5 leading-relaxed line-clamp-2">
              {detail.summary}
            </p>
          )}
          {!detail && (
            <p className="text-xs text-vm-muted mt-0.5 leading-relaxed line-clamp-2">
              {additive.description}
            </p>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-vm-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && detail && (
        <div className="border-t border-vm-border px-4 pb-4 pt-3 grid gap-3 bg-white">
          <p className="text-sm text-vm-ink leading-relaxed m-0">{detail.summary}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-vm-muted">Categoria:</span>
            <span className="text-xs font-semibold text-vm-ink bg-vm-border/40 px-2 py-0.5 rounded-full">
              {detail.category}
            </span>
          </div>

          <div className="grid gap-2">
            {detail.notes.map((note) => (
              <div key={note.label} className="flex gap-2 text-sm">
                <span className="font-bold text-vm-ink flex-shrink-0">{note.label}:</span>
                <span className="text-vm-muted leading-relaxed">{note.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {open && !detail && (
        <div className="border-t border-vm-border px-4 pb-4 pt-3 bg-white">
          <p className="text-sm text-vm-muted leading-relaxed m-0">{additive.description}</p>
        </div>
      )}
    </div>
  );
}

export function WineAdditiveDetail({ additives }: Props) {
  if (additives.length === 0) {
    return (
      <p className="text-sm text-vm-muted italic">Nessun additivo dichiarato per questo vino.</p>
    );
  }

  return (
    <div className="grid gap-2">
      {additives.map((additive) => (
        <AdditiveCard key={additive.id} additive={additive} />
      ))}
    </div>
  );
}
