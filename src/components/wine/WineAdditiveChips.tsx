"use client";

import { useState } from "react";
import { AdditiveModal } from "./AdditiveModal";

type Additive = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  additives: Additive[];
};

export function WineAdditiveChips({ additives }: Props) {
  const [selected, setSelected] = useState<Additive | null>(null);

  if (additives.length === 0) {
    return <p className="m-0 text-vm-muted">Nessun additivo dichiarato.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {additives.map((additive) => (
          <button
            key={additive.id}
            type="button"
            onClick={() => setSelected(additive)}
            className="border border-vm-border rounded-full px-4 min-h-[44px] bg-vm-surface text-vm-ink text-sm hover:border-vm-accent transition-colors cursor-pointer"
          >
            {additive.name}
          </button>
        ))}
      </div>
      <AdditiveModal additive={selected} onClose={() => setSelected(null)} />
    </>
  );
}
