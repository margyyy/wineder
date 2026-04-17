"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

type Props = {
  query: URLSearchParams;
  wineries: Array<{ id: number; name: string }>;
  onPatch: (patch: Record<string, string | undefined>) => void;
  onReset: () => void;
};

const COLOR_OPTIONS = [
  { value: "", label: "Tutti" },
  { value: "red", label: "Rosso", dot: "bg-red-700" },
  { value: "white", label: "Bianco", dot: "bg-amber-100 border border-amber-400" },
  { value: "rose", label: "Rosato", dot: "bg-pink-400" },
];

export function DiscoveryFiltersPanel({ query, wineries, onPatch, onReset }: Props) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const km = query.get("maxDistanceKm") || "20";
  const color = query.get("color") || "";

  const advancedCount = [
    query.get("wineryId"),
    query.get("vintage"),
    query.get("minAlcohol"),
    query.get("maxAlcohol"),
    query.get("priceMin"),
    query.get("priceMax"),
  ].filter(Boolean).length;

  useEffect(() => {
    if (!advancedOpen) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setAdvancedOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [advancedOpen]);

  return (
    <div
      className="bg-vm-surface border border-vm-border rounded-2xl p-4 md:p-5"
      style={{ boxShadow: "var(--vm-shadow-card)" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Distance slider */}
        <div className="flex-1 min-w-[160px] max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-vm-muted">
              📍 Distanza
            </span>
            <span className="text-sm font-bold text-vm-ink tabular-nums">{km} km</span>
          </div>
          <input
            type="range"
            min={2}
            max={60}
            step={1}
            value={km}
            onChange={(e) => onPatch({ maxDistanceKm: e.target.value })}
          />
        </div>

        {/* Color pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {COLOR_OPTIONS.map((opt) => {
            const active = color === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPatch({ color: opt.value || undefined })}
                className={[
                  "min-h-[36px] px-3.5 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-2",
                  active
                    ? "bg-vm-accent text-white border-vm-accent"
                    : "bg-white text-vm-ink border-vm-border hover:border-vm-accent/60",
                ].join(" ")}
              >
                {opt.dot && (
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${opt.dot}`} />
                )}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Advanced filters button */}
        <div className="relative flex-shrink-0" ref={panelRef}>
          <button
            type="button"
            onClick={() => setAdvancedOpen((prev) => !prev)}
            className={[
              "min-h-[36px] px-4 rounded-full text-sm font-bold flex items-center gap-2 border-2 transition-all cursor-pointer whitespace-nowrap",
              advancedOpen || advancedCount > 0
                ? "bg-vm-ink text-white border-vm-ink"
                : "bg-white text-vm-ink border-vm-border hover:border-vm-ink/40",
            ].join(" ")}
          >
            <SlidersHorizontal size={14} />
            Filtri
            {advancedCount > 0 && (
              <span className="bg-vm-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
                {advancedCount}
              </span>
            )}
          </button>

          {/* Dropdown panel */}
          {advancedOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-72 bg-vm-surface border border-vm-border rounded-2xl p-5 grid gap-4 z-30"
              style={{ boxShadow: "var(--vm-shadow-hover)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-vm-ink">Filtri avanzati</span>
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(false)}
                  className="text-vm-muted hover:text-vm-ink transition-colors cursor-pointer p-1 rounded-lg hover:bg-vm-border/40"
                >
                  <X size={15} />
                </button>
              </div>

              <label>
                Cantina
                <select
                  value={query.get("wineryId") ?? ""}
                  onChange={(e) => onPatch({ wineryId: e.target.value || undefined })}
                >
                  <option value="">Tutte le cantine</option>
                  {wineries.map((w) => (
                    <option key={w.id} value={String(w.id)}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Annata
                <input
                  type="number"
                  min={1990}
                  max={2035}
                  placeholder="es. 2020"
                  value={query.get("vintage") ?? ""}
                  onChange={(e) => onPatch({ vintage: e.target.value || undefined })}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label>
                  Alcol min %
                  <input
                    type="number"
                    min={0}
                    max={25}
                    step={0.5}
                    placeholder="0"
                    value={query.get("minAlcohol") ?? ""}
                    onChange={(e) => onPatch({ minAlcohol: e.target.value || undefined })}
                  />
                </label>
                <label>
                  Alcol max %
                  <input
                    type="number"
                    min={0}
                    max={25}
                    step={0.5}
                    placeholder="25"
                    value={query.get("maxAlcohol") ?? ""}
                    onChange={(e) => onPatch({ maxAlcohol: e.target.value || undefined })}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label>
                  Prezzo min €
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    value={query.get("priceMin") ?? ""}
                    onChange={(e) => onPatch({ priceMin: e.target.value || undefined })}
                  />
                </label>
                <label>
                  Prezzo max €
                  <input
                    type="number"
                    min={0}
                    placeholder="—"
                    value={query.get("priceMax") ?? ""}
                    onChange={(e) => onPatch({ priceMax: e.target.value || undefined })}
                  />
                </label>
              </div>

              <label className="flex items-center gap-3 cursor-pointer !uppercase-none !text-sm !font-semibold !text-vm-ink !tracking-normal !normal-case">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[var(--vm-accent)] flex-shrink-0"
                  checked={query.get("useMatchFilter") !== "false"}
                  onChange={(e) =>
                    onPatch({ useMatchFilter: e.target.checked ? "true" : "false" })
                  }
                  style={{ width: 18, height: 18 }}
                />
                Ordina per match
              </label>

              <button
                type="button"
                onClick={() => {
                  onReset();
                  setAdvancedOpen(false);
                }}
                className="min-h-[40px] rounded-xl border-2 border-vm-border text-vm-muted text-sm font-semibold hover:border-vm-accent/60 hover:text-vm-ink transition-colors cursor-pointer"
              >
                Reset filtri
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
