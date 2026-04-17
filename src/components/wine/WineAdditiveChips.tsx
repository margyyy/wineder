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
    return <p style={{ margin: 0, color: "var(--vm-muted)" }}>Nessun additivo dichiarato.</p>;
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {additives.map((additive) => (
          <button
            key={additive.id}
            type="button"
            onClick={() => setSelected(additive)}
            style={{
              border: "1px solid var(--vm-border)",
              borderRadius: 999,
              padding: "6px 10px",
              background: "var(--vm-surface)",
              cursor: "pointer",
            }}
          >
            {additive.name}
          </button>
        ))}
      </div>
      <AdditiveModal additive={selected} onClose={() => setSelected(null)} />
    </>
  );
}
