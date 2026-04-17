"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type Point = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

type Props = {
  points: Point[];
};

const CATEGORY_LABEL: Record<string, string> = {
  winery: "Cantina",
  bar: "Wine bar",
  restaurant: "Ristorante",
  supermarket: "Supermercato",
  enoteca: "Enoteca",
};

export function WineAvailabilityMap({ points }: Props) {
  if (points.length === 0) {
    return <p className="text-sm text-vm-muted m-0">Nessun punto disponibile per questo vino.</p>;
  }

  const bounds = points.map((p) => [p.lat, p.lng]) as [number, number][];
  const first = points[0];
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${first.lat},${first.lng}`;

  return (
    <div className="grid gap-3">
      <div className="rounded-2xl overflow-hidden border border-vm-border" style={{ height: 300 }}>
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [32, 32] }}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {points.map((point) => (
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={10}
              pathOptions={{
                color: "#8b1a2a",
                fillColor: "#8b1a2a",
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <div style={{ minWidth: 140 }}>
                  <strong style={{ color: "#1a1410" }}>{point.name}</strong>
                  <br />
                  <span style={{ fontSize: 12, color: "#6b5f57" }}>
                    {CATEGORY_LABEL[point.category] ?? point.category}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 min-h-[44px] rounded-xl border-2 border-vm-accent text-vm-accent font-semibold text-sm hover:bg-vm-accent hover:text-white transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Indicazioni stradali
      </a>
    </div>
  );
}
