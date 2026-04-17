"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import Link from "next/link";
import type { Map as LeafletMap } from "leaflet";
import { getLikedWines, type PassportEntry } from "../../lib/passport-storage";

type LikedWine = PassportEntry;

type WineryGroup = {
  wineryId: number;
  wineryName: string;
  lat: number;
  lng: number;
  wines: LikedWine[];
};

const COLOR_DOT: Record<string, string> = {
  red: "#8b1a2a",
  white: "#d4a853",
  rose: "#e07aaa",
};

type ModalProps = {
  group: WineryGroup;
  onClose: () => void;
};

function WineryModal({ group, onClose }: ModalProps) {
  const content = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-vm-surface rounded-2xl max-w-sm w-full p-6 grid gap-4"
        style={{ boxShadow: "var(--vm-shadow-hover)", zIndex: 10000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-vm-ink text-lg m-0">{group.wineryName}</h3>
            <p className="text-vm-muted text-sm m-0">
              {group.wines.length} vino{group.wines.length !== 1 ? "i" : ""} piaciuto{group.wines.length !== 1 ? "i" : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-vm-muted hover:text-vm-ink hover:bg-vm-border/40 transition-colors cursor-pointer flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-2">
          {group.wines.map((wine) => (
            <Link
              key={wine.wineId}
              href={`/wine/${wine.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-vm-border hover:border-vm-accent/50 hover:bg-vm-bg transition-all"
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLOR_DOT[wine.color] ?? "#8b1a2a" }}
              />
              <div className="min-w-0">
                <p className="font-semibold text-vm-ink text-sm m-0 truncate">{wine.name}</p>
                <p className="text-xs text-vm-muted m-0">{wine.vintage}</p>
              </div>
              <span className="ml-auto text-vm-accent text-sm flex-shrink-0">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // Portal to body to avoid Leaflet z-index issues
  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}

export function WinePassportMap() {
  const [wines, setWines] = useState<LikedWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<WineryGroup | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    setWines(getLikedWines());
    setLoading(false);
  }, []);

  // Fit Italy bounds once map is ready
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.fitBounds([[35.5, 6.6], [47.1, 18.5]]);
  }, [loading]);

  // Group wines by winery
  const groups = wines.reduce<Record<number, WineryGroup>>((acc, wine) => {
    if (!acc[wine.wineryId]) {
      acc[wine.wineryId] = {
        wineryId: wine.wineryId,
        wineryName: wine.wineryName,
        lat: wine.wineryLat,
        lng: wine.wineryLng,
        wines: [],
      };
    }
    acc[wine.wineryId].wines.push(wine);
    return acc;
  }, {});

  const groupList = Object.values(groups);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-2xl bg-vm-bg" style={{ height: 480 }}>
        <span className="text-vm-muted text-sm">Caricamento…</span>
      </div>
    );
  }

  if (wines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-vm-bg text-center px-4" style={{ height: 320 }}>
        <span className="text-4xl">🗺️</span>
        <p className="text-vm-ink font-semibold m-0">Il tuo Passport è vuoto</p>
        <p className="text-vm-muted text-sm m-0">
          Assaggia dei vini e metti &ldquo;mi è piaciuto&rdquo; per vedere le cantine sulla mappa.
        </p>
        <Link
          href="/discover"
          className="mt-1 min-h-[44px] px-5 flex items-center rounded-xl bg-vm-accent text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Scopri vini →
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl overflow-hidden border border-vm-border" style={{ height: 480 }}>
        <MapContainer
          center={[42.5, 12.5]}
          zoom={5}
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {groupList.map((group) => (
            <CircleMarker
              key={group.wineryId}
              center={[group.lat, group.lng]}
              radius={12}
              pathOptions={{
                color: "#fff",
                fillColor: "#8b1a2a",
                fillOpacity: 0.9,
                weight: 2.5,
              }}
              eventHandlers={{ click: () => setSelectedGroup(group) }}
            />
          ))}
        </MapContainer>
      </div>

      <p className="text-xs text-vm-muted m-0 text-center">
        {groupList.length} cantina{groupList.length !== 1 ? "e" : ""} · {wines.length} vino{wines.length !== 1 ? "i" : ""} piaciuti — clicca un pallino per i dettagli
      </p>

      {selectedGroup && (
        <WineryModal group={selectedGroup} onClose={() => setSelectedGroup(null)} />
      )}
    </>
  );
}
