"use client";

import Link from "next/link";
import { useState } from "react";

export type DiscoveryCardWine = {
  id: number;
  wineryId: number;
  slug: string;
  name: string;
  wineryName: string;
  color: string;
  alcoholPercent: number;
  vintage: number;
  priceRangeMin: number;
  priceRangeMax: number;
  distanceKm: number;
  score: number;
  imageUrl: string;
  isVerified: boolean;
};

type Props = {
  wine: DiscoveryCardWine;
  showScore: boolean;
};

const COLOR_LABEL: Record<string, { label: string; bg: string; text: string }> = {
  red: { label: "Rosso", bg: "bg-red-50", text: "text-red-800" },
  white: { label: "Bianco", bg: "bg-amber-50", text: "text-amber-800" },
  rose: { label: "Rosato", bg: "bg-pink-50", text: "text-pink-800" },
};

export function WineResultCard({ wine, showScore }: Props) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = imageError ? "/images/wine-fallback.svg" : wine.imageUrl;
  const colorInfo = COLOR_LABEL[wine.color] ?? { label: wine.color, bg: "bg-vm-bg", text: "text-vm-muted" };

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 group"
      style={{ boxShadow: "var(--vm-shadow-card)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64 bg-vm-bg flex-shrink-0">
        <img
          src={imageSrc}
          alt={wine.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Color badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${colorInfo.bg} ${colorInfo.text}`}
        >
          {colorInfo.label}
        </span>
        {/* Verified badge */}
        {wine.isVerified && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-vm-accent2/90 text-white backdrop-blur-sm">
            ✓ Verificato
          </span>
        )}
        {/* Match score badge */}
        {showScore && !wine.isVerified && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-vm-accent text-white">
            {Math.round(wine.score * 100)}% match
          </span>
        )}
        {showScore && wine.isVerified && (
          <span className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-vm-accent text-white">
            {Math.round(wine.score * 100)}% match
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-bold text-vm-ink text-base leading-snug m-0">{wine.name}</h3>
          <p className="text-vm-muted text-sm mt-0.5 m-0">{wine.wineryName}</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-vm-muted">
          <span>{wine.vintage}</span>
          <span>·</span>
          <span>{wine.alcoholPercent.toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-bold text-vm-ink text-sm">
            €{wine.priceRangeMin.toFixed(0)}–{wine.priceRangeMax.toFixed(0)}
          </span>
          <span className="text-xs text-vm-muted font-medium">📍 {wine.distanceKm.toFixed(1)} km</span>
        </div>

        <Link
          href={`/wine/${wine.slug}`}
          className="mt-1 min-h-[44px] flex items-center justify-center rounded-xl bg-vm-accent text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Scopri →
        </Link>
      </div>
    </article>
  );
}
