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
    <article
      style={{
        border: "1px solid var(--vm-border)",
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--vm-surface)",
        display: "grid",
      }}
    >
      <img
        src={imageSrc}
        alt={wine.name}
        onError={() => setImageError(true)}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />
      <div style={{ padding: 14, display: "grid", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 20 }}>{wine.name}</h3>
          <p style={{ margin: "4px 0 0", color: "var(--vm-muted)" }}>{wine.wineryName}</p>
        </div>

        <p style={{ margin: 0, color: "var(--vm-muted)" }}>
          {wine.color.toUpperCase()} • {wine.alcoholPercent.toFixed(1)}% • {wine.vintage}
        </p>

        <p style={{ margin: 0 }}>
          EUR {wine.priceRangeMin.toFixed(0)}-{wine.priceRangeMax.toFixed(0)} • {wine.distanceKm.toFixed(1)} km
        </p>

        {showScore ? (
          <p style={{ margin: 0, color: "var(--vm-muted)" }}>Match score: {wine.score.toFixed(3)}</p>
        ) : null}

        <Link href={`/wine/${wine.slug}`} style={{ color: "var(--vm-accent)", fontWeight: 600 }}>
          Apri scheda vino
        </Link>
      </div>
    </article>
  );
}
