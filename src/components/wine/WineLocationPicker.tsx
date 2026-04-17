"use client";

import { useRef, useState } from "react";
import { WineAvailabilityMap } from "../maps/WineAvailabilityMap";

type Point = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  winery: "Cantina",
  restaurant: "Ristorante",
  bar: "Bar / Enoteca",
  supermarket: "Supermercato",
  workshop: "Laboratorio",
};

type Props = {
  points: Point[];
};

export function WineLocationPicker({ points }: Props) {
  const [selectedId, setSelectedId] = useState(points[0]?.id ?? null);
  const mapRef = useRef<HTMLDivElement>(null);

  const selectedPoint = points.find((p) => p.id === selectedId) ?? points[0];

  function handleSelect(id: number) {
    setSelectedId(id);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  return (
    <div className="grid gap-4">
      {points.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {points.map((point) => {
            const active = point.id === selectedId;
            return (
              <button
                key={point.id}
                type="button"
                onClick={() => handleSelect(point.id)}
                className={[
                  "min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer text-left",
                  active
                    ? "bg-vm-accent text-white border-vm-accent"
                    : "bg-white text-vm-ink border-vm-border hover:border-vm-accent/60",
                ].join(" ")}
              >
                <span className="block font-bold leading-tight">{point.name}</span>
                <span className={["text-xs", active ? "text-white/80" : "text-vm-muted"].join(" ")}>
                  {CATEGORY_LABEL[point.category] ?? point.category}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {selectedPoint && (
        <div ref={mapRef}>
          <WineAvailabilityMap points={[selectedPoint]} />
        </div>
      )}
    </div>
  );
}
