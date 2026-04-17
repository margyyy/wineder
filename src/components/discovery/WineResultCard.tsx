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
};

type Props = {
  wine: DiscoveryCardWine;
  showScore: boolean;
};

export function WineResultCard({ wine, showScore }: Props) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = imageError ? "/images/wine-fallback.svg" : wine.imageUrl;

  return (
    <article className="border border-vm-border rounded-2xl overflow-hidden bg-vm-surface grid">
      <img
        src={imageSrc}
        alt={wine.name}
        onError={() => setImageError(true)}
        className="w-full object-cover h-40 sm:h-48"
      />
      <div className="p-4 grid gap-2">
        <div>
          <h3 className="m-0 text-lg font-bold leading-snug">{wine.name}</h3>
          <p className="m-0 text-vm-muted text-sm mt-1">{wine.wineryName}</p>
        </div>

        <p className="m-0 text-vm-muted text-sm">
          {wine.color.toUpperCase()} · {wine.alcoholPercent.toFixed(1)}% · {wine.vintage}
        </p>

        <p className="m-0 text-sm font-medium">
          EUR {wine.priceRangeMin.toFixed(0)}–{wine.priceRangeMax.toFixed(0)} · {wine.distanceKm.toFixed(1)} km
        </p>

        {showScore ? (
          <p className="m-0 text-vm-muted text-xs">Match: {wine.score.toFixed(3)}</p>
        ) : null}

        <Link
          href={`/wine/${wine.slug}`}
          className="mt-1 min-h-[44px] flex items-center justify-center rounded-xl bg-vm-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity px-4"
        >
          Apri scheda vino
        </Link>
      </div>
    </article>
  );
}
