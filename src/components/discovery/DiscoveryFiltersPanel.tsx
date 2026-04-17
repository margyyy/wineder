"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  query: URLSearchParams;
  wineries: Array<{ id: number; name: string }>;
  onPatch: (patch: Record<string, string | undefined>) => void;
  onReset: () => void;
};

function valueOrEmpty(value: string | null) {
  return value ?? "";
}

export function DiscoveryFiltersPanel({ query, wineries, onPatch, onReset }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="grid gap-3 p-4">
      <label className="block text-sm font-semibold">
        Distanza massima: {valueOrEmpty(query.get("maxDistanceKm")) || "20"} km
        <input
          type="range"
          min={2}
          max={60}
          step={1}
          value={valueOrEmpty(query.get("maxDistanceKm")) || "20"}
          onChange={(e) => onPatch({ maxDistanceKm: e.target.value })}
          className="w-full mt-2 accent-[var(--vm-accent)]"
          style={{ marginTop: "8px" }}
        />
      </label>

      <label className="block text-sm font-semibold">
        Cantina
        <select
          value={valueOrEmpty(query.get("wineryId"))}
          onChange={(e) => onPatch({ wineryId: e.target.value || undefined })}
        >
          <option value="">Tutte</option>
          {wineries.map((w) => (
            <option key={w.id} value={String(w.id)}>
              {w.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">
          Vintage
          <input
            type="number"
            min={1990}
            max={2035}
            value={valueOrEmpty(query.get("vintage"))}
            onChange={(e) => onPatch({ vintage: e.target.value || undefined })}
          />
        </label>
        <label className="block text-sm font-semibold">
          Colore
          <select
            value={valueOrEmpty(query.get("color"))}
            onChange={(e) => onPatch({ color: e.target.value || undefined })}
          >
            <option value="">Tutti</option>
            <option value="red">Rosso</option>
            <option value="white">Bianco</option>
            <option value="rose">Rosato</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">
          Alcol min (%)
          <input
            type="number"
            min={0}
            max={25}
            step={0.1}
            value={valueOrEmpty(query.get("minAlcohol"))}
            onChange={(e) => onPatch({ minAlcohol: e.target.value || undefined })}
          />
        </label>
        <label className="block text-sm font-semibold">
          Alcol max (%)
          <input
            type="number"
            min={0}
            max={25}
            step={0.1}
            value={valueOrEmpty(query.get("maxAlcohol"))}
            onChange={(e) => onPatch({ maxAlcohol: e.target.value || undefined })}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">
          Prezzo min (€)
          <input
            type="number"
            min={0}
            value={valueOrEmpty(query.get("priceMin"))}
            onChange={(e) => onPatch({ priceMin: e.target.value || undefined })}
          />
        </label>
        <label className="block text-sm font-semibold">
          Prezzo max (€)
          <input
            type="number"
            min={0}
            value={valueOrEmpty(query.get("priceMax"))}
            onChange={(e) => onPatch({ priceMax: e.target.value || undefined })}
          />
        </label>
      </div>

      <label className="flex items-center gap-3 min-h-[44px] cursor-pointer text-sm font-medium">
        <input
          type="checkbox"
          className="w-4 h-4 accent-[var(--vm-accent)]"
          checked={query.get("useMatchFilter") !== "false"}
          onChange={(e) => onPatch({ useMatchFilter: e.target.checked ? "true" : "false" })}
        />
        Ordina per match
      </label>

      <button
        type="button"
        onClick={onReset}
        className="min-h-[44px] px-4 rounded-xl border border-vm-border bg-vm-bg text-vm-ink text-sm hover:border-vm-accent transition-colors cursor-pointer"
      >
        Reset filtri
      </button>
    </div>
  );

  return (
    <div className="border border-vm-border rounded-2xl bg-vm-surface overflow-hidden">
      {/* Mobile toggle */}
      <button
        type="button"
        className="md:hidden w-full min-h-[48px] px-4 flex items-center justify-between font-semibold text-vm-ink cursor-pointer"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-expanded={mobileOpen}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filtri
        </span>
        {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Always visible on md+, toggled on mobile */}
      <div className={mobileOpen ? "block border-t border-vm-border" : "hidden md:block"}>
        {content}
      </div>

      {/* Desktop always shows header */}
      <div className="hidden md:flex items-center gap-2 px-4 pt-4 pb-0 font-semibold text-vm-ink">
        <SlidersHorizontal size={16} />
        Filtri
      </div>
    </div>
  );
}
